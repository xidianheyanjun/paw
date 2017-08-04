<template>
  <div>
    <picker :picks="pickList" @checkedPick="renderData" :curPick="curPick"></picker>
    
    <div class="vv-list">
        <a class="vv-col" v-for="item in list" :href="item.href" :key="item.title">
            <div class="title">{{item.title}}</div>
            <div class="content">{{item.content}}</div>
        </a>
    </div>
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
        list: []
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
          title: "理财产品",
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
            url: '/product/finance/list?query=' + value,
            params: {
            },
            success(body){
                if (body.code === 'success') {
                let data = body.data;
                    self.pickList = data.pickList || self.pickList;
                    self.curPick = value;
                    self.list = data.list;
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
<style scoped>
.vv-title{
    text-align:center;
    font-size:16px;
    color:rgba(0,0,0,1);
}
.vv-col{
    clear:both;
    display:block;
    padding-bottom:20px;
    margin-bottom:20px;
    border-bottom: 1px solid #f0f0f0;
    color:rgba(0,0,0,.87);
}
.vv-col:last-child{
    border-bottom:0;
}
.vv-col .title{
    margin-bottom:20px;
}
.vv-col .content{
    color:rgba(0,0,0,.54);
    font-size:13px;
}
.vv-list{
    margin:20px;
}
</style>
