<template>
	<view class="itinerary">
		<loading>
		</loading>
		<headnavigation titles="我的行程"></headnavigation>
		<view class="selsops">
			<view class="selsit" @click="secks(item)" :class="seid == item.id ? 'seclk': ''" v-for="(item,index) in selst" :key="index">
				{{item.name}}
			</view>
		</view>
		<view class="selsops">
			<view class="selsit" @click="seckst(item)" :class="seids == item.id ? 'seclk': ''" v-for="(item,index) in selsts" :key="index">
				{{item.name}}
			</view>
		</view>
		<view v-if="showlist">
			<view v-if="showlist!=undefined && showlist.length> 0">
				<view v-if="seids == 1" >
					<view class="listshow" v-for="(item,index) in showlist" :key="index" @click="slsts(item)">
						<view class="listtops">
							<view class="lstt_l">
								<view class="iconfont" style="color:#007aff;">&#xe637;</view>
								国内机票
							</view>
							<view class="lstt_z" style="color: #007aff;">
								单程
							</view>
							<view class="lstt_r" >
								{{item.statusName}}({{item.sale.statusName}})
							</view>
						</view>
						<view class="pash" style="line-height: 50upx;" >
							<view style="flex: 2;text-align: left;color: #3B4246;">{{cityname(item.depart)}}-{{cityname(item.arrive)}}</view>
							<view><image :src="item.ims" mode="" style=""></image></view><view style="font-size: 28upx;">{{company(item.airline)}}{{item.factFlightNo}}</view>
							<view style="flex: 1;text-align: right;color:#F48F00">￥{{item.salePrice}}</view>
						</view>
						<view style="font-size: 28upx;line-height: 40upx;display: flex;">
							启程时间：<view>{{item.factDepartTime}}</view>
						</view>
						<view style="display: flex;">
							<view style="color: #C8C7CC;font-size: 28upx;flex: 1;">
								乘机人: {{item.factName}}
							</view>
						</view>
						<view style="color: #C8C7CC;font-size: 28upx;text-align: right;">
							下单时间：{{item.createTime}}
						</view>
					</view>
				</view>
				<view v-if="seids == 10">
					<view class="listshow"  v-for="(item,index) in showlist" :key="index"  @click="slsts(item)">
						<view class="listtops">
							<view class="lstt_l">
								<view class="iconfont" style="color: #007aff;">
									&#xe62f;
								</view>
								火车票
							</view>
							<view class="lstt_r">
								{{rest(item.status)}}
							</view>
						</view>
						<view style="line-height: 50upx;display: flex;justify-content: space-between;">
							<view>
								{{item.fromstation}} - {{item.tostation}}
							</view>
							<view style="color: #FF9000;">
								￥{{item.premium}}
							</view>
						</view>
						<view style="font-size: 28upx;line-height: 60upx;">
							出发时间：	{{item.departureTime}}
						</view>
						<view style="color: #C8C7CC;font-size: 28upx;width: 100%;overflow: scroll;">
							乘车人: {{item.traPassenger.name}}
						</view>
						<view style="color: #C8C7CC;font-size: 28upx;text-align: right;">
							下单时间：{{item.createTime}}
						</view>
					</view>
				</view>
				<view v-if="seids == 3">
					<view class="listshow"  v-for="(item,index) in showlist" :key="index"  @click="slsts(item)">
						<view class="listtops">
							<view class="lstt_l">
								<view class="iconfont" style="color: #007aff;">
									&#xe63b;
								</view>
								酒店订单
							</view>
							<view class="lstt_r">
								{{rests(item.orderStatus)}}
							</view>
						</view>
						<view style="line-height: 50upx;display: flex;justify-content: space-between;">
							<view>
								{{item.hotelName}}
							</view>
							<view style="color: #FF9000;">
								￥{{item.totalPrice}}
							</view>
						</view>
						<view style="font-size: 28upx;line-height: 60upx;">
							入住时间: {{arrtimes(item)}}
						</view>
						<view style="color: #C8C7CC;font-size: 28upx;width: 100%;overflow: scroll;">
							入住人: {{item.guestName}}
						</view>
						<view style="color: #C8C7CC;font-size: 28upx;text-align: right;">
							下单时间：{{item.createOrderTime}}
						</view>
					</view>
				</view>
			</view>
			<no-data v-else></no-data>
		</view>
		
		<uni-load-more :loadingType="loadingType" v-if="ispages >= page" :contentText="contentText" ></uni-load-more>
		<onPageScrolls :scrolltops="scrolltops"></onPageScrolls>

	</view>
</template>

<script>
	import tork from '@/api/torowk.js'
	import airports from '../sselect-city/airports.js'
	import certifi from '@/api/certificate.js'
	import noData  from '@/components/noData.vue'; //日期
	export default{
		components:{
			noData
		},
		data(){
			return{
				scrolltops:false,//是否显示
				loadingType: 0,
				contentText: {
					contentdown:'上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				ispages: 0,
				page: 1,
				
				
				selsts: [{
					name: '飞机',
					id:1,
				},{
					name: '火车',
					id:10,
				},{
					name: '酒店',
					id:3,
				}],
				seids:1,
				selst: [{
					name: '我的行程',
					id:1,
				},{
					name: '历史行程',
					id:2,
				}],
				seid:1,
				hang:[],
				datas:'',
				showlist:null,//数据列表
				address: airports.addressAirportAll, //航空名字
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
			this.seids = item.left;
			this.seid = item.right;
		},
		mounted() {
			this.datast();
			this.citys();
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
			async citys(){//获取机场名称
				try{
					let ret = await certifi.queryAirlineList();
					if(ret.code == 200){
						this.hang = ret.data.airlineDds; 
					} else {
						this.showToasts(res.message);
					}
				}catch(e){
					console.log(e);
				}
			},
			secks(item){
				this.showlist = null;
				this.seid = item.id;
				this.selist(1);
			},
			seckst(item){
				this.showlist = null;
				this.seids = item.id;
				this.selist(1);
			},
			cityname(name){ //城市名称
				let that = this;
				for (let j = 0; j < that.address.length; j++) {
					if (name == that.address[j].airportCode) {
						return that.address[j].cityCName;
					}
				}
			},
			company(ie) {
				for (let s in this.hang) {
					if (ie == s) {
						ie = this.hang[s];
						return ie;
					}
				}
			},
			arrtimes(itme){//酒店入住时间
				return itme.arrivalDate.substring(0,10) + ' ' +itme.arriveHotelTime
			},
			rests(ite){
				let arr = [{
					name: '待审核',
					id:650
				},{
					name: '处理中',
					id:100,
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
				},{
					name:'审批拒绝',
					id:121
				},{
					name: '占房成功',
					id:122,
				},]
				for(let i in arr){
					if(arr[i].id == ite){
						return arr[i].name
					}
				}
			},
			rest(ite){
				let arr = [{
						name: '已创建',
						id:1
					},{
						name: '占座成功',
						id:2
					},
					{
						name: '出票中',
						id:3
					},
					{
						name: '已出票',
						id:4
					},
					{
						name: '退票中',
						id:5
					},{
						name: '改签中',
						id:6
					},{
						name: '已退票',
						id:7
					},{
						name: '订单已废弃',
						id:8
					},{
						name: '已改签',
						id:9
					},{
						name: '占座失败',
						id:10
					},{
						name: '出票失败',
						id:11
					}]
				for(let i in arr){
					if(arr[i].id == ite){
						return arr[i].name
					}
				}
			},
			slsts(item){
				if(this.seids == 1){
					uni.navigateTo({
						url:'itinerarylist/ticklist?data=' + JSON.stringify(item) +'&left=' + this.seids +'&right='+this.seid
					})
				} else if(this.seids == 10){
					uni.navigateTo({
						url:'itinerarylist/trainlist?data=' + JSON.stringify(item) +'&left=' + this.seids +'&right='+this.seid
					})
				} else if(this.seids == 3){
					uni.navigateTo({
						url:'itinerarylist/hotelist?data=' + JSON.stringify(item) +'&left=' + this.seids +'&right='+this.seid
					})
				}
			},
			async selist(it){//查询
				let that = this;
				if(it == 1){ //正常查询不是翻页
					
				}
				let dat = {};
				let res;
				that.page = 1;
				that.loadingType = 0;
				try{
					if(that.seid == 1){//我的行程
						if(that.seids == 1 || that.seids == 10){
							dat = {
								pageVO:{
									curPage:that.page,//第几页
									rowNum:10,//一页多少条
								},
								mssOrderRequest:{
									productType:that.seids,
									flyStartDate: this.datas,
                  orderStatus: "5"
								}
							}
							res =await tork.queryMyselfOrders(dat);//火车飞机
							if(it == 1){
								
							}
							if(res.code == 200){
								that.page++;//得到数据之后page+1
								that.ispages = res.data.total;//总共多少页
								that.showlist = res.data.rows || [];
								if(that.seids == 1){
									for (let k in that.showlist) {						//转换城市名
										that.showlist[k]['ims'] = 'http://file.feiren.com/00/02/' + that.showlist[k].airline + '.png'
									}
								}
								if(it == 2){
									uni.stopPullDownRefresh();
								}
							} else {
								if(it == 2){
									uni.stopPullDownRefresh();
								}
								that.showToasts(res.message);
							}
						} else {
							dat = {
								pageVO:{
									curPage:that.page,//第几页
									rowNum:10,//一页多少条
								},
								hotelOrderVo:{
									arrivalStartDate: this.datas
								}
							}
							res =await tork.searchMySelfHotelOrderList(dat);//酒店
							if(it == 1){
								
							}
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
						}
					} else { //历史行程
						if(that.seids == 1 || that.seids == 10){
							dat = {
								pageVO:{
									curPage:that.page,//第几页
									rowNum:10,//一页多少条
								},
								mssOrderRequest:{
									productType:that.seids,
									flyEndDate: this.datas
								}
							}
							res =await tork.queryMyselfOrders(dat);//火车飞机
							if(it == 1){
								
							}
							if(res.code == 200){
								that.page++;//得到数据之后page+1
								that.ispages = res.data.total;//总共多少页
								that.showlist = res.data.rows || [];
								if(that.seids == 1){
									for (let k in that.showlist) {						//转换城市名
										that.showlist[k]['ims'] = 'http://file.feiren.com/00/02/' + that.showlist[k].airline + '.png'
									}
								}
								if(it == 2){
									uni.stopPullDownRefresh();
								}
							} else {
								if(it == 2){
									uni.stopPullDownRefresh();
								}
								that.showToasts(res.message);
							}
						} else {
							dat = {
								pageVO:{
									curPage:that.page,//第几页
									rowNum:10,//一页多少条
								},
								hotelOrderVo:{
									arrivalEndDate: this.datas
								}
							}
							res =await tork.searchMySelfHotelOrderList(dat);//酒店
							if(it == 1){
								
							}
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
						}
					}
				}catch(e){
					console.log(e);
					
				}
			},
			async getmorenews(){ //上拉加载
				let that = this;
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
				try{
					if(that.seid == 1){//我的行程
						if(that.seids == 1 || that.seids == 10){
							dat = {
								pageVO:{
									curPage:that.page,//第几页
									rowNum:10,//一页多少条
								},
								mssOrderRequest:{
									productType:that.seids,
									flyStartDate: this.datas
								}
							}
							res =await tork.queryMyselfOrders(dat);//火车飞机
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
								if(that.seids == 1){
									for (let k in that.showlist) {						//转换城市名
										that.showlist[k]['ims'] = 'http://file.feiren.com/00/02/' + that.showlist[k].airline + '.png'
									}
								}
							} else {
								that.showToasts(res.message);
							}
						} else {
							dat = {
								pageVO:{
									curPage:that.page,//第几页
									rowNum:10,//一页多少条
								},
								mssOrderRequest:{
									arrivalStartDate: this.datas
								}
							}
							res =await tork.searchMySelfHotelOrderList(dat);//酒店
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
								that.showToasts(res.message);
							}
						}
					} else { //历史行程
						if(that.seids == 1 || that.seids == 10){
							dat = {
								pageVO:{
									curPage:that.page,//第几页
									rowNum:10,//一页多少条
								},
								mssOrderRequest:{
									productType:that.seids,
									flyEndDate: this.datas
								}
							}
							res =await tork.queryMyselfOrders(dat);//火车飞机
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
								if(that.seids == 1){
									for (let k in that.showlist) {						//转换城市名
										that.showlist[k]['ims'] = 'http://file.feiren.com/00/02/' + that.showlist[k].airline + '.png'
									}
								}
							} else {
								that.showToasts(res.message);
							}
						} else {
							dat = {
								pageVO:{
									curPage:that.page,//第几页
									rowNum:10,//一页多少条
								},
								mssOrderRequest:{
									arrivalEndDate: this.datas
								}
							}
							res =await tork.searchMySelfHotelOrderList(dat);//酒店
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
								that.showToasts(res.message);
							}
						}
					}
				}catch(e){
					console.log(e);
					
				}
			},
			datast(){
				let date=new Date();
				
				let year=date.getFullYear();
				let month=date.getMonth();
				let day=date.getDate();
					
				let hour=date.getHours();
				let minute=date.getMinutes();
				let second=date.getSeconds();
				//这样写显示时间在1~9会挤占空间；所以要在1~9的数字前补零;
				if (month + 1<10) {
					month='0'+(month+1);
				}
				if (day<10) {
					day='0'+day;
				}
				if (hour<10) {
					hour='0'+hour;
				}
				if (minute<10) {
					minute='0'+minute;
				}
				if (second<10) {
					second='0'+second;
				}
				this.datas = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
			}
		}
	}
</script>

<style scoped lang="scss">
	.itinerary{
		width: 100%;
		height: 100%;
		padding-bottom: 20upx;
		.selsops{
			width: 100%;
			height: 90upx;
			background: #FFFFFF;
			overflow: scroll;
			display: flex;
			white-space: nowrap;
			font-size: 30upx;
			margin-bottom: 20upx;
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
				border-bottom: 1upx solid #f3f3f3;
				.lstt_l{
					display: flex;
					align-items: center;
					flex: 1;
					image{
						width: 35upx;
						height: 35upx;
					}
				}
				.lstt_z{
					flex: 0.3;
				}
				.lstt_r{
					flex: 1;
					text-align: right;
					.stri{
						color: red;
						font-size: 26upx;
					}
				}
			}
			.pash{
				width: 100%;
				display: flex;
				color: #C0C0C0;
				image{
					width: 35upx;
					height: 30upx;
				}
			}
		}
	}
</style>
