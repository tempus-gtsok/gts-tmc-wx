<template>
	<view class="tabBar">
		<view
		 v-for="(item,index) in tabBar" 
		 :key="item.url" 
		 class="tabbar_item" 
		 :class="{'active':item.url == currentPage}"
		 @click="navTo(item)"
		 >
			<image v-if="item.url == currentPage" :src="item.imgNormals"></image>
			<image v-else :src="item.imgNormal"></image>	
			<view class="text">{{item.text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			currentPage:{
				type:String,
				default:'Book'
			}
		},
		data() {
			return {
				tabBar:[{
						url:'Book',
						text:'首页',
						imgNormal: require('../../static/img/home/hometac_3.png'),
						imgNormals:require('../../static/img/home/hometacs_3.png')
					},
					{
						url:'Order',
						text:'订单',
						imgNormal: require('../../static/img/home/hometac_1.png'),
						imgNormals:require('../../static/img/home/hometacs_1.png')
					},
					{
						url:'Towork',
						text:'客服',
						imgNormal: require('../../static/img/home/hometac_2.png'),
						imgNormals:require('../../static/img/home/hometacs_2.png')
					},
					{
						url:'Mydi',
						text:'我的',
						imgNormal: require('../../static/img/home/hometac_4.png'),
						imgNormals:require('../../static/img/home/hometacs_4.png')
					}]
			};
		},
		mounted() {
			//微信小程序
			// #ifdef MP-WEIXIN
				this.tabBar.splice(2,1);
			// #endif
		},
		created() {
			uni.hideTabBar({})
		},
		computed:{
			
		},
		methods:{
			navTo(item){
				if(item.url == 'Order'){
					uni.setStorageSync("sworders_od",1)
					uni.switchTab({
						url: '/pages/order/order'
					})
				} else if(item.url == 'Book'){
					uni.switchTab({
						url: '/pages/book/book' 
					})
				} else if(item.url == 'Mydi'){
					uni.switchTab({
						url: '/pages/mydi/mydi' 
					})
				} else if(item.url == 'Towork'){
					let yzfSign = uni.getStorageSync('yzfSign'+ uni.getStorageSync('appWxId'));//检验是否保存wx openid
					if(yzfSign == undefined || yzfSign == null){
						yzfSign = '37ef9b97d17200952a40cbbd49b4e0318b470ea1eae0655afee142f44a436fc7471fce0fd42bb0786c64e492728d4495f3ed98';
					}
					//h5页面跳转
					// #ifdef  H5 
					     window.location.href = 'https://yzf.qq.com/xv/web/static/chat/index.html?sign=' + yzfSign + '&c1=&c2=9988';
					// #endif
					//app内部跳转
					// #ifdef APP-PLUS
					void plus.runtime.openWeb('https://yzf.qq.com/xv/web/static/chat/index.html?sign=' + yzfSign + '&c1=&c2=9988');
					// #endif
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	//导航栏设置
		$isRadius:0upx; //左上右上圆角
		$isWidth:100vw; //导航栏宽度
		$isBorder:0px solid white; //边框 不需要则设为0px
		$isBg:white; //背景
	
	// 选中设置
		$chooseTextColor: $uni-color-primary; //选中时字体颜色
		$chooseBgColor:transparent; //选中时背景颜色 transparent为透明
	
	//未选中设置
		$normalTextColor:#999; //未选中颜色
	.tabBar{
		width: $isWidth;
		height: 100upx;
		// opacity: 0.7;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		box-shadow: 0upx -2upx 10upx rgba(89,125,172,.4);
		margin:0 auto;
		z-index: 998;
		background-color: $isBg;
		color: $normalTextColor;
		border-left: $isBorder;
		border-top: $isBorder;
		border-right: $isBorder;
		display: flex;
		justify-content: space-around;
		border-top-right-radius: $isRadius;
		border-top-left-radius: $isRadius;
		box-sizing: border-box;
		overflow: hidden;
		.tabbar_item{
			width: 25%;
			font-size: 24upx;
			width: 25%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			image{
				margin-bottom: 8upx;
				width: 30upx;
				height: 30upx;
			}
			&.active{
				border-left: $isBorder;
				border-top: $isBorder;
				background: $chooseBgColor;
				color: $chooseTextColor;
			}
		}
		image{
			width: 48upx;
			height:48upx;
			margin-left: 5upx;
		}
		
	}
</style>
