<template>
	<view class="add_coll">
		<loading>
		</loading>
		<view class="black_mu" @click="isshow" v-if="blac_show"></view>
		<headnavigation titles="旅客信息"></headnavigation>
		<view class="userlist" :class="shos ? 'show' : ''">
			<view class="userlist_top">请选择{{ le_name }}</view>
			<view class="ci_list" v-if="shos">
				<view class="cl_val" v-for="(item, index) in id_list" :key="index" @click="ad_cion(item, index)" v-if="icontest == 'englishname'">
					<view>{{ item.name }}</view>
					<view class="ok_ioc" v-if="englishname_list[op_ids].val == item.code"><text class="iconfont" style="color:#007aff;">&#xe60b;</text></view>
				</view>
				<view class="cl_val" v-for="(item, index) in genderlist" :key="index" @click="ad_cion(item, index)" v-if="icontest == 'gender'">
					<view class="">{{ item.name }}</view>
					<view class="ok_ioc" v-if="gender_list.val == item.id"><text class="iconfont" style="color:#007aff;">&#xe60b;</text></view>
				</view>
			</view>
		</view>
		<view class="add_ul">
			<view class="apl_ok">
				<view class="frop_left">
					<text class="iconfont f_icon_left">&#xe65c;</text>
					<view class="apl_name">{{ phonenumbe_list.name }}</view>
				</view>
				<view class="frop_pls">
					<view class="opls"><input maxlength="11" type="text" id="for_ints" v-model="phonenumbe_list.value" :placeholder="phonenumbe_list.plahth" /></view>
				</view>
			</view>
		</view>
		<view class="add_ul">
			<view class="apl_ok">
				<view class="frop_left">
					<text class="iconfont f_icon_left">&#xe65c;</text>
					<view class="apl_name">{{ firstNameZh_list.name }}</view>
				</view>
				<view class="frop_pls">
					<view class="opls"><input type="text" id="for_ints" @blur="namezh_left()" v-model="firstNameZh_list.value" :placeholder="firstNameZh_list.plahth" /></view>
				</view>
			</view>
		</view>
		<view class="add_ul">
			<view class="apl_ok">
				<view class="frop_left">
					<text class="iconfont f_icon_left">&#xe65c;</text>
					<view class="apl_name">{{ lastNameZh_list.name }}</view>
				</view>
				<view class="frop_pls">
					<view class="opls"><input type="text" id="for_ints" @blur="namezh_right()" v-model="lastNameZh_list.value" :placeholder="lastNameZh_list.plahth" /></view>
				</view>
			</view>
		</view>
		<view class="add_ul">
			<view class="apl_ok">
				<view class="frop_left">
					<text class="iconfont f_icon_lefts">&#xe65c;</text>
					<view class="apl_name">{{ englishsurname_lsit.name }}</view>
				</view>
				<view class="frop_pls">
					<view class="opls"><input type="text" id="for_ints" v-model="englishsurname_lsit.value" :placeholder="englishsurname_lsit.plahth" /></view>
				</view>
			</view>
		</view>
		<view class="add_ul">
			<view class="apl_ok">
				<view class="frop_left">
					<text class="iconfont f_icon_lefts">&#xe65c;</text>
					<view class="apl_name">{{ engs_list.name }}</view>
				</view>
				<view class="frop_pls">
					<view class="opls"><input type="text" id="for_ints" v-model="engs_list.value" :placeholder="engs_list.plahth" /></view>
				</view>
			</view>
		</view>
		<view class="sts">
			<view class="add_uls" v-for="(item, index) in englishname_list" :key="index">
				<view class="apl_ok">
					<view class="frop_left" @click="name_btn('englishname', index)">
						<text class="iconfont f_icon_left">&#xe65c;</text>
						<view class="apl_name">{{ item.name }}</view>
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
		<view class="add_cd">
			<view @click="addfast">新增证件</view>
		</view>
		<view class="add_ul" @click="name_btn('gender')">
			<view class="apl_ok">
				<view class="frop_left">
					<text class="iconfont f_icon_left">&#xe65c;</text>
					<view class="apl_name">{{ gender_list.name }}</view>
				</view>
				<view class="frop_pls">
					<view class="opls">
						<view class="" v-if="gender_list.value == ''">{{ gender_list.plahth }}</view>
						<view class="for_value" v-if="gender_list.value !== ''">{{ gender_list.value }}</view>
					</view>
				</view>
				<view class="frop_right"><view class="iconfont">&#xe8a3;</view></view>
			</view>
		</view>
		<view class="add_ul" @click="name_btn('dateofbirth')">
			<view class="apl_ok">
				<view class="frop_left">
					<text class="iconfont f_icon_left">&#xe65c;</text>
					<view class="apl_name">{{ dateofbirth_lsit.name }}</view>
				</view>
				<view class="frop_pls">
					<view class="opls">
						<view class="" v-if="dateofbirth_lsit.value == ''">{{ dateofbirth_lsit.plahth }}</view>
						<view class="for_value" v-if="dateofbirth_lsit.value !== ''">{{ dateofbirth_lsit.value }}</view>
					</view>
				</view>
				<view class="frop_right"><view class="iconfont">&#xe8a3;</view></view>
			</view>
		</view>
		<yudata @confirm="onConfirm" :modata="updata" startYear="1940" ref="dateTime" endYear="2020" :current="newdata"></yudata>
		<view class="check_btn">
			<view class="chck_left" @click="roblak">取消</view>
			<view class="chck_right" @click="add_user" v-if="rotes(hasadd_modf)">保存</view>
		</view>
	</view>
</template>

<script>
import Mydi from "@/api/mydi.js"
import py from "@/static/js/vue-py.js"
import yudata from '@/components/yu-datetime-picker.vue'
export default{
	data(){
		return{
			hasadd_modf:'',
			updata:"",//设置默认时间
			newdata: true,//是否显示当前时间
			icontest:"",//当前点击的下拉框
			
			
			le_name:"",
			genderlist: [{ //性别
					name:"男",
					ul: "boy",
					id:"M"
				},{
					name:"女",
					ul:"girl",
					id:"F"
				}],
			id_list:[],
			phonenumbe_list:{
				t_name: "phonenumbe",
				name: "手机号",
				plahth: "请输入手机号码",
				value:""
			},//手机号码
			firstNameZh_list:{
				t_name: "firstNameZh",
				name: "中文姓",
				plahth: "请填写中文姓",
				value:""
			},//中文姓
			lastNameZh_list:{
				t_name: "lastNameZh",
				name: "中文名",
				plahth: "请填写中文名",
				value:""
			},//中文名
			englishsurname_lsit:{
				t_name: "englishsurname",
				name: "英文姓",
				plahth: "Suname,如LI",
				value:""
			},//英文姓
			engs_list:{
				t_name: "engs",
				name: "英文名",
				plahth: "Given name 如XIAOLAN",
				value:""
			},//英文名
			englishname_list:[{
				t_name: "englishname",
				name: "身份证",
				plahth: "请确保姓名和证件号码与证件一致",
				value:"",
				val:"NI",
				id:"",
				delFlag: ""
			}],//身份证
			gender_list:{
				t_name: "gender",
				name: "性别",
				plahth: "请选择性别",
				value:"",
				val:""
			},//性别
			dateofbirth_lsit:{
				t_name: "dateofbirth",
				name: "出生日期",
				plahth: "请选择出生日期",
				value:""
			},//出生日期
			shos: false,
			blac_show: false,
			cd_idlist: 0,//当前的证件个数
			op_idval: "",
			op_ids: "",//当前点击的证件下标
			isadd: true,//是否是新增
			delete_list: [],//存储删除的值
			passengerId: null
		}
	},
	components:{
		yudata
	},
	mounted(){
	},
	methods:{
		namezh_left(){
			if(this.englishsurname_lsit.value == ""){
				if(this.utils.zzNamezh(this.firstNameZh_list.value) == false){
					this.englishsurname_lsit.value = py.chineseToPinYin(this.firstNameZh_list.value)
				}
			}
		},
		namezh_right(){
			if(this.engs_list.value == ""){
				if(this.utils.zzNamezh(this.lastNameZh_list.value) == false){
					this.engs_list.value = py.chineseToPinYin(this.lastNameZh_list.value)
				}
			}
		},
		async add_user(){ //新增
			let _this = this;
			let phonenumbe = _this.phonenumbe_list.value ; //电话号码
			let firstNameZh = _this.firstNameZh_list.value; //中文姓
			let lastNameZh = _this.lastNameZh_list.value;//中文名
			let englishsurname = _this.englishsurname_lsit.value; //英文姓
			let engs = _this.engs_list.value;//英文名
			let englishname = _this.englishname_list;//证件照1
			let gender = _this.gender_list.val;//性别
			let dateofbirth = _this.dateofbirth_lsit.value;//出生日期
			if(this.utils.zzPhone(phonenumbe)){
				_this.showToasts("手机号格式不对!");
			} else if(firstNameZh == "" || lastNameZh == ""){
				_this.showToasts("姓名不能为空!");
			} else if(gender == ""){
				_this.showToasts("性别不能为空!");
			} else if(dateofbirth == ""){
				_this.showToasts("出生日期不能为空!");
			} else {
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
							delFlag :0,
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
					if(_this.isadd == false){ //修改
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
					} else {
						newdata = cdlist
					}
					let daw = {
						firstNameZh: firstNameZh,//中文姓
						lastNameZh: lastNameZh,//中文名
						phone: phonenumbe,//电话
						firstName: englishsurname,//英文姓
						lastName: engs,//英文名
						certificateList: newdata,//证件
						birthdateStr: dateofbirth,//生日
						gender: gender,//性别
						id: _this.passengerId,
					}
					
					try{
						let datw = await Mydi.saveTemporary(daw);
						
						if(datw.code == 200){
							_this.showToasts(datw.message);
							setTimeout(()=>{
								uni.navigateBack({
									url: '../frequenttravellers',
								});
							}, 500)
						} else {
							 _this.showToasts(datw.message);
						}
					}catch(e){
						console.log(e)
						
					}
				}
			}

		},
		addfast(){//新增证件信息
			let _this = this
			let le = _this.englishname_list;//当前证件
			if (le.length >= _this.id_list.length){
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
		de_icd(item,index){ //删除当前证件
			let _this = this
			if(_this.isadd == false){
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
			} else {
				_this.englishname_list.splice(index,1);//删除当前证件
			}
		},
		toggleTab(item, index) { //出生日期
			this.$refs.dateTime.show();
		},
		onConfirm(ts){ //赋值出生日期
			let date = ts.selectArr
			this.dateofbirth_lsit.value = date[0] + "-" + date[1] + "-" + date[2]
		},
		roblak(){//返回
		// #ifdef  APP-PLUS
		uni.navigateBack({
		})
		// #endif
		// #ifdef  H5 || MP-WEIXIN
			uni.navigateTo({
				url: '../frequenttravellers',
			});
		// #endif
		},
		ad_cion(item,index){//点击证件
			let name = this.icontest;//获取当前选择的名字
			if(name == 'englishname'){
				this.op_idval = item.name
				this.englishname_list[this.op_ids].val = item.code
				this.englishname_list[this.op_ids].name = this.op_idval
			} else if(name == "gender"){
				this.op_idval = item.name
				this.gender_list.val = item.id
				this.gender_list.value = this.op_idval
			}
			this.isshow();//关闭
		},
		name_btn(name,index){ //弹出下拉框
			this.icontest = name;
			if(index >= 0){ //证件信息
				this.op_ids = index
			}
			if(name == 'dateofbirth'){
				this.le_name = "";
				this.$refs.dateTime.show();
			}else {
				if(name == 'englishname'){
					this.op_idval = this.englishname_list[this.op_ids].name
					this.le_name = "证件类型"
				} else if(name == "gender"){
					this.op_idval = this.gender_list.value
					this.le_name = "性别"
				} else if (name == "dateofbirth"){
					this.le_name = "出生日期"
				}
				
				this.blac_show = true
				this.shos = true
			}
		},
		isshow(){
			this.shos = false
			this.blac_show = false
		},
		depd_d(id,name){ //修改页面显示
			let _this = this;
			if(name == "gender"){
				for (var i = 0; i < _this.genderlist.length; i++) {
					if(id == _this.genderlist[i].id){
						return {
							t_name: "role",
							name: "性别",
							plahth: "请选择性别",
							value:_this.genderlist[i].name,
							val:_this.genderlist[i].id
						}
					}
				}
			} else if(name == "certi"){
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
			}
		}
	},
	onLoad: function (option) { //判断是新增还是修改
		let _this = this;
		let cd_list = JSON.parse(option.catlist);
		if(option.userlist){
			let userlists = JSON.parse(option.userlist);
			uni.setNavigationBarTitle({
				title:"编辑旅客"
			});
			this.hasadd_modf = "tms:pas:update";
			this.isadd == false
			_this.id_list = cd_list;//获取证件列表
			_this.phonenumbe_list.value = userlists.phone; //电话号码
			_this.firstNameZh_list.value = userlists.firstNameZh; //中文姓
			_this.lastNameZh_list.value = userlists.lastNameZh;//中文名
			_this.englishsurname_lsit.value = userlists.firstName; //英文姓
			_this.engs_list.value = userlists.lastName;//英文名
			_this.dateofbirth_lsit.value = userlists.birthdateStr;//出生日期
			_this.updata = userlists.birthdateStr;//设置默认日期
			_this.newdata = false;
			_this.passengerId = userlists.id;//获取旅客id
			_this.englishname_list = _this.depd_d(userlists.certificateList,"certi");//证件照1
			_this.gender_list = _this.depd_d(userlists.gender,"gender");//性别
		} else {
			this.isadd == true
			uni.setNavigationBarTitle({
				title:"新增旅客"
			});
			this.hasadd_modf = "tms:pas:add";
			_this.id_list = cd_list;//获取证件列表
		}
	}
}
</script>

<style lang="scss" scoped>
.add_coll {
	width: 100%;
	.black_mu {
		position: fixed;
		width: 100%;
		height: 100%;
		background: black;
		opacity: 0.5;
		z-index: 888;
	}
	.userlist {
		position: absolute;
		display: none;
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
			font-size: 30upx;
			height: 90upx;
			width: 100%;
			line-height: 90upx;
			text-align: center;
			background: #f1f1f1;
			color: #c8c7cc;
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
			.addstyle {
				text-align: right;
				font-size: 30upx;
				color: $uni-color-primary;
			}
		}
	}
	.show {
		-webkit-transform: translateY(0);
		transform: translateY(0);
		display: block;
	}
	.add_cd{
		width: calc(100% - 20upx);
		text-align: right;
		padding-right: 20upx;
		color: $uni-color-primary;
		font-size: 20upx;
		line-height: 60upx;
	}
	.add_ul {
		font-size: 30upx;
		line-height: 90upx;
		background: #ffffff;
		margin-bottom: 15upx;
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
					width: 160upx;
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
		}
	}
	.add_uls {
		font-size: 30upx;
		line-height: 90upx;
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
	.addstyle {
		color: $uni-color-primary;
		text-align: right;
		font-size: 25upx;
		line-height: 35upx;
		margin-bottom: 15upx;
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
			background: linear-gradient(to right, #4E92FD 0%,#6E46FE 100%);
		}
	}
}
</style>
