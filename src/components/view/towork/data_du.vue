<template>
	<view style="width: 100%;">
		<!-- 日期选择 -->
		<view class="order-time" v-if="!modal">
			<view class="time-viewer">
				<view class="time-lit" @click="showCalendar('left')" v-if="current == 'Planeticket'">
					<view class=""><text class="left-hotel">去程</text>
					</view>
					<view class="" v-if="Object.keys(sta_Flightbus).length > 0">
						<text class="date-wrappper">{{ sta_Flightbus.date.month }}月{{ sta_Flightbus.date.day }}日</text>
						<text class="goInHotel2" v-if="sta_Flightbus.date.year + '' + sta_Flightbus.date.month + '' + sta_Flightbus.date.day == today">今天</text>
					</view>
					<view class="ti_text" v-else>
						去程日期
					</view>
				</view>
				<view class="time-lit" @click="showCalendar('right')" v-if="current == 'Planeticket'">
					<view class="delet" @click.stop="delets" v-if="current != 'Hotel' && Object.keys(end_Flightbus).length> 0">
						<view class="iconfont" style="font-size: 25upx;color: #C0C0C0;">&#xe608;</view>
					</view>
					<view class="ti_right">
						<text class="left-hotel">返程</text>
					</view>
					<view class="ti_right" v-if="Object.keys(end_Flightbus).length> 0">
						<text class="date-wrappper">{{ end_Flightbus.date.month }}月{{ end_Flightbus.date.day }}日</text>
						<text class="goInHotel2" v-if="end_Flightbus.date.year + '' + end_Flightbus.date.month + '' + end_Flightbus.date.day == tomorrow">
							明天
						</text>
					</view>
					<view class="ti_right ti_text" v-else>
						返程日期
					</view>
				</view>
				<view class="time-lit" @click="showCalendar('left')" v-if="current == 'Hotel'">
					<view class=""><text class="left-hotel">去程</text>
					</view>
					<view class="" v-if="Object.keys(sta_Hotelkettime).length > 0">
						<text class="date-wrappper">{{ sta_Hotelkettime.date.month }}月{{ sta_Hotelkettime.date.day }}日</text>
						<text class="goInHotel2" v-if="sta_Hotelkettime.date.year + '' + sta_Hotelkettime.date.month + '' + sta_Hotelkettime.date.day == today">今天</text>
					</view>
					<view class="ti_text" v-else>
						入住日期
					</view>
				</view>
				<view class="time-lit" @click="showCalendar('right')" v-if="current == 'Hotel'">
					<view class="ti_right">
						<text class="left-hotel">离店</text>
					</view>
					<view class="ti_right" v-if="Object.keys(end_Hotelkettime).length> 0">
						<text class="date-wrappper">{{ end_Hotelkettime.date.month }}月{{ end_Hotelkettime.date.day }}日</text>
						<text class="goInHotel2" v-if="end_Hotelkettime.date.year + '' + end_Hotelkettime.date.month + '' + end_Hotelkettime.date.day == tomorrow">
							明天
						</text>
					</view>
					<view class="ti_right ti_text" v-else>
						离店日期
					</view>
				</view>
				<view class="time-lit" @click="showCalendar('left')" v-if="current == 'Train'">
					<view class=""><text class="left-hotel">去程</text>
					</view>
					<view class="" v-if="Object.keys(sta_Traveltrain).length > 0">
						<text class="date-wrappper">{{ sta_Traveltrain.date.month }}月{{ sta_Traveltrain.date.day }}日</text>
						<text class="goInHotel2" v-if="sta_Traveltrain.date.year + '' + sta_Traveltrain.date.month + '' + sta_Traveltrain.date.day == today">今天</text>
					</view>
					<view class="ti_text" v-else>
						去程日期
					</view>
				</view>
				<view class="time-lit" @click="showCalendar('right')" v-if="current == 'Train'">
					<view class="delet" @click.stop="delets" v-if="current != 'Hotel' && Object.keys(end_Traveltrain).length> 0">
						<view class="iconfont" style="font-size: 25upx;color: #C0C0C0;">&#xe608;</view>
					</view>
					<view class="ti_right">
						<text class="left-hotel">返程</text>
					</view>
					<view class="ti_right" v-if="Object.keys(end_Traveltrain).length> 0">
						<text class="date-wrappper">{{ end_Traveltrain.date.month }}月{{ end_Traveltrain.date.day }}日</text>
						<text class="goInHotel2" v-if="end_Traveltrain.date.year + '' + end_Traveltrain.date.month + '' + end_Traveltrain.date.day == tomorrow">
							明天
						</text>
					</view>
					<view class="ti_right ti_text" v-else>
						返程日期
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				bt_bol: false,
				btns: "\ue80c",
				date: [],
				weeks: [],
				today: "",
				choiceDate: [],
				tomorrow: "",
				sta_Hotelkettime: {},//出差酒店出发时间
				end_Hotelkettime: {},//出差酒店返回时间
				sta_Flightbus: {},//出差飞机出发时间
				end_Flightbus: {},//出差飞机返回时间
				sta_Traveltrain: {},//出差火车出发时间
				end_Traveltrain: {},//出差火车返回时间
			};
		},
		props: {
			bsta_Flightbus:{//出差飞机出发时间
				type:Object,
				default:{}
			},
			bend_Flightbus:{//出差飞机返回时间
				type:Object,
				default:{}
			},
			bsta_Traveltrain:{//出差火车出发时间
				type:Object,
				default:{}
			},
			bend_Traveltrain:{//出差火车返回时间
				type:Object,
				default:{}
			},
			bhotellmes:{//出差酒店时间
				type:Array,
				default:[]
			},
			current:{
				type: String,
				default: ''
			},	
			startDate: {
				type: String,
				default: ''
			},
			endDate: {
				type: String,
				default: ''
			},
			modal: {
				type: Boolean,
				default: false //默认为有界面的
			},
			show: {
				type: Boolean,
				default: false //默认不显示
			},
			daysCount: {
				type: Number,
				default: 150 //默认显示150天
			},
			singleDate: {
				type: Boolean,
				default: false //默认为false
			}
		},
		onLoad() {
		},
		watch: {
			bsta_Flightbus(date){//出差飞机出发时间
				console.log(date)
				this.sta_Flightbus = date;
			},
			bend_Flightbus(date){//出差飞机返回时间
				this.end_Flightbus = date;
			},
			bsta_Traveltrain(date){//出差火车出发时间
				this.sta_Traveltrain = date;
			},
			bend_Traveltrain(date){//出差火车返回时间
				this.end_Traveltrain = date;
			},
			bhotellmes(date){//出差酒店时间
				if(date.length > 0){
					this.sta_Hotelkettime = date[0];
					this.end_Hotelkettime = date[1];
          console.log("sta",JSON.stringify(date[0]))

				}
			}
		},
		methods: {
			showCalendar(le){
				let dst = []
				if(this.current == "Planeticket"){
					if(Object.keys(this.sta_Flightbus).length > 0){
						dst.push(this.sta_Flightbus)
					}
					if(Object.keys(this.end_Flightbus).length > 0){
						dst.push(this.end_Flightbus)
					}
				} else if(this.current == "Train"){
					if(Object.keys(this.sta_Traveltrain).length > 0){
						dst.push(this.sta_Traveltrain)
					}
					if(Object.keys(this.end_Traveltrain).length > 0){
						dst.push(this.end_Traveltrain)
					}
				} else {
					if(Object.keys(this.sta_Hotelkettime).length > 0){
						dst.push(this.sta_Hotelkettime)
					}
					if(Object.keys(this.end_Hotelkettime).length > 0){
						dst.push(this.end_Hotelkettime)
					}
				}
				uni.navigateTo({
					url:'/pages-mydi/pages/mydi/myapplication/cationchirder/data_on/data_du?statime=' + this.startDate + '&endtime=' + this.endDate + '&op=' + this.current + '&ot=' + le + '&dsts=' + JSON.stringify(dst)
				})
			},
			delets(is){
				if(this.current == "Planeticket"){
					this.$emit("delet",{name:'Planeticket'})
				} else if(this.current == "Train"){
					this.$emit("delet",{name:'Train'})
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	/*
* 主题颜色请修改这里
* 
* */
	$themeColor: $uni-color-primary;

	view {
		display: flex;
	}
	uni-view {
		display: flex;
	}
	/* ///////////////////order-time////////////////////// */
	.order-time {
		padding:  0 20upx;
		width: calc(100% - 40upx);
		.time-viewer {
			width: 100%;
			height: 90upx;
			line-height: 60upx;
			.time-lit {
				width: 50%;
				display: flex;
				flex-direction: column;
				position: relative;
				.delet{
					position: absolute;
					top: 20upx;
					left: 80upx;
					width: 80upx;
					height: 80upx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.goInHotel {
					font-size: 26upx;
					color: #C0C0C0;
				}
				
				.goInHotel2 {
					font-size: 26upx;
					color: #C0C0C0;
				}
				
				.date-wrappper {
					font-size: 40upx;
					color: black;
				}
				
				.left-hotel {
					font-size: 26upx;
					text-indent: 10upx;
					color: #C0C0C0;
				}
				.ti_text {
					font-size: 40upx;
					color: #C0C0C0
				}
				.ti_right {
					justify-content: flex-end;
				}
			}
		
			.cl_bts {
				width: 50%;
				color: #C0C0C0;
				display: flex;
				justify-content: flex-end;
				align-self: flex-end;
			}
		}
	}

	.order-time::after {
		position: absolute;
		content: '';
		width: 100%;
		bottom: 0;
		left: 0;
		border-top: 1upx solid #eee;
		transform-origin: 0 100%;
		transform: scaleY(0.5);
	}

	.goInHotel {
		font-size: 26upx;
		color: #C0C0C0;
	}

	.goInHotel2 {
		font-size: 26upx;
		color: #C0C0C0;
	}

	.date-wrappper {
		font-size: 30upx;
		color: black;
	}
</style>
