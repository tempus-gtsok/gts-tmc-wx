<template>
	<view class="carlist">
		<loading>
		</loading>
		<view class="carover" v-if="cartype == 2 || cartype == 5 || cartype == 10 || cartype == 11 || cartype == 12 || cartype == 13 || cartype == 14 ||cartype == 16 || cartype == 1 || cartype == 7 || cartype == 8 || cartype == 9">
			<view class="Navigation">
				<view class="smtis">
					<view @click="rblcok" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
				</view>
				<view class="ongbutn" v-if="cartype == 5 && (cararr.payStatus == 1 || cararr.payStatus == 2) && cararr.premium != null && cararr.premium > 0">
					已取消待支付
				</view>
				<view class="ongbutn" v-else>
					{{statsname(cartype)}}
				</view>
				<view class="smtis">
				</view>
			</view>
		</view>
		<view class="disdit" v-if="cartype == 3 || cartype == 4 ||  cartype == 7 || cartype == 8 || cartype == 9 || cartype == 15">
			<view class="distop">
				<view class="disleft">
					<view class="disfot">
						<image src="@/static/img/carbus/driverfoto.png" mode=""></image>
					</view>
					<view class="dispan" v-if="cararr.carSaleOrderDriver != null">
						<view>
							{{cararr.carSaleOrderDriver.driverName}} <span class="iconfont" style="font-size: 28upx;color: #F9EE57;">&#xe63e;</span>{{cararr.carSaleOrderDriver.driverScore}}
						</view>
						<view class="carpot">
							{{cararr.carSaleOrderDriver.vehicleNo}}
						</view>
						<view>
							{{cararr.carSaleOrderDriver.vehicleModel}}
						</view>
					</view>
				</view>
				<view class="disright">
					<view class="iconfont" style="font-size: 80upx;color: #64C463;" @click="tel">
						&#xe64c;
					</view>
				</view>
			</view>
			<view class="cartypes" v-if="cartype == 3 || cartype == 4 || cartype == 15">
				<view class="carimg">
					<image v-if="carlogoimg != ''" :src="carlogoimg" mode=""></image>
					<image v-else src="@/static/img/login/logo.png" mode=""></image>
				</view>
				<span style="margin: 0 20upx;">{{cararr.carSupplierTypeName}}</span>
				<span style="font-size: 26upx;">最快接单，将为您提供本次服务</span>
			</view>
		</view>
		<view style="width: 100%;text-indent: 30upx;line-height: 40upx;margin-top: 20upx;" v-if="cartype == 7 || cartype == 8 || cartype == 9">
			{{statsname(cartype)}}
		</view>
		<view class="statusl" v-if="cartype == 2 || cartype == 5 ||cartype == 10 || cartype == 11 || cartype == 12 || cartype == 13 || cartype == 14 ||cartype == 16 ||cartype == 7 || cartype == 8 || cartype == 9">
			<view class="stname">
				<view >
					<span class="iconfont" style="margin-right: 10upx;">&#xe648;</span>
					{{cararr.createTime}}
				</view>
				<view style="line-height: 60upx;" v-if="cartype == 2 ||cartype == 10 || cartype == 11 || cartype == 12 || cartype == 13 || cartype == 14 ||cartype == 16 ">
					{{sercname(cararr.serviceId)}}
				</view>
				<view class="carfonto" v-if="cartype == 7 || cartype == 8 || cartype == 9">
					<image v-if="carlogoimg != ''" :src="carlogoimg" mode=""></image>
					<image v-else src="@/static/img/login/logo.png" mode=""></image>
					<p>{{cararr.carSupplierTypeName}}</p>
					<view class="carpot" style="margin-left: 20upx;font-size: 30upx;">
						{{cararr.carSaleOrderDriver.vehicleNo}}
					</view>
					<view class="carpot" style="margin-left: 20upx;font-size: 30upx;">
						{{carGroupname}}
					</view>
				</view>
				<view class="cacitys">
					<view class="catleft">
						<view class="ca_x">
							<view class="ca_xs">
							</view>
						</view>
					</view>
					<view class="adresx" >
						<view class="ctiemns" >
							{{cararr.startName}}
						</view>
					</view>
				</view>
				<view class="cacitys">
					<view class="catleft">
						<view class="ca_x" style="border: 2upx solid #F98B2A;">
							<view class="ca_xs" style="background-color: #F98B2A;">
							</view>
						</view>
					</view>
					<view class="adresx" >
						<view class="ctiemns" >
							{{cararr.endName}}
						</view>
					</view>
				</view>
				<view style="line-height: 60upx;">
					乘车人：{{cararr.passengerName}} {{cararr.passengerMobile}}
				</view>
				<view v-if="cararr.departureTime != null">
					用车时间：{{cararr.departureTime}}
				</view>
				<view v-if="cartype == 10 || cartype == 11 || cartype == 12 || cartype == 13">
					预估金额：：<span class="pricsy">{{cararr.estimateAmount}}元</span>
				</view>
				<view v-if="(cartype == 5 || cartype == 14) && gprice > 0">
					取消费用：：<span class="pricsy">{{gprice}}元</span>
				</view>
				<view v-if="(cartype == 8 && cararr.supplierPaymentStatus == 'paid' )|| cartype == 9 || cartype == 16" class="pricenum">
					<view class="">
						总金额：<span class="pricsy">{{gprice}}元</span>
					</view>
					<view @click="care_d(cararr)" style="display: flex;align-items: center;height: 50upx;" v-if="cartype == 8 || cartype == 9">
						费用明细 <span class="iconfont">&#xe8a3;</span>
					</view>
				</view>
				<view class="bordop" v-if="(cartype == 5&&gprice > 0 )||cartype == 10 || cartype == 11 || cartype == 12 || cartype == 13 || cartype == 14 ||cartype == 16 ||cartype == 7 || cartype == 8 || cartype == 9">
					<view class="borlisop">
						<view class="bordlist" v-for="(item,index) in acelist" :key="index">
							{{item.name}}
						</view>
					</view>
					
					<view class="bordlists" v-for="(item,indexs) in carposi" :key="indexs">
						<view class="bordlist">
							{{item.name}}
						</view>
						<view class="bordlist">
							{{item.costCenterName}}
						</view>
						<view class="bordlist">
							{{item.percent}}%
						</view>
						<view class="bordlist pricsy">
							{{gprices(item.percent,gprice)}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="noplst" v-if="cartype == 10">
			待审核
		</view>
		<view class="noplst openplst" v-if="cartype == 11" @click="openplst">
			点击继续叫车
		</view>
		<view class="noplst payment" v-if="cartype == 8 && cararr.supplierPaymentStatus == ''">
			正在计算实际金额，请稍等...
		</view>
		<paybtns businessType="2" productType="13" :recordNo="recordNos" :amount="amounts" @payok="payok" v-if="cartype == 5  && (cararr.payStatus== 1 || cararr.payStatus== 2) && cararr.premium != null && cararr.premium > 0"></paybtns>
		<paybtns businessType="2" productType="13" :recordNo="recordNos" :amount="amounts" @payok="payok" v-if="cartype == 16 && (cararr.payStatus== 1 || cararr.payStatus== 2) && cararr.tmsOsTransationorderExtend.settlement == 1"></paybtns>
		<map id="midMap" :style=" {width: '100%',height: screenHeights + 'px'}" v-if="ismap"  :show-location="true" :polyline="polyline"  :include-points="include_points" class="carmap" :latitude="latitude" :longitude="longitude" :scale="scale"   :markers="markers" >
			<cover-view class="dispatclose" v-if="cartype == '3' || cartype == '4' || cartype == '15'">
				<cover-view class="btns" @click="cancel">
					取消
				</cover-view>
			</cover-view>
			<cover-view class="cat_bootom" v-if="cartype == '1'">
				<cover-view class="cat_tp">
					<cover-view class="cattext">
						正在全力呼叫车辆 . . .
					</cover-view>
					<cover-view class="cat_ts">
						<cover-view class="carlisty" v-for="(item,index) in platform" :key="index" @click="catcedk(item)">
							<cover-view class="carleft">
								<cover-view class="carlog">
									<cover-image v-if="item.url != ''" :src="item.url" mode=""></cover-image>
									<cover-image v-else src="@/static/img/login/logo.png" mode=""></cover-image>
								</cover-view>
								<cover-view class="carnames">
									{{item.name}}
								</cover-view>
							</cover-view>
							<cover-view class="carright">
								<cover-view class="carprice">
									<cover-view>预估</cover-view><cover-view class="carprices">{{item.price}}</cover-view><cover-view>元</cover-view>
								</cover-view>
							</cover-view>
						</cover-view>
					</cover-view>
				</cover-view>
				
				<cover-view class="btns" @click="cancels">
					取消
				</cover-view>
			</cover-view>
			
			<cover-view class="sixtop" v-if="cartype == '6'">
				<cover-view class="antbns">
					正在前往目的地，剩余{{distance}}，预计行驶{{duration}}
				</cover-view>
			</cover-view>
			<cover-view class="sixlist" v-if="cartype == '6'">
				<cover-view class="distop">
					<cover-view class="disleft">
						<cover-view class="disfot">
							<cover-image src="@/static/img/carbus/driverfoto.png" mode=""></cover-image>
						</cover-view>
						<cover-view class="dispan">
							<cover-view class="carpot">
								{{cararr.carSaleOrderDriver.vehicleNo}}　{{cararr.carSaleOrderDriver.vehicleModel}}
							</cover-view>
							<cover-view style="display: flex;">
								<cover-view>{{cararr.carSaleOrderDriver.driverName}}</cover-view>
								<cover-image class="car_imgs" src="@/static/img/carbus/car_xing.png" mode=""></cover-image>
								<cover-view style="margin-left: 10upx;">{{cararr.carSaleOrderDriver.driverScore}}</cover-view>
							</cover-view>
							
						</cover-view>
					</cover-view>
					<cover-view class="disright">
						<cover-image class="dis_imgs" @click="tel" src="@/static/img/carbus/car_phone.png" mode=""></cover-image>
					</cover-view>
				</cover-view>
				<cover-view class="inpos" @click="tels">
					<cover-image class="in_imgs" src="@/static/img/carbus/car_bj.png" mode=""></cover-image>
					<cover-view class="inposli" >
						紧急求救
					</cover-view>
					<!-- <view class="inposli">
						行程分享
					</view> -->
				</cover-view>
			</cover-view>
		</map>
	</view>
</template>

<script>
	import order from '@/api/order.js'
	import totok from '@/api/torowk.js'
	let appMap = null;
	let gdkey = "f34355ae385ced7460e7b1aa59934074";
	export default{
		data(){
			return{
				carGroupname:'',//车类型
				carlogoimg:'',//平台logo
				fouts:false,//司机到达状态默认
				gprice:0,//总价
				carposi:[],
				acelist:[{
					name:'适用人员',
				},{
					name:'成本中心'
				},{
					name:'分摊比例'
				},{
					name:'分摊金额'
				}],
				cararr:{},
				ismap:false,
				driver:[],//司机信息
				cartype:'',//订单状态
				polyline:[],//路线规划
				include_points:[],
				scale:18,
				longitude: 0,
				latitude: 0,
				markers: [],
				distance:0,//距离多远
				duration:0,//距离多久
				or:{
					location:'114.057640,22.502941',
					name:'我所在地'
				},
				end:{
					location:'114.059747,22.507804',
					name:'司机所在地'
				},
				ismidmap:true,
				catynum:1,
				isinter:false,
				platform:[],//预估车金额车类型
				saleOrderNo:0,
				tradeNo:'',//单号
				settime:null,
				isprice:false,
				sixap:false,
				carlists:[],//平台类型
				vehicletype:[],//车类型
				its:0,
				recordNos: 0,
				amounts: 0,
				screenHeights:1100
			}
		},
		onReady(options) {
			this.screenHeights = uni.getSystemInfoSync().screenHeight;//高度等于屏幕的4/3
			appMap = uni.createMapContext("midMap", this);
		},
		onLoad(list) {
			this.its = list.its;
			this.tradeNo = list.data;//单号
			this.salelist();
		},
		onUnload() { //销毁定时器
			if(this.settime) {
			    clearInterval(this.settime);  
			    this.settime = null;  
			}
		},
		mounted() {
			if(this.settime != null){
				clearInterval(this.settime);
				this.settime = null;
			}
			this.settime = setInterval(()=>{
				this.salelist()
			},5000)
		},
		methods:{
			payok(){
				this.salelist();
			},
			care_d(va){
				va['cartypename'] = this.carGroupname;
				uni.navigateTo({
					url:'carExpensedetails?data=' + JSON.stringify(va)
				})
			},
			// async cartypes(){
			// 	let res = await totok.getPlatFormUseCar();//平台类型
			// 	if(res.code == 200){
			// 		this.carlists = [];
			// 		let da = res.data;
			// 		for (let k in da) {
			// 			this.carlists.push({
			// 				img:da[k].supplierLogoUrl,
			// 				name:da[k].supplierTypeName,
			// 				carid:false,
			// 				id:k,
			// 				price: 0
			// 			})
			// 		}
			// 	} else {
			// 		uni.showToast({
			// 			title:res.message,
			// 			duration:1000,
			// 			icon:'none'
			// 		})
			// 	}
			// 	let redt = await totok.getUseCarType(); //车类型
			// 	if(redt.code == 200){
			// 		this.vehicletype = [];
			// 		let das = redt.data;
			// 		for (let k in das) {
			// 			this.vehicletype.push({
			// 				name:das[k],
			// 				id:k,
			// 			})
			// 		}
			// 	} else {
			// 		uni.showToast({
			// 			title:redt.message,
			// 			duration:1000,
			// 			icon:'none'
			// 		})
			// 	}
			// 	if(this.cararr.carSupplierTypeNo != null && this.cararr.carSupplierTypeNo !=null){
			// 		if(this.carlistsva(this.cararr.carSupplierTypeNo) != undefined ){
			// 			this.carlogoimg = this.carlistsva(this.cararr.carSupplierTypeNo) ;
			// 		}
			// 		this.carGroupname = this.vehicletypeva(this.cararr.carGroupId);
			// 	}
				
			// },
			gprices(i,k){
				return parseFloat(k * (i/100)).toFixed(2)
			},
			// carlistsva(va){ //获取用车平台logo
			// 	for(let k in this.carlists){
			// 		if(va == this.carlists[k].id){
			// 			return this.carlists[k].img
			// 		}
			// 	}
			// },
			// vehicletypeva(va){ //获取用车平台logo
			// 	for(let k in this.vehicletype){
			// 		if(va == this.vehicletype[k].id){
			// 			return this.vehicletype[k].name
			// 		}
			// 	}
			// },
			async openplst(){ //立即叫车
				let _this = this;
				try{
					let res = await order.apprvPass({
						saleOrderNo: this.saleOrderNo
					})
					
					if(res.code != 200){
						_this.showToasts(res.message);
					} else{
						_this.showToasts('正在叫车!');
						setTimeout(()=>{
							_this.isprice =false;
							_this.salelist();
							if(_this.settime != null){
								clearInterval(_this.settime);
								_this.settime = null;
							}
							_this.settime = setInterval(()=>{
								_this.salelist()
							},3000)
						},1000)
					}
				}catch(e){
					
					//TODO handle the exception
				}
			},
			sercname(id){
				if(id == 4){
					return '现在约车'
				}else if(id== 3){
					return '预约约车'
				} else if(id ==  1){
					return '接机'
				} else if(id == 2){
					return '送机'
				}
			},
			statsname(id){
				let arr = [{
					id:1,
					name:'正在叫车'
				},{
					id:2,
					name:'订单已无效'
				},{
					id:3,
					name:'已派单'
				},{
					id:4,
					name:'已到达'
				},{
					id:5,
					name:'已取消'
				},{
					id:6,
					name:'已开始服务'
				},{
					id:7,
					name:'已结束服务'
				},{
					id:8,
					name:'已提交费用'
				},{
					id:9,
					name:'已完成'
				},{
					id:10,
					name:'待审批'
				},{
					id:11,
					name:'审批通过'
				},{
					id:12,
					name:'审批拒绝'
				},{
					id:13,
					name:'审批超时'
				},{
					id:14,
					name:'取消中'
				},{
					id:15,
					name:'已出发'
				},{
					id:16,
					name:'待支付'
				}]
				for(let i in arr){
					if(arr[i].id == id){
						return arr[i].name
					}
				}
			},
			async salelist(){
				try{
					let res = await order.getUseCarOrderDetail({ //获取当前订单详情
						tradeNo: this.tradeNo
					})
					if(res.code == 200){
						let da = res.data;
						this.saleOrderNo = da.saleOrderNo;//单号
						this.cartype = da.status;//状态
						this.cararr= da;
						this.carposi = [];
						for (let k in da.carSaleOrderDetail) {
							this.carposi.push({
								name:da.carSaleOrderDetail[k].passengerName,
								costCenterName:da.carSaleOrderDetail[k].costCenterName,
								percent:da.carSaleOrderDetail[k].percent * 100,
							})
						}
						
						//获取预约金额
						if((this.cartype == 10 || this.cartype == 11 || this.cartype == 12 || this.cartype == 13 || this.cartype == 1) && this.cararr.serviceId == 4){
							if(this.isprice == true){ //判断只获取一次当前接口
								return
							}
							let ret = await order.getUseCarEstimateData({ //获取预估金额
								saleOrderNo: this.saleOrderNo
							})
							this.isprice = true;
							if(ret.code == 200){
								let platform =  ret.data;
								this.platform= [];
								for (let k in platform.platformOrderInfo) {
									for (let p in platform.platFormSetting) {
										if(platform.platformOrderInfo[k].carPlatformCode == p){
											this.platform.push({
												name:platform.platFormSetting[p].supplierTypeName,
												price: platform.platformOrderInfo[k].estimatePrice,
												url:platform.platFormSetting[p].supplierLogoUrl
											})
										}
									}
								}
							} else {
								uni.showToast({
									title:ret.message,
									duration:2000,
									icon:'none'
								})
							}
						}
						
						if(this.cartype == 1 && this.cararr.serviceId == 4){ //正在叫车 才有倒计时

						} else {
							this.carlogoimg = this.cararr.carSupplierTypeLogo;
						}
						if(this.cartype == 15 || this.cartype == 4 || this.cartype == 6){ //获取司机位置
							if(this.fouts && this.cartype == 5){
								return
							}
							try{
								let rsev = await order.getDriverLocation({
									platFormKey: this.cararr.carSupplierTypeNo,
									outOrderId: this.cararr.supplierOrderId
								})
								if(rsev.code == 200){ //司机位置
									this.end.location = rsev.data.driverLng + ',' + rsev.data.driverLat
								}
							}catch(e){
								//TODO handle the exception
							}
						}
						
						if(this.cartype == 9 || this.cartype == 10 || this.cartype == 11 || this.cartype == 12 || this.cartype == 13 || this.cartype== 5 || this.cartype== 16){ //审核状态
							this.ismap = false;//是否需要地图
							if(this.settime != null){ //等待状态  清楚定时器
								clearInterval(this.settime);
								this.settime = null;
							}
						} else {
							if(this.cartype == 8 && this.cararr.supplierPaymentStatus == ''){
								if(this.settime != null){ //等待状态  清楚定时器
									clearInterval(this.settime);
									this.settime = null;
								}
								this.settime = setInterval(()=>{
									this.salelist()
								},1000)
							}	
							this.isinter = true;
							this.setmap(this.catynum);
							
						}
						if(this.cartype == 8 || this.cartype == 9|| this.cartype == 16){ //获取结束后的总金额
							this.gprice = da.premium;
						}
						if(this.cartype == 5 || this.cartype == 14 ){
							if(da.premium > 0){
								this.gprice = da.premium;
							}
						}
						
						this.recordNos = this.saleOrderNo;
						this.amounts = this.gprice;
					}
				}catch(e){
					if(this.settime) {
					    clearInterval(this.settime);  
					    this.settime = null;  
					}
					//TODO handle the exception
				}
			},
			cancel(){//订单取消
				if(this.settime) {
					clearInterval(this.settime);  
					this.settime = null;  
				}
				uni.navigateTo({
					url:'car_cancel?saletype=' + this.cararr.tmsOsTransationorderExtend.settlement +'&data=' + this.tradeNo + '&id=' + this.cararr.carSupplierTypeNo + '&saleOrderNo=' + this.saleOrderNo
				})
			},
			async cancels(){//未接单之前取消
				let _this = this;
				
				try{
					let res = await order.carCancelOrder({
						saleOrderNo: _this.saleOrderNo,
						force:false,
						reason:'1',
						reasonId:''
					});
					
					if(res.code == 200){
						uni.showToast({
							title:'取消成功',
							duration:1000,
							icon:'none'
						})
						setTimeout(()=>{
							_this.salelist();
						},1000)
					} else {
						uni.showToast({
							title:res.message,
							duration:1000,
							icon:'none'
						})
					}
				}catch(e){
					
					//TODO handle the exception
				}
			},
			async setmap(catynum){//生成路线图
				if(this.cartype == '1' || this.cartype == '3'){ //正在叫车 - 司机已接单
					this.ismap = true;//是否需要地图
					this.longitude = this.cararr.slng;
					this.latitude = this.cararr.slat;
					// if(this.markers.length == 0){
					// 	this.markers = [{
					// 	        latitude: this.cararr.slat,
					// 	        longitude: this.cararr.slng,
					// 	        // iconPath: '../../../../static/img/carbus/locasts.png',
					// 			width:20,//图标大小
					// 			height:20,
					// 			callout:{
					// 				content: this.cararr.startName,
					// 				color: '#000000',
					// 				fontSize:10,
					// 				display:'ALWAYS',
					// 				borderRadius:10
					// 			},
					// 			anchor:{x:.5,y:.5} //图标偏移位置
					// 	}]
					// }
				} else if(this.cartype == '15'){ //司机正在路上
					this.ismap = true;//是否需要地图
					this.or.location = this.cararr.slng + ',' + this.cararr.slat;
					let ors = this.or.location.split(',');//我的位置
					let ends = this.end.location.split(',');//司机位置
					
					if(catynum == 1){
						let ds = 0;
						let dtp = 0;
						let dsr = 0;
						let dtr = 0;
						
						let latitudes = '';
						let longitudets = '';
						let latitudets = '';
						let longitudes = '';
						
						
						
						if(ors[1] > ends[1]){//以上下 来决定哪个为中心点
							ds =this.sub(ors[1],ends[1]); //两个相差多远
							dtp= this.accad(ds,3);//相差3分之1的距离
							this.latitude = this.add(ends[1],dtp);//中心点多偏移 3分之1的距离
							latitudets = this.add(ors[1],dtp);//缩放时，最远的点多加3分之1的距离
						} else {
							ds = this.sub(ends[1],ors[1]);
							dtp = this.accad(ds,3);
							this.latitude = this.add(ors[1],dtp);
							
							latitudes = this.add(ends[1],dtp);
						}
						if(ors[0] > ends[0]){//以左右 来决定哪个为中心点
							dsr =this.sub(ors[0],ends[0]); //两个相差多远
							dtr= this.accad(dsr,2);//以最中间为中心点
							this.longitude = this.add(ends[0],dtr);//中心点多偏移 3分之1的距离
							
							longitudets = this.add(ors[0],dtr);
						} else {
							dsr = this.sub(ends[0],ors[0]);
							dtr = this.accad(dsr,2);
							this.longitude = this.add(ors[0],dtr);;
							
							longitudes =  this.add(ends[0],dtr);
						}
						this.include_points = [{ //根据两个点缩放地图的大小
							latitude: latitudes == '' ? ends[1] : latitudes,
							longitude: longitudes == '' ? ends[0] : longitudes
						},{
							latitude: latitudets == '' ? ors[1] : latitudets,//缩放时，最远的点多加3分之1的距离
							longitude: longitudets == '' ? ors[0] : longitudets
						}]
					}
					this.parametes( ends[1] + ','  + ends[0],ors[1] + ',' + ors[0]);
					this.markers = [{
						latitude: ors[1],
						longitude: ors[0],
						iconPath: '../../../../../static/img/carbus/locations.png',
						width:20,//图标大小
						height:20,
						callout:{
							content: this.or.name,
							color: '#000000',
							fontSize:10,
							display:'ALWAYS',
							borderRadius:10,
							padding:5
						},
						anchor:{x:.5,y:1} //图标偏移位置
					},{
						latitude: ends[1],
						longitude: ends[0],
						iconPath: '../../../../../static/img/carbus/cats.png',
						width:20,//图标大小
						height:20,
						callout:{
							content: '距您'+ this.distance + ',预计' + this.duration + '到达' ,
							color: '#000000',
							fontSize:10,
							display:'ALWAYS',
							borderRadius:10,
							padding:5
						},
						anchor:{x:.5,y:.7} //图标偏移位置
					}]
					this.catynum == 2
				} else if(this.cartype == '4'){ //已到达
					if(this.fouts){
						return
					}
					this.ismap = true;//是否需要地图
					this.longitude = this.cararr.slng; //我的位置
					this.latitude = this.cararr.slat;
					this.polyline = [];
					let ors = this.or.location.split(',');//我的位置
					let ends = this.end.location.split(',');//司机位置
					this.include_points = [{ //根据两个点缩放地图的大小
						latitude: parseFloat(ends[1]),
						longitude: parseFloat(ends[0]),
					},{
						latitude: parseFloat(ors[1]),
						longitude: parseFloat(ors[0])
					}]
					
					this.markers = [];
					this.markers = [{
						latitude: ors[1],
						longitude: ors[0],
						iconPath: '../../../../static/img/carbus/locations.png',
						width:20,//图标大小
						height:20,
						callout:{
							content: this.or.name,
							color: '#000000',
							fontSize:10,
							display:'ALWAYS',
							borderRadius:10,
							padding:5
						},
						anchor:{x:.5,y:1} //图标偏移位置
					},{
						latitude: ends[1],
						longitude: ends[0],
						iconPath: '../../../../static/img/carbus/cats.png',
						width:20,//图标大小
						height:20,
						callout:{
							content: '司机已到达，请您尽快上车' ,
							color: '#000000',
							fontSize:10,
							display:'ALWAYS',
							borderRadius:10,
							padding:5
						},
						anchor:{x:.5,y:.7} //图标偏移位置
					}]
					this.fouts = true;
				} else if(this.cartype == '6'){ //服务中
					if(!this.sixap){
						this.ismap = true;//是否需要地图
					}
					
					this.or.location = this.cararr.elng + ',' + this.cararr.elat; //目的地位置
					this.or.name = this.cararr.endName;
					
					let ors = this.or.location.split(',');//目的位置
					let ends = this.end.location.split(',');//司机位置
					if(!this.sixap){
						let ds = 0;
						let dtp = 0;
						let dsr = 0;
						let dtr = 0;
						
						let latitudes = '';
						let longitudets = '';
						let latitudets = '';
						let longitudes = '';
						
						if(ors[1] > ends[1]){//以上下 来决定哪个为中心点
							ds =this.sub(ors[1],ends[1]); //两个相差多远
							dtp= this.accad(ds,3);//相差3分之1的距离
							this.latitude = this.add(ends[1],dtp);//中心点多偏移 3分之1的距离
							latitudets = this.add(ors[1],dtp);//缩放时，最远的点多加3分之1的距离
						} else {
							ds = this.sub(ends[1],ors[1]);
							dtp = this.accad(ds,3);
							this.latitude = this.add(ors[1],dtp);
							latitudes = this.add(ends[1],dtp);
						}
						if(ors[0] > ends[0]){//以左右 来决定哪个为中心点
							dsr =this.sub(ors[0],ends[0]); //两个相差多远
							dtr= this.accad(dsr,2);//以最中间为中心点
							this.longitude = this.add(ends[0],dtr);//中心点多偏移 3分之1的距离
							longitudets = this.add(ors[0],dtr);
						} else {
							dsr = this.sub(ends[0],ors[0]);
							dtr = this.accad(dsr,2);
							this.longitude = this.add(ors[0],dtr);;
							longitudes =  this.add(ends[0],dtr);
						}
						
						this.include_points = [{ //根据两个点缩放地图的大小
							latitude: latitudes == '' ? ends[1] : latitudes,
							longitude: longitudes == '' ? ends[0] : longitudes
						},{
							latitude: latitudets == '' ? ors[1] : latitudets,//缩放时，最远的点多加3分之1的距离
							longitude: longitudets == '' ? ors[0] : longitudets
						}]
					}
					this.parametes(ends[1] + ','  + ends[0],ors[1] + ',' + ors[0]);
										
					this.markers = [];
					this.markers = [{
						latitude: ors[1],
						longitude: ors[0],
						iconPath: '../../../../../static/img/carbus/locations.png',
						width:20,//图标大小
						height:20,
						callout:{
							content: this.or.name,
							color: '#000000',
							fontSize:10,
							display:'ALWAYS',
							borderRadius:10,
							padding:5
						},
						anchor:{x:.5,y:1} //图标偏移位置
					},{
						latitude: ends[1],
						longitude: ends[0],
						iconPath: '../../../../../static/img/carbus/cats.png',
						width:20,//图标大小
						height:20,
						callout:{
							content: '我的位置' ,
							color: '#000000',
							fontSize:10,
							display:'ALWAYS',
							borderRadius:10,
							padding:5
						},
						anchor:{x:.5,y:.7} //图标偏移位置
					
					
					}]
					this.sixap = true;
				} else {
					this.ismap = false;//是否需要地图
				}
			},
			async dispatcheds(){//更新线路
				
				
				let ors = this.or.location.split(',');//出发经纬度
				let ends = this.end.location.split(',');//到达点经纬度
				await this.parametes(ors[1] + ',' + ors[0], ends[1] + ','  + ends[0]);
				this.markers.splice(1,1);
				this.markers.push({
					latitude: ends[1],
					longitude: ends[0],
					iconPath: '../../../../static/img/carbus/cats.png',
					width:20,//图标大小
					height:20,
					callout:{
						content: '距您'+ this.distance + ',预计' + this.duration + '到达' ,
						color: '#000000',
						fontSize:10,
						display:'ALWAYS',
						borderRadius:10,
							padding:5
					},
					anchor:{x:.5,y:.5} //图标偏移位置
				})
				
				this.include_points = [{ //根据两个点缩放地图的大小
					latitude:ends[1],
					longitude: ends[0],
				},{
					latitude: ors[1],
					longitude: ors[0]
				}]
			},
			tel(){//司机电话
				uni.makePhoneCall({
					phoneNumber: this.cararr.carSaleOrderDriver.virtualPhonePassenger //司机电话
				});
			},
			tels(){//报警电话
				uni.makePhoneCall({
					phoneNumber: '110' //报警电话
				});
			},
			parametes(fits,end){ //驾车路线规划
				return new Promise((resolve, reject) => {
					let dats = {
						from: fits,
						to: end
					};
					try{
						totok.direction(dats).then((res)=>{
							let dat = res.result.routes[0];
							var coors= dat.polyline;
							for (var i = 2; i < coors.length ; i++)
							{coors[i] = coors[i-2] + coors[i]/1000000}
							
							this.distance = this.dism(dat.distance); //多远 单位米
							this.duration = this.hous(dat.duration * 60); //多久 单位分钟
							let points = []; //路径规划
							
							for(var k = 1; k < coors.length / 2; k++){
								points.push({
									arrowLine: true,
									longitude: coors[k * 2 - 1],
									latitude: coors[k * 2 - 2]
								});
							}
							
							this.polyline = [{
								strokeOpacity: 1,     // 线透明度
								strokeStyle: 'solid',  // 线样式
								lineJoin: 'round',  // 折线拐点的绘制样式
								points: points,
								color: '#04be02',
								arrowLine:true,
								borderColor:'#016100',
								borderWidth:3,
								width: 8
							}];
						});
					}catch(e){
						console.log(e)
						//TODO handle the exception
					}
				})
			},
			dism(m){//米转为公里
				if(m  >= 1000){
					let d = parseFloat(m/1000).toFixed(1)
					return d + '公里'
				} else {
					return m + '米'
				}
			},
			hous(time){
				let times = '';
				if (time > 60 && time < 60 * 60) {
					times = parseInt(time / 60.0) + "分钟"
				}
				else if (time >= 60 * 60 && time < 60 * 60 * 24) {
					times = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
						parseInt(time / 3600.0)) * 60) + "分钟"
				} else if (time >= 60 * 60 * 24) {
					times = parseInt(time / 3600.0/24) + "天" +parseInt((parseFloat(time / 3600.0/24)-
						parseInt(time / 3600.0/24))*24) + "小时" 
				} else {
					times = parseInt(time) + "秒";
				}
				return times
			},
			houst(second_time){
				var time = parseInt(second_time);  
				if( parseInt(second_time )> 60){  
				  
				    var second = parseInt(second_time) % 60;  
				    var min = parseInt(second_time / 60);  
				    time = this.zero(min) + ":" + this.zero(second);  
				      
				    if( min > 60 ){  
				        min = parseInt(second_time / 60) % 60;  
				        var hour = parseInt( parseInt(second_time / 60) /60 );  
				        time = this.zero(hour) + ":" + this.zero(min) + ":" + this.zero(second);  
				  
				        // if( hour > 24 ){  
				        //     hour = parseInt( parseInt(second_time / 60) /60 ) % 24;  
				        //     var day = parseInt( parseInt( parseInt(second_time / 60) /60 ) / 24 );  
				        //     time = day + "天" + hour + "小时" + min + "分" + second + "秒";  
				        // }  
				    }  
					return time
				} else {
					return '00:' + this.zero(parseInt(time))
				}
				
			},
			zero(ti){
				if(ti<10){
					return '0' + ti
				} else {
					return ti
				}
			},
			add(a, b) { //经纬度的 加减乘除
			    var c, d, e;
			    try {
			        c = a.toString().split(".")[1].length;
			    } catch (f) {
			        c = 0;
			    }
			    try {
			        d = b.toString().split(".")[1].length;
			    } catch (f) {
			        d = 0;
			    }
			    return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) + this.mul(b, e)) / e;
			},
			sub(a, b) {//减法
			    var c, d, e;
			    try {
			        c = a.toString().split(".")[1].length;
			    } catch (f) {
			        c = 0;
			    }
			    try {
			        d = b.toString().split(".")[1].length;
			    } catch (f) {
			        d = 0;
			    }
			    return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) - this.mul(b, e)) / e;
			},
			accad(a,b){//除法
			    var c, d, e = 0,
					f = 0;
				try {
					e = a.toString().split(".")[1].length;
				} catch (g) {}
				try {
					f = b.toString().split(".")[1].length;
				} catch (g) {}
				return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), this.mul(c / d, Math.pow(10, f - e));
			},
			mul(a, b) { //乘法
			    var c = 0,
			        d = a.toString(),
			        e = b.toString();
			    try {
			        c += d.split(".")[1].length;
			    } catch (f) {}
			    try {
			        c += e.split(".")[1].length;
			    } catch (f) {}
			    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
			},
			rblcok(){
				if(this.settime) {
				    clearInterval(this.settime);  
				    this.settime = null;  
				}
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

<style scoped lang="scss">
	.carpot{
		width: 180upx;
		height: 40upx;
		line-height: 40upx;
		text-align: center;
	}
	.pricsy{
		color: #FF9000;
	}
	.btns{
		width: 100%;
		height: 80upx;
		margin-top: 20upx;
		background-color: #DD031E;
		border-radius: 8upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 80upx;
	}
	.carlist{
		width: 100%;
		.mapsl{
			width: 100%;
			height: 1100upx;
		}
		.mapslp{
			width: 100%;
			height:1200upx;
		}
		.noplst{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 110upx;
			line-height: 110upx;
			text-align: center;
			font-size: 35upx;
			color: #FFFFFF;
			background-color: #86837E;
		}
		.payment{
			background-color: #F48F00;
		}	
		.openplst{
			background-color: $uni-color-primary;
		}
		.statusl{
			width: calc(100% - 40upx);
			background-color: #FFFFFF;
			margin-top: 20upx;
			padding: 40upx 20upx;
			.stname{
				font-size: 32upx;
				line-height: 40upx;
				.carfonto{
					line-height: 60upx;
					display: flex;
					align-items: center;
					image{
						width: 40upx;
						height: 40upx;
						margin-right: 20upx;
					}
				}
				.bordop{
					width: 100%;
					margin-top: 20upx;
					border-left: 1upx solid #787771;
					border-bottom: 1upx solid #787771;
					.borlisop{
						display: flex;
						width: 100%;
					}
					
					.bordlists{
						width: 100%;
						display: flex;
					}
					.bordlist{
						width: 25%;
						height: 60upx;
						line-height: 60upx;
						text-align: center;
						border-top: 1upx solid #787771;
						border-right: 1upx solid #787771;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
				}
				
				.pricenum{
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				.cacitys{
					display: flex;
					.catleft{
						width: 60upx;
						height: 60upx;
						display: flex;
						align-items: center;
						justify-content: center;
						.ca_x{
							width: 16upx;
							height: 16upx;
							border-radius: 50%;
							background: #FFFFFF;
							border: 2upx solid #52C41A;
							display: flex;
							align-items: center;
							justify-content: center;
							.ca_xs{
								width: 12upx;
								height: 12upx;
								border-radius: 50%;
								background: #52C41A;
							}
						}
					}
					.adresx{
						width: 100%;
						height: 60upx;
						line-height: 60upx;
						font-size: 32upx;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
		.disdit{
			width: 100%;
			/*  #ifdef  APP-PLUS || MP-WEIXIN */
			padding-top: 60upx;
			/*  #endif  */
			background-color: #FFFFFF;
			.distop{
				width: calc(100% - 80upx);
				padding: 20upx 40upx 10upx 40upx;
				display: flex;
				// justify-content: space-between;
				.disleft{
					display: flex;
					align-items: center;
					font-size: 26upx;
					line-height: 38upx;
					.disfot{
						width: 80upx;
						height: 80upx;
						margin-right: 10upx;
						image{
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					.dispan{
					}
				}
				.disright{
					margin-left: 20upx;
					display: flex;
					align-items: center;
				}
				
			}
			
			.cartypes{
				width: 100%;
				height: 60upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30upx;
				.carimg{
					width: 40upx;
					height: 40upx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.carmap{
			.dispatclose{
				width: calc(100% - 40upx);
				margin: 0 20upx;
				position: fixed;
				left: 0;
				bottom: 20upx;
				font-size: 30upx;
			}
			.sixtop{
				width: calc(100% - 40upx);
				position: fixed;
				left: 0;
				top: 40upx;
				/*  #ifdef  APP-PLUS || MP-WEIXIN */
				top: 140upx;
				/*  #endif  */
				margin: 0 20upx;
				height: 60upx;
				border-radius: 60upx;
				background-color: #FFFFFF;
				.antbns{
					width: 100%;
					font-size: 28upx;
					text-align: center;
					line-height: 60upx;
				}
			}
			.sixlist{
				width: calc(100% - 40upx);
				position: fixed;
				left: 0;
				bottom: 40upx;
				margin: 0 20upx;
				background-color: #FFFFFF;
				.distop{
					width: calc(100% - 80upx);
					padding: 20upx 40upx 10upx 40upx;
					display: flex;
					justify-content: space-between;
					.disleft{
						display: flex;
						align-items: center;
						font-size: 26upx;
						line-height: 38upx;
						.disfot{
							width: 80upx;
							height: 80upx;
							margin-right: 20upx;
							image{
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}
						.dispan{
							color: #333333;
							.carpot{
								font-weight: 600;
								text-align: left;
								width: 250upx;
								
							}
							.car_imgs{
								margin-left: 10upx;
								width: 30upx;
								height: 30upx;
							}
						}
					}
					.disright{
						display: flex;
						align-items: center;
						.dis_imgs{
							width: 61upx;
							height: 51upx;
						}
					}
				}
				.inpos{
					margin-top: 20upx;
					width: 100%;
					color: #333333;
					height: 70upx;
					font-size: 25upx;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #ffe7ae;
					.inposli{
						margin-left: 20upx;
					}
					.in_imgs{
						width: 30upx;
						height: 30upx;
					}
				}
			}
			.cat_bootom{
				width: calc(100% - 40upx);
				margin: 20upx;
				position: fixed;
				left: 0;
				bottom: 20upx;
				font-size: 30upx;
				.cat_tp{
					width: 100%;
					padding: 20upx 0;
					background-color: #FFFFFF;
					border-radius: 8upx;
					color: #333333;
					.cattext{
						width: 100%;
						height: 70upx;
						line-height: 70upx;
						text-align: center;
					}
					.cat_ts{
						width: calc(100% - 80upx);
						padding:0 20upx 0 60upx;
						font-size: 32upx;
						.carlisty{
							display: flex;
							align-items: center;
							justify-content: space-between;
							height: 80upx;
							.carleft{
								display: flex;
								align-items: center;
								.carlog{
									width: 60upx;
									height: 60upx;
									image{
										width: 100%;
										height: 100%;
									}
								}
								.carnames{
									margin-left: 30upx;
								}
							}
							.carright{
								display: flex;
								align-items: center;
								.carprice{
									display: flex;
									font-size: 28upx;
									margin-right: 40upx;
									align-items: center;
									.carprices{
										color: #FF8F2E;
										font-size: 40upx;
									}
								}
							}
						}
					}
				}
				
			}	
		}
	}
</style>
