<script>
import { isClient } from 'js/global'
export default {
  props: {
    openUrl: {
      default: ''
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    this.isShow = !isClient
  }
}
</script>
<template>
  <div class="share-top" v-if="isShow">
    <div class="box">
      <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.sythealth.fitness" class="btn">免费下载</a>
      <a :href="'https://applink.sythealth.com/'+openUrl" class="btn">打开</a>
      <div class="logo">
        <img src="../../assets/img/logo_small.png" alt="">
      </div>
      <div class="center">
        <h5>想减肥 上轻加</h5>
        <p class="ellipsis">更多人信赖的移动减肥专家</p>
      </div>
  
    </div>
  </div>
</template>
<style lang="scss">
.share-top {
  height: 60px;
  .box {
    position: fixed;
    top: 0;
    left: 0;
    transition: bottom .6s;
    width: 100%;
    z-index: 4;
    box-sizing: border-box;
    font-size: 1.1em;
    padding: .5em;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    background: #fff;
  }
  .logo {
    float: left;
    img {
      height: 3.5em;
    }
  }
  .btn {
    float: right;
    padding: 0 .5em;
    margin-top: .5em;
    line-height: 2.4em;
    color: #fff;
    background: rgb(255, 79, 137);
    border-radius: .3em;
    margin-right: .5em;
    &:first-child {
      margin-right: 0;
    }
  }
  .center {
    margin-left: 3.8em;
    margin-right: 9em;
    h5 {
      font-size: 1.2em;
      font-weight: normal;
    }
    p {
      margin: 0;
      color: #888;
    }
  }
}
</style>
