<template>
	<view class="mices">
		<loading></loading>
		<headnavigation titles="会议定制"></headnavigation>
		<view class="micesbox">
			<view class="mitop">
				<view class="mitc" :class="isok == 1? 'mitcs' : ''" @click="isokbt(1)">
					<span class="iconfont" style="margin-right: 5upx;font-size: 40upx;">&#xe63f;</span>
					<span>公司会议定制</span>
				</view>
				<view class="mitc" :class="isok == 2? 'mitcs' : ''" @click="isokbt(2)">
					<span class="iconfont" style="margin-right: 5upx;font-size: 40upx;">&#xe667;</span>
					<span>公司旅游定制</span>
				</view>
			</view>
			<view class="inputs">
				<input type="text" v-model="username" value="" placeholder="联系人"/>
			</view>
			<view class="inputs">
				<input type="number" v-model="useripone" maxlength="11"  value="" placeholder="联系手机"/>
			</view>
			<view class="inputs">
				<input type="text" v-model="gsname"  value="" placeholder="公司全称"/>
			</view>
			<view class="inputs">
				<input type="email" v-model="gsemail"  value="" placeholder="公司邮箱"/>
			</view>
			<view class="inputs">
				<input type="number" v-model="gsipone"  value="" placeholder="公司电话"/>
			</view>
			<view class="btns" @click="btnclk">
				定制需求
			</view>
		</view>
	</view>
</template>

<script>
	import tork from '@/api/torowk.js'
	export default{
		data(){
			return {
				isok:1,
				username:'',//联系人
				useripone:'',//联系电话
				gsname:'',//公司名称
				gsemail:'',//公司邮箱
				gsipone:''//公司电话
			}
		},
		methods:{
			rblcok(){
				uni.navigateBack({
					url: '../valist/valist',
				})
			},
			isokbt(it){
				this.isok = it;
			},
			async btnclk(){
				let _this = this;
				let username = _this.username;
				let useripone = _this.useripone;
				let gsname = _this.gsname;
				let gsemail = _this.gsemail;
				let gsipone = _this.gsipone;
				if(username == ''){
					uni.showToast({
					    title: '联系人不能为空',
					    duration: 1000,
						icon:'none'
					});
					return
				}
				if(useripone == '' || _this.utils.zzPhone(useripone)){
					uni.showToast({
					    title: '联系电话为空或者格式不对',
					    duration: 1000,
						icon:'none'
					});
					return
				}
				if(gsname == ''){
					uni.showToast({
					    title: '公司名称不能为空',
					    duration: 1000,
						icon:'none'
					});
					return
				}
				if(gsemail == '' || this.utils.zzMailbox(gsemail)){
					uni.showToast({
					    title: '公司邮箱为空或者格式不对',
					    duration: 1000,
						icon:'none'
					});
					return
				}
				if(gsipone == ''){
					uni.showToast({
					    title: '公司电话不能为空',
					    duration: 1000,
						icon:'none'
					});
					return
				}
				let prodname = '';
				if(_this.isok == 1){
					prodname = '公司会议定制';
				} else {
					prodname = '公司旅游定制';
				}
				let dat = {
					username:username,
					mobile: useripone,
					productId: _this.isok,
					productName:prodname,
					companyName:gsname,
					companeEmail:gsemail,
					comapnyTel:gsipone
				}
				
				try{
					let res = await tork.micesave(dat);
					if(res.code == 200){
						uni.showToast({
						    title: '提交成功,工作人员会及时联系你',
						    duration: 1000,
							icon:'none'
						});
						setTimeout(()=>{
							uni.navigateBack()
						},1000)
					} else {
						uni.showToast({
						    title: res.message,
						    duration: 1000,
							icon:'none'
						});
					}
				}catch(e){
					console.log(e)
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.mices{
		width: 100%;
		.micesbox{
			width: calc(100% - 40upx);
			padding:  20upx;
			.mitop{
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				border-radius: 10upx;
				border: 2upx solid $uni-color-primary;
				display: flex;
				color: $uni-color-primary;
				background-color: #FFFFFF;
				.mitc{
					flex: 1;
					display: flex;
					font-size: 32upx;
					align-items: center;
					justify-content: center;
				}
				.mitcs{
					background-color: $uni-color-primary;
					color: #FFFFFF;
				}
			}
			.inputs{
				width: calc(100% - 40upx);
				height: 80upx;
				border-radius: 10upx;
				padding: 0 20upx;
				margin-top: 20upx;
				display: flex;
				align-items: center;
				background: #FFFFFF;
				input{
					width: 100%;
					font-size: 30upx;
				}			
				
			}
			.btns{
				width: 100%;
				height: 90upx;
				border-radius: 10upx;
				margin-top: 20upx;
				line-height: 90upx;
				text-align: center;
				background: $uni-color-primary;
				color: #FFFFFF;
				font-size: 36upx;
			}
		}
	}
</style>
