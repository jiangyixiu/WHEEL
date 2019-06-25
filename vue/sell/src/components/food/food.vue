<template>
  <div>
    <transition name="move">
      <div v-show="showFlag" @click="showFlag=!showFlag" class="food-wrapper"></div>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        showFlag: false
      };
    },
    props: {
      foot: {
        type: Object
      }
    },
    methods: {
      show () {
        this.showFlag = true;
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .food-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background-color: white;
    &.move-enter-active, &.move-leave-active {
      transition: all 300ms linear;
      transform: translate3D(0, 0, 0);
    }
    &.move-enter, &.move-leave-to {
      transform: translate3d(100%, 0, 0);
    }
  }

</style>
