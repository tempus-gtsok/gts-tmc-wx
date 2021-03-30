<template>
  <view>
    <view class="black_mu" @click="isshow" v-if="blac_show"></view>
    <loading></loading>
    <view class="isswflist" :class="switfal ? 'show' : ''">
      <view class="talist" v-for="(item,index) in stlist" :key="index" @click="adduslit(item)">
        <view class="tl_left">
          <view class="tl_tops">
            <view class="tl_rightl">
              {{newicname(item.citys.vehicle)}}
            </view>
            <view class="tl_rights">
              {{newstaname(item.citys)}}
            </view>
          </view>
          <view class="tl_bots">
            {{newdata(item.citys)}}
          </view>
          <view class="tl_botsb">
            出差事由：{{item.reson}}
          </view>
        </view>
        <view class="tl_right">
          <view class="tldv">
            确定
          </view>
        </view>
      </view>
    </view>

   <headnavigation titles="酒店"></headnavigation>

    <view class="hotel">
      <view class="add_ul">
        <view class="apl_ok">
          <view class="frop_left">
            <text class="iconfont f_icon_lefts">&#xe65c;</text>
            <view class="apl_name">申请类型:</view>
          </view>
          <!--<view class="frop_pls">
            <view class="opls">
              <select class="lis" v-model="istval">
                <option v-for="item in istopt" :value="item.value">{{ item.lable }}</option>
              </select>
            </view>
          </view>-->
          <view class="section" style="width: 80%;">
            <picker  @change="bindPickerChange($event)" :range="istopt" :range-key="'label'">
                {{istopt[index].label}}
            </picker>
          </view>
          <view class="iconfont" style="font-size: 50upx;margin-right: 25upx;">&#xe656;</view>
        </view>
      </view>
      <view class="add_ul" v-if="istval == 1 && (tccrBeforeMiddle == 1 || tccrBeforeMiddle == 0  )">
        <view class="apl_ok">
          <view class="frop_left">
            <text class="iconfont f_icon_lefts">&#xe65c;</text>
            <view class="apl_name">出差预订:</view>
          </view>
         <!-- <view class="frop_pls">
            <view class="opls">
              <select class="lis" v-model="bt_bol">
                <option v-for="item in travellist" :value="item.value">{{ item.lable }}</option>
              </select>
            </view>
          </view>-->
          <view class="section" style="width: 80%;">
            <picker  @change="travellistChange($event)" :range="travellist" :range-key="'label'">
              {{travellist[travellistIndex].label}}
            </picker>
          </view>
          <view class="iconfont" style="font-size: 50upx;margin-right: 25upx;">&#xe656;</view>
        </view>
      </view>

      <view class="add_ul">
        <view class="apl_ok">
          <view class="frop_left">
            <text class="iconfont f_icon_left">&#xe65c;</text>
            <view class="apl_name">目的地：</view>
          </view>
          <view class="frop_pls">
            <view class="opls"><ss-city :isretun="isretun" :currents="hotes" :current="currentPage"></ss-city></view>
          </view>
        </view>
      </view>
      <view class="add_ul">
        <view class="apl_ok">
          <view class="frop_left">
            <text class="iconfont f_icon_left">&#xe65c;</text>
            <view class="apl_name">酒店名称：</view>
          </view>
          <view class="frop_pls">
            <view class="opls"><input placeholder="酒店名称"  v-model="hotelname" /></view>
          </view>
        </view>
      </view>
      <view class="add_ul">
        <view class="apl_ok">
          <view class="frop_left">
            <text class="iconfont f_icon_left">&#xe65c;</text>
            <view class="apl_name">入离日期</view>
          </view>
          <view class="frop_pls">
            <view class="opls"><calendar :isretun="isretun" @change="lischang" :startDate="stardate" :endDate="enddate" :daysCount="daysCount"></calendar>
              </view>
          </view>
        </view>
      </view>
      <view class="add_ul">
        <view class="apl_ok">
          <view class="frop_left">
            <text class="iconfont f_icon_left">&#xe65c;</text>
            <view class="apl_name">星级要求:</view>
          </view>
          <!--<view class="frop_pls">
            <view class="opls">
              <select class="lis" v-model="stas">
                <option v-for="item in staropt" :key="item.value" :label="item.label" :value="item.lable">{{ item.lable }}</option>
              </select>
            </view>
          </view>-->
          <view class="section" style="width: 80%;">
            <picker  @change="staroptChange($event)" :range="staropt" :range-key="'label'">
              {{staropt[staroptIndex].label}}
            </picker>
          </view>
          <view class="iconfont" style="font-size: 50upx;margin-right: 25upx;">&#xe656;</view>
        </view>
      </view>
      <view class="add_ul">
        <view class="apl_ok">
          <view class="frop_left">
            <text class="iconfont f_icon_left">&#xe65c;</text>
            <view class="apl_name">床型要求:</view>
          </view>
         <!-- <view class="frop_pls">
            <view class="opls">
              <select class="lis" v-model="beds">
                <option v-for="item in bedopt" :key="item.value" :label="item.label" :value="item.label">{{ item.lable }}</option>
              </select>
            </view>
          </view>-->
          <view class="section" style="width: 80%;">
            <picker  @change="bedoptChange($event)" :range="bedopt" :range-key="'label'">
              {{bedopt[bedoptIndex].label}}
            </picker>
          </view>
          <view class="iconfont" style="font-size: 50upx;margin-right: 25upx;">&#xe656;</view>
        </view>
      </view>
      <view class="add_ul">
        <view class="apl_ok">
          <view class="frop_left">
            <text class="iconfont f_icon_left">&#xe65c;</text>
            <view class="apl_name">价格范围:</view>
          </view>
          <view class="frop_pls">
            <view class="opls"><input class="input_css" type="number" style="margin-right: 4px;" v-model="price_floor" /> ~ <input class="input_css"
                                                                                                                                   type="number" style="margin-left: 4px;" v-model="price_ceiling" /></view>
          </view>
        </view>
      </view>
      <view class="second_css">
        <!--第二节 -->
        <view>
          <view class="cut_css">
            <view class="title_css">入住人信息</view>
          </view>
        </view>
      </view>
      <view class="add_ul">
        <view class="apl_ok">
          <view class="frop_left">
            <text class="iconfont f_icon_left">&#xe65c;</text>
            <view class="apl_name">入住人:</view>
          </view>
          <view class="frop_pls">
            <view class="opls"><passengertwo :isretun="isretun" ref="passengers"></passengertwo></view>
          </view>
          <view class="iconfont" style="font-size: 50upx;margin-right: 25upx;">&#xe656;</view>
        </view>
      </view>
      <view class="add_ul">
        <view class="apl_ok">
          <view class="frop_left">
            <text class="iconfont f_icon_left">&#xe65c;</text>
            <view class="apl_name">房间数：</view>
          </view>
          <view class="frop_pls">
            <view class="opls"><input class="input_css" style="margin: 0 10upx;" type="number" v-model="r_number" />间</view>
          </view>
          <view class="iconfont" style="font-size: 50upx;margin-right: 25upx;">&#xe656;</view>
        </view>
      </view>


      <view class="third_css">
        <!-- 第三节 -->
        <view>
          <view class="cut_css">
            <view class="title_css">备注信息</view>
          </view>
        </view>
        <view>
        	<textarea class="input_css" value="" placeholder="" v-model="remark" />
        </view>
        <view class="btn_sbm" @click="onadd">提交</view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  mapState
} from 'vuex';
/* import hotelsave from '@/api/torowk.js' */
import tork from '@/api/torowk.js'
import calendar from '@/components/view/towork/data_pk.vue'; //日期
import ssCity from '@/components/view/book/ss-city/ss-city.vue'; //城市
import passengertwo from '@/components/view/book/passenger/passenger.vue'
export default {
  data() {
    return {
      index: 0,
      travellist:[{
        value: true,
        label: '否'
      },{
        value: false,
        label: '是'
      }],
      daysCount: 365,
      counts: 0,
      bt_bol: true,
      btns: '\ue80c',
      tccrBeforeMiddle: 9,
      sitsj: true,
      mokksli: {}, //使用出差预定是需要传的参数
      switfal: false,
      stlist: [],
      blac_show: false,
      travellistIndex: 0,
      staroptIndex: 0,
      bedoptIndex: 0,
      city: '',
      hotelname: '',
      showCaledar: false,
      stardate: '2020-01-01',
      enddate: '2020-02-01',
      istopt:[{
        value: 1,
        label: '因公'
      },{
        value: 2,
        label: '因私'
      }],
      istval:1,
      staropt: [
        {
          value: 1,
          label: '二星级/经济'
        },
        {
          value: 2,
          label: '三星级/舒适'
        },
        {
          value: 3,
          label: '四星级/高档'
        },
        {
          value: 4,
          label: '五星级及以上/豪华'
        }
      ],
      stas: 1,

      bedopt: [
        {
        value: 1,
        label: '大床'
      }, {
        value: 2,
        label: '双床'
      }, {
        value: 3,
        label: '不限'
      }],
      beds: 1,
      price_ceiling: '',
      price_floor: '',
      isretun: false,
      p_number: '',
      r_number: '',
      id_number: '',
      currentPage: 'Hotel',
      hotes: 'Hotel',
      isretuns: false,
      remark: '',
    };
  },

  mounted() {
    this.pass_com();
  },
  watch:{
    istval(item){
      if(item == 2){
        this.isretun = false;
      }
    },
    bt_bol(item){
      if(item == false){
        this.bts_k();
      }else {
        this.isretun = false;
      }
    }
  },
  methods: {
    bedoptChange(e){
      console.log("index")
      this.bedoptIndex = e.detail.value;
      this.beds = e.detail.label;
    },
    staroptChange(e){
      this.staroptIndex = e.detail.value
      if (this.staroptIndex === 0){
        this.stas = 1;
      }else  if (this.staroptIndex === 1){
        this.stas = 2;
      }else  if (this.staroptIndex === 2){
        this.stas = 3;
      }else  if (this.staroptIndex === 3) {
        this.stas = 4;
      }
    },
    travellistChange(e){
      this.travellistIndex = e.detail.value
      if (this.travellistIndex === 0){
        this.bt_bol = true;
      }else if (this.travellistIndex === 1) {
        this.bt_bol = false;

      }
    },
    bindPickerChange(e) {
        this.index = e.detail.value
      if (this.index === 0){
        this.istval = 1;
      }else if (this.index === 1) {
        this.istval = 2;
      }
    },
    rblcok() {
      // #ifdef H5
      this.$router.go(-1);
      // #endif
      // #ifdef MP-WEIXIN
      uni.navigateTo({
        url:'../valist/valist'
      });
      //#endif
      // uni.navigateTo

    },
    lischang(item) {
      if (item.choiceDate.length > 0) {
        this.stardate = item.choiceDate[0].re;
        this.enddate = item.choiceDate[1].re;
      }
    },

    isshow() {
      this.blac_show = false;
      this.switfal = false;
    },



    async bts_k() { //是否出差预定
      if (this.bt_bol == false) {
        let num = 3;
        
        try {
          const res = await tork.getAgreeApprvTask({
            type: num
          });
          
          console.log("res.data" + res.data);

          if (res.code == 200) {
            if (res.data.length == 0) {
                this.bt_bol = true;
                this.travellistIndex = 0;
                uni.showToast({
                  title: '没有合适的出差预订!',
                  duration: 1000,
                  icon: 'none',
                });
              this.showToasts("没有合适的出差申请！")
            } else {
              this.stlist = [];
              let dat = res.data;
              // console.log(dat)
              for (let i in dat) {
                if (num == 3) {
                  for (let k in dat[i].tmsGssLink.applyHotels) {
                    let datd = dat[i].tmsGssLink.applyHotels[k]
                    datd.std = 6
                    this.stlist.push({
                      id: dat[i].tmsGssLink.applyHotels[k].id,
                      reson: dat[i].reason, //出差事由
                      citys: datd, //出差信息
                      nams: dat[i].tmsGssLink.applyStaffs, //出差人
                      sit: {
                        deptName: dat[i].deptName, //部门名称
                        costcenterName: dat[i].costName,
                        deptId: dat[i].deptId, //部门id
                        costId: dat[i].costId, //成本中心id
                        costName: dat[i].costName, //成本中心名称
                        travelNo: dat[i].travelNo, //出差单号
                      }
                    })
                  }
                }
              }
              this.blac_show = true;
              this.switfal = true;
            }
          } else {
            this.showToasts(res.message);
          }
        } catch (e) {
          
          console.log(e)

        }


      } else {
        this.bt_bol = false;
        this.btns = '\ue80c';
        this.x = false;
        this.isblcks = 2;
      }
    },
    newicname(tm) { //回显类型
      if (tm == 1) {
        return '[机票]'
      } else if (tm == 2) {
        return '[火车]'
      } else {
        return '[酒店]'
      }
    },
    newstaname(tm) { //回显城市名称
      if (tm.vehicle == 1 || tm.vehicle == 2) {
        if (tm.goBack === 2) {
          return tm.arrivCityName + '-' + tm.deptCityName;
        } else if (tm.goBack === 1) {
          return tm.deptCityName + '-' + tm.arrivCityName
        }
      } else {
        return tm.cityName + "　" + tm.remark
      }
    },
    newdata(tm) { //回显时间
      if ((tm.deptDate == null && tm.std != 6) || (tm.inDate == null && tm.outDate == null && tm.std == 6)) {
        console.log(111111)
        return
      }
      let sta = '';
      let stamon = '';
      let stadta = '';
      let end = '';
      let endmon = '';
      let enddta = '';
      if (tm.std != 6) {
        if (tm.std == 4) {
          sta = new Date(tm.deptDate.replace(/-/g, '/')); //出发日期
          stamon = this.dats(sta.getMonth() + 1);
          stadta = this.dats(sta.getDate());
          end = new Date(tm.deptDates.replace(/-/g, '/')); //到达日期
          endmon = this.dats(end.getMonth() + 1);
          enddta = this.dats(end.getDate());
        } else {
          sta = new Date(tm.deptDate.replace(/-/g, '/')); //出发日期
          stamon = this.dats(sta.getMonth() + 1);
          stadta = this.dats(sta.getDate());
        }
      } else {
        sta = new Date(tm.inDate.replace(/-/g, '/')); //出发日期
        stamon = this.dats(sta.getMonth() + 1);
        stadta = this.dats(sta.getDate());
        end = new Date(tm.outDate.replace(/-/g, '/')); //到达日期
        endmon = this.dats(end.getMonth() + 1);
        enddta = this.dats(end.getDate());
      }
      if (tm.goBack == 3) {
        return stamon + '月' + stadta + '日' + '　出发'
      } else if (tm.std == 4) {
        if (tm.goBack === 2) {
          return endmon + '月' + enddta + '日' + '　出发　' + stamon + '月' + stadta + '日' + ' 返回'
        } else if (tm.goBack === 1) {
          return stamon + '月' + stadta + '日' + '　出发　' + endmon + '月' + enddta + '日' + ' 返回'
        }

      } else if (tm.std == 6) {
        return stamon + '月' + stadta + '日' + '　入住　' + endmon + '月' + enddta + '日' + ' 离店'
      }
    },
    dats(it) {
      if (it < 10) {
        return '0' + it
      } else {
        return it
      }
    },
    adduslit(item) { //确定
      let vehicleIdBack = 0;
      if (this.currentPage == 'Hotel') {
        this.$store.commit("wx_Hotel_Ai", {
          id: item.citys.cityCode,
          name: item.citys.cityName,
          ts: false
        });
        this.$store.commit("wx_hotels_Ai", item.citys.remark)
      }
      if (item.citys.std == 6) { //酒店
        console.log("item"+item.citys.outDate.substring(0, 10))
        this.stardate = item.citys.inDate.substring(0, 10); //出行开始时间
        this.enddate = item.citys.outDate.substring(0, 10); //出行离开时间

        console.log("stardate"+this.stardate)
        console.log("enddate"+this.enddate)
      }
      let userlis = [];
      for (var i = 0; i < item.nams.length; i++) { //出差人员
        userlis.push({
          phone: item.nams[i].phone,
          istrue: item.nams[i].tempPerson,
          passengerNo: item.nams[i].passengerNo,
          userName: item.nams[i].userName,
          userId: item.nams[i].id,
          travelNo:item.sit.travelNo,
          vehicleId: item.id, //事前出差单id
          vehicleIdBack: vehicleIdBack
        })
      }
      this.$store.commit('butaluserlist_add', userlis);
      this.mokksli = item.sit;
      this.isretun = true;
      this.blac_show = false;
      this.switfal = false;
      this.btns = '\ue618';
      this.isblcks = 1;
    },

    /* 选择出差人员组件 */
    pass_com() {
      let _this = this;
      this.$refs['passengers'].colllist();
      const userinfo = uni.getStorageSync('user_list' + uni.getStorageSync('appWxId')); //登录信息
      this.tccrBeforeMiddle = userinfo.tccrBeforeMiddle;
    },

    startClick() { //酒店地址搜索
      let list = this.wx_Hotel;
      uni.navigateTo({
        url: '../../sselect-city/selectcity?sta=right&type=' + this.currentPage + '&list=' + list
      });
    },

    async onadd() {
      // console.log("butaluserlist:" + JSON.stringify(this.butaluserlist))
      let _this = this;
      let butalist = this.butaluserlist;
      let bt_bols = _this.bt_bol;//false为事前 true为事中
      let istvals = _this.istval;//1为因公 2为因私
      let stardate = _this.stardate;
      let enddate = _this.enddate;
      let price_ceiling = _this.price_ceiling;
      let price_floor = _this.price_floor;
      let p_number = butalist.length;
      let r_number = _this.r_number;
      let p_name = _this.p_name;
      let id_number = this.id_number;
      let num_per = this.num_per;
      let travelers = JSON.stringify(num_per); //旅客信息转JSON格式
      let nams = this.wx_Hotel.name; //城市

      let stas = this.stas;
      let beds = this.beds;

      /* console.log(num_per[0].p_name) */

      if (stardate == '' || enddate == '') {
        uni.showToast({
          title: '入住日期或离店日期不能为空',
          duration: 1000,
          icon: 'none'
        });
        return
      } else
      if (stas == '') {
        uni.showToast({
          title: '请选择星级要求',
          duration: 1000,
          icon: 'none'
        });
        return
      } else
      if (beds == '') {
        uni.showToast({
          title: '请选择床型要求',
          duration: 1000,
          icon: 'none'
        });
        return
      } else
      if (price_ceiling == '' || price_floor == '') {
        uni.showToast({
          title: '价格范围不能为空',
          duration: 1000,
          icon: 'none'
        });
        return
      } else
      if (Number(price_ceiling) <= Number(price_floor)) {
        uni.showToast({
          title: '价格范围有误',
          duration: 1000,
          icon: 'none'
        });
        return
      } else

      if (p_number == '') {
        uni.showToast({
          title: '入住人数不能为空',
          duration: 1000,
          icon: 'none'
        });
        return
      } else
      if (r_number == '') {
        uni.showToast({
          title: '房间数不能为空',
          duration: 1000,
          icon: 'none'
        });
        return
      }else if (this.hotelname == ''){
        uni.showToast({
          title: '酒店名称不能为空',
          duration: 1000,
          icon: 'none'
        });
        return
      }else {
        let dat = {};
        if(this.bt_bol == true){//事中
          let su = [];
          console.log(butalist)
          for (let i in butalist) {
            su.push({
              passengerNo:butalist[i].passengerNo,
              name:butalist[i].userName,
              cardNo:butalist[i].cardNo,
              cardType:butalist[i].cardType,
              employeeType:1,
              phone:butalist[i].phone,
              costcenterName:butalist[i].costcenterName,
              deptName:butalist[i].deptName,
            })
          }
          dat = {
            travelType:istvals,
            city: nams,
            hotelName: this.hotelname,
            arrivalDate: stardate,
            departureDate: enddate,
            hotelLevel: this.stas,
            bedTypeName: this.beds,
            lowestPrice: price_floor,
            highestPrice: price_ceiling,
            bookCount: r_number,
            travelers: JSON.stringify(su),
            remark: this.remark,
          }
        } else {//事前
          dat = {
            travelType:istvals,
            city: nams,
            hotelName: this.hotelname,
            travelNo:butalist[0].travelNo,
            arrivalDate: stardate,
            departureDate: enddate,
            hotelLevel: this.stas,
            bedTypeName: this.beds,
            lowestPrice: price_floor,
            highestPrice: price_ceiling,
            bookCount: r_number,
            remark: this.remark,
          }
        }
        if (this.stlist.length == 0 && this.bt_bol == false){
          uni.showToast({
            title: '没有合适的出差申请！请重新选择',
            duration: 1000,
            icon: 'none'
          });
        }else {
          let res = await tork.hotelsave(dat);
          // console.log(res.code);
          if (res.code == 200) {
            uni.showToast({
              title: '提交成功,工作人员会及时联系你',
              duration: 2000,
              icon: 'none'
            });
            uni.navigateTo({
              url:'../../../pages-mydi/pages/mydi/IntentList/Intentlist?code=' + this.codes
            })
          } else {
            uni.showToast({
              title: res.message,
              duration: 2000,
              icon: 'none'
            });
          }
        }
      }
    },
  },
  computed: {
    ...mapState([
      'wx_Hotel', //搜索城市的酒店
      'userinfo',
      'butaluserlist', //人员
      'userinfo',
    ])
  },
  components: {
    calendar,
    ssCity,
    passengertwo,
  },
}
</script>

<style lang="scss" scoped>
/deep/.cu-bar .padding-lr .cu_li_lefts {
  width: 210rpx;
  font-size: 34rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #000;
}

/deep/ .pass_list .icon {
  width: 60rpx;
  color: #6e46fe;
  font-size: 45rpx;
  line-height: 1;
}
/deep/ .order-time .time-viewer {
  width: 500rpx;
  height: 90rpx;
  line-height: 90rpx;
  font-size: 30rpx;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}

.black_mu {
  color: #000000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.5;
  z-index: 888;
}

.isswflist {
  color: #000000;
  position: fixed;
  bottom: 0;
  left: 0;
  transition: all 0.3s ease;
  -webkit-transform: translateY(100%);
  transform: translateY(100%);
  max-height: 50%;
  overflow-y: scroll;
  width: 100%;
  z-index: 1200;
  background: #ffffff;

  .talist {
    width: 100%;
    border-top: 2upx solid #E5E5E5;
    padding: 20upx 0;
    display: flex;

    .tl_left {
      height: 120upx;
      width: 78%;
      margin-left: 2%;

      .tl_tops {
        display: flex;
        width: 100%;
        height: 50upx;
        font-size: 35upx;
        line-height: 50upx;
        color: #333333;

        .tl_rightl {
          width: 20%;
        }

        .tl_rights {
          width: 80%;
          margin-left: 10upx;
          overflow: hidden;
          text-overflow: ellipsis; //文本溢出显示省略号
          white-space: nowrap; //文本不会换行
        }
      }

      .tl_bots {
        width: 100%;
        height: 40upx;
        font-size: 30upx;
        line-height: 30upx;
      }

      .tl_botsb {
        width: 100%;
        height: 40upx;
        font-size: 30upx;
        line-height: 30upx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .tl_right {
      width: 20%;
      height: 120upx;
      display: flex;
      align-items: center;
      justify-content: center;

      .tldv {
        width: 100upx;
        height: 50upx;
        line-height: 50upx;
        text-align: center;
        font-size: 30upx;
        color: #E5E5E5;
        background: $uni-color-primary;
        border-radius: 60upx;
      }
    }
  }
}

.isswflist::-webkit-scrollbar {
  display: none;
}

.show {
  -webkit-transform: translateY(0);
  transform: translateY(0);
}

.hotel {
  height: auto;
  .add_ul {
    font-size: 30upx;
    color: #000000;
    line-height: 90upx;
    background: #ffffff;
    margin-bottom: 15upx;
    .apl_ok {
      display: flex;
      .frop_left {
        display: flex;
        width:25%;
        .f_icon_left {
          color: #ff0000;
          font-size: 20upx;
          margin: 0 3upx 0 10upx;
          transform: scale(0.8);
        }
        .f_icon_lefts {
          color: #ffffff;
          margin: 0 3upx 0 10upx;
          font-size: 20upx;
        }
        .apl_name {
          width: 150upx;
        }
      }
      .frop_pls {
        width: 71%;
        font-size: 30upx;
        display: flex;
        color: #808080;
        align-items: center;
        .ol_pth {
          display: flex;
          padding: 20upx 0;
          align-items: center;
          .olleft {
            width: 110upx;
            height: 80upx;
            font-size: 25upx;
            overflow: hidden;
            .pfls {
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .olright {
            margin-left: 20upx;
            width: 100%;
            line-height: 30upx;
            font-size: 25upx;
          }
        }
        .opls {
          width: 100%;
          display: flex;
          align-items: center;
          input {
            font-size: 30upx !important;
            width: 100%;
            color: black;
          }
          .input_css{
            width: 40%;
            height: 50upx;
          }
          .for_value {
            color: black;
          }
        }
      }
    }
  }
}

.cu_time {
  width: 100%;
  border-bottom: 2upx solid #F1F1F1;

  ::v-deep .icon {
    color: #567EFE;
  }
}
.box_tos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80upx;

  .in_chox {
    display: flex;
    height: 60upx;
    font-size: 28upx;
    line-height: 60upx;
    text-indent: 30upx;
  }
}
.first_css {
  margin-left: 20px;
  height: 150px;


  .opt_css {
    width: 60px;
  }

  .place_hname {
    display: flex;
    height: 25%;

    .input_css {
      width: 80px;

    }

    .place_css {
      display: flex;
      width: 160px;

      .opt_css {
        width: 60px;
        text-align: right;
      }
    }
  }

  .in_out {
    display: flex;
    height: 25%;

    .in_css {
      display: flex;
      width: 160px;

    }

    .out_css {
      display: flex;
    }

    .opt_css {
      width: 60px;
    }

    .input_css {
      width: 80px;
      color: #888888;
      font-size: 14px;
    }
  }

  .star_bed {
    display: flex;
    height: 25%;

    .star_css {
      display: flex;
      width: 160px;
    }

    .bed_css {
      display: flex;
    }

  }

  .price_css {
    display: flex;
    height: 25%;

    .input_css {
      width: 60px;
    }
  }
}

.second_css {
  .pers_room {
    display: flex;
    margin-left: 20px;
    height: 50px;
    line-height: 40px;

    .pers_css {
      display: flex;
      margin-right: 10px;

      .opt_css {
        width: 60px;

      }
    }

    .room_css {
      display: flex;

      .txt_css {
        width: 80px;
      }
    }

    .txt_css {
      font-size: 12px;
      padding-top: 5px;
      display: flex;
      width: 90px;

    }

    .opt_css {
      width: 50px;
    }

    .input_css {
      width: 38px;
      margin-top: 10px;
      margin-left: 4px;
      margin-right: 3px;

    }
  }

  /* .pers_id{
  margin-left: 20px;
  padding-top: 10px;
  height: 100px;
  .opt_css{
    display: flex;
    height: 33%;
  }
  .input_css{
    width: 70px;

  }
  .lis{
      width: 65px;
      margin-left: 10px;

  }
} */
}

.third_css {
  margin-top: 10upx;
  padding-bottom: 20upx;
  background-color: #FFFFFF;
  .input_css {
    width: 80%;
	text-align: left;
    height: 180upx;
    margin: 30upx auto;
  }
}

.addr {
  display: flex;
}

.cut_css {
  background-color: #567EFE;
  height: 28px;
}

.title_css {
  margin-left: 20px;
  font-size: 15px;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 28px;
}

.input_css {
  border: 1px solid #DFDFDF;
  height: 18px;
  min-height: 18px;
  text-align: center;
  font-size: 14px;
  margin-top: 3px;
}

.place_holder {
  font-size: 14px;
  text-align: center;
  color: #C1C1C1;
}

.lis {
  background-color: #ffffff;
  background-image: none;
  filter: none;
  border: 0;
  outline: none;
  height: 90upx;
  line-height: 90upx;
  font-size: 30upx;
  width: 100%;
  color: #888888;
  border-radius: 8px;
}

.cu_time {
  width: 100%;
  border-bottom: 2upx solid #F1F1F1;
}

.opt_css {
  font-size: 12px;
  padding-top: 5px;
}

.opt_css {
  /* select{
  background-color: #0C978D;
} */
}

.person_add {
  width: 110px;
  height: 25px;
  border-radius: 8px;
  margin-top: 18px;
  line-height: 25px;
  text-align: center;
  background: #567EFE;
  color: #FFFFFF;
  font-size: 12px;
  margin-left: 20px;

}

.person_del {
  margin-top: 18px;
  text-align: center;
  margin-left: 140px;

  width: 80px;
  height: 25px;
  font-size: 12px;
  line-height: 25px;
  border-radius: 8px;
  float: right;
  color: #FFFFFF;
  background: #567EFE;

}

.btn_sbm {
  width: 110px;
  height: 30px;
  border-radius: 8px;
  margin-top: 15px;
  line-height: 30px;
  text-align: center;
  background: #567EFE;
  color: #FFFFFF;
  font-size: 17px;
  font-weight: 700;
  display: block;

  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}
</style>
