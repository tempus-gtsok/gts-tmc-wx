<template>
	<view class="Coll">
		<loading>
		</loading>
		<view class="sea_list" v-if="sev_bool">
			<view class="vi_lis" :key="index" v-for="(item,index) in sear_lists" v-if="sear_lists.length>0">
				<view class="vd_left fx">
					{{item.name}}
				</view>
				<view class="vd_st fx">
					{{item.phone}}
				</view>
				<view class="vd_right fx" @click="updatacoll(item)" v-if="rotes('tms:col:modify')">
					详情
				</view>
			</view>
		</view>
		<view class="col_flx">
			<view class="fixd_class">
				<view class="coll_suns">
					<headnavigation titles="员工列表"></headnavigation>
					<view class="coll_sun">
						<view class="coinx">
							<view class="iconfont" style="color: #C0C0C0;text-indent: 10upx;">
								&#xe6a2;
							</view>
							<input v-model="ser_int" type="text" style="width: 100%;" value="" @input="search($event)" placeholder="姓名"  />
						</view>
					</view>
				</view>
				<view class="Coll_top">
					已有
					<view class="coll_num">
						{{nums}}
					</view>	
					名员工加人了公司
				</view>
				<view class="coll_lists">
					<view class="mix-tree-list">
						<block v-for="(item, index) in treeList" :key="index">
							<view 
								class="mix-tree-item"
								:style="[{
										paddingLeft: item.rank*15 + 'px',
										zIndex: item.rank*-1 +50
									}]"
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
								<view class="iconfont" style="color: #007aff;" v-if="!item.lastRank && item.showChild">
									&#xe8a4;
								</view>
								<view class="iconfont" v-if="!item.lastRank && !item.showChild">
									&#xe8a3;
								</view>
								<view class="" style="width: 40upx;" v-if="item.lastRank">
								</view>
								{{item.name}}
								<view class="" v-if="item.userCount != null">
									({{item.userCount}})
								</view>
							</view>
						</block>
					</view>
				</view>
			</view>
			<view class="viw_list">
				<view class="vi_lis" :key="index" v-for="(item,index) in coll_lists">
					<view class="vd_left fx">
						{{item.name}}
					</view>
					<view class="vd_st fx">
						{{item.phone}}
					</view>
					<view class="vd_right fx" @click="updatacoll(item)">
						详情
					</view>
				</view>
			</view>
		</view>
		<view class="btn_add" @click="add_btn" v-if="rotes('tms:col:add')" >
			添加同事
		</view>
	</view>
</template>
<script>
	import Mydi from "@/api/mydi.js"
	export default{
		data(){
			return{
				shetid: 0,
				ser_int:"",
				sev_bool: false,
				sear_lists:[],
				
				isfiex:true,
				
				nums: 0,
				coll_lists: [],
				vl_list: [],
				ceshilist:[],
				treeList:[],
				treeParams: {
					border: true
				},
				numarr:[],
			}
		},
		mounted(){
			this.colllist()
		},
		methods:{
			updatacoll(item){ //修改同事
				uni.navigateTo({
					url:'add_colleag/add_collagu?id='+ item.id
				})
			},
			async search(ev){ //监听搜索的值
				let _this = this
				let va = ev.mp.detail.value.trim() //获取搜索框的值
				try{
					if(va.length > 0){
						
						let res = await Mydi.searchpartments({name: va});//搜索
						
						if(res.code == 200){
							_this.sear_lists = res.data;
						} else {
							_this.showToasts(res.message)
						}
						_this.sev_bool = true
					} else{
						_this.sev_bool = false
					}
				}catch(e){
					console.log(e)
					
				}
			},
			inslist(list){ //遍历树  获取id数组
			  for(let i in list){
				if(list[i].a_attr.userCount != null){
					this.nums+= parseInt(list[i].a_attr.userCount)
				}
			    if(list[i].children){
			      this.inslist(list[i].children);
			    }
			  }
			},
			add_btn(){ //新增同事
				uni.navigateTo({
					url:'add_colleag/add_collagu'
				})
			},
			//扁平化树结构
			renderTreeList(list=[], rank=0, parentId=[]){
				list.forEach(item=>{
					this.treeList.push({
						id: item.id,
						name: item.text,
						userCount: item.a_attr.userCount,
						parentId,  // 父级id数组
						rank,  // 层级
						showChild: false,  //子级是否显示
						show: rank === 0  // 自身是否显示
					})
					if(Array.isArray(item.children) && item.children.length > 0){
						let parents = [...parentId];
						parents.push(item.id);
						this.renderTreeList(item.children, rank+1, parents);
					}else{
						this.treeList[this.treeList.length-1].lastRank = true;
					}
				})
			},
			// 点击
			treeItemTap(item){
				let list = this.treeList;
				let id = item.id;
				if(!item.lastRank){
					item.showChild = !item.showChild;
					list.forEach(childItem=>{
						if(item.showChild === false){
							//隐藏所有子级
							if(!childItem.parentId.includes(id)){ //检测是否包含
								return;
							}
							if(childItem.lastRank !== true){
								childItem.showChild = false;
							}
							childItem.show = false;
						}else{
							if(childItem.parentId[childItem.parentId.length-1] === id){
								childItem.show = true;
								
							}
							// if(item.rank == 0){
							// 	if(!childItem.parentId.includes(id) && !childItem.parentId.includes(this.numarr)){
							// 		childItem.show = false;
							// 	}
							// }
						}
					})
					if(item.showChild == true){
						this.shetid = 0;
						this.searchlist(id);
					}
				} else {
					this.shetid = id;
					this.searchlist(id);
				}
			},
			async searchlist(id){
				let _this = this;
				
				try{
					let res = await Mydi.searchpartments({deptId: id});
					
					if(res.code == 200){
						_this.coll_lists = res.data;
					} else {
						_this.showToasts(res.message)
					}
				}catch(e){
					console.log(e)
					
				}
			},
			async colllist(){
				let _this = this;
				
				try{
					let res = await Mydi.alldepartments();
					
					if(res.code == 200){
						_this.vl_list = res.data;
						_this.inslist(res.data)
						// _this.renderTreeList(_this.ceshilist)
						_this.renderTreeList(res.data)
					} else {
						_this.showToasts(res.message)
					}
				}catch(e){
					console.log(e)
					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.Coll{
		width: 100%;
		height: 100%;
		.sea_list{
			position: fixed;
			width: 90%;
			top: 190upx;
			/*  #ifdef  APP-PLUS || MP-WEIXIN */ 
			top: 240upx;
			/*  #endif  */
			height: 100%;
			padding:0 5%;
			left: 0;
			z-index: 888;
			background: #FFFFFF;
			.vi_lis{
				width:100%;
				border-bottom: 2upx solid #F1F1F1;
				display: flex;
				align-items: center;
				font-size: 35upx;
				height: 90upx;
				line-height: 90upx;
				.fx{
					flex: 1;
					width: 33%;
					overflow:hidden; //超出的文本隐藏
					text-overflow:ellipsis; //溢出用省略号显示
					white-space:nowrap; //溢出不换行
				}
				.vd_left{
					text-align: left;
				}
				.vd_st{
					text-align: center;
				}
				.vd_right{
					color: $uni-color-primary;
					text-align: right;
				}
			}
		}
		.col_flx{
			width: 100%;
			.fixd_class{
				position: fixed;
				width: 100%;
				top: 0;
				left: 0;
				height: 50%;
				overflow: scroll;
				.Coll_top{
					margin-top: 210upx;
					background: #FFFFFF;
					display: flex;
					height: 90upx;
					font-size: 35upx;
					align-items: center;
					text-indent: 30upx;
					.coll_num{
						text-indent: 0upx;
						margin: 0 10upx;
						color: #FF0000;
					}
				}
				.coll_suns{
					position: fixed;
					top:0;
					left: 0;
					height: 180upx;
					width: 100%;
					z-index: 888;
					background: #FFFFFF;
					.Navigation {
						width: 100%;
						height: 90upx;
						display: flex;
						align-items: center;
						background: linear-gradient(to right, #4e92fd 0%, #6e46fe 100%);
						.ongbutn {
							width: 86%;
							color: #ffffff;
							text-align: center;
						}
					}
					.coll_sun{
						height: 90upx;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						.coinx{
							width: calc(100% - 50upx);
							display: flex;
							align-items: center;
							height: 60upx;
							background: #F1F1F1;
							border-radius: 10upx;
							font-size: 30upx;
							border: 2upx solid #C8C7CC;
						}
					}
				}
				.coll_lists{
					width: 100%;
					height: 100%;
					overflow: hidden;
					background: #FFFFFF;
					.mix-tree-list{
						display: flex;
						flex-direction: column;
						padding-left: 30upx;
						.mix-tree-item{
							display: flex;
							align-items: center;
							font-size: 30upx;
							color: #333;
							height: 0;
							opacity: 0;
							transition: .2s;
							position: relative;
						}
						.mix-tree-icon{
							width: 26upx;
							height: 26upx;
							margin-right: 8upx;
							opacity: .9;
						}
						.mix-tree-item.border{
						}
						.mix-tree-item.show{
							border-bottom: 2upx solid #eee;
							height: 80upx;
							opacity: 1;
						}
						.mix-tree-item.colors{
							color: $uni-color-primary;
						}
						.mix-tree-item.rtlock{
							color: $uni-color-primary;
						}
						.mix-tree-item.showchild:before{
							transform: rotate(90deg);
						}
						.mix-tree-item.last:before{
							opacity: 0;
						}
					}
				}
			}
			.viw_list{
				position: fixed;
				z-index: 777;
				bottom: 0;
				left: 0;
				width: 90% ;
				height: 46%;
				padding:0 5%;
				padding-bottom: 120upx;
				background: #FFFFFF;
				border-radius: 15upx;
				overflow: scroll;
				.vi_lis{
					width:100%;
					border-bottom: 2upx solid #F1F1F1;
					display: flex;
					align-items: center;
					font-size: 35upx;
					height: 90upx;
					line-height: 90upx;
					.fx{
						width: 33%;
						overflow:hidden; //超出的文本隐藏
						text-overflow:ellipsis; //溢出用省略号显示
						white-space:nowrap; //溢出不换行
					}
					.vd_left{
						text-align: left;
					}
					.vd_st{
						text-align: center;
					}
					.vd_right{
						color: $uni-color-primary;
						text-align: right;
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
