<template>
<div>
  <div id='header'>
    <div>
      <img src='./img/head_pic.png'/>
      <img src='./img/logo.png' class='logo'/>
    </div>
    <h1>要减肥  上轻加</h1>
  </div>

  <div class='para_wrap'>
    <div class='para_title'>
      <div>
        <img src='./img/longline.png'/>
        <h1>轻加，每分每秒</h1>
        <img src='./img/longline.png'/>
      </div>
      <h3>都有来自全世界的轻友在这里流下他们的汗水</h3>
    </div>
  </div>

  <div class='scroll'>
    <ul class="users_wrap" id="users_wrap">
      <template v-for='user in common_user'>
        <li>
          <p>
            <img v-bind:src='user.headpic'/>
            <span>{{user.name}}</span>
          </p>
          <h3>{{user.desc}}</h3>
          <h2>{{user.type}}<span>{{user.kcal}}</span> 千卡</h2>
        </li>
      </template>
    </ul>
  </div>

  <div class='para_wrap'>
    <div class='para_title'>
      <div>
        <img src='./img/point.png' class='point'/>
        <h1 style='margin:0 3.4rem'>量身定制瘦身方案库</h1>
        <img src='./img/point.png' class='point'/>
      </div>
      <h3 style='margin-top:-.45rem'>轻加带你一直瘦瘦瘦瘦瘦瘦瘦瘦瘦！</h3>
    </div>
  </div>

  <div id="cases">
    <p class='cases_decs'>轻加针对不同人群定制的专属减肥方案
      <br/>提供上百种专业瘦身课程
      <br/>运动，饮食，瘦身，各种器械和阶段减肥目标组合编排
      <br/>适用于最广泛的减肥伙伴
    </p>
    <ul>
      <template v-for='cases in case_library'>
        <li>
          <img v-bind:src='cases.img' class='case_bg'>
          <h1>
           <span>{{cases.name}}</span>
           <template v-if="cases.push">
            <img src='./img/push_icon.png' style='width:1.5666667rem;margin-top:-.25rem'/>
           </template>
          </h1>
          <h2>{{cases.number}}人参加</h2>
          <img src='./img/recommend.png' class='recommend'/>
        </li>
      </template>
    </ul>
  </div>

  <div class='para_wrap'>
    <div class='para_title'>
      <div>
        <img src='./img/point.png' class='point'/>
        <h1 style='margin:0 3.4rem;backgrouond-position:60% center;'>轻加社区&分享减肥成果</h1>
        <img src='./img/point.png' class='point'/>
      </div>
      <h3 style='margin-top:-.45rem'>逛社区，找拍档，你不是一个人在战斗</h3>
    </div>
  </div>

  <div id="community">
    <p class='cases_decs'>逛社区，收集瘦身经验
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
      <div style='-webkit-flex:3.04;flex:3.04;'>
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

  <div class='para_wrap'>
    <div class='para_title'>
      <div>
        <img src='./img/shortline.png'/>
        <h1>轻加新玩法，奖金挑战赛</h1>
        <img src='./img/shortline.png'/>
      </div>
      <h3>付押金参加奖金挑战，每天锻炼返还押金</h3>
      <h3>还有额外抽奖机会，最高可达299元现金</h3>
    </div>
  </div>

  <div class='scroll2'>
    <ul class="users_wrap2" id="users_wrap2">
      <template v-for='user in bonus_user'>
        <li>
          <img  v-bind:src='user.headpic'/>
          <span>{{user.name}}</span>
          <span>{{user.desc}}</span>
        </li>
      </template>
    </ul>
  </div>
  <div class="videoWrap">
    <video 
      id="videoElement" 
      width="100%" 
      height="100%" 
      x-webkit-airplay="true" 
      playsinline="true" 
      poster="./views/tests/img/video_pic.png" 
      src="http://vkpakamai.video.gtimg.com/flv/2/247/z0397ng0jpk.mp4?vkey=740ECAE2BC62287F4D609A00289EDE7DFE8C6C32C01685E6652A15963EF2CB89845AE8A533184F35B9713DEF826457B3F2B8A32588BCF0F2465A77B17563B70F9E592F642D475016179C445A9689B1913E0410F38C9591CB&br=60&platform=2&fmt=auto&level=0&sdtfrom=v5010&guid=693d8c6cb74c6e6dcc6c340c039039e5">
    </video>
    <img class="videoPlay" @click='this.videoPlay' src="./img/playBtn.png"/>
    <div class="videoPause" @click='this.videoPause'>X</div>
  </div>
    
  <div id="footer">
    <a href="https://applink.sythealth.com/" class="btn">打开</a>
    <a class="btn" id='download' v-on:click='this.statistics'>免费下载</a>
    <div class="footer_logo fl">
      <img src="./img/logo.png"/>
    </div>
    <div class="center">
      <h5>想减肥 上轻加</h5>
      <p>更多人信赖的移动减肥专家</p>
    </div>
  </div>

  <div style="height:5.833rem"></div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      common_user: [
        {
          name: '我要瘦',
          headpic: require('./img/headpic1.png'),
          desc: '刚刚完成了「7分钟燃脂操全身塑造」',
          type: '燃脂:',
          kcal: '197.0'
        },
        {
          name: '西西小狐狸',
          headpic: require('./img/headpic2.png'),
          desc: '刚刚完成了「7分钟燃脂操全身塑造」',
          type: '燃脂:',
          kcal: '190.0'
        },
        {
          name: '丸子',
          headpic: require('./img/headpic3.png'),
          desc: '刚刚完成了「饮食打卡」',
          type: '共摄入: ',
          kcal: '11'
        },
        {
          name: '吧唧',
          headpic: require('./img/headpic4.png'),
          desc: '刚刚完成了「高速身体塑形」',
          type: '燃脂:',
          kcal: '124.0'
        },
        {
          name: '不二哥',
          headpic: require('./img/headpic5.png'),
          desc: '刚刚完成了「加速燃脂阶段」',
          type: '燃脂:',
          kcal: '182.0'
        }
      ],
      bonus_user: [
        {
          name: '天使也掉毛',
          headpic: require('./img/headpic6.png'),
          desc: '获得100元现金'
        },
        {
          name: ' 久念',
          headpic: require('./img/headpic7.png'),
          desc: '获得10元现金'
        },
        {
          name: '三荀',
          headpic: require('./img/headpic8.png'),
          desc: '获得10元现金'
        },
        {
          name: '小桃子',
          headpic: require('./img/headpic9.png'),
          desc: '获得299元现金'
        },
        {
          name: '胖猫一只',
          headpic: require('./img/headpic10.png'),
          desc: '获得10元现金'
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
    },
    hasClass (elem, cls) {
      cls = cls || ''
      if (cls.replace(/\s/g, '').length === 0) return false
      return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ')
    },
    addClass (ele, cls) {
      let _this = this
      if (!_this.hasClass(ele, cls)) {
         ele.className = ele.className === '' ? cls : ele.className + ' ' + cls
      }
    },
    removeClass (ele, cls) {
      let _this = this
      if (_this.hasClass(ele, cls)) {
        var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' '
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
          newClass = newClass.replace(' ' + cls + ' ', ' ')
          }
        ele.className = newClass.replace(/^\s+|\s+$/g, '')
      }
    },
    scroll () {
      let _this = this
      setInterval(function () {
          let lis = document.querySelectorAll('.users_wrap li')
          let usersWrap = document.getElementById('users_wrap')
          lis[0].className = 'opacity_zero'
          _this.removeClass(lis[lis.length - 1], 'opacity_zero')
          setTimeout(function () {
            _this.addClass(lis[0], 'height_zero')
            setTimeout(function () {
              lis[0].remove()
              usersWrap.appendChild(lis[0])
               _this.removeClass(lis[lis.length - 1], 'height_zero')
            }, 800)
          }, 800)
      }, 1600)
      setInterval(function () {
          let lis2 = document.querySelectorAll('.users_wrap2 li')
          let usersWrap2 = document.getElementById('users_wrap2')
          lis2[0].className = 'opacity_zero'
          _this.removeClass(lis2[lis2.length - 1], 'opacity_zero')
          setTimeout(function () {
            _this.addClass(lis2[0], 'height_zero')
            setTimeout(function () {
              // lis[0].remove()
              usersWrap2.appendChild(lis2[0])
               _this.removeClass(lis2[lis2.length - 1], 'height_zero')
            }, 800)
          }, 800)
      }, 1600)
    },
    userdevice () {
      var ua = navigator.userAgent.toLowerCase()
      if ('' + ua.match(/iPhone\sOS/i) === 'iphone os' || navigator.userAgent.indexOf('iPad') !== -1) {
        document.getElementById('download').setAttribute('href', 'https://itunes.apple.com/us/app/%E8%BD%BB%E5%8A%A0-%E8%96%84%E8%8D%B7%E9%A5%AE%E9%A3%9F%E8%B0%B1%E7%98%A6%E8%BA%AB%E8%BD%AF%E4%BB%B6/id665855293?mt=8&uo=4')
        return
      } else if ('' + ua.match(/Android/i) === 'android') {
        axios
          .get('http://file.sythealth.com/app/info/toutiao/com.sythealth.fitness.json')
          .then(function(ret) {
            alert(ret.data.downloadUrl)
            document.getElementById('download').setAttribute('href', ret.data.downloadUrl)
          })
        return
      }
    },
    statistics () {
      axios.get('https://fireye.sythealth.com/ws/fireye/v2/event/saveevent', {
        params: {
          eventid: '5966d3ab3ef8b009f8b14689'
        }
        }).then(res => {
          res = res.data
          console.log(res.data)
      })
    },
    videoPlay () {
      document.getElementById('videoElement').play()
      document.querySelectorAll('.videoWrap')[0].style.width = '100%'
      document.querySelectorAll('.videoWrap')[0].style.height = '100%'
      document.querySelectorAll('.videoWrap')[0].style.position = 'fixed'
      document.querySelectorAll('.videoWrap')[0].style.top = '0'
      document.querySelectorAll('.videoWrap')[0].style.left = '0'
      document.querySelectorAll('.videoWrap')[0].style.background = 'rgba(0,0,0,.8)'
      document.querySelectorAll('.videoPlay')[0].style.display = 'none'

      document.querySelectorAll('.videoPause')[0].style.display = 'inline-block'
      document.querySelectorAll('.videoPause')[0].style.position = 'fixed'
      document.querySelectorAll('.videoPause')[0].style.top = '3rem'
      document.querySelectorAll('.videoPause')[0].style.right = '3rem'
      document.querySelectorAll('.videoPause')[0].style.color = '#fff'
    },
    videoPause () {
      document.getElementById('videoElement').pause()
      document.querySelectorAll('.videoWrap')[0].style.width = ''
      document.querySelectorAll('.videoWrap')[0].style.height = ''
      document.querySelectorAll('.videoWrap')[0].style.position = ''
      document.querySelectorAll('.videoWrap')[0].style.top = '0'
      document.querySelectorAll('.videoWrap')[0].style.left = '0'
      document.querySelectorAll('.videoWrap')[0].style.background = ''
      document.querySelectorAll('.videoPause')[0].style.display = 'none'
      document.querySelectorAll('.videoPlay')[0].style.display = 'inline-block'
    }
  },
  created () {
    this.useRem()
    this.scroll()
    document.getElementById('videoElement').poster = require('./img/video_pic.png')
  },
  mounted () {
    this.userdevice()
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/css/myreset.css';
img {
    width: 100%;
}

// 播放器
.videoWrap {
  position: relative;
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
  .videoPause{
    display: none;
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
    img{
      width:3.75rem;
      float:left;
      margin-top:.833333rem;
    }
    .point{
      width:1.666667rem;
      // margin-top:.133333rem;
    }
    .para_title {
      margin-top:4.083333rem;
      padding-top:1.541667rem;
      background:url('./img/para_wrap_bg.png') 54% top no-repeat;
      background-size:6.016667rem 5.375rem;
      div{
        overflow:hidden;
        display:inline-block;
      }
      h1 {
            font-family: MicrosoftYaHei;
            font-size: 1.5rem;
            color: #000000;
            line-height: 1.5rem;
            float:left;
            margin:0 1.4rem;
        }
      h3{
          font-family: MicrosoftYaHei;
          font-size: 1.05rem;
          color: #666666;
          line-height: 1.05rem;
          margin-top:.833333rem;
        }
    }
}
.scroll{
  height:24.5rem;
  margin-top:1.541667rem;
}
.users_wrap{
  height:24.5rem;
  overflow: hidden;
  position:relative;
  width:16.666667rem;
  margin:0 auto;
  li{
    height: 8.166667rem;
    padding:1.041667rem 0;
    border-bottom: 1px solid #D5D5D5;
    -webkit-transition: all .8s;
		-moz-transition: all .8s;
		-ms-transition: all .8s;
		-o-transition: all .8s;
		transition: all .8s;
  }
  p{
    img{
      width:2.5rem;
    }
    span{
      font-family: MicrosoftYaHei;
      font-size: 1.166667rem;
      color: #333333;
    }
  }
  h3{
    font-family: MicrosoftYaHei;
    font-size: 1rem;
    color: #666666;
    margin:.633333rem 0;
  }
  h2{
    font-family: MicrosoftYaHei;
    font-size: 1rem;
    color: #FF508A;
    span{
      font-size:1.333333rem;
    }
  }
}
.opacity_zero{
	opacity: 0;
}
.height_zero{
  height: 0!important;
  padding:0!important;
}
.cases_decs{
    text-align:center;
    font-family: MicrosoftYaHei;
    font-size: 1rem;
    color: #666666;
    line-height: 1.708333rem;
    margin:3.666667rem 0 1.666667rem;
  }
#cases{
  li{
    position:relative;
    margin:5px 1.25rem;
    .case_bg{
      
    }
    h1{
      position:absolute;
      top:.833333rem;
      left:.833333rem;
      font-family: PingFangSC-Semibold;
      font-size: 1.333333rem;
      color: #FFFFFF;
      font-weight:bold;

    }
    h2{
      font-family: PingFangSC-Regular;
      font-size: 1rem;
      color: #FFFFFF;
      position:absolute;
      bottom:.833333rem;
      left:.833333rem;
    }
    .recommend{
      position:absolute;
      right:0;
      bottom:0;
      width:3.037917rem;
      border-radius:.416667rem
    }
  }
}
.pic_wall{
  -webkit-display:flex;
  display:flex;
  padding:0 10px;
  div{
    -webkit-flex:2;
    flex:2;
    -webkit-display:flex;
    display:flex;
    -webkit-flex-direction:column;
    flex-direction:column;
    margin:0 2px;
    p{
      -webkit-flex:1;
      flex:1;
      margin:2px 0;
      position:relative;
      &:after{
        content:'';
        width:100%;
        height:100%;
        opacity: 0.3;
        background: #000000;
        position:absolute;
        left:0;
        top:0;
      }
      &:hover:after{
        content:'';
        width:100%;
        height:100%;
        opacity: 0;
        background: #000000;
        position:absolute;
        left:0;
        top:0;
      }
    }
  }
}
.scroll2{
  margin-top:1.541667rem;
}
.users_wrap2{
  width:20.666667rem;
  height:10rem;
  overflow:hidden;
  margin:0 auto;
  li{
    height: 3.416667rem;
    -webkit-transition: all .8s;
		-moz-transition: all .8s;
		-ms-transition: all .8s;
		-o-transition: all .8s;
		transition: all .8s;
    img{
      width:2.583333rem;
      margin-left:5px;
      padding:.416667rem 0;
    }
    span{
      font-family: MicrosoftYaHei;
      font-size: 1.166667rem;
      color: #FF508A;
      &:nth-child(2){
        display:inline-block;
        width:8.75rem;
        color: #333;
      }
    }
  }
}
#footer{
  position:fixed;
  width:100%;
  background-color:#fff;
  bottom:0;
  padding:.833333rem;
  .btn{
    float: right;
    padding: 0 .416667rem;
    margin-top: .5em;
    line-height: 2.5rem;
    color: #fff;
    background: #ff4f89;
    border-radius: .3em;
    margin-right: .5em;
    font-size:1.166667rem;
  }
  img{
    width:4.166667rem;
  }
  .center{
    margin-left:5rem;
    // margin-right: 9em;
    h5{
      margin: .625rem 0;
      font-size: 1.166667rem;
      font-weight: bold;
    }
    p{
      margin: 0;
      color: #888;
      font-size:1rem;
    }
  }
}
</style>
