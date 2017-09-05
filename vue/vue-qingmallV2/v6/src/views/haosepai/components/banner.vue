<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props: {
    slides: {
      default: []
    }
  },
  data() {
    return {
      swiperOption: {
        autoplay: 3500,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<template>
  <div class="banner">
    <swiper :options="swiperOption">
      <template v-for="item in slides">
        <swiper-slide>
          <img :src="item">
        </swiper-slide>
      </template>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<style lang="scss">
.banner {
  width: 100%; // height: 68vw;
  // overflow: hidden;
  img {
    max-width: 100%;
  }
}
</style>
