<template>
  <div>
    <div class="vv-module">
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

    <div>
      <mu-sub-header class="vv-subheader">热销产品<mu-flat-button label="&gt;" class="vv-button" to="/product/finance/list" /></mu-sub-header>
      <mu-content-block>
        <div class="vv-col" v-for="item in list" :key="item.title">
            <div class="hd">
                <span class="tag" v-if="item.tag">{{item.tag}}</span>
                <span class="title">{{item.title}}</span>
            </div>
            <div class="bd">
                <span class="time">购买时间：{{item.time}}</span>
                <span class="money">购买起点：{{item.money}}</span>
            </div>
            <div class="ft">
                <span class="num">{{item.num}}%</span>
                <mu-linear-progress mode="determinate" :value="parseFloat(item.num)" :size="10" :max="100" color="blue" />
            </div>
            <div class="rt">
                <strong class="num">{{item.num}}%</strong>
                <span class="txt">收益率</span>
            </div>

        </div>
      </mu-content-block>
      
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
          href: '#/product/finance/list',
          icon: 'static/images/bank.png'
        }, {
          name: '招商银行',
          href: '#/product/finance/list',
          icon: 'static/images/bank.png'
        }, {
          name: '招商银行',
          href: '#/product/finance/list',
          icon: 'static/images/bank.png'
        }, {
          name: '招商银行',
          href: '#/product/finance/list',
          icon: 'static/images/bank.png'
        }, {
          name: '招商银行',
          href: '#/product/finance/list',
          icon: 'static/images/bank.png'
        },{
          name: '招商银行',
          href: '#/product/finance/list',
          icon: 'static/images/bank.png'
        },{
          name: '招商银行',
          href: '#/product/finance/list',
          icon: 'static/images/bank.png'
        },{
          name: '招商银行',
          href: '#/product/finance/list',
          icon: 'static/images/bank.png'
        }],
        list: [{
            tag: '人气',
            title: '江西银行优盛理财-创鑫16366A',
            time: '85天',
            money: '5万',
            num: '3.87'
        }, {
            tag: '推荐',
            title: '江西银行优盛理财-创鑫16366A',
            time: '85天',
            money: '5万',
            num: '3.87'
        }, {
            tag: '',
            title: '江西银行优盛理财-创鑫16366A',
            time: '85天',
            money: '5万',
            num: '4.56'
        }, {
            tag: '',
            title: '江西银行优盛理财-创鑫16366A',
            time: '85天',
            money: '5万',
            num: '4.56'
        }, {
            tag: '',
            title: '江西银行优盛理财-创鑫16366A',
            time: '85天',
            money: '5万',
            num: '4.56'
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
    },
    methods: {
      
    }
  } 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
  text-align:center;
}
.vv-col{
    position:relative;
    margin-bottom:5%;
}
.vv-col .hd{
    font-weight:bold;
    font-size:14px;
}
.vv-col .bd{
    margin:3% 0;
    font-size:12px;
    color:rgba(0,0,0,.54);
}
.vv-col .tag{
    display:inline-block;
    padding:1px 2%;
    background:red;
    border-radius:5px;
    font-size:10px;
    color:#fff;
    vertical-align:2px;
}
.vv-col .ft{
    position:relative;
}
.vv-col .ft .num{
    position:absolute;
    color:#fff;
    font-size:10px;
    z-index:10;
}
.vv-col .rt{
    position:absolute;
    right:0;
    top:8%;
    text-align:right;
}
.vv-col .rt .num{
    display:block;
    font-size:18px;
    font-weight:bold;
    color:red;
}
.vv-col .rt .txt{
    display:block;
    margin-top:5%;
    font-size:10px;
    color:rgba(0,0,0,.34);
}
.vv-subheader{
    position:relative;
}
.vv-subheader .vv-button{
    position:absolute;
    top:0;
    right:0;
    width:40px;
}
</style>
