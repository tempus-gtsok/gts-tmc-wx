<template>
	<view class="container">
		<view class="bo_im">
			<bwSwiper @clickItem="swipclik" :swiperList="swlist" :autoplay="isvideo" :indicatorDots="indicatorDots">
			</bwSwiper>
		</view>
		<view class="book_ci">
			<view class="bos_onet">
				<view class="usernames" @click="corcks">
					<view class="userts">
						{{corporatename.name}}
					</view>
					<view class="iconfont" style=" font-size: 60upx;">&#xe8a3;</view>
				</view>
				<view class="bos_ones">
					<view class="bo_dvist">
						<view v-for="(item, index) in tabBar" :key="index" class="tabbar_item" @click="us_toks(item)">
							<image :src="item.imgNormal" mode=""></image>
							<view class="text">{{item.text}}</view>
						</view>
					</view>
				</view>
				<view class="black_mu" @click="siwclick" v-if="switfal">
					<view class="isswflist" @click.stop>
						<view class="corporalist" @click="cornow(item)" v-for="(item,index) in corporatelist" :key="index">
							<view class="itNames">{{item.name}}</view>
							<span class="iconfont" v-if="item.id == corporatename.id" style="color: #3c85fd;">&#xe620;</span>
							<span class="iconfont" style="color: #C0C0C0;">&#xe7bf;</span>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bos_one">
			<view class="bo_dvist">
				<view v-for="(item, index) in bodv_list" :key="item.url" class="tabbar_item" @click="us_tok(item)">
					<image :src="item.imgNormal" mode=""></image>
					<view class="text">{{item.text}}</view>
					<view class="nums" v-if="item.istus == true && item.nums > 0">
						{{item.nums}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dd from 'dingtalk-jsapi';
	import torks from '@/api/torowk.js';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import login from '@/api/login.js';
	import Mydi from '@/api/mydi.js';
	import bwSwiper from '@/components/bw-swiper/bw-swiper.vue';
	import tabBar from '@/components/view/Navigations.vue';
	export default {
		components: {
			tabBar,
			bwSwiper
		},
		data() {
			return {
				swlist: [],
				isvideo: true,
				indicatorDots: false,
				currentIndex: 0,
				currentPage: 'Book',
				bodv_list: [{
						url: 'maillist',
						text: '航班动态',
						imgNormal: require("@/static/img/home/home_dynamics.png"),
						istus: false,
						nums: 0
					},
					{
						url: 'itinerary',
						text: '我的行程',
						imgNormal: require("@/static/img/home/home_itinerary.png"),
						istus: false,
						nums: 0
					},
					{
						url: 'My_Apps',
						text: '我的申请',
						imgNormal: require("@/static/img/home/home_Apply.png"),
						istus: false,
						nums: 0
					},
					{
						url: 'Examine',
						text: '待我审批',
						imgNormal: require("@/static/img/home/home_Approval.png"),
						istus: true,
						nums: 0
					}
				],
				switfal: false,
				corporatelist: [],
				corporatename: {
					id: 0,
					name: ''
				},
				bt_bol: false,
				ipon: '123',
				btns: "\ue80c",
				dateStr: '',
				daysCount: 365,
				singleDate: true,
				animation: false,
				end: {
					name: ""
				},
				chip: false,
				currentPage: 'Planeticket',
				tabBar: [{
						ul: 'Planeticket',
						text: '国内机票',
						imgNormal: require('@/static/img/home/home_aircraft.png')
					},
					{
						ul: 'Train',
						text: '订火车票',
						imgNormal: require('@/static/img/home/home_Train.png')
					},
					{
						ul: 'Hotel',
						text: '酒店预定',
						imgNormal: require('@/static/img/home/home_Hotel.png')
					},
					{
						ul: 'Internationalticket',
						text: '国际机票',
						imgNormal: require('@/static/img/home/home_international.png')
					},
					{
						ul: 'Vehicleuse',
						text: '用车业务',
						imgNormal: require('@/static/img/home/home_vehicle.png')
					},
					{
						ul: 'visa',
						text: '高端定制',
						imgNormal: require('@/static/img/home/home_visa.png')
					},
				]
			}
		},
		onShow() {},
		computed: {
			...mapState(['userinfo'])
		},
		mounted() {
			this.search();
		},
		methods: {
			...mapMutations(['userTokenAi']),
			async cornow(its) { //修改当前员工所属公司
				if (its.customerNo != this.corporatename.id) {
					try {
			
						let res = await torks.changeEnterprise({
							customerId: its.customerNo,
							// #ifdef MP-WEIXIN
							type: 2
							// #endif
						})
			
						if (res.code == 200) {
							uni.showToast({
								title: '切换成功',
								icon: 'none',
								duration: 1000
							})
							this.switfal = false;
							this.changs(1);
							this.corporatename = {
								id: its.customerNo,
								name: its.name,
							}
							uni.setStorageSync("user_list" + uni.getStorageSync('appWxId'), res.data);
						} else {
							uni.showToast({
								title: res.message,
								icon: 'icon',
								duration: 1000
							})
						}
					} catch (e) {
			
						//TODO handle the exception
					}
				} else {
					this.switfal = false;
					this.changs(true);
				}
			},
			siwclick() {
				this.switfal = false;
				this.changs(true);
			},
			async corcks() { //获取员工所属的公司信息
				try {
			
					let res = await torks.currentUserEnterprise();
			
					if (res.code == 200) {
						this.corporatelist = res.data;
						this.switfal = true;
						this.changs(false);
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 1000
						})
					}
				} catch (e) {
					console.log(e)
			
					//TODO handle the exception
				}
			},
			us_toks(item) {
				if (item.ul == 'Internationalticket') {
					uni.showToast({
						title: '疫情影响,暂未开放',
						duration: 1000,
						icon: 'none'
					})
				} else if (item.ul == 'visa') {
					//#ifdef APP-PLUS  
					uni.showToast({
						title: '疫情影响,暂未开放',
						duration: 1000,
						icon: 'none'
					})
					//#endif
			
					// #ifdef  H5 || MP-WEIXIN
					uni.navigateTo({
						url: './valist/valist'
					})
					//#endif
				} else if (item.ul == 'Vehicleuse') { //用车业务
					uni.navigateTo({
						url: '/pages-book/book/mainModules/majorFunction/carbusiness/carbusiness'
					})
				} else {
					uni.navigateTo({
						url: '/pages-book/book/mainModules/majorFunction/select_list/select_list?type=' + item.ul
					})
				}
			},
			bts_k() {
				if (this.bt_bol) {
					this.bt_bol = false
					this.btns = "\ue80c"
				} else {
					this.bt_bol = true
					this.btns = "\ue618"
				}
			},
			changs(val) {
				if (val == 1) {
					this.search();
				}
				this.$emit('isShows', val);
			},
			async search() { //免登判断
				let _this = this;
				if (uni.getStorageSync('TB_ddvalue') != null && uni.getStorageSync('TB_ddvalue') != undefined && uni
					.getStorageSync('TB_ddvalue') != '') {
					let rec = await login.accountlogins({
						sessionId: uni.getStorageSync('TB_ddvalue'),
						// #ifdef MP-WEIXIN
						type: 2
						// #endif
					}); //免登录
					if (rec.code == 200) {
						uni.setStorageSync("user_list" + uni.getStorageSync('appWxId'), rec.data);
						uni.removeStorageSync('TB_ddvalue');
						_this.sitget();
					}
				} else if (uni.getStorageSync('corpid') != null && uni.getStorageSync('corpid') != undefined && uni
					.getStorageSync('corpid') != '') {
					if (dd.env.platform !== "notInDingTalk") {
						console.log('进入了,开始免登')
						//进行钉钉登录操作
						dd.ready(function() {
							//1.获取免登授权码code
							dd.runtime.permission.requestAuthCode({
								corpId: uni.getStorageSync('corpid'), //企业id
								onSuccess: function(result) {
									var code = result.code;
									var customerNo = uni.getStorageSync('customerNo');

									login.noSecret({
										code: code,
										customerNo: customerNo
									}).then((rec) => {
										if (rec.code == 200) {
											uni.setStorageSync("user_list" + uni
												.getStorageSync('appWxId'), rec.data);
											uni.removeStorageSync('corpid');
											console.log('登录成功，进行接口请求........')
											_this.sitget();
										}
									}).catch((err) => {
										console.log(err)
									})
								},
								onFail: function(err) {
									console('出错了, ' + err);
								}
							});
						});
					} else {
						console.log('不是钉钉客户端')
						uni.removeStorageSync('corpid');
						_this.sitget();
					}
				} else {
					_this.sitget();
				}
			},
			async sitget() { //登录成功后请求
				let datas = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //检验是否是登录状态
				if (datas.token) {
					this.userTokenAi(datas);
					try {
						const res = await torks.queryNotifys();
						if (res.code == 200) {
							let data = res.data;
							let si = [];
							for (let i in data) {
								si.push({
									img: data[i].content,
									address: data[i].address
								});
							}
							this.swlist = si;
						} else {
							uni.showToast({
								title: res.message,
								duration: 1000,
								icon: 'none'
							})
						}
						const resuser = await Mydi.username();
						if (resuser.code == 200) {
							this.$store.commit('user_infos', resuser.data);
							this.corporatename = {
								id: this.userinfo.user.customerId,
								name: this.userinfo.user.customerName,
							}
							uni.setNavigationBarTitle({ //修改页面标题
								title: resuser.data.user.customerName
							});
						}
						const rest = await torks.getApprvListCount();
						if (rest.code == 200) {
							this.bodv_list[3].nums = rest.data;
						} else {
							uni.showToast({
								title: rest.message,
								duration: 1000,
								icon: 'none'
							})
						}
					} catch (e) {
						console.log(e)
					}
				} else {
					this.$store.commit('logout');
					uni.reLaunch({
						url: '../login/login'
					})
				}
			},
			swipclik(item) {
				if (this.utils.zzUrlrge(item.address) == false) {
					window.location.href = item.address
				}
			},
			us_tok(gos) {
				if (gos.url == "maillist") {
					uni.navigateTo({
						url: './flightdynamicst/Flightdynamics'
					})
				} else if (gos.url == 'My_Apps') {
					uni.navigateTo({
						url: '/pages-mydi/pages/mydi/myapplication/myapplication?code=right&is=1'
					})
				} else if (gos.url == 'Examine') {
					uni.navigateTo({
						url: '/pages-mydi/pages/mydi/myapplication/myapplication?code=left&is=1'
					})
				} else if (gos.url == 'itinerary') {
					uni.navigateTo({
						url: './itinerary/itinerary?left=1&right=1'
					})
				}
			}
		},
		onLoad(option) { //option为object类型，会序列化上个页面传递的参数
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		position: relative;

		.book_ci {
			width: calc(100% - 60upx);
			position: absolute;
			height: 200upx;
			left: 30upx;
			top: 320upx;
			z-index: 10;

			.bos_onet {
				width: 100%;
				background: #FFFFFF;
				border-radius: 15upx;
				.usernames {
					width: calc(100% - 80upx);
					height: 90upx;
					font-size: 38upx;
					color: #333333;
					border-bottom: 2upx solid #E5E5E5;
					line-height: 90upx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 30upx 0 50upx;
				
					.userts {
						width: 90%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				
				.bos_ones {
					width: 100%;
					.bo_dvist {
						width: calc(100% - 30upx);
						padding: 15upx 15upx 30upx 15upx;
						
						display: flex;
						flex-wrap: wrap;
						align-content: space-between;
				
						.tabbar_item {
							width: 33%;
							font-size: 30upx;
							color: #333333;
							display: flex;
							padding: 24upx 0 10upx 0;
							flex-direction: column;
							justify-content: center;
							align-items: center;
				
							image {
								width: 125upx;
								height: 125upx;
							}
				
							.text {
								line-height: 40upx;
							}
						}
					}
				}
				
				.black_mu {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, .5);
					display: flex;
					align-items: center;
					justify-content: center;
					z-index: 9999;
				}
				
				.isswflist {
					width: 80%;
					padding: 20upx;
					border-radius: 10upx;
					min-height: 150upx;
					z-index: 9999;
					background: #ffffff;
				
					.corporalist {
						display: flex;
						align-items: center;
						font-size: 35upx;
						padding: 0 20upx;
						line-height: 70upx;
				
						.itNames {
							width: 90%;
						}
					}
				}
			}
		}

		.bos_one {
			width: calc(100% - 60upx);
			margin: 500upx 30upx 100upx 30upx;

			.bo_dvist {
				width: 100%;
				margin-top: 15upx;
				display: flex;
				flex-wrap: wrap;

				.tabbar_item {
					position: relative;
					width: 23%;
					margin: 1%;
					height: 150upx;
					border-radius: 15upx;
					font-size: 26upx;
					color: #333333;
					background: #FFFFFF;
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 60upx;
						height: 60upx;
						margin: 20upx 0;
					}

					.nums {
						transform: scale(0.8);
						right: -10upx;
						top: -20upx;
						position: absolute;
						width: 50upx;
						height: 50upx;
						background: red;
						border-radius: 50%;
						text-align: center;
						line-height: 50upx;
						font-size: 26upx;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
