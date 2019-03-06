<template>
  <div>
    <!-- 浮动导航框 -->
    <div
      @mousedown="down"
      @touchstart="down"
      @mousemove="move"
      @touchmove="move"
      @mouseup="end"
      @touchend="end"
      class="navlistbox"
      id="divNavlistBox"
      v-bind:style="divNavlistStyle">
      <router-link :to="{name:'HelloWorld'}" v-bind:class="ico_home_page_class"></router-link>
      <router-link :to="{name:'index'}" v-bind:class="ico_user_class"></router-link>
      <div @click="click()" :class="{true:'bgsize270 bg-56',false:'bgsize270 bg-1'}[isShowCover]"></div>
    </div>
    <!-- 遮盖层 -->
    <div :class="{true:'showCover', false:'hideCover'}[isShowCover]" @click="cancelCover()"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowCover: false, //打开遮盖层 false否, true是
      positionHorizontal: "left",  //浮动导航框相对于页面的方位(左边 | 右边)
      positionVertical: "bottom",  //浮动导航框相对于页面的方位(顶部 | 底部)
      ico_home_page_class: "",  //第一个icon[回到主页]的样式
      ico_user_class: "",  //第二个icon[个人中心]的样式
      divNavlistStyle: "",  //浮动导航框的样式
      flag: true //是否可拖动
    };
  },
  methods: {
    //点击浮动导航框
    click: function() {
      //变量重新赋值
      this.flag = !this.flag;
      this.isShowCover = !this.isShowCover;
      //动态设置导航框里icon的样式
      this.ico_home_page_class = this.isShowCover ? "ico_home_page_" + this.positionHorizontal + "_" + this.positionVertical : '';
      this.ico_user_class = this.isShowCover ? "ico_user_" + this.positionHorizontal + "_" + this.positionVertical : '';
    },
    //取消遮盖层
    cancelCover: function() {
      //变量重新赋值
      this.flag = true;
      this.isShowCover = false;
      this.ico_home_page_class = "";
      this.ico_user_class = "";      
    },
    down: function() {},
    //拖动浮动导航框
    move: function() {
      event.preventDefault(); //阻止默认事件，防止拖动浮动导航框时，页面跟随变动
      //console.log(event);
      if (this.flag && event.changedTouches) {
        //更新导航框样式 - 更新导航位置
        let x = event.changedTouches[0].pageX;
        let y = event.changedTouches[0].pageY;
        let scrollTop =
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          window.pageYOffset;
        let left = x - 26;
        let top = y - 26 - scrollTop;
        this.divNavlistStyle = "left:" + left + "px;top:" + top + "px;";

        //通过计算 - 更新导航框位置变量值
        let width =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
        let height =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight;
        let offsetTop = event.path[1].offsetTop;
        let offsetLeft = event.path[1].offsetLeft;

        if (offsetLeft < width / 2) {
          this.positionHorizontal = 'left';
        }else{
          this.positionHorizontal = 'right';
        }

        if(offsetTop < 76){
          this.positionVertical = 'top';
        }else{
          this.positionVertical = 'bottom';
        }
      }
    },
    end: function() {}
  }
};
</script>

<style scoped>
.showCover {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #333333;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;
  opacity: 0.8;
  display: block;
}

.hideCover {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #333333;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;
  opacity: 0.8;
  display: none;
}

/* start 第一个icon样式 */

.ico_home_page_left_bottom {
  top: -70px;
  left: 30px;
  margin-left: 0px;
  margin-top: 0px;
}
.ico_user_left_bottom {
  top: -32px;
  left: 92px;
  margin-left: 0px;
  margin-top: 0px;
}

.ico_home_page_right_bottom {
  top: -70px;
  left: -14px;
  margin-left: 0px;
  margin-top: 0px;
}
.ico_user_right_bottom {
  top: -32px;
  left: -76px;
  margin-left: 0px;
  margin-top: 0px;
}

.ico_home_page_left_top {
  top: 70px;
  left: 30px;
  margin-left: 0px;
  margin-top: 0px;
}
.ico_user_left_top {
  top: 32px;
  left: 92px;
  margin-left: 0px;
  margin-top: 0px;
}

.ico_home_page_right_top {
  top: 70px;
  left: -14px;
  margin-left: 0px;
  margin-top: 0px;
}
.ico_user_right_top {
  top: 32px;
  left: -76px;
  margin-left: 0px;
  margin-top: 0px;
}
/* end */
</style>
