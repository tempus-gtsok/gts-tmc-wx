<template>
	<view class="container999" style="background:#edf0f5;padding-bottom: 100upx;">
		<tabBar :currentPage="currentPage"></tabBar>
		<head-portrait></head-portrait>
	</view>
</template>

<script>
	import tabBar from '@/components/view/Navigations.vue';
	import  headPortrait from '@/components/view/mydi/mydi_text.vue';
	export default {
		components: {tabBar,
					 headPortrait},
		data() {
			return {
				currentPage:'Mydi'
			}
		},
		onLoad() {
			
		},
		methods: {
			toTop(){
				console.log('回到顶部逻辑')
			}
		}
	}
</script>

<style>

</style>
