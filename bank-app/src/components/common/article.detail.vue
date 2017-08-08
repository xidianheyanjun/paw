<template>
<div class="vv-article-detail">
  <mu-sub-header v-html="title"></mu-sub-header>
  <mu-content-block v-html="content"></mu-content-block>
</div>
</template>
<script>
export default {
  name: 'articleDetail',
  props: {
    title: '',
    content: ''
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
</style>