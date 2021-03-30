<template>
	<view class="lxname">
		<headnavigation titles="选择联系人"></headnavigation>
		<view class="l_list">
			<view class="i_nas" style="border-bottom: 1upx solid #F1F1F1;">
				<span class="iconfont">&#xe7e9;</span>
				<input type="text" v-model="namel" value="" />
				<view class="btsnc" @click="mulist(0)">
					查询
				</view>
			</view>
			<view class="i_nas">
				<span class="iconfont">&#xe623;</span>
				<input type="number" v-model="iponel" maxlength="11" value="" />
				<view class="btsncs">
				</view>
			</view>
		</view>
		<view class="tstext">
			司机会直接联系乘车人，请提前通知乘车人准备出行
		</view>
		<view class="btnsok" @click="oklistk">
			确定
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				namel:'',
				iponel:'',
				is_no:1
			}
		},
		onLoad(it) {
			let dstp = JSON.parse(it.data);
			this.namel  = dstp.namel;
			this.iponel = dstp.iponel;
		},
		onShow() {
			uni.$on("carcompanystaff", rets => {
				this.namel  = rets.name;
				this.iponel = rets.ipone;
				uni.$off("carcompanystaff")
			})
		},
		mounted() {
		},
		methods:{
			mulist() { //查询所有部门
				uni.navigateTo({
					url:"./carcompanystaff?data=1"
				})
			},
			oklistk(){//选择当前联系人
				let namel = this.namel;
				let iponel = this.iponel;
				if(namel == ''){
					uni.showToast({
					    title: '请输入联系人',
					    duration: 1000,
						icon:'none'
					});
				} else if(iponel == ''){
					uni.showToast({
					    title: '请输入联系电话',
					    duration: 1000,
						icon:'none'
					});
				} else if(this.utils.zzPhone(iponel)){
					uni.showToast({
					    title: '电话格式错误',
					    duration: 1000,
						icon:'none'
					});
				} else {
					uni.$emit("carcontacts",{name:namel,iponel:iponel});
					uni.navigateBack({
					})
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.lxname{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		z-index: 300;
		.l_list{
			width: calc(100% - 40upx);
			padding: 60upx 20upx 0 20upx;
			.i_nas{
				display: flex;
				height: 90upx;
				line-height: 90upx;
				align-items: center;
				justify-content: center;
				span{
					margin: 0 20upx;
					color: #BEBEBE;
				}
				input{
					width: calc(100% - 190upx);
					height: 60upx;
				}
				.btsnc{
					width: 120upx;
					height: 50upx;
					color: #FFFFFF;
					font-size: 30upx;
					text-align: center;
					line-height: 50upx;
					background-color: $uni-color-primary;
					border-radius: 8upx;
				}
				.btsncs{
					width: 120upx;
					height: 50upx;
				}
			}
		}
		.tstext{
			width: 100%;
			margin-top: 40upx;
			height: 70upx;
			line-height: 70upx;
			text-align: center;
			color: #787771;
			font-size: 30upx;
			background-color: #DAD8D4;
		}
		.btnsok{
			position: absolute;
			left: 20upx;
			bottom: 60upx;
			width: calc(100% - 40upx);
			height: 90upx;
			background-color: $uni-color-primary;
			text-align: center;
			line-height: 90upx;
			font-size: 34upx;
			color: #FFFFFF;
			border-radius: 10upx;
		}
	}
</style>
