<template>
	<view class="login-main">
		<loading>
		</loading>
		<view class="login-logo">
			<image class="logo-bg" :src="bgImg" mode=""></image>
			<image class="logo-lg" :src="lgImg" mode=""></image>
		</view>

		<view class="login-form" ref="loginForm" :style="{color:bcColors}">
			<view class="input-op" v-if="option == 1">
				<view class="input-lis" >
					<view class="iconfont">&#xe623;</view>
					<input type="number" @blur.prevent="changeCount()" v-model="ipone" maxlength="11" @input="search($event)" class="input-css"
					 placeholder="请输入手机号" />
				</view>
			</view>
			<view class="input-op" v-if="option == 1">
				<view class="input-lis">
					<view class="iconfont">&#xe61a;</view>
					<input type="number" @blur.prevent="changeCount()" v-model="verification" maxlength="6" class="input-css"
					 placeholder="短信验证码" />
					<view class="button" :disabled="isDisabled" :class="canClick ? 'disabled': ''" :style="canClick ? {background:bcColors}:''" @click="countDown">
						{{content}}
					</view>
				</view>
			</view>
			<view class="input-op" v-if="option == 2">
				<view class="input-lis">
					<view class="iconfont">&#xe623;</view>
					<input type="text" @blur.prevent="changeCount()" v-model="account" class="input-css" placeholder="请输入手机号" />
				</view>
			</view>
			<view class="input-op" v-if="option == 2">
				<view class="input-lis">
					<view class="iconfont">&#xe674;</view>
					<input type="password" @blur.prevent="changeCount()" maxlength="20" v-model="password" class="input-css"
					 placeholder="请输入密码" />
				</view>
			</view>
			<view class="login-btn">
				<view :style="{background: bteColors}" class="lg-btns" @click="lgClick" v-if="isWxBang == false">登录</view>
				<view :style="{background: bteColors}" class="lg-btns" @click="lgClick" v-if="isWxBang == true">登录并绑定</view>
			</view>
			<view class="lg-bottom" v-if="isWxBang == false">
				<view v-if="option == 1" @click="option = 2">
					密码登录
				</view>
				<view v-if="option == 2" @click="option = 1">
					验证码登录
				</view>
				<view  @click="retirver">
					忘记密码
				</view>
			</view>
			<view class="lg-bottom" v-if="isWxBang == true">
				<view @click="wxislogng">
					返回
				</view>
			</view>
		</view>
		<!-- #ifdef H5 || MP-WEIXIN -->
		<view class="wx-login" v-if="isWxBang == false">
			<view class="wx-tops">
				<view class="wxtopsbx">
				</view>
				<view class="wxtopsfont">
					其他方式登录
				</view>
				<view class="wxtopsbx">
				</view>
			</view>
			<view class="wxlog">
				<image src="../../static/img/login/wxlogo.png" mode="" @click="wxlogins"></image>
			</view>
		</view>
		<view class="registered">
			<view @click="registered" style="font-size: 35upx;">合作注册</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	// #ifdef  H5
	// 判断公众号截取code
	const getUrlParam = (name) => {
		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		let r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	}
	// 判断是否为公众号模拟器环境
	const isWechat = () => {
		return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
	}
	// #endif
	import login from "@/api/login.js"
	export default {
		data() {
			return {
				bcColors:'#007aff',
				bteColors:'#007aff',
				isWxBang: false,
				bgImg: '',
				lgImg: '',
				account: "",
				app_w_id: '', //公众号唯一id
				password: "",
				option: 2, //默认为密码登陆
				ipone: "",
				verification: "",
				isDisabled: true,
				content: '获取验证码', // 按钮里显示的内容
				totalTime: 60, //记录具体倒计时时间
				canClick: false, //添加canClick
				openid: "",
				appid: '',
				isLogin: false,//是否登录
				urls: '',
				sessionKey: ''
			}
		},
		onLoad(item) {
			uni.removeStorageSync('TB_ddvalue');//清楚钉钉登录信息
			if (item.ts == 1) { //判断是否是退出登录
				this.urls = uni.getStorageSync('wxAppids');//获取浏览器保留参数
				this.$store.commit('logout');//退出登录清楚本地缓存
			}
			let datas = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //检验是否是登录状态
			if (datas.token) {//判断是否登录
				this.isLogin = false;
				this.$store.commit('userTokenAi', datas);
				uni.switchTab({
					url: 'pages/book/book'
				});
			} else {
				this.isLogin = true;
			}
		},
		mounted() {
			if (this.isLogin) {//未登录时加载
				// #ifdef  APP-PLUS
				// uni.setStorageSync("wxAppids", 'wx380eba143206092e'); //App端 默认写死
				// this.lgImg = "http://file.molintmc.cn/mlimg/molinlogo.png";
				// this.bgImg = "http://file.molintmc.cn/mlimg/molinbg.png";
				// uni.setStorageSync("yzfSign" + uni.getStorageSync('appWxId'),
				// 	'37ef9b97d07c57cf2b45cabc14b2e266f2b87d0e7f0db827bb5ee08ff595f2720a4c2c76a8a55c9bf742d59d02c4a1983e5ba3');
				//#endif
				// #ifdef  MP-WEIXIN
				let appid = wx.getAccountInfoSync().miniProgram.appId;
				uni.setStorageSync("wxAppids", appid);
				this.getEnvForWxa(appid);
				//#endif
				// #ifdef  H5
				let urVal = '';
				if (this.urls == '') {
					let urLt = this.utils.getRequest();
					if(urLt !== null && urLt != undefined){
						urVal = urLt.appId;
					}
				} else {
					urVal = this.urls;
				}
				uni.setStorageSync("wxAppids", urVal);
				this.getenvs(urVal);
				// #endif
			}
		},
		methods: {
			registered() {//跳转合作注册
				uni.navigateTo({
					url: './registered'
				})
			},
			wxislogng() {
				this.isWxBang = false;
				this.option = 2;
			},
			async wxlogins() { //wxopenid登录
				if (this.openid == "") {
					return
				}
				const rest = await login.openIdLogin({
					openId: this.openid,
					// #ifdef H5
					type: 1
					// #endif
					// #ifdef MP-WEIXIN
					type: 2
					// #endif
				});
				if (rest.code == 200) {
					if (rest.code == 200) {
						this.$store.commit('userTokenAi', rest.data);
						uni.switchTab({
							url: '../book/book'
						});
					} else {
						this.showToasts(rest.message);
					}
				} else {
					this.showToasts('用户不存在,请先绑定！');
					this.isWxBang = true;
					this.option = 1;
				}
			},
			changeCount() {//解决苹果手机输入完后位置问题
				// #ifdef  H5
				let ist = uni.getSystemInfoSync().platform;
				if (ist == 'ios') {
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					});
				}
				// #endif
			},
			async getEnvForWxa(apids) {//小程序获取环境变量啊
				try {
					const rest = await login.getEnvForWxa({
						appId: apids,//小程序appid
						type: 2
					});
					if (rest.code == 200) {

						this.appid = rest.data.wxaAppId;
						uni.setStorageSync("app_wxAppId" + uni.getStorageSync('appWxId'), rest.data.wxAppId);
						this.lgImg = rest.data.style.logo;
						this.bgImg = rest.data.style.bgImage;
						this.getAppletsCode(this.appid);

					} else {
						this.showToasts(rest.message);
					}
				} catch (e) {
				}
			},
			async getenvs(apids) {
				try {
					const rest = await login.getenv({
						appId: apids//公众号appid
					});
					if (rest.code == 200) {
						this.appid = rest.data.wxAppId;
						this.app_w_id = rest.data.wxOrgId;
						uni.setStorageSync("app_w_id", this.app_w_id);
						uni.setStorageSync("app_wxAppId" + uni.getStorageSync('appWxId'), rest.data.wxAppId);
						let string = '';
						for (let i = 0; i < 5; i++) {//拼接一个随机数，防止服务器更换图片后没反应
							string += Math.floor(Math.random() * 10)
						}
						this.lgImg = rest.data.style.logo + '?' + string;
						this.bgImg = rest.data.style.bgImage + '?' + string;
						uni.setStorageSync("yzfSign" + uni.getStorageSync('appWxId'), rest.data.yzfSign);
						this.bcColors = '#' + rest.data.style.fontColor;
						this.bteColors = '#' + rest.data.style.darkBgColor;
						if (isWechat()) { //如果为微信端就进行code
							let datas = uni.getStorageSync('h5_openid' + uni.getStorageSync('appWxId')); //检验是否保存wx openid
							if (datas) {
								this.openid = datas;//公众号openid
							} else {
								this.getCode(apids);
							}
						}
					} else {
						this.showToasts(rest.message);
					}
				} catch (e) {
					console.log(e)
				}
			},
			async getAppletsCode(appId) {
				let _this = this;
				wx.login({//获取小程序个人用户openid
					success: async function(res) {
						if (res.code) {
							let rest = await login.getAppletscode({
								code: res.code,
								appId: appId
							});
							if (rest.code == 200) {
								let attrs = rest.data.attrs;
								_this.openid = attrs.openid;//小程序openid
								_this.sessionKey = attrs.session_key;
								uni.setStorageSync('sessionKey', attrs.session_key);
								uni.setStorageSync('weixin_openid'+ uni.getStorageSync('appWxId'), attrs.openid);//小程序openid
							}
						} else {
							console.log('获取用户登录态失败！' + res.message)
						}
					},
					fail: function(res) {
						console.log('获取用户登录态失败！' + JSON.stringify(res))
					}
				});
			},
			async getCode(appids) {
				let appid = this.appid; //为appid
				let code = getUrlParam("code"); //是否存在code
				let ist = uni.getSystemInfoSync().platform;
				let local = '';
				if (ist == 'ios') {//判断手机类型
					local = window.location.href.split('#')[0]
				} else if (ist == 'android') {
					local = window.location.href
				} else {
					local = window.location.href
				}
				if (code == null || code === "") {
					//不存在就打开上面的地址进行授权
					window.location.href =
						`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_base&state=1#wechat_redirect`;
				} else {
					try {
						const rest = await login.getcode({
							code: code,
							scope: 'snsapi_base',
							appId: appids
						});
						if (rest.code == 200) {
							let dat = rest.data.attrs;
							this.openid = dat.openid;
							uni.setStorageSync("h5_openid" + uni.getStorageSync('appWxId'), dat.openid);
						} else {
							this.showToasts(rest.message);
						}
					} catch (e) {
						console.log(e)
					}
				}
			},
			retirver() { //忘记密码
				uni.navigateTo({
					url: './retrievepassword'
				})
			},
			async lgClick() { //登录
				let _this = this;
				if (_this.option == 1) {
					let ipon = _this.ipone; //电话号码
					let ver = _this.verification; //验证码
					if (ipon == '') {
						_this.showToasts("请输入电话号码!");
					} else if (_this.utils.zzPhone(ipon)) {
						_this.showToasts("请输入正确的电话号码!");
					} else if (ver == '') {
						_this.showToasts("请输入验证码!");
					} else {
						if (this.isWxBang = false) {
							_this.openid = "";
						}
						let user;
						// #ifdef  H5
						user = {
							type:1,
							phone: ipon,
							verificationCode: ver,
							openId: _this.openid,
						}
						// #endif
						// #ifdef MP-WEIXIN
						user = {
							type:2,
							phone: ipon,
							verificationCode: ver,
							openId: _this.openid,
							sessionKey: this.sessionKey
						}
						// #endif
						try {
							let res = await login.login(user);
							if (res.code == 200) {
								_this.$store.commit('userTokenAi', res.data); //用户信息
								uni.switchTab({
									url: '../book/book'
								});
							} else {
								_this.showToasts(res.message);
							}
						} catch (e) {
							console.log(e)
						}
					}
				} else {
					let account = _this.account; //账号
					let password = _this.password; //密码
					if (account == '') {
						_this.showToasts("请输入账号!");
					} else if (password == '') {
						_this.showToasts("请输入密码!");
					} else {
						let user;
						user = {
							account: account,
							password: password,
							// #ifdef H5
							type: 1
							// #endif
							// #ifdef MP-WEIXIN
							type: 2
							// #endif
						}
						try {
							let res = await login.accountlogin(user);
							if (res.code == 200) {
								_this.$store.commit('userTokenAi', res.data);
								uni.switchTab({
									url: '../book/book'
								});
							} else {
								_this.showToasts(res.message);
							}
						} catch (e) {
							console.log(e)
						}
					}
				}
			},
			async countDown() {
				let _this = this
				if (_this.isDisabled == true) {
					return
				}
				try {
					let res = await login.vess_code({
						"phone": (_this.ipone).toString()
					});
					if (res.code == 200) {
						_this.showToasts("发送成功!");
						_this.canClick = false;
						_this.isDisabled = true;
						_this.content = '重新发送(' + _this.totalTime + ')'
						let clock = setInterval(() => {
							_this.totalTime--
							_this.content = '重新发送(' + _this.totalTime + ')'
							if (_this.totalTime < 1) {
								clearInterval(clock)
								_this.content = '短信验证码'
								_this.totalTime = 60
								if (_this.ipone.length == 11 && _this.utils.zzPhone(_this.ipone) == false) {
									_this.canClick = true;
									_this.isDisabled = false;
								}
							}
						}, 1000)
					} else {
						_this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e)
				}
			},
			search(ev) { //监听input里面的手机号的值
				let _this = this;
				let va = ev.mp.detail.value; //获取搜索框的值
				if (va.length == 11) {
					if (_this.utils.zzPhone(va)) {
						_this.showToasts("请输入正确的手机号!");
					} else {
						if (_this.content == '获取验证码') {
							_this.isDisabled = false;
							_this.canClick = true;
						}
					}
				} else {
					_this.isDisabled = true;
					_this.canClick = false;
				}
			}
		}
	}
</script>
<style>
	page{
		background-color: #FFFFFF;
	}
</style>
<style lang="scss" scoped>
	.registered {
		line-height: 90upx;
		text-align: center;
		justify-content: center;
		margin-top: 20upx;
		color: #1a9bff;
	}

	.login-main {
		width: 100%;

		.login-logo {
			width: 100%;
			height: 400upx;
			position: relative;

			.logo-bg {
				width: 100%;
				height: 100%;
			}

			.logo-lg {
				position: absolute;
				z-index: 100;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				width: 212upx;
				height: 55upx;
			}
		}
		.login-form {
			width: calc(100% - 270upx);
			margin: 40upx 55upx 0 55upx;
			background: #FFFFFF;
			padding: 55upx 80upx 55upx 80upx;
			border-radius: 15upx;
			border: 1upx solid #F7F1EB;
			.input-op {
				height: 120upx;
				line-height: 120upx;
				margin-bottom: 2upx;
				background: #FFFFFF;

				.input-lis {
					display: flex;
					align-items: center;
					border-bottom: #efefef 1upx solid;
					background: #FFFFFF;

					input {
						text-indent: 10upx;
					}

					.input-css {
						width: 60%;
						height: 60upx;
						font-size: 32upx;
					}

					.button {
						width: 40%;
						height: 60upx;
						line-height: 60upx;
						font-size: 26upx;
						border: 1upx solid $uni-color-primary;
						text-align: center;
						border-radius: 10upx;
						background-color: #FFFFFF;
						cursor: pointer;
					}

					.disabled {
						color: #FFFFFF;
						border: 1upx solid $uni-color-primary;
						cursor: not-allowed; // 鼠标变化
					}
				}
			}

			.mobile {
				margin: 0 5%;
				height: 90upx;
				line-height: 90upx;
				color: #d1d6dd;
				font-size: 35upx;
				background: red;
				border-bottom: #d1d6dd 0.5upx solid;
			}

			.login-btn {
				width: 100%;
				font-size: 32upx;
				margin: 30upx 0;

				.lg-btns {
					width: 100%;
					height: 90upx;
					text-align: center;
					line-height: 90upx;
					border-radius: 90upx;
					color: #FFFFFF;
				}

				.charge {
					color: #57bd78;
					border: 1upx solid #57bd78;
					margin: 20upx 20upx;
					background: #FFFFFF;
				}
			}

			.lg-bottom {
				font-size: 32upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.note {
				display: flex;
				margin: 0 5%;
				height: 120upx;
				line-height: 120upx;
				color: #d1d6dd;
				border-bottom: #d1d6dd 0.5upx solid;

				.left {
					width: 70%;
					background: red;
				}

				.count_down {
					background: red;
					text-align: center;
					width: 222upx;
					height: 80upx;
					line-height: 80upx;
					margin: auto 0;
					border: #d1d6dd 1upx solid;
				}
			}
		}

		.wx-login {
			width: calc(100% - 110upx);
			height: 120upx;
			margin: 100upx 55upx 0 55upx;

			.wx-tops {
				display: flex;
				align-items: center;

				.wxtopsbx {
					width: 30%;
					height: 2upx;
					background-color: #f4f4f4;
				}

				.wxtopsfont {
					width: 40%;
					text-align: center;
					font-size: 38upx;
					color: #8f8f8f;
				}
			}

			.wxlog {
				width: 100%;
				margin-top: 15upx;
				display: flex;
				justify-content: center;

				image {
					width: 74upx;
					height: 61upx;
				}
			}
		}
	}
</style>
