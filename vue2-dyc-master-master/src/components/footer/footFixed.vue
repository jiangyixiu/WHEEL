<template>
  <footer class="bgHs borTpHs dddborderB">
    <div class="mBxJyCm dpdt10 center10">
      <input type="button" @click="login()" class="yanzhengBtn" value="登录">
      <p @click="backToTop()">
        <span id="btn1">
          <a href="javascript:void(0);" class="colo333">回到顶部</a>
          <b class="bkgdSz125"></b>
        </span>
      </p>
    </div>
    <p class="mBxCm pad12 bkgdSz125 coloHs dftn10 lt22">Copyright ○ 2014-2017北京朝阳大悦城版权所有</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    /**
     * 回到顶部
     */
    backToTop: function() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    /**
     * 登录
     */
    login: function() {
      this.$router.push('/login')
    }
  }
};
</script>

<style scoped>
footer{
    position: fixed;
    z-index: 100;
    left: 0px;
    bottom: 0px;
    width: 100%;
    padding:0px 0px;
}
.center10{
    padding-left: 10px;
    padding-right: 10px;
}
</style>
