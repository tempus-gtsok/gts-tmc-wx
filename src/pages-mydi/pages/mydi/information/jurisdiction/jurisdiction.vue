<template>
	<view class="mian">   <!-- 权限 -->
		<loading>
		</loading>
		<view class="container999">
			<headnavigation titles="我的权限"></headnavigation>
			<view class="book">
				<view class="tabBar">   <!-- 循环 -->
					<view v-for="(item,index) in tabBar" :key="item.url" class="tabbar_item">
						<view class="book_name">{{item.functionName}}</view>
						<view class="book_text">
							<view v-for="(items,indexs) in item.childPermissions" :key="indexs">
								{{items.functionName}}，
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Mydi from '@/api/mydi.js'
	export default {
		data() {
			return {
				tabBar: [],
			}
		},
		mounted() {
			this.select();
		},
		methods:{
			async select(){
				
				try{
					const res = await Mydi.getUserPermission();
					if(res.code == '200'){
						this.tabBar = res.data.permission;
					} else {
						uni.showToast({
						    title: res.message,
						    duration: 1000,
							icon:'none'
						});
					}
					
				}catch(e){
					
					console.log(e)
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.mian {
		.book {
			width: 100%;

			.tabBar {

				.tabbar_item {
					width: 100%;
					padding: 30upx 0 30upx 20upx;
					border-bottom: 1upx solid #d6e0e9;
					.book_name {
						font-size: 30upx;
					}
					
					.book_text {
						display: flex;
						flex-wrap: wrap;
						font-size: 26upx;
						color: #d6e0e9;
					}
				}	
			}
		}
	}
</style>
