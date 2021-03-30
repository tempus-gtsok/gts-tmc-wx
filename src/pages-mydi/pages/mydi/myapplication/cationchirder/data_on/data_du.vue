<template>
	<view class="calendar-layer">

		<view class="layer-content" :class="{ choiceDate: singleDate }">
			<view class="layer-header">
				<view class="layer-close" @tap="hideCalendar()"></view>
				<text class="layer-title">选择日期</text>
			</view>
			<!--  -->
			<view class="layer-body">
				<view class="week-box">
					<text class="week-box-item" v-for="(item, tmpIndex) in weekNameArr" :key="tmpIndex">{{ item }}</text>
				</view>
				<!--  -->
				<scroll-view class="layer-list" scroll-y="true">
					<view v-for="(monthData, index) in date" :key="index" class="month">
						<view class="month-title" :class="'m-' + monthData[0].year + '-' + monthData[0].month" :style="'z-index:' + index">
							{{ monthData[0].year + '年' + monthData[0].month + '月' }}
						</view>
						<view class="month-content">
							<view
								v-for="(data, index2) in monthData"
								:key="index2"
								class="day"
								:data-index="index"
								:data-indexs="index2"
								:class="
									data.re < stoptime[0] || data.re > stoptime[1]
										? 'disabled'
										: data.selected
										? 'active' + (data.date == choiceDate[0].date ? ' begin' : data.date == choiceDate[1].date ? ' end' : '')
										: ''
								"
								:style="index2 == 0 ? 'margin-left:' + weeks[index] * (100 / 7) + '%' : ''"
								@tap="dayClick"
							>
								<view class="day-content">
									<text class="day-subject">{{ data.re != today && data.re != tomorrow && data.re != afterTomorrow ? data.act.subject : '' }}</text>
									<text class="day-txt">{{ data.re == today ? '今天' : data.re == tomorrow ? '明天' : data.re == afterTomorrow ? '后天' : data.day }}</text>
									<text class="day-tip">{{ data.act.tip }}</text>
								</view>
								<view class="endTip">{{ dayCount2 }}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import {mapState} from 'vuex';
export default {
	data() {
		return {
			ops: '',//类型
			stoptime:['',''],
			current: '',
			startDate: '',
			endDate: '',
			modal: false,
			show: false,
			daysCount: 150,
			singleDate: false,
			bt_bol: false,
			btns: '\ue80c',
			data_tap: '', //单日期或者双日期模式
			date: [],
			weeks: [],
			dayCount: 1,
			dayCount2: '共1天',
			festival: {
				'101': '元旦',
				'214': '情人节',
				'308': '妇女节',
				'312': '植树节',
				'315': '消费者权益日',
				'401': '愚人节',
				'405': '清明节',
				'501': '劳动节',
				'504': '青年节',
				'512': '护士节',
				'601': '儿童节',
				'701': '建党节',
				'801': '建军节',
				'910': '教师节',
				'928': '孔子诞辰',
				'1001': '国庆节',
				'1006': '老人节',
				'1024': '联合国日',
				'1224': '平安夜',
				'1225': '圣诞节'
			},
			haveOrder: [],
			dateFlag: {},
			today: '',
			choiceDate: [],
			choiceDateArr: [],
			tomorrow: '',
			afterTomorrow: '',
			weekNameArr: ['日', '一', '二', '三', '四', '五', '六'],
			curScrollTop: 0,
			monthTitleRectList: [],
			fixedId: '',
			layerTop: 0,
			//用来重置的
			bak_date: [],
			bak_weeks: [],
			bak_choiceDate: [],
			bak_choiceDateArr: [],
			bak_dayCount: 1,
			islas: false,
			iskj:'',
			isShow_H5: false, //用于表示H5平台显示隐藏状态
			isShow_NoH5: false, //用于表示非H5平台显示隐藏状态
			tmpWeekArr: {} ,//临时数组
			sta_Hotelkettime: {},//出差酒店出发时间
			end_Hotelkettime: {},//出差酒店返回时间
			sta_Flightbus: {},//出差飞机出发时间
			end_Flightbus: {},//出差飞机返回时间
			sta_Traveltrain: {},//出差火车出发时间
			end_Traveltrain: {},//出差火车返回时间
		};
	},
	created() {
		
	},
	onLoad(optin) {
		this.stoptime[0] = optin.statime;
		this.stoptime[1] = optin.endtime;
		this.ops = optin.op;
		this.iskj = optin.ot;
		let dstmon = JSON.parse(optin.dsts);
		if(optin.op == "Planeticket"){
			if(dstmon.length> 0){
				this.sta_Flightbus = dstmon[0];
				this.startDate = this.sta_Flightbus.date.re;
				this.dateFlag = this.sta_Flightbus
			}
			if(dstmon.length> 1){
				this.end_Flightbus = dstmon[1];
				this.endDate = this.end_Flightbus.date.re;
				this.dateFlag = this.sta_Flightbus
			}
		}
		if(optin.op == "Train"){
			if(dstmon.length> 0){
				this.sta_Traveltrain = dstmon[0];
				this.startDate = this.sta_Traveltrain.date.re;
				this.dateFlag = this.sta_Traveltrain
			}
			if(dstmon.length> 1){
				this.end_Traveltrain = dstmon[1];
				this.endDate = this.end_Traveltrain.date.re;
				this.dateFlag = this.sta_Traveltrain
			}
		}
		if(optin.op == "Hotel"){
			if(dstmon.length> 0){
				this.sta_Hotelkettime = dstmon[0];
				this.startDate = this.sta_Hotelkettime.date.re;
				this.dateFlag = this.sta_Hotelkettime
			}
			if(dstmon.length> 1){
				this.end_Hotelkettime = dstmon[1];
				this.endDate = this.end_Hotelkettime.date.re;
				this.dateFlag = this.sta_Hotelkettime
			}
		}
		this.init();
	},
	methods: {
		bts_k() {
			if (this.bt_bol) {
				this.bt_bol = false;
				this.btns = '\ue80c';
			} else {
				this.bt_bol = true;
				this.btns = '\ue618';
			}
		},
		hideCalendar(){
			// #ifdef H5
			history.back();
			// #endif
			// #ifdef MP-WEIXIN
			uni.navigateBack()
			// #endif
		},
		//补0
		pad(num, n) {
			return Array(n - ('' + num).length + 1).join(0) + num;
		},
		init() {
			this.dateData();
		},
		getLayerTop() {
			return new Promise(resolve => {
				//获取layer-list窗器的top
				let view2 = uni.createSelectorQuery().select('.layer-list');
				view2
					.boundingClientRect(data => {
						resolve(data.top);
					})
					.exec();
			});
		},
		ch_retu() {
			let _that = this;
			_that.choiceDate.splice(1, 1);
			// // _that.choiceDate = dat.splice(1,1);
			_that.isShow_H5 = false;
			// console.log(_that.choiceDate)
		},
		getMonthTitleRectList() {
			return new Promise(resolve => {
				//获取每个月的文字头的top
				let view = uni.createSelectorQuery().selectAll('.month-title');
				view.boundingClientRect(data => {
					resolve(data);
				}).exec();
			});
		},
		async getRectList() {
			if (!this.layerTop || this.layerTop < 0) this.layerTop = await this.getLayerTop();
			var isInitRectData = true;
			if (this.monthTitleRectList && this.monthTitleRectList.length > 0) {
				if (this.monthTitleRectList[0].top == 0) {
					this.monthTitleRectList = await this.getMonthTitleRectList();
					isInitRectData = false;
				}
			} else {
				isInitRectData = false;
			}
			if (isInitRectData == false) this.monthTitleRectList = await this.getMonthTitleRectList();
		},
		showCalendar(pas) {
			this.islas = true;
			this.data_tap = pas;
			//存储未更新前的数据
			this.bak_date = JSON.parse(JSON.stringify(this.date));
			this.bak_weeks = JSON.parse(JSON.stringify(this.weeks));
			this.bak_choiceDate = JSON.parse(JSON.stringify(this.choiceDate));
			this.bak_choiceDateArr = JSON.parse(JSON.stringify(this.choiceDateArr));
			this.bak_dayCount = this.dayCount;
			this.isShow_H5 = true;
		},
		setData(obj) {
			let that = this;
			let keys = [];
			let val, data;
			Object.keys(obj).forEach(function(key) {
				keys = key.split('.');
				val = obj[key];
				data = that.$data;
				keys.forEach(function(key2, index) {
					if (index + 1 == keys.length) {
						that.$set(data, key2, val);
					} else {
						if (!data[key2]) {
							that.$set(data, key2, {});
						}
					}
					data = data[key2];
				});
			});
		},
		dateData() {
			let dataAll = []; //总日历数据
			let dataAll2 = []; //总日历数据
			let dataMonth = []; //月日历数据
			let date = new Date(); //当前日期
			let getDateTime = date.getTime();
			let year = date.getFullYear(); //当前年
			let week = date.getDay(); //当天星期几
			let weeks = [];
			let month = date.getMonth() + 1; //当前月份
			let day = date.getDate(); //当天
			let daysCount = Math.min(this.daysCount, 60); //一共显示多少天
			    let todays = 0;
			    for (let i =0;i< 3;i++) {
			     if(i ==0){
			      todays+= new Date(year,month,0).getDate();
			     } else {
			      if(month + i> 12){
			       todays+= new Date(year + 1,month + (i+1) - 12,0).getDate();
			      } else {
			       todays+= new Date(year,month + i,0).getDate();
			      }
			     }
			    }
			    daysCount = Math.min(this.daysCount, todays + 1); //最小60天，最大360天
			let dayscNow = 0; //计数器
			let monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; //月份列表
			let nowMonthList = []; //本年剩余年份
			this.today = '' + year + '-' + this.pad(month, 2) + '-' + this.pad(day, 2);
			this.tomorrow = '' + year + '-' + this.pad(month, 2) + '-' + this.pad(day + 1, 2);
			this.afterTomorrow = '' + year + '-' + this.pad(month, 2) + '-' + this.pad(day + 2, 2);

			///////////////配置初始日期/////////////////
			//ios上不支持-连接的日期时间，所以需要替换-为/
			let startDate = this.startDate; //判断有没有默认值
			let endDate = this.endDate;
			if (startDate.length > 8) {
				startDate = new Date(startDate.split('-').join('/'));
				//如果起始时间小于当前时间，那么，超始时间就是当前时间，这里也不考虑分秒，所以这里简单处理。
				if (startDate.getTime() < getDateTime) startDate = new Date();
			}
			if (endDate.length > 8) {
				endDate = new Date(this.endDate.split('-').join('/'));
				if (endDate.getTime() < getDateTime) endDate = new Date(startDate.getTime() + 24 * 3600 * 1000);
			}
			if (startDate.length > 8) {
				//判断开始时间是否大于结束时间，大于则互换
				if (startDate.getTime() > endDate.getTime()) [startDate, endDate] = [endDate, startDate];

				let maxDate = new Date(getDateTime + daysCount * 24 * 3600 * 1000);
				if (endDate.getTime() > maxDate.getTime()) {
					let millisecond = endDate.getTime() - maxDate.getTime();
					//如果结束时间大于
					daysCount += parseInt(millisecond / (24 * 3600 * 1000)) + 7;
					console.log('这里需要显示的天数', daysCount);
				}
			}
			///////////////配置初始日期/////////////////
			for (let i = month; i < 13; i++) {
				nowMonthList.push(i);
			}
			let yearList = [year]; //年份最大可能
			for (let i = 0; i < daysCount / 365 + 2; i++) {
				yearList.push(year + i + 1);
			}
			let leapYear = function(Year) {
				//判断是否闰年
				if ((Year % 4 == 0 && Year % 100 != 0) || Year % 400 == 0) {
					return true;
				} else {
					return false;
				}
			};
			for (let i = 0; i < yearList.length; i++) {
				//遍历年
				let mList;
				if (yearList[i] == year) {
					//判断当前年份
					mList = nowMonthList;
				} else {
					mList = monthList;
				}
				for (let j = 0; j < mList.length; j++) {
					//循环月份
					dataMonth = [];
					let t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
					let t_days_thisYear = [];
					if (yearList[i] == year) {
						for (let m = 0; m < nowMonthList.length; m++) {
							t_days_thisYear.push(t_days[mList[m] - 1]);
						}
						t_days = t_days_thisYear;
					} else {
						t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
					}
					for (let k = 0; k < t_days[j]; k++) {
						//循环每天
						dayscNow++;
						let nowData;
						if (dayscNow < daysCount) {
							//如果计数器没满
							let days = this.pad(k + 1, 2);

							var monthAndDay = mList[j] + '' + days;
							var dateString = yearList[i] + '-' + mList[j] + '-' + days;

							var subject = this.festival[monthAndDay];
							var none = false;
							let newDateFormate = new Date(yearList[i] + '/' + mList[j] + '/' + (k + 1));
							let thisDateTime = newDateFormate.getTime();
							var selected = 0;
							if (yearList[i] == year && mList[j] == month) {
								//判断当年当月
								// if (k + 1 >= day) {
								// if (k + 1 == day) {
								if (k == 0) {
									let date = new Date(yearList[i] + '/' + mList[j] + '/' + (k + 1));
									let weekss = date.getDay(); //获取每个月第一天是周几
									weeks.push(weekss);
								}
								nowData = {
									year: yearList[i],
									month: this.pad(mList[j], 2),
									act: {
										subject: subject ? subject : '',
										none,
										tip: '',
										defaultStr: 0
									},
									day: this.pad(k + 1, 2),
									date: yearList[i] + '' + this.pad(mList[j], 2) + days,
									selected,
									re: yearList[i] + '-' + this.pad(mList[j], 2) + '-' + days,
									dateTime: thisDateTime,
									week: this.getWeek(weeks, month, year, yearList[i], mList[j], k + 1)
								};
								dataMonth.push(nowData);
								// }
							} else {
								if (k == 0) {
									let date = new Date(yearList[i] + '/' + mList[j] + '/' + (k + 1));
									let weekss = date.getDay(); //获取每个月第一天是周几
									weeks.push(weekss);
								}
								//其他情况
								nowData = {
									year: yearList[i],
									month: this.pad(mList[j], 2),
									act: {
										subject: subject ? subject : '',
										none,
										tip: '',
										defaultStr: 0
									},
									day: this.pad(k + 1, 2),
									date: yearList[i] + '' + this.pad(mList[j], 2) + days,
									selected,
									re: yearList[i] + '-' + this.pad(mList[j], 2) + '-' + days,
									dateTime: thisDateTime,
									week: this.getWeek(weeks, month, year, yearList[i], mList[j], k + 1)
								};
								dataMonth.push(nowData);
							}
						} else {
							break;
						}
					}
					dataAll.push(dataMonth);
				}
			}
			for (let i = 0; i < dataAll.length; i++) {
				if (dataAll[i].length != 0) {
					dataAll2.push(dataAll[i]);
				}
			}
			// week
			//
			let start_year = '';
			let start_month = '';
			let start_day = '';
			let end_year = '';
			let end_month = '';
			let end_day = '';
			let endIndex1 ="";
			let endIndex2 = "";
			if(endDate){
				end_year = endDate.getFullYear();
				end_month = endDate.getMonth() + 1;
				end_day = endDate.getDate();
				endIndex1 = end_year == year ? end_month - month : end_month + (12 - month);
				endIndex2 = end_day - 1;
			}
			let startIndex1 = "";
			let startIndex2 = "";
			if (startDate) {
				start_year = startDate.getFullYear();
				start_month = startDate.getMonth() + 1;
				start_day = startDate.getDate();
				//当前选中的起始时间坐标
				startIndex1 = start_year == year ? start_month - month : start_month + (12 - month);
				startIndex2 = start_day - 1;

				dataAll2[startIndex1][startIndex2].selected = 1;
				dataAll2[startIndex1][startIndex2].act.tip = '';
				dataAll2[startIndex1][startIndex2].act.defaultStr = 1;
				this.choiceDate.push(dataAll2[startIndex1][startIndex2]);
			}
			if(startDate && endDate){ //判断是否出发和返回日期都存在
				let islastDay = false; //是否为一个月最后一天，且结束日期是下月第一天
				if (startIndex1 == endIndex1 && endIndex2 - startIndex2 == 1) {
					if (dataAll2[startIndex1][startIndex2 + 1]) {
						dataAll2[startIndex1][startIndex2 + 1].selected = 1;
						dataAll2[startIndex1][startIndex2 + 1].act.tip = '';
						dataAll2[startIndex1][startIndex2 + 1].act.defaultStr = 1;
						this.choiceDate.push(dataAll2[startIndex1][startIndex2 + 1]);
					} else {
						islastDay = true;
					}
				} else {
					islastDay = true;
				}
				if (islastDay) {
					dataAll2[endIndex1][endIndex2].selected = 1;
					dataAll2[endIndex1][endIndex2].act.tip = '';
					dataAll2[endIndex1][endIndex2].act.defaultStr = 1;
					this.choiceDate.push(dataAll2[endIndex1][endIndex2]);
				}
				//选择日期
				this.$nextTick(() => {
					this.selectday(startIndex1, startIndex2);
					this.selectday(endIndex1, endIndex2);
				});
			}
			this.date = dataAll2;
			this.weeks = weeks;
			if (startDate) {
				this.choiceDate = this.choiceDate;
				this.choiceDateArr = this.choiceDate;
			} else {
				this.choiceDate = [];
				this.choiceDateArr = [];
			}
		},
		getWeek(weeks, firstMonth, thisYear, curYear, curMonth, day) {
			let monthIndex = 0;
			if (curYear > thisYear) {
				monthIndex = (curYear - thisYear) * 12 + curMonth - firstMonth;
			} else {
				monthIndex = curMonth - firstMonth;
			}

			let firstDayWeek = weeks[monthIndex];
			let key = curYear + '-' + curMonth;
			if (!this.tmpWeekArr[key]) {
				let tmpArr = [];
				for (let i = firstDayWeek; i < this.weekNameArr.length; i++) {
					tmpArr.push(this.weekNameArr[i]);
				}
				tmpArr = [...tmpArr, ...this.weekNameArr];
				//缓存一下，就不必每次再取了
				this.tmpWeekArr[key] = tmpArr;
			}
			let index = day % 7 || 7;
			// if (curMonth == firstMonth) {
			// 	index += firstDayWeek + 1;
			// } else {
			index--;
			// }
			return this.tmpWeekArr[key][index];
		},
		dayClick(e) {
			let indexs = e.currentTarget.dataset.indexs;
			let index = e.currentTarget.dataset.index;
			this.selectday(index, indexs, true);
		},
		selectday(index, indexs, isUserClick) {
			//单个日期
			// if (this.singleDate && JSON.stringify(this.dateFlag) != '{}') this.dateFlag = {};
			if (indexs == -1) {
				return;
			}
			let curDate = this.date[index][indexs];
			if (curDate.re < this.stoptime[0] || curDate.re > this.stoptime[1]) {
				//如果是用户点击今天之前的日期的话，就返回
				if (isUserClick) return;
			}
			curDate.selected = 1;
			curDate.act.tip = '';
			if (this.islas) {
				this.dateFlag = {};
				this.choiceDate = [];
			}
			if (this.dateFlag && this.dateFlag.date && !isUserClick || this.dateFlag && this.dateFlag.date && isUserClick && (this.iskj == 'right' && this.ops != 'Hotel'|| this.ops == 'Hotel')) {
				if (this.dateFlag.index == index && this.dateFlag.indexs == indexs) {
					//一天
					this.islas = false;
					this.choiceDate.push(this.choiceDate[0]);
					this.dayCount2 = '共1天';
					if(this.ops == 'Planeticket' && isUserClick){
						uni.$emit('initavetime',{ //出差飞机返回时间
							name:"end_Flightbus_adds",
							date: {date:this.date[index][indexs]}
						})
						uni.navigateBack({
						})
					} else if(this.ops == 'Train' && isUserClick){
						uni.$emit('initavetime',{//出差火车返回时间
							name:"Traveltraine_adds",
							date: {date:this.date[index][indexs]}
						})
						uni.navigateBack({
						})
					} else if(this.ops == 'Hotel' && isUserClick){

						console.log("不能选择同一天")
					}
				} else {
					if(this.ops == 'Hotel' && curDate.dateTime < this.choiceDate[0].dateTime) {
						this.choiceDate[0] = curDate;
						this.date.forEach(function(dataItems) {
							dataItems.forEach(function(dataItem) {
								dataItem.act.defaultStr = 0;
								if (dataItem.dateTime != curDate.dateTime) {
									dataItem.selected = 0;
									dataItem.act.tip = '';
								} else {
									dataItem.act.tip = '';
								}
							});
						});
						this.dateFlag = {
							date: curDate,
							index: index,
							indexs: indexs
						};

					} else {
						curDate.act.tip = '';
						//
						var that = this;
						var dateFlagDateTime = that.dateFlag.date.dateTime;
						var choiceDateTime = that.date[index][indexs].dateTime;
						that.choiceDateArr = [];
						that.choiceDateArr.push(that.dateFlag.date);
						var nonFlag = false;
						var nonArr = [];
						var count = 0;
						this.date.forEach(function(dataItems) {
							dataItems.forEach(function(dataItem) {
								if (dataItem.dateTime > dateFlagDateTime && dataItem.dateTime < choiceDateTime) {
									if (dataItem.act.none) {
										nonFlag = true;
										nonArr.push(dataItem.day);
									}
									that.choiceDateArr.push(dataItem);
									dataItem.selected = 1;
									count++;
								}
							});
						});
						that.choiceDateArr.push(that.date[index][indexs]);
						//设置开始和结果两个日期
						this.choiceDate[0] = that.choiceDateArr[0];
						this.choiceDate[1] = that.choiceDateArr[that.choiceDateArr.length - 1];
						if (nonFlag) {
							var that = this;
							this.date.forEach(function(dataItems) {
								dataItems.forEach(function(dataItem) {
									if (dataItem.dateTime != choiceDateTime) {
										dataItem.act.tip = '';
										dataItem.selected = 0;
									} else {
										dataItem.act.tip = '';
									}
								});
							});
							this.dateFlag = {
								date: that.date[index][indexs],
								index: index,
								indexs: indexs
							};
							this.choiceDate[0] = that.date[index][indexs];
							this.dayCount = 1;
							var nonstr = '';
							nonArr.forEach(function(nonitem, index) {
								if (index != nonArr.length - 1) {
									nonstr = nonstr + nonitem + '号,';
								} else {
									nonstr = nonstr + nonitem + '号';
								}
							});
							uni.showModal({
								title: '提示',
								content: `${nonstr}无房`
							});
						} else {
							this.islas = true;
							this.$emit('change', {
								choiceDate: this.choiceDate,
								dayCount: 1
							});
							this.dayCount = count + 2;
							this.dayCount2 = '共' + (count + 2) + '天';
							if(this.ops == 'Planeticket' && isUserClick){
								uni.$emit('initavetime',{//出差飞机返回时间
									name:"end_Flightbus_adds",
									date: {date:that.date[index][indexs]},
								})
								uni.navigateBack({
								})
							} else if(this.ops == 'Train' && isUserClick){
								uni.$emit('initavetime',{//出差火车返回时间
									name:"Traveltraine_adds",
									date: {date:that.date[index][indexs]},
								})
								uni.navigateBack({
								})
							} else if(this.ops == 'Hotel' && isUserClick){
								uni.$emit('initavetime',{//出差酒店时间
									name:"end_Hotelkettime_adds",
									das:that.dateFlag,
									date: {date:that.date[index][indexs]},
								})
								uni.navigateBack({
								})
							}
						}
					}
				}
			} else {
				var that = this;
				this.date.forEach(function(dataItems) {
					dataItems.forEach(function(dataItem) {
						dataItem.act.defaultStr = 0;
						if (dataItem.dateTime != that.date[index][indexs].dateTime) {
							dataItem.selected = 0;
							dataItem.act.tip = '';
						} else {
							dataItem.act.tip = '';
						}
					});
				});
				this.dateFlag = {
					date: curDate,
					index: index,
					indexs: indexs
				};
				this.islas = false;
				this.choiceDate[0] = curDate;
				if(isUserClick){
					if(this.ops == 'Planeticket'){
						if(this.iskj == 'left'){
							uni.$emit('initavetime',{//出差飞机出发时间
								name:"sta_Flightbus_adds",
								date: this.dateFlag,
							})
						} else {
							if(this.sta_Flightbus.date){
								uni.$emit('initavetime',{////出差飞机返回时间
									name:"end_Flightbus_adds",
									date: this.dateFlag,
								})
							} else {//出差飞机出发时间
								uni.$emit('initavetime',{//出差飞机出发时间
									name:"sta_Flightbus_adds",
									date: this.dateFlag,
								})
							}
						}
						uni.navigateBack({
						})
					} else if(this.ops == 'Train'){
						if(this.iskj == 'left'){
							uni.$emit('initavetime',{//出差火车出发时间
								name:"Traveltrains_adds",
								date: this.dateFlag,
							})
						} else {
							if(this.sta_Traveltrain.date){
								uni.$emit('initavetime',{//出差火车返回时间
									name:"Traveltraine_adds",
									date: this.dateFlag,
								})
							} else {
								uni.$emit('initavetime',{//出差火车出发时间
									name:"Traveltrains_adds",
									date: this.dateFlag,
								})
							}
						}
						uni.navigateBack({
						})
					}
				}
			}
		},
		submitbtn() {
			this.choiceDate = [];
			this.choiceDate[0] = this.choiceDateArr[0];
			this.choiceDate[1] = this.choiceDateArr[this.choiceDateArr.length - 1];
			this.dayCount2 = '共' + this.dayCount + '天';
			/**派发事件
			 * 参数：
			 * 1.choiceDate 时间区间（开始时间和结束时间）
			 * 2.dayCount 共多少晚
			 */
			this.$emit('change', {
				choiceDate: this.singleDate ? this.choiceDate[0] : this.choiceDate, //如果是单个日期方式，则只导出数组第一个
				dayCount: this.dayCount
			});
		}
	}
};
</script>

<style lang="scss" scoped>
$themeColor: $uni-color-primary;

view {
	display: flex;
}
uni-view {
	display: flex;
}

.layer-header {
	/*  #ifdef  APP-PLUS || MP-WEIXIN */ 
	margin-top: 60upx;
	/*  #endif  */
	height: 70upx;
	align-items: center;
	position: relative;

	.layer-close {
		width: 34upx;
		height: 34upx;
		position: absolute;

		left: 25upx;
		top: 50%;
		transform: translateY(-50%);

		//
		&::before {
			content: '';
			width: 34upx;
			height: 1upx;
			background-color: $themeColor;
			position: absolute;
			top: 16upx;
			left: 0;
			transform: rotate(45deg);
		}

		&::after {
			content: '';
			width: 1upx;
			height: 34upx;
			background-color: $themeColor;
			position: absolute;
			top: 0;
			left: 16upx;
			transform: rotate(45deg);
		}
	}

	.layer-title {
		text-align: center;
		flex: 1;
		font-size: 36upx;
	}
}

.calendar-layer {
	position: fixed;
	bottom: 0;
	left: 0;
	height: 100%;
	width: 100%;
	overflow: hidden;
	z-index: 9999;
	background: #ffffff;
}

.layer-content {
	position: fixed;
	overflow: scroll;
	height: 100%;
	bottom: 0;
	font-size: 26upx;
	flex-direction: column;
	background-color: #fff;
}

.layer-body {
	flex-direction: column;
	height: calc(100% - 70upx);
}

.layer-list {
	width: 100%;
	display: flex;
	flex: 1;
	flex-direction: column;
	position: relative;
	overflow: scroll;
}

.layer-content.choiceDate {
	.layer-footer {
		display: block;
	}

	.layer-body {
		height: calc(100% - 70upx - 120upx);
	}
}

.month {
	width: 750upx;
	flex-direction: column;
	margin-bottom: 50upx;

	.month-title {
		font-size: 30upx;
		text-align: center;
		width: 100%;
		height: 60upx;
		line-height: 60upx;
		justify-content: center;
		border-bottom: 1upx solid #ddd;
		background: #fff;
	}

	&.fixed {
		.month-title {
			position: fixed;
			top: calc(15% + 70upx + 60upx);
			z-index: 11;
		}

		&:first-child {
			padding-top: 60upx;
		}
	}

	&:last-child {
		margin-bottom: 0;
	}

	.month-content {
		flex-wrap: wrap;
	}
}

.day {
	width: calc(100% / 7);
	text-align: center;
	height: 90upx;
	align-items: center;
	justify-content: center;
	position: relative;

	.day-content {
		flex-direction: column;
		line-height: 1;
	}

	.day-txt {
		width: 100%;
		height: 1.2em;
	}

	.day-tip {
		font-size: 20upx;
		height: 1.2em;
	}

	.day-subject {
		font-size: 14upx;
		height: 1.2em;
	}

	&.disabled {
		color: #ccc !important;
	}

	&.active {
		background: rgba($themeColor, 0.1);
	}

	.beginTip {
		display: none;
		width: 115upx;
		margin-top: -70upx;
		width: 130upx;
		margin-top: -74upx;
		position: absolute;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 5upx;
		text-align: center;
		padding: 6upx 10upx;
		font-size: 16upx;
		z-index: 33;

		&::after {
			content: '';
			position: absolute;
			/*  #ifndef  H5  */
			left: 35%;
			top: 28upx;
			border: 5upx solid transparent;
			border-top: 6upx solid rgba($color: #000000, $alpha: 0.6);
			/*  #endif  */

			/*  #ifdef  H5  */
			left: 35%;
			top: 37upx;
			border: 8upx solid transparent;
			border-top: 10upx solid rgba($color: #000000, $alpha: 0.6);
			/*  #endif  */
		}
	}

	.endTip {
		display: none;
		background: rgba($color: #000000, $alpha: 0.6);
		position: absolute;
		border-radius: 5upx;
		text-align: center;
		padding: 6upx 10upx;
		margin-top: -70upx;
		margin-top: -74upx;
		font-size: 16upx;
		left: 12%;
		z-index: 33;

		&::after {
			content: '';
			position: absolute;

			left: 35%;
			top: 28upx;
			border: 5upx solid transparent;
			border-top: 6upx solid rgba($color: #000000, $alpha: 0.6);
		}
	}

	&.begin,
	&.end {
		background: $themeColor;
		color: #fff;
	}

	&.begin {
		border-radius: 8upx 0 0 8upx;

		.beginTip {
			display: block;
		}
	}

	&.end {
		border-radius: 0 8upx 8upx 0;

		.endTip {
			display: block;
		}
	}
}

/* ///////////////////////////////////////// */
.week-box {
	height: 60upx;
	line-height: 60upx;
	border-bottom: 1upx solid #ddd;
	background: #fff;
	position: relative;
	z-index: 11;
}

.week-box-item {
	width: calc(100% / 7);
	text-align: center;

	&:first-child,
	&:last-child {
		color: $themeColor;
	}
}
</style>
