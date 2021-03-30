import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({  
    state: { //定义全局变量
		loading: false,
		getMenuBtnList:[],//权限列表
		token_succ: {},//微信公众号token
		//因公出行城市
		vx_city_left: [{name: '',id: ''},{name:'',id: ''}],//搜索出行机票出发城市
		tr_city_left: [{name: '北京',id: 'beijing'},{name:'上海',id: 'shanghai'}],//搜索出行火车出发城市
		wx_Hotel: {id:"beijing",name:"北京",ts:false},//搜索出行酒店城市
		wx_hotels: '',//搜索出行酒店地址
		longitudelatitude: [],//经度纬度
		singleDate: true,//单双程
		se_Singletime: {},//搜索单程时间
		se_doubletimel: {},//搜索往返时间
		se_doubletimer: {},//搜索往返时间
		pass_list_arr:[],//被选中的旅客姓名
		butaluserlist:[],//搜索出差人员
		go_there:[],//往返 
		goName:0,//往返的值0是去，1是返回
		Dedescription: '',//详细说明
        userinfo: {},//用户信息
		user_token: "",//用户唯一token
    },  
    mutations: {   //方法
		showLoading(state, show) {
			state.loading = show;
	    },
		go_there_add(state, provider){
			state.go_there = provider;
		},
		goName_add(state, provider){
			state.goName = provider;
		},
		longitudelatitude_add(state, provider){
			state.longitudelatitude = provider;
		},
		singleDate_add(state, provider){
			state.singleDate = provider;
		},
		se_Singletime_add(state, provider){
			state.se_Singletime = provider;
		},
		se_doubletimel_add(state, provider){
			state.se_doubletimel = provider;
		},
		se_doubletimer_add(state, provider){
			state.se_doubletimer = provider;
		},
		Dedescription_add(state, provider){
			state.Dedescription = provider;
		},
		Reasonsfor_add(state, provider){
			state.Reasonsfor = provider;
		},
		token_succ_add(state, provider){
			state.token_succ = provider || '';
		},
		butaluserlist_add(state, provider){
			state.butaluserlist = provider
		},
		pass_list(state, provider){ //修改旅客人数
			state.pass_list_arr = provider
		},
		//搜索出行机票火车酒店城市
		vx_city_le_add(state, provider){
			state.vx_city_left = provider;
		},
		tr_city_left_add(state, provider){
			state.tr_city_left = provider;
		},		
		wx_Hotel_Ai(state, provider){
			state.wx_Hotel = provider
		},
		wx_hotels_Ai(state, provider){
			state.wx_hotels = provider
		},
		userTokenAi(state, provider){ //登录信息
			state.user_token = provider || '';
			uni.setStorageSync("user_list"+ uni.getStorageSync('appWxId'),provider);
		},
        user_infos(state, provider) {  //个人用户信息
            state.userinfo = provider || '';
			uni.setStorageSync("userinfo"+ uni.getStorageSync('appWxId'),provider);
        },  
        logout(state) {  //登出
			uni.removeStorageSync("user_list"+ uni.getStorageSync('appWxId'))
			uni.removeStorageSync("userinfo"+ uni.getStorageSync('appWxId'))
			uni.removeStorageSync("app_wxAppId"+ uni.getStorageSync('appWxId'))
			uni.removeStorageSync("app_w_id")
			// uni.clearStorageSync();
        }
    }  
})  
export default store