<template>
  <div>
    <div class="vv-module">
      <icon-row :icons="banks" @goto="gotoList"></icon-row>
    </div>

    <div>
      <div class="vv-title" v-if="list.length">
        <span class="title">热销产品</span>
        <a class="more" @click.stop="">更多 &gt;</a>
      </div>
      <ul class="vv-product-linear">
          <li class="item" v-for="(item, index) in list" :key="index" @click="productClick(item)">
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
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import iconRow from '@/components/common/icon.row';
  export default {
    name: 'product',
    components: {
      iconRow
    },
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
              let data = body.data;
              self.banks = data.banks;
              self.list = data.list || [];
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
.vv-module{
  border-bottom:10px solid $bgColor2;
}
.vv-product-linear{
  margin:0 $spacing;
  .item{
    position:relative;
    padding:15px 0;
    box-sizing:border-box;
    border-bottom: 1px solid #f0f0f0;
    &:last-child{
      border-bottom:0;
    }
  }
  .hd{
    font-weight:bold;
    padding-top:5px;
    font-size:$fontSizeContent;
  }
  .bd{
    margin:10px 0;
    font-size:12px;
    color:$fontColor2;
  }
  .tag{
    display:inline-block;
    padding:1px 5px;
    background:$mainColor2;
    border-radius:$borderRadius;
    font-size:10px;
    color:#fff;
    vertical-align:2px;
  }
  .title{
    display:inline-block;
    width:70%;
    @extend %fix_width_content;
  }
  .ft{
    position:relative;
    .num{
      position:absolute;
      color:#fff;
      font-size:10px;
      z-index:10;
    }
  }
  .rt{
    position:absolute;
    right:0;
    top:18px;
    text-align:right;
    .num{
      display:block;
      font-size:18px;
      font-weight:bold;
      color:$mainColor;
    }
    .txt{
      display:block;
      margin-top:10px;
      font-size:10px;
      color:$fontColor2;
    }
  }
}
</style>
