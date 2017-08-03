<template>
  <div class="paper">
    <div class="info">
      <template v-if="!person_isLogin">
        <mu-avatar :src="avatar" class="avatar" />
        <div class="font-title mt-title" @click="login">点击登录</div>
      </template>
      <template v-if="person_isLogin">
        <mu-avatar :src="avatar" class="avatar" />
        <div class="font-title mt-title">{{account}}</div>
      </template>
    </div>

    <div class="setting">
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
  const DEFAULT_AVATAR = "static/images/atavar.png";
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
        left: {
          img: "",
          title: "返回",
          callback: function () {
            window.location.href = "#/home/index";
          }
        },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .paper {
    display: block;
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
  }

  .info {
    height: 30%;
    text-align: center;
    padding: 10%;
    background-color: #374760;
  }

  .avatar {
    width: 60px;
    height: 60px;
  }

  .font-title {
    color: #dce0e6;
    font-size: 18px;
  }

  .mt-title {
    margin-top: 5%;
  }

  .setting {
    background-color: #ffffff;
    margin: 4% 0;
  }

  .setting .menu {
    display: block;
    border-bottom: 1px solid #efefef;
  }

  .setting .menu .menu-name {
    display: inline-block;
    padding-left: 6%;
    width: 90%;
    font-size: 18px;
    height: 42px;
    line-height: 42px;
    color: #4b4b4b;
  }

  .setting .menu .menu-icon {
    display: inline-block;
    font-size: 18px;
    height: 42px;
    line-height: 42px;
    color: #cccccc;
  }
</style>
