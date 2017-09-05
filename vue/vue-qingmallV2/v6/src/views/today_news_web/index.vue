<template>
  <div>
    <div id="header">
      <div>
        <img src="./img/head_pic.png" />
        <img src="./img/logo.png" class="logo" />
      </div>
      <h1>要减肥 上轻加</h1>
    </div>
  
    <div class="para_wrap">
      <div class="para_title">
        <div>
          <img src="./img/longline.png" />
          <h1>轻加，每分每秒</h1>
          <img src="./img/longline.png" />
        </div>
        <h3>都有来自全世界的轻友在这里流下他们的汗水</h3>
      </div>
    </div>
  
    <div class="scroll">
      <ul class="users_wrap" id="users_wrap">
        <li v-for="user in common_user" :key="user.key" :class="{ opacity_zero: user.opacity_zero, 'height_zero': user.height_zero }">
          <p>
            <img v-bind:src="user.headpic" />
            <span>{{user.name}}</span>
          </p>
          <h3>{{user.desc}}</h3>
          <h2>{{user.type}}
            <span>{{user.kcal}}</span> 千卡</h2>
        </li>
      </ul>
    </div>
  
    <div class="para_wrap">
      <div class="para_title">
        <div>
          <img src="./img/point.png" class="point" />
          <h1 style="margin:0 3.4rem">量身定制瘦身方案库</h1>
          <img src="./img/point.png" class="point" />
        </div>
        <h3 style="margin-top:-.45rem">轻加带你一直瘦瘦瘦瘦瘦瘦瘦瘦瘦！</h3>
      </div>
    </div>
  
    <div id="cases">
      <p class="cases_decs">轻加针对不同人群定制的专属减肥方案
        <br/>提供上百种专业瘦身课程
        <br/>运动，饮食，瘦身，各种器械和阶段减肥目标组合编排
        <br/>适用于最广泛的减肥伙伴
      </p>
      <ul>
        <li v-for="cases in case_library" :key="cases.key">
          <img v-bind:src="cases.img" class="case_bg">
          <h1>
            <span>{{cases.name}}</span>
            <template v-if="cases.push">
              <img src="./img/push_icon.png" style="width:1.5666667rem;margin-top:-.25rem" />
            </template>
          </h1>
          <h2>{{cases.number}}人参加</h2>
          <img src="./img/recommend.png" class="recommend" />
        </li>
      </ul>
    </div>
  
    <div class="para_wrap">
      <div class="para_title">
        <div>
          <img src="./img/point.png" class="point" />
          <h1 style="margin:0 3.4rem;backgrouond-position:60% center;">轻加社区&分享减肥成果</h1>
          <img src="./img/point.png" class="point" />
        </div>
        <h3 style="margin-top:-.45rem">逛社区，找拍档，你不是一个人在战斗</h3>
      </div>
    </div>
  
    <div id="community">
      <p class="cases_decs">逛社区，收集瘦身经验
        <br/>交流减肥心得，浏览海量干货
        <br/>进阶瘦身达人
      </p>
      <div class="pic_wall">
        <div>
          <p>
            <img src="./img/pic_wall1.png">
          </p>
          <p>
            <img src="./img/pic_wall2.png">
          </p>
          <p>
            <img src="./img/pic_wall3.png">
          </p>
        </div>
        <div style="-webkit-flex:3.04;flex:3.04;">
          <p>
            <img src="./img/pic_wall4.png">
          </p>
          <p>
            <img src="./img/pic_wall5.png">
          </p>
        </div>
        <div>
          <p>
            <img src="./img/pic_wall6.png">
          </p>
          <p>
            <img src="./img/pic_wall7.png">
          </p>
          <p>
            <img src="./img/pic_wall8.png">
          </p>
        </div>
      </div>
    </div>
  
    <div class="para_wrap">
      <div class="para_title">
        <div>
          <img src="./img/shortline.png" />
          <h1>轻加新玩法，奖金挑战赛</h1>
          <img src="./img/shortline.png" />
        </div>
        <h3>付押金参加奖金挑战，每天锻炼返还押金</h3>
        <h3>还有额外抽奖机会，最高可达299元现金</h3>
      </div>
    </div>
  
    <div class="scroll2">
      <ul class="users_wrap2" id="users_wrap2">
        <li v-for="user in bonus_user" :key="user.key" :class="{ opacity_zero: user.opacity_zero, 'height_zero': user.height_zero }">
          <img v-bind:src="user.headpic" />
          <span>{{user.name}}</span>
          <span>{{user.desc}}</span>
        </li>
      </ul>
    </div>
    <div class="videoWrap" :class="{play: play}">
      <video ref="video" v-show="play" width="100%" height="100%" x-webkit-airplay="true" playsinline="true" @pause="onPause" src="http://file2.sythealth.com/plancenter/veido/v2/ad/ota_20170612/1499832572931/ota_20170612.mp4">
      </video>
      <img src="./img/video_pic.png" v-show="!play">
      <img class="videoPlay" v-show="!play" @click="videoPlay" src="./img/playBtn.png" />
      <div class="videoPause" :class="{play: play}" @click="videoPause">&times;</div>
    </div>
  
    <div id="footer" v-show="!play">
      <a href="https://applink.sythealth.com/" class="btn">打开</a>
      <a class="btn" id="download" v-on:click="this.statistics">立即下载</a>
      <div class="footer_logo fl">
        <img src="./img/logo.png" />
      </div>
      <div class="center">
        <h5>要减肥 上轻加</h5>
      </div>
      <div class="footer_mask"></div>
    </div>
  
    <div style="height:6.833rem"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      play: false,
      pause: true,
      common_user: [
        {
          name: '我要瘦',
          headpic: require('./img/headpic1.png'),
          desc: '刚刚完成了「7分钟燃脂操全身塑造」',
          type: '燃脂:',
          kcal: '197.0',
          opacity_zero: false,
          height_zero: false
        },
        {
          name: '西西小狐狸',
          headpic: require('./img/headpic2.png'),
          desc: '刚刚完成了「7分钟燃脂操全身塑造」',
          type: '燃脂:',
          kcal: '190.0',
          opacity_zero: false,
          height_zero: false
        },
        {
          name: '丸子',
          headpic: require('./img/headpic3.png'),
          desc: '刚刚完成了「饮食打卡」',
          type: '共摄入: ',
          kcal: '11',
          opacity_zero: false,
          height_zero: false
        },
        {
          name: '吧唧',
          headpic: require('./img/headpic4.png'),
          desc: '刚刚完成了「高速身体塑形」',
          type: '燃脂:',
          kcal: '124.0',
          opacity_zero: false,
          height_zero: false
        },
        {
          name: '不二哥',
          headpic: require('./img/headpic5.png'),
          desc: '刚刚完成了「加速燃脂阶段」',
          type: '燃脂:',
          kcal: '182.0',
          opacity_zero: false,
          height_zero: false
        }
      ],
      bonus_user: [
        {
          name: '天使也掉毛',
          headpic: require('./img/headpic6.png'),
          desc: '获得100元现金',
          opacity_zero: false,
          height_zero: false
        },
        {
          name: ' 久念',
          headpic: require('./img/headpic7.png'),
          desc: '获得10元现金',
          opacity_zero: false,
          height_zero: false
        },
        {
          name: '三荀',
          headpic: require('./img/headpic8.png'),
          desc: '获得10元现金',
          opacity_zero: false,
          height_zero: false
        },
        {
          name: '小桃子',
          headpic: require('./img/headpic9.png'),
          desc: '获得299元现金',
          opacity_zero: false,
          height_zero: false
        },
        {
          name: '胖猫一只',
          headpic: require('./img/headpic10.png'),
          desc: '获得10元现金',
          opacity_zero: false,
          height_zero: false
        }
      ],
      case_library: [
        {
          name: '盆底肌训练',
          img: require('./img/cases_bg1.png'),
          number: '98858',
          push: true
        },
        {
          name: '急速全身燃脂训练',
          img: require('./img/cases_bg2.png'),
          number: '328933'
        },
        {
          name: '轻盈纤体早餐',
          img: require('./img/cases_bg3.png'),
          number: '333450'
        },
        {
          name: '超低卡减脂快手早餐',
          img: require('./img/cases_bg4.png'),
          number: '161202'
        }
      ]
    }
  },
  methods: {
    useRem() {
      let Html = document.getElementsByTagName('html')
      let w = document.documentElement.clientWidth
      let scale = w / 375
      if (scale >= 2) {
        scale = 2
      }
      Html[0].style.fontSize = 12 * scale + 'px'
    },
    getUrlParameter(sParam) {
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
    },
    hasClass(elem, cls) {
      cls = cls || ''
      if (cls.replace(/\s/g, '').length === 0) return false
      return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ')
    },
    addClass(ele, cls) {
      let _this = this
      if (!_this.hasClass(ele, cls)) {
        ele.className = ele.className === '' ? cls : ele.className + ' ' + cls
      }
    },
    removeClass(ele, cls) {
      let _this = this
      if (_this.hasClass(ele, cls)) {
        var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' '
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
          newClass = newClass.replace(' ' + cls + ' ', ' ')
        }
        ele.className = newClass.replace(/^\s+|\s+$/g, '')
      }
    },
    dataScroll() {
      const commonUserLastIndex = this.common_user.length - 1
      const bonusUserLastIndex = this.bonus_user.length - 1
      const timeOutPromise = (f, time) => {
        return new Promise(function (resolve, reject) {
          setTimeout(() => {
            resolve(f())
          }, time)
        })
      }
      const scroll = async () => {
        await timeOutPromise(() => {
          this.common_user[0].opacity_zero = true
          this.common_user[commonUserLastIndex].opacity_zero = false
          this.bonus_user[0].opacity_zero = true
          this.bonus_user[bonusUserLastIndex].opacity_zero = false
        }, 800)
        await timeOutPromise(() => {
          this.common_user[0].height_zero = true
          this.common_user[commonUserLastIndex].height_zero = false
          this.bonus_user[0].opacity_zero = true
          this.bonus_user[bonusUserLastIndex].opacity_zero = false
        }, 800)
        const commonUserShift = this.common_user.shift()
        this.common_user.push(commonUserShift)
        const bonusUserShift = this.bonus_user.shift()
        this.bonus_user.push(bonusUserShift)
      }
      setInterval(scroll, 2000)
    },
    userdevice() {
      const ua = navigator.userAgent.toLowerCase()
      const downlink = document.getElementById('download')
      if (/iphone/ig.test(ua) || /ipad/ig.test(ua)) {
        downlink.setAttribute('href', 'https://itunes.apple.com/us/app/%E8%BD%BB%E5%8A%A0-%E8%96%84%E8%8D%B7%E9%A5%AE%E9%A3%9F%E8%B0%B1%E7%98%A6%E8%BA%AB%E8%BD%AF%E4%BB%B6/id665855293?mt=8&uo=4')
      } else if (/android/ig.test(ua)) {
        // 如果是微信客户端，就转到引导页
        if (/micromessenger/ig.test(ua)) {
          downlink.setAttribute('href', 'https://applink.sythealth.com/')
        } else {
          axios
            .get('https://file.sythealth.com/app/info/toutiao/com.sythealth.fitness.json')
            .then(function (ret) {
              downlink.setAttribute('href', ret.data.downloadUrl)
            })
        }
      }
    },
    statistics() {
      axios.get('https://fireye.sythealth.com/ws/fireye/v2/event/saveevent', {
        params: {
          eventid: '596870ad3ef8b009f8b1468d'
        }
      })
    },
    videoPlay() {
      this.$refs.video.play()
      this.play = true
    },
    videoPause() {
      this.play = false
      this.$refs.video.pause()
    },
    onPause() {
      this.play = false
    }
  },
  mounted() {
    this.useRem()
    this.dataScroll()
    this.userdevice()
  }
}
</script>

<style lang="scss">
@import '../../common/css/myreset.css';

.btn {
  display: block;
}

img {
  width: 100%;
}

// 播放器
.videoWrap {
  position: relative;
  width: 25rem;
  height: 14.041667rem;
  margin: 0 auto;
  &.play {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgba(0, 0, 0, .8);
  }
  &.pause {
    z-index: -999;
    display: inline-block;
  }
  .videoPlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 4rem;
    height: 4rem;
  }
  .videoPause {
    display: none;
    &.play {
      display: inline-block;
      position: fixed;
      top: 6rem;
      right: 2rem;
      font-size: 3rem;
      z-index: 9999;
      color: #fff;
    }
  }
}

#header {
  div {
    position: relative;
  }
  .logo {
    width: 5.416667rem;
    background: #FFFFFF;
    box-shadow: 0 .166667rem .291667rem 0 #FFA3C2;
    border-radius: 1.458333rem;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: -2.708333rem;
  }
  h1 {
    font-family: PingFangSC-Regular;
    font-size: 1.583333rem;
    color: #575757;
    text-align: center;
    margin-top: 4.525rem;
  }
}

.para_wrap {
  display: block;
  width: 95%;
  margin: 0 auto;
  text-align: center;
  img {
    width: 3.75rem;
    float: left;
    margin-top: .833333rem;
  }
  .point {
    width: 1.666667rem; // margin-top:.133333rem;
  }
  .para_title {
    margin-top: 4.083333rem;
    padding-top: 1.541667rem;
    background: url('./img/para_wrap_bg.png') 54% top no-repeat;
    background-size: 6.016667rem 5.375rem;
    div {
      overflow: hidden;
      display: inline-block;
    }
    h1 {
      font-family: MicrosoftYaHei;
      font-size: 1.5rem;
      color: #000000;
      line-height: 1.5rem;
      float: left;
      margin: 0 1.4rem;
    }
    h3 {
      font-family: MicrosoftYaHei;
      font-size: 1.05rem;
      color: #666666;
      line-height: 1.05rem;
      margin-top: .833333rem;
    }
  }
}

.scroll {
  height: 25rem;
  margin-top: 1.5rem;
}

.users_wrap {
  height: 24.5rem;
  overflow: hidden;
  position: relative;
  width: 60%;
  margin: 0 auto;
  li {
    display: block;
    box-sizing: border-box;
    height: 8.166667rem;
    padding: 1.041667rem 0;
    -webkit-transition: all .8s;
    -moz-transition: all .8s;
    -ms-transition: all .8s;
    -o-transition: all .8s;
    transition: all .8s;
  }
  p {
    display: block;
    img {
      width: 2.5rem;
    }
    span {
      font-family: MicrosoftYaHei;
      font-size: 1.166667rem;
      color: #333333;
    }
  }
  h3 {
    font-family: MicrosoftYaHei;
    font-size: 1rem;
    color: #666666;
    padding-top: .5rem;
  }
  h2 {
    font-family: MicrosoftYaHei;
    font-size: 1rem;
    color: #FF508A;
    line-height: 1.8;
    border-bottom: 1px solid #D5D5D5;
    span {
      font-size: 1.333333rem;
    }
  }
}

.opacity_zero {
  opacity: 0;
}

.height_zero {
  height: 0!important;
  padding: 0!important;
}

.cases_decs {
  text-align: center;
  font-family: MicrosoftYaHei;
  font-size: 1rem;
  color: #666666;
  line-height: 1.708333rem;
  margin: 3.666667rem 0 1.666667rem;
}

#cases {
  li {
    position: relative;
    margin: 5px 1.25rem;
    .case_bg {}
    h1 {
      position: absolute;
      top: .833333rem;
      left: .833333rem;
      font-family: PingFangSC-Semibold;
      font-size: 1.333333rem;
      color: #FFFFFF;
      font-weight: bold;
    }
    h2 {
      font-family: PingFangSC-Regular;
      font-size: 1rem;
      color: #FFFFFF;
      position: absolute;
      bottom: .833333rem;
      left: .833333rem;
    }
    .recommend {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 3.037917rem;
      border-radius: .416667rem
    }
  }
}

.pic_wall {
  -webkit-display: flex;
  display: flex;
  padding: 0 10px;
  div {
    -webkit-flex: 2;
    flex: 2;
    -webkit-display: flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    margin: 0 2px;
    p {
      -webkit-flex: 1;
      flex: 1;
      margin: 2px 0;
      position: relative;
      &:after {
        content: '';
        width: 100%;
        height: 100%;
        opacity: 0.3;
        background: #000000;
        position: absolute;
        left: 0;
        top: 0;
      }
      &:hover:after {
        content: '';
        width: 100%;
        height: 100%;
        opacity: 0;
        background: #000000;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}

.scroll2 {
  margin: 3.541667rem 0;
}

.users_wrap2 {
  width: 20.666667rem;
  height: 10rem;
  overflow: hidden;
  margin: 0 auto;
  li {
    height: 3.416667rem;
    -webkit-transition: all .8s;
    -moz-transition: all .8s;
    -ms-transition: all .8s;
    -o-transition: all .8s;
    transition: all .8s;
    img {
      width: 2.583333rem;
      margin-left: 5px;
      padding: .416667rem 0;
    }
    span {
      font-family: MicrosoftYaHei;
      font-size: 1.166667rem;
      color: #FF508A;
      &:nth-child(2) {
        display: inline-block;
        width: 8.75rem;
        color: #333;
      }
    }
  }
}

#footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  max-width: 750px;
  padding: .833333rem;
  z-index: 999999;
  .footer_mask {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    background: #000000;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .btn {
    float: right;
    padding: 0 .816667rem;
    margin-top: .25em;
    line-height: 2.5rem;
    color: #fff;
    background: #ff4f89;
    border-radius: .3em;
    margin-right: .95em;
    font-size: 1.166667rem;
  }
  img {
    width: 2.916667rem;
  }
  .center {
    margin-left: 3.5rem; // margin-right: 9em;
    h5 {
      margin: 0.925rem 0;
      font-family: PingFangSC-Regular;
      font-size: 1.266667rem;
      color: #FFFFFF;
    }
    p {
      margin: 0;
      color: #888;
      font-size: 1rem;
    }
  }
}
</style>

