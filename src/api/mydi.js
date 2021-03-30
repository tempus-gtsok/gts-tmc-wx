
import fly from '../untils/fly.js';   // 引入fly.js文件
 
export default{
    changePassword:(params)=>{ //修改当前用户密码
        return fly.post('/tms/api/user/changePassword',params);     //get方式调取http://***/login
    },
	username:(params)=>{ //获取用户信息
	    return fly.post('/tms/api/user/getUserInfo',params);     //get方式调取http://***/login
	},
	alldepartments:(params)=>{ //查询所有部门
		 return fly.post('/tms/api/cpsuser/getDeptAndUserCount',params);
	},
	searchpartments:(params)=>{//查询部门下所有的人
		return fly.post('/tms/api/cpsuser/getDeptAndUserList',params);
	},
	querycolleagueinformation:(params)=>{//查询新增同事需要的必要信息
		return fly.post('/tms/api/user/addPassengerForCustomer',params);
	},
	savePassengerForCustome:(params)=>{//新增修改同事
		return fly.post('/tms/api/user/savePassengerForCustomer',params);
	},
	getPassengerLis:(params)=>{//查询常用旅客
		return fly.post('/tms/api/user/getPassengerList',params);
	},
	getMailAddressLis:(params)=>{//查询常用地址
		return fly.get('/tms/api/user/getMailAddressList',params);
	},
	deleteTemporary:(params)=>{//删除常用旅客
		return fly.post('/tms/api/user/deleteTemporary',params);
	},
	deleteMailAddres:(params)=>{//删除常用地址
		return fly.post('/tms/api/user/deleteMailAddress',params);
	},
	saveTemporary:(params)=>{//新增修改常用旅客
		return fly.post('/tms/api/user/saveTemporary',params);
	},
	getRoleList:(params)=>{//查询角色列表
		return fly.post('/tms/api/cpsuser/getRoleList',params);
	},
	getPermission:(params)=>{//查询当前角色权限
		return fly.get('/tms/api/cpsuser/getPermission',params);
	},
	getUserPermission:(params)=>{//获取当前用户权限
		return fly.get('/tms/api/user/getUserPermission',params);
	},
	addOrUpdateRole:(params)=>{//修改新增当前角色权限
		return fly.post('/tms/api/cpsuser/addOrUpdateRole',params);
	},
	getPassengerListNoCertificate:(params)=>{//查询常用旅客
		return fly.post('/tms/api/user/getPassengerList',params);
	},
	cancelTask:(params)=>{//申请单撤回
		return fly.post('/tms/api/apprv/cancelTask',params);
	},
	getPassengerListByNos:(params)=>{//获取当前旅客的信息
		return fly.post('/tms/api/user/getPassengerListByNos',params);
	},
	updateLoginHeadImg:(params)=>{//修改个人头像
		return fly.get('/tms/api/user/updateLoginHeadImg',params);
	}
}