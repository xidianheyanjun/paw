<template>
  <mu-appbar :title="head.center.title" titleClass="vv-tac">
    <mu-flat-button v-if="head.left" @click="navClick('left')" :label="head.left.title" icon="reply" slot="left"/>
    <mu-flat-button v-if="head.right" @click="navClick('right')" :label="head.right.title" icon="place" slot="right"/>
  </mu-appbar>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'Head',
    computed: mapGetters([
      "head"
    ]),
    methods: {
      navClick(position){
        let callback = this.head[position].callback;
        if (callback && typeof(callback) == "function") {
          callback();
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
