<template>
	<view class="container999" style="background:#edf0f5;padding-bottom: 100upx;">
		<tabBar :currentPage="currentPage"></tabBar>
		<mydis></mydis>
	</view>
</template>

<script>
	import tabBar from '@/components/view/Navigations.vue';
	import  mydis from '@/components/view/mydi/mydis.vue';
	export default {
		components: {tabBar,
					 mydis},
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
