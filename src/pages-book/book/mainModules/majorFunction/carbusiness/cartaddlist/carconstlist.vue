<template>
	<view class="costs">
		<headnavigation titles="选择成本中心"></headnavigation>
		<view class="costslist" v-for="(item,index) in costlist" :key="index">
			<view class="costsli">
				<view class="costleft">
					<span class="iconfont" @click="delecos(index)">&#xe644;</span>
					适用人员
				</view>
				<view class="costrightpl" @click="mulist(index)" v-if="item.username == ''">
					请选择适用人员(必填)
				</view>
				<view class="costright" @click="mulist(index)" v-else>
					{{item.username}}
				</view>
			</view>
			<view class="costsli">
				<view class="costleft">
					成本中心
				</view>
				<view class="costrightpl" @click="mulist(index)" v-if="item.costcenterName == ''">
					所在成本中心
				</view>
				<view class="costright" v-else>
					{{item.costcenterName}}
				</view>
			</view>
			<view class="costsli">
				<view class="costleft">
					成本比例
				</view>
				<view class="costright">
					<input v-model="item.bn" type="number" maxlength="4" value="" />%
				</view>
			</view>
		</view>
		<view class="costadd" @click="costadd">
			<span class="iconfont">&#xe89f;</span>
		</view>
		<view class="btnsok" @click="costadds">
			确定
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				costlist:[],//当前选择的成本中心
			}
		},
		onLoad(it) {
			console.log(JSON.parse(it.data))
			let dstp = JSON.parse(it.data);
			this.costlist = dstp;
		},
		onShow() {
			uni.$on("carcompanystaffs", rets => {
				this.costlist[rets.index].deptId = rets.datas.deptId;
				this.costlist[rets.index].deptName = rets.datas.deptName;
				this.costlist[rets.index].userId = rets.datas.userId;
				this.costlist[rets.index].phone = rets.datas.phone;
				this.costlist[rets.index].employeeType = rets.datas.employeeType;
				this.costlist[rets.index].passengerNo = rets.datas.passengerNo;
				this.costlist[rets.index].username = rets.datas.username;
				this.costlist[rets.index].costcenterName = rets.datas.costcenterName;
				this.costlist[rets.index].costcenterId = rets.datas.costcenterId;
				uni.$off("carcompanystaffs")
			})
		},
		mounted() {
		},
		methods:{
			costadd(){
				this.costlist.push({
					passengerNo:'',
					username: '',
					costcenterName:'',
					costcenterId:0,
					bn:0,
					deptId:0,
					deptName:'',
					userId:0,
					phone:0,
					employeeType:'',
					id:0
				})
			},
			async colllist() {
				//查询所有部门
				let _this = this;
				
				try{
					let res = await Mydi.alldepartments();
					_this.treeList = [];
					
					if (res.code == 200) {
						_this.renderTreeList(res.data);
						let rest = await Mydi.getPassengerListNoCertificate();
						
						if(rest.code == 200){
							let dat = rest.data.passList;
							if(dat.length>0){
								let ds = []
								for (let i = 0; i < dat.length; i++) {
									ds.push({
										id: dat[i].id,
										iscd: true,//是否有证件号
										employeeType:dat[i].employeeType,
										userId:dat[i].userId,
										costcenterName:dat[i].costcenterName,
										costcenterId:dat[i].costcenterId,
										passengerNo: dat[i].passengerNo,
										deptName: dat[i].deptName,//部门名称
										deptId: dat[i].deptId,//部门id
										phone: dat[i].phone,//联系电话
										name: dat[i].name,
										istrue: 1,//是否是临时出行人
										parentId: ["9999"], // 父级id数组
										rank: 1, // 层级
										ischecds: true, //是否是人
										show: false // 自身是否显示
									})
								}
								_this.treeList  = ds.concat(_this.treeList);
							}
							this.isuserlist = true;
						}
					} else {
						uni.showToast({
							title:res.message,
							duration:1000,
							icon:'none'
						})
					}
				}catch(e){
					console.log(e)
					
				}
			},
			costadds(){//提交当前成本
				let list = this.costlist;
				if(list.length == 0){
					uni.showToast({
					    title: '请选择最少一个成本',
					    duration: 1000,
						icon:'none'
					});
					return
				}
				let nums = 0;
				let nameslit = [];
				for (let i in list) {
					if(list[i].username == '' || list[i].bn === ''){
						uni.showToast({
						    title: '所有值不能为空',
						    duration: 1000,
							icon:'none'
						});
						return
					}
					if(list[i].bn == 0){
						uni.showToast({
						    title: '比例不能为0%',
						    duration: 1000,
							icon:'none'
						});
						return
					}
					let a = nameslit.find((value, index, arr) => {
						return value == list[i].username;
					});
					if (a == undefined || a == null) {
						nameslit.push(list[i].username)
					} else {
						uni.showToast({
							title:'适用人员不能重复',
							duration:1000,
							icon:'none'
						})
						return
					}
					nums = this.add(nums,parseFloat(list[i].bn).toFixed(1));
				}
				if(nums != 100){
					uni.showToast({
						title:'比例总和不为100',
						duration:1000,
						icon:'none'
					})
					return
				}
				uni.$emit("carconstlist",{dats:list})
				uni.navigateBack({
				})
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
			mulist(index) { //查询所有部门
				uni.navigateTo({
					url:"./carcompanystaff?data=2" + "&index_b=" + index
				})
			},
			delecos(inde){//删除当前成本
				this.costlist.splice(inde,1);
			},
		}
	}
</script>

<style scoped lang="scss">
	.costs{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #F1F1F1;
		z-index: 200;
		overflow: scroll;
		.costslist{
			width: calc(100% - 40upx);
			background-color: #FFFFFF;
			margin: 20upx 20upx 0 20upx;
			border-radius: 10upx;
			.costsli{
				display: flex;
				line-height: 90upx;
				width: calc(100% - 80upx);
				margin: 0 40upx;
				border-bottom: 1upx solid #F1F1F1;
				.costleft{
					width: 40%;
					font-size: 35upx;
					display: flex;
					align-items: center;
					span{
						color: red;
						font-size: 45upx;
						margin-right: 10upx;
					}
				}
				.costrightpl{
					width: 60%;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					font-size: 32upx;
					color: #C8C7CC;
				}
				.costright{
					width: 60%;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					font-size: 32upx;
					input{
						width: 150upx;
						height: 60upx;
						text-align: center;
						margin-right: 10upx;
						background-color: #F1F1F1;
					}
				}
			}
		}
		.costadd{
			width: calc(100% - 40upx);
			height: 80upx;
			margin: 20upx 20upx 20upx 20upx;
			background: #FFFFFF;
			border-radius: 10upx;
			display: flex;
			align-items: center;
			justify-content: center;
			span{
				color: #52C41A;
				font-size: 45upx;
			}
		}
		.btnsok{
			margin: 60upx 20upx 20upx 20upx;
			width: calc(100% - 40upx);
			height: 90upx;
			background-color: $uni-color-primary;
			text-align: center;
			line-height: 90upx;
			font-size: 34upx;
			color: #FFFFFF;
			border-radius: 10upx;
		}
	}
</style>
