<template>
	<view class="carlist">
		<loading>
		</loading>
		<map id="midMap" v-if="mapsit" :include-points="include_points" class="carmap" :scale="scale" style=" width: 100%; height: 100vh;"
		:show-location="true"
		 @regionchange="regionchange" :latitude="latitude" :longitude="longitude" :markers="markers">
			<cover-view class="cat_top">
				<cover-view class="rouck" @click="roublock">
					<cover-image class='imgs' src='/static/img/carbus/carbusingimg/leftj.png'></cover-image>
				</cover-view>
				<cover-view class="antbns">
					<cover-view class="anlis" @click="isbk(item.id)" :class="ibtnk == item.id ? 'anlisk':''" v-for="(item,index) in ibtlist"
					 :key="index">
						{{item.name}}
					</cover-view>
				</cover-view>
				<cover-view class="roucks">
				</cover-view>
			</cover-view>

			<cover-view class="cat_section">
				<cover-view class="cat_sec_top">
					在当前位置上车
				</cover-view>
				<cover-image :class="teaisn ? 'mods':''" class='cat_sectionimg' src='/static/img/carbus/carbusingimg/coordinate.png'></cover-image>
			</cover-view>
			<cover-view class="fiexd" v-if="car_fsd">
				<cover-view class="toasts">
					<cover-view class="toa_title">你有未完成的订单！</cover-view>
					<cover-view class="toa_btn">
						<button class="toa_tbs toas_le" @click="go_carorder">
							查看订单
						</button>
						<button class="toa_tbs toas_ri" @click="car_fsd = false">
							继续预定
						</button>
					</cover-view>
				</cover-view>
			</cover-view>

			<cover-view class="cat_bootom">
				<cover-view class="cat_bootoms">
					<cover-view class="rouckts" @click="skfu">
						客服
					</cover-view>
					<cover-view class="cat_boos">
						<cover-view class="cauls">
							<cover-view class="cadlit" @click="catopck(item.id)" :class="catopvalue == item.id ? 'cadlited':''" v-for="(item,index) in catoplist"
							 :key="index">
								{{item.name}}
							</cover-view>
						</cover-view>

						<cover-view class="rouckt" @click="d_oks()">
							<cover-image class='roucktimg' src='/static/img/carbus/carbusingimg/location.png'></cover-image>
						</cover-view>
					</cover-view>
					<cover-view class="cat_selt">
						<cover-view class="cat_sels">
							<cover-view class="cacitysd" v-if="catopvalue == 3">
								<cover-view class="cflits" v-for="(item,index) in flots" @click="flotsid = item.id" :class="flotsid == item.id ? 'cflitsd':''"
								 :key="index">
									{{item.name}}
								</cover-view>
							</cover-view>
							<cover-view class="cacitys" v-if="catopvalue == 2 || (catopvalue ==3 && flotsid == 2)">
								<cover-view class="catleft">
									<cover-image class='catleftimg' src='/static/img/carbus/carbusingimg/time.png'></cover-image>
								</cover-view>
								<cover-view class="adresxt" style="border-bottom: 2upx solid #F1F1F1;">
									<htimepicker sTime="0" cTime="23" interval="1" @changeTime="changeTime">
										<cover-view slot="pCon" class="changeTime">
											<cover-view class="ctiemns" style="color: #C0C0C0;" v-if="timeop == ''">
												请选择预约时间
											</cover-view>
											<cover-view class="ctiemns" v-else>
												{{timeop}}
											</cover-view>
										</cover-view>
									</htimepicker>
								</cover-view>
							</cover-view>
							<cover-view class="cacitys" @click="citck(1)" v-if="catopvalue != 3">
								<cover-view class="catleft">
									<cover-view class="ca_x">
										<cover-view class="ca_xs">
										</cover-view>
									</cover-view>
								</cover-view>
								<cover-view class="adresx" style="border-bottom: 2upx solid #F1F1F1;">
									{{adderssnameop.name}}
								</cover-view>
							</cover-view>
							<cover-view class="cacitys" v-if="catopvalue == 3 && flotsid ==1">
								<cover-view class="catleft">
									<cover-view class="ca_x">
										<cover-view class="ca_xs">
										</cover-view>
									</cover-view>
								</cover-view>
								<cover-view class="adresx" style="border-bottom: 2upx solid #F1F1F1;" @click="ticks">
									<cover-view class="adresxs" v-if="ticketinlist.name != ''">
										{{ticketinlist.name}}
									</cover-view>
									<cover-view class="adresxs" style="color: #C0C0C0;" v-if="ticketinlist.name == ''">
										请选择航班
									</cover-view>
								</cover-view>
							</cover-view>
							<cover-view class="cacitys" v-if="catopvalue == 3 && flotsid ==1">
								<cover-view class="catleft">
									<cover-image class='catleftimg' src='/static/img/carbus/carbusingimg/time.png'></cover-image>
								</cover-view>
								<cover-view class="adresx" style="border-bottom: 2upx solid #F1F1F1;display: flex;align-items: center;">
									航班落地后
									<cover-view class="pucstr_time">
										<picker mode="selector" :value="endtims" :range="endtime" @change="bindChange">
											<cover-view class="uni-input">{{endtims}}</cover-view>
										</picker>
									</cover-view>
									<cover-view style="margin-left: 5rpx">分钟上车</cover-view>
								</cover-view>
							</cover-view>
							<cover-view class="cacitys" @click="citck(1)" v-if="catopvalue == 3 && flotsid == 2">
								<cover-view class="catleft">
									<cover-view class="ca_x">
										<cover-view class="ca_xs">
										</cover-view>
									</cover-view>
								</cover-view>
								<cover-view class="adresx" style="border-bottom: 2upx solid #F1F1F1;">
									{{adderssnameop.name}}
								</cover-view>
							</cover-view>
							<cover-view class="cacitys" @click="citck(2)" v-if="catopvalue != 3">
								<cover-view class="catleft">
									<cover-view class="ca_x" style="border: 2upx solid #F98B2A;">
										<cover-view class="ca_xs" style="background-color: #F98B2A;">
										</cover-view>
									</cover-view>
								</cover-view>
								<cover-view class="adresx">
									<cover-view class="adresxs" style="color: #C0C0C0;" v-if="adderssnameend.name == ''">
										你要去哪儿
									</cover-view>
									<cover-view class="adresxs" v-else>
										{{adderssnameend.name}}
									</cover-view>
								</cover-view>
							</cover-view>
							<cover-view class="cacitys" @click="citck(3)" v-if="catopvalue == 3">
								<cover-view class="catleft">
									<cover-view class="ca_x" style="border: 2upx solid #F98B2A;">
										<cover-view class="ca_xs" style="background-color: #F98B2A;">
										</cover-view>
									</cover-view>
								</cover-view>
								<cover-view class="adresx" v-if="flotsid == 1">
									<cover-view class="adresxs" style="color: #C0C0C0;" v-if="tiendname.name == ''">
										你要去哪儿
									</cover-view>
									<cover-view class="adresxs" v-else>
										{{tiendname.name}}
									</cover-view>
								</cover-view>
								<cover-view class="adresx" v-if="flotsid == 2">
									<cover-view class="adresxs" style="color: #C0C0C0;" v-if="tiendnames.name == ''">
										请输入送机机场
									</cover-view>
									<cover-view class="adresxs" v-else>
										{{tiendnames.name}}
									</cover-view>
								</cover-view>
							</cover-view>
						</cover-view>
					</cover-view>
				</cover-view>
			</cover-view>
		</map>
		<view class="ticketckls" v-if="ticketck">
			<headnavigation titles="选择航班"></headnavigation>
			<view class="l_list">
				<view class="i_nas" style="border-bottom: 1upx solid #F1F1F1;">
					<span class="iconfont">&#xe658;</span>
					<input type="text" v-model="finos" value="" placeholder="请输入航班号,如:CZ3503" />
					<span class="iconfont" @click="finos= ''">&#xe641;</span>
				</view>
				<view class="i_nas" @click="showPop">
					<span class="iconfont">&#xe649;</span>
					<view class="">
						{{fistatime}}
					</view>
					<view class="places" v-if="fistatime == ''">
						请选择航班日期
					</view>
				</view>
			</view>
			<view class="fibtns" @click="finbtn">
				确定
			</view>
		</view>
	</view>
</template>
<script>
	let appMap = null;
	import torok from '@/api/torowk.js'
	import py from "@/static/js/vue-py.js"
	import htimepicker from '@/components/h-timePicker/h-timePicker.vue'
	export default {
		data() {
			return {
				oldadress:[],//附近上车点
				car_fsd: false, //是否有未完成的订单
				show: false,
				endtims: 10, //飞机接机延长时间
				endtime: [10, 20, 30, 40, 50, 60],
				tiendname: { //接机地址
					name: '',
					adress: '',
					location: '',
					cityname:''
				},
				tiendnames: { //送机地址
					name: '',
					adress: '',
					location: '',
					cityname:''
				},
				catys: false, //选择地点
				ticketck: false, //接机航班选择
				timeop: '', //预约用车时间
				hotCitys: [],
				ser_int: '',
				citys: [],
				ticketinlist: {
					cityname:'',
					name: '',
					id: '',
					times: '',
					flightArrcode: '',
					adress: '',
					flightDeptimePlanDate: '',
					flightArrtimePlanDate: '',
					location: ''
				}, //接机航班信息
				addfor: 1, //搜索类型
				adderssnameop: { //出发地的名称和坐标
					name: '',
					adress: '',
					location: '',
					cityname: ''
				},
				adderssnameend: { //到达地的名称和坐标
					name: '',
					adress: '',
					location: '',
					cityname: ''
				},
				flots: [{
					name: '接机',
					id: 1
				}, {
					name: '送机',
					id: 2
				}],
				city_vl: "深圳",
				flotsid: 1,
				include_points: [],
				citylist: [],
				mapsit: true, //是否显示地图
				adderssname: '', //当前坐标名称
				teaisn: false,
				ibtnk: 1, //因公因私
				catoplist: [{
					name: '现在',
					id: 1
				}, {
					name: '预约',
					id: 2
				}, {
					name: '接送机',
					id: 3
				}],
				catopvalue: 1, //用车类型
				ibtlist: [{
					name: '因公',
					id: 1
				}, {
					name: '因私',
					id: 2
				}],
				scale: 18,
				longitude: 0,
				latitude: 0,
				markers: [],
				flightlist: {}
			}
		},
		components: {
			htimepicker,

		},
		onReady(options) {
			appMap = uni.createMapContext("midMap", this);
		},
		mounted() {
			this.seuserd(); //查看用户是否有未完成的订单

		},
		onLoad(data) {
			// #ifdef MP-WEIXIN
			this.isGetLocation();
			// #endif
			// #ifdef H5
			this.locations();
			// #endif
		},
		onShow() {
			uni.$on("searchcars", rets => {
				var res = rets.data;
				this.city_vl = res.city_vl;
				if (res.catopvalue == 1 || res.catopvalue == 2) { //现在用车/预约用车
					if (res.addfor == 1) {
						if (res.city != null && res.city != '') {
							this.adderssnameop = {
								name: res.name,
								adress: res.adress,
								location: res.location,
								cityname: res.city
							}
						} else {
							this.adderssnameop = {
								name: res.name,
								adress: res.adress,
								location: res.location,
								cityname: res.city
							}
						}
						this.longitude = res.longitude;
						this.latitude = res.latitude;
						this.atst(res.catopvalue); //跳转查询用车页面
					} else {
						if (res.city != null && res.city != '') {
							this.adderssnameend = {
								name: res.name,
								adress: res.adress,
								location: res.location,
								cityname: res.city
							}
						} else {
							this.adderssnameend = {
								name: res.name,
								adress: res.adress,
								location: res.location,
								cityname: res.city
							}
						}
						// if (this.markers.length == 1) {
						// 	this.markers.push({
						// 		latitude: parseFloat((Number(res.latitude) * 100).toFixed(6)),
						// 		longitude: parseFloat((Number(res.longitude) * 100).toFixed(6)),
						// 		iconPath: '../../../../static/img/carbus/locaend.png',
						// 		width: 24, //图标大小
						// 		height: 24,
						// 		label: {
						// 			content: res.name,
						// 			color: '#000000',
						// 			fontSize: 10
						// 		},
						// 		anchor: {
						// 			x: .5,
						// 			y: .9
						// 		} //图标偏移位置
						// 	})
						// } else {
						// 	this.markers[1].longitude = res.longitude;
						// 	this.markers[1].latitude = res.latitude;
						// }
						this.atst(res.catopvalue); //跳转查询用车页面
					}
				} else if (res.catopvalue == 3) { //接机/送机
					if (res.addfor == 1) {
						if (res.city != null && res.city != '') {
							this.adderssnameop = {
								name: res.name,
								adress: res.adress,
								location: res.location,
								cityname: res.city
							}
						} else {
							this.adderssnameop = {
								name: res.name,
								adress: res.adress,
								location: res.location,
								cityname: res.city
							}
						}
						this.longitude = res.longitude;
						this.latitude = res.latitude;
					} else {
						if (res.flotsid == 1) { //接机
							this.tiendname = {
								name: res.name,
								adress: res.adress,
								location: res.location,
								cityname: res.city
							}
						} else {
							this.tiendnames = {
								name: res.name,
								adress: res.adress,
								location: res.location,
								cityname: res.city
							}
						}
					}

					this.atst(this.catopvalue); //跳转查询用车页面
				}
				// 清除监听
				uni.$off('searchcars');
			})
			uni.$on("tocknos", rets => {
				var res = rets.data;
				this.flightlist = res.flightlist;
				this.ticketinlist.id = res.flightNo; //航班号
				this.ticketinlist.cityname = res.flightArr;//城市
				this.ticketinlist.flightDeptimePlanDate = res.flightDeptimePlanDate; //航班起飞时间
				this.ticketinlist.flightArrtimePlanDate = res.flightlist.flightArrtimePlanDate; //航班到达时间
				this.ticketinlist.adress = res.flightArrAirport;
				this.ticketinlist.flightArrcode = res.flightArrcode; //三字码
				this.ticketinlist.name = res.flightArrAirport;
				this.seatck(this.ticketinlist.adress, true)
				this.atst(this.catopvalue); //跳转查询用车页面
				// 清除监听
				uni.$off('tocknos');
			})
		},
		methods: {
			isGetLocation(a = "scope.userLocation") { // 3. 检查当前是否已经授权访问scope属性，参考下截图
				var _this = this;
				uni.getSetting({
					success(res) {
						if (!res.authSetting[a]) { //!res.authSetting[a] //3.1 每次进入程序判断当前是否获得授权，如果没有就去获得授权，如果获得授权，就直接获取当前地理位置
							_this.getAuthorizeInfo()
						} else {
							_this.getLocationInfo()
						}
					}
				});
			},
			getAuthorizeInfo(a = "scope.userLocation") { //1. uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
				var _this = this;
				uni.authorize({
					scope: a,
					success() { //1.1 允许授权
						_this.getLocationInfo();
					},
					fail() { //1.2 拒绝授权
						uni.showToast({
							title: '你拒绝了授权!',
							icon: 'none',
							duration: 1000
						})
						uni.navigateBack({})
					}
				})
			},
			getLocationInfo() { //2. 获取地理位置
				var _this = this;
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						console.log(res)
						

						if (_this.markers.length == 0) {
							_this.markers.push({
								latitude: res.latitude,
								longitude: res.longitude,
								iconPath: '/static/img/carbus/locast.png',
								width: 20, //图标大小
								height: 20,
								anchor: {
									x: .5,
									y: .5
								} //图标偏移位置
							})
						} else {
							_this.markers[0].latitude = res.latitude;
							_this.markers[0].longitude = res.longitude;
						}
						_this.adderss(res.longitude, res.latitude)
					}
				});
			},
			go_carorder() {
				this.car_fsd = false;
				uni.navigateTo({
					url: '/pages-order/pages/order/carorder/carorder'
				})
			},
			async seuserd() {
				try {
					let res = await torok.hasOutstandingOrder();
					if (res.code == 200) {
						if (res.data == true) {
							this.car_fsd = true;
						} else {
							this.car_fsd = false;
						}
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 1000
						})
					}
				} catch (e) {
					console.log(e)
				}
			},
			skfu() { //跳转外部客服
				let yzfSign = uni.getStorageSync('yzfSign' + uni.getStorageSync('appWxId')); //检验是否保存wx openid
				if (yzfSign == undefined || yzfSign == null) {
					yzfSign = '37ef9b97d17200952a40cbbd49b4e0318b470ea1eae0655afee142f44a436fc7471fce0fd42bb0786c64e492728d4495f3ed98';
				}
				//h5页面跳转
				// #ifdef  H5 || MP-WEIXIN
				window.location.href = 'https://yzf.qq.com/xv/web/static/chat/index.html?sign=' + yzfSign + '&c1=&c2=9988';
				// #endif
				//app内部跳转
				// #ifdef APP-PLUS
				void plus.runtime.openWeb('https://yzf.qq.com/xv/web/static/chat/index.html?sign=' + yzfSign + '&c1=&c2=9988');
				// #endif
			},
			locations() {
				let _this = this;
				// #ifdef  H5
				let ua = window.navigator.userAgent.toLowerCase();
				if (ua.match(/micromessenger/i) == 'micromessenger') {
					_this.$wechat.location(function(callback) {
						console.log('位置获取成功', callback)
						let call = callback;
						_this.longitude = call.longitude;
						_this.latitude = call.latitude;
						_this.adderss(call.longitude, call.latitude)
					})
				} else {
					_this.longitude = 114.057641;
					_this.latitude = 22.502942;
					_this.adderss(114.057641, 22.502942)
					uni.showModal({
						content: '请在微信浏览器中打开',
						showCancel: false
					});
				}
				// #endif
			},


			flitime(ti) { //航班时间转
				var tn = ti;
				var mon = tn.substr(5, 2);
				var day = tn.substr(8, 2);
				var times = tn.substr(11, 2) + ':' + tn.substr(14, 2);
				return mon + '月' + day + '日' + ' ' + times
			},
			// 取消事件
			cancel() {
				this.closet()
			},
			// 确认事件
			sure(e) {
				var month = e.month > 9 ? e.month : '0' + e.month;;
				var day = e.day > 9 ? e.day : '0' + e.day;
				this.fistatime = e.year + '-' + month + '-' + day;
				// 输出 { year: 2020,month: 3,day: 23}
			},

			bindChange(val) { //选择延迟多久接机
				this.endtims = this.endtime[val.detail.value];
				this.atst(this.catopvalue); //跳转查询用车页面
			},
			atst(val) {
				let sat = 0;
				let dats = {};
				if (val == 1 || val == 2) { //非空判断 正确就自动跳转页面
					if (this.adderssnameop.name == "" || this.adderssnameend.name == "") {
						return
					}
					if (val == 2 && this.timeop == "") {
						return
					}
					if (val == 1) { //立即叫车
						sat = 4;
						dats = {
							typename: this.ibtnk,
							opt: sat,
							or: this.adderssnameop,
							end: this.adderssnameend,
						}
					} else { //预约叫车
						sat = 3;
						dats = {
							typename: this.ibtnk,
							opt: sat,
							times: this.timeop, //预约时间
							or: this.adderssnameop,
							end: this.adderssnameend,
						}
					}
				} else if (val == 3) {
					if (this.flotsid == 1) { //接机
						sat = 1;
						if (this.endtims == '' || this.tiendname.name == '' || this.ticketinlist.name == '') {
							return
						}
						dats = {
							typename: this.ibtnk,
							opt: sat,
							flt: this.flightlist.flightNo, //航班号
							or: this.ticketinlist,
							flightDate: this.ticketinlist.flightDeptimePlanDate, //起飞时间
							flightArrtimePlanDate: this.ticketinlist.flightArrtimePlanDate, //航班到达时间
							airCode: this.flightlist.flightArrcode, //三字码
							flightDelayTime: this.endtims, //飞机延长时间
							end: this.tiendname, //目的地
							endName: this.city_vl
						}
					} else { //送机
						sat = 2;
						if (this.timeop == '' || this.tiendnames.name == '' || this.adderssnameop.name == '') {
							return
						}
						dats = {
							typename: this.ibtnk,
							opt: sat,
							times: this.timeop,
							or: this.adderssnameop,
							end: this.tiendnames, //目的地
						}
					}
				}
				setTimeout(() => {
					uni.redirectTo({
						url: './cartadd?data=' + JSON.stringify(dats)
					})
				}, 500)
			},
			ticks() { //选择航班
				uni.navigateTo({
					url: "carbusinesslist/tocknos"
				})
			},
			changeTime(time) { //选择预约用车时间
				this.timeop = time;
				this.atst(this.catopvalue); //跳转查询用车页面
			},
			dlek() { //删除搜索值
				this.ser_int = '';
				this.sev_boolt = false
			},
			getSystemInfo() {
				uni.getSystemInfo().then(res => {
					let [error, data] = res
					this.windowHeight = `${data.windowHeight}px`
				})
			},

			search_h(ev) { //监听搜索的值
				let _this = this
				let va = ev.mp.detail.value.trim() //获取搜索框的值
				if (va.length > 0) {
					this.seatck(va, false)
				}
			},
			async seatck(va, ls) {
				let _this = this;
				let tys = "";
				if ((_this.addfor == 3 && _this.flotsid == 2) || ls == true) { //送机类型
					tys = '飞机场'
				} else {
					tys = '基础设施,房产小区,银行金融,教育学校,文化场馆'
				}
				try{
					let dats = {
						region:this.city_vl,
						keyword: va,
						get_subpois:1,
						filter: 'category=' +tys
					}
					let res = await torok.placesuggestion(dats);
					let locst = res.data[0].location;
					_this.ticketinlist.location = locst.lng + ',' + locst.lat;
					let ors = _this.ticketinlist.location.split(',');
					_this.longitude = ors[0];
					_this.latitude = ors[1];
				} catch (e) {
					console.log(e)
				}
			},
			citck(it) {
				this.addfor = it; //用车类型
				// if (it == 3) {
				// 	console.log(it)
				// 	this.citval = '';
				// 	this.seatck('');
				// }
				var dats = {
					catopvalue: this.catopvalue,
					addfor: this.addfor,
					flotsid: this.flotsid,
					city_vl: this.city_vl
				}
				uni.navigateTo({
					url: './carbusinesslist/searchcars?data=' + JSON.stringify(dats)
				})
			},
			isbk(id) {
				this.ibtnk = id;
			},
			catopck(id) { //当前用车类型
				this.catopvalue = id;
			},
			d_oks() { //恢复到当前位置
				// #ifdef  H5
				this.locations();
				if (this.scale != 18) { //h5bug  获取不到最新的缩放等级 先这样写
					this.scale = 18;
				}
				this.teaisn = true;
				setTimeout(() => {
					this.teaisn = false;
				}, 1000);
				// #endif
				// #ifdef MP-WEIXIN
				this.getLocationInfo();
				// #endif
			},
			async adderss(longitude, latitude,sit) { //获取当前坐标下的城市
				let dats = {
					location: latitude + ',' + longitude,
					get_poi:1,
					poi_options:"policy=3"
				}
				try{
					let res = await torok.geocoder(dats);
					if(sit != 1){
						this.longitude = longitude;
						this.latitude = latitude;
					}
					
					let dat = res.result; //获取当前的位置和坐标
					this.adderssnameop.name = dat.pois[0].title;//当前地址
					this.adderssnameop.adress = dat.pois[0].address;
					this.adderssnameop.location = longitude + ',' + latitude;
					let str = dat.address_component.city;
					if (str.indexOf("市") != -1 || str.indexOf("州") != -1){
					    str = str.substring(0, str.length - 1)
					    console.log('删除城市的最后一个字',str)
					}
					this.adderssnameop.cityname = str;//当前城市
					this.city_vl = str; //获取当前城市
				}catch(err){
					console.log(err)
					//TODO handle the exception
				}
			},
			regionchange() {
				this.getCenter();
			},
			roublock() {
				uni.navigateBack({
				});
			},
			getCenter() { //视野发生移动时更改当前坐标
				let _that = this;
				appMap.getCenterLocation({ //获取当前坐标
					type: 'gcj02',
					success: function(res) {
						_that.teaisn = true;
						// _that.latitude = res.latitude.toString().substring(0,9); //对经纬度保留6位小数
						// _that.longitude = res.longitude.toString().substring(0,10);
						let lats = res.latitude.toString().substring(0, 9);
						let longs = res.longitude.toString().substring(0, 10);
						_that.adderss(longs, lats,1);
						setTimeout(() => {
							_that.teaisn = false;
						}, 1000)
					}
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.carlist {
		width: 100%;

		.rouckts {
			width: 70upx;
			height: 70upx;
			text-align: center;
			line-height: 70upx;
			background-color: #FFFFFF;
			border-radius: 50%;
			font-size: 24upx;
			float: right;
			margin: 0 30rpx 30rpx 0;
		}

		.carmap {
			.cat_top {
				width: calc(100% - 40upx);
				height: 70upx;
				padding: 20upx 20upx 0 20upx;
				/*  #ifdef MP-WEIXIN */
				padding-top: 80upx;
				/*  #endif  */
				display: flex;
				justify-content: space-between;

				.rouck {
					width: 70upx;
					height: 70upx;
					background-color: #FFFFFF;
					border-radius: 50%;
					display: flex;
					align-items: center;
					justify-content: center;

					.imgs {
						width: 45upx;
						height: 45upx;
					}
				}

				.roucks {
					width: 70upx;
					height: 70upx;
					text-align: center;
					line-height: 70upx;
					font-size: 24upx;
				}

				.antbns {
					width: 320upx;
					height: 70upx;
					background: #FFFFFF;
					border-radius: 70upx;
					display: flex;

					.anlis {
						width: 160upx;
						height: 70upx;
						text-align: center;
						font-size: 34upx;
						line-height: 75upx;
						border-radius: 70upx;
						color: #999999;
					}

					.anlisk {
						background: $uni-color-primary;
						color: #FFFFFF;
					}
				}
			}

			.fiexd {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 999;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, .3);
				display: flex;
				align-items: center;
				justify-content: center;

				.toasts {
					width: 500upx;
					height: 250upx;
					background-color: #FFFFFF;
					border-radius: 10upx;

					.toa_title {
						width: 100%;
						text-align: center;
						line-height: 160upx;
						font-size: 35upx;
					}

					.toa_btn {
						width: 100%;
						height: 90upx;
						display: flex;

						.toa_tbs {
							flex: 1;
							border: 0;
							border-radius: 0;
							line-height: 90upx;
							text-align: center;
							font-size: 35upx;
						}

						.toas_le {
							color: $uni-color-primary;
							border-radius: 0;
							background-color: #F1F1F1;
							border-bottom-left-radius: 10upx;
						}

						.toas_ri {
							background-color: $uni-color-primary;
							color: #FFFFFF;
							border-bottom-right-radius: 10upx;
						}
					}
				}
			}

			.cat_section {
				width: 100%;
				height: 150upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 28upx;
				color: black;
				margin-top: calc(100vh/2 - 225upx);
				/*  #ifdef  APP-PLUS || MP-WEIXIN */
				margin-top: calc(100vh/2 - 285upx);

				/*  #endif  */
				.cat_sec_top {
					padding: 0 20upx;
					height: 70upx;
					line-height: 70upx;
					color: #FFFFFF;
					background-color: $uni-color-primary;
					border-radius: 70upx;
				}

				.cat_sectionimg {
					margin-top: 10upx;
					margin-left: 12upx;
					width: 50upx;
					height: 50upx;
				}

				.mods {
					animation: myfirst .5s 2;
				}

				@keyframes myfirst {
					0% {
						transform: translate(0upx, 0upx);
					}

					50% {
						transform: translate(0upx, -10upx);
					}

					100% {
						transform: translate(0upx, 0upx);
					}
				}
			}

			.cat_bootom {
				width: 100%;
				position: absolute;
				left: 0;
				bottom: 20upx;

				.cat_bootoms {
					position: relative;

					.cat_boos {
						width: calc(100% - 40upx);
						padding: 0 20upx;
						height: 100upx;
						display: flex;
						justify-content: space-between;

						.cauls {
							display: flex;
							background-color: #FFFFFF;
							border-radius: 8upx;
							font-size: 30upx;

							.cadlit {
								line-height: 100upx;
								padding: 0 40upx;
								border-radius: 8upx;
							}

							.cadlited {
								background-color: $uni-color-primary;
								color: #FFFFFF;
							}
						}

						.rouckt {
							width: 100upx;
							height: 100upx;
							background-color: #FFFFFF;
							border-radius: 5upx;
							display: flex;
							align-items: center;
							justify-content: center;

							.roucktimg {
								width: 70upx;
								height: 70upx;
							}
						}
					}

					.cat_selt {
						width: calc(100% - 40upx);
						padding: 20upx 20upx 0 20upx;

						.cat_sels {
							width: 100%;
							background-color: #FFFFFF;
							border-radius: 8upx;

							.cacitysd {
								width: 100%;
								height: 70upx;
								display: flex;
								align-items: center;
								justify-content: center;

								.cflits {
									padding: 0 30upx;
									font-size: 30upx;
									line-height: 50upx;
									border-radius: 50upx;
									color: #999999;
									border: 1upx solid #FFFFFF;
								}

								.cflitsd {
									color: $uni-color-primary;
									border: 1upx solid $uni-color-primary;
								}
							}

							.cacitys {
								display: flex;
								align-items: center;
								width: 100%;
								height: 140upx;
								line-height: 140upx;

								.catleft {
									width: 140upx;
									height: 140upx;
									display: flex;
									align-items: center;
									justify-content: center;

									.catleftimg {
										width: 40upx;
										height: 40upx;
									}

									.ca_x {
										width: 32upx;
										height: 32upx;
										border-radius: 50%;
										background: #FFFFFF;
										border: 2upx solid #52C41A;
										display: flex;
										align-items: center;
										justify-content: center;

										.ca_xs {
											width: 24upx;
											height: 24upx;
											border-radius: 50%;
											background: #52C41A;
										}
									}
								}

								.adresxt {
									width: calc(100% - 140upx);
									height: 138upx;
									line-height: 140upx;

									.ctiemns {
										line-height: 140upx;
									}
								}

								.adresx {
									width: calc(100% - 140upx);
									height: 138upx;
									line-height: 140upx;
									font-size: 36upx;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;

									.adresxs {
										width: 100%;
										height: 140upx;
										line-height: 140upx;
										font-size: 36upx;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}

									.pucstr_time {
										width: 100upx;
										height: 50upx;
										font-size: 28upx;
										line-height: 50upx;
										text-align: center;
										margin: 0 10upx;
										border: 2upx solid #C8C7CC;
										border-radius: 10upx;

										.uni-input {
											line-height: 50upx;
										}
									}
								}
							}
						}
					}
				}

			}
		}

		.citylistfl {
			position: fixed;
			width: 100%;
			height: 100vh;
			z-index: 200;
			overflow: scroll;

			.input-op {
				width: calc(100% - 40upx);
				height: 80upx;
				padding: 15upx 20upx;
				background: #FFFFFF;

				.input-lis {
					display: flex;
					align-items: center;
					position: relative;
					padding: 0 15upx;
					width: calc(100% - 40upx);
					height: 80upx;
					background: #edf0f5;
					border-radius: 5upx;

					.input-css {
						width: 100%;
						font-size: 30upx;
						height: 60upx;
					}
				}
			}

			.sear_list {
				position: absolute;
				left: 0;
				top: 95upx;
				/*  #ifdef  APP-PLUS || MP-WEIXIN */
				top: 145upx;
				/*  #endif  */
				background: #FFFFFF;
				z-index: 999;
				width: 100%;
				height: 100%;
				text-indent: 15upx;

				.se_mai {
					font-size: 35upx;
					line-height: 80upx;
					border-bottom: 2upx solid #e1e1e1;

					.se_li {
						display: flex;
						border-top: 1upx solid #eef0ef;
					}

					.se_fath {
						display: flex;
					}

					.se_lu {
						font-size: 25upx;
						color: #C8C7CC;
					}
				}
			}
		}

	}
</style>
