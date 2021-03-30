<template>
	<view class="Navigation">
		<view class="smtis">
			<view @click="rblcok" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
		</view>
		<view class="ongbutn" style="font-size: 35upx;">
			{{title}}
		</view>
		<view class="smtis">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: ''
			}
		},
		props: {
			titles: {
				type: String,
				default: ''
			},
		},
		mounted() {
			this.title = this.titles;
		},
		methods: {
			rblcok() {
				// #ifdef H5
				history.back();
				// #endif
				// #ifdef MP-WEIXIN
				uni.navigateBack()
				// #endif
			}
		}
	}
</script>

<style>
</style>
