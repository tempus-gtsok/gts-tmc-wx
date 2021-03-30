<template>
	<view class="cu-bar">
		
	    <view class="padding-lr" :class="animation?'animation-slide-right' :''" @tap="startClick('left')">
			<view class="cu_li_left" v-if="current == 'Planeticket' || current == 'Train'">
				出发
			</view>
			<view class="cu_li_left" v-if="current == 'Hotel'">
				城市
			</view>
			<view v-if="current == 'Planeticket'">
				<view v-if="Busirticket[0].name != ''">
					{{Busirticket[0].name}} 
				</view>
				<view style="color: #C0C0C0;" v-else>
					出发城市
				</view>
			</view>
			<view class="" v-if="current == 'Train'">
				<view v-if="Busitraiket[0].name != ''">
						{{Busitraiket[0].name}} 
				</view>
				<view style="color: #C0C0C0;" v-else>
					出发城市
				</view>
			</view>
			<view class="" v-if="current == 'Hotel'">
				<view v-if="sta_Hotelket.name">
						{{sta_Hotelket.name}} 
				</view>
				<view style="color: #C0C0C0;" v-else>
					入住城市
				</view>
			</view>
	    </view>
		<view class="bt_li" @tap="toggle()" v-if="current != 'Hotel'">
			<view class="iconfont" style="color: #007aff;font-size: 65upx;">&#xe60e;</view>
		</view>
	    <view class="padding-lr padding-lr_r" :class="animation?'animation-slide-left' :''" @click="startClick('right')">
			<view class="cu_li_right" v-if="current == 'Hotel'">
				位置
			</view>
			<view class="cu_li_right" v-if="current != 'Hotel'">
				到达
			</view>
			<view v-if="current == 'Planeticket'">
				<view class="" v-if="Busirticket[1].name != ''">
					{{Busirticket[1].name}}
				</view>
				<view style="color: #C0C0C0;" v-else>
					到达城市
				</view>
			</view>
			<view v-if="current == 'Train'">
				<view class="" v-if="Busitraiket[1].name != ''">
					{{Busitraiket[1].name}}
				</view>
				<view style="color: #C0C0C0;" v-else>
					到达城市
				</view>
			</view>
			<view v-if="current == 'Hotel'">
				<view class="" v-if="end_Hotelket">
					{{end_Hotelket}}
				</view>
				<view style="color: #C0C0C0;" v-else>
					入住位置
				</view>
			</view>
	    </view>
	</view>
</template>

<script>
	export default {
		props: {
			current: {
				type: String,
				default: ''
			},
			sBusirticket:{
				type: Array,
				default: [] //出差飞机城市
			},
			sBusitraiket:{
				type: Array,
				default: [] //出差飞机城市
			},
			tsta_Hotelket:{
				type: Object,
				default: {} //出差酒店城市
			},
			send_Hotelket:{
				type:String,
				dafault:''
			}
		},
		data() {
			return {
				
				
				animation: false,
				Busirticket: [{name: '',id: ''},{name:'',id: ''}],
				Busitraiket: [{name: '',id: ''},{name:'',id: ''}],
				sta_Hotelket: {},//出差酒店城市
				end_Hotelket: '',//出差酒店地址
			}
		},
		mounted() {
		},
		watch:{
			sBusirticket(data){
				this.Busirticket = data;
			},
			sBusitraiket(data){
				this.Busitraiket = data;
			},
			tsta_Hotelket(data){
				this.sta_Hotelket = data;
			},
			send_Hotelket(data){
				this.end_Hotelket = data;
			}
		},
		onLoad() {
		},
		methods: {
			toggle() {//城市左右交换
				if(this.current == 'Planeticket'){
					this.animation= true;
					setTimeout(()=>{
					    this.animation = false;
					}, 1000)
					let temp = null; //交换飞机票城市
					temp = this.Busirticket[0];
					this.$emit('Busirticket_adds',[this.Busirticket[1],temp]);
				} else if (this.current == 'Train'){
					this.animation= true;
					setTimeout(()=>{
					    this.animation = false;
					}, 1000)
					let temp = null; //交换火车票城市
					temp = this.Busitraiket[0];
					this.$emit('Busitraiket_adds',[this.Busitraiket[1],temp]);
				}
			},
			startClick(ts) { //开始城市
				let _this = this
				let cus = this.current;
				let list = []
				if(cus == "Hotel"){
					if(ts == 'left'){
						list = this.sta_Hotelket.name
						uni.navigateTo({
							url: '../../myapplication/cationchirder/sselect-city/selectcity?sta=left&type=' + cus + '&list=' + list,
						});
					} else {
						if(JSON.stringify(this.sta_Hotelket) == '{}'){
							this.showToasts("请选择城市")
						} else {
							list = this.end_Hotelket
							uni.navigateTo({
								url: '../../myapplication/cationchirder/sselect-city/selectcity?sta=right&type=' + cus + '&list=' + list + '&citys=' + this.sta_Hotelket.name,
							});
						}
					}
				} else {
					if(cus == "Planeticket" && this.Busirticket[0].name.length > 1){
						list = JSON.stringify([{id:this.Busirticket[0].id,name:this.Busirticket[0].name},{id:this.Busirticket[1].id,name:this.Busirticket[1].name}])
					}
					if(cus == "Train" && this.Busitraiket[0].name.length > 1){
						list = JSON.stringify([{name:this.Busitraiket[0].name},{name:this.Busitraiket[1].name}])
					}
					uni.navigateTo({
						url: '../../myapplication/cationchirder/sselect-city/selectcity?sta=left&type=' + cus + '&list=' + list,
					});
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.cu-bar {
		display: flex;
		width: calc(100% - 40upx);
		padding: 0 20upx;
		position: relative;
		align-items: center;
		height: 105upx;
		justify-content: space-between;
		position: relative;
		.bt_li{
			width: 90upx;
			height: 90upx;
			display: flex;
			align-items: center;
			justify-content: center;
			position: absolute;
			left: 50%;
			margin-left: -45upx;
		}
		.padding-lr{
			width: 50%;
			color: black;
			line-height: 40upx;
			font-size: 40upx;
			.cu_li_left{
				font-size: 25upx;
				color: #C8C7CC;
				margin-bottom: 10upx;
			}
			.cu_li_right{
				text-indent: 25upx;
				margin-bottom: 10upx;
				font-size: 25upx;
				color: #C8C7CC;
			}
		}
		.padding-lr_r{
			text-align: right;
		}
		
		.animation-slide-left {
		    animation-name: slide-left;
			animation-duration: 0.5s;
		}
		.animation-slide-right {
		    animation-name: slide-right;
			animation-duration: 0.5s;
		}
		@keyframes slide-left {
		    0% {
		        opacity: 0;
		        transform: translateX(-500upx)
		    }
		
		    100% {
		        opacity: 1;
		        transform: translateX(0)
		    }
		}
		@keyframes slide-right {
		    0% {
		        opacity: 0;
		        transform: translateX(500upx)
		    }
		
		    100% {
		        opacity: 1;
		        transform: translateX(0)
		    }
		}
	}
</style>
