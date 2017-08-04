<template>
  <div>
    <div class="tab-body">
      <div>
        <div class="list-title">4月12日中小微企业对接会圆满完成</div>
      </div>
      <hr class="divid-line"/>
      <div>
        <mu-row v-for="item in list" :key="item.id" class="vv-row">
          <mu-col width="20" tablet="20" desktop="20" class="vv-col-user">
            <img :src="item.img" class="img">
            <div class="name">{{item.name}}</div>
          </mu-col>
          <mu-col width="80" tablet="80" desktop="80" class="vv-col-text">
            {{item.text}}
          </mu-col>
        </mu-row>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'gbComment',
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
            window.location.href = "#/gb/forum";
          }
        },
        center: {
          img: "",
          title: "论坛详情",
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
        let commentId = this.$route.params['id'];
        this.$sendRequest({
          url: '/gb/comment/' + commentId,
          params: {
          },
          success(body){
            self.list = body.data;
          },
          error(err){
          }
        });
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

  .list-title {
    padding-top: 20px;
    font-size: 15px;
    color: #ad1457;
  }

  .vv-row {
    background-color: #fccb97;
    margin: 10px 5px;
  }

  .vv-col-user {
    text-align: center;
    padding: 6% 0;
  }

  .img {
    width: 40%;
  }

  .name {
    font-size: 14px;
    padding-top: 10%;
  }

  .vv-col-text {
    padding: 10px 10px;
    line-height: 150%;
    text-indent: 10%;
  }
</style>
