import fly from '../untils/fly.js';   // 引入fly.js文件

export default{
    // get
	
	getUseCarEstimateData:(params)=>{ //用车预估金额查询
	    return fly.get('/tms/api/useCar/order/getUseCarEstimateData',params);
	},
	getUseCarCancelReason:(params)=>{ //用车取消原因
	    return fly.get('/tms/api/useCar/order/getUseCarCancelReason',params);
	},
	carCancelOrder:(params)=>{ //用车订单取消
	    return fly.post('/tms/api/useCar/order/carCancelOrder',params);
	},
	getDriverLocation:(params)=>{ //用车获取司机位置
	    return fly.get('/tms/api/useCar/order/getDriverLocation',params);
	},
	apprvPass:(params)=>{ //用车审核通过后 立即叫车
	    return fly.get('/tms/api/useCar/order/apprvPass',params);
	},
	searchUseCarOrderList:(params)=>{ //用车订单查询
	    return fly.post('/tms/api/useCar/order/searchUseCarOrderList',params);
	},
	getUseCarOrderDetail:(params)=>{ //用车订单详情查询
	    return fly.get('/tms/api/useCar/order/getUseCarOrderDetail',params);
	},
    queryOrders:(params)=>{ //订单查询
        return fly.post('/tms/api/order/queryOrders',params);
    },
	checkRetundAndChange:(params)=>{ //火车订单详情判断是否能退票和改签
	    return fly.get('/tms/api/train/checkRetundAndChange',params);
	},
	toTrainInfo:(params)=>{ //火车订单详情
	    return fly.get('/tms/api/train/toTrainInfo',params);
	},
	trainChangeInfoBySaleChangeNo:(params)=>{ //火车退票订单详情
	    return fly.get('/tms/api/train/trainChangeInfoBySaleChangeNo',params);
	},
	cancelSaleOrderExt:(params)=>{ //火车订单取消
	    return fly.put('/tms/api/train/cancelSaleOrderExt',params);
	},
	getOrderDetailByTranNo:(params)=>{ //飞机订单详情
	    return fly.get('/tms/api/dps/order/getOrderDetailByTranNo',params);
	},
	cancelOrder:(params)=>{ //飞机取消订单
	    return fly.get('/tms/api/dps/order/cancelOrder',params);
	},
	orderRefundApplyEdit:(params)=>{ //国内飞机退废票申请填写
	    return fly.get('/tms/api/dps/order/refurn/orderRefundApplyEdit',params);
	},
	orderRefundApplyCommit:(params)=>{ //国内飞机退废票申请提交
	    return fly.post('/tms/api/dps/order/refurn/orderRefundApplyCommit',params);
	},
	getStaffByTravelNoAndNames:(params)=>{ //改签因公查询no接口
	    return fly.post('tms/api/apprv/getStaffByTravelNoAndNames',params);
	},
	RuleMainSetting:(params)=>{ //是否需要审核信息
	    return fly.get('/tms/api/cpsuser/ruleMainSetting',params);
	},
	applyRefundTrain:(params)=>{ //火车退票
	    return fly.post('/tms/api/train/applyRefundTrain',params);
	},
	applyChangeRefundTrain:(params)=>{ //火车改签后退票
	    return fly.post('/tms/api/train/applyChangeRefundTrain',params);
	},
	judgeApprv:(params)=>{ //火车酒店退票因公是否都需要审核
	    return fly.post('/tms/api/apprv/judgeApprv',params);
	},
	applyChangeTrain:(params)=>{ //当前火车改签
	    return fly.post('/tms/api/train/applyChangeTrain',params);
	},
	trainChangeInfo:(params)=>{ //火车改签单详情
	    return fly.get('/tms/api/train/trainChangeInfo',params);
	},
	trainChangeList:(params)=>{ //火车改签列表查询
	    return fly.post('/tms/api/train/trainChangeList',params);
	},
	cancelChange:(params)=>{ //火车取消改签
	    return fly.get('/tms/api/train/cancelChange',params);
	},
	insuranceOrderDetail:(params)=>{ //保险订单详情
	    return fly.get('/tms/api/insurance/order/insuranceOrderDetail',params);
	},
	insuranceOrderCancel:(params)=>{ //保险订单退保
	    return fly.post('/tms/api/insurance/order/insuranceOrderCancel',params);
	},
	cancelErrorRefund:(params)=>{ //保险投保异常 直接退款
	    return fly.get('/tms/api/insurance/order/cancelErrorRefund',params);
	},
	cancelInsureForPerson:(params)=>{ //保险个人退保
	    return fly.post('/tms/api/insurance/order/cancelInsureForPerson',params);
	},
	refundForPerson:(params)=>{ //保险个人退款
	    return fly.post('/tms/api/insurance/order/refundForPerson',params);
	},
	insuranceCancel:(params)=>{ //保险订单取消
	    return fly.get('/tms/api/insurance/order/insuranceCancel',params);
	},
	againInsureForPerson:(params)=>{ //保险重新投保
	    return fly.post('/tms/api/insurance/order/againInsureForPerson',params);
	},
	confirmPay:(params)=>{ //h5微信支付
	    return fly.post('/tms/api/pay/confirmPay',params);
	},
	getTravelSwitch:(params)=>{ //查询出差申请的非必选模式
		return fly.post('/tms/api/apprv/getTravelSwitch',params);
	},
	queryOrderRefundList:(params)=>{ //查询国内退废列表
	    return fly.get('/tms/api/dps/order/refurn/queryOrderRefundList',params);
	},
	orderRefundDetail:(params)=>{ //查询国内退废单详情
	    return fly.get('/tms/api/dps/order/refurn/orderRefundDetail',params);
	},
	queryChangeInfo:(params)=>{ //查询国内改签票列表
	    return fly.post('/tms/api/internal/change/order/queryChangeInfo',params);
	},
	openChangeDetail:(params)=>{ //查询国内改签单详情
	    return fly.get('/tms/api/internal/change/order/openChangeDetail',params);
	},
	cancelChanges:(params)=>{ //国内机票改签取消
	    return fly.get('/tms/api/internal/change/order/cancelChange',params);
	},
	searchHotelOrderList:(params)=>{ //酒店订单查询
	    return fly.post('/tms/api/hotel/order/searchHotelOrderList',params);
	},
	searchHotelRequireList:(params)=>{ //酒店意向单查询
		return fly.post('/tms/api/require/searchHotelRequireList',params);
	},
	cancelHolRequire:(params)=>{ //酒店意向单取消
		return fly.get('/tms/api/require/cancelHolRequire',params);
	},
	intentDetails:(params)=>{ //酒店意向单详情查询
		return fly.get('/tms/api/require/toOrderDetail',params);
	},
	confirmOrder:(params)=>{ //酒店意向单确认
		return fly.post('/tms/api/require/confirmOrder',params);
	},
	toSearch:(params)=>{ //飞机意向单
		return fly.get('/tms/api/dps/require/toSearch',params);
	},
	getDetail:(params)=>{ //飞机意向单详情
		return fly.get('/tms/api/dps/require/getDetail',params);
	},
	cancel:(params)=>{ //飞机意向单取消
		return fly.get('/tms/api/dps/require/cancel',params);
	},
	requireBooking:(params)=>{ //飞机意向单确认
		return fly.post('/tms/api/dps/require/requireBooking',params);
	},
	toOrderDetail:(params)=>{ //酒店订单详情
	    return fly.get('tms/api/hotel/order/toOrderDetail',params);
	},
	cancelHolOrder:(params)=>{ //酒店取消订单
	    return fly.post('/tms/api/hotel/order/cancelHolOrder',params);
	},
}