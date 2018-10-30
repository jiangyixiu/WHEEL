<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, $index) in goods" class="menu-item" 
            :class="{'current':currentIndex==$index}"
            @click="selectMenu($index, $event)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="foods-list foods-list-hook">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description}}</p>
                <div class="extra">
                  <span>月售{{ food.sellCount }}份</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span><small>￥</small>{{ food.price }}</span>
                  <span v-show="food.oldPrice" class="oldPrice">￥{{ food.oldPrice }}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios';
import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart';
const REE_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    };
  },
  computed: {
    currentIndex () {
      for (const i in this.listHeight) {
        if (this.listHeight.hasOwnProperty(i)) {
          const height1 = this.listHeight[i];
          const height2 = this.listHeight[Number(i) + 1];
          // console.log((this.scrollY >= height1 && this.scrollY < height2));
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
      }
      return 0;
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    axios.get('/api/goods').then((response) => {
      response = response.data;
      if (response.errno === REE_OK) {
        this.goods = response.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }
    });
  },
  methods: {
    selectMenu (index, event) {
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook');
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3
      });
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight () {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (const i in foodList) {
        if (foodList.hasOwnProperty(i)) {
          const element = foodList[i];
          height += element.clientHeight;
          this.listHeight.push(height);
        }
      }
    }
  },
  components: {
    shopcart
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import url('../../common/style/mixin.less');
.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 48px;
  width: 100%;
  & .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    overflow: hidden;
    background-color: #f3f5f7;
    & > ul {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .menu-item {
      padding: 0 1em;
      display: table;
      width: 100%;
      height: 54px;
      line-height: 14px;
      box-sizing: border-box;
      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background-color: #fff;
        font-weight: 700;
        .text {
          .border-none();
        }
      }
      .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        &.decrease {
          .bg-image("/static/img/goods/decrease_3");
        }
        &.discount {
          .bg-image("/static/img/goods/discount_3");
        }
        &.guarantee {
          .bg-image("/static/img/goods/guarantee_3");
        }
        &.invoice {
          .bg-image("/static/img/goods/invoice_3");
        }
        &.special {
          .bg-image("/static/img/goods/special_3");
        }
      }
      .text {
        display: table-cell;
        width: 56px;
        font-size: 12px;
        vertical-align: middle;
        .border-1px(rgba(7, 17, 27, 0.1))
      }
      
    }
  }
  & .foods-wrapper {
    flex: 1;
    overflow: hidden;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background-color: #f3f5f7;
    }
    .food-item {
      display: flex;
      padding: 18px 0;
      margin: 0 18px;
      .border-1px(rgba(7, 17, 27, .1));
      &:last-child {
        .border-none();
      }
      .icon {
        flex: 0, 0, 57px;
        margin-right: 10px;
      }
      .content {
        flex: 1;
        .name {
          margin: 2px 0 8px;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: @fontBlack;
        }
        .desc, .extra {
          font-size: 10px;
          color: @fontGray;
        }
        .desc {
          line-height: 12px;
        }
        .extra {
          margin: 8px 0;
        }
        .price {
          font-size: 14px;
          color: @active;
          small {
            font-size: smaller;
          }
          .oldPrice {
            font-size: 10px;
            color: @fontGray;
          }
        }
      }
    }
  }
}
</style>
