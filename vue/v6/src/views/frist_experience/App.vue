<script>
import '../../common/css/normalize.css'
import '../../common/css/mobile.css'
import axios from 'axios'

export default {
  name: 'app',
  data() {
    const queryTxt = document.location.search
    const query = {}
    let data = queryTxt.replace('?', '').split('&')
    data.forEach((item, index) => {
      let [key, value] = item.split('=')
      query[key] = value
    })
    return {
      query,
      queryTxt,
      data: null,
      girlHead: require('./images/girlhead.png')
    }
  },
  mounted() {
    this.ajaxData()
    // alert(JSON.stringify(navigator.userAgent))
  },
  methods: {
    async ajaxData() {
      let { data: { data } } = await axios.get('https://api.sythealth.com/plan/v1/lottery/lotteryinfo', {
        params: {
          user_id: '54a8ffb70cf227e1b54bf6c8'
        }
      })
      data.thinList.pop()
      this.data = data
    },
    getImg(url) {
      return url && url !== 'https://file.sythealth.comheadpic' ? url + '?x-oss-process=image/resize,m_fill,h_160,w_160' : this.girlHead
    },
    join() {
      let schemeid = '592f83d75fd5bf7e99b33558'
      axios.get('https://obt-api.sythealth.com/plan/v1/experience/start', {
        params: {
          userid: this.query.userid,
          schemeid: schemeid
        }
      }).then(res => {
        if (res.data.head.ret === 0) {
          window.location.href = 'fitness://freeChallenge'
        } else {
          window.location.href = 'fitness://freeChallengeStart?schemeid=' + schemeid
        }
      }, () => {
        window.location.href = 'fitness://freeChallengeStart?schemeid=' + schemeid
      })
    }
    // async join() {
    //   let { data: { head: { ret } } } = await axios.get('https://local-api.sythealth.com/plan/v1/experience/start', {
    //     params: {
    //       userid: this.query.userid,
    //       schemeid: '592f83d75fd5bf7e99b33558'
    //     }
    //   })
    //   if (ret !== 0) {
    //     alert('参与失败')
    //   } else {
    //     window.location.href = "fitness://freeChallenge"
    //   }
    // }
  }
}
</script>

<template>
  <div id="app" class="wrapper">
    <header class="top">
      <div style="overflow:hidden;"></div>
      <h3>免费体验奖金挑战</h3>
      <p>给自己加把劲儿</p>
    </header>
    <div class="explain">
      <div class="title">
        <img src="./images/challenge_bg_cup.png" alt="">
      </div>
      <div class="content">
        <div class="task">
          <img src="./images/challenge_img_freerule.png" alt="">
        </div>
        <div class="msg">完成每日挑战任务，即可获得奖金红包，100%现金奖励，最高可达299元。
          <br>（此抽奖活动和苹果公司无关）</div>
      </div>
    </div>
    <div class="winning-list" v-if="data">
      <h3>昨日奖金得主</h3>
      <div class="first">
        <a class="img" :href="'fitness://userZone?userid='+data.userId">
          <img :src="data.userPic+'?x-oss-process=image/resize,m_fill,h_160,w_160'" :onerror="'this.src=\''+girlHead+'\''" alt="">
          <div class="ico"></div>
        </a>
        <div class="name">
          <div class="txt">299元现金获得者 @{{data.userName}}</div>
        </div>
      </div>
      <div class="list" v-for="item in data.thinList">
        <!--<div class="title">{{item.title}}</div>-->
        <ul class="clearfix">
          <li v-for="items in item.array">
            <a :href="'fitness://userZone?userid='+items.userId">
              <img :src="getImg(items.userPic)" :onerror="'this.src=\''+girlHead+'\''" alt="">
              <p class="ellipsis">{{items.userName}}</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <a class="just-join" @click="join" v-if="!query.hasBtn">马上参加奖金挑战</a>
  </div>
</template>
<style lang="scss">
.wrapper {
  background: url('./images/challenge_bg_freerun.png') no-repeat center -1px;
  background-size: 100% auto;
  padding-bottom: 3.6em;
}

img {
  max-width: 100%;
}


.top {
  padding-top: 12%;
  text-align: center;
  color: #fff;
}

.top h3 {
  font-size: 2em;
  margin: 0;
}

.explain .title {
  position: relative;
  width: 80%;
  margin: 0 auto;
  margin-bottom: -5%;
  text-align: center;
}

.explain .content {
  background: #fff;
  padding-top: 10%;
  margin: 0 1em;
  box-shadow: 0 0 20px 0 rgba(255, 80, 138, 0.20);
  border-radius: 6px;
}

.explain .content .task {
  width: 80%;
  margin: 0 auto;
}

.explain .content .msg {
  width: 80%;
  color: #FF508A;
  margin: 0 auto;
  font-size: 1em;
  text-align: center;
  padding: 1em 0;
}

.explain .content .tips {
  float: right;
  padding-left: 1em;
  font-size: .8em;
  color: #666;
  position: relative;
  margin-right: 1em;
  margin-bottom: 1em;
  &:before {
    position: absolute;
    content: '';
    display: block;
    border-radius: 50%;
    width: .4em;
    height: .4em;
    left: 0;
    top: .3em;
    background: #FF3589;
  }
}

.winning-list {
  text-align: center;
  padding-top: 2em;
}

.winning-list h3 {
  display: inline-block;
  align-items: center;
  padding-left: 1.8em;
  background: url('./images/borad_ic_challenge.png') no-repeat left center;
  background-size: 1.5em auto;
  color: #FF508A;
  font-size: 1.2em;
  line-height: 1.8em;
  margin-bottom: 1em;
}

.winning-list .first {
  margin-bottom: 1em;
}

.winning-list .first .img {
  width: 20%;
  margin: 0 auto;
  padding: 1em;
  display: block;
  position: relative;
}

.winning-list .first .img img {
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(255, 80, 138, 0.20);
  border: 3px solid #fff;
}

.winning-list .first .img .ico {
  position: absolute;
  width: 3em;
  height: 3em;
  background: url('./images/challenge_ic_winner.png') no-repeat center center;
  background-size: 100% 100%;
  bottom: 1em;
  right: .5em;
}

// .winning-list .first .name {
//   display: inline-block;
//   height: 0;
//   align-items: center;
//   justify-content: center;
//   border-style: solid;
//   border-width: 1em .4em;
//   border-radius: .2em;
//   color: #fff;
//   font-size: 1.1em;
//   padding: 0 1em;
//   border-color: #FF3574 transparent;
// }
.winning-list .first .name {
  display: inline-block;
  height: 0;
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-width: 1em .4em;
  border-radius: .2em;
  color: #fff;
  font-size: 1.1em;
  padding: 0 1em;
  border-color: #FF3574 transparent;
  margin-bottom: 2em;
}

.winning-list .first .name .txt {
  margin-top: -.5em;
}

.winning-list .list {
  padding-top: 1em;
}

.winning-list .list .title {
  display: inline-block;
  padding: 0 1em;
  color: #fff;
  line-height: 1.8em;
  background: #FF3574;
  border-radius: 1em;
  margin-bottom: 1em;
}

.winning-list .list ul {
  width: 90%;
  margin: 0 auto;
}

.winning-list .list ul li {
  width: 20%;
  float: left;
}

.winning-list .list ul li img {
  width: 70%;
  border-radius: 50%;
}

.just-join {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: block;
  text-align: center;
  font-size: 1.2em;
  background-color: #FF3574;
  background-image: linear-gradient(90deg, #FF6363 1%, #FF3574 99%);
  color: #fff;
  line-height: 3em;
}

@media screen and (max-width:330px) {
  .winning-list .list ul li {
    width: 25%;
  }
}
</style>
