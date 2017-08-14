<template>
  <mu-bottom-nav :value="foot.tabIndex" @change="handleChange">
    <mu-bottom-nav-item v-for="menu in foot.menuList" :key="menu.value" :href="menu.path" :value="menu.value"
                        :title="menu.name" :icon="menu.icon"/>
  </mu-bottom-nav>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'Foot',
    computed: mapGetters([
      "foot"
    ]),
    data(){
      return {
      };
    },
    mounted(){
    },
    methods: {
      handleChange(value){
        this.foot.tabIndex = value;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
