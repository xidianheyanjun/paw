<template>
  <div class="paper">
    <div class="user-info">
      <div v-if="!person_isLogin" class="login-btn" @click="gotoUserCenter">
        <mu-avatar :src="avatar" class="avatar" />
        <a class="font-title mt-title">点击登录</a>
      </div>
      <div v-if="person_isLogin" class="login-btn" @click="gotoUserCenter">
        <mu-avatar :src="avatar" class="avatar" />
        <span class="font-title mt-title">{{account}}</span>
      </div>
    </div>
    
    <ul class="navs">
      <li class="vv-col vv-bg-light-blue">
        <div class="navs-item">
          <mu-flat-button
                        :class="home.finance.cssClass"
                        :icon="home.finance.icon" :labelClass="home.finance.labelClass"
                        :iconClass="home.finance.iconClass" primary/>
          {{home.finance.label}}
        </div>
        <div class="menus">
          <div v-for="menu in home.finance.subMenu" :class="menu.cssClass" @click="goto(menu.href)">
            {{menu.label}}
          </div> 
        </div>
      </li>
      <li class="vv-col vv-bg-deep-purple">
        <div class="navs-item">
          <mu-flat-button
                        :class="home.gb.cssClass"
                        :icon="home.gb.icon" :labelClass="home.gb.labelClass"
                        :iconClass="home.gb.iconClass" primary/>
          {{home.gb.label}}
        </div>
        <div class="menus">
          <div v-for="menu in home.gb.subMenu" :class="menu.cssClass" @click="goto(menu.href)">
            {{menu.label}}
          </div> 
        </div>
      </li>
      <li class="vv-col vv-bg-pink">
        <div class="navs-item">
          <mu-flat-button
                        :class="home.service.cssClass"
                        :icon="home.service.icon" :labelClass="home.service.labelClass"
                        :iconClass="home.service.iconClass" primary/>
          {{home.service.label}}
        </div>
        <div class="menus">
          <div v-for="menu in home.service.subMenu" :class="menu.cssClass" @click="goto(menu.href)">
            {{menu.label}}
          </div> 
        </div>
      </li>
      <li class="vv-col vv-bg-light-green">
        <div class="navs-item">
          <mu-flat-button
                        :class="home.info.cssClass"
                        :icon="home.info.icon" :labelClass="home.info.labelClass"
                        :iconClass="home.info.iconClass" primary/>
          {{home.info.label}}
        </div>
        <div class="menus">
          <div v-for="menu in home.info.subMenu" :class="menu.cssClass" @click="goto(menu.href)">
            {{menu.label}}
          </div> 
        </div>    
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import native from "@/util/native";
  const DEFAULT_AVATAR = require('./../../assets/images/atavar.png');
  export default {
    name: 'index',
    computed: mapGetters([
      "home"
    ]),
    data() {
      return {
        avatar: DEFAULT_AVATAR,
        person_isLogin: false
      }
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
      this.$store.dispatch('foot_setActive', 0);
      this.$store.dispatch("head_setHead", {
        // left: {
        //   img: "",
        //   title: "返回",
        //   callback: null
        // },
        center: {
          img: "",
          title: "惠银",
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
    destroyed() {
      this.$store.dispatch('foot_setActive', '');
    },
    methods: {
      goto(url){
        window.location.href = url;
      },
      gotoUserCenter() {
        // 客户端切换的接口都没回调的。。。
        if (!this.person_isLogin) {
          window.location.href = "#/person/login";
        } else {
          window.location.href = "#/person/index";
        }
        // this.$store.dispatch('foot_setActive', 1);
        // 一个tab对应一个webview，切换两边用户登录状态无法同步
        // native.gotoTab(1);
      }
    }
  }
</script>
<style scoped lang="scss">
@import './../../assets/scss/_mixin.scss';
  .paper {
    display: block;
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
  }

  // .info {
  //   position:relative;
  //   height: 180px;
  //   background-color: $bgColor;
  //   .login-btn {
  //     position:absolute;
  //     top:50%;
  //     left:50%;
  //     transform: translate(-50%, -50%);
  //     text-align:center;
  //   }
  //   .avatar {
  //     width: 60px;
  //     height: 60px;
  //   }
  //   .font-title{
  //     display:block;
  //     color: #dce0e6;
  //     font-size: 18px;
  //     margin-top: 10px;
  //   }
  // }


  .navs {
    height: 430px;
    .vv-col {
      display: -webkit-box;
      -webkit-box-align: center;
      -webkit-box-pack: justify;
      height: 95px;
      overflow: hidden;
      border-top: 1px solid $lineColor2;
      box-sizing: border-box;
    }
    .vv-bg-light-blue {
      background-color: #58abd4;
    }
    .vv-bg-deep-purple {
      background-color: #9a7aac;
    }
    .vv-bg-pink {
      background-color: #e33a4b;
    }
    .vv-bg-light-green {
      background-color: #98ba3f;
    }
  }

  .navs-item{
    // float: left;
    width: 23%;
    // padding: 10px 0;
    color: #fff;
    text-align: center;
    font-size: $fontSizeContent;
  }
  .vv-flat-button {
    margin: 0 auto 5px;
    min-width: 40px;
  }
  .menus{
    width:77%;
    height: 100%;
    box-sizing: border-box;
    background: #f8f8f8;
    padding: 0 5%;
  }
  .menus .vv-menu {
    float: left;
    color: #000;
    margin: 15px 0;
    width: 33%;
    padding: 28px 0;
    text-align: center;
    font-size: 14px;
  }

  .navs .vv-bg-deep-purple,
  .navs .vv-bg-pink {
    height: 120px;
  }
  .navs .vv-bg-deep-purple .navs-item,
  .navs .vv-bg-pink .navs-item {
    padding-top: 0;
  }
  .navs .vv-bg-deep-purple .menus,
  .navs .vv-bg-pink .menus {
    padding: 5px 0;
  }
  .navs .vv-bg-deep-purple .vv-menu{
    float:none;
    margin: 10px 0;
    padding: 5px 0;
    width: 100%;
  }
  .navs .vv-bg-pink .vv-menu {
    width: 50%;
    margin: 10px 0 0;
    padding: 5px 0;
  }
  .navs .vv-bg-pink .vv-menu:last-child {
    width: 100%;
    // margin-top: 4%;
  }
</style>
