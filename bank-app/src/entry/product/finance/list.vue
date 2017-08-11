<template>
  <div>
    <picker :picks="pickList" @checkedPick="renderData" :curPick="curPick"></picker>
    
    <ul class="vv-products" v-if="list.length">
        <li class="item" v-for="(item, index) in list" :key="index" @click="goto(item.id)">
          <div class="title">{{item.title}}</div>
          <div class="content" v-html="item.content"></div>
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
      curPick: [],
      list: [],
      queryIds: '' // 页面url带过来的ids参数
    };
  },
  watch: {
    queryIds(v) {
      this.renderData(v);
    }
  },
  mounted () {
    this.$store.dispatch("head_setHead", {
      left: {
        img: "",
        title: "返回",
        callback: function () {
          window.location.href = "#/product/finance/index";
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
    this.queryIds = this.$route.query.ids;
  },
  methods: {
    reload(queryIds) {
      this.queryIds = queryIds;
    },
    renderData(queryIds = 'all,all') {
      let self = this;
      this.$sendRequest({
        url: '/product/finance/list?query=' + queryIds,
        params: {
        },
        success(body){
          if (body.code === 'success') {
            let data = body.data;
            self.pickList = data.pickList || self.pickList;
            self.curPick = [];
            let curPick = queryIds.split(',');
            curPick.forEach(item => {
              self.curPick.push(item);
            });
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
    goto(id) {
      window.location.href = '#/product/finance/detail/' + id;
    }
  }
};
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/_mixin.scss';
// .rv{
//   .vv-picker {
//     position: fixed;
//     top:54px;
//     left:0;
//   }
//   .vv-products{
//     margin-top:50px;
//   }
// }
</style>
