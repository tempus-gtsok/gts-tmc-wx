<template>
	<view class="add_coll">
		<loading>
		</loading>
		<view class="black_mu" @click="isshow" v-if="blac_show"></view>
		<view class="sft" :class="shos ? 'show' : ''">
			<view class="userlist" :class="shos ? 'show' : ''">
				<view class="userlist_top">
					请选择{{ le_name }}
				</view>
				<view class="ci_list" v-if="shos">
					<view class="cl_val" v-for="(item, index) in id_list" :key="index" @click="ad_cion(item, index)" v-if="icontest == 'englishname'">
						<view>{{ item.name }}</view>
						<view class="ok_ioc" v-if="englishname_list[op_ids].val == item.code"><text class="iconfont" style="color:#007aff;">&#xe60b;</text></view>
					</view>
					<view class="cl_val" v-for="(item, index) in genderlist" :key="index" @click="ad_cion(item, index)" v-if="icontest == 'gender'">
						<view class="">{{ item.name }}</view>
						<view class="ok_ioc" v-if="gender_list.val == item.id"><text class="iconfont" style="color:#007aff;">&#xe60b;</text></view>
					</view>
					<view class="cl_val" v-for="(item, index) in departs" :key="index" @click="ad_cion(item, index)" v-if="icontest == 'department'">
						<view class="">{{ item.name }}</view>
						<view class="ok_ioc" v-if="department_list.val == item.id"><text class="iconfont" style="color:#007aff;">&#xe60b;</text></view>
					</view>
					<view class="cl_val" v-for="(item, index) in positionlist" :key="index" @click="ad_cion(item, index)" v-if="icontest == 'position'">
						<view class="">{{ item.tslName}}</view>
						<view class="ok_ioc" v-if="position_list.val == item.tslId"><text class="iconfont" style="color:#007aff;">&#xe60b;</text></view>
					</view>
					<view class="cl_val" v-for="(item, index) in rolelist" :key="index" @click="ad_cion(item, index)" v-if="icontest == 'role'">
						<view class="">{{ item.name }}</view>
						<view class="ok_ioc" v-if="role_list.val == item.id"><text class="iconfont" style="color:#007aff;">&#xe60b;</text></view>
					</view>
					<view class="cl_val" v-for="(item, index) in statelist" :key="index" @click="ad_cion(item, index)" v-if="icontest == 'state'">
						<view class="">{{ item.name }}</view>
						<view class="ok_ioc" v-if="state_list.val == item.id"><text class="iconfont" style="color:#007aff;">&#xe60b;</text></view>
					</view>
				</view>
			</view>
		</view>
		<headnavigation :titles="titles"></headnavigation>
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
					<view class="opls"><input maxlength="4" type="text" @blur="namezh_left()" id="for_ints" v-model="firstNameZh_list.value" :placeholder="firstNameZh_list.plahth" /></view>
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
					<view class="opls"><input maxlength="6" type="text"  @blur="namezh_right()" id="for_ints" v-model="lastNameZh_list.value" :placeholder="lastNameZh_list.plahth" /></view>
				</view>
			</view>
		</view>
		<view class="add_ul">
			<view class="apl_ok">
				<view class="frop_left">
					<text class="iconfont f_icon_left">&#xe65c;</text>
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
					<text class="iconfont f_icon_left">&#xe65c;</text>
					<view class="apl_name">{{ engs_list.name }}</view>
				</view>
				<view class="frop_pls">
					<view class="opls"><input type="text" id="for_ints" v-model="engs_list.value" :placeholder="engs_list.plahth" /></view>
				</view>
			</view>
		</view>
		<view class="sts">
			<view class="add_uls" v-for="(item, index) in englishname_list" v-if="item.delFlag != 1" :key="index">
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
		<view class="add_ul">
			<view class="apl_ok">
				<view class="frop_left">
					<text class="iconfont f_icon_lefts">&#xe65c;</text>
					<view class="apl_name">{{ mailbox_list.name }}</view>
				</view>
				<view class="frop_pls">
					<view class="opls"><input type="text" id="for_ints" v-model="mailbox_list.value" :placeholder="mailbox_list.plahth" /></view>
				</view>
			</view>
		</view>
		<view class="add_ul" @click="name_btn('department')">
			<view class="apl_ok">
				<view class="frop_left">
					<text class="iconfont f_icon_left">&#xe65c;</text>
					<view class="apl_name">{{ department_list.name }}</view>
				</view>
				<view class="frop_pls">
					<view class="opls">
						<view class="" v-if="department_list.value == ''">{{ department_list.plahth }}</view>
						<view class="for_value" v-if="department_list.value !== ''">{{ department_list.value }}</view>
					</view>
				</view>
				<view class="frop_right"><view class="iconfont">&#xe8a3;</view></view>
			</view>
		</view>
		<view class="add_ul" @click="approval()">
			<view class="apl_ok">
				<view class="frop_left">
					<text class="iconfont f_icon_left">&#xe65c;</text>
					<view class="apl_name">成本中心:</view>
				</view>
				<view class="frop_pls">
					<view class="opls">
						<view class="for_value" >{{NameCenter.name}}</view>
					</view>
				</view>
				<view class="frop_right"><view class="iconfont">&#xe8a3;</view></view>
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
					<view class="ulsk_list" @click="slcikd(item.id)" :class="slid == item.id? 'cked':''" v-for="(item,index) in ullist" :key="index">
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
		<view class="add_ul" @click="name_btn('position')">
			<view class="apl_ok">
				<view class="frop_left">
					<text class="iconfont f_icon_left">&#xe65c;</text>
					<view class="apl_name">{{ position_list.name }}</view>
				</view>
				<view class="frop_pls">
					<view class="opls">
						<view class="" v-if="position_list.value == ''">{{ position_list.plahth }}</view>
						<view class="for_value" v-if="position_list.value !== ''">{{ position_list.value }}</view>
					</view>
				</view>
				<view class="frop_right"><view class="iconfont">&#xe8a3;</view></view>
			</view>
		</view>
		<view class="add_ul" @click="name_btn('role')" v-if="state_list.value == '使用中'">
			<view class="apl_ok">
				<view class="frop_left">
					<text class="iconfont f_icon_left">&#xe65c;</text>
					<view class="apl_name">{{ role_list.name }}</view>
				</view>
				<view class="frop_pls">
					<view class="opls">
						<view class="" v-if="role_list.value == ''">{{ role_list.plahth }}</view>
						<view class="for_value" v-if="role_list.value !== ''">{{ role_list.value }}</view>
					</view>
				</view>
				<view class="frop_right"><view class="iconfont">&#xe8a3;</view></view>
			</view>
		</view>
		<view class="add_ul">
			<view class="apl_ok">
				<view class="frop_left">
					<text class="iconfont f_icon_lefts">&#xe65c;</text>
					<view class="apl_name">{{ employeephotos_list.name }}</view>
				</view>
				<view class="frop_pls">
					<view class="ol_pth">
						<view class="olleft" @click="ft_click">
							<image style="width: 100%;height: 100%;" :src="to_src" mode="" v-if="to_src != ''"></image>
							<view v-if="to_src == ''" class="pfls"><view class="iconfont" style="color: #007aff;font-size: 50upx;">&#xe632;</view></view>
						</view>
						<view class="olright">{{ employeephotos_list.plahth }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="add_ul" @click="name_btn('state')">
			<view class="apl_ok">
				<view class="frop_left">
					<text class="iconfont f_icon_lefts">&#xe65c;</text>
					<view class="apl_name">{{ state_list.name }}</view>
				</view>
				<view class="frop_pls">
					<view class="opls">
						<view class="" v-if="state_list.value == ''">{{ state_list.plahth }}</view>
						<view class="for_value" v-if="state_list.value !== ''">{{ state_list.value }}</view>
					</view>
				</view>
				<view class="frop_right"><view class="iconfont">&#xe8a3;</view></view>
			</view>
		</view>
		<yudata @confirm="onConfirm" :endYear="year_ts" :modata="updata" startYear="1940" ref="dateTime" :current="newdata"></yudata>
		<view class="check_btn">
			<view class="chck_left" @click="roblak">取消</view>
			<view class="chck_right" @click="add_user">保存</view>
		</view>
	</view>
</template>

<script>
import tork from '@/api/torowk.js'
import Mydi from "@/api/mydi.js"
import py from "@/static/js/vue-py.js"
import yudata from '@/components/yu-datetime-picker.vue'
export default{
	data(){
		return{
			slid: 1,
			cbname:'',//成本中心名称
			cbid: '',//成本中心id
			botname: '',//当前选择的成本中心名称
			slit_id_checd:0, //当前点击成本中心的id
			NameCenter:{name: '',id: ''},
			ullist:[{
				name:'成本中心',
				id: 1
			}],
			slitlist:[],
			sli_namelist: [],
			ops_list:false,
			titles:'新增同事',
			year_ts: new Date().getFullYear(),
			updata:"",//设置默认时间
			newdata: true,//是否显示当前时间
			icontest:"",//当前点击的下拉框
			to_src: "",//头像
			setid: "",//下拉框的值
			setindes: "",//下拉框的值
			
			
			idnex_s: '',//当前点击的
			tovalue: "",//选择的类型
			le_name:"",
			departs: [],//部门
			rolelist:[],//角色
			positionlist: [],
			statelist:[{
					name:"待审核",
					ul: "audited",
					id:2,
				},{
					name:"使用中",
					ul: "inuse",
					id:1
				},{
					name:"禁用中",
					ul: "medium",
					id:0
				}],
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
			mailbox_list:{
				t_name: "mailbox",
				name: "邮箱",
				plahth: "请输入邮箱",
				value:""
			},//邮箱
			department_list:{
				t_name: "department",
				name: "部门",
				plahth: "请选择部门",
				value:"",
				val:""
			},//部门
			position_list:{
				t_name: "position",
				name: "职位",
				plahth: "请选择职位",
				value:"",
				val:""
			},//职位
			role_list:{
				t_name: "role",
				name: "角色",
				plahth: "请选择赋予同事的角色",
				value:"",
				val:""
			},//角色
			employeephotos_list:{
				t_name: "employeephotos",
				name: "员工照片",
				plahth: "便于员工间的相互认识，请上传员工照片，照片将展示在通讯录中",
				value:""
			},//员工照片
			state_list:{
				t_name: "state",
				name: "状态",
				plahth: "请选择状态",
				value:"使用中",
				val:"1"
			},//状态
			shos: false,
			blac_show: false,
			cd_idlist: 0,//当前的证件个数
			headImg:[],
			op_idval: "",
			updata_id: -1,//判断新增或修改
			userid: null,
			users_id: null,
			op_ids: "",//当前点击的证件下标
			delete_list: [],//储存被删除的值
			treeLists:[]
		}
	},
	components:{
		yudata
	},
	mounted(){
		this.selts();
		this.select_list();
	},
	methods:{
		async selts() { //查询成本中心
			let _this = this;
			try{
				let res = await tork.getCostCenterList();
				
				if (res.code == 200) {
					_this.treeLists = [];
					_this.renderTreeLists(res.data);
				} else {
					_this.showToasts(res.message);
				}
			}catch(e){
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
		clslitk(item){//点击成本中心部门
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
		},
		isshow(){ //点击弹出层
			this.ops_list = false
			this.blac_show = false;
		},
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
		ft_click(){
			let _this = this
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success:function(res){
					let Max_Size = res.tempFiles[0].size;
					if(Max_Size/1024 > 2048){
						_this.showToasts("头像大小不能高于2M")
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
							
							let data = JSON.parse(res.data);
							if(data.code == 200){
								_this.to_src = data.data;
							}
					    },
						error:(res)=>{
							this.showToasts("上传失败！",res)
						}
					});
				},
				error : function(e){
					console.log(e);
				}
			})
		},
		async add_user(){ //新增或者修改
			let _this = this;
			let phonenumbe = _this.phonenumbe_list.value ; //电话号码
			let firstNameZh = _this.firstNameZh_list.value; //中文姓
			let lastNameZh = _this.lastNameZh_list.value;//中文名
			let englishsurname = _this.englishsurname_lsit.value; //英文姓
			let engs = _this.engs_list.value;//英文名
			let englishname = _this.englishname_list;//证件照1
			let gender = _this.gender_list.val;//性别
			let dateofbirth = _this.dateofbirth_lsit.value;//出生日期
			let mailbox = _this.mailbox_list.value;//邮箱
			let department = _this.department_list.val;//部门
			let position = _this.position_list.val;//职位
			let role = _this.role_list.val;//角色
			let state = _this.state_list.val;//状态
			let to_src = _this.to_src;//头像
			let NameCenter  = _this.NameCenter;//成本中心
			if(this.utils.zzPhone(phonenumbe)){
				_this.showToasts("手机号格式不对!");
			} else if(firstNameZh == "" || lastNameZh == ""){
				_this.showToasts("姓名不能为空!");
			} else if(gender == ""){
				_this.showToasts("性别不能为空!");
			} else if(dateofbirth == ""){
				_this.showToasts("出生日期不能为空!");
			} else if(this.utils.zzMailbox(mailbox) && mailbox != ""){
				_this.showToasts("邮箱格式不对!");
			} else if(department == ""){
				_this.showToasts("部门不能为空!");
			} else if(NameCenter.id == ""){
				_this.showToasts("成本中心不能为空!");
			} else if(position == ""){
				_this.showToasts("职位不能为空!");
			} else if(state == 1 && role == ""){
				_this.showToasts("角色不能为空!");
			} else {
				if(state != 1){
					role = '';//不为使用中则清空角色
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
							delFlag :0,
							cardType: englishname[i].val,
							cardNo: englishname[i].value,
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
					if(_this.updata_id != -1){ //修改
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
						headImg:to_src,//头像
						firstNameZh: firstNameZh,//中文姓
						lastNameZh: lastNameZh,//中文名
						phone: phonenumbe,//电话
						firstName: englishsurname,//英文姓
						lastName: engs,//英文名
						deptId: department,//部门
						birthdateStr: dateofbirth,//生日
						gender: gender,//性别
						email:mailbox,//邮箱
						roleId: role,//角色
						staffLevel: position,//职位
						certificateList: newdata,//证件
						status: state,//状态
						id: _this.userid,
						userId: _this.users_id,
						costcenterId:NameCenter.id
					}
					
					try{
						let datw = await Mydi.savePassengerForCustome(daw)
						
						if(datw.code == 200){
							_this.showToasts(datw.message);
							
							setTimeout(()=>{
								uni.navigateBack({
								})
							}, 300)
							
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
			if(_this.updata_id != -1){
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
		async select_list(){ //查询新增或者修改需要的信息
			let _this = this;
			
			try{
				let datas = await Mydi.querycolleagueinformation({id: _this.updata_id});
				
				if(datas.code == 200){
					let ls = datas.data; //新增
					_this.id_list = ls.cardTypeList; //获取证件信息
					_this.departs = ls.deptList;//获取部门信息
					_this.rolelist = ls.roleList;//获取角色信息
					_this.positionlist = ls.tmsStaffLevelsResp;//获取职位信息
					_this.newdata = true
					uni.setNavigationBarTitle({ //修改页面标题
						title:"新增同事"
					});
					this.titles = "新增同事"
					if(_this.updata_id != -1){ //修改同事信息
						uni.setNavigationBarTitle({
							title:"编辑同事"
						});
						this.titles = "编辑同事"
						if(ls.passenger.headImg == null || ls.passenger.headImg == ""){
							_this.to_src = "";//头像
						} else {
							_this.to_src = ls.passenger.headImg;//头像
						}
						_this.phonenumbe_list.value = ls.passenger.phone; //电话号码
						_this.firstNameZh_list.value = ls.passenger.firstNameZh; //中文姓
						_this.NameCenter = {
							name:ls.passenger.costcenterName,
							id:ls.passenger.costcenterId
						};
						_this.lastNameZh_list.value = ls.passenger.lastNameZh;//中文名
						_this.englishsurname_lsit.value = ls.passenger.firstName; //英文姓
						_this.engs_list.value = ls.passenger.lastName;//英文名
						_this.dateofbirth_lsit.value = ls.passenger.birthdateStr;//出生日期
						_this.updata = ls.passenger.birthdateStr;//设置默认日期
						_this.newdata = false;
						_this.users_id = ls.passenger.userId;//获取用户id
						_this.userid = ls.passenger.id;//获取旅客id
						_this.mailbox_list.value = ls.passenger.email;//邮箱
						_this.gender_list = _this.depd_d(ls.passenger.gender,"gender");//性别
						if(ls.passenger.deptId != null){
							_this.department_list = _this.depd_d(ls.passenger.deptId,"dept");//部门
						}
						if(ls.passenger.staffLevel != null && ls.passenger.staffLevel != ''){
							_this.position_list = _this.depd_d(ls.passenger.staffLevel,"staff");//职位
						}
						if(ls.passenger.roleId != null){
							_this.role_list = _this.depd_d(ls.passenger.roleId,"role");//角色
						}
						_this.englishname_list = _this.depd_d(ls.passenger.certificateList,"certi");//证件照1
						_this.state_list = _this.depd_d(ls.passenger.status,"state");//状态
					}
				} else {
					_this.showToasts(datas.message);
				}
			}catch(e){
				console.log(e)
				
			}
		},
		depd_d(id,name){ //修改页面显示
			let _this = this
			if(name == "dept"){
				for (var i = 0; i < _this.departs.length; i++) {
					if(id == _this.departs[i].id){
						return {
							t_name: "department",
							name: "部门",
							plahth: "请选择部门",
							value:_this.departs[i].name,
							val: _this.departs[i].id
						}
					}
				}
			} else if(name == "staff"){
				for (var i = 0; i < _this.positionlist.length; i++) {
					console.log(1111,id ,_this.positionlist[i].tslId)
					if(id == _this.positionlist[i].tslId){
						return {
							t_name: "position",
							name: "职位",
							plahth: "请选择职位",
							value:_this.positionlist[i].tslName,
							val: _this.positionlist[i].tslId
						}
					}
				}
				return {
					t_name: "position",
					name: "职位",
					plahth: "请选择职位",
					value:'',
					val: ''
				}
			} else if(name == "role"){
				for (var i = 0; i < _this.rolelist.length; i++) {
					if(id == _this.rolelist[i].id){
						return {
							t_name: "role",
							name: "角色",
							plahth: "请选择赋予同事的角色",
							value:_this.rolelist[i].name,
							val:_this.rolelist[i].id
						}
					}
				}
			} else if(name == "gender"){
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
			} else if(name == "state"){
				for (var i = 0; i < _this.statelist.length; i++) {
					if(id == _this.statelist[i].id){
						return {
							t_name: "state",
							name: "状态",
							plahth: "请选择状态",
							value: _this.statelist[i].name,
							val: _this.statelist[i].id
						}
					}
				}
			} else if(name == "certi"){
				let datas = [];
				if(id == null || id == ""){
					datas.push({
						   t_name: "englishname",
						   name: "身份证",
						   plahth: "请确保姓名和证件号码与证件一致",
						   value:"",
						   val:"NI",
						   id:"",
						   delFlag: ""
					})
				} else {
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
				}
				return datas
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
			history.back();
		},
		ad_cion(item,index){//点击证件
			let name = this.icontest;//获取当前选择的名字
			if(name == 'englishname'){
				this.op_idval = item.name
				this.englishname_list[this.op_ids].val = item.code;
				this.englishname_list[this.op_ids].name = this.op_idval;
			} else if(name == "gender"){
				this.op_idval = item.name;
				this.gender_list.val = item.id;
				this.gender_list.value = this.op_idval;
			} else if(name == "department"){
				this.op_idval = item.name;
				this.department_list.val = item.id;
				this.department_list.value = this.op_idval;
			} else if(name == "position"){
				this.op_idval = item.tslName;
				this.position_list.val = item.tslId;
				this.position_list.value = this.op_idval;
			} else if (name == "state"){
				this.op_idval = item.name;
				this.state_list.val = item.id;
				this.state_list.value = this.op_idval;
			} else if (name == "role"){
				this.op_idval = item.name;
				this.role_list.val = item.id;
				this.role_list.value = this.op_idval;
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
				} else if(name == "department"){
					this.op_idval = this.department_list.value
					this.le_name = "部门"
				} else if(name == "position"){
					this.op_idval = this.position_list.value
					this.le_name = "职位"
				} else if (name == "state"){
					this.op_idval = this.state_list.value
					this.le_name = "状态"
				} else if (name == "dateofbirth"){
					this.le_name = "出生日期"
				} else if (name == "role"){
					this.op_idval = this.role_list.value
					this.le_name = "角色"
				}
				this.blac_show = true
				this.shos = true
			}
		},
		isshow(){
			this.shos = false;
			this.ops_list = false;
			this.blac_show = false;
		}
	},
	onLoad: function (option) {
		if(option.id){
			this.updata_id = option.id
		}
	}
}
</script>

<style lang="scss" scoped>
.add_coll {
	width: 100%;
	padding-bottom: 120upx;
	.black_mu {
		position: fixed;
		width: 100%;
		height: 100%;
		background: black;
		opacity: 0.5;
		z-index: 888;
	}
	.sft{
		position: fixed;
		display: none;
		left: 0;
		bottom: 0;
		width: 100%;
		min-height: 200upx;
		z-index: 889;
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
				line-height: 90upx;
				width: 100%;
				background: #f1f1f1;
				text-align: center;
				color: $uni-color-primary;
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
					width: 150upx;
				}
			}
			.frop_pls {
				width: 61%;
				font-size: 30upx;
				display: flex;
				color: #808080;
				align-items: center;
				.ol_pth {
					display: flex;
					padding: 20upx 0;
					align-items: center;
					.olleft {
						width: 110upx;
						height: 80upx;
						font-size: 25upx;
						overflow: hidden;
						.pfls {
							width: 100%;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
					.olright {
						margin-left: 20upx;
						width: 100%;
						line-height: 30upx;
						font-size: 25upx;
					}
				}
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
			background: $uni-color-primary;
		}
	}
}
</style>
