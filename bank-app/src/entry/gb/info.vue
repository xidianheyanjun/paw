<template>
  <div class="vv-article-detial">
    <mu-sub-header v-html="info.title"></mu-sub-header>
    <mu-content-block v-html="info.content"></mu-content-block>
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
          title: "对接信息发布详情",
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
            if (body.code === 'success') {
              let data = body.data;
              self.info = data.info;
            } else {
              self.$store.dispatch('box_set_toast', {
                show: true,
                toastText: body.msg
              });
            }
          },
          error(err) {
            self.$store.dispatch('box_set_toast', {
              show: true,
              toastText: '服务器繁忙,请稍后再试'
            });
          }
        });
      }
    }
  }
</script>
