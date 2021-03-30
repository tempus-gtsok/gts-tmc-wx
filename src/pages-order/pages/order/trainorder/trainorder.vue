<template>
	<view class="translist">
		<loading>
		</loading>
		<headnavigation titles="火车票列表"></headnavigation>
		<view class="selsops">
			<view class="selsit" @click="secks(item)" :class="seid == item.id ? 'seclk': ''"
				v-for="(item,index) in selst" v-if="rotes(item.is)" :key="index">
				{{item.name}}
			</view>
		</view>
		<view class="searchs">
			<input type="text" v-model="passenger" class="seinputs" value="" placeholder="乘客姓名" />
			<input type="text" v-model="destination" class="seinputs" value="" placeholder="行程" />
			<view class="btnstlist" @click="selist(1)">
				搜索
			</view>
		</view>
		<view class="listshow" v-if="seid != 11" v-for="(item,index) in showlist" :key="index" @click="slsts(item)">
			<view class="listtops">
				<view class="lstt_l">
					<view class="iconfont" style="color: #007aff;">
						&#xe62f;
					</view>
					火车票
				</view>
				<view class="lstt_r">
					{{rest(item.traSaleOrderExt.orderStatus)}}
				</view>
			</view>
			<view style="line-height: 50upx;display: flex;justify-content: space-between;">
				<view>
					{{item.traSaleOrderExt.trainName}}
				</view>
				<view style="color: #FF9000;" v-if="seid != 9">
					￥{{item.tolPrice}}
					<!-- <span v-if="item.tr.saleOrders.length == 0">￥{{item.tr.saleOrders[0].receivable}}</span>
					<span v-else>￥{{numPrice(item.tr.saleOrders)}}</span> -->
				</view>
				<view style="color: #FF9000;" v-if="seid == 9">
					￥{{item.refundPrice}}
				</view>
			</view>
			<view style="font-size: 28upx;line-height: 60upx;">
				出发时间： {{item.traSaleOrderExt.departureTime}}
			</view>
			<view style="color: #C8C7CC;font-size: 28upx;width: 100%;overflow: scroll;" v-if="seid != 9">
				乘车人: {{item.traSaleOrderExt.name}}
			</view>
			<view style="color: #C8C7CC;font-size: 28upx;width: 100%;overflow: scroll;" v-if="seid == 9">
				乘车人: {{item.traSaleChangeDetailList[0].passenagerName}}
			</view>
			<view style="color: #C8C7CC;font-size: 28upx;text-align: right;" v-if="seid != 9">
				下单时间：{{item.tr.createTime}}
			</view>
			<view style="color: #C8C7CC;font-size: 28upx;text-align: right;" v-if="seid == 9">
				退票时间：{{item.refundTime}}
			</view>
		</view>
		<view v-if="showlist">
			<view v-if="showlist!=undefined && showlist.length > 0">
				<view class="listshow" v-if="seid == 11" v-for="(item,index) in showlist" :key="index"
					@click="slstst(item)">
					<view class="listtops">
						<view class="lstt_l">
							<view class="iconfont" style="color: #007aff;">
								&#xe62f;
							</view>
							火车票
						</view>
						<view class="lstt_r">
							{{rests(item.changeStatus)}}
						</view>
					</view>
					<view v-if="item.saleChange != null && item.saleChange != undefined"
						style="line-height: 50upx;display: flex;justify-content: space-between;">
						<view>
							{{item.saleChange.goodsName}}
						</view>
						<view style="color: #FF9000;">
							￥{{item.saleChange.planAmount}}
						</view>
					</view>
					<view style="font-size: 28upx;line-height: 60upx;">
						出发时间：{{item.traSaleChangeDetailList[0].departTime}}
					</view>
					<view style="color: #C8C7CC;font-size: 28upx;width: 100%;overflow: scroll;">
						乘车人: {{renname(item.traSaleChangeDetailList)}}
					</view>
					<view style="color: #C8C7CC;font-size: 28upx;text-align: right;">
						改签时间：{{item.createTime}}
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
	//火车全部列表查询
	import order from '@/api/order.js'
	import noData from '@/components/noData.vue'; //日期
	export default {
		components: {
			noData
		},
		data() {
			return {
				scrolltops: false, //是否显示
				passenger: '',
				destination: '',
				sevalue: '',
				seid: null,
				loadingType: 0,
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				selst: [{
					name: '全部',
					id: null,
					is: 'tms:tra:list'
				}, {
					name: '已出票',
					id: 4,
					is: 'tms:tra:list'
				}, {
					name: '待出票',
					id: 3,
					is: 'tms:tra:list'
				}, {
					name: '已退票',
					id: 9,
					is: 'tms:tra:refund:list'
				}, {
					name: '改签票',
					id: 11,
					is: 'tms:tra:change:list'
				}],
				ispages: 0,


				page: 1,
				showlist: null, //火车全部列表
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
				if (item.type == 'train') {
					uni.navigateTo({
						url: './trainorderdetails?code=' + item.no
					})
				}
			}
		},
		onShow() {
			this.selist(1)
		},
		methods: {
			numPrice(nos) { //回显订单价格
				let nums = 0;
				for (let k in nos) {
					nums += nos[k].receivable
				}
				return nums
			},
			onPageScroll(res) { //距离页面顶部距离
				if (res.scrollTop < 600) {
					this.scrolltops = false;
				} else {
					this.scrolltops = true;
				}
			},
			setimo() {
				this.sevalue = this.sevalue.trim();
				this.selist(1)
			},
			renname(list) { //返回乘车人信息
				let st = [];
				for (let i in list) {
					st.push(list[i].passenagerName);
				}
				return st.join(' ')
			},
			rest(ite) {
				let arr = [{
						name: '占座中',
						id: 1
					}, {
						name: '占座成功',
						id: 2
					},
					{
						name: '出票中',
						id: 3
					},
					{
						name: '已出票',
						id: 4
					},
					{
						name: '退票中',
						id: 5
					}, {
						name: '改签中',
						id: 6
					}, {
						name: '部分退废',
						id: 7
					}, {
						name: '部分改签',
						id: 8
					}, {
						name: '已退',
						id: 9
					}, {
						name: '订单已废弃',
						id: 10
					}, {
						name: '已改签',
						id: 11
					}, {
						name: '占座失败',
						id: 12
					}, {
						name: '出票失败',
						id: 13
					}
				]
				for (let i in arr) {
					if (arr[i].id == ite) {
						return arr[i].name
					}
				}
			},
			rests(ite) {
				let arr = [{
						name: '占座成功',
						id: 1
					}, {
						name: '改签中',
						id: 2
					},
					{
						name: '改签完成',
						id: 3
					},
					{
						name: '已取消',
						id: 4
					},
					{
						name: '改签失败',
						id: 5
					},
					{
						name: '退票中',
						id: 6
					},
					{
						name: '已退票',
						id: 7
					},
					{
						name: '部分退票',
						id: 8
					}
				]
				for (let i in arr) {
					if (arr[i].id == ite) {
						return arr[i].name
					}
				}
			},
			slsts(item, ) { //查看当前详情
				if (this.seid != 9) {
					uni.navigateTo({
						url: './trainorderdetails?code=' + item.tr.transationOrderNo
					})
				} else { //退票
					uni.navigateTo({
						url: './traninchange/trainchanglist?code=' + item.saleChangeNo + '&isck=true' + '&ist=' +
							this.seid + '&vid=9'
					})
				}
			},
			slstst(item) { //查看当前改签详情
				uni.navigateTo({
					url: './traninchange/trainchanglist?code=' + item.outorderNo + '&isck=true' + '&ist=' + this
						.seid + '&vid=11'
				})
			},
			secks(item) {
				this.showlist = null;
				this.seid = item.id;
				this.selist(1);
			},
			async selist(it) { //火车查询
				let that = this;
				let dat = {};
				let res;
				that.page = 1;
				that.loadingType = 0;
				try {
					if (that.seid == 11 || that.seid == 9) { //改签退票列表第一次请求
						if (that.seid == 11) { //改签
							dat = {
								pageVO: {
									curPage: that.page, //第几页
									rowNum: 10, //一页多少条
								},
								mssOrderRequest: {
									createTypeArray: [3],
									passenger: this.passenger,
									destination: this.destination,
								}
							}
						} else { //退票
							dat = {
								pageVO: {
									curPage: that.page, //第几页
									rowNum: 10, //一页多少条
								},
								mssOrderRequest: {
									createTypeArray: [2],
									passenger: this.passenger,
									destination: this.destination,
								}
							}
						}

						res = await order.trainChangeList(dat);
						if (it == 1) {

						}
						if (res.code == 200) {
							that.page++; //得到数据之后page+1
							that.ispages = res.data.pageData.pages; //总共多少页
							that.showlist = res.data.pageData.records || [];
							if (it == 2) {
								uni.stopPullDownRefresh();
							}
						} else {
							if (it == 2) {
								uni.stopPullDownRefresh();
							}
							that.showToasts(res.message);
						}
					} else {
						dat = {
							pageVO: {
								curPage: that.page, //第几页
								rowNum: 10, //一页多少条
							},
							mssOrderRequest: {
								productType: "10", //类型 10为火车
								orderState: that.seid,
								passenger: this.passenger,
								destination: this.destination,
							}
						}
						res = await order.queryOrders(dat);
						if (it == 1) {

						}
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
					}
				} catch (e) {
					if (it == 2) {
						uni.stopPullDownRefresh();
					}
					console.log(e);

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
				try {
					if (this.seid == 11 || this.seid == 9) { //改签列表
						if (this.seid == 11) { //改签
							dat = {
								pageVO: {
									curPage: this.page, //第几页
									rowNum: 10, //一页多少条
								},
								mssOrderRequest: {
									createTypeArray: [3],
									passenger: this.passenger,
									destination: this.destination,
								}
							}
						} else { //退票
							dat = {
								pageVO: {
									curPage: this.page, //第几页
									rowNum: 10, //一页多少条
								},
								mssOrderRequest: {
									createTypeArray: [2],
									passenger: this.passenger,
									destination: this.destination,
								}
							}
						}
						res = await order.trainChangeList(dat);
						if (res.code == 200) {
							if (res.data.pageData.records == 0) { //没有数据
								this.loadingType = 2;
								uni.hideNavigationBarLoading(); //关闭加载动画
								return;
							}
							this.page++; //每触底一次 page +1
							this.showlist = this.showlist.concat(res.data.pageData.records);
							this.loadingType = 0; //将loadingType归0重置
							uni.hideNavigationBarLoading(); //关闭加载动画
						} else {
							this.showToasts(res.message);
						}
					} else {
						dat = {
							pageVO: {
								curPage: this.page, //第几页
								rowNum: 10, //一页多少条
							},
							mssOrderRequest: {
								productType: "10", //类型 10为火车
								orderState: this.seid,
								passenger: this.passenger,
								destination: this.destination,
							}
						}
						res = await order.queryOrders(dat);
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

		.searchfd {
			position: fixed;
			width: calc(100% - 60upx);
			padding: 0 30upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 110upx;
			left: 0;
			bottom: 110upx;
			z-index: 110;

			.searcleft {
				width: 100%;
				box-shadow: 5upx 5upx 10upx 5upx #E5E5E5;
				height: 90upx;
				border-radius: 90upx;
				background-color: #FFFFFF;
				display: flex;
				align-items: center;

				.seinputs {
					width: 100%;
					margin-left: 40upx;
				}
			}
		}

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
