<template>
  <div>
    <picker :picks="pickList" @checkedPick="renderData" :curPick="curPick"></picker>
    <ul class="card-list2">
        <li class="card-item2 clearfix" v-for="(item, index) in banks" :key="index" @click="cardClick(item)">
          <img class="img" :src="item.image" />
          <div class="txt">
            <h3>{{item.title}}</h3>
            <p v-html="item.info"></p>
          </div>
        </li>
     </ul>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import picker from '@/components/common/picker';
  export default {
    name: 'product',
    components: {
      picker
    },
    data(){
      return {
        pickList: [],
        curPick: '',
        banks: []
      };
    },
    mounted () {
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
          title: "信用卡",
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
      let query = this.$route.query;
      let querykey = Object.keys(query)[0];
      this.renderData(query[querykey]);// 页面初始化时目前只做一种条件查询
    },
    methods: {
      renderData(value) {
        let self = this;
        this.$sendRequest({
          url: '/product/credit/list?query=' + value,
          params: {
          },
          success(body){
            if (body.code === 'success') {
              let data = body.data;
              self.pickList = data.pickList || self.pickList;
              self.curPick = value;
              self.banks = data.banks;
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
      cardClick(item) {
        window.location.href = '#/product/credit/detail/' + item.id;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
.rv {
  background: #fff;
}
</style>
<style scoped>
.vv-tab {
  position: fixed;
  top:56px;
  left:0;
}
.card-list2{
  margin-top:68px;
}
.card-item2 {
  margin:20px;
  padding-bottom:20px;
  border-bottom: 1px solid #f0f0f0;
}
.card-item2:last-child{
  border-bottom:0;
}
.card-item2 .img {
  float:left;
  width:138px;
  height:84px;
  margin-right:10px;
}
.card-item2 .txt {
  line-height:18px;
}
.card-item2 .txt h3{
  font-size:15px;
  margin-bottom:5px;
}
.card-item2 .txt p{
  font-size:12px;
  color:#999;
}
</style>
