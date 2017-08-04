<template>
  <div>
    <div class="vv-module">
      <div class="vv-center">
        <mu-row gutter class="vv-row">
          <mu-col width="25" tablet="25" desktop="25" v-for="(item, index) in banks" :key="index">
            <a class="vv-block" @click="gotoList(item.id)">
              <div class="vv-icon">
                <img :src="item.icon"/>
              </div>
              <div>{{item.name}}</div>
            </a>
          </mu-col>
          <mu-col width="25" tablet="25" desktop="25">
            <a class="vv-block" @click="gotoList('all')">
             <div class="vv-icon">
                <img src="static/images/more.png"/>
              </div>
              <div>更多</div>
            </a>
          </mu-col>
        </mu-row>
      </div>
    </div>

    <div>
      <mu-sub-header class="vv-subheader">
        <span class="title">热销产品</span>
        <a class="more" @click.stop="">更多 &gt;</a>
      </mu-sub-header>
      <mu-content-block>
        <div class="vv-col" v-for="(item, index) in list" :key="index" @click="productClick(item)">
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
        banks: [],
        list: []
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
      this.init();
    },
    methods: {
      gotoList(id) {
        window.location.href = '#/product/finance/list?query=' + id;
      },
      productClick(item) {
        window.location.href = '#/product/finance/detail/' + item.id;
      },
      init() {
        let self = this;
        this.$sendRequest({
          url: '/product/finance/index',
          params: {
          },
          success(body){
            if (body.code === 'success') {
              self.banks = body.data.banks;
              self.list = body.data.list;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.vv-module{
  border-bottom:10px solid #eee;
}
.vv-icon{
  margin:0 auto 5px;
  width:45px;
  height:45px;
  background:#f6f6f6;
  border-radius:100%;
  text-align:center;
  line-height:42px;
}
.vv-icon img {
  width:32px;
  height:32px;
  vertical-align:middle;
}
.vv-center{
  text-align:center;
}
.vv-center .vv-row{
  margin:20px;
}
.vv-block{
  display:block;
  margin-bottom:10px;
  color:rgba(0, 0, 0, 0.87);
  font-size:12px;
  text-align:center;
}
.vv-col{
    position:relative;
    padding:15px 0 20px;
    border-bottom: 1px solid #f0f0f0;
}
.vv-col:last-child{
  border-bottom:0;
}
.vv-col .hd{
    font-weight:bold;
    padding-top:5px;
    font-size:14px;
}
.vv-col .bd{
    margin:10px 0;
    font-size:12px;
    color:rgba(0,0,0,.54);
}
.vv-col .tag{
    display:inline-block;
    padding:1px 5px;
    background:#ff4081;
    border-radius:5px;
    font-size:10px;
    color:#fff;
    vertical-align:2px;
}
.vv-col .title{
    display:inline-block;
    text-overflow: ellipsis;
    width:70%;
    white-space: nowrap;
    overflow: hidden;
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
    top:18px;
    text-align:right;
}
.vv-col .rt .num{
    display:block;
    font-size:18px;
    font-weight:bold;
    color:#2196f3;
}
.vv-col .rt .txt{
    display:block;
    margin-top:10px;
    font-size:10px;
    color:rgba(0,0,0,.34);
}
.vv-subheader{
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  font-size:14px;
  height:46px;
  line-height:46px;
  padding:0 20px;
  border-bottom: 1px solid #f0f0f0;
  color:#333;
}
.vv-subheader .vv-button{
    position:absolute;
    top:0;
    right:0;
    width:40px;
}
.vv-subheader .title {
  display:block;
  font-size:14px;
}
.vv-subheader .more {
  display:block;
  color:#999;
}
</style>
