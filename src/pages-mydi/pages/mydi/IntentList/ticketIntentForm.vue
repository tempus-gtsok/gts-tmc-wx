<template>
  <view class="translist">
    <loading>
    </loading>
    
    <headnavigation titles="意向单列表"></headnavigation>
    <view class="selsops">
      <view class="selsit" @click="secks(item)" :class="seid == item.id ? 'seclk': ''" v-for="(item,index) in selst"  :key="index">
        {{item.name}}
      </view>
    </view>
    <view class="searchs">
      <input type="text" v-model="passenger" class="seinputs" value="" placeholder="乘机人姓名"/>
     <!-- <select class="seinputs" style="border:none;color: #8b8888" v-model="orderStatus">
        <option v-for="item in array" :value="item.id" >{{item.value}}</option>
      </select>-->
      <view class="box_left" @click="opclk">
        {{optios}}
        <view class="iconfont" style="color: #C0C0C0;font-size: 50upx;margin-left: 5upx;">&#xe656;</view>
      </view>
      <view class="tads" @click="isshow" v-if="blac_show">
      </view>
      <view class="fxd_list" :class="shos ? 'show' : ''" v-if="blac_show">
        <view class="fx_u">
          选择订单类型
        </view>
        <view class="fxd_lists">
          <view class="fd_li" v-for="(item,index) in array" :key="index" @click="seachopt(item)">
            <view class="fa_lef">{{item.value}}</view>
            <view class="ok_ioc" v-if="orderStatus == item.id"><text class="iconfont" style="color:#007aff;">&#xe60b;</text></view>
          </view>
        </view>
      </view>
      <view class="btnstlist" @click="selist(1)">
        搜索
      </view>
      <view class="btnstlist" @click="onadd()">
        新建
      </view>
    </view>
    <view v-if="shomlist">
      <view v-if="shomlist!=undefined && shomlist.length > 0">
        <view class="listshow"  v-for="(item,index) in shomlist" :key="index" @click="slsts(item)" v-if="code == 200">
          <view > <!--v-else-->
            <view class="listtops">
              <view class="lstt_l">
                <view class="iconfont" style="color:#007aff;">&#xe637;</view>
                机票意向单
              </view>
              <!-- <view class="lstt_z" style="color: #007aff;">
                {{item.voyageTypeName}}
              </view> -->
              <view class="lstt_r" >
                {{conpan(item.status)}}
              </view>
            </view>
            <view class="pash" style="line-height: 50upx;" >
              <view class="cityname">
              <view style="text-align: left;color: #3B4246;">{{cityname(item.depart)}}-{{cityname(item.arrive)}}</view>
              <view class="goBack" style="color: #007aff;">
                ({{item.voyageTypeName}})
              </view>
              </view>
              <view style="text-align: left;color: #3B4246; font-size:30upx;">
                <view>{{item.serviceLevelName}}</view><!--<view style="margin-left: 20upx;">{{(item[0].arriveDate.split('/'))[0]}}</view>-->
              </view>
            </view>
            <view style="font-size: 28upx;line-height: 60upx;display: flex;">
              启程时间： <view>{{item.departDate}}</view><!--<view style="margin-left: 20upx;">{{(item[0].arriveDate.split('/'))[0]}}</view>-->
            </view>
          </view>
          <view style="display: flex;">
            <view style="color: #C8C7CC;font-size: 28upx;flex: 1;" v-if="item.travelers != null">
              乘机人: {{item.travelers[0].name}}
            </view>
          </view>
          <view style="color: #C8C7CC;font-size: 28upx;text-align: right;">
            下单时间：{{item.createTime}}
          </view>
        </view>
      </view>
      <no-data v-else></no-data>
    </view>
		
    <uni-load-more :loadingType="loadingType" v-if="shomlist!=undefined&&shomlist.length > 9 && ispages != page-1" :contentText="contentText" ></uni-load-more>
    <view class="contentnomore" v-if="ispages == page-1">{{contentText.contentnomore}}</view>
		<onPageScrolls :scrolltops="scrolltops"></onPageScrolls>
  </view>
</template>

<script>
import certifi from '@/api/certificate.js'
import order from '@/api/order.js'
import airports from '@/pages/book/sselect-city/airports.js'
	import noData  from '@/components/noData.vue'; //日期
	export default{
		components: {
			noData
		},
  data(){
    return{
      scrolltops:false,//是否显示
      code: '',
      name: '',
      optios: '订单状态',
      blac_show: false,
      shos: false,
      orderStatus: '',
      passenger:'',
      destination:'',
      seid:null,
      loadingType: 0,
      contentText: {
        contentdown:'上拉显示更多',
        contentrefresh: '正在加载...',
        contentnomore: '没有更多数据了'
      },
      selst: [{
        name: '机票意向单',
        id: 1
      },{
        name: '酒店意向单',
        id: 2
      }],
      ispages: 0,
      
      
      page: 1,
      shomlist: null,
      hang: [],
      Status:[],
      array: [
        {
          id: '',
          value: '全部'
        },{
          id: 1,
          value: '待审批'
        },{
          id: 2,
          value: '取消'
        },{
          id: 3,
          value: '拒单'
        },{
          id: 4,
          value: '已审批'
        },{
          id: 5,
          value: '已预订'
        }
      ],
    }
  },
  onPullDownRefresh: function() {
    //下拉刷新的时候请求一次数据
    this.selist(2);
  },
  onReachBottom: function() {
    let that = this;
    if (that.timer != null) {
      clearTimeout(that.timer);
    }
    that.timer = setTimeout(function() {
      that.getmorenews();
    }, 5);
  },
  mounted() {
    this.citys();
    this.selist(1);
  },
  onLoad(item) {
    if(item.ist >= 0){
      this.seid = item.ist;
    } else {
      this.seid = null;
    }
  },
  methods:{
    onPageScroll(res){//距离页面顶部距离
      if(res.scrollTop <600){
        this.scrolltops = false;
      } else {
        this.scrolltops = true;
      }
    },
    seachopt(item){//选择类型
      this.orderStatus = item.id
      this.optios = item.value
      // this.getnewsList();
      this.blac_show = false;
      this.shos = false;
    },
    isshow(){
      this.blac_show = false;
      this.shos = false;
    },
    opclk(){
      this.blac_show = true;
      this.shos = true;
    },
    onadd(){
      uni.navigateTo({
        url:'/pages/book/valist/domesticairTicket/domesticairTicket'
      })
    },
    flist(st){
      let s = st.split('/')
      return s[0]
    },
    slsts(item){//查看当前详情
      uni.navigateTo({
        url:'ticketIntentDetails?code=' + item.no
      })
    },
    secks(item){
      if (item.id == 2){
        uni.navigateTo({
          url:'Intentlist'
        })
      }else {
        this.shomlist = null;
        this.seid = item.id;
        this.selist(1);
        uni.stopPullDownRefresh();
      }
    },
    async selist(it){ //飞机查询
      if(it == 1){
        
      }
      this.seid = 1;
      let that = this;
      that.page = 1;
      that.loadingType = 0;
      let dat = {};
      let res;
      try{
          dat = {
            // pageVO:{
              curPage:that.page,//第几页
              rowNum:10,//一页多少条
            // },
              travelName:this.passenger,
              status:this.orderStatus,
          }
        res =await order.toSearch(dat);
        
        if(res.code == 200){
          this.code =res.code;
          let that = this;
          that.page++;//得到数据之后page+1
          // console.log("res:"+JSON.stringify(res.data.records.travelers[0].name))
          that.ispages = res.data.total;//总共多少页
          that.shomlist = res.data.records || [];
          that.address = airports.addressAirportAll; //航空名字
        } else {
          that.showToasts(res.message);
        }
      }catch(e){
        console.log(e);
        
      }
    },
    username(list){//乘机人
      if(list.length > 0){
        let sue = [];
        for (let i = 0; i < list.length; i++) {
          sue.push(list[i].name)
        }
        return [...new Set(sue)].join(',')
      } else {
        return ""
      }
    },
    cityname(name){ //城市名称
      let that = this;
      for (let j = 0; j < that.address.length; j++) {
        if (name == that.address[j].airportCode) {
          return that.address[j].cityCName;
        }
      }
    },
    async citys(){//获取机场名称
      try{
        let ret = await certifi.queryAirlineList();
        if(ret.code == 200){
          this.hang = ret.data.airlineDds;
        } else {
          this.showToasts(res.message);
        }
      }catch(e){
        console.log(e);
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
    companys(ies) {
      let ie = ies.split('/');
      for (let s in this.hang) {
        if (ie[0] == s) {
          return this.hang[s]
        }
      }
    },
    conpan(ie){
      let arr = [
        {
          id: '',
          value: '订单状态'
        },{
          id: 1,
          value: '待审批'
        },{
          id: 2,
          value: '取消'
        },{
          id: 3,
          value: '拒单'
        },{
          id: 4,
          value: '已审批'
        },{
          id: 5,
          value: '已预订'
        }
      ]
      for(let i in arr){
        if(arr[i].id == ie){
          return arr[i].value
        }
      }
    },
    async getmorenews(){
      let that = this;
      if (that.loadingType !== 0) {//loadingType!=0;直接返回
        return false;
      }
      if(that.page > that.ispages){
        return false;
      }
      that.loadingType = 1;
      uni.showNavigationBarLoading();//显示加载动画
      let dat = {};
      let res;
      try{
        dat = {
          // pageVO:{
            curPage:that.page,//第几页
            rowNum:10,//一页多少条
          // },
          // mssOrderRequest:{
            // productType:"1",//类型 1为飞机
            // orderState:that.seid,
            passenger:this.passenger,
            status:this.orderStatus,
          // }
        }
        res =await order.toSearch(dat);
        // }
        
        if(res.code == 200){
          if (res.data.records.length == 0) {//没有数据
            that.loadingType = 2;
            uni.hideNavigationBarLoading();//关闭加载动画
            return;
          }
          that.page++;//每触底一次 page +1
          that.shomlist = that.shomlist.concat(res.data.records);
          that.loadingType = 0;//将loadingType归0重置
          uni.hideNavigationBarLoading();//关闭加载动画
          that.address = airports.addressAirportAll; //航空名字
        } else {
          that.showToasts(res.message);
        }
      }catch(e){
        console.log(e);
        
      }
    }
  }
}
</script>

<style scoped lang="scss">
.translist{
  position: relative;
  width: 100%;
  padding-bottom: 20upx;
  .contentnomore{
    color: #777777;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
  }
  .Navigation{
    width: 100%;
    height: 90upx;
    display: flex;
    align-items: center;
    background: linear-gradient(to right, #4E92FD 0%,#6E46FE 100%);
    .ongbutn{
      width: 86%;
      color: #FFFFFF;
      text-align: center;
    }
  }
  .selsops{
    width: 100%;
    height: 90upx;
    background: #FFFFFF;
    overflow: scroll;
    display: flex;
    white-space: nowrap;
    font-size: 30upx;

    .selsit{
      width: 100%;
      display: inline-block;
      line-height: 90upx;
      text-align: center;
      color: #999999;
      padding: 0 60upx;
      height: 86upx;
      border-bottom: 6upx solid #FFFFFF;
    }
    .seclk{
      border-bottom: 6upx solid $uni-color-primary;
    }
  }
  .searchs{
    margin-top: 20upx;
    width: 100%;
    height: 80upx;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;

    .box_left{
      background-color: #E5E5E5;
      color: #8b8888;
      border-radius: 10upx;
      width: 30%;
      height: 65upx;
      margin-left: 15upx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30upx;
    }
    .tads{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #333333;
      opacity: 0.3;
    }
    .fxd_list{

      position: fixed;
      z-index: 9999;
      bottom: 630upx;
      left: 0;
      width: 100%;
      transition: all 0.3s ease;
      -webkit-transform: translateY(100%);
      transform: translateY(100%);
      .fx_u{
        width: 100%;
        height: 90upx;
        background: #F6F6F6;
        line-height: 90upx;
        text-align: center;
        color: #C0C0C0;
      }
      .fxd_lists{
        width: 100%;
        max-height: 540upx;
        overflow: scroll;
        .fd_li{
          width: 100%;
          height: 90upx;
          background: #FFFFFF;
          border-bottom: 2upx solid #F1F1F1;
          display: flex;
          line-height: 90upx;
          .fa_lefs{
            text-align: center;
            width: 100%;
          }
          .fa_lef{
            width: 85%;
            text-indent: 70upx;
          }
          .ok_ioc{
            text-align: center;
            width: 15%;
          }
        }
      }
    }


    .seinputs{
      width: 35%;
      font-size: 30upx;
      margin-left: 20upx;
      text-indent: 15upx;
      height:60upx;
      border-radius: 10upx;
      background: #E5E5E5;
    }
    .btnstlist{
      width: calc(30% - 80upx);
      border-radius: 10upx;
      margin-left: 20upx;
      height:60upx;
      line-height: 60upx;
      text-align: center;
      background-color: $uni-color-primary;
      color: #FFFFFF;
      font-size: 30upx;
    }
  }
  .selsops::-webkit-scrollbar {
    display: none;
  }
  .listshow{
    width: calc(100% - 80upx);
    margin: 20upx 20upx 0 20upx;
    padding: 20upx;
    font-size: 35upx;
    border-radius: 15upx;
    background: #FFFFFF;
    .listtops{
      width: 100%;
      display: flex;
      color: #C0C0C0;
      border-bottom: 1upx solid #f3f3f3;
      .lstt_l{
        display: flex;
        align-items: center;
        flex: 1;
        image{
          width: 35upx;
          height: 35upx;
        }
      }
      .lstt_z{
        flex: 0.3;
      }
      .lstt_r{
        flex: 1;
        text-align: right;
        .stri{
          color: red;
          font-size: 26upx;
        }
      }
    }
    .pash{
      width: 100%;
      display: flex;
      color: #C0C0C0;
      justify-content: space-between;
      &>.cityname{
        display: flex;
        &>.goBack{
          margin: 0 10upx;
        }
      }
      image{
        width: 35upx;
        height: 30upx;
      }
    }
  }
}
</style>
