<template>
  <div>
    <div class="tab-body">
      <div>
        <div v-for="item in list" :key="item.id" @click="redirect2detail(item)" class="list-item">
          <span class="triangle-right"></span>
          <span>{{item.title}}</span>
        </div>
      </div>
      <div class="banner" v-for="(item, index) in banner" :key="index">
        <img :src="item.img" @click="gotoList(item.id)" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'gbForum',
    computed: mapGetters([]),
    components: {},
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
            history.back(-1);
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
            self.list = body.data.list;
            self.banner = body.data.banner;
          },
          error(err){
          }
        });
      },
      redirect2detail(item){
        window.location.href = "#/gb/comment/" + item.id;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab-body {
  padding: 20px;
}
.list-item {
  font-size:15px;
  color: rgba(0, 0, 0, 0.6);
  // border-bottom:1px dotted #f0f0f0;
}
.banner{
  margin:10px auto;
}
.banner img{
  width:100%;
}
</style>
