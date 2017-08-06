<template>
<div class="vv-banners">
  <div class="item" v-for="(item, index) in banners" :key="index">
    <img :src="item.img" @click="bannerClick(item.url)" />
  </div>
</div>
</template>
<script>
export default {
  name: 'banner',
  props: {
    banners: {
      type: Array,
      default: []
    }
  },
  methods: {
    bannerClick(url) {
      window.location.href = url;
    }
  }
}
</script>
<style lang="scss">
@import './../../assets/scss/_mixin.scss';
.vv-banners{
  .item{
    margin-bottom:10px;
  }
  img{
    width:100%;
  }
}
</style>