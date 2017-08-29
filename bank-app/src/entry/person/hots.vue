<template>
  <div class="user-paper">
    <div class="user-setting">
      <div v-for="(item, index) in hotsKindList" @click="goto(item.id)" class="menu">
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
        hotsKindList: []
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

      this.init();
    },
    methods: {
      init(){
        let self = this;
        self.$sendRequest({
          url: '/user/hots/kind',
          params: {},
          success(body){
            if (body.code === 'success') {
              self.hotsKindList = body.data;
            } else {
              self.$store.dispatch('box_set_toast', {
                show: true,
                toastText: body.msg
              });
            }
          },
          error(err) {
            self.$store.dispatch('box_set_toast', {
              show: true,
              toastText: '服务器繁忙,请稍后再试'
            });
          }
        });
      },
      goto(id){
        window.location.href = "#/person/hotsList/" + id;
      }
    }
  }
</script>
<style scoped lang="scss">
@import './../../assets/scss/_mixin.scss';

</style>
