<script>
import _ from '../_lodash'
export default {
  props: {
    data: {
      default: {}
    },
    selectValue: {
      default: ''
    }
  },
  computed: {
    specification() {
      let txt = '规格 '
      const selectData = this.data.itemIds[this.selectValue]
      _.each(this.data.attributes, (item, index) => {
        txt += item.name + ':' + _.find(item.values, (items) => {
          return items.valueId === selectData.valueIds[index]
        }).name + ' '
      })
      return txt
    }
  },
  data() {
    return {}
  }
}
</script>
<template>
  <div class="btn-spec" @click="$emit('payEvent')">
    <span>{{specification}}</span>
  </div>
</template>
<style lang="scss">
.btn-spec {
  color: #444;
  background: #fff;
  width: 100%;
  display: block;
  height: 49px;
  font-size: 14px;
  padding: 0 15px;
  line-height: 49px;
  box-sizing: border-box
}

.btn-spec i {
  line-height: 49px;
  font-size: 23px;
  color: #aaa
}
</style>
