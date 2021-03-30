import fly from '../untils/fly.js'; // 引入fly.js文件

export default {
	// getNpm
	getRefundChangeRule: (params) => { //飞机退改规则
		return fly.post('/tms/api/dps/airline/getRefundChangeRule', params);
	},
	currentUserEnterprise: (params) => { //公司信息列表
		return fly.post('/tms/api/user/currentUserEnterprise', params);
	},
	changeEnterprise: (params) => { //修改当前员工所属公司
		return fly.post('/tms/api/user/changeEnterprise', params);
	},
	getPlatFormUseCar: (params) => { //获取用车平台
		return fly.get('/tms/api/use/car/getPlatFormUseCar', params);
	},
	getUseCarType: (params) => { //获取用车车型
		return fly.get('/tms/api/use/car/getUseCarType', params);
	},
	getUseCarEstimatedCost: (params) => { //用车费用预估
		return fly.post('/tms/api/use/car/getUseCarEstimatedCost', params);
	},
	createUseCarOrder: (params) => { //用车下单
		return fly.post('/tms/api/use/car/createUseCarOrder', params);
	},
	checkUseCarRule: (params) => { //用车费用违规判断
		return fly.post('/tms/api/use/car/checkUseCarRule', params);
	},
	hasOutstandingOrder: (params) => { //有无正在进行的订单
		return fly.get('/tms/api/useCar/order/hasOutstandingOrder', params);
	},
	flightlist: (params) => { //获取全球包机
		return fly.get('/tms/api/charter/flight/list', params);
	},
	flightbook: (params) => { //获取全球包机值
		return fly.get('/tms/api/charter/flight/book', params);
	},
	cruiselist: (params) => { //获取豪华邮轮
		return fly.get('/tms/api/cruise/list?code=CRU', params);
	},
	cruisesave: (params) => { //预定豪华邮轮
		return fly.get('/tms/api/cruise/save', params);
	},
	micesave: (params) => { //会议定制
		return fly.get('/tms/api/mice/save', params);
	},
	hotelsave: (params) =>{ //酒店
		return fly.post('/tms/api/require/submitHolRequire',params);
	},
	domesticketsave:(params) =>{//国内机票
			return fly.post('/tms/api/dps/require/addRequire',params)
		},
	queryNotifys: (params) => { //获取首页轮播图片
		return fly.get('/tms/api/gbc/queryNotifys', params);
	},
	searchMySelfHotelOrderList: (params) => { //获取酒店我的行程和历史行程
		return fly.post('/tms/api/hotel/order/searchMySelfHotelOrderList', params);
	},
	queryMyselfOrders: (params) => { //获取火车机票我的行程和历史行程
		return fly.post('/tms/api/order/queryMyselfOrders', params);
	},
	getChangeInfoBySaleDetailNo: (params) => { //获取火车票最新数据
		return fly.get('/tms/api/train/getChangeInfoBySaleDetailNo', params);
	},
	getContactInfo: (params) => { //获取下单联系人
		return fly.get('/tms/api/user/getContactInfo', params);
	},
	getApprvListCount: (params) => { //获取待审数量
		return fly.get('/tms/api/apprv/getApprvListCount', params);
	},
	getCityDetail: (params) => { //获取城市酒店信息
		return fly.get('/tms/api/city/getCityDetail', params);
	},
	getCostCenterList: (params) => { //获取成本中心列表
		return fly.post('/tms/api/cpsuser/getCostCenterList', params);
	},
	getStaffList: (params) => { //获取审批人
		return fly.post('/tms/api/apprv/getStaffList', params);
	},
	saveApprv: (params) => { //提交申请
		return fly.post('/tms/api/apprv/saveApprv', params);
	},
	getApplyList: (params) => { //我的申请列表
		return fly.post('/tms/api/apprv/getApplyList', params);
	},
	detailApply: (params) => { //申请审批详情
		return fly.get('/tms/api/apprv/detailApply', params);
	},
	getApprvList: (params) => { //审批列表
		return fly.post('/tms/api/apprv/getApprvList', params);
	},
	apprvTask: (params) => { //进行审批操作
		return fly.post('/tms/api/apprv/apprvTask', params);
	},
	sortHotelList: (params) => { //酒店查询
		return fly.post('/tms/api/hotel/sortHotelList', params);
	},
	toHotelDetail: (params) => { //酒店详情
		return fly.post('/tms/api/hotel/toHotelDetail', params);
	},
	hotelProList: (params) => { //房型查询
		return fly.post('/tms/api/hotel/hotelProList', params);
	},
	getCityNames: (params) => { //酒店名称查询
		return fly.get('/tms/api/hotel/getCityNames', params);
	},
	searchHotelPicture: (params) => { //酒店图片
		return fly.post('/tms/api/hotel/searchHotelPicture', params);
	},
	checkHotelRules: (params) => { //预定酒店判断差旅规则
		return fly.post('/tms/api/hotel/checkHotelRules', params);
	},
	toZHXBook: (params) => { //酒店价格校验 中航信
		return fly.post('/tms/api/hotel/toZHXBook', params);
	},
	toELONGBook: (params) => { //酒店价格校验 艺龙
		return fly.post('/tms/api/hotel/toELONGBook', params);
	},
	toYYOUBook: (params) => { //酒店价格校验 云龙
		return fly.post('/tms/api/hotel/toYYOUBook', params);
	},
	toHuazhuBook: (params) => { //酒店价格校验 华住
		return fly.post('/tms/api/hotel/toHuazhuBook', params);
	},
	toJinJiangBook: (params) => { //酒店价格校验 景江
		return fly.post('/tms/api/hotel/toJinJiangBook', params);
	},
	toYaduoBook: (params) => { //酒店价格校验 雅朵
		return fly.post('/tms/api/hotel/toYaduoBook', params);
	},
	toHomeInnsBook: (params) => { //酒店价格校验 如家
		return fly.post('/tms/api/hotel/toHomeInnsBook', params);
	},
	toOwnBook: (params) => { //酒店价格校验 腾邦
		return fly.post('/tms/api/hotel/toOwnBook', params);
	},
	getHotelBrokerage: (params) => { //酒店单人手续费
		return fly.get('/tms/api/hotel/getHotelBrokerage', params);
	},
	hotelBook: (params) => { //酒店预定下单
		return fly.post('/tms/api/hotel/hotelBook', params);
	},
	getPassengerCreditCard: (params) => { //获取信用卡信息
		return fly.get('/tms/api/creditCard/getPassengerCreditCard', params);
	},
	checkElongBookOrder: (params) => { //艺龙规则查询
		return fly.post('/tms/api/hotel/checkElongBookOrder', params);
	},
	searchTrains: (params) => { //火车搜索
		return fly.post('/tms/api/train/searchTrains', params);
	},
	trainWs: (params) => { //火车经停站
		return fly.post('/tms/api/train/trainWs', params);
	},
	checkTrainRule: (params) => { //火车规则检验
		return fly.post('/tms/api/train/checkTrainRule', params);
	},
	queryFlightPlanByCity: (params) => { //航班动态查询 机场三字码
		return fly.post('/tms/api/basedata/flightDynamics/queryFlightPlanByAirPort', params);
	},
	queryFlightByFnum: (params) => { //航班动态查询 航班号
		return fly.post('/tms/api/basedata/flightDynamics/queryFlightByFnum', params);
	},
	bookTrain: (params) => { //火车预定下单
		return fly.post('/tms/api/train/bookTrain', params);
	},
	getBrokerage: (params) => { //火车票单人手续费
		return fly.get('/tms/api/train/getBrokerage', params);
	},
	getAgreeApprvTask: (params) => { //出差预定
		return fly.get('/tms/api/apprv/getAgreeApprvTask', params);
	},
	getPnrPriceInfor: (params) => { //获取p价
		return fly.post('/tms/api/dps/book/getPnrPriceInfor', params);
	},
	bookTicket: (params) => { //飞机下单
		return fly.post('/tms/api/dps/book/bookTicket', params);
	},
	applySaleChange: (params) => { //飞机改签提交申请
		return fly.post('/tms/api/internal/change/order/applySaleChange', params);
	},
	getCompCustomerInfo: (params) => { //飞机政府采购
		return fly.get('/tms/api/cpsuser/getCompCustomerInfo', params);
	},
	geocoder: (params) => { //逆地址解析
		return fly.get('/tms/api/use/car/map/geocoder/v1', params);
	},
	direction: (params) => { //路线规划
		return fly.get('/tms/api/use/car/map/direction/v1/driving', params);
	},
	placesearch: (params) => { //地点搜索
		return fly.get('/tms/api/use/car/map/place/v1/search', params);
	},
	placesuggestion: (params) => { //关键字提示搜索
		return fly.get('/tms/api/use/car/map/place/v1/suggestion', params);
	},
}
