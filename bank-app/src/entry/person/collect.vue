<template>
  <div class="user-paper user-paper-store">
    <div class="user-setting">
      <div v-if="list.length" v-for="(item, index) in list" :key="index" class="menu" @click="goto(item.path)">
        <div class="menu-name">{{item.name}}</div>
        <div class="menu-icon">&gt;</div>
      </div>
      <div class="no-data" v-if="!list.length">{{noDataTips}}</div>
    </div>

    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="onInfinite"/>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'personCollect',
    components: {},
    computed: mapGetters([
      "person"
    ]),
    data() {
      return {
        storeKind: '',
        list: [],
        noDataTips: '',
        pageIndex: 0,
        pageSize: 20,
        totalPage: -1,
        loading: false,
        scroller: null
      };
    },
    watch: {
      storeKind(v) {
        let noDataTips = '您还没收藏任何信息哦';
        if (v === 'credit') {
          noDataTips = '您还没收藏的信用卡优惠信息哦';
        } else if (v === 'finance') {
          noDataTips = '您还没收藏的理财信息哦';
        } else if (v === 'loan') {
          noDataTips = '您还没收藏的贷款信息哦';
        }
        this.noDataTips = noDataTips;
      }
    },
    mounted() {
      let self = this;
      self.storeKind = self.$route.params["id"] || "credit";
      self.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: function () {
            window.location.href = "#/person/store";
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
          url: "/user/collect",
          params: {
            storeKind: self.storeKind,
            pageIndex: self.pageIndex,
            pageSize: self.pageSize
          },
          success(body){
            for (let count = 0; count < body.data.list.length; ++count) {
              self.list.push(body.data.list[count]);
            }
            self.totalPage = body.data.totalPage;
            self.loading = false;
          },
          error(err){
            self.loading = false;
          }
        });
      },
      goto(path) {
        window.location.href = path;
      }
    }
  }
</script>
<style lang="scss">
@import './../../assets/scss/_mixin.scss';
.user-paper-store {
  background:#fff;
}
</style>
