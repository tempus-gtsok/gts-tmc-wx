import store from "store";
const PHONE = /^[1][3456789][0-9]{9}$/;//手机号码正则
const MAILBOX = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$///邮箱正则 
const URLREG = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;//网站正则
const IDCARREG = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;//身份证正则
const PASSPORT = /^[a-zA-Z0-9]{5,17}$/; //护照
const TAIWAN = /^([0-9]{8}|[0-9]{10})$/;  //台胞证
const HONGKONGCARD = /^[a-zA-Z0-9]{6,10}$/; //港澳通行
const HOMETOWN = /^[a-zA-Z]\d{8}$|^\d{15}$|^\d{17}(\d|x|X)$/;//回乡证
const NAMEZH = /^[\u4E00-\u9FA5]{1,5}$/;//中文正则
const NAMEENG = /^[a-zA-Z\/ ]{2,20}$/;//英文格式判断
let POSPATTERN = /^[a-zA-Z]+$/;//纯字母
export default {
	zzPhone(val){//手机号正则判断
		if(!PHONE.test(val)){
			return true
		} else {
			return false
		}
	},
	zzMailbox(val){//邮箱正则判断
		if(!MAILBOX.test(val)){
			return true
		} else {
			return false
		}
	},
	zzUrlrge(val){//网站正则判断
		if(!URLREG.test(val)){
			return true
		} else {
			return false
		}
	},
	zzIdcarreg(val){//身份证正则判断
		if(!IDCARREG.test(val)){
			return true
		} else {
			return false
		}
	},
	zzPassport(val){//护照正则判断
		if(!PASSPORT.test(val)){
			return true
		} else {
			return false
		}
	},
	zzTaiwan(val){//台胞证正则判断
		if(!TAIWAN.test(val)){
			return true
		} else {
			return false
		}
	},
	zzTaiwan(val){//中文正则判断
		if(!TAIWAN.test(val)){
			return true
		} else {
			return false
		}
	},
	zzHongkongcard(val){//港澳通行证正则判断
		if(!HONGKONGCARD.test(val)){
			return true
		} else {
			return false
		}
	},
	zzNamezh(val){//中文正则判断
		if(!NAMEZH.test(val)){
			return true
		} else {
			return false
		}
	},
	zzNameeng(val){//英文正则判断
		if(!NAMEENG.test(val)){
			return true
		} else {
			return false
		}
	},
	zzPospattern(val){
		if(!POSPATTERN.test(val)){
			return true
		} else {
			return false
		}
	},
	
	getRequest: function() {//截取浏览器参数
		let str = window.location.hash.split("?")[1];
		let app_id = '';
		let appslit = {};
		if (str != undefined) {
			if (str.indexOf('&') >= 0) {
				let scv = str.split('&')
				for (var i = 0; i < scv.length; i++) {
					var scvs = scv[i].split("=");
					appslit[scvs[0]] = scvs[1]
				}
				let rs = {};
				if (appslit.sessionId != null && appslit.sessionId != undefined) {
					rs['sessionId'] = appslit.sessionId
				}
				if (appslit.appId != null && appslit.appId != undefined) {
					rs['appId'] = appslit.appId
				}
				if (appslit.corpid != null && appslit.corpid != undefined) {
					rs['corpid'] = appslit.corpid
				}
				if (appslit.customerNo != null && appslit.customerNo != undefined) {
					rs['customerNo'] = appslit.customerNo
				}
				return rs
			} else {
				if (str.substring(0, 5) == 'appId') {
					return {
						'appId': str.substr(6)
					}
				}
				if (str.substring(0, 9) == 'sessionId') {
					store.commit('logout');
					return {
						'sessionId': str.substr(10)
					}
				}
			}
		} else {
			return {
				'appId': uni.getStorageSync('wxAppids')
			}
		}
	}
}
