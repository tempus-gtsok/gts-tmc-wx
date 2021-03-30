<template>
	<view class="trandetails">
		<loading>
		</loading>
		<view class="Navigations">
			<view class="smtis">
				<view @click="rblcok" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
			</view>
			<view class="ongbutns">
				退废单详情
			</view>
			<view class="smtis">
			</view>
		</view>
		<view class="navstop" v-if="dtolist.status">
			<view class="">
				订单号：{{dtolist.no}}
			</view>
			<view class="">
				销售单号：{{dtolist.saleNo}}
			</view>
			<view class="">
				退废状态：{{rest(dtolist.status)}}
			</view>
			<view class="">
				申请时间：{{dtolist.createTime}}
			</view>
			<view class="lisst">	
				<view class="citst" style="margin-top: 30upx;" v-for="(item,index) in orderDetailListy" :key="index">
					<view class="cits_t">
						<view class="cits_sa">
							<view class="no_ts" style="display: flex;"> 
								<view style="color: #007aff;border: #007aff 1upx solid;width: 40upx;height: 40upx;margin-top: 10upx;text-align: center;line-height: 40upx;">
									{{item.name}}
								</view>
								<image :src="item.ims" mode="" style="width: 35upx;height: 30upx;padding-top: 15upx;"></image>
								{{company(item.city.airline)}}{{item.city.flightNo}}
							</view>
							<view class="no_t" style="text-align: right;">
								{{yeada(item.city.departDate,1)}}
							</view>
						</view>
						<view class="citys">
							<view class="citys_l">
								<view class="scis_t">
									{{yeada(item.city.departDate,0)}}
								</view>
								<view class="scis_o">
									{{citys(item.city.depart)}}
								</view>
								<view class="scis_b">
								</view>
							</view>
							<view class="citys_l">
								<view class="scis_t">
								</view>
								<view class="scis_s">
									{{busdate(item.city.departDate,item.city.arriveTime)}}
									<view class="sci_l">
									</view>
									<view class="sci_r">
									</view>
								</view>
							</view>
							<view class="citys_l">
								<view class="scis_t">
									{{yeada(item.city.arriveTime,0)}}
								</view>
								<view class="scis_o">
									{{citys(item.city.arrive)}}
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<view class="btuserlist" >
					<view class="btuse">
						乘机人
						<view class="btul" v-for="(item,index) in newuserlist" :key="index">
							<view class="user_t">
								<view class="user_l">
									{{item.name}}
								</view>
								<view class="user_o" >
									成人票
								</view>
							</view>
							<view class="user_t">
								<view class="user_l">
									出差事由
								</view>
								<view class="user_o">
									{{Reason}}
								</view>
							</view>
							<view class="user_t">
								<view class="user_l">
									服务费
								</view>
								<view class="user_o">
									{{item.refundTips}} 元
								</view>
							</view>
							<view class="user_t">
								<view class="user_l">
									手续费
								</view>
								<view class="user_o">
									{{(item.tips + item.refundFee)}} 元
								</view>
							</view>
							<view class="user_t" v-if="item.refundAmount != null">
								<view class="user_l">
									实际应退
								</view>
								<view class="user_o">
									{{item.refundAmount}} 元
								</view>
							</view>
							<view class="user_t">
								<view class="user_l">
									{{catype(item.cardType)}}
								</view>
								<view class="user_o">
									{{item.cardNo}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btnfixd">
			<view class="tobeaudited" v-if="orderStatus== 3">
				待审批
			</view>
			<view class="tobeaudited" v-if="dtolist.status == 7">
				已完成
			</view>
		</view>
		<view class="black_mus" @click="shos = false" v-if="shos"></view>
	</view>
</template>

<script>
	import airports from '@/pages/book/sselect-city/airports.js'
	import certifi from '@/api/certificate.js'
	import order from '@/api/order.js'
	export default{
		data(){
			return{
				newuserlist: [],//乘客信息
				Reason:'出差事由',//出差事由
				dtolist: {},//改签单详情
				orderDetailListy: [],
				costs: false,
				blac_show: false,
				shos: false,
				orderStatus: '',//订单状态
				userlist:[],//乘客列表
				stlist: [{
						name: '新申请',
						id:1
					},{
						name: ':已取消',
						id:2
					},{
						name: '待审批',
						id:3
					},{
						name: '已拒绝',
						id:4
					},{
						name: '待提交',		
						id:5
					},{
						name: '已提交',
						id:6
					},{
						name: '已完成',
						id:7
					},{
						name: '待客户审核',
						id:8
					},{
						name: '已驳回',
						id:9
					}],
				codes: 0,
				
				
				hang: [],
				weeks:['一','二','三','四','五','六','日'],
				isclsks: false,//是否从列表点进详情
				accountInfo:{},  //联系信息
				orderDetailList:[] ,//飞机票详情信息
				ist:0
			}
		},
		onLoad(item) {
			this.ist = item.ist;
			this.codes = item.code;
			this.isclsks = item.isck;
		},
		mounted() {
			this.slet();
			this.address = airports.addressAirportAll; //航空名字		审批通过待支付
		},
		methods:{
			citys(its){//回显城市
				for (let j = 0; j < this.address.length; j++) {  //循环城市
					if(this.address[j].airportCode == its){
						return this.address[j].cityCName
					}
				}
			},
			userstatus(it){		//乘客当前状态
				if(it == 0){
					return '已取消'
				} else if(it == 1){
					return '正常'
				} else if(it == 2){
					return '改签'
				} else if(it == 3){
					return '废退'
				}
			},
			timels(time){
				if(time.length < 19){
					return time + ':00'
				} else {
					return time
				}
			},
			catype(it){//返回证件类型
				if(it == 'NI'){
					return '身份证'
				} else if(it == 'PP'){
					return '护照'
				} else if(it == 'TB'){
					return '台胞证'
				} else if(it == 'GA'){
					return '港澳通行证'
				} else if(it == 'HX'){
					return '回乡证'
				} else if(it == 'OS'){
					return '其他证件'
				}
			},
			yeada(item,num){
				if(num == 0){
					return item.substring(11,16)
				} else if(num == 1){
					let week = new Date(item.replace(/-/g, '/')).getDay();
					if(week == 0){
						week = 7
					}
					let ts = item.substring(5,10).split('-');
					return ts[0] + '月' + ts[1] + '日' + ' 周' + this.weeks[week-1]
				}
			},
			busdate(num,num1){//总时长
				let st = Date.parse(new Date(num.replace(/-/g, '/')));
				let st1 = Date.parse(new Date(num1.replace(/-/g, '/')));
				let dat = st1 - st;
				let fs = dat/1000/60 ;//一共多少分钟
				let hours = parseInt(fs/60);//多少小时
				let tims = fs - hours * 60;//于多少分钟
				if(tims > 0){
					return hours + '时' + tims + '分'
				} else {
					return hours + '时'
				}
			},
			company(ie) {
				for (let s in this.hang) {
					if (ie == s) {
						ie = this.hang[s];
						return ie;
					}
				}
			},
			async slet(){
				let that = this;
				
				try{
					const rea = await order.orderRefundDetail({no: this.codes});//查询当前航班信息
					const ret = await certifi.queryAirlineList();//获取航空公司名称
					
					if(rea.code == 200){
						that.Reason = rea.data.saleRefund.reason;//出差事由
						that.dtolist = rea.data.saleRefund;//改签单信息
						that.hang = ret.data.airlineDds; //航空公司名
						that.orderStatus = rea.data.saleRefund.status;//退费单状态
						
						let forshowlist = rea.data.needShowSaleRefundItemList;//城市乘客信息
						let citylists = rea.data.sale.voyages;
						let obj = {};
						forshowlist = forshowlist.reduce(function(item, next) { //数据对象去重
							obj[next.cardNo] ? '' : obj[next.cardNo] = true && item.push(next);
							return item;
						}, []);
						that.newuserlist = forshowlist
						let frocitylist = [];
						if(rea.data.needShowGoFlightInfo == 1){
							frocitylist.push({
								name: '往',
								city:citylists[0]
							})
						}
						if(rea.data.needShowBackFlightInfo == 1){
							frocitylist.push({
								name: '返',
								city: citylists[1]
							})
						}
						for (let k in frocitylist) {
							frocitylist[k]['ims'] = 'http://file.feiren.com/00/02/' + frocitylist[k].city.airline + '.png'  //航空公司图标
						}
						
						that.orderDetailListy = frocitylist;
						
					} else {
						that.showToasts(rea.massage);
					}
				}catch(e){
					console.log(e)
					
				}
			},
			rest(ite){
				let arr = this.stlist;
				for(let i in arr){
					if(arr[i].id == ite){
						return arr[i].name
					}
				}
			},
			rblcok(){
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
	.trandetails{
		width: 100%;
		padding-bottom: 300upx;
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
			.onright{
				font-size: 30upx;
				padding-right: 10upx;
				color: #FFFFFF;
			}
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
			line-height: 100upx;
			color:#FFFFFF;
			background: #F48F00;
			text-align: center;
			font-size: 30upx;
			.payment{
				width: 100%;
				height: 110upx;
				color: #FFFFFF;
				background: #F48F00;
			}
			.tobeaudited{
				width: 100%;
				height: 110upx;
				color: #FFFFFF;
				background: #999999;
			}
				line-height: 100upx;
				text-align: center;
				display: flex;
			.updatas{
					width: 50%;
					height: 100upx;
					color: #FFFFFF;
					background: #F48F00;
					border-bottom-left-radius: 15upx;
				}
			.deletes{
				width: 50%;
				height: 100upx;
				color: #FFFFFF;
				background: red;
				border-bottom-right-radius: 15upx;
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
			.show {
				-webkit-transform: translateY(0);
				transform: translateY(0);
			}
			.lisst{
				position: absolute;
				left: 0;
				top: 200upx;
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
						.cits_sa{
							display: flex;
							.no_t{
								flex: 2;
								width: 100%;
								height: 60upx;
								line-height: 60upx;
							}
							.no_ts{
								flex: 5;
								width: 100%;
								height: 60upx;
								line-height: 60upx;
							}
						}
						.citys{
							width: 100%;
							display: flex;
							.citys_l{
								flex: 1;
								text-align: center;
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;
								.scis_t{
									line-height: 60upx;
									font-size: 55upx;;
								}
								.scis_o{
									line-height: 80upx;
									font-size: 35upx;;
								}
								.scis_b{
									line-height: 60upx;
									font-size: 28upx;
									color: #C8C7CC;
								}
								.scis_s{
									position: relative;
									margin: 0 auto;
									border-radius: 35upx;
									width: 130upx;
									line-height: 35upx;
									height: 35upx;
									color: $uni-color-primary;
									border: 2upx solid $uni-color-primary;
									.sci_l{
										position: absolute;
										width: 30upx;
										height: 2upx;
										background: $uni-color-primary;
										top: 16upx;
										right: 130upx;
									}
									.sci_r{
										position: absolute;
										width: 30upx;
										height: 2upx;
										background: $uni-color-primary;
										top: 16upx;
										left: 130upx;
									}
								}
							}
						}
					}
					.cits_b{
						width: calc(100% - 80upx);
						color: $uni-color-primary;
						padding: 0 40upx;
						height: 90upx;
						background: #FFFFFF;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.cits_bl{
							display: flex;
							.cits_cl{
								width: 130upx;
								height: 45upx;
								line-height: 45upx;
								text-align: center;
								background: #FFFFFF;
								color:#72b2de;
								border-radius: 45upx;
							}
							.cits_sg{
								flex:1;
								color:#8a8a8a;
								
							}
						}
					}
					.Check{
						line-height: 100upx;
						text-align: center;
						display: flex;
						.updatas{
								width: 50%;
								height: 100upx;
								color: #FFFFFF;
								background: #F48F00;
								border-bottom-left-radius: 15upx;
							}
						.deletes{
							width: 50%;
							height: 100upx;
							color: #FFFFFF;
							background: red;
							border-bottom-right-radius: 15upx;
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
						font-size: 35upx;
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
								.user_o{
									flex: 5;
								}
								.user_r{
									flex: 4;
									justify-content: flex-end;
									display: flex;
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
							flex: 1.7;
						}
						.liass_p{
							font-size: 35upx;
							color: #FF9000;
						}
					}
				}
			}
		}
	}
</style>

 