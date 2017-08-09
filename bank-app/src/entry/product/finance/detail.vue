<template>
  <div>
    <article-detail :title="title" :content="content" :isStar="isStar" :starUrl="starUrl" @starClick="starClick"></article-detail>
  </div>
</template>
<script>
import articleDetail from '@/components/common/article.detail';
export default {
  name: 'financeDetail',
  components: {
    articleDetail
  },
  data(){
    return {
      title: '',
      content: '',
      isStar: false,
      starUrl: '#/product/finance/detail/'
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
        title: "理财产品",
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
      this.$sendRequest({
        url: '/product/finance/detail/' + self.$route.params['id'],
        params: {
        },
        success(body){
          if (body.code === 'success') {
            let data = body.data;
            self.title = data.title;
            self.content = data.content;
            self.isStar = data.isStar;
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
    },
    starClick(isStar) {
      this.isStar = isStar;
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../../assets/scss/_mixin.scss';
.vv-star{
  float:right;
  min-width:120px;
  color:$mainColor2;
  &.stared {
    color: $fontColor2;
  }
}
</style>