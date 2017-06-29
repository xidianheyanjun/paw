<template>
  <div>
    <mu-tabs :value="activeTab" @change="changeTab">
      <mu-tab value="policy" title="政策宣传"/>
      <mu-tab value="industry" title="行业动态"/>
      <mu-tab value="forum" title="金融论坛"/>
    </mu-tabs>
    <div v-if="activeTab === 'policy'" class="tab-body">
      <div>
        <mu-list>
          <mu-list-item v-for="item in policy.list" :key="item.id" :title="item.title"
                        @click="redirect2detail('policy', item)"></mu-list-item>
        </mu-list>
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
        <mu-list>
          <mu-list-item v-for="item in industry.list" :key="item.id" :title="item.title"
                        @click="redirect2detail('industry', item)"></mu-list-item>
        </mu-list>
      </div>
      <hr class="divid-line"/>
      <div>
        <div class="list-title">XX新闻</div>
        <mu-list>
          <mu-list-item v-for="item in industry.list" :key="item.id" :title="item.title"
                        @click="redirect2detail('industry', item)"></mu-list-item>
        </mu-list>
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
        <mu-list>
          <mu-list-item v-for="item in forum.list" :key="item.id" :title="item.title"
                        @click="redirect2detail('forum', item)" class="vv-item"></mu-list-item>
        </mu-list>
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
          list: [{
            title: "4月12日中小微企业对接会圆满完成",
            id: "1"
          }, {
            title: "4月12日中小微企业对接会圆满完成",
            id: "2"
          }, {
            title: "4月12日中小微企业对接会圆满完成",
            id: "3"
          }, {
            title: "4月12日中小微企业对接会圆满完成",
            id: "4"
          }, {
            title: "4月12日中小微企业对接会圆满完成",
            id: "5"
          }, {
            title: "4月12日中小微企业对接会圆满完成",
            id: "6"
          }, {
            title: "4月12日中小微企业对接会圆满完成",
            id: "7"
          }],
          banner: [{
            img: "static/images/banner.png",
            id: "5"
          }, {
            img: "static/images/banner.png",
            id: "6"
          }]
        },
        industry: {
          list: [{
            title: "4月12日中小微企业对接会圆满完成",
            id: "1"
          }, {
            title: "4月12日中小微企业对接会圆满完成",
            id: "2"
          }, {
            title: "4月12日中小微企业对接会圆满完成",
            id: "3"
          }, {
            title: "4月12日中小微企业对接会圆满完成",
            id: "4"
          }],
          banner: [{
            img: "static/images/banner.png",
            id: "5"
          }]
        },
        forum: {
          list: [{
            title: "4月12日中小微企业对接会圆满完成",
            id: "1"
          }, {
            title: "4月12日中小微企业对接会圆满完成",
            id: "2"
          }, {
            title: "4月12日中小微企业对接会圆满完成",
            id: "3"
          }, {
            title: "4月12日中小微企业对接会圆满完成",
            id: "4"
          }],
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
      this.$store.dispatch("head_setHead", {
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

      // 如果有携带参数则设置参数
      this.activeTab = this.$route.params["id"] || "policy";

    },
    methods: {
      changeTab(value){
        this.activeTab = value;
      },
      redirect2detail(kind, item){
        window.location.href = "#/info/" + kind + "/" + item.id;
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
