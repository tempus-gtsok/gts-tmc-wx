<template>
	<view class="container999" style="background:#edf0f5;">
		<information></information>
		<tabBar :currentPage="currentPage"></tabBar>
	</view>
</template>

<script>
	import tabBar from '@/components/view/Navigations.vue';
	import information from '@/components/view/mydi/information/information.vue'
	export default {
		components: {information,tabBar},
		data() {
			return {
				currentPage:'Mydi',
			}
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
