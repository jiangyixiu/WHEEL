<template>
<div class="tests">
  <p class='ps'>{{formid}}</p>
  <p class='remTest'>123</p>
  <div>{{userInfo.data}}</div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      item: 'lily',
      formid: this.getUrlParameter('form'),
      userInfo: {data: ''}
    }
  },
  methods: {
    useRem () {
      let Html = document.getElementsByTagName('html')
      let w = document.documentElement.clientWidth
      let scale = w / 375
      if (scale >= 2) {
        scale = 2
      }
      Html[0].style.fontSize = 12 * scale + 'px'
    },
    getUrlParameter (sParam) {
      let sPageURL = decodeURIComponent(window.location.search.substring(1))
      let sURLVariables = sPageURL.split('&')
      let sParameterName
      let i

      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=')

        if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1]
        }
      }
    }
  },
  created () {
    this.useRem()
    axios.get('https://api.sythealth.com/mall/v2/item/getitembyitemid', {
      params: {
        itemid: '5903265af5b6164511e469a4'
      }
    }).then(res => {
      res = res.data
      this.userInfo = res
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/css/myreset.css';

.tests{
  .ps{
    height:4.166667rem;
    background-color: rebeccapurple;
    color:#fff;
    text-align: center
  }
  .remTest{
    background-color:red;
    height:4.166667rem;
  }
}

</style>
