<template>
  <div class="vv-grid vv-tac vv-pr">
    <mu-row gutter class="vv-row">
      <mu-col width="50" tablet="50" desktop="50" class="vv-col vv-bg-light-blue">
      </mu-col>
      <mu-col width="50" tablet="50" desktop="50" class="vv-col vv-bg-deep-purple">
      </mu-col>
    </mu-row>
    <mu-row gutter class="vv-row vv-mt10">
      <mu-col width="50" tablet="50" desktop="50" class="vv-col vv-bg-pink">
      </mu-col>
      <mu-col width="50" tablet="50" desktop="50" class="vv-col vv-bg-light-green">
      </mu-col>
    </mu-row>

    <div class="vv-circle"></div>
  </div>
</template>

<script>
  export default {
    name: 'index',
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
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: #ffffff;
    position: absolute;
    top: 45%;
    left: 43%;
  }
</style>
