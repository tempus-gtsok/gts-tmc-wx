<template>
	<view class="personnel">
		<headnavigation titles="出差人员"></headnavigation>
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
		<view class="cklists" v-if="checkuserlist.length > 0">
			<view class="cklistsds">
				选择人员：
			</view>
			<view class="cklistsd" v-for="(item,index) in checkuserlist" :key="index" @click="deleck(item)">
				{{item.userName}}
			</view>
		</view>
		<view class="pa_bot">
			<view class="coll_lists">
				<view class="mix-tree-list">
					<block v-for="(item, index) in treeList" :key="index">
						<view class="mix-tree-item" :style="[
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
						 @click.stop="treeItemTap(item, index)">
							<view v-if="!item.ischecds" class="tsd">
								<view class="iconfont" style="color: #007aff;" v-if="!item.lastRank && item.showChild">&#xe8a0;</view>
								<view class="iconfont" v-if="!item.lastRank && !item.showChild">&#xe636;</view>
								<view class="" style="width: 40upx;" v-if="item.lastRank"></view>
								{{ item.name }}
								<view class="" v-if="item.rank == 0 && item.userCount > 0">({{ item.userCount }})</view>
							</view>
							<view v-if="item.ischecds" class="tsd">
								<view class="iconfont" :style="{ color: item.checkd ? '#007aff' : '#f1f1f1' }">{{ item.checkd ? oktl : isoktl }}</view>
								<view style="margin-left: 20upx;">{{ item.name }}</view>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
		<view class="fixd_btn" @click="btn_click">选好了</view>
	</view>
</template>

<script>
	import Mydi from '@/api/mydi.js'
	export default{
		data(){
			return{
				searchlists:[],//搜索出的人员
				treeParams: {
					border: true
				},
				oktl: '\ue611',
				isoktl: '\ue75d',
				shetid: 0,
				treeList:[],//所有数据
				checkuserlist:[],//选择人员
				ser_int:'',
				sev_bool: false,
				lis_id: 0,
				id_list: [],
				userid_list:[],//选中的人
			}
		},
		mounted() {
			this.colllist()
		},
		methods:{
			btn_click() {
				//选择当前的人
				let that = this;
				that.userid_list = that.checkuserlist;
				if (that.userid_list.length > 9) {
					uni.showToast({
						title: '出差人数不能大于9个！',
						icon: 'none',
						duration: 1000
					})
					return
				} else if (that.userid_list.length == 0) {
					uni.showToast({
						title: '请选择最少一个出差人！',
						icon: 'none',
						duration: 1000
					})
					return
				}
				uni.$emit('oersibbel',{data:that.userid_list});
				// #ifdef H5
				history.back();
				// #endif
				// #ifdef MP-WEIXIN
				uni.navigateBack()
				// #endif
			},
			async colllist() {
				//查询所有部门
				let _this = this;
				try {
					let res = await Mydi.alldepartments();
			
					if (res.code == 200) {
						_this.renderTreeList(res.data);
						let rest = await Mydi.getPassengerListNoCertificate();
			
						if (rest.code == 200) {
							let dat = rest.data.passList;
							if (dat.length > 0) {
								let ds = [{
									id: "9999",
									name: '常用旅客',
									parentId: [], // 父级id数组
									rank: 0, // 层级
									ischecds: false, //是否是人
									checkd: false, //是否选中
									show: true // 自身是否显示
								}]
								for (let i = 0; i < dat.length; i++) {
									ds.push({
										id: dat[i].id,
										iscd: true, //是否有证件号
										costcenterId: dat[i].costcenterId,
										costcenterName: dat[i].costcenterName,
										passengerNo: dat[i].passengerNo,
										deptName: dat[i].deptName, //部门名称
										deptId: dat[i].deptId, //部门id
										phone: dat[i].phone, //联系电话
										name: dat[i].name,
										istrue: 1, //是否是临时出行人
										parentId: ["9999"], // 父级id数组
										rank: 1, // 层级
										ischecds: true, //是否是人
										checkd: false, //是否选中
										show: false // 自身是否显示
									})
								}
								_this.treeList = ds.concat(_this.treeList);
							}
							this.isuserlist = true;
						}
					} else {
						_this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e)
			
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
							if (list[k].certificateList == null || list[k].certificateList == '') { //判断有没有证件
								si = false
							}
							parents.push(_this.treeList[i].id);
							let t = false;
							for (let s in _this.checkuserlist) {
								if (_this.checkuserlist[s].passengerNo == list[k].passengerNo) {
									t = true;
									break;
								}
							}
							_this.treeList.splice(i + k + 1, 0, {
								id: list[k].id, //员工id
								iscd: si,
								passengerNo: list[k].passengerNo, //员工编号
								deptName: list[k].deptName, //部门名称
								deptId: list[k].deptId, //部门id
								phone: list[k].phone, //联系电话
								istrue: 0, //是否是临时出行人
								name: list[k].name,
								costcenterId: list[k].costcenterId,
								costcenterName: list[k].costcenterName,
								parentId: parents, // 父级id数组
								rank: _this.treeList[i].rank + 1, // 层级
								ischecds: true, //是否是人
								checkd: t, //是否选中
								show: true // 自身是否显示
							});
						}
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
			treeItemTap(item, index) {
				//点击展示
				let id = item.id;
				if (!item.ischecds) {
					this.shetid = id;
					if (id != 9999) {
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
					if (item.iscd == false) {
						uni.showToast({
							title: '该用户暂无证件信息！',
							duration: 1000,
							icon: 'none'
						});
					} else {
						if (this.treeList[index].checkd) {
							this.treeList[index].checkd = false;
							for (let s in this.checkuserlist) {
								if (this.checkuserlist[s].passengerNo == this.treeList[index].passengerNo) {
									this.checkuserlist.splice(s, 1);
									break;
								}
							}
						} else {
							this.treeList[index].checkd = true;
							this.checkuserlist.push({
								istrue: this.treeList[index].istrue,
								passengerNo: this.treeList[index].passengerNo,
								userName: this.treeList[index].name,
								userId: this.treeList[index].id,
								deptName: this.treeList[index].deptName,
								deptId: this.treeList[index].deptId,
								phone: this.treeList[index].phone,
								costcenterId: this.treeList[index].costcenterId,
								costcenterName: this.treeList[index].costcenterName,
							})
						}
					}
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
			
					try {
						let res = await Mydi.searchpartments({
							deptId: id
						});
			
						if (res.code == 200) {
			
							_this.userlist = res.data;
							if (res.data.length > 0) {
								_this.rmdlist(res.data);
							}
						} else {
							_this.showToasts(res.message);
						}
					} catch (e) {
						console.log(e)
			
					}
				}
			},
			seoklist(item) { //选择搜索框的值
				let that = this;
				if (item.costcenterId == null || item.costcenterId == "") {
					uni.showToast({
						title: '该用户暂无成本中心！',
						icon: 'none',
						duration: 1000
					})
					return
				}
				let st = true;
				for (let k in that.checkuserlist) {
					if (item.passengerNo == that.checkuserlist[k].passengerNo) {
						st = false;
						that.showToasts("请不重复选择!")
						return
					}
				}
				if (st) {
					this.checkuserlist.push(item);
					for (let k in this.treeList) {
						if (this.treeList[k].passengerNo == item.passengerNo) {
							this.treeList[k].checkd = true;
							break;
						}
					}
					this.sev_bool = false;
				}
			},
			sea_null() { //清空搜索框的值
				this.ser_int = "";
				this.sev_bool = false;
			},
			deleck(item) { //重复点击删除
				for (let s in this.checkuserlist) {
					if (this.checkuserlist[s].passengerNo == item.passengerNo) {
						this.checkuserlist.splice(s, 1);
						break;
					}
				}
				for (let k in this.treeList) {
					if (this.treeList[k].passengerNo == item.passengerNo) {
						this.treeList[k].checkd = false;
						break;
					}
				}
			},
			
			async search(ev) {
				//监听搜索的值
				let _this = this;
				let va = ev.mp.detail.value.trim(); //获取搜索框的值
				if (va.length > 0) {
					_this.searchlists = [];
					_this.sev_bool = true
					try {
						let res = await Mydi.searchpartments({
							name: va
						});
						if (res.code == 200) {
							let su = res.data;
							for (let k in su) {
								_this.searchlists.push({
									istrue: 0,
									passengerNo: su[k].passengerNo,
									userName: su[k].name,
									userId: su[k].id,
									deptName: su[k].deptName,
									deptId: su[k].deptId,
									phone: su[k].phone,
									costcenterId: su[k].costcenterId,
									costcenterName: su[k].costcenterName,
								})
							}
			
						} else {
							_this.showToasts(res.message);
						}
					} catch (e) {
						console.log(e);
					}
				} else {
					_this.sev_bool = false
				}
			},
			trim(ev) {
				//判断是否有值
				if (ev.trim().length > 0) {
					return true;
				} else {
					return false;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.personnel{
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
		
		.sev_bool {
			position: fixed;
			left: 0;
			top: 230upx;
			/*  #ifdef  APP-PLUS || MP-WEIXIN */
			padding-top: 290upx;
			/*  #endif  */
			width: 100%;
			background: #FFFFFF;
			z-index: 1000;
			height: 100%;
		
			.sev_bools {
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
		
		.cklists {
			margin-top: 10upx;
			padding: 0 30upx;
			// width: 100%;
			display: flex;
			flex-wrap: wrap;
		
			.cklistsd {
				font-size: 30upx;
				padding: 8upx 8upx;
				background: #FFFFFF;
				border-radius: 8upx;
				margin: 10upx;
			}
		}
		
		.cklistsds {
			font-size: 30upx;
			display: flex;
			align-items: center;
			justify-content: center;
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
		
					.mix-tree-item.border {}
		
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
