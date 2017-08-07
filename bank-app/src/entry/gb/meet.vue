<template>
  <div>
    <div class="vv-article">
      <div>
        <mu-row v-for="item in list" :key="item.id" class="vv-comment">
          <mu-col v-if="item.position=='left'" width="20" tablet="20" desktop="20" class="comment-user">
            <img :src="item.img" class="img">
            <div class="name">{{item.name}}</div>
          </mu-col>
          <mu-col v-if="item.position=='left'" width="80" tablet="80" desktop="80" class="comment-text" v-html="item.text">
          </mu-col>

          <mu-col v-if="item.position=='right'" width="80" tablet="80" desktop="80" class="comment-text" v-html="item.text">
          </mu-col>
          <mu-col v-if="item.position=='right'" width="20" tablet="20" desktop="20" class="comment-user">
            <img :src="item.img" class="img">
            <div class="name">{{item.name}}</div>
          </mu-col>
        </mu-row>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'gbMeet',
    computed: mapGetters([]),
    components: {},
    data(){
      return {
        list: []
      };
    },
    mounted(){
      this.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: function () {
            window.location.href = "#/home/index";
          }
        },
        center: {
          img: "",
          title: "自由邀请洽谈",
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
          url: '/gb/meet',
          params: {
          },
          success(body) {
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
      redirect2detail(item){
        window.location.href = "#/gb/info/" + item.id;
      }
    }
  }
</script>


<style scoped lang="scss">
@import './../../assets/scss/_mixin.scss';
.vv-article {
  padding:$spacing;
}
</style>
