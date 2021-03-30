<template>
	<view class="translist">
		<loading>
		</loading>
		<headnavigation titles="用车订单列表"></headnavigation>
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
							<view class="iconfont" style="font-size: 35upx;">
								&#xe648;
							</view>
							<view style="margin-left: 10upx;">
								{{item.createTime}}
							</view>
						</view>
						<view class="lstt_r">
							{{rest(item.status)}}
						</view>
					</view>
					<view class="lislist" v-if="item.carSupplierTypeName != null && item.carSupplierTypeName != ''">
						<image class="li_img" :src="item.carSupplierTypeLogo" mode=""></image>
						<view class="li_cartype">
							{{item.carSupplierTypeName}}
						</view>
						<view class="li_platenumber" v-if="item.carSaleOrderDriver != null && item.carSaleOrderDriver.vehicleNo!=null ">
							{{item.carSaleOrderDriver.vehicleNo}}
						</view>
						<view class="li_types" v-if="item.carGroupName != null && item.carGroupName != ''">
							{{item.carGroupName}}
						</view>
					</view>
					<view class="caradress">
						<view class="catleft">
							<view class="ca_x">
								<view class="ca_xs">
								</view>
							</view>
						</view>
						<view class="adname">
							{{item.startName}}
						</view>
					</view>
					<view class="caradress">
						<view class="catleft">
							<view class="ca_x" style="border: 2upx solid #F98B2A;">
								<view class="ca_xs" style="background-color: #F98B2A;">
								</view>
							</view>
						</view>
						<view class="adname">
							{{item.endName}}
						</view>
					</view>
					<view class="rider">
						<view>
							乘车人：{{item.passengerName}}  {{item.passengerMobile}}
						</view>
						<view class="" style="color: #F98B2A;" v-if="item.premium != null">
							￥{{item.premium}}
						</view>
					</view>
				</view>
			</view>
			<no-data v-else></no-data>
		</view>
		
		<uni-load-more :loadingType="loadingType" v-if="ispages > page" :contentText="contentText" ></uni-load-more>
		<onPageScrolls :scrolltops="scrolltops"></onPageScrolls>
	</view>
</template>

<script>
	import tork from '@/api/torowk.js'
	import order from '@/api/order.js'
	import noData  from '@/components/noData.vue'; //日期
	export default{
		components: {
			noData
		},
		data(){
			return{
				scrolltops:false,//是否显示
				seid:'',
				loadingType: 0,
				contentText: {
					contentdown:'上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				selst: [{
					name: '全部',
					id:''
				},{
					name: '未完成',
					id:1
				},{
					name: '已完成',
					id:9,
				}],
				ispages: 0,
				
				
				page: 1,
				showlist:null,//车列表
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
		onLoad(item){
			if (item.no != 0) {
				if (item.type == 'carodd') {
					uni.navigateTo({
						url:'./carorderlist/carorderlist?data='  + item.no
					})
				}
			}
		},
		onShow() {
			this.selist(1);
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
					id:1,
					name:'正在叫车'
				},{
					id:2,
					name:'订单已无效'
				},{
					id:3,
					name:'已派单'
				},{
					id:4,
					name:'已到达'
				},{
					id:5,
					name:'已取消'
				},{
					id:6,
					name:'已开始服务'
				},{
					id:7,
					name:'已结束服务'
				},{
					id:8,
					name:'已提交费用'
				},{
					id:9,
					name:'已完成'
				},{
					id:10,
					name:'待审批'
				},{
					id:11,
					name:'审批通过'
				},{
					id:12,
					name:'审批拒绝'
				},{
					id:13,
					name:'审批超时'
				},{
					id:14,
					name:'取消中'
				},{
					id:15,
					name:'已出发'
				},{
					id:16,
					name:'待支付'
				}]
				for(let i in arr){
					if(arr[i].id == ite){
						return arr[i].name
					}
				}
			},
			// arrivalDate(tiem){
			// 	return tiem.substring(0,10)
			// },
			slsts(item){//查看当前详情
				uni.navigateTo({
					url:'carorderlist/carorderlist?data=' + item.tradeNo
				})
			},
			secks(item){
				this.showlist = null;
				this.seid = item.id;
				this.selist(1);
			},
			async selist(it){//查询
				let that = this;
				if(it == 1){
					
				}
				let dat = {};
				let res;
				that.page = 1;
				that.loadingType = 0;
				let dst = []
				if(that.seid == 1){
					dst = [1,2,3,4,5,6,7,8]
				} else if(that.seid == ''){
					dst = []
				} else if(that.seid == 9){
					dst = [9]
				}
				dat = {
					pageVO:{
						curPage:that.page,//第几页
						rowNum:10,//一页多少条
					},
					carOrderListSearch:{
						statuList:dst,
					}
				}
				try{
					res =await order.searchUseCarOrderList(dat);
					
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
				let dst = []
				if(this.seid == 1){
					dst = [1,2,3,4,5,6,7,8]
				} else if(this.seid == ''){
					dst = []
				} else if(this.seid == 9){
					dst = [9]
				}
				dat = {
					pageVO:{
						curPage:this.page,//第几页
						rowNum:10,//一页多少条
					},
					carOrderListSearch:{
						statuList:dst,
					}
				}
				
				try{
					res =await order.searchUseCarOrderList(dat);
					
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
	page{
	}
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
					font-size: 30upx;
					color: #000000;
					flex: 5;
				}
				.lstt_r{
					flex: 2;
					text-align: right;
				}
			}
			.lislist{
				display: flex;
				align-items: center;
				line-height: 60upx;
				margin:  10upx 0;
				.li_img{
					width: 40upx;
					height: 40upx;
				}
				.li_cartype{
					font-size: 32upx;
					margin:  0 10upx;
				}
				.li_platenumber{
					height: 45upx;
					line-height: 45upx;
					padding: 0 20upx;
					font-size: 28upx;
					background-color: #EBF1FF;
					border: 1upx solid #C3C7D0;
					border-radius: 8upx;
					font-weight: 600;
				}
				.li_types{
					height: 45upx;
					font-size: 28upx;
					line-height: 45upx;
					margin-left: 20upx;
					padding:  0 20upx;
					background-color: #F1F1F1;
				}
			}
			.caradress{
				width: 100%;
				height: 60upx;
				display: flex;
				align-items: center;
				.catleft{
					width: 30upx;
					height: 50upx;
					display: flex;
					align-items: center;
					.ca_x{
						width: 16upx;
						height: 16upx;
						border-radius: 50%;
						background: #FFFFFF;
						border: 2upx solid #52C41A;
						display: flex;
						align-items: center;
						justify-content: center;
						.ca_xs{
							width: 12upx;
							height: 12upx;
							border-radius: 50%;
							background: #52C41A;
						}
					}
				}
				.adname{
					font-size: 30upx;
				}	
			}
			.rider{
				line-height: 50upx;
				font-size: 30upx;
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>
