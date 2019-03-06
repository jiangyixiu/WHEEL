<template>
  <div>
    <div class="alert" v-if="valert" @click="hideAlert()"></div>
    <!--alert提示-->
    <div class="warnbox" v-if="valert">
        <div class="alerttop borBmXx bgfff">
            <div class="w247box mBxMid">
                <div class="icowarn dui bkgdSz125"></div>
                <div class="mFlex1 colo333">{{valertMsg}}</div>
            </div>
        </div>
        <div class="mBxMid warnbtnbar">
            <input type="button" value="确定" class="redbtn  w110 ml15 redbbbb" @click="hideAlert()">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props:['valert', 'valertMsg'],
  methods: {
      hideAlert(){
        this.$parent.valert = false
        this.$parent.valertMsg = ''        
      }
  }
};
</script>

<style scoped>
.alert {
    width:100%;
    height:100%;
    overflow:hidden;
    background: #333333;
    position: fixed;
    top:0px;
    left:0px;
    z-index: 999;
    opacity: 0.8;    
}

.warnbox{
    width: 280px;
    height: 124px;
    position: fixed;
    z-index: 1000;
    margin-left: -140px;
    margin-top: -62px;
    top: 50%;
    left: 50%;
    background: #f6f6f6;
}
.warnbtnbar{
  line-height: 50px;
  margin: 10px 20px 10px 20px
}
.icowarn{
  width:31px;
    height:31px;
    display:block;
    margin-right:20px;
    background: url(../../images/ico.png) -36px -1511px;
}
</style>


