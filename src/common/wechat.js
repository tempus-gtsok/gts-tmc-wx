let jweixin;
let ist = uni.getSystemInfoSync().platform;
// #ifdef  H5
	if(ist == 'android' || ist == 'ios'){
		jweixin = require('jweixin-module');
	}
// #endif
import jwx from '@/api/login.js'
export default {
    //判断是否在微信中  
    isWechat: function() {
		if(ist == 'android' || ist == 'ios'){
			var ua = window.navigator.userAgent.toLowerCase();
			if (ua.match(/micromessenger/i) == 'micromessenger') {
			    console.log('是微信客户端')
			    return true;
			} else {
			    console.log('不是微信客户端')
			    return false;
			}
		} else {
			return false;
		}
    },
    //初始化sdk配置  
    initJssdkShare: function(callback, url) {
        //服务端进行签名 ，可使用uni.request替换。 签名算法请看文档  
        ni.request(
            'https://fbyc.microchainsoft.cn/index/wechat/getSignPackage',
            {
                url: url
            },
            function(res) {
                if (res.data) {
                    jweixin.config({
                        debug: false,
                        appId: res.data.appId,
                        timestamp: res.data.timestamp,
                        nonceStr: res.data.nonceStr,
                        signature: res.data.signature,
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'getLocation',
							'chooseWXPay'
                        ]
                    });
                    //配置完成后，再执行分享等功能  
                    if (callback) {
                        callback(res.data);
                    }
                }
        });
    },
    initJssdk:function(callback){
		var url = '';
		if (ist == 'ios') {
		  url = window.location.href.split('#')[0]
		} else if(ist == 'android') {
		  url = window.location.href
		}
		jwx.getWxConfig({url: url,appId:uni.getStorageSync('app_wxAppId'+ uni.getStorageSync('appWxId'))}).then((res)=>{
			jweixin.config({
				debug: false,
				appId: res.appId,
				timestamp: res.timestamp,
				nonceStr: res.nonceStr,
				signature: res.signature,
				jsApiList: [
					'checkJsApi',
					'getLocation',
					'chooseWXPay',
				]
			});
			//配置完成后，再执行功能
			if (callback) {
				callback(res.data);
			}
		})
    },
	readys: function(da,callback) { //微信支付
    	// #ifdef H5
		WeixinJSBridge.invoke(
		   'getBrandWCPayRequest', {
			   appId:da.appId,     //公众号名称，由商户传入     
			   timeStamp:da.timeStamp,         //时间戳，自1970年以来的秒数     
			   nonceStr:da.nonceStr, //随机串     
			   package: da.package,     
			   signType:"MD5",         //微信签名方式：     
			   paySign:da.paySign //微信签名 
		   },
		   function(res){     
			   if(res.err_msg == "get_brand_wcpay_request:ok" ) {
				   callback('200')
			   } else {
				   callback('100')
				}// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
		   }
		);
		// #endif
		// #ifdef MP-WEIXIN
		wx.requestPayment(
			{
				appId:da.appId,     //公众号名称，由商户传入
				timeStamp:da.timeStamp,         //时间戳，自1970年以来的秒数
				nonceStr:da.nonceStr, //随机串
				package: da.package,
				signType:"MD5",         //微信签名方式：
				paySign:da.paySign, //微信签名

				'success':function(res){
					callback('200')
				},
				'fail':function(res){
					callback('100')
				},
			},
		);
		// #endif
	},
    // //在需要自定义分享的页面中调用
    // share: function(data, url) {
    //     url = url ? url : window.location.href;
    //     if (!this.isWechat()) {
    //         return;
    //     }
    //     //每次都需要重新初始化配置，才可以进行分享
    //     this.initJssdkShare(function(signData) {
    //         jweixin.ready(function() {
    //             var shareData = {
    //                 title: data && data.title ? data.title : signData.site_name,
    //                 desc: data && data.desc ? data.desc : signData.site_description,
    //                 link: url,
    //                 imgUrl: data && data.img ? data.img : signData.site_logo,
    //                 success: function(res) {
    //                     //用户点击分享后的回调，这里可以进行统计，例如分享送金币之类的
    //                     // post('/api/member/share');
    //                 },
    //                 cancel: function(res) {}
    //             };
    //             //分享给朋友接口
    //             jweixin.onMenuShareAppMessage(shareData);
    //             //分享到朋友圈接口
    //             jweixin.onMenuShareTimeline(shareData);
    //         });
    //     }, url);
    // },
    //在需要定位页面调用
    location: function(callback) {
        this.initJssdk(function(res) {
            jweixin.ready(function() {
                jweixin.getLocation({
                    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        callback(res)
                    },
                    fail:function(res){
                        console.log(res)
                    },
                    // complete:function(res){
                    //     console.log(res)
                    // }
                });
            });
        });
    }
}