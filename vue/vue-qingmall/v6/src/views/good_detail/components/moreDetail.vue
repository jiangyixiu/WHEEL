<script>
import { setUrlParameter } from 'js/global'
export default {
  props: {
    query: {
      default: {}
    },
    data: {
      default: {}
    }
  },
  data() {
    let ua = navigator.userAgent.toLowerCase()
    let isAndroid = false
    if (ua.match(/Android/i) === 'android') {
      isAndroid = true
    }
    return {
      isAndroid
    }
  },
  methods: {
    play(params) {
      window.fitness_app && window.fitness_app.onEvent(9, params)
    },
    getUrl(item) {
      let params = null
      let { userid, nickname, codeid, appversion } = this.query
      if (item.jumpType === 101) {
        // 商品详情页
        params = {
          userid,
          nickname,
          codeid,
          appversion,
          productid: item.params
        }
        return 'good_detail.html' + setUrlParameter(params)
      } else if (item.jumpType === 102) {
        // 外接H5
        params = {
          userid,
          nickname,
          appversion
        }
        return this.params.replace(/(^\w+:)/, 'https:') + setUrlParameter(params)
      } else if (item.jumpType === 103) {
        // 社区详情
        return 'fitness://getnoteandcommbyid?noteid=' + item.params
      } else if (item.jumpType === 106) {
        // 商品详情页SKU
        params = {
          userid,
          nickname,
          codeid,
          appversion,
          itemid: item.params
        }
        return 'good_detail.html' + setUrlParameter(params)
      }
    }
  }
}
</script>
<template>
  <div class="more-detail">
    <div class="more-detail-title-wrapper">
      <h1 class="more-detail-title">商品详情</h1>
    </div>
    <div id="desc">
      <template v-for="item in data.productPromotionDto">
        <!--不跳转-->
        <template v-if="item.jumpType==100">
          <p class="bannerPics">
            <img :src="item.pic">
          </p>
        </template>
        <!--视频-->
        <template v-if="item.jumpType==107">
          <div id="showVideo" style="display: block;">
            <div class="android-video" style="position: relative; float: left;" v-if="isAndroid">
              <img :class="item.pic">
              <div class="play" style="position: absolute; width: 100%; height: 100%; left: 0px; top: 0px;" @click="play(item.params)">
                <img src="img/seven_ic_play.png" style="width: 15%; position: absolute;left:0;right:0;top:0;bottom:0;margin:auto;">
              </div>
            </div>
            <div class="ios-video" style="box-sizing: border-box;" v-if="!isAndroid">
              <video width="100%" controls="" style="background-color:#F4F5F9;box-sizing: border-box;float:left;display: inline-block;vertical-align: baseline;" :poster="item.pic">
                <source type="video/mp4" style="box-sizing:border-box" :src="item.params">Your browser does not support HTML5 video. </video>
            </div>
          </div>
        </template>
        <!--商品详情页-->
        <template v-if="item.jump>100&&item.jump<107">
          <p class="bannerPics">
            <a :href="getUrl(item)">
              <img :src="item.pic">
            </a>
          </p>
        </template>
      </template>
      <img v-for="item in data.serviceInfo" :src="item">
    </div>
  </div>
</template>

<style lang="scss">
.more-detail {
  color: #aaa;
  z-index: 0;
  background: #f8f8f8;
  box-shadow: 0 2px 10px 0 #f0f0f0 inset;
  img {
    max-width: 100%;
  }
}

.more-detail-title-wrapper {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAAICAYAAAB+gPSuAAAAAXNSR0IArs4c6QAAAkhJREFUWAntlz1uG0EMhXdX/62gJkBOoMZXyDXiXlfwIXIDQQdIAF3CV0ijWoXgdO6kAJJ2x++jycWukHLTzQAEfx75OEMRslUWOrvd7mtK6YfkG35Zlq+Sl81mc8LPJ0/gf02g9OX7reVbdptoAd8lT3kJu1PJ9tATqPybr7d8NGEhwYZumPnyBLoTKLfb7ZsCXyKobz3+BJsolmT/lW6ksWs0cYnZ4UuTU3tNE9pxq1esqaqq0WK3XFEPRn34kYdWLGq69RYDj17OAbf1Q3vMcrq4rgAXuZEPX1vnd7Qc4qPRqIcHl3Sv3jnbO8HTeYPxeU3tmOF1XafxeNybH3Xk6BjfZDKxmqhHIxzup/wW9/taPOrRxL2mtfEbHXD1sJ7o6/Wa3G/voZw0m80sF3uxWDTn89m0XON2LuOEdrVa2bvUpzkcDmm9XpNnuZWM3tEHYr7IeJmJf0g89hP8HHrXjkEQC+nxyuGDKnQhlhvb6unhvvHLtzh51IB3asx+JKb+Mea1Fncu+sBtnG6bA+49WhoWCeHA7xxl5CrR7gkWRco3UznQW01wABBE2wU6s4STPOrA0VrIAgHjgMtv64MLTEtl9wSPnPv9DpTQCAlacGI9+3a7ma9FS9PpFNh6aPkKYgTizOfzQmK9Ina5XMLs5ZK0XC5ZPoufTqfieDyWWj7z9/u99RnrIa/K/R4s8WB8Yb/0P+BzYFnnCQw9gUpL9iJ5fyQmBvYYz36ewJATqPiVq0V7kvwU8R8Em1j+BTzkqDPXvybwAVuXEf8z+dp2AAAAAElFTkSuQmCC);
  background-repeat: no-repeat;
  -moz-background-size: 35%;
  -o-background-size: 35%;
  background-size: 35%;
  background-position: 100% 50%
}

.more-detail-title {
  margin: 0;
  padding: 15px 0 10px;
  font-weight: 400;
  text-align: center;
  font-size: 14px;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAAICAYAAAB+gPSuAAAAAXNSR0IArs4c6QAAAipJREFUWAntmD1uG0EMhTOzqyKAqgBSpROo8RVyjRxAV/AhfASpdwpdwlfIDVQEMNRYlSDo3+8jyMVkI6SSqswANDmP5OMMh17ATl/qqh14cAcWi8Xker2+SL5TKqX0JnmezWa/04NrV/r/vAM+fL80fN/KVmgAPyRPbQlWu3bg3h3wL98fw0cNH8iXJCMtl8s8Go3SeDzO0+mUr2Jer9e5aZqsleyHxhW93W7zcDjkM5qR3W6HJicdDocGW8swNDj6eDx2mGzDwE+nUx4MBknasPP5bLyRp73h7MMX2OVygd94S8zxqJFir7vm0o5cMInFE0OtiAUsMcdvxQZmOs4KLzmAaOfiAajTSAdufWfPudxvZ8eOfNeRY/d3Dlx2vzIen/NZTthRg7sHJxj7XkzkhbZeERMc0visTj9f7/oVv+TWeo9ES1ZEXq1WuW3bNJlMAkubzYbZs4NySZfkw/cXvt/vO0ycyYfPsNJm+IILXQ5jPKDwbvDg8oZx+W6wwPTLwhA34OHjIbDh9jzzEQdYxpFPDDnS5iOPc3B1acvBBx7caAnxhhV7ezCCHQu/5cMDTh7niBjnsfoFV1ePM5Y5Ed/jit7Y2fD5mamDxF063n5+7D3eavbtOHdo+a3/xIHprI369s8BbOmPgpGLpK7agbt2YD6fv2ogf9wi1ey9Mdl11Q48rAMasmfJR78AGL46gP3O1P1dO2D/atFfuxq2nyJ+R7AlT/g+AWbD9KoRQeVAAAAAAElFTkSuQmCC);
  background-repeat: no-repeat;
  -moz-background-size: 35%;
  -o-background-size: 35%;
  background-size: 35%;
  background-position: 0 50%
}
</style>
