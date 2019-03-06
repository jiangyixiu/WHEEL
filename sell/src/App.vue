<template>
  <div>
    <v-header></v-header>
    <!--导航-->
    <ul class="tab border-1px">
      <li class="tab-item">
        <router-link to="/goods">商品</router-link>
      </li>
      <li class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </li>
      <li class="tab-item">
        <router-link to="/seller">商家</router-link>
      </li>
    </ul>
    <!--路由视口-->
    <router-view></router-view>
  </div>
</template>

<script>

  import header from './components/header/header.vue';

  export default {
    components: {
      'VHeader': header
    }
  };

</script>

<style lang="less" rel="stylesheet/less">
  @import "./common/style/index.less";
  .tab {
    display: flex;
    line-height: 40px;
    .border-1px(rgba(7, 17, 27, .1));
    .tab-item {
      flex: 1;
      text-align: center;
      & > a {
        display: block;
        font-size: 14px;
        color: @tabFontColor;
      }
      & .active {
        color: @active;
      }
    }
  }
</style>
