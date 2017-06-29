<template>
  <div class="vv-grid vv-tac vv-pr">
    <div class="vv-row">
      <div class="vv-col-lt vv-bg-light-blue">
        <mu-flat-button v-for="finance in home.financeList" @click="goto(finance.href)" :key="finance.label"
                        :label="finance.label"
                        :class="finance.cssClass"
                        :icon="finance.icon" :labelClass="finance.labelClass" :iconClass="finance.iconClass" primary/>
      </div>
      <div class="vv-col-rt vv-bg-deep-purple">
        <mu-flat-button v-for="gb in home.gbList" @click="goto(gb.href)" :key="gb.label" :label="gb.label"
                        :class="gb.cssClass"
                        :icon="gb.icon" :labelClass="gb.labelClass" :iconClass="gb.iconClass" primary/>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-lb vv-bg-pink">
        <mu-flat-button v-for="service in home.serviceList" @click="goto(service.href)" :key="service.label"
                        :label="service.label"
                        :class="service.cssClass"
                        :icon="service.icon" :labelClass="service.labelClass" :iconClass="service.iconClass" primary/>
      </div>
      <div class="vv-col-rb vv-bg-light-green">
        <mu-flat-button v-for="info in home.infoList" @click="goto(info.href)" :key="info.label" :label="info.label"
                        :class="info.cssClass"
                        :icon="info.icon" :labelClass="info.labelClass" :iconClass="info.iconClass" primary/>
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
