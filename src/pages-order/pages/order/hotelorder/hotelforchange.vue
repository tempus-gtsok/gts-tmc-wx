<template>
	<view class="applyforchange">
		<view class="black_mu" @click="isshow" v-if="blac_show"></view>
		<loading></loading>
		
		<headnavigation titles="取消酒店订单"></headnavigation>
		<view class="optslist" :class="ops_list ? 'show' : ''" >
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
					<view class="ulsk_list" :class="slid == item.id? 'cked':''" v-for="(item,index) in ullist" :key="index">
						{{item.name}}
					</view>
				</view>
				<view class="sltright">
					<view class="sltrig_top">
						<view class="sltiig_top_left">当前选择:</view>
						<view class="sltiig_top_right" @click="reblocks(item)" :class="slit_id_checd == item.id ? 'stis':''"  v-for="(item,index) in slitlist" :key="index">
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
		<view class="istaf">
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">归属部门:</view>
					<view class="ravright">
						<view class="bos">
							{{attdepartment}}
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
		<view class="check_btn">
			<view class="chck_left" @click="rblcok">返回</view>
			<view class="chck_right" @click="updapp">申请取消</view>
		</view>
	</view>
</template>

<script>
	import order from '@/api/order.js'
	import tork from '@/api/torowk.js'
	export default{
		data(){
			return{
				CostCenter: [],
				Deparapp: [],
				blac_show: false,
				
				
				CostCi: false,
				CostCis: false,//是否有部门审批人
				TravelDepartlist: [],//部门审批人
				TravelCostCenlist: [],//成本中心
				ullist:[{
					name:'成本中心',
					id: 1
				}],
				switfal:false,
				slitlist:[],
				sli_namelist: [],
				cbname:'',//成本中心名称
				cbid: '',//成本中心id
				botname: '',//当前选择的成本中心名称
				slit_id_checd:0, //当前点击成本中心的id
				slid: 1,
				datalist: {},
				NameCenter:{name: '',id: ''},
				treeLists: [],//归属部门列表
				ops_list:false,//归属部门
				CostCenterlist: [],//成本中心审批人
				costlist: [],//当前选择的成本中心审批人集合
				isswf: true,//true为成本中心 false为部门   审批人
				Deparapprover: [],//部门审批人
				deparlist: [],//前选择的部门审批人集合
				oprefs:[{'oprefs_1': ''},{'oprefs_2':''},{'oprefs_3': ''},{'oprefs_4': ''},{'oprefs_5': ''}],
				attdepartment:'',//归属部门
			}
		},
		onLoad(item) {
			this.datalist = JSON.parse(item.data)
		},
		mounted() {
			const data = uni.getStorageSync('user_list'+ uni.getStorageSync('appWxId'));//获取归属部门
			if (data.deptName) {
				this.attdepartment = data.deptName; 
			}
			this.selts();
		},
		methods:{
			CostCenterChange(e,index){ //选择当前成本中心审批人
				this.CostCenter[index].index = e.detail.value;
			},
			DeparappChange(e,index){//选择当前部门审批人
				this.Deparapp[index].index = e.detail.value;
			},
			async updapp(){ //确定
				let that = this;
				let TravelCostCenlist = that.TravelCostCenlist;//成本审批人
				let TravelDepartlist = that.TravelDepartlist;//部门审批人
				let NameCenter = that.NameCenter;//成本中心
				if(NameCenter.id == ''){
					that.showToasts("请选择成本中心！")
					return
				} else if(TravelCostCenlist.length == 0 && this.CostCi == true){
					that.showToasts("请选择成本审批人！")
					return
				} else if(TravelDepartlist.length == 0 && this.CostCis == true){
					that.showToasts("请选择部门审批人！")
					return
				}
				let apprvTaskStaffts = [];//审核人员
				for (var i = 0; i < TravelCostCenlist.length; i++) { //成本中心审批人
					apprvTaskStaffts.push({
						deptCost: 2,
						nodeId: TravelCostCenlist[i].nodeId,
						personId: TravelCostCenlist[i].personId,
						staffId: TravelCostCenlist[i].staffId,
						staffName: TravelCostCenlist[i].staffName
					})
				
				}
				for (var i = 0; i < TravelDepartlist.length; i++) {//部门审批人
					apprvTaskStaffts.push({
						deptCost: 1,
						nodeId: TravelDepartlist[i].nodeId,
						personId: TravelDepartlist[i].personId,
						staffId: TravelDepartlist[i].staffId,
						staffName: TravelDepartlist[i].staffName
					})
				}
				let dat = {
					saleOrderNo:this.datalist.saleOrderNo,
					apprvTask:{
						apprvTaskStaffs:apprvTaskStaffts,
						taskType: 5,//1为事前2为事中，4为改签 5为退票
						beforeMiddle: 5,//1为事前2为事中 4为改签 5为退票
						costId:NameCenter.id, //成本中心id
						costName: NameCenter.name ,//成本中心名称
					}
				}
				
				try{
					let res = await order.cancelHolOrder(dat);
					if(res.code == 200){
						this.showToasts("提交申请退房成功！")
						setTimeout(()=>{
							that.rblcok();
						},1000)
					} else {
						this.showToasts(res.message);
					}
				}catch(e){
					console.log(e);
					
				}
			},
			rblcok(){//返回
				// #ifdef H5
				history.back();
				// #endif
				// #ifdef MP-WEIXIN
				uni.navigateBack()
				// #endif
			},
			isshow(){//黑色弹出层
				this.ops_list = false
				this.blac_show = false;
				this.switfal = false;
				this.costs = false;
			},
			async selts() { //查询成本中心
				let _this = this;
				
				try{
					let res = await tork.getCostCenterList();
					
					if (res.code == 200) {
						_this.treeLists = [];
						_this.renderTreeLists(res.data[0].children);
					} else {
						_this.showToasts(res.message);
					}
				}catch(e){
					console.log(e);
					
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
					} else{
						this.treeLists[this.treeLists.length-1].lastRank = true;
					}
				});
			},
			approval(){
				this.ops_list = true
				this.blac_show = true;
				this.sli_old();//点击成本中心
			},
			clslitk(item){//点击成本中心部门
				// if(item.id == this.slit_id_checd){
				// 	return
				// }
				this.botname = item.name;
				let id = item.id
				let ls = this.treeLists;
				let ik = 0;
				for (var i = 0; i < ls.length; i++) {//判断是否有子集
					if(ls[i].parentId.length > 0 && ls[i].parentId.includes(id)){
						ik++;
					}
				}
				if(ik > 0){ //有子集
					this.sli_namelist = []
					for (var i = 0; i < ls.length; i++) {//取出当前子集
						if(id == ls[i].id){
							this.slit_id_checd = ls[i].id
							if(ls[i].parentId.length ==0){
								this.slitlist = [];
							}
							if(this.slitlist.length > 0){
								let ids = this.slitlist.length-1;
								if(JSON.stringify(this.slitlist[ids].parentId) == JSON.stringify(ls[i].parentId)){
									this.slitlist.splice(ids,1);
								}
							}
							this.slitlist.push(ls[i])
						}
						if(ls[i].parentId.length > 0 && ls[i].parentId.includes(id)){ //判断当前点击的是否有子集
							if(ls[i].parentId.indexOf(id) == ls[i].parentId.length -1){
								this.sli_namelist.push(ls[i])
							}
						} 
					}
				} else {
					for (var i = 0; i < ls.length; i++) {//没有子集
						if(ls[i].id == id ){
							this.slit_id_checd = ls[i].id
							if(ls[i].parentId.length == 0){
								this.slitlist= [{
									name: ls[i].name,
									id: ls[i].id,
									parentId:[]
								}]
							} else {
								let ids = this.slitlist.length-1;
								if(JSON.stringify(this.slitlist[ids].parentId) == JSON.stringify(ls[i].parentId)){
									this.slitlist.splice(ids,1);
								}
								this.slitlist.push(ls[i])
							}
						}
					}
				}
			},
			async appswlist(itname){//选择审批人
				let that = this;
				
				try{
					const res = await tork.getStaffList({costId: this.NameCenter.id,applyType:5});
					
					if(res.code == 200){
						if(res.data.deptStaffs.length ==0){
							that.CostCis = false;
						} else {
							that.CostCis = true;
							that.Deparapprover = res.data.deptStaffs;//部门审批人
							for (let i = 0; i < that.Deparapprover.length; i++) {
								that.Deparapp.push({
									index:0
								})
							}
						}
						if(res.data.costStaffs.length ==0){
							that.CostCi = false;
						} else {
							that.CostCi = true;
							that.CostCenterlist = res.data.costStaffs;//成本审批人
							for (let i = 0; i < that.CostCenterlist.length; i++) {
								that.CostCenter.push({
									index:0
								})
							}
						}
					} else {
						this.showToasts(res.message)
					}
				}catch(e){
					console.log(e);
					
				}
			},
			reblocks(item){//返回上级
				let ls = this.treeLists; //部门列表
				let id = item.id;
				this.slit_id_checd = id; //当前点击的部门id
				this.sli_namelist = []; //重新渲染部门信息
				let ins = this.slitlist.indexOf(item);//获取当前级别的下标
				for (var i = 0; i < this.slitlist.length; i++) { //删除右边级别
					if(i > ins){
						this.slitlist.splice(i,1);
					}
				}
				for (var i = 0; i < ls.length; i++) {//判断是否有子集
					if(JSON.stringify(item.parentId) == JSON.stringify(ls[i].parentId)){
						this.sli_namelist.push(ls[i])
					}
				}
				this.botname = item.name;
			},
			okisd(){//选择当前成本中心
				this.ops_list = false
				this.blac_show = false;
				if(this.cbid == this.slit_id_checd){
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
			appswlists(itname){ //点击审批人
				if(this.NameCenter.id == '' ){
					this.showToasts("请先选择成本中心")
					return
				}
				if(itname == 'CostCenterlist'){
					this.isswf = true
				} else {
					this.isswf = false
				}
				this.switfal = true;
				this.blac_show = true;
			},
			sli_old(){//点击成本中心默认值
				let ls = this.treeLists;
				this.sli_namelist = [];
				for (let i = 0; i < ls.length; i++) {
					if(ls[i].parentId.length == 0){
						this.sli_namelist.push(ls[i])
					}
				}
				// this.slit_id_checd = 0;
				this.slitlist= [];
			},
			oksoption(){ //部门和成本中心审批人确定
				let that = this;
				let st = that.isswf;//是成本中心还是部门 true为成本中心
				let itn = true;
				let uls = [];
				if(st){
					uls = that.CostCenterlist;//成本中心
				} else {
					uls = that.Deparapprover;//成本中心
				}
				if(itn){
					let sus = [];
					let suname = [];
					if(st){ //成本中心
						for (let i = 0; i < uls.length; i++) {
							for (var k = 0; k < uls[i].apprvCostFlowNodePersons.length; k++) {
								if(k == that.CostCenter[i].index){
									sus.push({
										deptCost: 2,
										nodeId:uls[i].apprvCostFlowNodePersons[k].nodeId,
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
								if(k == that.Deparapp[i].index){
									sus.push({
										deptCost: 2,
										nodeId:uls[i].apprvDeptFlowNodePersons[k].nodeId,
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
			}
		}
	}
</script>

<style scoped lang="scss">
	.applyforchange{
		width: 100%;
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
		.optslist{
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
			.btns{
				width: 100%;
				height: 90upx;
				display: flex;
				text-align: center;
				line-height: 90upx;
				font-size: 35upx;
				background: #E5E5E5;
				.btns_z{
					flex: 1;
					height: 90upx;
					color: $uni-color-primary;
				}
			}
			.stlist{
				width: 100%;
				height: 400upx;
				background: #E5E5E5;
				display: flex;
				.sltleft{
					height: 400upx;
					width: 30%;
					.ulsk_list{
						width: 100%;
						height: 90upx;
						text-align: center;
						font-size: 35upx;
						line-height: 90upx;
					}
					.cked{
						background: #FFFFFF;
					}
				}
				.sltright{
					width: 70%;
					height: 400upx;
					background: #FFFFFF;
					.sltrig_top{
						width: 100%;
						height: 90upx;
						overflow: scroll;
						line-height: 90upx;
						font-size: 25upx;
						display: flex;
						border-bottom: 2upx solid #F1F1F1;
						.sltiig_top_left{
							width: 140upx;
							text-indent: 20upx;
							color: #F1F1F1;
						}
						.sltiig_top_right{
							padding: 0 5px;
							min-width: 100upx;
							text-indent: 10upx;
							color: #333333;
						}
						.stis{
							color: $uni-color-primary !important;
						}
					}
					.sltrig_bot{
						width: calc(100% -20upx);
						height: 310upx;
						padding-left: 20upx;
						overflow: scroll;
						.striglist{
							width: 100%;
							height: 90upx;
							border-bottom: 2upx solid #F1F1F1;
							line-height: 90upx;
							display: flex;
							.stlis_left{
								width: 90%;
							}
							.stlis_right{
								width: 10%;
								text-align: center;
							}
						}
					}
				}
			}
			.botmis{
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
		.istaf{
			width: 100%;
			margin-top: 20upx;
			font-size: 30upx;
			.ravelv {
				width: calc(100% - 40upx);
				padding: 0 20upx;
				height: 90upx;
				background: #FFFFFF;
				margin-bottom: 20upx;
				.ts{
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
							.swname{
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
		.isswflist{
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
			.btns{
				width: 100%;
				height: 90upx;
				display: flex;
				text-align: center;
				line-height: 90upx;
				font-size: 35upx;
				background: #E5E5E5;
				.btns_z{
					flex: 1;
					height: 90upx;
					color: $uni-color-primary;
				}
			}
			.isstops{
				padding: 40upx 10%;
				width: calc(100% - 20%);
				.isstop{
					height: 90upx;
					line-height: 90upx;
					width: 100%;
					display: flex;
					align-items: center;
					.wors{
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
		.show {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
		.check_btn {
			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;
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
