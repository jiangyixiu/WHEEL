<template>
  <div>
    <!-- 透明遮盖层 -->
    <div class="cover loading" v-if="loading" @click="hideLoading()"></div>    
    <!-- loading加载中div框 -->
    <div class="loadingbox mBxCm" v-if="loading">
      <div>
        <div class="reloading"></div>
        <div class="mBxCm">加载中...</div>
      </div>
    </div>

    <div class="cover warn" v-if="isShowCover" @click="hideCover()"></div>
    <!--confirm提示-->
    <div class="warnbox" v-if="isShowConfirm">
        <div class="alerttop borBmXx bgfff">
            <div class="w247box mBxMid">
                <div class="icowarn dui bkgdSz125"></div>
                <div class="mFlex1 colo333">登录后才可以收藏商家哦</div>
            </div>
        </div>
        <div class="mBxMid warnbtnbar">
          <input type="button" value="以后再说" class="redbtn w110 redbbbb" @click="hideCover()">
          <input type="button" value="登录/注册" class="redbtn w110 ornBtn ml15" @click="login()">            
        </div>
    </div>
    <!--alert提示-->
    <div class="warnbox" v-if="isShowAlert">
        <div class="alerttop borBmXx bgfff">
            <div class="w247box mBxMid">
                <div class="icowarn dui bkgdSz125"></div>
                <div class="mFlex1 colo333">您的订单尚未完成，确定要离开吗？</div>
            </div>
        </div>
        <div class="mBxMid warnbtnbar">
            <input type="button" value="确定" class="redbtn  w110 ml15 redbbbb">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props:['loading', 'isShowCover', 'isShowConfirm', 'isShowAlert', 'warnMsg'],
  methods: {
      hideLoading(){
        //this.loading = false;
      },
      hideCover(){
        //this.isShowCover = this.isShowAlert = this.isShowConfirm = false;        
      },
      login(){        
        this.$router.push({name: 'login'});
      }
  }
};
</script>

<style scoped>
.cover {
    width:100%;
    height:100%;
    overflow:hidden;
    background: #333333;
    position: fixed;
    top:0px;
    left:0px;
    z-index: 999;    
}
.loading {
    opacity: 0.3;
}
.warn {
  opacity: 0.8;
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


