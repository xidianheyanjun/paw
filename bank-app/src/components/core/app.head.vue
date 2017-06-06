<template>
  <div class="nav">
    <div @click="navClick('left')" class="left">
      <img v-if="head.left.img" :src="head.left.img">
      <span>{{head.left.title}}</span>
    </div>

    <div @click="navClick('center')" class="center">
      <img v-if="head.center.img" :src="head.center.img">
      <span>{{head.center.title}}</span>
    </div>

    <div @click="navClick('right')" class="right">
      <img v-if="head.right.img" :src="head.right.img">
      <span>{{head.right.title}}</span>
    </div>
  </div>
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
        console.log(position);
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
  .nav {
    text-align: center;
  }

  .nav div {
    display: inline-block;
  }

  .left {
    width: 15%;
  }

  .center {
    width: 60%;
  }

  .right {
    width: 15%;
  }
</style>
