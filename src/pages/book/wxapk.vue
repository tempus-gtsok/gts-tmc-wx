<template>
	<view>
		<view class="wxapkbox" v-if="idwx">
			请点击右上角，在外部浏览器打开！
		</view>
	</view>
</template>

<script>
	import login from '@/api/login.js'
	export default{
		data(){
			return{
				idwx:true
			}
		},
		mounted() {
			// #ifdef H5
			// window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
			let ua = window.navigator.userAgent.toLowerCase();
			// 通过正则表达式匹配ua中是否含有MicroMessenger字符串
			if (ua.match(/MicroMessenger/i) == 'micromessenger') {
				this.idwx = true;
			} else {
				this.idwx = false;
				login.getAndroidAppBaseData().then((rest)=>{
					if(rest.code == 200){
						window.location.href = rest.data.androidAppPath;
					}
				}).catch((e)=>{
					console.log(e)
				})
			}
			// #endif
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="scss">
	.wxapkbox{
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
