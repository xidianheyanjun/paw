<template>
<div class="page help-page">
  <article-detail :title="title" :content="content"></article-detail>
  <div class="extend-help" v-if="relatedList.length">
    <div class="hd">相关问题</div>
    <div class="bd" v-for="(item, index) in relatedList" :key="index" @click="goto(item.id)">{{item.title}}</div>
  </div>
  <div class="extend-help">
    <div class="hd">您可能还需要</div>
    <div class="bd" @click="call">联系客服</div>
  </div>
</div>
</template>
<script>
import articleDetail from '@/components/common/article.detail';
export default {
  name: 'personHelpDetail',
  components: {
    articleDetail
  },
  data() {
    return {
      title: '',
      content: '',
      relatedList: [],
      telNo: ''
    };
  },
  mounted() {
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
    this.id = this.$route.params['id'];
    this.init();
  },
  methods: {
    goto(id) {
      window.location.href = '#/person/helpDetail/' + id;
    },
    call() {
      window.location.href = 'tel:' + this.telNo;
    },
    init() {
      let self = this;
      this.$sendRequest({
        url: '/user/helpDetail/' + self.id,
        params: {
        },
        success(body){
          if (body.code === 'success') {
            let data = body.data;
            self.title = data.title;
            self.content = data.content;
            self.relatedList = data.relatedList || [];
            self.telNo = data.telNo;
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
<style lang="scss">
@import './../../assets/scss/_mixin.scss';
.help-page {
  .mu-sub-header{
    text-align:left;
    padding-left:0;
    border-bottom:1px solid $lineColor;
  }
}
</style>
<style lang="scss" scoped>
@import './../../assets/scss/_mixin.scss';
.extend-help {
  .hd{
    font-size:$fontSizeContent2;
    color:$fontColor3;
    padding: 10px 20px;
    background:#eee;
  }
  .bd{
    padding: 10px 20px;
    font-size:$fontSizeContent;
    border-bottom:1px solid $lineColor;
    @extend %fix_width_content;
  }
}
</style>
