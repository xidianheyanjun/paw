<template>
  <div>
    <div class="vv-cards">
        <a class="vv-col clearfix" v-for="item in list" :href="item.href"  :key="item.title">
            <mu-card class="vv-card">
              <mu-card-media title="" subTitle="" class="vv-card-image">
                <img :src="item.image" />
              </mu-card-media>
              <div class="vv-card-info">
                <div class="title">{{item.title}}</div>
                <ul class="text">
                    <li v-for="li in item.info">{{li}}</li>
                </ul>
              </div>
            </mu-card>
        </a>
    </div>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'product',
    components: {},
    data(){
      return {
        list: [{
          title: '平安银行标准信用卡',
          info: ['首刷即享全方位公共交通意外保障','首刷即享全方位公共交通意外保障','首刷即享全方位公共交通意外保障'],
          image: 'static/images/credit.jpg',
          href: '#/product/credit/apply'
        }, {
          title: '好车主',
          info: ['加油享折扣'],
          image: 'static/images/credit.jpg',
          href: '/product/credit/apply'
        }, {
          title: '平安银行标准信用卡',
          info: ['首刷即享全方位公共交通意外保障','首刷即享全方位公共交通意外保障','首刷即享全方位公共交通意外保障'],
          image: 'static/images/credit.jpg',
          href: '/product/credit/apply'
        }, {
          title: '平安银行标准信用卡',
          info: ['首刷即享全方位公共交通意外保障','首刷即享全方位公共交通意外保障','首刷即享全方位公共交通意外保障'],
          image: 'static/images/credit.jpg',
          href: '/product/credit/apply'
        }, {
          title: '平安银行标准信用卡',
          info: ['首刷即享全方位公共交通意外保障','首刷即享全方位公共交通意外保障','首刷即享全方位公共交通意外保障'],
          image: 'static/images/credit.jpg',
          href: '/product/credit/apply'
        },]
        
      };
    },
    mounted () {
      this.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: function () {
            window.location.href = "#/product/credit/index";
          }
        },
        center: {
          img: "",
          title: "信用卡产品查询",
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
    },
    methods: {
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vv-col{
  margin:5%;
  display:block;
  color:rgba(0, 0, 0, 0.87);
}
.vv-card{
  box-shadow:none;
}
.vv-card .vv-card-image{
    float:left;
    width:120px;
}
.vv-card .vv-card-info{
    padding-left:130px;
}
.vv-card .vv-card-info .title{
    font-size:14px;
    margin-bottom:5%;
}
.vv-card .vv-card-info .text{
    font-size:12px;
    margin-bottom:5%;
    color:rgba(0,0,0,.54);
}
.vv-card .vv-card-info li{
    margin-bottom:5px;
}
</style>
