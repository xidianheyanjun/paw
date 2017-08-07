<template>
  <div class="vv-wrapper">
    <div class="vv-content">
      <mu-raised-button label="企业用户贷款" to="/product/loan/search/company" class="demo-raised-button vv-button" primary/>
      <mu-raised-button label="个人用户贷款" to="/product/loan/search/personal" class="demo-raised-button vv-button" primary/>
    </div>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'loanIndex',
    data() {
      return {}
    },
    mounted () {
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
          title: "贷款产品",
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
    methods: {}
  }
</script>
<style scoped lang="scss">
@import './../../../assets/scss/_mixin.scss';
.vv-wrapper {
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: #eee;
  // background: url(../../../assets/images/sun.jpg) no-repeat;
  // background-size: 100% 100%;
}

.vv-content {
  position: absolute;
  width: 100%;
  height: 100%;
}

.vv-button {
  display: block;
  margin: 30% auto;
  width: 50%;
}
</style>
