<template>
	<view class="trandetails">
		<view class="black_mu" @click="isshow" v-if="blac_show"></view>
		<loading>
		</loading>
		<view class="Navigations">
			<view @click="rblcok" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
			<view class="ongbutns">
				{{tiltext}}
			</view>
			<view class="onright">
				<view class="onrights" @click="deletli" v-if="isclose && rotes('tms:dps:list:cancel')">
					取消订单
				</view>
				<view class="mask" v-if="companyi_click" @click="companym_click">
				</view>
				<view class="Popout" v-if="popout">
					<view class="prtops">
						是否取消订单?
					</view>
					<view class="popous">
						<view class="pons" v-for="(item,index) in xianlsit" :class="item.id == maoid ? 'ponoks':''" :key="index" @click="xian(item.id)">
							<view class="iconfont" v-if="item.id !=maoid" style="font-size: 38upx;">&#xe7bf;</view>
							<view class="iconfont" v-if="item.id ==maoid" style="font-size: 38upx;">&#xe60a;</view>
							<view style="margin-left: 10upx;">{{item.name}}</view>
						</view>
					</view>
					<view class="confirm">
						<view class="confirm_a" @click="whether('1')">是</view>
						<view class="confirm_b" @click="whether('2')">否</view>
					</view>
				</view>
			</view>

			<view class="fixs_list" :class="fxli ? 'shows' : 'hides'">
				<!-- 航班动态 -->
				<!-- <view class="Navigation">
					<view @click="fxli = false" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
					<view class="ongbutn">
						经停站
					</view>
				</view> -->
				<view class="fix_los" v-for="(item,index) in fxlilist" :key="index">
					<view class="fitx_les stsb">
						<view class="scks">
							{{index + 1}}
						</view>
						{{item.fromStation}}
					</view>
					<view class="fitx_les" style="text-align: center;">
						{{item.departureTime}}
					</view>
					<view class="fitx_les" v-if="index != 0" style="text-align: center;">
						停{{item.stayTimeSpan}}分钟
					</view>
					<view class="fitx_les" v-if="index == 0" style="text-align: center;">
						--
					</view>
				</view>
			</view>
		</view>
		<view class="black_mu" @click="isshow" v-if="switfals">
			<view class="isswflist" @click.stop="" :class="switfal ? 'show' : ''">
				<view class="isstop">
					<view class="">
						{{sittext}}
					</view>
					<view @click="isshow" class="iconfont" style="color: #C0C0C0;font-size: 50upx;">
						&#xe641;
					</view>
				</view>
				<view class="isstops">
					<p> 1.{{stlistad.remark}}</p>
					<p>2.改签规定：{{stlistad.refundTicketDes}}</p>
					<p>3.签转规定：{{stlistad.signTicketDes}}</p>
				</view>
			</view>
		</view>
		<view class="navstop" v-if="userslist.tr">
			<view class="">
				订单号：{{codes}}
			</view>
			<view class="cits_bls">
				<view class="cits_sgs" v-if="userslist.tr.orderDetailList.length == '1' && userslist.tr.amount!= 0 && insuranceInfos != null">
					<!-- ￥{{userslist.tr.amount + (item.pretium * userlist.length)}} -->
					￥{{userslist.tr.amount}}
				</view>
				<view class="cits_sgs" v-if="userslist.tr.orderDetailList.length == '1' && userslist.tr.amount!= 0 && insuranceInfos == null">
					￥{{userslist.tr.amount}}
					<!-- ￥{{userslist.tr.amount + (userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].tips * userlist.length)}} -->
				</view>
				<view class="cits_sgs" v-if="userslist.tr.orderDetailList.length == '2' && userslist.tr.amount!= 0 && insuranceInfos != null">
					<!-- ￥{{userslist.tr.amount + (item.pretium * userlist.length)}} -->
					￥{{userslist.tr.amount}}
				</view>
				<view class="cits_sgs" v-if="userslist.tr.orderDetailList.length == '2' && userslist.tr.amount!= 0 && insuranceInfos == null">
					￥{{userslist.tr.amount}}
					<!-- ￥{{userslist.tr.amount + (userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].tips * userlist.length)}} -->
				</view>
				<view class="cits_sgs" @click="clikst">
					明细>
				</view>
				<view class="cits_cls" @click="toaddls">
					去购票
				</view>
			</view>
			<view class="mask" v-if="companyi_click" @click="companym_click">
			</view>
			<view class="costlists" :class="costs ? 'show' : ''">
				<view class="costl_t">
					费用明细
				</view>
				<view class="costlist_s">
					<view class="cost_li costs">
						<view class="scse_l">
							票价
						</view>
						<view class="scse_r" v-if="userslist.tr.orderDetailList.length == '1' && userslist.tr.orderDetailList[0].voyages.length != '2'">
							<view class="corssize">
								￥{{userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].salePrice - userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].tips}}
							</view>
							<!-- <view class="">
								x{{userlist.length}}人
							</view> -->
						</view>
						<view class="scse_r" v-if="userslist.tr.orderDetailList.length == '1' && userslist.tr.orderDetailList[0].voyages.length == '2'">
							<view class="corssize">
								去程￥{{userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].salePrice - userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].tips}}
								返程￥{{userslist.tr.orderDetailList[0].passengers[0].fareInfos[1].salePrice - userslist.tr.orderDetailList[0].passengers[0].fareInfos[1].tips}}
							</view>
						</view>
						<view class="scse_r" v-if="userslist.tr.orderDetailList.length == '2'">
							<view class="corssize">
								去程￥{{userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].salePrice - userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].tips}}
								返程￥{{userslist.tr.orderDetailList[1].passengers[0].fareInfos[0].salePrice - userslist.tr.orderDetailList[1].passengers[0].fareInfos[0].tips}}
							</view>
							<view class="">
								<!-- x{{userlist.length}}人 -->
							</view>
						</view>
					</view>
					<view class="cost_li costs">
						<view class="scse_l">
							基建/燃油
						</view>
						<view class="scse_r" v-if="userslist.tr.orderDetailList.length == '1'">
							<view class="corssize">
								￥{{userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].taxFee}}/
							</view>
							<view class="" style="color: #F48F00;">
								￥{{userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].fuelFee}}
							</view>
						</view>
						<view class="scse_r" v-if="userslist.tr.orderDetailList.length == '2'">
							<view class="corssize">
								￥{{userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].taxFee + userslist.tr.orderDetailList[1].passengers[0].fareInfos[0].fuelFee}}/
							</view>
							<view class="" style="color: #F48F00;">
								￥{{userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].taxFee + userslist.tr.orderDetailList[1].passengers[0].fareInfos[0].fuelFee}}
							</view>
						</view>
					</view>
					<view class="cost_li costs">
						<view class="scse_l">
							保险
						</view>
						<view class="scse_r">
							<view class="corssize" v-if="(userslist.tr.orderDetailList.length == '1' || userslist.tr.orderDetailList.length == '2') && insuranceInfos == null">
								￥0
							</view>
							<view class="corssize" v-if="userslist.tr.orderDetailList.length == '1' && insuranceInfos != null" v-for="(item,index) in insuranceInfos"
							 :key="index">
								￥{{item.pretium}}
							</view>
							<view class="corssize" v-if="userslist.tr.orderDetailList.length == '2' && insuranceInfos != null" v-for="(item,index) in insuranceInfos"
							 :key="index">
								￥{{item.pretium}}
							</view>
							<view class="">
							</view>
						</view>
					</view>
					<view class="cost_li costs">
						<view class="scse_l">
							服务费
						</view>
						<view class="scse_r">
							<view class="corssize">
								￥{{userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].tips}}
							</view>
							<view class="">
							</view>
						</view>
					</view>
					<view class="cost_li costs">
						<view class="scse_l">
							人数
						</view>
						<view class="scse_r">
							<view class="corssize">
								{{userlist.length}}/人
							</view>
							<view class="">
							</view>
						</view>
					</view>
					<view class="cost_li">
						<view class="scse_l">
							总额
						</view>
						<view class="scse_r">
							<view class="corssize" v-if="userslist.tr.orderDetailList.length == '1' && userslist.tr.amount!= 0 && insuranceInfos != null">
								<!-- ￥{{userslist.tr.amount + (item.pretium * userlist.length)}} -->
								￥{{userslist.tr.amount}}
							</view>
							<view class="corssize" v-if="userslist.tr.orderDetailList.length == '1' && userslist.tr.amount!= 0 && insuranceInfos == null">
								<!-- ￥{{userslist.tr.amount + (userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].tips * userlist.length)}} -->
								￥{{userslist.tr.amount}}
							</view>
							<view class="corssize" v-if="userslist.tr.orderDetailList.length == '2' && userslist.tr.amount!= 0 && insuranceInfos != null">
								<!-- ￥{{userslist.tr.amount + (item.pretium * userlist.length)}} -->
								￥{{userslist.tr.amount}}
							</view>
							<view class="corssize" v-if="userslist.tr.orderDetailList.length == '2' && userslist.tr.amount!= 0 && insuranceInfos == null">
								<!-- ￥{{userslist.tr.amount + (userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].tips * userlist.length)}} -->
								￥{{userslist.tr.amount}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="lisst">
				<view class="citst" style="margin-top: 30upx;" v-for="(item,index) in orderDetailListy" :key="index">
					<view class="cits_t">
						<view style="color: #FF3404;display: flex;">
							<view style="flex: 1;">订单状态:{{rest(item.mainDetail.orderStatus)}}</view>
							<view v-if="typename ==  2">支付状态:{{pustatus(payStatus)}}</view>
							<!-- <view style="color: #007aff;" @click="flights">航班动态</view> -->
						</view>
						<view class="cits_sa">
							<view class="no_ts" style="display: flex;">
								<view v-if="index == 0" style="color: #007aff;border: #007aff 1upx solid;width: 40upx;height: 40upx;margin-top: 10upx;text-align: center;line-height: 40upx;">
									往
								</view>
								<view v-if="index == 1" style="color: #007aff;border: #007aff 1upx solid;width: 40upx;height: 40upx;margin-top: 10upx;text-align: center;line-height: 40upx;">
									返
								</view>
								<image :src="item.voyages[0].ims" mode="" style="width: 35upx;height: 30upx;padding-top: 15upx;"></image>
								{{company(item.voyages[0].airline)}}{{item.voyages[0].flightNo}}
							</view>
							<view class="no_t" style="text-align: right;">
								{{yeada(item.voyages[0].departTime,1)}}
							</view>
						</view>
						<view class="citys">
							<view class="citys_l">
								<view class="scis_t">
									{{yeada(item.voyages[0].departTime,0)}}
								</view>
								<view class="scis_o">
									{{citys(item.voyages[0].depart)}}{{item.voyages[0].departTerminal}}
								</view>
								<view class="scis_b">
								</view>
							</view>
							<view class="citys_l">
								<view class="scis_t">
								</view>
								<view class="scis_s">
									{{times(timeList,index)}}
									<view class="sci_l">
									</view>
									<view class="sci_r">
									</view>
								</view>
								<view class="scis_b" v-if="item.voyages[0].discount!='1'">
									{{companys(item.voyages[0].serviceLevel)}}{{item.voyages[0].discount}}折
								</view>
								<view class="scis_b" v-else>
									全价
								</view>
							</view>
							<view class="citys_l">
								<view class="scis_t">
									{{yeada(item.voyages[0].arriveTime,0)}}
								</view>
								<view class="scis_o">
									{{citys(item.voyages[0].arrive)}}{{item.voyages[0].arriveTerminal}}
								</view>
							</view>
						</view>
					</view>
					<view class="cits_b">
						<view class="cits_bl">
							<view class="cits_sg" v-if="userslist.tr.orderDetailList.length == '1' && userslist.tr.orderDetailList[0].voyages.length != '2'">
								票价￥{{item.passengers[0].fareInfos[0].salePrice - item.passengers[0].fareInfos[0].tips}} 税费 ￥{{(item.passengers[0].fareInfos[0].taxFee) + (item.passengers[0].fareInfos[0].fuelFee)}}
								服务费￥{{userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].tips}}
							</view>
							<view class="cits_sg" v-if="userslist.tr.orderDetailList.length == '1' && userslist.tr.orderDetailList[0].voyages.length == '2'">
								票价￥{{item.passengers[0].fareInfos[index].salePrice - item.passengers[0].fareInfos[index].tips}} 税费 ￥{{(item.passengers[0].fareInfos[0].taxFee) + (item.passengers[0].fareInfos[0].fuelFee)}}
								服务费￥{{userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].tips}}
							</view>
							<view class="cits_sg" v-if="userslist.tr.orderDetailList.length == '2'">
								票价￥{{item.passengers[0].fareInfos[0].salePrice - item.passengers[0].fareInfos[0].tips}} 税费 ￥{{(item.passengers[0].fareInfos[0].taxFee) + (item.passengers[0].fareInfos[0].fuelFee)}}
								服务费￥{{userslist.tr.orderDetailList[0].passengers[0].fareInfos[0].tips}}
							</view>
						</view>
						<view class="cits_bl">
							<view class="cits_cl" @click="ctlist(item)">
								退改规
							</view>
						</view>
					</view>
					<view class="Check" v-if="item.stkus && item.mainDetail.orderStatus == '5'">
						<view class="updatas" @click="updatas(1,item,index)" v-if="rotes('tms:dps:change')">
							单程改签
						</view>
						<view class="deletes" @click="updatas(2,item,index)" v-if="rotes('tms:dps:refund')">
							单程退票
						</view>
					</view>
				</view>
				<!-- 返回 -->

				<view class="btuserlist">
					<view class="btuse" v-if="userlist.length > 0">
						乘机人{{userlist.length}}
						<view class="btul" v-for="(item,index) in userlist" :key="index">
							<view class="user_t">
								<view class="user_l">
									{{item.it.name}}
								</view>
								<view class="user_o" style="margin-left: 88upx;">
									成人票
								</view>
								<view style=" color: #007aff;" v-if="item.icke == 1 || item.icke == 3">
									往:{{item.itd.statusname}}
								</view>
								<view style=" color: #007aff;" v-if="item.icke == 3">
									,&nbsp;返:{{item.isd.statusname}}
								</view>
							</view>
							<view class="user_t" v-if="item.icke == 1 || item.icke == 3">
								<view class="user_l">
									往程票号
								</view>
								<view class="user_o">
									{{item.it.ticketNoJoinStr}}
								</view>
							</view>
							<view class="user_t" v-if="item.icke == 3">
								<view class="user_l">
									返程票号
								</view>
								<view class="user_o">
									{{item.its.ticketNoJoinStr}}
								</view>
							</view>
							<view class="user_t">
								<view class="user_l">
									{{catype(item.it.cardType)}}
								</view>
								<view class="user_o">
									{{item.it.cardNo}}
								</view>
							</view>
							<view class="user_t">
								<view class="user_l">
									手机号
								</view>
								<view class="user_o">
									{{item.it.phone}}
								</view>
							</view>
						</view>
					</view>
					<view class="liass">
						<view class="liass_l">
							联系信息
						</view>
						<view class="liass_r">
							{{userslist.tr.accountInfo.contact}}　{{userslist.tr.accountInfo.phone}}
						</view>
					</view>
					<view class="liass" v-if="apprvTaskReason != ''&& apprvTaskReason != null">
						<view class="liass_l">
							出差事由
						</view>
						<view class="liass_r">
							{{apprvTaskReason}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btnfixd">
			<paybtns businessType="1" productType="1" :recordNo="recordNos" :amount="amounts" :pay-status="payStatus" @payok="payok"
			 v-if="tlement == 1 && orderStatus== 3 && (payStatus == 1 || payStatus == 2)"></paybtns>
			<view class="tobeaudited" v-if="typename == 1 && auditStatus== 0 && orderStatus== 2">
				待审核
			</view>
			<view class="updatas" @click="updataslist(1)" v-if="usersli && userslist.tr.orderDetailList[0].mainDetail.orderStatus == '5' && rotes('tms:dps:change')">
				往返改签
			</view>
			<view class="deletes" @click="updataslist(2)" v-if="usersli && userslist.tr.orderDetailList[0].mainDetail.orderStatus == '5' && rotes('tms:dps:refund')">
				往返退票
			</view>
		</view>
		<view class="userlist" :class="shos ? 'show' : ''">
			<view class="userlist_top">
				<view class="btns" @click="shos = false">取消</view>
				<view class="oli">请选择人员</view>
				<view class="btns" @click="ic_ok">确定</view>
			</view>
			<view class="usarbotm">
				<view class="stname" v-for="(item,index) in usersnamelist" :key="index">
					<view :class="['stve',item.istrue ? 'stnames': 'stnamet']" @click="aduser(item,index)">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="black_mus" @click="shos = false" v-if="shos"></view>
	</view>
	<!-- </view> -->
</template>

<script>
	import tork from '@/api/torowk.js'
	import airports from '@/pages/book/sselect-city/airports.js'
	import certifi from '@/api/certificate.js'
	import order from '@/api/order.js'
	export default {
		data() {
			return {
				timeList: [],
				orderDetailListy: [],
				usersli: false, //是否可以退票和改签
				xianlsit: [{
					name: "取消订单并取消座位",
					id: '1'
				}, {
					name: "取消订单并保存座位",
					id: '2'
				}],
				maoid: 1,
				index: '',
				numprice: '999', //总价
				companyi_click: false, //遮盖层
				usersnamelist: [],
				costs: false,
				blac_show: false,
				popout: false,
				isclose: false,
				shos: false,
				typename: '', //1因公2因私
				auditStatus: '', //因公审核状态0待审核 1审核中2审核通过
				orderStatus: '', //订单状态
				tiltext: '机票订单详情',
				userlist: [], //乘客列表
				fxli: false,
				fxlilist: [], //经停站
				sittext: '',
				switfals: false,
				switfal: false,
				stlistad: [],
				insuranceInfos: [],
				backrule: {}, //退改签规则
				noticerefund: [ //退票说明
					"1、退票规定：起飞前2小时(含)以前收取5%的退票手续费;起飞前2小时(不含)以后收取10%的退票手续费;(具体以航司审核为准)",
					"2、改签规定：起飞前2天(含)允许免费改期1次;起飞前2小时(含)以前收取0%的改期手续费;起飞前2小时(不含)以后收取5%的改期手续费;(具体以航司审核为准)",
					"3、签转规定：不得签转"
				],
				stlist: [{
					name: '预订中',
					id: 1
				}, {
					name: ':待审核',
					id: 2
				}, {
					name: '待支付',
					id: 3
				}, {
					name: '出票中..',
					id: 4
				}, {
					name: '已出票',
					id: 5
				}, {
					name: '已取消',
					id: 6
				}, {
					name: '已拒单',
					id: 7
				}, {
					name: '待支付',
					id: 8
				}, {
					name: '待审批',
					id: 9
				}, {
					name: '已登账',
					id: 10
				}],
				codes: 0,
				bao: 0,


				userslist: {},
				hang: [],
				trklist: [], //经停站
				weeks: ['一', '二', '三', '四', '五', '六', '日'],
				isclsks: false, //是否从列表点进详情
				apprvTaskReason: '', //出差事由
				accountInfo: {}, //联系信息
				orderDetailList: [], //飞机票详情信息
				isnum: 1, //1为改签2为退票
				isttype: 0,
				saleOrderNo: "", //当前销售单号
				odllegList: [], //当前航班信息
				sione: true, //改单程还是往返
				ist: 0,
				tuipiao: 0, //判断点击的是单程退票还是返回退票还是往返退票
				tlement: 0, //1日结2月结
				ltes: 0,
				RuleMa: '', //
				RuleMas: false, //飞机退票是否需要审核
				tui: '2',
				isclasa: 'false',
				recordNos: 0,
				amounts: 0,
				fromSource: '', //官方票价
				payStatus: 0
			}
		},
		onLoad(item) {
			this.ist = item.ist;
			this.codes = item.code;
			this.isclsks = item.isck;
			this.tui = item.tui;
			this.isclasa = item.isclasa;
		},
		onShow() {
			this.slet();
			for (let k in this.orderDetailListy) {
				if (typeof(this.orderDetailListy[k].voyages[0].discount) == 'number') {
					if (this.orderDetailListy[k].voyages[0].discount < 1) {
						let num = (this.orderDetailListy[k].voyages[0].discount * 10);
						this.orderDetailListy[k].voyages[0].discount = num;
						k, this.orderDetailListy[k].voyages[0].discount = num.toFixed(1);
					} else {
						this.orderDetailListy.push(
							this.orderDetailListy[k].voyages[0]['discoun'] = '全价'
						)
					}
				}
			}
			console.log(this.orderDetailListy)
		},
		methods: {
			payok() {
				this.slet('wx');
			},
			times(items, index) { //去除时间的小和钟字
				let item = "";
				if (index == 0) {
					item = items[0];
				} else {
					item = items[1];
				}
				item = item.replace("小", '');
				item = item.replace("钟", '');
				return item
			},
			citys(its) { //回显城市
				for (let j = 0; j < this.address.length; j++) { //循环城市
					if (this.address[j].airportCode == its) {
						return this.address[j].cityCName
					}
				}
			},
			baoxian(i) {
				this.bao = i + this.bao;
			},
			companym_click() { //遮盖层
				this.fxli = false;
				setTimeout(() => {
					this.companyi_click = false;
				}, 300)
				this.popout = false;
			},
			clikst() { //费用详情
				if (this.costs) {
					this.costs = false;
					setTimeout(() => {
						this.blac_show = false;
					}, 200)
				} else {
					this.costs = true;
					this.blac_show = true;
				}
			},
			toaddls() { //购买飞机票
				uni.navigateBack({
					url: '/pages-book/book/mainModules/majorFunction/select_list/select_list?type=Planeticket'
				})
			},
			flights() { //航班动态
				this.fxli = true;

				// try{
				// 	let dat = this.plsitsti.saleOrderDetailList[0].departureTime.substring(0,10).split('-');
				// 	
				// 	let tis = dat[0] + dat[1] + dat[2];
				// 	const res = await tork.trainWs({
				// 		trainNo: this.plsitsti.saleOrderDetailList[0].trainno,
				// 		trainDate: tis
				// 	})
				// 	if(res.code == 200){
				// 		this.trklist = res.data.stations;
				// 	} else {
				// 		this.showToasts(res.message);
				// 	}
				// }catch(e){
				// 	console.log(e);
				// 	
				// }
			},
			deletli() { //确认取消订单
				this.companyi_click = true;
				this.popout = true;
			},
			async closedi() { //取消订单
				let _this = this;
				let no = this.userslist.tr.transationOrderNo;
				let isXePnr = this.maoid;
				try {
					let res = await order.cancelOrder({
						transationOrderNo: no,
						type: 1,
						isXePnr: isXePnr,
						reason: '后台手动取消订单'
					})

					if (res.code == 200) {

						this.showToasts("取消成功!");
						setTimeout(() => {
							_this.rblcok();
						}, 500)
					} else {
						this.showToasts(res.data.message)
					}
				} catch (e) {
					console.log(e);

				}
			},
			xian(i) { //判断是否点击切换勾选
				this.maoid = i;
			},
			whether(i) { //点击按钮是和否
				if (i == 1) {
					this.closedi();
				} else {
					this.popout = false;
					this.companyi_click = false;
				}
			},

			aduser(it, index) { //选择人员
				if (this.usersnamelist[index].istrue) {
					this.usersnamelist[index].istrue = false;
				} else {
					this.usersnamelist[index].istrue = true;
				}
				this.usersnamelist = [...this.usersnamelist];
			},
			updataslist(num) { //往返改签或者退票
				this.sione = false;
				let list = this.userslist.tr.orderDetailList[0];
				this.saleOrderNo = list.mainDetail.saleOrderNo;
				this.odllegList = []; //当前航班信息
				this.usersnamelist = []; //当前可操作用户
				let voyages = list.voyages;
				for (let i = 0; i < voyages.length; i++) {
					this.odllegList.push({
						flightNo: voyages[i].flightNo,
						cabin: voyages[i].cabin,
						depAirport: voyages[i].depart,
						arrAirport: voyages[i].arrive,
						depTime: this.timels(voyages[i].departTime),
						arrTime: this.timels(voyages[i].arriveTime),
					})
				}
				for (let i = 0; i < list.passengers.length; i++) { //循环插入所有用户信息
					if (list.passengers[i].voyages[0].status == 1 && list.passengers[i].voyages[1].status == 1) {
						this.usersnamelist.push({
							ageType: list.passengers[i].ageType, //乘客类型
							phone: list.passengers[i].phone,
							city: {
								id: list.passengers[i].voyages[0].depart,
								name: this.citys(list.passengers[i].voyages[0].depart)
							},
							citys: {
								id: list.passengers[i].voyages[0].arrive,
								name: this.citys(list.passengers[i].voyages[0].arrive)
							},
							departTime: list.passengers[i].voyages[0].departTime.substring(0, 10),
							departTimes: list.passengers[i].voyages[1].departTime.substring(0, 10),
							cardNo: list.passengers[i].cardNo,
							cardType: list.passengers[i].cardType,
							passengerId: list.passengers[i].passengerId,
							name: list.passengers[i].name,
							istrue: false, //默认为待选状态
						})
					}
				}
				this.shos = true;
				this.isnum = num;
				if (num == 2) {
					this.tuipiao = 3;
				}
			},

			async updatas(num, item, index) { //申请改签或退票
				this.sione = true;
				this.saleOrderNo = item.mainDetail.saleOrderNo;
				this.odllegList = [];
				this.isnum = num;
				this.usersnamelist = [];
				console.log(item, this.isttype)
				if (this.isttype == 1) {
					if (index == 0) {
						this.tuipiao = 1;
					} else {
						this.tuipiao = 2;
					}
					this.odllegList.push({
						flightNo: item.voyages[0].flightNo,
						cabin: item.voyages[0].cabin,
						depAirport: item.voyages[0].depart,
						arrAirport: item.voyages[0].arrive,
						depTime: this.timels(item.voyages[0].departTime),
						arrTime: this.timels(item.voyages[0].arriveTime),
					})
					for (let i = 0; i < item.passengers.length; i++) { //循环插入所有用户信息
						if (item.passengers[i].voyages[0].status == 1) {
							this.usersnamelist.push({
								ageType: item.passengers[i].ageType, //乘客类型
								phone: item.passengers[i].phone,
								city: { //出发城市
									id: item.passengers[i].voyages[0].depart,
									name: this.citys(item.passengers[i].voyages[0].depart)
								},
								citys: { //到达城市
									id: item.passengers[i].voyages[0].arrive,
									name: this.citys(item.passengers[i].voyages[0].arrive)
								},
								departTime: item.passengers[i].voyages[0].departTime.substring(0, 10),
								cardNo: item.passengers[i].cardNo, //证件类型
								cardType: item.passengers[i].cardType, //证件号码
								passengerId: item.passengers[i].passengerId,
								name: item.passengers[i].name,
								istrue: false, //默认为待选状态
							})
						}
					}
					console.log(item)
				} else {
					if (index == 0) {
						this.tuipiao = 1;
					} else {
						this.tuipiao = 2;
					}
					this.odllegList.push({
						flightNo: item.voyages[0].flightNo,
						cabin: item.voyages[0].cabin,
						depAirport: item.voyages[0].depart,
						arrAirport: item.voyages[0].arrive,
						depTime: this.timels(item.voyages[0].departTime),
						arrTime: this.timels(item.voyages[0].arriveTime),
					})
					for (let i = 0; i < item.passengers.length; i++) { //循环插入所有用户信息
						if (item.passengers[i].voyages[index].status == 1) {
							this.usersnamelist.push({
								ageType: item.passengers[i].ageType,
								phone: item.passengers[i].phone,
								city: {
									id: item.passengers[i].voyages[index].depart,

									name: this.citys(item.passengers[i].voyages[index].depart)
								},
								citys: {
									id: item.passengers[i].voyages[index].arrive,
									name: this.citys(item.passengers[i].voyages[index].arrive),
								},
								departTime: item.passengers[i].voyages[index].departTime.substring(0, 10),
								cardNo: item.passengers[i].cardNo,
								cardType: item.passengers[i].cardType,
								passengerId: item.passengers[i].passengerId,
								name: item.passengers[i].name,
								istrue: false, //默认为待选状态
							})
						}
					}
				}
				this.shos = true;
			},
			timels(time) {
				if (time.length < 19) {
					return time + ':00'
				} else {
					return time
				}
			},
			async getRuleMainSetting() { //查询当前用户改签是否需要审核
				try {
					let res = await order.RuleMainSetting();
					this.RuleMa = res.data.examinePattern;
					let stw = this.RuleMa.split(',');
					for (let i in stw) {
						/**
						 * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
						 */
						if (stw[i] == 10) {
							let res = await order.judgeApprv({
								passengerNos: userlistnos
							}); //判断当前出行人是否都免审
							if (res.code == 200) {
								if (res.data == false) { //判断是否需要审核
									this.RuleMas = false;
								}
							} else {
								this.showToasts(res.data.message);
							}
						}
						this.RuleMas = true;
					}
				} catch (e) {
					console.log(e)
				}
			},
			async ic_ok() { //确定当前
				let isnum = this.isnum; //改签还是退票
				let userlist = [];
				let names = [];
				let passengerNos = [];
				let city = "";
				let citys = "";
				let detime = "";
				let detimes = "";
				console.log(this.usersnamelist)
				for (let i in this.usersnamelist) {
					if (this.usersnamelist[i].istrue) {
						city = this.usersnamelist[i].city;
						citys = this.usersnamelist[i].citys;
						detime = this.usersnamelist[i].departTime;
						if (this.sione) { //单程
							detimes = ''
						} else { //往返
							detimes = this.usersnamelist[i].departTimes;
						}
						userlist.push({
							phone: this.usersnamelist[i].phone,
							certNo: this.usersnamelist[i].cardNo, //证件号码
							ageType: this.usersnamelist[i].ageType, //乘客类型		ADT成人
							certType: this.catype(this.usersnamelist[i].cardType), //证件类型
							name: this.usersnamelist[i].name, //名字
						});
						passengerNos.push(this.usersnamelist[i].passengerId)
						names.push(this.usersnamelist[i].name)
					}
				}

				if (userlist.length == 0) {
					if (isnum == 1) {
						this.showToasts("请选择改签人员！")
					} else if (isnum == 2) {
						this.showToasts("请选择退票人员！")
					}
					return
				}
				let nu = this.userslist.trExtend.typename; //因公因私
				let userlistnos = [];
				if (nu == 1) { //因公需要从接口中获取用户passengerNo
					let res = await order.getStaffByTravelNoAndNames({
						travelNo: this.userslist.trExtend.travelNo,
						names: names
					});
					let dat = res.data; //获取改签人信息
					for (let i in dat) {
						userlistnos.push(dat[i].passengerNo)
					}
				}
				try {
					let res = await order.RuleMainSetting();
					this.RuleMa = res.data.examinePattern;
					let stw = this.RuleMa.split(',');
					for (let i in stw) {
						/**
						 * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
						 */
						if (stw[i] == 10) {
							let res = await order.judgeApprv({
								passengerNos: userlistnos
							}); //判断当前出行人是否都免审
							console.log(res)
							if (res.code == 200) {
								if (res.data == true) { //判断是否需要审核
									this.RuleMas = true;
								} else {
									this.RuleMas = false;
								}
							} else {
								this.showToasts(res.data.message);
							}
						} else {
							this.RuleMas = true;
						}
					}
				} catch (e) {
					console.log(e)
				}
				this.shos = false; //单程
				if (isnum == 1) { //改签
					let none = ''; //往返
					if (this.sione) { //单程
						none = 'single'
					} else { //往返
						none = 'returns'
					}
					let dat = {
						tradeNo: this.userslist.tr.transationOrderNo, //交易单号
						none: none,
						type: "Planeticket",
						passengerNos: passengerNos, //用户编号
						userlistnos: userlistnos, //用户信息
						saleOrderNo: this.saleOrderNo, //航班出差单号
						odllegList: this.odllegList, //当前航班信息
						city: city, //去的城市
						citys: citys, //来的城市
						timedate: detime, //时间
						timedates: detimes, //返回时间
						butalist: userlist, //出行人员
						isblcks: 4, //4改签
						isbtd: nu, //1因公2因私
					}
					uni.setStorageSync("ticketinquiry_data", JSON.stringify(dat));
					uni.navigateTo({
						url: '/pages-book/book/mainModules/majorFunction/ticketInquiry/ticketinquiry'
					})
				} else { //退票
					let none = ''; //往返
					if (this.sione) { //单程
						none = 'single'
					} else { //往返
						none = 'returns'
					}
					console.log(nu, this.RuleMas)
					if (nu == 2) { //判断是否因私或者因公    因私不需要审核
						let dat = {
							transactionOrderNo: this.userslist.tr.transationOrderNo,
							saleOrderNo: this.userslist.tr.orderDetailList[0].mainDetail.saleOrderNo,
							userslist: this.userslist,
							userlist: userlist,
							none: none,
							tuipiao: this.tuipiao,
							RuleMas: this.RuleMas,
							fromSource: this.fromSource
						}
						uni.setStorageSync("predetermine_datas", JSON.stringify(dat));
						// sessionStorage.setItem("predetermine_datas", JSON.stringify(dat));
						uni.navigateTo({
							url: './retirement'
						})
					} else if (nu == 1 && this.RuleMas == true) { //因公但是不需要审核
						let dat = {
							transactionOrderNo: this.userslist.tr.transationOrderNo,
							saleOrderNo: this.userslist.tr.orderDetailList[0].mainDetail.saleOrderNo,
							userslist: this.userslist,
							userlist: userlist,
							none: none,
							tuipiao: this.tuipiao,
							RuleMas: this.RuleMas,
							fromSource: this.fromSource
						}
						uni.setStorageSync("predetermine_datas", JSON.stringify(dat));
						// sessionStorage.setItem("predetermine_datas", JSON.stringify(dat));
						uni.navigateTo({
							url: './retirement'
						})
					} else {
						try {
							console.log(this.RuleMas)
							let res = await order.RuleMainSetting();
							this.RuleMa = res.data.examinePattern;
							let stw = this.RuleMa.split(',');
							for (let i in stw) {
								/**
								 * 审批模式，多选用,隔开。1=按成本中心设置审批流程，2=按员工设置审批流程，5=火车票改签需要审批，6火车票退票需要审批，7=酒店取消需要审批
								 */
								if (stw[i] == 10) {
									this.RuleMas = false;
									let res = await order.judgeApprv({
										passengerNos: userlistnos
									}); //判断当前出行人是否都免审
									if (res.code == 200) {
										if (res.data == false) { //判断是否需要审核
											console.log(this.RuleMas)
											let dat = {
												transactionOrderNo: this.userslist.tr.transationOrderNo,
												saleOrderNo: this.userslist.tr.orderDetailList[0].mainDetail.saleOrderNo,
												passengerNo: passengerNos,
												linkType: '1',
												userslist: this.userslist,
												userlist: userlist,
												none: none,
												tuipiao: this.tuipiao,
												RuleMas: this.RuleMas,
												fromSource: this.fromSource
												// transactionOrderNo:this.userslist.tr.transationOrderNo,
												// saleOrderNo:this.userslist.tr.orderDetailList[0].mainDetail.saleOrderNo,
												// passengerNo: passengerNos,
												// linkType: '1',
												// userlist: userlist,
											}
											uni.setStorageSync("predetermine_datas", JSON.stringify(dat));
											// sessionStorage.setItem("predetermine_datas", JSON.stringify(dat));
											uni.navigateTo({
												url: './retirement'
											})
										} else {
											let dat = {
												transactionOrderNo: this.userslist.tr.transationOrderNo,
												saleOrderNo: this.userslist.tr.orderDetailList[0].mainDetail.saleOrderNo,
												passengerNo: passengerNos,
												linkType: '1',
												userslist: this.userslist,
												userlist: userlist,
												none: none,
												tuipiao: this.tuipiao,
												RuleMas: this.RuleMas,
												fromSource: this.fromSource
												// transactionOrderNo:this.userslist.tr.transationOrderNo,
												// saleOrderNo:this.userslist.tr.orderDetailList[0].mainDetail.saleOrderNo,
												// linkType: '1',
												// passengerNo: passengerNos,
												// RuleMas:this.RuleMas
											}
											uni.setStorageSync("predetermine_datas", JSON.stringify(dat));
											// sessionStorage.setItem("predetermine_datas", JSON.stringify(dat));
											uni.navigateTo({
												url: './retirement'
											})
										}
									} else {
										this.showToasts(res.data.message);
									}
								} else {
									this.RuleMas = true;
								}
							}
						} catch (e) {
							console.log(e)
						}
					}
				}
			},
			pustatus(ty) {
				if (ty === 1) {
					return '待支付';
				} else if (ty === 2) {
					return '部分支付';
				} else if (ty === 3) {
					return '已支付';
				} else if (ty === 4) {
					return '部分退款';
				} else if (ty === 5) {
					return '已退款';
				} else if (ty === 6) {
					return '退款中';
				} else {
					return '未知';
				}
			},
			catype(it) { //返回证件类型
				if (it == 'NI') {
					return '身份证'
				} else if (it == 'PP') {
					return '护照'
				} else if (it == 'TB') {
					return '台胞证'
				} else if (it == 'GA') {
					return '港澳通行证'
				} else if (it == 'HX') {
					return '回乡证'
				} else if (it == 'OS') {
					return '其他证件'
				}
			},
			async ctlist(item) { //点击查看说明
				console.log(item)
				try {
					let data = {
						airlineCode: item.voyages[0].airline, //航司编码
						cabin: item.voyages[0].cabin, //舱位
						depDate: item.voyages[0].departTime, //起飞时间
						airRoute: item.voyages[0].depart + item.voyages[0].arrive, //航线：CANPVG（出发地到达地）
					}
					const ret = await tork.getRefundChangeRule(data);
					if (ret.code == 200) {
						this.backrule = ret.data;
						this.stlistad = this.backrule
						this.sittext = '退改规则'
						this.switfals = true;
						setTimeout(() => {
							this.switfal = true;
						}, 200);
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e);
				}
			},
			isshow() {
				this.switfal = false;
				this.costs = false;
				setTimeout(() => {
					this.switfals = false;
				}, 200)
				setTimeout(() => {
					this.blac_show = false;
				}, 200)
			},
			yeada(item, num) {
				if (num == 0) {
					return item.substring(11, 16)
				} else if (num == 1) {
					let week = new Date(item.replace(/-/g, '/')).getDay();
					if (week == 0) {
						week = 7
					}
					let ts = item.substring(5, 10).split('-');
					return ts[0] + '月' + ts[1] + '日' + ' 周' + this.weeks[week - 1]
				}
			},
			busdate(num, num1) { //总时长
				let st = Date.parse(new Date(num.replace(/-/g, '/')));
				let st1 = Date.parse(new Date(num1.replace(/-/g, '/')));
				let dat = st1 - st;
				let fs = dat / 1000 / 60; //一共多少分钟
				let hours = parseInt(fs / 60); //多少小时
				let tims = fs - hours * 60; //于多少分钟
				if (tims > 0) {
					return hours + '时' + tims + '分'
				} else {
					return hours + '时'
				}
			},
			company(ie) {
				for (let s in this.hang) {
					if (ie == s) {
						ie = this.hang[s];
						return ie;
					}
				}
			},
			async slet(va) {
				let that = this;
				if (that.ltes == 0) {

				}
				try {
					const rea = await order.getOrderDetailByTranNo({
						tranNo: this.codes
					}); //查询当前航班信息
					const ret = await certifi.queryAirlineList(); //获取航空公司名称

					if (rea.code == 200) {
						if (va == 'wx' && rea.data.tr.orderDetailList[0].mainDetail.orderStatus == 3) {
							that.ltes = 1;

							that.tiltext = '支付中...';
							setTimeout(() => {
								that.slet('wx')
							}, 1000)
						} else {

							// if(this.isclsks == 'false'){
							if (this.isclsks == 'false' && this.isclasa == 'true' && this.tui != '1') {
								this.showToasts('预订成功！')
							}
							that.ltes = 0;
							that.apprvTaskReason = rea.data.apprvTaskReason; //出差事由
							that.accountInfo = rea.data.tr.accountInfo; //联系信息
							that.orderDetailList = rea.data.tr.orderDetailList; //航班乘客信息
							that.userslist = rea.data;
							that.fromSource = rea.data.tr.orderDetailList[0].mainDetail.fromSource;
							that.insuranceInfos = that.userslist.tr.orderDetailList[0].passengers[0].insuranceInfos; //获取保险信息
							that.tiltext = '机票订单详情';
							that.timeList = rea.data.timeList; //航行时间
							that.hang = ret.data.airlineDds; //航空公司名
							that.address = airports.addressAirportAll; //航空名字
							that.tlement = that.userslist.trExtend.settlement; //结算方式
							that.typename = that.userslist.trExtend.typename; //1因公2因私
							// that.auditStatus = that.userslist.tr.actualInfoSearchVO.actualAmountRecordList[0].auditStatus;//审核状态
							that.orderStatus = that.userslist.tr.orderDetailList[0].mainDetail.orderStatus; //订单状态 1:预订中(默认); 2:待审核; 3:待提交; 4:出票中; 5:已出票; 6:已取消; 7:已拒单；8:待支付；9:待审批；10:已登账
							that.payStatus = that.userslist.tr.orderDetailList[0].mainDetail.payStatus; //支付状态  1:未支付(默认); 2:部分支付; 3:已支付; 4:部分退款; 5:已退款;6:退款中
							that.recordNos = that.codes;
							that.amounts = that.userslist.tr.amount;
							if (that.orderStatus == 3 && that.payStatus == 1) { //待提交，未支付   判断取消
								this.isclose = true
							} else if (that.orderStatus == 9) {
								this.isclose = true
							}
							if (that.orderDetailList.length == 2 || (that.orderDetailList.length == 1 && that.orderDetailList[0].voyages.length ==
									1)) {
								that.isttype = 1;
								for (let i = 0; i < that.orderDetailList.length; i++) {
									let lo = that.orderDetailList[i];
									lo.voyages[0]['ims'] = 'http://file.feiren.com/00/02/' + lo.voyages[0].airline + '.png';
									that.orderDetailListy.push(lo)
								} //是否两个销售单对应两个航程或者一个销售单对应一个航程
							}
							if (that.orderDetailList.length == 1 && that.orderDetailList[0].voyages.length == 2) {
								that.isttype = 2;
								for (let i = 0; i < 2; i++) {
									let voy = that.orderDetailList[0].voyages[i]
									voy['ims'] = 'http://file.feiren.com/00/02/' + voy.airline + '.png'
									that.orderDetailListy.push({
										mainDetail: that.orderDetailList[0].mainDetail,
										passengers: that.orderDetailList[0].passengers,
										voyages: [voy]
									})
								} //是否一个销售单对应两个航程
							}
							let usenaslist = that.userslist.tr.orderDetailList[0].passengers; //乘客信息
							if (that.isttype == 1 && that.orderDetailList.length == 2) { //2条销售单往返 1条数据 往返 不能改签往返
								for (let i = 0; i < usenaslist.length; i++) {
									that.userlist.push({
										icke: 3,
										it: that.userslist.tr.orderDetailList[0].passengers[i],
										its: that.userslist.tr.orderDetailList[1].passengers[i],
										itd: that.userslist.tr.orderDetailList[0].passengers[i].voyages[0], //去
										isd: that.userslist.tr.orderDetailList[1].passengers[i].voyages[0], //回
									})
								}
								for (let i = 0; i < that.orderDetailListy.length; i++) {
									that.orderDetailListy[i]['stkus'] = false;
									for (let k = 0; k < that.userlist.length; k++) {
										if (i == 0 && that.userlist[k].itd.status == 1) {
											that.orderDetailListy[i].stkus = true;
										}
										if (i == 1 && that.userlist[k].isd.status == 1) {
											that.orderDetailListy[i].stkus = true;
										}
									}
								}
							} else if (that.isttype == 1 && that.orderDetailList.length == 1) { //1条销售单往返 1条数据 单程
								for (let i = 0; i < usenaslist.length; i++) {
									that.userlist.push({
										icke: 1,
										it: that.userslist.tr.orderDetailList[0].passengers[i],
										itd: that.userslist.tr.orderDetailList[0].passengers[i].voyages[0],
									})
								}
								for (let i = 0; i < that.orderDetailListy.length; i++) {
									that.orderDetailListy[i]['stkus'] = false;
									for (let k = 0; k < that.userlist.length; k++) {
										if (i == 0 && that.userlist[k].itd.status == 1) {
											that.orderDetailListy[i].stkus = true;
										}
									}
								}
							} else if (that.isttype == 2 && that.orderDetailList.length == 1) { //1条销售单 2条数据 往返 能改签往返
								let num = 0;
								for (let i = 0; i < usenaslist.length; i++) {
									that.userlist.push({
										icke: 3,
										it: that.userslist.tr.orderDetailList[0].passengers[i],
										its: that.userslist.tr.orderDetailList[0].passengers[i],
										itd: that.userslist.tr.orderDetailList[0].passengers[i].voyages[0], //去
										isd: that.userslist.tr.orderDetailList[0].passengers[i].voyages[1], //回
									})
								}
								for (let i = 0; i < that.orderDetailListy.length; i++) { //判断两个行程是否有人能改签或者退票
									that.orderDetailListy[i]['stkus'] = false;
									for (let k = 0; k < that.userlist.length; k++) {
										if (i == 0 && that.userlist[k].itd.status == 1) {
											that.orderDetailListy[i].stkus = true;
										}
										if (i == 1 && that.userlist[k].isd.status == 1) {
											that.orderDetailListy[i].stkus = true;
										}
									}
									if (that.orderDetailListy[i].stkus == true) {
										num++;
									}
								}
								if (num == 2) {
									that.usersli = true;
								}
							}
							console.log(that.orderDetailListy)
							for (let k in that.userlist) {
								if (that.userlist[k].icke == 1) {
									that.userlist[k].itd['statusname'] = that.userstatus(that.userlist[k].itd.status);
								}
								if (that.userlist[k].icke == 3) {
									that.userlist[k].itd['statusname'] = that.userstatus(that.userlist[k].itd.status);
									that.userlist[k].isd['statusname'] = that.userstatus(that.userlist[k].isd.status);
								}
							}
							// }
						}
					} else {
						that.showToasts(rea.massage);

					}
				} catch (e) {
					console.log(e);

				}
			},
			rest(ite) {
				let arr = this.stlist;
				for (let i in arr) {
					if (arr[i].id == ite) {
						return arr[i].name
					}
				}
			},
			companys(ie) {
				if (ie == 'F') {
					ie = '头等舱'
				} else if (ie == 'C') {
					ie = '商务舱'
				} else if (ie == 'Y') {
					ie = '经济舱'
				} else {
					ie = ''
				}
				return ie;
			},
			userstatus(it) { //乘客当前状态
				if (it == 0) {
					return '已取消'
				} else if (it == 1) {
					return '正常'
				} else if (it == 2) {
					return '改签'
				} else if (it == 3) {
					return '废退'
				}
			},
			rblcok() {
				// #ifdef H5
				history.back();
				// #endif
				// #ifdef MP-WEIXIN
				uni.navigateBack()
				// #endif
			}
		}
	}
</script>

<style scoped lang="scss">
	.trandetails {
		width: 100%;
		.Navigations {
			/*  #ifdef  APP-PLUS || MP-WEIXIN */
			padding-top: 60upx;
			/*  #endif  */
			width: 100%;
			height: 90upx;
			display: flex;
			align-items: center;
			background: #109DED;
			justify-content: space-between;

			.ongbutns {
				color: #FFFFFF;
				text-align: center;
			}

			.onright {
				font-size: 30upx;
				padding-right: 10upx;
				color: #FFFFFF;
			}

			.fixs_list {
				position: fixed;
				bottom: -100%;
				left: 0;
				width: 0;
				height: 100%;
				overflow: scroll;
				background: #edf0f5;
				z-index: 1000;

				.fix_los {
					display: flex;
					width: calc(100% - 40upx);
					padding: 0 20upx;
					height: 90upx;
					line-height: 90upx;
					background: #FFFFFF;
					margin-bottom: 2upx;

					.fitx_les {
						flex: 1;
						font-size: 30upx;
					}

					.stsb {
						display: flex;
						align-items: center;

						.scks {
							margin-right: 10upx;
							width: 50upx;
							text-align: center;
							color: #FFFFFF;
							height: 35upx;
							line-height: 35upx;
							border-radius: 35upx;
							background: #90B2E7;
						}
					}
				}
			}

			.shows {
				bottom: 0;
				width: 100%;
				transition: bottom 0.4s;
			}

			.hides {
				bottom: -100%;
				width: 100%;
				transition: bottom 0.4s;
			}

			.mask {
				position: fixed;
				top: 0;
				left: 0;
				z-index: 998;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.4);
				// display: none;
			}

		}

		.Popout {
			width: 80%;
			background: #F1F1F1;
			border-radius: 20upx;
			position: fixed;
			top:calc(50% - 160upx);
			left: 10%;
			z-index: 7777;
			color: #333333;
			.prtops{
				width: 100%;
				text-align: center;
				line-height: 80upx;
				color: red;
			}
			.popous {
				width: 100%;
				background-color: #FFFFFF;
				padding: 20upx 0;
				.pons {
					width: 100%;
					height: 60upx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.ponoks{					color: $uni-color-primary;				}
			}

			.confirm {
				display: flex;
				width: 100%;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				.confirm_a {
					flex: 1;
					background: $uni-color-primary;
					color: #FFFFFF;
					border-bottom-left-radius: 20upx;
				}

				.confirm_b {
					flex: 1;
					background: #F1F1F1;
					color: $uni-color-primary;
					border-bottom-right-radius: 20upx;
				}
			}
		}

		.fixs_list {
			position: fixed;
			bottom: -100%;
			left: 0;
			width: 0;
			height: 100%;
			overflow: scroll;
			background: #edf0f5;
			z-index: 1000;

			.fix_los {
				display: flex;
				width: calc(100% - 40upx);
				padding: 0 20upx;
				height: 90upx;
				line-height: 90upx;
				background: #FFFFFF;
				margin-bottom: 2upx;

				.fitx_les {
					flex: 1;
					font-size: 30upx;
				}

				.stsb {
					display: flex;
					align-items: center;

					.scks {
						margin-right: 10upx;
						width: 50upx;
						text-align: center;
						color: #FFFFFF;
						height: 35upx;
						line-height: 35upx;
						border-radius: 35upx;
						background: #90B2E7;
					}
				}
			}
		}

		.shows {
			bottom: 0;
			width: 100%;
			transition: bottom 0.4s;
		}

		.hides {
			bottom: -100%;
			width: 100%;
			transition: bottom 0.4s;
		}

		.black_mu {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, .5);
			z-index: 888;

			.isswflist {
				position: fixed;
				bottom: 0;
				left: 0;
				transition: all 0.3s ease;
				-webkit-transform: translateY(100%);
				transform: translateY(100%);
				min-height: 150upx;
				border-top-left-radius: 15upx;
				border-top-right-radius: 15upx;
				width: calc(100% - 80upx);
				z-index: 889;
				background: #ffffff;
				padding: 40upx;
				font-size: 30upx;

				.isstop {
					color: $uni-color-primary;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 30upx;
				}

				.isstops {
					padding-bottom: 20upx;
				}
			}

			.show {
				-webkit-transform: translateY(0);
				transform: translateY(0);
			}
		}

		.btnfixd {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			line-height: 100upx;
			color: #FFFFFF;
			background: #F48F00;
			text-align: center;
			font-size: 30upx;

			.payment {
				width: 100%;
				height: 110upx;
				color: #FFFFFF;
				background: #F48F00;
			}

			.tobeaudited {
				width: 100%;
				height: 110upx;
				color: #FFFFFF;
				background: #999999;
			}

			line-height: 100upx;
			text-align: center;
			display: flex;

			.updatas {
				width: 50%;
				height: 100upx;
				color: #FFFFFF;
				background: #F48F00;
				border-bottom-left-radius: 15upx;
			}

			.deletes {
				width: 50%;
				height: 100upx;
				color: #FFFFFF;
				background: red;
				border-bottom-right-radius: 15upx;
			}
		}

		.black_mus {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, .5);
			z-index: 888;
		}

		.userlist {
			position: fixed;
			bottom: 0;
			left: 0;
			transition: all 0.3s ease;
			-webkit-transform: translateY(100%);
			transform: translateY(100%);
			min-height: 200upx;
			width: 100%;
			z-index: 889;
			background: #ffffff;

			.userlist_top {
				display: flex;
				font-size: 30upx;
				height: 90upx;
				width: 100%;
				background: #f1f1f1;
				align-items: center;
				text-align: center;

				.btns {
					width: 20%;
					color: $uni-color-primary;
				}

				.oli {
					width: 60%;
					color: #c8c7cc;
				}
			}

			.usarbotm {
				width: 100%;
				padding: 40upx 0;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				font-size: 30upx;

				.stname {
					width: 33%;
					height: 60upx;
					display: flex;
					justify-content: center;
					align-items: center;

					.stve {
						padding: 0 15upx;
						height: 40upx;
						line-height: 40upx;
						border-radius: 8upx;
					}

					.stnamet {
						border: 2upx solid #999999;
						color: #999999;
					}

					.stnames {
						background: $uni-color-primary;
						border: 2upx solid $uni-color-primary;
						color: #FFFFFF;
					}
				}
			}
		}

		.show {
			-webkit-transform: translateY(0);
			transform: translateY(0);
		}

		.cancellation {
			position: fixed;
			bottom: 0;
			right: 0;
			width: 50%;
			line-height: 100upx;
			color: #e5f1ff;
			background: #49a8e2;
			text-align: center;
			font-size: 30upx;
		}

		.navstop {
			position: relative;
			width: calc(100% - 80upx);
			padding: 20upx 40upx 140upx 40upx;
			font-size: 28upx;
			color: #FFFFFF;
			background: #109DED;

			.cits_bls {
				display: flex;

				.cits_cls {
					width: 150upx;
					height: 60upx;
					line-height: 60upx;
					text-align: center;
					background: #FFFFFF;
					color: #49a8e2;
					border-radius: 5upx;
				}

				.cits_sgs {
					flex: 1;
				}
			}

			.costlists {
				position: fixed;
				bottom: 0;
				left: 0;
				padding-bottom: 90upx;
				transition: all 0.3s ease;
				-webkit-transform: translateY(100%);
				transform: translateY(100%);
				width: 100%;
				z-index: 990;
				line-height: 90upx;
				color: $uni-color-primary;
				background: #ffffff;
				font-size: 30upx;

				.costl_t {
					width: 100%;
					height: 90upx;
					text-align: center;
				}

				.costlist_s {
					width: calc(100% - 20upx);
					border-top: 2upx solid #C8C7CC;
					border-bottom: 2upx solid #C8C7CC;
					padding-left: 20upx;

					.cost_li {
						width: 100%;
						height: 90upx;
						display: flex;

						.scse_l {
							flex: 1;
						}

						.scse_r {
							flex: 1;
							padding-right: 20upx;
							display: flex;
							justify-content: flex-end;

							.corssize {
								color: #FF9000;
							}
						}
					}

					.costs {
						border-bottom: 2upx solid #D0DEE5;
					}
				}
			}

			.show {
				-webkit-transform: translateY(0);
				transform: translateY(0);
			}

			.lisst {
				position: absolute;
				left: 0;
				top: 150upx;
				width: calc(100% - 40upx);
				padding: 0 20upx;

				.citst {
					width: 100%;

					.cits_t {
						width: calc(100% - 40upx);
						padding: 20upx;
						background: #F5FAFD;
						border-top-left-radius: 15upx;
						border-top-right-radius: 15upx;
						color: #333333;

						.cits_sa {
							display: flex;

							.no_t {
								flex: 2;
								width: 100%;
								height: 60upx;
								line-height: 60upx;
							}

							.no_ts {
								flex: 5;
								width: 100%;
								height: 60upx;
								line-height: 60upx;
							}
						}

						.citys {
							width: 100%;
							display: flex;

							.citys_l {
								flex: 1;
								text-align: center;
								display: flex;
								flex-direction: column;
								justify-content: center;
								align-items: center;

								.scis_t {
									line-height: 60upx;
									font-size: 55upx;
									;
								}

								.scis_o {
									line-height: 80upx;
									font-size: 35upx;
									;
								}

								.scis_b {
									line-height: 60upx;
									font-size: 28upx;
									color: #C8C7CC;
								}

								.scis_s {
									position: relative;
									margin: 0 auto;
									border-radius: 35upx;
									width: 130upx;
									line-height: 35upx;
									height: 35upx;
									color: $uni-color-primary;
									border: 2upx solid $uni-color-primary;

									.sci_l {
										position: absolute;
										width: 30upx;
										height: 2upx;
										background: $uni-color-primary;
										top: 16upx;
										right: 130upx;
									}

									.sci_r {
										position: absolute;
										width: 30upx;
										height: 2upx;
										background: $uni-color-primary;
										top: 16upx;
										left: 130upx;
									}
								}
							}
						}
					}

					.cits_b {
						width: calc(100% - 80upx);
						color: $uni-color-primary;
						padding: 0 40upx;
						height: 90upx;
						background: #FFFFFF;
						// border-bottom-left-radius: 15upx;
						// border-bottom-right-radius: 15upx;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.cits_bl {
							display: flex;

							.cits_cl {
								width: 130upx;
								height: 45upx;
								line-height: 45upx;
								text-align: center;
								background: #FFFFFF;
								color: #72b2de;
								border-radius: 45upx;
							}

							.cits_sg {
								flex: 1;
								color: #8a8a8a;

							}
						}
					}

					.Check {
						line-height: 100upx;
						text-align: center;
						display: flex;

						.updatas {
							width: 50%;
							height: 100upx;
							color: #FFFFFF;
							background: #F48F00;
							border-bottom-left-radius: 15upx;
						}

						.deletes {
							width: 50%;
							height: 100upx;
							color: #FFFFFF;
							background: red;
							border-bottom-right-radius: 15upx;
						}
					}
				}

				.btuserlist {
					width: 100%;
					margin-top: 20upx;
					// margin-bottom: 300upx;
					border-radius: 15upx;
					background: #FFFFFF;

					.btuse {
						color: #C8C7CC;
						font-size: 35upx;
						width: calc(100% - 40upx);
						padding: 20upx;

						.btul {
							margin-top: 10upx;
							color: #333333;

							.user_t {
								display: flex;
								width: 100%;
								height: 50upx;
								line-height: 50upx;
								font-size: 28upx;

								.user_l {
									flex: 3;
								}

								.user_o {
									flex: 5;
								}

								.user_r {
									flex: 4;
									justify-content: flex-end;
									display: flex;
								}
							}
						}
					}

					.liass {
						width: calc(100% - 40upx);
						padding: 0 20upx;
						display: flex;
						color: #C8C7CC;
						line-height: 80upx;

						// border-top: 2upx solid #E5E5E5;
						.liass_l {
							font-size: 35upx;
							flex: 1;
						}

						.liass_r {
							color: #333333;
							// text-align: right;
							flex: 1.7;
						}

						.liass_p {
							// text-align: right;
							// flex: 1;
							font-size: 35upx;
							color: #FF9000;
						}
					}
				}
			}
		}
	}
</style>
