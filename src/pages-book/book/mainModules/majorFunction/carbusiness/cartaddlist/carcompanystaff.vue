<template>
	<view class="pass_page">
		<loading>
		</loading>
		<headnavigation titles="选择出行人"></headnavigation>
		<view class="pa-top">
			<input v-model="ser_int" type="text" value="" @input="search($event)" class="input-css" placeholder="搜索" />
			<view v-if="trim(ser_int)" class="iconfont" @click="sea_null(ser_int)" style="color: #999999;">&#xe608;</view>
		</view>
		<view class="sev_bool" v-if="sev_bool">
			<view class="sev_bools" v-for="(item,index) in searchlists" @click="seoklist(item)" :key="index">
				<p>{{item.userName}}</p>
				<p style="color: #007aff;font-size: 28upx;">{{item.deptName}}</p>
			</view>
		</view>
		<view class="pa_bot">
			<view class="coll_lists">
				<view class="mix-tree-list">
					<block v-for="(item, index) in treeList" :key="index">
						<view
							class="mix-tree-item"
							:style="[
								{
									paddingLeft: item.rank * 15 + 'px',
									zIndex: item.rank * -1 + 50
								}
							]"
							:class="{
								border: treeParams.border === true,
								show: item.show,
								last: item.lastRank,
								showchild: item.showChild,
								colors: !item.lastRank && item.showChild,
								rtlock: item.id == shetid
							}"
							@click.stop="treeItemTap(item, index)"
						>
							<view v-if="!item.ischecds" class="tsd">
								<view class="iconfont" style="color: #007aff;" v-if="!item.lastRank && item.showChild">&#xe8a0;</view>
								<view class="iconfont" v-if="!item.lastRank && !item.showChild">&#xe636;</view>
								<view class="" style="width: 40upx;" v-if="item.lastRank"></view>
								{{ item.name }}
								<view class="" v-if="item.rank == 0 && item.userCount > 0">({{ item.userCount }})</view>
							</view>
							<view v-if="item.ischecds" class="tsd">
								<view class="iconfont" :style="{ color: '#f1f1f1' }">{{  isoktl }}</view>
								<view style="margin-left: 20upx;">{{ item.name }}</view>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Mydi from '@/api/mydi.js'
	export default{
		data(){
			return{
				oktl: '\ue611',
				isoktl: '\ue75d',
				ser_int:'',
				sev_bool:false,
				searchlists:[],
				treeList:[],
				treeParams: {
					border: true
				},
				id_list: [],
				is_no:0,
				shetid: 0,
				is_index:0
			}
		},
		onLoad(it) {
			this.is_no = it.data;
			if(this.is_no != 1){
				this.is_index = it.index_b
			}
		},
		mounted() {
			this.colllist();
		},
		methods:{
			sea_null(){//清空搜索框的值
				this.ser_int = "";
				this.sev_bool = false;
			},
			seoklist(item){//选择搜索框的值
				if(this.is_no == 1){
					uni.$emit("carcompanystaff",{name:item.userName,ipone:item.phone});
					uni.navigateBack({	
					})
				} else {
					let condats = {
						deptId:item.deptId,
						deptName:item.deptName,
						userId:item.userId,
						phone:item.phone,
						employeeType:item.employeeType,
						passengerNo:item.passengerNo,
						username:item.userName,
						costcenterName:item.costcenterName,
						costcenterId:item.costcenterId
					}
					uni.$emit('carcompanystaffs',{datas:condats,index:this.is_index});
					uni.navigateBack({
					})
				}
			},
			treeItemTap(item, index) {
				//点击展示
				let id = item.id;
				if (!item.ischecds) {
					this.shetid = id;
					if(id != 9999){
						this.searchlist(id);
					}
					let list = this.treeList;
					item.showChild = !item.showChild;
					list.forEach(childItem => {
						if (item.showChild === false) {
							//隐藏所有子级
							if (!childItem.parentId.includes(id)) {
								//检测是否包含
								return;
							}
							if (childItem.lastRank !== true) {
								childItem.showChild = false;
							}
							childItem.show = false;
						} else {
							if (childItem.parentId[childItem.parentId.length - 1] === id) {
								childItem.show = true;
							}
						}
					});
				} else {
					if(this.is_no == 1){
						uni.$emit("carcompanystaff",{name:this.treeList[index].name,ipone:this.treeList[index].phone});
						uni.navigateBack({	
						})
					} else {
						if(this.treeList[index].costcenterName == '' || this.treeList[index].costcenterName == null){
							uni.showToast({
								title:'该用户没有成本中心',
								duration:1000,
								icon:'none'
							})
							return
						}
						if(this.treeList[index].passengerNo == '' || this.treeList[index].passengerNo == null){
							uni.showToast({
								title:'该用户没有用户编号',
								duration:1000,
								icon:'none'
							})
							return
						}
						let condats = {
							deptId:this.treeList[index].deptId,
							deptName:this.treeList[index].deptName,
							userId:this.treeList[index].userId,
							phone:this.treeList[index].phone,
							employeeType:this.treeList[index].employeeType,
							passengerNo:this.treeList[index].passengerNo,
							username:this.treeList[index].name,
							costcenterName:this.treeList[index].costcenterName,
							costcenterId:this.treeList[index].costcenterId
						}
						uni.$emit('carcompanystaffs',{datas:condats,index:this.is_index});
						uni.navigateBack({
						})
					}
				}
			},
			// 重新生成数组
			renderTreeList(list = [], rank = 0, parentId = []) { //出差旅客
				list.forEach(item => {
					this.treeList.push({
						id: item.id,
						name: item.text,
						userCount: item.a_attr.userCount,
						ischecds: false,
						parentId, // 父级id数组
						rank, // 层级
						showChild: false, //子级是否显示
						show: rank === 0 // 自身是否显示
					});
					if (Array.isArray(item.children) && item.children.length > 0) {
						let parents = [...parentId];
						parents.push(item.id);
						this.renderTreeList(item.children, rank + 1, parents);
					}
				});
			},
			trim(ev) {
				//判断是否有值
				if (ev.trim().length > 0) {
					return true;
				} else {
					return false;
				}
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
			async searchlist(id) {
				//查询当前点击部门下的人
				let _this = this;
				_this.lis_id = id;
				let a = _this.id_list.find((value, index, arr) => {
					return value == id;
				});
				if (a == undefined || a == null) {
					_this.id_list.push(id);
					
					try{
						let res = await Mydi.searchpartments({ deptId: id });
						
						if (res.code == 200) {
							
							_this.userlist = res.data;
							if (res.data.length > 0) {
								_this.rmdlist(res.data);
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
				}
			},
			rmdlist(list) {
				//插入当前部门人员
				let _this = this;
				for (let i = 0; i < _this.treeList.length; i++) {
					if (_this.treeList[i].id == _this.lis_id) {
						for (let k = 0; k < list.length; k++) {
							let parents = [..._this.treeList[i].parentId];
							let si = true;
							if(list[k].certificateList == null || list[k].certificateList == ''){//判断有没有证件
								si = false
							}
							parents.push(_this.treeList[i].id);
							let t = false;
							_this.treeList.splice(i + k + 1, 0, {
								id: list[k].id,//员工id
								iscd: si,
								employeeType:list[k].employeeType,
								userId:list[k].userId,
								passengerNo: list[k].passengerNo,//员工编号
								deptName: list[k].deptName,//部门名称
								deptId: list[k].deptId,//部门id
								phone: list[k].phone,//联系电话
								istrue: 0,//是否是临时出行人
								name: list[k].name,
								costcenterName:list[k].costcenterName,
								costcenterId:list[k].costcenterId,
								parentId: parents, // 父级id数组
								rank: _this.treeList[i].rank + 1, // 层级
								ischecds: true, //是否是人
								show: true // 自身是否显示
							});
						}
					}
				}
			},
			async search(ev) {
				//监听搜索的值
				let _this = this;
				let va = ev.mp.detail.value.trim(); //获取搜索框的值
				if(va.length > 0){
					_this.searchlists = [];
					_this.sev_bool = true
					try{
						let res = await Mydi.searchpartments({ name: va });
						if (res.code == 200) {
							
							let su = res.data;
							for (let k in su) {
								_this.searchlists.push({
									istrue: 0,
									id:su[k].id,
									costcenterName:su[k].costcenterName,
									costcenterId:su[k].costcenterId,
									employeeType:su[k].employeeType,
									passengerNo: su[k].passengerNo,
									userName: su[k].name,
									userId: su[k].userId,
									deptName: su[k].deptName,
									deptId: su[k].deptId,
									phone: su[k].phone
								})
							}
							
						} else {
							uni.showToast({
								title:res.message,
								duration:1000,
								icon:'none'
							})
						}
					}catch(e){
						console.log(e);
					}
				} else{
					_this.sev_bool = false
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.pass_page {
		position: fixed;
		z-index: 310;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: scroll;
		background: #f1f1f1;
		.pa-top {
			width: calc(100% - 60upx);
			height: 120upx;
			padding: 0 30upx;
			background: #ffffff;
			display: flex;
			align-items: center;
			input {
				width: 100%;
				height: 80upx;
			}
			.pa_bok {
				margin-right: 20upx;
				display: flex;
				align-items: center;
				.pa_tou {
					.pa_tou_img {
						margin: 0 5upx;
						width: 60upx;
						height: 60upx;
						border-radius: 50%;
					}
				}
			}
		}
		.sev_bool{
			position: fixed;
			left: 0;
			top: 220upx;
			width: 100%;
			background: #FFFFFF;
			z-index: 1000;
			height: 100%;
			.sev_bools{
				width: calc(100% - 40upx);
				font-size: 32upx;
				height: 80upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 20upx;
				border-bottom: 1upx solid #C8C7CC;
			}
		}
		.pa_bot {
			margin-top: 20upx;
			width: 100%;
			background: #ffffff;
			.coll_lists {
				width: 100%;
				height: 100%;
				overflow: hidden;
				background: #ffffff;
				.mix-tree-list {
					display: flex;
					flex-direction: column;
					padding-left: 30upx;
					.mix-tree-item {
						display: flex;
						align-items: center;
						font-size: 30upx;
						color: #333;
						height: 0;
						opacity: 0;
						transition: 0.2s;
						position: relative;
						.tsd {
							display: flex;
							align-items: center;
						}
					}
					.mix-tree-icon {
						width: 26upx;
						height: 26upx;
						margin-right: 8upx;
						opacity: 0.9;
					}
					.mix-tree-item.border {
					}
					.mix-tree-item.show {
						border-bottom: 2upx solid #eee;
						height: 80upx;
						opacity: 1;
					}
					.mix-tree-item.colors {
						color: $uni-color-primary;
					}
					.mix-tree-item.rtlock {
						color: $uni-color-primary;
					}
					.mix-tree-item.showchild:before {
						transform: rotate(90deg);
					}
					.mix-tree-item.last:before {
						opacity: 0;
					}
				}
			}
		}
		.fixd_btn {
			position: fixed;
			z-index: 815;
			bottom: 150upx;
			right: 30upx;
			font-size: 35upx;
			color: #ffffff;
			text-align: center;
			line-height: 70upx;
			width: 160upx;
			height: 70upx;
			border-radius: 70upx;
			background: $uni-color-primary;
		}
	}
</style>
