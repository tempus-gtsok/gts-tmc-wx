<template>
	<view class="fiexScroll" @click="scolls" v-if="scrolltop">
		<view class="iconfont" style="color: #999999;font-size: 70upx;">
			&#xe657;
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				scrolltop:false,//返回顶部按钮
			}
		},
		props:{
			scrolltops:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			scrolltops(ts){
				this.scrolltop = ts;
			}
		},
		mounted() {
			
		},
		methods:{
			
			scolls(){//返回顶部
				uni.pageScrollTo({
				    duration:0, // 毫秒
					scrollTop:600, // 位置
					success:()=>{
						uni.pageScrollTo({
						duration:250, // 毫秒
						scrollTop:0, // 位置
						});
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.fiexScroll{
		position: fixed;
		border-radius: 50%;
		right: 20upx;
		bottom: 120upx;
		width: 70upx;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		background-color: #FFFFFF;
		z-index: 100;
	}
</style>
