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
			<view class="smtis">
			</view>
		</view>
		<view class="navstop" v-if="plsitsti.protect > -1">
			<view class="">
				订单号：{{plsitsti.trExtend.transationOrderNo}}
			</view>
			<view class="lisst">
				<view class="citst">
					<view class="cits_t">
						<view class="">
							保险名称：{{plsitsti.insurance.name}}
						</view>
						<view class="">
							保险公司：{{plsitsti.insurance.companyName}}
						</view>
						<view class="">
							投保日期：{{plsitsti.saleOrderExt.createTime}}
						</view>
					</view>
					<view class="cits_b">
						<view class="cits_bt">
							<view class="cits_bts" v-if="plsitsti.saleOrderExt.internatOrcivil == 1">订单类别：国内</view>
							<view class="cits_bts" v-if="plsitsti.saleOrderExt.internatOrcivil == 2">订单类别：国际</view>
							<view class="cits_bts">保险类型：{{intype(plsitsti.saleOrderExt.insurance.insureType)}}</view>
						</view>
						<view class="cits_bt">
							<view class="cits_bts" style=" color: #007aff;">支付状态：{{pustatus(plsitsti.saleOrderExt.saleOrder.payStatus)}}</view>
							<view class="cits_bts" style=" color: #007aff;">订单状态：{{userstatus(plsitsti.saleOrderExt.saleOrder.orderChildStatus)}}</view>
						</view>
						<view class="cits_bt">
							<view class="cits_bts">生效日期：{{subtime(plsitsti.saleOrderExt.effectDate)}}</view>
							<view class="cits_bts">失效日期：{{subtime(plsitsti.saleOrderExt.expireDate)}}</view>
						</view>
						<!-- <view class="cits_bt">
							<view class="cits_bts">出发城市：{{plsitsti.saleOrderExt.insureExtVo.flightInfo.originCity}}</view>
							<view class="cits_bts">到达城市：{{plsitsti.saleOrderExt.insureExtVo.flightInfo.destinationCity}}</view>
						</view>
						<view class="cits_bt">
							<view class="cits_bts">起飞时间：{{subtime(plsitsti.saleOrderExt.insureExtVo.flightInfo.flightDate)}}</view>
							<view class="cits_bts">航班号：{{plsitsti.saleOrderExt.insureExtVo.flightInfo.flightNo}}</view>
						</view> -->
						<view class="cits_bt">
							<view class="cits_bts">保期：{{plsitsti.insurance.endDays}}天</view></view>
					</view>
				</view>
				<view class="btuserlist">
					<view class="btuse">
						被保人信息
						<view class="btul" v-for="(item,index) in userlist" :key="index">
							<view class="user_t">
								<view class="user_l">
									{{item.insuredName}}
								</view>
								<view class="user_t">
									<view style=" color: #007aff;">
										状态:{{userstatus(item.status)}}
									</view>
								</view>
								<view class="user_o" v-if="payStatus != 1">
									<view class="uses_sp" @click="upmessages(3,'确定退保吗？',item)"  v-if="item.status == 2">
										退保
									</view>
									<!-- buyWay:购买方式 1=线上 2=线下 -->
									<!-- isCivilServant是否公务员保险：0代表非公务员，1代表公务员保险 -->
									<!-- <view class="uses_st" @click="remobk(item)"  v-if="item.status == 1 &&(payStatus==3 || payStatus ==4)">
										重新投保
									</view> -->
								</view>
							</view>
							<view class="user_t">
								<view class="user_l">
									{{catype(item.insuredCertiType)}}
								</view>
								<view class="user_os">
									{{item.insuredCertiNo}}
								</view>
								<view class="user_r">
									￥{{item.premium}}
								</view>
							</view>
						</view>
					</view>
					<view class="liass">
						<view class="liass_l">
							投保人信息
						</view>
						<view class="liass_r">
							{{plsitsti.saleOrderExt.creator}}　{{plsitsti.saleOrderExt.holderPhone}}
						</view>
					</view>
					<view class="liass">
						<view class="liass_l">
							总价
						</view>
						<view class="liass_p">
							￥{{numprice}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btnfixd">
			<paybtns businessType="2" productType="3" :recordNo="recordNos" :amount="amounts" :pay-status="payStatus" @payok="payok" v-if="(payStatus == 1 || payStatus == 2)&& orderStatus == 1 && tlement == 1"></paybtns>
			<view class="upmessages" @click="upmessages(1,'确定退保吗？')" v-if="orderStatus == 2 && rotes('tms:ins:list:surrender')">
				申请退保
			</view>
			<!-- <view class="deletes" @click="upmessages(2,'确定退款吗？')" v-if="orderStatus == 4 && plsitsti.saleOrderExt.insurance.buyWay==1">
				申请退款
			</view> -->
		</view>
	</view>
</template>

<script>
	import wxplay from '@/common/wechat.js'
	import order from '@/api/order.js'
	export default{
		data(){
			return{
				recordNos:0,
				amounts:0,
				ltes: 0,
				ist:0,
				usersli: false,//是否可以退保和退款
				numprice: '999',//总价
				payStatus: '',//支付状态 1 为待支付 2 支付中 3 为已支付，4 为挂帐支付
				orderStatus: '',//订单状态1.未投保 2.已投保 3.已退保（订单子状态1:未投保;2:已投保;3:已取消;4:投保异常;5:已退保;6:部分退保;7:部分投保;8:退款中;9:部分退款;10:已退款;11:退款异常;12:退款待审核;13:登帐
				tiltext:'保险单详情',
				userlist:[],//乘客列表
				sittext: '',
				switfal: false,
				codes: 0,
				
				
				plsitsti: {},
				weeks:['一','二','三','四','五','六','日'],
				tlement: 0,//1为现结2为月结
			}
		},
		onLoad(item) {
			this.ist = item.ist;
			this.codes = item.code;
		},
		mounted() {
			this.slet();
		},
		methods:{
			payok(){
				this.ltes = 1;
				this.slet('wx');
			},
			async upmessages(num,name,item){
				let that = this;
				uni.showModal({
					title: '提示',
					content: name,
					success: function (res) {
						if (res.confirm) {
							//1.全部退保 2.全部退款 3.个人退保 4.个人退款
							if(num == 1){
								that.unsotp(num); 
							} else if(num ==3){
								that.unsotps(num,item);
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			async unsotp(num){
				let that = this;
				
				try{
					if(num == 1){
						let res = await order.insuranceOrderCancel({
							saleOrderNo:that.codes,
							isRefund: 1
						});//全部退保
						
					}
				}catch(e){
					console.log(e)
					
				}
			},
			async unsotps(num,item){
				let that = this;
				if(num == 3){
					let buyway = that.plsitsti.saleOrderExt.insurance.buyWay;//支付方式1=线上 2=线下
					if(buyway==2){
						
						try{
							let res = await order.cancelInsureForPerson({
								saleOrderNo:that.codes,
								insuredNo: item.insuredNo,
								isRefund: 1,
								orderType: 2
							});//个人退保
							
							if(res.code == 200){
								that.showToasts("退保成功!");
								setTimeout(()=>{
									that.slet();
								},500)
							} else {
								that.showToasts(res.message);
							}
						}catch(e){
							console.log(e)
							
						}
					} else { //线上
						uni.showModal({
							title: '提示',
							content: '退保后是否直接退款',
							cancelText: '不退款',
							confirmText: '退款',
							success: function (res) {
								if (res.confirm) { //退款
									that.cancelI(item);
								} else if (res.cancel) {//不退款
									that.cancelIs(item);
								}
							}
						})
					}
				}
				
			},
			async cancelI(item){
				let that = this;
				
				try{
					let res = await order.cancelInsureForPerson({
						saleOrderNo:this.codes,
						insuredNo: item.insuredNo,
						isRefund: 1,
						orderType: 1
					});//个人退保 退款
					
					if(res.code == 200){
						that.showToasts("退保成功!");
						setTimeout(()=>{
							that.slet();
						},500)
					} else {
						that.showToasts(res.message);
					}
				}catch(e){
					console.log(e)
					
				}
			},
			async cancelIs(item){
				let that = this;
				
				try{
					let res = await order.cancelInsureForPerson({
						saleOrderNo:that.codes,
						insuredNo: item.insuredNo,
						isRefund: 0,
						orderType: 1
					});//个人退保 不退款
					
					if(res.code == 200){
						that.showToasts("退保成功!");
						setTimeout(()=>{
							that.slet();
						},500)
					} else {
						
						that.showToasts(res.message);
					}
				}catch(e){
					console.log(e)
					
				}
			},
			async slet(va){//查询保险单
				let that = this;
				if(that.ltes == 0){
					
				}
				try{
					const res = await order.insuranceOrderDetail({saleOrderNo: this.codes});
					
					if(res.code == 200){
						if(va == 'wx' && (res.data.saleOrderExt.saleOrder.payStatus == 1 || res.data.saleOrderExt.saleOrder.payStatus == 2)){
							that.tiltext = '保险支付中...';
							setTimeout(()=>{
								that.slet('wx')
							},1000)
						} else {
							that.ltes = 0;
							that.tiltext = '保险单详情';
							that.plsitsti = res.data;
							that.numprice = that.plsitsti.saleOrderExt.totalPremium;//总价
							that.payStatus = that.plsitsti.saleOrderExt.saleOrder.payStatus;//支付状态
							that.orderStatus = that.plsitsti.saleOrderExt.saleOrder.orderChildStatus;//投保状态
							that.tlement =  that.plsitsti.trExtend.settlement;//结算方式
							that.userlist = that.plsitsti.saleOrderExt.saleOrderDetailList;//被保人信息
							
							that.recordNos = that.codes;
							that.amounts = that.numprice;
						}
					} else {
						that.showToasts(res.message);
						
					}
				}catch(e){
					console.log(e)
					
				}
			},
			subtime(tiem){//返回日期前10位
				return tiem.substring(0,10)
			},
			intype(ty){//保险类型
				if(ty == 1){
					return '航意险'
				} else if(ty == 2){
					return '航延险'
				} else if(ty == 3){
					return '航意/航延险'
				} else if(ty == 4){
					return '误机险'
				} else if(ty == 5){
					return '火意险'
				} else if(ty == 6){
					return '旅游险'
				}
			},
			pustatus(ty){//支付状态
				if(ty == 1){
					return '待支付'
				} else if(ty == 2){
					return '支付中'
				} else if(ty == 3){
					return '已支付'
				} else if(ty == 4){
					return '为挂帐支付'
				}
			},
			userstatus(ite){//订单状态
				let arr = [{
						name: '未投保',
						id:1
					},{
						name: '已投保',
						id:2
					},
					{
						name: '已取消',
						id:3
					},
					{
						name: '投保异常',
						id:4
					},
					{
						name: '已退保',
						id:5
					},{
						name: '部分退保',
						id:6
					},{
						name: '部分投保',
						id:7
					},{
						name: '退款中',
						id:8
					},{
						name: '部分退款',
						id:9
					},{
						name: '已退款',
						id:10
					},{
						name: '退款异常',
						id:11
					},{
						name: '退款待审',
						id:12
					},{
						name: '登帐',
						id:13
					}]
				for(let i in arr){
					if(arr[i].id == ite){
						return arr[i].name
					}
				}
			},
			catype(it){//返回证件类型
				if(it == 1){
					return '身份证'//NI
				} else if(it == 2){
					return '护照'//PP
				} else if(it == 3){
					return '台胞证'//TB
				} else if(it == 4){
					return '港澳通行证'//GA
				}
			},
			rblcok(){
				// #ifdef H5
				history.back();
				// #endif
				// #ifdef MP-WEIXIN
				uni.navigateBack()
				// #endif
			}
		}
	}
</script>

<style scoped lang="scss">
	.trandetails{
		width: 100%;
		.Navigations{
			/*  #ifdef  APP-PLUS || MP-WEIXIN */ 
			padding-top: 60upx;
			/*  #endif  */
			width: 100%;
			height: 90upx;
			display: flex;
			align-items: center;
			background: #109DED;
			justify-content: space-between;
			.ongbutns{
				color: #FFFFFF;
				text-align: center;
			}
		}
		.fixs_list{
			position: fixed;
			bottom: -100%;
			left: 0;
			width: 0;
			height: 100%;
			overflow: scroll;
			background: #edf0f5;
			z-index: 1000;
			.fix_los{
				display: flex;
				width: calc(100% - 40upx);
				padding: 0 20upx;
				height: 90upx;
				line-height: 90upx;
				background: #FFFFFF;
				margin-bottom: 2upx;
				.fitx_les{
					flex: 1;
					font-size: 30upx;
				}
				.stsb{
					display: flex;
					align-items: center;
					.scks{
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
			background: rgba(0,0,0,.5);
			z-index: 888;
			.isswflist{
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
				.isstop{
					color: $uni-color-primary;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 30upx;
				}
				.isstops{
					padding-bottom: 20upx;
				}
			}
			.show {
				-webkit-transform: translateY(0);
				transform: translateY(0);
			}
		}
		.btnfixd{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			line-height: 110upx;
			text-align: center;
			display: flex;
			.payment{
				flex: 1;
				height: 110upx;
				color: #FFFFFF;
				background: #F48F00;
			}
			.upmessages{
				flex: 1;
				height: 110upx;
				color: #FFFFFF;
				background: #F48F00;
			}
			.deletes{
				flex: 1;
				height: 110upx;
				color: #FFFFFF;
				background: red;
			}
		}
		.black_mus {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.5);
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
			.usarbotm{
				width: 100%;
				padding: 40upx 0;
				display: flex;
				align-items: center;
				font-size: 30upx;
				.stname{
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					.stve{
						padding: 0 15upx;
						height: 40upx;
						line-height: 40upx;
						border-radius: 8upx;
					}
					.stnamet{
						border: 2upx solid #999999;
						color:#999999;
					}
					.stnames{
						background: $uni-color-primary;
						border: 2upx solid $uni-color-primary;
						color:#FFFFFF;
					}
				}
			}
		}
		.show {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
		.navstop{
			position: relative;
			width: calc(100% - 80upx);
			padding: 20upx 40upx 140upx 40upx;
			font-size: 28upx;
			color: #FFFFFF;
			background: #109DED;
			.lisst{
				position: absolute;
				left: 0;
				top: 110upx;
				width: calc(100% - 40upx);
				padding:  0 20upx;
				.citst{
					width: 100%;
					.cits_t{
						width: calc(100% - 40upx);
						padding: 20upx;
						background: #F5FAFD;
						border-top-left-radius: 15upx;
						border-top-right-radius: 15upx;
						color: #333333;
						line-height: 40upx;
					}
					.cits_b{
						width: calc(100% - 40upx);
						color: #333333;
						padding: 0 20upx;
						background: #FFFFFF;
						border-bottom-left-radius: 15upx;
						border-bottom-right-radius: 15upx;
						.cits_bt{
							display: flex;
							line-height: 50upx;
							align-items: center;
							justify-content: space-between;
							.cits_bts{
								flex: 1;
							}
						}
					}
				}
				.btuserlist{
					width: 100%;
					margin-top: 20upx;
					border-radius: 15upx;
					background: #FFFFFF;
					.btuse{
						color: #C8C7CC;
						width: calc(100% - 40upx);
						padding: 20upx;
						.btul{
							margin-top: 10upx;
							color: #333333;
							.user_t{
								display: flex;
								width: 100%;
								height: 50upx;
								line-height: 50upx;
								font-size: 28upx;
								.user_l{
									flex: 3;
								}
								.user_os{
									flex: 7;
									text-align: left;
								}
								.user_o{
									flex: 6;
									display: flex;
									justify-content: flex-end;
									align-items: center;
									.uses_sp{
										margin-left:20upx;
										height: 40upx;
										line-height: 40upx;
										border-radius: 5upx;
										padding: 2upx 6upx;
										background: red;
										color: #FFFFFF;
									}
									.uses_st{
										margin-left:20upx;
										height: 40upx;
										line-height: 40upx;
										border-radius: 5upx;
										padding: 2upx 6upx;
										background: #FF9000;
										color: #FFFFFF;
									}
								}
								.user_r{
									flex: 2;
									justify-content: flex-end;
									display: flex;
									color: #FF9000;
								}
								.user_t{
									flex: 3;
								}
							}
						}
					}
					.liass{
						width: calc(100% - 40upx);
						padding: 0 20upx;
						display: flex;
						color: #C8C7CC;
						line-height: 80upx;
						.liass_l{
							font-size: 35upx;
							flex: 1;
						}
						.liass_r{
							color: #333333;
							text-align: right;
							flex: 2;
						}
						.liass_p{
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
