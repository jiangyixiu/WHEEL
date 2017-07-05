<script>
export default {
  props: {
    data: {
      default: {}
    },
    cartCount: {
      default: 0
    }
  }
}
</script>
<template>
  <div class="button-group">
    <div class="box">
      <a class="car" href="fitness://shoppingCart?islogin=0">
        <span v-show="cartCount>0">{{cartCount}}</span>
      </a>
      <a class="buy" @click="$emit('retur', 'buy')">立即购买</a>
      <a class="join-car" @click="$emit('retur', 'joinCar')">加入购物车</a>
    </div>
  </div>
</template>
<style lang="scss">
.button-group {
  height: 55px;
  .box {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    box-shadow: 0px -3px 2px 0px rgba(210, 210, 210, 0.35);
    background: #fff;
    font-size: 1.3em;
    z-index: 5;
  }
  .car {
    float: left;
    width: 64px;
    height: 55px;
    background: url('../img/shop_ic_cart.png') no-repeat center center;
    background-size: 50% auto;
    border-right: 1px solid #f0f0f0;
    position: relative;
    span {
      width: 1.5em;
      height: 1.5em;
      top: .5em;
      right: .5em;
      text-align: center;
      background: #FF508A;
      border-radius: 50%;
      color: #fff;
      position: absolute;
    }
  }
  .buy {
    float: right;
    line-height: 55px;
    background: #FF508A;
    padding: 0 1.5em;
    color: #fff;
  }
  .join-car {
    margin: 0 7.2em 0 67px;
    display: block;
    text-align: center;
    background: #fff;
    line-height: 55px;
  }
}
</style>
