<template>
  <div>
    <div class="vv-module">
      <div class="vv-title">按银行找卡</div>
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

    <div class="vv-module vv-cards">
      <div class="vv-title">
        <span>用途卡精选</span>
        <a class="more" @click.stop="">更多 &gt;</a>
      </div>
      <ul class="card-list clearfix">
        <li class="card-item" v-for="(item, index) in list" :key="index" @click="gotoList(item.id)">
          <div class="txt">
            <h3>{{item.title}}</h3>
            <p v-html="item.info"></p>
          </div>
          <img :src="item.image" alt="" class="img">
        </li>
      </ul>
    </div>

    <div class="vv-module vv-cards2">
      <div class="vv-title">
        <span>热卡推荐</span>
        <a class="more" @click.stop="">更多 &gt;</a>
      </div>
      <ul class="card-list2">
        <li class="card-item2 clearfix" v-for="(item, index) in list2" :key="index" @click="gotoList(item.id)">
          <img class="img" :src="item.image" />
          <div class="txt">
            <h3>{{item.title}}</h3>
            <p v-html="item.info"></p>
          </div>
        </li>
     </ul>
    </div>

    <div class="vv-module">
      <div class="vv-ad" v-for="(item, index) in banners" :key="index">
        <img :src="item.img" @click="gotoList(item.id)" />
      </div>
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
      gotoList(id) {
        window.location.href = '#/product/credit/list?query=' + id;
      },
      init() {
        let self = this;
        this.$sendRequest({
          url: '/product/credit/index',
          params: {
          },
          success(body){
            if (body.code === 'success') {
              let data = body.data;
              self.banks = data.banks;
              self.list = data.list;
              self.list2 = data.list2;
              self.banners = data.banners;
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
  background:#fff;
  border-bottom:10px solid #eee;
}
.vv-title{
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  font-size:14px;
  height:46px;
  line-height:46px;
  padding:0 20px;
  border-bottom: 1px solid #f0f0f0;
}
.vv-title span {
  display:block;
}
.vv-title .more {
  display:block;
  color:#999;
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
  margin-bottom:15px;
  color:rgba(0, 0, 0, 0.87);
  font-size:12px;
  text-align:center;
}
.card-item {
  float:left;
  width:50%;
  box-sizing:border-box;
  border-right:1px solid #f0f0f0;
  border-bottom:1px solid #f0f0f0;
  padding: 20px;
  height: 90px;
}
.card-item:nth-of-type(2n) {
  border-right:0;
}
.card-item .txt{
  margin-top:10px;
  float:left;
  color: #999;
  font-size:12px;
}
.card-item .txt h3{
  font-size:15px;
  margin-bottom:7px;
  color:#2196f3;
}
.card-item .img{
  float:right;
  width:50px;
  height:50px;
}
.card-item2 {
  margin:20px;
  padding-bottom:20px;
  border-bottom: 1px solid #f0f0f0;
}
.card-item2:last-child{
  border-bottom:0;
}
.card-item2 .img {
  float:left;
  width:138px;
  height:84px;
  margin-right:10px;
}
.card-item2 .txt {
  line-height:18px;
}
.card-item2 .txt h3{
  font-size:15px;
  margin-bottom:5px;
}
.card-item2 .txt p{
  font-size:12px;
  color:#999;
}

.vv-ad{
  margin-bottom:10px;
}
.vv-ad img{
  width:100%;
}

</style>
