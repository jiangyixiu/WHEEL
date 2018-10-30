<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title df dfaic">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support df dfaic">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" @click="showDetail()" class="support-count df dfaic">
        <span class="count">{{seller.supports.length}}个 </span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
  
    <div class="bulletin-wrapper df dfaic">
      <span class="bulletin-title"></span>
      <span class="bulletin-text df1">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
  
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>

    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wraper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{ seller.supports[index].description }}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{ seller.bulletin }}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i @click="hideDetail()" class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '../../components/star/star';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    };
  },
  methods: {
    showDetail () {
      this.detailShow = true;
    },
    hideDetail () {
      this.detailShow = false;
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
  },
  components: {
    star
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../common/style/mixin.less";
.header {
  position: relative;
  overflow: hidden;
  color: #fff;
  background-color: rgba(7, 17, 27, 0.5);
  .content-wrapper {
    padding: 24px 12px 18px 24px;
    position: relative;
    font-size: 0;
    .avatar {
      display: inline-block;
      img {
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      margin-left: 16px;
      .title {
        margin: 2px 0 8px 0;
        .brand {
          display: inline-block;
          width: 30px;
          height: 18px;
          // .bg-image('/src/components/header/img/brand');
          .bg-image("/static/img/header/brand");
          background-size: 100% 100%;
        }
        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }
      .description {
        margin-bottom: 10px;
        font-size: 12px;
      }
      .support {
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
        }
        & .decrease {
          .bg-image("/static/img/header/decrease_1");
        }
        & .discount {
          .bg-image("/static/img/header/discount_1");
        }
        & .guarantee {
          .bg-image("/static/img/header/guarantee_1");
        }
        & .invoice {
          .bg-image("/static/img/header/invoice_1");
        }
        & .special {
          .bg-image("/static/img/header/special_1");
        }
        font-size: 10px;
      }
    }
    .support-count {
      position: absolute;
      bottom: 18px;
      right: 12px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 24px;
      background-color: rgba(0, 0, 0, 0.2);
      & .count {
        font-size: 10px;
      }
      & .icon-keyboard_arrow_right {
        font-size: 10px;
      }
    }
  }
  .bulletin-wrapper {
    padding: 0 22px 0 12px;
    height: 28px;
    line-height: 28px;
    background-color: rgba(0, 0, 0, 0.2);
    font-size: 0;
    .bulletin-title {
      display: inline-block;
      width: 22px;
      height: 12px;
      .bg-image("/static/img/header/bulletin");
      background-size: 100% 100%;
    }
    .bulletin-text {
      margin-left: 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 10px;
    }
    .icon-keyboard_arrow_right {
      font-size: 10px;
    }
  }
  .background {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    height: 100%;
    width: 100%;
    filter: blur(10px);
    &img {
    }
  }
  .detail {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    z-index: 100;
    background-color: rgba(7, 17, 27, 0.8);
    backdrop-filter: blur(10px);  // iPhone支持
    overflow: auto;
    transition: opacity 400ms;
    &.fade-enter, &.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    .detail-wrapper {
      min-height: 100%;
      margin-bottom: -80px;
      overflow: hidden;
      &:after {
        content: "";
        display: block;
      }
      .detail-main {
        margin-top: 40px;
        .name {
          line-height: 16px;
          font-size: 16px;
          font-weight: 700;
          text-align: center;
        }
        .star-wraper {
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }
        .title {
          width: 80%;
          display: flex;
          align-items: center;
          margin: 28px auto 24px;
          .line {
            flex: 1;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          }
          .text {
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700;
          }
        }
        .supports {
          width: 80%;
          margin: 0 auto;
          .support-item {
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;
            &:last-child {
              margin-bottom: 0;
            }
            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              vertical-align: top;
              margin-right: 6px;
              background-size: 16px 16px;
              background-repeat: no-repeat;
              &.decrease {
                .bg-image("/static/img/header/decrease_2");
              }
              &.discount {
                .bg-image("/static/img/header/discount_2");
              }
              &.guarantee {
                .bg-image("/static/img/header/guarantee_2");
              }
              &.invoice {
                .bg-image("/static/img/header/invoice_2");
              }
              &.special {
                .bg-image("/static/img/header/special_2");
              }
            }
            .text {
              font-size: 12px;
              line-height: 16px;
            }
          }
        }

        .bulletin {
          width: 80%;
          margin: 0 auto;
          .content {
            padding: 0 12px;
            font-size: 12px;
            line-height: 24px;
          }
        }
      }
    }
    .detail-wrapper:after,
    .detail-close {
      height: 80px;
    }
    .detail-close {
      text-align: center;
      font-size: 26px;
    }
  }
}
</style>

