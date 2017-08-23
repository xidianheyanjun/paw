<template>
  <div>
    <div class="vv-module">
      <icon-row :icons="banks" @goto="gotoList"></icon-row>
    </div>

    <div class="vv-module vv-product-box">
      <div class="vv-title" v-if="list.length">
        <span class="title">热销产品</span>
        <a class="more" href="#/product/finance/list">更多 &gt;</a>
      </div>
      <ul class="vv-product-linear">
          <li class="item" v-for="(item, index) in list" :key="index" @click="productClick(item)">
            <div class="hd">
              <span class="tag" v-if="item.tag">{{item.tag}}</span>
              <span class="title">{{item.title}}</span>
            </div>
            <div class="bd">
              <span class="time">购买天数：{{item.time}}天</span>
              <span class="money">购买起点：{{item.money}}</span>
            </div>
            <div class="ft">
              <span class="num">{{item.num}}%</span>
              <mu-linear-progress mode="determinate" :value="parseFloat(item.num)" :size="10" :max="100" color="blue" />
            </div>
            <div class="rt">
              <strong class="num">{{item.profit}}%</strong>
              <span class="txt">收益率</span>
            </div>
          </li>
      </ul>
    </div>

    <div class="vv-notice" v-show="notice.length">
      <div class="notice-list" ref="notice">
        <a class="item" v-for="(item, index) in notice" :key="index" v-html="item.title" :href="item.url"></a>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import iconRow from '@/components/common/icon.row';
  let noticeTimer = null;
  export default {
    name: 'product',
    components: {
      iconRow
    },
    data(){
      return {
        banks: [],
        list: [],
        notice: []
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
      this.noticeScroll();
    },
    watch: {
      notice(v) {
        v && this.noticeScroll();
      }
    },
    beforeDestroy() {
      clearInterval(noticeTimer);
      noticeTimer = null;
    },
    methods: {
      noticeScroll() {
        if (!this.notice.length) {
          return;
        }
        const BROADCAST_TIME = 100;
        const elHeight = 20;
        let distance = 0;
        let noticeLen = this.notice.length;
        let noticeElHeight = elHeight * noticeLen;
        noticeTimer = setInterval(() => {
          distance++;
          if (distance < noticeElHeight) {
            this.$refs.notice.style.top = -distance + 'px';
          } else {
            distance = 0;
          }
        }, BROADCAST_TIME);
      },
      gotoList(id) {
        window.location.href = '#/product/finance/list?ids=' + id;
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
              let banks = data.banks || [];
              if (banks.length > 7) {
                  banks.length = 7;
              }
              self.banks = banks;
              self.list = data.list || [];
              self.notice = data.notice || [];
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
.vv-product-box{
  margin-bottom:30px;
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
    font-weight:500;
    margin-top:5px;
    font-size:$fontSizeContent;
  }
  .bd{
    margin:10px 0;
    font-size:12px;
    color:$fontColor2;
    .time {
      margin-right:5px;
    }
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
      text-align:center;
      margin-left:5px;
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
.vv-notice {
  position:fixed;
  left:0;
  bottom:56px;
  width:100%;
  height:40px;
  overflow:hidden;
  box-sizing:border-box;
  padding:0 $spacing;
  line-height:40px;
  display: -webkit-box;
  -webkit-box-align: center;
  font-size:$fontSizeContent;
  background:#fff;
  border-top:1px solid $lineColor2;
  z-index:30;
  &:before{
    content: '';
    display:block;
    width:10%;
    min-width:30px;
    height:30px;
    background:url(./../../../assets/images/broadcast.png) no-repeat;
    background-size:cover;
  }
  .notice-list {
    position:relative;
    top:0;
    left:0;
    margin-left:5px;
    width:85%;
    .item{
      color:$mainColor;
      @extend %fix_width_content;
      display:block;
    }
  }
}
</style>
