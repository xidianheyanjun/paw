<template>
  <div class="paper">
    <div class="setting">
      <div v-for="item in list" class="menu">
        <div class="menu-name">{{item.name}}</div>
        <div class="menu-icon">&gt;</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'personCollect',
    components: {},
    computed: mapGetters([
      "person"
    ]),
    data() {
      return {
        storeKind: "",
        list: []
      };
    },
    mounted() {
      let self = this;
      self.storeKind = self.$route.params["id"] || "credit";
      self.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: function () {
            window.location.href = "#/person/index";
          }
        },
        center: {
          img: "",
          title: self.person.mapStoreKind[self.storeKind],
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

      // 分页查询 todo
    },
    methods: {}
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
    width: 80%;
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
