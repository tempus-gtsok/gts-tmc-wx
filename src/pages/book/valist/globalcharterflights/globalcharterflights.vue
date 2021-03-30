<template>
	<view class="fligthdyname">
		<loading>
		</loading>
		<headnavigation titles="全球包机"></headnavigation>
		<view class="listshow" v-for="(item,index) in datalist" :key="index">
			<view class="listtops">
				<view class="lstt_l">
					<view class="iconfont" style="color: #007aff;margin-right: 5upx;">
						&#xe663;
					</view>
					全球包机
				</view>
			</view>
			<view style="line-height: 50upx;display: flex;justify-content: space-between;">
				<view>
					{{item.productName}}
				</view>
				<view style="color: #FF9000;">
					<span style="font-size: 28upx;">约</span>￥{{item.cfProductPrice[0].babyPrice}}
				</view>
			</view>
			<view class="blb">
				<view class="blobls">
					<view class="globcls">
						<view class="globs">
							去
						</view>
						<view>
							{{item.qfromCity}}-{{cityname(item.qflightNo)}}
						</view>
					</view>
					<view class="globcls">
						<view class="globs">
							回
						</view>
						<view>
							{{item.ftoCity}}-{{cityname(item.fflightNo)}}
						</view>
					</view>
				</view>
				<view class="btnsl">
					预定
					<picker class="btnsli" :range="item.cfProductPrice" :range-key="'timeprice'" @change="chineseChange($event,index,item)">
						{{ item.cfProductPrice[chines].timeprice }}
					</picker>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import airport from '@/pages/book/sselect-city/airports.js'
	import torok from '@/api/torowk.js'
	export default {
		
		data() {
			return {
				chines:0,
				
				
				datalist: [],//所有产品
				airportlist:[],
				productId:0,//产品id
				priceId: 0,//价格id
			}
		},
		mounted() {
			this.airportlist = airport.addressAirportAll; //航空名字
			this.flightlists()
		},
		methods: {
			chineseChange(e,index,item){//选择日期包机
				this.chines = e.detail.value;
				if(this.datalist[index].cfProductPrice[this.chines].stock == 0){
					uni.showToast({
						title:'该日期无票!',
						duration:1000,
						icon:'none'
					})
				} else {
					this.priceId = this.datalist[index].cfProductPrice[this.chines].id;
					this.productId = this.datalist[index].id;
					let dats = {
						airlineType:item.airlineType,//往返
						priceId:this.priceId,//日期id
						productId:this.productId,//产品id
						prices: this.datalist[index].cfProductPrice[this.chines].price,//单价
						taxation:this.datalist[index].cfProductPrice[this.chines].taxation,//税费
					}
					console.log(dats)
					setTimeout(()=>{
						uni.navigateTo({
							url:'./globalcharterflightsadd?data=' + JSON.stringify(dats)
						})
					},500)
				}
			},
			rblcok(){
				uni.navigateBack({
					url: '../valist/valist',
				})
			},
			async flightlists(){//查询全球包机
				let _this = this;
				
				try{
					let res = await torok.flightlist();
					
					if(res.code == 200){
						_this.datalist = res.data.records;//数据
						for (let p in _this.datalist) {
							for (let k in _this.datalist[p].cfProductPrice) {
								if(_this.datalist[p].cfProductPrice[k].stock > 10){
									_this.datalist[p].cfProductPrice[k]['timeprice'] =  _this.datalist[p].cfProductPrice[k].ondates + '　(￥' + _this.datalist[p].cfProductPrice[k].price + '，库存:充足' +')'
								} else {
									_this.datalist[p].cfProductPrice[k]['timeprice'] =  _this.datalist[p].cfProductPrice[k].ondates + '　(￥' + _this.datalist[p].cfProductPrice[k].price + '，库存:' + _this.datalist[p].cfProductPrice[k].stock +')'
								}
								
							}
						}
					}
				}catch(e){
					
					//TODO handle the exception
				}
			},
			cityname(name){ //城市名称
				let that = this;
				for (let j = 0; j < that.airportlist.length; j++) {
					if (name == that.airportlist[j].airportCode) {
						return that.airportlist[j].cityCName;
					}
				}
				return name
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fligthdyname{
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
			.blb{
				display: flex;
				align-items: center;
				.blobls{
					flex: 7;
					.globcls{
						display: flex;
						align-items: center;
						font-size: 26upx;
						margin: 10upx 0;
						.globs{
							width: 40upx;
							height: 40upx;
							text-align: center;
							line-height: 40upx;
							background-color: $uni-color-primary;
							color: #FFFFFF;
							border-radius: 2upx;
							margin-right: 5upx;
						}
					}
				}
				.btnsl{
					flex: 2;
					height: 60upx;
					line-height: 60upx;
					text-align: center;
					font-size: 24upx;
					border-radius: 6upx;
					color: #FFFFFF;
					background: #52C41A;
					position: relative;
					.btnsli{
						color: #FF9000;
						position: absolute;
						width: 100%;
						height: 60upx;
						top: 0;
						left: 0;
						z-index: 1;
						color: rgba(0,0,0,0);
					}
				}
			}
		}
	}
</style>
