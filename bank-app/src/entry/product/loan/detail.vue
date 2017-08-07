<template>
  <div class="vv-article-detail">
    <mu-sub-header>{{title}}</mu-sub-header>
    <mu-content-block v-html="content"></mu-content-block>
  </div>
</template>
<script>
export default {
  name: 'loanDetail',
  data(){
      return {
          title: '',
          content: ''
      }
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
  }
}
</script>