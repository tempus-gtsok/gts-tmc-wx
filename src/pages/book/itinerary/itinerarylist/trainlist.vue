<template>
	<view class="trandetails">
		<loading>
		</loading>
		<headnavigation titles="车票详情"></headnavigation>
		<view class="fixs_list" :class="fxli ? 'shows' : 'hides'">
			<view class="Navigation">
				<view @click="fxli = false" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
				<view class="ongbutn">
					经停站
				</view>
				<view class="smtis">
				</view>
			</view>
			<view class="fix_los" v-for="(item,index) in trklist" :key="index">
				<view class="fitx_les stsb">
					<view class="scks">
						{{index + 1}}
					</view>
					{{item.fromStation}}
				</view>
				<view class="fitx_les" style="text-align: center;">
					{{item.departureTime}}
				</view>
				<view class="fitx_les" v-if="index != 0" style="text-align: center;">
					停{{item.stayTimeSpan}}分钟
				</view>
				<view class="fitx_les" v-if="index == 0" style="text-align: center;">
					--
				</view>
			</view>
		</view>
		<view class="navstop" v-if="Object.keys(cont).length != 0">
			<view class="">
				订单号：{{cont.saleOrderNo}}
			</view>
			<view class="lisst">
				<view class="citst">
					<view class="cits_t">
						<view class="no_t" v-if="cont.passenagerTicketNo != null">
							取票号:{{cont.passenagerTicketNo}}
						</view>
						<view class="citys">
							<view class="citys_l">
								<view class="scis_t">
									{{cont.changeFromStation}}
								</view>
								<view class="scis_o">
									{{yeada(cont.departTime,0)}}
								</view>
								<view class="scis_b">
									{{yeada(cont.departTime,1)}}
								</view>
							</view>
							<view class="citys_l">
								<view class="scis_t">
									{{cont.trainno}}
								</view>
								<view class="scis_s" @click="gettrainWs">
									经停信息
									<view class="sci_l">
									</view>
									<view class="sci_r">
									</view>
								</view>
								<view class="scis_b">
									{{busdate(cont.departTime,cont.arrivalTime)}}
								</view>
							</view>
							<view class="citys_l">
								<view class="scis_t">
									{{cont.changeToStation}}
								</view>
								<view class="scis_o">
									{{yeada(cont.arrivalTime,0)}}
								</view>
								<view class="scis_b">
									{{yeada(cont.arrivalTime,1)}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="btuserlist">
					<view class="btuse">
						乘车人
						<view class="btul">
							<view class="user_t">
								<view class="user_l">
									{{cont.passenagerName}}
								</view>
								<view class="user_o">
									<view>
										成人票
									</view>
									<view style=" color: #007aff;">
										{{userstatus(cont.status)}}
									</view>
								</view>
								<view class="user_r">
									{{cont.changeSeatType}}￥{{cont.changeOrderPrice}}
								</view>
							</view>
							<view class="user_t">
								<view class="user_l">
									{{catype(cont.certType)}}
								</view>
								<view class="user_o">
									{{cont.certNo}}
								</view>
								<view class="user_r">
									{{cont.changeSeatClass}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tork from '@/api/torowk.js'
	export default{
		data(){
			return{
				cont:{},
				weeks:['一','二','三','四','五','六','日'],
				fxli: false,
				trklist: [],//经停站
				
				
				lefts:0,
				rights:0,
				cont:{}
			}
		},
		onLoad(item) {
			this.conts = JSON.parse(item.data);
			this.lefts = item.left;
			this.rights = item.right;
			if(this.conts.status == 9){
				this.getChangeInfoBySaleDetailNos();
			} else {
				this.cont = {
					saleOrderNo: this.conts.saleOrderNo,
					passenagerTicketNo:this.conts.ticketNo,
					changeFromStation:this.conts.fromstation,
					departTime: this.conts.departureTime,
					trainno:this.conts.trainno,
					changeToStation:this.conts.tostation,
					arrivalTime:this.conts.arrivalTime,
					passenagerName:this.conts.traPassenger.name,
					status:this.conts.status,
					changeSeatType:this.conts.seatclass,
					changeOrderPrice:this.conts.salePrice,
					certType:this.conts.traPassenger.certType,
					certNo:this.conts.traPassenger.certNo,
					changeSeatClass:this.conts.seatNo,
				}
			}
		},
		mounted() {
		},
		methods:{
			async getChangeInfoBySaleDetailNos(){
				try{
					let res = await tork.getChangeInfoBySaleDetailNo({
						saleOrderDeatailNo:this.conts.saleOrderDetailNo
					})
					if(res.code == 200){
						this.cont = res.data[0];
						this.cont['certType'] = this.conts.traPassenger.certType;
						this.cont['certNo'] = this.conts.traPassenger.certNo;
						this.cont['person'] = this.conts.saleOrder.person;
						this.cont['cellphone'] = this.conts.saleOrder.cellphone;
					}
				}catch(e){
				}
			},
			userstatus(it){//乘客当前状态
				if(it == 2){
					return '占座成功'
				} else if(it == 3){
					return '出票中'
				} else if(it == 4){
					return '已出票'
				} else if(it == 5){
					return '退票中'
				} else if(it == 6){
					return '改签中'
				} else if(it == 7){
					return '已退票'
				} else if(it == 8){
					return '已废弃'
				} else if(it == 9){
					return '已改签'
				} else if(it == 10){
					return '占座失败'
				} else if(it == 11){
					return '出票失败'
				}
			},
			rblcok(){
				uni.navigateBack({
					url:'../itinerary?left=' + this.lefts + '&right=' + this.rights
				})
			},
			async gettrainWs(){//获取当前经停站
				this.fxli = true;
				
				try{
					let dat = this.cont.departTime.substring(0,10).split('-');
					let tis = dat[0] + dat[1] + dat[2];
					const res = await tork.trainWs({
						trainNo: this.cont.trainno,
						trainDate: tis
					})
					
					if(res.code == 200){
						this.trklist = res.data.stations;
					} else {
						
						this.showToasts(res.message);
					}
				}catch(e){
					console.log(e);
					
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
		}
	}
</script>

<style scoped lang="scss">
	page{
		background-color: #F5F5F5;
	}
	.trandetails{
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
		.navstop{
			position: relative;
			width: calc(100% - 80upx);
			padding: 20upx 40upx 140upx 40upx;
			font-size: 28upx;
			color: #FFFFFF;
			background: #109DED;
			.cits_bls{
				display: flex;
			}
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
						.no_t{
							width: 100%;
							height: 60upx;
							line-height: 60upx;
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
									font-size: 35upx;;
								}
								.scis_o{
									line-height: 80upx;
									font-size: 55upx;;
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
									display: flex;
									justify-content: center;
									align-items: center;
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
									display: flex;
									justify-content: space-between;
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
