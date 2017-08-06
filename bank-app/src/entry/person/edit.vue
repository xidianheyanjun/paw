<template>
  <div class="paper">
    <div class="setting">
      <div class="menu">
        <div class="menu-name">头像</div>
        <div class="menu-icon">
          <mu-avatar :src="avatar" class="avatar"/>
        </div>
      </div>
      <div class="menu">
        <div class="menu-name">手机号</div>
        <div class="menu-icon">{{account}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import native from "@/util/native";
  export default {
    name: 'personEdit',
    computed: mapGetters([]),
    components: {},
    data(){
      return {
        avatar: "static/images/atavar.png",
        account: ""
      };
    },
    mounted(){
      this.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: function () {
            window.location.href = "#/person/index";
          }
        },
        center: {
          img: "",
          title: "个人资料",
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

      // 从服务器拉取数据填充

      let userInfo = native.getUserInfo();
      this.account = userInfo.account || "";
    },
    methods: {
      onMenuClick(type, param){
        switch (type) {
          case "forward":
            window.location.href = param;
            break;
        }
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
    background-color: $bgColor2;
  }

  .setting {
    background-color: #fff;
    .menu {
      display: -webkit-box;
      -webkit-box-align: center;
      -webkit-box-pack: justify;
      padding: 5px $spacing;
      border-bottom: 1px solid $lineColor;
    }
    .menu-name {
      // width: 90%;
      font-size: $fontSize;
      height: 42px;
      line-height: 42px;
    }
    .menu-icon {
      width: 42px;
      font-size: 18px;
      height: 42px;
      line-height: 42px;
      text-align:center;
      color: #ccc;
    }
  }
</style>
