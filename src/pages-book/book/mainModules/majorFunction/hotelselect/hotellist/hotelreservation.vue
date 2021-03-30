<template>
	<view class="hotelreas">
		<loading>
		</loading>
		<headnavigation titles="订单填写"></headnavigation>
		<view class="htos_top">
			<view class="titles">{{datalist.datalist.resName}}</view>
			<view class="tilopens">{{datalist.hots.supPriceName}}</view>
			<view class="tiskt">{{eats(datalist.hots.breakfastCount)}} <span v-if="datalist.hots.roomFeature!=null">{{datalist.hots.roomFeature}}</span>
			</view>
			<view class="tiskt">
				{{datalist.datatiem.choiceDate[0].month}}月
				{{datalist.datatiem.choiceDate[0].day}}日
				&nbsp;周{{datalist.datatiem.choiceDate[0].week}}&nbsp;
				入住,&nbsp;
				{{datalist.datatiem.choiceDate[1].month}}月
				{{datalist.datatiem.choiceDate[1].day}}日
				&nbsp;周{{datalist.datatiem.choiceDate[1].week}}&nbsp;
				离店,&nbsp;
				{{datalist.datatiem.dayCount}}天
			</view>
			<view class="tskgout">
				<view class="chekoutl">
					取消规则:
				</view>
				<view class="chekouts">
					{{bookingNotesos}}
				</view>
			</view>
		</view>
		<view class="black_mu" @click="isshow" v-if="blac_show"></view>
		<!-- <view class="userlist" :class="shos ? 'show' : ''">
			<view class="userlist_top">
				{{use_text}}
			</view>
			<view class="ci_list">
				<view class="cl_val" v-if="si_pl == 'fot'" v-for="(item, index) in id_list" :key="index" @click="ad_cion(item, index)">
					<view>{{ item.name }}</view>
				</view>
				<view class="cl_valt"  v-if="si_pl == 'fots'" >
					<view  v-for="(item, index) in user_lists" :key="index" @click="ad_cions(item, index)">
						<view class="cl_vals" v-if="item.is == 0">{{ item.userName }}</view>
						<view class="ad_vals" v-else-if="item.is == indes">{{ item.userName }}</view>
						<view class="ck_vals" v-else>{{ item.userName }}</view>
					</view>
				</view>
			</view>
		</view> -->
		<!-- <view class="hotsev">
			<view class="hots" @click="hos_lk">
				<view class="htos_left">
					:
				</view>
				<view class="htos_right">
					<picker class="picks" :range="hoslist" :range-key="'name'"  @change="hostchang">
						<view class="uni-input">{{hoslist[hostindex].name}}</view>
					</picker>
				</view>
				<view class="iconfont" style="font-size: 35upx;">
					&#xe61f;
				</view>
			</view>
			<view class="hots" v-for="(item,index) in htosfor" :key="index" @click="addmon(item,index)">
				<view class="htos_left">
					{{item.name}}
				</view>
				<view class="htos_right">
					<view class="htos_adli" v-for="(items,indexs) in item.userlist" :key="indexs">
						{{items.userName}}
					</view>
				</view>
				<view class="iconfont" style="color: #007aff;font-size: 45upx;">
					{{item.icon}}
				</view>
			</view>
		</view> -->
		<view class="istaf">
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">房间数:</view>
					<view class="ravright">
						<view class="bos">
							<picker class="picks" :range="hoslist" :range-key="'name'" @change="hostchang">
								<view class="uni-input">{{hoslist[hostindex].name}}</view>
							</picker>
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
		</view>
		<view class="istaf">
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">最早入住时间:</view>
					<view class="ravright">
						<view class="bos">
							<picker class="picks" mode="time" :value="times" start="09:01" end="21:01" @change="bindTimeChange">
								<view class="uni-input">{{times}}</view>
							</picker>
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
		</view>
		<view class="istaf">
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">最晚入住时间:</view>
					<view class="ravright">
						<view class="bos">
							<picker class="picks" mode="time" :value="timed" start="09:01" end="21:01" @change="bindTimeChanges">
								<view class="uni-input">{{timed}}</view>
							</picker>
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
		</view>
		<view class="optslist" :class="ops_list ? 'show' : ''">
			<view class="btns">
				<view class="btns_z" @click="isshow">
					取消
				</view>
				<view class="btns_z"></view>
				<view class="btns_z" @click="okisd">
					确定
				</view>
			</view>
			<view class="stlist">
				<view class="sltleft">
					<view class="ulsk_list" @click="slcikd(item.id)" :class="slid == item.id? 'cked':''" v-for="(item,index) in ullist"
					 :key="index">
						{{item.name}}
					</view>
				</view>
				<view class="sltright">
					<view class="sltrig_top">
						<view class="sltiig_top_left">当前选择:</view>
						<view class="sltiig_top_right" @click="reblocks(item)" :class="slit_id_checd == item.id ? 'stis':''" v-for="(item,index) in slitlist"
						 :key="index">
							{{item.name}}
						</view>
					</view>
					<view class="sltrig_bot">
						<view class="striglist" @click="clslitk(item)" v-for="(item,index) in sli_namelist" :key="index">
							<view class="stlis_left">
								<view class="">
									{{item.name}}
								</view>
							</view>
							<view class="stlis_right" v-if="slit_id_checd == item.id">
								<view class="iconfont" style="color: #007aff;">
									&#xe60b;
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="botmis">
				当前选择的成本中心是:{{botname}}
			</view>
		</view>
		<view class="istaf" v-if="isshowcenter">
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">归属部门:</view>
					<view class="ravright">
						<view class="bos">
							{{attdepartment}}
						</view>
					</view>
				</view>
			</view>
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">成本中心:</view>
					<view class="ravright" @click="approval()">
						<view class="bos">
							{{NameCenter.name}}
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
			<view class="ravelv" v-if="CostCi">
				<view class="ts">
					<view class="rav_left">成本审批人:</view>
					<view class="ravright" @click="appswlists('CostCenterlist')">
						<view class="bos">
							<view class="swname" v-for="(item,index) in TravelCostCenlist" :key="index">
								{{item.staffName}}
							</view>
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
			<view class="ravelv" v-if="CostCis">
				<view class="ts">
					<view class="rav_left">部门审批人:</view>
					<view class="ravright" @click="appswlists('Deparapprover')">
						<view class="bos">
							<view class="swname" v-for="(item,index) in TravelDepartlist" :key="index">
								{{item.staffName}}
							</view>
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
		</view>
		<view class="istaf" v-if="datalist.datlist.isblcks == 2 && datalist.datlist.isbtd == 1">
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">出行事由:</view>
					<view class="ravright">
						<view class="bos">
							<input type="text" v-model="reson" placeholder="请输入出行事由" value="" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="istaf">
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">联系人:</view>
					<view class="ravright">
						<view class="bos">
							<input type="text" v-model="user_name" placeholder="请输入联系人" value="" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="istaf">
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">联系电话:</view>
					<view class="ravright">
						<view class="bos">
							<input type="number" maxlength="11" v-model="user_ipone" placeholder="请输入联系电话" value="" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="isswflist" :class="switfal ? 'show' : ''">
			<view class="btns">
				<view class="btns_z" @click="isshow">
					取消
				</view>
				<view class="btns_z" v-if="isswf">
					成本审核人选择
				</view>
				<view class="btns_z" v-if="!isswf">
					部门审核人选择
				</view>
				<view class="btns_z" @click="oksoption">
					确定
				</view>
			</view>
			<view class="isstops" v-if="isswf">
				<view class="isstop" v-for="(item,index) in CostCenterlist" :key="index">
					{{index+1}}级审批：
					<view class="wors">
						<picker :range="item.apprvCostFlowNodePersons" :range-key="'staffName'" @change="CostCenterChange($event,index)">
							{{ item.apprvCostFlowNodePersons[CostCenter[index].index].staffName }}
						</picker>
					</view>
				</view>
			</view>
			<view class="isstops" v-if="!isswf">
				<view class="isstop" v-for="(item,index) in Deparapprover" :key="index">
					{{index+1}}级审批：
					<view class="wors">
						<picker :range="item.apprvDeptFlowNodePersons" :range-key="'staffName'" @change="DeparappChange($event,index)">
							{{ item.apprvDeptFlowNodePersons[Deparapp[index].index].staffName }}
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="costlists" :class="costs ? 'show' : ''">
			<view class="costl_t">
				费用明细
			</view>
			<view class="costlist_s">
				<view class="cost_li costs">
					<view class="scse_l">
						总房价：
					</view>
					<view class="scse_r">
						<view class="corssize" style="line-height: 60upx;">
							￥{{firPrices}}
						</view>
						<p style="line-height: 30upx;">(每晚价格都有浮动，以实际价格为准)</p>
					</view>
				</view>
				<view class="cost_li costs">
					<view class="scse_l">
						房间数量：
					</view>
					<view class="scse_r">
						<view class="">
							{{hostindex + 1}}间
						</view>
					</view>
				</view>
				<view class="cost_li costs">
					<view class="scse_l">
						住宿天数：
					</view>
					<view class="scse_r">
						<view class="">
							{{timeli}}晚
						</view>
					</view>
				</view>
				<view class="cost_li costs">
					<view class="scse_l">
						总人数：
					</view>
					<view class="scse_r">
						<view class="">
							{{userlists.length}}人
						</view>
					</view>
				</view>
				<view class="cost_li costs">
					<view class="scse_l">
						服务费：
					</view>
					<view class="scse_r">
						<span class="corssize">
							￥{{Brokerage}}
						</span>
						<span style="margin-left: 10upx;">
							x&nbsp;{{userlists.length}}份
						</span>
					</view>
				</view>
				<view class="cost_li">
					<view class="scse_l">
						总额：
					</view>
					<view class="scse_r">
						<view class="corssize" style="font-size:40upx;">
							￥{{connum}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btnbottm">
			<view class="btnbo_left">
				￥{{connum}}
				<view class="scslist" @click="clikst">
					费用详情
				</view>
			</view>
			<view class="btnbo_right" v-if="rotes('tms:hotel:reserve')" @click="btnok">
				提交下单
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
				resids: 0,
				bookingNotesos: '',
				supplierNo: 0,
				timeli: 0,
				reson: '', //出行事由
				orderRoomInfos: [], //当前房价信息
				user_name: '', //联系人
				user_ipone: '', //联系电话
				Brokerage: 0, //服务费
				costs: false,
				times: '18:00',
				timed: '20:00',
				hoslist: [],
				hostindex: 0, //当前房间数量
				CostCenter: [],
				CostCi: false,
				CostCis: false, //是否有部门审批人
				TravelDepartlist: [], //部门审批人
				TravelCostCenlist: [], //成本中心
				scardns: [],
				userlists: [], //用户列表
				slid: 1,
				switfal: false,
				ullist: [{
					name: '成本中心',
					id: 1
				}],
				slitlist: [],
				sli_namelist: [],
				cbname: '', //成本中心名称
				cbid: '', //成本中心id
				botname: '', //当前选择的成本中心名称
				slit_id_checd: 0, //当前点击成本中心的id
				treeLists: [], //归属部门列表
				ops_list: false, //归属部门

				attdepartment: '', //归属部门
				CostCenterlist: [], //成本中心审批人
				isswf: true, //true为成本中心 false为部门   审批人
				Deparapprover: [], //部门审批人
				NameCenter: {
					name: '',
					id: ''
				},
				connum: 0,
				indes: 0,
				user_lists: [],
				si_pl: '',
				use_text: '',
				hots_num: '1间',
				blac_show: false,
				shos: false,
				// id_list: [{
				// 	id: 1,
				// 	name:'1间'
				// }],
				// htosfor:[{
				// 	name: '房间1:',
				// 	userlist: [],//入住人
				// 	icon: '\ue632'
				// }],//房间信息
				datalist: {},
				cshttext: '',
				texttime: '',

				orderUseDateDetails: [],
				firPrices: 0,
				isblckt: false,//事前是否违规再次审批
				sttos:0,//事前是否违规再次审批  1为开启二次审批 3为违规再次审批
				vehicleId: '',
				Deparapp: [],
				hotel: '',
				yaDuoRoom: '',
				proDataJson: '',
				linkManPassengerNo:'',//联系人旅客编号
				isshowcenter:false,//是否显示审批信息
			}
		},
		onLoad(item) {
			this.datalist = JSON.parse(uni.getStorageSync("hotelreservation_data"));
			this.isblckt = this.datalist.isblckt; //事前是否需要二次审批
			this.userlists = this.datalist.datlist.butalist;
			let leng = this.datalist.datlist.butalist.length; //入住人数量
			this.id_list = [];
			for (let i = 0; i < leng; i++) {
				this.hoslist.push({
					id: i + 1,
					name: (i + 1) + '间'
				})
			}
			this.hostindex = leng - 1;
			// for (let i = 0; i < this.datalist.datlist.butalist.length; i++) {
			// 	this.user_lists.push(this.datalist.datlist.butalist[i])
			// 	this.user_lists[i]['is'] = 0;//判断在哪个房间 为0时没在房间
			// }
			this.cshttext = this.datalist.hots; //当前酒店信息
		},
		mounted() {
			this.usernams();
			this.HotelBrokerages(); //获取手续费
			if (this.datalist.isarsrl == false && this.datalist.datlist.isblcks == 1) { //不是免审
				this.getRuleMainSetting();
			} else {
				this.isshowcentermt();//是否显示审批信息
			}
			if (this.datalist.datlist.isblcks == 1) { //判断是否事前 不是免审
				this.attdepartment = this.datalist.datlist.mokksli.deptName;
				this.NameCenter = {
					name: this.datalist.datlist.mokksli.costName,
					id: this.datalist.datlist.mokksli.costId
				};
			} else {
				const data = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //获取归属部门
				if (data.deptName) {
					this.attdepartment = data.deptName;
				}
			}
			this.toZHXBooks(); //价格校验
			this.selts(); //查询成本中心
		},
		methods: {
			isshowcentermt(){
				//1事前2事中 3事前违规在次 4改签
				if(this.datalist.datlist.isbtd == 1 && !this.datalist.isarsrl){ //因公 非免审
					if(this.datalist.datlist.isblcks == 2||
					this.datalist.datlist.isblcks == 4 && this.RuleMas||
					this.datalist.datlist.isblcks == 1 && this.isblckt == true){
						this.isshowcenter = true;//显示审批信息
					}
				}
			},
			async getRuleMainSetting() { //事前是否二次过审

				try {
					let res = await order.RuleMainSetting();

					let stw = res.data.examineSwitch.split(',');
					this.isblckt = this.datalist.isblckt; //事前是否需要二次审批
					if(this.isblckt){
						this.sttos = 3;
					}	
					for (let i in stw) {
						/**
						 * 3代表事前二次过审
						 */
						if (stw[i] == 3) {
							//如果用户不是免审 就要事前二次过审
							if(!this.isblckt){
								this.sttos = 1;
								this.isblckt = true;
							}
						}
					}
					this.isshowcentermt();//是否显示审批信息
					if (this.isblckt == true) { //如果需要二次审批 默认载入成本中心
						this.okisd();
					}
				} catch (e) {
					console.log(e);

				}
			},
			async usernams() { //获取联系人
				if (this.datalist.datlist.butalist[0].vehicleId != undefined) {
					this.vehicleId = this.datalist.datlist.butalist[0].vehicleId; //事前id
				}
				try {
					const res = await tork.getContactInfo();
					if (res.code == 200) {
						this.user_name = res.data.name;
						this.user_ipone = res.data.phone;
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e);
				}
			},
			async HotelBrokerages() { //获取手续费
				try {
					const res = await tork.getHotelBrokerage();
					if (res.code == 200) {
						this.Brokerage = res.data;
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e);
				}
			},
			async toZHXBooks() { //实时查询当前房型价格
				let that = this;

				try {
					let dats = that.datalist;
					if (dats.hots.supplierType == 5) {//中航信
						let res = await tork.toZHXBook({
							checkInDate: dats.datatiem.choiceDate[0].re,
							checkOutDate: dats.datatiem.choiceDate[1].re,
							holMidId: dats.datlist.hotelCode,
							hotelId: dats.hots.hotelCode,
							proId: dats.hots.proId,
							ratePlanCode: dats.hots.ratePlanCode,
							vendorCode: dats.hots.vendorCode
						})
						if (res.code == 200) {
							let dat = res.data
							if (dat.hasOwnProperty('error')) {
								this.hotelError(dat);
							} else {
								that.resids = dats.datalist.resId;
								that.orderRoomInfos = dat.roomPrice; //采购价
								that.bookingNotesos = dat.resBaseInfo.cancelDescription; //取消规则
								let prics = dat.userRoom.proSaleInfoDetailsTarget; //销售采购价
								let sit = [];
								that.supplierNo = dat.resBaseInfo.supplierNo;
								that.firPrices = 0;
								for (let k in prics) {
									sit.push({
										useDate: k,
										amountPrice: prics[k].amountPrice,
										oneDateaAmountPrice: prics[k].amountPriceSum,
									})
									that.firPrices += prics[k].amountPriceSum;
									this.timeli += 1;
								}
								this.prics();
								this.orderUseDateDetails = sit;
							}
						}
					} else if (dats.hots.supplierType == 4) {//艺龙
						let res = await tork.toELONGBook({
							hotelDetailSearchReq: {
								checkinDate: dats.datatiem.choiceDate[0].re,
								checkoutDate: dats.datatiem.choiceDate[1].re,
								proId: dats.hots.proId,
								productUniqueId: dats.hots.productUniqueId,
								channelData: dats.hots.channelData
							},
							holMidId: dats.datlist.hotelCode
						})
						if (res.code == 200) {
							let dat = res.data
							if (dat.hasOwnProperty('error')) {
								this.hotelError(dat);
							} else {
								that.resids = dat.hotel.id;
								that.orderRoomInfos = dat.orderRoomInfos; //采购价
								that.bookingNotesos = dat.hotel.description; //取消规则
								let prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
								let sit = [];
								that.supplierNo = dat.hotel.supplierNo;
								that.firPrices = 0;
								for (let k in prics) {
									sit.push({
										useDate: k,
										amountPrice: prics[k].amountPrice,
										oneDateaAmountPrice: prics[k].amountPriceSum,
									})
									that.firPrices += prics[k].amountPriceSum;
									this.timeli += 1;
								}
								this.prics();
								this.orderUseDateDetails = sit;
							}
						}
					} else if (dats.hots.supplierType == 6) {//云游酒店
						let res = await tork.toYYOUBook({
							roomInfo: {
								checkInDate: dats.datatiem.choiceDate[0].re,
								checkOutDate: dats.datatiem.choiceDate[1].re,
								roomId: dats.hots.productUniqueId,
								holMidId: dats.datalist.resId,
								roomTypeId: dats.hots.proId,
								supplierId: dats.hots.vendorCode,
								// 是否可以取消
								policyType: dats.hots.cancelable,
								// 取消时限
								lastCancelTime: dats.hots.policyRemark,
								// 取消条款信息
								cancelPolicyInfo: dats.hots.bookingNotes
							},
							hotelCode: dats.hots.hotelCode
						})
						if (res.code == 200) {
							let dat = res.data
							if (dat.hasOwnProperty('error')) {
								this.hotelError(dat);
							} else {
								that.resids = dats.datalist.resId;
								that.orderRoomInfos = dat.orderRoomInfos; //采购价
								that.bookingNotesos = dat.room.bookingNotes; //取消规则
								let prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
								let sit = [];
								that.supplierNo = dat.hotel.supplierNo;
								that.firPrices = 0;
								for (let k in prics) {
									sit.push({
										useDate: k,
										amountPrice: prics[k].amountPrice,
										oneDateaAmountPrice: prics[k].amountPriceSum,
									})
									that.firPrices += prics[k].amountPriceSum;
									this.timeli += 1;
								}
								this.prics();
								this.orderUseDateDetails = sit;
							}
						}
					} else if (dats.hots.supplierType == 7) {//华住
						let res = await tork.toHuazhuBook({
							checkInDate: dats.datlist.se_doubletimel,
							checkOutDate: dats.datlist.se_doubletimer,
							hotelId: dats.hots.resId,
							guaranteeMode: dats.hots.guaranteeMode,
							roomTypeId: dats.hots.proId,
							rateCode: dats.hots.productUniqueId,
							activityId: dats.hots.activityId,
							rateCodeType: dats.hots.rateCodeType
						})
						if (res.code == 200) {
							let dat = res.data
							if (dat.hasOwnProperty('error')) {
								this.hotelError(dat);
							} else {
								that.resids = dat.hotel.id;
								that.orderRoomInfos = dat.orderRoomInfos; //采购价
								that.bookingNotesos = dat.hotel.description; //取消规则
								that.hotel = dat;
								let prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
								let sit = [];
								that.supplierNo = dat.hotel.supplierNo;
								that.firPrices = 0;
								for (let k in prics) {
									sit.push({
										useDate: k,
										amountPrice: prics[k].amountPrice,
										oneDateaAmountPrice: prics[k].amountPriceSum,
									})
									that.firPrices += prics[k].amountPriceSum;
									this.timeli += 1;
								}
								this.prics();
								this.orderUseDateDetails = sit;
							}
						}
					} else if (dats.hots.supplierType == 9) {//亚朵酒店
						let res = await tork.toYaduoBook({
							hotelDetailSearchReq: {
								checkinDate: dats.datatiem.choiceDate[0].re,
								checkoutDate: dats.datatiem.choiceDate[1].re,
								proId: dats.hots.proId,
								productUniqueId: dats.hots.productUniqueId,
								holMidId: dats.datlist.hotelCode,
								cityName: dats.datlist.city.name,
								supplierType: dats.hots.supplierType,
								travelType: dats.datlist.isbtd,
								hotelCode: dats.hots.resId
							}
						})
						if (res.code == 200) {
							let dat = res.data
							if (dat.hasOwnProperty('error')) {
								this.hotelError(dat);
							} else {
								that.resids = dat.hotel.id;
								that.orderRoomInfos = dat.orderRoomInfos; //采购价
								that.bookingNotesos = dat.hotel.description; //取消规则
								let prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
								that.yaDuoRoom = dat.room;
								let sit = [];
								that.supplierNo = dat.hotel.supplierNo;
								that.firPrices = 0;
								for (let k in prics) {
									sit.push({
										useDate: k,
										amountPrice: prics[k].amountPrice,
										oneDateaAmountPrice: prics[k].amountPriceSum,
										breakfastNum: prics[k].breakfastNum
									})
									that.firPrices += prics[k].amountPriceSum;
									this.timeli += 1;
								}
								this.prics();
								this.orderUseDateDetails = sit;
							}
						}
					} else if (dats.hots.supplierType == 8) {//锦江酒店
						let res = await tork.toJinJiangBook({
							hotelDetailSearchReq: {
								checkinDate: dats.datatiem.choiceDate[0].re,
								checkoutDate: dats.datatiem.choiceDate[1].re,
								proId: dats.hots.proId,
								productUniqueId: dats.hots.productUniqueId,
								holMidId: dats.datlist.hotelCode,
								cityName: dats.datlist.city.name,
								supplierType: dats.hots.supplierType,
								travelType: dats.datlist.isbtd,
								hotelCode: dats.hots.hotelCode
							}
						})
						if (res.code == 200) {
							let dat = res.data
							if (dat.hasOwnProperty('error')) {
								this.hotelError(dat);
							} else {
								that.resids = '';
								that.orderRoomInfos = dat.orderRoomInfos; //采购价
								that.bookingNotesos = dat.hotel.cancelDescription; //取消规则
								let prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
								that.proDataJson = dat.room.proDataJson; //产品信息
								that.linkManPassengerNo = dat.linkManPassengerNo;
								that.yaDuoRoom = dat.room;
								let sit = [];
								that.supplierNo = dat.hotel.supplierNo;
								that.firPrices = 0;
								for (let k in prics) {
									sit.push({
										otherFee: prics[k].otherFee,
										useDate: k,
										amountPrice: prics[k].amountPrice,
										oneDateaAmountPrice: prics[k].amountPriceSum,
										breakfastNum: prics[k].breakfastNum
									})
									that.firPrices += prics[k].amountPriceSum;
									this.timeli += 1;
								}
								this.prics();
								this.orderUseDateDetails = sit;
							}
						}
					} else if (dats.hots.supplierType == 10) {//如家酒店
						let res = await tork.toHomeInnsBook({
							homeInnsPriceCheck: {
								checkinDate: dats.datatiem.choiceDate[0].re,
								checkoutDate: dats.datatiem.choiceDate[1].re,
								roomTypeId: dats.hots.proId,
								hotelId: dats.hots.hotelCode
							}
						})
						if (res.code == 200) {
							let dat = res.data
							if (dat.hasOwnProperty('error')) {
								this.hotelError(dat);
							} else {
								that.resids = dat.hotel.id;
								that.orderRoomInfos = dat.orderRoomInfos; //采购价
								that.bookingNotesos = dat.hotel.description; //取消规则
								let prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
								let sit = [];
								that.supplierNo = dat.hotel.supplierNo;
								that.firPrices = 0;
								for (let k in prics) {
									sit.push({
										useDate: k,
										amountPrice: prics[k].amountPrice,
										oneDateaAmountPrice: prics[k].amountPriceSum,
									})
									that.firPrices += prics[k].amountPriceSum;
									this.timeli += 1;
								}
								this.prics();
								this.orderUseDateDetails = sit;
							}
						}
					} else if (dats.hots.supplierType == 12) {//腾邦酒店
						let res = await tork.toOwnBook({
							"holMidId": dats.datlist.hotelCode,
							"hotelDetailSearchReq": {
								"checkinDate": dats.datatiem.choiceDate[0].re,
								"checkoutDate": dats.datatiem.choiceDate[1].re,
								"proId": dats.hots.proId
							}
						})
						if (res.code == 200) {
							let dat = res.data
							if (dat.hasOwnProperty('error')) {
								this.hotelError(dat);
							} else {
								that.resids = dat.hotel.id;
								that.orderRoomInfos = dat.orderRoomInfos; //采购价
								that.bookingNotesos = dat.hotel.description; //取消规则
								let prics = dat.room.proSaleInfoDetailsTarget; //销售采购价
								let sit = [];
								that.supplierNo = dat.hotel.supplierNo;
								that.firPrices = 0;
								for (let k in prics) {
									sit.push({
										useDate: k,
										amountPrice: prics[k].amountPrice,
										oneDateaAmountPrice: prics[k].amountPriceSum,
									})
									that.firPrices += prics[k].amountPriceSum;
									this.timeli += 1;
								}
								this.prics();
								this.orderUseDateDetails = sit;
							}
						}
					}
				} catch (e) {

					console.log(e)
				}

			},
			hotelError(dat) {
				this.close()
				this.showToasts(dat.error);
				setTimeout(() => {
					uni.navigateBack({})
				}, 1000)
			},
			async btnok() {
				let dats = this.datalist;
				let that = this;
				let userlists = this.userlists;
				let NameCenter = that.NameCenter; //成本中心
				let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
				let TravelDepartlist = that.TravelDepartlist; //部门审批人
				let apprvTaskStaffts = []; //审核人员
				let user_name = this.user_name; //联系人
				let user_ipone = this.user_ipone; //联系电话
				let isbtd = dats.datlist.isbtd; //1因公2因私
				let isblcks = dats.datlist.isblcks; //1事前 2事中
				if (NameCenter.id == '' && isblcks == 2 && isbtd == 1 && dats.isarsrl == false) {
					that.showToasts("请选择成本中心！");
					return
				} else if (TravelCostCenlist.length == 0 && isbtd == 1 && dats.isarsrl == false && this.CostCi == true) {
					that.showToasts("清选择成本审批人！");
					return
				} else if (TravelDepartlist.length == 0 && isbtd == 1 && dats.isarsrl == false && this.CostCis == true) {
					that.showToasts("清选择部门审批人！");
					return
				} else if (that.reson == '' && isbtd == 1 && isblcks == 2) {
					that.showToasts("请输入出行事由！");
					return
				} else if (user_name == '') {
					that.showToasts("请输入联系人！");
					return
				} else if (user_ipone == '' || this.utils.zzPhone(user_ipone)) {
					that.showToasts("请输入正确的联系电话！");
					return
				}
				let usersalist = [];
				let ists = 0;
				for (let i = 0; i < userlists.length; i++) { //出行人信息
					usersalist.push({
						name: userlists[i].userName,
						phone: userlists[i].phone,
						deptName: userlists[i].deptName,
						costcenterName: userlists[i].costcenterName,
						passengerNo: userlists[i].passengerNo,
						employeeType: userlists[i].istrue,
					})
				}
				let dat = {};
				let attrtime = this.times.split(':').join(''); //最早入店时间
				let atendtime = this.timed.split(':').join(''); //最晚入店时间
				let room;
				if (this.datalist.hots.supplierType == 9 || this.datalist.hots.supplierType == 8) {
					room = this.yaDuoRoom;
				} else {
					room = this.hotel.room;
				}
				let hotel = this.hotel.hotel;
				//7-华珠 8-亚朵 9-景江
				for (var i = 0; i < TravelCostCenlist.length; i++) { //成本中心审批人
					apprvTaskStaffts.push({
						deptCost: 2,
						nodeId: TravelCostCenlist[i].nodeId,
						personId: TravelCostCenlist[i].personId,
						staffId: TravelCostCenlist[i].staffId,
						staffName: TravelCostCenlist[i].staffName
					})
				}
				for (var i = 0; i < TravelDepartlist.length; i++) { //部门审批人
					apprvTaskStaffts.push({
						deptCost: 1,
						nodeId: TravelDepartlist[i].nodeId,
						personId: TravelDepartlist[i].personId,
						staffId: TravelDepartlist[i].staffId,
						staffName: TravelDepartlist[i].staffName
					})
				}
				let invs = "";
				if (JSON.stringify(dats.starLevelLimit) == '{}' && JSON.stringify(dats.highLimit) == '{}') {
					ists = 0;
					invs = ""
				} else {
					let issu = [];
					if (dats.starLevelLimit.length > 0) {
						issu.push({
							'starLevelLimit': dats.starLevelLimit
						})
					}
					if (dats.highLimit.length > 0) {
						issu.push({
							'highLimit': dats.highLimit
						})
					}
					invs = JSON.stringify({
						information: issu
					});
					ists = 1
				}
				dat = {
					supplierType: this.datalist.hots.supplierType,
					orderRoomInfos: {
						checkInDate: dats.datatiem.choiceDate[0].res,
						checkOutDate: dats.datatiem.choiceDate[1].res,
						orderRoomInfos: this.orderRoomInfos
					},
					orderCreateReq: {
						hotelImg: dats.datalist.imgUrl,
						dbCancelRule: this.bookingNotesos, //取消规则
						bookCount: this.hostindex + 1, //房间数量
						linkManName: user_name, //联系人
						linkManMobile: user_ipone, //联系电话
						proId: dats.hots.proId,
						resId: this.resids,
						zhxResId: dats.hots.hotelCode,
						bedTypeName: dats.hots.bedTypeName, //房间类型
						beforeTotalPrice: this.connum, //总价
						checkInDate: dats.datatiem.choiceDate[0].res,
						checkOutDate: dats.datatiem.choiceDate[1].res,
						arriveHotelTime: dats.datatiem.choiceDate[0].re + " " + this.timed + ":00",
						cityName: dats.datalist.cityName,
						endArriveTime: atendtime, //最晚入住时间
						hotelAddress: dats.datalist.address, //酒店地址
						hotelPhone: dats.datalist.resPhone, //酒店电话
						proName: dats.hots.supPriceName,
						resName: dats.datalist.resName,
						startArriveTime: attrtime, //最早入住时间
						supplierNo: this.supplierNo,
						isviolation: ists,
						violation: invs,
						orderUseDateDetails: this.orderUseDateDetails,
						productUniqueId: dats.hots.productUniqueId,
					},
					hotelBookExtendReq: {
						apprvTaskEntity: {
							taskType: isblcks, //1为事前2为事中，
							beforeMiddle: isblcks, //1为事前2为事中
							reason: that.reson, //理由
						},
						passengers: usersalist, //出行人信息
						travelType: isbtd //因公因私
					},
					roomInfo: {
						bedTypeName: dats.hots.bedTypeName, //房间类型,
						checkInDate: dats.datatiem.choiceDate[0].res,
						checkOutDate: dats.datatiem.choiceDate[1].res,
						breakfastCount: dats.hots.breakfastCount, //早餐类型
						supplierId: dats.hots.vendorCode, // 云游用 供应商编码 supplyCode
						cancelType: dats.hots.cancelable, //云游用 取消类型
						lastCancelTime: dats.hots.policyRemark, // 云游用 最晚取消时间
						cancelPolicyInfo: dats.hots.bookingNotes, // 云游用 取消条款
					},
					hotelSingleAvailRq: {
						amountPrice: dats.hots.firPrice,
						bedTypeName: dats.hots.bedTypeName, //房间类型
						cancelPolicyInfo: '',
						checkInDate: dats.datatiem.choiceDate[0].re,
						checkOutDate: dats.datatiem.choiceDate[1].re,
						hotelId: dats.hots.hotelCode,
						proId: dats.hots.proId,
						ratePlanCode: dats.hots.ratePlanCode,
						roomTypeName: '',
						vendorCode: dats.hots.vendorCode,
					}
				}
				if (this.datalist.hots.supplierType == 7) { //华珠
					dat.orderCreateReq['rateCodeType'] = room.rateCodeType;
					dat['holAddOrder'] = {
						guaranteeMode: room.guaranteeMode,
						adults: dats.datlist.butalist.length,
						childs: 0,
						hotelId: hotel.id,
						roomTypeId: room.proId,
						roomCount: this.hostindex + 1,
						rateCode: room.productUniqueId,
						activityId: room.activityId,
					}
				} else if (this.datalist.hots.supplierType == 9 || this.datalist.hots.supplierType == 8) {
					dat.orderRoomInfos.checkInDate = dats.datatiem.choiceDate[0].res.substring(0, 10);
					dat.orderRoomInfos.checkOutDate = dats.datatiem.choiceDate[1].res.substring(0, 10);
					dat.orderCreateReq.arriveHotelTime = dats.datatiem.choiceDate[0].re + " " + "23";
					dat.orderCreateReq['changeRule'] = room.changeRule;
					dat.orderCreateReq['cashScale'] = room.cashScale;
					dat.orderCreateReq['ruleValue'] = room.ruleValue;
					dat.orderCreateReq['cancelPenalty'] = room.cancelPenalty;
					if (this.datalist.hots.supplierType == 8) {
						dat.orderCreateReq['linkManPassengerNo'] = this.linkManPassengerNo;
						dat.orderCreateReq['proDataJson'] = this.proDataJson; //产品数据
					}
				} else {
					dat.orderCreateReq['channelData'] = dats.hots.channelData;
				}
				if ((isblcks == 2 && isbtd == 1 && dats.isarsrl == false) || (isblcks == 1  && isbtd == 1 && dats.isarsrl == false &&
						this.isblckt == true)) { //事中因公 不是免审 或者 事前需要二次审批
					dat.hotelBookExtendReq.apprvTaskEntity['remark'] = invs;
					dat.hotelBookExtendReq.apprvTaskEntity['apprvTaskStaffs'] = apprvTaskStaffts; //审批人信息
					dat.hotelBookExtendReq.apprvTaskEntity['costId'] = NameCenter.id; //成本中心id
					dat.hotelBookExtendReq.apprvTaskEntity['costName'] = NameCenter.name; //成本中心名称
				}
				if ((isblcks == 1  && isbtd == 1 && that.datalist.isarsrl == false) || (isblcks == 1 && isbtd == 1 && dats.isarsrl == false &&
						this.isblckt == true)) { //事前 因公 不是免审 非二次审批
					dat.hotelBookExtendReq.apprvTaskEntity['travelNo'] = this.datalist.datlist.mokksli.travelNo; //出差单号
					dat.hotelBookExtendReq.apprvTaskEntity['vehicleId'] = this.vehicleId;
					dat.hotelBookExtendReq.apprvTaskEntity['costId'] = NameCenter.id; //成本中心id
					dat.hotelBookExtendReq.apprvTaskEntity['costName'] = NameCenter.name; //成本中心名称
				} 
				// else if (isbtd == 2 || (isbtd == 1 && that.datalist.isarsrl == true)) { //因私 或者免审

				// }
				try {
					let res = await tork.hotelBook(dat);

					if (res.code == 200) {
						that.showToasts('预定成功！');
						setTimeout(() => {
							uni.setStorageSync("sworders_od", {
								type: 'hotel',
								data: res.data.transationOrderNo
							});
							uni.switchTab({
								url: '/pages/order/order',
								success: function() {}
							})
						}, 1000)
					} else {
						that.showToasts(res.message);
					}
				} catch (e) {

					//TODO handle the exception
				}
			},
			prics() { //总价
				//Brokerage手续费
				//firPrices 几天所有的单间房钱
				//
				//hostindex+1 几间房
				//userlists.length 人数
				//timeli天数
				this.connum = (this.hostindex + 1) * this.timeli * this.Brokerage + this.firPrices * (this.hostindex + 1);
			},
			hostchang(e) { //选择房间数量
				this.hostindex = e.detail.value;
				this.prics();
			},
			bindTimeChange(e) {
				this.times = e.target.value
			},
			bindTimeChanges(e) {
				this.timed = e.target.value
			},
			clikst() { //费用详情
				if (this.costs) {
					this.costs = false;
					this.blac_show = false;
				} else {
					this.costs = true;
					this.blac_show = true;
				}
			},
			approval() {
				if (this.isblckt == true) {
					return
				}
				this.ops_list = true
				this.blac_show = true;
				this.sli_old(); //点击成本中心
			},
			sli_old() { //点击成本中心默认值
				let ls = this.treeLists;
				this.sli_namelist = [];
				for (let i = 0; i < ls.length; i++) {
					if (ls[i].parentId.length == 0) {
						this.sli_namelist.push(ls[i])
					}
				}
				// this.slit_id_checd = 0;
				this.slitlist = [];
			},
			// 重新生成数组
			renderTreeLists(list = [], rank = 0, parentId = []) { //成本中心
				list.forEach(item => {
					this.treeLists.push({
						id: item.id,
						name: item.text,
						userCount: item.a_attr.userCount,
						ischecds: 0,
						parentId, // 父级id数组
						rank, // 层级
						showChild: false, //子级是否显示
						show: rank === 0 // 自身是否显示
					});
					if (Array.isArray(item.children) && item.children.length > 0) {
						let parents = [...parentId];
						parents.push(item.id);
						this.renderTreeLists(item.children, rank + 1, parents);
					} else {
						this.treeLists[this.treeLists.length - 1].lastRank = true;
					}
				});
			},
			clslitk(item) { //点击成本中心部门
				this.botname = item.name;
				let id = item.id
				let ls = this.treeLists;
				let ik = 0;
				for (var i = 0; i < ls.length; i++) { //判断是否有子集
					if (ls[i].parentId.length > 0 && ls[i].parentId.includes(id)) {
						ik++;
					}
				}
				if (ik > 0) { //有子集
					this.sli_namelist = []
					for (var i = 0; i < ls.length; i++) { //取出当前子集
						if (id == ls[i].id) {
							this.slit_id_checd = ls[i].id
							if (ls[i].parentId.length == 0) {
								this.slitlist = [];
							}
							if (this.slitlist.length > 0) {
								let ids = this.slitlist.length - 1;
								if (JSON.stringify(this.slitlist[ids].parentId) == JSON.stringify(ls[i].parentId)) {
									this.slitlist.splice(ids, 1);
								}
							}
							this.slitlist.push(ls[i])
						}
						if (ls[i].parentId.length > 0 && ls[i].parentId.includes(id)) { //判断当前点击的是否有子集
							if (ls[i].parentId.indexOf(id) == ls[i].parentId.length - 1) {
								this.sli_namelist.push(ls[i])
							}
						}
					}
				} else {
					for (var i = 0; i < ls.length; i++) { //没有子集
						if (ls[i].id == id) {
							this.slit_id_checd = ls[i].id
							if (ls[i].parentId.length == 0) {
								this.slitlist = [{
									name: ls[i].name,
									id: ls[i].id,
									parentId: []
								}]
							} else {
								let ids = this.slitlist.length - 1;
								if (JSON.stringify(this.slitlist[ids].parentId) == JSON.stringify(ls[i].parentId)) {
									this.slitlist.splice(ids, 1);
								}
								this.slitlist.push(ls[i])
							}
						}
					}
				}
			},
			okisd() { //选择当前成本中心
				// if (this.isblckt == true) {
				// 	this.TravelCostCenlist = [];
				// 	this.TravelDepartlist = [];
				// 	this.appswlist();
				// 	return
				// }
				this.ops_list = false
				this.blac_show = false;
				if (this.cbid == this.slit_id_checd) {
					return
				}
				this.cbname = this.botname;
				this.cbid = this.slit_id_checd;
				this.NameCenter.name = this.cbname;
				this.NameCenter.id = this.cbid;
				this.TravelCostCenlist = [];
				this.TravelDepartlist = [];
				this.appswlist();
			},
			async selts() { //查询成本中心
				let _this = this;
				try {
					let res = await tork.getCostCenterList();

					if (res.code == 200) {
						_this.treeLists = [];
						_this.renderTreeLists(res.data);
					} else {
						_this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e)

				}
			},
			CostCenterChange(e, index) { //选择当前成本中心审批人
				this.CostCenter[index].index = e.detail.value;
			},
			DeparappChange(e, index) { //选择当前部门审批人
				this.Deparapp[index].index = e.detail.value;
			},
			oksoption() { //部门和成本中心审批人确定
				let that = this;
				let st = that.isswf; //是成本中心还是部门 true为成本中心
				let itn = true;
				let uls = [];
				if (st) {
					uls = that.CostCenterlist; //成本中心
				} else {
					uls = that.Deparapprover; //成本中心
				}
				if (itn) {
					let sus = [];
					let suname = [];
					if (st) { //成本中心
						for (let i = 0; i < uls.length; i++) {
							for (var k = 0; k < uls[i].apprvCostFlowNodePersons.length; k++) {
								if (k == that.CostCenter[i].index) {
									sus.push({
										deptCost: 2,
										nodeId: uls[i].apprvCostFlowNodePersons[k].nodeId,
										personId: uls[i].apprvCostFlowNodePersons[k].id,
										staffId: uls[i].apprvCostFlowNodePersons[k].staffId,
										staffName: uls[i].apprvCostFlowNodePersons[k].staffName
									})
								}
							}
						}
						this.TravelCostCenlist = sus
					} else { //部门
						for (let i = 0; i < uls.length; i++) {
							for (var k = 0; k < uls[i].apprvDeptFlowNodePersons.length; k++) {
								if (k == that.Deparapp[i].index) {
									sus.push({
										deptCost: 1,
										nodeId: uls[i].apprvDeptFlowNodePersons[k].nodeId,
										personId: uls[i].apprvDeptFlowNodePersons[k].id,
										staffId: uls[i].apprvDeptFlowNodePersons[k].staffId,
										staffName: uls[i].apprvDeptFlowNodePersons[k].staffName
									})
								}
							}
						}
						this.TravelDepartlist = sus
					}
					that.switfal = false;
					that.blac_show = false;
				}
			},
			async appswlist(itname) { //选择审批人
				let that = this;
				let nuarry = [];
				let nus = that.datalist.datlist.butalist; //出差人的集合
				for (var i = 0; i < nus.length; i++) {
					nuarry.push(nus[i].passengerNo) //获取出行人员id
				}

				let res;
				try {
					if (this.isblckt == true) {
						res = await tork.getStaffList({
							costId: that.NameCenter.id,
							passengerNos: nuarry,
							applyType: this.sttos
						});
					} else {
						res = await tork.getStaffList({
							costId: that.NameCenter.id,
							passengerNos: nuarry,
							applyType: 1
						});
					}

					if (res.code == 200) {
						if (res.data.deptStaffs.length == 0) {
							that.CostCis = false;
						} else {
							that.CostCis = true;
							that.Deparapprover = res.data.deptStaffs; //部门审批人
							for (let i = 0; i < that.Deparapprover.length; i++) {
								that.Deparapp.push({
									index: 0
								})
							}
						}
						if (res.data.costStaffs.length == 0) {
							that.CostCi = false;
						} else {
							that.CostCi = true;
							that.CostCenterlist = res.data.costStaffs; //成本审批人
							for (let i = 0; i < that.CostCenterlist.length; i++) {
								that.CostCenter.push({
									index: 0
								})
							}
						}
						that.TravelCostCenlist = []
						that.TravelDepartlist = []
					}
				} catch (e) {
					console.log(e)

				}
			},
			adsl(it) {
				if (it < 10) {
					return '0' + it
				} else {
					return it
				}
			},
			// isad(item){ //回显当前人员的状态
			// 	if(item.is == 0){
			// 		return 'cl_vals'
			// 	} else if(item.is == this.indes){
			// 		return 'ad_vals'
			// 	} else {
			// 		return 'ck_vals'
			// 	}
			// },
			// ad_cions(item,index){ //点击添加或者移除
			// 	if(item.is == 0){ //判断是否没在房间
			// 		this.texttime = ''
			// 		this.user_lists[index].is = this.indes;
			// 		this.htosfor[this.indes - 1].userlist.push(this.user_lists[index]);
			// 	} else if(item.is ==  this.indes){ //如果在当前房间则移除
			// 		this.texttime = ''
			// 		let arrs = this.htosfor[this.indes - 1].userlist;//当前房间
			// 		for (var i = 0; i < arrs.length; i++) { //删除当前房间存在的人
			// 			if(arrs[i].passengerNo == item.passengerNo){
			// 				arrs.splice(i,1)
			// 			}
			// 		}
			// 		this.user_lists[index].is = 0; //重置当前人员
			// 	} else {
			// 		return
			// 	}
			// },
			appswlists(itname) { //点击审批人
				if (this.NameCenter.id == '') {
					this.showToasts("请先选择成本中心")
					return
				}
				if (itname == 'CostCenterlist') {
					this.isswf = true
				} else {
					this.isswf = false
				}
				this.switfal = true;
				this.blac_show = true;
			},
			// addmon(item,index){ //点加修改房间人员
			// 	this.use_text = '请从以下旅客中选择入住人';
			// 	this.si_pl = 'fots';
			// 	this.indes = (index + 1);//获取当前点击房间的下标
			// 	this.shos = true
			// 	this.blac_show = true;
			// },
			// hos_lk(){ //选择房间数量
			// 	this.use_text = '选择房间数量';
			// 	this.si_pl = 'fot';
			// 	this.shos = true
			// 	this.blac_show = true;
			// },
			isshow() { //点击弹出层
				this.shos = false;
				this.ops_list = false
				this.blac_show = false;
				this.switfal = false;
				this.costs = false;
			},
			// ad_cion(item){ //点击改变房间数量
			// 	this.hots_num = item.name;
			// 	let num = item.id;//点击房间数量
			// 	this.connum = num * this.datalist.hots.conPrice * this.datalist.datatiem.dayCount
			// 	let nums = this.htosfor.length;//当前房间数量
			// 	if(num > nums){ //判断是添加还是删除房间
			// 		for (let i = 0; i < num - nums; i++) {
			// 			this.htosfor.push({
			// 				name: '房间' + (nums + 1 +i) + ':',
			// 				userlist: [],//入住人
			// 				icon: '\ue632'
			// 			})
			// 		}
			// 	} else if(nums > num){
			// 		for (let i = nums - 1; i>=0; i--) {
			// 			if(i+1 > num){
			// 				if(this.htosfor[i].userlist.length > 0){
			// 					let arr = this.htosfor[i].userlist;//当前删除房间的人员
			// 					for (let i = 0; i < arr.length; i++) {
			// 						for (let k = 0; k < this.user_lists.length; k++) {
			// 							if(arr[i].userId == this.user_lists[k].userId){
			// 								this.user_lists[k].is = 0;//重置当前删除房间的人员
			// 							}
			// 						}
			// 					}

			// 				}
			// 				this.htosfor.splice(i,1);
			// 			}
			// 		}
			// 	}
			// 	this.blac_show = false;
			// 	this.shos = false;
			// },
			eats(is) {
				if (is == 0 || is == null) {
					return '无早餐、'
				} else if (is == 1) {
					return '单早餐、'
				} else if (is == 2) {
					return '双早餐、'
				}
			},
			sour(item) {
				return item.bookingNotes;
			},
		}
	}
</script>

<style>
	page {
		background: #edf0f5;
	}
</style>
<style scoped lang="scss">
	$brgk_blue: linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);

	.hotelreas {
		width: 100%;
		padding-bottom: 100upx;

		.black_mu {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: black;
			opacity: 0.5;
			z-index: 850;
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
				height: 90upx;
				width: 100%;
				line-height: 90upx;
				background: #f1f1f1;
				text-align: center;
			}

			.ci_list {
				max-height: 550upx;
				overflow: scroll;
				font-size: 35upx;

				.cl_val {
					position: relative;
					width: 100%;
					text-align: center;
					line-height: 90upx;
					height: 90upx;
					border-bottom: 2upx solid #f1f1f1;
				}

				.cl_valts {
					width: calc(100% - 40upx);
					padding: 20upx 20upx;
					font-size: 35upx;

					.datlist {
						margin-bottom: 20upx;
						width: calc(100% - 40upx);
						padding: 20upx 20upx 30upx 20upx;
						color: #FFFFFF;
						background: $brgk_blue;
						border-radius: 10upx;
						line-height: 50upx;
						font-size: 35upx;

						.datlist_t_l {
							width: 100%;
							display: flex;

							image {
								width: 50upx;
								height: 50upx;
								margin-right: 10upx;
							}
						}

						.datlist_t_r {
							width: 100%;
							font-size: 30upx;
						}

						.datlist_b {
							line-height: 60upx;
							font-size: 55upx;
						}
					}
				}

				.cl_valt {
					width: calc(100% - 40upx);
					padding: 20upx 20upx;
					display: flex;
					flex-wrap: wrap;
					align-content: space-between;
					font-size: 35upx;

					.cl_vals {
						text-align: center;
						width: 190upx;
						line-height: 60upx;
						margin: 20upx 20upx;
						height: 60upx;
						color: #C0C0C0;
						border: 2upx solid #C0C0C0;
						border-radius: 5upx;
					}

					.ad_vals {
						text-align: center;
						width: 190upx;
						line-height: 60upx;
						margin: 20upx 20upx;
						height: 60upx;
						color: $uni-color-primary;
						border: 2upx solid $uni-color-primary;
						border-radius: 5upx;
					}

					.ck_vals {
						text-align: center;
						width: 190upx;
						line-height: 60upx;
						margin: 20upx 20upx;
						height: 60upx;
						color: #FFFFFF;
						background: #C0C0C0;
						border: 2upx solid #C0C0C0;
						border-radius: 5upx;
					}
				}
			}
		}

		.optslist {
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

			.btns {
				width: 100%;
				height: 90upx;
				display: flex;
				text-align: center;
				line-height: 90upx;
				font-size: 35upx;
				background: #E5E5E5;

				.btns_z {
					flex: 1;
					height: 90upx;
					color: $uni-color-primary;
				}
			}

			.stlist {
				width: 100%;
				height: 400upx;
				background: #E5E5E5;
				display: flex;

				.sltleft {
					height: 400upx;
					width: 30%;

					.ulsk_list {
						width: 100%;
						height: 90upx;
						text-align: center;
						font-size: 35upx;
						line-height: 90upx;
					}

					.cked {
						background: #FFFFFF;
					}
				}

				.sltright {
					width: 70%;
					height: 400upx;
					background: #FFFFFF;

					.sltrig_top {
						width: 100%;
						height: 90upx;
						overflow: scroll;
						line-height: 90upx;
						font-size: 25upx;
						display: flex;
						border-bottom: 2upx solid #F1F1F1;

						.sltiig_top_left {
							width: 140upx;
							text-indent: 20upx;
							color: #F1F1F1;
						}

						.sltiig_top_right {
							padding: 0 5px;
							min-width: 100upx;
							text-indent: 10upx;
							color: #333333;
						}

						.stis {
							color: $uni-color-primary !important;
						}
					}

					.sltrig_bot {
						width: calc(100% -20upx);
						height: 310upx;
						padding-left: 20upx;
						overflow: scroll;

						.striglist {
							width: 100%;
							height: 90upx;
							border-bottom: 2upx solid #F1F1F1;
							line-height: 90upx;
							display: flex;

							.stlis_left {
								width: 90%;
							}

							.stlis_right {
								width: 10%;
								text-align: center;
							}
						}
					}
				}
			}

			.botmis {
				width: 100%;
				height: 60upx;
				font-size: 30upx;
				color: $uni-color-primary;
				text-align: center;
				line-height: 60upx;
			}
		}

		.isswflist {
			position: fixed;
			bottom: 0;
			left: 0;
			transition: all 0.3s ease;
			-webkit-transform: translateY(100%);
			transform: translateY(100%);
			min-height: 150upx;
			width: 100%;
			z-index: 889;
			background: #ffffff;

			.btns {
				width: 100%;
				height: 90upx;
				display: flex;
				text-align: center;
				line-height: 90upx;
				font-size: 35upx;
				background: #E5E5E5;

				.btns_z {
					flex: 1;
					height: 90upx;
					color: $uni-color-primary;
				}
			}

			.isstops {
				padding: 40upx 10%;
				width: calc(100% - 20%);

				.isstop {
					height: 90upx;
					line-height: 90upx;
					width: 100%;
					display: flex;
					align-items: center;

					.wors {
						font-size: 35upx;
						width: 60%;
						height: 50upx;
						line-height: 50upx;
						padding-left: 20upx;
						border: 2upx solid #C8C7CC;
					}
				}
			}
		}

		.hotsev {
			width: 100%;
			background: #FFFFFF;
			font-size: 35upx;

			.hots {
				width: 100%;
				height: 90upx;
				border-bottom: 2upx solid #F1F1F1;
				display: flex;
				align-items: center;
				justify-content: center;

				.htos_left {
					text-align: right;
					width: 25%;
				}

				.htos_right {
					width: 70%;
					display: flex;
					overflow: scroll;

					.htos_adli {
						padding: 10upx 10upx;
					}

					.picks {
						width: 100%;
					}
				}
			}
		}

		.htos_top {
			width: calc(100% - 80upx);
			background: #FFFFFF;
			margin: 20upx;
			padding: 20upx;
			line-height: 45upx;
			border-radius: 15upx;

			.titles {
				font-size: 40upx;
			}

			.tilopens {
				font-size: 35upx;
			}

			.tiskt {
				font-size: 25upx;
				color: #C0C0C0;
			}

			.tskgout {
				font-size: 25upx;
				display: flex;

				.chekoutl {
					width: 22%;
				}

				.chekouts {
					width: 78%;
					color: red;
				}
			}
		}

		.istaf {
			width: 100%;
			margin-top: 20upx;
			font-size: 30upx;

			.ravelv {
				width: calc(100% - 40upx);
				padding: 0 20upx;
				height: 90upx;
				background: #FFFFFF;
				margin-bottom: 20upx;

				.ts {
					line-height: 90upx;
					display: flex;

					.rav_left {
						width: 30%;
						text-align: center;
						color: #c0c0c0;
					}

					.ravright {
						width: 70%;
						display: flex;

						.bos {
							width: 93%;
							height: 90upx;
							overflow: scroll;
							display: flex;
							align-items: center;

							.swname {
								line-height: 90upx;
								font-size: 30upx;
								color: #333333;
								padding: 0 10upx;
							}

							.userlists {
								height: 90upx;
								font-size: 30upx;
								margin: 0 10upx;
							}

							input {
								font-size: 30upx;
								width: 100%;
							}

							.picks {
								width: 100%;
							}
						}

						.bost {
							width: 93%;

							.userlists {
								font-size: 30upx;
								margin: 0 10upx;
							}
						}
					}
				}
			}
		}

		.costlists {
			position: fixed;
			bottom: 0;
			left: 2%;
			transition: all 0.3s ease;
			-webkit-transform: translateY(100%);
			transform: translateY(100%);
			width: 96%;
			z-index: 870;
			line-height: 90upx;
			font-size: 30upx;
			background-color: #FFFFFF;
			color: #333333;
			border-top-left-radius: 12upx;
			border-top-right-radius: 12upx;

			.costl_t {
				width: 100%;
				height: 90upx;
				text-align: center;
			}

			.costlist_s {
				width: calc(100% - 20upx);
				border-top: 2upx solid #C8C7CC;
				border-bottom: 2upx solid #C8C7CC;
				padding-left: 20upx;

				.cost_li {
					width: 100%;
					height: 90upx;
					display: flex;

					.scse_l {
						width: 30%;

					}

					.scse_r {
						width: 70%;
						padding-right: 20upx;
						text-align: right;

						.corssize {
							color: #FF9000;
						}

						p {
							color: red;
							font-size: 22upx;
						}
					}
				}

				.costs {
					border-bottom: 2upx solid #D0DEE5;
				}
			}
		}

		.show {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}

		.btnbottm {
			width: 100%;
			height: 90upx;
			line-height: 90upx;
			background: #FFFFFF;
			position: fixed;
			bottom: 0upx;
			left: 0;
			z-index: 100;
			display: flex;

			.btnbo_left {
				width: 70%;
				height: 90upx;
				color: #FF9000;
				font-size: 45upx;
				text-indent: 20upx;
				display: flex;
				justify-content: space-between;

				.scslist {
					padding-right: 10upx;
					font-size: 28upx;
					color: #FF9000;
				}
			}

			.btnbo_right {
				width: 30%;
				text-align: center;
				height: 90upx;
				color: #FFFFFF;
				background: #FF6600;
			}
		}
	}
</style>
