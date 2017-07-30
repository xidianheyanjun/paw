<template>
  <div class="paper">
    <div class="form">
      <div class="vv-row">
        <div class="vv-col-title">手机号码</div>
        <div class="vv-col-value">
          <mu-text-field label="" hintText="" v-model.trim="account" type="number" :errorText="accountError" max="11" />
        </div>
      </div>
      <div class="vv-row">
        <div class="vv-col-title">密码</div>
        <div class="vv-col-value">
          <mu-text-field label="" hintText="(6-16位字符)" v-model.trim="password" type="password" :errorText="passwordError" :minLength="6" :maxLength="16" />
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
.form{
  width: 90%;
  margin: 8% auto;
}
.form .vv-row {
  display: block;
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  line-height: 40px;
}
.vv-row .vv-col-title {
  display: inline-block;
  width: 25%;
  margin-bottom: 4%;
  margin-right: 2%;
  vertical-align: middle;
  text-align: right;
}

.vv-row .vv-col-value {
  display: inline-block;
  width: 70%;
  overflow: hidden;
  text-align: left;
  vertical-align: middle;
}
.vv-row .vv-col-value .mu-text-field {
  width: 100%;
}

.vv-button {
  margin: 5% 0;
}

.link {
  color: #2196f3;
  text-decoration: underline;
}
.register {
  text-align: right;
  margin: 8% 0 0;
  font-size:12px;
}
</style>
