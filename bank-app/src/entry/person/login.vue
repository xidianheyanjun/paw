<template>
  <div class="paper">
    <div class="form">
      <mu-text-field label="手机号码" v-model="account" hintText="" type="number" max="11" :errorText="accountError"/>
      <mu-text-field label="密码" v-model="password" hintText="(6-16位字符)" type="password" :minLength="6" :maxLength="16"
                     :errorText="passwordError"/>
      <div class="register">没有账号？<a :href="registerUrl">马上注册</a></div>
      <mu-raised-button label="立即登录" class="register-btn" @click="login" primary fullWidth/>
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
              userId: body.userId,
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
<style scoped>
  .paper {
    display: block;
    width: 100%;
    height: 100%;
  }

  .form {
    padding: 0 5% 10%;
  }

  .register-btn {
    margin: 5% 0;
  }

  .register {
    text-align: right;
    margin: 20px 0;
  }
</style>
