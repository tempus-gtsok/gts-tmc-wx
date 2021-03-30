<template>
	<view class="da" style="padding-bottom: 150upx;">
		<loading>
		</loading>

		<!-- 遮盖层 -->
		<!-- <view class="mask" v-if="phone_click" @click="companym_click">
		</view> -->
		<view class="mask" v-if="companyi_click" @click="companym_click">
		</view>
		<!-- 判断手机和公司 -->
		<view class="popups" v-if="phone_click">
			<view class="cell_phone_number">{{cell_phone_number}}</view>
			<view class="cell_phone">{{userinfo.user.phone}}</view>
			<button class="dimission" @click="changphone">{{phone_name}}</button>
			<button class="cancel" @click="companym_click">取消</button>
		</view>
		<view class="popups" v-if="companys_click">
			<view class="popups_company">{{popups_company}}</view>
			<view class="company_name">{{userinfo.user.customerName}}</view>
			<view class="department">{{department}}</view>
			<button class="dimission" @click="to_modify">{{dimission}}</button>
			<button class="cancel" @click="companym_click">取消</button>
		</view>

		<view class="mian">
			<headnavigation titles="个人信息"></headnavigation>
			<view class="fill_in" v-if="userinfo.user">
				<view class="name">
					<view class="_name">
						姓名
					</view>
					<view class="name_right">
						{{userinfo.user.name}}
					</view>
					<view class="img">
					</view>
				</view>
				<view class="name">
					<view class="_name">
						头像
					</view>
					<view class="name_right">
						<view class="olleft" @click="ft_click">
							<view class="iconfont" style="font-size: 80upx;color: #007aff;" v-if="userinfo.passengerVo.headImg == null">
								&#xe63c;
							</view>
							<image style="width: 100%;height: 100%;" :src="userinfo.passengerVo.headImg" v-else mode=""></image>
						</view>
					</view>
					<view class="img">
					</view>
				</view>
				<!-- #ifdef H5 || MP-WEIXIN -->
				<view class="name">
					<view class="_name">
						微信绑定
					</view>
					<view class="name_right" v-if="lolist.isbind">
						<view class="clobd" @click="clobdck">
							立即解绑
						</view>
					</view>
					<view class="name_right" v-if="!lolist.isbind">
						<view class="bdwxid" @click="bindWxOpenIds">
							绑定微信
						</view>
					</view>
					<view class="img">
					</view>
				</view>
				<!-- #endif -->
				<view class="name" @click="phonei_click">
					<view class="_name">
						手机号
					</view>
					<view class="name_right">
						{{userinfo.user.phone}}
					</view>
					<view class="img">
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
				<view class="name" @click="passwos">
					<view class="_name">
						修改密码
					</view>
					<view class="name_right">
					</view>
					<view class="img">
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
				<view class="name" @click="Certificate">
					<view class="_name">
						我的证件
					</view>
					<view class="name_right">

					</view>
					<view class="img">
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
				<view class="name" @click="company_click">
					<view class="_name">
						所属公司
					</view>
					<view class="name_right">
						{{userinfo.user.customerName}}
					</view>
					<view class="img">
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
				<view class="name" @click="jurisdiction">
					<view class="_name">
						我的权限
					</view>
					<view class="name_right">
					</view>
					<view class="img">
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
				<view class="name" @click="TravelPolicy" v-if="userinfo.tmsStaffLevels">
					<view class="_name">
						出差政策
					</view>
					<view class="name_right">
						{{userinfo.tmsStaffLevels.tslName}}
					</view>
					<view class="img">
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
				<view class="name" @click="TravelPolicys" v-if="rotes('tms:pas')">
					<view class="_name">
						常用旅客
					</view>
					<view class="name_right">
					</view>
					<view class="img">
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
				<view class="name" @click="usualadd">
					<view class="_name">
						常用地址
					</view>
					<view class="name_right">
						<!-- {{name}} -->
					</view>
					<view class="img">
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
			</view>

		</view>
		<button class="button" @click="pas_click" v-if="dding">
			退出登录
		</button>
	</view>
</template>

<script>
	import login from '@/api/login.js'
	import Mydi from '@/api/mydi.js'
	import {
		mapState
	} from 'vuex';
	import customer_Name from '@/api/login.js'
	export default {
		props: {},
		data() {
			return {
				dding: true, //是否显示退出登录


				companyi_click: false,
				phone_click: false,
				companys_click: false,
				popups_company: '所属公司',
				cell_phone_number: '您当前绑定的手机号',
				department: '默认部门',
				dimission: '我已离职，解除绑定',
				phone_name: '更改绑定手机号',
				dimiss: false,
				name: '毛所属毅',
				expire: '到期',
				cell_phone: '13168806023',
				company: '',
				rank: '默认职级',
				userinfo: {},
				lolist: null, //登录返回值
			}
		},
		mounted() {
			// if(uni.getStorageSync('TB_ddvalue') != null && uni.getStorageSync('TB_ddvalue') != undefined && uni.getStorageSync('TB_ddvalue') != ''){
			// 	this.dding = false;
			// }
			this.lolist = uni.getStorageSync("user_list" + uni.getStorageSync('appWxId'));
			let userinfo = uni.getStorageSync('userinfo' + uni.getStorageSync('appWxId'));
			if (userinfo) {
				this.userinfo = userinfo;
			}
		},
		methods: {
			async bindWxOpenIds() { //微信绑定
				let that = this;

				let opeids;
				// #ifdef H5
				opeids = uni.getStorageSync("h5_openid" + uni.getStorageSync('appWxId'));
				// #endif
				// #ifdef MP-WEIXIN
				opeids = uni.getStorageSync('weixin_openid'+ uni.getStorageSync('appWxId'));
				// #endif
				let sessionKey = uni.getStorageSync('sessionKey')
				// #ifdef H5
				let opnids = opeids;
				// #endif
				let res = await login.bindWxOpenId({
					// #ifdef H5
					openId: opnids,
					type: 1
					// #endif

					// #ifdef MP-WEIXIN
					openId: opeids,
					sessionKey: sessionKey,
					type: 2
					// #endif

				});

				if (res.code == 200 && res.data.isbind) {
					uni.showToast({
						title: '绑定成功！',
						icon: 'none',
						duration: 1000
					})
					that.lolist.isbind = res.data.isbind;
					that.lolist.token = res.data.token;
					uni.setStorageSync('user_list' + uni.getStorageSync('appWxId'), that.lolist);
				} else {

					uni.showToast({
						title: res.message,
						icon: 'none',
						duration: 1000
					})
				}
			},
			clobdck() { //解绑微信绑定
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '确定解除绑定吗？',
					success: function(res) {
						if (res.confirm) {

							login.unBindWxOpenId({
								// #ifdef H5
								type: 1
								// #endif
								// #ifdef MP-WEIXIN
								type: 2
								// #endif
							}).then(res => {

								let data = res.data;
								if (res.code == 200 && !res.data.isbind) {
									_this.lolist.isbind = res.data.isbind;
									_this.lolist.token = res.data.token;
									uni.showToast({
										title: '解绑成功！',
										icon: 'none',
										duration: 1000
									})
									try {
										uni.setStorageSync('user_list' + uni.getStorageSync('appWxId'), _this.lolist);
									} catch (e) {
										console.log(e)
									}
								} else {
									uni.showToast({
										title: '解绑失败',
										icon: 'none',
										duration: 1000
									})
								}
							}).catch((err) => {

								console.log(err)
							})

						} else if (res.cancel) {}
					}
				});

			},
			passwos() { //修改密码
				uni.redirectTo({
					url: '../../../pages/mydi/information/changePassword/changePassword'
				})
			},
			dimissions() {
				this.dimiss = true;
			},
			ft_click() {
				let _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						let Max_Size = res.tempFiles[0].size;
						if (Max_Size / 1024 > 2048) {
							_this.showToasts("头像大小不能高于2M")
							return
						}
						_this.headImg = res.tempFilePaths;

						const data = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //关于token的用法
						let baseURL = uni.getStorageSync('baseURL');
						uni.uploadFile({
							// #ifdef  APP-PLUS
							url: "http://wx.molintmc.com/dpe/tms/api/user/uploadPassengerImage", //除了h5平台     // 后端api接口
							// #endif
							// #ifdef  H5 || MP-WEIXIN
							url: baseURL + "/tms/api/user/uploadPassengerImage", // 后端api接口//仅在h5平台
							// #endif
							methods: "POST",
							filePath: _this.headImg[0], // uni.chooseImage函数调用后获取的本地文件路劲
							name: 'file', //后端通过'file'获取上传的文件对象
							header: {
								'AuthToken': data.token
							},
							formData: {
								'file': 'test'
							},
							success: (res) => {

								let data = JSON.parse(res.data)
								if (data.code == 200) {
									_this.userinfo.passengerVo.headImg = data.data;
									_this.unpimg(data.data);
								}
							},
							error: (res) => {

								this.showToasts("上传失败！", res)
							}
						});
					},
					error: function(e) {
						this.showToasts(e)
					}
				})
			},
			async unpimg(img) {

				try {
					let res = await Mydi.updateLoginHeadImg({
						headImg: img
					});

					if (res.code == 200) {
						let _this = this;
						let res = await Mydi.username();
						if (res.code == 200) {
							_this.$store.commit('user_infos', res.data);
						}
						_this.showToasts("修改成功！");
					} else {
						_this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e)

				}
			},
			async to_modify() {
				let _this = this;
				let comp = _this.userinfo.user.customerName; //公司
				let user = {
					customerName: comp
				}

				try {
					let res = await customer_Name.customer_Name(user);

					if (res.code == 200) {
						_this.$store.commit('userTokenAi', res.data);
						_this.showToasts(res.message);
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/login/login?ts=1',
								success() {
									let page = getCurrentPages().pop(); //跳转页面成功之后
								}
							});
						}, 2000)
					} else {
						_this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e)

				}

			},
			changphone() {
				uni.redirectTo({
					url: '/pages-mydi/pages/mydi/information/changePhone/changePhone',
				});
			},
			pas_click() {
				uni.reLaunch({
					url: '/pages/login/login?ts=1',
				});
			},
			jurisdiction() {
				let _this = this
				uni.redirectTo({
					url: '/pages-mydi/pages/mydi/information/jurisdiction/jurisdiction',
				});
			},
			Certificate() {
				let _this = this
				uni.redirectTo({
					url: '/pages-mydi/pages/mydi/information/certificate/certificate',
				});
			},
			TravelPolicy() {
				let _this = this
				uni.redirectTo({
					url: '/pages-mydi/pages/mydi/information/travelPolicy/travelPolicy',
				});
			},
			TravelPolicys() {
				uni.redirectTo({
					url: '/pages-mydi/pages/mydi/frequenttravellers/frequenttravellers',
				});
			},
			usualadd() {
				uni.navigateTo({
					url: '/pages-mydi/pages/mydi/information/usualAddress/usualAddress',
				});
			},
			phonei_click() {
				return
				// this.companys_click = false;
				// this.phone_click = true;
				// this.companyi_click = true;
			},
			company_click() {
				this.phone_click = false;
				this.companyi_click = true;
				this.companys_click = true;
			},
			companym_click() {
				this.phone_click = false;
				this.companyi_click = false;
				this.companys_click = false;
				this.dimiss = false;
			},
		}
	}
</script>

<style lang="scss" scoped>
	*{
		font-size: 32upx;
	}
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 998;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
	}

	.popups {
		width: 500upx;
		height: 500upx;
		position: fixed;
		padding: 2%;
		top: 50%;
		left: 50%;
		z-index: 999;
		margin-left: -35%;
		margin-top: -41%;
		background: #FFFFFF;

		.popups_company {
			text-align: center;
			margin-top: 50upx;
			color: #bac6d1;
		}

		.company_name {
			text-align: center;
			font-size: 30upx;
			margin-top: 30upx;
			color: #3b4f62;
		}

		.cell_phone_number {
			text-align: center;
			font-size: 30upx;
			margin-top: 50upx;
			color: #bac6d1;
		}

		.cell_phone {
			text-align: center;
			font-size: 40upx;
			margin-top: 30upx;
			color: #3b4f62;
		}

		.department {
			text-align: center;
			margin-top: 30upx;
			color: #acb8c3;
		}

		.dimission {
			margin-top: 50upx;
			font-size: 28upx;
			color: #FFFFFF;
			background: $uni-color-primary;
		}

		.cancel {
			margin-top: 30upx;
			font-size: 28upx;
			color: $uni-color-primary;
			background: #FFFFFF;
			border: 1upx solid $uni-color-primary;
		}

		.confirm {
			position: absolute;
			top: 200upx;
			left: 0;
			z-index: 9999;
			width: 100%;
			height: 300upx;
			background: #FFFFFF;

		}

	}

	.mian {
		background: #FFFFFF;
		width: 100%;

		.fill_in {
			width: 100%;
		}

		.name {
			margin: 0 20upx;
			line-height: 115upx;
			display: flex;
			border-bottom: 1upx solid #f4f5f9;
			align-content: center;
			background: #FFFFFF;

			._name {
				width: 27%;
			}

			.name_right {
				width: 68%;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				color: #C0C0C0;

				.clobd {
					padding: 0 15upx;
					background-color: red;
					color: #FFFFFF;
					line-height: 60upx;
					text-align: center;
					font-size: 30upx;
					border-radius: 8upx;
				}

				.bdwxid {
					padding: 0 15upx;
					background-color: $uni-color-primary;
					color: #FFFFFF;
					line-height: 60upx;
					text-align: center;
					font-size: 30upx;
					border-radius: 8upx;
				}

				.olleft {
					width: 80upx;
					height: 80upx;
					display: flex;
					align-items: center;

					image {
						border-radius: 50%;
					}
				}
			}

			.img {
				width: 5%;
				align-content: center;
			}
		}
	}

	.button {
		margin: 20upx 20upx;
		color: #FFFFFF;
		background: $uni-color-primary;
	}
</style>
