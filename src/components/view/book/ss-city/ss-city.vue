<template>
	<view class="cu-bar">
		
		<view class="padding-lr" :class=" [{'animation-slide-right':animation },{ 'Hotel_lr':current == 'Hotel'}]" @tap="startClick('left')">
			<view class="cu_li_left" v-if="current == 'Planeticket'">
				<view v-if="vx_city_left[0].name != ''">{{ vx_city_left[0].name }}</view>
				<view class="cu_lis" v-else>出发城市</view>
			</view>
			<view class="cu_li_left" v-if="current == 'Train'">
				<view v-if="tr_city_left[0].name != ''">{{ tr_city_left[0].name }}</view>
				<view class="cu_lis" v-else>出发城市</view>
			</view>
				<view class="cu_li_left Hotel_left" v-if="current == 'Hotel'">
				<view v-if="wx_Hotel.name">{{ wx_Hotel.name }}</view>
				<view class="cu_lis" v-else>入住城市</view>
			</view>
		</view>
		<view class="bt_li" @tap="toggle()" v-if="current != 'Hotel'"><view class="iconfont icon1">&#xe60e;</view></view>
		<view class="padding-lr padding-lr_r" :class="animation ? 'animation-slide-left' : ''" @click="startClick('right')">
			<view class="cu_li_right" v-if="current == 'Planeticket'">
				<view class="cu_li" v-if="vx_city_left[1].name != ''">{{ vx_city_left[1].name }}</view>
				<view class="cu_lis " v-else>到达城市</view>
			</view>
			<view class="cu_li_right" v-if="current == 'Train'">
				<view class="" v-if="tr_city_left[1].name != ''">{{ tr_city_left[1].name }}</view>
				<view class="cu_lis " v-else>到达城市</view>
			</view>
			<!-- <view class="cu_li_right" v-if="current == 'Hotel'">
				<view class="cu_lis" v-if="longitudelatitude.length == 0">
					当前位置
				</view>
				<view class="cu_lis" v-else>
					{{longitudelatitude[0]}},{{longitudelatitude[1]}}
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
import {mapState} from 'vuex';
export default {
	props: {
		isretun: {
			type:Boolean,
			default: false
		},
		current: {
			type: String,
			default: ''
		},
		currents: {
			type: String,
			default: ''
		},
		fails: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			
			
			animation: false
		}
	},
	onLoad() {
	},
	computed:{
		 ...mapState(['vx_city_left','tr_city_left','wx_Hotel','wx_hotels','longitudelatitude'])
	},
	methods: {
		toggle() {//城市左右交换
			if(this.isretun){
				return
			}
			if(this.current == 'Planeticket'){
				this.animation= true;
				setTimeout(()=>{
				    this.animation = false;
				}, 1000)
				let temp = null; //交换飞机票城市
				temp = this.vx_city_left[0];
				this.$store.commit("vx_city_le_add", [this.vx_city_left[1],temp])
			} else if (this.current == 'Train'){
				this.animation= true;
				setTimeout(()=>{
				    this.animation = false;
				}, 1000)
				let temp = null; //交换火车票城市
				temp = this.tr_city_left[0];
				this.$store.commit("tr_city_left_add", [this.tr_city_left[1],temp])
			}
		},
		startClick(ts) { //开始城市
			if(this.isretun){
				return
			}
			let _this = this
			let cus = this.current;
			let cuss = this.currents;
			let list = []
			if(cus == "Hotel"){
				if(ts == 'left'){
					list = this.wx_Hotel.name;
					if(cuss == 'Hotel'){
						uni.navigateTo({
							url: '/pages/book/sselect-city/selectcity?sta=left&type=' + cus + '&list=' + list,
						});
					} else {
						uni.navigateTo({
							url: '/pages/book/sselect-city/selectcity?sta=left&type=' + cus + '&list=' + list,
						});
					}
					
				} else {
				}
			} else {
				if(cus == "Planeticket" && this.vx_city_left[0].name.length > 1){
					list = JSON.stringify([{name:this.vx_city_left[0].name,id:this.vx_city_left[0].id},{name:this.vx_city_left[1].name,id:this.vx_city_left[1].id}])
				}
				if(cus == "Train" && this.tr_city_left[0].name.length > 1){
					console.log(this.tr_city_left)
					list = JSON.stringify([{name:this.tr_city_left[0].name,id:this.tr_city_left[0].id},{name:this.tr_city_left[1].name,id:this.tr_city_left[1].id}])
				}
				if(this.fails == 'flig'){
						uni.navigateTo({
							url: '/pages/book/sselect-city/selectcity?sta=left&type=' + cus + '&list=' + list + '&types=flig',
						});
				} else {
					if(cuss == 'Hotel'){
						uni.navigateTo({
							url: '/pages/book/sselect-city/selectcity?sta=left&type=' + cus + '&list=' + list + '&types=0',
						});
					} else{
						uni.navigateTo({
							url: '/pages/book/sselect-city/selectcity?sta=left&type=' + cus + '&list=' + list + '&types=0',
						});
					}
					
				}
				// 	uni.navigateTo({
				// 		url: '../../book/sselect-city/selectcity?sta=left&type=' + cus + '&list=' + list + '&types=flig',
				// 	});
				// } else {
				// 	uni.navigateTo({
				// 		url: '../../sselect-city/selectcity?sta=left&type=' + cus + '&list=' + list + '&types=0',
				// 	});
				// }
			}
		},
	}
}
</script>

<style lang="scss" scoped>
.cu-bar {
	display: flex;
	width: calc(100% - 40upx);
	padding: 0 20upx;
	position: relative;
	align-items: center;
	justify-content: space-between;
	position: relative;
	.bt_li {
		width: 90upx;
		height: 90upx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 50%;
		margin-left: -45upx;
		.icon1{
      width: 40px;
			color: $uni-color-primary;
      text-align: center;
			font-size: 65upx;
      // #ifdef MP-WEIXIN
      margin-left: 6rpx;
      // #endif
		}
	}
	.padding-lr {
		width: 50%;
		color: black;
		height: 90upx;
		line-height: 90upx;
		font-size: 40upx;
		.cu_li_left {
			width: 200rpx;
			font-size: 34upx;
			overflow: hidden;
			text-overflow: ellipsis; //文本溢出显示省略号
			white-space: nowrap; //文本不会换行
			color: black;
			.cu_lis {
				font-size: 35upx;
				color: #c0c0c0;
			}
      .cu_li{
        // #ifdef MP-WEIXIN
        margin-left: 60px;
        text-align: right;
        // #endif
      }
		}
		.Hotel_left{
			width: auto;
			min-width: 200upx;
			max-width: 600upx;
		}
		.cu_li_right {
      // #ifdef MP-WEIXIN
			width: 200upx;
			float: right;
      // #endif
			overflow: hidden;
			text-overflow: ellipsis; //文本溢出显示省略号
			white-space: nowrap; //文本不会换行
			text-align: right;
			font-size: 34upx;
			color: black;
			.cu_lis {
				width: 100%;
				font-size: 35upx;
				color: #c0c0c0;
			}
		}
	}
	.Hotel_lr{
		width: 100%;
	}
	.padding-lr_r {
		text-align: right;
	}

	.animation-slide-left {
		animation-name: slide-left;
		animation-duration: 0.5s;
	}
	.animation-slide-right {
		animation-name: slide-right;
		animation-duration: 0.5s;
	}
	@keyframes slide-left {
		0% {
			opacity: 0;
			transform: translateX(-500upx);
		}

		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}
	@keyframes slide-right {
		0% {
			opacity: 0;
			transform: translateX(500upx);
		}

		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}
}
</style>
