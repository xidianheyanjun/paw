<template>
  <div class="paper">
    <div class="info">
      <mu-avatar :src="avatar" class="avatar"/>
      <div v-if="!person_isLogin" @click="login" class="font-title mt-title">点击登录</div>
      <div v-if="person_isLogin" class="font-title mt-title">{{account}}</div>
    </div>
    
    <ul class="navs">
      <li class="vv-col vv-bg-light-blue">
        <div class="navs-item" @click="goto(home.finance.href)">
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
        <div class="navs-item" @click="goto(home.gb.href)">
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
        <div class="navs-item" @click="goto(home.service.href)">
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
        <div class="navs-item" @click="goto(home.info.href)">
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
  <!--div class="vv-grid vv-tac vv-pr">
    <div class="vv-row">
      <div class="vv-col-lt vv-bg-light-blue">
        <mu-flat-button @click="goto(home.finance.href)" :key="home.finance.label"
                        :label="home.finance.label"
                        :class="home.finance.cssClass"
                        :icon="home.finance.icon" :labelClass="home.finance.labelClass"
                        :iconClass="home.finance.iconClass" primary/>
        <div v-for="menu in home.finance.subMenu" :class="menu.cssClass" @click="goto(menu.href)">
          <span :class="menu.iconClass"></span>
          <span :class="menu.labelClass">{{menu.label}}</span>
        </div>
      </div>
      <div class="vv-col-rt vv-bg-deep-purple">
        <mu-flat-button @click="goto(home.gb.href)" :key="home.gb.label"
                        :label="home.gb.label"
                        :class="home.gb.cssClass"
                        :icon="home.gb.icon" :labelClass="home.gb.labelClass"
                        :iconClass="home.gb.iconClass" primary/>
        <div v-for="menu in home.gb.subMenu" :class="menu.cssClass" @click="goto(menu.href)">
          <span :class="menu.iconClass"></span>
          <span :class="menu.labelClass">{{menu.label}}</span>
        </div>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-lb vv-bg-pink">
        <mu-flat-button @click="goto(home.service.href)" :key="home.service.label"
                        :label="home.service.label"
                        :class="home.service.cssClass"
                        :icon="home.service.icon" :labelClass="home.service.labelClass"
                        :iconClass="home.service.iconClass" primary/>
        <div v-for="menu in home.service.subMenu" :class="menu.cssClass" @click="goto(menu.href)">
          <span :class="menu.iconClass"></span>
          <span :class="menu.labelClass">{{menu.label}}</span>
        </div>
      </div>
      <div class="vv-col-rb vv-bg-light-green">
        <mu-flat-button @click="goto(home.info.href)" :key="home.info.label"
                        :label="home.info.label"
                        :class="home.info.cssClass"
                        :icon="home.info.icon" :labelClass="home.info.labelClass"
                        :iconClass="home.info.iconClass" primary/>
        <div v-for="menu in home.info.subMenu" :class="menu.cssClass" @click="goto(menu.href)">
          <span :class="menu.iconClass"></span>
          <span :class="menu.labelClass">{{menu.label}}</span>
        </div>
      </div>
    </div>

  </div-->
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'index',
    computed: mapGetters([
      "home"
    ]),
    data() {
      return {
        avatar: "static/images/atavar.png",
        person_isLogin: false
      }
    },
    mounted(){
      this.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: null
        },
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
    },
    methods: {
      goto(url){
        window.location.href = url;
      },
      login(){
        this.goto("#/person/login");
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
    box-sizing: border-box;
    height: 30%;
    text-align: center;
    padding: 10%;
    background-color: #374760;
  }

  .avatar {
    width: 80px;
    height: 80px;
  }

  .font-title {
    color: #dce0e6;
    font-size: 16px;
  }

  .mt-title {
    margin-top: 5%;
  }


  .navs {
    height: 70%;
  }
  .navs .vv-col{
    height: 22%;
    overflow: hidden;
    border-top: 1px solid #c1c1c1;
    box-sizing: border-box;
  }

  .navs .vv-bg-light-blue {
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
  
  .navs-item{
    float: left;
    width: 20%;
    padding: 5% 0;
    color: #fff;
    text-align: center;
    font-size: 13px;
  }
  .vv-flat-button {
    margin-bottom: 5px;
    min-width: 75px;
  }
  .menus{
    float: left;
    height: 100%;
    box-sizing: border-box;
    width: 80%;
    background: #f8f8f8;
    padding: 0 5%;
  }
  .menus .vv-menu {
    float: left;
    color: #000;
    margin: 10% 0;
    width: 33%;
    padding: 5% 0;
    text-align: center;
    font-size: 13px;
  }

  .navs .vv-bg-deep-purple,
  .navs .vv-bg-pink {
    height: 28%;
  }
  .navs .vv-bg-deep-purple .navs-item,
  .navs .vv-bg-pink .navs-item {
    padding-top: 7%;
  }
  .navs .vv-bg-deep-purple .menus,
  .navs .vv-bg-pink .menus {
    padding: 2% 0;
  }
  .navs .vv-bg-deep-purple .vv-menu{
    float:none;
    margin: 2% 0;
    padding: 2% 0;
    width: 100%;
  }
  .navs .vv-bg-pink .vv-menu {
    width: 50%;
    margin: 2% 0 0;
    padding: 2% 0;
  }
  .navs .vv-bg-pink .vv-menu:last-child {
    width: 100%;
    // margin-top: 4%;
  }
</style>
