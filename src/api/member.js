
import fly from '../untils/fly.js';   // 引入fly.js文件
 
export default{
	getMember:(params)=>{ //获取用户的会员权益信息
	    return fly.get('/tms/api/user/getMemberBySessionId',params);     //get方式调取http://***/login
	},
	getUserInfo:(params)=>{ //获取用户的会员权益信息
	    return fly.get('/tms/api/user/getUserInfoBySessionId',params);     //get方式调取http://***/login
	}
}
