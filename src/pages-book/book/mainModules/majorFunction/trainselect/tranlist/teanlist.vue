<template>
	<view class="tranlist">
		<loading>
		</loading>
		
		<headnavigation titles="订单填写"></headnavigation>
		<view class="tan_top">
			<view class="tan_t_t">
				<view class="tants_t">
					{{times(taanlist.item.dats)}}
					{{type(taanlist.item.trainClass)}}
				</view>
				<view class="tans_o">
					<view class="tans_os tanst" style="text-align: left;">
						{{taanlist.item.fromTime}}
					</view>
					<view class="tans_os tans_li">
						<view class="">
							{{timey(taanlist.item.runTimeSpan)}}
						</view>
						<view class="tancks">
							<view class="iconfont" style="font-size: 35upx;">
								&#xe64f;
							</view>
							<view class="iconfont" style="font-size: 35upx;">
								&#xe64f;
							</view>
						</view>
					</view>
					<view class="tans_os tanst" style="text-align: right;">
						<view style="text-align: right;flex: 5;">
							{{taanlist.item.toTime}}
						</view>
						<view style="font-size: 20upx;line-height: 32upx;text-align: left;" v-if="taanlist.item.days > 0">
							+{{taanlist.item.days}}
						</view>
					</view>
				</view>
				<view class="tans_o">
					<view class="tans_tl">
						{{taanlist.item.fromStation}}
					</view>
					<view class="tans_tr">
						{{taanlist.item.toStation}}
					</view>
				</view>
			</view>
			<view class="tan_bt" @click="gettrainWs">
				经停站>
			</view>
		</view>
		<view class="trambtm">
			<view class="trlist" v-for="(item,index) in taanlist.item.seats" :key="index">
				<view class="trasli">
					{{item.seatName}}
				</view>
				<view class="trasli" style="text-align: center;" v-if="item.seats >= 0">
					{{item.seats}}张
				</view>
				<view class="trasli" style="text-align: center;" v-else>
					{{item.seats}}
				</view>
				<view class="trasli" style="color: #FF9000;text-align: center;">
					￥{{item.price}}
				</view>
				<view class="trasli" style="display: flex;align-items: center;justify-content: center;">
					<view class="traybt trayes" v-if="item.seats > 0 || item.seats == '有'" @click="oktran(item)">
						预定
					</view>
					<view class="traybt trano" v-else>
						无票
					</view>
				</view>
			</view>
		</view>
		<view class="fixs_list" :class="fxli ? 'shows' : 'hides'">
			<view class="Navigation">
				<view @click="fxli = false" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
				<view class="ongbutn">
					经停站
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
		<view class="staleve" v-if="staleve" @click="staleve = false">
			<view class="stalist" @click.stop>
				<view class="statop" v-if="nativeTrainl.length > 0">
					<view class="reds">
						<view class="ts_text">
							座位等级超规
						</view>
					</view>
					<view class="setlist" v-for="(item,index) in nativeTrainl" :key="index">
						<view class="setbod" v-if="item.name == 4">
							<view class="styul">
								<view class="styli_top">
									不可预定
								</view>
								<view class="stulis">
									<view class="styli_left">
										超规人员:
									</view>
									<view class="styli_right">
										{{item.list}}
									</view>
								</view>
							</view>
						</view>
						<view class="setbod" v-if="item.name == 5 && !notbooking">
							<view class="styul">
								<view class="styli_top">
									超规需重新审核
								</view>
								<view class="stulis">
									<view class="styli_left">
										超规人员:
									</view>
									<view class="styli_right">
										{{item.list}}
									</view>
								</view>
							</view>
						</view>
						<view class="setbod" v-if="item.name == 2 && !notbooking">
							<view class="styul">
								<view class="styli_top">
									超规不必选择原因
								</view>
								<view class="stulis">
									<view class="styli_left">
										超规人员:
									</view>
									<view class="styli_right">
										{{item.list}}
									</view>
								</view>
							</view>
						</view>
						
						<view class="setbod" v-if="item.name == 3 && !notbooking">
							<view class="styul">
								<view class="styli_top">
									超规必须选择原因
								</view>
								<view class="stulis">
									<view class="styli_left">
										超规人员:
									</view>
									<view class="styli_right">
										{{item.list}}
									</view>
								</view>
							</view>
							<view class="styul">
								<view class="stulis">
									<view class="styli_left">
										超规原因:
									</view>
									<view class="styli_right">
										<view class="wors">
											<picker :range="rulesReasons" :range-key="'chineseDesc'" @change="chineseChange($event)">
												{{ rulesReasons[chines.index].chineseDesc }} 
											</picker>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="btnsti" v-if="!notbooking">
					<view class="roblck" @click="staleve = false">
						取消
					</view>
					<view class="btnok" @click="cits_btn">
						继续预定
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import order from '@/api/order.js'
	import tork from '@/api/torowk.js'
	export default {
		data() {
			return {
				isblckt:false,//事前是否2次审批
				chines:{
					index:0
				},
				isarsrl: false,//改签因公是否需要审核
				astlis: [], //当前座位信息
				notbooking: false,
				idstarle: false,
				rulesReasons: [],
				nativeTrainl: [],
				pricdesc: '', //座位等级超规原因
				nativeTrainRules: [], //座位等级超规信息
				staleve: false,
				fxli: false,
				
				
				taanlist: {},
				tasi: [{
					name: 'GDC-高铁/动车/城际',
					id: 'GDC'
				}, {
					name: 'Z-直达特快',
					id: 'Z'
				}, {
					name: 'KT-空调特快',
					id: 'KT'
				}, {
					name: ',KKS-空调快速',
					id: ',KKS-空调快速'
				}, {
					name: 'GDC-高铁/动车/城际',
					id: 'GDC'
				}],
				trklist: [], //经停站
			}
		},
		onLoad(tms) {
			let dat = JSON.parse(tms.data);
			this.taanlist = dat;
		},
		mounted() {
			
		},
		methods: {
			chineseChange(e){//选择高等级超规原因
				this.chines.index = e.detail.value;
			},
			cits_btn() {
				let datlist = {}
				if (this.idstarle) {
					for (let k in this.nativeTrainRules) {
						if (k == 3) {
							if(this.chines.index==0){
								this.showToasts('请选择超规原因！');
								return
							}
							this.nativeTrainRules[k] = {
								usernames: this.nativeTrainRules[k],
								reasons: this.rulesReasons[this.chines.index].chineseDesc
							}
						}
					}
				}
				this.othotrlis(); //跳转订单页面
			},
			async oktran(item) { //点击预定判断是否超规
				this.isblckt = false;
				this.astlis = item;
				if(this.taanlist.isbtd == 2){ //因私
					this.othotrlis(); //跳转订单页面
				} else if(this.taanlist.isbtd == 1) { //因公
					let ast = [];
					let arr = [];
					if(this.taanlist.isblcks == 4){
						arr = this.taanlist.userlistnos;
						for (let i = 0; i < arr.length; i++) {
							ast.push({
								passengerNo: arr[i]
							})
						}
					} else {
						let sarr = this.taanlist.butalist;
						
						for (let i = 0; i < sarr.length; i++) {
							arr.push(sarr[i].passengerNo)
							ast.push({
								passengerNo: sarr[i].passengerNo
							})
						}
					}
					
					try{
						let rest = await order.judgeApprv({passengerNos:arr});//判断当前出行人是否都免审
						
						if(rest.code == 200){
							if(rest.data == true){ //判断是否需要审核 true为不需要审核
								this.isarsrl = true;
							}
						} else {
							this.showToasts(rest.message);
							return
						}
					}catch(e){
						console.log(e)
						
					}
					let dat = {
						seatLimit: item.seatName,
						passengerList: ast
					}
					
					try{
						const res = await tork.checkTrainRule(dat);//获取是否超规
						
						if (res.code == 200) {
							//1=只记录不提示，2=提示超规不必选择原因，3=提示超规必选原因，4=不可预定
							if (res.data.nativeTrainRules != undefined) {
								this.nativeTrainRules = res.data.nativeTrainRules;
							}
							this.rulesReasons = res.data.rulesReason; //原因
							this.rulesReasons.unshift({chineseDesc:'　'})
							if (JSON.stringify(this.nativeTrainRules) == '{}') { //没有违反政策直接跳到预定页面
								this.othotrlis(); //跳转订单页面
							} else {
								this.nativeTrainl = [];
								for (let i in this.nativeTrainRules) {
									if (i == 4) {
										this.notbooking = true;
									}
									if (i == 3) {
										this.idstarle = true
									}
									if (i != 1 && i != 5) {
										this.nativeTrainl.push({
											name: i,
											list: this.nativeTrainRules[i]
										})
									}
									if(i == 5 && this.taanlist.isblcks == 1){
										this.isblckt = true;
										this.nativeTrainl.push({
											name: i,
											list: this.nativeTrainRules[i]
										})
									}
								}
								if (this.nativeTrainl.length > 0) {
									this.staleve = true;
								} else {
									this.othotrlis(); //跳转订单页面
								}
							}
						} else {
							this.showToasts(res.message)
						}
					}catch(e){
						console.log(e)
						
					}
				}
			},
			othotrlis() {
				let data = {
					ranst: this.taanlist,
					nativeTrainRules: this.nativeTrainRules,
					astlis: this.astlis,
					isarsrl: this.isarsrl,//是否免审
					isblckt: this.isblckt,//事前是否2次审批
				}
				uni.navigateTo({
					url: './reanadlist?data=' + JSON.stringify(data)
				})
			},
			async gettrainWs() { //获取当前经停站
				
				let dat = this.taanlist.item.dats.split('-');
				let tis = dat[0] + dat[1] + dat[2];
				try{
					const res = await tork.trainWs({
						trainNo: this.taanlist.item.trainNo,
						trainDate: tis
					})
					
					if (res.code == 200) {
						
						this.trklist = res.data.stations;
						this.fxli = true;
					}
				}catch(e){
					console.log(e)
					
				}
			},
			timey(time) {
				let dat = parseInt(time / 60);
				let sti = ''
				if (time > dat * 60) {
					sti = time - (dat * 60);
					return '约' + dat + '时' + sti + '分'
				} else {
					return '约' + dat + '时'
				}
			},
			times(item) {
				let tiem = item.split('-');
				return tiem[0] + ' 年' + tiem[1] + '月' + tiem[2] + '日'
			},
			type(item) {
				for (let i = 0; i < this.tasi.length; i++) {
					if (this.tasi[i].id.indexOf(item) != -1) {
						return this.tasi[i].name
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.tranlist {
		width: 100%;

		.Navigation {
			width: 100%;
			height: 90upx;
			display: flex;
			align-items: center;
			background: linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);

			.ongbutn {
				width: 86%;
				color: #FFFFFF;
				text-align: center;

			}
		}

		.staleve {
			position: fixed;
			left: 0;
			top: 0;
			width: calc(100% - 100upx);
			height: 100%;
			padding: 0 50upx;
			background: rgba(0, 0, 0, .3);
			z-index: 100;
			display: flex;
			align-items: center;
			justify-content: center;

			.stalist {
				width: 100%;
				border-radius: 20upx;
				min-height: 300upx;
				font-size: 35upx;
				line-height: 90upx;
				background: #F1F1F1;

				.statop {
					padding: 20upx;

					.reds {
						width: 100%;
						height: 70upx;
						text-align: center;
						display: flex;
						align-items: center;
						justify-content: center;
						color: red;

						.ts_text {
							padding: 0 20upx;
							line-height: 50upx;
							border-radius: 50upx;
							border: 2upx solid red;
						}
					}

					.setlist {
						line-height: 50upx;
						font-size: 30upx;
						margin: 10upx 0;

						.setbod {
							border: 2upx solid #FFFFFF;
							border-radius: 15upx;

							.styul {
								width: 100%;
								margin: 10upx 0;

								.styli_top {
									width: 100%;
									color: red;
									text-align: center;
									font-size: 30upx;
									line-height: 45upx;
								}

								.stulis {
									display: flex;

									.styli_left {
										width: 25%;
										display: flex;
										align-items: center;
										justify-content: flex-end;
									}

									.styli_right {
										width: 75%;
										margin-left: 5%;

										.wors {
											width: 80%;
											font-size: 30upx;
											height: 60upx;
											line-height: 60upx;
											border: 2upx solid $uni-color-primary;
											border-radius: 15upx;
										
											picker{
												width: 100%;
												height: 50upx;
												text-indent: 20upx;
												border-radius: 15upx;
												overflow: hidden;
											}
										}
									}
								}
							}
						}
					}
				}

				.btnsti {
					width: 100%;
					height: 90upx;
					line-height: 90upx;
					text-align: center;
					display: flex;

					.roblck {
						flex: 1;
						height: 90upx;
						background: #FFFFFF;
						border-bottom-left-radius: 15upx;
					}

					.btnok {
						flex: 1;
						height: 90upx;
						border-bottom-right-radius: 15upx;
						color: #FFFFFF;
						background: linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);
					}
				}
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

		.tan_top {
			width: calc(100% - 30upx);
			margin: 15upx;

			.tan_t_t {
				width: calc(100% - 40upx);
				border-top-left-radius: 15upx;
				border-top-right-radius: 15upx;
				padding: 20upx 20upx 40upx 20upx;
				color: #FFFFFF;
				font-size: 35upx;
				background: #4089E8;

				.tants_t {
					line-height: 70upx;
					margin-bottom: 20upx;
				}

				.tans_o {
					display: flex;

					.tans_os {
						flex: 1;
						text-align: center;

						.tancks {
							display: flex;
						}
					}

					.tanst {
						line-height: 70upx;
						font-size: 50upx;
						display: flex;
					}

					.tans_li {
						line-height: 35upx;
					}

					.tans_tl {
						flex: 1;
						text-align: left;
					}

					.tans_tr {
						flex: 1;
						text-align: right;
					}
				}
			}

			.tan_bt {
				width: 100%;
				height: 70upx;
				border-bottom-left-radius: 15upx;
				border-bottom-right-radius: 15upx;
				background: #FFFFFF;
				line-height: 70upx;
				font-size: 30upx;
				text-indent: 20upx;
			}
		}

		.trambtm {
			width: 100%;
			margin-top: 40upx;

			.trlist {
				padding: 0 20upx;
				font-size: 30upx;
				width: calc(100% - 40upx);
				height: 90upx;
				line-height: 90upx;
				display: flex;
				flex-wrap: wrap;
				align-content: space-between;
				background: #FFFFFF;
				margin-bottom: 2upx;

				.trasli {
					flex: 1;

					.traybt {
						width: 140upx;
						height: 60upx;
						text-align: center;
						line-height: 60upx;
						border-radius: 10upx;
						color: #FFFFFF;
					}

					.trayes {
						background: #FF9000;
					}

					.trano {
						background: #0066CB;
					}
				}
			}
		}
	}
</style>
