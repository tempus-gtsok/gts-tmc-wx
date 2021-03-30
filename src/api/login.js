
import fly from '../untils/fly.js';   // 引入fly.js文件
 
export default{
	noSecret:(params)=>{ //钉钉免登
	    return fly.get('/tms/api/ding/login/noSecret',params);
	},
	bindWxOpenId:(params)=>{ //微信绑定
	    return fly.post('/tms/api/user/bindWxOpenId',params);
	},
	unBindWxOpenId:(params)=>{ //微信解绑
	    return fly.get('/tms/api/user/unBindWxOpenId',params);
	},
	openIdLogin:(params)=>{ //openId登录
	    return fly.post('/tms/api/user/openIdLogin',params);
	},
	getAndroidAppBaseData:(params)=>{ //app获取版本
	    return fly.get('/tms/api/baseData/base/getAndroidAppBaseData',params);
	},
	getWxConfig:(params)=>{ //获取微信用户信息
	    return fly.get('/weixin/oauth/getWxConfig',params);
	},
	getenv:(params)=>{ //获取环境变量成功
	    return fly.get('/tms/api/env/getenv',params);
	},
	getEnvForWxa:(params)=>{ //小程序获取环境变量
		return fly.get('/tms/api/env/getEnvForWxa',params);
	},
	getcode:(params)=>{ //获取微信用户信息
	    return fly.get('/weixin/oauth/getWxUserInfoByCode',params);
	},
	getAppletscode:(params)=>{ //获取微信小程序用户信息
		return fly.get('/weixin/oauth/getWxaUserInfoByCode',params);
	},
    login:(params)=>{ //手机号登录
        return fly.post('/tms/api/user/login',params);
    },
	accountlogin:(params)=>{ //账号密码登录
	    return fly.post('/tms/api/user/phonePwdLogin',params);
	},
	findPassword:(params)=>{ //找回密码
	    return fly.post('/tms/api/user/findPassword',params);
	},
	register:(params)=>{//注册
		/*fly.config.headers = {
			'content-type': 'application/x-www-form-urlencoded'
		}*/
		return fly.post('/tms/api/xcx/register/register',params);
	},
	getCode:(params)=>{// 获取验证码
		return fly.get('/tms/api/xcx/register/getCode',params,);
	},
	vess_code: (params)=>{ //获取验证码
		return fly.get('/tms/api/user/cerificationCode',params);
	},
	change_phone:(params)=>{ //修改手机号
	    return fly.post('/tms/api/user/changePhone',params);     
	},
	customer_Name:(params)=>{ //修改公司
	    return fly.post('/tms/api/user/QuitCompany',params);    
	},
	TraverPolicy:(params)=>{ //政策
	    return fly.post('/tms/api/user/getTraverPolicy',params);     
	},
	accountlogins:(params)=>{ //钉钉登录
	    return fly.get('/third/api/user/accountlogin',params);     
	},
}
