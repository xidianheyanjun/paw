<template>
<div class="vv-article-detail">
  <mu-sub-header v-html="title"></mu-sub-header>
  <mu-content-block v-html="content"></mu-content-block>
  <div v-if="starUrl" :class="['vv-star', {'stared': isStar}]" @click="star">
    <!--mu-float-button icon="star"  :disabled="{'true': isStar}" class="demo-float-button"/-->
    <mu-flat-button class="vv-button" label="" icon="star" primary/>
    <span class="txt">{{starTxt}}</span>
  </div>
</div>
</template>
<script>
export default {
  name: 'articleDetail',
  props: {
    title: '',
    content: '',
    isStar: false,
    starUrl: ''
  },
  computed: {
    starTxt() {
      return this.isStar ? '已收藏' : '点击收藏';
    }
  },
  methods: {
    star() {
      let self = this;
      self.$emit('starClick', !self.isStar);
      let url = this.starUrl;
      url += this.isStar ? 'cancleStar' : 'star';
      this.$sendRequest({
        url: url + '/' + self.$route.params['id'],
        params: {
        },
        success(body){
          if (body.code === 'success') {
            self.$emit('starClick', !self.isStar);
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
@import './../../assets/scss/_mixin.scss';
.vv-article-detail {
  padding: 10px $spacing;
  img {
    margin:10px auto;
    width:100%;
  }
}
.vv-star{
  position:fixed;
  right:$spacing;
  top:80%;
  width:60px;
  height:60px;
  background:$lineColor;
  border-radius:100%;
  text-align:center;
  color:$mainColor2;
  .txt{
    display:block;
    font-size:10px;
  }
  .vv-button{
    min-width:40px;
    width:40px;
    height:35px;
    color:$mainColor2;
  }
  &.stared{
    color: $fontColor2;
    .vv-button {
      color: $fontColor2;
    }
  }
}
</style>