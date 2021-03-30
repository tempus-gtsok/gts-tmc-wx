<template>
	<view class="container999">
		<towork></towork>
		<tabBar :currentPage="currentPage"></tabBar>
	</view>
</template>

<script>
	import towork from '@/components/view/towork/toworks.vue'
	import tabBar from '@/components/view/Navigations.vue';
	export default {
		components: {tabBar,towork},
		data() {
			return {
				currentPage:'Towork'
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
	/* container999定义于app.vue */
	.container999{
		background: #F6F6F6;
	}
</style>
