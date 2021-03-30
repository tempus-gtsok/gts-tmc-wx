<template>
	<view class="caredetails">
		<headnavigation titles="费用明细"></headnavigation>
		<view class="cartop">
			<view class="catype">
				{{dalist.cartypename}}
			</view>
			<view class="cartime">
				{{cattime(dalist.modifyTime)}}
			</view>
			<view class="catbox">
				<view class="catxi">
					
				</view>
				<view class="carnames">
					现在用车
				</view>
				<view class="catxi">
					
				</view>
			</view>
			<view class="carlist" v-for="(item,index) in dalist.carSaleOrderPrices" :key="index">
				<view class="carlistna">
					{{item.name}}
				</view>
				<view class="carlistna">
					{{item.amount}}元
				</view>
			</view>
			<view class="prcielis">
				支付金额<span style="color: #FF9000;font-size: 45upx;margin: 0 5upx;">{{dalist.premium}}</span>元
			</view>
			<view class="prcielis" style="margin: 0;">
				{{settlename(dalist.tmsOsTransationorderExtend.settlement)}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				dalist:{}
			}
		},
		onLoad(va) {
			let da = JSON.parse(va.data);
			this.dalist = da;
			console.log(da)
		},
		mounted() {
			
		},
		methods:{
			cattime(time){
				return time.substring(0,10)
			},
			sercname(id){
				if(id == 4){
					return '现在约车'
				}else if(id== 3){
					return '预约约车'
				} else if(id ==  1){
					return '接机'
				} else if(id == 2){
					return '送机'
				}
			},
			settlename(id){
				if(id == 1){
					return '微信支付'
				} else if(id == 2){
					return '额度支付'
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.caredetails{
		width: 100%;
		.cartop{
			width: calc(100% - 80upx);
			padding: 0 40upx;
			margin-top: 40upx;
			.catype{
				width: 100%;
				line-height: 60upx;
				text-align: center;
			}
			.cartime{
				width: 100%;
				line-height: 40upx;
				text-align: center;
				font-size: 30upx;
				color: #999999;
			}
			.catbox{
				width: 100%;
				display: flex;
				height: 50upx;
				align-items: center;
				margin-bottom: 30upx;
				.catxi{
					width: 40%;
					height: 1upx;
					background-color: #999999;
				}
				.carnames{
					font-size: 30upx;
					width: 20%;
					text-align: center;
				}
			}
			.carlist{
				width: 100%;
				line-height: 50upx;
				font-size: 30upx;
				display: flex;
				.carlistna{
					width: 50%;
					text-align: center;
				}
			}
			.prcielis{
				width: 100%;
				text-align: right;
				margin-top: 20upx;
				line-height: 50upx;
				font-size: 35upx;
			}
		}
	}
</style>
