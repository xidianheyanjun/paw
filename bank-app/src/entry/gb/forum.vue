<template>
  <div>
    <div class="tab-body">
      <div>
        <div class="list-title">交流论坛</div>
        <div v-for="item in list" :key="item.id" @click="redirect2detail(item)" class="list-item">
          <span class="triangle-right"></span>
          <span>{{item.title}}</span>
        </div>
      </div>
      <hr class="divid-line"/>
      <div>
        <mu-list-item v-for="item in banner" :key="item.id">
          <img :src="item.img" class="banner"/>
        </mu-list-item>
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
        list: [{
          title: "4月12日中小微企业对接会圆满完成",
          id: "1"
        }, {
          title: "4月12日中小微企业对接会圆满完成",
          id: "2"
        }, {
          title: "4月12日中小微企业对接会圆满完成",
          id: "3"
        }, {
          title: "4月12日中小微企业对接会圆满完成",
          id: "4"
        }],
        banner: [{
          img: "static/images/banner.png",
          id: "5"
        }]
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
          title: "交流论坛",
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
      redirect2detail(item){
        window.location.href = "#/gb/comment/" + item.id;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tab-body {
    padding: 0 20px;
  }

  .divid-line {
    border: 1px dashed #9575cd;
  }

  .banner {
    width: 100%;
    height: 80px;
  }

  .list-title {
    padding-top: 20px;
    font-size: 14px;
    color: #ad1457;
  }

  .list-item {
    padding: 16px;
  }

  .list-item span {
    vertical-align: middle;
    padding-left: 8px;
    color: rgba(0, 0, 0, 0.6);
  }
</style>
