<template>
	<view>
		<picker class="time-picker" mode="multiSelector" @change="bindStartMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
			<slot name="pCon"></slot>
		</picker>
	</view>
</template>

<script>
export default {
	props: {
		sTime: {
			//开始小时
			type: [Number, String],
			default: '0'
		},
		cTime: {
			//结束小时
			type: [Number, String],
			default: '23'
		},
		timeNum: {
			//延迟小时
			type: [Number, String],
			default: '1'
		},
		interval: {
			//分钟间隔
			type: [Number, String],
			default: '1'
		},
		sDay: {
			//开始天数
			type: [Number, String],
			default: '0'
		},
		dayNum: {
			//预约天数
			type: [Number, String],
			default: '7'
		}
	},
	data() {
		return {
			sDayNum: 0,
			multiArray: [['今天', '明天', '3-2', '3-3', '3-4', '3-5'], [0, 1, 2, 3, 4, 5, 6], [0, 10, 20]],
			multiIndex: [0, 0, 0],
			multiSelector: ''
		};
	},
	beforeMount() {
		this.pickerTap();
	},
	methods: {
		timeFormat: function(num) {
			if (num < 10 && (num + '').length == 1) {
				return '0' + num;
			}
			return num;
		},
		pickerTap: function() {
			let date = new Date();
			let monthDay = [];
			let hours = [];
			let minute = [];
			this.sDayNum = this.sDay;

			// 时
			let date1 = new Date(date);
			let sT = +this.sTime;
			let eT = +this.cTime;

			if (sT <= eT) {
				let h = date1.getHours() < sT ? sT : date1.getHours();
				h = h + parseInt(this.timeNum);
				if (h > eT || this.sDayNum > 0) {
					this.sDayNum = this.sDayNum <= 0 ? parseInt(this.sDay) + 1 : parseInt(this.sDay);
					for (let i = sT; i <= eT; i++) {
						hours.push(this.timeFormat(i) + '时');
					}
				} else {
					for (let i = h; i <= eT; i++) {
						hours.push(this.timeFormat(i) + '时');
					}
				}
			} else {
				let h = date1.getHours() < sT ? sT : date1.getHours();
				h = h + parseInt(this.timeNum);
				if ((h > eT && h < sT) || h > 23 || this.sDayNum > 0) {
					this.sDayNum = this.sDayNum <= 0 ? parseInt(this.sDay) + 1 : parseInt(this.sDay);
					for (let i = 0; i <= 23; i++) {
						if (i < sT && i > eT) {
						} else {
							hours.push(this.timeFormat(i) + '时');
						}
					}
				} else {
					for (let i = h; i <= 23; i++) {
						if (i < sT && i > eT) {
						} else {
							hours.push(this.timeFormat(i) + '时');
						}
					}
				}
			}

			// 月-日
			for (let i = +this.sDayNum; i <= parseInt(this.sDayNum) + parseInt(this.dayNum); i++) {
				let date1 = new Date(date);
				date1.setDate(date.getDate() + i);
				let md = date1.getFullYear() + '-' + this.timeFormat(date1.getMonth() + 1) + '-' + this.timeFormat(date1.getDate());
				monthDay.push(md);
			}

			let inter = +this.interval < 60 ? +this.interval : 59;
			// 分
			for (let i = 0; i < 60; i += inter) {
				minute.push(i < 10 ? '0' + i + '分' : i + '分');
			}

			let data = {
				multiArray: this.multiArray,
				multiIndex: this.multiIndex
			};

			data.multiArray[0] = monthDay;
			data.multiArray[1] = hours;
			data.multiArray[2] = minute;
			this.multiArray = data.multiArray;
			this.multiIndex = data.multiIndex;
		},
		bindMultiPickerColumnChange(e) {
			this.multiIndex.splice(e.detail.column,1,e.detail.value)
			let hours = [];
			if (e.detail.column == 0 && e.detail.value == 0 && +this.sDayNum == 0) {
				let date = new Date();
				// 时
				let date1 = new Date(date);
				let sT = +this.sTime;
				let eT = +this.cTime;

				if (sT <= eT) {
					let h = date1.getHours() < sT ? sT : date1.getHours();
					h = h + parseInt(this.timeNum);
					if (h > eT || this.sDayNum > 0) {
						this.sDayNum = this.sDayNum <= 0 ? parseInt(this.sDay) + 1 : parseInt(this.sDay);
						for (let i = sT; i <= eT; i++) {
							hours.push(this.timeFormat(i) + '时');
						}
					} else {
						for (let i = h; i <= eT; i++) {
							hours.push(this.timeFormat(i) + '时');
						}
					}
				} else {
					let h = date1.getHours() < sT ? sT : date1.getHours();
					h = h + parseInt(this.timeNum);
					if ((h > eT && h < sT) || h > 23 || this.sDayNum > 0) {
						this.sDayNum = this.sDayNum <= 0 ? parseInt(this.sDay) + 1 : parseInt(this.sDay);
						for (let i = 0; i <= 23; i++) {
							if (i < sT && i > eT) {
							} else {
								hours.push(this.timeFormat(i) + '时');
							}
						}
					} else {
						for (let i = h; i <= 23; i++) {
							if (i < sT && i > eT) {
							} else {
								hours.push(this.timeFormat(i) + '时');
							}
						}
					}
				}
				this.multiArray.splice(1,1,hours)
				
			} else if (e.detail.column == 0 && e.detail.value != 0) {
				let sT = +this.sTime;
				let eT = +this.cTime;

				if (sT <= eT) {
					for (let i = sT; i <= eT; i++) {
						hours.push(this.timeFormat(i) + '时');
					}
				} else {
					for (let i = 0; i <= 23; i++) {
						if (i < sT && i > eT) {
						} else {
							hours.push(this.timeFormat(i) + '时');
						}
					}
				}
				this.multiArray.splice(1,1,hours)
			}
		},
		bindStartMultiPickerChange(e) {
			this.multiIndex = e.detail.value;
			let da = this.multiArray;
			let di = e.detail.value;

			let caseDate = da[0][di[0]] + ' ' + da[1][di[1]].replace('时', ':') + this.timeFormat(da[2][di[2]].replace('分', '')) + ':00';

			let appointTime = new Date(caseDate.replace(/-/g,'/')).getTime() / 1000;
			if (appointTime < new Date().getTime() / 1000) {
				uni.showToast({
					title: '不能选择过去时间',
					icon: 'none'
				});
				return false;
			}
			this.$emit('changeTime', caseDate, appointTime * 1000);
		}
	}
};
</script>

<style lang="scss"></style>
