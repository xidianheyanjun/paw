<template>
  <div>
    <article-detail :title="title" :content="content"></article-detail>
    <comment-message :message="message" :sendMsgUrl="sendMsgUrl"></comment-message>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import articleDetail from '@/components/common/article.detail';
  import commentMessage from '@/components/common/comment.message';
  export default {
    name: 'gbComment',
    computed: mapGetters([]),
    components: {
      articleDetail,
      commentMessage
    },
    data(){
      return {
        title: '',
        content: '',
        message: [],
        sendMsgUrl: '/gb/comment/send/' + this.$route.params['id']
      };
    },
    mounted(){
      this.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: function () {
            window.location.href = "#/gb/forum";
          }
        },
        center: {
          img: "",
          title: "对接交流论坛详情",
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
        let commentId = this.$route.params['id'];
        this.$sendRequest({
          url: '/gb/comment/' + commentId,
          params: {
          },
          success(body){
            if (body.code === 'success') {
              let data = body.data;
              self.title = data.title;
              self.content = data.content;
              self.message = data.message || [];
            } else {
              self.$store.dispatch('box_set_toast', {
                show: true,
                toastText: body.msg
              });
            }
          },
          error(err){
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

<style scoped lang="scss">
@import './../../assets/scss/_mixin.scss';

</style>
