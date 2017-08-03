<template>
  <div class="paper">
    <div class="form">
      <div class="vv-row">
        <div class="vv-col-title">手机号码</div>
        <div class="vv-col-value">
          <mu-text-field label="" hintText="" v-model.trim="account" type="number" :errorText="accountError" max="11" @input="clearErrorTips('accountError')" />
        </div>
      </div>
      <div class="vv-row">
        <div class="vv-col-title">密码</div>
        <div class="vv-col-value">
          <mu-text-field label="" hintText="(6-16位字符)" v-model.trim="password" type="password" :errorText="passwordError" :minLength="6" :maxLength="16" @input="clearErrorTips('passwordError')" />
        </div>
      </div>
      <div class="vv-row">
        <div class="vv-col-title">再次输入密码</div>
        <div class="vv-col-value">
          <mu-text-field label="" hintText="(6-16位字符)" v-model.trim="password2" type="password" :errorText="passwordError2" :minLength="6" :maxLength="16" @input="clearErrorTips('passwordError2')" />
        </div>
      </div>
      <mu-raised-button label="立即注册" class="vv-button" @click="register" primary fullWidth/>
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
            // window.location.href = "#/person/login";
            history.back(-1);
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
      clearErrorTips(err) {
        this[err] = '';
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
  width: 30%;
  margin-bottom: 4%;
  margin-right: 2%;
  vertical-align: middle;
  text-align: right;
}

.vv-row .vv-col-value {
  display: inline-block;
  width: 65%;
  overflow: hidden;
  text-align: left;
  vertical-align: middle;
}
.vv-row .vv-col-value .mu-text-field {
  width: 100%;
}

.vv-button {
  margin: 10% 0;
}
</style>
