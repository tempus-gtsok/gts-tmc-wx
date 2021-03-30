
<template>
	<view class="ordsrs">
		<headnavigation titles="高端定制"></headnavigation>
		<view class="navtoplist">
			<view class="nav_lis" @click="itcks(item)" v-for="(item,index) in cllist" :key="index">
				<view class="sls">
					<view class="iconfont" style="color: #007aff;margin: 0 20upx 0 40upx;font-size: 50upx;">
						{{item.ico}}
					</view>
					{{item.name}}
				</view>
				<view class="iconfont" style="color: #D0DEE5;margin-right: 30upx;font-size: 35upx;">
					&#xe61f;
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				currentPage:'Order',
				btnchend: 1,
				btnchends: 1,
				cllist:[
				// 	{
				// 	name:'豪华邮轮',
				// 	id: 1,
				// 	ico:'\ue6b5'
				// },
				{
					name:'MICE',
					id: 3,
					ico:'\ue63f'
				},{
					name:'国内机票',
					id:4,
					ico:'\ue60d'
				},{
					name:'酒店',
					id:5,
					ico:'\ue89b'
				}],
			}
		},
		onLoad() {
			
		},
		methods:{
			itcks(item){
				if(item.id == 1){
					uni.navigateTo({
						url:'./cruise/cruise'
					})
				} else if(item.id == 3){
					uni.navigateTo({
						url:'./mices/mices'
					})
				}else if(item.id == 4){
					uni.navigateTo({
						url:'./domesticairTicket/domesticairTicket'
					})
				}else if(item.id == 5){
					uni.navigateTo({
						url:'./hotel/hotel'
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	$brgk_blue: linear-gradient(to right, #4E92FD 0%,#6E46FE 100%);
	.ordsrs{
		width: 100%;
		
		.navtoplist{
			width: calc(100% - 40upx);
			padding: 20upx;
			.nav_lis{
				height: 120upx;
				margin-bottom: 20upx;
				line-height: 120upx;
				background: #FFFFFF;
				text-align: center;
				border-radius: 15upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.sls{
					display: flex;
					font-size: 30upx;
				}
			}
		}
	}
</style>
