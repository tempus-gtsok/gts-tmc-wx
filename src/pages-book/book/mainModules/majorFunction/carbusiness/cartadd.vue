<template>
	<view class="carlist">
		<loading></loading>
		<!-- <view class="Navigations">
			<view class="smtis">
				<view @click="routblock" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
			</view>
			<view class="btn_top">
				全程{{ distance }}，预计行驶{{ duration }}
			</view>
			<view class="smtis">
			</view>
		</view> -->
		<map id="midMap" :polyline="polyline" :include-points="include_points" class="carmap" :latitude="latitude" :longitude="longitude"
		 :scale="scale" :style=" {width: '100%',height: screenHeights + 'px'}" :markers="markers">
			<cover-view class="cat_top">
				<cover-view class="rouck" @click="routblock"><cover-image class='imgs' src='/static/img/carbus/carbusingimg/leftj.png'></cover-image></cover-view>
				<cover-view class="antbns">
					全程{{ distance }}，预计行驶{{ duration }}
				</cover-view>
				<cover-view class="roucks" @click="rotolist">
					订单
				</cover-view>
			</cover-view>
			<cover-view class="staleve" :class="{'staDis':staleve}">
				<cover-view class="stalist" @click.stop>
					<cover-view class="stalists">
						<cover-view class="statop" v-for="(item, index) in platformlist" :key="index" v-if="(notbooking && item.list.va == 4) || (!notbooking && item.list.va != 4)">
							<cover-view class="reds">
								<cover-view class="ts_text">{{ item.name }}</cover-view>
							</cover-view>
							<cover-view class="setlist" v-for="(items, ins) in item.list" :key="ins">
								<cover-view class="setbod">
									<cover-view class="styul">
										<cover-view class="styli_top">{{ items.name }}</cover-view>
										<cover-view class="stulis">
											<cover-view class="styli_left">超规人员:</cover-view>
											<cover-view class="styli_right">{{ items.list }}</cover-view>
										</cover-view>
									</cover-view>
									<cover-view class="styul" v-if="items.va == 3">
										<cover-view class="stulis">
											<cover-view class="styli_left">超规原因:</cover-view>
											<cover-view class="styli_right" @click="opclk(index)">
												<cover-view class="wors">
													<cover-view v-if="item.wg == '请选择违规原因'" style="color: #666666;">
														{{item.wg}}
													</cover-view>
													<cover-view v-else>
														{{item.wg}}
													</cover-view>
												</cover-view>
											</cover-view>
										</cover-view>
									</cover-view>
								</cover-view>
							</cover-view>
						</cover-view>
					</cover-view>
					<cover-view class="btnsti" v-if="!notbooking">
						<cover-view class="roblck" style="color: #000000" @click="notclose">取消</cover-view>
						<cover-view class="btnok " style="background: #3c85fd;color: #ffffff" @click="cits_btn">继续预定</cover-view>
					</cover-view>
				</cover-view>

			</cover-view>
			<cover-view class="cat_bootom">
				<cover-view class="catlis">
					<cover-view class=" cat_topt">
						<cover-view class="cat_tops" style="border-right: 1upx solid #F5F5F5;" @click="xname">
							<cover-image class='cat_topsms' src='/static/img/carbus/carbusingimg/people.png'></cover-image>
							<cover-view class="stname">{{ lxusername.name }}</cover-view>
						</cover-view>
						<cover-view class="cat_tops" @click="cston">
							<cover-image class='cat_topsms' src='/static/img/carbus/carbusingimg/money.png'></cover-image>
							<cover-view class="stnames" v-if="costcenterlist.length == 0">请选择成本中心</cover-view>
							<cover-view class="stname" v-else>{{ costnames(costcenterlist) }}</cover-view>
						</cover-view>
					</cover-view>
					<cover-view class="showcarsbg" v-if="!showcars"></cover-view>
					<cover-view class="verlist" v-if="showcars">
						<cover-view class="verli" 
						:class="vehid == index ? 'verlis' : ''" 
						:style="index == 0 ? {marginLeft: '0upx'} : ''" 
						v-for="(item, index) in vehicletype" 
						@click="vehicleid(index)"
							:key="index">
							{{ item.name }}
							<cover-image v-if="vehid == index" class='verimg' src='/static/img/carbus/caroks.jpg'></cover-image>
						</cover-view>
					</cover-view>
					<cover-view class="catul" v-if="showcars">
						<cover-view class="carlisty" v-for="(item, index) in newcarlists" v-if="item.price != 0" :key="index" @click="catcedk(item, index)">
							<cover-view class="carleft">
								<cover-view class="carlog">
									<cover-image class='cat_topsms' :src="item.img" v-if="item.img != null"></cover-image>
									<cover-image v-else src="/static/img/login/logo.png"></cover-image>
								</cover-view>
								<cover-view class="carnames">{{ item.stuname }}</cover-view>
							</cover-view>
							<cover-view class="carright">
								<cover-view class="carprice" v-if="item.price != 0">
									<cover-view class="tems">预估</cover-view>
									<cover-view class="prics">{{ item.price }}</cover-view>
									<cover-view class="tems">元</cover-view>
								</cover-view>
								<cover-view class="carprice" v-else>暂时无车</cover-view>
								<cover-image class='carpricemg' v-if="item.carid == true" src="/static/img/carbus/carbusingimg/selected.png"></cover-image>
								<cover-image class='carpricemg' v-else-if="item.price != 0" src="/static/img/carbus/carbusingimg/notselected.png"></cover-image>
								<cover-image class='carpricemg' v-else src="/static/img/carbus/carbusingimg/disable.png"></cover-image>
							</cover-view>
						</cover-view>
					</cover-view>
				</cover-view>
				<cover-view class="carbtns" @click="btnopen">{{ btntitl }}</cover-view>
			</cover-view>
			<cover-view class="pass_page" v-if="isuserlist">
				<cover-view class="Navigation">
					<cover-view @click="isusercbk" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</cover-view>
					<cover-view class="ongbutn">选择出行人</cover-view>
					<cover-view class="smtis"></cover-view>
				</cover-view>
				<cover-view class="pa-top">
					<input v-model="ser_int" type="text" value="" @input="search($event)" class="input-css" placeholder="搜索" />
					<cover-view v-if="trim(ser_int)" class="iconfont" @click="sea_null(ser_int)" style="color: #999999;">&#xe608;</cover-view>
				</cover-view>
				<cover-view class="sev_bool" v-if="sev_bool">
					<cover-view class="sev_bools" v-for="(item, index) in searchlists" @click="seoklist(item)" :key="index">
						<p>{{ item.userName }}</p>
						<p style="color: #007aff;font-size: 28upx;">{{ item.deptName }}</p>
					</cover-view>
				</cover-view>
				<cover-view class="pa_bot">
					<cover-view class="coll_lists">
						<cover-view class="mix-tree-list">
							<block v-for="(item, index) in treeList" :key="index">
								<cover-view class="mix-tree-item" :style="[
										{
											paddingLeft: item.rank * 15 + 'px',
											zIndex: item.rank * -1 + 50
										}
									]"
								 :class="{
										border: treeParams.border === true,
										show: item.show,
										last: item.lastRank,
										showchild: item.showChild,
										colors: !item.lastRank && item.showChild,
										rtlock: item.id == shetid
									}"
								 @click.stop="treeItemTap(item, index)">
									<cover-view v-if="!item.ischecds" class="tsd">
										<cover-view class="iconfont" style="color: #007aff;" v-if="!item.lastRank && item.showChild">&#xe8a0;</cover-view>
										<cover-view class="iconfont" v-if="!item.lastRank && !item.showChild">&#xe636;</cover-view>
										<cover-view class="" style="width: 40upx;" v-if="item.lastRank"></cover-view>
										{{ item.name }}
										<cover-view class="" v-if="item.rank == 0 && item.userCount > 0">({{ item.userCount }})</cover-view>
									</cover-view>
									<cover-view v-if="item.ischecds" class="tsd">
										<cover-view class="iconfont" :style="{ color: '#f1f1f1' }">{{ isoktl }}</cover-view>
										<cover-view style="margin-left: 20upx;">{{ item.name }}</cover-view>
									</cover-view>
								</cover-view>
							</block>
						</cover-view>
					</cover-view>
				</cover-view>
			</cover-view>
			<cover-view :class="{'share-box': shos}" @click="shosclose">
			</cover-view>
			<cover-view class="share-item" :class="{'share-show': shos}">
				<cover-view class="fxd_lists">
					<cover-view class="fd_li" v-for="(ruItem,indexs) in rulesReasons" :key="indexs" @click="seachopt(ruItem,indexs)">
						<cover-view :class="indexs == 0 ? 'fa_ios' : 'fa_lef' ">{{ruItem.chineseDesc}}</cover-view>
					</cover-view>
				</cover-view>
			</cover-view>
			<!---->
		</map>
	</view>
</template>

<script>
	let appMap = null;
	let gdkey = 'f34355ae385ced7460e7b1aa59934074';
	import totok from '@/api/torowk.js';
	export default {
		data() {
			return {
				showcars:false,//占位图是否显示
				screenHeights:1100,//默认高度
				newcarlists:[],//当前类型所有的车
				rulesReasonsindex: 0,
				blac_show: false,
				shos: false,
				btntitl: '马上叫车',
				arttime: '', //出发日期
				pookis: false, //是否再次审批
				limitNativeRule: {}, //未处理的违规信息
				rulesReasons: [], //超规类型
				platformlist: [], //处理过的违规信息
				platformtl: [], //违规原因
				notbooking: false, //是否违规不可预定
				staleve: false, //违规
				platFormType: [], //叫车平台
				moneys: [], //叫车价格
				carpaylist: [], //用车估价
				vehid: 1,
				vehicletype: [], //车类型
				carlists: [],
				costs: false, //是否显示成本
				costcenterlist: [],
				userlists: {},
				lxusername: {
					//联系人信息
					name: '',
					ipone: ''
				},
				costlist: [], //当前选择的成本中心
				polyline: [], //行程路线
				distance: 0, //行车距离
				duration: 0, //预计行驶时间
				include_points: [],
				scale: 18,
				longitude: 0,
				latitude: 0,
				markers: [],
				searchlists: [],
				sev_bool: false,
				isuserlist: false, //是否显示用户列表
				treeList: [], //归属部门列表
				shetid: 0,
				is_no: 1, //点击的左边还是右边
				is_index: 0, //当前点击的下标
				dtlist: {},
				typename: 0, //1因公2因私
				lslist: {}, //当前选择打车类型参数
				checkuserlist: [], //当前选择联系人信息
				ser_int: '',
				datas: [],
				platformlistIndex: '',
				dataWG: '请选择违规原因',
				startAddress: '', //接机机场详细地址
				city_code: '',
			};
		},
		onReady(options) {
			this.screenHeights = uni.getSystemInfoSync().screenHeight - 255;//高度等于屏幕的4/3
			appMap = uni.createMapContext('midMap', this);
		},
		onShow() {
			uni.$on('carcontacts', rets => {
				this.lxusername.name = rets.name;
				this.lxusername.ipone = rets.iponel;
				// 清除监听
				uni.$off('carcontacts');
			});
			uni.$on('carconstlist', rets => {
				this.costcenterlist = rets.dats;
				// 清除监听
				uni.$off('carconstlist');
			});
		},
		onLoad(dts) {
			try{
				let dt = JSON.parse(dts.data);
				this.datas = dt;
				this.dtlist = dt;
				this.typename = dt.typename;
				let times = '';
				
				let ors = dt.or.location.split(','); //出发经纬度
				let ends = dt.end.location.split(','); //到达点经纬度
				let ds = 0;
				let dtp = 0;
				let dsr = 0;
				let dtr = 0;
				let latitudes = '';
				let longitudets = '';
				let latitudets = '';
				let longitudes = '';
				if (ors[1] > ends[1]) {
					//以上下 来决定哪个为中心点
					ds = this.sub(ors[1], ends[1]); //两个相差多远
					dtp = this.accad(ds, 2); //相差2分之1的距离
					this.latitude = this.add(ends[1], dtp); //中心点多偏移 2分之1的距离
					latitudets = this.add(ors[1], this.accad(ds, 6)); //缩放时，最远的点多加2分之1的距离
				} else {
					ds = this.sub(ends[1], ors[1]);
					dtp = this.accad(ds, 2);
					this.latitude = this.add(ors[1], dtp);
				
					latitudes = this.add(ends[1], this.accad(ds, 6));
				}
				if (ors[0] > ends[0]) {
					//以左右 来决定哪个为中心点
					dsr = this.sub(ors[0], ends[0]); //两个相差多远
					dtr = this.accad(dsr, 2); //以最中间为中心点
					this.longitude = this.add(ends[0], dtr); //中心点多偏移 2分之1的距离
					longitudets = this.add(ors[0], this.accad(dsr, 6));
				} else {
					dsr = this.sub(ends[0], ors[0]);
					dtr = this.accad(dsr, 2);
					this.longitude = this.add(ors[0], dtr);
					longitudes = this.add(ends[0], this.accad(dsr, 6));
				}
				this.include_points = [{
						//根据两个点缩放地图的大小
						latitude: latitudes == '' ? ends[1] : latitudes,
						longitude: longitudes == '' ? ends[0] : longitudes
					},
					{
						latitude: latitudets == '' ? ors[1] : latitudets, //缩放时，最远的点多加3分之1的距离
						longitude: longitudets == '' ? ors[0] : longitudets
					}
				];
				this.markers = [
					{
						latitude: ors[1],
						longitude: ors[0],
						iconPath: '../../../../../static/img/carbus/fit.png',
						width: 14, //图标大小
						height: 28,
						callout: {
							content: dt.or.name,
							color: '#000000',
							fontSize: 10,
							display: 'ALWAYS',
							borderRadius: 10,
							padding:5
						},
						anchor: { x: 0.05, y: 0.8 } //图标偏移位置
					},
					{
						latitude: ends[1],
						longitude: ends[0],
						iconPath: '../../../../../static/img/carbus/fend.png',
						width: 14, //图标大小
						height: 28,
						callout: {
							content: dt.end.name,
							color: '#000000',
							fontSize: 10,
							display: 'ALWAYS',
							borderRadius: 10,
							padding:5
						},
						anchor: { x: 0.05, y: 0.8 } //图标偏移位置
					}
				];
				this.parametes((ors[1] + ',' +ors[0]), (ends[1] + ',' +ends[0]),dt.or.name,dt.end.name); //画线
				let dats = {}; //参数
				if (dt.opt == 3) {
					//立即叫车或者预约叫车
					times = dt.times;
					dats = {
						startName: dt.or.name,
						startAddress: dt.or.adress,
						endName: dt.end.name,
						endAddress: dt.end.adress,
						dt: dt.opt,
						ors: ors,
						ends: ends,
						times: times
					};
				} else if (dt.opt == 4) {
					dats = {
						startName: dt.or.name,
						startAddress: dt.or.adress,
						endName: dt.end.name,
						endAddress: dt.end.adress,
						dt: dt.opt,
						ors: ors,
						ends: ends
					};
				} else if (dt.opt == 1) {//接机
					dats = {
						location: dt.or.location,
						dt: dt.opt,
						startName: dt.or.name,
						flt: dt.flt, //航班号
						flightDate: dt.flightDate, //起飞时间
						flightArriveDate: dt.flightArrtimePlanDate,
						airCode: dt.airCode, //三字码
						flightDelayTime: dt.flightDelayTime, //飞机延长时间
						elat: ends[1],
						elng: ends[0], //目的地
						endName: dt.end.name,
						endAddress: dt.end.adress,
					};
				} else if (dt.opt == 2) {//送机
					dats = {
						dt: dt.opt,
						departureTime: dt.times, //预约时间
						ors: ors,
						ends: ends, //目的地
						startName: dt.or.name,
						startAddress: dt.or.adress,
						endName: dt.end.name,
						endAddress: dt.end.adress
					};
				}
				this.carprice(dats); //获取车辆信息
			}catch(e){
				console.log(e)
				//TODO handle the exception
			}
			

		},
		mounted() {
			const data = uni.getStorageSync('userinfo' + uni.getStorageSync('appWxId')); //获取当前预订人信息
			this.userlists = data;
			this.lxusername.name = data.user.name;
			this.lxusername.ipone = data.user.phone;
			this.costcenterlist = [{
				passengerNo: data.passengerVo.id,
				username: data.user.name,
				costcenterName: data.passengerVo.costcenterName,
				costcenterId: data.passengerVo.costcenterId,
				bn: 100,
				deptId: data.user.deptId,
				deptName: data.user.deptName,
				userId: data.passengerVo.userID,
				phone: data.user.phone,
				employeeType: data.passengerVo.employeeType
			}];
		},
		methods: {
			opclk(index) {
				this.platformlistIndex = index;
				this.blac_show = true;
				this.shos = true;
			},

			trim(ev) {
				//判断是否有值
				if (ev.trim().length > 0) {
					return true;
				} else {
					return false;
				}
			},
			rotolist() {
				uni.navigateTo({
					url: '/pages-order/pages/order/carorder/carorder'
				});
			},
			isusercbk() {
				this.isuserlist = false;
				this.id_list = [];
			},
			notclose() {
				this.blac_show = false;
				this.shos = false;
				this.staleve = false;
				this.btntitl = '马上叫车';
			},
			seachopt(ruItem, index) { //选择类型
				this.platformlist[this.platformlistIndex].wg = ruItem.chineseDesc
				this.shos = false;
			},
			shosclose(){
				this.shos = false;
			},	
			cits_btn() {
				//继续用车
				let plallist = this.platformlist;
				for (let p in this.limitNativeRule) {
					for (let i in this.limitNativeRule[p]) {
						if (i == 3) {
							let ks = 0;
							for (let k in plallist) {
								for (let p in plallist[k].list) {
									if (plallist[k].list[p].va == 3 && plallist[k].wg == '请选择违规原因') {
										uni.showToast({
											title: '请选择违规原因',
											duration: 1000,
											icon: 'none'
										});
										return;
									}
									if ((plallist[k].names = p && plallist[k].list[p].va == 3)) {
										ks = plallist[k].index;
									}
								}
							}
							this.limitNativeRule[p][i] = {
								usernames: this.limitNativeRule[p][i],
								reasons: this.rulesReasons[ks].chineseDesc
							};
						}
					}
				}
				this.dalits.wbp['violation'] = JSON.stringify({
					information: [this.limitNativeRule]
				});
				this.staleve = false;
				if (this.pookis) {
					this.btntitl = '马上叫车';
					uni.navigateTo({
						url: './carforck?dats=' + encodeURIComponent(JSON.stringify(this.dalits)) + '&data=' + encodeURIComponent(JSON.stringify(
							this.dtlist))
					});
				} else {
					this.dalits.wbp.isviolation = 1;
					this.createUseCarOrder();
				}
			},
			async createUseCarOrder() {
				try {
					let res = await totok.createUseCarOrder(this.dalits);
					this.btntitl = '马上叫车';

					if (res.code == 200) {
						uni.showToast({
							title: '下单成功！',
							duration: 1000,
							icon: 'none'
						});
						
						setTimeout(() => {
							uni.setStorageSync("sworders_od",{
								type:'carodd',
								data:res.data
							});
							uni.switchTab({
								url: '/pages/order/order',
								success:function(){
								}
							})
						}, 1000);
					} else {
						uni.showToast({
							title: res.message,
							duration: 2000,
							icon: 'none'
						});
					}
				} catch (e) {

					//TODO handle the exception
				}
			},
			async btnopen() {
				//叫车
				if (this.btntitl != '马上叫车') {
					return;
				}
				if (this.lxusername.ipone == '') {
					uni.showToast({
						title: '请输入联系电话',
						duration: 1000,
						icon: 'none'
					});
					return;
				}
				let _this = this;
				let vehid = _this.vehid; //车类型
				let usnlist = _this.costcenterlist; //用户信息
				let uset = [];
				let gysmc = '';//车平台
				let cxzmc= '';//车类型
				let lists = _this.newcarlists; //选择的车
				_this.platFormType = []; //车平台
				_this.moneys = []; //价格
				let cartypes = [];
				for (let k in lists) {
					if (lists[k].carid == true) {//判断是否选中
						gysmc = lists[k].stuname;
						cxzmc = lists[k].name;
						_this.platFormType.push(lists[k].id);
						_this.moneys.push(lists[k].price);
						cartypes.push({
							estimateId: lists[k].estimateId,
							carPlatformCode: lists[k].id,
							estimatePrice: lists[k].price
						});

					}
				}
				if (_this.platFormType.length == 0) {
					uni.showToast({
						title: '请选择一个车',
						duration: 1000,
						icon: 'none'
					});
					return;
				}
				let tripPassengerList = [];
				let carSaleOrderDetail = [];
				for (let k in this.costcenterlist) {
					tripPassengerList.push({
						deptId: this.costcenterlist[k].deptId,
						deptName: this.costcenterlist[k].deptName,
						userId: this.costcenterlist[k].userId,
						name: this.costcenterlist[k].username,
						phone: this.costcenterlist[k].phone,
						employeeType: this.costcenterlist[k].employeeType
					});
					carSaleOrderDetail.push({
						passengerNo: this.costcenterlist[k].passengerNo,
						passengerName: this.costcenterlist[k].username,
						percent: parseFloat(this.costcenterlist[k].bn / 100).toFixed(2),
						phone: this.costcenterlist[k].phone,
						costCenterId: this.costcenterlist[k].costcenterId,
						costCenterName: this.costcenterlist[k].costcenterName
					});
				}
				let ordernos = {
					startCityName:this.datas.or.cityname,
					destCityName: this.datas.end.cityname,
					cxzmc:cxzmc,//车类型
					gysmc: gysmc,//车平台
					departureTime: this.arttime, //出发日期
					platformOrderInfo: cartypes,
					carSaleOrderDetail: carSaleOrderDetail,
					carGroupId: vehid,
					passengerMobile: this.lxusername.ipone,
					passengerName: this.lxusername.name
				};
				let newObj = {};
				Object.assign(newObj, ordernos, this.lslist);
				this.dalits = {
					wbp: {
						tripPassengerList: tripPassengerList,
						apprvTaskEntity: {
							taskType: 2, //1为事前2为事中，
							beforeMiddle: 2, //1为事前2为事中
							startDate: this.arttime, //出发日期
							costId: this.userlists.passengerVo.costcenterId,
							costName: this.userlists.passengerVo.costcenterName
						},
						typename: this.typename,
						isviolation: 0
					},
					carSaleOrderVo: newObj
				};
				this.btntitl = '提交中...';
				if (this.typename == 2) {
					//因私
					this.createUseCarOrder();
				} else {
					for (let p in usnlist) {
						uset.push({
							passengerNo: usnlist[p].passengerNo,
							percentage: parseFloat(usnlist[p].bn / 100).toFixed(2)
						});
					}
					let dat = {
						platFormType: _this.platFormType,
						carGroup: vehid,
						moneys: _this.moneys,
						passengerList: uset,
						useCarDate: this.arttime
					};

					try {
						let res = await totok.checkUseCarRule(dat);
						if (res.code == 200) {
							if (JSON.stringify(res.data.limitNativeRule) == '{}') {
								//没有违规
								this.createUseCarOrder();
							} else {
								_this.rulesReasons = res.data.rulesReason; //违规原因
								_this.rulesReasons.unshift({
									chineseDesc: '请选择违规原因'
								});
								console.log(JSON.stringify(_this.rulesReasons))
								let dal = res.data.limitNativeRule; //违规信息
								this.limitNativeRule = dal;
								_this.platformlist = [];
								_this.notbooking = false;
								_this.pookis = false;
								for (let k in dal) {
									_this.platformlist.push({
										index: 0,
										wg: '请选择违规原因',
										name: _this.platnams(k),
										names: k,
										list: _this.platname(dal[k])
									});
								}
								for (let p in _this.platformlist) {
									for (let k in _this.platformlist[p].list) {
										if (_this.platformlist[p].list[k].va == 4) {
											_this.notbooking = true;
										}
										if (_this.platformlist[p].list[k].va == 5) {
											_this.pookis = true; //是否再次审批
										}
									}
								}

								_this.staleve = true;
							}
						} else {

							_this.btntitl = '马上叫车';
							uni.showToast({
								duration: 1000,
								title: res.message,
								icon: 'none'
							});
						}
					} catch (e) {

						_this.btntitl = '马上叫车';
						//TODO handle the exception
					}
				}
			},
			platnams(name) {
				if (name == 'platformLimit') {
					return '平台限制超规';
				} else if (name == 'carGroupLimit') {
					return '车型限制超规';
				} else if (name == 'eachTimePriceLimit') {
					return '金额每次限制超规';
				} else if (name == 'eachDayPriceLimit') {
					return '金额每天限制超规';
				} else if (name == 'eachMonthPriceLimit') {
					return '金额每月限制超规';
				}
			},
			platname(list) {
				let su = [];
				for (let k in list) {
					if (k == 1) {
						su.push({
							va: k,
							name: '只记录不提示',
							list: list[k]
						});
					} else if (k == 2) {
						su.push({
							va: k,
							name: '违规不必选择原因',
							list: list[k]
						});
					} else if (k == 3) {
						su.push({
							va: k,
							name: '违规必选原因',
							list: list[k],
							reasons: ''
						});
					} else if (k == 4) {
						su.push({
							va: k,
							name: '不可预定',
							list: list[k]
						});
					} else if (k == 5) {
						su.push({
							va: k,
							name: '违规再次审批',
							list: list[k]
						});
					}
				}
				return su;
			},
			async carprice(dlt) {
				try {
					let ls = {};
					let lts = {};
					let artime = '';
					if (dlt.dt == 4) {
						//立即叫车
						ls = {
							serviceId: 4,
							slat: dlt.ors[1],
							slng: dlt.ors[0],
							elat: dlt.ends[1],
							elng: dlt.ends[0],
							startCityName: this.datas.or.cityname,
							destCityName: this.datas.end.cityname,
							startName: dlt.startName,
							startAddress: dlt.startAddress,
							destName: dlt.endName,
							destAddress: dlt.endAddress
						};
						lts = {
							serviceId: 4,
							slat: dlt.ors[1],
							slng: dlt.ors[0],
							elat: dlt.ends[1],
							elng: dlt.ends[0],
							startName: dlt.startName,
							startAddress: dlt.startAddress,
							endName: dlt.endName,
							endAddress: dlt.endAddress
						};
						let dte = new Date();
						let year = dte.getFullYear();
						let mon = dte.getMonth() + 1 < 10 ? '0' + (dte.getMonth() + 1) : dte.getMonth() + 1;
						let day = dte.getDate() < 10 ? '0' + dte.getDate() : dte.getDate();
						artime = year + '-' + mon + '-' + day + ' 00:00:00';
					} else if (dlt.dt == 3) {//预约叫车
						//预约用车
						ls = {
							departureTime: this.dataunix(dlt.times),
							startCityName: this.datas.or.cityname,
							destCityName: this.datas.end.cityname,
							serviceId: 3,
							slat: dlt.ors[1],
							slng: dlt.ors[0],
							elat: dlt.ends[1],
							elng: dlt.ends[0],
							startName: dlt.startName,
							startAddress: dlt.startAddress,
							destName: dlt.endName,
							destAddress: dlt.endAddress
						};
						lts = {
							startName: dlt.startName,
							startAddress: dlt.startAddress,
							endName: dlt.endName,
							endAddress: dlt.endAddress,
							departureTime: dlt.times,
							serviceId: 3,
							slat: dlt.ors[1],
							slng: dlt.ors[0],
							elat: dlt.ends[1],
							elng: dlt.ends[0]
						};
						artime = dlt.times;
					} else if (dlt.dt == 1) {//接机
						ls = {
							serviceId: 1,
							flt: dlt.flt, //航班号
							flightDate: this.dataunix(dlt.flightDate), //起飞时间
							flightArriveDate: this.dataunix(dlt.flightArriveDate), //到达时间
							airCode: dlt.airCode, //三字码
							flightDelayTime: dlt.flightDelayTime, //飞机延长时间
							slng: dlt.location.split(",")[0],
							slat: dlt.location.split(",")[1],
							elat: dlt.elat,
							elng: dlt.elng, //目的地
							startCityName: this.datas.or.cityname,
							destCityName: this.datas.end.cityname,
							startName: dlt.startName,
							startAddress: this.startAddress,
							destName: dlt.endName,
							destAddress: dlt.endAddress
						};
						lts = {
							serviceId: 1,
							flt: dlt.flt, //航班号
							flightDate: this.dataunix(dlt.flightDate), //起飞时间
							airCode: dlt.airCode, //三字码
							flightDelayTime: dlt.flightDelayTime, //飞机延长时间
							elat: dlt.elat,
							elng: dlt.elng, //目的地
							startName: dlt.startName,
							endName: dlt.endName,
							endAddress: dlt.endAddress,
							startCityName: this.datas.or.cityname,
							destCityName: this.datas.end.cityname,
							flightArriveDate: this.dataunix(dlt.flightArriveDate),
						};
						artime = dlt.flightDate;
					} else if (dlt.dt == 2) {//送机
						ls = {
							departureTime: this.dataunix(dlt.departureTime),
							startCityName: this.datas.or.cityname,
							destCityName: this.datas.end.cityname,
							serviceId: 2,
							slat: dlt.ors[1],
							slng: dlt.ors[0],
							elat: dlt.ends[1],
							elng: dlt.ends[0],
							startName: dlt.startName,
							startAddress: dlt.startAddress,
							destName: dlt.endName,
							destAddress: dlt.endAddress
						};
						lts = {
							startCityName: this.datas.or.cityname,
							destCityName: this.datas.end.cityname,
							startName: dlt.startName,
							startAddress: dlt.startAddress,
							endName: dlt.endName,
							endAddress: dlt.endAddress,
							departureTime: dlt.departureTime,
							serviceId: 2,
							slat: dlt.ors[1],
							slng: dlt.ors[0],
							elat: dlt.ends[1],
							elng: dlt.ends[0]
						};
						artime = dlt.departureTime;
					}
					this.arttime = artime; //出发日期
					this.lslist = lts;
					
					let res = await totok.getPlatFormUseCar(ls); //平台类型
					if (res.code == 200) {
						this.carlists = [];
						let da = res.data;
						for (let k in da) {
							this.carlists.push({
								img: da[k].supplierLogoUrl,
								name: da[k].supplierTypeName,
								carid: false,
								id: k,
								price: 0
							});
						}
					} else {
						uni.showToast({
							title: res.message,
							duration: 1000,
							icon: 'none'
						});
					}
					let redt = await totok.getUseCarType(ls); //车类型
					if (redt.code == 200) {
						this.vehicletype = [];
						let das = redt.data;
						for (let k in das) {
							this.vehicletype.push({
								name: das[k],
								id: k,
								list:[]
							});
						}
						let dats = await totok.getUseCarEstimatedCost(ls); //预估金额
						if (dats.code == 200) {
							let dacars = dats.data;
							let carlist = [];
							for(let i in dacars){
								let stu;
								for(let p in this.carlists){//所有平台值
									if(this.carlists[p].id == i){
										stu = this.carlists[p];
									}
								}
								for(let k in dacars[i].pricesMap){
									carlist.push({
										carGroupId:dacars[i].pricesMap[k].carGroupId,//车型id
										estimateId:dacars[i].pricesMap[k].estimateId,
										name:dacars[i].pricesMap[k].name,//车型价格
										price:dacars[i].pricesMap[k].price,//价格
										id:i,//平台
										img: stu.img,//平台logo
										stuname: stu.name,//平台名字
										carid: false
									})
								}
							}
							for (let k =this.vehicletype.length - 1;k >= 0;k--) {//所有车型
								for(let o in carlist){//所有车数据
									if(this.vehicletype[k].id == carlist[o].carGroupId){
										this.vehicletype[k].list.push(carlist[o])
									}	
								}
								if(this.vehicletype[k].list.length == 0){
									this.vehicletype.splice(k,1)
								}
							}
						} else {
							uni.showToast({
								title: dats.message,
								duration: 3000,
								icon: 'none'
							});
						}
					} else {
						uni.showToast({
							title: redt.message,
							duration: 1000,
							icon: 'none'
						});
					}
					if(this.vehicletype.length > 0){//有车辆服务
						this.vehicleid(0);
						this.showcars = true;
					}
				} catch (e) {
					//TODO handle the exception
					console.log(e);
				}
			},
			catcedk(item, index) {
				if (item.price == 0) {
					return;
				}
				let its = item.carid;
				if (its) {
					this.newcarlists[index].carid = false;
				} else {
					for(let i in this.newcarlists){
						this.newcarlists[i].carid = false;
					}
					this.newcarlists[index].carid = true;
				}
			},
			dataunix(time) {
				var new_str = time.replace(/:/g, '-');
				new_str = new_str.replace(/ /g, '-');
				var arr = new_str.split('-');
				var datum = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
				return datum.getTime() / 1000;
			},
			vehicleid(id) {
				//切换车型
				this.vehid = id;
				this.newcarlists = this.vehicletype[id].list;
			},
			costnames(list) {
				//重新拼接成本中心名称
				if (list.length == 1) {
					return list[0].costcenterName;
				} else {
					let su = [];
					for (let i in list) {
						su.push(list[i].costcenterName);
					}
					return su.join(',');
				}
			},
			cston() {
				//选择成本中心
				if (this.costcenterlist.length == 0) {
					this.costlist = [{
						passengerNo: '',
						username: '',
						costcenterName: '',
						costcenterId: 0,
						bn: 0,
						deptId: 0,
						deptName: '',
						userId: 0,
						phone: 0,
						employeeType: ''
					}];
				} else {
					let ts = [...this.costcenterlist];
					this.costlist = ts;
				}
				uni.navigateTo({
					url: './cartaddlist/carconstlist?data=' + encodeURIComponent(JSON.stringify(this.costlist))
				});
			},
			xname() {
				//选择联系人
				this.is_no = 1; //点击的左边
				let datsy = {
					namel: this.lxusername.name,
					iponel: this.lxusername.ipone
				};
				uni.navigateTo({
					url: './cartaddlist/carcontacts?data=' + JSON.stringify(datsy)
				});
			},
			async parametes(fits, end) {
				//驾车路线规划
				let dats = {
					from: fits,
					to: end
				};
				try{
					let res = await totok.direction(dats);
					let dat = res.result.routes[0];
					var coors= dat.polyline;
					for (var i = 2; i < coors.length ; i++)
					{coors[i] = coors[i-2] + coors[i]/1000000}
					
					this.distance = this.dism(dat.distance); //多远 单位米
					this.duration = this.hous(dat.duration * 60); //多久 单位分钟
					let points = []; //路径规划
					
					for(var k = 1; k < coors.length / 2; k++){
						points.push({
							arrowLine: true,
							longitude: coors[k * 2 - 1],
							latitude: coors[k * 2 - 2]
						});
					}
					// this.markers = [{
					// 		latitude: points[0].latitude,
					// 		longitude: points[0].longitude,
					// 		iconPath: '../../../../static/img/carbus/fit.png',
					// 		width: 14, //图标大小
					// 		height: 28,
					// 		callout: {
					// 			content: orname,
					// 			color: '#000000',
					// 			fontSize: 10,
					// 			display: 'ALWAYS',
					// 			borderRadius: 10
					// 		},
					// 		anchor: {
					// 			x: 0.5,
					// 			y: 1
					// 		} //图标偏移位置
					// 	},
					// 	{
					// 		latitude: points[points.length-1].latitude,
					// 		longitude: points[points.length-1].longitude,
					// 		iconPath: '../../../../static/img/carbus/fend.png',
					// 		width: 14, //图标大小
					// 		height: 28,
					// 		callout: {
					// 			content: endname,
					// 			color: '#000000',
					// 			fontSize: 10,
					// 			display: 'ALWAYS',
					// 			borderRadius: 10
					// 		},
					// 		anchor: {
					// 			x: 0.5,
					// 			y: 1
					// 		} //图标偏移位置
					// 	}
					// ];
					this.polyline = [{
						strokeOpacity: 1,     // 线透明度
						strokeStyle: 'solid',  // 线样式
						lineJoin: 'round',  // 折线拐点的绘制样式
						points: points,
						color: '#04be02',
						arrowLine:true,
						borderColor:'#016100',
						borderWidth:3,
						width: 8
					}];
					
				}catch(e){
					console.log(e)
					//TODO handle the exception
				}
			},
			dism(m) {
				//米转为公里
				if (m >= 1000) {
					let d = parseFloat(m / 1000).toFixed(1);
					return d + '公里';
				} else {
					return m + '米';
				}
			},
			hous(time) {
				let times = '';
				if (time > 60 && time < 60 * 60) {
					times = parseInt(time / 60.0) + '分钟';
				} else if (time >= 60 * 60 && time < 60 * 60 * 24) {
					times = parseInt(time / 3600.0) + '小时' + parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) +
						'分钟';
				} else if (time >= 60 * 60 * 24) {
					times = parseInt(time / 3600.0 / 24) + '天' + parseInt((parseFloat(time / 3600.0 / 24) - parseInt(time / 3600.0 /
						24)) * 24) + '小时';
				} else {
					times = parseInt(time) + '秒';
				}
				return times;
			},
			add(a, b) {
				//经纬度的 加减乘除
				var c, d, e;
				try {
					c = a.toString().split('.')[1].length;
				} catch (f) {
					c = 0;
				}
				try {
					d = b.toString().split('.')[1].length;
				} catch (f) {
					d = 0;
				}
				return (e = Math.pow(10, Math.max(c, d))), (this.mul(a, e) + this.mul(b, e)) / e;
			},
			sub(a, b) {
				//减法
				var c, d, e;
				try {
					c = a.toString().split('.')[1].length;
				} catch (f) {
					c = 0;
				}
				try {
					d = b.toString().split('.')[1].length;
				} catch (f) {
					d = 0;
				}
				return (e = Math.pow(10, Math.max(c, d))), (this.mul(a, e) - this.mul(b, e)) / e;
			},
			accad(a, b) {
				//除法
				var c,
					d,
					e = 0,
					f = 0;
				try {
					e = a.toString().split('.')[1].length;
				} catch (g) {}
				try {
					f = b.toString().split('.')[1].length;
				} catch (g) {}
				return (c = Number(a.toString().replace('.', ''))), (d = Number(b.toString().replace('.', ''))), this.mul(c / d,
					Math.pow(10, f - e));
			},
			mul(a, b) {
				//乘法
				var c = 0,
					d = a.toString(),
					e = b.toString();
				try {
					c += d.split('.')[1].length;
				} catch (f) {}
				try {
					c += e.split('.')[1].length;
				} catch (f) {}
				return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c);
			},
			routblock() {
				// #ifdef H5
				history.back();
				// #endif
				// #ifdef MP-WEIXIN
				uni.navigateBack()
				// #endif
			}
		}
	};
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
</style>
<style scoped lang="scss">

	.carlist {
		position: relative;
		color: #333333;
		width: 100%;

		// .Navigations {
		// 	width: 100%;
		// 	height: 90upx;
		// 	width: 100%;
		// 	/*  #ifdef  APP-PLUS || MP-WEIXIN */
		// 	padding-top: 75upx;
		// 	/*  #endif  */
		// 	display: flex;
		// 	justify-content: space-between;
		// 	align-items: center;
		// 	background: linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);
		// 	.smtis{
		// 		image {
		// 			width: 45upx;
		// 			height: 45upx;
		// 		}
		// 	}
		// 	.btn_top {
		// 		display: flex;
		// 		color: #FFFFFF;
		// 	}
		// }
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
			.fxd_lists {
				width: 100%;
				max-height: 540upx;

				//overflow: scroll;
				.fd_li {
					width: 100%;
					height: 90upx;
					background: #FFFFFF;
					border-bottom: 2upx solid #F1F1F1;
					display: flex;
					line-height: 90upx;

					.fa_lefs {
						text-align: center;
						width: 100%;
					}

					.fa_ios {
						width: 100%;
						height: 90upx;
						background: #F6F6F6;
						line-height: 70upx;
						text-align: center;
						color: #C0C0C0;
					}

					.fa_lef {
						margin-top: 20rpx;
						width: 100%;
						text-align: center;
					}

					.ok_ioc {
						text-align: center;
						width: 15%;
					}
				}
			}
		}
		.cat_top {
			width: calc(100% - 40upx);
			height: 70upx;
			padding: 20upx 20upx 0 20upx;
			/*  #ifdef  APP-PLUS || MP-WEIXIN */
			padding-top: 60upx;
			/*  #endif  */
			display: flex;
			justify-content: space-between;
			.rouck {
				width: 70upx;
				height: 70upx;
				background-color: #ffffff;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				.imgs{
					width: 45upx;
					height: 45upx;
				}
			}
			.roucks {
				width: 70upx;
				height: 70upx;
				background-color: #ffffff;
				border-radius: 10upx;
				font-size: 24upx;
				text-align: center;
				line-height: 70upx;
			}
			.antbns {
				padding: 0 20upx;
				height: 70upx;
				line-height: 70upx;
				text-align: center;
				font-size: 26upx;
				background: #ffffff;
				border-radius: 70upx;
			}
		}
		.staleve {
			display: none;
			position: fixed;
			left: 0;
			top: 0;
			width: calc(100% - 100upx);
			height: 100%;
			padding: 0 50upx;
			background: rgba(0, 0, 0, 0.3);
			z-index: 500;
			//display: flex;
			align-items: center;
			justify-content: center;
			color: #000000;

			.stalist {
				color: #333333;
				width: 100%;
				border-radius: 20upx;
				font-size: 35upx;
				line-height: 90upx;

				.stalists {
					height: 491px;
					overflow: scroll;
					position: relative;
					background: #f1f1f1;
				}

				.statop {
					padding: 5upx 20upx;
					width:calc(100% - 40upx);
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
							border: 2upx solid #ffffff;
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
										text-indent: 10upx;
										display: flex;
										align-items: center;
										justify-content: flex-end;
									}

									.styli_right {
										width: 75%;
										margin-left: 5%;
										text-indent: 10upx;
										.wors {
											width: 80%;
											font-size: 30upx;
											text-indent: 20upx;
											height: 60upx;
											display: flex;
											align-items: center;
											border: 2upx solid $uni-color-primary;
											border-radius: 15upx;
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
					text-align: center;
					display: flex;
					color: #000000;

					.roblck {
						color: #000000;
						flex: 1;
						line-height: 90upx;
						background: #ffffff;
						border-bottom-left-radius: 15upx;

						/deep/ .uni-cover-view {
							color: #000;
						}
					}

					.btnok {
						//background: linear-gradient(to right, #4e92fd 0%, #6e46fe 100%) ;
						flex: 1;
						line-height: 90upx;
						border-bottom-right-radius: 15upx;
						color: #ffffff;

						/deep/ .uni-cover-view {
							color: #fff;
						}
					}
				}
			}
		}

		.staDis {
			display: flex;
		}

		.cat_bootom {
			width: 100%;
			// padding: 0 20upx;
			position: fixed;
			left: 0;
			bottom: 0;
			background-color: #efefef;
			border-top-left-radius: 30upx;
			border-top-right-radius: 30upx;
			.catlis {
				width: calc(100% - 40upx);
				padding: 20upx 20upx 0 20upx;
				background: #efefef;
				border-radius: 15upx;

				.cat_topt {
					width: 100%;
					display: flex;
					height: 70upx;
					border-radius: 70upx;
					background-color: #FFFFFF;

					.cat_tops {
						width: 50%;
						display: flex;
						align-items: center;
						line-height: 70upx;
						color: #bebebe;
						font-size: 36upx;

						.cat_topsms {
							margin: 0 20upx;
							width: 40upx;
							height: 40upx;
						}

						span {
							margin: 0 20upx;
						}

						.stname {
							width: calc(100% - 90upx);
							text-indent: 10upx;
							font-size: 28upx;
							color: #333333;
						}

						.stnames {
							width: calc(100% - 90upx);
							text-indent: 10upx;
							color: #c0c0c0;
						}
					}
				}
				.showcarsbg{
					width: 100%;
					height: 308upx;
					margin-top: 20upx;
					border-radius: 20upx;
					background-image: url(@/static/img/carbus/caraddzw.jpg);
					background-size: cover;
				}	
				.verlist {
					display: flex;
					overflow: auto;
					padding: 20upx 0;
					font-size: 28upx;
					.verli {
						flex-shrink: 0;
						font-weight: 700;
						width: calc(23% - 4upx);
						margin-left: 2%;
						height: 68upx;
						line-height: 67upx;
						text-align: center;
						position: relative;
						border: 2upx solid #FFFFFF;
						border-radius: 13upx;
						background-color: #FFFFFF;
						.verimg{
							position: absolute;
							right: -2upx;
							top: 0;
							width: 25upx;
							height: 24upx;
						}
					}

					.verlis {
						border: 2upx solid #007aff;
						background-color: #e9eff6;
						color: $uni-color-primary;
					}
				}

				.catul {
					width: 100%;
					height: 240upx;
					max-height: 240upx;
					overflow: scroll;
					font-size: 32upx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.carlisty {
						width: calc(100% - 40upx);
						padding: 0 20upx;
						margin-bottom: 20upx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						border-radius: 8upx;
						height: 80upx;
						background-color: #FFFFFF;
						.carleft {
							display: flex;
							align-items: center;

							.carlog {
								width: 60upx;
								height: 60upx;

								image {
									width: 100%;
									height: 100%;
								}
							}

							.carnames {
								font-size: 30upx;
								margin-left: 30upx;
							}
						}

						.carright {
							display: flex;
							align-items: center;

							.carprice {
								margin-right: 40upx;
								display: flex;
								height: 60upx;

								.prics {
									color: #ff8f2e;
									font-size: 45upx;
									line-height:60upx ;
								}

								.tems {
									margin: 0 1upx;
									font-size: 22upx;
									line-height: 70upx;
									transform: scale(.8);
								}
							}

							.carpricemg {
								width: 40upx;
								height: 40upx;
							}
						}
					}
				}
			}

			.carbtns {
				width: 100%;
				height: 110upx;
				line-height: 110upx;
				text-align: center;
				color: #ffffff;
				font-size: 35upx;
				border-bottom-left-radius: 12upx;
				border-bottom-right-radius: 12upx;
				background-color: $uni-color-primary;
			}
		}

		.pass_page {
			position: fixed;
			z-index: 310;
			left: 0;
			top: 0;
			/*  #ifdef  APP-PLUS || MP-WEIXIN */
			padding-top: 50upx;
			/*  #endif  */
			width: 100%;
			height: 100%;
			overflow: scroll;
			background: #f1f1f1;

			.pa-top {
				width: calc(100% - 60upx);
				height: 120upx;
				padding: 0 30upx;
				background: #ffffff;
				display: flex;
				align-items: center;

				input {
					width: 100%;
					height: 80upx;
				}

				.pa_bok {
					margin-right: 20upx;
					display: flex;
					align-items: center;

					.pa_tou {
						.pa_tou_img {
							margin: 0 5upx;
							width: 60upx;
							height: 60upx;
							border-radius: 50%;
						}
					}
				}
			}

			.sev_bool {
				position: fixed;
				left: 0;
				top: 220upx;
				width: 100%;
				background: #ffffff;
				z-index: 1000;
				height: 100%;

				.sev_bools {
					width: calc(100% - 40upx);
					font-size: 32upx;
					height: 80upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 20upx;
					border-bottom: 1upx solid #c8c7cc;
				}
			}

			.pa_bot {
				margin-top: 20upx;
				width: 100%;
				background: #ffffff;

				.coll_lists {
					width: 100%;
					height: 100%;
					overflow: hidden;
					background: #ffffff;

					.mix-tree-list {
						display: flex;
						flex-direction: column;
						padding-left: 30upx;

						.mix-tree-item {
							display: flex;
							align-items: center;
							font-size: 30upx;
							color: #333;
							height: 0;
							opacity: 0;
							transition: 0.2s;
							position: relative;

							.tsd {
								display: flex;
								align-items: center;
							}
						}

						.mix-tree-icon {
							width: 26upx;
							height: 26upx;
							margin-right: 8upx;
							opacity: 0.9;
						}

						.mix-tree-item.border {}

						.mix-tree-item.show {
							border-bottom: 2upx solid #eee;
							height: 80upx;
							opacity: 1;
						}

						.mix-tree-item.colors {
							color: $uni-color-primary;
						}

						.mix-tree-item.rtlock {
							color: $uni-color-primary;
						}

						.mix-tree-item.showchild:before {
							transform: rotate(90deg);
						}

						.mix-tree-item.last:before {
							opacity: 0;
						}
					}
				}
			}

			.fixd_btn {
				position: fixed;
				z-index: 815;
				bottom: 150upx;
				right: 30upx;
				font-size: 35upx;
				color: #ffffff;
				text-align: center;
				line-height: 70upx;
				width: 160upx;
				height: 70upx;
				border-radius: 70upx;
				background: $uni-color-primary;
			}
		}
	}
</style>
