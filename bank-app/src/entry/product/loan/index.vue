<template>
  <div class="vv-content">
    <mu-raised-button label="企业用户贷款" to="/product/loan/search/company" class="demo-raised-button vv-button" primary/>
    <mu-raised-button label="个人用户贷款" to="/product/loan/search/personal" class="demo-raised-button vv-button" primary/>
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
.vv-content {
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  width:50%;
}

.vv-button {
  display: block;
  margin-bottom:50px;
  // width: 50%;
  &:last-child{
    margin-bottom:0;
  }
}
</style>
