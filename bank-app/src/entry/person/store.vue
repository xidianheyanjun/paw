<template>
  <div class="paper">
    <div class="setting">
      <div v-for="menu in person.storeKind" @click="forward(menu.href)" class="menu">
        <div class="menu-name">{{menu.name}}</div>
        <div class="menu-icon">&gt;</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'personStore',
    components: {},
    computed: mapGetters([
      "person"
    ]),
    data() {
      return {};
    },
    mounted() {
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
          title: "我的收藏",
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
      forward(href){
        window.location.href = href;
      }
    }
  }
</script>
<style scoped>
  .paper {
    display: block;
    width: 100%;
    height: 100%;
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
    width: 90%;
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
