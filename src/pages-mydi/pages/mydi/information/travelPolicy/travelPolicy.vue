<template>
	<view class="mian">
		<loading>
		</loading>
		<view class="container999" style="background:#edf0f5;" v-if="stis">
			<headnavigation titles="政策信息"></headnavigation>
			<view class="currency">
				<!-- 通用政策 -->
				<view class="General_policy">
					通用政策
				</view>
				<view class="tabBar">
					<view class="tabbar_item" v-if="policyInconsistency != null">
						<view class="book_title">外部客户差旅政策:</view>
						<view class="book_name">{{policyInconsistency}}</view>
					</view>
					<view class="tabbar_item" v-if="noTravelPolicy != null">
						<view class="book_title">无差旅政策预定:</view>
						<view class="book_name">{{noTravelPolicy}}</view>
					</view>
					<view class="tabbar_item" v-if="externalCustomer != null">
						<view class="book_title">出行人差旅政策不一致:</view>
						<view class="book_name">{{externalCustomer}}</view>
					</view>
					<view class="tabbar_item" v-if="nativeTicketViolation != null">
						<view class="book_title">国内机票超规仓位:</view>
						<view class="book_name">{{nativeTicketViolation}}</view>
					</view>
					<view class="tabbar_item" v-if="internationalTicketViolation != null">
						<view class="book_title">国际机票超规仓位:</view>
						<view class="book_name">{{internationalTicketViolation}}</view>
					</view>
					<view class="tabbar_item" v-if="hotelViolation != null">
						<view class="book_title">酒店超规房型:</view>
						<view class="book_name">{{hotelViolation}}</view>
					</view>
					<view class="tabbar_item" v-if="trainViolation != null">
						<view class="book_title">火车票超规坐席:</view>
						<view class="book_name">{{trainViolation}}</view>
					</view>
					<view class="tabbar_item" v-if="hotelGuarantee != null">
						<view class="book_title">酒店担保:</view>
						<view class="book_name">{{hotelGuarantee}}</view>
					</view>
				</view>
			</view>
			<!-- 机票政策 -->
			<view class="air_ticket" v-if="nativeAirTicketRule != null">
				<view class="ticket_policy">
					机票政策
				</view>
			
				<view class="tabBar">
					<view class="tabbar_item" v-if="nativeAirTicketRule.reserve != null">
						<view class="book_title">提前预定天数:</view>
						<view class="book_name">{{nativeAirTicketRule.reserve}}</view>
					</view>
					<view class="tabbar_item" v-if="nativeAirTicketRule.lowLimit != null">
						<view class="book_title">低价限制时间:</view>
						<view class="book_name">{{nativeAirTicketRule.lowLimit}}</view>
					</view>
					<view class="tabbar_item" v-if="nativeAirTicketRule.highLimit != null">
						<view class="book_title">高价限制:</view>
						<view class="book_name">{{nativeAirTicketRule.highLimit}}</view>
					</view>
					<view class="tabbar_item" v-if="nativeAirTicketRule.positionLimit != null">
						<view class="book_title">舱位限制:</view>
						<view class="book_name">{{ position(nativeAirTicketRule.positionLimit)}}</view>
					</view>
					<view class="tabbar_item" v-if="nativeAirTicketRule.discountLimit != null">
						<view class="book_title">折扣限制:</view>
						<view class="book_name">{{nativeAirTicketRule.discountLimit}}</view>
					</view>
					<view class="tabbar_item"  v-if="nativeAirTicketRule.accompanyingNumberLimit != null">
						<view class="book_title">同行人数限制:</view>
						<view class="book_name">{{nativeAirTicketRule.accompanyingNumberLimit}}</view>
					</view>
					<view class="tabbar_item"  v-if="nativeAirTicketRule.agreementFlightLimit != null">
						<view class="book_title">限定协议航班:</view>
						<view class="book_name">{{use(nativeAirTicketRule.agreementFlightLimit)}}</view>
					</view>
					<view class="tabbar_item"  v-if="repeatBookingLimit != null">
						<view class="book_title">当天重复预定限制:</view>
						<view class="book_name">{{repeatBookingLimit}}</view>
					</view>
				</view>
			</view>
			
			<!-- 国内火车政策 -->
			<view class="air_ticket" v-if="nativeTrainRule != null">
				<view class="ticket_policy">
					火车政策
				</view>
			
				<view class="tabBar" v-if="nativeTrainRule.seatLimit != null">
					<view class="tabbar_item">
						<view class="book_title">坐席限制:</view>
						<view class="book_name">{{ grade(nativeTrainRule.seatLimit)}}</view>
					</view>
				</view>
			</view>
			
			<!-- 国内酒店政策 -->
			<view class="air_ticket" v-if="hotelRule != null">
				<view class="ticket_policy">
					酒店政策
				</view>
			
				<view class="tabBar">
					<view class="tabbar_item" v-if="hotelRule.starLevelLimit != null">
						<view class="book_title">星级限制:</view>
						<view class="book_name">{{ star_level(hotelRule.starLevelLimit)}}</view>
					</view>
					<view class="tabbar_item" v-if="hotelRule.contractHotelLimit != null">
						<view class="book_title">限定协议酒店:</view>
						<view class="book_name">{{agreement(hotelRule.contractHotelLimit)}}</view>
					</view>
					<view class="tabbar_item" v-if="hotelRule.highLimit != null">
						<view class="book_title">高价限制:</view>
						<view class="book_name">{{hotelRule.highLimit}}</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import Policy from '@/api/login.js'
	export default {
		data() {
			return {
				userpolicy: {},
				tabBar: [{
					text: '不限'
				}],

				externalCustomerMap: {
					"0": "不管控",
					"1": "预定人差旅政策"
				},
				noTravelPolicyMap: {
					"0": "不管控",
					"1": "不允许预定"
				},
				policyInconsistencyMap: {
					"0": "自选一位出行人政策控制",
					"1": "按照每一位出行人政策控制"
				},
				generalRuleMap: {
					"0": "隐藏",
					"1": "显示",
					"2": "不提供"
				},
				policyInconsistency: '',
				noTravelPolicy: '',
				externalCustomer: '',
				nativeTicketViolation: '',
				internationalTicketViolation: '',
				hotelViolation: '',
				trainViolation: '',
				hotelGuarantee: '',             //以上是通用政策
				
				reserve:'',
				lowLimit:'',
				highLimit:'',
				positionLimit:'',
				discountLimit:'',
				accompanyingNumberLimit:'',
				// agreementFlightLimit:'',
				repeatBookingLimit:'',
				nativeAirTicketRule:{},
				nativeTrainRule:{},
				hotelRule:{},
				stis:false,
			}
		},
		mounted() {
			this.cond();
		},
		methods: {
			use(is){
				if(is == 0){
					return "否";
				}else{
					return "是";
				} 
			},
			position(pon){
				if(pon == '' || pon == undefined || pon == null){
					return
				}
				let le = [];
				var location = pon.split(",");
				for (var i = 0; i < location.length; i++) {
					if(location[i] == 1){
						le.push("豪华头等舱");
					} else if(location[i] == 2){
						le.push("头等舱");
					} else if(location[i] == 3){
						le.push("公务舱");
					} else if(location[i] == 4){
						le.push("经济舱");
					} else if(location[i] == 5){
						le.push("超值经济舱");
					}
				}
				return le.join(",");
			},
			grade(gra){
				let le = [];
				var location = gra.split(",");
				for (var i = 0; i < location.length; i++) {
					if(location[i] == 1){
						le.push("商务座");
					} else if(location[i] == 2){
						le.push("特等座");
					} else if(location[i] == 3){
						le.push("一等座");
					} else if(location[i] == 4){
						le.push("二等座");
					} else if(location[i] == 5){
						le.push("动卧");
					} else if(location[i] == 6){
						le.push("高级软卧");
					} else if(location[i] == 7){
						le.push("软卧");
					} else if(location[i] == 8){
						le.push("硬卧");
					} else if(location[i] == 9){
						le.push("软座");
					} else if(location[i] == 10){
						le.push("硬座");
					} else if(location[i] == 11){
						le.push("无座");
					}
				}
				return le.join(",");
			},
			star_level(sta){
					let le = [];
					var location = sta.split(",");
					for (var i = 0; i < location.length; i++) {
						if(location[i] == 2){
							le.push("二星及以下");
						} else if(location[i] == 3){
							le.push("三星");
						} else if(location[i] == 4){
							le.push("四星");
						} else if(location[i] == 5){
							le.push("五星及以上");
					}
				}
				return le.join(",");
			},
			agreement(agr){
				if(agr == 0){
					return "否";
				}else{
					return "是";
				}
			},
			async cond() {
				
				try{
					let userpolicy = await Policy.TraverPolicy();
					
					this.nativeAirTicketRule = userpolicy.data.nativeAirTicketRule;
					this.nativeTrainRule = userpolicy.data.nativeTrainRule;
					this.hotelRule = userpolicy.data.hotelRule[0];
					 let generalRule = userpolicy.data.generalRule;
					this.externalCustomer = this.externalCustomerMap[generalRule.externalCustomer];
					this.noTravelPolicy = this.noTravelPolicyMap[generalRule.noTravelPolicy];
					this.policyInconsistency = this.policyInconsistencyMap[generalRule.policyInconsistency];
					this.nativeTicketViolation = this.generalRuleMap[generalRule.nativeTicketViolation];
					this.internationalTicketViolation = this.generalRuleMap[generalRule.internationalTicketViolation];
					this.hotelViolation = this.generalRuleMap[generalRule.hotelViolation];
					this.trainViolation = this.generalRuleMap[generalRule.trainViolation];
					this.hotelGuarantee = this.generalRuleMap[generalRule.hotelGuarantee];
					if(this.nativeAirTicketRule != null){
						if(this.nativeAirTicketRule.repeatBookingLimit==0){
							this.repeatBookingLimit = "不管控";
						}else{
							this.repeatBookingLimit=this.nativeAirTicketRule.repeatBookingLimit;
						}
					}
					this.stis = true
				}catch(e){
					console.log(e)
					
				}
				// var nativeAirTicketRule = userpolicy.data.nativeAirTicketRule;
				// this.employeeLevel = nativeAirTicketRule.employeeLevel;
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mian {
		.container999 {
			.General_policy {
				width: 100%;
				height: 100upx;
				font-size: 30upx;
				font-weight: bold;
				line-height: 100upx;
				padding: 0 20upx;
				background: #FFFFFF;
			}
			
			.air_ticket{
				margin-top: 20upx;
				.ticket_policy{
					width: 100%;
					height: 100upx;
					font-size: 30upx;
					font-weight: bold;
					line-height: 100upx;
					padding: 0 20upx;
					background: #FFFFFF;
				}
			}
			
			.book {
				width: 100%;
				background: red;

				.air_ticket {
					width: 100%;
					height: 100upx;
					margin-top: 20upx;
					font-size: 30upx;
					font-weight: bold;
					line-height: 100upx;
					padding: 0 20upx;
					background: #FFFFFF;
				}

			}

			.tabBar {

				.tabbar_item {
					display: flex;
					height: 100upx;
					line-height: 100upx;
					background: #FFFFFF;
					border-top: 1upx solid #C0C0C0;
					.book_title {
						margin-left: 20upx;
					}
				}
			}
		}
	}
</style>
