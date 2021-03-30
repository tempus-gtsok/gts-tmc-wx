<template>
	<view class="Initiatetravelapplications">
		<loading>
		</loading>
		<headnavigation titles="出差信息"></headnavigation>
		<view class="ravelv">
			<view class="ts">
				<view class="rav_left">出差人员</view>
				<view class="ravright" @click="mulist">
					<view class="bos">
						<view class="userlists" v-for="(item, index) in Butraveler" :key="index">{{ item.userName }}</view>
					</view>
					<view class="iconfont">&#xe8a3;</view>
				</view>
			</view>
		</view>
		<view class="ravelv">
			<view class="ts">
				<view class="rav_left">申请人员</view>
				<view class="ravright" @click="applicantck">
					<view class="bos">
						<view class="redlogs">
							(执行申请人的审批流程)
						</view>
						<view class="userlists" v-if="Object.keys(appli).length > 0">{{ appli.userName }}({{appli.costcenterName}})</view>
					</view>
					<view class="iconfont">&#xe8a3;</view>
				</view>
			</view>
		</view>
		<view class="ravelv">
			<view class="ts">
				<view class="rav_left">出差日期</view>
				<view class="ravright">
					<view class="bos">
						<calendar @change="lischang" startDate="2020-3-12" endDate="2020-3-14" :daysCount="daysCount"></calendar>
					</view>
					<!-- <view class="iconfont">&#xe8a3;</view> -->
				</view>
			</view>
		</view>
		<view class="ravelv">
			<view class="ts">
				<view class="rav_left">出差事由</view>
				<view class="ravright">
					<view class="bos"><input type="text" value="" v-model="Reasonsfor" /></view>
				</view>
			</view>
		</view>
		<view class="ravelv">
			<view class="ts">
				<view class="rav_left">详细说明</view>
				<view class="ravright">
					<view class="bos"><input type="text" value="" v-model="Dedescription" /></view>
				</view>
			</view>
		</view>
		<view class="ravelvs">
			<view class="tks">
				<view class="rav_left">出差行程</view>
				<view class="ravright" @click="lc_op">
					<view class="bost"></view>
					<view class="iconfont" style="color: #007aff;font-size: 60upx;">&#xe84f;</view>
				</view>
			</view>
			<view class="tlists" v-if="Businlist.length > 0" v-for="(item,index) in Businlist" :key="index">
				<view class="tl_left" @click="de_bus(index)">
					<view class="iconfont" style="color: #C8C7CC;">&#xe666;</view>
				</view>
				<view class="tl_right">
					<view class="tl_tops">
						<view class="">
							{{newicname(item.icname)}}
						</view>
						<view style="margin-left: 10upx;">
							{{newstaname(item)}}
						</view>
					</view>
					<view class="tl_bots">
						{{newdata(item)}}
					</view>
				</view>
			</view>
		</view>
		<view class="ravelv">
			<view class="ts">
				<view class="rav_left">归属部门</view>
				<view class="ravright">
					<view class="bos">
						{{attdepartment}}
					</view>
				</view>
			</view>
		</view>
		<view class="ravelv">
			<view class="ts">
				<view class="rav_left">预估费用</view>
				<view class="ravright">
					<view class="bos"><input type="number" maxlength="6" @input="estimatedcosts" placeholder="0" value="" v-model="estimatedcost" /></view>
				</view>
			</view>
		</view>
		<view class="costslist" v-for="(item,index) in costlist" :key="index">
			<view class="costslis">
				<view class="costleft">
					<!-- <span class="iconfont" @click="delecos(index)">&#xe644;</span> -->
					成本中心
				</view>
				<view class="costrightpl" @click="approval(index)" v-if="item.costcenterName == ''">
					选择成本中心
				</view>
				<view class="costright" @click="approval(index)" v-else>
					{{item.costcenterName}}
				</view>
			</view>
			<view class="costslis">
				<view class="costleft">
					适用人员
				</view>
				<!-- <view class="costrightpl" @click="plonslit(index,item)" v-if="item.username.length == 0">
					请选择适用人员(必填)
				</view>
				<view class="costright" @click="plonslit(index,item)" v-else>
					{{namest(item.username)}}
				</view> -->
				<view class="costright">
					{{namest(item.username)}}
				</view>
			</view>

			<view class="costsli">
				<view class="coslipc">
					<view class="costleft" style="font-size: 32upx;">
						成本比例
					</view>
					<view class="costright">
						<input v-model="item.bn" type="number" @input="bninputs($event,index)" maxlength="3" value="" />%
					</view>
				</view>
				<view class="coslipc">
					<view class="costleft" style="font-size: 32upx;">
						成本金额
					</view>
					<view class="costright">
						<input v-model="item.price" type="number" disabled maxlength="6" value="" />
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="costadd" @click="costadd">
			<span class="iconfont">&#xe89f;</span>
		</view> -->
		<view class="ravelv" v-if="CostCi">
			<view class="ts">
				<view class="rav_left">成本审批人</view>
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
				<view class="rav_left">部门审批人</view>
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
		<view :class="{'share-box': shos}" @click="isshow">
		</view>
		<view class="share-item" :class="{'share-show': shos}">
			<!-- 行程 -->
			<view class="ctis" v-if="showtype == 'triplist'">			
				<view class="cstop">
					<view class="cits" @click="isck(item)" :class="item.id == nos ? 'no' : ''" v-for="(item, index) in cits" :key="index">{{ item.name }}</view>
				</view>
				<view class="div_li">
					<view class="sist">
						<sscity @Busirticket_adds="sirticket_adds" @Busitraiket_adds="sitraiket_adds" :current="currentPage"
						 :sBusirticket="Busirticket" :sBusitraiket="Busitraiket" :tsta_Hotelket="sta_Hotelket" :send_Hotelket="end_Hotelket"></sscity>
						<calendars @delet="detimes" :bhotellmes="hotellmes" :bend_Traveltrain="end_Traveltrain" :bsta_Traveltrain="sta_Traveltrain"
						 :bend_Flightbus="end_Flightbus" :bsta_Flightbus="sta_Flightbus" :current="currentPage" @change="lischangs"
						 :startDate="statime" :endDate="endtiem" :daysCount="daysCount"></calendars>
					</view>
				</view>
				<view class="check_btns">
					<view class="chck_left" @click="addtravl()">保存</view>
					<view class="chck_right" @click="addold()">继续添加</view>
				</view>
			</view>
			<!-- 申请适用人员 -->
			<view class="passnalist" v-if="showtype == 'passnalist'">
				<view class="userlist_top" v-if="canname=='conapplicantlists'">
					<view class="userantb">
						取消
					</view>
					<view>
						请选择适用人员
					</view>
					<view class="userantb" @click="okuserlists">
						确认
					</view>
				</view>
				<view class="userlist_top" v-if="canname=='applicantlists'">
					<view>
					</view>
					<view>
						请选择申请人
					</view>
					<view>
					</view>
				</view>
				<view class="ci_list" v-if="shost">
					<view v-if="canname=='applicantlists'" class="cl_val" v-for="(item, index) in applicantlist" :key="index" @click="ad_cion(item, index)">
						<view>{{ item.userName }}({{item.costcenterName}})</view>
						<view class="ok_ioc" v-if="appli.userId == item.userId"><text class="iconfont" style="color:#007aff;">&#xe60b;</text></view>
					</view>
					<view v-if="canname=='conapplicantlists'" class="clbox">
						<view class="cl_valst" v-for="(item, index) in userconlists" :key="index" @click="okconli(item, index)">
							<view v-if="item.ist == 0" class="cl_vals">{{ item.name }}</view>
							<view v-if="item.ist == 1" class="ad_vals">{{ item.name }}</view>
							<view v-if="item.ist == 2" class="ck_vals">{{ item.name }}</view>
							<!-- <view class="ok_ioc" v-if="apuserIds == item.userId"><text class="iconfont" style="color:#007aff;">&#xe60b;</text></view> -->
						</view>
					</view>
				</view>
			</view>
			<!-- 选择成本中心 -->
			<view class="coseidlist"  v-if="showtype == 'coseidlist'">
				<view class="btns">
					<view class="btns_z" @click="reblock">
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
			<!-- 选择审批人 -->
			<view class="flists" v-if="showtype == 'flists'">
				<view class="btns">
					<view class="btns_z" @click="reblockop">
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
		</view>
		<view v-if="Travel != null">
			<view class="ravelv" v-for="item in Travel" v-if="item == 1">
				<view class="ts">
					<view class="rav_left">基金中心</view>
					<view class="ravright">
						<view class="bos"><input type="text" value="" v-model="wbs" /></view>
					</view>
				</view>
			</view>
			<view class="ravelv" v-for="item in Travel" v-if="item == 2">
				<view class="ts">
					<view class="rav_left">OA出差单号</view>
					<view class="ravright">
						<view class="bos" style="margin-left: 10px"><input type="text" value="" v-model="oaTravelNo" /></view>
					</view>
				</view>
			</view>
			<view class="ravelv" v-for="item in Travel" v-if="item == 3">
				<view class="ts">
					<view class="rav_left_wbs">项目代码(WBS元素)</view>
					<view class="ravright">
						<view class="bos"><input type="text" value="" v-model="projectCode" /></view>
					</view>
				</view>
			</view>
		</view>
		<view class="check_btn">
			<view class="chck_left" @click="roblak">取消</view>
			<view class="chck_right" @click="add_user">提交出差申请</view>
		</view>
	</view>
</template>

<script>
	import calendars from '@/components/view/towork/data_du.vue';
	import sscity from '@/components/view/towork/sscity/ssscity.vue';
	import calendar from '@/components/view/towork/data_pk.vue';
	import tork from '@/api/torowk.js'
	import Mydi from '@/api/mydi.js';
	import order from "../../../../../api/order";
	export default {
		components: {
			calendar,
			calendars,
			sscity
		},
		data() {
			return {
				showtype:'',//类型
				wbs: '',
				oaTravelNo: '', //oa出差单号
				projectCode: '', //项目代码
				userconlists: [], //复制适用人员
				userconlist: [], //适用人员
				canname: '',
				cosindex: 0, //当前选择的成本下标
				estimatedcost: '', //预估费用
				applicantlist: [], //申请人列表
				appli: {}, //当前选择申请人
				shost: false,
				endtiemy: '',
				checkuserlist: [],
				searchlists: [],
				CostCenter: [],
				Deparapp: [],
				CostCi: false,
				CostCis: false, //是否有成本中心审批人
				sli_namelist: [],
				slid: 1,
				ullist: [{
					name: '成本中心',
					id: 1
				}],
				slitlist: [],
				cbnames: [], //审批人
				cbname: '', //成本中心名称
				cbid: '', //成本中心id
				botname: '', //当前选择的成本中心名称
				slit_id_checd: 0, //当前点击成本中心的id
				treeLists: [], //归属部门列表
				statime: '', //出差开始时间
				endtiem: '', //出差结束时间
				endtiems: '', //酒店结束时间
				currentPage: 'Planeticket',
				cits: [{
						name: '机票',
						ul: 'Planeticket',
						id: 1
					},
					{
						ul: 'Hotel',
						name: '酒店',
						id: 2
					},
					{
						ul: 'Train',
						name: '火车',
						id: 3
					}
				],
				nos: 1,
				shos: false,
				daysCount: 365,
				userlist: [], //当前点击部门下的用户
				listps: [], //搜索显示的值
				attdepartment: '', //归属部门
				userid_list: [], //出差的人员
				CostCenterlist: [], //成本中心审批人
				costlist: [], //当前选择的成本中心审批人集合
				isswf: true, //true为成本中心 false为部门   审批人
				Deparapprover: [], //部门审批人
				deparlist: [], //前选择的部门审批人集合
				Butraveler: [], //出差人员
				TravelCostCenlist: [], //成本中心审批人集合
				TravelDepartlist: [], //部门审批人集合
				NameCenter: {
					name: '',
					id: ''
				}, //成本中心名称
				Businlist: [], //行程
				sta_Flightbus: {}, //出差飞机出发时间
				end_Flightbus: {}, //出差飞机返回时间
				sta_Traveltrain: {}, //出差火车出发时间
				end_Traveltrain: {}, //出差火车返回时间
				sta_Hotelkettime: {}, //出差酒店出发时间
				end_Hotelkettime: {}, //出差酒店返回时间
				hotellmes: [],
				Busirticket: [{
					name: '',
					id: ''
				}, {
					name: '',
					id: ''
				}], //出差飞机城市
				Busitraiket: [{
					name: '',
					id: ''
				}, {
					name: '',
					id: ''
				}], //火车出差城市
				sta_Hotelket: {}, //出差酒店城市
				end_Hotelket: '', //出差酒店地址
				Traveltime: [], //出差时间
				Reasonsfor: '', //出差事由
				Dedescription: '', //详细说明
				businesstrip: '', //出差事由
				descriptions: '', //详细说明
				Travel: []
			};
		},
		beforeCreate() { //设置body的样式：因为body的高度影响了页面的显示
			document.querySelector('body').setAttribute('style', 'height: 0%')
		},
		onShow() { //返回监听赋值
			uni.$on("oersibbel",res=>{
				let that = this;
				that.Butraveler = res.data;
				that.userconlist = [];
				that.costlist = [];
				let bnsi = parseInt(100 / that.Butraveler.length);
				for (let k in that.Butraveler) {
					that.userconlist.push({
						name: that.Butraveler[k].userName,
						passengerNo: that.Butraveler[k].passengerNo,
						ist: 0 //0是未选中状态
					})
					that.costlist.push({
						costcenterName: that.Butraveler[k].costcenterName,
						costcenterId: that.Butraveler[k].costcenterId,
						bn: bnsi,
						price: 0,
						username: [{
							name: that.Butraveler[k].userName,
							passengerNo: that.Butraveler[k].passengerNo
						}],
					})
				}
				if (bnsi * that.Butraveler.length != 100) {
					let sit = 100 - (that.Butraveler.length * bnsi); //余数
					for (var i = 0; i < sit; i++) {
						that.costlist[i].bn = bnsi + 1;
					}
							
				}
				that.NameCenter.name = "";
				that.NameCenter.id = "";
				that.TravelCostCenlist = [];
				that.TravelDepartlist = [];
				that.isuserlist = false;
				let datas = uni.getStorageSync('userinfo' + uni.getStorageSync('appWxId'));
				that.attdepartment = datas.deptName;
				that.appli = {
					istrue: 1,
					passengerNo: datas.passengerVo.id, //暂时没有该参数
					userName: datas.user.name,
					userId: datas.user.id,
					deptName: datas.user.deptName,
					deptId: datas.user.deptId,
					phone: datas.user.phone,
					costcenterId: datas.passengerVo.costcenterId,
					costcenterName: datas.passengerVo.costcenterName
				}
				uni.$off("Busirticket_add")
			})
			uni.$on("Busirticket_add", res => {
				let rtos = res.data;
				if (res.name == "Planeticket") {
					this.Busirticket = [{
						name: rtos[0].name,
						id: rtos[0].id
					}, {
						name: rtos[1].name,
						id: rtos[1].id
					}];
				} else if (res.name == "Train") {
					this.Busitraiket = [{
						name: rtos[0].name,
						id: rtos[0].id
					}, {
						name: rtos[1].name,
						id: rtos[1].id
					}];
				} else if (res.name == "Hotel") {
					this.sta_Hotelket = rtos;
					this.end_Hotelket = '';
				} else if (res.name == "Hotelr") {
					this.end_Hotelket = rtos;
				}
				uni.$off("Busirticket_add")
			})
			uni.$on("initavetime", res => {
				if (res.name == "sta_Flightbus_adds") { //出差飞机出发时间
					this.sta_Flightbus = res.date;
				} else if (res.name == "end_Flightbus_adds") { //出差飞机返回时间
					this.end_Flightbus = res.date;
				} else if (res.name == "Traveltrains_adds") { //出差火车出发时间
					this.sta_Traveltrain = res.date;
				} else if (res.name == "Traveltraine_adds") { //出差火车返回时间
					this.end_Traveltrain = res.date;
				} else if (res.name == "end_Hotelkettime_adds") { //出差酒店时间
					let su = [];
					su.push(res.das);
					su.push(res.date);
					this.hotellmes = su;
					this.sta_Hotelkettime = res.das;
					this.end_Hotelkettime = res.date;
				}
				uni.$off("initavetime")
			})
		},
		mounted() {
			this.TravelSwitch();
			const data = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //获取归属部门
			if (data.deptName) {
				this.attdepartment = data.deptName;
			}
			let datas = uni.getStorageSync('userinfo' + uni.getStorageSync('appWxId')); //检验是否是登录状态
			if (datas) {
				if (this.Butraveler.length == 0) {
					this.Butraveler = [{
						istrue: 1,
						passengerNo: datas.passengerVo.id, //暂时没有该参数
						userName: datas.user.name,
						userId: datas.user.id,
						deptName: datas.user.deptName,
						deptId: datas.user.deptId,
						phone: datas.user.phone,
						costcenterId: datas.passengerVo.costcenterId,
						costcenterName: datas.passengerVo.costcenterName
					}]
					this.applicantlist = [{
						istrue: 1,
						passengerNo: datas.passengerVo.id, //暂时没有该参数
						userName: datas.user.name,
						userId: datas.user.id,
						deptName: datas.user.deptName,
						deptId: datas.user.deptId,
						phone: datas.user.phone,
						costcenterId: datas.passengerVo.costcenterId,
						costcenterName: datas.passengerVo.costcenterName
					}]
					this.appli = this.applicantlist[0];
					this.ad_cion(this.appli);
					this.costlist = [{
						username: [{
							name: datas.user.name,
							passengerNo: datas.passengerVo.id
						}],
						costcenterName: datas.passengerVo.costcenterName,
						costcenterId: datas.passengerVo.costcenterId,
						bn: 100,
						price: 0, //分摊金额
					}]
				}
			}
		},
		methods: {
			async TravelSwitch() {
				let res = await order.getTravelSwitch();
				if (res.code == 200) {
					this.Travel = res.data;
				}
			},
			namest(it) {
				var su = [];
				for (let k in it) {
					su.push(it[k].name)
				}
				return su.join(',')
			},
			estimatedcosts(e) { //输入完预估费用
				let das = parseInt(e.detail.value);
				if (das > 0) {
					for (let k in this.costlist) {
						if (this.costlist[k].bn > 0 && this.costlist[k].bn < 101) {
							this.costlist[k].price = (das * (this.costlist[k].bn / 100)).toFixed(2);
						}
					}
				}
			},
			bninputs(e, index) { //修改当前成本比例
				let ast = e.detail.value;
				if (ast > 0 && ast < 101) {
					this.costlist[index].price = (this.estimatedcost * (ast / 100)).toFixed(2);
				}
			},
			okconli(item, index) { //选择当前人员
				if (item.ist == 0) {
					this.userconlists[index].ist = 1;
				} else if (item.ist == 1) {
					this.userconlists[index].ist = 0;
				} else {
					return
				}

			},
			okuserlists() {
				var sut = [];
				for (let k in this.userconlists) {
					if (this.userconlists[k].ist == 1) {
						sut.push(this.userconlists[k])
					}
				}
				if (sut.length == 0) {
					uni.showToast({
						title: '请选择一个适用人员',
						icon: 'none',
						duration: 1000
					})
					return
				}
				this.costlist[this.cosindex].username = sut;
				this.shost = false;
				this.shos = false;
			},
			costadd() { //增加成本分摊
				if (this.costlist.length == this.Butraveler.length) {
					uni.showToast({
						title: '成本中心不能超过出差人数！',
						icon: 'none',
						duration: 1000
					})
					return
				}
				this.costlist.push({
					costcenterName: '',
					costcenterId: 0,
					bn: 0,
					price: 0,
					username: [],
				})
			},
			plonslit(index, item) {
				var sut = this.costlist; //所有分摊
				var stili = [];
				for (var k in sut) { //获取所有已经选择的使用人员
					for (var p in sut[k].username) {
						stili.push(sut[k].username[p])
					}
				}
				for (var t in this.userconlist) { //把已选过的人员改成不能选择模式
					this.userconlist[t].ist = 0;
					for (var j in stili) {
						if (this.userconlist[t].passengerNo == stili[j].passengerNo) {
							this.userconlist[t].ist = 2;
						}
					}
				}
				for (var g in this.userconlist) { //把当前分摊的成本改成已选择模式
					for (var w in item.username) {
						if (this.userconlist[g].passengerNo == item.username[w].passengerNo) {
							this.userconlist[g].ist = 1;
						}
					}
				}

				this.canname = "conapplicantlists";
				this.userconlists = JSON.parse(JSON.stringify(this.userconlist));
				this.cosindex = index;
				this.shos = true;
				this.shost = true;
			},
			delecos(inde) { //删除当前成本
				this.costlist.splice(inde, 1);
			},
			applicantck() {
				if (this.Butraveler.length == 0) {
					uni.showToast({
						title: '请选择出差人员',
						icon: 'none',
						duration: 1000
					})
				} else {
					this.canname = "applicantlists";
					this.showtype = 'passnalist';
					this.applicantlist = [];
					for (let k in this.Butraveler) {
						if (this.Butraveler[k].costcenterName != '' && this.Butraveler[k].costcenterName != null && this.Butraveler[k].costcenterName !=
							undefined) {
							this.applicantlist.push(this.Butraveler[k])
						}
					}
					let ops = false;

					let datas = uni.getStorageSync('userinfo' + uni.getStorageSync('appWxId'));
					for (let k in this.applicantlist) {
						if (this.applicantlist[k].passengerNo == datas.passengerVo.id) {
							ops = true;
						}
					}
					if (ops == false) {
						this.applicantlist.unshift({
							istrue: 1,
							passengerNo: datas.passengerVo.id, //暂时没有该参数
							userName: datas.user.name,
							userId: datas.user.id,
							deptName: datas.user.deptName,
							deptId: datas.user.deptId,
							phone: datas.user.phone,
							costcenterId: datas.passengerVo.costcenterId,
							costcenterName: datas.passengerVo.costcenterName
						})

					}
					this.shos = true;
					this.shost = true;
				}
			},
			ad_cion(item) {
				this.appli = item;
				this.attdepartment = item.deptName;
				this.cbname = item.costcenterName;
				this.cbid = item.costcenterId;
				this.TravelCostCenlist = [];
				this.TravelDepartlist = [];
				this.NameCenter.name = this.cbname;
				this.NameCenter.id = this.cbid;
				this.appswlist();

				this.shos = false;
				this.shost = false;
			},
			detimes(tu) {
				if (tu.name == "Planeticket") {
					this.end_Flightbus = {};
				} else if (tu.name == "Train") {
					this.end_Traveltrain = {};
				}
			},
			sirticket_adds(das) { //交换飞机城市
				this.Busirticket = das;
			},
			sitraiket_adds(das) { //交换火车城市
				this.Busitraiket = das;
			},
			CostCenterChange(e, index) { //选择当前成本中心审批人
				this.CostCenter[index].index = e.detail.value;
			},
			DeparappChange(e, index) { //选择当前部门审批人
				this.Deparapp[index].index = e.detail.value;
			},
			otnames(nms) {
				let suts = [];
				for (let k in nms) {
					suts.push(nms[k].passengerNo);
				}
				return suts
			},
			async add_user() {
				let that = this;
				let estimatedcost = that.estimatedcost; //预估费用
				let constilist = that.costlist; //成本分摊
				let Butraveler = that.Butraveler; //出差人员
				let Traveltime = that.Traveltime; //出差日期
				let Reasonsfor = that.Reasonsfor; //出差事由
				let Dedescription = that.Dedescription; //详细说明
				let Businlist = that.Businlist; //出差行程
				let NameCenter = that.NameCenter; //成本中心
				let WBS = that.wbs;
				let oaTravelNo = that.oaTravelNo; //oa出差单号
				let projectCode = that.projectCode; //项目代码
				let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
				let TravelDepartlist = that.TravelDepartlist; //部门审批人
				let Hotels = []; //酒店行程
				let Aertrains = []; //飞机火车行程
				let Butravelers = []; //出差人员
				let apprvTaskStaffts = []; //审核人员
				if (NameCenter.id == undefined || NameCenter.id == '') {
					NameCenter.id = this.applicantlist[0].costcenterId;
					NameCenter.name = this.applicantlist[0].costcenterName;
				}
				if (Butraveler.length == 0) {
					that.showToasts("请选择出差人员!")
				} else if (Reasonsfor == '') {
					that.showToasts("请输入出差事由!")
				} else if (Businlist.length == 0) {
					that.showToasts("请选择出差行程!")
				} else if (estimatedcost == '') {
					that.showToasts("请输入预估费用")
				} else if (NameCenter.id == undefined || NameCenter.id == '') {
					that.showToasts("请选择申请人员!")
				} else if (TravelCostCenlist.length == 0 && this.CostCi == true) {
					that.showToasts("请选择成本审批人")
				} else if (TravelDepartlist.length == 0 && this.CostCis == true) {
					that.showToasts("请选择部门审批人")
				} else {
					let nums = 0;
					for (let g in constilist) {
						if (constilist[g].costcenterId == "") {
							that.showToasts("请输入成本中心！");
							return
						} else if (constilist[g].username.length == 0) {
							that.showToasts("请选择适用人员！");
							return
						} else if (constilist[g].bn == 0 || constilist[g].bn > 100) {
							that.showToasts("比例的值在1~100 ！");
							return
						}
						nums = this.add(nums, parseFloat(constilist[g].bn).toFixed(1));
					}
					if (nums != 100) {
						uni.showToast({
							title: '比例总和不为100',
							duration: 1000,
							icon: 'none'
						})
						return
					}
					let conlcvlust = [];
					for (let j in constilist) {
						conlcvlust.push({
							costId: constilist[j].costcenterId,
							costPercent: constilist[j].bn,
							passengerNo: constilist[j].username[0].passengerNo
							// passengerNos:this.otnames(constilist[j].username)
						})
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
					let istrains = false;//是否包含火车行程
					for (let i = 0; i < Businlist.length; i++) { //行程
						if (Businlist[i].icname == 'Hotel') {
							Hotels.push({
								innerOuter: 1,
								cityCode: Businlist[i].staname.id,
								cityName: Businlist[i].staname.name,
								inDate: Businlist[i].sta.date.re + ' 00:00:00',
								outDate: Businlist[i].end.date.re + ' 00:00:00',
								remark: Businlist[i].endname
							})
						} else if (Businlist[i].icname == 'Planeticket' || Businlist[i].icname == 'Train') {
							let is = 0;
							let times = ''
							let tike = 1; //去还是回
							if (Businlist[i].end == '') {
								times = Businlist[i].sta.date.re + ' 00:00:00';
								tike = 1;
							} else {
								times = Businlist[i].end.date.re + ' 00:00:00';
								tike = 2;
							}
							if (Businlist[i].icname == 'Planeticket') {
								is = 1
							} else if (Businlist[i].icname == 'Train') {
								istrains = true;
								is = 2
							}
							if (Businlist[i].icname == 'Planeticket' && Businlist[i].end == '') {
								tike = 3
							}
							if (Businlist[i].icname == 'Train' || (Businlist[i].icname == 'Planeticket' && Businlist[i].end == '')) {
								Aertrains.push({
									innerOuter: 1,
									vehicle: is,
									deptDate: times,
									goBack: tike,
									deptCityCode: Businlist[i].staname.id,
									deptCityName: Businlist[i].staname.name,
									arrivCityCode: Businlist[i].endname.id,
									arrivCityName: Businlist[i].endname.name
								})
								
							} else {
								Aertrains.push({
									innerOuter: 1,
									goBackGroup: i,
									vehicle: is,
									deptDate: Businlist[i].sta.date.re + ' 00:00:00',
									goBack: 1,
									deptCityCode: Businlist[i].staname.id,
									deptCityName: Businlist[i].staname.name,
									arrivCityCode: Businlist[i].endname.id,
									arrivCityName: Businlist[i].endname.name
								})
								Aertrains.push({
									innerOuter: 1,
									goBackGroup: i,
									vehicle: is,
									deptDate: Businlist[i].end.date.re + ' 00:00:00',
									goBack: 2,
									deptCityCode: Businlist[i].endname.id,
									deptCityName: Businlist[i].endname.name,
									arrivCityCode: Businlist[i].staname.id,
									arrivCityName: Businlist[i].staname.name
								})
							}

						}
					}
					if(istrains && Butraveler.length > 5){
						this.showToasts('因包含火车行程，出差人数不能超过5人!');
						return
					}
					let butno = [];
					for (let i = 0; i < Butraveler.length; i++) {
						Butravelers.push({
							tempPerson: Butraveler[i].istrue,
							passengerNo: Butraveler[i].passengerNo,
							userName: Butraveler[i].userName,
							userId: Butraveler[i].userId,
							deptName: Butraveler[i].deptName, //部门名称
							deptId: Butraveler[i].deptId, //部门id
							phone: Butraveler[i].phone, //联系电话

						})
						butno.push(Butraveler[i].passengerNo)
					}
					let datw = {
						beforeMiddle: 1,
						taskType: 1,
						applyHotels: Hotels,
						applyVehicles: Aertrains,
						applyStaffs: Butravelers, //出行人
						apprvTasks: [{ //审核单
							wbs: WBS,
							oaTravelNo: oaTravelNo,
							projectCode: projectCode,
							applyStaffCostInfo: conlcvlust,
							totalBudget: estimatedcost, //预估费用
							beforeMiddle: 1,
							costId: NameCenter.id, //成本中心id
							costName: NameCenter.name,
							startDate: Traveltime[0].re + ' 00:00:00', //出差开始时间
							endDate: Traveltime[1].re + ' 00:00:00',
							taskType: 1,
							reason: Reasonsfor, //事由
							status: 0,
							remark: Dedescription, //详细说明
							apprvTaskStaffs: apprvTaskStaffts, //审核人
							passengerNo: butno
						}]
					}

					try {
						let res = await tork.saveApprv(datw);

						if (res.code == 200) {

							that.showToasts(res.message)
							setTimeout(() => {
								uni.$emit('add_user', res);
								uni.navigateBack({})
							}, 500)
						} else {

							that.showToasts(res.message)
						}
						//提交出差申请
					} catch (e) {
						console.log(e)

					}
				}
			},
			add(a, b) { //经纬度的 加减乘除
				var c, d, e;
				try {
					c = a.toString().split(".")[1].length;
				} catch (f) {
					c = 0;
				}
				try {
					d = b.toString().split(".")[1].length;
				} catch (f) {
					d = 0;
				}
				return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) + this.mul(b, e)) / e;
			},
			mul(a, b) { //乘法
				var c = 0,
					d = a.toString(),
					e = b.toString();
				try {
					c += d.split(".")[1].length;
				} catch (f) {}
				try {
					c += e.split(".")[1].length;
				} catch (f) {}
				return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
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
						that.TravelCostCenlist = sus;
					} else { //部门
						for (let i = 0; i < uls.length; i++) {
							for (var k = 0; k < uls[i].apprvDeptFlowNodePersons.length; k++) {
								if (k == that.Deparapp[i].index) {
									sus.push({
										deptCost: 2,
										nodeId: uls[i].apprvDeptFlowNodePersons[k].nodeId,
										personId: uls[i].apprvDeptFlowNodePersons[k].id,
										staffId: uls[i].apprvDeptFlowNodePersons[k].staffId,
										staffName: uls[i].apprvDeptFlowNodePersons[k].staffName
									})
								}
							}
						}
						that.TravelDepartlist = sus;
					}
					that.shos = false;
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
			clslitk(item) { //点击成本中心部门
				if (item.id == this.slit_id_checd) {
					return
				}
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
			slcikd(d) {
				this.slid = d
			},
			async appswlist() { //选择成本中心
				let that = this;
				let nuarry = [];
				let nus = that.Butraveler; //出差人的集合
				for (var i = 0; i < nus.length; i++) {
					nuarry.push(nus[i].passengerNo) //获取出行人员id
				}

				try {
					const res = await tork.getStaffList({
						costId: that.NameCenter.id,
						passengerNos: nuarry,
						applyType: 1
					});

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
						// that.CostCenterlist = res.data.costStaffs;//成本中心审批人
						// for (let i = 0; i < that.CostCenterlist.length; i++) {
						// 	that.CostCenter.push({
						// 		index:0
						// 	})
						// }
					} else {

						that.showToasts(res.message)
					}
				} catch (e) {
					console.log(e)

				}
			},
			appswlists(itname) { //点击审批人
				if (itname == 'CostCenterlist') {
					this.isswf = true
				} else {
					this.isswf = false
				}
				this.showtype = 'flists';
				this.shos = true;
			},
			okisd() { //选择当前成本中心
				/*	for (let k in this.costlist) {
					  console.log(JSON.stringify(this.slit_id_checd))
						if(this.costlist[k].costcenterId == this.slit_id_checd){
							uni.showToast({
								title:'当前成本中心已存在！',
								icon:'none',
								duration:1000
							})
							return
						}
					}*/
				this.ops_list = false
				this.shos = false;
				this.costlist[this.cosindex].costcenterId = this.slit_id_checd;
				this.costlist[this.cosindex].costcenterName = this.botname;
			},
			reblock() {
				this.ops_list = false
				this.shos = false;
			},
			reblockop() {
				this.shos = false;
			},
			approval(indexs) {
				let nus = this.Butraveler; //出差人的集合
				if (nus.length == 0) {
					this.showToasts("请选择出差人员!")
					return
				}
				this.cosindex = indexs;
				this.selts();
			},
			de_bus(index) { //删除当前行程
				let su = this.Businlist
				su.splice(index, 1);
				this.Businlist = su;
			},
			newdata(tm) { //回显时间
				if (tm.end == "" && tm.sta != '') {
					return tm.sta.date.month + '月' + tm.sta.date.day + '日' + '　出发'
				} else if (tm.end != "" && tm.sta == '') {
					return tm.end.date.month + '月' + tm.end.date.day + '日' + '　返回'
				} else if (tm.end != "" && tm.sta != '' && tm.icname == 'Hotel') {
					return tm.sta.date.month + '月' + tm.sta.date.day + '日' + '　入住　' + tm.end.date.month + '月' + tm.end.date.day + '日' +
						' 离店'
				} else if (tm.end != "" && tm.sta != "" && tm.icname == 'Planeticket') {
					return tm.sta.date.month + '月' + tm.sta.date.day + '日' + '　往返'
				}
			},
			newstaname(tm) { //回显城市名称
				if (tm.icname == 'Hotel') {
					return tm.staname.name + "　" + tm.endname
				} else {
					return tm.staname.name + '　-' + tm.endname.name
				}
			},
			newicname(tm) { //回显类型
				if (tm == 'Planeticket') {
					return '[机票]'
				} else if (tm == 'Hotel') {
					return '[酒店]'
				} else if (tm == 'Train') {
					return '[火车]'
				}
			},
			addlist() { //保存出差行程
				let that = this;
				let curr = that.currentPage; //类型
				let lis = that.Businlist;
				if (curr == 'Planeticket') {
					let bust = that.Busirticket; //城市
					let stafil = that.sta_Flightbus; //出发时间
					let endfil = that.end_Flightbus; //返回时间
					console.log(stafil, endfil)
					if (bust[0].name == "") {
						that.showToasts('请选择出发城市');
						return
					} else if (!stafil.date) {
						that.showToasts('请选择出发时间');
						return
					} else {
						let ad = {
							icname: 'Planeticket', //类型
							staname: bust[0], //出发城市
							endname: bust[1], //到达城市
							sta: stafil, //出发时间
							end: '' //返回时间
						};
						if (endfil.date) {
							if (stafil.date.dateTime > endfil.date.dateTime) {
								uni.showToast({
									title: '去程不能大于返程的时间',
									icon: 'none',
									duration: 1000
								})
								return
							}
							ad.end = endfil; //返回时间
						}
						lis.push(ad);
						this.isko = true
					}
				} else if (curr == 'Train') {
					let bust = that.Busitraiket; //城市
					let stafil = that.sta_Traveltrain; //出发时间
					let endfil = that.end_Traveltrain; //返回时间
					if (bust[0].name == '') {
						that.showToasts('请选择出发城市');
						return
					} else if (!stafil.date) {
						that.showToasts('请选择出发时间');
						return
					} else {
						lis.push({
							icname: 'Train', //类型
							staname: bust[0], //出发城市
							endname: bust[1], //到达城市
							sta: stafil, //出发时间
							end: '' //返回时间
						});
						if (endfil.date) {
							lis.push({
								icname: 'Train', //类型
								staname: bust[1], //出发城市
								endname: bust[0], //到达城市
								sta: '', //出发时间
								end: endfil //返回时间
							});
						}
						this.isko = true
					}
				} else if (curr == 'Hotel') {
					let bust = that.sta_Hotelket; //城市
					let busts = that.end_Hotelket; //地址
					let stafil = that.sta_Hotelkettime; //出发时间
					let endfil = that.end_Hotelkettime; //返回时间
					if (Object.keys(bust).length == 0) {
						that.showToasts("请选择城市");
						return
					} else if (!stafil.date) {
						that.showToasts('请选择出发时间');
						return
					} else {
						lis.push({
							icname: 'Hotel', //类型
							staname: bust, //出发城市
							endname: busts, //到达地址
							sta: stafil, //出发时间
							end: endfil //返回时间
						});
						this.isko = true
					}
				}
				that.Businlist = lis;
			},
			addold() { //保存当前继续添加
				let that = this;
				let curr = that.currentPage; //类型
				that.addlist()
			},
			addtravl() { //保存当前清空其他
				let that = this;
				that.addlist();
				if (this.isko == true) {
					that.shos = false;
				}
			},
			roblak() {
				//取消
				uni.navigateBack({})
			},
			isck(item) {
				if (item.ul == 'Hotel') {
					this.endtiem = this.endtiems;
				} else {
					this.endtiem = this.endtiemy;
				}
				this.currentPage = item.ul;
				this.nos = item.id;
			},
			lc_op() {
				this.shos = true;
				this.showtype = 'triplist';
			},
			lischang(time) {
				let tim = time.choiceDate;

				this.sta_Flightbus = {}; //出差飞机出发时间
				this.end_Flightbus = {}; //出差飞机返回时间
				this.sta_Traveltrain = {}; //出差火车出发时间
				this.end_Traveltrain = {}; //出差火车返回时间
				this.sta_Hotelkettime = {}; //出差酒店出发时间
				this.end_Hotelkettime = {}; //出差酒店返回时间
				this.hotellmes = [];
				this.Busirticket = [{
					name: '',
					id: ''
				}, {
					name: '',
					id: ''
				}]; //出差飞机城市
				this.Busitraiket = [{
					name: '',
					id: ''
				}, {
					name: '',
					id: ''
				}]; //火车出差城市
				this.sta_Hotelket = {}, //出差酒店城市
					this.end_Hotelket = '', //出差酒店地址

					this.statime = tim[0].re;
				this.endtiem = tim[1].re;
				this.Traveltime = [tim[0], tim[1]];
				this.endtiemy = tim[1].re;
				let stime = new Date(tim[1].dateTime + (24 * 60 * 60 * 1000));
				let mons = (stime.getMonth() + 1 < 10 ? '0' + (stime.getMonth() + 1) : stime.getMonth() + 1);
				let dons = stime.getDate() < 10 ? '0' + stime.getDate() : stime.getDate();
				this.endtiems = stime.getFullYear() + '-' + mons + '-' + dons;
				this.Businlist = [];
			},
			isshow() {
				this.shos = false;
			},
			mulist() {
				uni.navigateTo({
					url:'/components/view/personnel'
				})
			},
			findElem(arrayToSearch, attr, val) {
				//debugger
				for (var i = 0; i < arrayToSearch.length; i++) {
					if (arrayToSearch[i][attr] == val) {
						return i; //返回当前索引值
					}
				}
				return -1;
			},
			async selts() { //查询成本中心
				let _this = this;

				try {
					let res = await tork.getCostCenterList();

					if (res.code == 200) {

						_this.treeLists = [];
						_this.renderTreeLists(res.data[0].children);
						this.showtype = 'coseidlist';
						this.shos = true;
						this.sli_old(); //点击成本中心
					} else {
						_this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e)

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
			}
		},
		onLoad() {
		}
	};
</script>

<style lang="scss" scoped>
	.Initiatetravelapplications {
		padding-bottom: 20upx;
		font-size: 35upx;
		.share-box {
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0upx;
			left: 0upx;
			bottom: 0upx;
			right: 0upx;
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

			.ctis {
				width: 100%;
				background: #ffffff;

				.cstop {
					width: 100%;
					height: 90upx;
					display: flex;

					.cits {
						flex: 1;
						height: 88upx;
						text-align: center;
						line-height: 90upx;
						color: #c0c0c0;
						border-bottom: 2upx solid #ffffff;
					}

					.no {
						color: $uni-color-primary;
						border-bottom: 2upx solid $uni-color-primary;
					}
				}

				.div_li {
					width: calc(100% - 40upx);
					height: 210upx;
					background: #f1f1f1;
					padding: 20upx;

					.sist {
						width: 100%;
						height: 210upx;
						background: #ffffff;
					}
				}

				.check_btns {
					width: 100%;
					height: 110upx;
					display: flex;
					text-align: center;
					line-height: 110upx;
					font-size: 30upx;
					z-index: 800;

					.chck_left {
						flex: 1;
						height: 110upx;
						background: #ffffff;
						color: $uni-color-primary;
					}

					.chck_right {
						flex: 1;
						color: #ffffff;
						height: 110upx;
						background: $uni-color-primary;
					}
				}
			}
			.passnalist{
				.userlist_top {
					display: flex;
					align-items: center;
					justify-content: space-between;
					font-size: 30upx;
					height: 90upx;
					width: 100%;
					background: #f1f1f1;
					color: $uni-color-primary;
				
					.userantb {
						font-size: 35upx;
						padding: 0 30upx;
					}
				}
				
				.ci_list {
					max-height: 450upx;
					overflow: scroll;
					font-size: 35upx;
				
					.cl_val {
						position: relative;
						width: 100%;
						text-align: center;
						line-height: 90upx;
						height: 90upx;
						border-bottom: 2upx solid #f1f1f1;
				
						.ok_ioc {
							position: absolute;
							top: 5upx;
							right: 50upx;
						}
					}
				
					.clbox {
						width: 100%;
						display: flex;
						flex-wrap: wrap;
				
						.cl_valst {
							font-size: 30upx;
				
							.cl_vals {
								text-align: center;
								padding: 5upx 20upx;
								line-height: 40upx;
								margin: 20upx 20upx;
								height: 40upx;
								color: #C0C0C0;
								border: 1upx solid #C0C0C0;
								border-radius: 5upx;
							}
				
							.ad_vals {
								text-align: center;
								padding: 5upx 20upx;
								line-height: 40upx;
								margin: 20upx 20upx;
								height: 40upx;
								color: #FFFFFF;
								background-color: $uni-color-primary;
								border: 2upx solid $uni-color-primary;
								border-radius: 5upx;
							}
				
							.ck_vals {
								text-align: center;
								padding: 5upx 20upx;
								line-height: 40upx;
								margin: 20upx 20upx;
								height: 40upx;
								color: #FFFFFF;
								background: #C0C0C0;
								border: 2upx solid #C0C0C0;
								border-radius: 5upx;
							}
						}
					}
				
					.addstyle {
						text-align: right;
						font-size: 30upx;
						color: $uni-color-primary;
					}
				}
			}
			.coseidlist{
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
			.flists{
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
		}

		.ravelv {
			width: calc(100% - 40upx);
			padding: 0 20upx;
			min-height: 90upx;
			background: #FFFFFF;
			margin-bottom: 20upx;

			.ts {
				line-height: 90upx;
				display: flex;

				.rav_left {
					width: 27%;
					text-align: center;
					color: #c0c0c0;
				}

				.rav_left_wbs {
					width: 60%;
					text-align: center;
					color: #c0c0c0;
				}

				.ravright {
					width: 75%;
					display: flex;

					.bos {
						width: 93%;
						height: 90upx;
						display: flex;
						align-items: center;
						flex-wrap: nowrap;
						overflow-x: auto;
						white-space: nowrap;

						.redlogs {
							font-size: 20upx;
							color: red;
						}

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

		.costslist {
			width: calc(100% - 20upx);
			background-color: #FFFFFF;
			margin: 20upx 10upx 20upx 10upx;
			border-radius: 10upx;

			.costsli {
				display: flex;
				line-height: 90upx;
				width: calc(100% - 80upx);
				margin: 0 40upx;
				border-bottom: 1upx solid #F1F1F1;

				.coslipc {
					display: flex;
					width: 50%;

					.costleft {
						width: 50%;
						font-size: 35upx;
						color: #c0c0c0;
					}

					.costrightpl {
						width: 50%;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						font-size: 32upx;
						color: #C8C7CC;
					}

					.costright {
						width: 45%;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						font-size: 32upx;

						input {
							width: 130upx;
							height: 60upx;
							text-align: center;
							margin-right: 10upx;
							background-color: #F1F1F1;
						}
					}
				}
			}

			.costslis {
				display: flex;
				line-height: 90upx;
				width: calc(100% - 80upx);
				margin: 0 40upx;
				border-bottom: 1upx solid #F1F1F1;

				.costleft {
					width: 40%;
					font-size: 35upx;
					display: flex;
					align-items: center;
					color: #c0c0c0;

					span {
						color: red;
						font-size: 45upx;
						margin-right: 10upx;
					}
				}

				.costrightpl {
					width: 60%;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					font-size: 32upx;
					color: #C8C7CC;
				}

				.costright {
					width: 60%;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					font-size: 32upx;

					input {
						width: 150upx;
						height: 60upx;
						text-align: center;
						margin-right: 10upx;
						background-color: #F1F1F1;
					}
				}
			}
		}

		.costadd {
			width: calc(100% - 40upx);
			height: 80upx;
			margin: 20upx 20upx 20upx 20upx;
			background: #FFFFFF;
			border-radius: 10upx;
			display: flex;
			align-items: center;
			justify-content: center;

			span {
				color: #52C41A;
				font-size: 45upx;
			}
		}

		.ravelvs {
			width: calc(100% - 40upx);
			padding: 0 20upx;
			min-height: 90upx;
			background: #ffffff;
			margin-bottom: 20upx;

			.tks {
				width: 100%;
				display: flex;
				height: 90upx;
				line-height: 90upx;

				.rav_left {
					width: 25%;
					text-align: center;
					color: #c0c0c0;
				}

				.ravright {
					width: 75%;
					display: flex;

					.bost {
						width: 93%;

						.userlists {
							font-size: 30upx;
							margin: 0 10upx;
						}
					}
				}
			}

			.tlists {
				width: 100%;
				padding: 15upx 0;
				height: 90upx;
				border-top: 2upx solid #E5E5E5;
				display: flex;

				.tl_left {
					width: 10%;
					height: 90upx;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.tl_right {
					margin-left: 3%;
					height: 90upx;
					width: 87%;

					.tl_tops {
						display: flex;
						width: 100%;
						height: 50upx;
						font-size: 35upx;
						line-height: 40upx;
						color: #333333;
					}

					.tl_bots {
						width: 100%;
						height: 40upx;
						font-size: 30upx;
						line-height: 30upx;
						color: #E5E5E5;
					}
				}
			}
		}

		.check_btn {
			width: 100%;
			height: 110upx;
			display: flex;
			text-align: center;
			line-height: 110upx;
			font-size: 30upx;
			z-index: 800;

			.chck_left {
				flex: 1;
				height: 110upx;
				background: #ffffff;
				color: $uni-color-primary;
			}

			.chck_right {
				flex: 1;
				color: #ffffff;
				height: 110upx;
				background: $uni-color-primary;
			}
		}
	}
</style>
