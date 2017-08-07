<template>
  <div>
    <picker :picks="pickList" @checkedPick="renderData" :curPick="curPick"></picker>

    <card-row type="row1" :cards="banks" @goto="cardClick"></card-row>

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
      cardClick(id) {
        window.location.href = '#/product/credit/detail/' + id;
      }
    }
  }
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/_mixin.scss';
.rv{
  .vv-picker {
    position: fixed;
    top:54px;
    left:0;
  }
  .vv-cards{
    margin-top:65px;
  }
}
</style>
