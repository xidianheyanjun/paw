<template>
  <div>
    <banner class="vv-module" v-if="banners.length" :banners="banners"></banner>
    <div class="vv-module" v-if="banks.length">
      <div class="vv-title">按银行找卡</div>
      <icon-row :icons="banks" @goto="gotoList"></icon-row>
    </div>

    <card-row v-if="list.length" class="vv-module" type="row2" title="用途卡精选" moreUrl="#/product/credit/list" :cards="list" @goto="gotoDetail"></card-row>
    
    <card-row v-if="list2.length" class="vv-module" type="row1" title="热卡推荐" moreUrl="#/product/credit/list" :cards="list2" @goto="gotoDetail"></card-row>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import iconRow from '@/components/common/icon.row';
  import cardRow from '@/components/common/card.row';
  import banner from '@/components/common/banner';
  export default {
    name: 'product',
    components: {
      iconRow,
      cardRow,
      banner
    },
    data(){
      return {
        banks: [],
        list: [],
        list2: [],
        banners: []
      };
    },
    mounted () {
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
      this.init();
    },
    methods: {
      init() {
        let self = this;
        this.$sendRequest({
          url: '/product/credit/index',
          params: {
          },
          success(body){
            if (body.code === 'success') {
              let data = body.data;
              let banks = data.banks || [];
              if (banks.length > 7) {
                  banks.length = 7;
              }
              self.banks = banks;
              self.list = data.list || [];
              self.list2 = data.list2 || [];
              self.banners = data.banners || [];
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
      gotoList(id) {
        window.location.href = '#/product/credit/list?ids=' + id;
      },
      gotoDetail(id) {
        window.location.href = '#/product/credit/detail/' + id;
      }
    }
  } 
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/_mixin.scss';

</style>
