<template>
  <div>
    <head-title-vue page-title="会员登录"></head-title-vue>
    <div class="ztitle01">
      <div class="mBx qiehuan">
        <a
          href="javascript:void(0);"
          @click="toggle('member');"
          :class="{'phone':'mFlex1', 'member':'mFlex1 on'}[loginType]"
        >
          <span class="bkgdSz125">会员登录</span>
        </a>
        <a
          href="javascript:void(0);"
          @click="toggle('phone');"
          :class="{'phone':'mFlex1 on', 'member':'mFlex1'}[loginType]"
        >
          <span class="bkgdSz125">手机登录</span>
        </a>
        <div class="mianbaoxiexian"></div>
      </div>
      <ul class="dwLoginUl" v-if="loginType === 'member'">
        <li class="mBxJyCm">
          <input class="mFlex1" type="text" placeholder="输入手机号/Email">
        </li>
        <li class="mBxJyCm">
          <input class="mFlex1" type="password" placeholder="请输入您的密码">
        </li>
      </ul>
      <ul class="dwLoginUl" v-if="loginType === 'phone'">
        <li class="mBxJyCm">
          <input
            class="mFlex1"
            type="tel"
            placeholder="请输入您的手机号"
            v-model="phone.phoneNumber"
            v-model.trim="phone.phoneNumber"
          >
          <div class="prompt_chahao" v-show="phone.prompt"></div>
          <input
            v-show="phone.codeShow"
            :class="{true:'btn_code btn_code_disabled',false:'btn_code'}[countDown.show]"
            @click="getCode();"
            type="button"
            v-bind:value="phone.codeTitle"
          >
        </li>
        <li class="mBxJyCm">
          <input class="mFlex1" type="number" placeholder="请输入手机短信验证码" v-model="phone.code">
        </li>
      </ul>
    </div>
    <div class="mBxCm">
      <input class="yanzhengBtn btnCent" type="button" @click="login()" value="登录">
    </div>
  </div>
</template>

<script>
import headTitle from "@/components/header/headTitle";

export default {
  data() {
    return {
      loginType: "member", //登录方式 member-会员登录 phone-手机号登录
      //会员登录相关
      member: {
        account: "",
        pwd: ""
      },
      //手机号登录相关
      phone: {
        phoneNumber: "1567877776",
        code: "",
        prompt: false, //手机号输入框错误提示符号
        codeShow: false, //是否演示获取验证码按钮
        codeTitle: "获取验证码"
      },
      //倒计时相关
      countDown: {
        show: false, //是否显示倒计时
        count: 0,
        timer: null
      }
    };
  },
  //组件
  components: {
    headTitleVue: headTitle
  },
  methods: {
    //切换登录方式
    toggle: function(value) {
      this.loginType = value;
    },
    //获取验证码
    getCode: function() {
      const TIME_COUNT = 5; //默认倒计时时间

      //计时器未执行时
      if (!this.countDown.timer) {
        //各属性初始化
        this.countDown.count = TIME_COUNT;
        this.phone.codeTitle = "获取验证码(" + this.countDown.count + ")";
        this.countDown.show = true;
        this.countDown.timer = setInterval(() => {
          //倒计时时间大于1秒时
          if (this.countDown.count > 1 && this.countDown.count <= TIME_COUNT) {
            this.countDown.count--;
            this.phone.codeTitle = "获取验证码(" + this.countDown.count + ")";
          } else {
            //剩余最后1秒时，开始重置所有属性值
            this.phone.codeTitle = "获取验证码";
            this.countDown.show = false;
            //清空计时器
            clearInterval(this.countDown.timer);
            this.countDown.timer = null;
          }
        }, 1000);
      }
    },
    //登录
    login: function() {
      if (this.loginType === "member") {
      }

      if (this.loginType === "phone") {
      }
    }
  },
  //监听事件
  watch: {
    //手机号 - 输入值发生改变
    "phone.phoneNumber": function() {
      //手机号为空时
      if (this.phone.phoneNumber === "") {
        this.phone.prompt = false;
        this.phone.codeShow = false;
        return;
      }

      //正则校验
      var reg = /^1[3456789]\d{9}$/;
      if (!reg.test(this.phone.phoneNumber)) {
        //手机号格式错误
        this.phone.prompt = true;
        this.phone.codeShow = false;
        return;
      }

      //手机号通过校验
      this.phone.prompt = false;
      this.phone.codeShow = true;
    }
  }
};
</script>

<style scoped>

/* 符号 - × */
.prompt_chahao {
  width: 17px;
  height: 17px;
  background: url(../../images/ico.png) 0px -1866px no-repeat;
  background-size: 125px;
}

/* 获取验证码按钮样式 */
.btn_code {
  padding: 0px 10px;
  height: 36px;
  line-height: 22px;
  background: #fbb900;
  border-radius: 2px;
  color: #fff;
}
.btn_code_disabled {
  opacity: 0.6;
}

/* 面包屑 */
.mianbaoxiexian {
  display: block;
}
</style>

