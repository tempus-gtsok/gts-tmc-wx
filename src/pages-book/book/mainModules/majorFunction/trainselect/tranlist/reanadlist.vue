<template>
	<view class="readlist" v-if="datalist">
		<view class="black_mu" @click="isshow" v-if="blac_show"></view>
		<loading></loading>

		<headnavigation titles="确定信息"></headnavigation>
		<view class="rea_t">
			<view class="tea_tal">
				<view>{{ datalist.ranst.item.dats }}/{{ datalist.ranst.item.dats }}</view>
				<view>{{ datalist.ranst.item.trainNo }}</view>
			</view>
			<view class="tea_tab">
				<view class="tae_lis">
					<view>{{ datalist.ranst.item.fromTime }} {{ datalist.ranst.item.fromStation }}</view>
					<view style="display: flex;">
						￥
						<view style="color: #FF9000;font-size: 40upx;">{{ datalist.astlis.price }}</view>
					</view>
				</view>
				<view class="tae_lis">
					<view>{{ datalist.ranst.item.toTime }} {{ datalist.ranst.item.toStation }}</view>
					<view>{{ datalist.astlis.seatName }}</view>
				</view>
				<view v-show="allseat == true" class="cseat">
					<view class="seat_a">
						<view style="display: flex;">
							<view class="seat_fo">
								选座：
							</view>
							<view class="seat_le">
								<view v-for="(item,index) in seat">
									<view v-if="item.name == 'A'">
										窗<view class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : '' ">
											{{ item.name }}
										</view>
									</view>
									<view v-if="item.name !='A' && item.name != 'D' && item.name != 'F'">
										<view class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : '' ">
											{{ item.name }}
										</view>
									</view>
									<view v-if="item.name == 'D'">
										过道<view class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : '' ">
											{{ item.name }}
										</view>
									</view>
									<view v-if="item.name == 'F' && seat.length == 3">
										过道<view class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : ''">
											{{ item.name }}
										</view>
										窗
									</view>
									<view v-if="item.name == 'F'  && seat.length != 3">
										<view class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : ''">
											{{ item.name }}
										</view>
										窗
									</view>
								</view>
							</view>
						</view>
					</view>
					<view v-show="secseat == true" class="seat_a" style="margin-left: 105upx;">
						<view class="seat_le" style="margin-left: 13upx;">
							<view v-for="(item,index) in seats">
								<view v-if="item.name == 'A'">
									窗<view class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : '' " v-if="item.name =='A'">
										{{item.name}}</view>
								</view>
								<view class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : '' " v-if="item.name !='A' && item.name != 'D' && item.name != 'F'">
									{{item.name}}</view>
								<view v-if="item.name == 'D'">
									过道<view class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : '' ">
										{{item.name}}</view>
								</view>
								<view v-if="item.name == 'F' && seats.length == 3">
									过道
									<view class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : ''">
										{{item.name}}</view>
									窗
								</view>
								<view v-if="item.name == 'F'  && seats.length != 3">
									<view class="seat" @click="picks(item)" :class="seids(item.id) == item.id ? 'pickseat' : ''">
										{{ item.name }}
									</view>
									窗
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="userlist">
			<view class="userls" v-for="(item, idnex) in userlists" :key="idnex">
				<view class="user_ls">
					<view>{{ item.name }}</view>
					<view>{{ item.deptName }}</view>
				</view>
				<view class="user_rs" v-if="toisblcks == 4">
					<view class="wors">
						<view>{{item.certType}}</view>
					</view>
					<view>{{item.certNo}}</view>
				</view>
				<view class="user_rs" v-else>
					<view class="wors">
						<picker :range="item.certificateList" :range-key="'cardTypename'" @change="CostCencdChange($event,idnex,item.certificateList)">
							{{ item.certificateList[CostCencd[idnex].index].cardTypename }}
						</picker>
					</view>
					<view style="padding-left: 20upx;">{{ vals(CostCencd[idnex].index,item.certificateList) }}</view>
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
									<strong></strong>&#xe60b;
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
						票价
					</view>
					<view class="scse_r">
						<view class="corssize">
							￥{{datalist.astlis.price}}
						</view>
						<view class="">
							x{{userlists.length}}人
						</view>
					</view>
				</view>
				<view class="cost_li costs">
					<view class="scse_l">
						服务费
					</view>
					<view class="scse_r">
						<view class="corssize">
							￥{{Brokerage}}
						</view>
						<view class="">
							x{{userlists.length}}份
						</view>
					</view>
				</view>
				<view class="cost_li costs" v-if="bxPrice > 0">
					<view class="scse_l">
						保险
					</view>
					<view class="scse_r">
						<view class="corssize">
							￥{{bxPrice}}
						</view>
						<view class="">
							x{{userlists.length}}份
						</view>
					</view>
				</view>
				<view class="cost_li">
					<view class="scse_l">
						总额
					</view>
					<view class="scse_r">
						<view class="corssize">
							￥{{onprice}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="insurances" v-if="insurancesList.length > 1">
			<view class="insuName">
				火车保险:
			</view>
			<view class="navigas" :class="insurancesIndex == 0 ? 'navimd':''">
				<picker  :range="insurancesList" :range-key="'name'" @change="chineseChange($event)">
					{{ insurancesList[parseInt(this.insurancesIndex)].name }}
				</picker>
			</view>
			<view class="is-gift" v-if="insurancesList[parseInt(insurancesIndex)].isGift == true && insurancesIndex != 0">
				(赠送)
			</view>
			<view class="face-price" v-if="insurancesList[parseInt(insurancesIndex)].isGift ==false && insurancesIndex != 0">
				{{insurancesList[parseInt(insurancesIndex)].buyPrice}}元
			</view>
		</view>
		
		<view class="istaf" v-if="isshowcenter">
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">归属部门:</view>
					<view class="ravright">
						<view class="bos bot">
							<view v-if="attdepartment != null">{{attdepartment}}</view>
						</view>
						<view class="iconfont">&#xe8a3;</view>
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
		<view class="istaf" v-if="datalist.ranst.isbtd == 1 && (toisblcks == 2 ||toisblcks == 4)">
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">出行事由:</view>
					<view class="ravright">
						<view class="bos">
							<input type="text" v-model="reson" placeholder="请输入出行事由" value="" />
						</view>
						<view class="iconfont">&#xe8a3;</view>
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
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
			<view class="ravelv" style="margin-bottom: 150upx;">
				<view class="ts">
					<view class="rav_left">联系电话:</view>
					<view class="ravright">
						<view class="bos">
							<input type="number" maxlength="11" v-model="user_ipone" placeholder="请输入联系电话" value="" />
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
		</view>
		<view class="oksl">
			<view class="oksl_l" @click="clikst">
				￥{{onprice}}
				<view class="scslist" >
					费用详情
				</view>
			</view>
			<view class="oksl_r" v-if="toisblcks != 4 && rotes('tms:tra:reserve')" @click="okadd">
				提交订单
			</view>
			<view class="oksl_r" v-if="toisblcks == 4 && rotes('tms:tra:change')" @click="uprean">
				申请改签
			</view>
		</view>
	</view>
</template>

<script>
	import certifi from '@/api/certificate.js'
	import order from '@/api/order.js'
	import tork from '@/api/torowk.js'
	import mydi from '@/api/mydi.js';
	export default {
		data() {
			return {
				isshowcenter:false,//是否显示审批信息
				insurancesList:[],//火车保险
				insurancesIndex:0,//当前所选保险
				reson: '',
				CostCencd: [],
				CostCenter: [],
				Deparapp: [],
				CostCi: false,
				CostCis: false, //是否有部门审批人
				costs: false,
				onprice: 0, //总价
				user_name: '', //联系人
				user_ipone: '', //联系电话
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

				CostCenterlist: [], //成本中心审批人
				costlist: [], //当前选择的成本中心审批人集合
				isswf: true, //true为成本中心 false为部门   审批人
				Deparapprover: [], //部门审批人
				deparlist: [], //前选择的部门审批人集合

				datalist:null,
				cardlist: [],
				oprefs: [{
					'oprefs_1': ''
				}, {
					'oprefs_2': ''
				}, {
					'oprefs_3': ''
				}, {
					'oprefs_4': ''
				}, {
					'oprefs_5': ''
				}],
				NameCenter: {
					name: '',
					id: ''
				},
				blac_show: false,
				attdepartment: '', //归属部门
				carld: [], //证件列表
				scardnno: [], //证件值
				nameno: [], //证件名
				Brokerage: 0, //单人火车票手续费
				RuleMa: '',
				RuleMas: false,
				ismokksli: false, //是否出差预定
				isblckt: false, //事前是否违规再次审批
				sttos:0,//事前是否违规再次审批  1为开启二次审批 3为违规再次审批
				vehicleId: '', //事前id

				allseat: false,
				secseat: false, //第二排座位

				pick: [],
				picklist: [],
				seat: [],
				seats: [],
				isGift:false,//是否赠送
				isDefaulConfig:false,//是否默认
				getTravelPolicys:{},//保险规则
				bxPrice:0,//当前选择保险价格
				toisblcks:1,//1事前2事中 3事前违规在次 4改签
			};
		},
		onLoad(itm) {
			let dat = JSON.parse(itm.data);
			let ists = dat.ranst.mokksli;
			if (JSON.stringify(ists) != "{}") {
				this.ismokksli = true;
			}
			this.datalist = dat || {};
			this.toisblcks = this.datalist.ranst.isblcks;
			this.onprice = this.datalist.astlis.price;
		},
		mounted() {
			//改签或者事前  不是免审
			if ((this.toisblcks == 4 || this.toisblcks == 1) && this.datalist.isarsrl == false) {
				this.getRuleMainSetting(); //获取公司是否需要审核
			} else {
				this.isshowcentermt();//是否显示审批信息
			}
			if (this.toisblcks == 1) { //判断是否事前
				this.attdepartment = this.datalist.ranst.mokksli.deptName;
				this.NameCenter = {
					name: this.datalist.ranst.mokksli.costName,
					id: this.datalist.ranst.mokksli.costId
				};
			} else {
				const data = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //获取归属部门
				if (data.deptName) {
					this.attdepartment = data.deptName;
				}
			}
			this.usernams();//获取联系人
			this.getBrokerage(); //火车票单人手续费
			this.userlist(); //用户信息
			this.getTravelPolicyst();//获取保险规则
			this.selts();//查询成本中心
			
		},
		methods: {
			async getTravelPolicyst() {
				try {
					let res = await certifi.getTravelPolicy();
					if (res.code == 200) {
						this.getTravelPolicys = res.data;
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			chineseChange(e){
				this.insurancesIndex = e.detail.value;
				this.onprices();
			},
			//座位显示
			showseat() {
				try{
					let _this = this;
					let userlen = this.userlists.length;
					let sst = this.datalist.ranst.item.trainNo.substring(0, 1);
					let slv = this.datalist.astlis.seatName;
					if (userlen > 1) {
						this.secseat = true;
					}
					if (sst == 'G' || sst == 'C' || sst == 'D') {
						this.allseat = true;
						if (slv == '二等座') {
							if (this.secseat) {
								this.seat.push({
									id: '1',
									value: '1A',
									name: 'A'
								}, {
									id: '2',
									value: '1B',
									name: 'B'
								}, {
									id: '3',
									value: '1C',
									name: 'C'
								}, {
									id: '4',
									value: '1D',
									name: 'D'
								}, {
									id: '5',
									value: '1F',
									name: 'F'
								})
					
								this.seats.push({
									id: '6',
									value: '2A',
									name: 'A'
								}, {
									id: '7',
									value: '2B',
									name: 'B'
								}, {
									id: '8',
									value: '2C',
									name: 'C'
								}, {
									id: '9',
									value: '2D',
									name: 'D'
								}, {
									id: '10',
									value: '2F',
									name: 'F'
								})
							} else {
								this.seat.push({
									id: '1',
									value: '1A',
									name: 'A'
								}, {
									id: '2',
									value: '1B',
									name: 'B'
								}, {
									id: '3',
									value: '1C',
									name: 'C'
								}, {
									id: '4',
									value: '1D',
									name: 'D'
								}, {
									id: '5',
									value: '1F',
									name: 'F'
								})
					
							}
					
						} else if (slv == '一等座') {
							if (this.secseat) {
								this.seat.push({
									id: '1',
									value: '1A',
									name: 'A'
								}, {
									id: '2',
									value: '1C',
									name: 'C'
								}, {
									id: '3',
									value: '1D',
									name: 'D'
								}, {
									id: '4',
									value: '1F',
									name: 'F'
								})
								this.seats.push({
									id: '5',
									value: '2A',
									name: 'A'
								}, {
									id: '6',
									value: '2C',
									name: 'C'
								}, {
									id: '7',
									value: '2D',
									name: 'D'
								}, {
									id: '8',
									value: '2F',
									name: 'F'
								})
							} else {
								this.seat.push({
									id: '1',
									value: '1A',
									name: 'A'
								}, {
									id: '2',
									value: '1C',
									name: 'C'
								}, {
									id: '3',
									value: '1D',
									name: 'D'
								}, {
									id: '4',
									value: '1F',
									name: 'F'
								})
							}
						} else if (slv == '商务座') {
							if (this.secseat) {
								this.seat.push({
									id: '1',
									value: '1A',
									name: 'A'
								}, {
									id: '2',
									value: '1C',
									name: 'C'
								}, {
									id: '3',
									value: '1F',
									name: 'F'
								}, )
								this.seats.push({
									id: '4',
									value: '2A',
									name: 'A'
								}, {
									id: '5',
									value: '2C',
									name: 'C'
								}, {
									side: 'side',
									id: '6',
									value: '2F',
									name: 'F'
								})
							} else {
								this.seat.push({
									id: '1',
									value: '1A',
									name: 'A'
								}, {
									id: '2',
									value: '1C',
									name: 'C'
								}, {
									id: '3',
									value: '1F',
									name: 'F'
								}, )
							}
						} else {
							this.allseat = false;
						}
					}
				}catch(e){
					console.log('生成座位报错',e)
					//TODO handle the exception
				}
				
			},
			seids(id) {
				for (let i = 0; i < this.pick.length; i++) {
					if (id == this.pick[i].id) {
						return id;
					}
				}
			},
			//选座
			picks(item) {
				let _this = this;
				let boolean = false;
				let index = '';
				if (_this.pick.length > 0) {
					for (let i = 0; i < _this.pick.length; i++) {
						if (item.id == _this.pick[i].id) {
							boolean = true;
							index = i;
						}
					}
					if (boolean) {
						this.pick.splice(index, 1)
						this.picklist.splice(index, 1)
						return
					} else {
						if (_this.pick.length == this.userlists.length) {
							if (this.userlists.length == 1) {
								_this.pick.splice(0, 1);
								_this.picklist.splice(0, 1);
								_this.pick.push({
									id: item.id
								});
								_this.picklist.push({
									item
								});
							} else {
								uni.showToast({
									title: '只能选择' + this.userlists.length + '人',
									duration: 5000,
									icon: 'none'
								});
							}
						} else {
							_this.pick.push({
								id: item.id
							})
							_this.picklist.push({
								item
							})
							return
						}
					}
				} else {
					this.pick.push({
						id: item.id
					})
					this.picklist.push({
						item
					})
				}
			},
			async usernams() { //获取联系人
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
			CostCencdChange(e, index, trus) { //选择身份证
				this.CostCencd[index].index = e.detail.value;
				this.scardns[index] = trus[this.CostCencd[index].index].cardType;
				this.scardnno[index] = trus[this.CostCencd[index].index].cardNo;
				this.userlists[index].name = trus[this.CostCencd[index].index].firstName + trus[this.CostCencd[index].index].lastName;
			},
			CostCenterChange(e, index) { //选择当前成本中心审批人
				this.CostCenter[index].index = e.detail.value;
			},
			DeparappChange(e, index) { //选择当前部门审批人
				this.Deparapp[index].index = e.detail.value;
			},
			async getRuleMainSetting() { //查询当前用户改签是否需要审核 和 事前是否二次过审

				try {
					let res = await order.RuleMainSetting();

					if (this.toisblcks == 4) {//改签
						this.RuleMa = res.data.examinePattern; //改签是否需要审核
						let stw = this.RuleMa.split(',');
						for (let i in stw) {
							/**
							 * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
							 */
							if (stw[i] == 5) {
								this.RuleMas = true;
							}
						}
						this.isshowcentermt();
					} else if (this.toisblcks == 1) {//事前
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
						
						this.isshowcentermt();
						
						if (this.isblckt == true) { //如果需要二次审批 默认载入成本中心
							this.okisd();
						}
					}
				} catch (e) {
					console.log(e);

				}
			},
			isshowcentermt(){
				//1事前2事中 3事前违规在次 4改签
				if(this.datalist.ranst.isbtd == 1 && !this.datalist.isarsrl){ //因公 非免审
					if(this.toisblcks == 2||
					this.toisblcks == 4 && this.RuleMas||
					this.toisblcks == 1 && this.isblckt == true){
						this.isshowcenter = true;//显示审批信息
					}
				}
			},
			async getBrokerage() { //火车票单人手续费

				try {
					const res = await tork.getBrokerage();

					if (res.code == 200) {
						this.Brokerage = res.data.brokage;
						let su = res.data.insurances;
						this.insurancesList = [];
						if(su.length > 0 && this.toisblcks != 4){//改签没有保险
							let sus = [];
							sus.push({
								name:'请选择一个保险',
								id:0,
								isGift:false,
								buyPrice:0
							})
							for(let i in su){
								let sprice = 0;
								if(su[i].isGift){
									sprice = 0
								} else {
									sprice = su[i].buyPrice;
								}
								sus.push({
									name:su[i].name,//保险名称
									id:su[i].insuranceNo,//保险code
									buyPrice:sprice,//保险价格
									isGift:su[i].isGift//是否赠送
								})
							}
							if(su[0].isDefaulConfig == true){//是否默认
								this.insurancesIndex = 1;
							}
							this.insurancesList = sus;
						}
					} else {
						this.showToasts(res.message);
					}
					this.onprices();
				} catch (e) {
					console.log(e);

				}
			},
			onprices(){//总价
				this.bxPrice = 0;
				if(this.insurancesIndex > 0){
					this.bxPrice = this.insurancesList[this.insurancesIndex].buyPrice;
				}
				//车票费+手续费+保险  * 人数
				this.onprice = (this.datalist.astlis.price + this.Brokerage + this.bxPrice) * this.datalist.ranst.butalist.length
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
			async uprean() { //申请改签
				let that = this;
				let userlists = this.userlists;
				let ranst = that.datalist.ranst.item;
				let NameCenter = that.NameCenter; //成本中心
				let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
				let TravelDepartlist = that.TravelDepartlist; //部门审批人
				let apprvTaskStaffts = []; //审核人员
				let user_name = this.user_name; //联系人
				let user_ipone = this.user_ipone; //联系电话
				let isbtd = that.datalist.ranst.isbtd; //1因公2因私
				let isblcks = that.toisblcks; //1事前 2事中
				let ists = 0;
				let invs = "";
				if (JSON.stringify(that.datalist.nativeTrainRules) == '{}') {
					ists = 0;
					invs = "";
				} else {
					invs = JSON.stringify({
						information: [{
							'nativeTrainRules': that.datalist.nativeTrainRules
						}]
					});
					ists = 1;
				}
				if (NameCenter.id == '' && isbtd == 1 && that.datalist.isarsrl == false && this.RuleMas) {
					that.showToasts("请选择成本中心！");
					return
				} else if (TravelCostCenlist.length == 0 && isbtd == 1 && that.datalist.isarsrl == false && this.CostCi == true) {
					that.showToasts("请选择成本审批人！");
					return
				} else if (TravelDepartlist.length == 0 && isbtd == 1 && that.datalist.isarsrl == false && this.CostCis == true) {
					that.showToasts("请选择部门审批人！");
					return
				} else if (that.reson == '' && isbtd == 1) {
					that.showToasts("请输入出行事由！");
					return
				} else if (user_name == '') {
					that.showToasts("请输入联系人！");
					return
				} else if (user_ipone == '' || this.utils.zzPhone(user_ipone)) {
					that.showToasts("请输入正确的联系电话！");
					return
				}
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
				let dat = {};
				if (that.RuleMas == true && that.datalist.isarsrl == false && isbtd == 1) { //是否免审
					dat = {
						trainBook: {
							queryKey: that.datalist.ranst.queryKey, //火车编码
							seatName: that.datalist.astlis.seatName,
							trainNo: ranst.trainNo,
							fromStation: ranst.fromStation,
							fromStationCode: ranst.fromStationCode,
							fromTime: ranst.fromTime, //出发时间
							toStation: ranst.toStation,
							trainDate: ranst.dats, //出发日期
							toStationCode: ranst.toStationCode,
							toTime: ranst.toTime, //到达时间
							toTrainDate: ranst.toTrainDate, //到达日期
							isviolation: ists, //0没超规 1超规
							illegal: invs, //超规信息
							price: that.datalist.astlis.purchasePrice,
							apprvTasks: {
								agree: false,
								taskType: 4, //1为事前2为事中，4为改签
								beforeMiddle: 2, //1为事前2为事中
								reason: that.reson, //理由
								apprvTaskStaffs: apprvTaskStaffts, //审批人信息
								costId: NameCenter.id, //成本中心id
								costName: NameCenter.name, //成本中心名称
								examinePattern: that.RuleMa,
								remark: invs
							}
						},
						saleOrderNo: that.datalist.ranst.saleOrderNo,
						passengerNos: that.datalist.ranst.passengerNos.join(';')
					}
				} else {
					dat = {
						trainBook: {
							isviolation: ists, //0没超规 1超规
							illegal: invs, //超规信息
							queryKey: that.datalist.ranst.queryKey, //火车编码
							seatName: that.datalist.astlis.seatName,
							trainNo: ranst.trainNo,
							fromStation: ranst.fromStation,
							fromStationCode: ranst.fromStationCode,
							fromTime: ranst.fromTime,
							toStation: ranst.toStation,
							trainDate: ranst.dats, //出发日期
							toTime: ranst.toTime, //到达时间
							toTrainDate: ranst.toTrainDate, //到达日期
							toStationCode: ranst.toStationCode,
							price: that.datalist.astlis.purchasePrice,
							apprvTasks: {
								agree: false,
								taskType: 4, //1为事前2为事中，4为改签
								beforeMiddle: 2, //1为事前2为事中
								reason: that.reson, //理由
								examinePattern: that.RuleMa
							}
						},
						saleOrderNo: that.datalist.ranst.saleOrderNo,
						passengerNos: that.datalist.ranst.passengerNos.join(';')
					}
				}

				try {
					const res = await order.applyChangeTrain(dat);
					if (res.code == '200') {
						if (res.data.msgCode == '100') {
							that.showToasts("提交改签成功！")
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/order/order'
								})
							}, 1000)
						} else {
							this.showToasts(res.data.msgInfo);
						}
					} else {
						uni.showToast({
							title: res.message,
							duration: 5000,
							icon: 'none'
						});
					}
				} catch (e) {
					console.log(e);

				}
			},
			async okadd() { //提交订单
				let that = this;
				let picklist = this.picklist; //选座
				let sst = this.datalist.ranst.item.trainNo.substring(0, 1);
				let slv = this.datalist.astlis.seatName;
				let userlists = this.userlists;//出行人
				let ranst = that.datalist.ranst.item;
				let NameCenter = that.NameCenter; //成本中心
				let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
				let TravelDepartlist = that.TravelDepartlist; //部门审批人
				let apprvTaskStaffts = []; //审核人员
				let user_name = this.user_name; //联系人
				let user_ipone = this.user_ipone; //联系电话
				let isbtd = that.datalist.ranst.isbtd; //1因公2因私
				let isblcks = that.toisblcks; //1事前 2事中
				if(userlists.length > 5){
					that.showToasts('出行人不能大于5个!');
					return
				}
				if (sst == 'G' || sst == 'C' || (sst == 'D' && slv != '动卧')) {
					if (picklist.length < this.userlists.length && slv != '无座') {
						that.showToasts("请选座！");
						return
					}
				}

				if (NameCenter.id == '' && isblcks == 2 && isbtd == 1 && that.datalist.isarsrl == false) {
					that.showToasts("请选择成本中心！");
					return
				} else if (TravelCostCenlist.length == 0 && isbtd == 1 && that.datalist.isarsrl == false && this.CostCi == true) {
					that.showToasts("请选择成本审批人！");
					return
				} else if (TravelDepartlist.length == 0 && isbtd == 1 && that.datalist.isarsrl == false && this.CostCis == true) {
					that.showToasts("请选择部门审批人！");
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
				let getTravelPolicys = that.getTravelPolicys;//保险规则判断是否要选择保险
				if (getTravelPolicys != null) {
					if (getTravelPolicys.domesticInsuranceProduct == 0) {
						if (this.insurancesIndex == 0 && isblcks != 4) {
							that.showToasts("请选择一个保险")
							return
						}
					}
				}
				//座位排序
				let seatNos = [];
				for (let i = 0; i < this.picklist.length; i++) {
					seatNos.push(
						this.picklist[i].item.value
					)
				}
				seatNos.sort()

				console.log("zzx" + seatNos.length);
				let seatNo = '';
				let len = seatNos.length;
				for (let i = 0; i < len; i++) {
					seatNo += seatNos[i];
				}
				console.log("seatNo:" + seatNo)

				let usersalist = [];
				let ists = 0;
				for (let i = 0; i < userlists.length; i++) { //出行人信息
					usersalist.push({
						cardNo: this.scardnno[i],
						cardType: this.scardns[i],
						gender: userlists[i].gender,
						name: userlists[i].name,
						passengerBirth: userlists[i].birthdate,
						phone: userlists[i].phone,
						deptName: userlists[i].deptName,
						costcenterName: this.datalist.ranst.butalist[i].costcenterName,
						passengerNo: userlists[i].passengerNo,
						employeeType: userlists[i].employeeType,
						passengerType: 1,
					})
				}
				let dat = {};
				if (isblcks == 2 && isbtd == 1 && this.datalist.isarsrl == false || isblcks == 1  && isbtd == 1 && this.datalist.isarsrl ==
					false && this.isblckt == true) { //事中因公 不是免审 或者 事前需要二次审批
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
					if (JSON.stringify(that.datalist.nativeTrainRules) == '{}') {
						ists = 0;
						invs = ""
					} else {
						invs = JSON.stringify({
							information: [{
								'nativeTrainRules': this.datalist.nativeTrainRules
							}]
						});
						ists = 1
					}
					dat = {
						apprvTasks: {
							taskType: isblcks, //1为事前2为事中，
							beforeMiddle: isblcks, //1为事前2为事中
							reason: that.reson, //理由
							apprvTaskStaffs: apprvTaskStaffts, //审批人信息
							costId: NameCenter.id, //成本中心id
							costName: NameCenter.name, //成本中心名称
							vehicleId: this.vehicleId,
							remark: invs
						},
						trainPassengerList: usersalist, //出行人信息
						person: user_name, //联系人
						cellphone: user_ipone, //联系电话
						email: '', //邮箱
						fromStation: ranst.fromStation,
						fromStationCode: ranst.fromStationCode,
						fromTime: ranst.fromTime,
						price: that.datalist.astlis.purchasePrice,
						runTimeSpan: ranst.runTimeSpan,
						seatName: that.datalist.astlis.seatName,
						toStation: ranst.toStation,
						toStationCode: ranst.toStationCode,
						toTime: ranst.toTime,
						toTrainDate: ranst.toTrainDate, //达到日期
						trainClass: ranst.trainClass,
						trainNo: ranst.trainNo,
						trainDate: ranst.dats, //出发日期
						travelTypeorth: isbtd, //因公1 因私2
						queryKey: that.datalist.ranst.queryKey, //火车编码
						isviolation: ists, //0没超规 1超规
						illegal: invs, //超规信息
						seatNo: seatNo, //座位
					}
				} else if (isblcks == 1 && isbtd == 1 && (this.datalist.isarsrl == true || this.isblckt == false)) { //事前因公 免审或者 不需要二次审批
					dat = {
						apprvTasks: {
							taskType: isblcks, //1为事前2为事中，
							beforeMiddle: isblcks, //1为事前2为事中
							costId: NameCenter.id, //成本中心id
							costName: NameCenter.name, //成本中心名称
							travelNo: this.datalist.ranst.mokksli.travelNo, //出差单号
							vehicleId: this.vehicleId,
						},
						trainPassengerList: usersalist, //出行人信息
						person: user_name, //联系人
						cellphone: user_ipone, //联系电话
						email: '', //邮箱
						fromStation: ranst.fromStation,
						fromStationCode: ranst.fromStationCode,
						fromTime: ranst.fromTime,
						price: that.datalist.astlis.purchasePrice,
						runTimeSpan: ranst.runTimeSpan,
						seatName: that.datalist.astlis.seatName,
						toStation: ranst.toStation,
						toStationCode: ranst.toStationCode,
						toTime: ranst.toTime,
						toTrainDate: ranst.toTrainDate, //达到日期
						trainClass: ranst.trainClass,
						trainNo: ranst.trainNo,
						trainDate: ranst.dats, //出发日期
						travelTypeorth: isbtd, //因公1 因私2
						queryKey: that.datalist.ranst.queryKey, //火车编码
						isviolation: 0, //0没超规 1超规
						illegal: '', //超规信息
						seatNo: seatNo, //座位
					}
				} else if (isbtd == 2 || (isbtd == 1 && that.datalist.isarsrl == true)) { //因私 或者 因公免审
					dat = {
						apprvTasks: {
							taskType: isblcks, //1为事前2为事中，
							beforeMiddle: isblcks, //1为事前2为事中
						},
						trainPassengerList: usersalist, //出行人信息
						person: user_name, //联系人
						cellphone: user_ipone, //联系电话
						email: '', //邮箱
						fromStation: ranst.fromStation,
						fromStationCode: ranst.fromStationCode,
						fromTime: ranst.fromTime,
						price: that.datalist.astlis.purchasePrice,
						runTimeSpan: ranst.runTimeSpan,
						seatName: that.datalist.astlis.seatName,
						toStation: ranst.toStation,
						toStationCode: ranst.toStationCode,
						toTime: ranst.toTime,
						toTrainDate: ranst.toTrainDate, //达到日期
						trainClass: ranst.trainClass,
						trainNo: ranst.trainNo,
						trainDate: ranst.dats, //出发日期
						travelTypeorth: isbtd, //因公1 因私2
						queryKey: that.datalist.ranst.queryKey, //火车编码
						isviolation: 0, //0没超规 1超规
						illegal: '', //超规信息
						seatNo: seatNo, //座位
					}
				}
				if(this.insurancesIndex != 0){
					dat['insCode'] = this.insurancesList[this.insurancesIndex].id;
					dat['insPrice'] = this.insurancesList[this.insurancesIndex].buyPrice;
				}
				try {
					const res = await tork.bookTrain(dat); //预定订单

					if (res.code == 200) {
						this.showToasts("创建订单成功");
						setTimeout(() => {
							uni.setStorageSync("sworders_od", {
								type: 'train',
								data: res.data
							});
							uni.switchTab({
								url: '/pages/order/order',
								success: function() {}
							})
						}, 1000)
					} else {
						uni.showToast({
							title: res.message,
							duration: 5000,
							icon: 'none'
						});
					}
				} catch (e) {
					console.log(e)

				}
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
			isshow() {
				this.ops_list = false
				this.blac_show = false;
				this.switfal = false;
				this.costs = false;
			},
			async appswlist(itname) { //选择审批人
				let that = this;
				let nuarry = [];
				if (that.toisblcks == 4) {
					nuarry = that.datalist.ranst.userlistnos;
				} else {
					let nus = that.datalist.ranst.butalist; //出差人的集合
					for (var i = 0; i < nus.length; i++) {
						nuarry.push(nus[i].passengerNo) //获取出行人员id
					}
				}

				let res;
				try {
					if (that.toisblcks == 4) {
						res = await tork.getStaffList({
							costId: that.NameCenter.id,
							passengerNos: nuarry,
							applyType: 4
						});
					} else if (this.isblckt == true) {
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
			approval() {
				if (this.isblckt == true) {
					return
				}
				this.ops_list = true
				this.blac_show = true;
				this.sli_old(); //点击成本中心
			},
			clslitk(item) { //点击成本中心部门
				// if(this.toisblcks == 1){
				// 	return
				// }
				// if(item.id == this.slit_id_checd){
				// 	return
				// }
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
			reblocks(item) { //返回上级
				let ls = this.treeLists; //部门列表
				let id = item.id;
				this.slit_id_checd = id; //当前点击的部门id
				this.sli_namelist = []; //重新渲染部门信息
				let ins = this.slitlist.indexOf(item); //获取当前级别的下标
				for (var i = 0; i < this.slitlist.length; i++) { //删除右边级别
					if (i > ins) {
						this.slitlist.splice(i, 1);
					}
				}
				for (var i = 0; i < ls.length; i++) { //判断是否有子集
					if (JSON.stringify(item.parentId) == JSON.stringify(ls[i].parentId)) {
						this.sli_namelist.push(ls[i])
					}
				}
				this.botname = item.name;
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
			vals(num, st) { //回显证件号
				for (let i = 0; i < st.length; i++) {
					if (num == i) {
						return st[i].cardNo
					}
				}
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
			caname(item) { //回显证件名字
				for (let i = 0; i < this.carld.length; i++) {
					if (this.carld[i].code == item) {
						return this.carld[i].name
					}
				}
			},
			async userlist() {
				let st = [];
				this.userlists = [];
				if (this.datalist.ranst.butalist[0].vehicleId != undefined) {
					this.vehicleId = this.datalist.ranst.butalist[0].vehicleId; //事前id
				}
				if (this.toisblcks == 4) { //改签状态下不能修改乘客证件
					for (let i = 0; i < this.datalist.ranst.butalist.length; i++) {
						this.userlists.push({
							name: this.datalist.ranst.butalist[i].name,
							certType: this.datalist.ranst.butalist[i].certType,
							certNo: this.datalist.ranst.butalist[i].certNo,
						})
					}
				} else {
					for (let i = 0; i < this.datalist.ranst.butalist.length; i++) {
						st.push(this.datalist.ranst.butalist[i].passengerNo);
					}

					try {
						const res = await mydi.getPassengerListByNos(st);

						if (res.code == 200) {
							this.carld = res.data.cardTypeList; //证件类型
							this.userlists = res.data.passList; //用户信息
							for (var i = 0; i < this.userlists.length; i++) {
								this.CostCencd.push({
									index: 0
								})
							}
							for (let i = 0; i < this.userlists.length; i++) {
								this.userlists[i].name = this.userlists[i].certificateList[0].firstName + this.userlists[i].certificateList[0]
									.lastName;
								this.scardns[i] = this.userlists[i].certificateList[0].cardType;
								this.scardnno[i] = this.userlists[i].certificateList[0].cardNo;
							}

						}
						for (let i = 0; i < this.userlists.length; i++) {
							for (let k = 0; k < this.userlists[i].certificateList.length; k++) {
								this.userlists[i].certificateList[k]['cardTypename'] = this.caname(this.userlists[i].certificateList[k].cardType);
							}
						}
						this.showseat();
					} catch (e) {
						console.log('请求用户类型报错',e)

					}
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.readlist {
		width: 100%;
		height: 100vh;
		padding-bottom: 60upx;

		.black_mu {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: black;
			opacity: 0.5;
			z-index: 860;
		}

		.rea_t {
			width: calc(100% - 40upx);
			margin: 40upx 20upx;

			.tea_tal {
				width: calc(100% - 20upx);
				font-size: 30upx;
				padding: 0 10upx;
				height: 70upx;
				border-top-left-radius: 15upx;
				border-top-right-radius: 15upx;
				color: #ffffff;
				background: #4089e8;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.tea_tab {
				font-size: 35upx;
				width: calc(100% - 20upx);
				padding: 10upx 10upx;
				border-bottom-left-radius: 15upx;
				border-bottom-right-radius: 15upx;
				color: #333333;
				background: #ffffff;

				.tae_lis {
					color: #333333;
					display: flex;
					line-height: 50upx;
					align-items: center;
					justify-content: space-between;
				}
			}
		}

		.userlist {
			width: calc(100% - 40upx);
			padding: 10upx 0;
			background: #ffffff;
			color: #333333;
			font-size: 30upx;
			margin: 0 20upx;
			border-radius: 10upx;

			.userls {
				width: calc(100% - 40upx);
				padding: 10upx 20upx;
				display: flex;
				border-bottom: 2upx solid #f1f1f1;

				.user_ls {
					width: 25%;
					font-size: 28upx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-right: 2upx solid #f1f1f1;
				}

				.user_rs {
					width: calc(75% - 30upx);
					padding-left: 30upx;
					line-height: 50upx;
					font-size: 28upx;

					.wors {
						width: 60%;
						height: 50upx;
						font-size: 28upx;
						line-height: 50upx;
						padding-left: 20upx;
						border: 2upx solid #C8C7CC;
						border-radius: 10upx;
					}
				}
			}

			.userls:last-child {
				border: 0;
			}
		}

		.shows {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}

		.costlists {
			position: fixed;
			bottom: 0;
			left: 0;
			padding-bottom: 90upx;
			transition: all 0.3s ease;
			-webkit-transform: translateY(100%);
			transform: translateY(100%);
			width: 100%;
			z-index: 870;
			line-height: 90upx;
			background: #ffffff;
			font-size: 30upx;

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
						flex: 1;
					}

					.scse_r {
						flex: 1;
						padding-right: 20upx;
						display: flex;
						justify-content: flex-end;

						.corssize {
							color: #FF9000;
						}
					}
				}

				.costs {
					border-bottom: 2upx solid #D0DEE5;
				}
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

		.show {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
		.insurances{
			width: calc(100% - 40upx);
			padding: 20upx;
			margin-top: 20upx;
			font-size: 28upx;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			.insuName{
				text-align: center;
				width: 25%;
				color: #c0c0c0;
				font-size: 30upx;
			}	
			.navigas {
				width: 260upx;
				margin-right: 10upx;
				line-height: 50upx;
				border: #C8C7CC solid 1upx;
				border-radius: 10upx;
				text-indent: 15upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.is-gift{
				color: #333333;
			}
			.face-price{
				color: #FF9000;
			}
			.navimd {
				color: #C0C0C0;
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
						width: 25%;
						text-align: center;
						color: #c0c0c0;
					}

					.ravright {
						width: 75%;
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
						}

						.bot {
							display: flex;
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

		.oksl {
			position: fixed;
			left: 0;
			bottom: 0;
			color: #FFFFFF;
			width: 100%;
			height: 90upx;
			display: flex;
			line-height: 90upx;
			background: #FFFFFF;
			z-index: 880;

			.oksl_l {
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

			.oksl_r {
				width: 30%;
				font-size: 35upx;
				height: 90upx;
				text-align: center;
				background: #FF9000;
			}
		}

		.cseat {
			width: 100%;
			margin-top: 20upx;

			.seat_a {
				height: 90upx;
				line-height: 90upx;
				font-size: 28upx;
				background: #FFFFFF;
				margin-bottom: 20upx;

				.seat_fo {
					width: 20%;
					text-align: center;
					color: #c0c0c0;
				}

				.seat_le {
					width: 100%;
					height: 90upx;
					overflow: scroll;
					display: flex;
					align-items: center;

					.seat {
						display: inline-block;
						color: #666;
						cursor: pointer;
						background-image: url(http://img20.360buyimg.com/uba/jfs/t7282/74/1658256725/1195/7e270fe2/599e6afbN59d51b35.png);
						background-repeat: no-repeat;
						background-size: 70upx;
						background-position: center; //图片居中
						width: 75upx;
						text-align: center;
						line-height: 60upx;
						margin: 7upx;
					}

					.pickseat {
						display: inline-block;
						color: #666;
						cursor: pointer;
						background-image: url(http://img30.360buyimg.com/uba/jfs/t7588/281/1633648098/1268/b1d85178/599e6bbcNfb1b597a.png);
						background-repeat: no-repeat;
						background-size: 70upx;
						background-position: center; //图片居中
						width: 75upx;
						text-align: center;
						line-height: 60upx;
						margin: 7upx;
					}
				}
			}

		}




	}
</style>
