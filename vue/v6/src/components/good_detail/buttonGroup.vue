<script>
export default {
  props: {
    data: {
      default: {}
    }
  },
  methods: {

  }
}
</script>
<template>
  <div class="button-group">
    <div class="car"></div>
    <a class="buy">立即购买</a>
    <a class="join-car"></a>
  </div>
</template>
<style lang="scss">
.button-group {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3.2em;
  box-shadow: 0 0 10px rgba(255, 255, 255, .3);
  background: #fff;
  .car {
    float: left;
    width: 3.4em;
    height: 3.2em;
    background: url('../img/shop_ic_cart.png') no-repeat center center;
    background-size: 70% auto;
  }
}
</style>
