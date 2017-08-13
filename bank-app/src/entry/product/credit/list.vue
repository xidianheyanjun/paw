<template>
  <div>
    <picker :picks="pickList" @checkedPick="reload" :curPick="curPick"></picker>

    <card-row v-if="list.length" type="row1" :cards="list" @goto="cardClick"></card-row>

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
        queryIds: ''
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
          url: '/product/credit/list?query=' + queryIds,
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
        window.location.href = '#/product/credit/detail/' + id;
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
