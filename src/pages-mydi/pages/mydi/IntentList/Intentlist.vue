<template>
  <view class="translist">
    <loading>
    </loading>
    <view class="Navigation">
      <view class="smtis">
        <view @click="rblcok" class="iconfont" style="color: #FFFFFF;margin-left: 20upx;">&#xe61e;</view>
      </view>
      <view class="ongbutn">
        意向单列表
      </view>
      <view class="smtis">
      </view>
    </view>
    <view class="selsops"  v-model="selstName">
      <view class="selsit"  @click="secks(item)" :class="seid == item.id ? 'seclk': ''" v-for="(item,index) in selst" :key="index">
          {{item.name}}
      </view>
    </view>
    <view class="searchs">
      <input type="text" v-model="guestName" class="seinputs" value="" placeholder="入住人姓名"/>
      <!--<select class="seinputs" style="border:none;color: #8b8888" v-model="orderStatus">
        <option v-for="item in array" :value="item.id" :label="item.value"></option>
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
     <!-- <view class="section">
        <picker bindchange="bindPickerChange" :value=index :range="array">
          <view class="picker">
            当前选择：{{array[index]}}
          </view>
        </picker>
      </view>-->
      <view class="btnstlist" @click="selist(1)">
        搜索
      </view>
      <view class="btnstlist" @click="newIntentionList()">
        新建
      </view>
    </view>
    <view v-if="showlist">
    <view v-if="showlist!=undefined && showlist.length > 0">
      <view class="listshow" v-for="(item,index) in showlist" :key="index" @click="slsts(item)">
        <view class="listtops">
          <view class="lstt_l">
            <view class="iconfont" style="color: #007aff;">
              &#xe63b;
            </view>
            酒店意向单
          </view>
          <view class="lstt_l">
            {{rest(item.orderStatus)}}
          </view>
        </view>
        <view style="line-height: 50upx;display: flex;justify-content: space-between;">
          <view>
            {{item.hotelName}}
          </view>
        </view>

        <view style="font-size: 28upx;line-height: 60upx;">
          入住时间: {{arrivalDate(item.arrivalDate)}}
        </view>
        <view style="color: #C8C7CC;font-size: 28upx;width: 100%;overflow: scroll;">
          入住人: {{item.guestNames}}
        </view>
      </view>
    </view>
    <no-data v-else></no-data>
    </view>
    <uni-load-more :loadingType="loadingType" v-if="ispages > page" :contentText="contentText" ></uni-load-more>
    <view class="contentnomore" v-if="ispages == curPage">{{contentText.contentnomore}}</view>
  </view>
</template>

<script>
import order from '@/api/order.js'
	import noData  from '@/components/noData.vue'; //日期
	export default{
		components: {
			noData
		},
  data(){
    return{
      optios: "订单状态",
      blac_show: false,
      shos: false,
      guestName:'',
      orderStatus: '',
      seid:'',
      loadingType: 0,
      contentText: {
        contentdown:'上拉显示更多',
        contentrefresh: '正在加载...',
        contentnomore: '没有更多数据了'
      },
      selstName: '',
      selst: [{
        name: '机票意向单',
        id: 1
      },{
        name: '酒店意向单',
        id: 2
      }],
      ispages: 0,
      
      
      page: 1,
      showlist:null,//酒店列表
      array: [
        {
          id: '',
          value: '全部'
        },{
          id: 5,
          value: '待审批'
        }, {
          id: 1,
          value: '通过'
        }, {
          id: 2,
          value: '拒绝'
        }, {
          id: 3,
          value: '已确认'
        }, {
          id: 4,
          value: '已取消'
        }
        ],
      curPage: 0
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
  onLoad(item){
    if(item.ist >= 0){
      this.seid = item.ist;
    } else {
      this.seid = '';
    }
  },
  mounted() {
    this.selist(1)
  },
  methods:{
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
    bindPickerChange(e) {
      this.setData({
        index: e.detail.value
      })
    },
    newIntentionList(){
      uni.navigateTo({
        url:'/pages/book/valist/hotel/hotel'
      })
    },
      rest(ite){
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
    arrivalDate(tiem){
      return tiem.substring(0,10)
    },
    slsts(item){//查看当前详情
      uni.navigateTo({
        url:'intentdetails?code=' + item.requireNo,
      })
    },
    secks(item){
      if (item.id == 1){
        uni.navigateTo({
          url:'ticketIntentForm'
        })
      }else if (item.id == 2){
        this.showlist = null;
        this.seid = item.id;
        this.selist(1);
      }
    },
    async selist(it){//酒店查询
      if (this.orderStatus == 5){
        this.orderStatus = 0;
      }
      let that = this;
      this.seid = 2;
      if(it == 1){
        
      }
      let dat = {};
      let res;
      that.page = 1;
      that.loadingType = 0;
      dat = {
        pageVO:{
          curPage:that.page,//第几页
          rowNum:10,//一页多少条
        },
        hotelOrderVo:{
          guestName:this.guestName,
          orderStatus:this.orderStatus
        }
      }
      try{
        res =await order.searchHotelRequireList(dat);
        
        if(res.code == 200){
          console.log("200")
          that.page++;//得到数据之后page+1
          that.ispages = res.data.total;//总共多少页
          that.showlist = res.data.rows || [];
          // console.log("data"+JSON.stringify(this.showlist))
          if(it == 2){
            uni.stopPullDownRefresh();
          }
        } else {
          if(it == 2){
            uni.stopPullDownRefresh();
          }
          that.showToasts(res.message);
        }
      }catch(e){
        console.log(e)
        
      }
    },
    async getmorenews(){ //上拉加载
      if (this.loadingType !== 0) {//loadingType!=0;直接返回
        return false;
      }
      if(this.page > this.ispages){
        return false;
      }
      this.loadingType = 1;
      uni.showNavigationBarLoading();//显示加载动画
      let dat = {};
      let res;
      dat = {
        pageVO:{
          curPage:this.page,//第几页
          rowNum:10,//一页多少条
        },
        hotelOrderVo:{
          guestName:this.guestName,
          orderStatus:this.orderStatus
        }
      }
      
      try{
        res =await order.searchHotelRequireList(dat);
        
        if(res.code == 200){
          if (res.data.rows == 0) {//没有数据
            this.loadingType = 2;
            uni.hideNavigationBarLoading();//关闭加载动画
            return;
          }
          this.page++;//每触底一次 page +1
          this.curPage = res.data.curPage;
          this.showlist = this.showlist.concat(res.data.rows);
          this.loadingType = 0;//将loadingType归0重置
          uni.hideNavigationBarLoading();//关闭加载动画
        } else {
          this.showToasts(res.message);
        }
      }catch(e){
        console.log(e)
        
      }
    },
    rblcok(){ //返回
      uni.switchTab({
        url: '/pages/mydi/mydi'
      })
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
      .lstt_l{
        display: flex;
        align-items: center;
        flex: 1;
        image{
          width: 35upx;
          height: 35upx;
        }
      }
      .lstt_r{
        flex: 1;
        text-align: right;
      }
    }
  }
}
</style>
