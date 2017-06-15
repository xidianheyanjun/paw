<template>
  <div class="vv-list">
    <mu-list>
      <template v-for="item in list">
        <mu-list-item :title="item"/>
        <mu-divider/>
      </template>
    </mu-list>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'sample',
    components: {},
    data(){
      return {
        list: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        loading: false,
        scroller: null
      };
    },
    mounted () {
      this.scroller = this.$el;
    },
    methods: {
      loadMore(){
        let self = this;
        self.loading = true;
        self.$sendRequest({
          url: "/sample/index",
          params: {
            abc: 11
          },
          success(body){
            self.$store.dispatch("updateName", body.name);
            self.list.push(body.name);
            self.loading = false;
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
  .vv-list {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
</style>
