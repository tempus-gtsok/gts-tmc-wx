<template>
	<view class="trandetails">
		<view class="black_mu" @click="isshow" v-if="blac_show"></view>
		<loading>
		</loading>
		<view class="Navigations">
			<view @click="rblcok" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
			<view class="ongbutns">
				{{tiltext}}
			</view>
			<view class="onright">
				<view class="onrights" @click="deletli" v-if="rotes('tms:dps:change:cancel') && dtolist.status == 7 && dtolist.payStatus == 1 ">
					取消改签
				</view>
			</view>
		</view>
		<view class="black_mu" @click="isshow" v-if="switfals">
			<view class="isswflist" @click.stop="" :class="switfal ? 'show' : ''">
				<view class="isstop">
					<view class="">
						{{sittext}}
					</view>
					<view @click="isshow" class="iconfont" style="color: #C0C0C0;font-size: 50upx;">
						&#xe641;
					</view>
				</view>
				<view class="isstops" v-for="(item,index) in stlistad" :key="index">
					{{item}}
				</view>
			</view>
		</view>
		<view class="navstop" v-if="dtolist.no">
			<view class="">
				订单号：{{dtolist.no}}
			</view>
			<view class="">
				销售单号：{{dtolist.saleNo}}
			</view>
			<view class="">
				改签状态：{{dtolist.statusname}}
			</view>
			<view class="">
				申请时间：{{dtolist.createTime}}
			</view>
			<view style="color: #FF9000;">
				改签费用：￥{{dtolist.changeFee}}
			</view>
			<view class="lisst" v-if="orderDetailListy.length > 0">	
				<view class="citst" style="margin-top: 30upx;" v-for="(item,index) in orderDetailListy" :key="index">
					<view class="cits_t">
						<view class="cits_sa">
							<view class="no_t" style="display: flex;"> 
								<view v-if="index == 0" style="color: #007aff;border: #007aff 1upx solid;width: 40upx;height: 40upx;margin-top: 10upx;text-align: center;line-height: 40upx;">
									往
								</view>
								<view v-if="index == 1" style="color: #007aff;border: #007aff 1upx solid;width: 40upx;height: 40upx;margin-top: 10upx;text-align: center;line-height: 40upx;">
									返
								</view>
								<image :src="item.ims" mode="" style="width: 35upx;height: 30upx;padding-top: 15upx;"></image>
								{{item.airlines}}{{item.flightNo}}
							</view>
							<view class="no_t" style="text-align: right;">
								{{item.departTimes}}
							</view>
						</view>
						<view class="citys">
							<view class="citys_l">
								<view class="scis_t">
									{{item.departTimer}}
								</view>
								<view class="scis_o">
									{{item.origDeparts}}
								</view>
								<view class="scis_b">
								</view>
							</view>
							<view class="citys_l">
								<view class="scis_t">
								</view>
								<view class="scis_s">
									{{item.arriveTimer}}
									<view class="sci_l">
									</view>
									<view class="sci_r">
									</view>
								</view>
							</view>
							<view class="citys_l">
								<view class="scis_t">
									{{item.arriveTimes}}
								</view>
								<view class="scis_o">
									{{item.origArrives}}
								</view>
							</view>
						</view>
					</view>
					<view class="Check" v-if="item.stkus && orderStatus == '8'">
						<view class="updatas" @click="updatas(1,item,index)">
							单程改签
						</view>
						<view class="deletes" @click="updatas(2,item,index)">
							单程退票
						</view>
					</view>
				</view>
				
				<view class="btuserlist" >
					<view class="btuse">
						乘机人
						<view class="btul" v-for="(item,index) in newuserlist" :key="index">
							<view class="user_t">
								<view class="user_l">
									{{item.itd.name}}
								</view>
								<view class="user_o" style="margin-left: 88upx;">
									成人票
								</view>
								<view style=" color: #007aff;" v-if="item.itd">
									往:{{item.itd.statusname}}
								</view>
								<view style=" color: #007aff;" v-if="item.isd">
									,&nbsp;返:{{item.isd.statusname}}
								</view>
							</view>
							<view class="user_t">
								<view class="user_l">
									{{catype(item.itd.origCardType)}}
								</view>
								<view class="user_o">
									{{item.itd.cardNo}}
								</view>
							</view>
							<view class="user_t">
								<view class="user_l">
									手机号
								</view>
								<view class="user_o">
									{{item.itd.phone}}
								</view>
							</view>
							<view class="user_t">
								<view class="user_l">
									出差事由
								</view>
								<view class="user_o">
									{{Reason}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btnfixd">
			<paybtns businessType="4" productType="1" :recordNo="recordNos" :amount="amounts" @payok="payok" v-if="(typename == 2 && payStatus== 1)||(typename==1 && payStatus == 1 && settlement == 1 &&  (apprvTask.status == 2 || apprvTask.status == 5 ))"></paybtns>
			<view class="tobeaudited" v-if="typename == 1 && orderStatus== 3">
				待审核
			</view>
			<view class="tobeaudited" v-if="dtolist.status == 7">
				运营处理中..
			</view>
			<view class="updatas" @click="updataslist(1)" v-if="usersli && dtolist.status ==5">
				往返改签
			</view>
			<view class="deletes" @click="updataslist(2)" v-if="usersli && dtolist.status ==5">
				往返退票
			</view>
		</view>
		<view class="userlist" :class="shos ? 'show' : ''">
			<view class="userlist_top">
				<view class="btns" @click="shos = false">取消</view>
				<view class="oli">请选择人员</view>
				<view class="btns" @click="ic_ok">确定</view>
			</view> 
			<view class="usarbotm">
				<view class="stname" v-for="(item,index) in usersnamelist" :key="index">
					<view :class="['stve',item.istrue ? 'stnames': 'stnamet']" @click="aduser(item,index)">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="black_mus" @click="shos = false" v-if="shos"></view>
	</view>
</template>

<script>
	import airports from '@/pages/book/sselect-city/airports.js'
	import certifi from '@/api/certificate.js'
	import order from '@/api/order.js'
	export default{
		data(){
			return{
				apprvTask:{},
				istext:'',
				payStatus: 0,//支付状态1:未支付(默认); 2:部分支付; 3:已支付; 4:部分退款; 5:已退款
				settlement: 0,//1为日结 2为月结
				newuserlist: [],//乘客信息
				dtolist: {},//改签单详情
				orderDetailListy: [],
				usersli: false,//是否可以退票和改签
				maoid:1,
				index:'',
				usersnamelist:[],
				Reason:'',//出差事由
				costs: false,
				blac_show: false,
				isclose: false,
				shos: false,
				typename: '',//1因公2因私
				orderStatus: '',//订单状态
				tiltext:'飞机票详情',
				userlist:[],//乘客列表
				fxli: false,
				sittext: '',
				switfals: false,
				switfal: false,
				stlistad:[],
				stlist: [{
						name: '新申请',
						id:1
					},{
						name: '已取消',
						id:2
					},{
						name: '待审批',
						id:3
					},{
						name: '已拒绝',
						id:4
					},{
						name: '审批通过待支付',
						id:5
					},{
						name: '待提交',
						id:6
					},{
						name: '处理中',
						id:7
					},{
						name: '已完成',
						id:8
					},{
						name: '客户待审批',
						id:9
					},{
						name: '客户驳回',
						id:8
					}],
				codes: 0,
				bao:0,
				
				
				userslist:{},
				hang: [],
				trklist: [],//经停站
				weeks:['一','二','三','四','五','六','日'],
				isclsks: false,//是否从列表点进详情
				accountInfo:{},  //联系信息
				orderDetailList:[] ,//飞机票详情信息
				RuleMas: false,//火车退票是否需要审核
				isnum: 1,//1为改签2为退票
				isttype:0,
				saleOrderNo: "",//当前销售单号
				odllegList: [],//当前航班信息
				traExtend: {},
				ist:0,
				sione: true,//改单程还是往返
				ltes:0,
				recordNos: 0,
				amounts: 0,
			}
		},
		onLoad(item) {
			this.ist = item.ist;
			this.codes = item.code;
			this.isclsks = item.isck;
		},
		mounted() {
			this.slet();
			this.address = airports.addressAirportAll; //航空名字
		},
		methods:{
			payok(){
			    this.slet('wx');
			},
			citys(its){//回显城市
				for (let j = 0; j < this.address.length; j++) {  //循环城市
					if(this.address[j].airportCode == its){
						return this.address[j].cityCName
					}
				}
			},
			deletli(){
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定是否取消订单！',
					success: function (res) {
						if (res.confirm) {
							that.closedi(); 
						} else if (res.cancel) {
						}
					}
				})
			},
			async closedi(){//取消订单
				let _this = this;
				let no = this.dtolist.no;
				try{
					let res = await order.cancelChanges({
						saleChangeNo:no
					})
					
					if(res.code == 200){
						this.showToasts("取消成功!");
						setTimeout(()=>{
							_this.rblcok();
						},1000)
					} else {
						this.showToasts(res.message)
					}
				}catch(e){
					console.log(e)
					
				}
			},
			userstatus(it){		//乘客当前状态
				if(it == 0){
					return '已取消'
				} else if(it == 1){
					return '正常'
				} else if(it == 2){
					return '改签'
				} else if(it == 3){
					return '废退'
				}
			},
			aduser(it,index){//选择人员
				if(this.usersnamelist[index].istrue){
					this.usersnamelist[index].istrue = false;
				} else {
					this.usersnamelist[index].istrue = true;
				}
				this.usersnamelist = [...this.usersnamelist];
			},
			updataslist(num){//往返改签或者退票
				this.sione = false;
				let list = this.orderDetailListy[0];
				this.saleOrderNo = list.mainDetail.saleOrderNo;
				this.odllegList = [];//当前航班信息
				this.usersnamelist = [];//当前可操作用户
				let voyages = list.voyages;
				for (let i = 0; i < voyages.length; i++) {
					this.odllegList.push({
						flightNo:voyages[i].flightNo,
						cabin:voyages[i].cabin,
						depAirport: voyages[i].depart,
						arrAirport:voyages[i].arrive,
						depTime: this.timels(voyages[i].departTime),
						arrTime: this.timels(voyages[i].arriveTime),
					})
				}
				for (let i = 0; i < list.passengers.length; i++) { //循环插入所有用户信息
					if(list.passengers[i].voyages[0].status == 1 && list.passengers[i].voyages[1].status == 1){
						this.usersnamelist.push({
							phone:list.passengers[i].phone,
							city: {
								id:list.passengers[i].voyages[0].depart,
								name: this.citys(list.passengers[i].voyages[0].depart)
							}, 
							citys: {
								id:list.passengers[i].voyages[0].arrive,
								name: this.citys(list.passengers[i].voyages[0].arrive)
							}, 
							departTime: list.passengers[i].voyages[0].departTime.substring(0,10),
							departTimes: list.passengers[i].voyages[1].departTime.substring(0,10),
							cardNo: list.passengers[i].cardNo,
							cardType: list.passengers[i].cardType,
							passengerId: list.passengers[i].passengerId,
							name: list.passengers[i].name,
							istrue: false,//默认为待选状态
						})
					}
				}
				this.shos = true;
				this.isnum = num;
			},
			async updatas(num,item,index){//申请改签或退票
				this.sione = true;
				this.odllegList = []; //当前航班信息
				this.odllegList.push({
					flightNo:item.flightNo,
					cabin:item.cabin,
					depAirport:item.origDepart,
					arrAirport:item.origArrive,
					depTime: this.timels(item.departTime),
					arrTime: this.timels(item.arriveTime),
				})
				this.isnum = num;
				this.usersnamelist = []; //可操作用户列表
				let userli = this.newuserlist;//当前用户列表
				if(index == 0){
					for (let i = 0; i < userli.length; i++) {
						if(userli[i].itd.status == 1){
							this.usersnamelist.push({
								phone:userli[i].itd.phone,
								city: {
									id:userli[i].itd.origDepart,
									name: this.citys(userli[i].itd.origDepart)
								}, 
								citys: {
									id:userli[i].itd.origArrive,
									name: this.citys(userli[i].itd.origArrive)
								}, 
								departTime:  userli[i].itd.departTime.substring(0,10),
								cardNo: userli[i].itd.origCardNo,
								cardType: userli[i].itd.origCardType,
								// passengerId: userli[i].itd.passengerId,
								name: userli[i].itd.name,
								istrue: false,//默认为待选状态
							})
						}
					}
				} else if(index == 1){
					for (let i = 0; i < userli.length; i++) {
						if(userli[i].isd.status == 1){
							this.usersnamelist.push({
								city: {
									id:userli[i].isd.origDepart,
									name: this.citys(userli[i].isd.origDepart)
								}, 
								citys: {
									id:userli[i].isd.origArrive,
									name: this.citys(userli[i].isd.origArrive)
								}, 
								departTime:  userli[i].isd.departTime.substring(0,10),
								cardNo: userli[i].isd.origCardNo,
								cardType: userli[i].isd.origCardType,
								name: userli[i].isd.name,
								istrue: false,//默认为待选状态
							})
						}
					}
				}
				this.shos = true;
			},
			timels(time){
				if(time.length < 19){
					return time + ':00'
				} else {
					return time
				}
			},
			async ic_ok(){		//确定当前
				let isnum = this.isnum;//改签还是退票
				let userlist = [];
				let names = [];
				let city = "";
				let citys = "";
				let detime= "";
				for (let i in this.usersnamelist) {
					if(this.usersnamelist[i].istrue){
						city = this.usersnamelist[i].city;
						citys = this.usersnamelist[i].citys;
						detime = this.usersnamelist[i].departTime;
						userlist.push({
							phone:this.usersnamelist[i].phone,
							certNo: this.usersnamelist[i].cardNo,//证件号码
							certType: this.catype(this.usersnamelist[i].cardType),//证件类型
							name:this.usersnamelist[i].name,//名字
						});
						names.push(this.usersnamelist[i].name)
					}
				}
				if(userlist.length == 0){
					if(isnum == 1){
						this.showToasts("请选择改签人员！")
					} else if(isnum == 2) {
						this.showToasts("请选择退票人员！")
					}
					return
				}
				let nu = this.typename;//因公因私
				let userlistnos = [];
				
				try{
					if(nu == 1){	//因公需要从接口中获取用户passengerNo
						let res = await order.getStaffByTravelNoAndNames({
							travelNo: this.traExtend.travelNo,
							names: names
						});
						
						let dat = res.data;//获取改签人信息
						for (let i in dat) {
							userlistnos.push(dat[i].passengerNo)
						}
					}
					this.shos = false;
					if(isnum == 1){     //改签
						let dat = {
							tradeNo: this.traExtend.transationOrderNo,//交易单号
							none:"single",
							type:"Planeticket",
							userlistnos: userlistnos,//用户信息
							saleOrderNo: this.dtolist.saleNo,//航班出差单号
							odllegList: this.odllegList,//当前航班信息
							city: city,//去的城市
							citys: citys,//来的城市
							timedate:detime,//时间
							butalist: userlist,//出行人员
							isblcks: 4,//4改签
							isbtd: nu,//1因公2因私
						}
						uni.navigateTo({
							url:'/pages-book/book/mainModules/majorFunction/ticketInquiry/ticketinquiry?data=' + JSON.stringify(dat)
						})
					} else {    //退票
					}
				}catch(e){
					console.log(e)
					
				}
			},
			catype(it){//返回证件类型
				if(it == 'NI'){
					return '身份证'
				} else if(it == 'PP'){
					return '护照'
				} else if(it == 'TB'){
					return '台胞证'
				} else if(it == 'GA'){
					return '港澳通行证'
				} else if(it == 'HX'){
					return '回乡证'
				} else if(it == 'OS'){
					return '其他证件'
				}
			},
			isshow(){
				this.switfal = false;
				this.costs = false;
				setTimeout(()=>{
					this.switfals = false;
				},200)
				setTimeout(()=>{
					this.blac_show = false;
				},200)
			},
			yeada(item,num){
				if(num == 0){
					return item.substring(11,16)
				} else if(num == 1){
					let week = new Date(item.replace(/-/g, '/')).getDay();
					if(week == 0){
						week = 7
					}
					let ts = item.substring(5,10).split('-');
					return ts[0] + '月' + ts[1] + '日' + ' 周' + this.weeks[week-1]
				}
			},
			busdate(num,num1){//总时长
				let st = Date.parse(new Date(num.replace(/-/g, '/')));
				let st1 = Date.parse(new Date(num1.replace(/-/g, '/')));
				let dat = st1 - st;
				let fs = dat/1000/60 ;//一共多少分钟
				let hours = parseInt(fs/60);//多少小时
				let tims = fs - hours * 60;//于多少分钟
				if(tims > 0){
					return hours + '时' + tims + '分'
				} else {
					return hours + '时'
				}
			},
			company(ie) {
				for (let s in this.hang) {
					if (ie == s) {
						ie = this.hang[s];
						return ie;
					}
				}
			},
			async slet(va){
				let that = this;
				if(that.ltes == 0){
					
				}
				try{
					const rea = await order.openChangeDetail({saleChangeNo: this.codes});//查询当前航班信息
					
					if(rea.code == 200){
						if (va == 'wx' && rea.data.dto.payStatus == 1){
							that.ltes = 1;
							
							that.tiltext = '支付中...';
							setTimeout(()=>{
								that.slet('wx')
							},1000)
						} else {
							that.ltes == 0;
							const ret = await certifi.queryAirlineList();//获取航空公司名称
							
							that.tiltext = '改签单详情';
							if(rea.data.apprvTask != undefined){
								that.Reason = rea.data.apprvTask.reason; //出差事由
							}
							that.dtolist = rea.data.dto;//改签单信息
							that.hang = ret.data.airlineDds; //航空公司名
							that.traExtend = rea.data.traExtend;
							that.typename = rea.data.traExtend.typename;//1因公2因私
							that.settlement = rea.data.traExtend.settlement;//1为日结 2为月结
							that.orderStatus = rea.data.dto.status;
							that.payStatus = rea.data.dto.payStatus;//支付状态  1:未支付(默认); 2:部分支付; 3:已支付; 4:部分退款; 5:已退款;6:退款中
							that.apprvTask = rea.data.apprvTask;
							
							
							that.recordNos = that.codes;
							that.amounts =  that.dtolist.changeFee;
							let serlist = rea.data.forShowPassengerInfo;//乘客信息
							let stalist = rea.data.saleItemMap;//乘客状态
							for (let i = 0; i < serlist.length; i++) {
								serlist[i].status = stalist[serlist[i].saleItemId].status;
								serlist[i]['phone'] = stalist[serlist[i].saleItemId].phone
							}
								
							that.dtolist['statusname'] = that.rest(that.dtolist.status);
							let userlists =  serlist;
							let newuserlist = [];
							let forshowlist = rea.data.forShowTicketInfo;//城市信息
							that.newuserlist = [];
							if(forshowlist.length == 1){ //单程
								for (let i = 0; i < userlists.length; i++) {
									
									that.newuserlist.push({
										itd: userlists[i],//去
									})
									that.newuserlist[i].itd['statusname'] = that.userstatus(that.newuserlist[i].itd.status);
								}
								
							} else {//往返
								let sit = (userlists.length) / 2;//获取乘客人数
								for (let i = 0; i < sit; i++) {
									that.newuserlist.push({
										itd: userlists[i],//去
										isd: userlists[i + sit],//返
									})
									that.newuserlist[i].itd['statusname'] = that.userstatus(that.newuserlist[i].itd.status);
									that.newuserlist[i].isd['statusname'] = that.userstatus(that.newuserlist[i].isd.status);
								}
							}
							for (let k in forshowlist) {
								forshowlist[k]['statuss'] = this.yeada(forshowlist[k].departTime,1);
								forshowlist[k]['departTimes'] = this.yeada(forshowlist[k].departTime,1);
								forshowlist[k]['airlines'] = this.company(forshowlist[k].airline);
								forshowlist[k]['departTimer'] = this.yeada(forshowlist[k].departTime,0);
								forshowlist[k]['arriveTimes'] = this.yeada(forshowlist[k].arriveTime,0);
								forshowlist[k]['origDeparts'] = this.citys(forshowlist[k].origDepart);
								forshowlist[k]['arriveTimer'] = this.busdate(forshowlist[k].departTime,forshowlist[k].arriveTime);
								forshowlist[k]['origArrives'] = this.citys(forshowlist[k].origArrive);
								forshowlist[k]['ims'] = 'http://file.feiren.com/00/02/' + forshowlist[k].airline + '.png'  //航空公司图标
							}
							if(forshowlist.length == 1){ //判断单程里是否有用户能改签或者退票
								forshowlist[0]['stkus'] = false;
								for (let i = 0; i < userlists.length; i++) {
									if(userlists[i].status == 1){
										forshowlist[0].stkus = true;
									}
								}
							} else {
								let num = 0;
								for (let i = 0; i < 2; i++) { //判断往返里是否有用户能改签或者退票
									forshowlist[i].stkus = false;
									for (let k = 0; k < that.newuserlist.length; k++) {
										if(i == 0 && that.newuserlist[k].itd.status == 1){
											forshowlist[i].stkus = true;
										}
										if(i == 1 && that.newuserlist[k].isd.status == 1){
											forshowlist[i].stkus = true;
										}
									}
									if(forshowlist[i].stkus == true){
										num++;
									}
								}
								if(num == 2){
									that.usersli = true;
								}
							}
							that.orderDetailListy = forshowlist;
							
						}
					} else {
						
						that.showToasts(rea.massage);
					}
				}catch(e){
					console.log(e)
					
				}
			},
			rest(ite){
				let arr = this.stlist;
				for(let i in arr){
					if(arr[i].id == ite){
						return arr[i].name
					}
				}
			},
			rblcok(){
				// #ifdef H5
				history.back();
				// #endif
				// #ifdef MP-WEIXIN
				uni.navigateBack()
				// #endif
			}
		}
	}
</script>

<style scoped lang="scss">
	.trandetails{
		width: 100%;
		padding-bottom: 300upx;
		.Navigations{
			/*  #ifdef  APP-PLUS || MP-WEIXIN */ 
			padding-top: 60upx;
			/*  #endif  */
			width: 100%;
			height: 90upx;
			display: flex;
			align-items: center;
			background: #109DED;
			justify-content: space-between;
			.ongbutns{
				color: #FFFFFF;
				text-align: center;
			}
			.onright{
				font-size: 30upx;
				padding-right: 10upx;
				color: #FFFFFF;
			}
		}
		.fixs_list{
			position: fixed;
			bottom: -100%;
			left: 0;
			width: 0;
			height: 100%;
			overflow: scroll;
			background: #edf0f5;
			z-index: 1000;
			.fix_los{
				display: flex;
				width: calc(100% - 40upx);
				padding: 0 20upx;
				height: 90upx;
				line-height: 90upx;
				background: #FFFFFF;
				margin-bottom: 2upx;
				.fitx_les{
					flex: 1;
					font-size: 30upx;
				}
				.stsb{
					display: flex;
					align-items: center;
					.scks{
						margin-right: 10upx;
						width: 50upx;
						text-align: center;
						color: #FFFFFF;
						height: 35upx;
						line-height: 35upx;
						border-radius: 35upx;
						background: #90B2E7;
					}
				}
			}
		}
		.shows {
			bottom: 0;
			width: 100%;
			transition: bottom 0.4s;
		}
		.hides {
			bottom: -100%;
			width: 100%;
			transition: bottom 0.4s;
		}
		.black_mu {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.5);
			z-index: 888;
			.isswflist{
				position: fixed;
				bottom: 0;
				left: 0;
				transition: all 0.3s ease;
				-webkit-transform: translateY(100%);
				transform: translateY(100%);
				min-height: 150upx;
				border-top-left-radius: 15upx;
				border-top-right-radius: 15upx;
				width: calc(100% - 80upx);
				z-index: 889;
				background: #ffffff;
				padding: 40upx;
				font-size: 30upx;
				.isstop{
					color: $uni-color-primary;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 30upx;
				}
				.isstops{
					padding-bottom: 20upx;
				}
			}
			.show {
				-webkit-transform: translateY(0);
				transform: translateY(0);
			}
		}
		.btnfixd{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			line-height: 100upx;
			color:#FFFFFF;
			background: #F48F00;
			text-align: center;
			font-size: 30upx;
			.payment{
				width: 100%;
				height: 110upx;
				color: #FFFFFF;
				background: #F48F00;
			}
			.tobeaudited{
				width: 100%;
				height: 110upx;
				color: #FFFFFF;
				background: #999999;
			}
				line-height: 100upx;
				text-align: center;
				display: flex;
			.updatas{
					width: 50%;
					height: 100upx;
					color: #FFFFFF;
					background: #F48F00;
					border-bottom-left-radius: 15upx;
				}
			.deletes{
				width: 50%;
				height: 100upx;
				color: #FFFFFF;
				background: red;
				border-bottom-right-radius: 15upx;
			}
		}
		.black_mus {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.5);
			z-index: 888;
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
				display: flex;
				font-size: 30upx;
				height: 90upx;
				width: 100%;
				background: #f1f1f1;
				align-items: center;
				text-align: center;
				.btns {
					width: 20%;
					color: $uni-color-primary;
				}
				.oli {
					width: 60%;
					color: #c8c7cc;
				}
			}
			.usarbotm{
				width: 100%;
				padding: 40upx 0;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				font-size: 30upx;
				.stname{
					width: 33%;
					height: 60upx;
					display: flex;
					justify-content: center;
					align-items: center;
					.stve{
						padding: 0 15upx;
						height: 40upx;
						line-height: 40upx;
						border-radius: 8upx;
					}
					.stnamet{
						border: 2upx solid #999999;
						color:#999999;
					}
					.stnames{
						background: $uni-color-primary;
						border: 2upx solid $uni-color-primary;
						color:#FFFFFF;
					}
				}
			}
		}
		.show {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
		.cancellation{
			position: fixed;
			bottom: 0;
			right: 0;
			width: 50%;
			line-height: 100upx;
			color:#e5f1ff;
			background: #49a8e2;
			text-align: center;
			font-size: 30upx;
		}
		.navstop{
			position: relative;
			width: calc(100% - 80upx);
			padding: 20upx 40upx 140upx 40upx;
			font-size: 28upx;
			color: #FFFFFF;
			background: #109DED;
			.show {
				-webkit-transform: translateY(0);
				transform: translateY(0);
			}
			.lisst{
				position: absolute;
				left: 0;
				top: 200upx;
				width: calc(100% - 40upx);
				padding:  0 20upx;
				.citst{
					width: 100%;
					.cits_t{
						width: calc(100% - 40upx);
						padding: 20upx;
						background: #F5FAFD;
						border-top-left-radius: 15upx;
						border-top-right-radius: 15upx;
						color: #333333;
						.cits_sa{
							display: flex;
							.no_t{
								flex: 1;
								width: 100%;
								height: 60upx;
								line-height: 60upx;
							}
						}
						.citys{
							width: 100%;
							display: flex;
							.citys_l{
								flex: 1;
								text-align: center;
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;
								.scis_t{
									line-height: 60upx;
									font-size: 55upx;;
								}
								.scis_o{
									line-height: 80upx;
									font-size: 35upx;;
								}
								.scis_b{
									line-height: 60upx;
									font-size: 28upx;
									color: #C8C7CC;
								}
								.scis_s{
									position: relative;
									margin: 0 auto;
									border-radius: 35upx;
									width: 130upx;
									line-height: 35upx;
									height: 35upx;
									color: $uni-color-primary;
									border: 2upx solid $uni-color-primary;
									.sci_l{
										position: absolute;
										width: 30upx;
										height: 2upx;
										background: $uni-color-primary;
										top: 16upx;
										right: 130upx;
									}
									.sci_r{
										position: absolute;
										width: 30upx;
										height: 2upx;
										background: $uni-color-primary;
										top: 16upx;
										left: 130upx;
									}
								}
							}
						}
					}
					.cits_b{
						width: calc(100% - 80upx);
						color: $uni-color-primary;
						padding: 0 40upx;
						height: 90upx;
						background: #FFFFFF;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.cits_bl{
							display: flex;
							.cits_cl{
								width: 130upx;
								height: 45upx;
								line-height: 45upx;
								text-align: center;
								background: #FFFFFF;
								color:#72b2de;
								border-radius: 45upx;
							}
							.cits_sg{
								flex:1;
								color:#8a8a8a;
								
							}
						}
					}
					.Check{
						line-height: 100upx;
						text-align: center;
						display: flex;
						.updatas{
								width: 50%;
								height: 100upx;
								color: #FFFFFF;
								background: #F48F00;
								border-bottom-left-radius: 15upx;
							}
						.deletes{
							width: 50%;
							height: 100upx;
							color: #FFFFFF;
							background: red;
							border-bottom-right-radius: 15upx;
						}
					}
				}
				.btuserlist{
					width: 100%;
					margin-top: 20upx;
					// margin-bottom: 300upx;
					border-radius: 15upx;
					background: #FFFFFF;
					.btuse{
						color: #C8C7CC;
						font-size: 35upx;
						width: calc(100% - 40upx);
						padding: 20upx;
						.btul{
							margin-top: 10upx;
							color: #333333;
							.user_t{
								display: flex;
								width: 100%;
								height: 50upx;
								line-height: 50upx;
								font-size: 28upx;
								.user_l{
									flex: 3;
								}
								.user_o{
									flex: 5;
								}
								.user_r{
									flex: 4;
									justify-content: flex-end;
									display: flex;
								}
							}
						}
					}
					.liass{
						width: calc(100% - 40upx);
						padding: 0 20upx;
						display: flex;
						color: #C8C7CC;
						line-height: 80upx;
						.liass_l{
							font-size: 35upx;
							flex: 1;
						}
						.liass_r{
							color: #333333;
							flex: 1.7;
						}
						.liass_p{
							font-size: 35upx;
							color: #FF9000;
						}
					}
				}
			}
		}
	}
</style>

 