<template>
  <div>
    <div class="vv-article">
      <mu-sub-header v-html="title"></mu-sub-header>
      <mu-content-block v-html="content"></mu-content-block>
      <mu-row v-if="list.length" v-for="item in list" :key="item.id" class="vv-comment">
        <mu-col width="20" tablet="20" desktop="20" class="comment-user">
          <img :src="item.img" class="img">
          <div class="name">{{item.name}}</div>
        </mu-col>
        <mu-col width="80" tablet="80" desktop="80" class="comment-text" v-html="item.text">
        </mu-col>
      </mu-row>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'gbComment',
    computed: mapGetters([]),
    components: {},
    data(){
      return {
        title: '',
        content: '',
        list: []
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
              self.list = data.list || [];
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
.vv-article {
  padding:10px $spacing $spacing;
}
</style>
