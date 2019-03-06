<template>
  <div class="ztitle dddborder mBx">
    <a
      href="javascript:void(0)"
      class="mFlex1"
      v-for="(item, key, index) in selected" :key="index"
      :class="currentType == key ? 'on' : ''"
      @click="tab(key)">
      <span class="bkgdSz125">{{item.value}}</span>
    </a>
    <div v-bind:style="tabClass" class="tab"></div>
    <ul
      v-for="(list, type) in filters" :key="type"
      :class="currentType == type ? '' : 'hideUl'"
      :style="{maxHeight:coverMaxHeight + 'px'}">      
      <li v-for="(item, index) in list" :key="index">
        <a href="javascript:void(0)"
          :class="currentType==type && currentValue == item.key ? 'on' : ''"
          @click="selectOption(type, item.key, item.value)">{{item.value}}</a>
      </li>
    </ul>
    <!-- 遮盖层 -->
    <div :class="currentType !== '' ? 'showDieCeng' :''" @click="closeOption()"></div>
  </div>
</template>

<script>
import apiPath from "@/service/apiPath";
import { baseUrl } from "@/config/env";

export default {
  data() {
    return {                
      coverMaxHeight: 0, //遮盖层高度
    };
  },
  props: ["filters", "selected","currentType","currentValue","tabClass"],
  beforeMount() {
    let h = document.documentElement.clientHeight || document.body.clientHeight;
    this.coverMaxHeight = h - 80;    
  },
  mounted() {
    //console.log(selected);
  },
  methods: {
    //切换tab(菜系，人均，排序)
    tab: function(type) {           
      this.$emit("tab", type);          
    },
    //关闭筛选
    closeOption: function() {
      this.$emit("closeOption"); 
    },
    //选择tab-具体值
    selectOption: function(selectType, selectKey, selectValue) {
      //传参
      let params = {
        'selectType': selectType,
        'selected': {
          'key': selectKey,
          'value': selectValue
        }
      };
      //获取商户集合
      this.$emit("selectMerchantFilter", params);
    }
  }
};
</script>

<style scoped>
.showDieCeng {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #333333;
  position: fixed;
  top: 82px;
  left: 0px;
  z-index: 999;
  opacity: 0.8;
}

ul {
  z-index: 1000;
}
.hideUl {
  display: none;
}
.tab{
    background: #fbb900;
    height: 2px;
    position: absolute;
    left: 0px;
    bottom: -1px;
    width: 0px;
}
</style>


