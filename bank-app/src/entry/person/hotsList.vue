<template>
  <div class="user-paper user-paper-store">
    <div class="user-setting">
      <div v-if="list.length" v-for="(item, index) in list" :key="index" class="menu" @click="goto(item.id)">
        <div class="menu-name">{{item.title}}</div>
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
    name: 'personHotsList',
    components: {},
    computed: mapGetters([
      "person"
    ]),
    data() {
      return {
        hotsKind: 0,
        list: [],
        noDataTips: '您暂无热点推送',
        pageIndex: 0,
        pageSize: 20,
        totalPage: -1,
        loading: false,
        scroller: null
      };
    },
    // watch: {
    //   hotsKind(v) {
    //     let noDataTips = '您暂无热点推送';
        // if (v === 'creditInfo') {
        //   noDataTips = '您还没最新信用卡资讯哦';
        // } else if (v === 'finance') {
        //   noDataTips = '您还没最热理财资讯哦';
        // } else if (v === 'policy') {
        //   noDataTips = '您还没最新政策哦';
        // } else if (v === 'creditSpecials') {
        //   noDataTips = '您还没最新信用卡优惠哦';
        // } else if (v === 'loanPolicy') {
        //   noDataTips = '您还没最新贷款政策哦';
        // }
    //     this.noDataTips = noDataTips;
    //   }
    // },
    mounted() {
      let self = this;
      self.hotsKind = parseInt(self.$route.params["id"]) || 0;
      self.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: function () {
            history.back(-1);
          }
        },
        center: {
          img: "",
          title: '热点推送',
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
          url: "/user/hotsList",
          params: {
            hotsKind: self.hotsKind,
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
      goto(id) {
        window.location.href = '#/person/hotsDetail/' + id;
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
