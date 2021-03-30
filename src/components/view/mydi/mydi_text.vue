<template>
	<view class="mian">
		<loading>
		</loading>
		<view class="headPortrait" @click="pas_click">
			<view class="headPortrait_left">
				<view class="expression" v-if="userinfo.user">
					<view class="iconfont" style="font-size: 80upx;color: #FFFFFF;"  v-if="userinfo.passengerVo.headImg == null">
						&#xe63c;
					</view>
					<image :src="userinfo.passengerVo.headImg" v-else></image>
				</view>
				<view class="name" v-if="userinfo.user">
					<view class="name_text">
						{{userinfo.user.name}}
					</view>
					<view class="company">
						{{userinfo.user.customerName}}
					</view>
				</view>
			</view>
			<view class="headPortrait_right">
				<view class="iconfont" style="">&#xe617;</view>
			</view>
		</view>
		<view class="tail">
			<view
			 v-for="(item,index) in tabBar_tail" 
			 :key="index" 
			 class="tabbar_text" 
			 @click="navTos(item)"
			 v-if="rotes(item.is)"
			 >
			 <view class="tabbar_left">
				 <view class="iconfont" style="color: #007aff;margin: 0 5%;font-size: 45upx;">{{item.imgNormal}}</view>
				 <view class="text_left">{{item.text_left}}</view>
			 </view>
			 <view class="tabbar_right">
				 <view class="iconfont" style="color: #007aff;">{{item.imgNormal_test}}</view>
			 </view>
			</view>
		</view>
		
		<!-- <view class="User_tail">
			<view class="guide">
				<view class="iconfont" style="margin: auto;font-size: 30upx;">&#xe607;操作指引</view>
				<view class="iconfont" style="margin: auto;font-size: 30upx;">&#xe60c;服务热线</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import login from '@/api/login.js'
	import {mapState} from 'vuex';
	import Mydi from "@/api/mydi.js"
	export default {
		props:{
		},
		data() {
			return {
				
				
				UserName:'',
				Company:'公司',
				usernames: '莫林用户',
				istust: false,
				tabBar_tail:[
					{
						url:'Examine',
						text_left:'我的审批',
						imgNormal: '\ue647',
						imgNormal_test: '\ue617',
						is:'tms:exa'
					},
					{
						url:'My_Apps',
						text_left:'我的申请',
						imgNormal:'\ue605',
						imgNormal_test: '\ue617',
						is:'tms:myi'
					},
          {
            url:'ticketIntentForm',
            text_left:'我的意向单',
            imgNormal:'\ue651',
            imgNormal_test: '\ue617',
            is:'tms:hotel'
          },
					{
						url:'Administration',
						text_left:'同事管理',
						imgNormal:'\ue89d',
						imgNormal_test: '\ue617',
						is:'tms:col'
					},
					{
						url:'Jurisdiction',
						text_left:'权限管理',
						imgNormal:'\ue626',
						imgNormal_test: '\ue617',
						is:'tms:aut'
					},
					{
						url:'Apply_for',
						text_left:'常用旅客',
						imgNormal:'\ue602',
						imgNormal_test: '\ue617',
						is:'tms:pas'
					}
					]
			};
		},
		mounted() {
			let _this = this;
			let datas = uni.getStorageSync('userinfo'+ uni.getStorageSync('appWxId'));//检验是否是登录状态
			if (datas.user) {
				_this.$store.commit('user_infos',datas);
			} else {
				_this.userlist();
			}
		},
		computed:{
			 ...mapState(['userinfo','user_token'])
		},
		methods:{
			async userlist(){ //获取个人信息
				let _this = this;
				
				try{
					let res = await Mydi.username();
					
					if(res.code == 200){
						_this.$store.commit('user_infos',res.data);
					}
				}catch(e){
					console.log(e)
					
				}
				
			},
			navTos(item){
				if(item.url == 'Apply_for'){
					uni.navigateTo({
						url: '/pages-mydi/pages/mydi/frequenttravellers/frequenttravellers',
					});
				} else if(item.url == 'Jurisdiction'){
					uni.navigateTo({
						url: '/pages-mydi/pages/mydi/privilegemanagement/privilegemanagement',
					});
				} else if(item.url == 'Administration'){
					uni.navigateTo({
						url: '/pages-mydi/pages/mydi/colleaguemanagement/colleaguemanagement',
					});
				} else if (item.url == 'My_Apps'){
					uni.navigateTo({
						url:'/pages-mydi/pages/mydi/myapplication/myapplication?code=right&is=2'
					})
				} else if (item.url == 'Examine'){
					uni.navigateTo({
						url:'/pages-mydi/pages/mydi/myapplication/myapplication?code=left&is=2'
					})
				}else if (item.url == 'vip_for'){
					uni.showToast({
						title:'暂未开放',
						icon:'none',
						duration:1000
					})
					// uni.navigateTo({
					// 	url:'/pages-member/pages/menbers/views/memberCenter/index'
					// })
				}else if (item.url == 'ticketIntentForm'){
          uni.navigateTo({
            url:'/pages-mydi/pages/mydi/IntentList/ticketIntentForm'
          })
        }
			},
			pas_click(){
				let _this = this
				uni.navigateTo({
					url: '/pages-mydi/pages/mydi/information/information'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mian{
		overflow:auto;
		.headPortrait{
			display: flex;
			width: 100%;
			height: 140upx;
			/*  #ifdef  APP-PLUS || MP-WEIXIN */ 
			padding-top: 60upx;
			/*  #endif  */
			background: linear-gradient(to right, #4E92FD 0%,#6E46FE 100%);
			
			.headPortrait_left{
				width: 85%;
				height: 140upx;
				margin-left: 5%;
				display: flex;
				align-items:center;
				.expression{
					float: left;
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
					display: flex;
					align-items: center;
					image{
						border-radius: 50%;
						width: 100%;
						height: 100%;
					}
				}
				.name{
					float: left;
					margin-left: 3%;
					color: #FFFFFF;
					.name_text{
						font-size: 28upx;
						font-weight: 550;
					}
					.company{
						font-size: 35upx;
					}
				}
			}
			.headPortrait_right{
				width: 10%;
				text-align: center;
				line-height: 140upx;
				color: #fff;
			}
		}
		.tabBar{
			margin-top: 40upx;
			display: flex;
			flex-wrap: wrap;
			background: #ffffff;
			.tabbar_item{
				width: 25%;
				padding: 15upx 0;
				height: 100upx;
				color:#3b4f62;
				text-align: center;
			}
			.text{
				line-height: 50upx;
			}
		}
		.tail{
			color:#3b4f62;
			margin-top: 40upx;
			background: #FFFFFF;
			
			.tabbar_text{
				width: calc(100% - 40upx);
				padding:10upx 20upx;
				height: 90upx;
				display: flex;
				color:#3b4f62;
				border-bottom: #f2f5fa 2upx solid;
				line-height: 90upx;
				justify-content: space-between;
				.tabbar_left{
					width: 58%;
					display: flex;
					flex-wrap: wrap;
					.text_left{
						font-size: 30upx;
					}
				}
				.tabbar_right{
					display: flex;
				}
			}
		}
		.User_tail{
			width: 100%;
			height: 100upx;
			display: flex;
			color:#333333;
			.guide{
				width: 100%;
				height: 100upx;
				line-height: 100upx;
				display: flex;
				flex-wrap: wrap;
			}
		}
	}
</style>
