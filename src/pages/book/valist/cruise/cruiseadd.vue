<template>
	<view class="curladd">
		<loading></loading>
		<headnavigation titles="预定游轮"></headnavigation>
		<view class="istaf">
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">出行时间:</view>
					<view class="ravright">
						<view class="bos">
							<view class="cu_time">
								<calendar :ishtoel="ishtoel" @change="lischang" :singleDate="singleDate"></calendar>
							</view>
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
			<view class="ravelv">
				<view class="ts">
					<view class="rav_left">联系人:</view>
					<view class="ravright">
						<view class="bos"><input type="text" v-model="user_name" placeholder="请输入联系人" value="" /></view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
			<view class="ravelv" style="margin-bottom: 150upx;">
				<view class="ts">
					<view class="rav_left">联系电话:</view>
					<view class="ravright">
						<view class="bos"><input type="number" maxlength="11" v-model="user_ipone" placeholder="请输入联系电话" value="" /></view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btnsl">
			<view class="cblas" @click="btns">
				提交预定
			</view>
		</view>
	</view>
</template>

<script>
	import tork from '@/api/torowk.js'
	import calendar from '@/components/view/book/date-picker/date-picker.vue'; //日期
	export default{
		components:{
			calendar
		},
		data(){
			return{
				datatime:'',
				user_name:'',
				user_ipone:'',
				ishtoel:'cruiseadd',
				singleDate:true,
				teas:{}
			}
		},
		onLoad(res) {
			this.teas = JSON.parse(res.data);
			console.log(this.teas);
		},
		mounted() {
			this.usernams();
		},
		methods:{
			async btns(){
				let _this = this;
				if(_this.datatime == ''){
					uni.showToast({
					    title: '出发时间不能为空',
					    duration: 1000,
						icon:'none'
					});
					return
				}
				if(_this.user_name == ''){
					uni.showToast({
					    title: '联系人不能为空',
					    duration: 1000,
						icon:'none'
					});
					return
				}
				if(_this.user_ipone == '' || _this.utils.zzPhone(_this.user_ipone)){
					uni.showToast({
					    title: '电话为空或者格式不对',
					    duration: 1000,
						icon:'none'
					});
					return
				}
				let userInfo = uni.getStorageSync('userinfo'+ uni.getStorageSync('appWxId'));//检验是否是登录状态
				//console.log(userInfo.user.customUserId);
						
				 
			 
				let data = {
					username: _this.user_name,//联系人
					mobile: _this.user_ipone,//联系电话
					productName: _this.teas.name,//产品标题
					datetime: _this.datatime,//出行时间
					productId: _this.teas.code,//产品id
					loginName:userInfo.user.loginName,//当前预订用户
					customerNo:userInfo.user.customerId,//当前预订用户所属的企业客户NO
					num:1,//预订数量，目前限制为1
					saleAmount:_this.teas.saleAmount,
					itemTypeNo:_this.teas.itemTypeNo,
					baseAmount:_this.teas.baseAmount,
					stock:_this.teas.stock,
					code:_this.teas.code,
					groupCode:_this.teas.groupCode,
					groupName:_this.teas.groupName,
					valid:_this.teas.valid
				}
				
				
				try{
					let res = await tork.cruisesave(data);
					
					if(res.code == 200){
						uni.showToast({
						    title: res.message,
						    duration: 1000,
							icon:'none'
						});
						setTimeout(()=>{
							_this.rblcok();
						},500)
					} else {
						uni.showToast({
						    title: res.message,
						    duration: 1000,
							icon:'none'
						});
					}
				}catch(e){
					
					//TODO handle the exception
				}
			},
			lischang(res){
				this.datatime = res.choiceDate.re;
			},
			async usernams(){//获取联系人
				try{
					const res = await tork.getContactInfo();
					if(res.code == 200){
						this.user_name = res.data.name;
						this.user_ipone = res.data.phone;
					} else {
						this.showToasts(res.message);
					}
				}catch(e){
					console.log(e);
				}
			},
			rblcok(){
				// #ifdef  APP-PLUS
					uni.navigateBack({
					})
				// #endif
				// #ifdef  H5 || MP-WEIXIN
					uni.navigateTo({
						url:'./cruise'
					})
				// #endif
			},
		}
	}
</script>

<style scoped lang="scss">
	.curladd{
		width: 100%;
		.istaf{
			width: 100%;
			margin-top: 20upx;
			font-size: 30upx;
			.ravelv {
				width: calc(100% - 40upx);
				padding: 0 20upx;
				height: 90upx;
				background: #FFFFFF;
				margin-bottom: 20upx;
				.ts{
					line-height: 90upx;
					display: flex;
					.rav_left {
						width: 25%;
						text-align: center;
						color: #c0c0c0;
					}
					.ravright {
						width: 75%;
						display: flex;
						.bos {
							width: 93%;
							height: 90upx;
							overflow: scroll;
							display: flex;
							align-items: center;
							input {
								font-size: 30upx;
								width: 100%;
							}
							.cu_time{
								width: 100%;
							}
						}
					}
				}
			}
		}
		.btnsl{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: #FF9000;
			height: 110upx;
			.cblas{
				width: 100%;
				text-align: center;
				line-height: 110upx;
				color: #FFFFFF;
			}
		}	
	}
</style>
