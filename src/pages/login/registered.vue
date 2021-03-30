<template>
	<view class="registered">
		<view class="registered_text">
			<headnavigation titles="注册"></headnavigation>
			<view class="registered_form">
				<view class="registered_form_text">
					<view class="registered_form_left">公司中文名</view>
					<input class="registered_form_input" v-model="companyName" type="text" placeholder="请输入公司中文名">
				</view>
				<view class="registered_form_text">
					<view class="registered_form_left">联系人名称</view>
					<input class="registered_form_input" v-model="userName" type="text" placeholder="请输入联系人名称">
				</view>
				<view class="registered_form_text">
					<view class="registered_form_left">联系人邮箱</view>
					<input class="registered_form_input" v-model="userEmail" type="text" placeholder="请输入联系人邮箱">
				</view>
				<view class="registered_form_text">
					<view class="registered_form_left">联系人手机号码</view>
					<input class="registered_form_input" maxlength="11" type="number" placeholder="请输入联系人手机号码"
						v-model="userIphone">
				</view>
				<view class="registered_form_text">
					<view class="registered_form_left">短信验证码</view>
					<input class="registered_form_ipt" v-model="verificationCode" type="number" maxlength="4"
						placeholder="请输入短信验证码">
					<view class="registered_form_btn" v-show="show" @click="getCode">获取验证码</view>
					<view class="registered_form_btn" v-show="!show">{{ count }}s</view>
				</view>
			</view>
			<view class="registered_add_btn" @click="registered">
				<view>注 册</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Login from "../../api/login";
	export default {
		name: "registered",
		data() {
			return {
				show: false,
				count: '',
				timer: null,
				companyName: '', //公司名称
				userName: '', //联系人名称
				userEmail: '', //联系人邮箱
				userIphone: '', //联系人手机号
				verificationCode: '' //验证码
			}
		},
		methods: {
			async registered() {
				let companyName = this.companyName;
				let userName = this.userName;
				let userEmail = this.userEmail;
				let userIphone = this.userIphone;
				let verificationCode = this.verificationCode;

				if (companyName == '') {
					uni.showToast({
						title: '请输入公司名称！',
						icon: 'none',
						duration: 1000
					})
					return;
				}
				if (userName == '') {
					uni.showToast({
						title: '请输入联系人姓名',
						icon: 'none',
						duration: 1000
					})
					return;
				}

				if (userEmail == '') {
					uni.showToast({
						title: '请输入联系人邮箱！',
						icon: 'none',
						duration: 1000
					})
					return;
				} else if (this.utils.zzMailbox(userEmail)) {
					uni.showToast({
						title: '联系人邮箱格式错误！',
						icon: 'none',
						duration: 1000
					})
					return;
				}

				if (userIphone == '') {
					uni.showToast({
						title: '请输入联系人电话！',
						icon: 'none',
						duration: 1000
					})
					return;
				}

				if (verificationCode == '') {
					uni.showToast({
						title: '请输入验证码！',
						icon: 'none',
						duration: 1000
					})
					return;
				}
				let res = await Login.register({
					companyName: companyName,
					contactsName: userName,
					contactsPhone: userIphone,
					email: userEmail,
					code: verificationCode
				});

				if (res.code == 200) {
					uni.showToast({
						title: '注册成功！',
						icon: 'success',
						duration: 1000
					})
					setTimeout(function() {
						uni.reLaunch({
							url: './login'
						})
					}, 1000);
				} else if (res.code == 400) {
					uni.showToast({
						title: '验证码错误！',
						icon: 'error',
						duration: 1000
					})
				} else if (res.code == 500) {
					uni.showToast({
						title: '注册失败！',
						icon: 'error',
						duration: 1000
					})
				} else {
					uni.showToast({
						title: '系统异常，请稍后再试！',
						icon: 'error',
						duration: 1000
					})
				}
			},
			getCode() {
				const TIME_COUNT = 60;
				let userIphone = this.userIphone;
				if (this.utils.zzPhone(userIphone)) {
					uni.showToast({
						title: '请填写正确的11位手机号码',
						icon: 'none'
					})
					return;
				}
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}

				Login.getCode({
					phone: userIphone
				});

			},
			returns() {
				uni.navigateBack();
			}
		}
	}
</script>

<style scoped lang="scss">
	.registered {
		position: absolute;
		background: #f1f1f1;
		height: 100%;
		width: 100%;

		.registered_text {
			background: #FFFFFF;
			height: 550upx;
			width: 100%;

			.registered_text_top {
				width: 100%;
				height: 90upx;
				background: linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);
				text-align: center;
				line-height: 90upx;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				position: relative;
				z-index: 1100;

				.icon {
					position: absolute;
					width: max-content;
					height: max-content;
					text-align: center;
					left: 30upx;
					color: #D0DEE5;
					margin-right: 30upx;
					font-size: 35upx;
					z-index: 1200;
				}
			}

			.registered_form {
				line-height: 90upx;
				margin: 0 25upx 0 25upx;

				.registered_form_text {
					border-bottom: 1px solid #f1f1f1;
					display: flex;

					.registered_form_left {
						margin: 0 20upx 0 20upx;
						width: 32%;
						font-size: 30upx;
						font-family: Fantasy;
					}

					.registered_form_input {
						margin-top: 22.5upx;
						font-size: 30upx;
					}

					.registered_form_btn {
						background: #04c262;
						color: #FFFFFF;
						font-size: 14px;
						line-height: 60upx;
						margin-top: 18upx;
						width: 180upx;
						text-align: center;
						height: 60upx;
						border-radius: 3px;

					}

					.registered_form_ipt {
						margin-top: 22.5upx;
						width: 42%;
						font-size: 30upx;
					}
				}
			}

			.registered_add_btn {
				width: calc(100% - 80upx);
				margin: 34upx 0 0 40upx;
				line-height: 80upx;
				border-radius: 40upx;
				color: #FFFFFF;
				justify-content: center;
				text-align: center;
				background: #1989f9;
			}
		}
	}
</style>
