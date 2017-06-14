<template>
  <mu-bottom-nav :value="activeNav" @change="handleChange">
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
        activeNav: 0
      };
    },
    mounted(){
      // 进入时根据地址判断高亮哪个菜单 todo
      let hash = window.location.hash;
    },
    methods: {
      handleChange(value){
        this.activeNav = value;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
