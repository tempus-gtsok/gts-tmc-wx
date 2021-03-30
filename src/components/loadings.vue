<template>
	<view class="loading-popup">
		<view v-if="show" class="shade-popup" @click.stop :class="[ani]"></view>
		<view v-if="show" class="" :class="[ani,ans]" :style="[{height:height,width:width,backgroundColor:backgroundColor}]">
			<slot></slot>
			<div class="face">
				<div class="circle"></div>
			</div>
			<div class="face">
				<div class="circle"></div>
			</div>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			ans: {
				value: String,
				default: 'loading-content'
			},
			shadeShow: {
				value: Boolean,
				default: true
			},
			shadeClick: {
				value: Boolean,
				default: false
			},
			custom: {
				value: Boolean,
				default: false
			},
			type: {
				value: Number,
				default: 1
			},
			width: {
				value: String,
				default: "350rpx"
			},
			height: {
				value: String,
				default: "240rpx"
			},
			backgroundColor: {
				value: String,
				default: "rgba(0,0,0,0)"
			},
			callback: {
				type: Function,
				default: function() {

				}
			}
		},
		data() {
			return {
				ani:'open-animation'
			};
		},
		methods: {},
		computed: {
			show() {
				return this.$store.state.loading
			},
		},
	};
</script>

<style scoped lang="scss">
	/*弹窗*/
	.loading-popup{
		.shade-popup{
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0,0,0,0);
			transition: all .6s;
			z-index: 998;
		}
		.shade-popup.open-animation{
			opacity: 0.5;
		}
		.loading-contents{
			z-index: 999;
			position: fixed;
			padding-top: 60%;
			display: flex;
			justify-content: center;
			text-align: center;
			align-items: center;
			border-radius: 20rpx;
			margin: auto;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			transform: scale(1.2);
			transition: all .6s;
			opacity: 0;
		}
		.loading-contents.open-animation{
			transform: scale(1);
			opacity: 1;
		}
		.loading-content{
			z-index: 999;
			position: fixed;
			display: flex;
			justify-content: center;
			text-align: center;
			align-items: center;
			border-radius: 20rpx;
			margin: auto;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			transform: scale(1.2);
			transition: all .6s;
			opacity: 0;
		}
		.loading-content.open-animation{
			transform: scale(1);
			opacity: 1;
		}
	}
	.loading-popup .face {
	    position: absolute;
	    border-radius: 50%;
	    border-style: solid;
	    animation: animate 3s linear infinite;
	}
	
	.loading-popup .face:nth-child(1) {
	    width: 100upx;
	    height: 100upx;
	    color: $uni-color-success;
	    border-color: currentColor transparent transparent currentColor;
	    border-width: 3upx 3upx 0upx 0upx;
	    --deg: -45deg;
	    animation-direction: normal;
	}
	
	.loading-popup .face:nth-child(2) {
	    width:  75upx;
	    height: 75upx;
	    color: $uni-color-primary;
	    border-color: currentColor currentColor transparent transparent;
	    border-width: 3upx 0upx 0upx 3upx;
	    --deg: -135deg;
	    animation-direction: reverse;
	}
	
	.loading-popup .face .circle {
	    position: absolute;
	    width: 50%;
	    height: 1upx;
	    top: 50%;
	    left: 50%;
	    background-color: transparent;
	    transform: rotate(var(--deg));
	    transform-origin: left;
	}
	
	.loading-popup .face .circle::before {
	    position: absolute;
	    top: -5upx;
	    right: -5upx;
	    content: '';
	    width: 10upx;
	    height: 10upx;
	    background-color: currentColor;
	    border-radius: 50%;
	    box-shadow: 0 0 2upx,
	                0 0 4upx,
	                0 0 6upx,
	                0 0 8upx,
	                0 0 10upx,
	                0 0 0 5upx rgba(255, 255, 0, 0.1);
	}
	
	@keyframes animate {
	    to {
	        transform: rotate(2.5turn);
	    }
	}
	
</style>
