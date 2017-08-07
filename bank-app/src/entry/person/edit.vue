<template>
  <div class="user-paper">
    <div class="user-setting edit">
      <div class="menu">
        <div class="menu-name">头像</div>
        <div class="menu-icon">
          <mu-avatar :src="avatar" class="avatar"/>
        </div>
      </div>
      <div class="menu mobile">
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

<style lang="scss">
@import './../../assets/scss/_mixin.scss';
.user-setting.edit{
  .menu{
    padding-right:$spacing;
  }
  .mobile .menu-icon{
    width:auto;
    height:auto;
    font-size:$fontSizeContent;
  }
  .menu-icon,
  .mu-avatar{
    width:32px;
    height:32px;
  }
}
</style>
