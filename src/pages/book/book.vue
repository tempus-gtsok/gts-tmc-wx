<template>
	<view class="st">
		<books ref="series" @isShows="changs"></books>
		<tabBar v-if="shows" :currentPage="currentPage"></tabBar>
	</view>
</template>

<script>
	import books from '@/components/view/book/books.vue';
	import tabBar from '@/components/view/Navigations.vue';
	export default {
		components: {tabBar,books},
		data() {
			return {
				shows:true,
				currentPage:'Book',
				isshow:false,
			}
		},
		onShow() {
			if(this.isshow){
				this.$refs['series'].search();	
			}
		},
		mounted(){
			this.isshow = true;
		},
		methods: {
			changs(va){
				if(va == 1){
					this.shows = true;
				} else {
					this.shows = va;
				}
			},
			toTop(){
				console.log('回到顶部逻辑')
			}
		}
	}
</script>

<style>
.st{
	width: 100%;
	height: 100%;
	padding-bottom: 100upx;
}
</style>
