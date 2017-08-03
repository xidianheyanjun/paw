<template>
  <div class="page-start" :style="{backgroundImage: 'url(' + imageStartUrl + ')'}">
  </div>
</template>
<script>
const START_IMAGE_SHOW_TIME = 2000;
export default {
  name: 'homeStart',
  data() {
    return {
      imageStartUrl: './../../assets/images/sun.jpg'
    };
  },
  mounted() {
    let self = this;
    this.$sendRequest({
      url: '/core/image/start',
      success(body) {
        if (body.code === 'success') {
          self.imageStartUrl = body.imageStartUrl;
          let timer = setTimeout(() => {
            self.goto();
            clearTimeout(timer);
          }, START_IMAGE_SHOW_TIME);
        } else {
          self.goto();
        }
      },
      error(err) {
        self.goto();
      }
    });
  },
  methods: {
    goto() {
      window.location.href = '#/home/index';
    }
  }
}
</script>
<style>
.page-start {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 10000;
}

</style>