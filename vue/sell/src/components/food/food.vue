<template>
  <div>
    <transition name="move">
      <div v-show="showFlag" class="food-wrapper">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image">
            <div class="back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="desc">
              <span class="sell-count">月售{{food.sellCount}}分</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now"><small>￥</small>{{food.price}}</span>
              <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showFlag: false
      };
    },
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      show() {
        this.showFlag = true;
      },
      hide() {
        this.showFlag = false;
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../common/style/mixin';
  .food-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background-color: white;
    transition: all 200ms linear;
    transform: translate3D(0, 0, 0);
    &.move-enter-active, &.move-enter-to {
      transform: translate3d(100%, 0, 0);
    }
    &.move-leave-active, &.move-leave-to {
      transform: translate3d(100%, 0, 0);
    }
    .image-header {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .back {
        position: absolute;
        top: 10px;
        left: 0;
        .icon-arrow_lift {
          display: block;
          padding: 10px;
          font-size: 20px;
          color: #fff;
        }
      }
    }
    .content {
      padding: 18px;
      .title {
        font-size: 14px;
        font-weight: 700;
        line-height: 14px;
        color: rgb(7, 17, 27);
        margin-bottom: 8px;
      }
      .desc {
        margin-bottom: 18px;
        font-size: 0;
        line-height: 10px;
        color: rgb(147, 153, 159);
        .sell-count, .rating {
          font-size: 10px;
        }
        .sell-count {
          margin-right: 12px;
        }
      }
    }
    .price {
      font-size: 0;
      font-weight: bolder;
      line-height: 24px;
      .now {
        margin-right: 8px;
        font-size: 14px;
        color: @active;
        small {
          font-size: smaller;
        }
      }
      .old {
        text-decoration: line-through;
        font-size: 10px;
        color: @fontGray;
      }
    }
  }

</style>
