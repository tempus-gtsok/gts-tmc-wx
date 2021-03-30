<template>
	<view class="trandetails">
		<loading>
		</loading>
		<view class="Navigations">
			<view @click="rblcok" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
			<view class="ongbutns">
				{{tiltext}}
			</view>
			<view class="onright">
				<view class="onrights" @click="deletli" v-if="isclose && rotes('tms:tra:change:cancel')">
					取消改签
				</view>
			</view>
		</view>
		<view class="fixs_list" :class="fxli ? 'shows' : 'hides'">
			<view class="Navigations">
				<view @click="fxli = false" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
				<view class="ongbutns">
					经停站
				</view>
				<view class="onright">
				</view>
			</view>
			<view class="fix_los" v-for="(item,index) in trklist" :key="index">
				<view class="fitx_les stsb">
					<view class="scks">
						{{index + 1}}
					</view>
					{{item.fromStation}}
				</view>
				<view class="fitx_les" style="text-align: center;">
					{{item.departureTime}}
				</view>
				<view class="fitx_les" v-if="index != 0" style="text-align: center;">
					停{{item.stayTimeSpan}}分钟
				</view>
				<view class="fitx_les" v-if="index == 0" style="text-align: center;">
					--
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
		<view class="navstop" v-if="plsitsti.orderExt != null">
			<view class="">
				{{rest(plsitsti.orderExt.changeStatus)}}
			</view>
			<view class="">
				订单号：{{plsitsti.orderExt.buyChangeNo}}
			</view>
			<view class="">
				支付状态：{{payname(payStatus)}}
			</view>
			<view class="lisst">
				<view class="citst">
					<view class="cits_t">
						<view class="no_t" v-if="plsitsti.orderExt.ticketNo != null && plsitsti.orderExt.ticketNo != ''">
							取票号:{{plsitsti.orderExt.ticketNo}}
						</view>
						<view class="citys">
							<view class="citys_l">
								<view class="scis_t">
									{{plsitsti.orderExt.traSaleChangeDetailList[0].changeFromStation}}
								</view>
								<view class="scis_o">
									{{yeada(plsitsti.orderExt.traSaleChangeDetailList[0].departTime,0)}}
								</view>
								<view class="scis_b">
									{{yeada(plsitsti.orderExt.traSaleChangeDetailList[0].departTime,1)}}
								</view>
							</view>
							<view class="citys_l">
								<view class="scis_t">
									{{plsitsti.orderExt.traSaleChangeDetailList[0].changeTrainNo}}
								</view>
								<view class="scis_s" @click="gettrainWs">
									经停信息
									<view class="sci_l">
									</view>
									<view class="sci_r">
									</view>
								</view>
								<view class="scis_b">
									{{busdate(plsitsti.orderExt.traSaleChangeDetailList[0].departTime,plsitsti.orderExt.traSaleChangeDetailList[0].arrivalTime)}}
								</view>
							</view>
							<view class="citys_l">
								<view class="scis_t">
									{{plsitsti.orderExt.traSaleChangeDetailList[0].changeToStation}}
								</view>
								<view class="scis_o">
									{{yeada(plsitsti.orderExt.traSaleChangeDetailList[0].arrivalTime,0)}}
								</view>
								<view class="scis_b">
									{{yeada(plsitsti.orderExt.traSaleChangeDetailList[0].arrivalTime,1)}}
								</view>
							</view>
						</view>
					</view>
					<view class="cits_b">
						<view class="cits_bl" v-if="vid == 11">
							<view class="cits_sg" @click="ctlist('1')">
								取票说明
							</view>
						</view>
						<view class="cits_bl" v-if="vid == 9">
							<view class="cits_sg" @click="ctlist('2')">
								退票须知
							</view>
						</view>
						<view class="cits_bl">
							<view class="cits_sg">
							</view>
							<view class="cits_cl" @click="toaddls">
								去购票
							</view>
						</view>
					</view>
				</view>
				<view class="btuserlist">
					<view class="btuse">
						乘车人
						<view class="btul" v-for="(item,index) in userlist" :key="index">
							<view class="user_t">
								<view class="user_l">
									{{item.passenagerName}}
								</view>
								<view class="user_o">
									<view>
										成人票
									</view>
									<view style=" color: #007aff;">
										{{userstatus(item.changeStatus)}}
									</view>
								</view>
								<view class="user_r">
									￥{{item.changeOrderPrice}}
								</view>
							</view>
							<view class="user_t">
								<view class="user_l">
									{{catype(item.saleOrderDetailList,item.saleOrderDetailNo)}}
								</view>
								<view class="user_o">
									{{catypeno(item.saleOrderDetailList,item.saleOrderDetailNo)}}
								</view>
								<view class="user_r">
									{{item.changeSeatClass}}
								</view>
							</view>
						</view>
					</view>
					<view class="liass">
						<view class="liass_l">
							联系信息
						</view>
						<view class="liass_r">
							{{plsitsti.orderExt.traSaleOrderExt.person}}　{{plsitsti.orderExt.traSaleOrderExt.cellphone}}
						</view>
					</view>
					<view class="liass">
						<view class="liass_l">
							出差事由
						</view>
						<view class="liass_r">
							{{reason}}
						</view>
					</view>
					<view class="liass">
						<view class="liass_l" v-if="vid == 11">
							改签费用
						</view>
						<view class="liass_l" v-if="vid == 9">
							退款金额
						</view>
						<view class="liass_p">
							￥{{planAmount}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btnfixd">
			<paybtns businessType="1" productType="4" :recordNo="recordNos" :amount="amounts" @payok="payok" v-if="(typename == 2 && payStatus== 1 && orderStatus == 1)||(typename==1 && settlement == 1 && payStatus == 1  && orderStatus== 1)"></paybtns>
			<view class="deletes" @click="updatas(2)" v-if="usersli && ists && userslis">
				申请退票
			</view>
			
			<!--
			typename //1因公2因私
			changeStatus 0退票中，1退票完成，2已取消
			payStatus//支付状态 1待支付 2支付中 3已支付 4已支付
			settlement//结算方式:1=现结，2=月结
			orderStatus//订单状态  1新申请 2改签中 3改签完成 4已取消 5改签失败 -->
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
						{{item.passenagerName}}
					</view>
				</view>
			</view>
		</view>
		<view class="black_mus" @click="shos = false" v-if="shos"></view>
	</view>
</template>

<script>
	import tork from '@/api/torowk.js'
	import order from '@/api/order.js'
	export default{
		data(){
			return{
				userslis:true,
				usersli:false,
				ists:false,//能否退票
				ist:0,
				usersnamelist: [],
				isclose: false,
				typename: '',//1因公2因私
				apprvTaskStatu: '',//因公审核状态0待审核 1审核中2审核通过
				orderStatus: '',//订单状态
				tiltext:'火车票详情',
				reason:'',//出差事由
				userlist:[],//乘客列表
				fxli: false,
				sittext: '',
				switfals: false,
				switfal: false,
				stlistad:[],
				ticketcollection:[ //取票说明
					"1、若你使用二代居民身份证预定火车可凭预定时所使用的乘车人有效的二代居民身份证原件到车站售票窗口、铁路客票代售点或车站自动售票机上办理换票手续",
					"2、若你持有的二代居民身份证无法自动识读或者使用二代居民身份证以外的其他有效身份证件预定的,需出示预定时使用的乘车人有效身份证原件和窗口取票号,到车站售票口或铁路运输企业授权的铁路客票代售点,由售票员录入证件号码和窗口取票号码并核实后办理换票手续",
					"3、若你在预定成功后、换票前，不慎遗失有效身份证件，须由您本人到乘车站铁路公安制证口办理临时身份证明",
					"4、有效身份证件信息、窗口取票口号等经核实一致的,予以换票;不一致的,不予换票。注：部分动车组列车可持二代居民身份证直接检票进站",
					"5、根据国家《发票管理办法》有关规定,铁路行业发票实行专业管理,火车票本事即作为报销凭证使用,请及时换取车票并妥善保管,以作报销凭证,否则可能造成企业损失,导致您的企业支付权限被关闭,影响出行"
					
				],
				noticerefund: [ //退票说明
					"1、退票手续费及最终退款金额以铁路部门实退为准",
					"2、如你已在车站办理退票业务,请同时在订单详情中点击'申请退票',退款会在15个工作日内自动退款",
					"3、如已取纸质车票,请携带有效证件至火车票退票窗口办理退票",
					"4、发车前45分钟,且未换取纸质车票可通过当前应用火车票订单详情申请退票,在线退票时间为：06:30-22:30(其他时间须去火车站窗口办理)",
					"5、若列车已发车则不可办理退票",
					"6、铁路部门按以下规则核收退票费：票面乘车站开车时间为15天(不含)以上不收取退票费;48小时以上按票价5%收取退票费;24小时以上、不足48小时的按票价10收取,不足24小时的按票价20%收取。"
				],
				stlist: [{
						name: '新申请',
						id:1
					},{
						name: '改签中',
						id:2
					},{
						name: '改签完成',
						id:3,
					},{
						name: '已取消',
						id:4
					},{
						name: '改签失败',
						id:5
					},{
						name: '退票中',
						id:6
					},{
						name: '已退票',
						id:7
					},{
						name: '部分退票',
						id:8
					}],
				codes: 0,
				
				
				plsitsti: {},
				trklist: [],//经停站
				weeks:['一','二','三','四','五','六','日'],
				isclsks: false,//是否从列表点进详情
				settlement: 1,//1现结2月结
				planAmount: 0,//改签费用
				payStatus:0,//支付状态
				RuleMas:false,//是否退票需要审批
				RuleMa:'',
				shos:false,
				isnum:0,
				vid:0,//改签还是退票  9为退票 11 为改签
				recordNos: 0,
				amounts: 0,
			}
		},
		onLoad(item) {
			this.vid = item.vid;
			this.ist = item.ist;
			this.codes = item.code;
			this.isclsks = item.isck;
		},
		mounted() {
			this.slet();
		},
		methods:{
			payname(it){
				if(it == 1){
					return '待支付';
				} else if(it == 2){
					return '支付中';
				} else if(it == 3){
					return '已支付'
				} else if(it == 4){
					return '挂账支付'
				}
			},
			payok(){
			   this.slet('wx');
			},
			toaddls(){ //购买火车票
				uni.navigateTo({
					url:'/pages-book/book/mainModules/majorFunction/select_list/select_list?type=Train'
				})
			},
			aduser(it,index){//选择人员
				if(this.usersnamelist[index].istrue){
					this.usersnamelist[index].istrue = false;
				} else {
					this.usersnamelist[index].istrue = true;
				}
				this.usersnamelist = [...this.usersnamelist];
			},
			async ic_ok(){//确定当前
				let isnum = this.isnum;
				let userlist = [];
				let names = [];
				let outPassengerNo = [];
				for (let i in this.usersnamelist) {
					if(this.usersnamelist[i].istrue){
						userlist.push({
							certNo: this.usersnamelist[i].saleOrderDetailList[i].traPassenger.certNo,//证件号码
							certType: this.catypes(this.usersnamelist[i].saleOrderDetailList[i].traPassenger.certType),//证件类型
							name:this.usersnamelist[i].saleOrderDetailList[i].traPassenger.name,//名字
						});
						for(let k in this.usersnamelist[0].saleOrderDetailList){
							if(this.usersnamelist[0].saleOrderDetailList[k].traPassenger.name ==this.usersnamelist[i].passenagerName ){
								names.push(this.usersnamelist[0].saleOrderDetailList[k].traPassenger.name);
								outPassengerNo.push(this.usersnamelist[i].passenagerTicketNo)
							}
						}
						
					}
				}
				if(userlist.length == 0){
					this.showToasts("请选择退票人员！")
					return
				}
				let nu = this.plsitsti.tmsotr.typename;//因公因私
				let userlistnos = [];
				if(nu == 1){//因公需要从接口中获取用户passengerNo
					let res = await order.getStaffByTravelNoAndNames({
						travelNo: this.plsitsti.tmsotr.travelNo,
						names: names
					});
					let dat = res.data;//获取改签人信息
					for (let i in dat) {
						userlistnos.push(dat[i].passengerNo)
					}
				}
				this.shos = false;
				if(nu == 2){ //判断是否因私或者因公    因私不需要审核
					let dat = {
						saleChangeNo:this.plsitsti.orderExt.saleChangeNo,
						passengerNo: outPassengerNo.join(','),
						apprvTaskEntity:{
							agree:false,
							examinePattern: '0'
						}
					}
					try{
						
						let res = await order.applyChangeRefundTrain(dat);
						
						if(res.code == 200){
							this.showToasts("提交申请退票成功！")
							setTimeout(()=>{
								this.slet();
							},1000)
						} else {
							this.showToasts(res.message);
						}
					}catch(e){
						console.log(e)
						
					}
				} else if(nu == 1 && !this.RuleMas){ //因公但是不需要审核
					let dat = {
						saleChangeNo:this.plsitsti.orderExt.saleChangeNo,
						passengerNo: outPassengerNo.join(','),
						apprvTaskEntity:{
							agree:false,
							examinePattern: this.RuleMa
						}
					}
					
					try{
						let res = await order.applyChangeRefundTrain(dat);
						
						if(res.code == 200){
							this.showToasts("提交申请退票成功！")
							setTimeout(()=>{
								this.slet();
							},1000)
						} else {
							this.showToasts(res.message);
						}
					}catch(e){
						
						console.log(e)
					}
					
				} else {
					let res = await order.judgeApprv({passengerNos:userlistnos});//判断当前出行人是否都免审
					if(res.code == 200){
						if(res.data == false){ //判断是否需要审核
							let dat = {
								trano:this.codes,
								saleChangeNo:this.plsitsti.orderExt.saleChangeNo,
								passengerNo: outPassengerNo,
								userlist: userlist,
								ruleMas:this.RuleMa,
								islist:2
							}
							uni.navigateTo({
								url:'../applyforchange?data=' + JSON.stringify(dat)
							})
						} else {
							let dat = {
								saleChangeNo:this.plsitsti.orderExt.saleChangeNo,
								passengerNo: outPassengerNo.join(','),
								apprvTaskEntity:{
									agree:false,
									examinePattern: '0'
								}
							}
							
							try{
								let res = await order.applyChangeRefundTrain(dat);
								
								if(res.code == 200){
									this.showToasts("提交申请退票成功！")
									setTimeout(()=>{
										this.slet();
									},1000)
								} else {
									this.showToasts(res.message);
								}
							}catch(e){
								console.log(e)
								
							}
						}
					} else {
						this.showToasts(res.message);
					}
				}
			},
			async updatas(num){//申请改签或退票
				this.isnum = num;
				this.getRuleMainSetting();
				this.usersnamelist = [];
				
				for (let i in this.userlist) {
					if(this.userlist[i].changeStatus == 3){
						this.usersnamelist.push(this.userlist[i])
						this.usersli = true;
					}
				}
				for (let i in this.usersnamelist) {
					this.usersnamelist[i]['istrue'] = false;
				}
				this.shos = true;
			},
			async getRuleMainSetting(){ //查询当前用户退票是否需要审核
				try{
					let res = await order.RuleMainSetting();
					this.RuleMa = res.data.examinePattern;
					let stw = this.RuleMa.split(',');
					for (let i in stw) {
						/**
						 * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
						 */
						if(stw[i] == 6){
							this.RuleMas = true;
						}
					}
				}catch(e){
					console.log(e)
				}
			},
			userstatus(it){//乘客当前状态
				if(it == 0){
					return '退票中'
				} else if(it == 1){
					return '退票完成'
				} else if(it == 2){
					return '已取消'
				} else if(it == 3){
					return '已出票'
				} else if(it == 4){
					return '改签单新申请'
				}
			},
			deletli(){ //取消改签
				let that = this;
				uni.showModal({
					 title: '提示',
					content: '确定是否取消改签！',
					success: function (res) {
						if (res.confirm) {
							that.closedi(); 
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},	
			async closedi(){//取消改签
				let no = this.plsitsti.orderExt.saleChangeNo;
				
				try{
					let res = await order.cancelChange({
						saleChangeNo:no
					})
					
					if(res.code == 200){
						this.showToasts("取消成功!");
						setTimeout(()=>{
							uni.navigateTo({
								url:'../trainorder?ist=' + this.ist
							})
						},500)
					} else {
						this.showToasts(res.message)
					}
				}catch(e){
					console.log(e);
					
				}
			},
			catype(item,no){//返回证件类型.
				let sus = {};
				for (let i in item) {
					if(item[i].saleOrderDetailNo == no){
						sus = item[i];
					}
				}
				let it = sus.traPassenger.certType;
				if(it == 1){
					return '身份证'//NI
				} else if(it == 2){
					return '护照'//PP
				} else if(it == 3){
					return '台胞证'//TB
				} else if(it == 4){
					return '港澳通行证'//GA
				}
			},
			catypes(it){//返回证件类型
				if(it == 1){
					return '身份证'//NI
				} else if(it == 2){
					return '护照'//PP
				} else if(it == 3){
					return '台胞证'//TB
				} else if(it == 4){
					return '港澳通行证'//GA
				}
			},
			catypeno(item,no){
				let sus = {};
				for (let i in item) {
					if(item[i].saleOrderDetailNo == no){
						sus = item[i];
					}
				}
				return sus.traPassenger.certNo;
			},
			ctlist(item){//点击查看说明
				if(item == 1){
					this.stlistad = this.ticketcollection
					this.sittext = '取票说明'
				} else {
					this.stlistad = this.noticerefund
					this.sittext = '退票通知'
				}
				this.switfals = true;
				setTimeout(()=>{
					this.switfal = true;
				},200);
			},
			isshow(){
				this.switfal = false;
				setTimeout(()=>{
					this.switfals = false;
				},200)
			},
			async gettrainWs(){//获取当前经停站
				this.fxli = true;
				
				try{
					let dat = this.plsitsti.orderExt.traSaleChangeDetailList[0].departTime.substring(0,10).split('-');
					let tis = dat[0] + dat[1] + dat[2];
					const res = await tork.trainWs({
						trainNo: this.plsitsti.orderExt.traSaleChangeDetailList[0].changeTrainNo,
						trainDate: tis
					})
					
					if(res.code == 200){
						this.trklist = res.data.stations;
					} else {
						this.showToasts(res.message)
					}
				}catch(e){
					console.log(e);
					
				}
			},
			yeada(item,num){
				if(num == 0 && item != null){
					return item.substring(11,16)
				} else if(num == 1 && item != null){
					let week = new Date(item.replace(/-/g, '/')).getDay();
					if(week == 0){
						week = 7
					}
					let ts = item.substring(5,10).split('-');
					return ts[0] + '月' + ts[1] + '日' + ' 周' + this.weeks[week-1]
				}
			},
			busdate(num,num1){//总时长
				if(num == null|| num1 == null ){
					return
				}
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
			async slet(va){//查询当前票
				let that = this;
				if(that.ltes == 0){
					
				}
				try{
					let res = "";;
					if(this.vid == 11){
						res = await order.trainChangeInfo({outOrderNo: this.codes});
					} else if(this.vid == 9){
						res = await order.trainChangeInfoBySaleChangeNo({saleChangeNo: this.codes});
					}
					
					if(res.code == 400){
						if(that.ltes != 1){
							
							that.showToasts("占座中,请注意短信！")
							that.tiltext = '火车票占座中...';
						}
						this.ltes = 1;
					} else if(res.code == 200){
						if (va == 'wx' && res.data.orderExt.saleChange.payStatus == 1){
							if(that.ltes != 1){
								
								that.tiltext = '支付中...';
							}
							that.ltes = 1;
							setTimeout(()=>{
								that.slet('wx')
							},1000)
						} else {
							
							this.ltes = 0;
							that.tiltext = '火车票详情';
							that.plsitsti = res.data;
							that.reason = res.data.apprvTask.reason;//出差事由
							that.typename = that.plsitsti.tmsotr.typename;//1因公2因私
							that.payStatus = that.plsitsti.orderExt.saleChange.payStatus;//支付状态 1待支付 2支付中 3已支付 4已支付
							that.orderStatus = that.plsitsti.orderExt.changeStatus;//订单状态  1新申请 2改签中 3改签完成 4已取消 5改签失败6退票中7已退票8部分退票
							that.planAmount = that.plsitsti.orderExt.saleChange.planAmount;//改签费用
							that.settlement = that.plsitsti.tmsotr.settlement;//结算方式:1=现结，2=月结
							
							that.recordNos = that.plsitsti.orderExt.saleOrderNo;
							that.amounts =  that.planAmount;
							
							this.isclose = false;
							if(that.orderStatus == 2 || that.orderStatus == 1){
								this.isclose = true;
							}
							that.usersli = false;
							that.userlist = that.plsitsti.orderExt.traSaleChangeDetailList;//乘客信息
							for (let i in that.userlist) {
								if(that.userlist[i].changeStatus == 3){
									that.usersli = true;
								}
							}
							
							that.userslis = false;
							if(that.typename == 1){ //因公状态下 判断是审核通过  或者免审 才显示退票
								if(that.plsitsti.apprvTask.status == 2 || that.plsitsti.apprvTask.status == 5 || that.plsitsti.apprvTask.status == '' || that.plsitsti.apprvTask.status == null ){
									that.userslis = true;
								} else {
									that.userslis = false;
								}
							} else {
								that.userslis = true;
							}
							this.ists = false;
							if(this.vid == 11){
								const rest = await order.checkRetundAndChange({departureTime: that.plsitsti.orderExt.traSaleChangeDetailList[0].departTime});
								if(rest.code == 200){
									if(rest.data.trainRefund == 1){
										this.ists = true;//能退票
									}
								}
							}
						}
					} else {
						that.showToasts(res.message);
					}
				}catch(e){
					console.log(e);
					
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
				if(this.isclsks == 'false'){
          // #ifdef H5
          window.history.back()
          // #endif
          // #ifdef MP-WEIXIN
          uni.navigateBack();
          // #endif
				} else {
          // #ifdef H5
          window.history.back()
          // #endif
          // #ifdef MP-WEIXIN
          uni.navigateBack();
          // #endif
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.trandetails{
		width: 100%;
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
			line-height: 110upx;
			text-align: center;
			display: flex;
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
			.deletes{
				width: 100%;
				height: 110upx;
				color: #FFFFFF;
				background: red;
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
				font-size: 30upx;
				.stname{
					flex: 1;
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
		.navstop{
			position: relative;
			width: calc(100% - 80upx);
			padding: 20upx 40upx 140upx 40upx;
			font-size: 28upx;
			color: #FFFFFF;
			background: #109DED;
			.lisst{
				position: absolute;
				left: 0;
				top: 145upx;
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
						.no_t{
							width: 100%;
							height: 60upx;
							line-height: 60upx;
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
									font-size: 35upx;;
								}
								.scis_o{
									line-height: 80upx;
									font-size: 55upx;;
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
									display: flex;
									justify-content: center;
									align-items: center;
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
						border-bottom-left-radius: 15upx;
						border-bottom-right-radius: 15upx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.cits_bl{
							flex: 1;
							display: flex;
							.cits_cl{
								width: 130upx;
								height: 45upx;
								line-height: 45upx;
								text-align: center;
								background: $uni-color-primary;
								color: #FFFFFF;
								border-radius: 45upx;
							}
							.cits_sg{
								flex: 1;
							}
						}
					}
				}
				.btuserlist{
					width: 100%;
					margin-top: 20upx;
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
									display: flex;
									justify-content: space-between;
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
							text-align: right;
							flex: 1;
						}
						.liass_p{
							text-align: right;
							flex: 1;
							font-size: 35upx;
							color: #FF9000;
						}
					}
				}
			}
		}
	}
</style>
