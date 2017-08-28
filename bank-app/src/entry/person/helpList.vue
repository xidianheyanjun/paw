<template>
  <div class="user-paper">
    <div class="user-setting">
      <div class="hd">常见问题分类</div>
      <div class="col" v-for="(item, index) in list" :key="index" @click="toggle(item)">
        <div class="menu">
          <div class="menu-name">{{item.title}}</div>
          <div :class="['menu-icon', {'menu-icon-down': item.isShow}]">&gt;</div>
        </div>
        <ul class="list" v-if="item.list.length" v-show="item.isShow">
          <li class="item" v-for="(item2, index2) in item.list" :key="index2" @click="goto(item2.id)">
            {{item.title}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'personHelpList',
  data() {
    return {
      list: []
    };
  },
  mounted() {
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
    this.id = this.$route.params['id'];
    this.init();
  },
  methods: {
    toggle(item) {
      let isShow = item.isShow;
      this.list.forEach(item => {
        item.isShow = false;
      });
      item.isShow = !isShow;
    },
    goto(id) {
      window.location.href = '#/person/helpDetail/' + id;
    },
    init() {
      let self = this;
      this.$sendRequest({
        url: '/user/helpList/' + self.id,
        params: {
        },
        success(body){
          if (body.code === 'success') {
            let data = body.data;
            let list = data.list;
            list.forEach(item => {
              item.isShow = false;
            });
            self.list = list;
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
.hd{
  font-size:$fontSizeContent2;
  color:$fontColor3;
  padding: 10px 20px;
  background:#eee;
}
.list{
  padding-left: 20px;
  border-bottom:1px solid $lineColor;
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
    &:last-child{
      border-bottom:0;
    }
  }
}
</style>