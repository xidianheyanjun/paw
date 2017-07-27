<template>
  <div>
    <mu-sub-header class="title">{{info.title}}</mu-sub-header>
    <mu-content-block class="content">{{info.content}}</mu-content-block>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'gbInfo',
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
            window.location.href = "#/gb/publish";
          }
        },
        center: {
          img: "",
          title: "政银企",
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
        let infoId = this.$route.params['id'];
        if (!infoId) {
          return;
        }
        this.$sendRequest({
          url: '/gb/info/' + infoId,
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
div{
  padding: 8px 16px;
}
.content{
  line-height:24px;
}
</style>
