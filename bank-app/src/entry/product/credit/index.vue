<template>
  <div>
    <div class="vv-module">
      <mu-row gutter class="vv-tab">
        <mu-col width="33" tablet="33" desktop="33">
          <mu-dropDown-menu :value="gzxzValue" @change="changeGzxz">
            <mu-menu-item v-for="item in gzxz" :key="item.value" :value="item.value" :title="item.name"/>
          </mu-dropDown-menu>
        </mu-col>
        <mu-col width="33" tablet="33" desktop="33">
          <mu-dropDown-menu :value="ysrValue" @change="changeYsr">
            <mu-menu-item v-for="item in ysr" :key="item.value" :value="item.value" :title="item.name"/>
          </mu-dropDown-menu>
        </mu-col>
        <mu-col width="33" tablet="33" desktop="33">
          <mu-dropDown-menu :value="zcValue" @change="changeZc">
            <mu-menu-item v-for="item in zc" :key="item.value" :value="item.value" :title="item.name"/>
          </mu-dropDown-menu>
        </mu-col>
      </mu-row>
      
      <div class="vv-center">
        <mu-row gutter class="vv-row">
          <mu-col width="25" tablet="25" desktop="25" v-for="item in banks" :key="item.name">
            <a class="vv-block" :href="item.href">
              <img class="vv-icon" :src="item.icon"/>
              <div>{{item.name}}</div>
            </a>
          </mu-col>
        </mu-row>
      </div>
    </div>

    <div class="vv-module vv-cards">
      <mu-sub-header>用途卡精选</mu-sub-header>

      <mu-row class="vv-row vv-left-right">
        <mu-col width="50" tablet="50" desktop="50" v-for="item in list" :key="item.title" class="vv-col">
          <mu-col width="50" tablet="50" desktop="50" class="vv-info">
            <span class="vv-title">{{item.title}}</span>
            <span class="vv-subTitle">{{item.info}}</span>
          </mu-col> 
          <mu-col width="50" tablet="50" desktop="50" class="vv-card">
            <mu-card>
              <mu-card-media title="" subTitle="">
                <img :src="item.image" />
              </mu-card-media>
            </mu-card>
          </mu-col>
        </mu-col>
      </mu-row>
      <mu-row class="vv-row vv-top-bottom">
        <mu-col width="25" tablet="25" desktop="25" v-for="item in list2" :key="item.title" class="vv-col">
          <div class="vv-info">
            <span class="vv-title">{{item.title}}</span>
          </div>
         <mu-card>
            <mu-card-media title="" subTitle="">
              <img :src="item.image" />
            </mu-card-media>
          </mu-card>
        </mu-col>
      </mu-row>
    </div>

    <div class="vv-cards">
      <mu-sub-header class="vv-title">热卡推荐<mu-flat-button label="选卡中心 &gt;" class="vv-button" to="/product/credit/list" /></mu-sub-header>

      <mu-card>
        <mu-card-media title="" subTitle="">
          <img src="static/images/ad.jpg" />
        </mu-card-media>
      </mu-card>
      
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
        banks: [{
          name: '招商银行',
          href: '#/product/credit/list',
          icon: 'static/images/bank.png'
        }, {
          name: '招商银行',
          href: '#/product/credit/list',
          icon: 'static/images/bank.png'
        }, {
          name: '招商银行',
          href: '#/product/credit/list',
          icon: 'static/images/bank.png'
        }, {
          name: '招商银行',
          href: '#/product/credit/list',
          icon: 'static/images/bank.png'
        }, {
          name: '招商银行',
          href: '#/product/credit/list',
          icon: 'static/images/bank.png'
        },{
          name: '招商银行',
          href: '#/product/credit/list',
          icon: 'static/images/bank.png'
        },{
          name: '招商银行',
          href: '#/product/credit/list',
          icon: 'static/images/bank.png'
        },{
          name: '招商银行',
          href: '#/product/credit/list',
          icon: 'static/images/bank.png'
        }],
        list: [{
          title: '好车主',
          info: '加油享折扣',
          image: 'static/images/credit.jpg'
        }, {
          title: '好车主',
          info: '加油享折扣',
          image: 'static/images/credit.jpg'
        }],
        list2: [{
          title: '好车主',
          info: '加油享折扣',
          image: 'static/images/credit.jpg'
        }, {
          title: '好车主',
          info: '加油享折扣',
          image: 'static/images/credit.jpg'
        }, {
          title: '好车主',
          info: '加油享折扣',
          image: 'static/images/credit.jpg'
        }, {
          title: '好车主',
          info: '加油享折扣',
          image: 'static/images/credit.jpg'
        }],
        gzxzValue: "1",
        ysrValue: "1",
        zcValue: "1",
        gzxz: [{
          name: "性质A",
          value: "1"
        }, {
          name: "性质B",
          value: "2"
        }, {
          name: "性质C",
          value: "3"
        }],
        ysr: [{
          name: "收入A",
          value: "1"
        }, {
          name: "收入B",
          value: "2"
        }, {
          name: "收入C",
          value: "3"
        }],
        zc: [{
          name: "资产A",
          value: "1"
        }, {
          name: "资产B",
          value: "2"
        }, {
          name: "资产C",
          value: "3"
        }],
        bank: [{
          name: "中信银行",
          img: "home",
          url: ""
        }, {
          name: "中国银行",
          img: "home",
          url: ""
        }, {
          name: "招商银行",
          img: "home",
          url: ""
        }, {
          name: "建设银行",
          img: "home",
          url: ""
        }, {
          name: "民生银行",
          img: "home",
          url: ""
        }, {
          name: "浦发银行",
          img: "home",
          url: ""
        }, {
          name: "江苏银行",
          img: "home",
          url: ""
        }, {
          name: "人民银行",
          img: "home",
          url: ""
        }]
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
    },
    methods: {
      changeGzxz (value) {
        this.gzxzValue = value;
      },
      changeYsr (value) {
        this.ysrValue = value;
      },
      changeZc (value) {
        this.zcValue = value;
      }
    }
  } 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vv-tab{
  padding:0 5%;
}
.vv-module{
  border-bottom:10px solid #eee;
}
.vv-icon{
  width:45px;
  border-radius:100%;
}
.vv-center{
  text-align:center;
}
.vv-center .vv-row{
  margin:5%;
}
.vv-block{
  display:block;
  margin-bottom:10%;
  color:rgba(0, 0, 0, 0.87);
  font-size:12px;
}
.vv-cards{
}
.vv-cards .vv-left-right{
  
}
.vv-cards .vv-left-right .vv-col{
  padding:5%;
  border:1px solid #eee;
}
.vv-cards .vv-left-right .vv-info{
  float:left;
}
.vv-cards .vv-left-right .vv-card{
  float:right;
}
.vv-cards .vv-left-right span{
  display:block;
}
.vv-cards .vv-row .vv-title{
  font-size:14px;
  margin-bottom:5%;
}
.vv-cards .vv-row .vv-subTitle{
  color:green;
  font-size:12px;
}
.vv-cards .vv-top-bottom{
  margin-bottom:3%;
}
.vv-cards .vv-top-bottom .vv-col{
  padding:4%;
  text-align:center;
  border:1px solid #eee;
}
.vv-cards .vv-top-bottom .vv-title{
  display:block;
  margin-bottom:5%;
}
.vv-cards .vv-title{
  position:relative;
}
.vv-cards .vv-button{
  position:absolute;
  right:0;
  top:10%;
  color:rgba(0, 0, 0, 0.54);
}
</style>
