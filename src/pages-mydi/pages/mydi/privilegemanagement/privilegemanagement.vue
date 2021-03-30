<template>
	<view class="prv_dv">
		<loading>
		</loading>
		<headnavigation titles="角色列表"></headnavigation>
		<view class="pr_bog">
			<view class="priv_role" :key="index" v-for="(item,index) in privilist" @click="setlist(item)">
				<view class="prleft_txt">
					{{item.name}}
				</view>
				<view class="prright_txt">
					查看
					<text class="iconfont">&#xe8a3;</text>
				</view>
			</view>
		</view>
		<view class="check_btn">
			<view class="chck_left" @click="roblak">
				返回
			</view>
			<view class="chck_right" @click="addlist" v-if="rotes('tms:aut:add')">
				新增角色
			</view>
		</view>
	</view>
</template>

<script>
	import Mydi from '@/api/mydi.js'
	export default{
		data(){
			return{
				
				
				privilist:[],//角色列表
			}
		},
		mounted() {
			this.privlist()
		},
		methods:{
			setlist(item){
				uni.navigateTo({
					url:'moveprovolegemange/moveprovolegemange?id=' + item.id + '&users=' + 
					JSON.stringify(item)
				})
			},
			addlist(){
				uni.navigateTo({
					url:'moveprovolegemange/moveprovolegemange?id=0'
				})
			},
			async privlist(){ //查询角色列表
				
				try{
					let res = await Mydi.getRoleList();
					
					if(res.code == 200){
						this.privilist = res.data
					} else {
						this.showToasts(res.message);
					}
				}catch(e){
					console.log(e)
					
				}
			},
			roblak(){//返回
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

<style lang="scss" scoped>
	.prv_dv{
		width: 100%;
		padding-bottom: 110upx;
		.pr_bog{
			width: 100%;
			border-top: 1upx solid #C8C7CC;
			.priv_role{
				width: 100%;
				height: 110upx;
				display: flex;
				line-height: 110upx;
				font-size: 30upx;
				border-bottom: 1upx solid #C8C7CC;
				.prleft_txt{
					flex: 1;
					text-indent: 40upx;
				}
				.prright_txt{
					flex: 1;
					color: $uni-color-primary;
					display: flex;
					justify-content: flex-end;
				}
			}
		}
		.check_btn{
			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;
			height: 110upx;
			display: flex;
			text-align: center;
			line-height: 110upx;
			font-size: 30upx;
			.chck_left{
				flex: 1;
				height: 110upx;
				background: #FFFFFF;
				color: $uni-color-primary;
			}
			.chck_right{
				flex: 1;
				color: #FFFFFF;
				height: 110upx;
				background: $uni-color-primary;
			}
		}
	}
</style>
