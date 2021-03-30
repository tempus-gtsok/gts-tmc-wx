<template>
	<view class="car_cancel">
		<loading>
		</loading>
		<view class="Navigation">
			<view class="smtis">
				<view @click="rblcok" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
			</view>
			<view class="ongbutn">
				订单取消
			</view>
			<view class="smtis">
			</view>
		</view>
		<view class="car_ts" style="margin-top: 20upx;">
			司机已接单，取消可能产生费用
		</view>
		<view class="car_ts">
			请查看具体取消规则
		</view>
		<view class="car_ts cars_ts">
			请勿频繁取消，否则可能导致无司机接单
		</view>
		<view class="car_img">
			<image src="@/static/img/carbus/carcels_mg.png" mode=""></image>
		</view>
		<view class="car_no" @click="rblcok">
			暂不取消
		</view>
		<view class="car_yes" @click="carck">
			取消订单
		</view>
		<view class="car_nos" v-if="car_nos == 1">
			<view class="Navigation">
				<view class="smtis">
					<view @click="car_nos = 0" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
				</view>
				<view class="ongbutn">
					取消原因
				</view>
				<view class="smtis">
				</view>
			</view>
			<view class="car_nos_l">
				你为什么取消
			</view>
			<view class="car_nos_s">
				请告知我们，我们可以改善
			</view>
			<view class="carlist_s">
				<view class="carli_s" v-for="(item,index) in car_cancel_list" :key="index" @click="carclick(item)">
					<view class="iconfont" v-if="car_cenid == item.id" style="color:#007aff; font-size: 45upx;">
						&#xe618;
					</view>
					<view class="iconfont" v-else style="color:#007aff; font-size: 45upx;">
						&#xe80c;
					</view>
					<view style="margin-left: 30upx;">
						{{item.value}}
					</view>
				</view>
			</view>
			<view class="car_yes" @click="btnski">
				提交
			</view>
			<view class="car_ops" @click="car_nos = 2">
				<span class="iconfont" style="font-size: 28upx;margin-right: 10upx;">&#xe607;</span>取消规则
			</view>
		</view>
		<view class="car_nos" v-if="car_nos == 3">
			<view class="Navigation">
				<view class="smtis">
					<view @click="retns" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
				</view>
				<view class="ongbutn">
					行程取消
				</view>
				<view class="smtis">
				</view>
			</view>
			<view class="car_ax">
				<view class="iconfont" style=" font-size: 80upx;">
					&#xe64e;
				</view>
				<view class="car_axfont">
					取消基础费用为<span>{{canprice.baseCost}}</span>元,司机等待费用为<span>{{canprice.driverWaitCost}}</span>元
				</view>
				<view class="car_opst" @click="car_nos = 2">
					<span class="iconfont" style="font-size: 28upx;margin-right: 10upx;">&#xe607;</span>取消规则
				</view>
			</view>
			<view class="btnsfixd">
				<view class="pricnus" @click="pymount">
					取消并支付
				</view>
				<view class="pricnus pricnust" style="margin-top: 40upx;" @click="rblcok">
					返回首页
				</view>
			</view>
			
		</view>
		<view class="car_nos" v-if="car_nos == 2">
			<view class="Navigation">
				<view class="smtis">
					<view @click="rtuns" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
				</view>
				<view class="ongbutn">
					取消规则
				</view>
				<view class="smtis">
				</view>
			</view>
			<view class="canlist">
				<view class="canlis" v-for="(items,index) in canslist" :key="index">
					{{items}} <span v-if="index == 2" style="color: #007aff;text-decoration: underline;">联系客服</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import order from '@/api/order.js'
	export default{
		data(){
			return{
				car_lish:0,//历史
				car_nos:0, //1取消原因 2取消规则 3提交取消后
				car_cancel_list:[],
				canslist:[
					'1.频繁取消，可能导致无司机接单。如因您自身原因取消订单，请与司机充分沟通后再取消，以避免给司机带来的不便',
					'2.如因司机原因导致行程被取消，可以通过投诉来反馈，我们将尽快核实，并向您反馈结果',
					'3.为了保证平台公平性，因您责任导致订单取消时，服务商可能向你收取取消费用，具体规则以服务商为准，若有疑问请',
					'4.司机可能要求您取消订单，这会导致平台无法获取真实行程，在遇到紧急情况时无法定位原因，为了您安全考虑请不要线下交易'
				],
				car_cenid:1,
				car_id:'',
				saleOrderNo:'',
				canprice:{},
				saletype: 2,
				car_reason:''//取消原因
			}
		},
		onLoad(va) {
			this.saletype = va.saletype;//支付类型 1为现结 2位日结
			this.tradeNo = va.data;
			this.car_id = va.id;
			this.saleOrderNo = va.saleOrderNo;
		},
		methods:{
			retns(){
				this.car_nos = 1;
				this.car_lish = 1;
			},
			rtuns(){
				this.car_nos = this.car_lish;
			},
			rblcok(){
        uni.reLaunch({
					url:'carorderlist?data=' + this.tradeNo
				})
			},
			carclick(it){
				this.car_cenid = it.id;
				this.car_reason = it.value;
			},
			async carck(){
				
				try{
					let res = await order.getUseCarCancelReason({ //用车取消原因
						platFormKey:this.car_id
					})
					
					this.car_cancel_list =  [];
					if(res.code == 200){
						this.car_cancel_list = res.data;
						this.car_cenid = this.car_cancel_list[0].id;
						this.car_reason = this.car_cancel_list[0].value;
						this.car_nos = 1;
						this.car_lish = 1;
					}
				}catch(e){
					
					//TODO handle the exception
				}
				
			},
			async pymount(){ //提交费用并取消
				let _this = this;
				
				try{
					let res = await order.carCancelOrder({
						saleOrderNo: _this.saleOrderNo,
						force:true,
						reason:_this.car_reason,
						reasonId:_this.car_cenid
					});
					
					if(res.code == 200){
						uni.showToast({
							title:'取消成功',
							duration:1000,
							icon:'none'
						})
						setTimeout(()=>{
							_this.rblcok()
						},1000)
					} else{
						uni.showToast({
							title:res.message,
							duration:1000,
							icon:'none'
						})
					}
				}catch(e){
					
					//TODO handle the exception
				}
			},
			async btnski(){//提交确定
				let _this = this;
				
				try{
					let res = await order.carCancelOrder({
						saleOrderNo: _this.saleOrderNo,
						force:false,
						reason:_this.car_reason,
						reasonId:_this.car_cenid
					});
					
					if(res.code == 200){
						uni.showToast({
							title:'取消成功',
							duration:1000,
							icon:'none'
						})
						setTimeout(()=>{
							_this.rblcok()
						},1000)
					} else {
						this.canprice = res.data
						this.car_nos = 3;
						this.car_lish = 3;
					}
				}catch(e){
					
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.car_no{
		width: calc(100% - 180upx);
		height: 80upx;
		background-color: #FFFFFF;
		border: 1upx solid $uni-color-primary;
		border-radius: 10upx;
		margin: 30upx 90upx;
		font-size: 35upx;
		color: $uni-color-primary;
		text-align: center;
		line-height: 80upx;
	}
	.car_yes{
		width: calc(100% - 180upx);
		height: 80upx;
		background-color: $uni-color-primary;
		border: 1upx solid $uni-color-primary;
		border-radius: 10upx;
		margin: 30upx 90upx;
		font-size: 35upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 80upx;
	}
	.car_ops{
		margin-top: 50upx;
		width: 100%;
		height: 60upx;
		line-height: 60upx;
		font-size: 26upx;
		text-align: center;
		left: 0;
		bottom: 80upx;
		color: #808080;
	}
	.car_opst{
		width: 100%;
		height: 60upx;
		line-height: 60upx;
		font-size: 26upx;
		text-align: center;
		color: #808080;
	}
	.car_cancel{
		width: 100%;
		.car_ts{
			width: 100%;
			font-size: 38upx;
			text-align: center;
			line-height: 60upx;
		}
		.cars_ts{
			font-size: 28upx;
			line-height: 40upx;
			color: #C0C0C0;
		}
		.car_img{
			width: 100%;
			height: 500upx;
			display: flex;
			justify-content: center;
			image{
				width: 500upx;
				height: 500upx;
			}
		}
		
		.car_nos{
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background: #F1F1F1;
			z-index: 100;
			.car_ax{
				margin-top: 40%;
				width: 100%;
				height: 300upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				.car_axfont{
					font-size: 30upx;
					line-height: 60upx;
					span{
						color: #FF9000;
					}
				}
			}
			.btnsfixd{
				position: absolute;
				width: calc(100% - 80upx);
				padding: 0 40upx;
				left: 0;
				bottom:  60upx;
				.pricnus{
					width: 100%;
					height: 90upx;
					line-height: 90upx;
					text-align: center;
					color: #FFFFFF;
					font-size: 35upx;
					color: #FFFFFF;
					background: #F48F00;
				}
				.pricnust{
					background: #999999;
				}
			}
			.car_nos_l{
				width: 100%;
				font-size: 35upx;
				text-align: center;
				line-height: 80upx;
			}
			.car_nos_s{
				width: 100%;
				text-align: center;
				font-size: 35upx;
				color: #C0C0C0;
				line-height: 40upx;
			}
			.carlist_s{
				width: 100%;
				background-color: #F1F1F1;
				.carli_s{
					width: calc(100% - 80upx);
					padding-left: 80upx;
					font-size: 32upx;
					height: 90upx;
					display: flex;
					align-items: center;
					border-bottom: 1upx solid #FFFFFF;
				}
			}
			.canlist{
				width: 100%;
				margin-top: 30upx;
				font-size: 32upx;
				.canlis{
					width: calc(100% - 60upx);
					padding: 10upx 30upx;
				}
			}
			
		}
	}
</style>
