<template>
	<view class="fligthdynameadd">
		<view class="bgks" v-if="ctysbg" @click="ctyblock">
		</view>
		<loading>
		</loading>
		<yudata @confirm="onConfirm" :modata="updata" startYear="1940" ref="dateTime" :endYear="endyears" :current="newdata"></yudata>
		<yudata @confirm="onConfirms" :modata="updata" startYear="1940" ref="dateTimes" :endYear="endyearst" :current="newdata"></yudata>
		<headnavigation titles="全球包机提交"></headnavigation>
		<view class="listshow">
			<view style="line-height: 50upx;display: flex;justify-content: space-between;">
				<view>
					{{cloblist.cfProduct.productName}}
				</view>
				<view style="color: #FF9000;">
					<span style="font-size: 28upx;">约</span>￥{{datlist.prices}}
				</view>
			</view>
			<view class="blb">
				<view class="globcls">
					<view class="globs">
						去
					</view>
					<view>
						{{cloblist.fProductFlight.fromCity}}-{{cloblist.fProductFlight.toCity}}({{cloblist.fProductFlight.flightNo}})
					</view>
				</view>
				<view class="globcls">
					<view class="globs">
						回
					</view>
					<view>
						{{cloblist.qProductFlight.fromCity}}-{{cloblist.qProductFlight.toCity}}({{cloblist.qProductFlight.flightNo}})
					</view>
				</view>
			</view>
		</view>
		<view style="text-indent: 40upx;line-height: 60upx;font-size: 35upx;">
			乘机人信息
		</view>
		<view class="userlists" v-for="(item,index) in userlist" :class="item.isclose == true? 'userisclose':''" :key="index">
			<view class="dselst" v-if="index != 0">
				<span class="iconfont" style="color: red;font-size: 50upx;" @click="delecos(index)">&#xe641;</span>
			</view>
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">姓:</view>
					<view class="ravright">
						<view class="bos">
							<input type="text" v-model="item.surname"  @input="nameInput($event,index)" placeholder="(英文)Surname" />
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">名:</view>
					<view class="ravright">
						<view class="bos">
							<input type="text" v-model="item.givenname" placeholder="(英文)Given name" />
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
			<view class="isclose" @click="isclosk(index)" v-if="item.isclose == true">
				<span class="iconfont" style="font-size: 45upx;color: #007aff;">&#xe8a4;</span>
			</view>
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">国籍:</view>
					<view class="ravright">
						<view class="bos">
							<input type="text" v-model="item.nationality.name" @blur="blurInput($event,index)" @input="onInput($event,index)"/>
							<view class="citynames" v-if="item.iscity">
								<view class="ciylist" v-for="(items,indes) in iscitys" :key="indes" @click="okcitys(items)">
									<view class="ctname">
										{{items.cityname}}
									</view>
									<view class="ctid">
										{{items.id}}
									</view>
								</view>
							</view>
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">出生日期:</view>
					<view class="ravright">
						<view class="bos">
							<input type="text" v-model="item.date_of_birth" disabled @click="toggleTab(index)" />
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">手机号:</view>
					<view class="ravright">
						<view class="bos">
							<input type="number" v-model="item.phone_number" />
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">性别:</view>
					<view class="ravright">
						<view class="bost">
							<view class="radis" @click="genderck('M',index)">
								<span v-if="item.gender != 'M'" class="iconfont" style="color: #007aff;font-size: 35upx;">&#xe7bf;</span>
								<span v-if="item.gender == 'M'"class="iconfont" style="color: #007aff;font-size: 35upx;">&#xe620;</span>
								<span style="margin-left: 20upx;font-size: 30upx;">男</span>
							</view>
							<view class="radis" @click="genderck('F',index)">
								<span v-if="item.gender != 'F'" class="iconfont" style="color: #007aff;font-size: 35upx;">&#xe7bf;</span>
								<span v-if="item.gender == 'F'" class="iconfont" style="color: #007aff;font-size: 35upx;">&#xe620;</span>
								<span style="margin-left: 20upx;font-size: 30upx;">女</span>
							</view>
						</view>
						<view class="iconfont">&#xe8a3;	</view>
					</view>
				</view>
			</view>
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">证件类型:</view>
					<view class="ravright">
						<view class="bos">
							<picker class="btnsli" :range="document_types" :range-key="'name'" @change="chineseChange($event,index)">
								{{ document_types[item.document_in].name }}
							</picker>
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">证件号码:</view>
					<view class="ravright">
						<view class="bos">
							<input type="text" v-model="item.document_number" />
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">证件有效期:</view>
					<view class="ravright">
						<view class="bos">
							<input type="text" v-model="item.Validityce" disabled @click="toggleTabs(index)" />
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
			<view class="isclose" @click="isclosk(index)" v-if="item.isclose == false">
				<span class="iconfont" style="font-size: 45upx;color: #007aff;">&#xe609;</span>
			</view>
		</view>
		<view class="costadd" @click="useradd">
			<span class="iconfont">&#xe89f;</span>
		</view>
		<view style="text-indent: 40upx;line-height: 60upx;font-size: 35upx;">
			联系人信息
		</view>
		<view class="userlists">
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">姓名:</view>
					<view class="ravright">
						<view class="bos">
							<input type="text" v-model="lx_name" />
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">手机号:</view>
					<view class="ravright">
						<view class="bos">
							<input type="number" v-model="lx_phone" />
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
		</view>
		<view class="oksl" >
			<view class="oksl_l" >
				￥{{onprice}}
				<view class="scslist">
					单人票价{{datlist.prices}},税费{{datlist.taxation}}
				</view>
			</view>
			<view class="oksl_r" @click="okadd">
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	import yudata from '@/components/yu-datetime-picker.vue'
	import et_airport from '@/static/js/country.js'
	import tork from '@/api/torowk.js'
	export default {
		
		data() {
			return {
				oldcitys:[],//历史国籍
				cloblist:{},
				onprice:'',
				lx_phone:'',//联系人电话
				lx_name:'',//联系人姓名
				endyears:'',//结束最大年份 生日
				endyearst:'',//证件有效期
				updata:"",//设置默认时间
				newdata: true,//是否显示当前时间
				ctysbg:false,
				userlist:[{
					surname:'',//英文姓
					givenname:'',//英文名
					nationality:{
						name:'',
						id:''
					},//国籍
					iscity:false,
					date_of_birth:'',//出生日期
					phone_number:'',//电话
					gender:'M',//性别
					document_type:'PP',//证件类型
					document_in:0,//证件下标
					document_number:'',//证件号码
					Validityce:'',//证件有效期
					isclose:false,//是否缩小
				}],
				document_types:[{
					name:'护照',
					id:'PP'
				},{
					name:'港澳通行证',
					id:'GA'
				},{
					name:'台胞证',
					id:'TB'
				}],
				abstid:0,//当前选择的下标
				datlist:{},
				citys:[],//国籍
				iscitys:[],
			}
		},
		components:{
			yudata
		},
		onLoad(it) {
			this.endyears = new Date().getFullYear();
			this.endyearst = new Date().getFullYear() + 10;
			this.citys = et_airport;
			this.datlist = JSON.parse(it.data);
			this.select();//查询详情
		},
		mounted() {
			this.price_list();//计算价格
			this.usernams();//获取联系人信息
			
		},
		methods: {
			okadd(){
				let userlistp = this.userlist;
				let useslst= [];
				for(let i = 0;i <userlistp.length;i++){
					if(userlistp[i].surname == ''){//英文姓
						uni.showToast({
							title:'请输入第' + (i+1) + '联系人的姓',
							duration:1000,
							icon:'none'
						})
						return
					} else if(userlistp[i].givenname == ''){
						uni.showToast({
							title:'请输入第' + (i+1) + '联系人的名',
							duration:1000,
							icon:'none'
						})
						return
					} else if(userlistp[i].nationality.name == ''){
						uni.showToast({
							title:'请输入第' + (i+1) + '联系人的国籍',
							duration:1000,
							icon:'none'
						})
						return
					} else if(userlistp[i].date_of_birth == ''){
						uni.showToast({
							title:'请输入第' + (i+1) + '联系人的生日',
							duration:1000,
							icon:'none'
						})
						return
					} else if(userlistp[i].phone_number == ''){
						uni.showToast({
							title:'请输入第' + (i+1) + '联系人的手机号',
							duration:1000,
							icon:'none'
						})
						return
					} else if(userlistp[i].document_number == ''){
						uni.showToast({
							title:'请输入第' + (i+1) + '联系人的证件号码',
							duration:1000,
							icon:'none'
						})
						return
					} else if(userlistp[i].Validityce == ''){
						uni.showToast({
							title:'请输入第' + (i+1) + '联系人的证件有效期',
							duration:1000,
							icon:'none'
						})
						return
					} else if(_this.utils.zzPhone(userlistp[i].phone_number)){
						uni.showToast({
							title:'请输入第' + (i+1) + '联系人正确的手机号',
							duration:1000,
							icon:'none'
						})
						return
					}
				}
				for (let k = 0;k<userlistp.length;k++) {
					useslst.push({
						passengerType:'ADT',//类型默认成人
						gender:userlistp[k].gender,//性别
						surname:userlistp[k].surname,//姓
						name:userlistp[k].givenname,//名
						nationality:userlistp[k].nationality.id,//国籍
						passengerBirth:userlistp[k].date_of_birth,//生日
						phone:userlistp[k].phone_number,//电话
						certType:userlistp[k].document_type,//证件类型
						certNo:userlistp[k].document_number,//证件号
						certValid:userlistp[k].Validityce,//证件有效期
					})
				}
				let dats = {
					passengerList:useslst,
					isSure:'no',//是否需要审批
					priceId:this.datlist.priceId,//价格id
					flightType:this.datlist.airlineType,//单程还是往返
					cfProductOrder:{
						legType:this.datlist.airlineType,
						legNo:this.cloblist.cfBookDto.productId,//id
						productName:this.cloblist.cfProduct.productName,//产品名称
						contactName:this.lx_name,//联系人
						contactPhone:this.lx_phone,//联系电话
						totalPrice:this.onprice,//总价
						price:this.datlist.prices,//单价
						tax:this.datlist.taxation,//税费
						fare:0,//加价
					},
					tax:this.datlist.taxation,//税费
					fare:0,//加价
				}
				console.log(dats)
			},
			price_list(){
				this.onprice = (parseInt(this.datlist.taxation) + parseInt(this.datlist.prices)) * this.userlist.length;
			},
			async usernams(){//获取联系人
				try{
					const res = await tork.getContactInfo();
					if(res.code == 200){
						this.lx_name = res.data.name;
						this.lx_phone = res.data.phone;
					} else {
						this.showToasts(res.message);
					}
				}catch(e){
					console.log(e);
				}
			},
			delecos(inde){//删除当前成本
				this.userlist.splice(inde,1);
				this.price_list();
			},
			isclosk(index){
				if(this.userlist[index].isclose){
					this.userlist[index].isclose = false;
				} else {
					this.userlist[index].isclose = true;
				}
			},
			useradd(){
				this.userlist.push({
					surname:'',//英文姓
					givenname:'',//英文名
					nationality:{
						name:'',
						id:''
					},//国籍
					iscity:false,
					date_of_birth:'',//出生日期
					phone_number:'',//电话
					gender:'M',//性别
					document_type:'PP',//证件类型
					document_in:0,//证件下标
					document_number:'',//证件号码
					Validityce:'',//证件有效期
					isclose:false,//是否缩小
				})
				this.price_list();
			},
			chineseChange(e,index){//选择当前证件
				this.userlist[index].document_in = e.detail.value;
				this.userlist[index].document_type = this.document_types[index].id;
			},
			onConfirm(ts){ //赋值出生日期
				this.userlist[this.abstid].date_of_birth = ts.selectArr[0] + '-' + ts.selectArr[1] + '-' + ts.selectArr[2]
			},
			onConfirms(ts){ //赋值出生日期
				this.userlist[this.abstid].Validityce = ts.selectArr[0] + '-' + ts.selectArr[1] + '-' + ts.selectArr[2]
			},
			toggleTab(index) { //出生日期
				this.abstid = index;
				this.$refs.dateTime.show();
			},
			toggleTabs(index) { //证件有效期
				this.abstid = index;
				this.$refs.dateTimes.show();
			},
			nameInput(itm,id){
				this.abstid = id;
				var va = itm.mp.detail.value.trim();
				console.log(va)
			},
			blurInput(itm,id){//国籍输入失去焦点时
				this.abstid = id;
				var va = itm.mp.detail.value.trim();
				if(!this.ctysbg){ //搜索没值
					if(this.oldcitys.length > 0){
						this.userlist[this.abstid].nationality = {
							name: this.oldcitys[0].cityname,
							id:this.oldcitys[0].id
						}
					} else {
						this.userlist[this.abstid].nationality = {
							name: '',
							id:''
						}
					}
				}
			},
			onInput(itm,id){ //国籍帅选
				this.abstid = id;
				var va = itm.mp.detail.value.trim();
				if(va.length > 0){
					var banks = this.citys;//当前所有国家
					this.iscitys = [];
					for (let i in banks) {
						if(banks[i].cityname.indexOf(va) >= 0 || banks[i].id.indexOf(va) >= 0 ){
							this.iscitys.push(banks[i])
						}
						if(banks[i].cityname == va){
							this.userlist[this.abstid].nationality.id = banks[i].id
						}
					}
					if(this.iscitys.length>0){
						this.oldcitys = [...this.iscitys]
					}
					if(this.iscitys.length > 0){
						this.ctysbg = true;
						this.userlist[id].iscity = true;
					}
				} else {
					this.ctysbg = false;
					this.userlist[id].iscity = false;
				}
			},
			genderck(it,index){//切换性别
				this.userlist[index].gender = it;
			},
			ctyblock(){
				this.ctysbg = false;
				if(this.iscitys.length > 0){
					this.userlist[this.abstid].nationality = {
						name: this.iscitys[0].cityname,
						id:this.iscitys[0].id
					}
				}
				this.userlist[this.abstid].iscity = false;
			},
			okcitys(item){ //选择当前国籍
				this.userlist[this.abstid].nationality = {
					name:item.cityname,
					id:item.id
				}
				this.ctysbg = false;
				this.userlist[this.abstid].iscity = false;
			},
			async select(){
				try{
					let res = await tork.flightbook({
						productId:this.datlist.productId,
						priceId:this.datlist.priceId
					})
					if(res.code == 200){
						this.cloblist = res.data;
					} else {
						uni.showToast({
							title:res.message,
							duration:1000,
							icon:'none'
						})
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fligthdynameadd{
		position: relative;
		padding-bottom: 130upx;
		.bgks{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			z-index: 10;
		}
		.listshow{
			width: calc(100% - 80upx);
			margin: 20upx 20upx 0 20upx;
			padding: 20upx;
			font-size: 35upx;
			border-radius: 15upx;
			background: #FFFFFF;
			.blb{
				display: flex;
				justify-content: center;
				align-items: center;
				.globcls{
					flex: 1;
					display: flex;
					align-items: center;
					font-size: 26upx;
					margin: 10upx 0;
					.globs{
						width: 40upx;
						height: 40upx;
						text-align: center;
						line-height: 40upx;
						background-color: $uni-color-primary;
						color: #FFFFFF;
						border-radius: 2upx;
						margin-right: 5upx;
					}
				}
			}
		}
		.userisclose{
			height: 210upx;
			overflow: hidden;
		}
		.userlists{
			width: calc(100% - 40upx);
			margin: 20upx 20upx;
			padding-top: 10upx;
			background: #FFFFFF;
			border-radius: 15upx;
			position: relative;
			.isclose{
				width: 100%;
				height: 60upx;
				line-height: 60upx;
				text-align: center;
			}
			.dselst{
				position: absolute;
				width: 50upx;
				height: 50upx;
				top: -10upx;
				right: -10upx;
			}
			.ravelv {
				width: calc(100% - 40upx);
				padding: 10upx 20upx;
				height: 60upx;
				.ts{
					line-height: 60upx;
					display: flex;
					font-size: 35upx;
					.rav_left {
						width: 25%;
						font-size: 30upx;
						text-align: center;
					}
					.ravright {
						width: 75%;
						display: flex;
						.bost{
							display: flex;
							align-items: center;
							justify-content: space-between;
							.radis{
								flex: 1;
								display: flex;
								align-items: center;
							}
						}
						.bos {
							position: relative;
							width: calc(93% - 20upx);
							height: 60upx;
							padding-left: 20upx;
							display: flex;
							align-items: center;
							background-color: #F5F5F5;
							input {
								font-size: 30upx;
								width: 100%;
							}
							.btnsli{
								width: 100%;
							}
							.citynames{
								position: absolute;
								width: calc(100% - 40upx);
								padding: 0 20upx;
								max-height: 600upx;
								line-height: 60upx;
								overflow-x: scroll;
								top: 70upx;
								left: 0;
								background:#F1F1F1;
								z-index: 20;
								.ciylist{
									display: flex;
									align-items: center;
									justify-content: space-between;
									font-size: 30upx;
									.ctname{
										width: 80%;
										overflow: hidden;
										text-overflow:ellipsis;
										white-space: nowrap;
									}
									.ctid{
										width: 20%;
										text-align: right;
										color: $uni-color-primary;
									}
								}
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
		.costadd{
			width: calc(100% - 40upx);
			height: 80upx;
			margin: 20upx 20upx 20upx 20upx;
			background: #FFFFFF;
			border-radius: 10upx;
			display: flex;
			align-items: center;
			justify-content: center;
			span{
				color: $uni-color-primary;
				font-size: 45upx;
			}
		}
		.oksl{
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
			.oksl_l{
				width: 70%;
				height: 90upx;
				color: #FF9000;
				font-size: 45upx;
				text-indent: 20upx;
				display: flex;
				justify-content: space-between;
				.scslist{
					padding-right: 10upx;
					font-size: 28upx;
					color: #FF9000;
				}
			}
			.oksl_r{
				width: 30%;
				font-size: 35upx;
				height: 90upx;
				text-align: center;
				background: #FF9000;
			}
		}
	}
</style>
