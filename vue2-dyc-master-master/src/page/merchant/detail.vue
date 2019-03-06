<template>
  <div>
    <head-title-vue page-title="店铺详情"></head-title-vue>
    <!--mgTp8-->
    <div class="contentbox">
      <div class="banner">
        <img :src="merchant.img" width="100%" alt title>
      </div>
      <div class="shopname pdl95">
        <img :src="merchant.logo" width="75" height="75" class="wk75">
        <div class="jbred mBxCm">
          <div class="jbcontant">璀璨卡8.5折</div>
          <div class="banjiaox"></div>
          <div class="jbcontant ornBtn mlfu">璀璨卡8.5折</div>
          <div class="banjiaox ornBtn"></div>
        </div>
        <div class="mBxMid titlefoot">
          <div class="mFlex1 colo333">{{merchant.name}}</div>
          <div class="zanxin" :class="{true:'red'}[merchant.isCollect]" @click="collectOrCancel()"></div>
        </div>
      </div>

      <div class="mallinfotop bgfff">
        <div class="mallwarp colo333 ftn12">
          <div class="mBxMid dmt10">
            <div>评分：</div>
            <div class="fenshubox">
              <div class="pingboxs">
                <ul class="mBxMid pinglun" style="position:absolute; z-index:2;">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                <div class="bgFenshu" style="left: -39px;"></div>
              </div>
            </div>
          </div>
          <div class="mBxMid dmt10">
            <div>人均：80元 &nbsp;&nbsp; 菜品：川菜</div>
          </div>
          <div class="mBxMid pafBm15">
            <div>营业时间：AM11:00 - PM22:00</div>
          </div>

          <div class="mBxMid mallnavbox pafBm15 colo666">
            <article class="mFlex1">
              <span class="colo333 ftn16">251</span>全部菜品
            </article>
            <article class="mFlex1">
              <span class="colo333 ftn16">2</span>活动
            </article>
            <article class="mFlex1">
              <span class="colo333 ftn16">5</span>团购
            </article>
            <article class="mFlex1">
              <span class="colo333 ftn16">10</span>优惠券
            </article>
          </div>
          <div class="mBx pafBm15 shanghuNm">
            <a href="#" class="mBxCm shanghuBg03 mFlex1">
              <div class="phone"></div>
              <div>{{merchant.telphone}}</div>
            </a>
            <a href="#" class="mBxCm shanghuBg03 mFlex1">
              <div class="icoNum"></div>
              <div>{{merchant.address}}</div>
              <div class="sanjiao01New bkgdSz125"></div>
            </a>
            <!-- <span class="mFlex1 time"> <em class="YemIco bkgdSz125"></em></span> -->
          </div>
        </div>
      </div>

      <section class="mallinfobox">
        <div class="mallnavbox mBx mt10 bgfff colo333">
          <a href="javascript:void(0)" class="iboxmall mFlex1 mBxCm tipfff">
            <section>
              <div class="ico wm"></div>外卖
            </section>
          </a>
          
          <a href="javascript:void(0)" class="iboxmall mFlex1 mBxCm opacity60">
            <section>
              <div class="ico dw"></div>定位
            </section>
          </a>
          <a href="javascript:void(0)" class="iboxmall mFlex1 mBxCm tipfff">
            <section>
              <div class="ico dc"></div>点菜
            </section>
          </a>
          
          <a href="javascript:void(0)" class="iboxmall mFlex1 mBxCm opacity60">
            <section>
              <div class="ico pd"></div>排队
            </section>
          </a>
          
          <a href="javascript:void(0)" class="iboxmall mFlex1 mBxCm opacity60">
            <section>
              <div class="ico zf"></div>支付
            </section>
          </a>
        </div>

        <!--                <a href="javascript:void(0)" class="bgFff lt22 pad12 mBxJyCm mt10 shanghuD tipfff">
                                    <div class="">
                                        品牌故事
                                    </div>
                                    <div class="sanjiao01New bkgdSz125 ">
                                    </div>
        </a>-->
        <a
          href="javascript:void(0)"
          class="bgFff lt22 pad12 mBxJyCm mt10 shanghuD ftn12 colo666 tipfff"
        >
          <div class="kuai ornBtn"></div>
          <div class>
            <span class="coloornBtn ftn14">活动</span> / 共2条
          </div>
          <div class="sanjiao01New bkgdSz125"></div>
        </a>
        <div class="mallinfocontant bgfff">
          <div class="huimall bgf6f6f6 mBxMid">
            <img src="../../images/tryConpons.jpg">
            <div class="mFlex1 huimallright">
              <section class="title colo333 ftn15 dpd5">食神咖喱牛腩</section>
              <section class="title colo333 ftn14 dpd5 nowraps">一行简介一行简介一行简介</section>
              <section class="title colo333 ftn14 dpd5">&nbsp;</section>
              <section class="title colo666 ftn12 mBxMid">
                <div class="wmlist mFlex1">3月23日 至 4月27日</div>
                <div class="coloRed mr0">在线</div>
              </section>
            </div>
          </div>
        </div>

        <a
          href="javascript:void(0)"
          class="bgFff lt22 pad12 mBxJyCm mt10 shanghuD ftn12 colo666 tipfff"
        >
          <div class="kuai bge50059"></div>
          <div class>
            <span class="colobge50059 ftn14">团购</span> / 共2个
          </div>
          <div class="sanjiao01New bkgdSz125"></div>
        </a>
        <div class="mallinfocontant bgfff">
          <div class="huimall bgf6f6f6 mBxMid">
            <img src="../../images/tryConpons.jpg">
            <div class="mFlex1 huimallright">
              <section class="title colo333 ftn15 dpd5">食神咖喱牛腩</section>
              <section class="title colo333 ftn14 dpd5 nowraps">一行简介一行简介一行简介</section>
              <section class="title colo666 ftn12 dpd5">已售500剩200</section>
              <section class="title colo666 ftn14 mBxMid">
                <div class="wmlist mFlex1">
                  <span class="coloRed">￥5.00</span>
                  <span class="colo999 ftn12 ftnBon">￥45.00</span>
                </div>
              </section>
            </div>
          </div>
        </div>

        <a
          href="javascript:void(0)"
          class="lt22 bgfff pad12 mBxJyCm mt10 shanghuD ftn12 colo666 tipfff"
        >
          <div class="kuai bgcoloblue"></div>
          <div class>
            <span class="coloblue ftn14">优惠劵</span> / 共2张
          </div>
          <div class="sanjiao01New bkgdSz125"></div>
        </a>
        <div class="mallinfocontant bgfff">
          <div class="huimall bgf6f6f6 mBxMid">
            <img src="../../images/tryConpons.jpg">
            <div class="mFlex1 huimallright">
              <section class="title colo333 ftn15 dpd5">食神咖喱牛腩</section>
              <section class="title colo333 ftn14 dpd5 nowraps">一行简介一行简介一行简介</section>
              <section class="title colo666 ftn12 dpd5">已售500剩200</section>
              <section class="title colo666 ftn12 mBxMid">
                <div class="wmlist mFlex1">
                  <input type="button" value="立即领取" class="yellwbtn dmgr10 h25 lingqun">
                </div>
                <div class="coloRed mr0">免费</div>
              </section>
            </div>
          </div>
        </div>

        <a
          href="javascript:void(0)"
          class="bgFff lt22 pad12 mBxJyCm mt10 shanghuD ftn12 colo666 tipfff"
        >
          <div class="kuai ornBtn"></div>
          <div class>
            <span class="coloornBtn ftn14">推荐菜品</span> / 共22012124个
          </div>
          <div class="sanjiao01New bkgdSz125"></div>
        </a>

        <div class="footlistbox bgfff">
          <section @click="showDialog()">
            <div class="conimglist mg0">
              <img src="../../images/foot.jpg" width="100%">
              <span class="lotitle pdb2">糖醋里脊糖醋里脊糖糖醋里脊糖醋里脊糖醋里脊糖醋里脊醋里脊糖醋里脊</span>
              <span class="lotitle hauto coloec3333 pb5">￥80.00</span>
            </div>
          </section>

          <section>
            <div class="conimglist mg0">
              <img src="../../images/foot.jpg" width="100%">
              <span class="lotitle pdb2">糖醋里脊糖醋里脊糖糖醋里脊糖醋里脊糖醋里脊糖醋里脊醋里脊糖醋里脊</span>
              <span class="lotitle hauto coloec3333 pb5">￥80.00</span>
            </div>
          </section>

          <section>
            <div class="conimglist mg0">
              <img src="../../images/foot.jpg" width="100%">
              <span class="lotitle pdb2">糖醋里脊糖醋里脊糖糖醋里脊糖醋里脊糖醋里脊糖醋里脊醋里脊糖醋里脊</span>
              <span class="lotitle hauto coloec3333 pb5">￥80.00</span>
            </div>
          </section>

          <section>
            <div class="conimglist mg0">
              <img src="../../images/foot.jpg" width="100%">
              <span class="lotitle pdb2">糖醋里脊糖醋里脊糖糖醋里脊糖醋里脊糖醋里脊糖醋里脊醋里脊糖醋里脊</span>
              <span class="lotitle hauto coloec3333 pb5">￥80.00</span>
            </div>
          </section>
          <section>
            <div class="conimglist mg0">
              <img src="../../images/foot.jpg" width="100%">
              <span class="lotitle pdb2">糖醋里脊糖醋里脊糖糖醋里脊糖醋里脊糖醋里脊糖醋里脊醋里脊糖醋里脊</span>
              <span class="lotitle hauto coloec3333 pb5">￥80.00</span>
            </div>
          </section>
          <section>
            <div class="conimglist mg0">
              <img src="../../images/foot.jpg" width="100%">
              <span class="lotitle pdb2">糖醋里脊糖醋里脊糖糖醋里脊糖醋里脊糖醋里脊糖醋里脊醋里脊糖醋里脊</span>
              <span class="lotitle hauto coloec3333 pb5">￥80.00</span>
            </div>
          </section>
          <div class="clear"></div>
        </div>
        <a
          href="javascript:void(0)"
          class="bgFff lt22 pad12 mBxJyCm mt10 shanghuD ftn12 colo666 tipfff"
        >
          <div class="kuai ornBtn"></div>
          <div class>
            <span class="coloornBtn ftn14">评论</span> / 共22012124条
          </div>
          <div class="sanjiao01New bkgdSz125"></div>
        </a>
        <div class="mallinfocontant bgfff">
          <div class="huimall bgf6f6f6 mBxMid">
            <div class="mFlex1 reviewinfoContnat colo666">
              <div class="mBxMid">
                <div class="touxiangbox">
                  <article class="boy"></article>
                </div>
                <section class="mBxMid mFlex1">
                  <div class="colo333 pdl5 mr0">落叶**家</div>
                  <div class="kastyle cck"></div>
                  <div class="vnbox v5"></div>
                </section>
                <div class="fenshubox">
                  <div class="pingboxs">
                    <ul class="mBxMid pinglun" style="position:absolute; z-index:2;">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                    <div class="bgFenshu" style="left: -39px;"></div>
                  </div>
                </div>
              </div>
              <div
                class="dpdt10 pdb10"
              >商品介绍详情，代表了全新的革新精神与创产品被更多的赋予了生命的意义。我们希望通过他来传递一种生活方式，同时传递出人与人之间的关爱。让每个人都能...</div>
              <div class="colo666 ftn12 tiaoshu borTpXx">2014-04-12</div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <foot-vue></foot-vue>

    <div class="alertMengCengClient" v-if="showAlert" @click="hideDialog()"></div>
    <div class="alertDailog" v-if="showAlert">
      <span class="close bkgdSz125" @click="hideDialog()"></span>
      <img src="../../images/foot.jpg" width="100%" class="dmt10">
      <div class="mBxMid colo333 boxl">
        <div class="mFlex1">{{showDishName}}</div>
        <div>
          <span class="dcoleb3333">￥{{showDishPrice}}</span>/份
        </div>
      </div>
      <div class="mBxMid colo666 boxl dpd5 ftn12 dlogcontant">
        <div class="mFlex1">{{showDishInfo}}</div>
      </div>
    </div>

    <loading-vue :vloading="vloading"></loading-vue>
    <check-login-vue :vexpired="vexpired" :vexpired-msg="vexpiredMsg"></check-login-vue>
    <alert-vue :valert="valert" :valert-msg="valertMsg"></alert-vue>
  </div>
</template>

<script>
import apiPath from "@/service/apiPath";
import headTitle from "@/components/header/headTitle";
import foot from "@/components/footer/foot";
import loading from "@/components/load/loading";
import checkLogin from "@/components/login/checkLogin";
import alert from '@/components/pop/alert'

export default {
  data() {
    return {
      showAlert: false, //是否显示弹层-菜品描述
      showDishSrc: "", //展示 - 菜品图片
      showDishName: "", //展示 - 菜品名称
      showDishPrice: 0, //展示 - 商品价格
      showDishInfo: "", //展示 - 商品详情

      merchantId: 0, //商户id
      merchant: {}, //商户信息

      vloading: false, //loading提示是否显示
      vexpired: false,
      vexpiredMsg: "",
      valert: false,
      valertMsg: '',
    };
  },
  beforeMount() {
    this.merchantId = this.$route.params.merchantId;
  },
  mounted() {
    this.getAxios(
      apiPath.merchant.detail,
      {
        id: this.merchantId
      },
      {
        that: this
      }
    ).then(response => {
      this.merchant = response.data;
    });
  },
  components: {
    headTitleVue: headTitle,
    footVue: foot,
    checkLoginVue: checkLogin,
    loadingVue: loading,
    alertVue: alert
  },
  methods: {
    //隐藏弹层
    hideDialog() {
      this.showAlert = false;
    },
    //显示弹层 - 展示菜品详情
    showDialog() {
      this.showAlert = true;
    },
    collectOrCancel() {
      //1收藏  2取消收藏
      let isCollect = this.merchant.isCollect ? 2 : 1;
      //this.$refs.axios.requestNeedLogin();
      this.postAxios(
        apiPath.user.collect, 
        {
            type: 1,
            isCollect: isCollect
        },
        {
            that: this,
            checkLogin: true,
            noLogin(object){
                object.vexpired = true
                object.vexpiredMsg = '登录后才可以收藏商家哦^_^'
            }
        }
      ).then(response => {
          //console.log(response)
          //成功
          if(response.code === 0){
            this.merchant.isCollect = !this.merchant.isCollect
          }
          
      }).catch(error => {
          console.log(error);
      });
    }
  }
};
</script>

<style scoped>
@import url("../../style/mall.css");
</style>


