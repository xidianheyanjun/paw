<template>
<div>
  <div class="card-details">
    <div class="cd-cardinfo">
      <img :src="cardImg" alt="" class="cd-img">
      <div class="cd-name">{{cardName}}</div>
      <div class="cd-txt">{{cardTxt}}</div>
    </div>
    <div class="cd-cardlists" v-if="details.length">
      <dl v-for="(item, index) in details" :key="index">
        <dt>
          <span class="title">{{item.title}}</span>
          <a class="more" @click.stop="">更多 &gt;</a>
        </dt>
        <dd v-html="item.content"></dd>
      </dl>
    </div>
  </div>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'productCreditDetail',
  data() {
    return {
      cardImg: '',
      cardName: '',
      cardTxt: '',
      details: []
    };
  },
  mounted() {
    this.id = this.$route.params.id;
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
        title: "信用卡优惠信息详情",
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
        url: '/service/specials/detail/' + this.id,
        params: {
        },
        success(body){
          if (body.code === 'success') {
            let data = body.data;
            self.cardImg = data.cardImg;
            self.cardName = data.cardName;
            self.cardTxt = data.cardTxt;
            self.details = data.details || [];
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
    }
  }
}
</script>
<style scoped lang="scss">
@import './../../../assets/scss/_mixin.scss';
.cd-cardinfo{
  padding: $spacing;
  line-height:28px;
  .cd-img{
    display:block;
    margin:0 auto;
    width:90%;
  }
  .cd-name{
    margin-top:10px;
    font-size:$fontSizeTitle;
  }
  .cd-txt{
    font-size:$fontSizeContent2;
    color:$fontColor2;
  }
}

.cd-cardlists {
  margin-bottom:50px;
  // border-bottom:10px solid $bgColor2;
  dl{
    border-top:10px solid $bgColor2;
  }
  dt{
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: justify;
    font-size:$fontSizeContent;
    height:46px;
    line-height:46px;
    padding:0 $spacing;
    border-bottom: 1px solid $lineColor;
  }
  dt {
    .title {
      display:block;
    }
    .more {
      display:block;
      color:$fontColor2;
    }
  }
  dd{
    padding:$spacing;
    line-height:24px;
    font-size:$fontSizeContent;
  }
}
</style>