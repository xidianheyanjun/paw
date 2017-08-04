<template>
<div>
  <div class="card-details">
    <div class="cd-cardinfo">
      <img :src="cardImg" alt="" class="cd-img">
      <div class="cd-name">{{cardName}}</div>
      <div class="cd-txt">{{cardTxt}}</div>
    </div>
    <div class="cd-cardlists">
      <dl v-for="(item, index) in details" :key="index">
        <dt>
          <span class="title">{{item.title}}</span>
          <a class="more" @click.stop="">更多 &gt;</a>
        </dt>
        <dd v-html="item.content"></dd>
      </dl>
    </div>
  </div>
  <mu-raised-button @click="apply" label="立即申请" class="demo-raised-button apply-btn" primary fullWidth/>
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
        title: "信用卡详情",
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
        url: '/product/credit/detail/' + this.id,
        params: {
        },
        success(body){
          if (body.code === 'success') {
            let data = body.data;
            self.cardImg = data.cardImg;
            self.cardName = data.cardName;
            self.cardTxt = data.cardTxt;
            self.details = data.details;
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
    apply() {
      window.location.href = '#/product/credit/apply/' + this.id;
    }
  }
}
</script>
<style>
.cd-cardinfo{
  padding: 20px 20px 10px;
  line-height:28px;
}
.cd-cardinfo .cd-img{
  display:block;
  margin:0 auto;
  width:90%;
}
.cd-cardinfo .cd-name{
  margin-top:10px;
  font-size:15px;
}
.cd-cardinfo .cd-txt{
  font-size:13px;
  color:#999;
}
.cd-cardlists {
  margin-bottom:50px;
  // border-bottom:10px solid #eee;
}
.cd-cardlists dl{
  border-top:10px solid #eee;
}
.cd-cardlists dt{
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  font-size:14px;
  height:46px;
  line-height:46px;
  padding:0 20px;
  border-bottom: 1px solid #e1e2e6;
}
.cd-cardlists dt .title {
  display:block;
}
.cd-cardlists dt .more {
  display:block;
  color:#999;
}
.cd-cardlists dd{
  padding:20px;
  line-height:26px;
  font-size:14px;
}
.apply-btn{
  position: fixed;
  bottom:0;
  left:0;
  // height:45px;
  // width:100%;
  // line-height:45px;
  // font-size:15px;
  // color:#fff;
  // text-align:center;
  // background:#2196f3;
}
</style>