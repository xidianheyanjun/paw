<template>
  <div>
    <div class="tab-body">
      <div>
        <div class="list-title">政银企对接</div>
        <mu-list>
          <mu-list-item v-for="item in list" :key="item.id" :title="item.title"
                        @click="redirect2detail(item)"></mu-list-item>
        </mu-list>
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
    name: 'gbPublish',
    computed: mapGetters([]),
    components: {},
    data(){
      return {
        list: [{
          title: "XXX年XX月啊抠脚大汉卡机的花见花开",
          id: "1"
        }, {
          title: "XXX年XX月啊抠脚大汉卡机的花见花开",
          id: "2"
        }, {
          title: "XXX年XX月啊抠脚大汉卡机的花见花开",
          id: "3"
        }, {
          title: "XXX年XX月啊抠脚大汉卡机的花见花开",
          id: "4"
        }, {
          title: "XXX年XX月啊抠脚大汉卡机的花见花开",
          id: "5"
        }, {
          title: "XXX年XX月啊抠脚大汉卡机的花见花开",
          id: "6"
        }, {
          title: "XXX年XX月啊抠脚大汉卡机的花见花开",
          id: "7"
        }],
        banner: [{
          img: "static/images/banner.png",
          id: "5"
        }, {
          img: "static/images/banner.png",
          id: "6"
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
          title: "政银企",
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
        window.location.href = "#/gb/info/" + item.id;
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
</style>
