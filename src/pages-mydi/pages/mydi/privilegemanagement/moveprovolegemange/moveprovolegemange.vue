<template>
	<view class="main">
		<loading>
		</loading>
		<headnavigation :titles="titles"></headnavigation>
		<view class="bodys">
			<view class="name_left">
				角色中文名称：
			</view>
			<view class="value_right">
				<input type="text" v-model="user.name" placeholder="请输入角色的中文名称" value="" />
			</view>
		</view>
		<view class="bodys">
			<view class="name_left">
				角色英文名称：
			</view>
			<view class="value_right">
				<input type="text" v-model="user.code" placeholder="请输入角色的英文名称" value="" />
			</view>
		</view>
		<view class="bodys">
			<view class="name_left">
				备注：
			</view>
			<view class="value_right">
				<input type="text" v-model="user.remark" placeholder="请输入备注" value="" />
			</view>
		</view>
		<view class="coll_lists">
			<view class="mix-tree-list">
				<block v-for="(item, index) in Jurisdiction_lsit" :key="index">
					<view 
						class="mix-tree-item"
						:style="[{
								paddingLeft: item.rank*40 + 'upx',
								zIndex: item.rank*-1 +50
							}]"
						:class="{
								show: item.show,
								last: item.lastRank,
								showchild: item.showChild,
								colors: !item.lastRank && item.showChild
							}"
						@click.stop="treeItemTap(item, index)"
					>
						<view class="iconfont" style="color: #007aff;margin-right: 20upx;" v-if="!item.lastRank && item.showChild">
							&#xe8a4;
						</view>
						<view class="iconfont" style="margin-right: 20upx;" v-if="!item.lastRank && !item.showChild">
							&#xe8a3;
						</view>
						<view class="" style="width: 60upx;" v-if="item.lastRank">
						</view>
						<view @click.stop="addlists(item, index)">
							<checkbox :checked="item.ischeckd"></checkbox>
							{{item.name}}
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="check_btn">
			<view class="chck_left" @click="roblak">
				返回
			</view>
			<view class="chck_right" @click="dlogclik()">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	import Mydi from '@/api/mydi.js'
	export default{
		data(){
			return{
				titles:'',
				user:{
					name: "",//角色名称
					code: "",//角色英文名称
					remark: ""//备注
				},
				ismo:false,//是否默认角色
				shetid: 0,
				
				
				items_id: 0,
				Jurisdiction_lsit:[],
				rolePermissionIds:[],
				treeParams: {
					defaultIcon: '/static/mix-tree/defaultIcon.png',
					currentIcon: '/static/mix-tree/currentIcon.png',
					lastIcon: ''
				},
			}
		},
		mounted() {
			this.frealist()
		},
		methods:{
			roblak(){
				uni.navigateBack({
					url:'../privilegemanagement'
				})
			},
			async dlogclik(){ //新增或者修改
				let that = this
				let name = that.user.name;
				let code = that.user.code;
				let remark = that.user.remark;
				let arr = [];
				for (var i = 0; i < that.Jurisdiction_lsit.length; i++) {
					if(that.Jurisdiction_lsit[i].ischeckd){
						arr.push(that.Jurisdiction_lsit[i].id)
					}
				}
				if(name == ""|| code == ""){
					that.showToasts("名称不能为空！")
				} else if(arr.length == 0){
					that.showToasts("请选择对应的权限！")
				} else {
					let dt = {}
					if(that.items_id == -1){//新增
						dt = {
							id: "",
							name: name,
							code: code,
							remark: remark,
							permissionIds: arr.join(',')
						}
					} else {//修改
						dt = {
							id: that.items_id,
							name: name,
							code: code,
							remark: remark,
							permissionIds: arr.join(',')
						}
					}
					
					try{
						let res = await Mydi.addOrUpdateRole(dt)
						
						if(res.code == 200){
							that.showToasts(res.message)
							setTimeout(()=>{
								uni.navigateTo({
									url:'../privilegemanagement'
								})
							},500)
						} else {
							that.showToasts(res.message)
						}
					}catch(e){
						console.log(e)
						
					}
				}
			},
			addlists(item,index){//点击多选框
				let _this = this;
				if(item.ischeckd == false){
					_this.Jurisdiction_lsit[index].ischeckd = true
				} else {
					_this.Jurisdiction_lsit[index].ischeckd = false
				}
				for (var i = 0; i < _this.Jurisdiction_lsit.length; i++) {
					if(_this.Jurisdiction_lsit[i].parentId.includes(item.id) ){
						if(item.ischeckd == true){
							_this.Jurisdiction_lsit[i].ischeckd = true
						} else {
							_this.Jurisdiction_lsit[i].ischeckd = false
						}
					}
					if(item.parentId.includes(_this.Jurisdiction_lsit[i].id)){
						if(item.ischeckd == true){
							_this.Jurisdiction_lsit[i].ischeckd = true
						} else {
							let si = [];
							for (var k = 0; k < _this.Jurisdiction_lsit.length; k++) {
								if( _this.Jurisdiction_lsit[k].parentId == item.parentId){
									si.push(_this.Jurisdiction_lsit[k].ischeckd)
								}
							}
							if (si.length >0){ //判断是否还有同级的被选中
								let a = si.join('-');
								let b = a.split('false');
								if(si.length == b.length - 1){
									_this.Jurisdiction_lsit[i].ischeckd = false
								}
							} else {
								_this.Jurisdiction_lsit[i].ischeckd = false
							}
						}
					}
				}
			},
			async frealist(){ //查询当前角色的权限
				let that = this
				
				try{
					let res = await Mydi.getPermission({roleId:that.items_id})
					
					if(res.code == 200){
						that.renderTreeList(res.data.list);//获取所有权限	
						that.rolePermissionIds = res.data.rolePermissionIds;//获取已拥有权限
						if(this.items_id != -1){
							that.chekslist(that.rolePermissionIds);//选中已有权限
						}
					} else {
						that.showToasts(res.message)
					}
				}catch(e){
					console.log(e)
					
				}
			},
			//扁平化树结构
			renderTreeList(list=[], rank=0, parentId=[]){
				list.forEach(item=>{
					this.Jurisdiction_lsit.push({
						id: item.id,
						name: item.functionName,
						parentId,  // 父级id数组
						rank,  // 层级
						ischeckd: false, //是否选中
						showChild: false,  //子级是否显示
						show: rank === 0  // 自身是否显示
					})
					if(Array.isArray(item.childPermissions) && item.childPermissions.length > 0){
						let parents = [...parentId];
						parents.push(item.id);
						this.renderTreeList(item.childPermissions, rank+1, parents);
					}else{
						this.Jurisdiction_lsit[this.Jurisdiction_lsit.length-1].lastRank = true;
					}
				})
			},
			chekslist(list){//选中已有权限
				let _this = this
				for (var i = 0; i < _this.Jurisdiction_lsit.length; i++) {
					if(list.includes(_this.Jurisdiction_lsit[i].id)){
						_this.Jurisdiction_lsit[i].ischeckd = true
					}
				}
			},	
			treeItemTap(item){//点击当前
				let list = this.Jurisdiction_lsit;
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
						}
					})
					if(item.showChild == true){
						this.shetid = 0;
					}
				} else {
					this.shetid = id;
				}
			}
		},
		onLoad(item) {
			if(item.id == 0){
				uni.setNavigationBarTitle({
					title:"新增角色"
				});
				this.titles = "新增角色";
				this.items_id = -1;
			} else {
				uni.setNavigationBarTitle({
					title:"修改角色"
				});
				this.titles = "修改角色";
				this.items_id = item.id
				let us = JSON.parse(item.users);
				this.user.name = us.name;
				this.user.code = us.code;
				this.user.remark = us.remark;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main{
		.bodys{
			width: 100%;
			display: flex;
			font-size: 30upx;
			line-height: 80upx;
			background: #FFFFFF;
			border-bottom: 2upx solid #F1F1F1;
			.name_left{
				width: 30%;
				text-align: right;
			}
			.value_right{
				width: 70%;
				display: flex;
				align-items: center;
				justify-content: center;
				input{
					font-size: 30upx;
					width: 100%;
				}
			}
		}
		.coll_lists{
			width: 100%;
			height: 100%;
			background: #FFFFFF;
			border-radius: 15upx;
			margin-top: 30upx;
			padding-bottom: 160upx;
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
					height: 80upx;
					opacity: 1;
					border-bottom: 2upx solid #eee;
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
		.check_btn{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 110upx;
			display: flex;
			text-align: center;
			line-height: 110upx;
			font-size: 30upx;
			z-index: 800;
			   box-shadow: 0 0 12px 0 rgba(177, 190, 203, 0.5) !important;
			.chck_left{
				flex: 1;
				height: 110upx;
				background: #FFFFFF;
				color: $uni-color-primary;
			}
			.chck_right{
				flex: 1;
				color: #FFFFFF;
				height: 110upx;
				background: $uni-color-primary;
			}
		}
	}
</style>
