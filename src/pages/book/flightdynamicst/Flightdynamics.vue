<template>
	<view class="fligthdyname">
		<loading>
		</loading>
		<headnavigation titles="航班动态"></headnavigation>
		<view class="flisvsl" v-if="tableList.length == 0">
			<view class="box_top">
				<view class="box_top_box" :class="isbox? 'isboxs':''" @click="boxclick('left')">
					按起降地
				</view>
				<view class="box_top_box" :class="!isbox? 'isboxs':''" @click="boxclick('right')">
					按航班号
				</view>
				<view :class="isbox? 'box_zhon':'box_zhons'">
				</view>
			</view>
			<view class="bottms">
				<view class="timesl">
					<calendar :ishtoel="ishtoel" @change="lischang" :singleDate="singleDate" startDate="2019-10-10"></calendar>
				</view>
				<view class="timesl" v-if="isbox">
					<ss-city :current="currentPage" :fails="currs"></ss-city>
				</view>
				<view class="timesl" v-if="!isbox">
					<view class="stls">
						<view class="iconfont" style="color:#C8C7CC;margin-right: 20upx;">
							&#xe637;
						</view>
						<input type="text" value="" v-model="pums" placeholder="请输入航班号,如CZ3505" />
					</view>
				</view>
				<view class="cistysl">
					<view class="btnsk" @click="flightsByAddress(1)">查询</view>
				</view>
			</view>
		</view>
		<view class="box" v-if="tableList.length > 0">
			<view class="boxlit" v-for="(item,index) in tableList" :key="index">
				<view class="box_tosp">
					<view class="box_tops">
						<view class="box_to_lef">
							{{item.flightState}}
						</view>
						<view class="box_bo">
							<view class="">
								{{item.flightCompany}}{{item.flightNo}}&nbsp;&nbsp;{{item.flightDeptimePlanDate}}
							</view>
							<view class="">
								{{item.strat}} — {{item.endrat}}
							</view>
						</view>
					</view>
					<view class="box_bts">
						<view class="box_b_l">
							{{item.flightDepAirport}}机场
						</view>
						<view style="flex: 2;text-align: center;">
							<view class="iconfont" style="flex: 2;font-size: 35upx;">
								&#xe658;
							</view>
						</view>
						<view class="box_b_r">
							{{item.flightArrAirport}}机场
						</view>
					</view>
				</view>
				<view style="width: 100%;height: 10upx;background: #E5E5E5;"></view>
			</view>
			<view class="btns" @click="tableList = []">
				重新搜索
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import ssCity from '../../../components/view/book/ss-city/ss-city.vue' //城市
	import calendar from '../../../components/view/book/date-picker/date-picker.vue'; //日期


	import torok from '@/api/torowk.js'
	export default {
		components: {
			calendar,
			ssCity
		},
		computed:{
			 ...mapState(['vx_city_left'])
		},
		mounted() {
		},
		data() {
			return {
				
				
				pums: '',
				isbox:true,
				currentPage: 'Planeticket',
				ishtoel: 'search',
				singleDate: true,
				currs: 'flig',
				sintime: '',
				tableList: []
			}
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.flightsByAddress(2);
		},
		methods: {
			async flightsByAddress(it){
				var citys = this.vx_city_left;
				let FyTrnsferParam;
				let res;
				try{
					if(this.isbox){
						if(citys[0].id == ''){
							this.showToasts("请选择出发城市");
							return
						}
						if(citys[1].id == ''){
							this.showToasts("请选择到达城市");
							return
						}
						
						FyTrnsferParam = {
							dep: citys[0].id,
							arr: citys[1].id,
							date: this.sintime 
						}
						if(it == 1){
							
						}
						res = await torok.queryFlightPlanByCity(FyTrnsferParam);
						
						if(it == 1){
							
						} else {
							uni.stopPullDownRefresh();
						}
					} else {
						if(this.pums == ''){
							this.showToasts("请输入航班号");
							return
						}
						
						FyTrnsferParam = {
							fnum: this.pums,
							date: this.sintime 
						}
						if(it == 1){
							
						}
						res = await torok.queryFlightByFnum(FyTrnsferParam);
						if(it == 1){
							
						} else {
							uni.stopPullDownRefresh();
						}
					}
						if(res.code=='200'){
							if(res.data.results == null){
								this.showToasts("暂时没有符合的航班动态！")
							} else {
								this.tableList= res.data.results;
								for (let i in this.tableList) {
									let ins = this.tableList[i].flightCompany.lastIndexOf("航空");
									if(ins > -1){
										this.tableList[i].flightCompany = this.tableList[i].flightCompany.substring(0,ins + 2);
									}
									this.tableList[i]['strat'] = this.tableList[i].flightDeptimePlanDate.substring(11,16); //开始时间
									this.tableList[i]['endrat'] = this.tableList[i].flightArrtimePlanDate.substring(11,16);//结束时间
									this.tableList[i].flightDeptimePlanDate = this.tableList[i].flightDeptimePlanDate.substring(0,10);
								}
							}
						}
				}catch(e){
					console.log(e)
					
				}
			},
			boxclick(item){
				if(item == 'left'){
					if(this.isbox == false){
						this.isbox = true;
					}
				} else {
					if(this.isbox == true){
						this.isbox = false;
					}
				}
			},
			lischang(item) {
				this.sintime = item.choiceDate.re;
			},
		},
	}
</script>

<style lang="scss" scoped>
	.fligthdyname{
		width: 100%;
		.flisvsl{
			width: calc(100% - 40upx);
			margin: 20upx;
			.box_top{
				position: relative;
				font-size: 35upx;
				width: 100%;
				height: 90upx;
				background: rgba(0,0,0,0.3);
				border-top-left-radius: 15upx;
				border-top-right-radius: 15upx;
				display: flex;
				justify-content: space-between;
				.box_zhon{
					position: absolute;
					width: 3%;
					height:	110upx;
					border-radius: 15upx;
					background: #FFFFFF;
					top: 0;
					left: calc(49% - 12upx);
					transform: rotate(-12deg);
				}
				.box_zhons{
					position: absolute;
					width: 3%;
					height:	110upx;
					border-radius: 15upx;
					background: #FFFFFF;
					top: 0;
					right: calc(49% - 12upx);
					transform: rotate(12deg);
				}
				.box_top_box{
					width: 49%;
					height: 90upx;
					line-height: 90upx;
					text-align: center;
					color: #FFFFFF;
					border-top-left-radius: 15upx;
					border-top-right-radius: 15upx;
				}
				.isboxs{
					background: #FFFFFF;
					color: #333333;
				}
			}
			.bottms{
				width: 100%;
				border-bottom-left-radius: 15upx;
				border-bottom-right-radius: 15upx;
				background: #FFFFFF;
				height: 100%;
				.timesl{
					padding: 10upx 0;
					width: calc(100% - 40upx);
					margin: 0 20upx;
					border-bottom: 2upx solid #E5E5E5;
					.stls{
						display: flex;
						padding: 20upx 20upx;
						input{
							width:100%;
						}
					}
				}
				.cistysl{
					padding: 50upx 0;
					width: calc(100% - 40upx);
					margin: 0 20upx;
					.btnsk{
						font-size: 32upx;
						width: 100%;
						height: 90upx;
						text-align: center;
						line-height: 90upx;
						color: #FFFFFF;
						background: linear-gradient(to right, #4e92fd 0%, #6e46fe 100%);
					}
				}
			}
		}
		.box{
			width: 100%;
			padding-bottom: 100upx;
			.boxlit{
				width: 100%;
				background: #FFFFFF;
				.box_tosp{
					width: calc(100% - 40upx);
					padding:  0 20upx;
					.box_tops{
						width: 100%;
						display: flex;
						padding: 20upx 0;
						border-bottom: 2upx dashed #999999;
						.box_to_lef{
							padding-right: 20upx;
							font-size: 50upx;
							line-height: 50upx;
							border-right: 2upx solid #888888;
						}
						.box_bo{
							padding: 0 20upx;
							color: #888888;
							font-size: 25upx;
						}
					}
					.box_bts{
						display: flex;
						justify-content: center;
						align-items: center;
						line-height: 60upx;
						color: #888888;
						font-size: 35upx;
						.box_b_l{
							flex: 6;
							text-align: right;
						}
						.box_b_r{
							flex: 6;
							text-align: left;
						}
					}
				}
			}
			.btns{
				font-size: 32upx;
				position: fixed;
				width: 100%;
				height: 100upx;
				line-height: 100upx;
				text-align: center;
				bottom: 0;
				left: 0;
				background: linear-gradient(to right, #4e92fd 0%, #6e46fe 100%);
				color: #FFFFFF;
			}
		}
	}
</style>
