<template>
  <div class="paper">
    <div class="vv-form">
      <div class="vv-row">
        <div class="vv-col-title">手机号</div>
        <div class="vv-col-value">
          <mu-text-field label="" hintText="请输入手机号" v-model.trim="account" type="number" :errorText="accountError" max="11" @input="clearErrorTips('accountError')" :underlineShow="false" />
        </div>
      </div>
      <div class="vv-row">
        <div class="vv-col-title">密 码</div>
        <div class="vv-col-value">
          <mu-text-field label="" hintText="请输入密码" v-model.trim="password" type="password" :errorText="passwordError" :minLength="6" :maxLength="16" @input="clearErrorTips('passwordError')" :underlineShow="false" />
        </div>
      </div>
      <div class="vv-row">
        <div class="vv-col-title">再次输入密码</div>
        <div class="vv-col-value">
          <mu-text-field label="" hintText="请再次输入密码" v-model.trim="password2" type="password" :errorText="passwordError2" :minLength="6" :maxLength="16" @input="clearErrorTips('passwordError2')" :underlineShow="false" />
        </div>
      </div>
      <div class="vv-row">
        <div class="vv-col-title">验证码</div>
        <div class="input-box">
          <input ref="input" type="" class="input mu-text-field-input" placeholder="请输入验证码" v-model.trim="indentifyCode" :disabled="isValidate" @input="clearErrorTips('indentifyCodeError')">
          <div class="err-msg" v-text="indentifyCodeError"></div>
          <a class="btn-send" :class="{'send': isSend}" @click="sendCodeBtnClick" v-text="sendCodeText"></a>
        </div>
      </div>
      <mu-raised-button :label="btnTxt" class="vv-button" @click="register" primary fullWidth/>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  const RESEND_TIME = 10;
  let sendIndentifyCodeTimer = null;
  export default {
    name: 'personRegister',
    computed: mapGetters([]),
    data() {
      return {
        account: '',
        accountError: '',
        password: '',
        passwordError: '',
        password2: '',
        passwordError2: '',
        btnTxt: '立即注册',
        indentifyCode: '',
        indentifyCodeError: '',
        isSend: false,
        isValidate: false,
        sendCodeText:'获取',
        resendTime: RESEND_TIME,
        toast: false
      };
    },
    watch: {
      resendTime(v1) {
        if (v1 && (v1 < RESEND_TIME)) {
          this.sendCodeText = this.resendTime + 's';
          this.isSend = true;
        } else if (v1 === 0) {
          this.sendCodeText = '获取';
          this.isSend = false;
        }
      }
    },
    mounted() {
      let titleTxt = '注册';
      let isFindpassword = this.$route.query['type'];
      if (isFindpassword == 'find') {
        titleTxt = '找回密码';
        this.btnTxt = '修改密码';
      }
      this.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: function () {
            // window.location.href = "#/person/login";
            history.back(-1);
          }
        },
        center: {
          img: "",
          title: titleTxt,
          callback: null
        },
        right: {
          img: "",
          title: "地图",
          callback: function () {
            window.location.href = "#/common/map";
          }
        }
      });
    },
    methods: {
      clearErrorTips(err) {
        this[err] = '';
      },
      sendCodeBtnClick() {
        let self = this;
        this.$sendRequest({
          url: '/user/indentifyCode',
          params:{
          },
          success(body) {
            let msg = '';
            if (body.code === 'success') {
              msg = '发送成功';
              self.countdownTime();
            } else {
              msg = body.msg;
            }
            self.$store.dispatch('box_set_toast', {
              show: true,
              toastText: msg
            });
          },
          error(err) {
            self.$store.dispatch('box_set_toast', {
              show: true,
              toastText: '服务器繁忙,请稍后再试'
            });
          }
        });
      },
      countdownTime() {
        let time = 1000;
        if (sendIndentifyCodeTimer) {
          clearInterval(sendIndentifyCodeTimer);
          sendIndentifyCodeTimer = null;
        }
        sendIndentifyCodeTimer = setInterval(() => {
          this.resendTime--;
          if (this.resendTime < 0) {
            this.resendTime = 0;
            clearInterval(sendIndentifyCodeTimer);
            sendIndentifyCodeTimer = null;
          }
        }, time);
      },
      register() {
        let self = this;
        if (!self.account.length) {
          self.accountError = '手机号不能为空';
          return;
        }
        if (!self.password.length) {
          self.passwordError = '密码不能为空';
          return;
        }
        if (self.password != self.password2) {
          self.passwordError2 = '两次输入的密码不一致';
          return;
        }
        if (!self.indentifyCode.length) {
          self.indentifyCodeError = '验证码不能为空';
          return;
        }

        self.$sendRequest({
          url: "/user/register",
          params: {
            account: self.account,
            password: self.password
          },
          success(body){
            let msg = body.code == "success" ? "注册成功" : body.msg;
            self.$store.dispatch("box_set_toast", {
              show: true,
              toastText: msg
            });

            if (body.code == 'success') {
              window.location.href = "#/person/login";
            }
          },
          error(err){
            console.log(err);
            self.$store.dispatch("box_set_toast", {
              show: true,
              toastText: "服务器繁忙,请稍后再试"
            });
            return false;
          }
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
@import './../../assets/scss/_mixin.scss';
.vv-form {
  .vv-col-title {
    width:35%;
  }
  .vv-col-value {
    width: 65%;
  }
}
</style>
