
import fly from '../untils/fly.js';   // 引入fly.js文件
 
export default{
    // get
	updatePassengerCertificateList:(params)=>{//添加证件
		return fly.post('/tms/api/user/updatePassengerCertificateList',params); 
	},
	newcommonadd:(params)=>{//添加地址
		return fly.post('/tms/api/user/addOrUpdateMailAddress',params); 
	},
	searchAirlineAJAX:(params)=>{//机票查询
		return fly.post('/tms/api/dps/airline/searchAirlineAJAX',params); 
	},
	queryAirlineList:(params)=>{//国内航司查询
		return fly.post('/tms/api/dps/airline/queryAirlineList',params); 
	},
	ruleCheck:(params)=>{//机票校验
		return fly.post('/tms/api/dps/airline/ruleCheck',params); 
	},
	ruleCheckRepeatBook:(params)=>{//重复预订规则超规校验
		return fly.post('/tms/api/dps/airline/ruleCheckRepeatBook',params); 
	},
	toBook:(params)=>{//保险
		return fly.get('/tms/api/dps/book/toBook',params); 
	},
	getTravelPolicy:(params)=>{//保险规则判断
		return fly.get('/tms/api/basedata/travelPolicy/getTravelPolicy',params); 
	},
	getPlaneStop:(params)=>{//查询经停航班
		return fly.get('/tms/api/dps/airline/getPlaneStop',params); 
	},
}