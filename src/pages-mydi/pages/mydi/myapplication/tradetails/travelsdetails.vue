<template>
	<view class="tralist">
		<loading>
		</loading>
		<view class="Navigation">
			<view class="smtis">
				<view v-if="isid != 0" @click="rblcok" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">
					&#xe61e;</view>
			</view>
			<view class="ongbutn">
				出差单详情
			</view>
			<view class="smtis">
			</view>
		</view>
		<view class="tacks" style="padding-left:35upx">
			<view class="iconfont" :style="{color: mestaus(status),'font-size': '60upx'}"
				v-if="status == 2 || status == 5">&#xe60a;</view>
			<view class="iconfont" :style="{color: mestaus(status),'font-size': '60upx'}"
				v-if="status == 1 || status == 0">&#xe650;</view>
			<view class="iconfont" :style="{color: mestaus(status),'font-size': '60upx'}"
				v-if="status == 3 || status == 4">&#xe641;</view>
			<view style="margin-left: 20upx;" v-if="collist(status)">
				{{collist(status)}}
			</view>
		</view>
		<view class="tacks">
			<view class="tacks_left">
				出差人员
			</view>
			<view class="tacks_right">
				<view class="dvslist" v-for="(item,index) in userName" :key="index">
					{{item.userName}}
				</view>
			</view>
		</view>
		<view class="tacks" v-if="taskType != 4 && taskType != 5">
			<view class="tacks_left">
				出差日期
			</view>
			<view class="tacks_right">
				<view class="dvslist">
					{{datatime(userdata)}}
				</view>
			</view>
		</view>
		<view class="tacks" v-if="taskType == 4 || taskType == 5">
			<view class="tacks_left">
				申请日期
			</view>
			<view class="tacks_right">
				<view class="dvslist">
					{{createTimes}}
				</view>
			</view>
		</view>
		<view class="tacks">
			<view class="tacks_left" v-if="taskType != 4 && taskType != 5">
				出差事由
			</view>
			<view class="tacks_left" v-if="taskType == 4">
				改签事由
			</view>
			<view class="tacks_left" v-if="taskType == 5">
				退票事由
			</view>
			<view class="tacks_right">
				<view class="dvslist">
					{{userreason?userreason:''}}
				</view>
			</view>
		</view>
		<view class="tacks" v-if="traveldetails !=null && traveldetails != ''">
			<view class="tacks_left">
				详细说明
			</view>
			<view class="tacks_right">
				<view @click="crems" class="dvslist" style="color: red;"
					v-if="taskType == 2 || taskType == 4 || taskType == 5">
					{{detaail(trafals)}}
				</view>
				<view class="dvslist" v-else>
					{{traveldetails}}
				</view>
			</view>
		</view>
		<view class="tacks" v-if="refuseReason !=null && refuseReason != ''">
			<view class="tacks_left">
				驳回原因
			</view>
			<view class="tacks_right">
				<view class="dvslist" style="color: red;">
					{{refuseReason}}
				</view>
			</view>
		</view>
		<view class="tacks">
			<view class="tacks_left">
				费用归属(部)
			</view>
			<view class="tacks_right">
				<view class="dvslist" v-if="talattribution != null">
					{{talattribution}}
				</view>
			</view>
		</view>
		<view class="tacks">
			<view class="tacks_left">
				费用归属(成)
			</view>
			<view class="tacks_right">
				<view class="dvslist">
					{{costattribution?costattribution:''}}
				</view>
			</view>
		</view>
		<view class="tacks" v-if="(taskType == 2 || taskType == 4 || taskType == 5 )&& price > 0">
			<view class="tacks_left" v-if="taskType == 5">
				应退金额
			</view>
			<view class="tacks_left" v-if="taskType == 4">
				改签费用
			</view>
			<view class="tacks_left" v-else>
				总费用
			</view>
			<view class="tacks_right">
				<view class="dvslist" style="color: #FF9000;">
					￥{{price}}
				</view>
			</view>
		</view>
		<view class="tacks" v-if="taskType == 1 && totalBudget > 0 && totalBudget != null && totalBudget != '' ">
			<view class="tacks_left" v-if="taskType == 1">
				预估费用
			</view>
			<view class="tacks_right">
				<view class="dvslist" style="color: #FF9000;">
					￥{{totalBudget}}
				</view>
			</view>
		</view>
		<view class="tacks" v-if="taskType == 5 && refundOtherFee > 0">
			<view class="tacks_left">
				手续费
			</view>
			<view class="tacks_right">
				<view class="dvslist" style="color: #FF9000;">
					￥{{refundOtherFee}}
				</view>
			</view>
		</view>
		<div class="cost" v-show="userName.length > 0 && userName[0].costName != null">
			<view class="cost_left">
				成本中心
			</view>
			<view class="cost_child" v-for="(item,index) in userName" :key="index">
				<view>
					{{item.costName}}
				</view>
				<view>
					{{item.userName}}({{item.costPercent}}%)
				</view>
				<view style="color: #FF9000;font-size: 32upx;">￥{{(totalBudget * (item.costPercent * 0.01)).toFixed(2)}}
				</view>
			</view>
		</div>
		<view class="tackis">
			<view class="tacks_left">
				出差行程
			</view>
			<view class="talist" v-for="(item,index) in taslist" :key="index">
				<view class="tastsl">
					<view class="tl_left">
						<view class="tl_tops">
							<view :class="item.vehicle == 1 ? 'tl_tops_rights' : 'tl_tops_right'">
								{{ typename(item.vehicle) }}
							</view>
							<view>
								{{ cityname(item) }}
							</view>
						</view>
						<view class="tl_bot">
							{{ newdata(item) }}
						</view>
						<view class="tl_bots"
							v-if="index === 0 && nlowPriceFlight !== '' && nlowPrice !== '' && nlowPriceTime !== '' && item.vehicle === 1 ">
							两小时最低航班/价格/时间：{{nlowPriceFlight}}/￥{{nlowPrice}}/{{nlowPriceTime}}
						</view>
						<view class="tl_bots"
							v-if="index === 1 && twoNLowPriceFlight !== '' && twoNLowPrice !== '' && twoNLowPriceTime !== '' && item.vehicle === 1 ">
							两小时最低航班/价格/时间：{{twoNLowPriceFlight}}/￥{{twoNLowPrice}}/{{twoNLowPriceTime}}
						</view>
					</view>
					<view class="tl_right">
						<view class="tldv" v-if="item.vehicle != 5">
							{{taskty(taskType,item.vehicle)}}
						</view>
						<view class="tldv" v-if="item.vehicle == 5">
							{{item.level}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tacks_list">
			<view class="ta_s" v-for="(item,index) in filterLogPersonStatus" :key="index">
				<view class="talist_left">
					<view class="ta_left_tops" v-if="index == 0"></view>
					<view class="ta_left_top" :style="{background: mestaust(item.status)}" v-if="index != 0"></view>
					<view class="ta_left_se">
						<view class="iconfont" :style="{color: mestaust(item.status),'font-size': '44upx'}"
							v-if="item.status == 9 || item.status == 1 || item.status == 99 || item.status == 4">
							&#xe60a;</view>
						<view class="iconfont" :style="{color: mestaust(item.status),'font-size': '36upx'}"
							v-if="item.status == 0">&#xe650;</view>
						<view class="iconfont" :style="{color: mestaust(item.status),'font-size': '40upx'}"
							v-if="item.status == 3">&#xe641;</view>
					</view>
					<view class="ta_left_top" :style="{background: mestaust(item.status)}"
						v-if="index != filterLogPersonStatus.length - 1"></view>
					<view class="ta_left_tops" v-if="index == filterLogPersonStatus.length - 1"></view>
				</view>
				<view class="talist_right">
					<view class="absot">
					</view>
					<view class="tavri_left">
						<view class="tavri_left_top">
							<view v-if="item.apprvWay == 5" class="testr">
								TC代审
							</view>
							<view v-else class="testr">
								<view v-if="item.deptName != null">{{item.deptName}}</view>
							</view>
							<view class="testr">{{item.staffName}}</view>
						</view>
						<view class="tavri_left_bto">
							<view :style="{color: mestaust(item.status)}">
								{{collists(item.status)}}
							</view>
						</view>
						<view class="tavri_left_btm" v-if="item.remark != '' && item.remark != null"
							@click.stop="propClick(item.remark)">
							备注：<span>{{item.remark}}</span>
						</view>
					</view>
					<view class="tavri_right" v-if="index == 0">
						{{modata(item.modifyTime)}}
					</view>
					<view class="tavri_right" v-else>{{modata(item.apprvTime)}}</view>
				</view>
			</view>
		</view>
		<view class="reblck" v-if="blacks" @click.stop="adblack">
			<view class="blos" @click.stop>
				<textarea value="" v-model="istext" :placeholder="plachols" />
				<view class="blos_btn">
					<view class="chck_left" @click="adblack">返回</view>
					<view class="chck_right" @click="addok()">确定</view>
				</view>
			</view>
		</view>
		<view class="check_btn" v-if="isched && stk">
			<view class="chck_left" @click="add_user(3)" v-if="rotes('tms:exa:reject')">驳回</view>
			<view class="chck_right" @click="add_user(1)" v-if="rotes('tms:exa:adopt')">通过</view>
		</view>
		<view class="check_btn" v-if="!isched && (status==0 || status==1) && rotes('tms:myi:withdraw')">
			<view class="chck_otn" @click="delete_s">撤回</view>
		</view>
		<view class="staleve" v-if="staleve" @click="blckis">
			<view class="stalist" @click.stop>
				<view class="statop" v-if="remsk.length == 0" style="color: red;">
					{{traveldetails}}
				</view>
				<view class="statop" v-for="(item,index) in remsk" :key="index" v-else>
					<view class="reds">
						<view class="ts_text">
							{{item.list[0].nametype}}
						</view>
					</view>
					<view class="setlist" v-for="(items,index) in item.list" :key="index">
						<view class="setbod">
							<view class="styul">
								<view class="styli_top">
									{{isname(items.is)}}
								</view>
								<view class="stulis">
									<view class="styli_left">
										超规人员：
									</view>
									<view class="styli_right">
										{{items.name}}
									</view>
								</view>
								<view class="stulis" v-if="items.is == 3 || items.is == 8">
									<view class="styli_left">
										超规原因：
									</view>
									<view class="styli_right">
										{{items.seratis}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import citys from '@/pages/book/sselect-city/airports.js'
	import Mydi from '@/api/mydi.js'
	import tork from '@/api/torowk.js'
	export default {
		data() {
			return {
				createTimes: '', //申请日期
				plachols: "",
				trafals: false, //是否有超规信息
				staleve: false,
				refundOtherFee: 0, //手续费
				price: 0, //总费用
				stk: false, //是否需要审核了
				blacks: false,
				status: null,
				isid: 0,
				userName: [], //出差人员
				userdata: [], //出差日期
				userreason: '', //出差事由
				traveldetails: '', //出差详情
				talattribution: '', //部门归属
				costattribution: '', //成本归属
				refuseReason: '', //驳回原因
				taslist: [], //出差行程
				tarlis: [], //审核对象
				isched: true, //是审核还是审批
				its: 0,
				istext: '', //意见
				istef: false,
				taskType: 0,
				remsk: [], //超规信息
				token: '',
				totalBudget: '', //预估费用
				nlowPrice: '', //往程 最低价
				nlowPriceFlight: '', // 往程  最低价航班
				nlowPriceTime: '', // 往程 航班出发时间
				twoNLowPrice: '', // 返程  最低价
				twoNLowPriceFlight: '', // 返程 最低价航班
				twoNLowPriceTime: '', // 返程 航班出发时间
			}
		},
		onLoad(item) {
			if (item.code == 'left') {
				this.isched = true
			} else {
				this.isched = false
			}
			if (item.id != undefined) {
				this.isid = item.id
			} else {
				this.token = item.token;
			}
		},
		mounted() {
			this.datalist()
		},
		computed: {
			filterLogPersonStatus() {
				// 如果审批进行中，则不过滤，否则过滤状态为9和10的审批日志
				if (this.status != 0 && this.status != 1) {
					return this.tarlis.filter(item => item.status != 9 && item.status != 10)
				}
				return this.tarlis;
			}
		},
		methods: {
			blckis() {
				this.staleve = false
			},
			crems() {
				this.staleve = true;
			},
			isname(is) {
				if (is == 1) {
					return '只记录'
				} else if (is == 2) {
					return '记录并提示'
				} else if (is == 3) {
					return '记录并选择原因'
				} else if (is == 7) {
					return '不管控'
				} else if (is == 8) {
					return '记录并选择原因'
				} else if (is == 5) {
					return '记录并重新审核'
				}
			},
			rblcok() {
				// #ifdef H5
				history.back();
				// #endif
				// #ifdef MP-WEIXIN
				uni.navigateBack()
				// #endif
			},
			taskty(it, id) {
				if (it == 1) {
					return '出差'
				} else if (it == 2) {
					return '预定'
				} else if (it == 4) {
					return '改签'
				} else if (it == 5) {
					if (id == undefined) {
						return '退房'
					} else {
						return '退票'
					}
				}
			},
			detaail(item) {
				if (item) {
					return '违反差旅规则，点击查看'
				} else {
					if (this.traveldetails != null && this.traveldetails != '' && this.traveldetails != '{}' && this
						.traveldetails != '{"information":[{}]}' && this.traveldetails != '{"information":[]}') {
						return this.traveldetails
					} else {
						return ''
					}
				}
			},
			delete_s() { //撤回
				let that = this;
				uni.showModal({
					title: '提示',
					content: '是否撤销申请单',
					success: function(res) {
						if (res.confirm) {
							that.delt()
						} else if (res.cancel) {}
					}
				});
			},
			async delt() {
				let that = this;

				try {
					const res = await Mydi.cancelTask({
						id: this.isid
					});

					if (res.code == 200) {
						setTimeout(() => {
							uni.$emit('add_user', res);
							uni.navigateBack({})
						}, 500)
					} else {

					}
				} catch (e) {
					console.log(e)

				}
			},
			async addok() { //确定操作

				let dats = {};
				if (this.isid == 0) {
					dats = {
						paramToken: this.token,
						status: this.its,
						remark: this.istext
					}
				} else {
					dats = {
						taskId: this.isid,
						status: this.its,
						remark: this.istext
					}
				}
				try {
					const res = await tork.apprvTask(dats);

					if (res.code == 200) {
						if (this.isid == 0) {
							this.blacks = false;
							uni.showToast({
								title: '审批成功！',
								duration: 1000,
								icon: 'none'
							})
							this.datalist();
						} else {
							setTimeout(() => {
								uni.$emit('add_user', res);
								uni.navigateBack({})
							}, 500)
						}
					} else {

					}
				} catch (e) {
					console.log(e)

				}
			},
			adblack() {
				this.blacks = false
			},
			propClick(val) {
				uni.showModal({
					title: '备注',
					content: val,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			add_user(it) {
				if (it == 1) {
					this.plachols = "请输入你的通过意见！"
				} else {
					this.plachols = "请输入你的驳回意见！"
				}
				this.its = it;
				this.blacks = true
			},
			modata(it) { //时间转换
				if (it != undefined && it != null && it != '') {
					let dat = new Date(it.replace(/-/g, '/'));
					let month = this.dats(dat.getMonth() + 1);
					let dats = this.dats(dat.getDate());
					let hous = this.dats(dat.getHours());
					let minu = this.dats(dat.getMinutes());
					return month + "." + dats + " " + hous + ":" + minu
				}
			},
			mestaus(st) {
				if (st == 9 || st == 0) {
					return '#E5E5E5'
				} else if (st == 2 || st == 4 || st == 5) {
					return '#007aff'
				} else if (st == 1) {
					return '#0CBAF5'
				} else if (st == 3) {
					return 'red'
				}
			},
			mestaust(st) {
				if (st == 9) {
					return '#E5E5E5'
				} else if (st == 1 || st == 2 || st == 4 || st == 99) {
					return '#007aff'
				} else if (st == 0) {
					return '#007aff'
				} else if (st == 3) {
					return 'red'
				}
			},
			async datalist() { //获取当前出差单信息
				let that = this;

				let dats = {};
				if (this.isid == 0) {
					dats = {
						paramToken: this.token
					}
				} else {
					dats = {
						id: that.isid
					}
				}
				try {
					const res = await tork.detailApply(dats);

					if (res.code == 200) {
						let datw = res.data;
						that.createTimes = datw.apprvTask.createTime; //申请日期
						that.userName = datw.tmsGssLink.applyStaffs; //出差人员
						that.userdata = [datw.apprvTask.startDate, datw.apprvTask.endDate]; //出差时间
						that.userreason = datw.apprvTask.reason; //理由
						that.traveldetails = datw.apprvTask.remark; //超规原因
						that.price = datw.apprvTask.totalMoney; //总费用
						that.totalBudget = datw.apprvTask.totalBudget;
						that.refundOtherFee = datw.apprvTask.refundOtherFee; //退票手续费
						that.talattribution = datw.apprvTask.deptName;
						that.costattribution = datw.apprvTask.costName;
						that.taskType = datw.apprvTask.taskType; //审批单类型
						that.refuseReason = datw.apprvTask.refuseReason; //驳回原因
						if (datw.tmsDpsSaleExtra.length !== 0) {
							that.nlowPrice = datw.tmsDpsSaleExtra[0].nlowPrice;
							that.nlowPriceFlight = datw.tmsDpsSaleExtra[0].nlowPriceFlight;
							that.nlowPriceTime = datw.tmsDpsSaleExtra[0].nlowPriceTime;
							that.twoNLowPrice = datw.tmsDpsSaleExtra[0].twoNLowPrice;
							that.twoNLowPriceFlight = datw.tmsDpsSaleExtra[0].twoNLowPriceFlight;
							that.twoNLowPriceTime = datw.tmsDpsSaleExtra[0].twoNLowPriceTime;
						}
						let applivalist = [];
						let appflks = datw.tmsGssLink.applyVehicles;
						for (let k = 0; k < appflks.length; k++) {
							if (appflks[k].goBackGroup == null || appflks[k].goBackGroup == undefined) {
								applivalist.push(appflks[k])
							} else {
								let nums = 0;
								for (let p in applivalist) {
									if (applivalist[p].goBackGroup != null && appflks[k].goBackGroup != undefined) {
										if (applivalist[p].goBackGroup == appflks[k].goBackGroup) {
											nums = 1;
										}
									}
								}
								if (nums == 0) {
									appflks[k].deptDates = appflks[k + 1].deptDate;
									applivalist.push(appflks[k])
								}
							}
						}
						that.taslist = datw.tmsGssLink.applyHotels.concat(applivalist);
						if (that.taskType == 4) { //改签

						} else if (that.taskType == 5) { //退票

						}
						that.status = datw.apprvTask.status;
						that.stk = datw.isAgree;
						let dats = [{
							deptName: datw.apprvTask.deptName,
							staffName: datw.apprvTask.userName,
							modifyTime: datw.apprvTask.createTime,
							remark: datw.apprvTask.reason,
							status: 99
						}]
						let is = that.taskType;
						let item = that.traveldetails;
						if (item != null && item != '' && item != '{}' && item != '{"information":[{}]}' && item !=
							'{"information":[]}') {
							let sts = {};
							try {
								let st;
								let list;
								try {
									st = JSON.parse(item).information;
								} catch (e) {
									// 转换异常而已，代表没有违规信息保存在里头
									console.log(e)
								}
								if (st) {
									list = st[0];
								}
								this.remsk = [];
								if ((is == 2 || is == 4 || is == 5) && list) { //判断预定或者改签 才有超规信息 且有记录才行喔
									for (let k in list) {
										sts[k] = {
											list: []
										};
										for (let p in list[k]) {
											let names = ''
											if (k == 'highLimit') {
												names = '高价超规'
											} else if (k == 'lowLimit') {
												names = '低价政策'
											} else if (k == 'agreementFlightLimit') {
												names = '限定协议航班政策'
											} else if (k == 'reserveLimit') {
												names = '提前预定规则政策'
											} else if (k == 'positionLimit') {
												names = '仓位限制规则政策'
											} else if (k == 'discountLimit') {
												names = '折扣限制规则政策'
											} else if (k == 'accNumberLimit') {
												names = '同行人数限制规则政策'
											} else if (k == 'nativeTrainRules') {
												names = '座位等级超规'
											} else if (k == 'starLevelLimit') {
												names = '星级超规'
											} else if (k == 'repeatBookingLimit') {
												names = '重复预定超规'
											} else if (k == 'platformLimit') {
												names = '平台限制超规'
											} else if (k == 'carGroupLimit') {
												names = '车型限制超规'
											} else if (k == 'eachTimePriceLimit') {
												names = '金额每次限制超规'
											} else if (k == 'eachDayPriceLimit') {
												names = '金额每天限制超规'
											} else if (k == 'eachMonthPriceLimit') {
												names = '金额每月限制超规'
											}
											if (p == 2) {
												sts[k].list.push({
													is: 2,
													name: list[k][p],
													nametype: names,
													type: k
												})
											}
											if (p == 3) {
												sts[k].list.push({
													is: 3,
													name: list[k][p].usernames,
													nametype: names,
													type: k,
													seratis: list[k][p].reasons
												})
											}
											if (p == 1) {
												sts[k].list.push({
													is: 1,
													name: list[k][p],
													nametype: names,
													type: k
												})
											}
											if (p == 5) {
												sts[k].list.push({
													is: 5,
													name: list[k][p],
													nametype: names,
													type: k
												})
											}
											if (p == 7) {
												sts[k].list.push({
													is: 7,
													name: list[k][p],
													nametype: names,
													type: k
												})
											}
											if (p == 8) {
												sts[k].list.push({
													is: 8,
													name: list[k][p].usernames,
													nametype: names,
													type: k,
													seratis: list[k][p].reasons
												})
											}
										}
									}
									console.log(sts);
									this.remsk = sts;

									that.trafals = true;
								} else {

									that.trafals = false;
								}
							} catch (e) {
								that.trafals = false;
								//TODO handle the exception
							}
						} else {
							that.trafals = false;
						}
						that.tarlis = dats.concat(datw.apprvTask.apprvTaskLogPersons)
					}
				} catch (e) {
					console.log(e)

				}
			},
			newdata(tm) { //回显时间
				if (tm.vehicle == 5) {
					return tm.createTime
				} else {
					let sta = '';
					let stamon = '';
					let stadta = '';
					let end = '';
					let endmon = '';
					let enddta = '';
					if (tm.deptDate) {
						if (tm.deptDates) {
							end = new Date(tm.deptDates.replace(/-/g, '/')); //出发日期
							endmon = this.dats(end.getMonth() + 1);
							enddta = this.dats(end.getDate());
						}
						sta = new Date(tm.deptDate.replace(/-/g, '/')); //出发日期
						stamon = this.dats(sta.getMonth() + 1);
						stadta = this.dats(sta.getDate());
					} else {
						sta = new Date(tm.inDate.replace(/-/g, '/')); //出发日期
						stamon = this.dats(sta.getMonth() + 1);
						stadta = this.dats(sta.getDate());
						end = new Date(tm.outDate.replace(/-/g, '/')); //出发日期
						endmon = this.dats(end.getMonth() + 1);
						enddta = this.dats(end.getDate());
						return stamon + '月' + stadta + '日' + '　入住　' + endmon + '月' + enddta + '日' + ' 离店'
					}
					if (tm.deptDates) {
						return stamon + '月' + stadta + '日' + ' 出发 ' + endmon + '月' + enddta + '日' + ' 返回'
					} else {
						return stamon + '月' + stadta + '日' + '  出发'
					}
				}
			},
			collist(it) {
				if (it == 0) {
					return '待审批'
				} else if (it == 1) {
					return '审批中'
				} else if (it == 2) {
					return '已通过'
				} else if (it == 3) {
					return '已驳回'
				} else if (it == 4) {
					return '已撤回'
				} else if (it == 5) {
					return '免审'
				} else if (it == 9) {
					return '无效'
				}
			},
			collists(it) {
				if (it == 0) {
					return '审批中'
				} else if (it == 1) {
					return '审批通过'
				} else if (it == 2) {
					return '转移'
				} else if (it == 3) {
					return '驳回'
				} else if (it == 4) {
					return '跳过'
				} else if (it == 9) {
					return '待审批'
				} else if (it == 99) {
					return '发起了申请'
				}
			},
			cityname(tm) { //回显城市名称、
				if (tm.vehicle == 1) {
					let deptname = this.citname(tm.deptCityCode);
					let arrivname = this.citname(tm.arrivCityCode);
					return deptname + ' - ' + arrivname
				} else if (tm.vehicle == 2) {
					return tm.deptCityName + ' - ' + tm.arrivCityName
				} else if (tm.vehicle == 5) {
					return tm.deptCityName + ' - ' + tm.arrivCityName
				} else {
					if (tm.remark == null || tm.remark === '') {
						return tm.cityName
					} else {
						return tm.cityName + "　" + tm.remark
					}
				}
			},
			citname(code) {
				let datcy = citys.addressAirportAll;
				for (let i = 0; i < datcy.length; i++) {
					if (datcy[i].airportCode == code) {
						return datcy[i].cityCName
					}
				}
			},
			typename(tm) { //回显类型
				if (tm == 1) {
					return '[机票]'
				} else if (tm == 2) {
					return '[火车]'
				} else if (tm == 5) {
					return '[用车]'
				} else {
					return '[酒店]'
				}
			},
			dats(it) {
				if (it < 10) {
					return '0' + it
				} else {
					return it
				}
			},
			datatime(item) {
				if (item.length == 0 || item[0] == null) {
					return '';
				} else {
					if (item[0] != null && item[1] == null) {
						let tw = item[0].replace(/-/g, '/');
						let sta = new Date(tw); //出发日期
						let stamon = this.dats(sta.getMonth() + 1);
						let stadat = this.dats(sta.getDate());
						return stamon + '月' + stadat + '日'
					} else {
						let tw = item[0].replace(/-/g, '/');
						let tws = item[1].replace(/-/g, '/');
						let sta = new Date(tw); //出发日期
						let end = new Date(tws); //返回日期
						let stamon = this.dats(sta.getMonth() + 1);
						let stadat = this.dats(sta.getDate());
						let endmon = this.dats(end.getMonth() + 1);
						let enddat = this.dats(end.getDate());
						let dats = Date.parse(end) - Date.parse(sta); //出差天数
						return stamon + '月' + stadat + '日' + '-' + endmon + '月' + enddat + '日' + '　共' + (dats / 60 / 60 /
							24 / 1000 + 1) + '天'
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tralist {
		width: 100%;
		font-size: 30upx;
		color: #333333;

		.reblck {
			position: fixed;
			width: 100%;
			height: 100%;
			z-index: 802;
			bottom: 0;
			left: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(0, 0, 0, 0.3);

			.blos {
				width: 70%;
				position: relative;
				height: 300upx;
				background: #FFFFFF;

				textarea {
					width: calc(100% - 40upx);
					height: 160upx;
					padding: 20upx;
				}

				.blos_btn {
					position: absolute;
					width: 100%;
					height: 110upx;
					left: 0;
					bottom: 0;
					display: flex;
					text-align: center;
					line-height: 110upx;
					border-top: 2upx solid #E5E5E5;

					.chck_left {
						flex: 1;
						height: 110upx;
						background: #FFFFFF;
						color: $uni-color-primary;
					}

					.chck_right {
						flex: 1;
						color: #ffffff;
						height: 110upx;
						background: $uni-color-primary;
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
			z-index: 805;
			display: flex;
			align-items: center;
			justify-content: center;

			.stalist {
				width: 100%;
				border-radius: 20upx;
				max-height: 800upx;
				overflow: scroll;
				font-size: 35upx;
				line-height: 90upx;
				background: #FFFFFF;

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
										width: 30%;
										display: flex;
										align-items: center;
										justify-content: flex-end;
									}

									.styli_right {
										width: 70%;
										overflow: scroll;
									}
								}
							}
						}
					}
				}
			}
		}

		.check_btn {
			width: 100%;
			height: 110upx;
			display: flex;
			text-align: center;
			line-height: 110upx;
			font-size: 30upx;
			z-index: 800;

			.chck_left {
				flex: 1;
				height: 110upx;
				background: #DD524D;
				color: #FFFFFF;
			}

			.chck_otn {
				flex: 1;
				height: 110upx;
				background: #DD524D;
				color: #FFFFFF;
			}

			.chck_right {
				flex: 1;
				color: #ffffff;
				height: 110upx;
				background: $uni-color-primary;
			}
		}

		.tacks_list {
			width: 100%;
			background: #FFFFFF;
			margin-bottom: 110upx;
			color: #333333;
			padding-bottom: 40upx;

			.ta_s {
				width: calc(100% - 50upx);
				padding: 0 25upx;
				display: flex;

				.talist_left {
					width: 10%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;

					.ta_left_top {
						width: 6upx;
						height: calc(50% - 30upx);
						background: #E5E5E5;
					}

					.ta_left_se {
						width: 100%;
						height: 40upx;
						display: flex;
						align-items: center;
						justify-content: center;
						overflow: hidden;
					}

					.ta_left_tops {
						width: 6upx;
						height: calc(50% - 30upx);
						background: #FFFFFF;
					}
				}

				.talist_right {
					position: relative;
					width: calc(100% - 20upx);
					margin: 20upx 0 20upx 20upx;
					line-height: 67upx;
					background: #F6F6F6;
					border-radius: 15upx;
					display: flex;

					.tavri_left {
						// height: 150upx;
						width: 60%;

						.tavri_left_top {
							display: flex;
							justify-content: space-between;
							align-items: center;
							text-indent: 25upx;

							.testr {
								display: inline;
								white-space: nowrap;
								overflow-x: scroll;
								width: 50%;
								overflow-y: hidden
							}
						}

						.tavri_left_bto {
							text-indent: 20upx;
						}

						.tavri_left_btm {
							text-indent: 20upx;
							font-size: 30upx;
							width: 370upx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							word-wrap: break-word;

						}
					}

					.tavri_right {
						text-align: center;
						font-size: 30upx;
						color: #E5E5E5;
						height: 150upx;
						width: 40%;
					}

					.absot {
						position: absolute;
						transform: rotate(50deg);
						top: calc(50% - 13upx);
						left: -12upx;
						width: 25upx;
						height: 25upx;
						background: #F6F6F6;
					}
				}
			}
		}

		.cost {
			width: 100%;
			background: #FFFFFF;
			margin-bottom: 20upx;
			font-size: 35upx;

			.cost_left {
				width: 30%;
				text-align: center;
				line-height: 90upx;
				height: 90upx;
				color: #C8C7CC;
			}

			.cost_child {
				width: calc(100% - 120upx);
				border-top: 2upx solid #E5E5E5;
				padding: 10upx 60upx;
				display: flex;
				justify-content: space-between;
				font-size: 30upx;
				text-align: center;
				line-height: 80upx;
			}
		}

		.tackis {
			width: 100%;
			background: #FFFFFF;
			margin-bottom: 20upx;
			font-size: 35upx;

			.tacks_left {
				width: 30%;
				text-align: center;
				line-height: 90upx;
				height: 90upx;
				color: #C8C7CC;
			}

			.talist {
				width: calc(100% - 40upx);
				margin-left: 40upx;
				border-top: 2upx solid #E5E5E5;
				padding: 10upx 0;

				.tastsl {
					width: 100%;
					display: flex;

					.tl_left {
						margin-left: 2%;
						width: 100%;

						.tl_tops {
							display: flex;
							align-items: center;
							width: 100%;
							font-size: 35upx;
							line-height: 50upx;
							color: #333333;

							.tl_tops_rights {
								width: 120upx;
								font-size: 30upx;
							}

							.tl_tops_right {
								width: 140upx;
								font-size: 30upx;
							}

							.tl_tops_left {
								// display: flex;
								// width: 100%;
								font-size: 31upx;

								.tl_tops_lefts {
									margin-left: 20upx;
								}
							}
						}

						.tl_bots {
							width: 100%;
							// height: 40upx;
							font-size: 25upx;
							line-height: 40upx;
							color: red;
						}

						.tl_bot {
							width: 100%;
							height: 40upx;
							font-size: 30upx;
							line-height: 40upx;
							color: #777777;
						}
					}

					.tl_right {
						width: 25%;
						height: 90upx;
						display: flex;
						align-items: center;
						justify-content: center;

						.tldv {
							padding: 0 12upx;
							height: 45upx;
							line-height: 45upx;
							text-align: center;
							font-size: 26upx;
							color: $uni-color-primary;
							border: 2upx solid $uni-color-primary;
							border-radius: 60upx;
						}
					}
				}

				.prsitc {
					font-size: 30upx;
					margin-left: 10%;
					color: #F48F00;
				}
			}
		}

		.tacks {
			// width: 100%;
			height: 90upx;
			line-height: 90upx;
			display: flex;
			background: #FFFFFF;
			margin-bottom: 20upx;
			font-size: 35upx;
			padding-right: 22upx;
			overflow: hidden;

			.tacks_left {
				width: 30%;
				color: #C8C7CC;
				text-align: center;
			}

			.tacks_right {
				width: 70%;
				display: flex;
				height: 90upx;
				overflow: scroll;
				font-size: 32upx;

				.dvslist {
					margin-right: 10upx;
					white-space: nowrap;
				}
			}
		}
	}
</style>
