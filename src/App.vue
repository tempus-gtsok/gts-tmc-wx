<script>
import { mapMutations } from 'vuex';
import login from 'api/login.js';
// import {wxAuthorize} from 'untils/util.js'
export default {
	data() {
		return {};
	},
	methods: {
		...mapMutations(['userTokenAi']),
		async getenvs(url) {
			//请求参数
			try {
				const rest = await login.getenv({
					appId: url
				});
				if (rest.code == 200) {
					uni.setStorageSync('appWxId', rest.data.wxOrgId); //公众号id
					uni.setStorageSync('app_wxAppId' + uni.getStorageSync('appWxId'), rest.data.wxAppId); //appid
					uni.setStorageSync('yzfSign' + uni.getStorageSync('appWxId'), rest.data.yzfSign); //客服id
				} else {
					uni.showToast({
						title: rest.message,
						icon: 'none',
						duration: 1000
					});
				}
			} catch (e) {
				console.log(e);
			}
		}
	},
	onLoad(options) {},
	onLaunch: function() {
		let _this = this;
		// #ifdef  H5
		if (
			window.location.hash.indexOf('#/pages/login/login') >= 0 ||
			window.location.hash.indexOf('#/pages/mydi/myapplication/tradetails/travelsdetails') >= 0 ||
			window.location.hash.indexOf('#/pages/book/wxapk') >= 0
		) {
		} else {
			let uls = this.utils.getRequest();
			if (uls == undefined || uls == null) {
				let datas = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //检验是否是登录状态
				if (datas.token) {
					_this.userTokenAi(datas);
				} else {
					_this.$store.commit('logout');
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}
			} else if ('sessionId' in uls == false && 'appId' in uls && 'corpid' in uls == false) {
				//公众号
				uni.removeStorageSync('TB_ddvalue');
				uni.setStorageSync('wxAppids', uls.appId);
				_this.getenvs(uls.appId);
				let datas = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //检验是否是登录状态
				if (datas.token) {
					_this.userTokenAi(datas);
				} else {
					_this.$store.commit('logout');
					uni.reLaunch({
						url: '/pages/login/login?appId=' + uls.appId
					});
				}
			} else if ('sessionId' in uls) {
				//内嵌 免登录
				if ('appId' in uls) {
					uni.setStorageSync('wxAppids', uls.appId);
				} else {
					uni.setStorageSync('wxAppids', 'dd');
				}
				uni.setStorageSync('TB_ddvalue', uls.sessionId);
			} else if ('corpid' in uls) {
				//钉钉内嵌 免登录
				uni.setStorageSync('appWxId', uls.appId);
				uni.setStorageSync('corpid', uls.corpid);
                uni.setStorageSync('customerNo', uls.customerNo);
			}
		}
		// #endif
	},
	onShow: function() {},
	onHide: function() {}
};
</script>

<style lang="scss">
/* #ifndef APP-NVUE */
@import './static/fonts/iconfont.css';
/*每个页面公共css */
page{
	background-color: #F1F1F1;
}
.icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
.Navigation {
	width: 100%;
	/*  #ifdef  APP-PLUS || MP-WEIXIN */ 
	padding-top: 60upx;
	/*  #endif  */
	height: 90upx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 35upx;
	color: #ffffff;
	background: linear-gradient(to right, #4e92fd 0%, #6e46fe 100%);
	.ongbutn {
		width: 80%;
		color: #ffffff;
		text-align: center;
	}
	.smtis {
		width: 10%;
	}
}
/* 修改复选框默认样式 */
/* h5 */
uni-checkbox .uni-checkbox-input {
	width: 27upx;
	height: 27upx;
	border-radius: 2upx !important;
	border: 1upx solid #c8c7cc;
	color: #ffffff !important;
}

uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
	background: $uni-color-primary;
	border: 1upx solid $uni-color-primary;
}

.uni-checkbox-input.uni-checkbox-input-checked {
}
.uni-checkbox-input.uni-checkbox-input-checked::before {
	font-size: 18upx !important;
}
/* 微信 */
checkbox .wx-checkbox-input {
	width: 27upx;
	height: 27upx;
	border-radius: 0 !important;
	border: 1upx solid #c8c7cc;
	color: #808080 !important;
}

checkbox .wx-checkbox-input.wx-checkbox-input-checked {
}

.wx-checkbox-input.wx-checkbox-input-checked {
}
.wx-checkbox-input.wx-checkbox-input-checked::before {
	font-size: 30upx !important;
}
/*  #endif  */
</style>
