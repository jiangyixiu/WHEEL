<template>
  <div class="banner">
    <mt-swipe>    
      <mt-swipe-item v-for="(value, key) in banners" :key="key">
          <img width="100%" v-bind:title="value.title" v-bind:src="value.imgPath">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>

import apiPath from "@/service/apiPath"
import {baseUrl} from '@/config/env'

export default {
  data() {
    return {
      banners: [] //banner集合
    };
  },
  mounted() {
    this.$axios.get(baseUrl + apiPath.banner.list, {
      params:{
        id: 1
      }
    }).then(res => {
        var data = res.data.data;
        // for(var i=0;i<data.length;i++){
        //     data[i].imgPath = data[i].imgPath.replace(/#/g, '');
        // }
        this.banners = data;
    });
  }
};
</script>

<style scoped>
.banner {
  height: 175px;
}
</style>
