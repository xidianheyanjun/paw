<template>
  <div class="foot">
    <div class="bar">
      <div v-for="menu in foot.menuList" :class="['item', menu.isActive ? 'active' : '']">
        <router-link :to="menu.path">{{menu.name}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'Foot',
    computed: mapGetters([
      "foot"
    ]),
    mounted(){
      // 进入时根据地址判断高亮哪个菜单 todo
      console.log(111);
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .foot {
  }

  .bar {
  }

  .item {
    display: inline-block;
    width: 23%;
    text-align: center;
  }

  .item.active {
    background-color: #333333;
  }
</style>
