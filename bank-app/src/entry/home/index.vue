<template>
  <div class="vv-grid vv-tac vv-pr">
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

    <div class="vv-circle"></div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'index',
    computed: mapGetters([
      "home"
    ]),
    components: {},
    mounted(){
      this.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: null
        },
        center: {
          img: "",
          title: "首页",
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vv-grid {
    height: 100%;
  }

  .vv-grid .vv-row {
  }

  .vv-grid .vv-row .vv-col-lt {
    padding: 5% 0 0 2%;
    position: absolute;
    top: 0;
    left: 0;
    right: 52%;
    bottom: 52%;
  }

  .vv-grid .vv-row .vv-col-rt {
    padding: 5% 0 0 2%;
    position: absolute;
    top: 0;
    left: 52%;
    right: 0;
    bottom: 52%;
  }

  .vv-grid .vv-row .vv-col-lb {
    padding: 5% 0 0 2%;
    position: absolute;
    top: 52%;
    left: 0;
    right: 52%;
    bottom: 0;
  }

  .vv-grid .vv-row .vv-col-rb {
    padding: 5% 0 0 2%;
    position: absolute;
    top: 52%;
    left: 52%;
    right: 0;
    bottom: 0;
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

  .vv-circle {
    width: 20%;
    height: 0;
    padding-top: 20%;
    border-radius: 100%;
    border: 0px solid #ffffff;
    box-sizing: border-box;
    position: absolute;
    background-color: #ffffff;
    top: 43%;
    left: 40%;
  }
</style>
