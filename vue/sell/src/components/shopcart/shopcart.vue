<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="totalCount>0?'highlight':''">
            <span class="icon-shopping_cart"></span>
          </div>
          <div class="num" v-show="totalCount">{{totalCount}}</div>
        </div>
        <div class="price bold" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="{'highlight':totalPrice>minPrice}">
        <div class="pay">{{payDesc}}</div>
      </div>
    </div>
    <!-- 购物车小球特效 -->
    <div class="ball-container drop-transition">
      <div v-for="(ball,index) in balls" :key="index">
        <transition 
          @before-enter="beforeDrop"
          @enter="dropping"
          @after-enter="afterDrop">
          <div class="ball" v-if="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <!-- 购物车列表 -->
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food df dfaic" v-for="(food, index) in selectFoods" :key="index">
              <span class="name df1">{{food.name}}</span>
              <div class="price">
                <span>¥{{food.price*food.count}}</span>
              </div>
              <div class="catcontrol-wrapper">
                <catcontrol :food="food"></catcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import catcontrol from '../cartcontrol/cartcontrol';
import BScroll from 'better-scroll';
const BALL_LEN = 10;
const innerClsHook = 'inner-hook';

function createBalls () {
  let balls = [];
  for (let i = 0; i < BALL_LEN; i++) {
    balls.push({show: false});
  }
  return balls;
}

  export default {
    name: 'shop-cart',
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        balls: createBalls(),
        fold: true // 购物列表折叠 true折叠 false展开
      };
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount () {
        let count = 0;
        this.selectFoods.forEach(food => {
          count += food.count;
        });
        return count;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结账';
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            };
          });
        }
        return show;
      }
    },
    created () {
      this.dropBalls = [];
    },
    methods: {
      drop (el) {
        for (let i = 0; i < this.balls.length; i++) {
          const ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeDrop (el) {
        const ball = this.dropBalls[this.dropBalls.length - 1];
        console.log(el);
        const rect = ball.el.getBoundingClientRect();
        const x = rect.left - 32;
        const y = -(window.innerHeight - rect.top - 22);
        el.style.display = '';
        el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`;
        const inner = el.getElementsByClassName(innerClsHook)[0];
        inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
      },
      dropping (el, done) {
        this._reflow = document.body.offsetHeight;
        el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`;
        const inner = el.getElementsByClassName(innerClsHook)[0];
        inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)`;
        el.addEventListener('transitionend', done);
      },
      afterDrop (el) {
        const ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      // 展示隐藏购物车
      toggleList () {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
      },
      // 清空购物车
      empty () {
        this.selectFoods.forEach(food => {
          food.count = 0;
        });
      }
    },
    components: {
      catcontrol
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import '../../common/style/index.less';
  .shopcart {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 48px;
    background-color: #999;
    .content {
      display: flex;
      height: 100%;
      background-color: #141d27;
      .content-left {
        flex: 1;
        display: flex;
        align-items: center;
        .logo-wrapper {
          display: inline-block;
          position: relative;
          top: -10px;
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          border-radius: 100%;
          background-color: #141d27;
          .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            background-color: rgba(255, 255, 255, .2);
            color: rgba(255, 255, 255, .4);
            border-radius: 100%;
            font-size: 24px;
            &.highlight {
              background-color: rgb(0, 160, 220);
              color: #ffffff;
            }
          }
          .num {
            position: absolute;
            top:  0;
            right: 0;
            background-color: @active;
            color: #fff;
            padding: 3px 9px;
            border-radius: 16px;
            font-size: 9px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
          }
        }
        .price {
          display: inline-block;
          margin-right: 1em;
          padding-right: 1em;
          line-height: 24px;
          font-size: 16px;
          color: rgba(255, 255, 255, .4);
          border-right: 1px solid rgba(255, 255, 255, .1);
          &.highlight {
            color: #ffffff;
          }
        }
        .desc {
          font-size: 10px;
          color: rgba(255, 255, 255, .4);
        }
      }
      .content-right {
        flex: 0 0 105px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.2);
        &.highlight {
          background-color: #00b43c;
          .pay {
            color: #ffffff;
          }
        }
        .pay {
          font-size: 12px;
          font-weight: 700;
          color: rgba(255, 255, 255, .4);
        }
      }
    }
    .ball-container {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition: all 400ms cubic-bezier(0.7, -0.1, 1, 1);
      }
      .inner {
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background-color: rgb(0, 160, 220);
        transition: all 400ms linear;
      }
    }
    .shopcart-list {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      transition: all 400ms;
      transform: translate3d(0, -100%, 0);
      // &.show {
      //   transform: translate3d(0, -100%, 0);
      // }
      &.fold-leave-active, &.fold-leave-to {
        transform: translate3d(0, 0, 0);
      }
      &.fold-enter-active, &.fold-enter-to{
        transform: translate3d(0, 0, 0);
      }
      .list-header {
        height: 40xp;
        line-height: 40px;
        padding:  0 18px;
        background-color: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, .1);
        overflow: hidden;
        .title {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content {
        padding: 0 18px;
        max-height: 240px;
        background-color: #ffffff;
        overflow: hidden;
        .food {
          position: relative;
          padding: 12px 0;
          box-sizing: border-box;
          .border-1px(rgba(7, 17, 27, .1));
          .name {
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price {
            line-height: 24px;
            font-size: 14px;
            font-weight: bolder;
            color: @active;
          }
          .catcontrol-wrapper {
            margin-left: 18px;
          }
        }
      }
    }
  }
</style>
