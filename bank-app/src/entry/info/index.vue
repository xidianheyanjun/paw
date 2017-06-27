<template>
  <div>
    <mu-tabs :value="activeTab" @change="changeTab">
      <mu-tab value="policy" title="政策宣传"/>
      <mu-tab value="industry" title="行业动态"/>
      <mu-tab value="forum" title="金融论坛"/>
    </mu-tabs>
    <div v-if="activeTab === 'policy'">
      <div>
        <mu-list>
          <mu-list-item v-for="item in policy.list" :key="item.id" :title="item.title"
                        @click="redirect2detail('policy', item)"></mu-list-item>
        </mu-list>
      </div>
      <div>
        <mu-list-item v-for="item in policy.banner" :key="item.id">
          <img :src="item.img"/>
        </mu-list-item>
      </div>
    </div>
    <div v-if="activeTab === 'industry'">
      <div>
        <mu-list>
          <mu-list-item v-for="item in industry.list" :key="item.id" :title="item.title"
                        @click="redirect2detail('industry', item)"></mu-list-item>
        </mu-list>
      </div>
      <div>
        <mu-list-item v-for="item in industry.banner" :key="item.id">
          <img :src="item.img"/>
        </mu-list-item>
      </div>
    </div>
    <div v-if="activeTab === 'forum'">
      <div>
        <mu-list>
          <mu-list-item v-for="item in forum.list" :key="item.id" :title="item.title"
                        @click="redirect2detail('forum', item)"></mu-list-item>
        </mu-list>
      </div>
      <div>
        <mu-list-item v-for="item in forum.banner" :key="item.id">
          <img :src="item.img"/>
        </mu-list-item>
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
            title: "XXX年XX月啊抠脚大汉卡机的花见花开",
            id: "1"
          }, {
            title: "XXX年XX月啊抠脚大汉卡机的花见花开",
            id: "2"
          }, {
            title: "XXX年XX月啊抠脚大汉卡机的花见花开",
            id: "3"
          }, {
            title: "XXX年XX月啊抠脚大汉卡机的花见花开",
            id: "4"
          }],
          banner: [{
            img: "http://echarts.baidu.com/echarts2/doc/asset/img/echarts-logo2.png",
            id: "5"
          }, {
            img: "http://echarts.baidu.com/echarts2/doc/asset/img/echarts-logo2.png",
            id: "6"
          }]
        },
        industry: {
          list: [{
            title: "XXX年XX月啊抠脚大汉卡机的花见花开",
            id: "1"
          }, {
            title: "XXX年XX月啊抠脚大汉卡机的花见花开",
            id: "2"
          }, {
            title: "XXX年XX月啊抠脚大汉卡机的花见花开",
            id: "3"
          }, {
            title: "XXX年XX月啊抠脚大汉卡机的花见花开",
            id: "4"
          }],
          banner: [{
            img: "http://echarts.baidu.com/echarts2/doc/asset/img/echarts-logo2.png",
            id: "5"
          }]
        },
        forum: {
          list: [{
            title: "XXX年XX月啊抠脚大汉卡机的花见花开",
            id: "1"
          }, {
            title: "XXX年XX月啊抠脚大汉卡机的花见花开",
            id: "2"
          }, {
            title: "XXX年XX月啊抠脚大汉卡机的花见花开",
            id: "3"
          }, {
            title: "XXX年XX月啊抠脚大汉卡机的花见花开",
            id: "4"
          }],
          banner: [{
            img: "http://echarts.baidu.com/echarts2/doc/asset/img/echarts-logo2.png",
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
</style>
