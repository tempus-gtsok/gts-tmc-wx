<template>
	<view class="mian">
		<headnavigation titles="注册"></headnavigation>
		<loading>
		</loading>
		<view class="register-main">
			<view class="input-op">
				<view class="input-lis">
					<view class="iconfont" style="color: #9a9a9c;">&#xe61b;</view>
					<input type="text" v-model="businesslicense" value="" class="input-css" placeholder="营业执照上的公司名称" />
				</view>
			</view>
			<view class="input-op">
				<view class="input-lis">
					<view class="iconfont" style="color: #9a9a9c;">&#xe63a;</view>
					<input type="text" value="" v-model="username" class="input-css" placeholder="真实姓名" />
				</view>
			</view>
			<view class="input-op">
				<view class="input-lis">
					<view class="iconfont" style="color: #9a9a9c;">&#xe623;</view>
					<input type="number" value="" v-model="ipone" maxlength="11" @input="search($event)" class="input-css" placeholder="手机号" />
				</view>
			</view>
			<view class="input-op">
				<view class="input-lis">
					<view class="iconfont" style="color: #9a9a9c;">&#xe61a;</view>
					<input type="number" value="" v-model="verification"  maxlength="6" class="input-css" placeholder="短信验证码" />
					<view class="button" :disabled="isdisab" :class="canClick ? 'disabled': ''" @click="countDown">
						{{content}}
					</view>
				</view>
			</view>
			<view class="register">
				<view class="_register" @click="register_ok()">免费注册</view>
				<view form-type="submit" class="charge" @click="rblcok">已是会员，立即登录</view>
			</view>
		</view>
		<!-- <view class="agreement">点击免费注册，即表示您同意<span>《服务协议》</span></view> -->
	</view>
</template>

<script>
	import Login from "@/api/login.js"
	export default {
		data() {
			return {
				username:"",//真实姓名
				businesslicense:"",//营业执照
				ipone:"",//电话号码
				verification: '',//短信验证码
				isdisab: true,
				content: '获取验证码', // 按钮里显示的内容
				totalTime: 60, //记录具体倒计时时间
				canClick: false, //添加canClick
				op_lo: "获取验证码"
			}
		},
		methods: {
			rblcok(){ //返回
				uni.navigateBack({
					url:'./login'
				})
			},
			async register_ok(){
				let _this = this;
				let username = this.username;//真实姓名
				let business = this.businesslicense;//营业执照
				let ipone = this.ipone;//电话号码
				let verifivation = this.verification;//短信验证码
				if(business== ''){
					_this.showToasts("请输入营业执照!");
				} else if(username == ''){
					_this.showToasts("请输入真实姓名!");
				} else if(ipone == ''){
					_this.showToasts("请输入电话号码!");
				} else if(verifivation == ''){
					_this.showToasts("请输入短信验证码!");
				} else {
					let user = {
						"contractName": business,
						"phone": ipone,
						"userName": username,
						"verificationCode": verifivation
					}
					
					try{
						let res = await Login.register(user);
						if(res.code == 200){
							_this.showToasts(res.message);
							setTimeout(()=>{
								uni.navigateBack({
								})
							},1000)
						} else {
							_this.showToasts(res.message);
						}
					}catch(e){
						console.log(e)
						
					}
				}
			},
			async countDown() {
				let _this = this
				if(_this.isdisab == true){
					return
				}
				
				try{
					let res = await Login.vess_code({"phone": (_this.ipone).toString()});
					
					if(res.code == 200){
						_this.showToasts("发送成功!");
						_this.canClick = false;
						_this.isdisab = true;
						_this.content = '重新发送(' + _this.totalTime + ')'
						let clock = setInterval(() => {
							_this.totalTime--
							_this.content = '重新发送(' + _this.totalTime + ')'
							if (_this.totalTime < 1) {
								clearInterval(clock)
								_this.content = '获取验证码'
								_this.totalTime = 60
								if(_this.ipone.length == 11 && _this.utils.zzPhone(_this.ipone) == false){
									_this.canClick = true;
									_this.isdisab = false;
								}
							}
						}, 1000);
					} else {
						_this.showToasts(res.message);
					}
				}catch(e){
					console.log(e)
					
				}
			},
			search(ev) { //监听input里面的手机号的值
				let _this = this;
				let va = ev.mp.detail.value; //获取搜索框的值
				if (va.length == 11) {
					if(_this.utils.zzPhone(va)){
						_this.showToasts("请输入正确的手机号!");
					} else {
						if(_this.content == '获取验证码'){
							_this.isdisab = false;
							_this.canClick = true;
						}
					}
				} else {
					_this.isdisab = true;
					_this.canClick = false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mian {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		.register-main {
			width: 100%;

			.input-op {
				height: 100upx;
				padding: 1upx 20upx;
				line-height: 100upx;
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
						width: 100%;
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

			.mobile {
				margin: 0 5%;
				height: 100upx;
				line-height: 100upx;
				color: #d1d6dd;
				font-size: 35upx;
				background: red;
				border-bottom: #d1d6dd 0.5upx solid;
			}

			.register {
				width: 100%;
				font-size: 30upx;
				._register {
					width: calc(100% - 40upx);
					height: 90upx;
					text-align: center;
					line-height: 90upx;
					border-radius: 10upx;
					color: #FFFFFF;
					margin: 20upx 20upx;
					background: $uni-color-primary;
				}

				.charge {
					width: calc(100% - 40upx);
					height: 90upx;
					text-align: center;
					line-height: 90upx;
					color: $uni-color-primary;
					border-radius: 10upx;
					border: 1upx solid $uni-color-primary;
					margin: 20upx 20upx;
					background: #FFFFFF;
				}
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
		.agreement{
			width: 100%;
			text-align: center;
			margin: 30upx 0;
			color:#abb7c2;
			span{
				color:#007aff;
				cursor: pointer;
			}
		}
	}
</style>
