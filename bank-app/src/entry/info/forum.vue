<template>
  <div>
    <mu-sub-header>{{info.title}}</mu-sub-header>
    <mu-content-block>{{info.content}}</mu-content-block>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'gbForum',
    computed: mapGetters([]),
    components: {},
    data(){
      return {
        info: {}
      };
    },
    mounted(){
      this.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: function () {
            window.location.href = "#/info/index/forum";
          }
        },
        center: {
          img: "",
          title: "政策宣传详情",
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
      this.init();
    },
    methods: {
      init() {
        let self = this;
        let forumId = this.$route.params['id'];
        this.$sendRequest({
          url: '/info/forum/' + forumId,
          params: {
          },
          success(body){
            self.info = body.data;
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
</style>
