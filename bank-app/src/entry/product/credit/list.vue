<template>
  <div>
    <picker :pickList="pickList"></picker>
    <!--mu-row class="vv-tab">
      <mu-col width="auto" tablet="auto" desktop="auto" v-for="(pick, index) in pickList" :key="index">
        <mu-dropDown-menu :value="pick.value" @change="openPick($event, pick)">
          <mu-menu-item v-for="(item, idx) in pick.list" :key="idx" :value="item.value" :title="item.name"/>
        </mu-dropDown-menu>
      </mu-col>
    </mu-row-->
    <div class="vv-cards">
        <a class="vv-col clearfix" v-for="(item, index) in banks" :key="index" @click="cardClick(item)">
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
  import picker from '@/components/common/picker';
  export default {
    name: 'product',
    components: {
      picker
    },
    data(){
      return {
        pickList: [],
        banks: []
      };
    },
    computed: {
      pickWidth() {
        return Math.floor(100 / this.pickList.length);
      }
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
      cardClick(item) {
        window.location.href = '#/product/credit/apply/' + item.id;
      },
      init() {
        let self = this;
        this.$sendRequest({
          url: '/product/credit/list',
          params: {
          },
          success(body){
            if (body.code === 'success') {
              let data = body.data;
              data.pickList.forEach((item, index) => {
                item.curIdx = 0;
              });
              self.pickList = data.pickList;
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
.rv {
  background: #fff;
}
</style>
<style scoped>
.vv-col{
  margin:5%;
  display:block;
  color:rgba(0, 0, 0, 0.87);
}
.vv-tab{
  // padding:0 5%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
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
