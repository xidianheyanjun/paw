<template>
  <div>
    <article-detail :title="title" :content="content"></article-detail>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import articleDetail from '@/components/common/article.detail';
  export default {
    name: 'infoIndustry',
    computed: mapGetters([]),
    components: {
      articleDetail
    },
    data(){
      return {
        title: '',
        content: ''
      };
    },
    mounted(){
      this.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: function () {
            history.back(-1);
            // window.location.href = "#/info/index/industry";
          }
        },
        center: {
          img: "",
          title: "行业动态详情",
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
        let industryId = this.$route.params['id'];
        this.$sendRequest({
          url: '/info/industry/' + industryId,
          params: {
          },
          success(body){
            if (body.code === 'success') {
              let data = body.data;
              self.title = data.title;
              self.content = data.content;
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

