<template>
  <div class="vv-grid vv-tac vv-pr">
    <mu-row gutter class="vv-row">
      <mu-col width="50" tablet="50" desktop="50" class="vv-col vv-bg-light-blue">
        <mu-flat-button v-for="finance in home.financeList" :key="finance.label" :label="finance.label"
                        :class="finance.cssClass"
                        :icon="finance.icon" :labelClass="finance.labelClass" :iconClass="finance.iconClass" primary/>
      </mu-col>
      <mu-col width="50" tablet="50" desktop="50" class="vv-col vv-bg-deep-purple">
        <mu-flat-button v-for="gb in home.gbList" :key="gb.label" :label="gb.label" :class="gb.cssClass"
                        :icon="gb.icon" :labelClass="gb.labelClass" :iconClass="gb.iconClass" primary/>
      </mu-col>
    </mu-row>
    <mu-row gutter class="vv-row vv-mt10">
      <mu-col width="50" tablet="50" desktop="50" class="vv-col vv-bg-pink">
        <mu-flat-button v-for="service in home.serviceList" :key="service.label" :label="service.label"
                        :class="service.cssClass"
                        :icon="service.icon" :labelClass="service.labelClass" :iconClass="service.iconClass" primary/>
      </mu-col>
      <mu-col width="50" tablet="50" desktop="50" class="vv-col vv-bg-light-green">
        <mu-flat-button v-for="info in home.infoList" :key="info.label" :label="info.label" :class="info.cssClass"
                        :icon="info.icon" :labelClass="info.labelClass" :iconClass="info.iconClass" primary/>
      </mu-col>
    </mu-row>

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
          title: "去登陆",
          callback: null
        }
      });

      this.$store.dispatch("foot_setActive", 0);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vv-grid {
    height: 100%;
  }

  .vv-grid .vv-row {
    height: 48%;
  }

  .vv-grid .vv-row.vv-mt10 {
    margin-top: 4%;
  }

  .vv-grid .vv-row .vv-col {
    height: 100%;
    padding: 5% 0 0 2%;
  }

  .vv-bg-light-blue {
    background-color: #40c4ff;
  }

  .vv-bg-deep-purple {
    background-color: #b39ddb;
  }

  .vv-bg-pink {
    background-color: #e91e63;
  }

  .vv-bg-light-green {
    background-color: #8bc34a;
  }

  .vv-circle {
    margin: -82% auto 0;
    width: 20%;
    height: 0;
    padding-top: 20%;
    border-radius: 100%;
    border: 0px solid #ffffff;
    box-sizing: border-box;
    position: relative;
    background-color: #ffffff;
  }
</style>
