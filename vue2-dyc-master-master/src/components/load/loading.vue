<template>
  <div>
    <!-- 透明遮盖层 -->
    <div class="loading" v-if="vloading" @click="hideLoading()"></div>    
    <!-- loading加载中div框 -->
    <div class="loadingbox mBxCm" v-if="vloading">
      <div>
        <div class="reloading"></div>
        <div class="mBxCm">加载中...</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props:['vloading'],
  methods: {
      hideLoading(){
        //console.log('debug')
        this.$parent.vloading = false
      },
  }
};
</script>

<style scoped>
.loading {
    width:100%;
    height:100%;
    overflow:hidden;
    background: #333333;
    position: fixed;
    top:0px;
    left:0px;
    z-index: 999;   
    opacity: 0.3; 
}

.loadingbox {
    width: 130px;
    height: 130px;
    border-radius: 3px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -65px;
    margin-top: -65px;
    z-index: 1000;
    color: #fff;
    font-size: 16px;
    text-align: center
}
.reloading{
    width: 42px;
    height: 42px;
    background: url(../../images/loadings.png) no-repeat 0px 0px;
    background-size: 42px;
    margin: 0px auto 15px auto;
    display: block;        
    animation: mymove 1.3s infinite linear;
    -webkit-animation: mymove 1.3s infinite linear;
}
</style>


