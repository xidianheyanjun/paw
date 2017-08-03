<template>
  <div>
    <div class="vv-module">
      <mu-row class="vv-tab">
        <mu-col width="33" tablet="33" desktop="33" v-for="(pick, index) in pickList" :key="index">
          <mu-dropDown-menu :value="pick.value" @change="openPick($event, pick)">
            <mu-menu-item v-for="(item, idx) in pick.list" :key="idx" :value="item.value" :title="item.name"/>
          </mu-dropDown-menu>
        </mu-col>
      </mu-row>
      
      <div class="vv-center">
        <mu-row gutter class="vv-row">
          <mu-col width="25" tablet="25" desktop="25" v-for="(item, index) in banks" :key="index">
            <a class="vv-block" @click="bankClick(item)">
              <img class="vv-icon" :src="item.icon"/>
              <div>{{item.name}}</div>
            </a>
          </mu-col>
          <mu-col width="25" tablet="25" desktop="25">
            <a class="vv-block" @click="moreClick">
              <img class="vv-icon" src="static/images/bank.png"/>
              <div>更多</div>
            </a>
          </mu-col>
        </mu-row>
      </div>
    </div>

    <div class="vv-module vv-cards">
      <mu-sub-header>用途卡精选</mu-sub-header>

      <mu-row class="vv-row vv-left-right">
        <mu-col width="50" tablet="50" desktop="50" v-for="(item, index) in list" :key="index" class="vv-col">
          <div @click="cardClick(item)">
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
          </div>
        </mu-col>
      </mu-row>
      <mu-row class="vv-row vv-top-bottom">
        <mu-col width="25" tablet="25" desktop="25" v-for="(item, index) in list2" :key="index" class="vv-col">
          <div @click="cardClick(item)">
            <div class="vv-info">
              <span class="vv-title">{{item.title}}</span>
            </div>
            <mu-card>
              <mu-card-media title="" subTitle="">
                <img :src="item.image" />
              </mu-card-media>
            </mu-card>
          </div>
        </mu-col>
      </mu-row>
    </div>

    <div class="vv-cards">
      <mu-sub-header class="vv-title">热卡推荐<mu-flat-button label="选卡中心 &gt;" class="vv-button" to="/product/credit/list" /></mu-sub-header>

      <mu-card>
        <mu-card-media title="" subTitle="" v-for="(item, index) in banners" :key="index">
          <img :src="item.img" @click="bannerClick(item)" />
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
        pickList: [],
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
      openPick(value, pick) {
        let self = this;
        pick.value = value;
        this.$sendRequest({
          url: '/product/credit/index/' + value,
          params: {
          },
          success(body){
            if (body.code === 'success') {
              let data = body.data;
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
      moreClick() {
        window.location.href = '#/product/credit/list/';
      },     
      bankClick(item) {
        window.location.href = '#/product/credit/list/' + item.id;
      },
      cardClick(item) {
        window.location.href = '#/product/credit/list/' + item.id;
      },
      bannerClick(item) {
        window.location.href = '#/product/credit/list/' + item.id;
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
              data.pickList.forEach((item, index) => {
                item.value = item.list[0].value;
              });
              self.pickList = data.pickList;
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
.vv-tab{
  // padding:0 5%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
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
  text-align:center;
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
