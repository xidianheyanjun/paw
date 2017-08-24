<template>
  <div>
    <banner v-if="banners.length" class="vv-module" :banners="banners"></banner>
    
    <div class="vv-module" v-if="types.length">
      <div class="vv-title">
        <span>信用卡优惠</span>
        <!--a class="more" @click="gotoList('')">更多 &gt;</a-->
      </div>
      <icon-row :icons="types" @goto="gotoList"></icon-row>
    </div>
    
    <card-row v-if="coupons.length" class="vv-module" type="row3" title="优惠券" :moreUrl="'#/service/specials/list?ids=all,' + couponsId" :cards="coupons" @goto="gotoDetail"></card-row>

    <card-row v-if="markets.length" class="vv-module" type="row2" title="超市促销" :moreUrl="'#/service/specials/list?ids=all,' + marketsId" :cards="markets" @goto="gotoDetail"></card-row>

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
        list: [],
        types: [],
        coupons: [],
        markets: [],
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
      this.init();
    },
    methods: {
      init() {
        let self = this;
        this.$sendRequest({
          url: '/service/specials/index',
          params: {
          },
          success(body){
            if (body.code === 'success') {
              let data = body.data;
              self.types = data.types || [];
              self.coupons = data.coupons || [];
              self.couponsId = data.couponsId;
              self.markets = data.markets || [];
              self.marketsId = data.marketsId;
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
      gotoList(id = '') {
        window.location.href = '#/service/specials/list?ids=all,' + id;
      },
      gotoDetail(id) {
        window.location.href = '#/service/specials/detail/' + id;
      }
    }
  } 
</script>

<style lang="scss" scoped>
@import './../../../assets/scss/_mixin.scss';
</style>
