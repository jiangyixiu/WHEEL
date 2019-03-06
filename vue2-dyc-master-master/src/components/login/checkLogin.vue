<template>
  <div>
    <div class="expired" v-if="vexpired" @click="hideCover()"></div>
    <div class="warnbox" v-if="vexpired">
        <div class="alerttop borBmXx bgfff">
            <div class="w247box mBxMid">
                <div class="icowarn dui bkgdSz125"></div>
                <div class="mFlex1 colo333">{{vexpiredMsg}}</div>
            </div>
        </div>
        <div class="mBxMid warnbtnbar">
          <input type="button" value="以后再说" class="redbtn w110 redbbbb" @click="hideCover()">
          <input type="button" value="登录/注册" class="redbtn w110 ornBtn ml15" @click="login()">            
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props:['vexpired', 'vexpiredMsg'],
  methods: {
      hideCover(){
        this.$parent.vexpired = false
        this.$parent.vexpiredMsg = ''
      },
      login(){    
        console.log('to-login');    
        this.$router.push({name: 'login'});
      }
  }
};
</script>

<style scoped>
.expired {
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


