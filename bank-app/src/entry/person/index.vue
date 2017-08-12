<template>
  <div class="user-paper">
    <div class="user-info" @click="login">
      <div v-if="!person_isLogin" class="login-btn">
        <mu-avatar :src="avatar" class="avatar" />
        <a class="font-title mt-title">点击登录</a>
      </div>
      <div v-if="person_isLogin" class="login-btn">
        <mu-avatar :src="avatar" class="avatar" />
        <span class="font-title mt-title">{{account}}</span>
      </div>
    </div>

    <div class="user-setting">
      <div v-for="menu in person.menuList" @click="onMenuClick(menu.type, menu.param)" class="menu">
        <div class="menu-name">{{menu.name}}</div>
        <div class="menu-icon">&gt;</div>
      </div>
      <div v-show="person_isLogin" @click="logout" class="menu">
        <div class="menu-name">退出登录</div>
        <div class="menu-icon">&gt;</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import native from "@/util/native";
  const DEFAULT_AVATAR = require('./../../assets/images/atavar.png');
  export default {
    name: 'personIndex',
    computed: mapGetters([
      "person"
    ]),
    components: {},
    data(){
      return {
        avatar: DEFAULT_AVATAR,
        person_isLogin: false,
        account: ""
      };
    },
    watch: {
      person_isLogin(v) {
        if (v) {
          let userInfo = native.getUserInfo();
          this.account = userInfo.account || "";
          this.avatar = userInfo.avatar || DEFAULT_AVATAR;
        }
      }
    },
    mounted(){
      this.$store.dispatch("head_setHead", {
        // left: {
        //   img: "",
        //   title: "返回",
        //   callback: function () {
        //     window.location.href = "#/home/index";
        //   }
        // },
        center: {
          img: "",
          title: "个人中心",
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

      this.person_isLogin = native.isLogin();
    },
    methods: {
      login(){
        if (this.person_isLogin) {
          return;
        }
        this.forward("#/person/login");
      },
      forward(url){
        window.location.href = url;
      },
      logout(){
        let self = this;
        self.$sendRequest({
          url: "/user/logout",
          params: {},
          success(body){
            if (body.code != 'success') {
              self.$store.dispatch("box_set_toast", {
                show: true,
                toastText: body.msg
              });
              return false;
            }

            // 退出成功清除客户端token
            native.setUserInfo({
              userId: "",
              account: "",
              token: ""
            });

            self.person_isLogin = native.isLogin();

            self.$store.dispatch("box_set_toast", {
              show: true,
              toastText: "退出成功"
            });
          },
          error(err){
            self.$store.dispatch("box_set_toast", {
              show: true,
              toastText: "服务器繁忙,请稍后再试"
            });
          }
        });
      },
      onMenuClick(type, param){
        if (!native.isLogin()) {
          this.$store.dispatch("box_set_toast", {
            show: true,
            toastText: "请先登录"
          });
          this.forward("#/person/login");
          return false;
        }
        this[type](param);
      }
    }
  }
</script>
<style lang="scss" scoped>
@import './../../assets/scss/_mixin.scss';
  
</style>
