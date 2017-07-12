<template>
  <div>
    <mu-toast class="vv-tac" v-if="box.toast.show" :message="box.toast.toastText"/>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'boxToast',
    computed: mapGetters([
      "box"
    ]),
    data() {
      return {};
    },
    mounted() {
    },
    methods: {}
  }
</script>
<style scoped>
</style>
