<template>
	<view class="mian">
		<loading>
		</loading>
		<headnavigation titles="地址编辑"></headnavigation>
		<view class="container999" style="background:#f2f5fa;">
			<view class="recipients">
				<view class="recipients_left">
					收件人
				</view>
				<view class="inp">
					<input type="text" v-model="recipient"  class="input_css" placeholder="输入收件人" />
				</view>
			</view>
			<view class="recipients" style="margin-top: 20upx;">
				<view class="recipients_left">
					手机号
				</view>
				<view class="inp">
					<input type="text" v-model="phone_number"  class="input_css" placeholder="输入手机号" />
				</view>
			</view>
			<view class="recipients" style="margin-top: 20upx;">
				<view class="recipients_left" style="width: 30%;">
					所在地
				</view>
				<view class="inp" style="width: 60%;" @click="showMulLinkageTwoPicker">
					<input type="text" v-model="pickerText"  class="input_css" style="color:#1e2831;" disabled="" placeholder="选择所在地" />
				</view>
				<view class="iconfont" style="width: 10%;text-indent: 25upx;">&#xe8a3;</view>
			</view>
			<view class="recipients" style="margin-top: 20upx;">
				<view class="recipients_left">
					详细地址
				</view>
				<view class="inp">
					<input type="text" v-model="detailed"  class="input_css" placeholder="输入详细地址" />
				</view>
			</view>
			
			<view class="mpvue-picker">
			    <mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
			     @onConfirm="onConfirm" @="" :pickerValueArray="pickerValueArray"></mpvue-picker>
			</view>
			
			<view class="check_btn">
				<view class="chck_left" @click="rblcok">
					取消
				</view>
				<view class="chck_right" @click="save">
					保存
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import cityData from '@/common/city.data.js';
	import certificate from "@/api/certificate.js"
		
	export default {
	    components: {
	        mpvuePicker,
	    },
	    data() {
	        return {
				
				
	            mulLinkageTwoPicker: cityData,
	            cityPickerValueDefault: [0, 0, 1],
	            themeColor: '$uni-color-primary',
	            pickerText: '',
	            mode: '',
	            deepLength: 1,
	            pickerValueDefault: [0],
	            pickerValueArray:[],
				recipient:'',    //收件人
				phone_number:'',  //手机号
				labels:'',
				detailed :'',     //详细地址
				nameId:null,
				isadd: true,//是否是新增
				
				
	        };
	    },
		mounted(){
		},
	    methods: {
	        showMulLinkageTwoPicker() {
	            this.pickerValueArray = this.mulLinkageTwoPicker
	            this.mode = 'multiLinkageSelector'
	            this.deepLength = 2
	            this.pickerValueDefault = [0, 0]
	            this.$refs.mpvuePicker.show()
	        },
	        onConfirm(e) {
				this.pickerText = e.label
	        },
			rblcok() {
        // #ifdef H5
        window.history.back()
        // #endif
        // #ifdef MP-WEIXIN
        uni.navigateBack();
        // #endif
			},
			async save() {
				let _this = this;
				let recipientss = _this.recipient; //收件人
				let phone_numbers =_this.phone_number; //手机号
				let address = _this.pickerText; //所在地
				let detaileds = _this.detailed; //详细地址
				let nameIds = _this.nameId; //id
				let provinces = address.split("-");
				let pro = provinces[0];
				let citys = address.split("-");
				let cit = citys[1];
				if (recipientss == '') {
					_this.showToasts("请输入收件人");
				}else if (phone_numbers == '') {
					_this.showToasts("请输入手机号");
				}else if (this.utils.zzPhone(phone_numbers)) {
					_this.showToasts("请填写正确的11位手机号码");
				}else if (address == '') {
					_this.showToasts("请选择您所在地区");
				}else if (detaileds == '') {
					_this.showToasts("请输入详细地址");
				}
				else{
					let user = {
						"name":recipientss,
						"phone":phone_numbers,
						"province":pro,
						"city":cit,
						"address":detaileds,
						"id":nameIds
					}
					
					try{
						let res =  await certificate.newcommonadd(user);
						
						if(res.code == 200){
							_this.showToasts(res.message);
							setTimeout(()=>{
								uni.navigateBack()
							},500)
						} else {
							_this.showToasts(res.message);
						}
					}catch(e){
						console.log(e)
						
					}
				}
				// for(var i=0;i<_this.list.length;i++){
				// 	if(_this.list[i].cardNo==null||_this.list[i].cardNo==''){
				// 		_this.showToasts("请输入证件号码");
				// 		return;
				// 	}
				// }
			},
			onLoad: function (option) { //判断是新增还是修改
				let _this = this;
				// let cd_list = JSON.parse(option.catlist);
				if(option.userlist){
					let userlists = JSON.parse(option.userlist);
					uni.setNavigationBarTitle({
						title:"编辑地址"
					});
					this.isadd == false
					_this.phone_number = userlists.phone; //电话号码
					_this.recipient = userlists.name; //收件人
					_this.detailed = userlists.address;//详细地址
					_this.pickerText = userlists.province+'-'+userlists.city; //城市
					_this.nameId = userlists.id;//获取旅客id
				} else {
					this.isadd == true
					uni.setNavigationBarTitle({
						title:"新增地址"
					});
					// _this.id_list = cd_list;//获取证件列表
				}
			}
	    },
	}
</script>

<style lang="scss" scoped>
	.mian {
		.content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		
		.logo {
			height: 200rpx;
			width: 200rpx;
			margin-top: 200rpx;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 50rpx;
		}
		
		.text-area {
			display: flex;
			justify-content: center;
		}
		
		.title {
			font-size: 36rpx;
			color: #8f8f94;
		}
		
		.recipients {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			height: 100upx;
			line-height: 100upx;
			background: #FFFFFF;
			
			.recipients_left{
				display: flex;
				width: 30%;
				font-size: 30upx;
				text-indent: 20upx;
				color:#abbdcd;
			}
			.inp{
				width: 70%;
			}
				.input_css{
					height: 100upx;
					color:#333333;
					line-height: 100upx;
				}
		}
		.check_btn {
			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;
			height: 110upx;
			display: flex;
			text-align: center;
			line-height: 110upx;
			font-size: 30upx;
			.chck_left {
				flex: 1;
				height: 110upx;
				background: #FFFFFF;
				color: $uni-color-primary;
			}
			
			.chck_right {
				flex: 1;
				color: #FFFFFF;
				height: 110upx;
				background: $uni-color-primary;
			}
			}
	}
</style>
