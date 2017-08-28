<template>
  <div class="user-paper">
    <div class="user-setting">
      <div v-for="(item, index) in person.hotsKind" @click="goto(item.href)" class="menu">
        <div class="menu-name">{{item.name}}</div>
        <div class="menu-icon">&gt;</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'personHots',
    components: {},
    computed: mapGetters([
      "person"
    ]),
    data() {
      return {
      };
    },
    mounted() {
      this.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: function () {
            window.location.href = "#/person/index";
          }
        },
        center: {
          img: "",
          title: "热点推送",
          callback: null
        },
        right: {
          img: "",
          title: "地图",
          callback: function () {
            window.location.href = "#/common/map";
          }
        }
      });
    },
    methods: {
      goto(href){
        window.location.href = href;
      }
    }
  }
</script>
<style scoped lang="scss">
@import './../../assets/scss/_mixin.scss';

</style>
