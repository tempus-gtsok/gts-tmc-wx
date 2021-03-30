<template>
	<view class="translist">
		<loading>
		</loading>
		<headnavigation titles="保险订单列表"></headnavigation>
		<view class="selsops">
			<view class="selsit" @click="secks(item)" :class="seid == item.id ? 'seclk': ''" v-for="(item,index) in selst" :key="index">
				{{item.name}}
			</view>
		</view>
		<view v-if="showlist">
			<view v-if="showlist!=undefined && showlist.length > 0">
				<view class="listshow" v-for="(item,index) in showlist" :key="index" @click="slsts(item)">
					<view class="listtops">
						<view class="lstt_l">
							<view class="iconfont" style="color: #007aff;">
								&#xe638;
							</view>
							保险订单
						</view>
						<view class="lstt_r">
							{{rest(item.saleOrder.orderChildStatus)}}
						</view>
					</view>
					<view style="line-height: 50upx;display: flex;justify-content: space-between;">
						<view>
							{{item.saleOrder.goodsName}}
						</view>
						<view style="color: #FF9000;">
							￥{{item.totalPremium}}
						</view>
					</view>
					<view style="font-size: 28upx;line-height: 60upx;">
						{{item.saleOrder.orderingTime}}
					</view>
					<view style="color: #C8C7CC;font-size: 28upx;width: 100%;overflow: scroll;">
						被保人: {{item.productKey}}
					</view>
				</view>
			</view>
			<no-data v-else></no-data>
		</view>
		<uni-load-more :loadingType="loadingType" v-if="ispages > page" :contentText="contentText" ></uni-load-more>
		<onPageScrolls :scrolltops="scrolltops"></onPageScrolls>
	</view>
</template>

<script>//火车全部列表查询
	import order from '@/api/order.js'
	import noData  from '@/components/noData.vue'; //日期
	export default{
		components: {
			noData
		},
		data(){
			return{
				scrolltops:false,//是否显示
				seid:null,
				loadingType: 0,
				contentText: {
					contentdown:'上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				selst: [{
					name: '全部',
					id:null
				},{
					name: '已投保',
					id:2
				},{
					name: '投保异常',
					id:4
				},{
					name: '部分退保',
					id:6
				},
				{
					name: '部分退款',
					id:9
				}],
				ispages: 0,
				
				
				page: 1,
				showlist: null,//火车全部列表
			}
		},
		//1.未投保 2.已投保 3.已退保（订单子状态1:未投保;2:已投保;3:已取消;4:投保异常;5:已退保;6:部分退保;7:部分投保;8:退款中;9:部分退款;10:已退款;11:退款异常;12:退款待审核;13:登帐
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
		onLoad(item){
			if(item.ist >= 0){
				this.seid = item.ist;
			} else {
				this.seid = null;
			}
		},
		mounted() {
			this.selist(1)
		},
		methods:{
			onPageScroll(res){//距离页面顶部距离
				if(res.scrollTop <600){
					this.scrolltops = false;
				} else {
					this.scrolltops = true;
				}
			},
			rest(ite){
				let arr = [{
						name: '未投保',
						id:1
					},{
						name: '已投保',
						id:2
					},
					{
						name: '已取消',
						id:3
					},
					{
						name: '投保异常',
						id:4
					},
					{
						name: '已退保',
						id:5
					},{
						name: '部分退保',
						id:6
					},{
						name: '部分投保',
						id:7
					},{
						name: '退款中',
						id:8
					},{
						name: '部分退款',
						id:9
					},{
						name: '已退款',
						id:10
					},{
						name: '退款异常',
						id:11
					},{
						name: '退款待审',
						id:12
					},{
						name: '登帐',
						id:13
					}]
				for(let i in arr){
					if(arr[i].id == ite){
						return arr[i].name
					}
				}
			},
			slsts(item){//查看当前详情
				uni.navigateTo({
					url:'./insuralist/insuralist?code=' + item.saleOrderNo + '&ist=' +this.seid,
				})
			},
			secks(item){
				this.showlist = null;
				this.seid = item.id;
				this.selist(1);
			},
			async selist(it){//保险查询
				let that = this;
				if(it == 1){
					
				}
				let dat = {};
				let res;
				that.page = 1;
				that.loadingType = 0;
				dat = {
					pageVO:{
						curPage:that.page,//第几页
						rowNum:10,//一页多少条
					},
					mssOrderRequest:{
						productType:"4",//类型 10为火车
						orderState:that.seid,
						bookStartDate:"",
						bookEndDate:""
					}
				}
				try{
					res =await order.queryOrders(dat);
					
					if(res.code == 200){
						that.page++;//得到数据之后page+1
						that.ispages = res.data.total;//总共多少页
						that.showlist = res.data.rows || [];
						if(it == 2){
							uni.stopPullDownRefresh();
						}
					} else {
						if(it == 2){
							uni.stopPullDownRefresh();
						}
						that.showToasts(res.message);
					}
				}catch(e){
					console.log(e)
					
				}
			},
			async getmorenews(){ //上拉加载
				if (this.loadingType !== 0) {//loadingType!=0;直接返回
					return false;
				}
				if(this.page > this.ispages){
					return false;
				}
				this.loadingType = 1;
				uni.showNavigationBarLoading();//显示加载动画
				let dat = {};
				let res;
				dat = {
					pageVO:{
						curPage:this.page,//第几页
						rowNum:10,//一页多少条
					},
					mssOrderRequest:{
						productType:"4",//类型 10为火车
						orderState:this.seid,
						bookStartDate:"",
						bookEndDate:""
					}
				}
				
				try{
					res =await order.queryOrders(dat);
					
					if(res.code == 200){
						if (res.data.rows == 0) {//没有数据
							this.loadingType = 2;
							uni.hideNavigationBarLoading();//关闭加载动画
							return;
						}
						this.page++;//每触底一次 page +1
						this.showlist = this.showlist.concat(res.data.rows);
						this.loadingType = 0;//将loadingType归0重置
						uni.hideNavigationBarLoading();//关闭加载动画
					} else {
						this.showToasts(res.message);
					}
				}catch(e){
					console.log(e)
					
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.translist{
		position: relative;
		width: 100%;
		padding-bottom: 20upx;
		.selsops{
			width: 100%;
			height: 90upx;
			background: #FFFFFF;
			overflow: scroll;
			display: flex;
			white-space: nowrap;
			font-size: 30upx;
			.selsit{
				display: inline-block; 
				line-height: 90upx;
				text-align: center;
				color: #999999;
				padding: 0 25upx;
				height: 86upx;
				border-bottom: 6upx solid #FFFFFF;
			}
			.seclk{
				border-bottom: 6upx solid $uni-color-primary;
			}
		}
		.selsops::-webkit-scrollbar {
		  display: none;
		}
		.listshow{
			width: calc(100% - 80upx);
			margin: 20upx 20upx 0 20upx;
			padding: 20upx;
			font-size: 35upx;
			border-radius: 15upx;
			background: #FFFFFF;
			.listtops{
				width: 100%;
				display: flex;
				color: #C0C0C0;
				.lstt_l{
					display: flex;
					align-items: center;
					flex: 1;
					image{
						width: 35upx;
						height: 35upx;
					}
				}
				.lstt_r{
					flex: 1;
					text-align: right;
				}
			}
		}
	}
</style>
