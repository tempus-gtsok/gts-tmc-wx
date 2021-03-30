<template>
	<view class="retriveve">
		<loading>
		</loading>
		<headnavigation titles="修改密码"></headnavigation>
		<view class="number">
			<view class="input-op">
				<view class="input-lis">
					<view class="texts" >原密码:</view>
					<input type="password" maxlength="20" v-model="oldpassword" class="input-css" placeholder="请输入原密码" />
				</view>
			</view>
			<view class="input-op">
				<view class="input-lis">
					<view class="texts" >新密码:</view>
					<input type="password" maxlength="20" v-model="newpassword" class="input-css" placeholder="请输入新密码" />
				</view>
			</view>
			<view class="input-op">
				<view class="input-lis">
					<view class="texts" >重复密码:</view>
					<input type="password" maxlength="20" v-model="newpasswords" class="input-css" placeholder="请输入重复新密码" />
				</view>
			</view>
			<view class="logins">
				<view class="loginser" @click="logins">修改密码</view>
			</view>
		</view>
	</view>
</template>

<script>
	let passwort = /[0-9a-zA-Z]+/;
	import mydi from '@/api/mydi.js'
	export default{
		data(){
			return{
				oldpassword: '',
				newpassword: '',
				newpasswords: '',
				
				
				ipone: "",
			}
		},
		methods:{
			async logins(){ //修改密码
				let _this = this;
				let oldpassword = _this.oldpassword;//原密码
				let newpassword = _this.newpassword;//新密码
				let newpasswords = _this.newpasswords;//重复新密码
				if(oldpassword == '' || newpassword == '' || newpasswords == ''){
					_this.showToasts("密码不能为空!");
				} else if(newpassword.length < 6){
					_this.showToasts("密码长度不能小于6");
				} else if(!passwort.test(newpassword)){
					_this.showToasts("密码只能为数字和字母");
				} else if(newpassword != newpasswords){
					_this.showToasts("两次密码不一致!");
				} else {
					let user = {
						newPassword: newpassword,
						oldPassword: oldpassword,
					} 
					
					try{
						let res = await mydi.changePassword(user);
						
						if(res.code == 200){
							_this.$store.commit('logout');
							_this.showToasts("修改成功,请重新登录!");
							setTimeout(()=>{
								uni.reLaunch({
									url:'../../../login/login'
								})
							},1000)
						} else {
							_this.showToasts(res.message);
						}
					}catch(e){
						console.log(e)
						
					}
				}
			}
		}
	}
	
</script>

<style scoped lang="scss">
	.retriveve{
		width: 100%;
		.number {
			margin-top: 10%;
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
					font-size: 25upx;
					input {
						text-indent: 10upx;
					}
					.texts{
						width: 25%;
						text-indent: 20upx;
					}
					.input-css {
						width: 75%;
						height: 60upx;
						font-size: 30upx;
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
</style>
