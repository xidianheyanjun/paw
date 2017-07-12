<template>
  <div>
    <mu-tabs :value="activeTab" @change="changeTab">
      <mu-tab value="policy" title="政策宣传"/>
      <mu-tab value="industry" title="行业动态"/>
      <mu-tab value="forum" title="金融论坛"/>
    </mu-tabs>
    <div v-if="activeTab === 'policy'" class="tab-body">
      <div>
        <div v-for="item in policy.list" :key="item.id" @click="redirect2detail('policy', item)" class="list-item">
          <span class="triangle-right"></span>
          <span>{{item.title}}</span>
        </div>
        <mu-infinite-scroll :scroller="policyScroller" :loading="policyLoading" @load="onInfinite('policy')"/>
      </div>
      <hr class="divid-line"/>
      <div>
        <mu-list-item v-for="item in policy.banner" :key="item.id">
          <img :src="item.img" class="banner"/>
        </mu-list-item>
      </div>
    </div>
    <div v-if="activeTab === 'industry'" class="tab-body">
      <div>
        <div class="list-title">国内新闻</div>
        <div v-for="item in industry.list" :key="item.id" @click="redirect2detail('industry', item)" class="list-item">
          <span class="triangle-right"></span>
          <span>{{item.title}}</span>
        </div>
        <mu-infinite-scroll :scroller="industryScroller" :loading="industryLoading" @load="onInfinite('industry')"/>
      </div>
      <hr class="divid-line"/>
      <div>
        <mu-list-item v-for="item in industry.banner" :key="item.id">
          <img :src="item.img" class="banner"/>
        </mu-list-item>
      </div>
    </div>
    <div v-if="activeTab === 'forum'" class="tab-body">
      <div>
        <div v-for="item in forum.list" :key="item.id" @click="redirect2detail('forum', item)" class="list-item">
          <span class="triangle-right"></span>
          <span>{{item.title}}</span>
        </div>
        <mu-infinite-scroll :scroller="forumScroller" :loading="forumLoading" @load="onInfinite('forum')"/>
      </div>
      <hr class="divid-line"/>
      <div class="message-container">
        <div class="list-title">留言</div>
        <div class="message-body">
          <div v-for="message in forum.messages" class="message">{{message.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'infoIndex',
    computed: mapGetters([]),
    components: {},
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
          banner: [{
            img: "static/images/banner.png",
            id: "5"
          }, {
            img: "static/images/banner.png",
            id: "6"
          }]
        },
        industry: {
          loading: false,
          scroller: null,
          pageIndex: 0,
          pageSize: 20,
          totalPage: -1,
          list: [],
          banner: [{
            img: "static/images/banner.png",
            id: "5"
          }]
        },
        forum: {
          loading: false,
          scroller: null,
          pageIndex: 0,
          pageSize: 20,
          totalPage: -1,
          list: [],
          messages: [{
            text: "赵先生：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            id: "1"
          }, {
            text: "钱先生：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            id: "2"
          }, {
            text: "孙先生：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            id: "3"
          }, {
            text: "李先生：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            id: "4"
          }, {
            text: "周先生：XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            id: "5"
          }]
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

      self.policyScroller = self.$el;
      self.industryScroller = self.$el;
      self.forumScroller = self.$el;

      // 如果有携带参数则设置参数
      self.activeTab = self.$route.params["id"] || "policy";
      self.changeTab(self.activeTab);
    },
    methods: {
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
            for (let count = 0; count < body.list.length; ++count) {
              self[kind].list.push(body.list[count]);
            }
            self[kind].totalPage = body.totalPage;
            self[kind].loading = false;
          },
          error(err){
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tab-body {
    padding: 0 20px;
  }

  .divid-line {
    border: 1px dashed #9575cd;
  }

  .banner {
    width: 100%;
    height: 80px;
  }

  .list-title {
    padding-top: 20px;
    font-size: 14px;
    color: #ad1457;
  }

  .list-item {
    padding: 16px;
  }

  .list-item span {
    vertical-align: middle;
    padding-left: 8px;
    color: rgba(0, 0, 0, 0.6);
  }

  .message-container {
    background-color: #f6c19f;
  }

  .message-body {
    padding: 0 15px;
  }

  .message {
    display: block;
    width: 100%;
    padding: 8px 0;
    word-break: break-all;
    word-wrap: break-word;
  }

  .icon {
    border-radius: 50%;
    background-color: #ff0000;
    width: 10px;
    height: 10px;
  }
</style>
