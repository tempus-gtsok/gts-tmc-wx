<template>
	<view class="container999">
		<headnavigation titles="订单填写"></headnavigation>
		<loading>
		</loading>
		<view class="mian" v-if="userlist">
			<view :class="{'share-box': switfals}" @click="isshows">
			</view>
			<view class="share-item" :class="{'share-show': switfals}">
				<view class="isstop">
					<view class="" v-if="sittext != null && sittext != undefined">
						{{sittext}}
					</view>
					<view @click="isshows" class="iconfont" style="color: #C0C0C0;font-size: 50upx;">
						&#xe641;
					</view>
				</view>
				<view class="isstops">
					<p v-if="stlistad.remark != null"> 1.{{stlistad.remark}}</p>
					<p v-if="stlistad.refundTicketDes != null">2.改签规定：{{stlistad.refundTicketDes}}</p>
					<p v-if="stlistad.signTicketDes != null"> 3.签转规定：{{stlistad.signTicketDes}}</p>
				</view>
			</view>
			<view class="black_mu" @click="isshow" v-if="blac_show"></view>
			<view class="min_mian">
				<view class="message">
					<view class="message_top">
						<view style="border-bottom: 1upx solid #d8dad7;display: flex;width: 96%;margin-left: 2%;">
							<view style="width: 95%;display: flex;">
								<!-- <view class="iconfont">&#xe61e;</view> -->
								<view class="dates">
									{{date}}
								</view>
								<view class="week">
									周{{timelist.week}}
								</view>
								<view class="silt">
									{{userlist.name.departs}} — {{userlist.name.arrives}}
								</view>
							</view>
							<view class="imgs" @click="boolase">
								<view class="iconfont" v-if="mao">&#xe628;</view>
								<view class="iconfont" v-if="yi">&#xe8a7;</view>
							</view>
						</view>
					</view>

					<view class="top" v-if="bool">
						<!-- 机票详情 -->
						<view class="above">
							<!-- 时间地址 -->
							<view class="above_left">
								<view class="city">
									{{userlist.name.departs}}
								</view>
								<view class="go_off">
									{{userlist.name.departTime}}
								</view>
								<view class="arrival_time" v-if="userlist.name.departTerminal != null">
									{{userlist.name.departs}}{{userlist.name.departTerminal}}
								</view>
								<view class="arrival_time" v-else>
									{{userlist.name.departs}}
								</view>
							</view>
							<view class="above_centre">
								<view style="font-size: 15upx;color:#abbdd3">
									{{userlist.name.flightTime}}
								</view>
								<view class="iconfont" style="color:#e8e8e8">&#xe64f;</view>
							</view>
							<view class="above_right">
								<view class="city">
									{{userlist.name.arrives}}
								</view>
								<view class="go_off">
									{{userlist.name.arriveTime}}
								</view>
								<view class="arrival_time" v-if="userlist.name.arriveTerminal != null">
									{{userlist.name.arrives}}{{userlist.name.arriveTerminal}}
								</view>
								<view class="arrival_time" v-else>
									{{userlist.name.arrives}}
								</view>
							</view>
						</view>
						<view class="below" v-if="userlist.name.planeSize != null">
							<!-- 日期航班 -->
							<view v-if="date != null">{{ date }}</view>
							周
							<view v-if="timelist.week != null">{{ timelist.week }}</view>
							<view class="Separate">|</view>
							<view v-if="hang.name != null">{{ hang.name }}</view>
							<view v-if="userlist.name.no != null">{{ userlist.name.no }}</view>
							<view class="Separate">|</view>
							<view v-if="userlist.name.plane != null">{{ userlist.name.plane }}</view>
							<view v-if="userlist.name.planeSize != null">{{ userlist.name.planeSize }}</view>
						</view>
						<view class="below" v-else>
							<!-- 日期航班 -->
							<view v-if="date != null">{{ date }}</view>
							周
							<view v-if="timelist.week != null">{{ timelist.week }}</view>
							<view class="Separate">|</view>
							<view v-if="hang.name != null">{{ hang.name }}</view>
							<view v-if="userlist.name.no != null">{{ userlist.name.no }}</view>
							<view class="Separate">|</view>
							<view v-if="userlist.name.plane != null">{{ userlist.name.plane }}</view>
						</view>
					</view>
					<view class="message_bottom">
						<view class="jiage">
							<view class="par" style="display: flex;">
								机票价 ￥
								<view style="color:#F48F00;text-indent: 10upx;" v-if="prices != 0">{{prices}}</view>
								<view style="color:#F48F00;text-indent: 10upx;" v-else>{{dats.datw.price}}</view>
							</view>
							<view class="fuel" style="display: flex;">
								机建燃油 ￥
								<view style="color:#F48F00;text-indent: 10upx;">
									{{userlist.name.taxFee}}/{{userlist.name.fuelFee}}
								</view>
							</view>
						</view>
						<view class="changing" @click="ctlist">
							查看退改签>
						</view>
					</view>
					<view class="top" v-if="bool && !isone">
						<!-- 机票详情 -->
						<view class="above">
							<!-- 时间地址 -->
							<view class="above_left">
								<view class="city">
									{{nums.data.userlist.name.departs}}
								</view>
								<view class="go_off">
									{{nums.data.userlist.name.departTime}}
								</view>
								<view class="arrival_time">
									{{nums.data.userlist.name.departs}}{{nums.data.userlist.name.departTerminal}}
								</view>
							</view>
							<view class="above_centre">
								<view style="font-size: 15upx;color:#abbdd3">
									{{nums.data.userlist.name.flightTime}}
								</view>
								<view class="iconfont" style="color:#e8e8e8">&#xe64f;</view>
							</view>
							<view class="above_right">
								<view class="city">
									{{nums.data.userlist.name.arrives}}
								</view>
								<view class="go_off">
									{{nums.data.userlist.name.arriveTime}}
								</view>
								<view class="arrival_time">
									{{nums.data.userlist.name.arrives}}{{nums.data.userlist.name.arriveTerminal}}
								</view>
							</view>
						</view>
						<view class="below">
							<!-- 日期航班 -->
							<view v-if="nums.data.date != null">{{ nums.date }}</view>
							周
							<view v-if="nums.data.timelist.week != null">{{ nums.data.timelist.week }}</view>
							<view class="Separate">|</view>
							<view v-if="nums.data.hang.name != null">{{ nums.data.hang.name }}</view>
							<view v-if="nums.data.userlist.name.no != null">{{ nums.data.userlist.name.no }}</view>
							<view class="Separate">|</view>
							<view v-if="nums.data.userlist.name.plane != null">{{ nums.data.userlist.name.plane }}</view>
							<view v-if="nums.data.userlist.name.planeSize != null">{{ nums.data.userlist.name.planeSize }}</view>
						</view>
					</view>

					<view class="message_bottom" v-if="!isone">
						<view class="jiage">
							<view class="par" style="display: flex;">
								机票价 ￥
								<view style="color:#F48F00;text-indent: 10upx;" v-if="priceas != 0">{{priceas}}</view>
								<view style="color:#F48F00;text-indent: 10upx;" v-else>{{nums.datw.price}}</view>
							</view>
							<view class="fuel" style="display: flex;">
								机建燃油 ￥
								<view style="color:#F48F00;text-indent: 10upx;">
									{{nums.data.userlist.name.taxFee}}/{{nums.data.userlist.name.fuelFee}}
								</view>
							</view>
						</view>
						<view class="changing" @click="ctlist">
							查看退改签>
						</view>
					</view>
				</view>
			</view>

			<view class="sname" style="margin-top: 20upx;" v-if="civilServiceTicket==1">
				<view style="padding-left: 20upx;">验证类型：</view>
				<view class="pons" v-for="(item,index) in ziyuanlsit" :key="index" @click="willing(item.id)">
					<view class="iconfont" v-if="item.id !=maoyid" style="">&#xe7bf;</view>
					<view class="iconfont" v-if="item.id ==maoyid" style="color: #1296db;">&#xe60a;</view>
					{{item.name}}
				</view>
			</view>
			<view class="istaf" v-if="Involuntary">
				<view class="ravelv">
					<view class="ts">
						<view class="rav_left">单位名称:</view>
						<view class="ravright">
							<view class="bos">
								<input type="text" v-model="Units" placeholder="请输入单位名称" value="" />
							</view>
							<view class="iconfont">&#xe8a3;</view>
						</view>
					</view>
				</view>
			</view>
			<view class="userlist">
				<view class="cu_time" v-if="isbtd == 2">
					<passenger :isretun="isretun" ref="passengers"></passenger>
				</view>
				<view class="userls" v-for="(item, idnex) in userlists" :key="idnex">
					<view class="userlss">
						<view class="user_ls">
							<view>{{ item.name }}</view>
							<view>{{ item.deptName }}</view>
						</view>
						<view class="user_rs" v-if="isblcks == 4">
							<view>
								<view class="wors">
									{{item.certType}}
								</view>
							</view>
							<view>{{item.certNo}}</view>
						</view>
						<view class="user_rs" v-else>
							<view class="">
								<view class="wors">
									<picker :range="item.certificateList" :range-key="'cardTypename'" @change="CostCencdChange($event,idnex,item.certificateList)">
										{{ item.certificateList[CostCencd[idnex].index].cardTypename }}
									</picker>
								</view>
							</view>
							<view class="">{{ vals(CostCencd[idnex].index,item.certificateList) }}</view>
						</view>
					</view>
					<view class="kaihu" v-if="volunteer && civilServiceTicket==1">
						<view>开户银行</view>
						<view>
							<input type="text" v-model="item.carval" @input="onInput($event,idnex)" placeholder="银行名称" value="" />
							<view class="absts" v-if="abstid == idnex">
								<view class="" v-for="(item_bk,index_bk) in banklists" :key="index_bk" @click="bankss(item.carval,item_bk)">
									{{item_bk}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 保险 -->
			<view class="insurance" v-if="isblcks != 4">
				<view class="Shipping_insurance" v-if="kingList.length>1">
					<view class="">
						航意险
					</view>
					<view class="navigas" :class="Default == 0 ? 'navimd':''">
						<picker  :range="kingList" :range-key="'name'" @change="chineseChange($event)">
							{{ kingList[parseInt(Default)].name }}
						</picker>
					</view>
					<view class="" style="margin-left: 20upx;">
						(票面价:<span style="color: #F48F00;">{{profitPrices}}</span>元)
					</view>
				</view>
				<view class="Shipping_insurance" v-if="kinsList.length > 1">
					<view class="">
						航延险
					</view>
					<view class="navigas" :class="Defaults == 0 ? 'navimd':''">
						<picker v-if="kinsList.length>0" :range="kinsList" :range-key="'name'" @change="chineseChangea($event)">
							{{ kinsList[Defaults].name }}
						</picker>
					</view>
					<view class="" style="margin-left: 20upx;">
						(结算价:<span style="color: #F48F00;">{{profitPrice}}</span>元)
					</view>
				</view>
			</view>
			<view class="optslist" :class="ops_list ? 'show' : ''">
				<view class="btns">
					<view class="btns_z" @click="isshow">
						取消
					</view>
					<view class="btns_z"></view>
					<view class="btns_z" @click="okisd">
						确定
					</view>
				</view>
				<view class="stlist">
					<view class="sltleft">
						<view class="ulsk_list" @click="slcikd(item.id)" :class="slid == item.id? 'cked':''" v-for="(item,index) in ullist"
						 :key="index">
							{{item.name}}
						</view>
					</view>
					<view class="sltright">
						<view class="sltrig_top">
							<view class="sltiig_top_left">当前选择:</view>
							<view class="sltiig_top_right" @click="reblocks(item)" :class="slit_id_checd == item.id ? 'stis':''" v-for="(item,index) in slitlist"
							 :key="index">
								{{item.name}}
							</view>
						</view>
						<view class="sltrig_bot">
							<view class="striglist" @click="clslitk(item)" v-for="(item,index) in sli_namelist" :key="index">
								<view class="stlis_left">
									<view class="">
										{{item.name}}
									</view>
								</view>
								<view class="stlis_right" v-if="slit_id_checd == item.id">
									<view class="iconfont" style="color: #007aff;">
										&#xe60b;
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="botmis">
					当前选择的成本中心是:{{botname}}
				</view>
			</view>
			<view class="isswflist" :class="switfal ? 'show' : ''">
				<view class="btns">
					<view class="btns_z" @click="isshow">
						取消
					</view>
					<view class="btns_z" v-if="isswf">
						成本审核人选择
					</view>
					<view class="btns_z" v-if="!isswf">
						部门审核人选择
					</view>
					<view class="btns_z" @click="oksoption">
						确定
					</view>
				</view>
				<view class="isstops" v-if="isswf">
					<view class="isstop" v-for="(item,index) in CostCenterlist" :key="index">
						{{index+1}}级审批：
						<view class="wors">
							<picker :range="item.apprvCostFlowNodePersons" :range-key="'staffName'" @change="CostCenterChange($event,index)">
								{{ item.apprvCostFlowNodePersons[CostCenter[index].index].staffName }}
							</picker>
						</view>
					</view>
				</view>
				<view class="isstops" v-if="!isswf">
					<view class="isstop" v-for="(item,index) in Deparapprover" :key="index">
						{{index+1}}级审批：
						<view class="wors">
							<picker :range="item.apprvDeptFlowNodePersons" :range-key="'staffName'" @change="DeparappChange($event,index)">
								{{ item.apprvDeptFlowNodePersons[Deparapp[index].index].staffName }}
							</picker>
						</view>
					</view>
				</view>
			</view>

			<view class="istaf" v-if="isshowcenter">
				<view class="ravelv">
					<view class="ts">
						<view class="rav_left">归属部门:</view>
						<view class="ravright">
							<view class="bos">
								{{attdepartment}}
							</view>
						</view>
					</view>
				</view>
				<view class="ravelv">
					<view class="ts">
						<view class="rav_left">成本中心:</view>
						<view class="ravright" @click="approval()">
							<view class="bos">
								{{NameCenter.name}}
							</view>
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
				<view class="ravelv" v-if="CostCi">
					<view class="ts">
						<view class="rav_left">成本审批人:</view>
						<view class="ravright" @click="appswlists('CostCenterlist')">
							<view class="bos">
								<view class="swname" v-for="(item,index) in TravelCostCenlist" :key="index">
									{{item.staffName}}
								</view>
							</view>
							<view class="iconfont">&#xe8a3;</view>
						</view>
					</view>
				</view>
				<view class="ravelv" v-if="CostCis">
					<view class="ts">
						<view class="rav_left">部门审批人:</view>
						<view class="ravright" @click="appswlists('Deparapprover')">
							<view class="bos">
								<view class="swname" v-for="(item,index) in TravelDepartlist" :key="index">
									{{item.staffName}}
								</view>
							</view>
							<view class="iconfont">&#xe8a3;</view>
						</view>
					</view>
				</view>
			</view>
			<view class="istaf" v-if="(isblcks == 2 || isblcks == 4) && isbtd == 1">
				<view class="ravelv">
					<view class="ts">
						<view class="rav_left">出行事由:</view>
						<view class="ravright">
							<view class="bos">
								<input type="text" v-model="reson" placeholder="请输入出行事由" value="" />
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="istaf">
				<view class="ravelv">
					<view class="ts">
						<view class="rav_left">联系人:</view>
						<view class="ravright">
							<view class="bos">
								<input type="text" v-model="user_name" placeholder="请输入联系人" value="" />
							</view>
						</view>
					</view>
				</view>
				<view class="ravelv">
					<view class="ts">
						<view class="rav_left">联系电话:</view>
						<view class="ravright">
							<view class="bos">
								<input type="number" v-model="user_ipone" maxlength="11" @input="search($event)" placeholder="请输入联系电话" value="" />
							</view>
						</view>
					</view>
				</view>
				<view class="ravelv" v-if="isblcks == 4">
					<view class="ts">
						<view class="rav_left">改签原因:</view>
						<view class="ravright">
							<view class="bos">
								<input type="text" v-model="user_remark" placeholder="请输入改签原因" value="" />
							</view>
							<view class="iconfont">&#xe8a3;</view>
						</view>
					</view>
				</view>
				<view class="ravelvs" v-if="isblcks == 4">
					<view class="ts">
						<view class="rav_left">改签证明:</view>
						<view class="ravright">
							<view class="bost" @click="ft_click">
								<image style="width: 100%;height: 100%;" :src="to_src" mode="" v-if="to_src != ''"></image>
								<view v-if="to_src == ''" class="pfls">
									<view class="iconfont" style="color: #007aff;font-size: 50upx;">&#xe632;</view>
								</view>
							</view>
						</view>
						<view class="iconfont">&#xe8a3;</view>
					</view>
				</view>
				<!-- <view class="ravelv">
					<view class="ts">
						<view class="rav_left">电子邮箱:</view>
						<view class="ravright">
							<view class="bos">
								<input type="text" v-model="user_name" placeholder="请输入邮箱接受保险发票" value="" />
							</view>
						</view>
					</view>
				</view> -->
			</view>

			<view class="staleve" v-if="staleve" @click="staleve = false">
				<view class="stalist" @click.stop>
					<view class="quan">
						<view class="statop" v-if="respeatBook.length > 0">
							<view class="reds">
								<view class="ts_text">
									订单已重复
								</view>
							</view>
							<view class="setlist" v-for="(item,index) in respeatBook" :key="index">
								<view class="setbod" v-if="item.name == 9 && !notbooking">
									<view class="styul">
										<view class="styli_top">
											超规且不可预订
										</view>
										<view class="stulis">
											<view class="styli_left">
												超规人员:
											</view>
											<view class="styli_right">
												{{item.list}}
											</view>
										</view>
									</view>
								</view>
								<view class="setbod" v-if="item.name == 8 && !notbooking">
									<view class="styul">
										<view class="styli_top">
											超规必须选择原因
										</view>
										<view class="stulis">
											<view class="styli_left">
												超规人员:
											</view>
											<view class="styli_right">
												{{item.list}}
											</view>
										</view>
									</view>
									<view class="styul">
										<view class="stulis">
											<view class="styli_left">
												超规原因:
											</view>
											<view class="styli_right">
												<view class="wors">
													<picker v-model="pricdesc" :range="rulesReasons" :range-key="'chineseDesc'" @change="chineseChanges($event)">
														{{ rulesReasons[chiness.index].chineseDesc }}
													</picker>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="btnsti" v-if="bools">
						<view class="roblck" @click="staleve = false">
							取消
						</view>
						<view class="btnok" @click="cits_btn">
							继续预定
						</view>
					</view>
				</view>
			</view>

			<view class="mask" v-if="companyi_click" @click="companym_click">
			</view>
			<view class="pop_up" :class="fxli ? 'shows' : 'hides' ">
				<view class="pop_op">
					{{zhi}}
				</view>
				<view class="pop_ip">
					公司账户<br />
					使用公司账户支付，预订可管控，报销更合规
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
						<view class="scse_r" v-if="dats.data.none == 'single'">
							<view class="corssize">
								￥{{prices}}
							</view>
							<view class="">
								<!-- x{{userlists.length}}人 -->
							</view>
						</view>
						<view class="scse_r" v-if="dats.data.none != 'single'">
							<view class="corssize">
								去程￥{{prices}}
								返程￥{{priceas}}
							</view>
							<view class="">
								<!-- x{{userlists.length}}人 -->
							</view>
						</view>
					</view>
					<view class="cost_li costs">
						<view class="scse_l">
							基建/燃油
						</view>
						<view class="scse_r" v-if="dats.data.none == 'single'">
							<view class="corssize">
								￥{{userlist.name.taxFee}}/
							</view>
							<view class="" style="color: #F48F00;">
								￥{{userlist.name.fuelFee}}
							</view>
						</view>
						<view class="scse_r" v-if="dats.data.none != 'single'">
							<view class="corssize">
								￥{{userlist.name.fuelFee + nums.data.userlist.name.fuelFee}}/
							</view>
							<view class="" style="color: #F48F00;">
								￥{{userlist.name.taxFee + nums.data.userlist.name.taxFee}}
							</view>
						</view>
					</view>
					<view class="cost_li costs" v-if="isblcks != 4">
						<view class="scse_l">
							保险
						</view>
						<view class="scse_r">
							<view class="corssize" v-if="dats.data.none == 'single'">
								￥{{(profitPrice + profitPrices)}}
							</view>
							<view class="corssize" v-if="dats.data.none != 'single'">
								￥{{(profitPrice + profitPrices) * 2 }}
							</view>
							<view class="">
								<!-- x{{userlists.length}}人 -->
							</view>
						</view>
					</view>
					<view class="cost_li costs">
						<view class="scse_l">
							服务费
						</view>
						<view class="scse_r">
							<view class="corssize" v-if="dats.data.none == 'single'">
								￥{{tips}}
							</view>
							<view class="corssize" v-if="dats.data.none != 'single'">
								￥{{tips * 2 }}
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
								{{leng}}/人
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
							<view class="corssize">
								￥{{num}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bottoms">
				<view class="btnsp">
					<view class="bottoms_lift" @click="clikst">
						<view class="" style="color: #F48F00;" >
							￥ {{num}}
						</view>
						<view class=""  style="color:#C8C7CC;margin-right: 20upx;">
							明细
						</view>
					</view>
					<view class="bottoms_right" @click="panduan(1)" v-if="isblcks != 4 && rotes('tms:dps:reserve')">
						<!-- :class="iss ? 'bottoms_rights':'bottoms_right'" -->
						提交
					</view>
					<view class="bottoms_right" @click="panduan(2)" v-if="isblcks == 4 && rotes('tms:dps:change')">
						申请改签
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import passenger from "@/components/view/book/passenger/passenger";
	import certifi from '@/api/certificate.js'
	import order from '@/api/order.js'
	import tork from '@/api/torowk.js'
	import mydi from '@/api/mydi.js';
	export default {
		data() {
			return {
				isretun: false,
				abstid: -1, //当前银行搜索下标
				zhis: '',
				reson: '', //出行事由
				Units: '', //单位名称
				to_src: '', //改签证明
				CostCencd: [],
				CostCi: false, //是否有成本中心审批人
				CostCis: false, //是否有部门审批人
				CostCenter: [],
				Deparapp: [],
				usermap: [{
						name: '尊享航意险',
						money: '40',
						text: '80%商旅人士选择，420万高额保障'
					},
					{
						name: '航意航延组合险',
						money: '40',
						text: '意外险+延误险，双重保障'
					},
					{
						name: '航空意外险',
						money: '30',
						text: '享320万保障'
					}
				],
				chines: {
					index: 0
				},
				chiness: {
					index: 0
				},
				chineas: {
					index: 0
				},
				kingList: [],
				kinsList: [],
				banklist: [], //银行集合
				banklists: [], //当前搜索银行
				userlist:null,
				date: '',
				timelist: [],
				isarsrl: false, //是否免审
				maoyid: '0',
				volunteer: true,
				Involuntary: false,
				willings: true,
				hang: [],
				num: '',
				leng: '',
				Opening: '', //开户
				iss: false,
				zhi: '个人支付',
				facePrice: 0,
				profitPrice: 0,
				insuranceNo: '',
				insuranceNos: '',
				facePrices: 0,
				profitPrices: 0,
				isGift: 0,
				isGifts: 0,
				allIsGift: false, //是否赠送保险
				companyi_click: false, //弹出层
				companys_click: false, //保险
				idstarle: false, //是否高价超规要选择原因
				pricdesc: '', //高价超规原因
				bools: false,
				mao: true,
				yi: false,
				fxli: false,
				fxlli: false,
				hing: true,
				diss: true,
				Default: 0,
				Defaults: 0,
				MentionChange: 0,
				isblcks: '',
				isbtd: '',
				tips: 0, //服务费
				user_name: '', //联系人
				user_ipone: '', //联系电话
				dats: {},
				packlist: {}, //上个页面的值
				backrule: {}, //退改签规则
				repeatBookingLimit: {}, //重复预定规则政策
				rulesReasons: [], //超规类型
				staleve: false,
				isblckt: false, //二次审核
				sttos:0,//事前是否违规再次审批  1为开启二次审批 3为违规再次审批
				respeatBook: [],
				bool: true,
				notbooking: false,
				nums: {}, //页面对象
				costs: false,
				onprice: '999', //总价
				prices: 0, //票价
				priceas: 0, //回来的票价
				amounto: 0, //基建
				amountt: 0, //燃油
				TravelDepartlist: [], //部门审批人
				TravelCostCenlist: [], //成本中心
				scardns: [],
				userlists: [], //用户列表
				slid: 1,
				switfal: false,
				ullist: [{
					name: '成本中心',
					id: 1
				}],
				slitlist: [],
				sli_namelist: [],
				ziyuanlsit: [{
					name: "公务卡验证",
					id: '0'
				}, {
					name: "预算单位验证",
					id: '1'
				}],
				noticerefund: [ //退票说明
					"1、退票规定：起飞前2小时(含)以前收取5%的退票手续费;起飞前2小时(不含)以后收取10%的退票手续费;(具体以航司审核为准)",
					"2、改签规定：起飞前2天(含)允许免费改期1次;起飞前2小时(含)以前收取0%的改期手续费;起飞前2小时(不含)以后收取5%的改期手续费;(具体以航司审核为准)",
					"3、签转规定：不得签转"
				],
				cbname: '', //成本中心名称
				cbid: '', //成本中心id
				botname: '', //当前选择的成本中心名称
				slit_id_checd: 0, //当前点击成本中心的id
				treeLists: [], //归属部门列表
				ops_list: false, //归属部门
				
				CostCenterlist: [], //成本中心审批人
				costlist: [], //当前选择的成本中心审批人集合
				isswf: true, //true为成本中心 false为部门   审批人
				Deparapprover: [], //部门审批人
				deparlist: [], //前选择的部门审批人集合
				
				datalist: {},
				cardlist: [],
				NameCenter: {
					name: '',
					id: ''
				},
				blac_show: false,
				switfals: false,
				switfalss: false,
				stlistad: {},
				limitNativeRule: [],
				attdepartment: '', //归属部门
				carld: [], //证件列表
				scardnno: [], //证件值
				Brokerage: 0, //单人火车票手续费
				butalist: [], //人员
				isone: true,
				user_remark: "", //改签原因
				isones: true,
				passengerNoslist: [], //改签人passno
				getTravelPolicys: {}, //保险规则判断
				vehicleId: '', //事前id
				vehicleIdBack: '', //事前id
				civilServiceTicket: '',
				context: '', //用于官方票传递参数
				code: '',
				sittext: '退票通知',
				fasp: 0,
				outboundTicketPrice: 0,
				returnTicketPrice: 0,
				toReturn: 0,
				isshowcenter:false,//是否显示审批信息
			}

		},
		components: {
			passenger
		},
		computed: {
			...mapState([
				'butaluserlist', //出行人员
			])
		},
		watch: {
			butaluserlist: {
				handler(newBuTalUserList, oldBuTalUserList) {
					if(this.butaluserlist.length != 0){
						this.leng = this.butaluserlist.length;
						this.userlis();
						this.totalAmount(this.toReturn);
					} else {
						this.leng = 0;
						this.userlists = [];
						this.totalAmount(this.toReturn);
					}
				}
			}
		},
		

		onLoad(item) {
			let st = JSON.parse(uni.getStorageSync("predetermine_data"));

			this.civilServiceTicket = st.civilServiceTicket;
			let dat = {};
			if (st.isone) { //单程
				this.isone = true;
				dat = JSON.parse((uni.getStorageSync("predetermine_data")));
			} else { //往返
				this.isone = false;
				dat = JSON.parse((uni.getStorageSync("predetermine_data"))).ones;
				this.nums = JSON.parse((uni.getStorageSync("predetermine_data"))).twos;
			}
			this.dats = dat;
			this.packlist = dat;
			this.userlist = dat.data.userlist || [];
			this.date = dat.date;
			this.timelist = dat.data.timelist;
			this.hang = dat.data.hang;
			this.isarsrl = dat.isarsrl; //是否免审
			this.isblckt = dat.isblckt; //事前是否需要二次审批
			this.isblcks = dat.data.datw.isblcks; //1事前2事中
			this.isbtd = dat.data.datw.isbtd; //1应公2应私
			if (this.isblcks == 4 && this.isbtd == 1) {
				this.passengerNoslist = dat.data.datw.passengerNos; //改签出行人no
			}
			this.butalist = dat.data.datw.butalist; //
		},
		mounted() {
			if (this.isbtd == 2) {
				this.$refs['passengers'].colllist();
			}
			//改签或者事前  不是免审
			if ((this.dats.data.datw.isblcks == 4 || this.dats.data.datw.isblcks == 1) && this.isarsrl == false) {
				this.getRuleMainSetting(); //获取公司是否需要审核
			} else {
				this.isshowcentermt();//是否显示审批信息
			}
			if (this.dats.data.datw.isblcks == 1) { //判断是否事前
				this.attdepartment = this.dats.data.datw.mokksli.deptName;
				this.NameCenter = {
					name: this.dats.data.datw.mokksli.costName,
					id: this.dats.data.datw.mokksli.costId
				};
			} else {
				const data = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //获取归属部门
				if (data.deptName) {
					this.attdepartment = data.deptName;
				}
			}
			this.usernams();
			this.backrules();
			this.userlis(); //出行人信息
			this.selts(); //查询成本中心
			if (this.isblcks != 4) {
				this.baoxian(); //保险
			}
			this.getstu(); //获取飞机p价
			this.getTravelPolicyst(); //保险规则判断
			
		},
		methods: {
			isshowcentermt(){
				if(this.isbtd == 1 && !this.isarsrl){ //因公 非免审
					if(this.isblcks == 2||
					this.isblcks == 4||
					this.isblcks == 1 && this.isblckt == true){
						this.isshowcenter = true;//显示审批信息
					}
				}
			},
			async getRuleMainSetting() { //查询当前用户改签是否需要审核 和 事前是否二次过审
			
				try {
					let res = await order.RuleMainSetting();
					let stw = res.data.examineSwitch.split(',');
					if(this.isblckt){
						this.sttos = 3;
					}	
					for (let i in stw) {
						/**
						 * 3代表事前二次过审
						 */
						if (stw[i] == 3) {
							//如果用户不是免审 就要事前二次过审
							if(!this.isblckt){
								this.sttos = 1;
								this.isblckt = true;
							}
						}
					}
					this.isshowcentermt();
					if (this.isblckt == true) { //如果需要二次审批 默认载入成本中心
						this.okisd();
					}
				} catch (e) {
					console.log(e);
			
				}
			},
			onInput(itm, id) {
				this.abstid = id;
				var va = itm.mp.detail.value.trim();
				if (va.length > 0) {
					var banks = this.banklist; //当前所有银行
					this.banklists = [];
					for (let i in banks) {
						if (banks[i].indexOf(va) >= 0) {
							this.banklists.push(banks[i])
						}
					}
					va = this.zhis;
				}
			},
			bankss(carval, item_bk) {
				this.userlists[this.abstid].carval = item_bk;
				this.abstid = -1;
			},
			async usernams() { //获取联系人
				try {
					const res = await tork.getContactInfo();
					if (res.code == 200) {
						this.user_name = res.data.name;
						this.user_ipone = res.data.phone;
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e);
				}
			},
			async backrules() { //获取退改签规则
				try {
					let data = {
						airlineCode: this.dats.data.userlist.name.airline, //航司编码
						cabin: this.dats.datw.cabin, //舱位
						depDate: this.dats.data.userlist.name.departDate, //起飞时间
						airRoute: this.dats.data.userlist.name.depart + this.dats.data.userlist.name.arrive, //航线：CANPVG（出发地到达地）
					}
					const ret = await tork.getRefundChangeRule(data);
					if (ret.code == 200) {
						this.backrule = ret.data;
						// console.log(this.backrule)
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e);
				}
			},
			willing(ie) {
				this.maoyid = ie;
				if (ie == 0) {
					this.volunteer = true;
					this.Involuntary = false;
				} else {
					this.Involuntary = true;
					this.volunteer = false;
				}
			},
			async getTravelPolicyst() {
				try {
					let res = await certifi.getTravelPolicy();
					if (res.code == 200) {
						this.getTravelPolicys = res.data;
						this.commit();
					} else {
						this.showToasts(res.message);
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			timaout(times, out) {
				if (out.substring(out.length - 2) != '+1') {
					return times + ' ' + out + ':00'
				} else {
					let timet = out.substring(0, 5);
					let dats = new Date(new Date(times).getTime() + 24 * 60 * 60 * 1000);
					let year = dats.getFullYear(); //当前年
					let month = dats.getMonth() + 1 < 10 ? '0' + (dats.getMonth() + 1) : dats.getMonth() + 1;
					let day = dats.getDate() < 10 ? '0' + dats.getDate() : dats.getDate();
					console.log(year + '-' + month + '-' + day + ' ' + timet + ':00')
					return year + '-' + month + '-' + day + ' ' + timet + ':00'
				}
			},
			async updata() { //申请改签
				let that = this;
				let userlists = that.userlists;
				let citysy = that.dats.data.userlist.name; //当前航班信息 往
				let citysys = {}; //返
				if (!this.isone) { //往返
					citysys = that.nums.data.userlist.name;
				}
				let NameCenter = that.NameCenter; //成本中心
				let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
				let TravelDepartlist = that.TravelDepartlist; //部门审批人
				let apprvTaskStaffts = []; //审核人员
				let user_name = that.user_name; //联系人
				let user_ipone = that.user_ipone; //联系电话
				let user_remark = that.user_remark; //改签原因
				let isbtd = that.isbtd; //1因公2因私
				let isblcks = that.isblcks; //1事前 2事中 3违规再次审批 4改签
				let limitNativeRule = that.dats.limitNativeRule;
				let limitNativeRules = that.nums.limitNativeRule;
				if (NameCenter.id == '' && isbtd == 1 && this.isarsrl == false && (isblcks == 2 || isblcks == 4)) {
					that.showToasts("请选择成本中心！")
					return
				} else if (TravelCostCenlist.length == 0 && (isblcks == 2 || isblcks == 4) && isbtd == 1 && this.isarsrl == false &&
					this.CostCi == true) {
					that.showToasts("请选择成本审批人！");
					return
				} else if (TravelDepartlist.length == 0 && (isblcks == 2 || isblcks == 4) && isbtd == 1 && this.isarsrl == false &&
					this.CostCis == true) {
					that.showToasts("请选择部门审批人！");
					return
				} else if (user_name == '') {
					that.showToasts("请输入联系人！")
					return
				} else if (user_ipone == '') {
					that.showToasts("请输入联系电话！")
					return
				} else if (user_remark == '') {
					that.showToasts("请输入改签原因！")
					return
				}
				let legList = [];
				legList.push({
					flightNo: citysy.no,
					cabin: that.dats.datw.cabin,
					depAirport: citysy.depart,
					arrAirport: citysy.arrive,
					depTime: citysy.departDate.substring(0, 10) + ' ' + citysy.departTime + ':00',
					arrTime: that.timaout(citysy.departDate.substring(0, 10), citysy.arriveTime),
					depTerminal: citysy.departs,
					arrTerminal: citysy.arrives,
				})
				if (!this.isone) { //往返
					legList.push({
						flightNo: citysys.no,
						cabin: that.nums.datw.cabin,
						depAirport: citysys.depart,
						arrAirport: citysys.arrive,
						depTime: citysys.departDate.substring(0, 10) + ' ' + citysys.departTime + ':00',
						arrTime: citysys.departDate.substring(0, 10) + ' ' + citysys.arriveTime + ':00',
						depTerminal: citysys.departs,
						arrTerminal: citysys.arrives,
					})
				}
				for (var i = 0; i < TravelCostCenlist.length; i++) { //成本中心审批人
					apprvTaskStaffts.push({
						deptCost: 2,
						nodeId: TravelCostCenlist[i].nodeId,
						personId: TravelCostCenlist[i].personId,
						staffId: TravelCostCenlist[i].staffId,
						staffName: TravelCostCenlist[i].staffName
					})
				}
				for (var i = 0; i < TravelDepartlist.length; i++) { //部门审批人
					apprvTaskStaffts.push({
						deptCost: 1,
						nodeId: TravelDepartlist[i].nodeId,
						personId: TravelDepartlist[i].personId,
						staffId: TravelDepartlist[i].staffId,
						staffName: TravelDepartlist[i].staffName
					})
				}
				let usasrlist = []; //改签用户列表信息
				for (let i = 0; i < userlists.length; i++) {
					usasrlist.push({
						name: userlists[i].name,
						newName: userlists[i].name,
						cardNo: userlists[i].certNo,
						newCardNo: userlists[i].certNo,
						newCardType: that.cardtype(userlists[i].certType),
						newPhone: userlists[i].phone,
					})
				}
				let ists = 0;
				let invs = "";
				if (limitNativeRule.length == 0 && this.dats.data.none == "single") {
					ists = 0;
					invs = ""
				} else {
					invs = JSON.stringify({
						information: [limitNativeRule]
					});
					ists = 1;
				}
				if (this.dats.data.none == "returns") {
					let limitNativeRules = that.nums.limitNativeRule;
					if (limitNativeRules.length == 0) {
						ists = 0;
						invs = ""
					} else {
						invs = JSON.stringify({
							information: [limitNativeRule, limitNativeRules]
						});
						ists = 1;
					}
				}
				let dat = {};
				dat = {
					saleNo: that.dats.data.datw.saleOrderNo, //原销售单号
					tradeNo: that.dats.data.datw.tradeNo, //原交易单号
					voluntarily: '1',
					apprvTaskEntity: {
						agree: false, //是否当前人审批
						taskType: isblcks, //1为事前2为事中，
						beforeMiddle: isblcks, //1为事前2为事中
						reason:user_remark, //理由
						apprvTaskStaffs: apprvTaskStaffts, //审批人信息
						costId: NameCenter.id, //成本中心id
						costName: NameCenter.name, //成本中心名称
						remark: invs, //超规信息
					},
					legList: legList, //改签航班信息
					odllegList: that.dats.data.datw.odllegList, //旧航班信息
					oldPassger: usasrlist, //出行人
					contacts: user_name, //联系人
					contactPhone: user_ipone, //联系电话
					reason: user_remark, //改签原因
					cardFile: that.to_src, //改签文件证明
				}
				
				try {
					let res = await tork.applySaleChange(dat);
					
					if (res.code == 200) {
						that.showToasts("申请改签成功！")
						setTimeout(() => {
							uni.setStorageSync("sworders_od",{
								type:'airTicketChanges',
								data:res.data
							});
							uni.switchTab({
								url: '/pages/order/order',
								success:function(){
								}
							})
						}, 1000)
					} else {
						that.showToasts(res.message)
					}
				} catch (e) {
					console.log(e)
					
				}

			},
			ft_click() { //上传图片
				let _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						let Max_Size = res.tempFiles[0].size;
						if (Max_Size / 1024 > 2048) {
							console.log("!2048")
							_this.showToasts("照片大小不能高于2MB")
							return
						}
						console.log("!上传")
						_this.headImg = res.tempFilePaths;
						const data = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //关于token的用法
						let baseURL = uni.getStorageSync('baseURL');
						console.log("!上传中")
						
						uni.uploadFile({
							// #ifdef  APP-PLUS
							url: "http://tmcapitest.gssok.com:8000/tmsapi/tms/api/user/uploadPassengerImage", //除了h5平台     // 后端api接口
							// #endif
							// #ifdef  H5 || MP-WEIXIN
							url: baseURL + "/tms/api/user/uploadPassengerImage", // 后端api接口
							// #endif
							methods: "POST",
							filePath: _this.headImg[0], // uni.chooseImage函数调用后获取的本地文件路径
							name: 'file', //后端通过'file'获取上传的文件对象
							header: {
								'AuthToken': data.token
							},
							formData: {
								'file': 'test'
							},
							success: (res) => {
								
								let data = JSON.parse(res.data)
								if (data.code == 200) {
									_this.to_src = data.data;

								}
							},
							error: (res) => {
								this.showToasts("上传失败！", res)
							}
						});
					},
					error: function(e) {
						console.log(e);
					}
				})
			},
			search(ev) { //监听input里面的手机号的值
				let _this = this;
				let va = ev.mp.detail.value; //获取搜索框的值
				if (va.length == 11) {
					if (this.utils.zzPhone(va)) {
						_this.showToasts("请输入正确的手机号!");
					}
				}
			},
			cardtype(it) {
				if (it == '身份证') {
					return 'NI'
				} else if (it == '护照') {
					return 'PP'
				} else if (it == '台胞证') {
					return 'TB'
				} else if (it == '港澳通行证') {
					return 'GA'
				} else if (it == '回乡证') {
					return 'HX'
				} else if (it == '其他证件') {
					return 'OS'
				}
			},
			CostCencdChange(e, index, trus) { //选择身份证
				this.CostCencd[index].index = e.detail.value;
				this.scardns[index] = trus[this.CostCencd[index].index].cardType;
				this.scardnno[index] = trus[this.CostCencd[index].index].cardNo;
				this.userlists[index].name = trus[this.CostCencd[index].index].firstName + trus[this.CostCencd[index].index].lastName;
			},
			CostCenterChange(e, index) { //选择当前成本中心审批人
				this.CostCenter[index].index = e.detail.value;
			},
			DeparappChange(e, index) { //选择当前部门审批人
				this.Deparapp[index].index = e.detail.value;
			},
			async getstu() { //获取飞机p价
				let shared = '';
				if (this.dats.data.userlist.name.shared == true) {
					shared = "0"
				} else {
					shared = "1"
				}
				let usera = {};
				usera = {
					airline: {
						airlineType: 1,
						passengerType: "ADT",
						one_depart: this.dats.data.userlist.name.depart, //第一段，出发城市
						one_departDate: (this.dats.data.userlist.name.departDate).substring(0, 10), //第一段，出发日期
						one_departTime: this.dats.data.userlist.name.departTime, //第一段，出发时间
						one_arrival: this.dats.data.userlist.name.arrive, //第一段，到达城市
						one_no: this.dats.data.userlist.name.no, //第一段，航班号
						one_sharedBZ: shared, //是否共享航班
						one_operatingNo: this.dats.data.userlist.name.operatingNo, //第一段，实际承运航班号
						one_cabin: this.dats.datw.cabin, //第一段，舱位
						isSame: "2", //是否为往返组合标识，1：是；2：不是
						one_taxFee: this.dats.data.userlist.name.taxFee, //第一段，机建
						one_fuelFee: this.dats.data.userlist.name.fuelFee, //第一段，燃油
						one_fdprice: this.outboundTicketPrice, //第一段公布运价
						one_arrivalTime: this.dats.data.userlist.name.arriveTime, //第一段，到达时间arriveTime
					},
				}
				if(this.dats.datw.priceSource == 1){//官方
					usera.airline['flightInfoId'] = this.dats.data.userlist.text.flightinfoids;
					usera.airline['priceInfoId'] = this.dats.datw.priceInfoId;
					usera['special'] = 4;
				}else if(this.dats.datw.priceSource == 2 && this.civilServiceTicket != 1){//美赢
					usera = {
						special: 5,
						airline: {
							airlineType: 1,
							passengerType: "ADT",
							one_operatingNo: this.dats.data.userlist.name.operatingNo,
							one_cabin: this.dats.datw.cabin,
							isSame: "2",
							one_taxFee: this.dats.data.userlist.name.taxFee,
							one_fuelFee: this.dats.data.userlist.name.fuelFee,
							one_fdprice: this.outboundTicketPrice,
						},
					}
				} else {//其他
					usera['special'] = this.dats.datw.specialType;
				}
				if(this.civilServiceTicket == 1){ //1为公务员票
					usera.airline['civilServiceTicket'] = this.civilServiceTicket; //展示公务机票 标识。1：展示；0：不展示
				}
				if(this.dats.data.none != "single"){//往返
					let dast = {
						two_depart: this.nums.data.userlist.name.depart, //第二段，出发城市
						two_departDate: (this.nums.data.userlist.name.departDate).substring(0, 10), //第二段，出发日期
						two_departTime: this.nums.data.userlist.name.departTime, //第二段，出发时间
						two_arrival: this.nums.data.userlist.name.arrive, //第二段，到达城市
						two_no: this.nums.data.userlist.name.no, //第二段，航班号
						two_sharedBZ: shared, //是否共享航班
						two_operatingNo: this.nums.data.userlist.name.operatingNo, //第二段，实际承运航班号
						two_cabin: this.nums.datw.cabin, //第二段，舱位
						two_taxFee: this.nums.data.userlist.name.taxFee, //第二段，机建
						two_fuelFee: this.nums.data.userlist.name.fuelFee, //第二段，燃油
						two_fdprice: this.returnTicketPrice, //第二段公布运价
						two_arrivalTime: this.nums.data.userlist.name.arriveTime, //第二段，到达时间
					}
					let stdata = usera.airline;
					usera.airline = {...dast,...stdata};//合并
					usera.airline.airlineType = 2;
					usera.airline.isSame = 1;
				}
				
				try {
					const res = await tork.getPnrPriceInfor(usera);
					
					this.code = res.code;
					if (res.code == 200) {
						if (this.dats.data.none == "single") {
							let datw = this.dats.datw;
							if (res.data != null && res.data.length > 0) {
								if (this.dats.datw.priceSource == 1) {
									if (datw.parPrice == res.data[0].baseFare) { //官网票读值
										this.prices = datw.price; //票价
									} else if (res.data[0].baseFare != 0 && res.data[0].baseFare != null) {
										this.prices = res.data[0].baseFare - res.data[0].baseFare * datw.rebate / 100 - datw.cashBack;
									} else {
										this.prices = datw.price; //票价
									}
									this.amounto = res.data[0].taxes[0].amount; //基建
									this.context = res.data[0].context;
									this.totalAmount(1);
									// this.amountt = res.data[0].taxes[1].amount;  //燃油
								} else {
									if (datw.parPrice == res.data[0].segFareInfos[0].baseFare) { // 正常票读值
										this.prices = datw.price; //票价
									} else if (res.data[0].segFareInfos[0].baseFare != 0 && res.data[0].segFareInfos[0].baseFare != null) {
										this.prices = res.data[0].segFareInfos[0].baseFare - res.data[0].segFareInfos[0].baseFare * datw.rebate /
											100 - datw.cashBack;
									} else {
										this.prices = datw.price; //票价
									}
									this.amounto = res.data[0].taxes[0].amount; //基建
									this.context = res.data[0].context;
									this.totalAmount(1);
									// this.amountt = res.data[0].taxes[1].amount;  //燃油
								}

								if (this.dats.datw.priceSource == 1) {
									if (res.data[0].baseFare != null && res.data[0].baseFare != 0) {
										this.outboundTicketPrice = res.data[0].baseFare;
									} else {
										this.outboundTicketPrice = this.dats.datw.parPrice;
									}
								} else {
									if (res.data[0].segFareInfos[0].baseFare != null && res.data[0].segFareInfos[0].baseFare != 0) {
										this.outboundTicketPrice = res.data[0].segFareInfos[0].baseFare;
									} else {
										this.outboundTicketPrice = this.dats.datw.parPrice;
									}
								}
							} else {
								this.prices = datw.price; //票价
								this.outboundTicketPrice = datw.parPrice;
								this.totalAmount(1);
							}


						} else {
							let nums = this.nums.datw;
							let datw = this.dats.datw;
							if (res.data != null && res.data.length > 0) {
								if (datw.parPrice == res.data[0].segFareInfos[0].baseFare) {
									this.prices = datw.price; //票价
								} else if (res.data[0].segFareInfos[0].baseFare != 0 && res.data[0].segFareInfos[0].baseFare != null) {
									this.prices = res.data[0].segFareInfos[0].baseFare - res.data[0].segFareInfos[0].baseFare * datw.rebate / 100 -
										datw.cashBack;
								} else {
									this.prices = datw.price; //票价
								}
								if (nums.parPrice == res.data[0].segFareInfos[1].baseFare) {
									this.priceas = nums.price;
								} else if (res.data[0].segFareInfos[1].baseFare != 0 && res.data[0].segFareInfos[1].baseFare != null) {
									this.priceas = res.data[0].segFareInfos[1].baseFare - res.data[0].segFareInfos[0].baseFare * nums.rebate /
										100 - nums.cashBack; //票价
								} else {
									this.priceas = nums.price;
								}
								this.totalAmount(2);
								this.context = res.data[0].context; //用于官方票传递参数
								// this.amounto = res.data[0].taxes[0].amount;  //基建

								if (res.data[0].segFareInfos[0].baseFare != null && res.data[0].segFareInfos[0].baseFare != 0) {
									this.outboundTicketPrice = res.data[0].segFareInfos[0].baseFare;
								} else {
									this.outboundTicketPrice = datw.parPrice;
								}
								if (res.data[0].segFareInfos[1].baseFare != null && res.data[0].segFareInfos[1].baseFare != 0) {
									this.returnTicketPrice = res.data[0].segFareInfos[1].baseFare;
								} else {
									this.returnTicketPrice = nums.parPrice;
								}
							} else {
								this.prices = datw.price; //票价
								this.priceas = nums.price;
								this.outboundTicketPrice = datw.parPrice;
								this.returnTicketPrice = nums.parPrice;
								this.totalAmount(2);
							}
						}

					} else { //获取p价失败  直接返回到上一个页面
						this.showToasts(res.message)
						setTimeout(()=>{
							uni.navigateBack({})
						},1000)
					}
				} catch (e) {
					console.log(e)
					
				}

			},
			async baoxian() { //保险
				let uses = [];
				uses = {
					"civilServiceTicket": ''
				}
				
				try {
					let rea = await certifi.toBook(uses); //保险
					
					let kings = [];//航意险
					let kinga = []; //航延险
					let bank = [];
					this.bank = [];
					this.kingList = [];
					this.kinsList = [];
					if (rea.code == 200) {
						for (let i in rea.data.bankList) {//银行列表
							bank.push(rea.data.bankList[i].name);
						}
						this.banklist = bank;
						let insurDomesticLists = rea.data.product.insurDomesticList ;//保险
						if (insurDomesticLists != null) { //判断是否有保险
							for (var i = 0; i < insurDomesticLists.length; i++) {
								if(insurDomesticLists[i].internatOrcivil == 1 || insurDomesticLists[i].internatOrcivil == 3){//1国内机票   3国内/国际
									if (insurDomesticLists[i].insureType == 3) {//1航意险 2航延险 3航意/航延
										kings.push(insurDomesticLists[i]);
										kinga.push(insurDomesticLists[i]);
									} else if(insurDomesticLists[i].insureType == 1){
										kings.push(insurDomesticLists[i]);
									} else if(insurDomesticLists[i].insureType == 2){
										kinga.push(insurDomesticLists[i]);
									}
								}
								
							}
							kings.unshift({
								name: '请选择'
							}); //航意险
							this.kingList = kings;
							kinga.unshift({
								name: '请选择'
							}); //航延险
							this.kinsList = kinga;

							if (this.kingList.length > 1) { //判断是否有保险
								for (let i in this.kingList) { //默认选择保险
									if (this.kingList[i].isDefaulConfig == 1) {
										this.Default = i;
										this.facePrices = this.kingList[i].facePrice;
										this.profitPrices = this.kingList[i].profitPrice;
										this.insuranceNo = this.kingList[i].insuranceNo;
									}
								}
							}
							
							if (this.kinsList.length > 1) { //默认选择保险
								for (let i in this.kinsList) {
									if (this.kinsList[i].isDefaulConfig == 1) {
										this.Defaults = i;
										this.facePrice = this.kinsList[i].facePrice;
										this.profitPrice = this.kinsList[i].profitPrice;
										this.insuranceNos = this.kinsList[i].insuranceNo;
									}
								}
							}
							this.commit();
						}
					} else {
						this.showToasts(rea.message);
					}
				} catch (e) {
					console.log(e)
					
				}

			},
			async userlis() { //出乘人信息
				let st = [];
				this.userlists = [];
				if (this.isblcks == 4) { //改签状态下不能修改乘客证件
					for (let i = 0; i < this.butalist.length; i++) {
						this.userlists.push({
							phone: this.butalist[i].phone,
							name: this.butalist[i].name,
							certType: this.butalist[i].certType,
							certNo: this.butalist[i].certNo,
						})
					}
				} else {
					if (this.butalist.length != 0) {
						if (this.butalist[0].vehicleId != undefined) {
							this.vehicleId = this.butalist[0].vehicleId; //事前id
						}
						if (this.butalist[0].vehicleIdBack != undefined) {
							this.vehicleIdBack = this.butalist[0].vehicleIdBack; //事前id
						}
					}
					if (this.isbtd != 2) {
						for (let i = 0; i < this.butalist.length; i++) {
							st.push(this.butalist[i].passengerNo);
						}
					} else {
						for (let i = 0; i < this.butaluserlist.length; i++) {
							st.push(this.butaluserlist[i].passengerNo);
						}
					}

					
					try {
						const res = await mydi.getPassengerListByNos(st);
						
						if (res.code == 200) {
							this.carld = res.data.cardTypeList; //证件类型
							this.userlists = res.data.passList; //用户信息

							for (var i = 0; i < this.userlists.length; i++) {
								this.CostCencd.push({
									index: 0
								})
							}
							for (let i = 0; i < this.userlists.length; i++) {
								this.userlists[i]['carval'] = '';
								if (this.utils.zzPospattern(this.userlists[i].certificateList[0].firstName) == false && this.utils.zzPospattern(this.userlists[i].certificateList[
										0].lastName) == false) {
									if (this.userlists[i].certificateList[0].firstName != null && this.userlists[i].certificateList[0].lastName !=
										null) {
										this.userlists[i].name = this.userlists[i].certificateList[0].firstName + '/' + this.userlists[i].certificateList[
											0].lastName;
									}
								} else {
									this.userlists[i].name = this.userlists[i].certificateList[0].firstName + this.userlists[i].certificateList[0]
										.lastName;
								}
								// this.userlists[i].name = this.userlists[i].certificateList[0].firstName + this.userlists[i].certificateList[0].lastName;
								this.scardns[i] = this.userlists[i].certificateList[0].cardType;
								this.scardnno[i] = this.userlists[i].certificateList[0].cardNo;
							}
						}
						for (let i = 0; i < this.userlists.length; i++) {
							for (let k = 0; k < this.userlists[i].certificateList.length; k++) {
								this.userlists[i].certificateList[k]['cardTypename'] = this.caname(this.userlists[i].certificateList[k].cardType);
							}
						}
					} catch (e) {
						console.log(e)
						
					}
				}
			},
			async selts() { //查询成本中心
				let _this = this;
				
				try {
					let res = await tork.getCostCenterList();
					
					if (res.code == 200) {
						_this.treeLists = [];
						_this.renderTreeLists(res.data);
					} else {
						_this.showToasts(res.message);
					}
				} catch (e) {
					console.log(e)
					
				}
			},
			clikst() { //费用详情
				if (this.costs) {
					this.costs = false;
					this.blac_show = false;
				} else {
					this.costs = true;
					this.blac_show = true
				}
			},
			isshows() {
				this.costs = false;
				this.switfals = false;
			},
			isshow() {
				this.ops_list = false
				this.blac_show = false;
				this.switfal = false;
				this.costs = false;
			},
			async submit() { //下单
				if (this.code == 200) {
					let that = this;
					let userlists = that.userlists;
					let NameCenter = that.NameCenter; //成本中心
					let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
					let TravelDepartlist = that.TravelDepartlist; //部门审批人
					let apprvTaskStaffts = []; //审核人员
					let user_name = that.user_name; //联系人
					let user_ipone = that.user_ipone; //联系电话
					let isbtd = that.isbtd; //1因公2因私
					let isblcks = that.isblcks; //1事前 2事中 3违规再次审批 4改签
					let limitNativeRule = that.dats.limitNativeRule;
					let usersalist = [];
					let passengerList = [];
					let ists = 0;
					let prods = [];
					if (that.allIsGift) {
						that.profitPrices = 0;
						that.profitPrice = 0;
					}
					if (that.insuranceNo != '') {
						prods.push(that.insuranceNo + ',' + that.profitPrices)
					}
					if (that.insuranceNos != '') {
						prods.push(that.insuranceNos + ',' + that.profitPrice)
					}
					for (let i = 0; i < userlists.length; i++) { //出行人信息
						let Select_phone = '';
						if (userlists[i].phone != '') {
							Select_phone = userlists[i].phone;
						} else {
							Select_phone = userlists[i].telePhone;
						}
						let birthdate = "";
						if (userlists[i].birthdate != null) {
							birthdate = userlists[i].birthdate.substring(0, 10);
						} else {
							birthdate = null
						}
						if (this.civilServiceTicket == 1) {
							usersalist.push({
								passengerType: "ADT",
								certNo: that.scardnno[i],
								certType: that.scardns[i],
								gender: userlists[i].gender,
								name: userlists[i].name,
								birthdate: birthdate,
								passengerPhone: Select_phone,
								historyPassenger: "1",
								productKeys: prods,
								depositBank: userlists[i].carval, //开户银行
							});
						} else {
							usersalist.push({
								passengerType: "ADT",
								certNo: that.scardnno[i],
								certType: that.scardns[i],
								gender: userlists[i].gender,
								name: userlists[i].name,
								birthdate: birthdate,
								passengerPhone: Select_phone,
								historyPassenger: "1",
								productKeys: prods
							});
						}

						passengerList.push({
							"certificate": [{
								"cardNo": that.scardnno[i],
								"cardType": that.scardns[i]
							}],
							"deptId": userlists[i].deptId,
							"deptName": userlists[i].deptName,
							"costcenterName": this.packlist.data.datw.butalist.length > 0 ? this.packlist.data.datw.butalist[i].costcenterName :
								this.butaluserlist[i].costcenterName,
							"userId": userlists[i].userId,
							"name": userlists[i].name,
							"phone": Select_phone,
							"employeeType": userlists[i].employeeType,
							"id": userlists[i].passengerNo

						})
					}

					let dat = {};
					let invs = "";
					if (limitNativeRule.length == 0 && this.dats.data.none == "single") {
						ists = 0;
						invs = ""
					} else {
						invs = JSON.stringify({
							information: [limitNativeRule]
						});
						ists = 1;
					}
					if (this.dats.data.none == "returns") {
						let limitNativeRules = that.nums.limitNativeRule;
						if (limitNativeRules.length == 0) {
							ists = 0;
							invs = ""
						} else {
							invs = JSON.stringify({
								information: [limitNativeRule, limitNativeRules]
							});
							ists = 1;
						}
					}
					let shared = '';
					if (that.dats.data.userlist.name.shared == true) {
						shared = "0"
					} else {
						shared = "1"
					}
					for (var i = 0; i < TravelCostCenlist.length; i++) { //成本中心审批人
						apprvTaskStaffts.push({
							deptCost: 2,
							nodeId: TravelCostCenlist[i].nodeId,
							personId: TravelCostCenlist[i].personId,
							staffId: TravelCostCenlist[i].staffId,
							staffName: TravelCostCenlist[i].staffName
						})
					}
					for (var i = 0; i < TravelDepartlist.length; i++) { //部门审批人
						apprvTaskStaffts.push({
							deptCost: 1,
							nodeId: TravelDepartlist[i].nodeId,
							personId: TravelDepartlist[i].personId,
							staffId: TravelDepartlist[i].staffId,
							staffName: TravelDepartlist[i].staffName
						})
					}
					dat = {
						tips: this.tips,
						one_isviolation: ists, //第一段,是否超规
						one_violation: invs, //超规信息
						airlineType: 1, //航程类型
						needChdCabin: false, //是否需要获取儿童舱位价格，true是，false否。
						one_no: that.dats.data.userlist.name.no, //第一段，航班号
						one_cabin: that.dats.datw.cabin, //第一段，舱位
						one_serviceLevel: that.dats.levels, //第一段舱位服务等级
						one_depart: that.dats.data.userlist.name.depart, //第一段，出发城市
						one_departTerminal: that.dats.data.userlist.name.departTerminal == null ? "" : that.dats.data.userlist.name
							.departTerminal, //第一段，出发机场航站楼
						one_arrival: that.dats.data.userlist.name.arrive, //第一段，到达城市
						one_arrivalTerminal: that.dats.data.userlist.name.arriveTerminal == null ? "" : that.dats.data.userlist.name
							.arriveTerminal, //第一段，到达机场航站楼
						one_plane: that.dats.data.userlist.name.plane, //第一段，机型
						one_meals: that.dats.data.userlist.name.meals, //第一段，餐食
						one_departDate: (that.dats.data.userlist.name.departDate).substring(0, 10) + ' ' + (that.dats.data.userlist
							.name.departTime), //第一段，出发日期that.dats.data.userlist.name.departDate
						one_departTime: that.dats.data.userlist.name.departTime, //第一段，出发时间
						one_arrivalTime: that.dats.data.userlist.name.arriveTime, //第一段，到达时间
						one_taxFee: that.dats.data.userlist.name.taxFee, //第一段，机建
						one_fuelFee: that.dats.data.userlist.name.fuelFee, //第一段，燃油
						one_discount: that.dats.datw.discount, //第一段公布折扣
						one_sharedBZ: shared, //是否共享航班
						one_mileage: that.dats.data.userlist.name.mileage,
						one_fdprice: that.outboundTicketPrice,
						one_office: that.dats.data.userlist.name.officeNo, //第一段office号
						yPrice: that.dats.data.userlist.name.yprice, //第一段，Y舱价格
						cPrice: that.dats.data.userlist.name.cprice, //第一段，C舱价格
						fPrice: that.dats.data.userlist.name.fprice, //第一段，F舱价格
						ticketPrice: that.outboundTicketPrice, //票面价that.dats.datw.price
						one_policyPrice: that.prices, //第二段，票面价
						one_policyId: that.dats.datw.policyId,
						one_lastRebateId: that.dats.datw.lastRebateId,
						one_lastRebateProfitId: that.dats.datw.lastRebateProfitId,
						one_profitConfigId: that.dats.datw.profitConfigId, //第一段，控润配置ID
						one_nMinSalePrice: that.dats.data.userlist.text.nMinSalePrice,
						one_nMinSalePriceFlight: that.dats.data.userlist.text.nMinSalePriceFlight,
						one_nMinSalePriceCabin: that.dats.data.userlist.text.nMinSalePriceCabin,
						one_nMinSalePriceTime: that.dats.data.userlist.text.nMinSalePriceTime,
						passengerList: usersalist, //个人信息
						tripPassengerList: passengerList,
						travelBusinessType: isbtd, //因公因私
						contactsName: user_name, //联系人
						contactsPhone: user_ipone, //联系电话
					}
					if (this.civilServiceTicket == 1) {//是否公务员票 1为是
						dat['verifyWay'] = this.maoyid;////验证方式  0：公务员卡 1：预算单位
						dat['unitName'] = this.Units;  //预算单位名称
					}
					if (this.dats.datw.priceSource == 1) {//1是官方 2是美赢 官方需要追加参数
						dat['one_isWebsite'] = 4;//4代表官方票
						dat['one_isOutCode'] = 9;  //9-官网
						dat['one_context'] = this.context; //代表官方票
					}
					if(this.civilServiceTicket != 1 && this.dats.datw.priceSource != 1){
						let isOutCode = that.dats.datw.priceSource == 2 ? 10 : 0;// 10-美赢  0-自己家
						dat['one_isOutCode'] = isOutCode;
					}
					if (this.dats.data.none == "returns") {//往返
						let relists = {
							two_serviceLevel: that.nums.levels, //第二段舱位服务等级
							two_mileage: that.nums.data.userlist.name.mileage,
							two_fdprice: that.returnTicketPrice,
							two_no: that.nums.data.userlist.name.no, //第二段，航班号
							two_cabin: that.nums.datw.cabin, //第二段，舱位
							two_depart: that.nums.data.userlist.name.depart, //第二段，出发城市
							two_departTerminal: that.nums.data.userlist.name.departTerminal == null ? "" : that.nums.data.userlist.name
							.departTerminal, //第二段，出发机场航站楼
							two_arrival: that.nums.data.userlist.name.arrive, //第二段，到达城市
							two_arrivalTerminal: that.nums.data.userlist.name.arriveTerminal == null ? "" : that.nums.data.userlist.name
							.arriveTerminal, //第二段，到达机场航站楼
							two_plane: that.nums.data.userlist.name.plane, //第二段，机型
							two_meals: that.nums.data.userlist.name.meals, //第二段，餐食
							two_departDate: (that.nums.data.userlist.name.departDate).substring(0, 10) + ' ' + (that.nums.data.userlist
							.name.departTime), //第二段，出发日期
							two_departTime: that.nums.data.userlist.name.departTime, //第二段，出发时间 that.nums.data.userlist.name.departTime
							two_arrivalTime: that.nums.data.userlist.name.arriveTime, //第二段，到达时间
							two_taxFee: that.nums.data.userlist.name.taxFee, //第二段，机建
							two_fuelFee: that.nums.data.userlist.name.fuelFee, //第二段，燃油
							two_discount: that.nums.datw.discount, //第二段公布折扣
							two_sharedBZ: shared, //是否共享航班
							two_office: that.nums.data.userlist.name.officeNo, //第二段office号
							yPrice2: that.nums.data.userlist.name.yprice, //第二段，Y舱价格
							cPrice2: that.nums.data.userlist.name.cprice, //第二段，C舱价格
							fPrice2: that.nums.data.userlist.name.fprice, //第二段，F舱价格
							ticketPrice2: that.returnTicketPrice, //第二段，票面价
							two_policyPrice: that.priceas, //第2段，小数点价
							two_policyId: that.nums.datw.policyId,
							two_lastRebateId: that.nums.datw.lastRebateId,
							two_lastRebateProfitId: that.nums.datw.lastRebateProfitId,
							two_profitConfigId: that.nums.datw.profitConfigId, //第二段，控润配置ID
							two_nMinSalePrice: that.nums.data.userlist.text.nMinSalePrice,
							two_nMinSalePriceFlight: that.nums.data.userlist.text.nMinSalePriceFlight,
							two_nMinSalePriceCabin: that.nums.data.userlist.text.nMinSalePriceCabin,
							two_nMinSalePriceTime: that.nums.data.userlist.text.nMinSalePriceTime,
						}
						dat = {...dat,...relists};//将返回的值插入对象
						dat.airlineType = 2;//2为往返
					}
					if ((isblcks == 2 && isbtd == 1 && this.isarsrl == false) || (isblcks == 1 && isbtd == 1 && this.isarsrl == false &&
							this.isblckt == true)) { //因公事中需要审核   因公事前需要二审
						dat['apprvTask'] = {
							agree: false, //是否当前人审批
							taskType: isblcks, //1为事前2为事中，
							totalMoney: this.num,
							beforeMiddle: isblcks, //1为事前2为事中
							reason: this.reson, //理由
							apprvTaskStaffs: apprvTaskStaffts, //审批人信息
							costId: NameCenter.id, //成本中心id
							costName: NameCenter.name, //成本中心名称
							remark: invs, //超规信息
							travelNo: this.dats.data.datw.mokksli.travelNo,
						}
						if(isblcks == 1){//事前
							dat.apprvTask['vehicleId'] = this.vehicleId//事前id
							if(this.dats.data.none == "returns"){
								dat.apprvTask['vehicleIdBack'] = this.vehicleIdBack;
							}
						}
					} else if (isblcks == 1 && isbtd == 1 && (this.isarsrl == true|| this.isblckt == false )) {//事前因公 免审或者 不需要二审
						dat['apprvTask'] = {
							taskType: isblcks, //1为事前2为事中，
							totalMoney: this.num,
							beforeMiddle: isblcks, //1为事前2为事中
							reason: this.reson, //理由
							costId: NameCenter.id, //成本中心id
							costName: NameCenter.name, //成本中心名称
							travelNo: this.dats.data.datw.mokksli.travelNo,
							vehicleId:this.vehicleId//事前id
						}
						if(this.dats.data.none == "returns"){//返回的事前id
							dat.apprvTask['vehicleIdBack'] = this.vehicleIdBack;
						}
					} else if (isbtd == 2 || (isbtd == 1 && this.isarsrl == true)) {//因私 或者因公免审
						dat['apprvTask'] = {
							taskType: isblcks, //1为事前2为事中，
							totalMoney: this.num,
							beforeMiddle: isblcks, //1为事前2为事中
							reason: this.reson, //理由
							travelNo: this.dats.data.datw.mokksli.travelNo,
						}
					}
					try {
						const res = await tork.bookTicket(dat);
						that.iss = true;
						if(res.code == 200){
							if (res.data.message[0].code == 1) {
								that.showToasts("创建订单成功");
								setTimeout(()=>{
									uni.setStorageSync("sworders_od",{
										type:'aircraft',
										data:res.data.message[0].tradeNo
									});
									uni.switchTab({
										url: '/pages/order/order',
										success:function(){
										}
									})
								},1000)
							} else {
								that.showToasts(res.data.message[0].message)
							}
						} else {
							that.showToasts(res.message)
						}
						
					} catch (e) {
						console.log(e)
						
					}
				} else if (this.code == 'unknown') {
					uni.showModal({
						title: '提示',
						content: '验舱验价失败，请重新预订',
					})
				} else {
					uni.showModal({
						titel: '提示',
						content: '验舱验价中，请等待！如若长时间未响应请联系客服！'
					})
				}
			},
			async panduan(i) {
				//重复预订判断
				this.MentionChange = i; //1是提交2是改签
				let uses = {};
				let usest = {};
				let usert = [];
				let that = this;
				let userlists = that.userlists;
				let NameCenter = that.NameCenter; //成本中心
				let TravelCostCenlist = that.TravelCostCenlist; //成本审批人
				let TravelDepartlist = that.TravelDepartlist; //部门审批人
				let apprvTaskStaffts = []; //审核人员
				let user_name = that.user_name; //联系人
				let user_ipone = that.user_ipone; //联系电话
				let user_remark = that.user_remark; //改签原因
				let isbtd = that.isbtd; //1因公2因私
				let isblcks = that.isblcks; //1事前 2事中
				let limitNativeRule = that.dats.limitNativeRule;
				let getTravelPolicys = that.getTravelPolicys;
				if (getTravelPolicys != null) {
					if (getTravelPolicys.domesticInsuranceProduct == 0) {
						if (this.Default.index == 0 && isblcks != 4) { //&& this.chineas.index == 0 )
							that.showToasts("请选择一个保险")
							return
						}
					}
				}
				if(!userlists){
					that.showToasts("请选择出行人!")
					return
				}
				if (that.Units == '' && this.Involuntary == true) {
					that.showToasts("请填写单位名称")
					return
				}
				if(!userlists) return that.showToasts("请选择旅客姓名")
				for (let i = 0; i < userlists.length; i++) { //出行人信息
					if (userlists[i].carval == '' && this.volunteer == true && this.civilServiceTicket == 1) {
						that.showToasts("请填写开户银行")
						return
					}
				}
				if (NameCenter.id == '' && isbtd == 1 && this.isarsrl == false && (isblcks == 2 || isblcks == 4)) {
					that.showToasts("请选择成本中心！")
					return
				} else if (TravelCostCenlist.length == 0 && (isblcks == 2 || isblcks == 4 || isblcks == 1) && isbtd == 1 && this.isarsrl ==
					false && this.CostCi == true) {
					that.showToasts("请选择成本审批人！");
					return
				} else if (TravelDepartlist.length == 0 && (isblcks == 2 || isblcks == 4) && isbtd == 1 && this.isarsrl == false &&
					this.CostCis == true) {
					that.showToasts("请选择部门审批人！");
					return
				} else if (that.reson == '' && isbtd == 1 && (isblcks == 2 || isblcks == 4)) {
					that.showToasts("请输入出行事由！")
					return
				} else if (user_name == '') {
					that.showToasts("请输入联系人！")
					return
				} else if (user_ipone == '') {
					that.showToasts("请输入联系电话！")
					return
				} else if (this.utils.zzPhone(user_ipone)) {
					that.showToasts("请输入正确的电话号码!")
					return
				} else if (isblcks == 4 && user_remark == '') {
					that.showToasts("请输入改签原因!")
					return
				}

				if (isblcks != 4) {
					for (let i = 0; i < userlists.length; i++) { //出行人信息
						usert.push({
							cardNo: that.scardnno[i],
							cardType: that.scardns[i],
							name: userlists[i].name,
							phone: userlists[i].phone,
							passengerNo: userlists[i].passengerNo
						});
					}
				} else {
					for (let i = 0; i < userlists.length; i++) { //出行人信息
						usert.push({
							cardNo: userlists[i].certNo,
							cardType: that.cardtype(userlists[i].certType),
							name: userlists[i].name,
							phone: userlists[i].phone,
							passengerNo: that.passengerNoslist[i]
						});
					}
				}

				if (that.isone == true && isbtd == 1) {
					uses = {
						depart: that.dats.data.userlist.name.depart, //第一段，出发城市
						arrive: that.dats.data.userlist.name.arrive, //第一段，到达城市
						flightNo: that.dats.data.userlist.name.no, //航班号
						departDate: that.dats.data.userlist.name.departDate.substring(0, 10) + " " + that.dats.data.userlist.name.departTime +
							':00', //第一段，出发日期
						staffIds: usert //出行人信息
					}
				} else if (that.isone == false && isbtd == 1) {
					uses = {
						depart: that.dats.data.userlist.name.depart, //第一段，出发城市
						arrive: that.dats.data.userlist.name.arrive, //第一段，到达城市
						flightNo: that.dats.data.userlist.name.no, //航班号
						departDate: that.dats.data.userlist.name.departDate.substring(0, 10) + " " + that.dats.data.userlist.name.departTime +
							':00', //第一段，出发日期
						staffIds: usert //出行人信息
					}
					usest = {
						depart: that.nums.data.userlist.name.depart, //第二段，出发城市
						arrive: that.nums.data.userlist.name.arrive, //第二段，到达城市
						flightNo: that.nums.data.userlist.name.no, //航班号
						departDate: that.nums.data.userlist.name.departDate.substring(0, 10) + " " + that.dats.data.userlist.name.departTime +
							':00', //第二段，出发日期
						staffIds: usert //出行人信息
					}
				}
				if (isbtd == 1) {
					
					try {
						const ret = await certifi.ruleCheckRepeatBook(uses); //重复预定规则校验
						that.rulesReasons = ret.data.rulesReason;
						if (ret.code == 200) {
							let datas = ret.data.limitNativeRule;
							// let datas = {repeatBookingLimit: {7: "longzong,noayi,zyi",8:"oawdjk,awdaw,wad"}}
							if (JSON.stringify(datas) != "{}") {
								that.limitNativeRule = datas;
								that.repeatBookingLimit = datas.repeatBookingLimit; //重复预定规则政策
								if (JSON.stringify(that.repeatBookingLimit) == "{}") { //没有违反政策直接跳到预定页面
									if (that.MentionChange == 1) {
										that.submit(); //跳转提交
									} else {
										that.updata(); //跳转改签
									}
								} else {
									that.respeatBook = [];
									that.bools = true;
									that.notbooking = false;
									for (let i in that.repeatBookingLimit) {
										if (i == 7) { //不管控
											that.notbooking = false;
										}
										if (i == 8) { //提示重复但不限定
											that.idstarle = true
											that.bools = true;
											that.respeatBook.push({
												name: i,
												list: that.repeatBookingLimit[i]
											})
										}
										if (i == 9) { //提示且不可预订
											that.bools = false;
											that.respeatBook.push({
												name: i,
												list: that.repeatBookingLimit[i]
											})
										}
									}
									if (that.respeatBook.length > 0) {
										
										that.staleve = true;
									} else {
										if (that.MentionChange == 1) {
											that.submit(); //跳转提交
										} else {
											that.updata(); //跳转改签
										}
									}
								}
							} else {
								if (this.MentionChange == 1) {
									this.submit(); //跳转提交
								} else {
									this.updata(); //跳转改签
								}
							}

							if (JSON.stringify(ret.data.limitNativeRule) != "{}") {
								
								// that.showToasts("不能重复预订！");
								return
							}
						} else {
							
							that.showToasts(res.message)
						}
						if (that.isone == false) {
							try {
								const ret = await certifi.ruleCheckRepeatBook(usest); //重复预定规则校验
								if (ret.code == 200) {
									if (JSON.stringify(ret.data.limitNativeRule) != "{}") {
										
										that.showToasts("不能重复预订！");
										return
									}
								} else {
									
									that.showToasts(res.message)
								}
							} catch (e) {
								console.log(e)
								
							}
						}
					} catch (e) {
						console.log(e)
						
					}
				} else {
					
					if (that.MentionChange == 1) {
						that.submit(); //跳转提交
					} else {
						that.updata(); //跳转改签
					}
				}
			},
			cits_btn() { //继续预定
				if (this.idstarle && this.rulesReasons[this.chines.index].chineseDesc == '') {
					this.showToasts('请选择高价超规原因')
				} else {
					let datlist = {}
					if (this.idstarle) {
						for (let k in this.repeatBookingLimit) { //高价政策
							if (k == 8) {
								this.repeatBookingLimit[k] = {
									usernames: this.repeatBookingLimit[k],
									reasons: this.rulesReasons[this.chines.index].chineseDesc
								}
							}
						}
					}
					Object.assign(this.dats.limitNativeRule, {
						repeatBookingLimit: this.repeatBookingLimit
					})
					
					if (this.MentionChange == 1) {
						this.submit(); //跳转提交
					} else {
						this.updata(); //跳转改签
					}
				}
			},
			oksoption() { //部门和成本中心审批人确定
				let that = this;
				let st = that.isswf; //是成本中心还是部门 true为成本中心
				let itn = true;
				let uls = [];
				if (st) {
					uls = that.CostCenterlist; //成本中心
				} else {
					uls = that.Deparapprover; //部门
				}
				if (itn) {
					let sus = [];
					let suname = [];
					if (st) { //成本中心
						for (let i = 0; i < uls.length; i++) {
							for (var k = 0; k < uls[i].apprvCostFlowNodePersons.length; k++) {
								if (k == that.CostCenter[i].index) {
									sus.push({
										deptCost: 2,
										nodeId: uls[i].apprvCostFlowNodePersons[k].nodeId,
										personId: uls[i].apprvCostFlowNodePersons[k].id,
										staffId: uls[i].apprvCostFlowNodePersons[k].staffId,
										staffName: uls[i].apprvCostFlowNodePersons[k].staffName
									})
								}
							}
						}
						this.TravelCostCenlist = sus
					} else { //部门
						for (let i = 0; i < uls.length; i++) {
							for (var k = 0; k < uls[i].apprvDeptFlowNodePersons.length; k++) {
								if (k == that.Deparapp[i].index) {
									sus.push({
										deptCost: 2,
										nodeId: uls[i].apprvDeptFlowNodePersons[k].nodeId,
										personId: uls[i].apprvDeptFlowNodePersons[k].id,
										staffId: uls[i].apprvDeptFlowNodePersons[k].staffId,
										staffName: uls[i].apprvDeptFlowNodePersons[k].staffName
									})
								}
							}
						}
						this.TravelDepartlist = sus
					}
					that.switfal = false;
					that.blac_show = false;
				}
			},
			async appswlist(itname) { //选择审批人
				let that = this;
				let nuarry = [];
				// if(that.messagelist.ranst.isblcks == 4){
				// 	nuarry = that.messagelist.ranst.userlistnos;
				// } else {
				let nus = that.butalist; //出差人的集合
				for (var i = 0; i < nus.length; i++) {
					nuarry.push(nus[i].passengerNo) //获取出行人员id
				}
				// }
				
				let res;
				try {
					if (that.isblcks == 4) {
						res = await tork.getStaffList({
							costId: that.NameCenter.id,
							passengerNos: nuarry,
							applyType: 4
						});
					} else if (this.isblckt == true) {
						res = await tork.getStaffList({
							costId: that.NameCenter.id,
							passengerNos: nuarry,
							applyType: this.sttos
						});
					} else {
						res = await tork.getStaffList({
							costId: that.NameCenter.id,
							passengerNos: nuarry,
							applyType: 1
						});
					}
					
					if (res.code == 200) {
						console.log(res)
						if (res.data.deptStaffs.length == 0) {
							that.CostCis = false;
						} else {
							that.CostCis = true;
							that.Deparapprover = res.data.deptStaffs; //成本审批人
							for (let i = 0; i < that.Deparapprover.length; i++) {
								that.Deparapp.push({
									index: 0
								})
							}
						}
						if (res.data.costStaffs.length == 0) {
							that.CostCi = false;
						} else {
							that.CostCi = true;
							that.CostCenterlist = res.data.costStaffs; //部门审批人
							for (let i = 0; i < that.CostCenterlist.length; i++) {
								that.CostCenter.push({
									index: 0
								})
							}
						}
						that.TravelCostCenlist = []
						that.TravelDepartlist = []
					}
				} catch (e) {
					console.log(e)
					
				}
			},
			appswlists(itname) { //点击审批人
				if (this.NameCenter.id == '') {
					this.showToasts("请先选择成本中心")
					return
				}
				if (itname == 'CostCenterlist') {
					this.isswf = true
				} else {
					this.isswf = false
				}
				this.switfal = true;
				this.blac_show = true;
			},
			approval() {
				this.ops_list = true
				this.blac_show = true;
				this.sli_old(); //点击成本中心
			},
			clslitk(item) { //点击成本中心部门
				this.botname = item.name;
				let id = item.id
				let ls = this.treeLists;
				let ik = 0;
				for (var i = 0; i < ls.length; i++) { //判断是否有子集
					if (ls[i].parentId.length > 0 && ls[i].parentId.includes(id)) {
						ik++;
					}
				}
				if (ik > 0) { //有子集
					this.sli_namelist = []
					for (var i = 0; i < ls.length; i++) { //取出当前子集
						if (id == ls[i].id) {
							this.slit_id_checd = ls[i].id
							if (ls[i].parentId.length == 0) {
								this.slitlist = [];
							}
							if (this.slitlist.length > 0) {
								let ids = this.slitlist.length - 1;
								if (JSON.stringify(this.slitlist[ids].parentId) == JSON.stringify(ls[i].parentId)) {
									this.slitlist.splice(ids, 1);
								}
							}
							this.slitlist.push(ls[i])
						}
						if (ls[i].parentId.length > 0 && ls[i].parentId.includes(id)) { //判断当前点击的是否有子集
							if (ls[i].parentId.indexOf(id) == ls[i].parentId.length - 1) {
								this.sli_namelist.push(ls[i])
							}
						}
					}
				} else {
					for (var i = 0; i < ls.length; i++) { //没有子集
						if (ls[i].id == id) {
							this.slit_id_checd = ls[i].id
							if (ls[i].parentId.length == 0) {
								this.slitlist = [{
									name: ls[i].name,
									id: ls[i].id,
									parentId: []
								}]
							} else {
								let ids = this.slitlist.length - 1;
								if (JSON.stringify(this.slitlist[ids].parentId) == JSON.stringify(ls[i].parentId)) {
									this.slitlist.splice(ids, 1);
								}
								this.slitlist.push(ls[i])
							}
						}
					}
				}
			},
			reblocks(item) { //返回上级
				let ls = this.treeLists; //部门列表
				let id = item.id;
				this.slit_id_checd = id; //当前点击的部门id
				this.sli_namelist = []; //重新渲染部门信息
				let ins = this.slitlist.indexOf(item); //获取当前级别的下标
				for (var i = 0; i < this.slitlist.length; i++) { //删除右边级别
					if (i > ins) {
						this.slitlist.splice(i, 1);
					}
				}
				for (var i = 0; i < ls.length; i++) { //判断是否有子集
					if (JSON.stringify(item.parentId) == JSON.stringify(ls[i].parentId)) {
						this.sli_namelist.push(ls[i])
					}
				}
				this.botname = item.name;
			},
			okisd() { //选择当前成本中心
				// if (this.isblckt == true) {//需要审批
				// 	this.TravelCostCenlist = [];
				// 	this.TravelDepartlist = [];
				// 	this.appswlist();
				// 	return
				// }
				this.ops_list = false
				this.blac_show = false;
				if (this.cbid == this.slit_id_checd) {
					return
				}
				
				this.cbname = this.botname;
				this.cbid = this.slit_id_checd;
				this.NameCenter.name = this.cbname;
				this.NameCenter.id = this.cbid;
				this.TravelCostCenlist = [];
				this.TravelDepartlist = [];
				this.appswlist();
			},
			sli_old() { //点击成本中心默认值
				let ls = this.treeLists;
				this.sli_namelist = [];
				for (let i = 0; i < ls.length; i++) {
					if (ls[i].parentId.length == 0) {
						this.sli_namelist.push(ls[i])
					}
				}
				// this.slit_id_checd = 0;
				this.slitlist = [];
			},
			vals(num, st) { //回显证件号
				for (let i = 0; i < st.length; i++) {
					if (num == i) {
						return st[i].cardNo
					}
				}
			},
			// 重新生成数组
			renderTreeLists(list = [], rank = 0, parentId = []) { //成本中心
				list.forEach(item => {
					this.treeLists.push({
						id: item.id,
						name: item.text,
						userCount: item.a_attr.userCount,
						ischecds: 0,
						parentId, // 父级id数组
						rank, // 层级
						showChild: false, //子级是否显示
						show: rank === 0 // 自身是否显示
					});
					if (Array.isArray(item.children) && item.children.length > 0) {
						let parents = [...parentId];
						parents.push(item.id);
						this.renderTreeLists(item.children, rank + 1, parents);
					} else {
						this.treeLists[this.treeLists.length - 1].lastRank = true;
					}
				});
			},
			caname(item) { //回显证件名字
				for (let i = 0; i < this.carld.length; i++) {
					if (this.carld[i].code == item) {
						return this.carld[i].name
					}
				}
			},
			rblcok() {
				uni.navigateTo({
					url: '../particularst?data=' + JSON.stringify(this.packlist.data)
				});
			},
			chineseChange(e) { //航意险
				this.Default = e.detail.value;
				if (this.Default == 0) {
					this.facePrices = 0;
					this.profitPrices = 0;
				} else {
					for (let k in this.kingList) {
						if (k == this.Default) {
							this.insuranceNo = this.kingList[k].insuranceNo;
							this.isGift = this.kingList[k].isGift;
							if (this.isGift == 1) { //1是赠送
								this.facePrices = 0;
								this.profitPrices = 0;
							} else {
								this.facePrices = this.kingList[k].facePrice;
								this.profitPrices = this.kingList[k].profitPrice;
							}
						}
						if (this.kingList[k].facePrice == null) {
							this.facePrices = 0;
						} else if (this.kingList[k].profitPrice == null) {
							this.profitPrices = 0;
						}
					}
				}
				this.commit();
			},
			chineseChanges(e) { //低价政策
				this.chiness.index = e.detail.value;
			},
			chineseChangea(e) { //航延险
				this.Defaults = e.detail.value;
				if (this.Defaults == 0) {
					this.facePrice = 0;
					this.profitPrice = 0;
				} else {
					for (let k in this.kinsList) {
						if (k == this.Defaults) {
							this.insuranceNo = this.kinsList[k].insuranceNo;
							this.isGifts = this.kinsList[k].isGift;
							if (this.isGifts == 1) {
								this.facePrice = 0;
								this.profitPrice = 0;
							} else {
								this.facePrice = this.kinsList[k].facePrice;
								this.profitPrice = this.kinsList[k].profitPrice;
							}
						}
						if (this.kinsList[k].facePrice == null) {
							this.facePrice = 0;
						} else if (this.kinsList[k].profitPrice == null) {
							this.profitPrice = 0;
						}
					}
				}
				this.commit();
			},
			commit() {
				let fas = this.profitPrices + this.profitPrice; //保险价格
				this.fasp = fas;
				var tempIsGift = false;
				if (this.Default == 0 && fas == 0) {
					tempIsGift = true;
				} else {
					if (this.isGift == 1) {
						tempIsGift = true;
					} else {
						tempIsGift = false;
					}
				}
				var tempIsGifts = false;
				if (this.Defaults == 0 && fas == 0) {
					tempIsGifts = true;
				} else {
					if (this.isGifts == 1) {
						tempIsGifts = true;
					} else {
						tempIsGifts = false;
					}
				}
				if (tempIsGift && tempIsGifts) {
					this.allIsGift = true;
					if (this.isbtd == 1) {
						let OnlinePublicCabinServiceFee = this.getTravelPolicys.dpsOnlinePublicCabinServiceFee; //因私服务费
						if ('F' == this.dats.datw.level) {
							this.tips = OnlinePublicCabinServiceFee.f;
						} else if ('C' == this.dats.datw.level) {
							this.tips = OnlinePublicCabinServiceFee.c;
						} else {
							this.tips = OnlinePublicCabinServiceFee.y;
						}
					} else {
						let OnlinePrivateCabinServiceFee = this.getTravelPolicys.dpsOnlinePrivateCabinServiceFee; //因公服务费
						if ('F' == this.dats.datw.level) {
							this.tips = OnlinePrivateCabinServiceFee.f;
						} else if ('C' == this.dats.datw.level) {
							this.tips = OnlinePrivateCabinServiceFee.c;
						} else {
							this.tips = OnlinePrivateCabinServiceFee.y;
						}
					}
				} else {
					if (this.isbtd == 1) {
						let OnlinePublicCabinServiceFee = this.getTravelPolicys.dpsOnlinePublicCabinServiceFee; //因私服务费
						if ('F' == this.dats.datw.level) {
							this.tips = OnlinePublicCabinServiceFee.f;
						} else if ('C' == this.dats.datw.level) {
							this.tips = OnlinePublicCabinServiceFee.c;
						} else {
							this.tips = OnlinePublicCabinServiceFee.y;
						}
					} else {
						let OnlinePrivateCabinServiceFee = this.getTravelPolicys.dpsOnlinePrivateCabinServiceFee; //因公服务费
						if ('F' == this.dats.datw.level) {
							this.tips = OnlinePrivateCabinServiceFee.f;
						} else if ('C' == this.dats.datw.level) {
							this.tips = OnlinePrivateCabinServiceFee.c;
						} else {
							this.tips = OnlinePrivateCabinServiceFee.y;
						}
					}
				}


				let nus = 0;
				let nut = 0;
				if (this.isbtd == 1) {
					this.leng = this.dats.data.datw.butalist.length;
				} else {
					this.leng = this.butaluserlist.length;
				}
				if (this.dats.data.none == "single") { //单程
					this.toReturn = 1;
					this.totalAmount(1)
				} else {
					this.toReturn = 2;
					this.totalAmount(2);
				}
			},
			//明细
			totalAmount(bo) { //总金额
				let fas = this.fasp;
				let prices = this.prices;
				let priceas = this.priceas;
				let _this = this;
				let nus = 0;
				let nut = 0;
				if (bo === 1) {
					if (prices != 0 && prices != null && prices != '') {
						nus = prices + this.userlist.name.fuelFee + this.userlist.name.taxFee; //去
					} else {
						nus = this.dats.datw.price + this.userlist.name.fuelFee + this.userlist.name.taxFee; //去
					}
					this.num = parseFloat(nus) + parseFloat(fas) + this.tips;
					this.num = this.num * this.leng;
				} else {
					if (prices != 0 && prices != null && prices != '') {
						nus = prices + _this.userlist.name.fuelFee + _this.userlist.name.taxFee; //去
					} else {
						nus = _this.dats.datw.price + _this.userlist.name.fuelFee + _this.userlist.name.taxFee; //去
					}
					if (priceas != null && priceas !== 0) {
						nut = nut = priceas + _this.nums.data.userlist.name.fuelFee + _this.nums.data.userlist.name.taxFee;
					} else {
						nut = _this.nums.datw.price + _this.nums.data.userlist.name.fuelFee + _this.nums.data.userlist.name.taxFee;
					}
					_this.num = parseFloat(nus) + parseFloat(nut) + parseFloat(fas * 2) + parseFloat(_this.tips * 2);
					_this.num = this.num * this.leng;
				}

			},
			detail() {

			},
			boolase() {
				if (this.bool == true) {
					this.bool = false;
					this.mao = false;
					this.yi = true;
				} else {
					this.bool = true;
					this.mao = true;
					this.yi = false;
				}
			},
			ctlist(item) { //点击查看说明
				this.stlistad = this.backrule
				this.sittext = '退票通知'
				this.switfals = true;
			},
			companym_click() {
				this.fxli = false;
				setTimeout(() => {
					this.companyi_click = false;
				}, 300)
				// this.dimiss = false;
			},
			company_click() {
				this.fxli = true;
				this.companyi_click = true;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container999 {
		font-size: 32upx;
		width: 100%;

		.Navigation {
			width: 100%;
			height: 90upx;
			display: flex;
			align-items: center;
			background: linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);

			.ongbutn {
				width: 86%;
				color: #FFFFFF;
				text-align: center;
			}
		}

		.mian {
			padding-bottom: 120upx;

			.share-box {
				width: 100%;
				height: 100%;
				position: fixed;
				top: 0upx;
				left: 0upx;
				bottom: 0upx;
				right:0upx;
				background-color: rgba(0, 0, 0, 0.4);
				transition: .3s;
				z-index: 777;
			}
			
			// 进入分享动画
			.share-show {
				transition: all 0.3s ease;
				transform: translateY(0%) !important;
			}
			
			// 离开分享动画
			.share-item {
				position: fixed;
				left: 0;
				bottom: 0;
				width: calc(100% - 80upx);
				padding: 20upx 40upx;
				height: auto;
				background-color: #FFFFFF;
				transition: all 0.3s ease;
				transform: translateY(100%);
				z-index: 888;
				border-top-left-radius: 20upx;
				border-top-right-radius: 20upx;
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

			.black_mu {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: black;
				opacity: 0.5;
				z-index: 860;
			}

			.min_mian {
				padding: 20upx;
				border-radius: 10upx;

				.message {
					width: 100%;
					// height: 100upx;
					background: #FFFFFF;
					margin-right: 20upx;
					border-radius: 10upx;

					.message_top {
						line-height: 80upx;
						display: flex;

						.dates {
							text-indent: 20upx;
						}

						.week {
							text-indent: 30upx;
						}

						.silt {
							text-indent: 30upx;
						}

						.imgs {}
					}

					.top {
						width: 100%;
						background: #ffffff;

						.above {
							padding: 20upx 0;
							display: flex;

							.above_left,.above_right {
								text-align: right;
								width: calc(50% - 100upx);
								.city,.arrival_time {
									overflow:hidden;
									text-overflow:ellipsis;
									white-space:nowrap;
									color: #abbdd3;
								}

								.go_off {
									font-size: 50upx;
								}
							}

							.above_right {
								text-align: left;
							}

							.above_centre {
								width: 200upx;
								text-align: center;
								margin: 10upx;
								margin-top: 20upx;
							}
						}

						.below {
							justify-content: center;
							text-align: center;
							color: #abc2d8;
							padding-bottom: 20upx;
							display: flex;

							.Separate {
								margin: 0 5px 0 5px;
							}
						}
					}

					.message_bottom {
						margin: 0 2%;
						height: 100upx;
						display: flex;
						justify-content: space-between;

						.jiage {
							margin: auto 0;
						}

						.changing {
							margin: auto 0;
							color: #8195c7;
						}
					}
				}
			}

			.insurance {
				width: 100%;
				margin: 20upx 0;
				// height: 100upx;
				background: #FFFFFF;

				.Shipping_insurance {
					display: flex;
					align-items: center;
					padding-left: 20upx;

					.navigas {
						width: 260upx;
						line-height: 50upx;
						margin-top: 5px;
						margin-bottom: 5px;
						margin-left: 10px;
						border: #C8C7CC solid 1upx;
						border-radius: 10upx;
						text-indent: 15upx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.navimd {
						color: #C0C0C0;
					}
				}

				.insurance_first {
					display: flex;
					border-bottom: 1upx solid #f8f8f8;
					padding: 20upx 20upx;

					.insurance-left {
						width: 98%;

						.insurance-top {
							display: flex;
						}
					}

					.insurance-right {

						checkbox {}
					}
				}
			}

			.hint {
				width: 100%;
				height: 80upx;
				font-size: 25upx;
				padding: 20upx 0;
				color: #ed8471;
				background: #fff2d7;
			}

			.payment {
				width: 100%;
				line-height: 80upx;
				background: #FFFFFF;
				display: flex;
				justify-content: space-between;
				margin-bottom: 120upx;
			}

			.istaf {
				width: 100%;
				margin-top: 20upx;
				font-size: 30upx;

				.ravelv {
					width: calc(100% - 40upx);
					padding: 0 20upx;
					min-height: 90upx;
					background: #FFFFFF;
					margin-bottom: 20upx;

					.ts {
						line-height: 90upx;
						display: flex;

						.rav_left {
							width: 25%;
							text-align: center;
							color: #c0c0c0;
						}

						.ravright {
							width: 75%;
							display: flex;

							.bos {
								width: 93%;
								height: 90upx;
								overflow: scroll;
								display: flex;
								align-items: center;
							}

							.bost {
								width: 110upx;
								height: 80upx;
								font-size: 25upx;
								overflow: hidden;
								background: red;
							}
						}
					}
				}

				.ravelvs {
					width: calc(100% - 40upx);
					padding: 0 20upx;
					height: 140upx;
					background: #FFFFFF;
					margin-bottom: 20upx;

					.ts {
						line-height: 140upx;
						display: flex;

						.rav_left {
							width: 25%;
							text-align: center;
							color: #c0c0c0;
						}

						.ravright {
							width: 70%;
							height: 140upx;
							display: flex;
							align-items: center;

							.bost {
								text-align: center;
								width: 160upx;
								height: 120upx;
								overflow: hidden;
							}
						}
					}
				}
			}

			.bottoms {
				width: 100%;
				height: 110upx;
				display: flex;

				position: fixed;
				bottom: 0upx;
				left: 0;
				z-index: 100;
				.btnsp {
					// position: absolute;
					// left: 0;
					// top: 0;
					width: 100%;
					height: 110upx;
					display: flex;

					.bottoms_lift {
						width: calc(75% - 30upx);
						padding-left: 30upx;
						background: #FFFFFF;
						display: flex;
						line-height: 110upx;
						justify-content: space-between;
					}

					.bottoms_right {
						width: 25%;
						color: #FFFFFF;
						font-size: 30upx;
						text-align: center;
						line-height: 100upx;
						background: #ffa328;
					}

					.bottoms_rights {
						width: 25%;
						color: #FFFFFF;
						font-size: 30upx;
						text-align: center;
						line-height: 100upx;
						background: #C0C0C0;
					}
				}
			}

			.staleve {
				position: fixed;
				left: 0;
				top: 0;
				width: calc(100% - 100upx);
				height: 100%;
				padding: 0 50upx;
				background: rgba(0, 0, 0, .3);
				z-index: 500;
				display: flex;
				align-items: center;
				justify-content: center;

				.stalist {
					width: 100%;
					// height: 50%;
					// overflow: auto;
					border-radius: 20upx;
					font-size: 35upx;
					line-height: 90upx;
					background: #F1F1F1;

					.quan {
						max-height: 600upx;
						overflow: scroll;

						.statop {
							padding: 20upx;

							.reds {
								width: 100%;
								height: 70upx;
								text-align: center;
								display: flex;
								align-items: center;
								justify-content: center;
								color: red;

								.ts_text {
									padding: 0 20upx;
									line-height: 50upx;
									border-radius: 50upx;
									border: 2upx solid red;
								}
							}

							.setlist {
								line-height: 50upx;
								font-size: 30upx;
								margin: 10upx 0;

								.setbod {
									border: 2upx solid #FFFFFF;
									border-radius: 15upx;

									.styul {
										width: 100%;
										margin: 10upx 0;

										.styli_top {
											width: 100%;
											color: red;
											text-align: center;
											font-size: 30upx;
											line-height: 45upx;
										}

										.stulis {
											display: flex;

											.styli_left {
												width: 25%;
												display: flex;
												align-items: center;
												justify-content: flex-end;
											}

											.styli_right {
												width: 75%;
												margin-left: 5%;

												.wors {
													width: 80%;
													font-size: 30upx;
													height: 50upx;

													picker {
														border: $uni-color-primary solid 1upx;
													}
												}
											}
										}
									}
								}
							}
						}
					}

					.btnsti {
						width: 100%;
						height: 90upx;
						line-height: 90upx;
						text-align: center;
						display: flex;
						// position: fixed;
						// bottom: 300upx;
						// left: 0;

						.roblck {
							flex: 1;
							height: 90upx;
							background: #FFFFFF;
							border-bottom-left-radius: 15upx;
						}

						.btnok {
							flex: 1;
							height: 90upx;
							border-bottom-right-radius: 15upx;
							color: #FFFFFF;
							background: linear-gradient(to right, #4E92FD 0%, #6E46FE 100%);
						}
					}
				}
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

			.pop_up {
				position: fixed;
				bottom: -100%;
				left: 0;
				width: 100%;
				// height: 100%;
				overflow: scroll;
				background: #edf0f5;
				z-index: 1000;
				text-align: center;
				align-items: center;
				background: #eceff3;

				.pop_op {
					width: 100%;
					padding: 20upx 0;
					background: #FFFFFF;
				}

				.pop_ip {
					padding: 20upx 0;
					color: #b0b1b2;
				}
			}

			.sname {
				width: 100%;
				margin: 20upx 0;
				padding: 20upx 0;
				// height: 100upx;
				background: #FFFFFF;
				display: flex;

				input {
					width: 100%;
					font-size: 26upx;
					height: 70upx;
				}

				.pons {
					// width: 100%;
					// height: 130upx;
					font-size: 26upx;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.navigas {
					padding: 0 15upx;
					line-height: 50upx;
					margin-bottom: 5px;
					border: #C8C7CC solid 1upx;
				}
			}

			.userlist {
				width: calc(100% - 40upx);
				color: #333333;
				font-size: 30upx;
				margin: 0 20upx;

				.cu_time {
					width: calc(100% - 40upx);
					margin-top: 10upx;
					padding: 10upx 20upx 15upx 20upx;
					background-color: #FFFFFF;
					border-bottom: 2upx solid #f1f1f1;
					border-radius: 10upx;
				}

				.userls {
					width: calc(100% - 40upx);
					margin-top: 10upx;
					padding: 10upx 20upx 15upx 20upx;
					background-color: #FFFFFF;
					border-bottom: 2upx solid #f1f1f1;
					border-radius: 10upx;

					.userlss {
						width: calc(100% - 40upx);
						padding: 10upx 20upx;
						display: flex;
						border-bottom: 2upx solid #f1f1f1;
					}

					.user_ls {
						width: 25%;
						font-size: 28upx;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						border-right: 2upx solid #f1f1f1;
					}

					.user_rs {
						width: calc(55% - 30upx);
						padding-left: 30upx;
						line-height: 50upx;
						font-size: 28upx;

						// background: red;
						.wors {
							font-size: 28upx;
							width: 60%;
							height: 50upx;
							line-height: 50upx;
							padding-left: 20upx;
							border: 2upx solid #C8C7CC;
							border-radius: 10upx;
						}
					}

					.kaihu {
						width: 100%;
						display: flex;
						font-size: 28upx;
						// flex-direction: column;
						// justify-content: center;
						margin-top: 20upx;
						text-indent: 35upx;
						align-items: center;
						position: relative;

						input {
							margin-left: 30upx;
							text-indent: 30upx;
							font-size: 28upx;
							border: 1upx solid #C0C0C0;
							border-radius: 10upx;
						}

						.absts {
							margin-left: 30upx;
							position: absolute;
							width: 350upx;
							// height: 300upx;
							background-color: #FFFFFF;
							z-index: 200;
						}
					}
				}

				.userls:last-child {
					border: 0;
				}
			}

			.shows {
				-webkit-transform: translateY(0);
				transform: translateY(0);
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
				z-index: 870;
				line-height: 90upx;
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

			.isswflist {
				position: fixed;
				bottom: 0;
				left: 0;
				transition: all 0.3s ease;
				-webkit-transform: translateY(100%);
				transform: translateY(100%);
				min-height: 150upx;
				width: 100%;
				z-index: 889;
				background: #ffffff;

				.btns {
					width: 100%;
					height: 90upx;
					display: flex;
					text-align: center;
					line-height: 90upx;
					font-size: 35upx;
					background: #E5E5E5;

					.btns_z {
						flex: 1;
						height: 90upx;
						color: $uni-color-primary;
					}
				}

				.isstops {
					padding: 40upx 10%;
					width: calc(100% - 20%);

					.isstop {
						height: 90upx;
						line-height: 90upx;
						width: 100%;
						display: flex;
						align-items: center;

						.wors {
							font-size: 35upx;
							width: 60%;
							height: 50upx;
							line-height: 50upx;
							padding-left: 20upx;
							border: 2upx solid #C8C7CC;
						}
					}
				}
			}

			.optslist {
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

				.btns {
					width: 100%;
					height: 90upx;
					display: flex;
					text-align: center;
					line-height: 90upx;
					font-size: 35upx;
					background: #E5E5E5;

					.btns_z {
						flex: 1;
						height: 90upx;
						color: $uni-color-primary;
					}
				}

				.stlist {
					width: 100%;
					height: 400upx;
					background: #E5E5E5;
					display: flex;

					.sltleft {
						height: 400upx;
						width: 30%;

						.ulsk_list {
							width: 100%;
							height: 90upx;
							text-align: center;
							font-size: 35upx;
							line-height: 90upx;
						}

						.cked {
							background: #FFFFFF;
						}
					}

					.sltright {
						width: 70%;
						height: 400upx;
						background: #FFFFFF;

						.sltrig_top {
							width: 100%;
							height: 90upx;
							overflow: scroll;
							line-height: 90upx;
							font-size: 25upx;
							display: flex;
							border-bottom: 2upx solid #F1F1F1;

							.sltiig_top_left {
								width: 140upx;
								text-indent: 20upx;
								color: #F1F1F1;
							}

							.sltiig_top_right {
								padding: 0 5px;
								min-width: 100upx;
								text-indent: 10upx;
								color: #333333;
							}

							.stis {
								color: $uni-color-primary !important;
							}
						}

						.sltrig_bot {
							width: calc(100% -20upx);
							height: 310upx;
							padding-left: 20upx;
							overflow: scroll;

							.striglist {
								width: 100%;
								height: 90upx;
								border-bottom: 2upx solid #F1F1F1;
								line-height: 90upx;
								display: flex;

								.stlis_left {
									width: 90%;
								}

								.stlis_right {
									width: 10%;
									text-align: center;
								}
							}
						}
					}
				}

				.botmis {
					width: 100%;
					height: 60upx;
					font-size: 30upx;
					color: $uni-color-primary;
					text-align: center;
					line-height: 60upx;
				}
			}

			.show {
				-webkit-transform: translateY(0);
				transform: translateY(0);
			}

			.istaf {
				width: 100%;
				margin-top: 20upx;
				font-size: 30upx;

				.ravelv {
					width: calc(100% - 40upx);
					padding: 0 20upx;
					height: 90upx;
					background: #FFFFFF;
					margin-bottom: 20upx;

					.ts {
						line-height: 90upx;
						display: flex;

						.rav_left {
							width: 25%;
							text-align: center;
							color: #c0c0c0;
						}

						.ravright {
							width: 75%;
							display: flex;

							.bos {
								width: 93%;
								height: 90upx;
								overflow: scroll;
								display: flex;
								align-items: center;

								.swname {
									line-height: 90upx;
									font-size: 30upx;
									color: #333333;
									padding: 0 10upx;
								}

								.userlists {
									height: 90upx;
									font-size: 30upx;
									margin: 0 10upx;
								}

								input {
									font-size: 30upx;
									width: 100%;
								}
							}

							.bost {
								width: 93%;

								.userlists {
									font-size: 30upx;
									margin: 0 10upx;
								}
							}
						}
					}
				}
			}

			.oksl {
				position: fixed;
				left: 0;
				bottom: 0;
				color: #FFFFFF;
				width: 100%;
				height: 90upx;
				display: flex;
				line-height: 90upx;
				background: #FFFFFF;
				z-index: 880;

				.oksl_l {
					width: 70%;
					height: 90upx;
					color: #FF9000;
					font-size: 45upx;
					text-indent: 20upx;
					display: flex;
					justify-content: space-between;

					.scslist {
						padding-right: 10upx;
						font-size: 28upx;
						color: #FF9000;
					}
				}

				.oksl_r {
					width: 30%;
					font-size: 35upx;
					height: 90upx;
					text-align: center;
					background: #FF9000;
				}
			}

			// .costlists{
			// 		position: fixed;
			// 		bottom: 0;
			// 		left: 0;
			// 		padding-bottom: 90upx;
			// 		transition: all 0.3s ease;
			// 		-webkit-transform: translateY(100%);
			// 		transform: translateY(100%);
			// 		width: 100%;
			// 		z-index: 870;
			// 		line-height: 90upx;
			// 		background: #ffffff;
			// 		font-size: 30upx;
			// 		.costl_t{
			// 			width: 100%;
			// 			height: 90upx;
			// 			text-align: center;
			// 		}
			// 		.costlist_s{
			// 			width: calc(100% - 20upx);
			// 			border-top: 2upx solid #C8C7CC;
			// 			border-bottom: 2upx solid #C8C7CC;
			// 			padding-left: 20upx;
			// 			.cost_li{
			// 				width: 100%;
			// 				height: 90upx;
			// 				display: flex;
			// 				.scse_l{
			// 					flex: 1;
			// 				}
			// 				.scse_r{
			// 					flex: 1;
			// 					padding-right: 20upx;
			// 					display: flex;
			// 					justify-content: flex-end;
			// 					.corssize{
			// 						color: #FF9000;
			// 					}
			// 				}
			// 			}
			// 			.costs{
			// 				border-bottom: 2upx solid #D0DEE5;
			// 			}
			// 		}
			// 	}
			// 	.show {
			// 		-webkit-transform: translateY(0);
			// 		transform: translateY(0);
			// 	}

			// .shows {
			// 	bottom: 0;
			// 	width: 100%;
			// 	transition: bottom 0.4s;
			// }
			.hides {
				bottom: -100%;
				width: 100%;
				transition: bottom 0.4s;
			}
		}
	}
</style>
