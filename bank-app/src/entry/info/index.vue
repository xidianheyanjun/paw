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
        <mu-infinite-scroll :scroller="policy.scroller" :loading="policy.loading" @load="onInfinite('policy')"/>
      </div>
      <div class="banner">
        <img :src="item.img" @click="gotoList(item.id)" v-for="(item, index) in policy.banner" :key="index" />
      </div>
    </div>
    <div v-if="activeTab === 'industry'" class="tab-body">
      <div>
        <div class="list-title">国内新闻</div>
        <div v-for="item in industry.list" :key="item.id" @click="redirect2detail('industry', item)" class="list-item">
          <span class="triangle-right"></span>
          <span>{{item.title}}</span>
        </div>
        <mu-infinite-scroll :scroller="industry.scroller" :loading="industry.loading" @load="onInfinite('industry')"/>
      </div>
      <div class="banner">
        <img :src="item.img" @click="gotoList(item.id)" v-for="(item, index) in industry.banner" :key="index" />
      </div>
    </div>
    <div v-if="activeTab === 'forum'" class="tab-body">
      <div>
        <div v-for="item in forum.list" :key="item.id" @click="redirect2detail('forum', item)" class="list-item">
          <span class="triangle-right"></span>
          <span>{{item.title}}</span>
        </div>
        <mu-infinite-scroll :scroller="forum.scroller" :loading="forum.loading" @load="onInfinite('forum')"/>
      </div>
      <div class="message-container" v-if="forum.messages.length">
        <div class="list-title">留言</div>
        <div class="message-body">
          <div v-for="message in forum.messages" :key="message.id" class="message">{{message.text}}</div>
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
          messages: []
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mu-tabs {
    position: fixed;
    background:#fff;
    color: #333;
    border:1px solid #f0f0f0;
  }
  .mu-tabs .mu-tab-link{
    color:#333;
  }
  .mu-tabs .mu-tab-active{
    color:#2196f3;
  }
  .tab-body {
    padding:60px 20px 20px;
  }
  .list-item {
    font-size:15px;
    color: rgba(0, 0, 0, 0.6);
    // border-bottom:1px dotted #f0f0f0;
  }
  .list-title {
    margin-bottom:10px;
    padding: 10px;
    font-size:16px;
    border-bottom:1px solid #f0f0f0;
  }

  .message-container {
    background-color: #f6c19f;
    border-radius:5px;
    font-size:15px;
  }

  .message-body {
    padding: 0 15px;
  }

  .message {
    display: block;
    box-sizing:border-box;
    width: 100%;
    padding: 8px 5px;
    word-break: break-all;
    word-wrap: break-word;
  }

  .icon {
    border-radius: 50%;
    background-color: #ff0000;
    width: 10px;
    height: 10px;
  }

.banner img{
  width:100%;
  margin-bottom:10px;
}
</style>
