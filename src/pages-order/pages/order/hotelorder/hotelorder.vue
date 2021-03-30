<template>
	<view class="translist">
		<loading>
		</loading>
		<headnavigation titles="酒店订单列表"></headnavigation>
		<view class="selsops">
			<view class="selsit" @click="secks(item)" :class="seid == item.id ? 'seclk': ''" v-for="(item,index) in selst" :key="index">
				{{item.name}}
			</view>
		</view>
		<view class="searchs">
			<input type="text" v-model="guestName" class="seinputs" value="" placeholder="入住人姓名" />
			<input type="text" v-model="hotelName" class="seinputs" value="" placeholder="酒店名称" />
			<view class="btnstlist" @click="selist(1)">
				搜索
			</view>
		</view>
		<view v-if="showlist">
			<view v-if="showlist!=undefined && showlist.length > 0">
				<view class="listshow" v-for="(item,index) in showlist" :key="index" @click="slsts(item)">
					<view class="listtops">
						<view class="lstt_l">
							<view class="iconfont" style="color: #007aff;">
								&#xe63b;
							</view>
							酒店订单
						</view>
						<view class="lstt_r">
							{{rest(item.hotelOrder.orderStatus)}}
						</view>
					</view>
					<view style="line-height: 50upx;display: flex;justify-content: space-between;">
						<view>
							{{item.hotelOrder.hotelName}}
						</view>
						<view style="color: #FF9000;">
							￥{{item.hotelOrder.totalPrice}}
						</view>
					</view>
					<view style="font-size: 28upx;line-height: 60upx;">
						入住时间: {{arrivalDate(item.hotelOrder.arrivalDate)}}
					</view>
					<view style="color: #C8C7CC;font-size: 28upx;width: 100%;overflow: scroll;">
						入住人: {{item.hotelOrder.guestName}}
					</view>
					<view style="color: #C8C7CC;font-size: 28upx;text-align: right;">
						下单时间：{{item.hotelOrder.createOrderTime}}
					</view>
				</view>
			</view>
			<no-data v-else></no-data>
		</view>
		
		<uni-load-more :loadingType="loadingType" v-if="ispages > page" :contentText="contentText"></uni-load-more>
		<onPageScrolls :scrolltops="scrolltops"></onPageScrolls>
	</view>
</template>

<script>
	import order from '@/api/order.js'
	import noData  from '@/components/noData.vue'; //日期
	export default{
		components: {
			noData
		},
		data() {
			return {
				scrolltops:false,//是否显示
				guestName: '',
				hotelName: '',
				seid: '',
				loadingType: 0,
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				selst: [{
					name: '全部',
					id: ''
				}, {
					name: '待审核',
					id: 650
				}, {
					name: '处理中',
					id: 100,
				}, {
					name: '预定成功',
					id: 101
				}, {
					name: '取消成功',
					id: 401
				}, {
					name: '已入住',
					id: 700
				}, {
					name: '未入住',
					id: 702
				}, {
					name: '订单结束',
					id: 950
				}],
				ispages: 0,


				page: 1,
				showlist: null, //酒店列表
			}
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.selist(2);
		},
		onReachBottom: function() {
			let that = this;
			if (that.timer != null) {
				clearTimeout(that.timer);
			}
			that.timer = setTimeout(function() {
				that.getmorenews();
			}, 5);
		},
		onLoad(item) {
			if (item.no != 0) {
				if (item.type == 'hotel') {
					uni.navigateTo({
						url:'./hotelorderlist/hotelorderlist?code=' + item.no
					})
				}
			}
		},
		onShow() {
			this.selist(1)
		},
		methods: {
			onPageScroll(res){//距离页面顶部距离
				if(res.scrollTop <600){
					this.scrolltops = false;
				} else {
					this.scrolltops = true;
				}
			},
			rest(ite) {
				let arr = [{
					name: '待审核',
					id: 650
				}, {
					name: '处理中',
					id: 100,
				}, {
					name: '待处理',
					id: 115,
				}, {
					name: '预定成功',
					id: 101,
				}, {
					name: '下单失败',
					id: 102,
				}, {
					name: '取消中',
					id: 400
				}, {
					name: '取消成功',
					id: 401
				}, {
					name: '审批拒绝',
					id: 121
				}, {
					name: '占房成功',
					id: 122,
				}, {
					name: '在入住',
					id: 700
				}, {
					name: '未入住',
					id: 702
				}, {
					name: '订单结束',
					id: 950
				}, {
					name: '离店',
					id: 123
				}, {
					name: '新单',
					id: 300
				}]
				for (let i in arr) {
					if (arr[i].id == ite) {
						return arr[i].name
					}
				}
			},
			arrivalDate(tiem) {
				return tiem.substring(0, 10)
			},
			slsts(item) { //查看当前详情
				uni.navigateTo({
					url: './hotelorderlist/hotelorderlist?code=' + item.tr.transationOrderNo
				})
			},
			secks(item) {
				this.showlist = null;
				this.seid = item.id;
				this.selist(1);
			},
			async selist(it) { //酒店查询
				let that = this;
				if (it == 1) {

				}
				let dat = {};
				let res;
				that.page = 1;
				that.loadingType = 0;
				dat = {
					pageVO: {
						curPage: that.page, //第几页
						rowNum: 10, //一页多少条
					},
					hotelOrderVo: {
						orderStatus: that.seid,
						guestName: this.guestName,
						hotelName: this.hotelName
					}
				}
				try {
					res = await order.searchHotelOrderList(dat);

					if (res.code == 200) {
						that.page++; //得到数据之后page+1
						that.ispages = res.data.total; //总共多少页
						that.showlist = res.data.rows || [];
						if (it == 2) {
							uni.stopPullDownRefresh();
						}
					} else {
						if (it == 2) {
							uni.stopPullDownRefresh();
						}
						that.showToasts(res.message);
					}
				} catch (e) {
					console.log(e)

				}
			},
			async getmorenews() { //上拉加载
				if (this.loadingType !== 0) { //loadingType!=0;直接返回
					return false;
				}
				if (this.page > this.ispages) {
					return false;
				}
				this.loadingType = 1;
				uni.showNavigationBarLoading(); //显示加载动画
				let dat = {};
				let res;
				dat = {
					pageVO: {
						curPage: this.page, //第几页
						rowNum: 10, //一页多少条
					},
					hotelOrderVo: {
						orderStatus: this.seid,
						guestName: this.guestName,
						hotelName: this.hotelName
					}
				}

				try {
					res = await order.searchHotelOrderList(dat);

					if (res.code == 200) {
						if (res.data.rows == 0) { //没有数据
							this.loadingType = 2;
							uni.hideNavigationBarLoading(); //关闭加载动画
							return;
						}
						this.page++; //每触底一次 page +1
						this.showlist = this.showlist.concat(res.data.rows);
						this.loadingType = 0; //将loadingType归0重置
						uni.hideNavigationBarLoading(); //关闭加载动画
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e)

				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.translist {
		position: relative;
		width: 100%;
		padding-bottom: 20upx;

		.selsops {
			width: 100%;
			height: 90upx;
			background: #FFFFFF;
			overflow: scroll;
			display: flex;
			white-space: nowrap;
			font-size: 30upx;

			.selsit {
				display: inline-block;
				line-height: 90upx;
				text-align: center;
				color: #999999;
				padding: 0 25upx;
				height: 86upx;
				border-bottom: 6upx solid #FFFFFF;
			}

			.seclk {
				border-bottom: 6upx solid $uni-color-primary;
			}
		}

		.searchs {
			margin-top: 20upx;
			width: 100%;
			height: 80upx;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;

			.seinputs {
				width: 35%;
				font-size: 30upx;
				margin-left: 20upx;
				text-indent: 15upx;
				height: 60upx;
				border-radius: 10upx;
				background: #E5E5E5;
			}

			.btnstlist {
				width: calc(30% - 80upx);
				border-radius: 10upx;
				margin-left: 20upx;
				height: 60upx;
				line-height: 60upx;
				text-align: center;
				background-color: $uni-color-primary;
				color: #FFFFFF;
				font-size: 30upx;
			}
		}

		.selsops::-webkit-scrollbar {
			display: none;
		}

		.listshow {
			width: calc(100% - 80upx);
			margin: 20upx 20upx 0 20upx;
			padding: 20upx;
			font-size: 35upx;
			border-radius: 15upx;
			background: #FFFFFF;

			.listtops {
				width: 100%;
				display: flex;
				color: #C0C0C0;

				.lstt_l {
					display: flex;
					align-items: center;
					flex: 1;

					image {
						width: 35upx;
						height: 35upx;
					}
				}

				.lstt_r {
					flex: 1;
					text-align: right;
				}
			}
		}
	}
</style>
