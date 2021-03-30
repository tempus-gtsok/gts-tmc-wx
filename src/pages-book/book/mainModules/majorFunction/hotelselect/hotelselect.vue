<template>
	<view class="hotselet">
		<loading>
		</loading>
		<view class="hot_top">
			<view class="Navigations">
				<view class="smtis">
					<view @click="rblcok" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
				</view>
				<view class="ongbutns">
					<view class="onleft">
						<calendar  @change="lischang" currentlist="Hotel" :isretun="isretun" :ishtoel="ishtoel" :singleDate="singleDate"  :startDate="startDate" :endDate="endDate"></calendar>
					</view>
					<view class="onright">
						<input class="orvlues" disabled v-model="sevalie" @click="selist">
						</input>
						<view class="iconfont" style="color: #C8C7CC;" v-if="isev" @click="delets">
							&#xe641;
						</view>
					</view>
				</view>
				<view class="smtis">
				</view>
			</view>
			<view class="sel_coi" v-if="hotellist!=undefined && hotellist.length > 0">
				<view class="se_list" @click="seclick(item,index)" v-for="(item,index) in screen" :key="index" :class="index != screen.length-1 ? 'bk' : ''">
					<view :style="{color: index == isindex ? '#007aff':''}">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="recommended" :class="isre_one ? 'shows' : 'hides'" >
			<view class="recommendedlist"  v-for="(item,index) in  recommended" @click="reclokc(item)" :key="index">
				<view>
					{{item.name}}
				</view>
				<view class="iconfont posits" v-if="reconaid == item.id">&#xe629;</view>
			</view>
		</view>
		<view class="recommended" :class="isre_two ? 'shows' : 'hides'" >
			<view class="rests">
				<view class="" style="line-height: 80upx;">
					价格区间
				</view>
				<view class="instinput">
					<view class="isdiv">
						<input type="number" maxlength="8" v-model="parin_le" value="" placeholder="最低价"/>
					</view>
					<view class="setli">
						-
					</view>
					<view class="isdiv">
						<input type="number" maxlength="8"  v-model="parin_right" value="" placeholder="最高价" />
					</view>
				</view>
			</view>
			<view class="restst">
				<view style="line-height: 80upx;text-indent: 15upx;color: #C0C0C0;">
					星级
				</view>
				<view class="htolevel">
					<view class="htlist" @click="ckleve(item,index)" v-for="(item,index) in hotlevel" :class="isckleve(item,index) ? 'ischekc':''" :key="index">
						<view class="iconfont" style="font-size: 30upx;">&#xe629;</view>
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="btnleve">
				<view class="btnlev_left" @click="btclone">
					恢复默认
				</view>
				<view class="btnlev_right" @click="btnselec">
					确认
				</view>
			</view>
		</view>
		<view class="blcks"  v-if="isre_two || isre_one" @click="isreclik"></view>
		<view class="select-city-wrap" :class="isShow_H5 ? 'show' : 'hide'">
			<view class="input-op">
				<view @click="rblcoks" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
				<view class="input-lis">
					<view class="iconfont" style="color: #9a9a9c;">&#xe6a2;</view>
					<input type="text" v-model="ctyslit" @input="search_h($event)" class="input-css" placeholder="城市名/位置/地点" />
					
				</view>
			</view>
			<view class="selistdp" v-if="sevest">
				<view v-if="trim(ctyslit)" class="okis"  @click="selclskts(ctyslit)">确定</view>
				<view class="seisno" v-if="seisno">
					没有找到该酒店
				</view>
				<view class="selistval" v-for="(item,index) in selistval" :key="index" @click="selclskts(item.name)" v-html="item.label">
				</view>
			</view>
			<view class="select-city" v-if="!sevest">
				<view class="section" v-for="(item,index) in stlist" :key="index">
					<view class="city-title">{{item.name}}</view>
					<view class="city-list" :class="{'ovf-clss': item.isclk}">
						<view class="city-item" :class="{active: current === city}" v-for="(city, i) in item.list" :key="i" @click="onSelect(city, 0 ,[item.isclk,index,i])">
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
		<view class="hotelist" v-if="hotellist!=undefined && hotellist.length > 0">
			<view class="hotels" v-for="(item,index) in hotellist" @click="selectlist(item)" :key=index >
				<view class="hotleft">
					<image v-if="item.titleImg == ''" src="@/static/img/hotel-small-img2.jpg" mode=""></image>
					<image v-else :src="item.titleImg" mode=""></image>
				</view>
				<view class="hotright">
					<view class="titles">
						{{item.resName}}
					</view>
					<view class="address">
						地址：{{item.address}}
					</view>
					<!-- <view class="address">
						距离：{{item.resPosition}}
					</view> -->
					<view class="intros">
						简介：{{item.intro}}
					</view>
					<view class="money">
						<view class="resGrades">
							<view class="" v-for="(items,index) in item.resGr" :key="index">
								<view class="iconfont" style="font-size: 30upx;">
									&#xe63e;
								</view>
							</view>
						</view>
						<view class="resGradest">
							<view class="monsle">
								￥
							</view>
							{{item.minPrice}}
							<view class="mosrig">
								起
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="hotelist" v-else>
			<image class="gjImg" v-if="imgFlag" src="@/static/img/m_ticketList.png" mode=""></image>
			<image class="noData" v-else src="@/static/img/noData.png" mode="widthFix"></image>
			<div class="rblcok" v-if="!imgFlag" @click="rblcok">重新搜索</div>
		</view>
		<uni-load-more :loadingType="loadingType" v-if="totalPatge > 1" :contentText="contentText" ></uni-load-more>
		<onPageScrolls :scrolltops="scrolltops"></onPageScrolls>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import tork from "@/api/torowk.js"
	import calendar from '@/components/view/book/date-picker/date-picker.vue'; //日期
	export default{
		components:{
			calendar
		},
		data(){
			return{
				scrolltops:false,//是否显示
				ctyslit:'',
				seisno:false,
				isretun:false,
				selistval:[],
				sevest:false,
				imgFlag:true,
				parin_le: '',
				parin_right: '',
				hotlevel: [{
					id: '-1',
					name: '不限'
				},{
					id: '34',
					name: '二星及以下'
				},{
					id: '27,32',
					name: '二星/经济'
				},{
					id: '26,31',
					name: '三星/舒适'
				},{
					id: '24,30',
					name: '四星/高档'
				},{
					id: '23,28',
					name: '五星/豪华'
				}],
				reconaid: null,//推荐排序
				isre_two: false,
				isre_one: false,
				recommended:[{ //排序类型
					id:'bookTimes_asc',
					name:'推荐排序'
				},{
					id:'minPrice_asc',
					name:'价格从高到低'
				},{
					id:'minPrice_desc',
					name:'价格从低到高'
				},{
					id:'resGrade_asc',
					name:'酒店星级从高到低'
				},{
					id:'resGrade_desc',
					name:'酒店星级从低到高'
				}],
				screen:[{
					id: 1,
					name:'推荐排序'
				},{
					id: 2,
					name: '价格星级排序'
				}],
				cityid: '',
				cityids: '',
				totalPatge:0,
				loadingType: 0,
				contentText: {
					contentdown:'上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				isev: false,
				sevalie: '关键词/位置/酒店名',
				current:  '',
				citys: [],
				ishtoel:'hotel',
				singleDate: false,
				startDate: '',
				endDate: '',
				isShow_H5: false,
				stlist:[],
				hotellist: [],
				page:1,
				searchHotelType: "",
				butalist: '',
				itemdata: {},
				isindex: -1,
				levecllist: [],
				levst: [],//星级
				priceFromTo: [],//价格
			}
		},
		mounted() {
			if(this.itemdata.isblcks == 1){
				this.isretun = true
			}
			this.search()
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.search();
		},
		onReachBottom: function() {
			let that = this;
			if (that.timer != null) {
				clearTimeout(that.timer);
			}
			that.timer = setTimeout(function() {
				that.searchnext();
			}, 300);
		},
		computed: {
			...mapState([
			'se_doubletimel',
			'se_doubletimer',//往返时间
			'longitudelatitude',//坐标
			])
		},
		methods:{
			onPageScroll(res){//距离页面顶部距离
				if(res.scrollTop <600){
					this.scrolltops = false;
				} else {
					this.scrolltops = true;
				}
			},
			async search_h(ev){//监听酒店搜索的值
				let _this = this
				let va = _this.ctyslit.trim() //获取搜索框的值
				if(va.length > 0){
					
					try{
						let res = await tork.getCityNames({
							cityName: _this.cityid,
							keyword: va
						})
						
						if(res.code == 200){
							let dat = res.data;
							_this.selistval = [];
							let vist = true;
							for (let i in dat) {//赋值到页面
								if(dat[i].name.indexOf(va) != -1){
									vist = false;
								}
								_this.selistval.push(dat[i]);
							}
							_this.seisno = vist;
							_this.sevest = true;
						}
					}catch(e){
						console.log(e)
						
					}
				} else {
					_this.sevest = false;
				}
			},
			trim(ev){//判断是否有值
				if(ev.trim().length>0){
					return true; 
				} else {
					return false;
				}
			},
			selclskts(item){
				this.sevalie = item;
				this.cityids = item;
				this.search();
				this.isev = true;
				this.sevest = false;
				this.isShow_H5 = false;
			},
			selvlist(it){
				if(it.length == 0) {
					return [this.hotlevel[0].id]
				} else {
					let strit = it.join(',');
					return [strit]
				}
			},
			btnselec(){//确认星级价格筛选
				let levst = [];
				this.levst = this.selvlist(this.levecllist)
				if(this.parin_le == '' || this.parin_right == ''){
					this.priceFromTo = [];
				} else {
					this.priceFromTo = [{
						priceFrom: this.parin_le,
						priceTo:this.parin_right
					}]
				}
				this.isreclik();
				this.search();
			},	
			btclone(){ //星级价格筛选恢复默认
				this.parin_le = '';
				this.parin_right = '',
				this.levecllist = [];
				this.isreclik();
			},
			isckleve(item,index){ //判断是否选中当前
				let it = this.levecllist;
				if(index == 0 && it.length == 0){
					return true
				} else {
					for (var i = 0; i < it.length; i++) {
						if(it[i] == item.id){
							return true
						}
					}
				}
			},
			ckleve(item,index){ //点击酒店星级筛选
				let it = this.levecllist;
				if(index == 0){
					this.levecllist = []
				} else {
					let leve = this.levecllist;
					let st = false
					for (var i = 0; i < leve.length; i++) {
						if(leve[i] == item.id){
							st = true;
							this.levecllist.splice(i,1)
						}
					}
					if(!st){
						this.levecllist.push(item.id)	
					}
				}
			},
			seclick(item,index){ //点击当前排序筛选
				if(index == 0){
					if(this.isre_one == true){
						this.isre_one = false;
					} else{
						this.isreclik();
						this.isre_one = true;
						this.isindex = index;
					}
				} else if(index == 1){
					if(this.isre_two == true){
						this.isre_two = false;
					} else{
						this.isreclik();
						this.isre_two = true;
						this.isindex = index;
					}
				}
			},
			reclokc(item){ //选择筛选排序
				this.reconaid = item.id;
				this.isreclik();
				this.search();
			},
			isreclik(){//关闭所有筛选
				this.isindex = -1;
				this.isre_two = false;
				this.isre_one = false;
			},
			selectlist(item){ //点击详情
				this.itemdata['hotelCode'] = item.id;
				this.itemdata['searchHotelType'] = this.searchHotelType;
				uni.navigateTo({
					url:'./hotellist/hotrllist?data=' + JSON.stringify(this.itemdata)
				})
			},
			async search(){ //第一次加载
				let that = this;
				that.hotellist = [];
				that.page = 1;
				that.loadingType = 0;
				
				try{
					let datw = {
						cityCode: that.cityid,
						keyword: that.cityids,
						begin: that.startDate,
						end: that.endDate,
						pageCount: that.page,
						rowCount: 10,
						orderBy:[this.reconaid],
						searchCondition:{
							hotelLevelList:this.selvlist(this.levecllist),//星级
							priceFromToList:this.priceFromTo//价格
						}
					}
					const res = await tork.sortHotelList(datw); //获取酒店列表
					
					if(res.code == 200){
						that.page++;//得到数据之后page+1
						that.searchHotelType = res.data.searchHotelType;
						that.totalPatge= res.data.totalPatge;//总共多少页
						that.hotellist = res.data.responseResult;//默认加载的数据
						for (let i in that.hotellist) {
							that.hotellist[i]['resGr'] = that.resGrade(that.hotellist[i].resGrade);
						}
						if(that.hotellist.length < 1){
							this.showToasts("没有合适的酒店信息")
							this.imgFlag = false
						}
					}
				}catch(e){
					console.log(e)
					
				}
				
			},
			resGrade(item){
				if(['37','32','34'].includes(item)){
					return 2
				} else if(['26','31'].includes(item)){
					return 3
				} else if(['24','30'].includes(item)){
					return 4
				} else if(['23','28'].includes(item)){
					return 5
				} else {
					return 1
				}
			},
			async searchnext(){
				let that = this;
				if (that.loadingType !== 0) {//loadingType!=0;直接返回
					return false;
				}
				if(that.page > that.totalPatge){
					return false;
				}
				that.loadingType = 1;
				uni.showNavigationBarLoading();//显示加载动画
				try{
					let datw = {
						cityCode: that.cityid,
						keyword: that.cityids,
						begin: that.startDate,
						end: that.endDate,
						pageCount: that.page,
						rowCount: 10,
						orderBy:[this.reconaid],
						searchCondition:{
							hotelLevelList:this.selvlist(this.levecllist),
							priceFromToList:this.priceFromTo
						}
					}
					const res = await tork.sortHotelList(datw); //获取酒店列表
					if(res.code == 200){
						if (res.data.length == 0) {//没有数据
							that.loadingType = 2;
							uni.hideNavigationBarLoading();//关闭加载动画
							return;
						}
						that.page++;//每触底一次 page +1
						that.searchHotelType = res.data.searchHotelType
						let das = res.data.responseResult
						for (let i in das) {
							das[i]['resGr'] = that.resGrade(das[i].resGrade);
						}
						that.hotellist = that.hotellist.concat(das);
						that.loadingType = 0;//将loadingType归0重置
						uni.hideNavigationBarLoading();//关闭加载动画
					}
				}catch(e){
					console.log(e)
				}
			},
			callback(){
				
			},
			rblcoks(){
				this.selistval = [];
				this.sevest = false;
				this.isShow_H5 = false;
			},
			async st_right_list(){//回显酒店信息
				let that = this;
				if(that.stlist.length > 0){
					that.isShow_H5 = true;
				} else {
					try{
						const res = await tork.getCityDetail({'cityCode': that.cityid});
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
							that.gleklist(-1);
							that.isShow_H5 = true;
						} else {
							this.showToasts(res.message);
						}
					}catch(e){
						console.log(e)
					}
				}
			},
			hotelb(item){//返回商圈的值
				let su = []
				for (var i = 0; i < item.length; i++) {
					su.push(item[i].hotelBrandName)
				}
				return su
			},
			onSelect(city,opname,arr) { //选中条件后页面返回
				let _this = this
				if(arr == '' || arr == undefined){ //判断是否点记的酒店地址隐藏
					_this.on_blok(city,opname)
				} else {
					if(!_this.shou_clik(arr[0],arr[1],arr[2])){
						_this.on_blok(city,opname);
					}
				}
			},
			on_blok(city){ //选择当前城市
				this.sevalie = city;
				this.cityids = city;
				this.search();
				this.isev = true;
				this.isShow_H5 = false;
			},
			delets(){ //删除当前城市
				if(this.itemdata.isblcks == 1){
					return
				}
				this.sevalie = '关键词/位置/酒店名';
				this.cityids = '';
				this.isev = false;
				this.search();
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
			rblcok(){
				// #ifdef H5
				history.back();
				// #endif
				// #ifdef MP-WEIXIN
				uni.navigateBack()
				// #endif
			},
			selist(ev){
				this.st_right_list();
			},
			lischang(item){//日期
				this.$store.commit('se_doubletimel_add', item.choiceDate[0])
				this.$store.commit('se_doubletimer_add', item.choiceDate[1])
			}
		},
		onLoad(items) {
			this.itemdata = JSON.parse(items.data);
			let item = this.itemdata;
			this.cityid = item.city;//城市
			this.cityids = item.citys;//详细
			if(this.cityids != ""){
				this.sevalie = this.cityids;
				this.isev = true;
			}
			this.longlist = this.longitudelatitude;
			this.startDate = item.se_doubletimel;//开始时间
			this.endDate = item.se_doubletimer;//结束时间
			this.butalist = item.butalist;//人员
		}
	}
</script>

<style scoped lang="scss">
	$brgk_blue: linear-gradient(to right, #4E92FD 0%,#6E46FE 100%);

	.hotselet{
		position: relative;
		.hot_top{
			width: 100%;
			z-index: 999;
			.Navigations{
				width: 100%;
				/*  #ifdef  APP-PLUS || MP-WEIXIN */ 
				padding-top: 70upx;
				/*  #endif  */
				height: 90upx;
				display: flex;
				justify-content: center;
				align-items: center;
				background: linear-gradient(to right, #4e92fd 0%, #6e46fe 100%);
				.ongbutns{
					width: 85%;
					height: 65upx;
					background: #FFFFFF;
					border-radius: 65upx;
					margin-left: 5%;
					display: flex;
					.onleft{
						width: 35%;
						height: 65upx;
					}
					.onright{
						border-left: 2upx solid #E5E5E5;
						width: 65%;
						height: 65upx;
						display: flex;
						line-height: 65upx;
						.orvlues{
							margin-left: 5%;
							font-size: 30upx;
							width: 80%;
							height: 65upx;
							color: #E5E5E5;
						}
					}
				}
			}
			.sel_coi{
				width: 100%;
				height: 100upx;
				background: #FFFFFF;
				display: flex;
				align-items: center;
				.se_list{
					flex:  1;
					height: 70upx;
					line-height: 70upx;
					text-align: center;
					font-size: 30upx;
				}
				.bk{
					border-right: 2upx solid #E5E5E5;
				}
				
			}
		}
		.blcks{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.3);
			z-index: 480;
		}
		.recommended{
			position: absolute;
			top: 0;
			left: 0;
			
			width: 100%;
			min-height: 200upx;
			overflow: scroll;
			background: #FFFFFF;
			z-index: 500;
			.rests{
				width: calc(100% - 80upx);
				padding: 40upx;
				font-size: 35upx;
				color: #C0C0C0;
				.instinput{
					display: flex;
					line-height: 70upx;
					.isdiv{
						width: 45%;
						height: 70upx;
						border: 2upx solid #C0C0C0;
						border-radius: 10upx;
						display: flex;
						align-items: center;
						input{
							width: 100%;
							color: #333333;
							font-size: 28upx;
							border: 0;
							text-align: center;
						}
					}
					.setli{
						width: 10%;
						text-align: center;
					}
				}
			}
			.restst{
				width:96%;
				padding: 2%;
				font-size: 35upx;
				border-top: 2upx solid #C0C0C0;
				.htolevel{
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					align-content: space-between;
					.htlist{
						font-size: 30upx;
						width: 28.5%;
						margin: 2%;
						height: 90upx;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #C0C0C0;
						border: 2upx solid #C0C0C0;
						border-radius: 10upx;
					}
					.ischekc{
						color: $uni-color-primary;
						border: 2upx solid $uni-color-primary;
					}
				}
			}
			.btnleve{
				width: 100%;
				height: 90upx;
				display: flex;
				text-align: center;
				line-height: 90upx;
				font-size: 35upx;
				.btnlev_left{
					flex: 1;
					height: 90upx;
					background: #C0C0C0;
					color: #FFFFFF;
				}
				.btnlev_right{
					flex: 1;
					height: 90upx;
					background:  $brgk_blue;
					color: #FFFFFF;
				}
			}
			.recommendedlist{
				width: 100%;
				font-size: 35upx;
				line-height: 100upx;
				text-align: center;
				border-bottom: 2upx solid #F1F1F1;
				text-align: center;
				position: relative;
				.posits{
					position: absolute;
					right: 40upx;
					top: 0;
					color: $uni-color-primary;
				}
			}
		}
		.shows{
			top: 180upx;
			/*  #ifdef  APP-PLUS || MP-WEIXIN */ 
			top: 250upx;
			/*  #endif  */
			transition: top 0.4s;
		}
		.hides {
			top: -300%;
			transition: top 1s;
		}
		.hotelist{
			width: 100%;
				display: flex;
					flex-direction: column;
					align-items: center;
					.gjImg{
						width: 100%;
						height: 100vh;
					}
					.noData{
						width: 300upx;
						margin-top: 20%;
						margin-left: -100upx;
					}
					.rblcok{
						width:160upx;
						height: 60upx;
						border: 1px solid #007aff;
						color: #666;
						text-align: center;
						line-height: 60upx;
						border-radius: 8upx;
						font-size: 20upx;
						margin-top: 20upx;
					}
			.hotels{
				width: 100%;
				display: flex;
				background: #FFFFFF;
				border-top: 4upx solid #F1F1F1;
				.hotleft{
					width: 30%;
					padding: 20upx 0 20upx 20upx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.hotright{
					width: calc(70% - 40upx);
					padding: 15upx 10upx 10upx 30upx;
					.titles{
						width: 100%;
						font-size: 33upx;
						line-height: 50upx;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
					.address{
						width: 100%;
						font-size: 30upx;
						line-height: 40upx;
						color: #9D9D9D;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
					.intros{
						width: 100%;
						font-size: 30upx;
						line-height: 40upx;
						color: #9D9D9D;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.money{
						margin-top: 10upx;
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						color: #FA6803;
						.resGrades{
							display: flex;
						}
						.resGradest{
							display: flex;
							justify-content: center;
							align-items: center;
							.monsle{
								font-size: 25upx;
							}
							.mosrig{
								font-size: 25upx;
								color: #9D9D9D;
							}
						}
					}
				}
			}
		}
		.select-city-wrap{
			position: fixed;
			bottom: -100%;
			left: 0;
			height: 0;
			width: 100%;
			overflow: scroll;
			z-index: 1111;
			background: #edf0f5;	
			.input-op {
				position: fixed;
				z-index: 1000;
				width: calc(100% - 20upx);
				height: 90upx;
				padding: 0 10upx;
				/*  #ifdef  APP-PLUS || MP-WEIXIN */
				padding-top: 60upx;
				/*  #endif  */
				background: $brgk_blue;
				display: flex;
				align-items: center;
				.input-lis {
					margin-left: 10upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 15upx;
					width: 80%;
					height: 65upx;
					background:#FFFFFF;
					border-radius: 65upx;
					position: relative;
					.input-css {
						width: 70%;
						font-size: 30upx;
						height: 60upx;
					}
					
				}
			}
			.selistdp{
				position: fixed;
				z-index: 1000;
				left: 0;
				top: 90upx;
				/*  #ifdef  APP-PLUS || MP-WEIXIN */
				top: 150upx;
				/*  #endif  */
				width: 100%;
				height: 100%;
				overflow: scroll;
				background: #FFFFFF;
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
				.seisno{
					width: 100%;
					height: 50upx;
					line-height: 70upx;
					text-align: center;
					font-size: 30upx;
					color: red;
				}
				.selistval{
					width: 100%;
					height: 70upx;
					font-size: 35upx;
					text-indent: 40upx;
					border-bottom: 2upx solid #C0C0C0;
					line-height: 70upx;
					overflow-x: auto;
					white-space: nowrap;
				}
			}
			.select-city {
				margin-top: 110upx;
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
						.cits_hd{
							flex: 1;
							display: flex;
							justify-content: center;
							align-items: center;
							position: relative;
							.close_hd{
								position: absolute;
								right: 20upx;
								top: 23upx;
							}
							.boxs{
								width: 180upx;
								height: 60upx;
								font-size: 30upx;
								text-align: center;
								line-height: 60upx;
								color: #FFFFFF;
								background: $uni-color-primary;
								border-radius: 10upx;
							}
							.ts_bod{
								color: red;
								font-size: 25upx;
							}
						}
					}
				}
				.index {
					position: fixed;
					right: 0;
					top: 220upx;
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
			&.show {
				bottom: 0;
				height: 100%;
				transition: bottom 0.4s;
			}
			&.hide {
				bottom: -100%;
				height: 100%;
				transition: bottom 0.4s;
			}
		}
	}
</style>
