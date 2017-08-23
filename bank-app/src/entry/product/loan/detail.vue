<template>
  <div>
    <article-detail :title="title" :content="content" :isStar="isStar" :starUrl="starUrl" @starClick="starClick"></article-detail>
  </div>
</template>
<script>
import articleDetail from '@/components/common/article.detail';
export default {
  name: 'loanDetail',
  components: {
    articleDetail
  },
  data(){
    return {
      title: '',
      content: '',
      isStar: false,
      starUrl: '/product/loan/store/',
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
        title: "贷款产品",
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
      let detailId = this.$route.params['id'];
      if (!detailId) {
        return;
      }
      this.$sendRequest({
        url: '/product/loan/detail/' + detailId,
        params: {
          type: self.pageType,
          bankValue: self.bankValue
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
