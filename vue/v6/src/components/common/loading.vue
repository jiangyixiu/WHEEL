<script>
export default {
  props: {
    show: {
      default: true
    }
  }
}
</script>
<template>
  <transition name="fade">
    <div class="v-loading" v-show="show">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

.v-loading {
  position: fixed;
  background-color: rgba(255, 255, 255, .3);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-loading span {
  width: 8px;
  height: 40px;
  margin: 0 5px;
  border-radius: 4px;
  background: lightpink;
  animation: load 1s ease infinite;
}

@keyframes load {
  0%,
  100% {
    height: 40px;
    background: lightpink;
  }
  50% {
    height: 70px;
    margin: -15px 5;
    background: lightcoral;
  }
}

.v-loading span:nth-child(2) {
  animation-delay: 0.2s;
}

.v-loading span:nth-child(3) {
  animation-delay: 0.4s;
}

.v-loading span:nth-child(4) {
  animation-delay: 0.6s;
}

.v-loading span:nth-child(5) {
  animation-delay: 0.8s;
}
</style>
