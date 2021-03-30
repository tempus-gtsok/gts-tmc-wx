<template>
	<view class="paybox">
		<view class="payment" @click="paybtn">
			支付
		</view>
		<loading>
		</loading>
	</view>
</template>
<script>
	import order from '@/api/order.js'
	import login from "../api/login";
	export default {
		props: {
			businessType: {
				value: Number,
				default: 0
			},
			productType: {
				value: Number,
				default: 0
			},
			recordNo: {
				value: Number,
				default: 0
			},
			amount: {
				value: Number,
				default: 0
			},
			payStatus: {
				value: Number,
				default: 0
			}
		},
		data() {
			return {
				recordNos: 0,
				amounts: 0,
				lolist: {}
			}
		},
		mounted() {
			this.lolist = uni.getStorageSync("user_list" + uni.getStorageSync('appWxId'));
			this.recordNos = this.recordNo;
			this.amounts = this.amount;
		},
		watch: {
			recordNo(item) {
				this.recordNos = item;
			},
			amount(item) {
				this.amounts = item;
			}
		},
		methods: {
			paybtn() {

				let payStatus = this.payStatus;
				let _this = this;
				if (payStatus == 2) {
					uni.showModal({
						title: '提示',
						confirmText: '继续支付',
						content: '订单支付中！如已支付，请勿重新支付，以免造成损失',
						success: function(res) {
							if (res.confirm) {
								_this.payment();
							} else if (res.cancel) {

							}
						}
					})
				}
				if (payStatus != 2) {
					_this.payment();
				}
			},
			async payment() { //公众号微信支付
				let that = this;
				
				try {
					let res;
					// #ifdef MP-WEIXIN
					res = await order.confirmPay({
						openId:uni.getStorageSync('weixin_openid'+ uni.getStorageSync('appWxId')),
						businessType: that.businessType,
						categoryCode: "1000",
						productType: that.productType,
						differenceType: "n",
						recordNo: that.recordNos,
						amount: that.amounts,
						payWayCode: "1000026",
						tradeTyep: "WXAJSAPI"
					})
					// #endif
					// #ifdef H5
					res = await order.confirmPay({
						openId:uni.getStorageSync("h5_openid" + uni.getStorageSync('appWxId')),
						businessType: that.businessType,
						categoryCode: "1000",
						productType: that.productType,
						differenceType: "n",
						recordNo: that.recordNos,
						amount: that.amounts,
						payWayCode: "1000023",
						tradeTyep: "JSAPI"
					})
					// #endif
					if (res.code == 200) {
						
						let da = JSON.parse(res.data);

						// #ifdef MP-WEIXIN
						wx.requestPayment({
							appId: da.appId, //公众号名称，由商户传入
							timeStamp: da.timeStamp, //时间戳，自1970年以来的秒数
							nonceStr: da.nonceStr, //随机串
							package: da.package,
							signType: "MD5", //微信签名方式：
							paySign: da.paySign, //微信签名

							'success': function(res) {
								that.$emit('payok')
							},
							'fail': function(res) {
								uni.showModal({
									content: '支付失败',
									showCancel: false
								});
							},
						}, );
						// #endif

						// #ifdef  H5
						let ua = window.navigator.userAgent.toLowerCase();
						if (ua.match(/micromessenger/i) == 'micromessenger') {
							// #ifdef H5
							that.$wechat.readys(da, function(callback) {
								if (callback == '200') {
									that.$emit('payok')
								} else {
									uni.showModal({
										content: '支付失败',
										showCancel: false
									});
								}
							})
							// #endif
						} else {
							
							uni.showModal({
								content: '请在微信浏览器中打开',
								showCancel: false
							});
						}
						// #endif
					} 
				} catch (e) {
					console.log(e)
					
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.paybox {
		width: 100vw;
		position: fixed;
		bottom: 50upx;
		left: 0;
		
		.payment {
			width: 90%;
			margin-left: 5%;
			height: 110upx;
			text-align: center;
			line-height: 110upx;
			border-radius: 110upx;
			color: #FFFFFF;
			background: #F48F00;
		}
	}
</style>
