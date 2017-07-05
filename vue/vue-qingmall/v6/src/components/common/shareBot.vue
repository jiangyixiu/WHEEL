<script>
import { isClient } from 'js/global'
export default {
  props: {
    url: {
      default: null
    }
  },
  data() {
    return {
      isClient
    }
  }
}
</script>
<template>
  <div class="share-bot" v-if="!isClient">
    <div class="logo">
      <img src="../../assets/img/logo.png" alt="">
    </div>
    <a :href="url" class="btn" v-if="url">立即下单</a>
    <a href="https://applink.sythealth.com/" class="btn" v-else>到轻+查看更多</a>
  </div>
</template>
<style lang="scss">
.share-bot {
  .logo {
    width: 40%;
    margin: 0 auto;
    padding: 3em 0;
    text-align: center;
    img {
      max-width: 100%;
    }
  }
  .btn {
    display: block;
    background: #ff508a;
    color: #fff;
    line-height: 3em;
    text-align: center;
    height: 3em;
    font-size: 1.2em;
  }
}
</style>
