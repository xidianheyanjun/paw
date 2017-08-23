<template>
  <div>
    <picker :picks="pickList" @checkedPick="reload" :curPick="curPick"></picker>

    <card-row type="row1" :cards="list" @goto="cardClick"></card-row>

    <div class="no-data" v-show="!list.length">未能找到相应结果</div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import picker from '@/components/common/picker';
  import cardRow from '@/components/common/card.row';
  export default {
    name: 'product',
    components: {
      picker,
      cardRow
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
        // if (v) {
          // window.location.href = '#/service/specials/list?query=' + v;//不能改，会影响$router
        // }
      }
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
          title: "信用卡优惠信息",
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
        // console.warn('render',queryIds);
        let self = this;
        
        this.$sendRequest({
          url: '/service/specials/list?query=' + queryIds,
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
              self.list = data.list || [];
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
      cardClick(id) {
        window.location.href = '#/service/specials/detail/' + id;
      }
    }
  }
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/_mixin.scss';
// .rv{
//   .vv-picker {
//     position: fixed;
//     top:54px;
//     left:0;
//   }
//   .vv-cards{
//     margin-top:65px;
//   }
// }
</style>
