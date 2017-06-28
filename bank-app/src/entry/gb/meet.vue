<template>
  <div>
    <div>
      <h3>邀请洽谈</h3>
    </div>

    <div>
      <mu-list>
        <mu-list-item v-for="item in list" :key="item.id" :title="item.title"
                      @click="redirect2detail(item)"></mu-list-item>
      </mu-list>
    </div>

    <div>
      <mu-list>
        <mu-list-item v-for="item in banner" :key="item.id" :to="item.url">
          <img :src="item.img"/>
        </mu-list-item>
      </mu-list>
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
        }],
        banner: [{
          img: "",
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
        window.location.href = "#/gb/info/" + item.id;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
