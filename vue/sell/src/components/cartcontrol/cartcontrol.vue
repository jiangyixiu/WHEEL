<template>
  <div>
    <div class="cartcontrol">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0"></div>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click="addCart"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      food: {
        type: Object
      }
    },
    created () {
      console.log(this.food);
    },
    methods: {
      addCart () {

      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .cartcontrol {
    font-size: 0;
    .cart-decrease, .cart-add {
      display: inline-block;
      font-size: 24px;
      line-height: 24px;
      padding: 6px;
      color: rgb(0, 160, 220);
    }
    .cart-decrease {
    }
    .cart-decrease {
    }
    .cart-add {
    }
  }
</style>
