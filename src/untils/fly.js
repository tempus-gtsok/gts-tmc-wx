var Fly = require('flyio/dist/npm/wx');
var fly = new Fly();
import store from "store";
//配置请求基地址 
if (process.env.NODE_ENV == 'development') {
	// 开发环境
	// #ifdef H5
	fly.config.baseURL = 'http://api.test.gssok.com';
	// #endif
	// #ifdef MP-WEIXIN
	fly.config.baseURL = 'https://api.test.gssok.com';
	// #endif
	// #ifdef APP-PLUS
	fly.config.baseURL = 'https://api.test.gssok.com';
	// #endif
	uni.setStorageSync('baseURL', fly.config.baseURL);
} else {
	// 生产环境
	// #ifdef H5
	fly.config.baseURL = 'https://api.test.gssok.com';
	// #endif
	// #ifdef MP-WEIXIN
	fly.config.baseURL = 'https://api.test.gssok.com'
	// fly.config.baseURL = 'https://api.feiren.com';
	// #endif
	// #ifdef APP-PLUS
	fly.config.baseURL = 'https://api.test.gssok.com';
	// #endif
	uni.setStorageSync('baseURL', fly.config.baseURL);
}



//添加请求拦截器
fly.interceptors.request.use(request => {
	//给所有请求添加自定义header
	// let app_id = uni.getStorageSync('app_id');//获取appid
	// if (app_id) {
	// if(request.body == undefined){
	// 	request.body = {appId:app_id}
	// } else {
	// 	request.body['appId'] = app_id;
	// }
	// }
	if(request.url != '/tms/api/useCar/order/getUseCarOrderDetail' && request.url != '/tms/api/useCar/order/getDriverLocation' && request.url != '/tms/api/use/car/map/direction/v1/driving'){
		store.commit("showLoading", true); //显示
	}	
	request.headers['X-Tag'] = 'flyio';
	const data = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //关于token的用法
	if (data.token) {
		request.headers['AuthToken'] = data.token;
	}
	//可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
	return request;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
	response => {
		store.commit("showLoading", false); //隐藏
		if (response.data.code == "500") {
			
			uni.showToast({
				title: '登录失效!请重新登录',
				duration: 1000,
				icon: 'none'
			});
			setTimeout(function() {
				uni.reLaunch({
					url: '/pages/login/login?appId=' + uni.getStorageSync('wxAppids') + '&ts=1'
				})
			}, 1000);
		} else {
			return response.data; // 这里直接返回的data，再使用似可以少写次data
		}
		//只将请求结果的data字段返回
		// let errs = response;
		// // 这个是正确的状态码，根据实际情况修改
		// if(errs.data.code == "200"){

		// } else {
		// 	uni.showToast({
		// 	    title: errs.message,
		// 	    duration: 1000,
		// 		icon:'none'
		// 	});
		// 	return Promise.reject(errs.message) 
		// }
	},
	err => {
		store.commit("showLoading", false); //隐藏
		//发生网络错误后会走到这里
		let it = '';
		if (err.status == "400") {
			it = '参数错误'
		} else if (err.status == "405") {
			it = '请求类型错误'
		} else if (err.status == "404") {
			it = '请求路径错误！'
		} else if (err.status == "500") {
			it = '服务器出点小差...'
		} else {
			//it = '服务器维护中!'
			it = err.status + fly.config.baseURL
		}
		console.log(it)
		uni.showToast({
			title: it,
			duration: 1000,
			icon: 'none'
		});
	}
);

export default fly;
