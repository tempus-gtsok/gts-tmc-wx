<template>
	<view class="retriveve">
		<headnavigation titles="忘记密码"></headnavigation>
		<view class="retrieve">
			<loading>
			</loading>
			<view class="mian-retriveve">
				<view class="input-op">
					<view class="input-lis">
						<view class="iconfont" style="color: #9a9a9c;">&#xe623;</view>
						<input type="number" v-model="ipone" maxlength="11" @input="search($event)" class="input-css" placeholder="请输入手机号" />
					</view>
				</view>
				<view class="input-op">
					<view class="input-lis">
						<view class="iconfont" style="color: #9a9a9c;">&#xe61a;</view>
						<input type="number" v-model="Verification" maxlength="6" class="input-css" placeholder="短信验证码" />
						<view class="button" :disabled="isdisab" :class="canClick ? 'disabled': ''" @click="countDown">
							{{content}}
						</view>
					</view>
				</view>
				<view class="logins">
					<view class="loginser" @click="logins">确定重置密码</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import login from "@/api/login.js"
	export default {
		data() {
			return {


				ipone: "",
				Verification: "",
				isdisab: true,
				content: '获取验证码', // 按钮里显示的内容
				totalTime: 60, //记录具体倒计时时间
				canClick: false, //添加canClick
				op_lo: "获取验证码",
			}
		},
		methods: {
			rblcok() {
				// #ifdef H5
				window.history.back()
				// #endif
				// #ifdef MP-WEIXIN
				uni.navigateBack();
				// #endif
			},
			async logins() { //重置密码
				let _this = this;
				let ipon = _this.ipone; //电话号码
				let ver = _this.Verification; //验证码
				if (ipon == '') {
					_this.showToasts("请输入电话号码!");
				} else if (_this.utils.zzPhone(ipon)) {
					_this.showToasts("请输入正确的电话号码!");
				} else if (ver == '') {
					_this.showToasts("请输入验证码!");
				} else {
					let user = {
						phone: ipon,
						verificationCode: ver,
					}

					try {
						let res = await login.findPassword(user);

						if (res.code == 200) {
							_this.showToasts("重置成功！请注意短信!");
							setTimeout(() => {
								uni.navigateBack({})
							}, 1000)
						} else {
							_this.showToasts(res.message);
						}
					} catch (e) {
						console.log(e)

					}
				}
			},
			async countDown() { //发送验证码
				let _this = this

				try {
					let res = await login.vess_code({
						"phone": (_this.ipone).toString()
					});

					if (res.code == 200) {
						_this.showToasts("发送成功!");
						_this.canClick = false;
						_this.isdisab = true;
						_this.content = '重新发送(' + _this.totalTime + ')';
						let clock = setInterval(() => {
							_this.totalTime--
							_this.content = '重新发送(' + _this.totalTime + ')'
							if (_this.totalTime < 1) {
								clearInterval(clock)
								_this.content = '短信验证码'
								_this.totalTime = 10
								_this.canClick = true;
								_this.isdisab = false;
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
						_this.isdisab = false;
						_this.canClick = true;
					}
				} else {
					_this.isdisab = true;
					_this.canClick = false;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.retriveve {
		width: 100%;
		position: absolute;
		height: 100%;
		background: url(../../static/img/login/loginBg.jpg);
		background-size: 100% 100%; // 满屏
		
		.retrieve {
			padding: 0 30upx;

			.mian-retriveve {
				margin-top: 30%;
				width: calc(100% - 80upx);
				background: #FFFFFF;
				padding: 20upx 40upx 20upx 40upx;
				border-radius: 15upx;

				.input-op {
					height: 100upx;
					line-height: 100upx;
					margin-bottom: 2upx;
					background: #FFFFFF;

					.input-lis {
						display: flex;
						align-items: center;
						border-bottom: #d1d6dd 0.5upx solid;
						background: #FFFFFF;

						input {
							text-indent: 10upx;
						}

						.input-css {
							width: 120%;
							height: 60upx;
							font-size: 30upx;
						}

						.count_down {
							text-align: center;
							width: 63%;
							height: 80upx;
							line-height: 80upx;
							border: #d1d6dd 1upx solid;
						}

						.button {
							width: 65%;
							margin: 0 0 0 70upx;
							height: 70upx;
							line-height: 70upx;
							font-size: 30upx;
							color: #dce0e5;
							border: 2upx solid #C8C7CC;
							text-align: center;
							border-radius: 10upx;
							background-color: #FFFFFF;
						}

						.disabled {
							color: $uni-color-primary;
							border: 1upx solid $uni-color-primary;
							cursor: not-allowed; // 鼠标变化
						}
					}
				}

				.logins {
					width: 100%;
					font-size: 30upx;
					margin: 30upx 0;

					.loginser {
						width: 100%;
						height: 90upx;
						text-align: center;
						line-height: 90upx;
						border-radius: 10upx;
						color: #FFFFFF;
						background: $uni-color-primary;
					}

					.charge {
						color: #57bd78;
						border: 1upx solid #57bd78;
						margin: 20upx 20upx;
						background: #FFFFFF;
					}
				}
			}
		}
	}
</style>
