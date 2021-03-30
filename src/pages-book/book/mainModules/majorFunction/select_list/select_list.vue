<template>
	<view class="select_list">
		<view class="black_mu" @click="isshow" v-if="blac_show"></view>
		<loading></loading>
		<view class="isswflist" :class="switfal ? 'show' : ''">
			<view class="talist" v-for="(item,index) in stlist" :key="index" @click="adduslit(item)">
				<view class="tl_left">
					<view class="tl_tops">
						<view class="tl_rightl">
							{{newicname(item.citys.vehicle)}}
						</view>
						<view class="tl_rights">
							{{newstaname(item.citys)}}
						</view>
					</view>
					<view class="tl_bots">
						{{newdata(item.citys)}}
					</view>
					<view class="tl_botsb">
						出差事由：{{item.reson}}
					</view>
				</view>
				<view class="tl_right">
					<view class="tldv">
						确定
					</view>
				</view>
			</view>
		</view>
		<view class="Navigations" :style="{paddingTop:navPaddingTops + 'rpx'}">
			<view class="smtis">
				<view @click="rblcok" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
			</view>
			<view class="btn_top">
				<view class="btn_top_bl" :class="btnchend? 'clik':''" @click="itck('left')">
					因公
				</view>
				<view class="btn_top_bl" :class="!btnchend? 'clik':''" @click="itck('right')">
					因私
				</view>
			</view>
			<view class="smtis">
			</view>
		</view>
		
		<view class="boxbgd">
			<view class="bgrd">
				<image v-if="currentPage == 'Planeticket'" src="https://file.feiren.com/gss/public_tms_04.png" mode=""></image>
				<image v-if="currentPage == 'Train'" src="https://file.feiren.com/gss/public_tms_02.png" mode=""></image>
				<image v-if="currentPage == 'Hotel'" src="https://file.feiren.com/gss/public_tms_03.jpg" mode=""></image>
			</view>
			<view class="boxlist" ref="boxlist">
				<view class="box_top" v-if="boxli && currentPage != 'Train'">
					<view class="box_top_box" :class="isbox? 'isboxs':''" @click="boxclick('left')">
						单程
					</view>
					<view class="box_top_box" :class="!isbox? 'isboxs':''" @click="boxclick('right')">
						往返
					</view>
					<view :class="isbox? 'box_zhon':'box_zhons'">
					</view>
				</view>
				<view class="box_bottom" :class="[boxli ? 'boxli':'boxlis',currentPage == 'Train' ? ' box_bottoms':'']">
					<view class="box_tos">
						<view class="in_chox" @click="bts_k" v-if="(tccrBeforeMiddle == 1 || tccrBeforeMiddle == 0  ) && sitsj">
							<view class="iconfont" :style="bt_bol? 'color:#6E46FE':'color: #C0C0C0'">{{ btns }}</view>
							使用出差预订
						</view>
						<view class="in_chox" @click="bt_s" v-if="extendOne == 1 && currentPage == 'Planeticket'">
							<view class="iconfont" :style="bt_sbol? 'color:#6E46FE':'color: #C0C0C0'">{{ btnsw }}</view>
							公务机票
						</view>
					</view>
					<view class="cit_it">
						<view class="cu_time">
							<ss-city :isretun="isretun" :current="currentPage"></ss-city>
						</view>
						<view class="cu_time">
							<calendar :isretun="isretun" :currentlist="currentPage" :ishtoel="ishtoel" @change="lischang" :singleDate="singleDate"
							 :startDate="startDate" :current="currentPage" :endDate="endDate"></calendar>
						</view>
					</view>
					<view class="cl_bts" v-if="currentPage == 'Train'" @click="bts_ks">
						<view class="iconfont" :style="bt_bols? 'color:#6E46FE':'color: #C0C0C0'">{{ btnst }}</view>
						只看高铁/动车
					</view>
					<view class="cit_its" v-if="currentPage == 'Hotel'" @click="startClick">
						<view class="cit_itsde" v-if="wx_hotels">
							<view>
								{{wx_hotels}}
							</view>
							<view class="iconfont" style="color: #C8C7CC;" @click.stop="delets">
								&#xe641;
							</view>
						</view>

						<view style="color: #C0C0C0;" v-else>
							关键字/位置/品牌/酒店名
						</view>
					</view>
					<view class="cit_it">
						<view class="cu_time" v-if="isbtd == 1 || (currentPage != 'Planeticket' && isbtd == 2)">
							<passenger :isretun="isretun" ref="passengers"></passenger>
						</view>
						<view class="bt_col" @click="Ticket_Inquiry" v-if="rotes(selecttype)">
							{{btn_ck}}查询
						</view>
					</view>
				</view>
			</view>
		</view>
		<tabBar :currentPage="currentPages"></tabBar>
	</view>
</template>

<script>
	import tabBar from '@/components/view/Navigations.vue'
	import {
		mapState
	} from 'vuex';
	import login from '@/api/login.js'
	import tork from '@/api/torowk.js'
	import ssCity from '@/components/view/book/ss-city/ss-city.vue' //城市
	import calendar from '@/components/view/book/date-picker/date-picker.vue'; //日期
	import passenger from '@/components/view/book/passenger/passenger.vue'
	export default {
		data() {
			return {
				navPaddingTops:0,
				tccrBeforeMiddle: 9,
				extendOne: '', //政府采购
				currentPages: 'Book',
				sitsj: true,
				selecttype: '',
				isretun: false,
				stlist: [],
				switfal: false,
				blac_show: false,
				ishtoel: 'search',
				isbox: true,
				boxli: true, //是否能单程
				isbtd: 1, //因公还是因私
				isblcks: 2, //是否是出差预定
				btnchend: true,
				btns: '\ue80c',
				btnst: '\ue80c',
				btnsw: '\ue618',
				startDate: '', //默认开始时间
				endDate: '', //默认结束时间
				currentPage: '',
				btn_ck: '',
				bt_sbol: true,
				bt_bol: false,
				bt_bols: false,
				
				
				mokksli: {}, //使用出差预定是需要传的参数
			}
		},
		components: {
			calendar,
			ssCity,
			passenger,
			tabBar
		},
		computed: {
			...mapState([
				'userinfo',
				'vx_city_left', //搜索飞机的地址
				'tr_city_left', //搜索火车的地址
				'wx_Hotel', //搜索城市的酒店
				'wx_hotels', //搜索城市酒店的地址
				'butaluserlist', //人员
				'se_Singletime', //单程时间
				'se_doubletimel',
				'se_doubletimer', //往返时间
				'singleDate',
				'longitudelatitude'
			])
		},
		onLoad(item) {
			this.currentPage = item.type
			if (this.currentPage == 'Planeticket') { //飞机
				this.selecttype = 'tms:dps:query';
				this.boxli = true;
				this.$store.commit('singleDate_add', true);
			} else if (this.currentPage == 'Train') { //火车
				this.selecttype = 'tms:tra:query';
				this.boxli = false;
				this.$store.commit('singleDate_add', true);
			} else if (this.currentPage == 'Hotel') { //酒店
				this.selecttype = 'tms:hotel:list';
				this.boxli = false;
				this.$store.commit('singleDate_add', false);
			}
			// if(this.singleDate){
			//     this.isbox = true;
			// } else {
			//     this.isbox = false;
			// }
			if (this.singleDate) {
				if (JSON.stringify(this.se_Singletime) != '{}') {
					this.startDate = this.se_Singletime.re;
				} else {
					this.startDate = '2019-10-16';
				}
			} else {
				if (JSON.stringify(this.se_doubletimel) != '{}') {
					this.startDate = this.se_doubletimel.re;
					this.endDate = this.se_doubletimer.re;
				} else {
					this.startDate = '2020-3-10';
					this.endDate = '2020-3-12';
				}
			}
		},
		mounted() {
			// #ifdef MP-WEIXIN
			let res=wx.getMenuButtonBoundingClientRect();
			this.navPaddingTops = res.top + res.height - 5;
			// #endif
			
			// 返回值
				// width 	number 	宽度，单位：px
				// height 	number 	高度，单位：px
				// top 	number 	上边界坐标，单位：px
				// right 	number 	右边界坐标，单位：px
				// bottom 	number 	下边界坐标，单位：px
				// left 	number 	左边界坐标，单位：px
			this.infoimgs();
		},
		methods: {
			async infoimgs() {
				if (uni.getStorageSync('TB_ddvalue') != null && uni.getStorageSync('TB_ddvalue') != undefined && uni.getStorageSync(
						'ul_dding') != '') {
					let rec = await login.accountlogins({
						sessionId: uni.getStorageSync('TB_ddvalue')
					}); //钉钉直接登录
					if (rec.code == 200) {
						uni.setStorageSync("user_list" + uni.getStorageSync('appWxId'), rec.data);
						uni.removeStorageSync('TB_ddvalue');
					}
				}
				const userinfo = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //登录信息
				if (userinfo) {
					if (this.currentPage == 'Planeticket') {
						this.bts_b();
					}
					this.$refs['passengers'].colllist();
					this.tccrBeforeMiddle = userinfo.tccrBeforeMiddle;
					let datas = uni.getStorageSync('userinfo' + uni.getStorageSync('appWxId')); //个人信息
					if (datas) {
						this.$store.commit('butaluserlist_add', [{
							istrue: 1,
							passengerNo: datas.passengerVo.id, //暂时没有该参数
							userName: datas.user.name,
							userId: datas.user.id,
							deptName: datas.user.deptName,
							deptId: datas.user.deptId,
							phone: datas.user.phone,
							costcenterName: datas.user.customerName
						}]);
					}
				} else {
					this.$store.commit('logout');
					uni.reLaunch({
						url: '../../../login/login'
					})
				}
			},
			isshow() {
				this.blac_show = false;
				this.switfal = false;
			},
			delets() { //删除地址
				this.$store.commit('wx_hotels_Ai', '');
			},
			bts_ks() {
				if (this.bt_bols) {
					this.bt_bols = false;
					this.btnst = "\ue80c"
				} else {
					this.bt_bols = true;
					this.btnst = "\ue618";
				}
			},
			boxclick(item) { //单程或往返
				if (item == 'left') {
					if (this.isbox == false) {
						this.bt_bol = false;
						this.btns = '\ue80c';
						this.isretun = false;
						this.isblcks = 2;
						this.$store.commit('singleDate_add', true)
						this.isbox = true;
						if (JSON.stringify(this.se_Singletime) != '{}') {
							this.startDate = this.se_Singletime.re;
						} else {
							this.startDate = '2019-10-16';
						}
						this.endDate = '';
					}
				} else {
					if (this.isbox == true) {
						this.bt_bol = false;
						this.btns = '\ue80c';
						this.isretun = false;
						this.isblcks = 2;
						this.$store.commit('singleDate_add', false)
						this.isbox = false;
						if (JSON.stringify(this.se_doubletimel) != '{}') {
							this.startDate = this.se_doubletimel.re;
							this.endDate = this.se_doubletimer.re;
						} else {
							this.startDate = '2019-10-16';
							this.endDate = '2019-10-17';
						}
					}
				}
			},
			startClick() { //酒店地址搜索
				let list = this.wx_Hotel;
				let wx_hotels = this.wx_hotels;
				uni.navigateTo({
					url: '/pages/book/sselect-city/selectcity?sta=right&type=' + this.currentPage + '&list=' + list + '&wx_hotels=' + wx_hotels
				});
			},
			itck(item) {
				if (item == 'left') { //因公因私
					this.btnchend = true;
					this.isbtd = 1;
					this.sitsj = true;
				} else {
					//h5
					// #ifdef  H5 || MP-WEIXIN
					this.btns = '\ue80c';
					this.sitsj = false;
					this.bt_bol = false;
					this.btnchend = false
					this.isbtd = 2
					// #endif
					//app
					// #ifdef APP-PLUS
					this.showToasts('app端暂不支持因私')
					// #endif
				}
			},
			rblcok() { //返回
				// #ifdef H5
				history.back()
				// #endif
				// #ifdef MP-WEIXIN
				uni.navigateBack();
				// #endif
			},
			//政府采购
			async bts_b() {
				try {

					const res = await tork.getCompCustomerInfo();
					if (res.code == 200) {
						this.extendOne = res.data.extendOne;
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e)
				}
			},
			bt_s() {

				if (this.bt_sbol) {
					this.bt_sbol = false;
					this.btnsw = "\ue80c"
				} else {
					this.bt_sbol = true;
					this.btnsw = "\ue618";
				}
			},
			async bts_k() { //是否出差预定
				if (this.bt_bol == false) {
					let num = 0;
					if (this.currentPage == 'Planeticket' && this.isbox == true) { //飞机单程
						num = 1;
					} else if (this.currentPage == 'Train') { //火车
						num = 2;
					} else if (this.currentPage == 'Hotel') { //酒店
						num = 3;
					} else if (this.currentPage == 'Planeticket' && this.isbox == false) { //飞机往返
						num = 4;
					}
					
					try {
						const res = await tork.getAgreeApprvTask({
							type: num
						});
						
						if (res.code == 200) {
							if (res.data.length == 0) {
								this.showToasts("没有合适的出差申请！")
							} else {
								this.stlist = [];
								let dat = res.data;
								// console.log(dat)
								for (let i in dat) {
									if (num == 3) {
										for (let k in dat[i].tmsGssLink.applyHotels) {
											let datd = dat[i].tmsGssLink.applyHotels[k]
											datd.std = 6
											this.stlist.push({
												id: dat[i].tmsGssLink.applyHotels[k].id,
												reson: dat[i].reason, //出差事由
												citys: datd, //出差信息
												nams: dat[i].tmsGssLink.applyStaffs, //出差人
												sit: {
													deptName: dat[i].deptName, //部门名称
													deptId: dat[i].deptId, //部门id
													costId: dat[i].costId, //成本中心id
													costName: dat[i].costName, //成本中心名称
													travelNo: dat[i].travelNo, //出差单号
												}
											})
										}
									} else {
										if (num == 4) {
											let applivalist = [];
											let appflks = dat[i].tmsGssLink.applyVehicles;
											for (let k = 0; k < appflks.length; k++) {
												appflks[k].std = num;
												let nums = 0;

												for (let p in applivalist) {
													if (appflks[k].goBackGroup != null && appflks[k].goBackGroup != undefined) {
														if (applivalist[p].citys.goBackGroup == appflks[k].goBackGroup) {
															nums = 1;
														}
													}
												}
												if (nums == 0) {
													appflks[k].deptDates = appflks[k + 1].deptDate;
													applivalist.push({
														id: appflks[k].id,
														ids: appflks[k + 1].id,
														reson: dat[i].reason,
														citys: appflks[k], //出差信息
														nams: dat[i].tmsGssLink.applyStaffs, //出差人
														sit: {
															deptName: dat[i].deptName, //部门名称
															deptId: dat[i].deptId, //部门id
															costId: dat[i].costId, //成本中心id
															costName: dat[i].costName, //成本中心名称
															travelNo: dat[i].travelNo, //出差单号
														}
													})
												}
											}
											this.stlist = this.stlist.concat(applivalist);
										} else {
											for (let k in dat[i].tmsGssLink.applyVehicles) {
												let datd = dat[i].tmsGssLink.applyVehicles[k]
												datd.std = num
												this.stlist.push({
													id: dat[i].tmsGssLink.applyVehicles[k].id,
													reson: dat[i].reason,
													citys: datd, //出差信息
													nams: dat[i].tmsGssLink.applyStaffs, //出差人
													sit: {
														deptName: dat[i].deptName, //部门名称
														deptId: dat[i].deptId, //部门id
														costId: dat[i].costId, //成本中心id
														costName: dat[i].costName, //成本中心名称
														travelNo: dat[i].travelNo, //出差单号
													}
												})
											}
										}

									}
								}
								this.blac_show = true;
								this.switfal = true;
							}
						} else {
							this.showToasts(res.message);
						}
					} catch (e) {
						console.log(e)
						
					}


				} else {
					this.bt_bol = false;
					this.btns = '\ue80c';
					this.isretun = false;
					this.isblcks = 2;
				}
			},
			adduslit(item) { //确定
				let vehicleIdBack = 0;
				if (this.currentPage == 'Train') {
					this.$store.commit("tr_city_left_add", [{
						id: item.citys.deptCityCode,
						name: item.citys.deptCityName
					}, {
						id: item.citys.arrivCityCode,
						name: item.citys.arrivCityName
					}])
				} else if (this.currentPage == 'Planeticket') {
					this.$store.commit("vx_city_le_add", [{
						id: item.citys.deptCityCode,
						name: item.citys.deptCityName
					}, {
						id: item.citys.arrivCityCode,
						name: item.citys.arrivCityName
					}])
				} else if (this.currentPage == 'Hotel') {
					this.$store.commit("wx_Hotel_Ai", {
						id: item.citys.cityCode,
						name: item.citys.cityName,
						ts: false
					});
					this.$store.commit("wx_hotels_Ai", item.citys.remark)
				}
				if (item.citys.std == 6) { //酒店
					this.startDate = item.citys.inDate.substring(0, 10); //出行开始时间
					this.endDate = item.citys.outDate.substring(0, 10); //出行离开时间
				} else {
					if (item.citys.std == 4) { //飞机往返 或者 单程飞机和火车
						this.startDate = item.citys.deptDate.substring(0, 10); //出行开始时间
						this.endDate = item.citys.deptDates.substring(0, 10); //出行开始时间
						vehicleIdBack = item.ids;
					} else {
						this.startDate = item.citys.deptDate.substring(0, 10); //出行开始时间
						this.endDate = '';
					}
				}
				let userlis = [];
				for (var i = 0; i < item.nams.length; i++) { //出差人员
					userlis.push({
						phone: item.nams[i].phone,
						istrue: item.nams[i].tempPerson,
						passengerNo: item.nams[i].passengerNo,
						userName: item.nams[i].userName,
						userId: item.nams[i].id,
						vehicleId: item.id, //事前出差单id
						vehicleIdBack: vehicleIdBack
					})
				}
				this.$store.commit('butaluserlist_add', userlis);
				this.mokksli = item.sit;
				this.isretun = true;
				this.blac_show = false;
				this.switfal = false;
				this.bt_bol = true;
				this.btns = '\ue618';
				this.isblcks = 1;
			},
			newstaname(tm) { //回显城市名称
				console.log("goBack" + tm.goBack)
				console.log("ve " + tm.vehicle)
				if (tm.vehicle == 1 || tm.vehicle == 2) {
					return tm.deptCityName + '-' + tm.arrivCityName;
				} else {
					return tm.cityName + "　" + tm.remark
				}
			},
			newicname(tm) { //回显类型
				if (tm == 1) {
					return '[机票]'
				} else if (tm == 2) {
					return '[火车]'
				} else {
					return '[酒店]'
				}
			},
			newdata(tm) { //回显时间
				if ((tm.deptDate == null && tm.std != 6) || (tm.inDate == null && tm.outDate == null && tm.std == 6)) {
					console.log(111111)
					return
				}
				let sta = '';
				let stamon = '';
				let stadta = '';
				let end = '';
				let endmon = '';
				let enddta = '';
				if (tm.std != 6) {
					if (tm.std == 4) {
						sta = new Date(tm.deptDate.replace(/-/g, '/')); //出发日期
						stamon = this.dats(sta.getMonth() + 1);
						stadta = this.dats(sta.getDate());
						end = new Date(tm.deptDates.replace(/-/g, '/')); //到达日期
						endmon = this.dats(end.getMonth() + 1);
						enddta = this.dats(end.getDate());
					} else {
						sta = new Date(tm.deptDate.replace(/-/g, '/')); //出发日期
						stamon = this.dats(sta.getMonth() + 1);
						stadta = this.dats(sta.getDate());
					}
				} else {
					sta = new Date(tm.inDate.replace(/-/g, '/')); //出发日期
					stamon = this.dats(sta.getMonth() + 1);
					stadta = this.dats(sta.getDate());
					end = new Date(tm.outDate.replace(/-/g, '/')); //到达日期
					endmon = this.dats(end.getMonth() + 1);
					enddta = this.dats(end.getDate());
				}
				if (tm.goBack == 3) {
					return stamon + '月' + stadta + '日' + '　出发'
				} else if (tm.std == 4) {
					if (tm.goBack === 2) {
						return endmon + '月' + enddta + '日' + '　出发　' + stamon + '月' + stadta + '日' + ' 返回'
					} else if (tm.goBack === 1) {
						return stamon + '月' + stadta + '日' + '　出发　' + endmon + '月' + enddta + '日' + ' 返回'
					}
				} else if (tm.std == 6) {
					return stamon + '月' + stadta + '日' + '　入住　' + endmon + '月' + enddta + '日' + ' 离店'
				} else if (tm.std == 2) {
					if (tm.goBack === 2) {
						return stamon + '月' + stadta + '日' + '　出发　'
					} else if (tm.goBack === 1) {
						return stamon + '月' + stadta + '日' + '　出发　'
					}
				}
			},
			dats(it) {
				if (it < 10) {
					return '0' + it
				} else {
					return it
				}
			},
			lischang(item) {
				let that = this;
				if (that.singleDate) { //是单程还是往返
					that.$store.commit('se_Singletime_add', item.choiceDate)
				} else {
					that.$store.commit('se_doubletimel_add', item.choiceDate[0])
					that.$store.commit('se_doubletimer_add', item.choiceDate[1])
				}
			},
			Ticket_Inquiry() {
				let isbtd = this.isbtd; //因公还是因私 1为因公
				let isblcks = this.isblcks; //是否出差预定 1为是
				let st = this.tccrBeforeMiddle; //用户是事前还是事中
				if (st == 1 && isblcks == 2 && isbtd == 1) {
					uni.showToast({
						title: '请使用出差预定！',
						duration: 1000,
						icon: 'none'
					});
					return
				}
				let rtime = this.se_doubletimel.re; //开始时间
				let etime = this.se_doubletimer.re; //结束时间
				let nams = this.wx_Hotel.name; //城市
				let butaluserlist = this.butaluserlist; //人员
				console.log(butaluserlist)
				if (this.currentPage == 'Planeticket') {
					let bool = true;
					if (this.isbox == true) {
						if (this.vx_city_left[0].name == "") {
							this.showToasts("请选择出发城市")
							bool = false;
						}
					} else {
						if (this.vx_city_left[0].name == "") {
							this.showToasts("请选择出发城市")
							bool = false;
						}
					}
					if (butaluserlist.length == 0) {
						this.showToasts('请选择出行人！')
						return
					} else if(butaluserlist.length > 9){
						this.showToasts('出行人数不能大于9人！')
						return
					}
					if (this.currentPage == 'Planeticket' && this.isbtd == 2) {
						butaluserlist = [];
					}
					if (bool == true) {
						let dateFang = null;
						let datw = {};
						if (this.isbox == true) {
							if (this.extendOne == 1 && this.bt_sbol == true) {
								datw = {
									mokksli: this.mokksli,
									type: this.currentPage,
									city: this.vx_city_left[0],
									citys: this.vx_city_left[1],
									timedate: this.se_Singletime.re,
									butalist: butaluserlist, //人员
									none: 'single',
									isblcks: isblcks, //1事前2事中
									isbtd: isbtd, //1因公2因私
									civilServiceTicket: '1' //是否选中
								}
							} else if (this.extendOne == 1 && this.bt_sbol == false) {
								datw = {
									mokksli: this.mokksli,
									type: this.currentPage,
									city: this.vx_city_left[0],
									citys: this.vx_city_left[1],
									timedate: this.se_Singletime.re,
									butalist: butaluserlist, //人员
									none: 'single',
									isblcks: isblcks, //1事前2事中
									isbtd: isbtd, //1因公2因私
									civilServiceTicket: '0' //是否选中
								}
							} else if (this.extendOne == 0) {
								datw = {
									mokksli: this.mokksli,
									type: this.currentPage,
									city: this.vx_city_left[0],
									citys: this.vx_city_left[1],
									timedate: this.se_Singletime.re,
									butalist: butaluserlist, //人员
									none: 'single',
									isblcks: isblcks, //1事前2事中
									isbtd: isbtd, //1因公2因私
								}
							}
							uni.setStorageSync("ticketinquiry_data", JSON.stringify(datw));
							uni.navigateTo({
								url: '../ticketInquiry/ticketinquiry'
							})
						} else {
							if (this.extendOne == 1 && this.bt_sbol == true) {
								datw = {
									mokksli: this.mokksli,
									type: this.currentPage,
									city: this.vx_city_left[0],
									citys: this.vx_city_left[1],
									timedate: this.se_doubletimel.re,
									timedates: this.se_doubletimer.re,
									butalist: butaluserlist, //人员
									none: 'returns',
									isblcks: isblcks, //1事前2事中
									isbtd: isbtd, //1因公2因私
									civilServiceTicket: '1' //是否选中
								}
							} else if (this.extendOne == 1 && this.bt_sbol == false) {
								datw = {
									mokksli: this.mokksli,
									type: this.currentPage,
									city: this.vx_city_left[0],
									citys: this.vx_city_left[1],
									timedate: this.se_doubletimel.re,
									timedates: this.se_doubletimer.re,
									butalist: butaluserlist, //人员
									none: 'returns',
									isblcks: isblcks, //1事前2事中
									isbtd: isbtd, //1因公2因私
									civilServiceTicket: '0' //是否选中
								}
							} else if (this.extendOne == 0) {
								datw = {
									mokksli: this.mokksli,
									type: this.currentPage,
									city: this.vx_city_left[0],
									citys: this.vx_city_left[1],
									timedate: this.se_doubletimel.re,
									timedates: this.se_doubletimer.re,
									butalist: butaluserlist, //人员
									none: 'returns',
									isblcks: isblcks, //1事前2事中
									isbtd: isbtd //1因公2因私
								}
							}
							uni.setStorageSync("ticketinquiry_data", JSON.stringify(datw));
							uni.navigateTo({
								url: '../ticketInquiry/ticketinquiry'
							})
						}
					}
				} else if (this.currentPage == 'Hotel') {
					if (butaluserlist.length == 0) {
						this.showToasts('请选择出行人！')
						return
					}

					let datw = {
						mokksli: this.mokksli,
						city: nams,
						citys: this.wx_hotels,
						se_doubletimel: rtime,
						se_doubletimer: etime,
						butalist: butaluserlist, //人员
						isblcks: isblcks,
						isbtd: isbtd
					}
					uni.navigateTo({
						url: '../hotelselect/hotelselect?data=' + JSON.stringify(datw)
					})
				} else if (this.currentPage == "Train") {
					if (butaluserlist.length == 0) {
						this.showToasts('请选择出行人！')
						return
					} else if(butaluserlist.length > 5){
						this.showToasts('出行人数不能大于5人！')
						return
					}
					let datw = {
						mokksli: this.mokksli,
						city: this.tr_city_left[0],
						citys: this.tr_city_left[1],
						timedate: this.se_Singletime.re,
						butalist: butaluserlist, //出行人员
						sit: this.bt_bols, //是否只搜高铁
						isblcks: isblcks, //1事前2事中
						isbtd: isbtd //1因公2因私
					}
					uni.navigateTo({
						url: '../trainselect/trainselect?data=' + JSON.stringify(datw)
					})
				}
			}
		}
	}
</script>

<style>
	page{
		background: #E5E5E5;
	}
</style>
<style scoped lang="scss">
	$brgk_blue: linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);

	.select_list {
		width: 100%;
		

		.black_mu {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: black;
			opacity: 0.5;
			z-index: 888;
		}

		.isswflist {
			position: fixed;
			bottom: 0;
			left: 0;
			transition: all 0.3s ease;
			-webkit-transform: translateY(100%);
			transform: translateY(100%);
			max-height: 50%;
			overflow-y: scroll;
			width: 100%;
			z-index: 1200;
			background: #ffffff;

			.talist {
				width: 100%;
				border-top: 2upx solid #E5E5E5;
				padding: 20upx 0;
				display: flex;

				.tl_left {
					height: 120upx;
					width: 78%;
					margin-left: 2%;

					.tl_tops {
						display: flex;
						width: 100%;
						height: 50upx;
						font-size: 35upx;
						line-height: 50upx;
						color: #333333;

						.tl_rightl {
							width: 20%;
						}

						.tl_rights {
							width: 80%;
							margin-left: 10upx;
							overflow: hidden;
							text-overflow: ellipsis; //文本溢出显示省略号
							white-space: nowrap; //文本不会换行
						}
					}

					.tl_bots {
						width: 100%;
						height: 40upx;
						font-size: 30upx;
						line-height: 30upx;
					}

					.tl_botsb {
						width: 100%;
						height: 40upx;
						font-size: 30upx;
						line-height: 30upx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}

				.tl_right {
					width: 20%;
					height: 120upx;
					display: flex;
					align-items: center;
					justify-content: center;

					.tldv {
						width: 100upx;
						height: 50upx;
						line-height: 50upx;
						text-align: center;
						font-size: 30upx;
						color: #E5E5E5;
						background: $uni-color-primary;
						border-radius: 60upx;
					}
				}
			}
		}

		.isswflist::-webkit-scrollbar {
			display: none;
		}

		.show {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}

		.Navigations {
			width: 100%;
			height: 90upx;
			width: 100%;
			/*  #ifdef  APP-PLUS || MP-WEIXIN */
			// padding-top: 75upx;
			/*  #endif  */
			display: flex;
			align-items: center;
			background: $brgk_blue;

			.btn_top {
				width: 280upx;
				height: 55upx;
				border-radius: 55upx;
				border: 2upx solid #FFFFFF;
				display: flex;
				margin-left: 22%;

				.btn_top_bl {
					width: 140upx;
					height: 55upx;
					color: #FFFFFF;
					font-size: 35upx;
					line-height: 55upx;
					text-align: center;
					border-radius: 55upx;
					border: 0;
				}

				.clik {
					background: #FFFFFF;
					color: #6E46FE;
				}
			}
		}

		.boxbgd {
			width: 100%;
			position: relative;

			.bgrd {
				width: 100%;
				height: 400upx;
				image {
					width: 100%;
					height: 100%;
				}
			}

			.boxlist {
				position: absolute;
				top: 311upx;
				left: 30upx;
				width: calc(100% - 60upx);
				padding: 0;
				.box_top {
					position: relative;
					font-size: 35upx;
					width: 100%;
					height: 90upx;
					background: rgba(0, 0, 0, 0.5);
					border-top-left-radius: 15upx;
					border-top-right-radius: 15upx;
					display: flex;
					justify-content: space-between;

					.box_zhon {
						position: absolute;
						width: 3%;
						height: 110upx;
						border-radius: 15upx;
						background: #FFFFFF;
						top: 0;
						left: calc(49% - 13upx);
						transform: rotate(-10deg);
					}

					.box_zhons {
						position: absolute;
						width: 3%;
						height: 110upx;
						border-radius: 15upx;
						background: #FFFFFF;
						top: 0;
						right: calc(49% - 13upx);
						transform: rotate(8deg);
					}

					.box_top_box {
						width: 49%;
						height: 90upx;
						line-height: 90upx;
						text-align: center;
						color: #FFFFFF;
						border-top-left-radius: 15upx;
						border-top-right-radius: 15upx;
					}

					.isboxs {
						background: #FFFFFF;
						color: #333333;
					}
				}

				.box_bottoms {
					border-top-left-radius: 15upx;
					border-top-right-radius: 15upx;
				}

				.box_bottom {
					width: 100%;
					background: #FFFFFF;
					padding: 20upx 0;

					.box_tos {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.in_chox {
							display: flex;
							height: 60upx;
							font-size: 35upx;
							line-height: 60upx;
							text-indent: 30upx;
							color: #C0C0C0;
						}
					}

					.cl_bts {
						width: calc(100% -60upx);
						margin: 0 20upx;
						padding-left: 20upx;
						color: #C0C0C0;
						height: 90upx;
						border-bottom: 2upx solid #F1F1F1;
						font-size: 35upx;
						display: flex;
						align-items: center;
					}

					.cit_its {
						width: 94%;
						font-size: 35upx;
						margin: 0 3%;
						height: 90upx;
						border-bottom: 2upx solid #F1F1F1;
						line-height: 90upx;

						.cit_itsde {
							display: flex;
							justify-content: space-between;
						}
					}

					.cit_it {
						width: 94%;
						margin: 0 3%;

						.cu_time {
							width: 100%;
							border-bottom: 2upx solid #F1F1F1;
						}

						.bt_col {
							margin-top: 20upx;
							width: 100%;
							height: 100upx;
							color: #FFFFFF;
							font-size: 40upx;
							text-align: center;
							line-height: 100upx;
							border-radius: 110upx;
							background: $brgk_blue;
						}
					}
				}

				.boxli {
					border-bottom-right-radius: 15upx;
					border-bottom-left-radius: 15upx;
				}

				.boxlis {
					border-radius: 15upx;
				}
			}
		}
	}
</style>
