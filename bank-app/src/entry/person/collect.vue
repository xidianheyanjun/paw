<template>
  <div class="paper">
    <div class="setting">
      <div v-for="item in list" class="menu">
        <div class="menu-name">{{item.name}}</div>
        <div class="menu-icon">&gt;</div>
      </div>
    </div>

    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="onInfinite"/>
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
        list: [],
        pageIndex: 0,
        pageSize: 20,
        totalPage: -1,
        loading: false,
        scroller: null
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

      self.scroller = self.$el;

      // 分页查询
      self.loadMore();
    },
    methods: {
      onInfinite(){
        let self = this;
        if (self.loading) {
          return false;
        }

        if (self.totalPage != -1 && self.pageIndex >= self.totalPage) {
          console.log("loadMore", self.totalPage, self.pageIndex);
          return false;
        }

        self.loadMore();
      },
      loadMore(){
        let self = this;
        self.loading = true;
        self.pageIndex += 1;
        self.$sendRequest({
          url: "/person/collect",
          params: {
            storeKind: self.storeKind,
            pageIndex: self.pageIndex,
            pageSize: self.pageSize
          },
          success(body){
            for (let count = 0; count < body.list.length; ++count) {
              self.list.push(body.list[count]);
            }
            self.totalPage = body.totalPage;
            self.loading = false;
          },
          error(err){
          }
        });
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
