<template>
  <div class="vv-article-detail">
    <mu-sub-header v-html="info.title"></mu-sub-header>
    <mu-content-block v-html="info.content"></mu-content-block>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'infoPolicy',
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
            window.location.href = "#/info/index/policy";
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
        let policyId = this.$route.params['id'];
        this.$sendRequest({
          url: '/info/policy/' + policyId,
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