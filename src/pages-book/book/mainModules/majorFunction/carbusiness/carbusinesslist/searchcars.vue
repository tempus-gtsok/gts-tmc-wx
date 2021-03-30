<template>
	<view class="citysfs">
		<view class="cittop">
			<view class="cli_right" @click="closest">
				<cover-image class='imgs' src='/static/img/carbus/carbusingimg/leftj.png'></cover-image>
			</view>
			<view class="cit_left" @click="citylistfl">
				<view class="ciname">{{city_vl}}</view>
				<span class="iconfont">&#xe8a4;</span>
			</view>
			<view class="citinput">
				<span class="iconfont">&#xe6a2;</span>
				<input type="text" v-model="citval" @input="search_h($event)" />
				<span class="iconfont" v-if="citval.length > 0" @click="citval = ''" style="color: #A2A2A2;font-size: 40upx;">&#xe641;</span>
			</view>
		</view>
		<view class="citylists">
			<view class="cityul" v-for="(item,index) in citylist" :key="index" v-if="citval != ''">
				<!-- <view class="cityli" v-if="item.children.length > 0" @click="adress(item,1)">
					<view class="cinams">{{item.name}}</view>
					<view class="ciaddress">{{item.pname}}{{item.cityname}}{{item.adname}}{{item.name}}</view>
					<view class="citychirder">
						<view class="culis" @click.stop="adress(items,2,item)" v-for="(items,indexs) in item.children" v-if="indexs < 6" :key="indexs">
							{{items.sname}}
						</view>
					</view>
				</view> -->
				<view class="cityli" @click="adress(item,1)">
					<view class="cinams">{{item.title}}</view>
					<view class="ciaddress">{{item.address}}</view>
				</view>
			</view>
			<view class="cityul" v-for="(item,index) in hitorylist" :key="index" v-if="citval == ''">
				<view class="cityli" @click="hitory(item)">
					<view class="cinams">{{item.title}}</view>
					<view class="ciaddress">{{item.adress}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import torok from '@/api/torowk.js'
	export default {
		data() {
			return {
				hitorylist: [], //历史数据
				citylist: [],
				city_vl: '深圳', //所在城市
				citval: '',
				catopvalue: 1,
				addfor: 1,
				flotsid: 1
			}
		},
		onLoad(item) {
			let dagt = JSON.parse(item.data);
			this.catopvalue = dagt.catopvalue;
			this.city_vl = dagt.city_vl;
			this.addfor = dagt.addfor;
			this.flotsid = dagt.flotsid;
		},
		onShow() {
			uni.$on("carcitys", rets => {
				var res = rets.data;
				this.city_vl = res;
				// 清除监听
				uni.$off('carcitys');
			})
		},
		mounted() {
			if (this.addfor == 3 && this.flotsid == 2) {
				let sut = uni.getStorageSync("carhistoyfj" + uni.getStorageSync('appWxId'));
				if (sut.length > 0) {
					this.hitorylist = sut;
				} else {
					this.hitorylist = []
				}
				console.log(this.hitorylist)
			} else {
				let sut = uni.getStorageSync("carhistoy" + uni.getStorageSync('appWxId'));
				if (sut.length > 0) {
					this.hitorylist = sut;
				} else {
					this.hitorylist = []
				}
			}

		},
		methods: {
			closest() {
				uni.navigateBack({})
			},
			hitory(item) { //选择历史
				let datsw = {
					name: item.title,
					adress: item.adress,
					location: item.location,
					longitude: item.longitude,
					latitude: item.latitude,
					catopvalue: this.catopvalue,
					addfor: this.addfor,
					flotsid: this.flotsid,
					city:item.city,
				}
				this.listshitoy(datsw, [item.longitude, item.latitude], )
				uni.$emit("searchcars", {
					data: datsw
				});
				uni.navigateBack({})
			},
			adress(tiem, va, lis) { //选择当前城市
				let locs = tiem.location;
				let adtss = ''
				adtss = tiem.address
				if (tiem.city.indexOf("市") != -1 || tiem.city.indexOf("州") != -1){
				    tiem.city = tiem.city.substring(0, tiem.city.length - 1)
				}
				let dats = {
					name: tiem.title,
					adress: adtss,
					city:tiem.city,
					location: locs.lng.toFixed(6) + ',' + locs.lat.toFixed(6),
					longitude: locs.lng.toFixed(6),
					latitude: locs.lat.toFixed(6),
					catopvalue: this.catopvalue,
					addfor: this.addfor,
					flotsid: this.flotsid,
				}
				this.listshitoy(dats, [dats.longitude, dats.latitude])
				uni.$emit("searchcars", {
					data: dats
				});
				uni.navigateBack({})
			},
			listshitoy(tiem, locs) { //插入历史城市
				let list;
				if (this.addfor == 3 && this.flotsid == 2) {
					list = uni.getStorageSync("carhistoyfj" + uni.getStorageSync('appWxId'));
				} else {
					list = uni.getStorageSync("carhistoy" + uni.getStorageSync('appWxId'));
				}
				if (list.length > 0) {
					for (let k in list) {
						if (list[k].title == tiem.name) {
							list.splice(k, 1);
						}
					}
					if (list.length > 19) {
						list.splice(19, 1);
					}
					list.unshift({
						city:tiem.city,
						title: tiem.name,
						adress: tiem.adress,
						location: tiem.location,
						longitude: locs[0],
						latitude: locs[1],
					})
				} else {
					list = [{
						city:tiem.city,
						title: tiem.name,
						adress: tiem.adress,
						location: tiem.location,
						longitude: locs[0],
						latitude: locs[1],
					}]
				}
				if (this.addfor == 3 && this.flotsid == 2) {
					uni.setStorageSync("carhistoyfj" + uni.getStorageSync('appWxId'), list);
				} else {
					uni.setStorageSync("carhistoy" + uni.getStorageSync('appWxId'), list);
				}
			},
			citylistfl() {
				uni.navigateTo({
					url: "./carcitys"
				})
			},
			search_h(ev) { //监听搜索的值
				let _this = this
				let va = ev.mp.detail.value.trim() //获取搜索框的值
				if (va.length > 0) {
					this.seatck(va, false)
				}
			},
			async seatck(va, ls) {
				console.log("va", va, 'ls', ls)
				let _this = this;
				let tys = "";
				if (_this.addfor == 3 && _this.flotsid == 2 || ls == true) {
					tys = '飞机场'
				} else {
					tys = '基础设施,房产小区,银行金融,教育学校,文化场馆'
				}
				try {
					let dats = {
						region: this.city_vl,
						keyword: va,
						get_subpois: 1,
						filter: 'category=' + tys
					}
					let res = await torok.placesuggestion(dats);
					this.citylist = res.data;
				} catch (e) {
					console.log(e)
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.citysfs {
		width: 100%;
		/*  #ifdef MP-WEIXIN */
		padding-top: 80upx;
		/*  #endif  */
		background-color: #FFFFFF;

		.cittop {
			display: flex;
			height: 100upx;
			align-items: center;

			.cit_left {
				width: 140upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 32upx;

				.ciname {
					width: 70upx;
					text-align: left;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.citinput {
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #F5F5F5;
				border-radius: 8upx;
				//width: calc(100% - 280upx);
				height: 65upx;

				span {
					font-size: 34upx;
					padding: 0 10upx;
				}

				input {
					width: 100%;
				}
			}

			.cli_right {
				width: 70upx;
				height: 65upx;
				display: flex;
				align-items: center;
				justify-content: center;

				.imgs {
					width: 45upx;
					height: 45upx;
				}
			}
		}

		.citylists {
			width: 100%;

			.cityul {
				width: calc(100% - 40upx);
				padding: 15upx 20upx;
				font-size: 30upx;
				border-top: 2upx solid #F1F1F1;

				.cityli {
					.ciaddress {
						font-size: 25upx;
						color: #B9C1BE;
					}

					.citychirder {
						display: flex;
						flex-wrap: wrap;
						align-content: space-between;

						.culis {
							width: calc(30% + 5upx);
							margin: 1%;
							font-size: 26upx;
							text-align: center;
							line-height: 50upx;
							border-radius: 8upx;
							border: 1upx solid #CACACA;
							color: #9F9F9F;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}
			}
		}
	}
</style>
