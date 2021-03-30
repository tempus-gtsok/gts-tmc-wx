<template>
	<view class="applyforchange">
		<view class="black_mu" @click="isshow" v-if="blac_show"></view>
		<loading></loading>
		
		<headnavigation titles="申请退票"></headnavigation>
		<view class="waste_segment">
			<view class="waste_segments">
				选择废退航段
			</view>
			<view class="waste_bottom" v-if="datalist.tuipiao == 1 || datalist.tuipiao == 3"> <!-- v-if="datalist.none == 'single'" -->
				<view class="outward_voyage">
					<!-- <checkbox @click="waste(qu)"></checkbox> -->
					去程
				</view>
				<view class="region">
					<view class="regions">
						<view>{{citys(datalist.userslist.tr.orderDetailList[0].voyages[0].depart)}}</view><view class="iconfont">&#xe639;</view>
						<view class="">{{citys(datalist.userslist.tr.orderDetailList[0].voyages[0].arrive)}}</view>
					</view>
				</view>
				<view class="time_frame">
					<view class="time_rise">
						<view class="rise">起</view><view class="">{{datalist.userslist.tr.orderDetailList[0].voyages[0].departTime}}</view>
					</view>
					<view class="time_drop">
						<view class="drop">降</view><view class="">{{datalist.userslist.tr.orderDetailList[0].voyages[0].arriveTime}}</view>
					</view>
				</view>
			</view>
			<view class="waste_bottom" style="margin-top: 20upx;" v-if="datalist.userslist.tr.orderDetailList.length == 1 && datalist.tuipiao == 2 || datalist.userslist.tr.orderDetailList.length == 2 && datalist.tuipiao == 2">   <!-- 返回  datalist.userslist.tr.orderDetailList.length == 2 && datalist.none != 'single'-->
				<view class="outward_voyage">
					<!-- <checkbox @click="wastes(hui)"></checkbox> -->
					返程
				</view>
				<view class="region">
					<view class="regions">
						<view>{{citys(datalist.userslist.tr.orderDetailList[0].voyages[0].depart)}}</view><view class="iconfont">&#xe639;</view>
						<view class="">{{citys(datalist.userslist.tr.orderDetailList[0].voyages[0].arrive)}}</view>
					</view>
				</view>
				<view class="time_frame">
					<view class="time_rise">
						<view class="rise">起</view><view class="">{{datalist.userslist.tr.orderDetailList[0].voyages[0].departTime}}</view>
					</view>
					<view class="time_drop">
						<view class="drop">降</view><view class="">{{datalist.userslist.tr.orderDetailList[0].voyages[0].arriveTime}}</view>
					</view>
				</view>
			</view>
			<view class="waste_bottom" style="margin-top: 20upx;" v-if="datalist.userslist.tr.orderDetailList.length == 1 && datalist.userslist.tr.orderDetailList[0].voyages.length == 2 && datalist.tuipiao == 3">   <!-- 返回 && datalist.none != 'single'-->
				<view class="outward_voyage">
					<!-- <checkbox @click="wastes(hui)"></checkbox> -->
					返程
				</view>
				<view class="region">
					<view class="regions">
						<view>{{citys(datalist.userslist.tr.orderDetailList[0].voyages[1].depart)}}</view><view class="iconfont">&#xe639;</view>
						<view class="">{{citys(datalist.userslist.tr.orderDetailList[0].voyages[1].arrive)}}</view>
					</view>
				</view>
				<view class="time_frame">
					<view class="time_rise">
						<view class="rise">起</view><view class="">{{datalist.userslist.tr.orderDetailList[0].voyages[1].departTime}}</view>
					</view>
					<view class="time_drop">
						<view class="drop">降</view><view class="">{{datalist.userslist.tr.orderDetailList[0].voyages[1].arriveTime}}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="linkman_contacts">
			<view class="linkman_message">
				联系人信息
			</view>
			<view class="sname" style="align-items: center;margin-left: 20upx;">
				<view style="width: 150upx;">姓名：</view>
				<input type="text"  v-model="names" />
			</view>
			<view class="sname" style="align-items: center;margin-left: 20upx;">
				<view style="width: 150upx;">手机号：</view>
				<input type="text"  v-model="phone" />
			</view>
		</view>
		
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
					<view class="rav_left">是否自愿:</view>
					<view class="ravright">
						<view class="bos" style="color:#c0c0c0;">
							<view class="pons" v-for="(item,index) in ziyuanlsit" :key="index" @click="willing(item.id)">
								<view class="iconfont" v-if="item.id !=maoyid" style="">&#xe7bf;</view>
								<view class="iconfont" v-if="item.id ==maoyid" style="color: #1296db;">&#xe60a;</view>
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="ravelvs">
				<view class="ts">
					<view class="rav_left">上传附件:</view>
					<view class="ravright">
						<view class="olleft" @click="ft_click">
							<view v-if="users == ''">
								<span class="iconfont"  style="color: #007aff;font-size: 80upx;">&#xe632;</span>
							</view>
							<image v-else style="width: 100%;height: 100%;" :src="users" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">归属部门:</view>
					<view class="ravright">
						<view class="bos" style="color:#c0c0c0;">
							{{attdepartment}}
						</view>
					</view>
				</view>
			</view>
			<view class="ravelv" v-if="RuleMas == false">
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
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">退票原因:</view>
					<view class="ravright">
						<view class="bos">
							<input type="text" v-model="remarks" value="" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="check_btn">
			<view class="chck_left" @click="rblcok">返回</view>
			<view class="chck_right" @click="updapp">申请退票</view>
		</view>
	</view>
</template>

<script>
	import Mydi from '@/api/mydi.js'
	import order from '@/api/order.js'
	import tork from '@/api/torowk.js'
	import airports from '@/pages/book/sselect-city/airports.js'
	export default{
		data(){
			return{
				tesh:'1',		//备注
				names:'',
				nasme:"",
				nasmes:"",
				phone:'',
				maoid:2,
				zhi:"请选择",
				maoyid:1,
				yesid:0,
				qu:1,		//判断是否点击航班
				past:1,		//判断是否点击航班
				hui:1,		//判断是否点击航班
				mains:1,	//判断是否点击航班
				volunteer:true,
				Involuntary:false,
				mao:false,
				willings:true,
				checks:'',
				CostCenter: [],
				Deparapp: [],
				remarks: '',//退票原因
				blac_show: false,
				
				
				CostCi: false,
				CostCis: false,//是否有部门审批人
				TravelDepartlist: [],//部门审批人
				TravelCostCenlist: [],//成本中心
				chineas:{
					index:0
				},
				chines:{
					index:0
				},
				xianlsit: [{
					name:"退票",
					id: '2'
				}],
				ziyuanlsit: [{
					name:"自愿退票",
					id: '1'
				},{
					name:"非自愿退票",
					id: '2'
				}],
				yeslsit: [{
					name:"是",
					id: '0'
				},{
					name:"否",
					id: '1'
				}],
				ullist:[{
					name:'成本中心',
					id: 1
				}],
				kingList:[{
					name:"客人自愿按照客规",
					id: '1'
				},{
					name:"起飞前退20%",
					id: '2'
				},{
					name:"航班取消，办理全退",
					id: '3'
				},{
					name:"其他",
					id: '4'
				}],
				kingLists:[{
					name:"生病证明不扣",
					id: '1'
				},{
					name:"其他",
					id: '2'
				}],
				switfal:false,
				RuleMas:false,
				slitlist:[],
				sli_namelist: [],
				userslist:[],
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
				userinfo:{},
				users:'',//图片
			}
		},
		onLoad(item) {
			console.log(JSON.parse(uni.getStorageSync("predetermine_datas")))
			let st = JSON.parse(uni.getStorageSync("predetermine_datas"));
			// this.datalist = JSON.parse(item.data)
			this.datalist = JSON.parse(uni.getStorageSync("predetermine_datas"));
			// console.log(this.datalist)
			// this.RuleMas = this.datalist.RuleMas;
			this.RuleMas = JSON.parse((uni.getStorageSync("predetermine_datas"))).RuleMas;
			// console.log(this.RuleMas)
			// this.names = this.datalist.userslist.tr.accountInfo.contact;
			// this.phone = this.datalist.userslist.tr.accountInfo.phone;
			this.names = JSON.parse((uni.getStorageSync("predetermine_datas"))).userslist.tr.accountInfo.contact;
			this.phone = JSON.parse((uni.getStorageSync("predetermine_datas"))).userslist.tr.accountInfo.phone;
		},
		mounted() {
			const data = uni.getStorageSync('user_list'+ uni.getStorageSync('appWxId'));//获取归属部门
			if (data.deptName) {
				this.attdepartment = data.deptName; 
			}
			this.selts();
			const userinfo = uni.getStorageSync('userinfo'+ uni.getStorageSync('appWxId'));     //关于token的用法
			if (userinfo) {
				this.userinfo = userinfo; 
			}
		},
		methods:{
			//审核信息，机票信息，乘机人信息，联系人
			citys(its){//回显城市
			let address = airports.addressAirportAll; //航空名字
				for (let j = 0; j < address.length; j++) {  //循环城市
					if(address[j].airportCode == its){
						return address[j].cityCName
					}
				}
			},

			willing(ie){
				this.maoyid = ie;
				if(ie == 1){
					this.volunteer = true;
					this.Involuntary = false;
				} else {
					this.Involuntary = true;
					this.volunteer = false;
				}
			},
			ft_click(){
				let _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success:function(res){
						let Max_Size = res.tempFiles[0].size;
						if(Max_Size/1024 > 2048){
							_this.showToasts("照片大小不能高于2MB")
							return
						}
						_this.headImg = res.tempFilePaths;
						
						const data = uni.getStorageSync('user_list'+ uni.getStorageSync('appWxId'));     //关于token的用法
            let baseURL = uni.getStorageSync('baseURL');
						uni.uploadFile({
						   // #ifdef  APP-PLUS
						    url: "http://wx.molintmc.com/dpe/tms/api/user/uploadPassengerImage",//除了h5平台     // 后端api接口
						   // #endif
						   // #ifdef  H5 || MP-WEIXIN
						    url: baseURL+"/tms/api/user/uploadPassengerImage",     // 后端api接口//仅在h5平台
						   // #endif
							methods: "POST",
						    filePath: _this.headImg[0], // uni.chooseImage函数调用后获取的本地文件路劲
						    name:'file',     //后端通过'file'获取上传的文件对象
							header: {
								'AuthToken':  data.token
							},
							formData: {
								'file': 'test'
							},
						    success:(res) => {
								
								let data = JSON.parse(res.data)
								if(data.code == 200){
									_this.users = data.data;
								}
						    },
							error:(res)=>{
								
								this.showToasts("上传失败！",res)
							}
						});
					},
					error : function(e){
						this.showToasts(e)
					}
				})
			},
			// good() {		//点击下拉原因
			// 	console.log(this.nasme)
			// },
			// goods() {		//点击下拉原因
			// 	console.log(this.nasmes)
			// },
			waste(i){	//选择航班
				if(i == 1){
					this.qu = 2;
					this.past = 2;
				} else {
					this.qu = 1;
					this.past = 1;
				}
			},
			chineseChanges(e){	//废退原因
				this.chineas.index = e.detail.value;
			},
			chineseChangrs(e){
				this.chines.index = e.detail.value;
			},
			wastes(i){
				if(i == 1){
					this.hui = 2;
					this.mains = 2;
				} else {
					this.hui = 1;
					this.mains = 1;
				}
			},
			CostCenterChange(e,index){ //选择当前成本中心审批人
				this.CostCenter[index].index = e.detail.value;
			},
			DeparappChange(e,index){//选择当前部门审批人
				this.Deparapp[index].index = e.detail.value;
			},
			catype(it){//返回证件类型
				if(it == '身份证'){
					return 'NI'
				} else if(it == '护照'){
					return 'PP'
				} else if(it == '台胞证'){
					return 'TB'
				} else if(it == '港澳通行证'){
					return 'GA'
				} else if(it == '回乡证'){
					return 'HX'
				} else if(it == '其他证件'){
					return 'OS'
				}
			},
			async updapp(){ 		//确定
				let that = this;
				let past = this.past;		//点击去航班  1是没点击2是点击
				let mains = this.mains;		//点击返回航班  1是没点击2是点击
				
				let orderDetailList = that.datalist.userslist.tr.orderDetailList;  //所有信息
				// let isbtd = that.datalist.ranst.isbtd;//1因公2因私
				let TravelCostCenlist = that.TravelCostCenlist;//成本审批人
				let TravelDepartlist = that.TravelDepartlist;//部门审批人
				let NameCenter = that.NameCenter;//成本中心
				let remarks = that.remarks;//原因
				
				if(this.tesh == ''){
					that.showToasts("请填写备注！")
					return
				} else if(NameCenter.id == '' && this.RuleMas == false){
					that.showToasts("请选择成本中心！")
					return
				} else if(TravelCostCenlist.length == 0 && this.CostCi == true){
					that.showToasts("请选择成本审批人！")
					return
				}else if(TravelDepartlist.length == 0 && this.CostCis == true){
					that.showToasts("请选择部门审批人！")
					return
				} else if(remarks == ''){
					that.showToasts("请输入退票原因！")
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
				if(that.datalist.tuipiao == 1){		//选择了去的航班没选择回来的	1是去2是回			因私 免审没有审核信息
					// let orderDetailList = that.datalist.userslist.tr.orderDetailList;  //所有信息
					let userlist = that.datalist.userlist;
					let saleNo = orderDetailList[0].mainDetail.saleOrderNo;	//销售单号
					let tradeNo = that.datalist.userslist.tr.transationOrderNo;		//旧出差单号
					let voluntaryType = that.maoyid;		//是否自愿，1自愿，2不自愿
					let refundType = that.maoid;		//退废类型1废票，2退票
					let reason = that.nasme;		//退废原因
					let isXepnr = that.yesid;		//是否取消PNR，0是，1否
					let filePath = that.users;		//图片上传路径
					let refundRemark = that.tesh;		//说明解释
					let passengersList = [];
					for (let i = 0; i < userlist.length; i++) {
						passengersList.push({
							"name":userlist[i].name,
							"ageType":userlist[i].ageType,
							"cardType":this.catype(userlist[i].certType),
							"cardNo":userlist[i].certNo
						})
					}
					let dats = {
              fromSource:that.datalist.fromSource,
              // status:4,
							saleNo:saleNo,
							tradeNo:tradeNo,
							voluntaryType:voluntaryType,
							refundType:JSON.stringify(refundType),
							reason:JSON.stringify(refundType),
							isXepnr:JSON.stringify(isXepnr),
							filePath:filePath,
							refundRemark:refundRemark,
							apprvTask:{
						        agree:false,
						        apprvTaskStaffs:apprvTaskStaffts,
								beforeMiddle: 5,//1为事前2为事中 4为改签 5为退票
								costId:NameCenter.id, //成本中心id
								costName: NameCenter.name ,//成本中心名称
								reason: JSON.stringify(remarks),
								taskType: 5//1为事前2为事中，4为改签 5为退票
						    },
							flights:[{
								// "departDate":orderDetailList[0].passengers[0].voyages[0].factDepartTime,
								departDate:orderDetailList[0].voyages[0].factDepartTime,
								depart:orderDetailList[0].voyages[0].depart,
								arrive:orderDetailList[0].voyages[0].arrive,
								flightNo:orderDetailList[0].voyages[0].flightNo,
								cabin:orderDetailList[0].voyages[0].cabin,
								sequence:orderDetailList[0].voyages[0].sequence,
								// "arriveTime":orderDetailList[0].passengers[0].voyages[0].factArriveTime,
								arriveTime:orderDetailList[0].voyages[0].arriveTime,
								departTerminal:orderDetailList[0].voyages[0].departTerminal,
								arriveTerminal:orderDetailList[0].voyages[0].arriveTerminal,
								plane:orderDetailList[0].voyages[0].flightModel
							}],
							passengersList:passengersList,
							contacts:{
								name:that.names,
								phone:that.phone,
								email:""
							}
						}
						
						try{
							let res = await order.orderRefundApplyCommit(dats);
							
							if(res.code == 200){
								this.showToasts("提交申请退票成功！")
								setTimeout(()=>{
									uni.navigateTo({
										url:'./planeordersaircraft?code=' + this.datalist.transactionOrderNo  + '&isck=false' + '&tui=1'
									})
								},1000)
							} else {
								this.showToasts(res.message);
							}
						}catch(e){
							console.log(e);
							
						}
						
				} else if(that.datalist.tuipiao == 2 && orderDetailList.length == 1){		//选择了回来的航班没选择去的
					let userlist = that.datalist.userlist;
					let saleNo = orderDetailList[0].mainDetail.saleOrderNo;	//销售单号
					let tradeNo = that.datalist.userslist.tr.transationOrderNo;		//旧出差单号
					let voluntaryType = that.maoyid;		//是否自愿，1自愿，2不自愿
					let refundType = that.maoid;		//退废类型1废票，2退票
					let reason = that.nasme;		//退废原因
					let isXepnr = that.yesid;		//是否取消PNR，0是，1否
					let filePath = that.users;		//图片上传路径
					let refundRemark = that.tesh;		//说明解释
					let passengersList = [];
					for (let i = 0; i < userlist.length; i++) {
						passengersList.push({
							"name":userlist[i].name,
							"ageType":userlist[i].ageType,
							"cardType":this.catype(userlist[i].certType),
							"cardNo":userlist[i].certNo
						})
					}
					let dats = {
            fromSource:that.datalist.fromSource,
            // status:4,
						"saleNo":saleNo,
						"tradeNo":tradeNo,
						"voluntaryType":voluntaryType,
						"refundType":refundType,
						"reason":refundType,
						"isXepnr":isXepnr,
						"filePath":filePath,
						"refundRemark":refundRemark,
						"apprvTask":{
							"agree":false,
							"apprvTaskStaffs":apprvTaskStaffts,
							beforeMiddle: 5,//1为事前2为事中 4为改签 5为退票
							costId:NameCenter.id, //成本中心id
							costName: NameCenter.name ,//成本中心名称
							reason: remarks,
							taskType: 5//1为事前2为事中，4为改签 5为退票
						},
						"flights":[{
							"departDate":orderDetailList[0].voyages[1].factDepartTime,
							// "departDate":orderDetailList[0].passengers[0].voyages[1].factDepartTime,
							"depart":orderDetailList[0].voyages[1].depart,
							"arrive":orderDetailList[0].voyages[1].arrive,
							"flightNo":orderDetailList[0].voyages[1].flightNo,
							"cabin":orderDetailList[0].voyages[1].cabin,
							"sequence":orderDetailList[0].voyages[1].sequence,
							"arriveTime":orderDetailList[0].voyages[1].arriveTime,
							// "arriveTime":orderDetailList[0].passengers[0].voyages[1].factArriveTime,
							"departTerminal":orderDetailList[0].voyages[1].departTerminal,
							"arriveTerminal":orderDetailList[0].voyages[1].arriveTerminal,
							"plane":orderDetailList[0].voyages[1].flightModel
						}],
						"passengersList":passengersList,
						"contacts":{
							"name":that.names,
							"phone":that.phone,
							"email":""
						}
					}
					
					try{
						let res = await order.orderRefundApplyCommit(dats);
						
						if(res.code == 200){
							this.showToasts("提交申请退票成功！")
							setTimeout(()=>{
								// #ifdef H5
								history.back();
								// #endif
								// #ifdef MP-WEIXIN
								uni.navigateBack()
								// #endif
							},1000)
						} else {
							this.showToasts(res.data.message);
						}
					}catch(e){
						console.log(e);
						
					}
				}  else if(that.datalist.tuipiao == 2 && orderDetailList.length == 2){		//选择了回来的航班没选择去的
					let userlist = that.datalist.userlist;
					let saleNo = orderDetailList[1].mainDetail.saleOrderNo;	//销售单号
					let tradeNo = that.datalist.userslist.tr.transationOrderNo;		//旧出差单号
					let voluntaryType = that.maoyid;		//是否自愿，1自愿，2不自愿
					let refundType = that.maoid;		//退废类型1废票，2退票
					let reason = JSON.stringify(that.nasme);		//退废原因
					let isXepnr = that.yesid;		//是否取消PNR，0是，1否
					let filePath = that.users;		//图片上传路径
					let refundRemark = that.tesh;		//说明解释
					let passengersList = [];
					for (let i = 0; i < userlist.length; i++) {
						passengersList.push({
							"name":userlist[i].name,
							"ageType":userlist[i].ageType,
							"cardType":this.catype(userlist[i].certType),
							"cardNo":userlist[i].certNo
						})
					}
					let dats = {
            fromSource:that.datalist.fromSource,
            // status:4,
						"saleNo":saleNo,
						"tradeNo":tradeNo,
						"voluntaryType":voluntaryType,
						"refundType":refundType,
						"reason":JSON.stringify(refundType),
						"isXepnr":isXepnr,
						"filePath":filePath,
						"refundRemark":refundRemark,
						"apprvTask":{
							"agree":false,
							"apprvTaskStaffs":apprvTaskStaffts,
							beforeMiddle: 5,//1为事前2为事中 4为改签 5为退票
							costId:NameCenter.id, //成本中心id
							costName: NameCenter.name ,//成本中心名称
							reason: remarks,
							taskType: 5//1为事前2为事中，4为改签 5为退票
						},
						"flights":[{
							"departDate":orderDetailList[1].voyages[0].factDepartTime,
							// "departDate":orderDetailList[1].passengers[0].voyages[0].factDepartTime,
							"depart":orderDetailList[1].voyages[0].depart,
							"arrive":orderDetailList[1].voyages[0].arrive,
							"flightNo":orderDetailList[1].voyages[0].flightNo,
							"cabin":orderDetailList[1].voyages[0].cabin,
							"sequence":orderDetailList[1].voyages[0].sequence,
							// "arriveTime":orderDetailList[1].passengers[0].voyages[0].factArriveTime,
							"arriveTime":orderDetailList[1].voyages[0].arriveTime,
							"departTerminal":orderDetailList[1].voyages[0].departTerminal,
							"arriveTerminal":orderDetailList[1].voyages[0].arriveTerminal,
							"plane":orderDetailList[1].voyages[0].flightModel
						}],
						"passengersList":passengersList,
						"contacts":{
							"name":that.names,
							"phone":that.phone,
							"email":""
						}
					}
					
					try{
						let res = await order.orderRefundApplyCommit(dats);
						
						if(res.code == 200){
							this.showToasts("提交申请退票成功！")
							setTimeout(()=>{
								uni.navigateTo({
									url:'./planeordersaircraft?code=' + this.datalist.transactionOrderNo  + '&isck=true'
								})
							},1000)
						} else {
							this.showToasts(res.data.message);
						}
					}catch(e){
						console.log(e);
						
					}
				} else if(that.datalist.tuipiao == 3 && orderDetailList.length == 1){		//选择了回来的航班和去的航班
					let userlist = that.datalist.userlist;
					let saleNo = orderDetailList[0].mainDetail.saleOrderNo;	//销售单号
					let tradeNo = that.datalist.userslist.tr.transationOrderNo;		//旧出差单号
					let voluntaryType = that.maoyid;		//是否自愿，1自愿，2不自愿
					let refundType = that.maoid;		//退废类型1废票，2退票
					let reason = that.nasme;		//退废原因
					let isXepnr = that.yesid;		//是否取消PNR，0是，1否
					let filePath = that.users;		//图片上传路径
					let refundRemark = that.tesh;		//说明解释
					let passengersList = [];
					for (let i = 0; i < userlist.length; i++) {
						passengersList.push({
							"name":userlist[i].name,
							"ageType":userlist[i].ageType,
							"cardType":this.catype(userlist[i].certType),
							"cardNo":userlist[i].certNo
						})
					}
					let dats = {
            fromSource:that.datalist.fromSource,
            // status:4,
						"saleNo":saleNo,
						"tradeNo":tradeNo,
						"voluntaryType":voluntaryType,
						"refundType":refundType,
						"reason":JSON.stringify(refundType),
						"isXepnr":isXepnr,
						"filePath":filePath,
						"refundRemark":refundRemark,
						"apprvTask":{
							"agree":false,
							"apprvTaskStaffs":apprvTaskStaffts,
							beforeMiddle: 5,//1为事前2为事中 4为改签 5为退票
							costId:NameCenter.id, //成本中心id
							costName: NameCenter.name ,//成本中心名称
							reason: remarks,
							taskType: 5//1为事前2为事中，4为改签 5为退票
						},
						"flights":[{
							// "departDate":orderDetailList[0].passengers[0].voyages[0].factDepartTime,
							"departDate":orderDetailList[0].voyages[0].factDepartTime,
							"depart":orderDetailList[0].voyages[0].depart,
							"arrive":orderDetailList[0].voyages[0].arrive,
							"flightNo":orderDetailList[0].voyages[0].flightNo,
							"cabin":orderDetailList[0].voyages[0].cabin,
							"sequence":orderDetailList[0].voyages[0].sequence,
							"arriveTime":orderDetailList[0].voyages[0].arriveTime,
							// "arriveTime":orderDetailList[0].passengers[0].voyages[0].factArriveTime,
							"departTerminal":orderDetailList[0].voyages[0].departTerminal,
							"arriveTerminal":orderDetailList[0].voyages[0].arriveTerminal,
							"plane":orderDetailList[0].voyages[0].flightModel
						},{
							// "departDate":orderDetailList[0].passengers[0].voyages[1].factDepartTime,
							"departDate":orderDetailList[0].voyages[1].factDepartTime,
							"depart":orderDetailList[0].voyages[1].depart,
							"arrive":orderDetailList[0].voyages[1].arrive,
							"flightNo":orderDetailList[0].voyages[1].flightNo,
							"cabin":orderDetailList[0].voyages[1].cabin,
							"sequence":orderDetailList[0].voyages[1].sequence,
							"arriveTime":orderDetailList[0].voyages[1].arriveTime,
							// "arriveTime":orderDetailList[0].passengers[0].voyages[1].factArriveTime,
							"departTerminal":orderDetailList[0].voyages[1].departTerminal,
							"arriveTerminal":orderDetailList[0].voyages[1].arriveTerminal,
							"plane":orderDetailList[0].voyages[1].flightModel
						}],
						"passengersList":passengersList,
						"contacts":{
							"name":that.names,
							"phone":that.phone,
							"email":""
						}
					}
					
					try{
						let res = await order.orderRefundApplyCommit(dats);
						
						if(res.code == 200){
							this.showToasts("提交申请退票成功！")
							setTimeout(()=>{
								uni.navigateTo({
									url:'./planeordersaircraft?code=' + this.datalist.transactionOrderNo  + '&isck=false'
								})
							},1000)
						} else {
							this.showToasts(res.message);
						}
					}catch(e){
						console.log(e);
						
					}
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
						// that.CostCenterlist = res.data.costStaffs;//成本中心审批人
						// for (let i = 0; i < that.CostCenterlist.length; i++) {
						// 	that.CostCenter.push({
						// 		index:0
						// 	})
						// }
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
				// for (let i = 0; i < uls.length; i++) {
				// 	if(!that.oprefs[i].length > 0){
				// 		that.showToasts('请选择'+ (i+1) + '级审批人!')
				// 		itn = false;
				// 		return
				// 	}
				// }
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
		
		.waste_segment{
			width: 100%;
			background: #FFFFFF;
			font-size: 28upx;
			.waste_segments{
				width: 100%;
				height: 80upx;
				font-size: 32upx;
				background: #e1ecf4;
				line-height: 80upx;
				text-indent: 20upx;
			}
			.waste_bottom{
				width: 100%;
				height: 80upx;
				text-indent: 10upx;
				display: flex;
				padding: 10upx 0;
				.outward_voyage{
					line-height: 80upx;
				}
				.regions{
					display: flex;
					line-height: 80upx;
				}
				.time_rise{
					display: flex;
					.rise{
						background:#e48748;
						padding-right: 10upx;
						color: #FFFFFF;
					}
				}
				.time_drop{
					display: flex;
					.drop{
						background:#3295cc;
						padding-right: 10upx;
						color: #FFFFFF;
					}
				}
			}
		}
		.linkman_contacts{
			width: 100%;
			background: #FFFFFF;
			font-size: 28upx;
			margin-top: 20upx;
			padding-bottom: 10upx;
			.sname{
				display: flex;
				align-items: center;
			}
			.linkman_message{
				width: 100%;
				height: 80upx;
				font-size: 32upx;
				background: #e1ecf4;
				line-height: 80upx;
				text-indent: 20upx;
			}
			
		}
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
							.pons{
								width: 45%;
								display: flex;
								align-items: center;
							}
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
			.ravelvs {
				width: calc(100% - 40upx);
				padding: 0 20upx;
				background: #FFFFFF;
				margin-bottom: 20upx;
				.ts{
					display: flex;
					.rav_left {
						width: 25%;
						line-height: 90upx;
						text-align: center;
						color: #c0c0c0;
					}
					.ravright {
						width: 75%;
						display: flex;
						.olleft{
							width: 240upx;
							height: 140upx;
							border: 1upx solid $uni-color-primary;
							display: flex;
							align-items: center;
							justify-content: center;
							margin: 10upx 0;
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
