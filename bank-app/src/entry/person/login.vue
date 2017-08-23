<template>
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
    <div class="ft">
      <a class="btn" href="#/person/register">免费注册</a>
      <a class="btn" href="#/person/register?type=find">忘记密码</a>
    </div>
    <mu-raised-button label="立即登录" class="vv-button" @click="login" primary fullWidth/>

    <div class="quick-login">
      <span class="title">其他登录方式</span>
      <a class="icon-weixin" @click="weixinLogin"></a>  
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
        passwordError: ''
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
      },
      weixinLogin() {
        let appid = '';// 微信开放平台申请
        let redirect_uri = encodeURIComponent(window.location.href);// 后端重定向地址
        let state = +new Date();// 随机数 防CSRF
        window.location.href = `https://open.weixin.qq.com/sns/explorer_broker?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${state}&connect_redirect=1#wechat_redirect`;
      }
    }
  }
</script>
<style scoped lang="scss">
@import './../../assets/scss/_mixin.scss';
.ft {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin:$spacing;
  font-size: $fontSizeContent;
  .btn {
    color: $fontColor2;
  }
}
.quick-login{
  position:absolute;
  bottom:0;
  left:5%;
  width:90%;
  height:90px;
  border-top:1px solid $lineColor;
  .title{
    position:absolute;
    top:-10px;
    left:50%;
    transform: translateX(-50%);
    padding:0 20px;
    background:#fff;
    display:block;
    font-size:$fontSizeTitle;
    color:$fontColor2;
    text-align:center;
  }
  .icon-weixin{
    display:block;
    margin:10px auto;
    background:url('./../../assets/images/icon-weixin.png') no-repeat;
    background-size:cover;
    width:60px;
    height:60px;
  }
}
</style>
