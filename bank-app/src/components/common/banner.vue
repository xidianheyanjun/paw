<template>
    <div class="vv-banners swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in banners" :style="{backgroundImage: 'url(' + item.img + ')'}" @click="bannerClick(item.url)"></div>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
    </div>
</template>
<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
  name: 'banner',
  props: {
    banners: {
      type: Array,
      default: []
    }
  },
  mounted() {
    let swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        speed: 600,
        autoplay: 4000,
        onTouchEnd: function() {
            // swiper.startAutoplay()
        }
      });
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
.swiper-container {
    width: 100%;
    height: 10rem;
    border-bottom:0;
    .swiper-wrapper {
        width: 100%;
        height: 100%;
    }
    .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .swiper-pagination-bullet {
        width:0.833rem;
        height: 0.833rem;
        display: inline-block;
        background: $mainColor2;
    }
}
</style>