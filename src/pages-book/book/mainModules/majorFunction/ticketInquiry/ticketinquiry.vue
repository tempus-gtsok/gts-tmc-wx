<template>
	<view class="mian container999">
		<loading>
		</loading>
		<!-- <view class="White">

		</view> -->
		
		<view class="top">
			<headnavigation titles="查询机票"></headnavigation>
			<datatiem @change="lischang" :isretun="isretun" :ishtoel="ishtoel" :singleDate="singleDate" :startDate="startDate"></datatiem>
		</view>

		<view class="air_ticket">
			<view class="wei">
				<view v-if="userlists.length > 0 && item.isshow == true" @click="particulars(item,index)" v-for="(item,index) in userlists"
				 :key='index' class="ticket">
					<view class="above">
						<view class="airticket">
							<view class="travel_time">
								<view style="font-size: 40upx;">{{item.name.departTime}}</view> <!-- 出发时间 -->
								<view style="color:#abb7c2;text-align: center;font-size: 25upx;" v-if="item.name.departTerminal != null">{{item.name.departs}}{{item.name.departTerminal}}</view><!-- 出发城市 -->
								<view style="color:#abb7c2;text-align: center;font-size: 25upx;" v-else>{{item.name.departs}}</view><!-- 出发城市 -->
								<!-- <view style="color:#abb7c2;text-align: center;">{{item.departTerminal}}</view> -->
							</view>
							<view class="">
								<view class="iconfont" style="color:#f1f1f1;width: 200upx;">&#xe622;</view>
								<view style="color: #007aff;text-align: center;font-size: 25upx;" v-if="item.name.nonstop == true">经停</view>
							</view>
							<view class="travel_time">
								<view style="font-size: 40upx;" class="arrclass">{{item.name.arriveTime}} <span v-if="item.name.isarriveTime">+1</span> </view> <!-- 返回时间 -->
								<view style="color:#abb7c2;text-align: center;font-size: 25upx;" v-if="item.name.arriveTerminal != null">{{item.name.arrives}}{{item.name.arriveTerminal}}</view>
								<view style="color:#abb7c2;text-align: center;font-size: 25upx;" v-else>{{item.name.arrives}}</view>
								<!-- 返回城市 -->
							</view>
						</view>
						<view class="low" v-if="item.name.lowprice!=null">
							{{item.name.lowprice}}
						</view>
						<view class="price" v-if=" none == 'single' ">
							<view style="font-size: 40upx;">
								<!--                <view v-for="(i,indexs) in item"  v-if="priceSources(i)"><img src="static/img/official.png" style="height: 17px;width: 17px;margin-right: 7px"></view>-->
								<view>￥{{item.text.cabins[0].salePrices[0].price}}</view> <!-- 机票价格 -->
								<view class="discountjia" v-if="item.text.cabins[0].discount != 1">
									{{item.text.cabins[0].level}}{{item.text.cabins[0].discount}}折
								</view>
								<view class="discountjia" v-else>
									{{item.text.cabins[0].level}}<span style="color: red">全价</span>
								</view>
							</view>
						</view>
						<view class="price" v-if=" noneName == 'returns' ">
							<view style="font-size: 40upx;">
								<view>￥{{item.text.cabins[0].salePrices[0].price}}</view> <!-- 机票价格 -->
								<view class="discountjia" v-if="item.text.cabins[0].discount != 1">
									{{item.text.cabins[0].level}}{{item.text.cabins[0].discount}}折
								</view>
								<view class="discountjia" v-else>
									{{item.text.cabins[0].level}}<span style="color: red">全价</span>
								</view>
							</view>
							<!-- <view v-for="(iter,index) in userrw" :key="index" style="font-size: 40upx;">
								<view v-if="item.no == iter.no">￥{{iter.cabins[0].minSalePrice}}</view>
								<view v-if="item.no == iter.no" class="discountjia">
									{{iter.cabins[0].level}}{{iter.cabins[0].discount}}折
								</view>
							</view><! 机票价格 -->
						</view>
					</view>
					<view class="airport">
						<view class="stsbt">
							<image :src="item.ims" mode=""></image>
							<!-- <view style="color:#abb7c2;text-align: center;">{{company(item.name.airline)}}</view> -->
							<view style="">{{company(item.name.airline)}}</view>
							<view style="">{{item.name.no}}/</view>
							<view style="">{{model(item.name.plane)}}{{item.name.plane}}</view>
							<view style="" v-if="item.name.planeSize != null">{{item.name.planeSize}}</view>
						</view>

						<view class="stsbt">
							<view class="stasb" v-if="civilServiceTicket != undefined && civilServiceTicket == 1">
								<p>公</p>
							</view>
							<view class="stass" v-if="item.name.shared == true">
								<p>共享</p>
							</view>
							<!-- <view class="ting" v-if="item.name.shared == true&&ting == true">承运航班:{{item.name.operatingNo}}</view> -->
						</view>
					</view>
					<view>
						<view style="text-indent: 20upx;color: #abb7c2;font-size: 30upx;line-height: 50upx;">
							<p>{{mealss(item.name.meals)}}</p>
						</view>
					</view>
					<view class="ting">
						<view v-if="item.name.shared == true">承运航班:{{item.name.operatingNo}}</view>
					</view>
				</view>
				<view class="tiaklistImg" v-if="userlists.length == 0">
					<image class="gjImg" v-if="imgFlag" src="@/static/img/m_ticketList.png" mode=""></image>
					<image class="noData" v-else src="@/static/img/noData.png" mode="widthFix"></image>
					<div class="rblcok" v-if="!imgFlag" @click="rblcok">重新搜索</div>
				</view>
				<!-- <view class="" v-if="userlists.length == 0">
					<view class="kong">正在查询</view>
				</view> -->
				<view :class="{'share-box': companyd_click}" @click="companym_click">
				</view>
				<view class="share-item" :class="{'share-show': companyd_click}">
					<view class="share">
						<view class="cancel" style="display: flex; justify-content: flex-start;" @click="cancels">取消</view>
						<view @click="reset" class="cancel" style="display: flex; justify-content: center;">重置</view>
						<view @click="confirm" class="cancel" style="display: flex; justify-content: flex-end;">确定</view>
					</view>
					<view class="choice">
						<view class="left_choice">
							<view @click="choice(item,index)" v-for="(item,index) in userchoice" :key="item.id" class="_choice" :class="itid == item.id ? 'icheds':''">
								{{item.text}}
							</view>
						</view>
						<view class="right_choice">
							<!-- 起飞时段 -->
							<view @click="take(item,index)" v-for="(item,index) in usertake" :key="index" class="take">
								{{item.text}}
								<view class="iconfont" style="color:#007aff;" v-if="item.id == it || item.id == ir || item.id == iw || item.id == ie || item.id == iq || item.id == ih">&#xe620;</view>
							</view>
						</view>
					</view>
					
				</view>
				<view class="mask" v-if="companyi_click" @click="companym_click">
				</view>
				<view class="screen" v-if="companyd_click">
					
				</view>
			</view>
		</view>
		<!-- 下面导航 disabled-->
		<view class="tail">
			<view @click="cut(item,index)" v-for="(item,index) in tabBar" :key="item.ul" class="tabbar_item" :class="isid == item.ul ? 'iched':''">
				<view class="iconfont" style="color:#007aff;" v-if="isid == item.ul">{{item.imgnor}}</view>
				<view class="iconfont" style="color:#c0c4ce;" v-if="isid != item.ul">{{item.imgNormal}}</view>
				<view class="text">{{item.text}}</view>
			</view>
		</view>
		<onPageScrolls :scrolltops="scrolltops"></onPageScrolls>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import certifi from '@/api/certificate.js'
	import airports from 'pages/book/sselect-city/airports.js'
	import datatiem from '@/components/view/book/date-picker/date-picker.vue'
	export default {
		components: {
			datatiem
		},
		data() {
			return {
				scrolltops:false,//是否显示
				isretun: false,
				startDate: '',
				ishtoel: 'ticketinqu',
				singleDate: true,
				city: '', //去的城市
				citys: '', //来的城市
				time: '', //时间
				times: '', //时间
				timas: '',
				check: '',
				timelist: '', //时间的集合
				none: '', //判断
				noneName: '', //判断2
				name: 'mao/yi', //旅客.
				booll: false,
				imgFlag:true,
				
				shu: [],
				userlist: [],
				userlists: [],
				usermap: [],
				flights: [],
				userrw: [],
				hang: [],
				aviations: [],
				dateshu: [],
				address: [], //城市集合
				butalist: [],
				dats: {},
				datas: {},
				companyi_click: false, //弹出层
				companys_click: false, //保险
				companyd_click: false, //筛选
				text: '时间',
				cong: false, //重置
				isblcks: '', //1事前2事中
				isbtd: '', //1因公2因私
				isid: 'Time', //默认值
				itid: 'Transit', //起飞默认
				it: 'Unlimited', //起飞时段
				ir: 'Unlimiteda', //起飞经停
				iw: 'Unlimiteds', //舱位
				ie: 'Unlimitedh', //航空公司
				iq: 'Unlimitede', //机型
				ih: true, //共享
				// iy: 'Unlimitedg', //起降机场
				// iu: 'Unlimitedh', //到达机场
				civilServiceTicket: '',
				usertake: [],
				filter: [{
					id: '0',
					name: '起飞',
					value: 'Unlimiteda'
				}, {
					id: '1',
					name: '舱位',
					value: 'Unlimiteds'
				}, {
					id: '2',
					name: '航空公司',
					value: 'Unlimitedh'
				}, {
					id: '3',
					name: '机型',
					value: 'Unlimitede'
				}, {
					id: '4',
					name: '共享',
					value: true
				}], //筛选
				userindex: {
					name: 0,
					id: 'Unlimiteda'
				},
				userchoice: [{
						id: 'Transit',
						text: '起飞/经停',
						arr: [{
								id: 'Unlimiteda',
								text: '不限',
								img: '\ue620'
							},
							{
								id: 'true',
								text: '经停',
								img: '\ue620'
							},
							{
								id: false,
								text: '仅直飞',
								img: '\ue620'
							}
						]
					},
					{
						id: 'Location',
						text: '舱位',
						arr: [{
								id: 'Unlimiteds',
								text: '不限',
								img: '\ue620'
							},
							{
								id: 'Y',
								text: '经济舱',
								img: '\ue620'
							},
							{
								id: 'F',
								text: '头等舱/商务舱',
								img: '\ue620'
							}
						]
					},
					{
						id: 'Airline',
						text: '航空公司',
						arr: [{
							id: 'Unlimitedh',
							text: '不限',
							img: '\ue620'
						}]
					},
					{
						id: 'model',
						text: '机型',
						arr: [{
							id: 'Unlimitede',
							text: '不限',
							img: '\ue620'
						}]
					},
					{
						id: 'shared',
						text: '共享',
						arr: [{
							id: 'Unlimitedg',
							text: '不限',
							img: '\ue620'
						}]
					}
					// {
					// 	id: 'Airports',
					// 	text:'起降机场'
					// },
				],
				tabBar: [{
						ul: 'Time',
						text: '时间',
						imgnor: '\ue8a5',
						imgNormal: '\ue648'
					},
					{
						ul: 'Topbottom',
						text: '价格',
						imgnor: '\ue8a6',
						imgNormal: '\ue615'
					},
					{
						ul: 'Screen',
						text: '筛选',
						imgnor: '\ue61d',
						imgNormal: '\ue61d'
					}
				],
				tickarray: [], //航班集合复制
				arrivalAirport: '', //经停
				ting: false, //共享
				flightinfoid: '',
				priceSource: 0,
				cont: 0
			}
		},
		onPageScroll(res){//距离页面顶部距离
			if(res.scrollTop == 0){
				this.scrolltops = false;
			} else {
				this.scrolltops = true;
			}
		},
		computed: {
			...mapState(['goName']) //往返的值0是去，1是返回
		},
		mounted() {
			if (this.isblcks == 1) {
				this.isretun = true
			}
			this.usertake = this.userchoice[0].arr;
		},
		onLoad(item) {
			let data = JSON.parse(uni.getStorageSync("ticketinquiry_data"));
			this.dats = data;
			if (data.none == 'single') {
				this.city = data.city; //去的城市
				this.citys = data.citys; //来的城市
				this.time = data.timedate; //时间
				this.civilServiceTicket = data.civilServiceTicket;
				this.startDate = data.timedate //时间控件的值
				this.none = data.none;
				this.butalist = data.butalist;
				this.isblcks = data.isblcks; //1事前2事中
				this.isbtd = data.isbtd; //1因公2因私
			} else if (data.none == 'returns') {
				this.city = data.city; //去的城市
				this.citys = data.citys; //来的城市
				this.time = data.timedate; //去的时间
				this.times = data.timedates; //来的时间
				this.civilServiceTicket = data.civilServiceTicket;
				this.noneName = data.none;
				this.none = data.none;
				this.butalist = data.butalist;
				this.isblcks = data.isblcks; //1事前2事中
				this.isbtd = data.isbtd; //1因公2因私
				let date = new Date();
				let year = date.getFullYear(); //得到当前年份
				let month = this.editTime(date.getMonth() + 1); //得到当前月份
				let day = this.editTime(date.getDate()); //得到当前几号
				let datte = year + '-' + month + '-' + day;
				let dattes = year + '-' + month + '-' + (day + 1);
				let timedas = data.timedate.split('-').join('');
				let itmedaa = data.timedates.split('-').join('');
				let itmedaas = '';
				let dateas = '';
				this.datas = uni.getStorageSync("ticketinquirys_data");
				if (this.datas != '') {
					this.datas = JSON.parse(this.datas);
					console.log(this.datas)
					// let itmedaas = this.datas.timelist.re.split('-').join('');
					itmedaas = this.datas.timelist.re.substring(0, 8) + (parseInt(this.datas.timelist.re.substring(8, 10)) + 1).toString();
					dateas = year.toString() + month.toString() + day.toString();
				}
				if (this.goName == 0) {
					if (dateas != '') {
						if (timedas < dateas) {
							this.startDate = datte;
						} else {
							this.startDate = data.timedate; //时间控件的值
						}
					} else {
						this.startDate = data.timedate; //时间控件的值
					}
				} else {
					if (dateas != '') {
						if (itmedaa < dateas) {
							this.startDate = itmedaas; //时间控件的值data.timedates
						} else {
							this.startDate = data.timedates; //时间控件的值data.timedates
						}
					} else {
						this.startDate = data.timedates; //时间控件的值data.timedates
					}
				}
			}
		},
		
		methods: {
			priceSources(item, index) {
				console.log(JSON.stringify(item))
				let _this = this;
				if (item === 1) {
					return item;
				}
			},
			//时间
			lischang(item) {
				this.timelist = item.choiceDate;
				this.timas = item.choiceDate.re;
				this.time = item.choiceDate.re;
				this.times = item.choiceDate.re.substring(0, 8) + (parseInt(item.choiceDate.re.substring(8, 10))).toString();
				// console.log(this.times)
				this.save()
			},
			editTime(i) {
				if (i < 10) {
					i = "0" + i;
				}
				return i;
			},
			//共享
			tings(item, index) {
				event.stopPropagation();
				if (this.ting == false) {
					this.ting = true;
				} else {
					this.ting = false;
				}
			},
			rblcok() {
				if (this.goName == 1 && this.dats.none == 'returns') {
					// #ifdef H5
					let canBack = true
					const pages = getCurrentPages()
					// 有可返回的页面则直接返回，uni.navigateBack默认返回失败之后会自动刷新页面 ，无法继续返回
					if (pages.length > 1) {
						uni.navigateBack(1)
						return;
					}
					// vue router 可以返回uni.navigateBack失败的页面 但是会重新加载
					let a = this.$router.go(-1)
					// router.go失败之后则重定向到首页
					if (a == undefined) {
						uni.reLaunch({
							url: "/pages/bookBook"
						})
					}
					this.$store.commit('goName_add', 0)
					return;
					// #endif
					// #ifdef MP-WEIXIN
					uni.navigateBack()
					this.$store.commit('goName_add', 0)
					// #endif

				} else {
					uni.navigateTo({
						url: '../select_list/select_list?type=Planeticket'
					})
				}
			},
			reset() {
				this.cong = true;
				this.take();
			},
			cheack() {
				console.log(this.check)
			},
			confirm() {
				let datw = this.userlists;
				let dat = this.userindex;
				let arris = [];
				for (var i = 0; i < datw.length; i++) {
					if (this.filter[0].value != 'Unlimiteda') {
						let sits = false;
						if (datw[i].name.nonstop == true && this.filter[0].value == 'true') {
							sits = true;
						} else if (datw[i].name.nonstop == false && this.filter[0].value == false) {
							sits = true;
						}
						if (sits == false) {
							datw[i].isshow = false;
							continue
						}
					}
					if (this.filter[1].value != 'Unlimiteds') {
						let sits = false;
						if (datw[i].economyclass == true && this.filter[1].value == 'Y') {
							sits = true;
						} else if (datw[i].businessclass == true && (this.filter[1].value == 'C' || this.filter[1].value == 'F')) {
							sits = true;
						}
						if (sits == false) {
							datw[i].isshow = false;
							continue
						}
					}
					if (this.filter[2].value != 'Unlimitedh') {
						let sits = false;
						if (datw[i].name.airline == this.filter[2].value) {
							sits = true;
						}
						if (sits == false) {
							datw[i].isshow = false;
							continue
						}
					}
					if (this.filter[3].value != 'Unlimitede') {
						let sits = false;
						if (datw[i].name.planeSize == this.filter[3].value) {
							sits = true;
						}
						if (sits == false) {
							datw[i].isshow = false;
							continue
						}
					}
					if (this.filter[4].value != 'Unlimitedg') {
						let sits = false;
						if (datw[i].name.shared != true && this.filter[4].value == true) {
							sits = true;
						}
						if (sits == false) {
							datw[i].isshow = false;
							continue
						}
					}
					// if (dat.name == 0) { //起飞时段(this.filter[1].value == 'Y' && datw[i].economyclass == true || this.filter[1].value == ('F' || 'C') && datw[i].businessclass == true) && this.filter[2].value == datw[i].name.airline || datw[i].name.nonstop == dat.id
					// 	// if ((this.filter[0].value != '0' && this.filter[0].value == datw[i].name.nonstop) && (this.filter[1].value != '0' && (datw[i].economyclass == true &&
					// 	// 		this.filter[1].value == 'Y')||(datw[i].economyclass == true && (this.filter[1].value == 'C' || this.filter[1].value == 'F'))) && this.filter[2].value != '0' && this.filter[2].value == datw[i].name.airline) {
					// 	// 	arris.push(datw[i])
					// 	// if (this.filter[0].value != '0' && this.filter[0].value == datw[i].name.nonstop) {
					// 	// 	arris.push(datw[i])
					// 	// } else if (dat.id == 'Unlimiteda') {
					// 	// 	arris.push(datw[i])
					// 	// }
					// } else if (dat.name == 1) { //起飞经停
					// 	this.iw = dat.id
					// 	// if (datw[i].text.cabins[0].level == dat.id) {
					// 	if(datw[i].economyclass == true && dat.id == 'Y'){
					// 		arris.push(datw[i])
					// 	} else if(datw[i].businessclass == true && (dat.id == 'F' || dat.id == 'C')){
					// 		arris.push(datw[i])
					// 	} else if (dat.id == 'Unlimiteds') {
					// 		arris.push(datw[i])
					// 	}
					// } else if (dat.name == 2) { //舱位
					// 	this.ie = dat.id
					// 	if (datw[i].name.airline == dat.id) {
					// 		arris.push(datw[i])
					// 		// console.log(arris)
					// 	} else if (dat.id == 'Unlimitedh') {
					// 		arris.push(datw[i])
					// 	}
					// }
					datw[i].isshow = true;
				}
				// this.userlists = arris;
				this.userlists = datw;
				this.companyi_click = false;
				this.companyd_click = false;
			},
			companym_click() {
				this.companyi_click = false;
				this.companys_click = false;
				this.companyd_click = false;
				// this.dimiss = false;
			},
			company_click() {
				this.companyi_click = true;
				this.companys_click = true;
			},
			comp_click() {
				this.companyi_click = true;
			},
			compare(property, desc) {
				return function(a, b) {
					var value1 = a[property];
					var value2 = b[property];
					if (desc == true) {
						// 升序排列
						return value1 - value2;
					} else {
						// 降序排列
						return value2 - value1;
					}
				}
			},
			insertStr(soure, start, newStr) {
				return soure.slice(0, start) + newStr + soure.slice(start)
			},
			sort() {
				let _this = this;
				let pattern = ':';
				for (let k in _this.userlists) {
					_this.userlists[k]['nusm'] = _this.userlists[k].name.departTime.replace(new RegExp(pattern), "");
				}
				this.userlists.sort(this.compare('nusm', true))
			},
			inverted() {
				let _this = this;
				let pattern = ':';
				for (let k in _this.userlists) {
					_this.userlists[k]['nusm'] = _this.userlists[k].name.departTime.replace(new RegExp(pattern), "");
				}
				this.userlists.sort(this.compare('nusm', false))
			},
			sorts() {
				let _this = this;
				for (let j in _this.userlists) {
					_this.userlists[j]['nums'] = _this.userlists[j].text.cabins[0].minSalePrice;
					this.userlists.sort(this.compare('nums', true))
				}
			},
			inverteds() {
				let _this = this;
				for (let j in _this.userlists) {
					_this.userlists[j]['nums'] = _this.userlists[j].text.cabins[0].minSalePrice;
					this.userlists.sort(this.compare('nums', false))
				}
			},
			cut(it, index) {
				let _this = this;
				this.isid = it.ul;
				let han = [];
				let shu = '';
				if (it.ul == "Time") {
					this.tabBar[1].text = '价格'
					if (this.tabBar[index].text == '时间') {
						this.tabBar[index].text = '早-晚'
						this.sort();
					} else if (this.tabBar[index].text == '早-晚') {
						this.tabBar[index].text = '晚-早'
						this.inverted();
					} else {
						this.tabBar[index].text = '早-晚'
						this.sort();
					}
				}
				if (it.ul == "Topbottom") {
					this.tabBar[0].text = '时间'
					if (this.tabBar[index].text == '从高到低') {
						this.tabBar[index].text = '从低到高'
						this.sorts();
					} else {
						this.tabBar[index].text = '从高到低'
						this.inverteds();
					}
				}
				if (it.ul == "Screen") {
					this.tabBar[0].text = '时间'
					this.tabBar[1].text = '价格'
					this.companyi_click = true;
					this.companyd_click = true;
				}
			},
			cancels() {
				this.companyi_click = false;
				this.companyd_click = false;
			},
			choice(io, index) {
				this.itid = io.id;
				this.usertake = io.arr;
				this.userindex.name = index;
			},
			 rblcok(){
				// #ifdef H5
				this.$router.go(-1)
				// #endif
				// #ifdef MP-WEIXIN
				uni.navigateBack();
				// #endif
			},
			//查询
			async save() {
				let _this = this;
				_this.userlists = [];
				let cityName = ''; //去的城市
				let citysName = ''; //来的城市
				let time = ''; //去的时间
				let times = ''; //来的时间
				let name = ''; //旅客
				let lei = '';
				let share = '';
				let aircom = "";
				let transCity = "";
				let grade = "";
				let passengeType = "";
				if (_this.none == 'single') {
					cityName = _this.city; //去的城市
					citysName = _this.citys; //来的城市
					time = _this.time; //去的时间
					// let times = _this.times.re; //来的时间
					name = _this.name; //旅客
					lei = '1';
					share = 1;
					aircom = "";
					transCity = "";
					grade = "";
					passengeType = "ADT";
				} else if (_this.noneName == 'returns') {
					cityName = _this.city; //去的城市
					citysName = _this.citys; //来的城市
					time = _this.time; //去的时间
					times = _this.times; //来的时间
					name = _this.name; //旅客
					lei = '2';
					share = 1;
					aircom = "";
					transCity = "";
					grade = "";
					passengeType = "ADT";
				}
				// newdata = cdlist.concat(_this.delete_list)
				let user = {};
				let users = {};
				user = {
					"aircom": aircom,
					"fromCity": cityName.id,
					"passengerType": passengeType,
					"hcType": lei,
					"toCity": citysName.id,
					"ishareFlight": share,
					"fromDate": time,
					"transCity": transCity,
					'grade': grade,
					civilServiceTicket: this.civilServiceTicket,
				}
				if (_this.none == 'single') {
					if (this.civilServiceTicket != undefined) {
						user = {
							"aircom": aircom,
							"fromCity": cityName.id,
							"passengerType": passengeType,
							"hcType": lei,
							"toCity": citysName.id,
							"ishareFlight": share,
							"fromDate": time,
							"transCity": transCity,
							'grade': grade,
							civilServiceTicket: this.civilServiceTicket,
						}
					} else {
						user = {
							"aircom": this.isblcks == 4 ? this.dats.odllegList[0].flightNo.substring(0, 2) : aircom,
							"fromCity": cityName.id,
							"passengerType": passengeType,
							"hcType": lei,
							"toCity": citysName.id,
							"ishareFlight": share,
							"fromDate": time,
							"transCity": transCity,
							'grade': grade
						}
					}
				} else if (_this.noneName == 'returns') {
					if (this.civilServiceTicket != undefined) {
						user = {
							"aircom": aircom,
							"fromCity": cityName.id,
							"passengerType": passengeType,
							"hcType": lei,
							"toCity": citysName.id,
							"ishareFlight": share,
							"fromDate": time,
							"toDate": times,
							"transCity": transCity,
							'grade': grade,
							civilServiceTicket: this.civilServiceTicket,
						}
					} else {
						user = {
							"aircom": aircom,
							"fromCity": cityName.id,
							"passengerType": passengeType,
							"hcType": lei,
							"toCity": citysName.id,
							"ishareFlight": share,
							"fromDate": time,
							"toDate": times,
							"transCity": transCity,
							'grade': grade
						}
					}
				}
				
				try {
					let res = await certifi.searchAirlineAJAX(user);
					let ret = await certifi.queryAirlineList();

					
					_this.userlists = [];
					if (res.code == 200) {
						if (res.data.search.flights == null) {
							_this.showToasts("没有合适的航班信息")
							this.imgFlag = false
							return
						}
						_this.hang = ret.data.airlineDds;
						_this.userlist = res.data.search.flights; //城市时间
						_this.usermap = res.data.search.ow_data; //折扣价格舱位
						_this.flights = res.data.search.flights; //所有航班信息
						_this.userrw = res.data.search.rw_data;
						_this.address = airports.addressAirportAll; //航空名字
						if (_this.none == 'single') {
							for (let k in _this.usermap) {
								for (let j in _this.userlist) {
									if (j == k) {
										if (_this.isblcks == 4) {
											if (cityName.id == _this.userlist[j].depart && citysName.id == _this.userlist[j].arrive) {
												_this.userlists.push({
													isshow: true,
													name: _this.userlist[j],
													text: _this.usermap[k]
												}); //获得userlists
											}
										} else {
											_this.userlists.push({
												isshow: true,
												name: _this.userlist[j],
												text: _this.usermap[k]
											}); //获得userlists
										}
									}
								}
							}
						} else if (_this.noneName == 'returns') {
							if (_this.goName == 0) { //往
								for (let k in _this.usermap) {
									for (let j in _this.userlist) {
										if (_this.isblcks == 4) {
											if (cityName.id == _this.userlist[j].depart && citysName.id == _this.userlist[j].arrive) {
												_this.userlists.push({
													isshow: true,
													name: _this.userlist[j],
													text: _this.usermap[k]
												}); //获得userlists
											}
										} else {
											if (j == k) {
												_this.userlists.push({
													isshow: true,
													name: _this.userlist[j],
													text: _this.usermap[k]
												});
											}
										}
									}
								}
							} else { //返
								for (let k in _this.userrw) {
									for (let j in _this.userlist) {
										if (_this.isblcks == 4) {
											if (cityName.id == _this.userlist[j].arrive && citysName.id == _this.userlist[j].depart) {
												_this.userlists.push({
													isshow: true,
													name: _this.userlist[j],
													text: _this.userrw[k]
												}); //获得userlists
											}
										} else {
											if (j == k) {
												_this.userlists.push({
													isshow: true,
													name: _this.userlist[j],
													text: _this.userrw[k]
												});
											}
										}
									}
								}
							}
						}
						let si = [{
							img: '\ue620',
							id: 'Unlimitedh',
							text: '不限'
						}];
						for (let i = 0; i < _this.userlists.length; i++) {
							si.push({
								img: '\ue620',
								id: _this.userlists[i].name.airline,
								text: this.company(_this.userlists[i].name.airline)
							})
						}
						let obj = {};
						let peon = si.reduce((cur, next) => {
							obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
							return cur;
						}, []) //设置cur默认类型为数组，并且初始值为空的数组
						for (let i = 0; i < this.userchoice.length; i++) {
							if (i == 2) {
								this.userchoice[i].arr = peon
							}
						}
						for (let k in _this.userlists) {
							_this.userlists[k]['economyclass'] = false; //经济舱
							_this.userlists[k]['businessclass'] = false; //头等舱和商务舱
							_this.userlists[k]['ims'] = 'http://file.feiren.com/00/02/' + _this.userlists[k].name.airline + '.png'
							if (k, _this.userlists[k].name.planeSize == 'L') {
								_this.userlists[k].name.planeSize = '(大)'
							} else if (k, _this.userlists[k].name.planeSize == 'M') {
								_this.userlists[k].name.planeSize = '(中)'
							} else if (k, _this.userlists[k].name.planeSize == 'S') {
								_this.userlists[k].name.planeSize = '(小)'
							}
							if (k, _this.userlists[k].name.shared == true) {
								_this.userlists[k].name.shareds = '隐藏共享'
							}
							if(_this.userlists[k].name.arriveTime.length > 5){
								_this.userlists[k].name.arriveTime = _this.userlists[k].name.arriveTime.substring(0,5);
								_this.userlists[k].name['isarriveTime'] = true;
							} else {
								_this.userlists[k].name['isarriveTime'] = false;
							}
							for (let j = 0; j < _this.address.length; j++) {
								if (k, _this.userlists[k].name.depart == _this.address[j].airportCode) {
									// k,
									_this.userlists[k].name['departs'] = _this.address[j].cityCName;
								} else if (k, _this.userlists[k].name.arrive == _this.address[j].airportCode) {
									// k,
									_this.userlists[k].name['arrives'] = _this.address[j].cityCName;
								}
								if (this.arrivalAirport == this.address[j].airportCode) {
									this.arrivalAirport = this.address[j].cityCName;
								}
							}
							for (let i = 0; i < _this.userlists[k].text.cabins.length; i++) {
								if (_this.userlists[k].text.cabins[i].level == 'C' || _this.userlists[k].text.cabins[i].level == 'F') { //商务舱和头等舱
									_this.userlists[k].businessclass = true;
								} else if (_this.userlists[k].text.cabins[i].level == 'Y' || _this.userlists[k].text.cabins[i].level == '经济舱') { //经济舱
									_this.userlists[k].economyclass = true;
								}
							}
						}
						let sis = [{
							img: '\ue620',
							id: 'Unlimitede',
							text: '不限'
						}];
						for (let i = 0; i < _this.userlists.length; i++) {
							sis.push({
								img: '\ue620',
								id: _this.userlists[i].name.planeSize,
								text: _this.userlists[i].name.planeSize
							})
						}
						let objs = {};
						let peons = sis.reduce((cur, next) => {
							objs[next.id] ? "" : objs[next.id] = true && cur.push(next);
							return cur;
						}, []) //设置cur默认类型为数组，并且初始值为空的数组
						for (let i = 0; i < this.userchoice.length; i++) {
							if (i == 3) {
								for (let k = 0; k < peons.length; k++) {
									if (peons[k].text == null) {
										peons.splice(k, 1);
									}
								}
								this.userchoice[i].arr = peons;
							}
						}
						let sie = [{
							img: '\ue620',
							id: 'Unlimitedg',
							text: '不限'
						}];
						for (let i = 0; i < _this.userlists.length; i++) {
							sie.push({
								img: '\ue620',
								id: _this.userlists[i].name.shared,
								text: _this.userlists[i].name.shareds
							})
						}
						let obje = {};
						let peone = sie.reduce((cur, next) => {
							obje[next.id] ? "" : obje[next.id] = true && cur.push(next);
							return cur;
						}, []) //设置cur默认类型为数组，并且初始值为空的数组
						for (let i = 0; i < this.userchoice.length; i++) {
							if (i == 4) {
								for (let k = 0; k < peone.length; k++) {
									if (peone[k].text == undefined) {
										peone.splice(k, 1);
									}
								}
								this.userchoice[i].arr = peone;
							}
						}
						for (let k in _this.usermap) {
							if (k, _this.usermap[k].cabins[0].discount < '1') {
								let num = (k, _this.usermap[k].cabins[0].discount * 10);
								k, _this.usermap[k].cabins[0].discount = num.toFixed(1);
							}
						}

						for (let k in _this.userrw) {
							if (k, _this.userrw[k].cabins[0].discount < '1') {
								let num = (k, _this.userrw[k].cabins[0].discount * 10);
								k, _this.userrw[k].cabins[0].discount = num.toFixed(1);
							} else {
								this.userrw.push(
									this.usermap[k]['discoun'] = '全价'
								)
							}
						}
						this.confirm();
					} else {
						_this.showToasts(res.message);
						_this.showToasts("暂无航班");
					}
				} catch (e) {
					console.log(e)
					
				}
			},
			mealss(i) {
				let meal = [];
				let meale = [];
				if (i != null) {
					meal = i.split('|');
				} else {
					return '无餐'
				}
				for (let k in meal) {
					let op = "";
					if (meal[k] == 'FS') {
						op = ' 头等舱有快餐 ';
						meale.push(op);
					} else if (meal[k] == 'JS') {
						op = ' 公务舱有快餐 ';
						meale.push(op);
					} else if (meal[k] == 'YR') {
						op = ' 经济舱有茶点 ';
						meale.push(op);
					} else if (meal[k] == 'B') {
						op = '早餐';
						meale.push(op);
					} else if (meal[k] == 'C') {
						op = '免费酒精饮料 ';
						meale.push(op);
					} else if (meal[k] == 'D') {
						op = '正餐';
						meale.push(op);
					} else if (meal[k] == 'F') {
						op = ' 供采购的食物 ';
						meale.push(op);
					} else if (meal[k] == 'G') {
						op = '供采购的食物和饮料';
						meale.push(op);
					} else if (meal[k] == 'H') {
						op = '热的膳食';
						meale.push(op);
					} else if (meal[k] == 'K') {
						op = '轻快早餐';
						meale.push(op);
					} else if (meal[k] == 'L') {
						op = '午餐';
						meale.push(op);
					} else if (meal[k] == 'M') {
						op = '膳食';
						meale.push(op);
					} else if (meal[k] == 'N') {
						op = '没有饭食供应';
						meale.push(op);
					} else if (meal[k] == 'O') {
						op = '冷的膳食';
						meale.push(op);
					} else if (meal[k] == 'P') {
						op = '供采购的酒精饮料';
						meale.push(op);
					} else if (meal[k] == 'R') {
						op = '茶点';
						meale.push(op);
					} else if (meal[k] == 'S') {
						op = '快餐';
						meale.push(op);
					} else if (meal[k] == 'V') {
						op = '供采购的茶点';
						meale.push(op);
					}
				}
				return meale.join(',');
			},
			company(ie) {
				for (let s in this.hang) {
					if (ie == s) {
						ie = this.hang[s];
						return ie;
					}
				}
			},
			model(ie) {
				if (ie.substring(0, 1) == 3) {
					ie = '空客'
				} else {
					ie = '波音'
				}
				return ie;
			},
			particulars(item, index) {
				// console.log("user::"+JSON.stringify(item))
				let cit = {
					name: this.company(item.name.airline),
					text: item.name.airline
				};
				let datw = {};
				let stslist = {};
				// console.log(item,this.datas)
				// if(this.timas < this.datas.timelist.re.toString()){
				// 	this.showToasts('返回时间不能比出发时间小!');
				// 	return;
				// }
				datw = {
					datw: this.dats, //查询新
					timelist: this.timelist, //时间
					flights: this.flights, //所有航班信息
					userlist: item, //当前航空信息
					hang: cit, //当前航班名称
					none: this.none, //是否单程
				}
				let cabinst = {};
				let flightst = {};
				let cabinsts = datw.userlist.text.cabins;
				let flightsts = datw.flights;

				for (let i in cabinsts) {
					cabinst[i] = {
						cabin: cabinsts[i].cabin,
						fdPrice: cabinsts[i].fdPrice,
						discount: cabinsts[i].discount,
						level: cabinsts[i].level,
						cabinName: cabinsts[i].cabinName,
						changeFare: cabinsts[i].changeFare,
						priceSource: cabinsts[i].priceSource,
						priceInfoId: cabinsts[i].priceInfoId,
						priceId: cabinsts[i].priceId,
						cashBack: cabinsts[i].salePrices[0].cashBack,
						parPrice: cabinsts[i].salePrices[0].parPrice,
						rebate: cabinsts[i].salePrices[0].rebate,
						minSalePrice: cabinsts[i].minSalePrice,
						salePrices: cabinsts[i].salePrices[0].price,
						specialType: cabinsts[i].salePrices[0].specialType,
						price: cabinsts[i].salePrices[0].price,
						policyId: cabinsts[i].salePrices[0].policyId,
						lastRebateId: cabinsts[i].salePrices[0].lastRebateId,
						lastRebateProfitId: cabinsts[i].salePrices[0].lastRebateProfitId,
						profitConfigId: cabinsts[i].salePrices[0].profitConfigId,
						stock: cabinsts[i].stock,
						buyPrice: cabinsts[i].salePrices[0].buyPrice,

					}
				}
				let tyf = [];
				for (let k in flightsts) {
					flightst[k] = {
						departDate: flightsts[k].departDate,
						departTime: flightsts[k].departTime,
					}
					tyf.push(k)

				}
				for (let i in tyf) {
					if (i == index) {
						this.flightinfoid = flightsts[tyf[i]].flightinfoid
					}
				}
				// console.log("flightinfoid:"+this.flightinfoid)
				stslist = {
					datw: datw.datw,
					flights: flightst,
					timelist: datw.timelist, //时间
					none: datw.none, //是否单程
					hang: datw.hang, //当前航班名称
					civilServiceTicket: this.civilServiceTicket,
					userlist: {
						ims: datw.userlist.ims,
						name: {
							isarriveTime: datw.userlist.name.isarriveTime,
							taxFee: datw.userlist.name.taxFee,
							mileage: datw.userlist.name.mileage,
							fuelFee: datw.userlist.name.fuelFee,
							airline: datw.userlist.name.airline,
							arrive: datw.userlist.name.arrive,
							arriveTerminal: datw.userlist.name.arriveTerminal,
							departTerminal: datw.userlist.name.departTerminal,
							arriveTime: datw.userlist.name.arriveTime,
							arrives: datw.userlist.name.arrives,
							depart: datw.userlist.name.depart,
							departDate: datw.userlist.name.departDate,
							departTime: datw.userlist.name.departTime,
							departs: datw.userlist.name.departs,
							flightTime: datw.userlist.name.flightTime,
							no: datw.userlist.name.no,
							plane: datw.userlist.name.plane,
							planeSize: datw.userlist.name.planeSize,
							yprice: datw.userlist.name.yprice,
							cprice: datw.userlist.name.cprice,
							fprice: datw.userlist.name.fprice,
							nonstop: datw.userlist.name.nonstop,
							flightId: datw.userlist.name.flightId
						},
						text: {
							minFdPrice: datw.userlist.text.minFdPrice,
							minSalePrice: datw.userlist.text.minSalePrice,
							nMinSalePrice: datw.userlist.text.nMinSalePrice,
							nMinSalePriceCabin: datw.userlist.text.nMinSalePriceCabin,
							nMinSalePriceFlight: datw.userlist.text.nMinSalePriceFlight,
							nMinSalePriceTime: datw.userlist.text.nMinSalePriceTime,

							no: datw.userlist.text.no,
							cabins: cabinst,
							flightinfoids: this.flightinfoid,
						}
					}
				}
				uni.setStorageSync("particularst_data", JSON.stringify(stslist));
				uni.navigateTo({
					url: './particulars/particularst'
				})
			},
			take(item, index) {
				if (this.cong == true) {
					this.ir = 'Unlimiteda';
					this.filter[0].value = 'Unlimiteda';
					this.iw = 'Unlimiteds';
					this.filter[1].value = 'Unlimiteds';
					this.ie = 'Unlimitedh';
					this.filter[2].value = 'Unlimitedh';
					this.iq = 'Unlimitede';
					this.filter[3].value = 'Unlimitede';
					this.ih = 'Unlimitedg';
					this.filter[4].value = 'Unlimitedg';
					this.cong = false;
				} else {
					this.userindex.id = item.id;
					let dat = this.userindex;
					if (dat.name == 0) { //起飞经停
						this.ir = item.id
						this.filter[0].value = item.id;
					} else if (dat.name == 1) { //舱位
						this.iw = item.id
						this.filter[1].value = item.id;
					} else if (dat.name == 2) { //航空公司
						this.ie = item.id
						this.filter[2].value = item.id;
					} else if (dat.name == 3) { //机型
						this.iq = item.id
						this.filter[3].value = item.id;
					} else if (dat.name == 4) { //共享
						console.log(item.id)
						this.ih = item.id
						this.filter[4].value = item.id;
					}
				}
			},
			Airports(item, index) {
				this.iy = item.id;
			},
			Arrive(item, index) {
				this.iu = item.id;
			}
		}
	}
</script>

<style lang="scss" scoped>

	.pop_up {
		width: 600upx;
		height: 300upx;
		position: fixed;
		left: 50%;
		top: 50%;
		margin-top: -150upx;
		/* 高度的一半 */
		margin-left: -300upx;
		/* 宽度的一半 */
		z-index: 999;
		background: #FFFFFF;

		.business {
			width: 100%;
			font-size: 30upx;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			margin-bottom: 20upx;
			color: #73828f;
			border-bottom: 1upx solid #C0C0C0;
		}

		.discounts {
			font-size: 30upx;
			padding-top: 10upx;
			text-indent: 40upx;
			color: #78879d;

			span {
				color: red;
			}
		}
	}

	.mian {
		width: 100vw;
		min-height: 100vh;

		.White {
			width: 20upx;
			height: 100%;
			position: absolute;
			top: 0;
			right: 0;
			background: #FFFFFF;
		}

		.top {
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1000;
			// display:flex;
			// justify-content: space-around;
			background: #ffffff;

			.heaven {
				width: 100%;
			}

			.outward_voyage {
				width: 100%;
				margin-top: 50upx;
				display: flex;
				justify-content: flex-start;

				.outward_voyage_name {
					color:$uni-color-primary;
					font-size: 20upx;
					margin-left: 20upx;
					text-align: center;
					border:$uni-color-primary solid 1upx;
				}

				.please_choose {
					text-indent: 100upx;
					color: #abb7c2;
				}
			}
		}

		.air_ticket {
			width: 100%;
			.wei {
				margin-top: 200upx;
				/*  #ifdef  APP-PLUS || MP-WEIXIN */
				margin-top: 260upx;
				/*  #endif  */
				width: 100%;
				padding-bottom: 100upx;
				.tiaklistImg{
					width: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					.gjImg{
						width: 100%;
						height: 100vh;
					}
					.noData{
						width: 300upx;
						margin-top: 20%;
						margin-left: -100upx;
					}
					.rblcok{
						width:160upx;
						height: 60upx;
						border: 1px solid #007aff;
						color: #666;
						text-align: center;
						line-height: 60upx;
						border-radius: 8upx;
						font-size: 20upx;
						margin-top: 20upx;
					}
				}
				.kong {
					text-align: center;
					margin-top: 50%;
				}
				.share-box {
					width: 100%;
					height: 100%;
					position: fixed;
					top: 0upx;
					left: 0upx;
					bottom: 0upx;
					right:0upx;
					background-color: rgba(0, 0, 0, 0.4);
					transition: .3s;
					z-index: 777;
				}
				
				// 进入分享动画
				.share-show {
					transition: all 0.3s ease;
					transform: translateY(0%) !important;
				}
				
				// 离开分享动画
				.share-item {
					position: fixed;
					left: 0;
					bottom: 0;
					width: 100%;
					height: auto;
					background-color: #FFFFFF;
					transition: all 0.3s ease;
					transform: translateY(100%);
					z-index: 888;
					border-top-left-radius: 20upx;
					border-top-right-radius: 20upx;
					.choice {
						display: flex;

						// background: #FFFFFF;
						.left_choice {
							width: 200upx;
							height: 610upx;
							font-size: 35upx;
							color: #afb4c1;
							background: #eeeeee;

							._choice {
								height: 100upx;
								line-height: 100upx;
								text-indent: 20upx;
							}

							.icheds {
								height: 100upx;
								line-height: 100upx;
								text-indent: 20upx;
								color: #65d7a5;
								background: #FFFFFF;
							}
						}

						.right_choice {
							margin-left: 20upx;
							width: 500upx;
							height: 610upx;
							font-size: 35upx;
							overflow: auto;

							.take {
								width: 100%;
								height: 100upx;
								line-height: 100upx;
								display: flex;
								justify-content: space-between;
								text-indent: 20upx;
								color: #9aa3ae;
								border-bottom: 2upx solid #C0C0C0;
							}

							.tackss {
								width: 100%;
								text-indent: 20upx;

								.airportsty {
									margin-top: 30upx;
									line-height: 100upx;
									border-bottom: 2upx solid #C0C0C0;
									color: #b9c3cc;

								}

								.takes {
									width: 100%;
									height: 100upx;
									line-height: 100upx;
									text-indent: 50upx;
									color: #3b4f62;
									border-bottom: 2upx solid #C0C0C0;
								}
							}
						}
					}

					.share {
						width: 100%;
						display: flex;
						border-top-left-radius: 15px;
						border-top-right-radius: 15px;
						height: 90upx;
						line-height: 90upx;
						justify-content: space-around;
						background: #eeeeee;

						.cancel {
							font-size: 35upx;
							color: #51ce97;
						}
					}

					.shares {
						width: 100%;
						display: flex;
						height: 90upx;
						line-height: 90upx;
						background: #FFFFFF;
						padding-left: 20upx;

						.cancels {
							font-size: 28upx;
							color: #9aa3ae;
							margin-left: 30upx;
						}
					}

				}

				.ticket {
					width: calc(100% - 40upx);
					padding: 30upx 10upx 20upx 10upx;
					text-indent: 10upx;
					background: #FFFFFF;
					margin: 0 10upx;
					margin-bottom: 20upx;
					box-shadow: 0 4upx 8upx rgba(209,209,209,50%);
					.above {
						width: 100%;
						display: flex;

						// background: $uni-color-primary;
						.airticket {
							display: flex;
							width: 70%;

							// background: red;
							.travel_time {
								// display: flex;
								.arrclass{
									position: relative;
									span{
										position: absolute;
										right: -30upx;
										top: 2upx;
										color: #22c071;
										font-size: 24upx;
									}
								}
								
							}
						}

						.price {
							color: red;
							font-size: 40upx;
							width: 30%;
							text-indent: 0;
							padding-right: 10upx;
							text-align: right;

							// background: $uni-color-primary;
							.discountjia {
								color: #abb7c2;
								overflow: hidden;
								font-size: 26upx;
								// padding-right: 10upx;
								// text-align: right;
								// background: red;
							}
						}

						.lowpro {
							width: 71upx;
							height: 40upx;
							margin-top: 10upx;
							color:$uni-color-primary;
							font-size: 26upx;
							margin-left: 50upx;
						}

						.low {
							width: 70upx;
							height: 40upx;
							margin-top: 10upx;
							color:$uni-color-primary;
							font-size: 26upx;
							margin-left: 50upx;
							border:$uni-color-primary solid 1upx;
						}
					}

					.airport {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 20upx 20upx 0 20upx;
						width: calc(100% - 40upx);

						.stsbt {
							display: flex;
							position: relative;
							font-size: 32upx;
							.stasb {
								color: red;
								width: 40upx;
								height: 40upx;
								line-height: 40upx;
								border-radius: 50%;
								// border: 1upx solid red;
								// width: 35upx;
								// height: 35upx;
								display: flex;
								justify-content: center;
								align-items: center;
								font-size: 20upx;
							}

							.stass {
								color: #0BC071;
								border-radius: 50%;
								font-size: 20upx;
								display: flex;
								justify-content: center;
								align-items: center;
							}
						}

						image {
							width: 40upx;
							height: 40upx;
						}
					}

					.ting {
						// width: 250upx;
						margin-right: 10upx;
						text-align: right;
						color: #0BC071;
						background: #FFFFFF;
					}
				}
			}
		}
		
		.tail {
			width: 100%;
			height: 100upx;
			display: flex;
			justify-content: space-around;
			position: fixed;
			bottom: 0;
			left: 0;
			border-top: 1upx solid #edf0f5;
			background: #FFFFFF;

			.tabbar_item {
				width: 30%;
				height: 80upx;
				margin-top: 10upx;
				color: #bfc3cd;
				text-align: center;
				font-size: 20upx;
			}

			.iched {
				color: #007aff;
			}

		}
	}
</style>
