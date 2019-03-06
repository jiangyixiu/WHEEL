<template>
  <loading-vue :vloading="vloading"></loading-vue>
</template>

<script>
import loading from '@/components/load/loading'

export default {
  data () {
    return {
      vloading: true
    }
  },
  components:{
    loadingVue:loading
  }
}
</script>


<style scoped>

</style>
