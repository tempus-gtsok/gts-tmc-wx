<template>
	<!-- 城市选择 -->
	<view class="select-city-wrap">
		<loading>
		</loading>
		<headnavigation titles="选择目的地"></headnavigation>
		<view class="input-op">
			<view class="input-lis">
				<view class="iconfont" style="color: #9a9a9c;">&#xe6a2;</view>
				<input v-model="ser_int" type="text" value="" @input="searcht($event)" class="input-css" :placeholder="placeh" />
				
				<view v-if="trim(ser_int)" class="iconfont" @click="sea_null" style="color: #C0C0C0;">&#xe641;</view>
				
			</view>
		</view>
		<view class="sear_list" v-if="sev_boolt">
			<view v-if="trim(ser_int)" class="okis" @click="oksibl">确定</view>
			<view class="se_mai" v-for="(item,index) in sec_lists" :key="index" @click="onSelect(item,0)">
				<view style="text-indent: 30upx;" v-if="succ_type == 'Hotel' && sta == 'right'" v-html="item.label"></view>
				<view style="text-indent: 30upx;" v-else>{{item.name}}</view>
			</view>
		</view>
		<view class="select-city">
			<view class="citsarry" v-if="succ_type != 'Hotel'">
				<view class="cits_ok" >
					<view class="cits_hd" @click="del_box(0)">
						<view class="boxs" v-if="deptCity.name !=''">
							{{deptCity.name}}
						</view>
						<view class="ts_bod" v-else>
							请选择出发城市
						</view>
					</view>
					<view class="cits_hd">
						<view class="iconfont" style="color: #007aff;">
							&#xe61c;
						</view>
					</view>
					<view class="cits_hd" @click="del_box(1)">
						<view class="boxs" v-if="arrivCity.name !=''">
							{{arrivCity.name}}
						</view>
						<view class="ts_bod" v-else>
							请选择到达城市
						</view>
					</view>
				</view>
				<view class="citydel" v-if="deptCity.name !='' || arrivCity.name !=''">
					重复点击即可删除
				</view>
			</view>
			<view class="index" v-if="succ_type != 'Hotel' || (succ_type == 'Hotel' && sta == 'left')">
				<view class="index-items" @click="scrollTo('#')">定位热门</view>
				<view class="index-item" v-for="item in citys" :key="item.letter" @click="scrollTo(item.letter)">{{item.letter}}</view>
			</view>
			<view class="index-iocs" v-if="id_ic">
				{{id_ti}}
			</view>
			
			<scroll-view v-if="succ_type != 'Hotel' || (succ_type == 'Hotel' && sta == 'left')" :scroll-into-view="scrollIntoId" :scroll-y="true" :scroll-with-animation="true" :style="{height:windowHeight}">
				<view class="content">
					<view class="section" id="hot" v-if="hotCitys.length">
						<view class="city-title">热门城市</view>
						<view class="city-list">
							<view class="city-item" :class="{active: city.ts}" v-for="(city, i) in hotCitys" :key="i" @click="onSelect(city, 0)">{{city.name}}</view>
						</view>
					</view>
					<view class="section" :id="item.letter" v-for="(item) in citys" :key="item.letter">
						<view class="letter">{{item.letter}}</view>
						<view class="city-list">
							<view class="city-item" :class="{active: city.ts}" v-for="(city,index) in item.list" :key="index"
							 @click="onSelect(city,0)">{{city.name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-if="succ_type != 'Hotel'&& deptCity.name != '' && arrivCity.name != ''" class="btok" @click="btclick">
			选好了
		</view>
		<view class="select-city" v-if="succ_type == 'Hotel' && sta == 'right'">
			<view class="section" v-for="(item,index) in stlist" :key="index">
				<view class="city-title">{{item.name}}</view>
				<view class="city-list" :class="{'ovf-clss': item.isclk}">
					<view class="city-item" :class="{active: lisWxHotels === city}" v-for="(city, i) in item.list" :key="i" @click="onSelect(city, 0 ,[item.isclk,index,i])">
						<text v-if="item.list.length < 7">{{city}}</text>
						<text v-else-if="item.isclk == false && item.list.length > 6 && i != item.list.length -1">{{city}}</text>
						<text v-else-if="item.isclk && item.list.length > 6 && i != 5">{{city}}</text>
						<text class="iconfont"  v-else-if="i == 5  && item.isclk && item.list.length > 6">{{city}}</text>
						<text class="iconfont"  v-else-if="i == item.list.length -1 && item.isclk == false && item.list.length > 6">{{city}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tork from "@/api/torowk.js"
	import train from './train.js'
	import hotel from './hotel.js'
	import py from "@/static/js/vue-py.js"
	import {mapState} from 'vuex';
	import airports from './airports.js'
	export default {
		data() {
			return {
				lisWxHotels:'',//酒店地址
				deptCity:{name:'',id:''},//出发城市
				arrivCity:{name:'',id:''},//到达城市
				placeh:'',
				htocity: '',
				sec_list:[],
				sec_lists:[],
				stlist:[],
				hotCitys: [],
				citys: [],
				windowHeight: '',
				scrollIntoId: 'F',
				id_ic: false,
				id_ti: '',
				ser_int: '',
				sta: '',
				sev_boolt: false,
				succ_type: "Planeticket",
				copuas: [],
				typeys:'',
				lslt: false,
			}
		},
		mounted() {
			this.getSystemInfo();
			if(this.lslt){
				this.st_right_list();//获取酒店详情
			}
		},
		computed:{
			 ...mapState(['wx_Hotel'])
		},
		methods: {
			oksibl(){
				this.$store.commit("wx_hotels_Ai", this.ser_int);
				uni.navigateBack({
				})
			},
			gleklist(num){
				if(num >= 0){
					this.stlist[num].isclk = true;
					this.stlist[num].list.splice(5,0, '\ue8a4');
				} else {
					let ulist = this.stlist
					for (let i = 0; i < ulist.length; i++) {
						if(ulist[i].list.length > 6){
							for (let k = 0; k < ulist[i].list.length; k++) {
								if(k == 5){
									ulist[i].isclk = true
									ulist[i].list.splice(5,0, '\ue8a4');
								}
							}
						}
					}
					this.stlist = ulist
				}
			},
			async st_right_list(){//回显酒店信息
				let that = this;
				try{
					const res = await tork.getCityDetail({'cityCode': that.wx_Hotel.name});
					if(res.code == 200){
						that.stlist.push({
							name: '行政区',
							id: 1,
							isclk: false,//打开还是关闭
							oken: false,//是否超过6个
							list:res.data.cityArea//值
						})
						that.stlist.push({
							name: '机场车站',
							id: 2,
							isclk: false,//打开还是关闭
							oken: false,//是否超过6个
							list:res.data.cityAirRailWay//值
						})
						that.stlist.push({
							name: '商圈',
							id: 3,
							isclk: false,//打开还是关闭
							oken: false,//是否超过6个
							list:res.data.cityBusinessSectionInfo//值
						})
						that.stlist.push({
							name: '地铁',
							id: 3,
							isclk: false,//打开还是关闭
							oken: false,//是否超过6个
							list:res.data.citySubWay//值
						})
						that.stlist.push({
							name: '品牌',
							id: 3,
							isclk: false,//打开还是关闭
							oken: false,//是否超过6个
							list:that.hotelb(res.data.hotelBrands)//值
						})
						// 
						that.gleklist(-1);
					}
				}catch(e){
					console.log(e)
					
				}
				
			},
			hotelb(item){//返回商圈的值
				let su = []
				for (var i = 0; i < item.length; i++) {
					su.push(item[i].hotelBrandName)
				}
				return su
			},
			cits(){//回显城市列表
				let cts = this.succ_type
				let address = [];
				let hotaddress = [];
				if(cts == "Planeticket"){
					address = airports.addressAirportAll;//所有城市
					hotaddress = airports.addressAirportHot;//热门城市
				} else if(cts == "Train"){
					address = train.addressTrainAll;//所有城市
					hotaddress = train.addressTrainHot;//热门城市
				} else if(cts == "Hotel"){
					address = hotel.addressTrainAll;//所有城市
					hotaddress = hotel.addressTrainHot;//热门城市
				}
				let count1 = 0
				let ct = []
				for (let i = 65; i < 91; i++) {
					ct[count1] = {
						letter: String.fromCharCode(i),
						list: []
					}
					count1++
				}
				if(cts == "Planeticket"){
					for (let i = 0; i < address.length; i++) {
						let sts = address[i].cityCName; //获取城市名称
						let pys = address[i].cityEName.substring(0,1);//获取改城市的首字母
						for (var k = 0; k < ct.length; k++) {
							if(pys == ct[k].letter){
								ct[k].list.push({
									name: sts,
									ts: false,
									id: address[i].airportCode
								})
							}
						}
					}
					for (let i = 0; i < hotaddress.length; i++) {
						this.hotCitys.push({
							name: hotaddress[i].cityCName,
							ts: false,
							id: hotaddress[i].airportCode
						})
					}
				} else if(cts == "Train" || cts == "Hotel"){
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
				}
				this.citys = ct
			},
			del_box(it){//本地删除选择城市
				let names;
				if(it == 0){
					names = this.deptCity.name;
					this.deptCity = {name:'',id:''};
				} else {
					names = this.arrivCity.name;
					this.arrivCity = {name:'',id:''};
				}
				for (let i = 0; i < this.citys.length; i++) {
					for (let k = 0; k < this.citys[i].list.length; k++) {
						if(this.citys[i].list[k].name == names){
							this.citys[i].list[k].ts = false
						}
					}
				}
				for (let i = 0; i < this.hotCitys.length; i++) {
					if(this.hotCitys[i].name == names){
						this.hotCitys[i].ts = false
					}
				}
			},
			shou_clik(va, num , ns){ //关闭打开 、上面还是下面 、 下标
				let _this = this;
				if(_this.stlist[num].list.length < 7){
					return false
				} else {
					if(va == true){
						if(ns != 5){
							return false
						} else {
							_this.stlist[num].isclk = false;
							_this.stlist[num].list.splice(5,1);
							_this.stlist[num].list.push('\ue609');
							return true
						}
					} else {
						if(ns != _this.stlist[num].list.length-1){
							return false
						} else {
							_this.stlist[num].list.splice(_this.stlist[num].list.length-1,1);
							_this.gleklist(num);
							return true
						}
					}
				}
			},
			getSystemInfo() {
				uni.getSystemInfo().then(res => {
					let [error, data] = res
					this.windowHeight = `${data.windowHeight}px`
				})
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
			btclick(){ //提交选择的城市
				let cus = this.succ_type
				if(this.typeys == 'flig'){ //判断如果航班动态
					if(cus == "Planeticket"){
						this.$store.commit("vx_city_le_add", [this.deptCity,this.arrivCity])
						uni.navigateBack({
						})
					}
				} else {
					if(cus == "Planeticket"){
						this.$store.commit("vx_city_le_add", [this.deptCity,this.arrivCity])
					} else if(cus == "Train"){
						this.$store.commit("tr_city_left_add", [this.deptCity,this.arrivCity])
					}
					uni.navigateBack({
						data: 'sta=left&type=' + cus,
					})
				}
			},
			onSelect(city,opname,arr) { //选中城市后页面返回
				// console.log(city);
				let _this = this
				_this.sev_boolt = false;
				if(_this.succ_type == 'Hotel'){
					if(_this.sta == 'left'){
						_this.htocity = city;
						this.$store.commit("wx_Hotel_Ai", city)
						this.$store.commit("wx_hotels_Ai", '')
						uni.navigateBack({
							data: 'sta=left&type=' + _this.succ_type,
						})
					} else if(_this.sta == 'right'){
						if(arr == '' || arr == undefined){ //判断是否点击的酒店地址隐藏
							_this.on_blok(city,opname)
						} else {
							if(!_this.shou_clik(arr[0],arr[1],arr[2])){
								_this.on_blok(city,opname);
							}
						}
					}
				} else {
					if(this.deptCity.name == '' || this.arrivCity.name == ''){ //选择城市
						if(this.deptCity.name == ''){
							if(this.arrivCity.name !== city.name){
								for (let i = 0; i < this.citys.length; i++) {
									for (let k = 0; k < this.citys[i].list.length; k++) {
										if(this.citys[i].list[k].name == city.name){
											this.citys[i].list[k].ts = true
										}
									}
								}
								for (let i = 0; i < this.hotCitys.length; i++) {
									if(this.hotCitys[i].name == city.name){
										this.hotCitys[i].ts = true
									}
								}
								_this.deptCity = {
									name:city.name,
									id:city.id
								}
							}
						} else {
							if(this.deptCity.name !== city.name){
								for (let i = 0; i < this.citys.length; i++) {
									for (let k = 0; k < this.citys[i].list.length; k++) {
										if(this.citys[i].list[k].name == city.name){
											this.citys[i].list[k].ts = true
										}
									}
								}
								for (let i = 0; i < this.hotCitys.length; i++) {
									if(this.hotCitys[i].name == city.name){
										this.hotCitys[i].ts = true
									}
								}
								_this.arrivCity = {
									name:city.name,
									id:city.id
								}
							}
						}
					}
				} 
			},
			on_blok(city,opname){
				if(this.ser_int != '' && this.sta == 'right' && this.succ_type == 'Hotel'){
					this.$store.commit("wx_hotels_Ai", city.name)
				} else {
					this.$store.commit("wx_hotels_Ai", city)
				}
				uni.navigateBack({
					data: 'sta=right&type=' + this.succ_type
				})
			},
			trim(ev){//判断是否有值
				if(ev.trim().length>0){
					return true; 
				} else {
					return false;
				}
			},
			async searcht(ev){ //监听搜索的值
				let _this = this
				let va = ev.mp.detail.value.trim() //获取搜索框的值
				if(va.length > 0){
					let dat = [];
					this.sec_lists = [];
					_this.sev_boolt = true
					if(this.succ_type == 'Hotel' || this.succ_type == 'Train'){
						if(this.succ_type == 'Hotel'){
							if(this.sta == 'right' && this.succ_type == 'Hotel'){//搜索酒店
								try{
									let res = await tork.getCityNames({
										cityName: _this.wx_Hotel.name,
										keyword: va
									})
									if(res.code == 200){
										let dat = res.data;
										_this.sec_lists = [];
										for (let i in dat) {//赋值到页面
											_this.sec_lists.push({
												id:dat[i].id,
												name:dat[i].name,
												label:dat[i].label,
												ts:false
											})
										}
									}
								}catch(e){
									console.log(e)
									
								}
							} else {
								dat = hotel.addressTrainAll;
								console.log(dat)
								for (let i in dat) {
									if(dat[i].name.indexOf(va) != -1){
										this.sec_lists.push({
											id:dat[i].code,
											name:dat[i].name,
											ts:false
										})
									}
								}
							}
						} else {
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
						}
						
					} else {
						dat = airports.addressAirportAll;
						// console.log(dat)
						for (let i in dat) {
							if(dat[i].airportCName.indexOf(va) != -1 || dat[i].airportCode.indexOf(va) != -1 || dat[i].cityCName.indexOf(va) != -1 || dat[i].cityFirstSpell.indexOf(va) != -1 || dat[i].citySpell.indexOf(va) != -1 ){
								this.sec_lists.push({
									id:dat[i].airportCode,
									name:dat[i].airportCName,
									ts:false
								})
							}
						}		
					}
				} else{
					_this.sev_boolt = false
				}
			},
			sea_null(){//清空搜索的值
				this.ser_int = '';
				this.sev_boolt = false;
			},
		},
		//监听获取主页传过来的城市
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			this.sta = option.sta;//左右边
			this.succ_type = option.type
			let types = this.succ_type;//类型：机场、城市
			let list = []
			this.typeys = option.types;
			this.cits();
			if(types == "Hotel"){//酒店
				this.placeh = '城市名/位置/地点';
				if(option.sta == 'left'){
					if (option.list != ''){
						list = option.list;
						for (let i = 0; i < this.citys.length; i++) {
							for (let k = 0; k < this.citys[i].list.length; k++) {
								if(this.citys[i].list[k].name == list){
									this.citys[i].list[k].ts = true
								}
							}
						}
						for (let i = 0; i < this.hotCitys.length; i++) {
							if(this.hotCitys[i].name == list){
								this.hotCitys[i].ts = true
							}
						}
					}
				} else {
					this.lisWxHotels = option.wx_hotels;//酒店地址
					this.lslt = true;
				}
			} else if(types == "Planeticket"){ //飞机
				this.placeh = '深圳 / shenzhen / sz';
				if(option.list.length > 3){
					list = JSON.parse(option.list);
					if(list[0].name.length > 1){
						this.deptCity = list[0];
						this.arrivCity = list[1];
						
						for (let i = 0; i < this.citys.length; i++) {
							for (let k = 0; k < this.citys[i].list.length; k++) {
								if(this.citys[i].list[k].name == list[0].name || this.citys[i].list[k].name == list[1].name){
									this.citys[i].list[k].ts = true
								}
							}
						}
						for (let i = 0; i < this.hotCitys.length; i++) {
							if(this.hotCitys[i].name == list[0].name || this.hotCitys[i].name == list[1].name){
								this.hotCitys[i].ts = true
							}
						}
					}
				} 
			} else if(types == "Train"){ //火车
				this.placeh = '输入城市名称';
				if(option.list.length>0){
					list = JSON.parse(option.list);
					this.deptCity = list[0];
					this.arrivCity = list[1];
					for (let i = 0; i < this.citys.length; i++) {
						for (let k = 0; k < this.citys[i].list.length; k++) {
							if(this.citys[i].list[k].name == list[0].name || this.citys[i].list[k].name == list[1].name){
								this.citys[i].list[k].ts = true
							}
						}
					}
					for (let i = 0; i < this.hotCitys.length; i++) {
						if(this.hotCitys[i].name == list[0].name || this.hotCitys[i].name == list[1].name){
							this.hotCitys[i].ts = true
						}
					}
				}
			}
		}
	}
</script>

<style>
	page{
		background-color: #edf0f5;
	}
</style>
<style lang="scss" scoped>
	
	.select-city-wrap {
		position: relative;
		width: 100%;
		padding-bottom: 150upx;
		.input-op {
			width: calc(100% - 40upx);
			height: 80upx;
			padding: 15upx 20upx;
			background: #FFFFFF;
			.input-lis {
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: relative;
				padding: 0 15upx;
				width: calc(100% - 40upx);
				height: 80upx;
				background: #edf0f5;
				border-radius: 5upx;
				.input-css {
					width: 70%;
					font-size: 30upx;
					height: 60upx;
				}
				
			}
		}
		
		.sear_list{
			position: absolute;
			left: 0;
			top: 195upx;
			/*  #ifdef  APP-PLUS || MP-WEIXIN */ 
			top: 245upx;
			/*  #endif  */
			background: #FFFFFF;
			z-index: 999;
			width: 100%;
			height: 100%;
			text-indent: 15upx;
			.okis{
				position: fixed;
				width: 80%;
				left: 10%;
				bottom: 5%;
				line-height: 80upx;
				text-align: center;
				background:$uni-color-primary;
				color: #FFFFFF;
				font-size: 34upx;
				border-radius: 80upx;
			}
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
		.btok{
			position: fixed;
			bottom: 40upx;
			left: 50upx;
			text-align: center;
			width: calc(100% - 100upx);
			height: 90upx;
			font-size: 36upx;
			line-height: 90upx;
			color: #FFFFFF;
			background: $uni-color-primary;
			border-radius: 90upx;
		}
		.select-city {
			.citsarry{
				position: relative;
				width: 100%;
				min-height: 90upx;
				background: #FFFFFF;
				.no_city{
					text-indent: 50upx;
					color: red;
					font-size: 25upx;
					line-height: 90upx;
				}
				.cits_ok{
					width: 80%;
					margin:  0 10%;
					height: 90upx;
					display: flex;
					.cits_hds{
						flex: 1;
						display: flex;
						justify-content: center;
						align-items: center;
					}
					.cits_hd{
						flex: 2;
						display: flex;
						justify-content: center;
						align-items: center;
						position: relative;
						.close_hd{
							position: absolute;
							right: 10upx;
							top: 20upx;
						}
						.boxs{
							width: 100%;
							height: 60upx;
							font-size: 30upx;
							text-align: center;
							overflow: hidden;
							text-overflow: ellipsis; //文本溢出显示省略号
							white-space: nowrap; //文本不会换行
							line-height: 60upx;
							color: #FFFFFF;
							background: $uni-color-primary;
							border-radius: 10upx;
						}
						.ts_bod{
							color: #999999;
							font-size: 25upx;
						}
					}
				}
				.citydel{
					width: 90%;
					margin-left: 5%;
					font-size: 28upx;
					color: red;
				}
			}
			.index {
				position: fixed;
				right: 0;
				top: 180upx;
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
				margin-top: 20upx;
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
					background-color: #ffffff;
					font-size: 28upx;
					line-height: 44upx;
				}
		
				.city-list {
					display: flex;
					flex-wrap: wrap;
					padding: 30upx 0 0 28upx;
		
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
				.ovf-clss{
					height: 205upx;
					overflow: hidden;
				}
			}
		}
	}
</style>
