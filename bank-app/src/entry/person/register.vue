<template>
  <div class="paper">
    <div class="form">
      <mu-text-field label="手机号码" v-model="account" hintText="" type="number" max="11" :errorText="accountError"/>
      <mu-text-field label="密码" v-model="password" hintText="(6-16位字符)" type="password" :minLength="6" :maxLength="16"
                     :errorText="passwordError"/>
      <mu-text-field label="再次输入密码" v-model="password2" hintText="(6-16位字符)" type="password" :minLength="6"
                     :maxLength="16" :errorText="passwordError2"/>
      <mu-raised-button label="立即注册" class="register-btn" @click="register" primary fullWidth/>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
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
        toast: false
      };
    },
    mounted() {
      this.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: function () {
            window.location.href = "#/person/login";
          }
        },
        center: {
          img: "",
          title: "注册",
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
        console.log(self.password)
        console.log(self.password2)
        if (self.password != self.password2) {
          self.passwordError2 = '两次输入的密码不一致';
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
      },

    }
  }
</script>
<style scoped>
  .paper {
    display: block;
    width: 100%;
    height: 100%;
  / / background-color: #f0f0f0;
  }

  .form {
    padding: 0 5% 10%;
  }

  .register-btn {
    margin: 5% 0;
  }

  .vv-toast {
    text-align: center;
  }
</style>
