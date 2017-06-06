<template>
  <div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <div>{{getName}}</div>
    <button @click="updateName">点击</button>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'Info',
    computed: mapGetters([
      "getName"
    ]),
    methods: {
      updateName(){
        let self = this;
        self.$sendRequest({
          url: "/sample/index",
          params: {
            abc: 11
          },
          success(body){
            self.$store.dispatch("updateName", body.name);
          },
          error(err){
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
