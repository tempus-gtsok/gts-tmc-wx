<template>
	<view class="fligthdyname">
		<loading>
		</loading>
		<headnavigation titles="豪华邮轮"></headnavigation>
		<view class="listshow" v-for="(item,index) in datalist" :key="index">
			<view class="listtops">
				<view class="lstt_l">
					<view class="iconfont" style="color: #007aff;margin-right: 5upx;">
						&#xe64a;
					</view>
					{{item.name}}
				</view>
			</view>
			<view class="listput">
				<view class="listimgs">
					<image :src="item.img" mode=""></image>
				</view>
				<view class="lisrigs">
					<view class="tiels">
						{{item.remark}}
					</view>
					<view class="prices">
						<view class="pricest">
							售价<span>￥{{item.saleAmount}}</span>起
						</view>
						<view class="btnsl" @click="addcruise(item)">
							预定
						</view>
					</view>
					<view class="stock">库存:	<span>{{item.stock}}</span></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import torok from '@/api/torowk.js'
	export default {
		
		data() {
			return {
				
				
				datalist: [],
				airportlist:[]
			}
		},
		mounted() {
			this.cruiselist()
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
		},
		methods: {
			rblcok(){
				// #ifdef  APP-PLUS
					uni.navigateBack({
					})
				// #endif
				// #ifdef  H5 || MP-WEIXIN
					uni.navigateTo({
						url: '../valist/valist',
					})
				// #endif
			},	
			addcruise(item){//预定邮轮
				uni.navigateTo({
					url: './cruiseadd?data=' + JSON.stringify(item)
				})
			},
			async cruiselist(){//查询全球包机
				let _this = this;
				
				try{
					let res = await torok.cruiselist();
					
					if(res.code == 200){
						_this.datalist = res.data;//数据
					}
				}catch(e){
					
					//TODO handle the exception
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.fligthdyname{
		width: 100%;
		.listshow{
			width: calc(100% - 80upx);
			margin: 20upx 20upx 0 20upx;
			padding: 20upx;
			font-size: 35upx;
			border-radius: 15upx;
			background: #FFFFFF;
			.listtops{
				width: 100%;
				display: flex;
				color: #C0C0C0;
				.lstt_l{
					display: flex;
					align-items: center;
					flex: 1;
					color: black;
					image{
						width: 35upx;
						height: 35upx;
					}
				}
				.lstt_r{
					flex: 1;
					text-align: right;
				}
			}
			.listput{
				width: 100%;
				display: flex;
				margin-top: 20upx;
				.listimgs{
					width: 150upx;
					height: 150upx;
					background-color: red;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.lisrigs{
					width: calc(100% - 170upx);
					margin-left: 20upx;
					.tiels{
						font-size: 26upx;
						overflow:hidden;
						text-overflow:ellipsis;
						display:-webkit-box;
						-webkit-box-orient:vertical;
						-webkit-line-clamp:3; 
					}
					.prices{
						display: flex;
						align-items: center;
						justify-content: space-between;
						.pricest{
							text-align: right;
							font-size: 24upx;
							span{
								font-size: 36upx;
								color: #FF9000;
							}
						}
						.btnsl{
							width: 150upx;
							height: 60upx;
							line-height: 60upx;
							text-align: center;
							font-size: 24upx;
							border-radius: 6upx;
							color: #FFFFFF;
							background: #52C41A;
						}
					}
					.stock{
						text-align: left;
						font-size: 24upx;
						span{color: red;}						
					}
				}
			}
		}
	}
</style>
