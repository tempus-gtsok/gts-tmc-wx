<template>
	<view class="mian">
		<loading>
		</loading>
		
		<loading></loading>
		<view class="mask" v-if="companyi_click" @click="companym_click">

		</view>
		<view class="mask" v-if="companye_click" @click="companymm_click">

		</view>
		<view class="select_s"  :class="isShow_H5 ? 'show' : ''">
			<view class="book_top">
				<view class="cancel" @click="companym_click">取消</view>
				<view class="genre">请选择证件类型</view>
				<view class="affirm" @click="genhuan()">确认</view>
			</view>
			<view class="tabBar">
				<!-- 循环输出证件 -->
				<view v-for="(item,index) in userinfo.cardTypeList" :key="index" class="tabbar_item" @click="option(item)">
					<view class="tabbar_left"></view>
					<view class="book_name">{{item.name}}</view>
					<view class="tabbar_img iconfont" style="color: #007aff;" v-if="item.code == cardCode">&#xe60b;</view>
				</view>
			</view>
		</view>
		<view class="select_s"  style="height: 284upx;" :class="iesShow_H5 ? 'show' : ''">
			<!-- 性别选择 -->
			<view class="book">
				<view class="book_top">
					<view class="cancel" @click="companymm_click">取消</view>
					<view class="genre">请选择性别</view>
					<view class="affirm" @click="genhuang(cun_num)">确认</view>
				</view>
				<view class="tabBar">
					<view v-for="(item,index) in tabBar" :key="index" class="tabbar_item" @click="sexIndex(index)">
						<view class="tabbar_left"></view>
						<view class="book_name">{{item.name}}</view>
						<view class="tabbar_img iconfont" style="color: #007aff;" v-if="cun_num == index">&#xe60b;</view>
					</view>
				</view>
			</view>
		</view>
		<headnavigation titles="个人证件"></headnavigation>
		<view class="container999" style="background:#edf0f5;" v-if="userinfo.user">
			<view class="name">
				<view class="name_left">
					中文姓
				</view>
				<view class="name_input">
					<input type="text" :value="userinfo.passengerVo.firstNameZh"  ref="input_css" class="input_css" placeholder="" />
				</view>
			</view>
			<view class="name" style="margin-top: 20upx;">
				<view class="name_left">
					中文名
				</view>
				<view class="name_input">
					<input type="text" :value="userinfo.passengerVo.lastNameZh"  ref="input_css" class="input_css" placeholder="" />
				</view>
			</view>
			<view class="name" style="margin-top: 20upx;">
				<view class="name_left">
					英文姓
				</view>
				<view class="name_input">
					<input type="text" value="" v-model="userinfo.passengerVo.firstName" class="input_css" ref="input_englishName" style="color:#d0d7de"
					 placeholder="Surname,如Ll" />
				</view>
			</view>
			<view class="name" style="margin-top: 20upx;">
				<view class="name_left">
					英文名
				</view>
				<view class="name_input">
					<input type="text" value="" v-model="userinfo.passengerVo.lastName" class="input_css" ref="input_english_Name" style="color:#d0d7de;"
					 placeholder="Given name,如XIAOLAN" />
				</view>
			</view>
			<!-- 证件 -->
			<view class="sts">
				<view class="add_uls" v-for="(item, index) in englishname_list" :key="index">
					<view class="apl_ok">
						<view class="frop_left" @click="name_btn('englishname', index)">
							<text class="iconfont f_icon_left">&#xe65c;</text>
							<view class="apl_name" @click="selecta">{{ item.name }}</view>
							<text class="iconfont">&#xe8a4;</text>
						</view>
						<view class="frop_pls">
							<view class="opls">
								<view class="opls"><input type="text" id="for_ints" v-model="item.value" :placeholder="item.plahth" /></view>
							</view>
						</view>
						<view class="frop_right"><view class="rig_delt" v-if="index > 0" @click="de_icd(item, index)">删除</view></view>
					</view>
				</view>
			</view>

			
			<view class="ZJ" @click="AddList">新增证件</view>
			<view class="name" style="margin-top: 20upx;" @click="selects">
				<view class="name_left">
					性别
				</view>
				<view class="name_input">
					<view class="input_css" style="color: #333333">{{mao}}</view>
					<!-- <input type="text" value="" disabled="" class="input_css" style="color:#d0d7de;" placeholder="选择性别">{{mao}}</input> -->
				</view>
				<view class="iconfont">&#xe8a3;</view>
			</view>
			<view class="name" style="margin-top: 20upx;">
				<view class="name_left">
					<view class="page">
						<view @tap="toggleTab()">出生日期</view>
						<yu-datetime-picker @confirm="onConfirm" startYear="1940" ref="dateTime" :current="false"></yu-datetime-picker>
					</view>
				</view>
				<view class="name_input" @tap="toggleTab()">
					<view class="input_css" style="color: #333333">{{date}}</view>
					<!-- <input type="text" value="" disabled="" class="input_css" style="color:#d0d7de;" placeholder="选择出生日期" /> -->
				</view>
				<view class="iconfont">&#xe8a3;</view>
			</view>
		</view>
		<view class="check_btn">
			<view class="chck_left" @click="back">
				取消
			</view>
			<view class="chck_right" @click="save">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import certificate from "@/api/certificate.js"
	import yuDatetimePicker from "@/components/yu-datetime-picker.vue"
	import Mydi from "@/api/mydi.js"
	export default {
		components: {
			yuDatetimePicker
		},
		data() {
			return {
				englishname_list: [{
					t_name: "englishname",
					name: "身份证",
					plahth: "请确保姓名和证件号码与证件一致",
					value:"",
					val:"NI",
					id:"",
					delFlag: ""
				}],
				elname: '',
				
				cardCode:"",
				certificateIndex:"",
				
				companyi_click: false,
				companye_click: false,
				certificateList:[],
				select: false,
				selecte: false,
				isShow_H5: false,
				iesShow_H5: false,
				Name: '毛毅',
				English_name: "",
				name_english: '',
				id_number: '',
				sexx: '',
				date_time: '',
				userinfo: {},
				list: [
				        
				    ]
				,
				op_ids:0,
				cun_number: null,
				// cun_numbers:null,
				cun_num: null,
				name_id: '身份证',
				sex_click: false,
				mao: '选择性别',
				sex: '',
				date: '选择出生日期',
				// input_css:'',
				tabBar: [{
						name: '男',
						code:'M'
					},
					{
						name: '女',
						code:'F'
					}
				],
				id_list:[],
				delete_list:[]
			}
		},
		mounted() {
			this.userlist();
		},
		computed: {
			// ...mapState(['userinfo'])
		},
		methods: {
			de_icd(item,index){ //删除当前证件
				let _this = this
				let credi = _this.englishname_list[index];
				if(credi.id == null){
					_this.englishname_list.splice(index,1);//删除当前证件
				}else{
					_this.englishname_list[index].delFlag=1;
					_this.delete_list.push({
						id: _this.englishname_list[index].id,
						delFlag: _this.englishname_list[index].delFlag
					})
					_this.englishname_list.splice(index,1);
				}
			},
			AddList(){
				 let _this = this
				 let le = _this.englishname_list;//当前证件
				 if (le.length >= 10){
				 	_this.showToasts("证件数量不能超过" + _this.id_list.length + "个");
				 } else {
				 	let su = true;
				 	for (let i = 0; i < le.length; i++) {
				 		if(le[i].value == ""){
				 			_this.showToasts("请完善第" + (i+1) + "个证件信息");
				 			su = false;
				 		}
				 	}
				 	if(su){
				 		_this.englishname_list.push({
				 			t_name: "englishname",
				 			name: "身份证",
				 			plahth: "请确保姓名和证件号码与证件一致",
				 			value:"", //值
				 			val:"NI" //对应值
				 		})
				 	}
				 }
			},
			name_btn(name,index){ //弹出下拉框
				if(index >= 0){ //证件信息
					this.op_ids = index
				}
				if(name == 'englishname'){
					this.isShow_H5 = true
					this.cardCode = this.englishname_list[this.op_ids].val
				}
			},
			async userlist(){ //获取个人信息
				let _this = this;
				
				try{
					let res = await Mydi.username();
					
					if(res.code == 200){
						_this.userinfo =  res.data;
						_this.id_list = _this.userinfo.cardTypeList;
						_this.date = _this.userinfo.passengerVo.birthday;
						for(var i=0;i<_this.tabBar.length;i++){
							if(_this.tabBar[i].code==_this.userinfo.user.sex){
								_this.sex=_this.tabBar[i].code;
								_this.mao=_this.tabBar[i].name;
							}
						}
						if(_this.userinfo.passengerVo.certificateList != null){
							_this.englishname_list = _this.depd_d(_this.userinfo.passengerVo.certificateList);//证件照1
						}
					}
				}catch(e){
					console.log(e)
					
				}
			},
			depd_d(id){
				let _this = this;
				let datas = [];
				for (let k = 0; k < id.length; k++) {
					for (let i = 0; i < _this.id_list.length; i++) {
					   if(id[k].cardType == _this.id_list[i].code){
						   datas.push({
							   id: id[k].id,
							   delFlag: id[k].delFlag,
							   t_name: "englishname",
							   name: _this.id_list[i].name,
							   plahth: "请确保姓名和证件号码与证件一致",
							   value: id[k].cardNo,
							   val: id[k].cardType
						   })
					   }
					}
				}
				return datas
			},
			toggleTab(item, index) {
				this.$refs.dateTime.show();
			},
			onConfirm(val) {
				this.date = val.selectArr[0] + '-' + val.selectArr[1] + '-' + val.selectArr[2];
			},
			selects(cardType,index) {
				this.iesShow_H5 = true
				this.companye_click = true;
				this.selecte = true;
			},
			selecta() {
				this.companyi_click = true;
				this.select = true;
				this.isShow_H5 = false;
			},
			companym_click() {
				this.isShow_H5 = false
				setTimeout(() => {
					this.companyi_click = false;
					this.select = false;
				}, 300)
			},
			companymm_click() {
				this.iesShow_H5 = false
				setTimeout(() => {
					this.companye_click = false;
					this.selecte = false;
				}, 300)
			},
			option(item) {
				this.cardCode=item.code;
				this.elname = item.name;
			},
			sexIndex(nun) {
				this.cun_num = nun;
				this.userinfo.user.sex = this.tabBar[nun].code;
			},
			genhuan() {
				let ins = this.op_ids;
				this.englishname_list[ins].val = this.cardCode
				this.englishname_list[ins].name = this.elname
				this.isShow_H5 = false
				setTimeout(() => {
					this.companyi_click = false;
					this.select = false;
				}, 300)
			},
			genhuang(nums) {
				this.mao = this.tabBar[nums].name;
				this.sex=this.tabBar[nums].code;
				// console.log(this.sex=this.tabBar[nums].code)
				this.iesShow_H5 = false
				setTimeout(() => {
					this.companye_click = false;
					this.selecte = false;
				}, 300)
			},
			sexs() {
				this.sex_click = true;
			},
			async save() {
				let _this = this;
				let firstName = _this.userinfo.passengerVo.firstName; //英文姓
				let lastName =_this.userinfo.passengerVo.lastName; //英文名
				let firstNameZh = _this.userinfo.passengerVo.firstNameZh;//中文姓
				let lastNameZh = _this.userinfo.passengerVo.lastNameZh;//中文名
				let sex = _this.sex //性别
				let date = _this.date; //时间
				let englishname = _this.englishname_list;//证件照1
				if (firstNameZh == '') {
					_this.showToasts("请输入中文姓");
					return;
				} 
				if (lastNameZh == '') {
					_this.showToasts("请输入中文名");
					return;
				} 
				if (firstName == '') {
					_this.showToasts("请输入英文姓");
					return;
				} 
				if (this.utils.zzNameeng(firstName)) {
					_this.showToasts("英文名格式错误");
					return;
				}
				if (lastName == '') {
					_this.showToasts("请输入英文名");
					return;
				}
				 if (this.utils.zzNameeng(lastName)) {
					_this.showToasts("英文名格式错误");
					return;
				}  
				if (sex == '选择性别') {
					_this.showToasts("请选择性别");
					return;
				} 
				 if (date == '选择出生日期') {
					_this.showToasts("请选择出生日期");
					return;
				}
				let cdlist = [];
				for (let i = 0; i < englishname.length; i++) {
					if(englishname[i].value == ""){
						_this.showToasts("证件信息不能为空!");
						return;
					} else {
						if(englishname[i].val == 'NI' && this.utils.zzIdcarreg(englishname[i].value)){
							_this.showToasts("身份证格式不正确!");
							return
						} else if(englishname[i].val == 'PP' && this.utils.zzPassport(englishname[i].value)){
							_this.showToasts("护照格式不正确!");
							return
						} else if(englishname[i].val == 'TB' && this.utils.zzTaiwan(englishname[i].value)){
							_this.showToasts("台胞证格式不正确!");
							return
						} else if(englishname[i].val == 'GA' && this.utils.zzHongkongcard(englishname[i].value)){
							_this.showToasts("港澳通行证格式不正确!");
							return
						}  else if(englishname[i].val == 'HX' && this.utils.zzHometown(englishname[i].value)){
							_this.showToasts("回乡证格式不正确!");
							return
						}
						cdlist.push({
							"cardType": englishname[i].val,
							"cardNo": englishname[i].value
						})
					}
				}
				let stlist = [];
				for (let i = 0; i < cdlist.length; i++){
					stlist.push(cdlist[i].cardType)
				}
				if((new Set(stlist)).size != stlist.length){
				    _this.showToasts("不能选择相同的证件");
				} else {
					let newdata = [];
					cdlist = [];
					for (let i = 0; i < englishname.length; i++) {
						cdlist.push({
							delFlag :0,
							cardType: englishname[i].val,
							cardNo: englishname[i].value,
							id: englishname[i].id
						})
					}
					newdata = cdlist.concat(_this.delete_list)
					let user = {
						'lastNameZh':firstNameZh,
						'lastNameZh':lastNameZh,
						"firstName":firstName,
						"lastName":lastName,
						"gender":sex,
						"birthdateStr":date,
						"customerNo":_this.userinfo.passengerVo.customerNo,
						"passengerNo":_this.userinfo.passengerVo.id,
						"certificateList": newdata
					}
					
					try{
						let res =  await certificate.updatePassengerCertificateList(user);
						
						if(res.code == 200){
							_this.showToasts(res.message);
							setTimeout(()=>{
								uni.navigateBack({
								})
							},1000)
						} else {
							_this.showToasts(res.message);
						}
					}catch(e){
						console.log(e)
						
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 998;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
	}

	.select_s {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: scroll;
		z-index: 1111;
		background: #FFFFFF;
		transition: all 0.3s ease;
		transform: translateY(100%);
		.book_top {
			display: flex;
			height: 80upx;
			line-height: 80upx;
			background: #eeeeee;

			.cancel {
				width: 20%;
				color: #37b991;
				text-align: center;
			}

			.genre {
				width: 60%;
				text-align: center;
				font-size: 32upx;
			}

			.affirm {
				width: 20%;
				text-align: center;
				color: #37b991;

			}
		}
	}

	.show {
		transform: translateY(0);
	}

	.tabBar {
		max-height: 500upx;
		overflow: scroll;

		.tabbar_item {
			display: flex;
			flex-wrap: wrap;
			line-height: 100upx;
			border-bottom: 1px solid #e2e2e2;

			.tabbar_left {
				width: 20%;
			}

			.book_name {
				width: 60%;
				text-align: center;
			}

			.tabbar_img {
				width: 20%;
				text-align: center;
			}
		}
	}
	.add_uls {
		font-size: 30upx;
		line-height: 90upx;
		margin-top: 20upx;
		background: #ffffff;
		border-bottom: 2upx solid #F1F1F1;
		.apl_ok {
			display: flex;
			.frop_left {
				display: flex;
				width: 30%;
				.f_icon_left {
					color: #ff0000;
					font-size: 20upx;
					margin: 0 3upx 0 10upx;
					transform: scale(0.8);
				}
				.f_icon_lefts {
					color: #ffffff;
					margin: 0 3upx 0 10upx;
					font-size: 20upx;
				}
				.apl_name {
					width: 150upx;
				}
			}
			.frop_pls {
				width: 61%;
				font-size: 30upx;
				display: flex;
				color: #808080;
				align-items: center;
				.opls {
					width: 100%;
					input {
						font-size: 30upx !important;
						width: 100%;
						color: black;
					}
					.for_value {
						color: black;
					}
				}
			}
			.frop_right {
				width: 9%;
				display: flex;
				align-items: center;
				justify-content: center;
				.rig_delt {
					font-size: 25upx;
					color: #dd524d;
				}
			}
		}
	}
	.name {
		width: 100%;
		line-height: 100upx;
		display: flex;
		background: #FFFFFF;

		.name_left {
			width: 35%;
			display: flex;
			text-indent: 20upx;
			color: #abb7c2;
			.content {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
		}

		.name_input {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			align-items: center;

			.input_css {
				width: 100%;
			}
		}
	}

	.ZJ {
		display: flex;
		justify-content: flex-end;
		color:$uni-color-primary;
		margin-top: 20upx;
		margin-right: 20upx;
	}

	.but {
		width: 100%;
		height: 100upx;
		text-align: center;
		display: flex;
		position: fixed;
		border: 0upx;
		bottom: 0upx;

		.but_qu {
			width: 50%;
			font-size: 28upx;
			line-height: 100upx;
			background: #FFFFFF;
			border-radius: 0upx;
			outline: #FFFFFF;
		}

		.but_cun {
			width: 50%;
			color: #FFFFFF;
			line-height: 100upx;
			font-size: 28upx;
			background:$uni-color-primary;
			border-radius: 0upx;
		}
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

		.chck_left {
			flex: 1;
			height: 110upx;
			background: #FFFFFF;
			color: $uni-color-primary;
		}

		.chck_right {
			flex: 1;
			color: #FFFFFF;
			height: 110upx;
			background: $uni-color-primary;
		}
	}
</style>
