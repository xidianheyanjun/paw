<template>
  <div>
    <div class="tab-body">
      <div>
        <div class="list-title">政银企预约</div>
      </div>
      <hr class="divid-line"/>
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
        list: [{
          img: "static/images/head.png",
          name: "白竹制造",
          text: "对接会议非常成功,感谢大家的积极配合和支持!我想咨询一下改业务怎么处理?",
          position: "left",
          id: 1
        }, {
          img: "static/images/head.png",
          name: "白竹制造",
          text: "对接会议非常成功,感谢大家的积极配合和支持!我想咨询一下改业务怎么处理?",
          position: "right",
          id: 2
        }, {
          img: "static/images/head.png",
          name: "白竹制造",
          text: "对接会议非常成功,感谢大家的积极配合和支持!我想咨询一下改业务怎么处理?",
          position: "right",
          id: 3
        }, {
          img: "static/images/head.png",
          name: "白竹制造",
          text: "对接会议非常成功,感谢大家的积极配合和支持!我想咨询一下改业务怎么处理?",
          position: "right",
          id: 4
        }, {
          img: "static/images/head.png",
          name: "白竹制造",
          text: "对接会议非常成功,感谢大家的积极配合和支持!我想咨询一下改业务怎么处理?",
          position: "right",
          id: 5
        }, {
          img: "static/images/head.png",
          name: "白竹制造",
          text: "对接会议非常成功,感谢大家的积极配合和支持!我想咨询一下改业务怎么处理?",
          position: "right",
          id: 6
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
  .tab-body {
    padding: 0 20px;
  }

  .divid-line {
    border: 1px dashed #9575cd;
  }

  .list-title {
    padding-top: 20px;
    font-size: 14px;
    color: #ad1457;
  }

  .vv-row {
    margin: 10px 5px;
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
    padding: 10px 10px;
    line-height: 150%;
    text-indent: 10%;
    border-radius: 5px;
  }
</style>
