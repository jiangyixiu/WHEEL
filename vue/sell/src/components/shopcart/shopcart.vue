<template>
  <div class="shopcart">
    <div class="content">
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
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [
            {
              price: 12.5,
              count: 5
            }
          ];
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
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
@import url('../../common/style/index.less');
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
            padding: 1px 6px;
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
  }
</style>
