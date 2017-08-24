<template>
<div class="vv-article">
  <div v-if="list.length" v-for="(item, index) in list" :key="index" @click="goto(item.id)" class="list-item">
    <span class="triangle-right"></span>
    <span>{{item.title}}</span>
  </div>
  <div class="no-data" v-if="!list.length">暂无热点推送</div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'personHots',
  computed: mapGetters([]),
  components: {},
  data(){
    return {
      list: []
    };
  },
  mounted() {
    this.$store.dispatch("head_setHead", {
      left: {
        img: "",
        title: "返回",
        callback: function () {
          history.back();
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
    init() {
      let self = this;
      this.$sendRequest({
        url: '/user/hots/list',
        params: {
        },
        success(body){
          if (body.code === 'success') {
            let data = body.data;
            self.list = data.list || [];
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
    goto(id) {
      window.location.href = '#/person/hotsDetail/' + id;
    }
  }
}
</script>
<style scoped lang="scss">
@import './../../assets/scss/_mixin.scss';

</style>