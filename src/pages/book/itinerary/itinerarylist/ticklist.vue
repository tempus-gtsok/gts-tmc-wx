<template>
	<view class="trandetails">
		<headnavigation titles="机票详情"></headnavigation>
		<view class="navstop">
			<view class="">
				订单号：{{cont.sale.no}}
			</view>
			<view class="cits_bls">
				<view class="cits_sgs">
					￥{{cont.salePrice}}
				</view>
			</view>
			<view class="lisst">
				<view class="citst" style="margin-top: 30upx;">
					<view class="cits_t">
						<view style="color: #FF3404;display: flex;">
							<view style="flex: 1;">订单状态:{{cont.sale.statusName}}</view>
							<!-- <view style="color: #007aff;" @click="flights">航班动态</view> -->
						</view>
						<view class="cits_sa">
							<view class="no_ts" style="display: flex;"> 
								<image :src="cont.imss" mode="" style="width: 35upx;height: 30upx;padding-top: 15upx;"></image>
								{{company(cont.airline)}}{{cont.flightNo}}
							</view>
							<view class="no_t" style="text-align: right;">
								{{yeada(cont.departTime,1)}}
							</view>
						</view>
						<view class="citys">
							<view class="citys_l">
								<view class="scis_t">
									{{yeada(cont.factDepartTime,0)}}
								</view>
								<view class="scis_o">
									{{citys(cont.depart)}}<view v-if="cont.arriveTerminal != null && cont.arriveTerminal != undefined">{{cont.arriveTerminal}}</view>
								</view>
								<view class="scis_b">
								</view>
							</view>
							<view class="citys_l">
								<view class="scis_t">
								</view>
								<view class="scis_s">
									{{busdate(cont.factDepartTime,cont.factArriveTime)}}
									<view class="sci_l">
									</view>
									<view class="sci_r">
									</view>
								</view>
							</view>
							<view class="citys_l">
								<view class="scis_t">
									{{yeada(cont.factArriveTime,0)}}
								</view>
								<view class="scis_o">
                  {{citys(cont.arrive)}}<view v-if="cont.arriveTerminal != null && cont.arriveTerminal != undefined">{{cont.arriveTerminal}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="cits_b">
						<view class="cits_bl">
							<view class="cits_sg" >
								票价￥{{cont.salePrice}} 机建￥{{cont.taxFee}} 燃油￥{{cont.fuelFee}}
							</view>
						</view>
					</view>
				</view>
					<view class="btuserlist" >
						<view class="btuse" >
							乘机人
							<view class="btul">
								<view class="user_t">
									<view class="user_l">
										{{cont.factName}}
									</view>
									<view class="user_o" style="margin-left: 88upx;">
										成人票
									</view>
									<view style=" color: #007aff;">
										{{cont.statusName}}
									</view>
								</view>
								<view class="user_t">
									<view class="user_l">
										{{catype(cont.cardType)}}
									</view>
									<view class="user_o">
										{{cont.cardNo}}
									</view>
								</view>
								<view class="user_t">
									<view class="user_l">
										手机号
									</view>
									<view class="user_o">
										{{cont.phone}}
									</view>
								</view>
							</view>
						</view>
						<view class="liass">
							<view class="liass_l">
								联系信息
							</view>
							<view class="liass_r">
								{{cont.sale.contacts}}　{{cont.sale.contactPhone}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import airports from '../../sselect-city/airports.js'
	import certifi from '@/api/certificate.js'
	import order from '@/api/order.js'
	export default{
		data(){
			return{
				cont:{},
				hang:[],
				weeks:['一','二','三','四','五','六','日'],
				address:[],
				lefts:0,
				rights:0,
			}
		},
		onLoad(item) {
			this.cont = JSON.parse(item.data);
			this.cont['imss'] = 'http://file.feiren.com/00/02/' + this.cont.airline + '.png';
			this.lefts = item.left;
			this.rights = item.right;
		},
		mounted(){
			this.slet();
		},
		methods:{
			rblcok(){
				uni.redirectTo({
					url:'../itinerary?left=' + this.lefts + '&right=' + this.rights
				})
			},	
			citys(its){//回显城市
				for (let j = 0; j < this.address.length; j++) {  //循环城市
					if(this.address[j].airportCode == its){
						return this.address[j].cityCName
					}
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
			times(items,index){ //去除时间的小和钟字
				let item = "";
				if(index == 0){
					item = items[0];
				} else {
					item = items[1];
				}
				item = item.replace("小",'');
				item = item.replace("钟",'');
				return item
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
			async slet(){
				const ret = await certifi.queryAirlineList();//获取航空公司名称
				this.hang = ret.data.airlineDds; //航空公司名
				this.address = airports.addressAirportAll; //航空名字
			},
			company(ie) {
				for (let s in this.hang) {
					if (ie == s) {
						ie = this.hang[s];
						return ie;
					}
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
	.trandetails{
		position: absolute;
		width: 100%;
		height: 100%;
		padding-bottom: 300upx;
		background: #F5F5F5;
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
				top: 150upx;
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
									font-size: 35upx;
                  display: flex;
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
