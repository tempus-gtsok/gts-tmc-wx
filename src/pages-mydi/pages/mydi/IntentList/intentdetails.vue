<template>
  <view class="trandetails">
    <loading>
    </loading>
    <view class="Navigations">
      <view class="smtis">
        <view @click="rblcok" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
      </view>
      <view class="ongbutns">
        {{tiltext}}
      </view>
      <view class="onright">
        <view class="onrights" @click="cleraes()" v-if="orderStatus == 1">
          取消意向单
        </view>
      </view>
    </view>
    <view class="navstop">
      <view class="">
        意向单单号：{{codes}}
      </view>
      <view class="lisst">
        <view class="citst">
          <view class="cits_t">
            <view class="">
              酒店名称：{{plsitsti.hotelName}}
            </view>
            <view class="" v-if="plsitsti.hotelPhone != null">
              酒店电话：{{plsitsti.hotelPhone}}
            </view>
            <view class="" v-if="plsitsti.bedTypeName != null">
              酒店床型：{{plsitsti.bedTypeName}}
            </view>
            <view class="">
              房间数量：{{plsitsti.bookCount}}间
            </view>
            <view class="cits_list">
              房间类型：
              <view v-if="plsitsti.proName != null">
                {{plsitsti.proName}}
              </view>
            </view>
            <view class="cits_list">
              酒店地址：
              <view v-if="plsitsti.hotelAddress != null">
                {{plsitsti.hotelAddress}}
              </view>
            </view>
          </view>
          <view class="cits_b">
            <view class="cits_bt">
              <view class="cits_bts" style=" color: #007aff;">订单状态：{{userstatus(orderStatus)}}</view>
            </view>
            <view class="cits_bt">
              <view class="cits_bts">入住日期：{{plsitsti.arrivalDate}}</view>
              <view class="cits_bts">离开日期：{{plsitsti.departureDate}}</view>
            </view>
            <view class="cits_bt">
              <view class="cits_bts">
                入住人：
                <view v-if="plsitsti.guestNames != null">
                  {{ plsitsti.guestNames }}
                </view>
              </view>
            </view>
            <view class="cits_bt">
              <view class="cits_bts">
                联系人：
                <view v-if="plsitsti.contactName != null">
                  {{plsitsti.contactName}}
                </view>
              </view>
            </view>
            <view class="cits_bt">
              <view class="cits_bts">
                联系电话：
                <view v-if="plsitsti.contactNumber != null">
                  {{plsitsti.contactNumber}}
                </view>
              </view>
            </view>
            <view class="cits_bt">
              <view class="cits_btsy">总价：￥
              <view v-if="plsitsti.salePrice != null">
                {{plsitsti.salePrice}}
              </view>
              </view>
            </view>
            <view class="cits_bt">
              <view style="color: red" v-if="orderStatus === '0'">备注：<view v-show="plsitsti.remark != null">{{plsitsti.remark}}</view></view>
              <view class="cits_bts" style="color: red;" v-else>审批备注：<view v-show="plsitsti.cancelReason != null">{{plsitsti.cancelReason}}</view></view>
            </view>
            <view v-show="travelType === '1' && travelNo == null && orderStatus === '1'">
              <view class="istaf">
                <view class="ravelv">
                  <view class="ts">
                    <view class="rav_left">出差事由:</view>
                    <view class="ravright">
                      <view class="bos">
                        <input type="text" v-model="reson" placeholder="请输入出差事由" value="" />
                      </view>
<!--                      <view class="iconfont">&#xe8a3;</view>-->
                    </view>
                  </view>
                </view>
              </view>
              <view class="optslist" :class="ops_list ? 'show' : ''" >
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
                    <view class="ulsk_list" @click="slcikd(item.id)" :class="slid == item.id? 'cked':''" v-for="(item,index) in ullist" :key="index">
                      {{item.name}}
                    </view>
                  </view>
                  <view class="sltright">
                    <view class="sltrig_top">
                      <view class="sltiig_top_left">当前选择:</view>
                      <view class="sltiig_top_right" @click="reblocks(item)" :class="slit_id_checd == item.id ? 'stis':''"  v-for="(item,index) in slitlist" :key="index">
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
              <view class="istaf" > <!--v-if="(datalist.datlist.isblcks == 2 && !datalist.isarsrl && datalist.datlist.isbtd != 2)||(datalist.datlist.isblcks == 4 && RuleMas && !datalist.isarsrl && datalist.datlist.isbtd != 2)||(datalist.datlist.isblcks == 1 && !datalist.isarsrl && datalist.datlist.isbtd == 1 && isblckt == true)  "-->
                <view class="ravelv">
                  <view class="ts">
                    <view class="rav_left">归属部门:</view>
                    <view class="ravright">
                      <view class="bos">
                        {{attdepartment}}
                      </view>
<!--                      <view class="iconfont">&#xe8a3;</view>-->
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
                      <view class="iconfont">&#xe8a3;</view>
                    </view>
                  </view>
                </view>
                <view class="black_mu" @click="isshow" v-if="blac_show"></view>
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
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="btnfixd">
      <paybtns businessType="1" productType="4" :recordNo="recordNos" :amount="amounts" @payok="payok" intent-details="1" v-if="this.travelType == 2 && this.payStatus == 1"></paybtns> <!-- v-if="(payStatus == 1 || payStatus == 2)&& tlement == 1"-->
      <view  class="btn" v-if="orderStatus == 1 && hotelOrder == null" @click="confirm">确认</view>
    </view>
  </view>
</template>

<script>
import order from '@/api/order.js'
	import tork from '@/api/torowk.js'
export default{
  data(){
    return{
      recordNos:0,
      requireNo: '',
      amounts:0,
      isclsks: false,//是否从列表点进详情
      ltes: 0,
      ist:0,
      numprice: '999',//总价
      apprvStatus: '',//审批状态：0-待审批，1-审批中 2-通过，3-驳回，4-撤回, 5-免审， 9-无效 10表示没有审批单
      payStatus: '',//支付状态 1 为待支付 2 支付中 3 为已支付，4 为挂帐支付
      orderStatus: '',//
      tiltext:'意向单详情',
      userlist:[],//乘客列表
      typename:'',
      switfal: false,
      codes: 0,
      
      
      plsitsti: {},
      apprvTaskReason:'出差事由',//出差事由
      attdepartment:'',//归属部门
      NameCenter:{name: '',id: ''},
      TravelCostCenlist: [],//成本中心
      CostCis: false,//是否有部门审批人
      CostCenterlist: [],//成本中心审批人
      CostCi: false,
      isswf: true,//true为成本中心 false为部门   审批人
      travelNo:'',
      travelType: '',
      hotelOrder: '',
      reson: '',//出行事由
      costs: false,
      CostCenter: [],
      userlists: [],//用户列表
      slid: 1,
      ullist:[{
        name:'成本中心',
        id: 1
      }],
      slitlist:[],
      sli_namelist: [],
      TravelDepartlist: [],
      cbname:'',//成本中心名称
      cbid: '',//成本中心id
      botname: '',//当前选择的成本中心名称
      slit_id_checd:0, //当前点击成本中心的id
      treeLists: [],//归属部门列表
      ops_list:false,//归属部门
      Deparapprover: [],//部门审批人
      blac_show: false,
      shos:false,
      datalist: {},
      isblckt: false,
      Deparapp: [],
      apprvTaskStaffs:[]
    }
  },
  onBackPress(event){//监听App返回
    if(this.isclsks == 'false'){
      uni.switchTab({
        url:'../order'
      })
      return true
    }
  },
  onLoad(item) {
    this.ist = item.ist;
    this.codes = item.code;
    this.isclsks = item.isck;
    this.datalist = JSON.parse(uni.getStorageSync("hotelreservation_data"));
    this.isblckt = this.datalist.isblckt;//事前是否需要二次审批
    this.userlists = this.datalist.datlist.butalist;
  },
  mounted() {
    this.slet();
	this.selts();
      const data = uni.getStorageSync('user_list'+ uni.getStorageSync('appWxId')); //获取归属部门
      if (data.deptName) {
        this.attdepartment = data.deptName;
      }
  },
  methods:{
    async confirm(){
      
      let dat = [];
      if (this.travelNo != null || this.travelType == 2){
        dat={
          requireNo: this.codes
        }
      }else if (this.travelNo == null && this.travelType == 1){
        if(this.reson == null || this.reson == ''){
          this.showToasts('请输入出差事由！');
          
          return;
        }
        if (this.botname == '' && this.slit_id_checd == '' || this.botname == null && this.slit_id_checd == null){
          this.showToasts('请选择成本中心！');
          
          return;
        }

        if (this.CostCi){
          if (this.TravelCostCenlist == null || this.TravelCostCenlist.length == 0){
            this.showToasts('请选择成本审批人！');
            
            return;
          }
        }
        if (this.CostCis){
          if(this.TravelDepartlist == null || this.TravelDepartlist.length == 0){
            this.showToasts('请选择部门审批人！');
            
            return;
          }
        }
        if (this.CostCi && this.CostCis){
          this.apprvTaskStaffs.push({ //添加成本审批人和部门审批人参数
            deptCost:this.TravelCostCenlist[0].deptCost,
            nodeId:this.TravelCostCenlist[0].nodeId,
            personId:this.TravelCostCenlist[0].personId,
            staffId:this.TravelCostCenlist[0].staffId,
            staffName:this.TravelCostCenlist[0].staffName,
          },{
            deptCost:this.TravelDepartlist[0].deptCost,
            nodeId:this.TravelDepartlist[0].nodeId,
            personId:this.TravelDepartlist[0].personId,
            staffId:this.TravelDepartlist[0].staffId,
            staffName:this.TravelDepartlist[0].staffName,
          })
        }else if (this.CostCi){
          this.apprvTaskStaffs.push({
            deptCost:this.TravelCostCenlist[0].deptCost,
            nodeId:this.TravelCostCenlist[0].nodeId,
            personId:this.TravelCostCenlist[0].personId,
            staffId:this.TravelCostCenlist[0].staffId,
            staffName:this.TravelCostCenlist[0].staffName,
          })
        }else if (this.CostCis){
          this.apprvTaskStaffs.push({
            deptCost:this.TravelDepartlist[0].deptCost,
            nodeId:this.TravelDepartlist[0].nodeId,
            personId:this.TravelDepartlist[0].personId,
            staffId:this.TravelDepartlist[0].staffId,
            staffName:this.TravelDepartlist[0].staffName,
          })
        }
        dat={
          requireNo: this.codes,
          apprvTaskEntity:{
            apprvTaskStaffs:this.apprvTaskStaffs,
            costId:this.slit_id_checd,
            costName:this.botname,
            beforeMiddle: 2,
            reason: this.reson,
            taskType: 2
          }
        }
      }
     let res = await  order.confirmOrder(dat);
      if (res.code == 200 ){
        
        uni.navigateTo({
          url:'intentdetails?code=' + this.codes
        })
      }
    },
    async appswlist(itname){//选择审批人
      let that = this;
      let nuarry = [];
      let nus = that.datalist.datlist.butalist;//出差人的集合
      for (var i = 0; i < nus.length; i++) {
        nuarry.push(nus[i].passengerNo)//获取出行人员id
      }
      
      let res;
      try{
        if(this.isblckt == true){
          res = await tork.getStaffList({costId: that.NameCenter.id,passengerNos:nuarry,applyType:3});
        } else {
          res = await tork.getStaffList({costId: that.NameCenter.id,passengerNos:nuarry,applyType:1});
        }
        
        if(res.code == 200){
          if(res.data.deptStaffs.length ==0){
            that.CostCis = false;
          } else {
            that.CostCis = true;
            that.Deparapprover = res.data.deptStaffs;//部门审批人
            for (let i = 0; i < that.Deparapprover.length; i++) {
              that.Deparapp.push({
                index:0
              })
            }
          }
          if(res.data.costStaffs.length ==0){
            that.CostCi = false;
          } else {
            that.CostCi = true;
            that.CostCenterlist = res.data.costStaffs;//成本审批人
            for (let i = 0; i < that.CostCenterlist.length; i++) {
              that.CostCenter.push({
                index:0
              })
            }
          }
          that.TravelCostCenlist = []
          that.TravelDepartlist = []
        }
      }catch(e){
        console.log(e)
        
      }
    },
    CostCenterChange(e,index){ //选择当前成本中心审批人
      this.CostCenter[index].index = e.detail.value;
    },
    DeparappChange(e,index){//选择当前部门审批人
      this.Deparapp[index].index = e.detail.value;
      console.log("deparapp"+e.detail.value)
    },
    isshow(){ //点击弹出层
      this.shos = false;
      this.ops_list = false
      this.blac_show = false;
      this.switfal = false;
      this.costs = false;
    },
    oksoption(){ //部门和成本中心审批人确定
      let that = this;
      let st = that.isswf;//是成本中心还是部门 true为成本中心
      let itn = true;
      let uls = [];
      if(st){
        uls = that.CostCenterlist;//成本中心
      } else {
        uls = that.Deparapprover;//成本中心
      }
      if(itn){
        let sus = [];
        let suname = [];
        if(st){ //成本中心
          for (let i = 0; i < uls.length; i++) {
            for (var k = 0; k < uls[i].apprvCostFlowNodePersons.length; k++) {
              if(k == that.CostCenter[i].index){
                sus.push({
                  deptCost: 2,
                  nodeId:uls[i].apprvCostFlowNodePersons[k].nodeId,
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
              if(k == that.Deparapp[i].index){
                sus.push({
                  deptCost: 1,
                  nodeId:uls[i].apprvDeptFlowNodePersons[k].nodeId,
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
    approval(){
      if(this.isblckt == true){
        return
      }
      this.ops_list = true
      this.blac_show = true;
      this.sli_old();//点击成本中心
    },
    sli_old(){//点击成本中心默认值
      let ls = this.treeLists;
      this.sli_namelist = [];
      for (let i = 0; i < ls.length; i++) {
        if(ls[i].parentId.length == 0){
          this.sli_namelist.push(ls[i])
        }
      }
      this.slitlist= [];
    },
    appswlists(itname){ //点击审批人
      if(this.NameCenter.id == '' ){
        this.showToasts("请先选择成本中心")
        return
      }
      if(itname == 'CostCenterlist'){
        this.isswf = true
      } else {
        this.isswf = false
      }
      this.switfal = true;
      this.blac_show = true;
    },
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
        } else{
          this.treeLists[this.treeLists.length-1].lastRank = true;
        }
      });
    },
    async selts() { //查询成本中心
      let _this = this;
      try{
        let res = await tork.getCostCenterList();
        
        if (res.code == 200) {
          _this.treeLists = [];
          _this.renderTreeLists(res.data);
        } else {
          _this.showToasts(res.message);
        }
      }catch(e){
        console.log(e)
        
      }
    },
    clslitk(item){//点击成本中心部门
      console.log("item"+JSON.stringify(item.name))
      this.botname = item.name;
      let id = item.id
      let ls = this.treeLists;
      let ik = 0;
      for (var i = 0; i < ls.length; i++) {//判断是否有子集
        if(ls[i].parentId.length > 0 && ls[i].parentId.includes(id)){
          ik++;
        }
      }
      if(ik > 0){ //有子集
        this.sli_namelist = []
        for (var i = 0; i < ls.length; i++) {//取出当前子集
          if(id == ls[i].id){
            this.slit_id_checd = ls[i].id
            if(ls[i].parentId.length ==0){
              this.slitlist = [];
            }
            if(this.slitlist.length > 0){
              let ids = this.slitlist.length-1;
              if(JSON.stringify(this.slitlist[ids].parentId) == JSON.stringify(ls[i].parentId)){
                this.slitlist.splice(ids,1);
              }
            }
            this.slitlist.push(ls[i])
          }
          if(ls[i].parentId.length > 0 && ls[i].parentId.includes(id)){ //判断当前点击的是否有子集
            if(ls[i].parentId.indexOf(id) == ls[i].parentId.length -1){
              this.sli_namelist.push(ls[i])
            }
          }
        }
      } else {
        for (var i = 0; i < ls.length; i++) {//没有子集
          if(ls[i].id == id ){
            this.slit_id_checd = ls[i].id
            if(ls[i].parentId.length == 0){
              this.slitlist= [{
                name: ls[i].name,
                id: ls[i].id,
                parentId:[]
              }]
            } else {
              let ids = this.slitlist.length-1;
              if(JSON.stringify(this.slitlist[ids].parentId) == JSON.stringify(ls[i].parentId)){
                this.slitlist.splice(ids,1);
              }
              this.slitlist.push(ls[i])
            }
          }
        }
      }
    },
    okisd(){//选择当前成本中心
      if(this.isblckt == true){
        this.TravelCostCenlist = [];
        this.TravelDepartlist = [];
        this.appswlist();
        return
      }
      this.ops_list = false
      this.blac_show = false;
      if(this.cbid == this.slit_id_checd){
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
    payok(){
      this.ltes = 1;
      this.slet('wx');
    },
    async slet(va){//查询意向单
      let that = this;
      if(that.ltes == 0){
        
      }
      try{
        const res = await order.intentDetails({requireNo: this.codes});
        
        if(res.code == 200){
          if(va == 'wx' && (res.data.hotelOrder.paymentStatus == 1 || res.data.hotelOrder.paymentStatus == 2)){
            
            that.tiltext = '订单支付中...';
            setTimeout(()=>{
              that.slet('wx')
            },1000)
          } else {
            that.ltes = 0;
            that.tiltext = '意向单详情';
            that.plsitsti = res.data.holRequire;
            that.travelNo = res.data.holRequire.travelNo;
            that.travelType = res.data.holRequire.travelType;
            that.apprvTaskReason = res.data.apprvTaskReason;
            that.numprice = res.data.holRequire.salePrice;//总价
            that.orderStatus = res.data.holRequire.orderStatus;
            that.hotelOrder = res.data.hotelOrder;
            that.amounts = res.data.holRequire.salePrice;
            if (res.data.saleOrder != null){
              that.payStatus = res.data.saleOrder.payStatus;//支付状态
              that.recordNos= res.data.saleOrder.transationOrderNo;
            }
          }
        } else {
          that.showToasts(res.message);
          
        }
      }catch(e){
        console.log(e)
        
      }
    },
    userstatus(ite){//订单状态
      let arr = [
        {
          id: 0,
          value: '待审批'
        },{
          id: 1,
          value: '通过'
        },{
          id: 2,
          value: '拒绝'
        },{
          id: 3,
          value: '已确认'
        },{
          id: 4,
          value: '已取消'
        }
      ]
      for(let i in arr){
        if(arr[i].id == ite){
          return arr[i].value
        }
      }
    },
    catype(it){//返回证件类型
      if(it == 1){
        return '身份证'//NI
      } else if(it == 2){
        return '护照'//PP
      } else if(it == 3){
        return '台胞证'//TB
      } else if(it == 4){
        return '港澳通行证'//GA
      }
    },
    cleraes(){
      let that = this;
      uni.showModal({
        title: '提示',
        content: '确定是否取消订单！',
        success: function (res) {
          if (res.confirm) {
            that.closedi();
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      })
    },
    async closedi(){//取消订单
      
      try{
        let res = await order.cancelHolRequire({
          requireNo: this.codes
        })
        
        if(res.code == 200){
          this.showToasts("取消成功!");
          setTimeout(()=>{
            // #ifdef  APP-PLUS
            uni.navigateBack({
            })
            // #endif
            // #ifdef  H5 || MP-WEIXIN
            uni.navigateTo({
              url:'Intentlist?code=' + this.codes
            })
            // #endif
          },500)
        } else {
          
          this.showToasts(res.message)
        }
      }catch(e){
        console.log(e);
        
      }
    },
    rblcok(){
      if(this.isclsks == 'false'){
        uni.switchTab({
          url:'/pages/mydi/mydi'
        })
      } else {
        wx.navigateTo({
          url:'Intentlist'
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.trandetails{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0; /*距离底部的距离为底部盒子的高度，自己也可以设置*/
  overflow-y: scroll;
  height: auto;
  background: #F5F5F5;

  .Navigations{
    /*  #ifdef  APP-PLUS || MP-WEIXIN */
    padding-top: 60upx;
    /*  #endif  */
    width: 100%;
    height: 90upx;
    display: flex;
    align-items: center;
    background: #109DED;
    justify-content: space-between;
    .ongbutns{
      color: #FFFFFF;
      text-align: center;
    }
    .onright{
      font-size: 30upx;
      padding-right: 10upx;
      color: #FFFFFF;
    }
  }
  .fixs_list{
    position: fixed;
    bottom: -100%;
    left: 0;
    width: 0;
    height: 100%;
    overflow: scroll;
    background: #edf0f5;
    z-index: 1000;
    .fix_los{
      display: flex;
      width: calc(100% - 40upx);
      padding: 0 20upx;
      height: 90upx;
      line-height: 90upx;
      background: #FFFFFF;
      margin-bottom: 2upx;
      .fitx_les{
        flex: 1;
        font-size: 30upx;
      }
      .stsb{
        display: flex;
        align-items: center;
        .scks{
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
    background: rgba(0,0,0,.5);
    z-index: 888;
    .show {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }
  .show {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  .btnfixd{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 110upx;
    z-index: 9999;
    text-align: center;
    display: flex;
    .btn{
       width: 100%;
      height: 110upx;
      color: #FFFFFF;
      background: #109DED;
      padding-bottom:1rpx;
    }
  }
  .black_mus {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
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
    .usarbotm{
      width: 100%;
      padding: 40upx 0;
      display: flex;
      align-items: center;
      font-size: 30upx;
      .stname{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        .stve{
          padding: 0 15upx;
          height: 40upx;
          line-height: 40upx;
          border-radius: 8upx;
        }
        .stnamet{
          border: 2upx solid #999999;
          color:#999999;
        }
        .stnames{
          background: $uni-color-primary;
          border: 2upx solid $uni-color-primary;
          color:#FFFFFF;
        }
      }
    }
  }
  .navstop{
    position: relative;
    width: calc(100% - 80upx);
    padding: 20upx 40upx 140upx 40upx;
    font-size: 28upx;
    color: #FFFFFF;
    background: #109DED;
    .lisst{
      position: absolute;
      left: 0;
      top: 110upx;
      width: calc(100% - 40upx);
      padding:  0 20upx 110upx 20upx;
      .citst{
        width: 100%;
        .cits_t{
          width: calc(100% - 40upx);
          padding: 20upx;
          background: #F5FAFD;
          border-top-left-radius: 15upx;
          border-top-right-radius: 15upx;
          color: #333333;
          line-height: 50upx;

          .cits_list{
            display: flex;
          }
        }
        .cits_b{
          width: calc(100% - 40upx);
          color: #333333;
          padding: 0 20upx;
          background: #FFFFFF;
          border-bottom-left-radius: 15upx;
          border-bottom-right-radius: 15upx;
          .cits_bt{
            display: flex;
            line-height: 60upx;
            align-items: center;
            justify-content: space-between;
            .cits_bts{
              display: flex;
              flex: 1;
            }
            .cits_btsy{
              display: flex;
              flex: 1;
              color: #F48F00;
            }
          }
		  .istaf {
		  	width: 100%;
		  	font-size: 30upx;
		  	.ravelv {
		  		width: calc(100% - 40upx);
		  		min-height: 90upx;
		  		background: #FFFFFF;
		  		margin-bottom: 20upx;
		  		.ts {
		  			line-height: 90upx;
		  			display: flex;
		  			.rav_left {
              text-align: left;
		  				width: 25%;
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
		  				.bost{
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
              text-align: left;
		  				width: 25%;
		  				color: #c0c0c0;
		  			}

		  			.ravright {
		  				width: 70%;
		  				height: 140upx;
		  				display: flex;
		  				align-items: center;
		  				.bost{
		  					text-align: center;
		  					width: 160upx;
		  					height: 120upx;
		  					overflow: hidden;
		  				}
		  			}
		  		}
		  	}
		  }
          .isswflist{
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
            .btns{
              width: 100%;
              height: 90upx;
              display: flex;
              text-align: center;
              line-height: 90upx;
              font-size: 35upx;
              background: #E5E5E5;
              .btns_z{
                flex: 1;
                height: 90upx;
                color: $uni-color-primary;
              }
            }
            .isstops{
              padding: 40upx 10%;
              width: calc(100% - 20%);
              .isstop{
                height: 90upx;
                line-height: 90upx;
                width: 100%;
                display: flex;
                align-items: center;
                .wors{
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
		  .isswflist{
		  	position: fixed;
		  	bottom: 0;
		  	left: 0;
		  	transition: all 0.3s ease;
		  	-webkit-transform: translateY(100%);
		  	transform: translateY(100%);
		  	min-height: 150upx;
		  	border-top-left-radius: 15upx;
		  	border-top-right-radius: 15upx;
		  	//width: calc(100% - 80upx);
		  	z-index: 889;
		  	background: #ffffff;
		  	//padding: 40upx;
		  	font-size: 30upx;
		  	.isstop{
		  		color: $uni-color-primary;
		  		display: flex;
		  		align-items: center;
		  		justify-content: space-between;
		  		margin-bottom: 30upx;
		  	}
		  	.isstops{
		  		padding-bottom: 20upx;
		  	}
		  }
		  .show {
		    -webkit-transform: translateY(0);
		    transform: translateY(0);
		  }
        }
      }
      .btuserlist{
        width: 100%;
        margin-top: 20upx;
        border-radius: 15upx;
        background: #FFFFFF;
        .btuse{
          color: #C8C7CC;
          width: calc(100% - 40upx);
          padding: 20upx;
          .btul{
            margin-top: 10upx;
            color: #333333;
            .user_t{
              display: flex;
              width: 100%;
              height: 50upx;
              line-height: 50upx;
              font-size: 28upx;
              .user_l{
                flex: 3;
              }
              .user_os{
                flex: 7;
                text-align: left;
              }
              .user_o{
                flex: 6;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                .uses_sp{
                  margin-left:20upx;
                  height: 40upx;
                  line-height: 40upx;
                  border-radius: 5upx;
                  padding: 2upx 6upx;
                  background: red;
                  color: #FFFFFF;
                }
                .uses_st{
                  margin-left:20upx;
                  height: 40upx;
                  line-height: 40upx;
                  border-radius: 5upx;
                  padding: 2upx 6upx;
                  background: #FF9000;
                  color: #FFFFFF;
                }
              }
              .user_r{
                flex: 2;
                justify-content: flex-end;
                display: flex;
                color: #FF9000;
              }
              .user_t{
                flex: 3;
              }
            }
          }
        }
        .liass{
          width: calc(100% - 40upx);
          padding: 0 20upx;
          display: flex;
          color: #C8C7CC;
          line-height: 80upx;
          .liass_l{
            font-size: 35upx;
            flex: 1;
          }
          .liass_r{
            color: #333333;
            text-align: right;
            flex: 2;
          }
          .liass_p{
            text-align: right;
            flex: 1;
            font-size: 35upx;
            color: #FF9000;
          }
        }
      }
    }
  }
}
</style>
