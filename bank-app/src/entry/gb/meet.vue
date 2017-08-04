<template>
  <div>
    <div class="tab-body">
      <div>
        <mu-row v-for="item in list" :key="item.id" class="vv-row">
          <mu-col v-if="item.position=='left'" width="20" tablet="20" desktop="20" class="vv-col-user">
            <img :src="item.img" class="img">
            <div class="name">{{item.name}}</div>
          </mu-col>
          <mu-col v-if="item.position=='left'" width="80" tablet="80" desktop="80" class="vv-col-text">
            {{item.text}}
          </mu-col>

          <mu-col v-if="item.position=='right'" width="80" tablet="80" desktop="80" class="vv-col-text">
            {{item.text}}
          </mu-col>
          <mu-col v-if="item.position=='right'" width="20" tablet="20" desktop="20" class="vv-col-user">
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
    name: 'gbForum',
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
            history.back(-1);
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
          success(body){
            self.list = body.data;
          },
          error(err){
          }
        });
      },
      redirect2detail(item){
        window.location.href = "#/gb/info/" + item.id;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tab-body {
    padding: 20px;
  }
  .vv-row {
    margin: 10px 0;
  }

  .vv-col-user {
    text-align: center;
    padding: 6% 0;
  }

  .img {
    width: 40%;
    border-radius: 5px;
  }

  .name {
    font-size: 14px;
    padding-top: 10%;
  }

  .vv-col-text {
    background-color: #fccb97;
    padding:10px;
    font-size:14px;
    line-height: 150%;
    text-indent: 2em;
    border-radius: 5px;
  }
</style>
