<template>
	<view class="container999 mian">
		
		<view class="number">
			<view class="input-op">
				<view class="input-lis">
					<view class="iconfont" style="color: #9a9a9c;">&#xe623;</view>
					<input type="number" v-model="ipone" maxlength="11" @input="search($event)" class="input-css" placeholder="新手机号" />
				</view>
			</view>
			<view class="input-op">
				<view class="input-lis">
					<view class="iconfont" style="color: #9a9a9c;">&#xe61a;</view>
					<input type="number" v-model="Verification" maxlength="6" class="input-css" placeholder="短信验证码" />
					<button class="button" :disabled="isdisab" :class="canClick ? 'disabled': ''" @click="countDown">
						{{content}}
					</button>
				</view>
			</view>
			<view class="register">
				<button class="_register" @click="login">确认</button>
				<button form-type="submit" @click="pas_click" class="charge">取消</button>
			</view>
		</view>
	</view>
</template>

<script>
	import Login from "@/api/login.js"
	
	
	export default {
		data() {
			return {
				
				
				ipone: "",
				Verification:"",
				isdisab: true,
				content: '获取验证码', // 按钮里显示的内容
				totalTime: 10, //记录具体倒计时时间
				canClick: false, //添加canClick
				op_lo: "获取验证码"
			}
		},
		components:{
		},
		methods: {
			async login(){ //登录
				let _this = this;
				let ipon = _this.ipone;//电话号码
				let ver = _this.Verification;//验证码
				if(ipon == ''){
					_this.showToasts("请输入电话号码!");
				} else if(this.utils.zzPhone(ipon)){
					_this.showToasts("请输入正确的电话号码!");
				} else if(ver == ''){
					_this.showToasts("请输入验证码!");
				} else {
					let user = {
						phone: ipon,
						verificationCode: ver
					} 
					
					try{
						let res = await Login.change_phone(user);
						
						if(res.code == 200){
							_this.$store.commit('userTokenAi',res.data);
							uni.setStorageSync("changePhone",ipon);
							uni.navigateTo({
								url: '../information',
								success(){
									let page = getCurrentPages().pop();  //跳转页面成功之后
								}
							});
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
				_this.canClick = false;
				_this.isdisab = true;
				
				_this.content = '重新发送(' + _this.totalTime + ')'
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
				
				try{
					let res = await Login.vess_code({"phone": (_this.ipone).toString()});
					
					if(res.code == 200){
						_this.showToasts("发送成功!");
					} else {
						_this.showToasts(res.message);
					}
				}catch(e){
					console.log(e)
					
				}
			},
			pas_click() { //返回
				let _this = this
				// #ifdef  APP-PLUS
				uni.navigateBack({
				})
				// #endif
				// #ifdef  H5 || MP-WEIXIN
				uni.navigateTo({
					url: '../information',
					success(){
						let page = getCurrentPages().pop();  //跳转页面成功之后
					}
				})
				// #endif
			},
			search(ev) { //监听input里面的手机号的值
				let _this = this;
				let va = ev.mp.detail.value; //获取搜索框的值
				if (va.length == 11) {
					if(this.utils.zzPhone(va)){
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

<style lang="scss" scoped>
	.mian {

		.number {
			width: 100%;
			background: #FFFFFF;

			.input-op {
				height: 120upx;
				padding: 1upx 20upx;
				line-height: 120upx;
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
						margin: 0 0 0 80upx;
						height: 80upx;
						line-height: 80upx;
						font-size: 30upx;
						color: #dce0e5;
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
				// width: 100%;
				margin: 0 5%;
				height: 120upx;
				line-height: 120upx;
				color: #d1d6dd;
				font-size: 35upx;
				background: red;
				// align-content: center;
				border-bottom: #d1d6dd 0.5upx solid;
			}

			.register {
				width: 100%;
				padding: 10upx 0;
				font-size: 30upx;
				._register {
					color: #FFFFFF;
					margin: 20upx 20upx;
					background: $uni-color-primary;
				}

				.charge {
					color: $uni-color-primary;
					border: 1upx solid $uni-color-primary;
					margin: 20upx 20upx;
					background: #FFFFFF;
				}
			}

			.note {
				// width: 100%;
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
	}
</style>
