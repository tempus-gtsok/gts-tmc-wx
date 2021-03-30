<template>
	<view class="trandetails">
		<loading>
		</loading>
		<view class="Navigations">
			<view class="smtis">
				<view @click="rblcok" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
			</view>
			<view class="ongbutns">
				{{tiltext}}
			</view>
			<view class="onright">
				<view class="onrights" @click="cleraes()" v-if="clears">
					取消订单
				</view>
			</view>
		</view>
		<view class="navstop" v-if="plsitsti.apprvStatus > -2">
			<view class="">
				订单号：{{codes}}
			</view>
			<view class="lisst">
				<view class="citst">
					<view class="cits_t">
						<view class="">
							酒店名称：{{plsitsti.hotelOrder.hotelName}}
						</view>
						<view class="" v-if="plsitsti.hotelOrder.hotelPhone != null">
							酒店电话：{{plsitsti.hotelOrder.hotelPhone}}
						</view>
						<view class="" v-if="plsitsti.hotelOrder.bedTypeName != null">
							酒店床型：{{plsitsti.hotelOrder.bedTypeName}}
						</view>
						<view class="">
							房间数量：{{plsitsti.hotelOrder.bookCount}}间
						</view>
						<view class="">
							房间类型：{{plsitsti.hotelOrder.proName}}
						</view>
						<view class="">
							所在地址：{{plsitsti.hotelOrder.hotelAddress}}
						</view>
					</view>
					<view class="cits_b">
						<view class="cits_bt">
							<view class="cits_bts" style=" color: #007aff;">支付状态：{{pustatus(payStatus)}}</view>
							<view class="cits_bts" style=" color: #007aff;">订单状态：{{userstatus(orderStatus)}}</view>
						</view>
						<view class="cits_bt">
							<view class="cits_bts">入住日期：{{subtime(plsitsti.hotelOrder.arrivalDate)}}</view>
							<view class="cits_bts">离开日期：{{subtime(plsitsti.hotelOrder.departureDate)}}</view>
						</view>
						<view class="cits_bt">
							<view class="cits_bts">入住人：{{plsitsti.hotelOrder.guestName}}</view>
						</view>
						<view class="cits_bt" v-if="apprvTaskReason != ''&& apprvTaskReason != null">
							<view class="cits_bts">出差事由：{{apprvTaskReason}}</view>
						</view>
						<view class="cits_bt">
							<view class="cits_bts">联系人：{{plsitsti.hotelOrder.contactName}}</view>
							<view class="cits_bts">联系电话：{{plsitsti.hotelOrder.contactNumber}}</view>
						</view>
						<view class="cits_bt">
							<view class="cits_bts">支付类型：{{settlement(plsitsti.transationorderExtend.settlement)}}</view>
							<view class="cits_btsy">总价：￥{{plsitsti.hotelOrder.totalPrice}}</view>
						</view>
						<view class="cits_bt">
							<view class="cits_bts" style="color: red;">取消规则：{{dbCancelRules}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btnfixd">
			<paybtns businessType="1" productType="4" :recordNo="recordNos" :amount="amounts" @payok="payok" v-if="(payStatus == 1 || payStatus == 2)&& tlement == 1"></paybtns>
			<view class="deletes" v-if="clearst" @click="upmessage">
				取消订单
			</view>
			<view class="tobeaudited" v-if="tlement ==2 && apprvStatus==0">
				待审核
			</view>
		</view>
	</view>
</template>

<script>
	import wxplay from '@/common/wechat.js'
	import order from '@/api/order.js'
	export default {
		data() {
			return {
				recordNos: 0,
				amounts: 0,
				clearst: false,
				clears: false,
				isclsks: false, //是否从列表点进详情
				ltes: 0,
				ist: 0,
				numprice: '999', //总价
				apprvStatus: '', //审批状态：0-待审批，1-审批中 2-通过，3-驳回，4-撤回, 5-免审， 9-无效 10表示没有审批单
				payStatus: '', //支付状态 1 为待支付 2 支付中 3 为已支付，4 为挂帐支付
				orderStatus: '', //zhx:待处理（115）,处理中（100）,预定成功（101）,下单失败（102）, 取消中（400）,取消成功（401）,审批拒绝（121）
				tiltext: '酒店订单详情',
				userlist: [], //乘客列表
				typename: '',
				sittext: '',
				switfal: false,
				codes: 0,


				plsitsti: {},
				apprvTaskReason: '出差事由', //出差事由
				tlement: 0, //1为现结2为月结
				RuleMas: false, //当前用户是否免审
				RuleMa: '',
				saleOrderNo: '',
				dbCancelRules: '', //取消规则
			}
		},
		onLoad(item) {
			this.ist = item.ist;
			this.codes = item.code;
			this.isclsks = item.isck;
		},
		onShow() {
			this.clearst = false;
			this.slet();
		},
		methods: {
			settlement(it) {
				if (it == 1) {
					return '现结'
				} else {
					return '预付月结'
				}
			},
			payok() {
				this.ltes = 1;
				this.slet('wx');
			},
			async upmessage() {
				let that = this;
				let st = this.plsitsti;
				let typename = this.typename; //1因公2因私
				let tlement = this.tlement; //结算方式1日结2月结
				if (typename == 2 && tlement == 1) { //因私日结取消
					this.cleraes();
				} else if (typename == 1 && tlement == 2) { //因公月结
					await this.getRuleMainSetting();
					if (!this.RuleMas) { //当前用户是否免审
						this.cleraes();
					} else {
						let userlistnos = [];
						let userlis = this.plsitsti.hotelOrder.guestName.split(',')
						try {
							let res = await order.getStaffByTravelNoAndNames({
								travelNo: this.plsitsti.transationorderExtend.travelNo,
								names: userlis
							});
							let dat = res.data; //获取用户信息
							for (let i in dat) {
								userlistnos.push(dat[i].passengerNo)
							}
						} catch (e) {

							//TODO handle the exception
						}
						try {
							let res = await order.judgeApprv({
								passengerNos: userlistnos
							}); //判断当前出行人是否都免审

							if (res.code == 200) {
								if (res.data == false) { //判断是否需要审核
									let dat = {
										saleOrderNo: this.saleOrderNo
									}
									uni.navigateTo({
										url: '../hotelforchange?data=' + JSON.stringify(dat)
									})
								} else {
									this.cleraes();
								}
							}
						} catch (e) {

							//TODO handle the exception
						}
					}
				}
			},
			async getRuleMainSetting() { //查询当前用户退房是否需要审核
				try {
					let res = await order.RuleMainSetting();
					this.RuleMa = res.data.examinePattern;
					let stw = this.RuleMa.split(',');
					for (let i in stw) {
						/**
						 * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
						 */
						if (stw[i] == 7) {
							this.RuleMas = true;
						}
					}
				} catch (e) {
					console.log(e)
				}
			},
			async slet(va) { //查询酒店订单
				let that = this;
				if (that.ltes == 0) {

				}
				try {
					const res = await order.toOrderDetail({
						transactionOrderNo: this.codes
					});

					if (res.code == 200) {
						if (va == 'wx' && (res.data.hotelOrder.paymentStatus == 1 || res.data.hotelOrder.paymentStatus == 2)) {
							
							that.tiltext = '订单支付中...';
							setTimeout(() => {
								that.slet('wx')
							}, 1000)
						} else {
							that.ltes = 0;
							that.tiltext = '酒店订单详情';
							that.plsitsti = res.data;
							that.apprvTaskReason = res.data.apprvTaskReason;
							that.numprice = that.plsitsti.hotelOrder.totalPrice; //总价

							that.recordNos = that.codes,
								that.amounts = that.numprice,

								that.payStatus = that.plsitsti.querySaleOrder.payStatus; //支付状态
							that.orderStatus = that.plsitsti.hotelOrder.orderStatus; //酒店状态
							that.saleOrderNo = that.plsitsti.hotelOrder.saleOrderNo; //销售单号
							that.apprvStatus = that.plsitsti.apprvStatus; //审核状态
							that.tlement = that.plsitsti.transationorderExtend.settlement; //结算方式1日结2月结
							that.typename = that.plsitsti.transationorderExtend.typename; //1因公2因私
							that.dbCancelRules = that.plsitsti.hotelOrder.dbCancelRule; //取消规则
							let istus = that.plsitsti.hotelOrder.cancelable; //是否可以取消是否可以取消(True（可以取消）/False（不能取消）/Limit（条件取消）) 
							if ((that.typename == 1 || that.typename == 2) && (that.payStatus == 1 || that.payStatus == 2) && that.orderStatus ==
								650) {
								that.clears = true; //可以取消
							} else if ((that.typename == 1 && (that.payStatus == 3 || that.payStatus == 4) && that.orderStatus == 101 &&
									istus != 'false') || (that.typename == 2 && that.payStatus == 3 && that.orderStatus == 101 && istus !=
									'false')) {
								that.clearst = true; //可以退房
							}
						}
					} else {
						that.showToasts(res.message);

					}
				} catch (e) {
					console.log(e)

				}
			},
			subtime(tiem) { //返回日期前10位
				return tiem.substring(0, 10)
			},
			pustatus(ty) { //支付状态
				if (ty == 1) {
					return '待支付'
				} else if (ty == 2) {
					return '支付中'
				} else if (ty == 3) {
					return '已支付'
				} else if (ty == 4) {
					return '为挂帐支付'
				}
			},
			userstatus(ite) { //订单状态
				let arr = [{
					name: '待审核',
					id: 650
				}, {
					name: '处理中',
					id: 100,
				}, {
					name: '拒单',
					id: 600,
				}, {
					name: '审批拒绝',
					id: 121,
				}, {
					name: '占房成功',
					id: 122,
				}, {
					name: '申请中',
					id: 117,
				}, {
					name: '待处理',
					id: 115,
				}, {
					name: '预定成功',
					id: 101,
				}, {
					name: '下单失败',
					id: 102,
				}, {
					name: '取消中',
					id: 400
				}, {
					name: '取消成功',
					id: 401
				}, {
					name: '在入住',
					id: 700
				}, {
					name: '未入住',
					id: 702
				}, {
					name: '订单结束',
					id: 950
				}, {
					name: '离店',
					id: 123
				}, {
					name: '新单',
					id: 300
				}]
				for (let i in arr) {
					if (arr[i].id == ite) {
						return arr[i].name
					}
				}
			},
			catype(it) { //返回证件类型
				if (it == 1) {
					return '身份证' //NI
				} else if (it == 2) {
					return '护照' //PP
				} else if (it == 3) {
					return '台胞证' //TB
				} else if (it == 4) {
					return '港澳通行证' //GA
				}
			},
			cleraes() {
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定是否取消订单！',
					success: function(res) {
						if (res.confirm) {
							that.closedi();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			async closedi() { //取消订单
				let _this = this;
				try {
					let res = await order.cancelHolOrder({
						saleOrderNo: _this.saleOrderNo
					})

					if (res.code == 200) {
						_this.showToasts("取消成功!");
						setTimeout(() => {
							_this.rblcok();
						}, 500)
					} else {
						_this.showToasts(res.message)
					}
				} catch (e) {
					console.log(e);

				}
			},
			rblcok() {
				// #ifdef H5
				history.back();
				// #endif
				// #ifdef MP-WEIXIN
				uni.navigateBack()
				// #endif
			},
		}
	}
</script>

<style scoped lang="scss">
	.trandetails {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		bottom: 110upx;
		/*距离底部的距离为底部盒子的高度，自己也可以设置*/
		overflow-y: scroll;
		height: auto;
		-webkit-overflow-scrolling: touch;
		/*这句是为了滑动更顺畅*/
		background: #F5F5F5;

		.Navigations {
			/*  #ifdef  APP-PLUS || MP-WEIXIN */
			padding-top: 60upx;
			/*  #endif  */
			width: 100%;
			height: 90upx;
			display: flex;
			align-items: center;
			background: #109DED;
			justify-content: space-between;

			.ongbutns {
				color: #FFFFFF;
				text-align: center;
			}

			.onright {
				font-size: 30upx;
				padding-right: 10upx;
				color: #FFFFFF;
			}
		}

		.fixs_list {
			position: fixed;
			bottom: -100%;
			left: 0;
			width: 0;
			height: 100%;
			overflow: scroll;
			background: #edf0f5;
			z-index: 1000;

			.fix_los {
				display: flex;
				width: calc(100% - 40upx);
				padding: 0 20upx;
				height: 90upx;
				line-height: 90upx;
				background: #FFFFFF;
				margin-bottom: 2upx;

				.fitx_les {
					flex: 1;
					font-size: 30upx;
				}

				.stsb {
					display: flex;
					align-items: center;

					.scks {
						margin-right: 10upx;
						width: 50upx;
						text-align: center;
						color: #FFFFFF;
						height: 35upx;
						line-height: 35upx;
						border-radius: 35upx;
						background: #90B2E7;
					}
				}
			}
		}

		.shows {
			bottom: 0;
			width: 100%;
			transition: bottom 0.4s;
		}

		.hides {
			bottom: -100%;
			width: 100%;
			transition: bottom 0.4s;
		}

		.black_mu {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, .5);
			z-index: 888;

			.isswflist {
				position: fixed;
				bottom: 0;
				left: 0;
				transition: all 0.3s ease;
				-webkit-transform: translateY(100%);
				transform: translateY(100%);
				min-height: 150upx;
				border-top-left-radius: 15upx;
				border-top-right-radius: 15upx;
				width: calc(100% - 80upx);
				z-index: 889;
				background: #ffffff;
				padding: 40upx;
				font-size: 30upx;

				.isstop {
					color: $uni-color-primary;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 30upx;
				}

				.isstops {
					padding-bottom: 20upx;
				}
			}

			.show {
				-webkit-transform: translateY(0);
				transform: translateY(0);
			}
		}

		.btnfixd {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			line-height: 110upx;
			text-align: center;
			display: flex;

			.payment {
				flex: 1;
				height: 110upx;
				color: #FFFFFF;
				background: #F48F00;
			}

			.deletes {
				flex: 1;
				height: 110upx;
				color: #FFFFFF;
				background: red;
			}

			.tobeaudited {
				width: 100%;
				height: 110upx;
				color: #FFFFFF;
				background: #999999;
			}
		}

		.black_mus {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, .5);
			z-index: 888;
		}

		.userlist {
			position: fixed;
			bottom: 0;
			left: 0;
			transition: all 0.3s ease;
			-webkit-transform: translateY(100%);
			transform: translateY(100%);
			min-height: 200upx;
			width: 100%;
			z-index: 889;
			background: #ffffff;

			.userlist_top {
				display: flex;
				font-size: 30upx;
				height: 90upx;
				width: 100%;
				background: #f1f1f1;
				align-items: center;
				text-align: center;

				.btns {
					width: 20%;
					color: $uni-color-primary;
				}

				.oli {
					width: 60%;
					color: #c8c7cc;
				}
			}

			.usarbotm {
				width: 100%;
				padding: 40upx 0;
				display: flex;
				align-items: center;
				font-size: 30upx;

				.stname {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;

					.stve {
						padding: 0 15upx;
						height: 40upx;
						line-height: 40upx;
						border-radius: 8upx;
					}

					.stnamet {
						border: 2upx solid #999999;
						color: #999999;
					}

					.stnames {
						background: $uni-color-primary;
						border: 2upx solid $uni-color-primary;
						color: #FFFFFF;
					}
				}
			}
		}

		.show {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}

		.navstop {
			position: relative;
			width: calc(100% - 80upx);
			padding: 20upx 40upx 140upx 40upx;
			font-size: 28upx;
			color: #FFFFFF;
			background: #109DED;

			.lisst {
				position: absolute;
				left: 0;
				top: 110upx;
				width: calc(100% - 40upx);
				padding: 0 20upx;

				.citst {
					width: 100%;

					.cits_t {
						width: calc(100% - 40upx);
						padding: 20upx;
						background: #F5FAFD;
						border-top-left-radius: 15upx;
						border-top-right-radius: 15upx;
						color: #333333;
						line-height: 50upx;
					}

					.cits_b {
						width: calc(100% - 40upx);
						color: #333333;
						padding: 0 20upx;
						background: #FFFFFF;
						border-bottom-left-radius: 15upx;
						border-bottom-right-radius: 15upx;

						.cits_bt {
							display: flex;
							line-height: 60upx;
							align-items: center;
							justify-content: space-between;

							.cits_bts {
								flex: 1;
							}

							.cits_btsy {
								flex: 1;
								color: #F48F00;
							}
						}
					}
				}

				.btuserlist {
					width: 100%;
					margin-top: 20upx;
					border-radius: 15upx;
					background: #FFFFFF;

					.btuse {
						color: #C8C7CC;
						width: calc(100% - 40upx);
						padding: 20upx;

						.btul {
							margin-top: 10upx;
							color: #333333;

							.user_t {
								display: flex;
								width: 100%;
								height: 50upx;
								line-height: 50upx;
								font-size: 28upx;

								.user_l {
									flex: 3;
								}

								.user_os {
									flex: 7;
									text-align: left;
								}

								.user_o {
									flex: 6;
									display: flex;
									justify-content: flex-end;
									align-items: center;

									.uses_sp {
										margin-left: 20upx;
										height: 40upx;
										line-height: 40upx;
										border-radius: 5upx;
										padding: 2upx 6upx;
										background: red;
										color: #FFFFFF;
									}

									.uses_st {
										margin-left: 20upx;
										height: 40upx;
										line-height: 40upx;
										border-radius: 5upx;
										padding: 2upx 6upx;
										background: #FF9000;
										color: #FFFFFF;
									}
								}

								.user_r {
									flex: 2;
									justify-content: flex-end;
									display: flex;
									color: #FF9000;
								}

								.user_t {
									flex: 3;
								}
							}
						}
					}

					.liass {
						width: calc(100% - 40upx);
						padding: 0 20upx;
						display: flex;
						color: #C8C7CC;
						line-height: 80upx;

						.liass_l {
							font-size: 35upx;
							flex: 1;
						}

						.liass_r {
							color: #333333;
							text-align: right;
							flex: 2;
						}

						.liass_p {
							text-align: right;
							flex: 1;
							font-size: 35upx;
							color: #FF9000;
						}
					}
				}
			}
		}
	}
</style>
