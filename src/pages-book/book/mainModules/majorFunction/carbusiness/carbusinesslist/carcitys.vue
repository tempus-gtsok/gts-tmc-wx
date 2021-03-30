<template>
	<view class="citylistfl">
		<view class="input-op">
			<view class="input-lis">
				<view class="iconfont" style="color: #9a9a9c;">&#xe6a2;</view>
				<input v-model="ser_int" type="text" value="" @input="searcht($event)" class="input-css" placeholder="输入城市名称" />
				<view @click="dlek" class="iconfont" style="color: #C0C0C0;">&#xe641;</view>
			</view>
		</view>
		<view class="sear_list" v-if="sev_boolt">
			<view class="se_mai" v-for="(item,index) in sec_lists" :key="index" @click="onSelect(item,0)">
				<view style="text-indent: 30upx;">{{item.name}}</view>
			</view>
		</view>
		<view class="select-city">
			<view class="index">
				<view class="index-items" @click="scrollTo('#')">定位热门</view>
				<view class="index-item" v-for="item in citys" :key="item.letter" @click="scrollTo(item.letter)">{{item.letter}}</view>
			</view>
			<scroll-view :scroll-into-view="scrollIntoId" :scroll-y="true" :scroll-with-animation="true" :style="{height:windowHeight}">
				<view class="content">
					<view class="section" id="hot" v-if="hotCitys.length">
						<view class="city-title">热门城市</view>
						<view class="city-list">
							<view class="city-item" v-for="(city, i) in hotCitys" :key="i" @click="onSelect(city)">{{city.name}}</view>
						</view>
					</view>
					<view class="section" :id="item.letter" v-for="(item) in citys" :key="item.letter">
						<view class="letter">{{item.letter}}</view>
						<view class="city-list">
							<view class="city-item" v-for="(city,index) in item.list" :key="index"
							 @click="onSelect(city)">{{city.name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import py from "@/static/js/vue-py.js"
	import train from '@/pages/book/sselect-city/train.js'
	export default{
		data(){
			return{
				sec_lists:[],
				ser_int:'',
				sev_boolt:false,
				citys: [],
				scrollIntoId: 'hot',
				hotCitys: [],
				windowHeight: '',
			}
		},
		onLoad() {
			
		},
		mounted() {
			this.getSystemInfo();
			this.cits();
		},
		methods:{
			getSystemInfo() {
				uni.getSystemInfo().then(res => {
					let [error, data] = res
					this.windowHeight = `${data.windowHeight}px`
				})
			},
			onSelect(ct){
				this.city_vl = ct.name;
				uni.$emit("carcitys",{data: this.city_vl});
				uni.navigateBack({
				})
			},
			searcht(ev){
				let _this = this
				let va = ev.mp.detail.value.trim() //获取搜索框的值
				if(va.length > 0){
					let dat = [];
					this.sec_lists = [];
					_this.sev_boolt = true
					dat = train.addressTrainAll;
					for (let i in dat) {
						if(dat[i].name.indexOf(va) != -1 || dat[i].Abbreviation.indexOf(va) != -1 || dat[i].code.indexOf(va) != -1 ){
							this.sec_lists.push({
								id:dat[i].code,
								name:dat[i].name,
								ts:false
							})
						}
					}
				} else{
					_this.sev_boolt = false
				}
			},
			scrollTo(letter) {
				let _this = this
				_this.scrollIntoId = letter === '#' ? 'hot' : letter
				_this.id_ti = letter === '#' ? '热门' : letter
				_this.id_ic = true
				setTimeout(function(){
					_this.id_ic = false;
				},1000)
			},
			cits(){//回显城市列表
				let address = [];
				let hotaddress = [];
				address = train.addressTrainAll;//所有城市
				hotaddress = train.addressTrainHot;//热门城市
				let count1 = 0
				let ct = []
				for (let i = 65; i < 91; i++) {
					ct[count1] = {
						letter: String.fromCharCode(i),
						list: []
					}
					count1++
				}
				for (let i = 0; i < address.length; i++) {
					let sts = address[i].name; //获取城市名称
					let pys = py.chineseToPinYin(address[i].name).substring(0,1);//获取改城市的首字母
					for (var k = 0; k < ct.length; k++) {
						if(pys == ct[k].letter){
							ct[k].list.push({
								name: sts,
								ts: false,
								id: address[i].code
							})
						}
					}
				}
				for (let i = 0; i < hotaddress.length; i++) {
					this.hotCitys.push({
						name: hotaddress[i].name,
						ts: false,
						id: hotaddress[i].code
					})
				}
				this.citys = ct;
			},
		}
	}
</script>

<style scoped lang="scss">
.citylistfl{
	width: 100%;
	/*  #ifdef MP-WEIXIN */
	padding-top: 80upx;
	/*  #endif  */
	.input-op {
		width: calc(100% - 40upx);
		height: 80upx;
		padding: 15upx 20upx;
		background: #FFFFFF;
		.input-lis {
			display: flex;
			align-items: center;
			position: relative;
			padding: 0 15upx;
			width: calc(100% - 40upx);
			height: 80upx;
			background: #edf0f5;
			border-radius: 5upx;
			.input-css {
				width: 100%;
				font-size: 30upx;
				height: 60upx;
			}
		}
	}
	.sear_list{
		position: absolute;
		left: 0;
		top: 95upx;
		/*  #ifdef  APP-PLUS || MP-WEIXIN */ 
		top: 145upx;
		/*  #endif  */
		background: #FFFFFF;
		z-index: 999;
		width: 100%;
		height: 100%;
		text-indent: 15upx;
		.se_mai{
			font-size: 35upx;
			line-height: 80upx;
			border-bottom: 2upx solid #e1e1e1;
			.se_li{
				display: flex;
				border-top: 1upx solid #eef0ef;
			}
			.se_fath{
				display: flex;
			}
			.se_lu{
				font-size: 25upx;
				color: #C8C7CC;
			}
		}
	}
	.select-city {
		.index {
			position: fixed;
			right: 0;
			top: 80upx;
			z-index: 998;
			color: #949494;
			font-size: 26upx;
				
			.index-items {
				width: 70upx;
				height: 65upx;
				text-align: center;
			}
				
			.index-item {
				width: 70upx;
				height: 42upx;
				line-height: 42upx;
				text-align: center;
			}
		}
		.index-iocs {
			position: fixed;
			z-index: 999;
			color: #FFFFFF;
			font-size: 80upx;
			margin-top: -100upx;
			top: 50%;
			margin-left: -100upx;
			left: 50%;
			opacity: 0.7;
			text-align: center;
			line-height: 200upx;
			width: 200upx;
			height: 200upx;
			border-radius: 50%;
			background: #999999;
		}
		.section {
			background-color: #ffffff;
			.city-title {
				line-height: 60upx;
				color: #949494;
				font-size: 28upx;
				text-indent: 30upx;
			}
				
			.letter {
				width: 100%;
				height: 44upx;
				text-indent: 30upx;
				color: #434c51;
				font-size: 28upx;
				line-height: 44upx;
			}
				
			.city-list {
				display: flex;
				flex-wrap: wrap;
				padding: 30upx 0 0 28upx;
				background:#F1F1F1;
				.city-item {
					width: 215upx;
					height: 80upx;
					margin-right: 25upx;
					margin-bottom: 25upx;
					line-height: 80upx;
					text-align: center;
					border-radius: 6upx;
					background: #FFFFFF;
					color: #1e2c39;
					font-size: 30upx;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					&.active {
						background-color: $uni-color-primary;
						color: #ffffff;
					}
				}
			}
		}
	}
}	
</style>
