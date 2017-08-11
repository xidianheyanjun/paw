<template>
  <div>
    <div class="vv-article">
      <ul class="vv-article-list">
        <li v-if="list.length" v-for="item in list" :key="item.id" @click="redirect2detail(item)" class="list-item">
          <span class="triangle-right"></span>
          <span>{{item.title}}</span>
        </li>
      </ul>

      <banner class="vv-module" v-if="banner.length" :banners="banner"></banner>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import banner from '@/components/common/banner';
  export default {
    name: 'gbForum',
    computed: mapGetters([]),
    components: {
      banner
    },
    data(){
      return {
        list: [],
        banner: []
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
          title: "对接交流论坛",
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
          url: '/gb/forum',
          params: {
          },
          success(body){
            if (body.code === 'success') {
              let data = body.data;
              self.list = data.list || [];
              self.banner = data.banner || [];
            } else {
              self.$store.dispatch('box_set_toast', {
                show: true,
                toastText: body.msg
              });
            }
          },
          error(err){
            self.$store.dispatch('box_set_toast', {
              show: true,
              toastText: '服务器繁忙,请稍后再试'
            });
          }
        });
      },
      redirect2detail(item){
        window.location.href = "#/gb/comment/" + item.id;
      }
    }
  }
</script>