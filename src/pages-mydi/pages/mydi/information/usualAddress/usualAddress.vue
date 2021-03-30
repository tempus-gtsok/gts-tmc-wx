<template>
	<view class="ferda">
		<loading>
		</loading>
		<headnavigation titles="常用地址"></headnavigation>
		<view class="ferdv">
			<view class="fer_to">
				<view class="fer_left">常用地址</view>
				<view class="fer_right">左滑删除</view>
			</view>
			<view class="message-list">
				<block v-for="(it,i) of messagesList" :key="i">
					<view class="uni-swipe-action">
						<view class="uni-swipe-action__container" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
						 @touchcancel="touchEnd" :style="{'transform':messageIndex == i ? transformX : 'translateX(0px)','-webkit-transform':messageIndex == i ? transformX : 'translateX(0px)'}" :data-index="i" :data-disabled="it.disabled">
							<view class="uni-swipe-action__content "  @click="update(it)">
								<view class="bk_left">
									<view class="bs_left">
										<view class="le_top">
											<view class="le_text">{{it.name}}</view>
											<view class="ls_margn">{{it.phone}}</view>
										</view>
										<view class="le_top" >
											<!-- <view>{{is_CD(it.certificateList[0].cardType)}}</view> -->
											<view class="ls_margn">{{it.province}}</view>
											<view class="ls_margn">{{it.city}}</view>
											<view class="ls_margn">{{it.address}}</view>
										</view>
									</view>
									<view class="bs_right">
										<view class="iconfont" style="">&#xe617;</view>
									</view>
								</view>
							</view>
							<view class="uni-swipe-action__btn-group" :id="elId">
								<div v-for="(item,index) in options" :key="index" class="uni-swipe-action--btn" :style="{backgroundColor: item.style && item.style.backgroundColor ? item.style.backgroundColor : '#C7C6CD',color: item.style && item.style.color ? item.style.color : '#FFFFFF',fontSize: item.style && item.style.fontSize ? item.style.fontSize : '28upx'}"
								 @click="delet(it.id)">
									{{item.text }}
								</div>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="btn_add" @click="add_btn">
			新增常用地址
		</view>
	</view>
</template>

<script>
	import Mydi from '@/api/mydi.js'
	export default{
		components:{},
		data(){
			const elId = `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`
			return {
				elId: elId,
				transformX: 'translateX(0px)',
				messageIndex: -1,
				options: [
				  {
				    text: "删除",
				    style: {
				      backgroundColor: "#dd524d"
				    }
				  }
				],
				messagesList: [],
				
				
				userlist: [], //用户列表
				carlist: [] //证件类型列表
			}
		},
		created() {
			this.direction = '';
			this.startX = 0;
			this.startY = 0;
			this.btnGroupWidth = 0;
			this.isMoving = false;
		},
		onShow() {
			this.getuserlist()
		},
		methods:{
			toMessageDetail(){
				
			},
			getSize() {
				uni.createSelectorQuery().in(this).select(`#${this.elId}`).boundingClientRect().exec((ret) => {
					if(ret[0]){
						this.btnGroupWidth = ret[0].width;
					}
				});
			},
			bindClickBtn(item, index) {
				this.messageIndex = -1;
				console.log(item.text +'message第'+ index+ '项');
				
			},
			touchStart(event) {
				if(event.currentTarget.dataset.disabled === true){
					return;
				}
				this.startX = event.touches[0].pageX;
				this.startY = event.touches[0].pageY;
			},
			touchMove(event) {
				if (this.direction === 'Y' || event.currentTarget.dataset.disabled === true) {
					this.direction = '';
					return;
				}
				var moveY = event.touches[0].pageY - this.startY,
						moveX = event.touches[0].pageX - this.startX;
				if (!this.isMoving && Math.abs(moveY) > Math.abs(moveX) || Math.abs(moveY) > 100 || Math.abs(moveX) < 50) { //纵向滑动//参数100与50可调节侧滑灵敏度
					this.direction = 'Y';
					return;
				}
				this.direction = moveX > 0 ? 'right' : 'left';
				this.messageIndex = moveX < 0 ? event.currentTarget.dataset.index : -1;
				this.isMoving = true;
			},
			touchEnd(event) {
				this.isMoving = false;
				if (this.direction !== 'right' && this.direction !== 'left') {
					this.direction = '';
					return;
				}
				if (this.direction == 'right') {
					this.messageIndex = -1;
				} 
				this.endMove(event)
			},
			endMove(event) {
				if (this.direction === 'Y' || event.currentTarget.dataset.disabled === true) {
					this.direction = '';
					return;
				}
				if (this.messageIndex !== -1) {
					this.transformX = `translateX(${-this.btnGroupWidth}px)`;
					this.$emit('opened');
				} else {
					this.transformX = 'translateX(0px)';
					this.$emit('closed');
				}
				this.direction = '';
			},
			async getuserlist(){ //查询所有地址
				let _this = this;
				
				try{
					let res = await Mydi.getMailAddressLis();
					
					if(res.code == 200){
						_this.messagesList = res.data;
						setTimeout(()=>{
							this.getSize()
						},500)
					} else {
						_this.showToasts(res.message)
					}
				}catch(e){
					console.log(e)
					
				}
			},
			async delet(item){//删除
				
				try{
					let res = await Mydi.deleteMailAddres({id: item});
					
					if(res.code == 200){
						this.showToasts(res.message)
						this.getuserlist()
						this.transformX = 'translateX(0px)';
						this.$emit('closed');
					} else {
						this.showToasts(res.message)
					}
				}catch(e){
					console.log(e)
					
				}
			},	
			// is_CD(it){ //返回证件名称
			// 	let _this = this;
			// 	let names = "";
			// 	for (var i = 0; i < _this.carlist.length; i++) {
			// 		if(_this.carlist[i].code  == it){
			// 		 	names = _this.carlist[i].name
			// 		}
			// 	}
			// 	return names
			// },
			update(its){//修改跳转
				uni.navigateTo({
					url:'newCommonAddresses/newcommonaddresses?userlist=' +
					encodeURIComponent(JSON.stringify(its))
					// + '&catlist=' + encodeURIComponent(JSON.stringify(this.carlist))
				})
			},
			add_btn(){ //新增跳转
				uni.navigateTo({
					url:'newCommonAddresses/newcommonaddresses'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.ferda{
		width: 100%;
		.ferdv{
			width: 100%;
			.fer_to{
				display: flex;
				width: calc(100% - 40upx);
				padding: 40upx 20upx 10upx 20upx;
				font-size: 30upx;
				color: #C8C7CC;
				.fer_left{
					flex: 1;
					text-align: left;
				}
				.fer_right{
					flex: 1;
					text-align: right;
				}
			}
			.message-list{
				.uni-swipe-action {
					width: 100%;
					overflow: hidden;
					border-bottom: 2upx solid #F1F1F1;
					&__container {
						background-color: #FFFFFF;
						width: 200%;
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						transition: transform 350ms cubic-bezier(.165, .84, .44, 1);
					}
					&__content {
						width: 50%;
						.bk_left{
							width: 100%;
							height: 100%;
							display: flex;
							z-index: 1;
							font-size: 30upx;
							color: #C8C7CC;
							.bs_left{
								height: 100%;
								padding: 30upx 0 30upx 30upx;
								flex: 10;
								.le_top{
									display: flex;
									.le_text{
										width: 20%;
										overflow:hidden; //超出的文本隐藏
										text-overflow:ellipsis; //溢出用省略号显示
										white-space:nowrap; //溢出不换行
										text-align: center;
										font-size: 35upx;
										color: black;
									}
									.ls_margn{
										text-indent: 20upx;
									}
								}
							}
							.bs_right{
								display: flex;
								align-items: center;
								justify-content: center;
								flex: 1;
							}
						}
					}
					&__btn-group {
						display: flex;
						flex-direction: row;
					}
					&--btn {
						padding: 0 60upx;
						color: #FFFFFF;
						background-color: red;
						font-size: 28upx;
						display: inline-flex;
						text-align: center;
						flex-direction: row;
						align-items: center;
					}
				}
			}
		}
		.btn_add{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 110upx;
			background: $uni-color-primary;
			text-align: center;
			line-height: 110upx;
			font-size: 40upx;
			color: #FFFFFF;
			z-index: 888;
		}
	}
</style>
