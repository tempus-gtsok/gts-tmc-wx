<template>
	<view class="container999">
		<view class="Navigation">
			订单管理
		</view>
		<view class="navtoplist">
			<view class="nav_lis" @click="itcks(item,0)" v-for="(item,index) in cllist" v-if="rotes(item.is)" :key="index">
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
		<tabBar :currentPage="currentPage"></tabBar>
	</view>
</template>

<script>
	import tabBar from '@/components/view/Navigations.vue';
	export default {
		components: {tabBar},
		data() {
			return {
				currentPage:'Order',
				types:'',
				orders:'',
				cllist:[{
					name:'机票订单',
					id: 1,
					ico:'\ue60d',
					is:'tms:dps:list'
				},{
					name:'火车票订单',
					id: 2,
					ico:'\ue798',
					is:'tms:tra:list'
				},{
					name:'酒店订单',
					id: 3,
					ico:'\ue89b',
					is:'tms:hotel:list'
				},{
					name:'保险订单',
					id: 4,
					ico:'\ue655',
					is:'tms:ins:list'
				},{
					name:'用车订单',
					id: 5,
					ico:'\ue610',
					is:'tms:ins:list'
				}],
			}
		},
		onShow(item) {
			this.setimest()
		},
		mounted() {
		},
		methods: {
			ordatas(){
				if(this.types == 'train'){//火车下单
					this.itcks({id:2},this.orders)
				} else if(this.types == 'hotel'){//酒店下单
					this.itcks({id:3},this.orders)
				} else if(this.types == 'aircraft' || this.types == 'airTicketChanges'){//机票正常票   机票改签票
					this.itcks({id:1},this.orders)
				} else if(this.types == 'carodd'){
					this.itcks({id:5},this.orders)
				}
			},
			setimest(){//根据下单传参 跳进页面详情
				if(uni.getStorageSync("sworders_od") != 1){
					let dat = uni.getStorageSync("sworders_od");//判断是否从下单页面跳转过来  
					this.types = dat.type;
					this.orders = dat.data;
					uni.setStorageSync("sworders_od",1)//1为默认参数
					this.ordatas();
				}
			},
			itcks(item,dats){
				if(item.id == 1){
					uni.navigateTo({
						url:'/pages-order/pages/order/planeorders/planeorders?no=' + dats + '&type=' + this.types
					})
				} else if(item.id == 2){
					uni.navigateTo({
						url:'/pages-order/pages/order/trainorder/trainorder?no=' + dats + '&type=' + this.types
					})
				} else if(item.id == 4){
					uni.navigateTo({
						url:'/pages-order/pages/order/Insuranceorders/insuraorder'
					})
				} else if(item.id == 3){
					uni.navigateTo({
						url:'/pages-order/pages/order/hotelorder/hotelorder?no=' + dats + '&type=' + this.types
					})
				} else if(item.id == 5){
					uni.navigateTo({
						url:'/pages-order/pages/order/carorder/carorder?no=' + dats + '&type=' + this.types
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
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
			font-size: 30upx;
			.sls{
				display: flex;
			}
		}
	}
</style>
