<template>
  <div>
    <head-vue></head-vue>
    <banner-vue></banner-vue>

    <form>
      <div class="searchbar mBxMid">
        <section @click="clickSection()" class="mFlex1">
          <div :class="{true:'bkgdSz125 mBxMid wauto', false:'bkgdSz125 mBxMid'}[buttonShow]">
            <input type="search" ref="input" @blur="cancelSearch()" placeholder="请输入要搜索的内容" class="searctxt mFlex1">
          </div>
        </section>
        <input type="submit" v-show="buttonShow" @click="search()" value="确定" class="searchSubmitBtn">
      </div>
    </form>
    <section class="dpdt10 indexlist">
      <div class="mBx blockbox">
        <router-link tag="div" class="mFlex1 mBxMid" :to="{name:'merchantWaiMai'}">
          <section class="warpico jwm bkgdSz49">
            <p class="colo333 ftn14">外卖</p>
            <p class="colo666 ftn12">周边美食大全</p>
          </section>
        </router-link>
        <router-link tag="div" class="mFlex1 mBxMid" :to="{name: 'merchantDingWei'}">
          <section class="warpico dwz bkgdSz49">
            <p class="colo333 ftn14">订位子</p>
            <p class="colo666 ftn12">预定心仪的餐厅</p>
          </section>
        </router-link>
      </div>
      <div class="mBx blockbox">
        <div class="mFlex1 mBxMid">
          <section class="warpico dndc bkgdSz49">
            <p class="colo333 ftn14">点菜·付款</p>
            <p class="colo666 ftn12">周边美食大全</p>
          </section>
        </div>
        <div class="mFlex1 mBxMid">
          <section class="warpico pd bkgdSz49">
            <p class="colo333 ftn14">排队</p>
            <p class="colo666 ftn12">远程领取号码</p>
          </section>
        </div>
      </div>
      <div class="mBx blockbox">
        <div class="mFlex1 mBxMid">
          <section class="warpico tg bkgdSz49">
            <p class="colo333 ftn14">团购</p>
            <p class="colo666 ftn12">最划算的美食</p>
          </section>
        </div>
        <div class="mFlex1 mBxMid">
          <section class="warpico wdms bkgdSz49">
            <p class="colo333 ftn14">我的美食</p>
            <p class="colo666 ftn12">订单、优惠</p>
          </section>
        </div>
      </div>
      <router-link tag="div" class="mBx blockbox" :to="{name:'merchant'}">
        <div class="mFlex1 mBxMid">
          <section class="warpico mslb bkgdSz49">
            <p class="colo333 ftn14">全部美食列表</p>
            <p class="colo666 ftn12">最好吃的美食在这里！</p>
          </section>
        </div>
      </router-link>
    </section>
    <foot-vue></foot-vue>
    <navigation-vue></navigation-vue>
  </div>
</template>

<script>
import head from "@/components/header/head";
import foot from "@/components/footer/foot";
import navigation from "@/components/common/navigation";
import banner from "@/components/common/banner";

export default {
  data() {
    return {
      // content: '大悦城'
      buttonShow: false
    };
  },
  components: {
    headVue: head,
    footVue: foot,
    navigationVue: navigation,
    bannerVue: banner
  },
  methods: {
    clickSection: function() {      
        this.buttonShow = true;
        this.$refs.input.focus();
    },
    cancelSearch: function(){
        this.buttonShow = false;
    },
    search(){
      let text = this.$refs.input.value;
      this.$router.push('/merchant/index');      
    }
  }
};
</script>

<style scoped>
@import "../../style/index.css";

.searchSubmitBtn {
  height: 30px;
  padding: 0px 16px;
  margin-left: 5px;
  color: #fff;
  border-radius: 3px;
  background: #fbb900;
  overflow: hidden;
}
input{
    font-size: 12px;
}
</style>
