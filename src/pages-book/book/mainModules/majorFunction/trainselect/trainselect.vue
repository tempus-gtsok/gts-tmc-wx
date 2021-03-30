<template>
	<view class="traindv">
		<loading>
		</loading>
		
		<view class="Navigation">
			<view class="smtis">
				<view @click="rblcok" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
			</view>
			<view class="ongbutns" v-if="transleist">
				<view class="ongleft">
					{{transleist.city.name}} - {{transleist.citys.name}}
				</view>
				<view class="ongright">
					(共{{trainlist.length}}车次)
				</view>
			</view>
			<view class="smtis">
			</view>
		</view>
		<view class="top">
			<datatimes @change="lischang" :isretun="isretun" :ishtoel="ishtoel" :singleDate="singleDate"  :startDate="startDate"></datatimes>
		</view>
		<view class="tranlist" v-if="trainlist!=undefined && trainlist.length > 0">
			<view class="taslist" v-for="(item,index) in trainlist" :key="index" @click="reanlis(item)">
				<view class="taslist_t">
					<view class="taslist_t_l">
						<view class="iconfont" style="font-size: 35upx;margin-right: 10upx;">
							&#xe8a5;
						</view>
						{{times(item.runTimeSpan)}}
					</view>
					<view class="taslist_t_o">
						{{item.trainNo}}
					</view>
					<view class="taslist_t_r" style="font-size: 35upx;">
						￥{{prics(item.seats)}}
					</view>
				</view>
				<view class="taslist_o">
					<view class="taslist_o_l">
						{{item.fromTime}}
					</view>
					<view class="taslist_o_r">
						{{item.fromStation}}
					</view>
				</view>
				<view class="taslist_ts_r">
					<view class="taslist_trl">
						{{item.toTime}}
					</view>
					<view class="">
						{{item.toStation}}
					</view>
				</view>
				<view class="taseats">
					<view class="taseali" v-for="(items,idnexs) in item.seats" v-if="items.seatState == 1" :key="idnexs">
						{{items.seatName}} {{items.seats}}
					</view>
				</view>
				<view style="color: red;font-size: 25upx;" v-if="item.note != undefined">
					{{item.note}}
				</view>
			</view>
		</view>
		<view class="trainImgs" v-else>
			<image class="gjImg" v-if="imgFlag" src="@/static/img/m_ticketList.png" mode=""></image>
			<image class="noData" v-else src="@/static/img/noData.png" mode="widthFix"></image>
			<div class="rblcok" v-if="!imgFlag" @click="rblcok">重新搜索</div>
		</view>
		<view class="selnt">
			<view class="selnts" :class="saiid == item.id ? 'selntrue':''" v-for="(item,index) in sailist" :key="index" @click="saclick(item)">
				<view class="" style="margin: 0 5upx;">
					{{item.name}}
				</view>
				<view class="iconfont" style="font-size: 35upx;" v-if="saiid == item.id && item.id != 4 && item.is == true">&#xe673;</view>
				<view class="iconfont" style="font-size: 35upx;" v-if="saiid == item.id && item.id != 4 && item.is == false">&#xe8a8;</view>
				<view class="iconfont" style="font-size: 35upx;" v-if="saiid != item.id && item.id != 4">{{item.icon}}</view>
				<view class="iconfont" v-if="item.id == 4">&#xe700;</view>
			</view>
		</view>
		<view class="black_mu" @click="cloblac" v-if="blac_show"></view>
		<view class="userlist" :class="shos ? 'show' : ''">
			<view class="userlist_top">
				筛选
			</view>
			<view class="ci_list">
				<view class="skcl_l">
					<view class="">
						车次类型
					</view>
					<label class="" for="sklist" @click="tray">
						 不限
					</label >
				</view>
				<view class="skcl_l">
					<view class="skclist_r">
						<checkbox value="" :disabled="skliis"  @click="tray" :checked="skliis" id="sklist" />
					</view>
				</view>
				<view class="skcl_l" v-for="(item,index) in traintype" :key="index" @click="traic(index)">
					<label class="skclist_r" :for="item.id">
						 {{item.name}}
					</label >
					<view class="">
						<checkbox :value="item.id" :checked="item.ist" :id="item.id" />
					</view>
				</view>
			</view>
			<view class="ci_list">
				<view class="skcl_l">
					<view class="">
						出发/到达站
					</view>
					<label class="" for="skliist" @click="traysok">
						 不限
					</label >
				</view>
				<view class="skcl_l">
					<view class="skclist_r">
						<checkbox value="" :disabled="skliist"  @click="traysok" :checked="skliist" id="skliist" />
					</view>
				</view>
				<view class="stszh">
					<view class="stslist" v-for="(ites,index) in trts" :key="index" @click="trays(index)">
						<label class="" :for="ites.id">
							 {{ites.name}}
						</label>
						<checkbox value="" :checked="ites.is" :id="ites.id" />
					</view>
				</view>
				<view class="stszh">
					<view class="stslist" v-for="(ite,index) in trto" :key="index" @click="traysto(index)">
						<label class="" :for="ite.id" >
							 {{ite.name}}
						</label>
						<checkbox value="" :checked="ite.is" :id="ite.id" />
					</view>
				</view>
			</view>
			<view class="otnblck" @click="trantus">
				确　定
			</view>
		</view>
		<onPageScrolls :scrolltops="scrolltops"></onPageScrolls>
	</view>
</template>

<script>
	import tork from '@/api/torowk.js'
	import datatimes from '@/components/view/book/date-picker/date-picker.vue'
	export default{
		components:{
			datatimes
		},
		data(){
			return{
				scrolltops:false,//是否显示
				isretun: false,
				skliist: true,
				skliis:true,
				shos: false,
				blac_show: false,
				imgFlag:true,
				saiid: 1,
				traintype: [{
					name: '高铁/G/C/D',
					id: 'GDC',
					ist: false
				},{
					name: 'Z-直达特快',
					id: 'Z',
					ist: false
				},{
					name: 'KT-空调特快',
					id: 'KT',
					ist: false
				},{
					name: 'KKS-空调快速',
					id: 'KKS',
					ist: false
				},{
					name: 'KPK-空调普快',
					id: 'KPK',
					ist: false
				}],
				sailist:[{
					name:'出发',
					icon: '\ue62d',
					is: true,
					id:1
				},{
					name: '到达',
					icon: '\ue62d',
					is: true,
					id:2
				},{
					name: '耗时',
					icon: '\ue62d',
					is: true,
					id:3
				},{
					name: '筛选',
					icon: '\ue62d',
					is: true,
					id:4
				}],
				
				
				startDate:'2019-10-26',
				ishtoel:'ticketinqu',
				singleDate: true,
				trainlist: [],//列表数据
				trainlists: [],//复制数据
				trts: [],//出发站点
				trto: [],//到达站点
				tranfrom: '',//出发城市
				tranto: '',//到达城市
				dats: '',//时间
				iscd: false,
				iscalo: '',
				typecon: [],//筛选条件 车类型
				transleist: null,//上个页面传过来的值
				queryKey: '',
				istsetrs: false,
			}
		},
		onLoad(item) {
			let dat = JSON.parse(item.data);
			console.log(dat)
			this.transleist = JSON.parse(item.data)|| {};
			this.dats = dat.timedate;
			this.startDate = dat.timedate;
			this.iscd = dat.sit;
			if(dat.isblcks == 4){
				this.tranfrom = dat.city.id;
				this.tranto = dat.citys.id;
				this.istsetrs = true;
			} else {
				this.tranfrom = dat.city.name;
				this.tranto = dat.citys.name;
			}
			if(this.iscd == true){//如果判断只看高铁
				this.iscalo = 'GDC';
			}
		},
		watch:{
			typecon(item){//监听筛选
				let a = this.trainlists;//当天全部数据
				let c = []
				let fotct = [];
				let torct = [];
				let cts = [];
				let b = this.typecon;//条件
				for (var i = 0; i < this.typecon.length; i++) {
					if(this.typecon[i].name == 'cts'){
						cts = this.typecon[i].value;//车类型
					} else if(this.typecon[i].name == 'toct'){
						torct = this.typecon[i].value;//车类型
					} else if(this.typecon[i].name == 'fotct'){
						fotct = this.typecon[i].value;//车类型
					}
				}
				
				if(cts.length == 0 && fotct.length == 0 && torct.length == 0){
					this.trainlist = this.trainlists;
					return
				}
				for (var i = 0; i < a.length; i++) {
					let si = true;
					if(cts.length > 0){
						for (var k = 0; k < cts.length; k++) {
							if(cts[k].indexOf(a[i].trainClass) == -1){
								si = false;
							} else {
								si = true;
								break;
							}
						}
					}
					if(fotct.length > 0){
						if(fotct.indexOf(a[i].fromStation) == -1){
							si = false;
						}
					}
					if(torct.length > 0){
						if(torct.indexOf(a[i].toStation) == -1){
							si = false;
						}
					}
					if(si){
						c.push(a[i]);
					}
				}
				this.trainlist = c;
			}
		},
		mounted() {
			if(this.transleist.isblcks == 1){
				this.isretun = true
			}	
			this.selelist()
		},
		methods:{
			onPageScroll(res){//距离页面顶部距离
				if(res.scrollTop == 0){
					this.scrolltops = false;
				} else {
					this.scrolltops = true;
				}
			},
			reanlis(item){//点击进入详情
				this.transleist['item'] = item
				this.transleist['queryKey'] = this.queryKey;
				uni.navigateTo({
					url:'./tranlist/teanlist?data=' + JSON.stringify(this.transleist)
				})
			},	
			trays(index,no){//选择出发站
				if(this.trts[index].is){
					this.trts[index].is = false
				} else {
					this.trts[index].is = true
				}
				this.tsys();
			},
			traysto(index){ //选择到达站
				if(this.trto[index].is){
					this.trto[index].is = false
				} else {
					this.trto[index].is = true
				}
				this.tsys();
			},
			tsys(){ //判断出发/到达站是否有选中
				let is = true;
				for (let i = 0; i < this.trto.length; i++) {
					if(this.trto[i].is == true){
						is = false
						break;
					}
				}
				for (let i = 0; i < this.trts.length; i++) {
					if(this.trts[i].is == true){
						is = false
						break;
					}
				}
				if(is){
					this.skliist = true;
				} else {
					this.skliist = false;
				}
			},
			traic(index){ //点击当前筛选车类型
				if(this.traintype[index].ist){
					this.traintype[index].ist = false
				} else {
					this.traintype[index].ist = true
				}
				let is = true
				for (let i = 0; i < this.traintype.length; i++) {
					if(this.traintype[i].ist == true){
						is = false
						break;
					}
				}
				if(is){
					this.skliis = true;
				} else {
					this.skliis = false;
				}
			},
			tray(){ //点击车类型不限
				this.skliis = true;
				for (let i = 0; i < this.traintype.length; i++) {
					this.traintype[i].ist = false;
				}
			},
			traysok(){ //点击站台不限
				this.skliist = true;
				for (let i = 0; i < this.trts.length; i++) {
					this.trts[i].is = false;
				}
				for (let i = 0; i < this.trto.length; i++) {
					this.trto[i].is = false;
				}
			},
			trantus(){ //点击确定筛选
				let trtype = [];
				this.typecon = [];
				for (let i = 0; i < this.traintype.length; i++) {
					if(this.traintype[i].ist == true){
						trtype.push(this.traintype[i].id)
					}	
				}
				this.typecon.push({
					name:'cts',
					value: trtype //车站类型筛选
				})
				let forto = [];//出发站
				let tors = [];
				for (let i = 0; i < this.trts.length; i++) {
					if(this.trts[i].is == true){
						forto.push(this.trts[i].id)
					}
				}
				for (let i = 0; i < this.trto.length; i++) {
					if(this.trto[i].is == true){
						tors.push(this.trto[i].id)
					}
				}
				this.typecon.push({
					name:'fotct',
					value:forto
				})
				this.typecon.push({
					name:'toct',
					value: tors
				})
				console.log(this.typecon)
				this.shos = false;
				this.blac_show = false;
			},
			selist(is){ //排序
				let ids = this.saiid;
				if(ids == 1){
					this.trainlist.sort(this.compare('fotime', is));
				} else if(ids == 2){
					this.trainlist.sort(this.compare('totime', is));
				} else if(ids == 3){
					this.trainlist.sort(this.compare('runTimeSpan', is));
				}
			},	
			compare(property, desc) { //排序方法
				return function(a, b) {
					var value1 = a[property];
					var value2 = b[property];
					if (desc == true) {
						// 升序排列
						return value1 - value2;
					} else {
						// 降序排列
						return value2 - value1;
					}
				}
			},
			saclick(it){ //点击下面排序筛选
				if(it.id == 4){
					this.shos = true;
					this.blac_show = true;
				} else {
					if(this.saiid == it.id){
						if(it.is){
							it.is = false;
						} else {
							it.is = true;
						}
					} else {
						for (var i = 0; i < this.sailist.length; i++) {
							if(this.sailist.id != it.id){
								this.sailist[i].is = true
							}
						}
					}
					this.saiid = it.id;
					this.selist(it.is);
				}
			},
			cloblac(){
				this.shos = false;
				this.blac_show = false;
			},
			prics(item){ //取出当前车最便宜的价格
				let suprice = [];
				for (let i = 0; i < item.length; i++) {
					suprice.push(item[i].price);
				}
				return Math.min.apply(null, suprice);
			},
			async selelist(){//查询数据
				this.trainlists = [];
				let isChange = 0;
				if(this.istsetrs){
					isChange = 1
				}
				
				try{
					const res = await tork.searchTrains({
						from: this.tranfrom,
						to: this.tranto,
						date: this.dats,
						isChange:isChange
					})
					
					if(res.code == 200){
						if(!res.data){
							this.showToasts("没有合适的火车信息")
							this.imgFlag = false
						}
						this.queryKey = res.data.queryKey;
						this.trainlist = res.data.trains;//火车信息
						let trs = res.data.froms;
						this.trts = [];
						this.trto = [];
						for (let i = 0; i < trs.length; i++) { //出发站
							this.trts.push({
								name: trs[i].station,
								id: trs[i].station,
								is : false
							})
						}
						let trts = res.data.tos;
						for (let i = 0; i < trts.length; i++) { //到达站
							this.trto.push({
								name: trts[i].station,
								id: trts[i].station,
								is : false
							})
						}
						let reg = new RegExp(":")
						for (let i = 0; i < this.trainlist.length; i++) { //判断是否有座位
							let st = [];
							if(this.trainlist[i].tickets.hardseat != null){ //硬座
								st.push(this.trainlist[i].tickets.hardseat)
							}
							if(this.trainlist[i].tickets.noseat != null){ //无座
								st.push(this.trainlist[i].tickets.noseat)
							}
							if(this.trainlist[i].tickets.hardsleepermid != null){ //硬卧中铺
								st.push(this.trainlist[i].tickets.hardsleepermid)
							}
							if(this.trainlist[i].tickets.softsleeperdown != null){ //软卧下铺
								st.push(this.trainlist[i].tickets.softsleeperdown)
							}
							if(this.trainlist[i].tickets.softseat != null){ //软座
								st.push(this.trainlist[i].tickets.softseat)
							} else if(this.trainlist[i].tickets.firstseat != null){ //一等坐
								st.push(this.trainlist[i].tickets.firstseat)
							}
							if(this.trainlist[i].tickets.secondseat != null){ //二等坐
								st.push(this.trainlist[i].tickets.secondseat)
							}
							if(this.trainlist[i].tickets.hardsleeperup != null){ //硬卧上铺
								st.push(this.trainlist[i].tickets.hardsleeperup)
							}
							if(this.trainlist[i].tickets.hardsleeperdown != null){ //硬卧下铺
								st.push(this.trainlist[i].tickets.hardsleeperdown)
							}
							if(this.trainlist[i].tickets.softsleeperup != null){ //软卧上铺
								st.push(this.trainlist[i].tickets.softsleeperup)
							}
							if(this.trainlist[i].tickets.businessseat != null){ //商务坐
								st.push(this.trainlist[i].tickets.businessseat)
							}
							this.trainlist[i]['dats'] = this.dats;//当前日期
							this.trainlist[i]['seats'] = st
							this.trainlist[i]['fotime'] = this.trainlist[i].fromTime.replace(reg,""); //开始时间数字
							this.trainlist[i]['totime'] = this.trainlist[i].toTime.replace(reg,""); //到达时间数字
							let tiems = this.trainlist[i].fromTime.split(':');
							let stime = parseInt(tiems[0]) * 60 + parseInt(tiems[1]) + parseInt(this.trainlist[i].runTimeSpan);//总分钟数
							let a = parseInt(stime/(24 * 60));
							this.trainlist[i]['days'] = a;//总天数
							let totiem = new Date((((new Date(this.dats.replace(/-/g, '/'))).getTime())/1000 + (a * 24 * 60 * 60)) * 1000)
							let year = totiem.getFullYear(); //当前年
							let month = this.tim(totiem.getMonth() + 1); //当前月份
							let day = this.tim(totiem.getDate()); //当天
							this.trainlist[i]['toTrainDate'] = year + '-' + month + '-' + day //到达日期
						}
						this.selist(true);//默认排序
						this.trainlists = [...this.trainlist];
						if(this.iscalo == 'GDC'){
							this.typecon.push({name:'cts',value:['GDC']})
						}
					} else {
						this.showToasts(res.message)
					}
				}catch(e){
					console.log(e)
					
				}
			},
			tim(time){ //补0
				if(time < 10){
					return '0' + time
				} else {
					return time
				}
			},
			times(time){
				let dat = parseInt(time/60);
				let sti = ''
				if(time > dat * 60){
					sti = time - (dat * 60);
					return dat + '时' + sti + '分'
				} else {
					return dat + '时'
				}
			},
			lischang(item){
				if(item.choiceDate.re != this.dats){
					this.dats = item.choiceDate.re
					this.selelist()
				}
			},
			rblcok(){
				// #ifdef H5
				history.back();
				// #endif
				// #ifdef MP-WEIXIN
				uni.navigateBack()
				// #endif
			}
		}
	}
</script>

<style>
	page{background-color: #efefef;}
</style>
<style scoped lang="scss">
	.traindv{
		width: 100%;
		.top{
			width: 100%;
			font-size: 35upx;
			background-color: #FFFFFF;
			border-bottom: 2upx solid #F1F1F1;
		}
		.black_mu {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: black;
			opacity: 0.5;
			z-index: 888;
		}
		.userlist {
			position: fixed;
			bottom: 0;
			left: 0;
			transition: all 0.3s ease;
			-webkit-transform: translateY(100%);
			transform: translateY(100%);
			min-height: 200upx;
			width: 100%;
			z-index: 889;
			background: #ffffff;
			.userlist_top {
				height: 90upx;
				width: 100%;
				line-height: 90upx;
				background: #f1f1f1;
				text-align: center;
			}
			.ci_list {
				width: calc(100% - 40upx);
				padding: 20upx;
				font-size: 35upx;
				display: flex;
				flex-wrap: wrap;
				align-content: space-between;
				border-bottom: 2upx solid #F1F1F1;
				.skcl_l{
					width: calc(50% - 40upx);
					height: 70upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-right: 40upx;
					.skclist_r{
						padding-left: 20upx;
					}
				}
				.stszh{
					width: 50%;
					.stslist{
						width: calc(100% - 60upx);
						padding:0 40upx 0 20upx;
						height: 70upx;
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
				}
			}
			.otnblck{
				margin: 40upx 20upx;
				width: calc(100% - 40upx);
				height: 90upx;
				line-height: 90upx;
				text-align: center;
				color: #FFFFFF;
				border-radius: 15upx;
				background: #004890;
			}
		}
		.show {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}
		.selnt{
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 1;
			width: 100%;
			height: 100upx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: rgba(60,76,89,0.9);
			.selnts{
				flex: 1;
				color: #FFFFFF;
				font-size: 30upx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.selntrue{
				color: #E3B002;
			}
		}
		.tranlist{
			width: calc(100% - 40upx);
			padding: 0 20upx;
			padding-bottom: 120upx;
			.taslist{
				width: calc(100% - 40upx);
				margin-top: 20upx;
				padding: 40upx 20upx 20upx 20upx;
				border-radius: 10upx;
				background-color: #FFFFFF;
				.taslist_t{
					display: flex;
					align-items: center;
					justify-content: center;
					color: #777777;
					font-size: 28upx;
					height: 45upx;
					.taslist_t_l{
						width: 42%;
						line-height: 45upx;
						display: flex;
					}
					.taslist_t_o{
						width: 42%;
					}
					.taslist_t_r{
						width: 16%;
						text-align: right;
						color: #FF3404;
					}
				}
				.taslist_o{
					display: flex;
					font-size: 42upx;
					height: 60upx;
					line-height: 60upx;
					.taslist_o_l{
						width: 40%;
					}
				}
				.taslist_ts_r{
					display: flex;
					color: #333333;
					font-size: 28upx;
					line-height: 70upx;
					.taslist_trl{
						text-indent: 4upx;
						width: 40%;
					}
				}
				.taseats{
					width: 100%;
					display: flex;
					font-size: 28upx;
					color: #777777;
					.taseali{
						padding-right: 40upx;
					}
				}
			}
		}
		.trainImgs{
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
		}
		.Navigation{
			.ongbutns{
				width: 86%;
				color: #FFFFFF;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				.ongleft{
					font-size: 38upx;
				}
				.ongright{
					margin-left: 20upx;
					font-size: 30upx;
				}
			}
		}
	}
</style>
