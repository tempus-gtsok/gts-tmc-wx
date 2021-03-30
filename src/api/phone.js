
import fly from '../untils/fly.js';   // 引入fly.js文件
 
export default{
	vess_code: (params)=>{ //获取验证码
		return fly.get('/tms/api/user/cerificationCode',params); 
	},

}