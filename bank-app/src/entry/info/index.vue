<template>
  <div>
    <mu-tabs :value="activeTab" @change="changeTab">
      <mu-tab value="policy" title="政策宣传"/>
      <mu-tab value="industry" title="行业动态"/>
      <mu-tab value="forum" title="金融论坛"/>
    </mu-tabs>
    <div v-if="activeTab === 'policy'" class="vv-article">
      <div>
        <div v-for="item in policy.list" :key="item.id" @click="redirect2detail('policy', item)" class="list-item">
          <span class="triangle-right"></span>
          <span>{{item.title}}</span>
        </div>
        <mu-infinite-scroll :scroller="policy.scroller" :loading="policy.loading" @load="onInfinite('policy')"/>
      </div>
      <banner class="vv-module" v-if="policy.banner.length" :banners="policy.banner"></banner>
    </div>
    <div v-if="activeTab === 'industry'" class="vv-article">
      <div>
        <div class="list-title">国内新闻</div>
        <div v-for="item in industry.list" :key="item.id" @click="redirect2detail('industry', item)" class="list-item">
          <span class="triangle-right"></span>
          <span>{{item.title}}</span>
        </div>
        <mu-infinite-scroll :scroller="industry.scroller" :loading="industry.loading" @load="onInfinite('industry')"/>
      </div>
      <banner class="vv-module" v-if="industry.banner.length" :banners="industry.banner"></banner>
    </div>
    <div v-if="activeTab === 'forum'" class="vv-article">
      <div>
        <div v-for="item in forum.list" :key="item.id" @click="redirect2detail('forum', item)" class="list-item">
          <span class="triangle-right"></span>
          <span>{{item.title}}</span>
        </div>
        <mu-infinite-scroll :scroller="forum.scroller" :loading="forum.loading" @load="onInfinite('forum')"/>
      </div>
      <banner class="vv-module" v-if="forum.banner.length" :banners="forum.banner"></banner>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import banner from '@/components/common/banner';
  export default {
    name: 'infoIndex',
    computed: mapGetters([]),
    components: {
      banner
    },
    data(){
      return {
        activeTab: "policy",
        policy: {
          loading: false,
          scroller: null,
          pageIndex: 0,
          pageSize: 20,
          totalPage: -1,
          list: [],
          banner: []
        },
        industry: {
          loading: false,
          scroller: null,
          pageIndex: 0,
          pageSize: 20,
          totalPage: -1,
          list: [],
          banner: []
        },
        forum: {
          loading: false,
          scroller: null,
          pageIndex: 0,
          pageSize: 20,
          totalPage: -1,
          list: [],
          banner: []
        }
      };
    },
    mounted(){
      let self = this;
      self.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: function () {
            window.location.href = "#/home/index";
          }
        },
        center: {
          img: "",
          title: "金融咨询",
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

      self.policy.scroller = self.$el;
      self.industry.scroller = self.$el;
      self.forum.scroller = self.$el;

      // 如果有携带参数则设置参数
      self.activeTab = self.$route.params["id"] || "policy";
      self.changeTab(self.activeTab);
    },
    methods: {
      goto(url) {
        if (!url) {
          return;
        }
        window.location.href = url;
      },
      gotoList(id) {
        window.location.href = '#/product/credit/list?query=' + id;
      },
      changeTab(value){
        let self = this;
        self.activeTab = value;
        if (self[value].totalPage == -1) {
          self.loadMore(value);

          // 第一次进来查询banner或者留言 todo
        }
      },
      redirect2detail(kind, item){
        window.location.href = "#/info/" + kind + "/" + item.id;
      },
      onInfinite(kind){
        console.warn('无法执行')
        let self = this;
        if (self[kind].loading) {
          return false;
        }

        if (self[kind].totalPage != -1 && self[kind].pageIndex >= self[kind].totalPage) {
          console.log("loadMore", self[kind].totalPage, self[kind].pageIndex);
          return false;
        }

        self.loadMore(kind);
      },
      loadMore(kind){
        let self = this;
        self[kind].loading = true;
        self[kind].pageIndex += 1;
        self.$sendRequest({
          url: "/info/list",
          params: {
            kind: kind,
            pageIndex: self[kind].pageIndex,
            pageSize: self[kind].pageSize
          },
          success(body){
            // for (let count = 0; count < body.data.list.length; ++count) {
            //   self[kind].list.push(body.data.list[count]);
            // }
            self[kind].list = self[kind].list.concat(body.data.list);
            self[kind].banner = self[kind].banner && self[kind].banner.concat(body.data.banner);
            self[kind].messages = self[kind].messages && self[kind].messages.concat(body.data.messages);
            self[kind].totalPage = body.data.totalPage;
            self[kind].loading = false;
          },
          error(err){
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
@import './../../assets/scss/_mixin.scss';
  .mu-tabs {
    position: fixed;
    background:#fff;
    color: $fontColor;
    border:1px solid $lineColor;
    .mu-tab-link{
      color:$fontColor;
    }
    .mu-tab-active{
      color: $mainColor;
    }
  }
  .vv-article {
    padding:60px 0 $spacing;
  }

  .message-container {
    margin:10px $spacing;
    background-color: $backgroudColor3;
    border-radius:$borderRadius;
    font-size:$fontSizeTitle;
  }

  .message-body {
    padding: 0 $spacing;
  }

  .message {
    display: block;
    box-sizing:border-box;
    width: 100%;
    padding: 8px 5px;
    word-break: break-all;
    word-wrap: break-word;
  }


</style>
