<template>
	<view class="trandetails">
		<headnavigation titles="酒店住房详情"></headnavigation>
		<view class="navstop">
			<view class="">
				订单号：{{cont.saleOrderNo}}
			</view>
			<view class="lisst">
				<view class="citst">
					<view class="cits_t">
						<view class="">
							酒店名称：{{cont.hotelName}}
						</view>
						<view class="">
							酒店电话：{{cont.hotelPhone}}
						</view>
						<view class="">
							酒店床型：{{cont.bedTypeName}}
						</view>
						<view class="">
							房间数量：{{cont.bookCount}}间
						</view>
						<view class="">
							房间类型：{{cont.proName}}
						</view>
						<view class="">
							所在地址：{{cont.hotelAddress}}
						</view>
					</view>
					<view class="cits_b">
						<view class="cits_bt">
							<view class="cits_bts" style=" color: #007aff;">支付状态：{{pustatus(cont.saleOrder.payStatus)}}</view>
							<view class="cits_bts" style=" color: #007aff;">订单状态：{{userstatus(cont.orderStatus)}}</view>
						</view>
						<view class="cits_bt">
							<view class="cits_bts">入住日期：{{subtime(cont.arrivalDate)}}</view>
							<view class="cits_bts">离开日期：{{subtime(cont.departureDate)}}</view>
						</view>
						<view class="cits_bt">
							<view class="cits_bts">入住人：{{cont.guestName}}</view>
						</view>
						<view class="cits_bt">
							<view class="cits_bts">联系人：{{cont.contactName}}</view>
							<view class="cits_bts">联系电话：{{cont.contactNumber}}</view>
						</view>
						<view class="cits_bt">
							<view class="cits_btsy">总价：￥{{cont.totalPrice}}</view>
						</view>
						<view class="cits_bt">
							<view class="cits_bts" style="color: red;">取消规则：{{cont.dbCancelRule}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cont:{},
				lefts:0,
				rights:0
			}
		},
		onLoad(item) {
			this.cont = JSON.parse(item.data);
			this.lefts = item.left;
			this.rights = item.right;
		},
		methods:{
			rblcok(){
				uni.navigateBack({
					url:'../itinerary?left=' + this.lefts + '&right=' + this.rights
				})
			},
			subtime(tiem){//返回日期前10位
				return tiem.substring(0,10)
			},
			pustatus(ty){//支付状态
				if(ty == 1){
					return '待支付'
				} else if(ty == 2){
					return '支付中'
				} else if(ty == 3){
					return '已支付'
				} else if(ty == 4){
					return '为挂帐支付'
				}
			},
			userstatus(ite){//订单状态
				let arr = [{
					name: '待审核',
					id:650
				},{
					name: '处理中',
					id:100,
				},{
					name: '拒单',
					id:600,
				},{
					name: '审批拒绝',
					id:121,
				},{
					name: '占房成功',
					id:122,
				},{
					name: '申请',
					id:117,
				},{
					name: '待处理',
					id:115,
				},{
					name: '预定成功',
					id:101,
				},{
					name: '下单失败',
					id:102,
				},{
					name: '取消中',
					id:400
				},{
					name: '取消成功',
					id:401
				}]
				for(let i in arr){
					if(arr[i].id == ite){
						return arr[i].name
					}
				}
			},
			catype(it){//返回证件类型
				if(it == 1){
					return '身份证'//NI
				} else if(it == 2){
					return '护照'//PP
				} else if(it == 3){
					return '台胞证'//TB
				} else if(it == 4){
					return '港澳通行证'//GA
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.trandetails{
		position: absolute;
		width: 100%;
		height: 100%;
		padding-bottom: 300upx;
		background: #F5F5F5;
		.navstop{
			position: relative;
			width: calc(100% - 80upx);
			padding: 20upx 40upx 140upx 40upx;
			font-size: 28upx;
			color: #FFFFFF;
			background: #109DED;
			.lisst{
				position: absolute;
				left: 0;
				top: 110upx;
				width: calc(100% - 40upx);
				padding:  0 20upx;
				.citst{
					width: 100%;
					.cits_t{
						width: calc(100% - 40upx);
						padding: 20upx;
						background: #F5FAFD;
						border-top-left-radius: 15upx;
						border-top-right-radius: 15upx;
						color: #333333;
						line-height: 50upx;
					}
					.cits_b{
						width: calc(100% - 40upx);
						color: #333333;
						padding: 0 20upx;
						background: #FFFFFF;
						border-bottom-left-radius: 15upx;
						border-bottom-right-radius: 15upx;
						.cits_bt{
							display: flex;
							line-height: 60upx;
							align-items: center;
							justify-content: space-between;
							.cits_bts{
								flex: 1;
							}
							.cits_btsy{
								flex: 1;
								color: #F48F00;
							}
						}
					}
				}
				.btuserlist{
					width: 100%;
					margin-top: 20upx;
					border-radius: 15upx;
					background: #FFFFFF;
					.btuse{
						color: #C8C7CC;
						width: calc(100% - 40upx);
						padding: 20upx;
						.btul{
							margin-top: 10upx;
							color: #333333;
							.user_t{
								display: flex;
								width: 100%;
								height: 50upx;
								line-height: 50upx;
								font-size: 28upx;
								.user_l{
									flex: 3;
								}
								.user_os{
									flex: 7;
									text-align: left;
								}
								.user_o{
									flex: 6;
									display: flex;
									justify-content: flex-end;
									align-items: center;
									.uses_sp{
										margin-left:20upx;
										height: 40upx;
										line-height: 40upx;
										border-radius: 5upx;
										padding: 2upx 6upx;
										background: red;
										color: #FFFFFF;
									}
									.uses_st{
										margin-left:20upx;
										height: 40upx;
										line-height: 40upx;
										border-radius: 5upx;
										padding: 2upx 6upx;
										background: #FF9000;
										color: #FFFFFF;
									}
								}
								.user_r{
									flex: 2;
									justify-content: flex-end;
									display: flex;
									color: #FF9000;
								}
								.user_t{
									flex: 3;
								}
							}
						}
					}
					.liass{
						width: calc(100% - 40upx);
						padding: 0 20upx;
						display: flex;
						color: #C8C7CC;
						line-height: 80upx;
						.liass_l{
							font-size: 35upx;
							flex: 1;
						}
						.liass_r{
							color: #333333;
							text-align: right;
							flex: 2;
						}
						.liass_p{
							text-align: right;
							flex: 1;
							font-size: 35upx;
							color: #FF9000;
						}
					}
				}
			}
		}
	}
</style>
