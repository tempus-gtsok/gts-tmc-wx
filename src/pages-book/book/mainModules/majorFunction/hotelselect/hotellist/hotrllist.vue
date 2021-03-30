<template>
	<view class="hotsl">
		<loading>
		</loading>

		<image class="imagest" v-if="!datrue" src="@/static/img/hotrllistbg.jpg" mode=""></image>
		<view v-if="datrue">

			<view class="hot_top">
				<bwSwiper :w_h="1.5" @clickItem="swipclik" :swiperList="swlist" :autoplay="isvideo" :indicatorDots="indicatorDots"></bwSwiper>
				<view class="rotblack" @click.stop="rotblck">
					<view class="iconfont" style="color: #FFFFFF;">
						&#xe61e;
					</view>
				</view>
				<!-- <image :src="datalist.imgUrl" mode=""></image> -->
				<view class="tirle">
					{{datalist.resName}}
				</view>
			</view>
			<view class="hotlists">
				<view class="intro" v-if="datalist.intro != undefined">
					<view v-html="isticons"></view>
					<view class="intcols" @click="intros" v-if="ist == true && datalist.intro.length > 66">收起</view>
					<view class="intcolt" @click="intrtos" v-if="ist == false && datalist.intro.length > 66">全文</view>
				</view>
				<view class="onbottms">
					<view class="onleft">
						<calendar @change="lischang" currentlist="Hotel" :isretun="isretun" :ishtoel="ishtoel" :singleDate="singleDate"
						 :startDate="startDate" :endDate="endDate"></calendar>
					</view>
					<view class="onselist">
						<view class="onprolistks" v-for="(item,index) in hotprolist" :key="index">
							<view class="onprolist" @click="openlist(item.istlong,index)" 
							 :style="{borderBottom:item.istlong == 1 ? '0':'2upx solid #eeeeee'}">
								<view class="onproleft" :style="{backgroundImage:item.imgUrl ? 'url('+item.imgUrl +')':'url(@/static/img/hotel-small-img2.jpg)'}">
								</view>
								<view class="optext">
									<view class="optile">{{item.resProName}}</view>
								</view>
								<view class="money">
									<view class="monsle">
										￥
									</view>
									{{item.minPrice}}
									<view class="mosrig">
										起
									</view>
									<view class="iconfont" v-if="item.istlong == 1" style="color: #007aff;font-size: 30upx;margin-left: 10upx;">&#xe8a7;</view>
									<view class="iconfont" v-if="item.istlong == 2" style="color: #007aff;font-size: 30upx;margin-left: 10upx;">&#xe628;</view>
								</view>
							</view>
							<view class="ontons" :class="item.istlong == 1 ? 'show' : 'hide'">
								<view :class="item.bookStatus == 0 ? 'resPros' : 'resPro'" v-for="(items,indexs) in item.resProBaseInfoList"
								 :style="{borderBottom:indexs == item.resProBaseInfoList.length - 1 ? '0':'2upx solid #eeeeee'}"
								 @click="Reserve(items,item)" :key="indexs">
									<view class="resPro_left">
										<view class="tiems">
											<view>
												{{items.supPriceName}}
											</view>
										</view>
										<view class="texs">
											<view v-if="items.breakfast != null">{{items.breakfast}},</view>&nbsp;{{items.bedTypeName}}
										</view>
										<view style="color: red;" v-if="items.proMinInventory != 0">
											剩余房间数量：{{items.proMinInventory}}
										</view>
									</view>
									<view class="resPro_right">
										<view class="res_poric">
											￥<text class="res_poricts">{{items.firPrice}}</text>
										</view>
										<view class="rse_erf" v-if="items.bookStatus != 0">
											<view class="rse_erf_top">
												预订
											</view>
											<view class="rse_erf_bot">
												{{cancel(items.cancelable)}}
											</view>
										</view>
										<view class="rse_erfs" v-if="items.bookStatus == 0 ">
											<view class="rse_erf_top_one">
												售空
											</view>
											<view class="rse_erf_bot">
												{{cancel(items.cancelable)}}
											</view>
										</view>
									</view>
									<view class="">
									</view>
								</view>
							</view>
						</view>
						<view class="stscity" v-if="hotprolist.length == 0 && istshow == true">
							抱歉，该日期所有房型已全部售完
						</view>
					</view>
				</view>
			</view>
			<!--		<view class="photos" :class="phts ? 'shows' : 'hides'" >
				<view class="posts_top">
					<view class="iconfont" @click="phts = false">
						&#xe61e;
					</view>
					<view class="posts_te">
						图片（{{ptoslist.length}} ）
					</view>
				</view>
				<view class="poslit">
					<view class="pslist" v-for="(item,index) in ptoslist" :key="index" @click="openpoto(item,index)">
						<image :src="item.imageUrl" mode=""></image>
					</view>
				</view>
			</view>-->
			<!--		<view class="openphtots" v-if="openslist" @click="openslist=false" @touchstart="start" @touchend="end">
				<image :src="openlipoth.img" mode="" ></image>
				<view class="opentext">
					<view class="opentextdv">
						{{lipoth(openlipoth.name)}}
					</view>
					<view class="opentextdv">
						{{openlipoth.index}} / {{ptoslist.length}}
					</view>
				</view>
			</view>-->
			<!--		<view class="address" @click="maplist(datalist.resGpsLocation,datalist.resName)">
				<view class="adrleft">
					<view class="iconsl" v-if="iconlost.length > 0">
						<view class="iconfont" v-if="iconlist(163)">&#xe627;</view>
						<view class="iconfont" v-if="iconlist(160)">&#xe69b;</view>
						<view class="iconfont" v-if="iconlist(205)">&#xe625;</view>
					</view>
					<view class="iconname">
			  <view v-if="datalist.provName != null">{{datalist.provName}}</view><view v-if="datalist.sectionName != null">{{datalist.sectionName}} </view> <view v-if="datalist.address != null">{{datalist.address}}</view>
					</view>
				</view>
				<view class="iconfont">
					&#xe61f;
				</view>
			</view>-->

			<view class="staleve" v-if="staleve" @click="staleve = false">
				<view class="stalist" @click.stop>
					<view class="statop" v-if="higlist.length > 0">
						<view class="reds">
							<view class="ts_text">
								高价超规
							</view>
						</view>
						<view class="setlist" v-for="(item,index) in higlist" :key="index">
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
											<!-- <select class="wors" v-model="pricdesc">
											    <option :value="items.chineseDesc" v-for="(items,indexs) in rulesReasons" :key="indexs">{{items.chineseDesc}}</option>
											</select> -->
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="statop" v-if="starlist.length > 0" style="border-top: 2upx solid #FFFFFF;">
						<view class="reds">
							<view class="ts_text">
								酒店星级超规
							</view>
						</view>
						<view class="setlist" v-for="(item,index) in starlist" :key="index">
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
										超规必选择原因
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
												<picker :range="rulesReasons" :range-key="'chineseDesc'" @change="chineseChanges($event)">
													{{ rulesReasons[chines.indexs].chineseDesc }}
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

	</view>
</template>

<script>
	import bwSwiper from '@/components/bw-swiper/bw-swiper.vue';
	import order from '@/api/order.js'
	import calendar from '@/components/view/book/date-picker/date-picker.vue'
	import tork from "@/api/torowk.js"

	export default {
		components: {
			calendar,
			bwSwiper
		},
		data() {
			return {
				isvideo: true,
				indicatorDots: false,
				swlist: [], //图片集合
				isones: 1, //是否刚进页面
				datrue: false,
				chines: {
					index: 0,
					indexs: 0,
				},
				istshow: false,
				timeslist: {}, //当前选择的时间对象
				hots_list: {}, //当前点击的房屋对象
				hots_pk: {}, //当前房型对象
				idstarle: false, //是否高价超规要选择原因
				idstarles: false, //是否酒店星级要选择原因
				pricdesc: '', //高价超规原因
				pricdesct: '', //酒店星级超规原因


				staleve: false,
				openlipoth: {},
				openslist: false,
				ptoslist: [],
				phts: false, //照片
				singleDate: false, //是否单程
				ishtoel: 'hotelist',
				hotelCode: '', //城市
				checkinDate: '', //开始时间
				checkoutDate: '', //结束时间
				datalist: {},
				citys: '',
				cityst: '',
				iconlost: [],
				startDate: '',
				endDate: '',
				sttime: '',
				endtime: '',
				searchHotelType: '',
				hotprolist: [], //房型
				datlist: {},
				rulesReasons: [], //超规类型
				rulesReasono: [], //超规类型2
				highLimit: {}, //高价政策
				starLevelLimit: {}, //酒店星级政策
				higlist: [], //高价政策报错
				starlist: [], //酒店政策报错
				notbooking: false, //是否价格政策不可预定
				isarsrl: false, //因公是否需要审核
				isretun: false,
				isticons: '', //简介
				ist: false,
				isblckt: false,
				channelData: null
			}
		},
		mounted() {
			if (this.datlist.isblcks == 1) {
				this.isretun = true
			}
			this.seleit();
		},
		created() {
			this.startX = 0;
		},
		onLoad(item) {
			this.datlist = JSON.parse(item.data);
			let dataw = this.datlist;
			this.hotelCode = dataw.hotelCode; //城市
			this.checkinDate = dataw.se_doubletimel; //开始时间
			this.checkoutDate = dataw.se_doubletimer; //结束时间
			this.startDate = dataw.se_doubletimel;
			this.endDate = dataw.se_doubletimer;
			this.searchHotelType = dataw.searchHotelType; //同城和艺龙
			this.citys = dataw.city;
			this.cityst = dataw.citys;
		},
		methods: {
			swipclik(item) { //点击图片

			},
			start(e) {
				this.startX = e.changedTouches[0].clientX;
			},
			end(e) {
				// console.log(e)
				const subX = e.changedTouches[0].clientX - this.startX;
				if (subX > 100) {
					console.log('右滑');
					let indes = this.openlipoth.index; //当前下标
					if (indes != 1) {
						this.openlipoth = {
							img: this.ptoslist[indes].imageUrl,
							index: indes - 1,
							name: this.ptoslist[indes].imageLabel
						}
					}
				} else if (subX < -100) {
					console.log('左滑');
					let indes = this.openlipoth.index; //当前下标
					if (indes != this.ptoslist.length) {
						this.openlipoth = {
							img: this.ptoslist[indes].imageUrl,
							index: indes + 1,
							name: this.ptoslist[indes].imageLabel
						}
					}
				} else {
					console.log('无效');
				}
			},
			intros() { //收起
				this.isticons = "简介:" + this.escape2Html(this.datalist.intro).replace(/\<br\>\<br\>/g, '\<br\/\>').substring(0, 54) +
					'...';
				this.ist = false;
			},
			intrtos() { //全文
				this.isticons = "简介:" + this.escape2Html(this.datalist.intro).replace(/\<br\>\<br\>/g, '\<br\/\>');
				this.ist = true;
			},
			cancel(it) {
				if (it == 'True') {
					return '可以取消'
				} else if (it == 'False') {
					return '不可取消'
				} else {
					return '条件取消'
				}
			},
			chineseChange(e) { //选择高等级超规原因
				this.chines.index = e.detail.value;
			},
			chineseChanges(e) { //选择高等级超规原因
				this.chines.indexs = e.detail.value;
			},
			cits_btn() { //继续预定
				if (this.idstarle && this.rulesReasons[this.chines.index].chineseDesc == '') {
					this.showToasts('请选择高价超规原因')
				} else if (this.idstarles && this.rulesReasons[this.chines.indexs].chineseDesc == '') {
					this.showToasts('请选择星级超规原因')
				} else {
					let datlist = {}
					if (this.idstarle) {
						for (let k in this.highLimit) {
							if (k == 3) {
								if (this.chines.index == 0) {
									this.showToasts('请选择高价超规原因！');
									return
								}
								this.highLimit[k] = {
									usernames: this.highLimit[k],
									reasons: this.rulesReasons[this.chines.index].chineseDesc
								}
							}
						}
					}
					if (this.idstarles) {
						for (let k in this.starLevelLimit) {
							if (k == 3) {
								if (this.chines.indexs == 0) {
									this.showToasts('请选择星级超规原因');
									return
								}
								this.starLevelLimit[k] = {
									usernames: this.starLevelLimit[k],
									reasons: this.rulesReasons[this.chines.indexs].chineseDesc
								}
							}
						}
					}
					this.staleve = false;
					this.othotrlis(); //跳转订单页面
				}
			},
			othotrlis() {
				let datast = {
					hots: {
						supPriceName: this.hots_list.supPriceName,
						breakfastCount: this.hots_list.breakfastCount,
						roomFeature: this.hots_list.roomFeature,
						supplierType: this.hots_list.supplierType,
						hotelCode: this.hots_list.hotelCode,
						proId: this.hots_list.proId,
						ratePlanCode: this.hots_list.ratePlanCode,
						vendorCode: this.hots_list.vendorCode,
						productUniqueId: this.hots_list.productUniqueId,
						bedTypeName: this.hots_list.bedTypeName,
						firPrice: this.hots_list.firPrice,
						// 是否可以取消
						cancelable: this.hots_list.cancelable,
						// 取消时限
						policyRemark: this.hots_list.policyRemark,
						// 取消条款信息
						bookingNotes: this.hots_list.bookingNotes,
						activityId: this.hots_list.activityId,
						guaranteeMode: this.hots_list.guaranteeMode,
						resId: this.hots_list.resId,
						rateCodeType: this.hots_list.rateCodeType,
						channelData: this.channelData
					}, //当前房屋信息
					hots_pk: this.hots_pk,
					highLimit: this.highLimit, //高价超规
					starLevelLimit: this.starLevelLimit, //酒店星级超规
					datlist: this.datlist, //出差人员
					datatiem: this.timeslist, //当前的时间
					datalist: {
						imgUrl: this.datalist.imgUrl,
						resName: this.datalist.resName,
						resId: this.hotelCode,
						cityName: this.datalist.cityName,
						address: this.datalist.address,
						resPhone: this.datalist.resPhone,
					}, //当前酒店信息
					isarsrl: this.isarsrl, //是否免审
					isblckt: this.isblckt, //事前是否2次审批
				}
				uni.setStorageSync("hotelreservation_data", JSON.stringify(datast));
				// return
				uni.navigateTo({
					url: './hotelreservation'
				})
			},
			async Reserve(item, it) {
				if (item.bookStatus != 0) {
					//点击进行预定 因公会进行差旅规则判断
					this.isblckt = false;
					this.hots_list = item;
					this.hots_pk = it;
					this.channelData = item.channelData;
					if (this.datlist.isbtd == 1 && (this.datlist.isblcks == 2 || this.datlist.isblcks == 1)) { //因公并且事中
						let pass = [];
						let palist = this.datlist.butalist;
						let arr = [];
						for (let i = 0; i < palist.length; i++) {
							arr.push(palist[i].passengerNo)
						}

						try {
							let rest = await order.judgeApprv({
								passengerNos: arr
							}); //判断当前出行人是否都免审
							if (rest.code == 200) {
								if (rest.data == true) { //判断是否需要审核 true为不需要审核
									this.isarsrl = true;
								}
							} else {
								this.showToasts(rest.message);
								return
							}
						} catch (e) {
							console.log(e)

						}
						for (let i in palist) {
							pass.push({
								passengerNo: palist[i].passengerNo
							})
						}
						let datw = {
							travelCity: this.datlist.city,
							resGradeId: this.datalist.resGradeId,
							firPrice: item.firPrice,
							passengerList: pass
						}
						try {
							let res = await tork.checkHotelRules(datw);

							if (res.code == 200) {
								//1=只记录不提示，2=提示超规不必选择原因，3=提示超规必选原因，4=不可预定

								if (res.data.result.highLimit != undefined) { //高价政策
									this.highLimit = res.data.result.highLimit;
								}
								if (res.data.result.starLevelLimit != undefined) { //酒店星级政策
									this.starLevelLimit = res.data.result.starLevelLimit;
								}
								if (this.highLimit.length == 0 && this.starLevelLimit.length == 0) { //没有违反政策直接跳到预定页面
									uni.navigateTo({
										url: './hotelreservation'
									})
								} else {
									this.higlist = [];
									this.starlist = [];
									for (let i in this.highLimit) {
										if (i == 4) {
											this.notbooking = true;
										}
										if (i == 3) {
											this.idstarle = true
										}
										if (i != 1 && i != 5) {
											this.higlist.push({
												name: i,
												list: this.highLimit[i]
											})
										}
										if (i == 5 && this.datlist.isblcks == 1) { //只有事前才有违规再次审批
											this.isblckt = true;
											this.higlist.push({
												name: i,
												list: this.highLimit[i]
											})
										}
									}
									for (let i in this.starLevelLimit) {
										if (i == 4) {
											this.notbooking = true;
										}
										if (i == 3) {
											this.idstarles = true
										}
										if (i != 1 && i != 5) {
											this.starlist.push({
												name: i,
												list: this.starLevelLimit[i]
											})
										}
										if (i == 5 && this.datlist.isblcks == 1) {
											this.isblckt = true;
											this.starlist.push({
												name: i,
												list: this.starLevelLimit[i]
											})
										}
									}
									console.log(111, this.higlist);
									if (this.starlist.length > 0 || this.higlist.length > 0) {
										this.staleve = true;
									} else {
										this.othotrlis(); //跳转订单页面
									}
								}
							} else {
								this.showToasts(res.message)
							}
						} catch (e) {
							console.log(e)

						}

					} else {
						this.othotrlis(); //跳转订单页面
					}
				}
			},
			async seleit() { //获取酒店详情
				let that = this;
				try {
					let rest = await tork.searchHotelPicture({ //获取图片信息
						hotelCode: that.hotelCode,
						searchHotelType: that.searchHotelType
					})
					if (rest.code == 200) {
						if (rest.data != null) {
							this.ptoslist = rest.data;
							let si = [];
							for(let k =0;k<5;k++){
								si.push({img:this.ptoslist[k].imageUrl,
								address: ''});
							}
							this.swlist = si;
						}
					} else {
						this.showToasts(rest.mssage);
					}
					let res = await tork.toHotelDetail({ //获取基本信息
						hotelCode: that.hotelCode,
						checkinDate: that.checkinDate,
						checkoutDate: that.checkoutDate
					});
					that.hotelProList();
					if (res.code == 200) {
						that.datalist = res.data.hotel;
						if (that.datalist != null) {
							that.iconlost = that.datalist.resFacilities;
						}
						that.rulesReasons = res.data.rulesReasons;
						that.rulesReasono = res.data.rulesReasons;
						this.rulesReasons.unshift({
							chineseDesc: '　'
						})
						let tirles = that.escape2Html(that.datalist.intro);
						if (tirles != null) {
							that.isticons = tirles.replace(/\<br\>\<br\>/g, '\<br\/\>');
							if (that.datalist.intro.length > 68) {
								this.intros();
							}
						}
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e)
				}

			},
			escape2Html(str) {
				if (str != null && str != '') {
					var arrEntities = {
						'lt': '<',
						'gt': '>',
						'nbsp': ' ',
						'amp': '&',
						'quot': '"'
					};
					return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) {
						return arrEntities[t];
					});
				}
				return str;
			},
			openpoto(item, index) { //点击当前图片
				this.openslist = true;
				this.openlipoth = {
					img: item.imageUrl,
					index: index + 1,
					name: item.imageLabel
				}
			},
			lipoth(name) {
				if (name == 1) {
					return '外观'
				} else if (name == 2) {
					return '大厅'
				} else if (name == 3) {
					return '周边'
				} else if (name == 4) {
					return '房型'
				} else if (name == 5) {
					return '浴室'
				} else if (name == 6) {
					return '餐厅'
				} else if (name == 7) {
					return '会议室'
				} else if (name == 8) {
					return '休闲'
				} else if (name == 9) {
					return '公共区域'
				} else if (name == 10) {
					return '游泳池'
				} else if (name == 11) {
					return '健身房'
				} else if (name == 12) {
					return '酒吧/休息室'
				} else if (name == 13) {
					return '客房设施'
				} else if (name == 14) {
					return '酒店设施'
				} else if (name == 14) {
					return '其他'
				} else {
					return name
				}
			},
			openlist(is, index) { //展开房型
				if (is == 1) {
					this.hotprolist[index].istlong = 2;
				} else {
					this.hotprolist[index].istlong = 1;
				}
				this.hotprolist = [...this.hotprolist];
			},
			lischang(item) {
				this.isones++;
				this.timeslist = item; //当前选择的时间
				this.sttime = item.choiceDate[0].re;
				this.endtime = item.choiceDate[1].re;
				if (this.isones > 2) {
					this.hotelProList();
				}
			},
			async hotelProList() { //获取房型
				let statime = "";
				let endtime = "";
				let that = this;
				if (that.sttime == '') {
					statime = that.startDate;
				} else {
					statime = that.sttime;
				}
				if (that.endtime == '') {
					endtime = that.endDate;
				} else {
					endtime = that.endtime;
				}
				that.istshow = false;
				try {
					let res = await tork.hotelProList({
						hotelCode: that.hotelCode, //酒店code
						checkinDate: statime, //入住时间
						checkoutDate: endtime, //离开时间
						searchHotelType: that.searchHotelType //同城或者艺龙
					})

					if (res.code == 200) {
						let datw = res.data
						for (var i = 0; i < datw.length; i++) {
							datw[i]['istlong'] = 2
						}
						that.hotprolist = datw;
						that.datrue = true;
						if (datw.length == 0) {
							that.istshow = true;
						}
					}
				} catch (e) {
					console.log(e)

					that.istshow = true;
				}

			},
			rotblck() { //返回
				// #ifdef H5
				history.back();
				// #endif
				// #ifdef MP-WEIXIN
				uni.navigateBack()
				// #endif
			},
			maplist(item, name) { //查看地图
				let tsl = this.bd_decrypt(item[0], item[1]);
				// #ifdef  H5 || MP-WEIXIN
				uni.openLocation({
					latitude: tsl.lat,
					longitude: tsl.lng,
					name: name,
					success: function(res) {}
				})
				//#endif
				//#ifdef APP-PLUS
				let latitude = tsl.lat;
				let longitude = tsl.lng;
				let url = "";
				if (plus.os.name == "Android") {
					let hasBaiduMap = plus.runtime.isApplicationExist({
						pname: 'com.baidu.BaiduMap',
						action: 'baidumap://'
					});
					let hasAmap = plus.runtime.isApplicationExist({
						pname: 'com.autonavi.minimap',
						action: 'androidamap://'
					});
					let urlBaiduMap =
						`baidumap://map/marker?location=${latitude},${longitude}&title=${name}&coord_type=gcj02&src=andr.baidu.openAPIdemo`
					urlBaiduMap = encodeURI(urlBaiduMap)
					let urlAmap =
						`androidamap://viewMap?sourceApplication=appname&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`
					// urlAmap = encodeURI(urlBaiduMap)
					console.log(urlAmap)
					if (hasAmap && hasBaiduMap) {
						plus.nativeUI.actionSheet({
							title: "选择地图应用",
							cancel: "取消",
							buttons: [{
								title: "百度地图"
							}, {
								title: "高德地图"
							}]
						}, function(e) {
							switch (e.index) {
								case 1:
									plus.runtime.openURL(urlBaiduMap);
									break;
								case 2:
									plus.runtime.openURL(urlAmap);
									break;
							}
						})
					} else if (hasAmap) {
						plus.runtime.openURL(urlAmap);
					} else if (hasBaiduMap) {
						plus.runtime.openURL(urlBaiduMap);
					} else {
						plus.nativeUI.alert("本机未安装指定的地图应用");
						// url = "geo:"+latitude+","+longitude+"?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82";
						// plus.runtime.openURL(url); //如果是国外应用，应该优先使用这个，会启动google地图。这个接口不能统一坐标系，进入百度地图时会有偏差
					}
				} else {
					// iOS上获取本机是否安装了百度高德地图，需要在manifest里配置，在manifest.json文件app-plus->distribute->apple->urlschemewhitelist节点下添加（如urlschemewhitelist:["iosamap","baidumap"]）
					plus.nativeUI.actionSheet({
						title: "选择地图应用",
						cancel: "取消",
						buttons: [{
							title: "Apple地图"
						}, {
							title: "百度地图"
						}, {
							title: "高德地图"
						}]
					}, function(e) {
						console.log("e.index: " + e.index);
						switch (e.index) {
							case 1:
								url =
									`http://maps.apple.com/?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82&ll=${latitude},${longitude}&spn=0.008766,0.019441`;
								break;
							case 2:
								url =
									`baidumap://map/marker?location=${latitude},${longitude}&title=${name}&content=${name}&src=ios.baidu.openAPIdemo&coord_type=gcj02`;
								break;
							case 3:
								url =
									`iosamap://viewMap?sourceApplication=applicationName&poiname=${name}&lat=${latitude}&lon=${longitude}&dev=0`
								break;
							default:
								break;
						}
						if (url != "") {
							url = encodeURI(url)
							plus.runtime.openURL(url, function(e) {
								plus.nativeUI.alert("本机未安装指定的地图应用");
							});
						}
					})
				}
				//#endif
			},
			bd_decrypt(bd_lng, bd_lat) { //百度坐标转为高德坐标
				var X_PI = Math.PI * 3000.0 / 180.0;
				var x = bd_lng - 0.0065;
				var y = bd_lat - 0.006;
				var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
				var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
				var gg_lng = z * Math.cos(theta);
				var gg_lat = z * Math.sin(theta);
				return {
					lng: gg_lng,
					lat: gg_lat
				}
			},

			iconlist(item) {
				let is = false
				for (var i = 0; i < this.iconlost.length; i++) {
					if (this.iconlost[i].facilityServicesId == item) {
						is = true
					}
				}
				return is
			}
		}
	}
</script>

<style scoped lang="scss">

	.hotsl {
		width: 100%;

		// background-color: #f6f6f6;
		.imagest {
			width: 100%;
			height: 100vh;
		}

		.photos {
			position: fixed;
			top: 0;
			right: -100%;
			width: 0;
			height: 100%;
			overflow: scroll;
			background: #edf0f5;
			z-index: 1000;

			.posts_top {
				width: 100%;
				height: 90upx;
				/*  #ifdef  APP-PLUS || MP-WEIXIN */
				padding-top: 60upx;
				/*  #endif  */
				display: flex;
				align-items: center;
				background: #FFFFFF;
				text-indent: 20upx;

				.posts_te {
					margin-left: 28%;
				}
			}

			.poslit {
				width: calc(100% - 20upx);
				padding: 10upx;
				display: flex;
				flex-wrap: wrap;

				.pslist {
					width: calc(50% - 20upx);
					height: 350upx;
					padding: 10upx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.shows {
			right: 0;
			width: 100%;
			transition: right 0.4s;
		}

		.hides {
			right: -100%;
			width: 100%;
			transition: right 0.4s;
		}

		.openphtots {
			position: fixed;
			top: 0;
			left: 0;
			width: calc(100% - 80upx);
			padding: 40upx;
			height: calc(100% - 80upx);
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			background: #333333;
			z-index: 1100;

			image {
				width: 100%;
				margin-top: 300upx;
			}

			.opentext {
				width: 100%;
				height: 90upx;
				line-height: 90upx;
				color: #FFFFFF;
				text-align: right;
				display: flex;

				.opentextdv {
					flex: 1;
				}
			}
		}

		.hot_top {
			position: relative;
			width: 100%;
			height: 506upx;
			.rotblack {
				position: absolute;
				z-index: 10;
				top: 10upx;
				/*  #ifdef  APP-PLUS || MP-WEIXIN */
				top: 70upx;
				/*  #endif  */
				left: 10upx;
				width: 80upx;
				height: 80upx;
				text-align: center;
				line-height: 80upx;
				border-radius: 80upx;
				background: rgba(0, 0, 0, .5);
			}

			image {
				width: 100%;
				height: 100%;
			}

			.tirle {
				position: absolute;
				top: 350upx;
				left: 0;
				width: 100%;
				height: 150upx;
				line-height: 70upx;
				text-indent: 20upx;
				color: #FFFFFF;
				font-size: 35upx;
				background: rgba(0, 0, 0, .5);
			}
		}

		.address {
			width: 100%;
			background: #FFFFFF;
			padding: 10upx 0;
			font-size: 35upx;
			line-height: 90upx;
			text-indent: 10upx;
			display: flex;
			justify-content: space-between;

			.adrleft {
				line-height: 45upx;

				.iconname {
					width: 100%;
				}

				.iconsl {
					line-height: 45upx;
					width: 100%;
					display: flex;
					font-size: 30upx;
					color: #5DC4A4;
				}
			}
		}

		.hotlists {
			position: absolute;
			top: 400upx;
			margin: 20upx;
			width: calc(100% - 40upx);

			.intro {
				padding: 20upx;
				font-size: 30upx;
				position: relative;
				border-radius: 12upx;
				background-color: #FFFFFF;
				.intcolt {
					position: absolute;
					right: 24upx;
					top: 100upx;
					color: $uni-color-primary;
				}

				.intcols {
					position: absolute;
					right: 24upx;
					bottom: 20upx;
					color: $uni-color-primary;
				}
			}
			.onbottms{
				width: 100%;
				margin-top: 20upx;
				border-top-left-radius: 12upx;
				border-top-right-radius: 12upx;
				background: #FFFFFF;
				.onleft {
					width: calc(100% - 40upx);
					margin: 0 20upx;
					padding: 10upx 0;
					border-bottom: 2upx solid #edf0f5;
				}
				
				.onselist {
					margin-top: 2upx;
					width: 100%;
					background: #FFFFFF;
				
					.stscity {
						width: 100%;
						line-height: 80upx;
						text-align: center;
						color: red;
					}
				
					.onprolistks {
						width: 100%;
				
						.onprolist {
							width: calc(100% - 40upx);
							margin: 0 20upx;
							padding: 20upx 0;
							height: 180upx;
							display: flex;
							border-bottom: 2upx solid #edf0f5;
				
							.onproleft {
								width: 180upx;
								height: 180upx;
								border-radius: 8upx;
								background-size: cover;
							}
				
							.optext {
								width: 50%;
								height: 100%;
								display: flex;
								align-items: center;
								font-size: 35upx;
								text-indent: 10upx;
				
								.optile {
									color: #333333;
									text-indent: 20upx;
								}
							}
				
							.money {
								display: flex;
								width: calc(100% - 50% - 180upx);
								justify-content: flex-end;
								align-items: center;
								color: #FA6803;
				
								.monsle {
									font-size: 25upx;
								}
				
								.mosrig {
									font-size: 25upx;
									color: #9D9D9D;
								}
							}
						}
				
						.ontons {
							.resPro {
								width: 100%;
								padding: 20upx 0;
								display: flex;
								.resPro_left {
									width: 60%;
									font-size: 30upx;
									line-height: 40upx;
				
									.tiems {
										font-size: 35upx;
									}
				
									.texs {
										color: #C8C7CC;
									}
								}
				
								.resPro_right {
									width: 40%;
									display: flex;
									align-items: center;
									justify-content: flex-end;
				
									.res_poric {
										color: #FA6803;
										font-size: 30upx;
				
										.res_poricts {
											font-size: 40upx;
										}
									}
				
									.rse_erfs {
										margin-left: 10upx;
										font-size: 27upx;
										height: 90upx;
										border-radius: 10upx;
										border: 2upx solid #908f8e;
										overflow: hidden;
				
										.rse_erf_top_one {
											height: 50upx;
											text-align: center;
											line-height: 50upx;
											background: #908f8e;
											color: #FFFFFF;
										}
				
										.rse_erf_bot {
											padding: 0 15upx;
											height: 40upx;
											text-align: center;
											line-height: 40upx;
											background: #FFFFFF;
											color: #FA6803;
										}
									}
				
									.rse_erf {
										margin-left: 10upx;
										font-size: 27upx;
										height: 90upx;
										border-radius: 10upx;
										border: 2upx solid #FA6803;
										overflow: hidden;
				
										.rse_erf_top {
											height: 50upx;
											text-align: center;
											line-height: 50upx;
											background: #FA6803;
											color: #FFFFFF;
										}
				
										.rse_erf_top_one {
											height: 50upx;
											text-align: center;
											line-height: 50upx;
											background: #908f8e;
											color: #FFFFFF;
										}
				
										.rse_erf_bot {
											padding: 0 15upx;
											height: 40upx;
											text-align: center;
											line-height: 40upx;
											background: #FFFFFF;
											color: #FA6803;
										}
									}
								}
							}
				
							.resPros {
								width: 100%;
								padding: 20upx 0;
								display: flex;
								border-bottom: 2upx solid #C0C0C0;
				
								.resPro_left {
									width: 60%;
									font-size: 30upx;
									line-height: 40upx;
				
									.tiems {
										line-height: 50upx;
										font-size: 35upx;
									}
				
									.texs {
										color: #C8C7CC;
									}
								}
				
								.resPro_right {
									width: 40%;
									display: flex;
									align-items: center;
									justify-content: flex-end;
				
									.res_poric {
										color: #C8C7CC;
										font-size: 30upx;
				
										.res_poricts {
											font-size: 40upx;
										}
									}
				
									.rse_erf {
										font-size: 27upx;
										height: 90upx;
										border-radius: 10upx;
										border: 2upx solid #C8C7CC;
										overflow: hidden;
				
										.rse_erf_top {
											height: 50upx;
											text-align: center;
											line-height: 50upx;
											background: #C8C7CC;
											color: #FFFFFF;
										}
				
										.rse_erf_bot {
											padding: 0 15upx;
											height: 40upx;
											text-align: center;
											line-height: 40upx;
											background: #FFFFFF;
											color: #C8C7CC;
										}
									}
								}
							}
						}
				
						.show {
							width: calc(100% - 40upx);
							padding: 0 20upx;
							background: #edf0f5;
						}
				
						.hide {
							height: 0;
							overflow: hidden;
						}
					}
				}
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
			z-index: 500;
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

											picker {
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


	}
</style>
