<template>
<div>
  <div class="vv-module" v-if="types.length">
    <div class="vv-title">
      <span>问题类型</span>
    </div>
    <icon-row :icons="types" :hasMore="false" @goto="gotoList"></icon-row>
  </div>
  <div class="vv-module" v-if="list.length">
    <div class="vv-title">
      <span>热门问题</span>
    </div>
    <ul class="list">
      <li class="item" v-for="(item, index) in list" :key="index" @click="goto(item.id)">
        {{item.title}}
      </li>
    </ul>
  </div>
</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import iconRow from '@/components/common/icon.row';
  export default {
    name: 'personHelp',
    computed: mapGetters([]),
    components: {
      iconRow
    },
    data(){
      return {
        types: [],
        list: []
      };
    },
    mounted(){
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
          title: "帮助与反馈",
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
        window.location.href = '#/person/helpList/' + id;
      },
      goto(id) {
        window.location.href = '#/person/helpDetail/' + id;
      },
      init() {
        let self = this;
        this.$sendRequest({
          url: '/user/help',
          params: {
          },
          success(body){
            if (body.code === 'success') {
              let data = body.data;
              self.types = data.types;
              self.list = data.list;
            } else {
              self.$store.dispatch('box_set_toast', {
                show: true,
                toastText: body.msg
              });
            }
          },
          error(err) {
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

<style lang="scss" scoped>
@import './../../assets/scss/_mixin.scss';
.list{
  margin-left: 20px;
  .item {
    padding: 15px 10px 15px 5px;
    border-bottom:1px solid $lineColor;
    font-size: $fontSizeContent2;
    color: $fontColor2;
    @extend %fix_width_content;
    &:before{
      // margin:0 5px;
      content: '';
      display:inline-block;
      width:0;
      height:0;
      border-radius: 100%;
      border: 2px solid $mainColor;
      vertical-align:middle;
    }
  }
}
</style>
