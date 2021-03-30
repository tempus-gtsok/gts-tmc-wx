<template>
	<view class="">
		<loading>
		</loading>
		<view class="ticketckls">
			<headnavigation titles="选择航班"></headnavigation>
			<view class="l_list">
				<view class="i_nas" style="border-bottom: 1upx solid #F1F1F1;">
					<span class="iconfont" >&#xe658;</span>
					<input type="text" v-model="finos" value="" placeholder="请输入航班号,如:CZ3503" />
					<span class="iconfont" @click="finos= ''">&#xe641;</span>
				</view>
				<view class="i_nas" @click="showPop">
					<span class="iconfont">&#xe649;</span>
					<view class="">
						{{fistatime}}
					</view>
					<view class="places" v-if="fistatime == ''">
						请选择航班日期
					</view>
				</view>
			</view>
			<view class="fibtns" @click="finbtn">
				确定
			</view>
		</view>
		<view class="fitsicon" v-if="fitsicon">
			<view class="fitslists">
				<view class="fittops">
					航班号：{{finos}}
				</view>
				<view class="fitcitys">
					<view class="fit_t">
						<view class="fcityname">
							{{flightlist.flightDep}}
						</view>
						<view>
							{{flitime(flightlist.flightDeptimePlanDate)}}
						</view>
					</view>
					<view class="fit_o">
						<span class="iconfont" style="font-size: 60upx;">&#xe639;</span>
					</view>
					<view class="fit_t">
						<view class="fcityname">
							{{flightlist.flightArr}}
						</view>
						<view>
							{{flitime(flightlist.flightArrtimePlanDate)}}
						</view>
					</view>
				</view>
				<view class="fintbs">
					<view class="fintbsno" @click="fitsicon = false">
						不是我的航班
					</view>
					<view class="fintbsyes" @click="okfitis">
						确认航班
					</view>
				</view>
			</view>
		</view>
		<min-popup size="height" :show="show" @close='closet'>
		  <min-picker  @cancel="cancel" @sure="sure"></min-picker>
		</min-popup>
	</view>
</template>

<script>
	import torok from '@/api/torowk.js'
	import minPopup from '@/components/min-picker/min-popup.vue'
	import minPicker from '@/components/min-picker/min-picker.vue'
	export default{
		data(){
			return{
				flightlist:{},//当前航班信息
				fitsicon:false,//航班确认信息
				finos:'',//航班号
				fistatime:'',//航班出行日期
				show:false,
			}
		},
		components:{
			minPopup,
			minPicker
		},
		onLoad() {
			
		},
		mounted() {
			
		},
		methods:{
			flitime(ti){//航班时间转
				var tn = ti;
				var mon = tn.substr(5,2);
				var day = tn.substr(8,2);
				var times = tn.substr(11,2) + ':' + tn.substr(14,2);
				return mon + '月' + day +'日' + ' ' + times
			},
			async finbtn(){//确定航班
				let dta = this.fistatime;
				let no = this.finos;
				if(dta == '' || no == ''){
					uni.showToast({
						icon:'none',
						title:'航班号和日期不能为空！',
						duration:1000
					})
					return
				}
				let FyTrnsferParam = {
					fnum: no,
					date: dta
				}
				
				try{
					let res = await torok.queryFlightByFnum(FyTrnsferParam);
					
					if(res.code == 200){
						if(res.data.results == null){
							uni.showToast({
								icon:'none',
								title:res.data.error,
								duration:1000
							})
						} else {
							this.flightlist = res.data.results[0];
							this.fitsicon = true;
						}
					} else {
						uni.showToast({
							icon:'none',
							title:res.message,
							duration:1000
						})
					}
					
				}catch(e){
					
					console.log(e)
					//TODO handle the exception
				}
			},
			okfitis(){//确定航班
				let datuy = {
					flightNo: this.flightlist.flightNo,//航班号
					flightDeptimePlanDate:this.flightlist.flightDeptimePlanDate,//航班起飞时间
					flightArrcode:this.flightlist.flightArrcode,//三字码
					flightArrAirport:this.flightlist.flightArrAirport + '机场',
					flightArr:this.flightlist.flightArr,//城市
					fistatime:this.fistatime,//起飞时间
					flightlist:this.flightlist,
				}
				this.fitsicon = false;
				uni.$emit("tocknos",{data: datuy});
				uni.navigateBack({
				})
				// this.seatck(this.ticketinlist.adress,true)
			},
			// picker显示
			showPop(){
			    this.show = true
			},
			// 关闭picker
			closet(){
			    this.show = false
			},
			// 取消事件
			cancel(){
			    this.closet()
			},
			// 确认事件
			sure(e){
				var month = e.month > 9 ? e.month : '0' + e.month;;
				var day = e.day > 9 ? e.day : '0' + e.day;
				this.fistatime = e.year + '-' + month + '-' + day;
				console.log(this.fistatime)
			    // 输出 { year: 2020,month: 3,day: 23}
			},
		}
	}
</script>

<style scoped lang="scss">
	.ticketckls{
		width: 100%;
		/*  #ifdef MP-WEIXIN */
		padding-top: 80upx;
		/*  #endif  */
		background-color: #FFFFFF;
		.l_list{
			width: calc(100% - 40upx);
			padding: 60upx 20upx 0 20upx;
			.i_nas{
				font-size: 35upx;
				display: flex;
				height: 90upx;
				line-height: 90upx;
				align-items: center;
				span{
					margin: 0 40upx 0 20upx;
					color: #BEBEBE;
				}
				input{
					width: calc(100% - 210upx);
					height: 60upx;
				}
				.places{
					font-size: 30upx;
					color: #807D78;
				}
			}
		}
		.fibtns{
			width: calc(100% - 80upx);
			margin:  40upx 40upx;
			height: 90upx;
			line-height: 90upx;
			text-align: center;
			color: #FFFFFF;
			font-size: 35upx;
			background-color: $uni-color-primary;
			border-radius: 10upx;
		}
	}
	.fitsicon{
		position: fixed;
		width: 100%;
		height: 100vh;
		left: 0;
		top: 0;
		z-index: 200;
		background-color: rgba(0,0,0,.5);
		.fitslists{
			position: absolute;
			width: calc(100% - 140upx);
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background-color: #FFFFFF;
			border-radius: 10upx;
			.fittops{
				position: relative;
				width: 100%;
				height: 100upx;
				line-height: 100upx;
				text-indent: 50upx;
				font-size: 34upx;
				border-bottom: 1upx solid #F1F1F1;
			}
			.fitcitys{
				display: flex;
				height: 250upx;
				align-items: center;
				.fit_t{
					flex: 3;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 26upx;
					color: #ABA6A1;
					.fcityname{
						font-size: 45upx;
						font-weight: 600;
						color: #000000;
					}
				}
				.fit_o{
					flex: 1;
					color: #C0C0C0;
					text-align: center;
				}
			}
			.fintbs{
				display: flex;
				font-size: 34upx;
				width: 100%;
				height: 100upx;
				line-height: 100upx;
				text-align: center;
				border-top: 1upx solid #F1F1F1;
				.fintbsno{
					flex: 1;
					border-right:  1upx solid #F1F1F1;
					color: #C0C0C0;
				}
				.fintbsyes{
					flex: 1;
					color: #FF0C03;
				}
			}
		}
	}
</style>
