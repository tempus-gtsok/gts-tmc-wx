<template>
	<view class="container999">
		<headnavigation titles="详情预定"></headnavigation>
		<view v-if="userlist">
			<view class="top">
				<!-- 退改 -->
				<view class="black_mu" @click="isshow" v-if="switfals">
					<view class="isswflist" @click.stop="" :class="switfal ? 'show' : ''">
						<view class="isstop">
							<view class="">
								{{sittext}}
							</view>
							<view @click="isshow" class="iconfont" style="color: #C0C0C0;font-size: 50upx;">
								&#xe641;
							</view>
						</view>
						<view class="isstops">
							<p v-if="stlistad.remark != null && stlistad.remark != undefined"> 1.{{stlistad.remark}}</p>
							<p v-if="stlistad.refundTicketDes != null && stlistad.refundTicketDes != undefined">2.改签规定：{{stlistad.refundTicketDes}}</p>
							<p v-if="stlistad.signTicketDes != null && stlistad.signTicketDes">3.签转规定：{{stlistad.signTicketDes}}</p>
						</view>
					</view>
				</view>
				<!-- 机票详情 -->
				<view class="above">
					<!-- 时间地址 -->
					<view class="above_left">
						<view class="city">
							{{userlist.name.departs}}
						</view>
						<view class="go_off">
							{{userlist.name.departTime}}
						</view>
						<view class="arrival_time" v-if="userlist.name.departTerminal != null">
							{{userlist.name.departs}}{{userlist.name.departTerminal}}
						</view>
						<view class="arrival_time" v-else>
							{{userlist.name.departs}}
						</view>
					</view>
					<view class="above_centre">
						<view style="font-size: 28upx;color:#abbdd3">
							{{userlist.name.flightTime}}
						</view>
						<view class="">
							<view class="iconfont" style="color:#e8e8e8">&#xe64f;</view>
							<view style="color: #C0C0C0;text-align: center;font-size: 25upx;" v-if="userlist.name.nonstop == true">经停-{{arrivalAirport}}</view>
						</view>
					</view>
					<view class="above_left" style="text-align: left;">
						<view class="city">
							{{userlist.name.arrives}}
						</view>
						<view class="go_off">
							{{userlist.name.arriveTime}}
							<span v-if="userlist.name.isarriveTime == true">+1</span>
						</view>
						<view class="arrival_time" v-if="userlist.name.arriveTerminal != null">
							{{userlist.name.arrives}}{{userlist.name.arriveTerminal}}
						</view>
						<view class="arrival_time" v-else>
							{{userlist.name.arrives}}
						</view>
					</view>
				</view>
				<view class="below" v-if="userlist.name.planeSize != null">
					<!-- 日期航班 -->
					{{date}} 周{{timelist.week}} | {{hang.name}}{{userlist.name.no}} | {{userlist.name.plane}}
					{{userlist.name.planeSize}}
				</view>
				<view class="below" v-else>
					<!-- 日期航班 -->
					{{date}} 周{{timelist.week}} | {{hang.name}}{{userlist.name.no}} | {{userlist.name.plane}}
				</view>
			</view>
			<view class="mian">
				<loading>
				</loading>
				<view class="middle">
					<!-- 舱位 -->
					<view class="contract">
						<view class="contract_left" @click="contract_left" :class="contract_lefts ? 'contract_lefta':'' ">
							经济舱
						</view>
						<view class="contract_right" @click="contract_right" :class="contract_rights ? 'contract_righta':'' ">
							头等/商务舱
						</view>
					</view>
				</view>

				<view class="reserve" v-for="(item,index) in particulars" :key="index">
					<!--        <view v-for="(items,index) in flightinfoid">-->
					<!--        <view>{{flightinfoid}}</view>-->
					<!-- 预定 -->
					<!--        <div>{{JSON.stringify(particulars[3].priceInfoId)}}</div>-->
					<view class="reserve_left">
						<view class="money" v-if="item.salePrices != undefined">￥{{item.salePrices}}<img src="static/img/official.png" class="official"
							v-if="item.priceSource === 1">
							<img src="static/img/purchase.png" class="official" v-if="item.priceSource == 2">
							<span class="change" v-if="item.changeFare == true">协议价</span></view>
						<!-- <view class="shidisc">{{company(item.level)}}{{item.discount}}折 <span @click="ctlist"> 退改规则</span></view> -->
						<view class="shidisc" v-bind:id="item.levels" v-if="item.discoun != '全价'">
							{{company(item.level,item.cabinName)}}{{item.discount}}折 <span @click="ctlist(item)"> 退改规则</span></view>
						<!--          <view class="shidisc" v-bind:id="item.levels" v-if="item.discoun != '全价' && item.cabinName == null">{{item.level}}{{company(item.level)}}{{item.discount}}折 <span @click="ctlist(item)"> 退改规则</span></view>-->
						<view class="shidisc" v-bind:id="item.levels" v-else>{{company(item.level,item.cabinName)}}<span style="color: red">{{item.discoun}}</span><span
							@click="ctlist(item)"> 退改规则</span></view>
					</view>

					<view class="reserve_right">
						<view class="but" @click="book(item,index)">预订</view>
						<view class="buts">{{compot(item.stock)}}</view>
					</view>
					<!--        </view>-->
				</view>
			</view>

			<view class="staleve" v-if="staleve" @click="staleve = false">
				<view class="stalist" @click.stop>
					<view class="statop" v-for="(item,ind) in platformlist" :key="ind" v-if="( notbooking && item.list[0].va == 4) || (!notbooking && item.list[0].va != 4)">
						<!---->
						<view class="reds">
							<view>{{item.list.va}}</view>
							<view class="ts_text">
								{{item.name}}
							</view>
						</view>
						<view class="setlist" v-for="(items,indexs) in item.list" :key="indexs">
							<view class="setbod">
								<view class="styul">
									<view class="styli_top">
										{{items.name}}
									</view>
									<view class="stulis">
										<view class="styli_left">
											超规人员:
										</view>
										<view class="styli_right">
											{{items.list}}
										</view>
									</view>
								</view>
								<view class="styul" v-if="items.va == 3">
									<view class="stulis">
										<view class="styli_left">
											超规原因:
										</view>
										<view class="styli_right">
											<view class="wors">
												<picker :range="rulesReasons" :range-key="'chineseDesc'" @change="chineseChange($event,ind)">
													{{ rulesReasons[item.index].chineseDesc }}
												</picker>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="btnsti" v-if="!notbooking">
						<view class="roblck" @click="staleve = false">
							取消
						</view>
						<view class="btnok" @click="cits_btn">
							继续预定
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<image class="praImg" src="@/static/img/praImg.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import order from '@/api/order.js'
	import airports from 'pages/book/sselect-city/airports.js'
	import tork from '@/api/torowk.js'
	import certifi from '@/api/certificate.js'
	export default {
		data() {
			return {
				hang: {},
				userlists: [{
						money: '￥4800',
						shipping: '经济舱',
						discount: '6.4折'
					},
					{
						money: '￥2800',
						shipping: '经济舱',
						discount: '3.4折'
					},
					{
						money: '￥1800',
						shipping: '经济舱',
						discount: '2.4折'
					},
					{
						money: '￥13800',
						shipping: '头等舱',
						discount: '2.4折'
					},
					{
						money: '￥12800',
						shipping: '商务舱',
						discount: '2.4折'
					},
					{
						money: '￥11800',
						shipping: '商务舱',
						discount: '2.4折'
					}
				],
				bool: false,
				userlist: null,
				tickarray: [],
				dates: [],
				timelist: [],
				sale: [],
				sittext: '退改规则',
				butalist: [],
				butNo: [],
				date: '',
				none: '',
				lei: '',
				stlistad: {},
				stlistads: {},
				backrule: {}, //退改签规则
				noticerefund: [ //退票说明
					"1、退票规定：起飞前2小时(含)以前收取5%的退票手续费;起飞前2小时(不含)以后收取10%的退票手续费;(具体以航司审核为准)",
					"2、改期规定：起飞前2天(含)允许免费改期1次;起飞前2小时(含)以前收取0%的改期手续费;起飞前2小时(不含)以后收取5%的改期手续费;(具体以航司审核为准)",
					"3、签转规定：不得签转"
				],
				
				switfals: false,
				switfal: false,
				// staleve: false,
				
				particulars: [],
				particularss: [],
				limitNativeRule: [],
				contract_lefts: true,
				contract_rights: false,
				pricdesc: '', //高价超规原因
				pricdesct: '', //低价超规原因
				pricdescs: '', //限定协议航班超规原因
				pricdescw: '', //提前预定规则超规原因
				pricdescq: '', //提前预定规则超规原因
				pricdesce: '', //提前预定规则超规原因
				pricdescr: '', //提前预定规则超规原因
				idstarles: false, //是否酒店星级要选择原因
				idstarle: false, //是否高价超规要选择原因
				idstarlea: false, //限定协议航班超规原因
				reserves: false, //提前预定规则超规原因
				reserveq: false, //舱位规则超规原因
				reservew: false, //折扣规则超规原因
				reservee: false, //同行人规则超规原因
				isblckt: false, //事前是否2次审批
				staleve: false,
				chines: {
					index: 0
				},
				chiness: {
					index: 0
				},
				chineas: {
					index: 0
				},
				chineds: {
					index: 0
				},
				chinees: {
					index: 0
				},
				chineqs: {
					index: 0
				},
				chinews: {
					index: 0
				},
				highLimit: {}, //高价政策
				starLevelLimit: {}, //低价政策
				agreementFlightLimit: {}, //限定协议航班政策
				reserveLimit: {}, //提前预定规则政策
				positionLimit: {}, //仓位限制规则政策
				discountLimit: {}, //折扣限制规则政策
				accNumberLimit: {}, //同行人数限制规则政策
				higlist: [], //高价政策报错
				starlist: [], //酒店政策报错
				starlists: [], //酒店政策报错
				reserve: [], //提前预定规则
				hiiglist: [], //高价政策报错
				hieglist: [], //高价政策报错
				hisglist: [], //高价政策报错
				rulesReasons: [], //高价超规类型
				rulesReasone: [], //超规航班协议类型
				rulesReasonr: [], //低价超规类型
				rulesReasont: [], //仓位限制超规类型
				rulesReasonf: [], //折扣限制超规类型
				rulesReasong: [], //同行人数限制超规类型
				rulesReasonb: [], //提前预定超规类型
				platformlist: [], //处理过的违规信息
				pookis: false, //是否再次审批
				notbooking: false, //是否价格政策不可预定
				notbookings: false, //是否价格政策不可预定
				notbookinga: false, //是否价格政策不可预定
				packlist: {}, //上个页面的值
				packslist: {}, //当前页面的值
				isarsrl: false, //是否需要审核
				RuleMa: '', //
				RuleMas: true, //飞机退票是否需要审核
				cabinst: [],
				address: [], //城市集合
				arrivalAirport: '', //经停
				civilServiceTicket: '',
				time: ''
			}
		},
		computed: {
			...mapState(['go_there', 'goName'])
		},
		onLoad(item) {
			let dats = JSON.parse(uni.getStorageSync("particularst_data"));
			this.time = dats.timelist;
			this.civilServiceTicket = dats.civilServiceTicket;
			this.cabinst = dats.userlist.text.cabins;
			let tys = [];
			// let tyf =[];
			for (let i in this.cabinst) {
				tys.push(this.cabinst[i]);
			}
			this.particulars = tys;
			this.particularss = tys;
			this.packlist = dats;
			this.userlist = dats.userlist || [];
			this.timelist = dats.timelist;
			this.hang = dats.hang;
			this.date = this.timelist.re.substring(5, 10);

			this.none = dats.none;
			this.lei = '';
			if (this.none == 'single') {
				this.lei = '1';
			} else {
				this.lei = '2';
			}
			let bus = this.packlist.datw.butalist;
			for (let k in bus) {
				this.butNo.push({
					"passengerNo": bus[k].passengerNo
				})
			}
		},
		mounted() {
			this.transit();
			this.tickarray = [...this.particulars];
			for (let k in this.particulars) {
				if (typeof(this.particulars[k].discount) == 'number') {
					if (this.particulars[k].discount < 1) {
						let num = (this.particulars[k].discount * 10);
						this.particulars[k].discount = num;
						k, this.particulars[k].discount = num.toFixed(1);
						this.particulars[k].discoun = '不全价'
					} else {
						this.particulars[k].discoun = '全价'
					}
				}
			}
			this.contract_left();
		},
		methods: {
			chineseChange(e, index) { //选择高等级超规原因
				let int = index;
				this.platformlist[int].index = e.detail.value;
			},
			texts() {
				uni.navigateTo({
					url: 'text1'
				})
			},
			rblcok() {
				uni.navigateTo({
					url: '../ticketinquiry?data=' + JSON.stringify(this.packlist.datw)
				});
			},
			isshow() {
				this.switfal = false;
				this.costs = false;
				setTimeout(() => {
					this.switfals = false;
				}, 200)
				setTimeout(() => {
					this.blac_show = false;
				}, 200)
			},
			contract_left() {
				this.contract_lefts = true;
				this.contract_rights = false;
				let datw = this.tickarray;
				let dat = this.userindex;
				let arris = [];
				for (var i = 0; i < datw.length; i++) {
					if (datw[i].level == 'Y') {
						arris.push(datw[i])
					}
				}
				this.particulars = arris;
			},
			company(ie, cabinName) {
				// console.log(cabinName)
				for (let k in this.particulars) {
					if (ie == 'F' && cabinName == null) {
						/*console.log("A1::"+this.particulars[k].level)
						this.particulars[k]['levels'] = this.particulars[k].level
						this.particulars[k].level = '头等舱'
            console.log("A1::"+this.particulars[k].level)*/
						return '头等舱'
					} else if (ie == 'C' && cabinName === null) {
						/*console.log("A2::"+this.particulars[k].level)
						this.particulars[k]['levels'] = this.particulars[k].level
						this.particulars[k].level = '商务舱'
            console.log("A2::"+this.particulars[k].level)*/
						return '商务舱'
					} else if (ie == 'Y' && cabinName === null) {
						/* console.log("A3::"+this.particulars[k].level)
						this.particulars[k]['levels'] = this.particulars[k].level
						this.particulars[k].level = '经济舱'
            console.log("A3::"+this.particulars[k].level)*/
						return '经济舱'
					} else if (ie == 'F' && cabinName != null) {
						/*console.log("A4::"+this.particulars[k].level)
						this.particulars[k]['levels'] = this.particulars[k].level
						this.particulars[k].level = this.particulars[k].cabinName
						console.log("A4::"+this.particulars[k].level)*/
						return cabinName
					} else if (ie == 'C' && cabinName != null) {
						// console.log("A5::"+this.particulars[k].level)
						/*this.particulars[k]['levels'] = this.particulars[k].level
						this.particulars[k].level = this.particulars[k].cabinName
						console.log("A5::"+this.particulars[k].level)*/
						// console.log(this.particulars[k].cabinName)
						return cabinName
					} else if (ie == 'Y' && cabinName != null) {
						/*console.log("A6::"+this.particulars[k].level)
						this.particulars[k]['levels'] = this.particulars[k].level
						this.particulars[k].level = this.particulars[k].cabinName
						console.log("A6::"+this.particulars[k].level)*/
						// console.log(this.particulars[k].cabinName)
						return cabinName
					} else {
						// console.log("A000::"+this.particulars[k].level)
						return cabinName
					}
				}
				return ie;
			},
			compot(ie) {
				if (ie == 'A') {
					return '剩余票>9张'
				} else {
					return '剩余票' + ie + '张';
				}
			},
			contract_right() {
				let datw = this.tickarray;
				let dat = this.userindex;
				let arris = [];
				this.contract_lefts = false;
				this.contract_rights = true;
				for (var i = 0; i < datw.length; i++) {
					if (datw[i].level == 'F' || datw[i].level == 'C') {
						arris.push(datw[i])
					}
				}
				this.particulars = arris;
			},
			cits_btn() { //继续预定
				let plallist = this.platformlist;
				for (let p in this.limitNativeRule) {
					for (let i in this.limitNativeRule[p]) {
						if (i == 3) {
							let ks = 0;
							for (let k in plallist) {
								for (let p in plallist[k].list) {
									if (plallist[k].list[p].va == 3 && plallist[k].index == 0) {
										uni.showToast({
											title: '请选择违规原因',
											duration: 1000,
											icon: 'none'
										})
										return
									}
									if (plallist[k].names = p && plallist[k].list[p].va == 3) {
										ks = plallist[k].index;
									}
								}
							}
							this.limitNativeRule[p][i] = {
								usernames: this.limitNativeRule[p][i],
								reasons: this.rulesReasons[ks].chineseDesc
							}
						}
					}
				}
				console.log(this.limitNativeRule)
				// this.dalits.wbp['violation'] = JSON.stringify({information:[this.limitNativeRule]});
				this.staleve = false;
				// if(this.pookis){
				// 	uni.navigateTo({
				// 		url:'./carforck?dats=' + encodeURIComponent(JSON.stringify(this.dalits)) + '&data=' + encodeURIComponent(JSON.stringify(this.dtlist))
				// 	})
				// } else {
				// 	this.dalits.wbp.isviolation = 1;
				// 	this.createUseCarOrder()
				// }
				this.othotrlis(); //跳转订单页面
			},
			async transit() { //经停
				let red = await certifi.getPlaneStop({
					'flightNo': this.userlist.name.no,
					'depDate': this.userlist.name.departDate
				}); //查询经停航班
				if (red.code == 200) {
					this.address = airports.addressAirportAll; //航空名字
					if (red.data.flightLegBriefs != null) {
						this.arrivalAirport = red.data.flightLegBriefs[0].arrivalAirport;
					}
					for (let j = 0; j < this.address.length; j++) {
						if (this.arrivalAirport == this.address[j].airportCode) {
							this.arrivalAirport = this.address[j].cityCName;
						}
					}
				} else {
					this.showToasts(red.message);
					return
				}
			},
			othotrlis() {
				// console.log(this.none)
				let data = {
					isone: true, //是否单程
					data: this.packlist, //上个页面参数
					flightsts: this.packlist.flights,
					date: this.date,
					limitNativeRule: this.limitNativeRule,
					datw: this.packslist, //当前座位信息
					isarsrl: this.isarsrl,
					isblckt: this.isblckt, //事前是否2次审批
					civilServiceTicket: this.civilServiceTicket, //是否公务 1是 0 否
					levels: this.packslist.levels //舱位等级
				}
				if (this.none == 'single') {
					uni.setStorageSync("predetermine_data", JSON.stringify(data));
					uni.navigateTo({
						url: 'predetermine/predetermine'
					})
				} else {
					if (this.goName == 0) {
						let st;
						// if (this.go_there.length < 2){ //小于2时代表第一次  没有点击返回
						st = this.go_there;
						st = [data];
						/*}else {
					    if (this.time.re == this.go_there[0].data.datw.timedate){ //判断当前搜索日期是否是起始日期
					      this.go_there[0] = data;
					      st = this.go_there;
              }else { //不满足上面的情况 代表这是返程的时间
					      this.go_there[1] = data;
					      st = this.go_there;
              }
            }*/
						this.$store.commit('go_there_add', st)
						this.$store.commit('goName_add', 1)
						uni.setStorageSync("ticketinquiry_data", JSON.stringify(this.packlist.datw));
						uni.setStorageSync("ticketinquirys_data", JSON.stringify(this.packlist));
						// uni.navigateTo({
						// 	url:'../ticketinquiry?data=' + encodeURIComponent(JSON.stringify(this.packlist.datw))
						// })
						// if (this.go_there.length < 2){ //第一次 没有点击返回  需要再次查询返程日期
						uni.navigateTo({
							url: '../ticketinquiry'
						})
						// }else {
						/*if (this.time.re == this.go_there[0].data.datw.timedate){  //条件成立  代表当前是起始日期  需要再次查询返程日期
						  uni.navigateTo({
						    url:'../ticketinquiry'
						  })
						}else {  //代表返程日期 需要进入详情页面
						  let et = {
						    isone: false,//是否单程
						    ones: this.go_there[0],
						    twos: this.go_there[1]
						  }
						  uni.setStorageSync("predetermine_data", JSON.stringify(et));
						  uni.navigateTo({
						    url:'predetermine/predetermine'
						  })
						}*/
						// }
					} else {
						let st;
						if (this.go_there.length < 2) {
							st = this.go_there;
							st.push(data)
						} else {
							st = this.go_there;
							st.pop()
							st.push(data)
						}
						this.$store.commit('go_there_add', st);
						this.$store.commit('goName_add', 1)
						let et = {
							isone: false, //是否单程
							ones: this.go_there[0],
							twos: this.go_there[1]
						}
						uni.setStorageSync("predetermine_data", JSON.stringify(et));
						uni.navigateTo({
							url: './predetermine/predetermine'
						})
					}
				}
			},
			async ctlist(item) { //点击查看说明
				console.log(item)
				try {
					let data = {
						airlineCode: this.packlist.userlist.name.airline, //航司编码
						cabin: item.cabin, //舱位
						depDate: this.packlist.userlist.name.departDate, //起飞时间
						airRoute: this.packlist.userlist.name.depart + this.packlist.userlist.name.arrive, //航线：CANPVG（出发地到达地）
					}
					const ret = await tork.getRefundChangeRule(data);
					if (ret.code == 200) {
						this.backrule = ret.data;
						this.stlistad = this.backrule
						this.sittext = '退改规则'
						this.switfals = true;
						setTimeout(() => {
							this.switfal = true;
						}, 200);
						console.log(this.backrule)
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e);
				}
			},
			async book(item, index) {
				this.isblckt = false;
				this.packslist = item;
				// for (let i in this.flightinfoid){
				//   console.log("000:::"+JSON.stringify(this.flightinfoid[i]))
				// }
				// console.log("item::"+JSON.stringify(item))
				// console.log(this.packslist)
				// console.log(this.packlist)
				if (this.packlist.datw.isbtd == 2) {
					this.othotrlis(); //跳转订单页面
				} else {
					let level = ''; //舱位等级/** 服务等级, F:头等舱; C:商务舱; Y:经济舱 */
					level = item.level; //舱位等级/** 服务等级, F:头等舱; C:商务舱; Y:经济舱 */

					/*if (level == '头等舱') {
						level = 'F'
					} else if (level == '商务舱') {
						level = 'C'
					} else if (level == '经济舱') {
						level = 'Y'
					}*/
					let user = {};
					let minSalePriceCheck = [];
					let uses = [];
					let arr = [];
					let ast = [];
					let lister = [];
					let flights = [];
					let userrw = [];
					flights = this.packlist.flights;
					lister = this.packlist.userlist;
					userrw = this.packlist.userrw;
					for (let i in flights) {
						if (i == lister.text.no) {
							minSalePriceCheck.push({
								flightNo: i, //航班号
								departDateTime: flights[i].departDate.substring(0, 10) + " " + flights[i].departTime + ':00', //时间
								minSalePrice: lister.text.minSalePrice //最低价
							})
						}
					}
					if (this.packlist.datw.isblcks == 4) {
						arr = this.packlist.datw.userlistnos;
						for (let i = 0; i < arr.length; i++) {
							ast.push({
								passengerNo: arr[i]
							})
						}
					} else {
						let sarr = this.packlist.datw.butalist;
						for (let i = 0; i < sarr.length; i++) {
							arr.push(sarr[i].passengerNo)
							ast.push({
								passengerNo: sarr[i].passengerNo
							})
						}
					}
					
					//查询当前用户改签是否需要审核
					if (this.packlist.datw.isblcks == 4) {
						try {
							let res = await order.RuleMainSetting();
							this.RuleMa = res.data.examinePattern;
							let stw = this.RuleMa.split(',');
							for (let i in stw) {
								/**
								 * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
								 */
								if (stw[i] == 9) {
									let rest = await order.judgeApprv({
										passengerNos: arr
									}); //判断当前出行人是否都免审
									if (rest.code == 200) {
										if (rest.data == true) { //判断是否需要审核 true为不需要审核
											this.isarsrl = true;
										}
									} else {
										this.showToasts(rest.message);
										return
									}
								}
							}
						} catch (e) {
							console.log(e)
							
						}
					} else {
						try {
							let rest = await order.judgeApprv({
								passengerNos: arr
							}); //判断当前出行人是否都免审
							if (rest.code == 200) {
								if (rest.data == true) { //判断是否需要审核 true为不需要审核
									this.isarsrl = true;
								}
							} else {
								this.showToasts(rest.message);
								return
							}
							// console.log(this.isarsrl)
						} catch (e) {
							console.log(e)
							
						}
					}
					user = {
							"depart": this.userlist.name.depart, //出发点,
							"arrive": this.userlist.name.arrive, //到达地
							"fuelFee": this.userlist.name.fuelFee, //本次航班燃油费,
							"taxFee": this.userlist.name.taxFee, //本次航班基建费,
							"minSalePrice": this.userlist.text.minSalePrice, //本次航班最低价,
							"salePrice": item.salePrices, //舱位票面价,
							"peopleNum": this.packlist.datw.butalist.length, //出行人数（用于校验同行人数规则）,
							"departDate": this.userlist.name.departDate, //起飞日期,
							'departTime': this.userlist.name.departTime, //,（用于校验提前预定天数规则）,
							'level': level,
							'discount': item.discount, //折扣,
							'airline': this.userlist.name.airline, //航司编码,
							'hcType': this.lei, //单程或者往返
							'staffIds': ast, //用户编号
							'flightNo': this.userlist.name.no, //航班号
							'minSalePriceCheck': minSalePriceCheck, //list对象
						},
						uses = {
							"civilServiceTicket": 1
						}
					try {
						let res = await certifi.ruleCheck(user); //获取是否超规
						// let rea = await certifi.toBook(uses);
						
						// let ret = await certifi.ruleCheckRepeatBook(uses);//重复预定规则校验
						// this.rulesReasons = res.data.rulesReason;//高价类型
						// this.rulesReasone = res.data.rulesReason;//航班类型
						// this.rulesReasonr = res.data.rulesReason;//低价超规类型
						// this.rulesReasont = res.data.rulesReason;//仓位限制超规类型
						// this.rulesReasonf = res.data.rulesReason;//折扣限制超规类型
						// this.rulesReasong = res.data.rulesReason;//同行人数限制超规类型
						// this.rulesReasonb = res.data.rulesReason;//提前预定超规类型
						// this.rulesReasons.unshift({chineseDesc:'　'})
						if (res.code == 200) {
							console.log("res", JSON.stringify(res.data.limitNativeRule))
							if (JSON.stringify(res.data.limitNativeRule) == '{}') { //没有违规
								this.othotrlis(); //跳转订单页面
							} else {
								this.rulesReasons = res.data.rulesReason; //违规原因
								this.rulesReasons.unshift({
									chineseDesc: '　'
								})
								let dal = res.data.limitNativeRule; //违规信息
								this.limitNativeRule = dal;
								this.platformlist = [];
								this.notbooking = false;
								this.isblckt = false;
								for (let k in dal) {
									this.platformlist.push({
										index: 0,
										name: this.platnams(k),
										names: k,
										list: this.platname(dal[k])
									})
								}
								for (let p in this.platformlist) {
									for (let k in this.platformlist[p].list) {
										if (this.platformlist[p].list[k].va == 4) {
											this.notbooking = true;
										}
										if (this.platformlist[p].list[k].va == 5) {
											this.isblckt = true; //是否再次审批
										}
									}
								}
								this.staleve = true;
							}
						} else {
							this.showToasts(res.message)
						}
					} catch (e) {
						console.log(e)
						
					}
				}
			},
			platnams(name) {
				if (name == 'highLimit') {
					return '高价限制超规'
				} else if (name == 'starLevelLimit') {
					return '低价限制超规'
				} else if (name == 'agreementFlightLimit') {
					return '限定协议航班限制超规'
				} else if (name == 'reserveLimit') {
					return '提前预定限制超规'
				} else if (name == 'positionLimit') {
					return '仓位限制超规'
				} else if (name == 'discountLimit') {
					return '折扣限制超规'
				} else if (name == 'accNumberLimit') {
					return '同行人数限制超规'
				}
			},
			platname(list) {
				let su = [];
				for (let k in list) {
					if (k == 1) {
						su.push({
							va: k,
							name: '只记录不提示',
							list: list[k]
						})
					} else if (k == 2) {
						su.push({
							va: k,
							name: '超规不必选择原因',
							list: list[k]
						})

					} else if (k == 3) {
						su.push({
							va: k,
							name: '超规必须选择原因',
							list: list[k],
							reasons: ''
						})

					} else if (k == 4) {
						su.push({
							va: k,
							name: '不可预定',
							list: list[k]
						})
					} else if (k == 5) {
						su.push({
							va: k,
							name: '超规需重新审核',
							list: list[k]
						})
					}
				}
				return su;
			}
		}
	}
</script>

<style lang="scss" scoped>
	*{
		font-size: 30upx;
	}
	.change {
		margin-left: 23px;
		font-size: 15px;
		color: #3c85fd;
		font-weight: 600;
	}

	.official {
		height: 20px;
		width: 20px;
		margin-left: 10px;
	}

	.top {
		width: 100%;
		background: #ffffff;

		.black_mu {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, .5);
			z-index: 888;

			.isswflist {
				position: fixed;
				bottom: 0;
				left: 0;
				transition: all 0.3s ease;
				-webkit-transform: translateY(100%);
				transform: translateY(100%);
				min-height: 150upx;
				border-top-left-radius: 15upx;
				border-top-right-radius: 15upx;
				width: calc(100% - 80upx);
				z-index: 889;
				background: #ffffff;
				padding: 40upx;
				font-size: 30upx;

				.isstop {
					color: $uni-color-primary;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 30upx;
				}

				.isstops {
					padding-bottom: 20upx;
				}
			}

			.show {
				-webkit-transform: translateY(0);
				transform: translateY(0);
			}
		}

		.above {
			padding: 20upx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.above_left {
				width: calc(50% - 100upx);
				text-align: right;

				.city {
					overflow:hidden;
					text-overflow:ellipsis;
					white-space:nowrap;
					color: #abbdd3;
				}

				.go_off {
					font-size: 50upx;

				}

				.arrival_time {
					overflow:hidden;
					text-overflow:ellipsis;
					white-space:nowrap;
					color: #abbdd3;
				}
			}
			.above_centre {
				width: 200upx;
				text-align: center;
				margin-top: 20upx;
				margin: 0 10upx;
			}
		}

		.below {
			text-align: center;
			color: #abc2d8;
			padding-bottom: 20upx;
		}
	}

	.mian {
		padding: 10upx;

		.middle {

			// width: 100%;
			// display: flex;
			.contract {
				width: 100%;
				display: flex;
				line-height: 90upx;
				margin-top: 10upx;
				background: #FFFFFF;

				.contract_left {
					width: 50%;
					text-align: center;
					color: #b2b7c5;
					font-size: 35upx;
				}

				.contract_right {
					width: 50%;
					text-align: center;
					color: #b2b7c5;
					font-size: 35upx;
				}
			}

			.contract_lefta {
				color: #007aff !important;
				line-height: 89upx;
				border-bottom: 1upx solid #007aff;
			}

			.contract_righta {
				color: #007aff !important;
				line-height: 89upx;
				border-bottom: 1upx solid #007aff;
			}
		}

		.reserve {
			width: 100%;
			height: 200upx;
			display: flex;
			text-indent: 20upx;
			// padding-top: 30upx;
			// padding-bottom: 30upx;
			// display: flex;
			margin: 10upx 0;
			background: #FFFFFF;
			align-items: center;
			justify-content: space-between;

			.reserve_left {

				.money {
					color: #ff7362;
					font-size: 45upx;
					font-weight: bold;
				}

				.shidisc {
					color: #abb7c2;
					// display: flex;

					span {
						padding-left: 10upx;
						color:$uni-color-primary;
					}
				}
			}

			.reserve_right {
				margin-right: 40upx;
				text-indent: initial;
				.but {
					width: 160upx;
					height: 60upx;
					background:$uni-color-primary;
					text-align: center;
					line-height: 60upx;
					border-radius: 5upx;
					color: #FFFFFF;
				}

				.buts {
					width: 160upx;
					height: 40upx;
					line-height: 40upx;
					text-align: center;
					color: red;
					font-size: 24upx;
				}
			}
		}
	}

	.staleve {
		position: fixed;
		left: 0;
		top: 0;
		width: calc(100% - 100upx);
		height: 100%;
		padding: 0 50upx;
		background: rgba(0, 0, 0, .3);
		z-index: 500;
		display: flex;
		align-items: center;
		justify-content: center;

		.stalist {
			width: 100%;
			// height: 50%;
			// overflow: auto;
			border-radius: 20upx;
			font-size: 35upx;
			line-height: 90upx;
			background: #F1F1F1;
			overflow: scroll;

			.statop {
				padding: 20upx;

				.reds {
					width: 100%;
					height: 70upx;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					color: red;

					.ts_text {
						padding: 0 20upx;
						line-height: 50upx;
						border-radius: 50upx;
						border: 2upx solid red;
					}
				}

				.setlist {
					line-height: 50upx;
					font-size: 30upx;
					margin: 10upx 0;

					.setbod {
						border: 2upx solid #FFFFFF;
						border-radius: 15upx;

						.styul {
							width: 100%;
							margin: 10upx 0;

							.styli_top {
								width: 100%;
								color: red;
								text-align: center;
								font-size: 30upx;
								line-height: 45upx;
							}

							.stulis {
								display: flex;

								.styli_left {
									width: 25%;
									display: flex;
									align-items: center;
									justify-content: flex-end;
								}

								.styli_right {
									width: 75%;
									margin-left: 5%;

									.wors {
										width: 80%;
										font-size: 30upx;
										height: 50upx;
										// overflow: hidden;

										picker {
											width: 70%;
											height: 50upx;
											text-indent: 20upx;
											border: $uni-color-primary solid 1upx;
											border-radius: 15upx;
											overflow: hidden;
										}
									}
								}
							}
						}
					}
				}
			}

			.btnsti {
				width: 100%;
				height: 90upx;
				line-height: 90upx;
				text-align: center;
				display: flex;
				// position: fixed;
				// bottom: 300upx;
				// left: 0;

				.roblck {
					flex: 1;
					height: 90upx;
					background: #FFFFFF;
					border-bottom-left-radius: 15upx;
				}

				.btnok {
					flex: 1;
					height: 90upx;
					border-bottom-right-radius: 15upx;
					color: #FFFFFF;
					background: linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);
				}
			}
		}
	}
	.praImg{
		width:100%;
	}
</style>
