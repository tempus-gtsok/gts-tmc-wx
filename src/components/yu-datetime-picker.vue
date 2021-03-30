<template>
	<view class="yu-datetime-picker">
		<view class="yu-datetime-mask" :class="{'show':showPicker}" @tap="maskClick" @touchmove.stop.prevent catchtouchmove="true"></view>
		<view class="yu-datetime-content" :class="{'show':showPicker}">
			<view class="yu-datetime-hd" @touchmove.stop.prevent catchtouchmove="true">
				<view class="yu-datetime-btn" @tap="pickerCancel">取消</view>
				<view class="yu_text">请选择日期</view>
				<view class="yu-datetime-btn" :style="{color: color}" @tap="pickerConfirm">确定</view>
			</view>
			<view class="yu-datetime-view">
				<picker-view v-if="isAll" :indicator-style="itemHeight" :value="values" @change="bindChange">
					<picker-view-column>
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.yearArr" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.monthArr" :key="index">{{item}}月</view>
					</picker-view-column>
					<picker-view-column>
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.dayArr" :key="index">{{item}}日</view>
					</picker-view-column>
					<!-- <picker-view-column>
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.hourArr" :key="index">{{item}}时</view>
					</picker-view-column>
					<picker-view-column>
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.minuteArr" :key="index">{{item}}分</view>
					</picker-view-column>
					<picker-view-column>
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.secondArr" :key="index">{{item}}秒</view>
					</picker-view-column> -->
				</picker-view>
				<picker-view v-else :indicator-style="itemHeight" :value="dateValues" @change="bindDateChange">
					<picker-view-column class="yu-picker-column">
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.dateArr" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.hourArr" :key="index">{{item}}时</view>
					</picker-view-column>
					<picker-view-column>
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.minuteArr" :key="index">{{item}}分</view>
					</picker-view-column>
					<picker-view-column>
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.secondArr" :key="index">{{item}}秒</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: "yuDatetimePicker",
		props: {
			isAll: { //全部日期有效可选
				type: Boolean,
				default () {
					return true
				}
			},
			current: { //默认显示当前日期时间
				type: Boolean,
				default () {
					return true
				}
			},
			color: { //颜色
				type: String,
				default () {
					return '#37b991'
				}
			},
			monthNum: { //当只显示有效日期时间时可用，显示的有效月数，默认为1，当前月加一个月
				type: Number,
				default () {
					return 1
				}
			},
			startYear: { //开始年份
				type: [String, Number],
				default () {
					return '1940'
				}
			},
			endYear: { //结束年份
				type: [String, Number],
				default () {
					return '2020'
				}
			},
			modata: {
				type: String,
				default () {
					return ""
				}
			}
		},
		data() {
			return {
				itemHeight: `height: ${uni.upx2px(88)}px;`,
				date: new Date(), //获取系统日期
				dateObj: {},
				values: [0, 0, 0, 0, 0, 0],
				selectArr: [],
				selectRes: "",
				showPicker: false,
				dateValues: [0, 0, 0, 0]
			};
		},
		mounted() {
			
			this.initDate();
			if(this.current){
				this.showCurrent();
			}
		},
		watch:{
			current(val){
				if(val == false){
					this.modst()
				}
			}
		},
		methods: {
			modst(){
				let arr = [];
				let sts = [];
				arr = this.modata.split('-');
				sts[0] = arr[0] - this.startYear;
				sts[1] = arr[1] - 1;
				sts[2] = arr[2] - 1;
				this.$nextTick(() => {
					this.values = sts
				})
			},
			initDate() { //初始化日期和时间
				let dateArr = [],
					yearArr = [],
					monthArr = [],
					dayArr = [],
					hourArr = [],
					minuteArr = [],
					secondArr = [];
				let year = this.date.getFullYear();
				let month = this.date.getMonth() + 1;
				let day = this.date.getDate();
				let totalDay = new Date(year, month, 0).getDate();
				if (!this.isAll) {
					for (let i = month; i <= month + this.monthNum; i++) {
						let localMonth = i;
						if (i >= 13) {
							if (i == 13) {
								year += 1;
							}
							localMonth -= 12;
						}
						let total = new Date(year, localMonth, 0).getDate();
						if (i == month) {
							for (let j = day; j <= totalDay; j++) {
								let str = this.formatNum(year) + '-' + this.formatNum(localMonth) + '-' + this.formatNum(j);
								dateArr.push(str);
							}
						} else {
							for (let j = 1; j <= total; j++) {
								let str = this.formatNum(year) + '-' + this.formatNum(localMonth) + '-' + this.formatNum(j);
								dateArr.push(str);
							}
						}
					}
				}else{
					for (let i = this.startYear; i <= this.endYear; i++) {
						yearArr.push(this.formatNum(i));
					}
					for (let i = 1; i <= 12; i++) {
						monthArr.push(this.formatNum(i));
					}
					for (let i = 1; i <= totalDay; i++) {
						dayArr.push(this.formatNum(i));
					}
				}
				for (let i = 0; i < 24; i++) {
					hourArr.push(this.formatNum(i));
				}
				for (let i = 0; i < 60; i++) {
					minuteArr.push(this.formatNum(i));
				}
				for (let i = 0; i < 60; i++) {
					secondArr.push(this.formatNum(i));
				}
				this.dateObj = {
					dateArr,
					yearArr,
					monthArr,
					dayArr,
					hourArr,
					minuteArr,
					secondArr
				};
				if (this.isAll) {
					this.selectArr = [this.formatNum(this.startYear), '01', '01', '00', '00', '00'];
					this.selectRes = `${this.formatNum(this.startYear)+'-01-01-00-00-00'}`;
				} else {
					this.selectArr = [this.formatNum(year), this.formatNum(month), '01', '00', '00', '00'];
					this.selectRes = `${this.formatNum(year)+'-' + this.formatNum(month) + '-01-00-00-00'}`;
				}
			},
			showCurrent() { //显示当前的日期时间
				let arr = [0, 0, 0, 0, 0, 0];
				let dateArr = [0, 0, 0, 0];
				let year = this.date.getFullYear();
				let month = this.date.getMonth() + 1;
				let day = this.date.getDate();
				let hour = this.date.getHours();
				let minute = this.date.getMinutes();
				let second = this.date.getSeconds();
				this.selectArr = [this.formatNum(year), this.formatNum(month), this.formatNum(day), this.formatNum(hour), this.formatNum(
					minute), this.formatNum(second)];
				this.selectRes =
					`${this.formatNum(year)+'-'+this.formatNum(month)+'-'+this.formatNum(day)+' '+this.formatNum(hour)+':'+this.formatNum(minute)+':'+this.formatNum(second)}`;
				if (this.isAll) {
					arr[0] = year - this.startYear;
					arr[1] = month - 1;
					arr[2] = day - 1;
					this.$nextTick(() => {
						this.values = arr;
					})
				} else {
					dateArr[1] = hour;
					dateArr[2] = minute;
					dateArr[3] = second;
					this.$nextTick(() => {
						this.dateValues = dateArr;
					})
				}
			},
			initDayArr: (year, month) => { //初始化月份天数
				let totalDay = new Date(year, month, 0).getDate();
				let dayArr = [];
				for (let i = 1; i <= totalDay; i++) {
					if (i < 10) {
						i = '0' + i;
					} else {
						i = i + '';
					}
					dayArr.push(i);
				};
				return dayArr;
			},
			formatNum(num) { //日期时间的初始化
				return num < 10 ? '0' + num : num + '';
			},
			maskClick() { //日期时间的遮罩
				this.showPicker = false;
			},
			show() { //日期时间的显示
				this.showPicker = true;
			},
			hide() { //日期时间的隐藏
				this.showPicker = false;
			},
			pickerCancel() { //日期时间取消
				this.$emit("cancel", {
					selectArr: this.selectArr
				});
				this.showPicker = false;
			},
			pickerConfirm(e) { //日期时间确定
				this.$emit("confirm", {
					selectArr: this.selectArr,
					selectRes: this.selectRes
				});
				this.showPicker = false;
			},
			bindChange(e) { //默认滚动日期时间方法
				let valueArr = e.detail.value;
				let year = "",
					month = "",
					day = "",
					hour = "",
					minute = "",
					second = "";
				let selectArr = this.selectArr;
				let dayArr = [];
				year = this.dateObj.yearArr[valueArr[0]];
				month = this.dateObj.monthArr[valueArr[1]];
				day = this.dateObj.dayArr[valueArr[2]];
				hour = this.dateObj.hourArr[valueArr[3]];
				minute = this.dateObj.minuteArr[valueArr[4]];
				second = this.dateObj.secondArr[valueArr[5]];
				if (year != selectArr[0]) {
					dayArr = this.initDayArr(year, month);
					this.dateObj.dayArr = dayArr;
				};
				if (month != selectArr[1]) {
					dayArr = this.initDayArr(year, month);
					this.dateObj.dayArr = dayArr;
				};
				this.selectArr = [year, month, day, hour, minute, second];
				this.selectRes = `${year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second}`;
				this.$nextTick(() => {
					this.dateValues = valueArr;
				})
			},
			bindDateChange(e) { //有效日期的滚动日期时间方法
				let valueArr = e.detail.value;
				let dateStr = "",
					dateArr = [],
					hour = "",
					minute = "",
					second = "";
				let selectArr = this.selectArr;
				let dayArr = [];
				dateStr = this.dateObj.dateArr[valueArr[0]];
				dateArr = dateStr.split('-');
				hour = this.dateObj.hourArr[valueArr[1]];
				minute = this.dateObj.minuteArr[valueArr[2]];
				second = this.dateObj.secondArr[valueArr[3]];
				this.selectArr = [dateArr[0], dateArr[1], dateArr[2], hour, minute, second];
				this.selectRes = `${dateArr[0]+'-'+dateArr[1]+'-'+dateArr[2]+' '+hour+':'+minute+':'+second}`;
				this.$nextTick(() => {
					this.values = valueArr;
				})
			}
		}
	}
</script>
<style>
	.yu-datetime-picker {
		position: relative;
		z-index: 888;
	}

	.yu-datetime-mask {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.4);
		visibility: hidden;
		opacity: 0;
		transition: all 0.3s ease;
	}

	.yu-datetime-mask.show {
		visibility: visible;
		opacity: 1;
	}

	.yu-datetime-content {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		transition: all 0.3s ease;
		transform: translateY(100%);
		z-index: 3000;
	}

	.yu-datetime-content.show {
		transform: translateY(0);
	}

	.yu-datetime-hd {
		display: flex;
		align-items: center;
		padding: 0 40upx;
		height: 90upx;
		background-color: #fff;
		position: relative;
		text-align: center;
		font-size: 30upx;
		justify-content: space-between;
	}
	.yu_text{
		width: 60%;
		color: #c8c7cc;
	}
	.yu-datetime-btn {
		width: 20%;
		color: $uni-color-primary;
	}

	.yu-datetime-hd:after {
		content: ' ';
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-bottom: 1px solid #e5e5e5;
		color: #e5e5e5;
		transform-origin: 0 100%;
		transform: scaleY(0.5);
	}

	.yu-datetime-view {
		width: 100%;
		height: 200px;
		overflow: hidden;
		background-color: rgba(255, 255, 255, 1);
		z-index: 666;
	}

	.yu-datetime-view picker-view {
		height: 100%;
	}

	.yu-picker-column {
		-webkit-flex: 2;
		-webkit-box-flex: 2;
		flex: 2;
	}

	.yu-datetime-item {
		text-align: center;
		width: 100%;
		height: 88upx;
		line-height: 88upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 30upx;
	}
</style>
