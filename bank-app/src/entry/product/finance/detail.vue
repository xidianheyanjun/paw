<template>
  <div class="vv-article-detail">
    <mu-sub-header>{{title}}</mu-sub-header>
    <mu-content-block>
      <div class="detail" v-html="detail"></div>
      <mu-flat-button :class="['vv-star', {'stared': isStar}]" @click="star" :label="starTxt" icon="star" primary/>
    </mu-content-block>
  </div>
</template>
<script>
export default {
  name: 'loan',
  data(){
    return {
      title: '',
      detail: '',
      isStar: false
    }
  },
  computed: {
    starTxt() {
      return this.isStar ? '已收藏' : '点击收藏';
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
    star() {
      this.isStar = !this.isStar;

      let self = this;
      let url = '/product/finance/';
      url = this.isStar ? 'cancleStar' : 'star';
      this.$sendRequest({
        url: url + self.$route.params['id'],
        params: {
        },
        success(body){
          if (body.code === 'success') {
            self.isStar = !self.isStar;
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
            self.detail = data.detail;
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