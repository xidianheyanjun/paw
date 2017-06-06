<template>
  <div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    components: {},
    mounted(){
      this.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: null
        },
        center: {
          img: "",
          title: "首页",
          callback: null
        },
        right: {
          img: "",
          title: "去登陆",
          callback: null
        }
      });

      this.$store.dispatch("foot_setActive", 0);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
