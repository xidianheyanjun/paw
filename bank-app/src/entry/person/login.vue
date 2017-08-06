<template>
  <div class="paper">
    <div class="vv-form">
      <div class="vv-row">
        <div class="vv-col-title">手机号</div>
        <div class="vv-col-value">
          <mu-text-field label="" hintText="" v-model.trim="account" type="number" :errorText="accountError" max="11" @input="clearErrorTips('accountError')" :underlineShow="false" />
        </div>
      </div>
      <div class="vv-row">
        <div class="vv-col-title">密 码</div>
        <div class="vv-col-value">
          <mu-text-field label="" hintText="" v-model.trim="password" type="password" :errorText="passwordError" :minLength="6" :maxLength="16" @input="clearErrorTips('passwordError')" :underlineShow="false" />
        </div>
      </div>
      <div class="register">没有账号？<a class="link" :href="registerUrl">马上注册</a></div>
      <mu-raised-button label="立即登录" class="vv-button" @click="login" primary fullWidth/>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import native from "@/util/native";
  export default {
    name: 'personLogin',
    components: {},
    computed: mapGetters([]),
    data() {
      return {
        account: '',
        accountError: '',
        password: '',
        passwordError: '',
        registerUrl: "#/person/register"
      };
    },
    mounted() {
      this.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: function () {
            // window.location.href = "#/person/index";
            history.back(-1);
          }
        },
        center: {
          img: "",
          title: "登录",
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
      login() {
        let self = this;
        if (!self.account.length) {
          self.accountError = '手机号不能为空';
          return;
        }
        if (!self.password.length) {
          self.passwordError = '密码不能为空';
          return;
        }

        self.$sendRequest({
          url: "/user/login",
          params: {
            account: self.account,
            password: self.password
          },
          success(body){
            if (body.code != 'success') {
              self.$store.dispatch("box_set_toast", {
                show: true,
                toastText: body.msg
              });
              return false;
            }

            // 登录成功写token到客户端
            native.setUserInfo({
              userId: body.data.userId || '',
              account: self.account,
              token: body.token
            });

            // 跳转到个人中心
            window.location.href = "#/person/index";
          },
          error(err){
            self.$store.dispatch("box_set_toast", {
              show: true,
              toastText: "服务器繁忙,请稍后再试"
            });
          }
        });
      }
    }
  }
</script>
<style scoped lang="scss">
@import './../../assets/scss/_mixin.scss';
.register {
  text-align: right;
  margin:$spacing $spacing 0 0;
  font-size: $fontSizeContent;
}
.link {
  color: $mainColor;
  text-decoration: underline;
}
</style>
