<template>
  <div class="paper">
    <div class="info">
      <mu-avatar :src="avatar" class="avatar"/>
      <div v-if="!isLogin" @click="login" class="font-title mt-title">立即登录</div>
      <div v-if="person.isLogin" class="font-title mt-title">busy boy</div>
    </div>

    <div class="setting">
      <div v-for="menu in person.menuList" @click="onMenuClick(menu.type, menu.param)" class="menu">
        <div class="menu-name">{{menu.name}}</div>
        <div class="menu-icon">&gt;</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'personIndex',
    computed: mapGetters([
      "person"
    ]),
    components: {},
    data(){
      return {
        avatar: "static/images/person.jpg"
      };
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
    },
    methods: {
      login(){
        this.isLogin = true;
      },
      logout(){
        this.isLogin = false;
      },
      forward(url){
        window.location.href = url;
      },
      onMenuClick(type, param){
        if (!this.person.isLogin) {
          forward("#/person/login");
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
    text-align: center;
    padding: 10%;
    background-color: #374760;
  }

  .avatar {
    width: 20%;
    height: 20%;
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
    width: 80%;
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
