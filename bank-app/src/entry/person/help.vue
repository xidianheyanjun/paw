<template>
  <div>
    <article-detail :title="title" :content="content"></article-detail>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import articleDetail from '@/components/common/article.detail';
  export default {
    name: 'personHelp',
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
          }
        },
        center: {
          img: "",
          title: "帮助与反馈",
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
        this.title = '帮助与反馈';
        this.content = '帮助与反馈帮助与反馈帮助与反馈帮助与反馈帮助与反馈帮助与反馈帮助与反馈帮助与反馈帮助与反馈帮助与反馈帮助与反馈帮助与反馈';
        return;
        
        let self = this;
        this.$sendRequest({
          url: '/user/help',
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