<template>
<div class="vv-icons">
  <mu-row gutter class="vv-row">
    <mu-col width="25" tablet="25" desktop="25" v-for="(item, index) in icons" :key="index">
      <a class="item" @click="iconClick(item.id)">
        <div class="icon">
          <img :src="item.icon"/>
        </div>
        <div class="name">{{item.name}}</div>
      </a>
    </mu-col>
    <mu-col width="25" tablet="25" desktop="25" v-if="hasMore">
      <a class="item" @click="iconClick('all')">
        <div class="icon">
          <img src="static/images/more.png"/>
        </div>
        <div>更多</div>
      </a>
    </mu-col>
  </mu-row>
</div>
</template>
<script>
export default {
  name: 'iconRow',
  props: {
    icons: {
      type: Array,
      default: []
    },
    hasMore: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    iconClick(id) {
      this.$emit('goto', id);
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../assets/scss/_mixin.scss';
.vv-icons {
  text-align:center;
  .vv-row {
    margin:$spacing $spacing 0;
  }
  .item {
    display:block;
    margin-bottom:18px;
    color:rgba(0, 0, 0, 0.87);
    font-size:12px;
    text-align:center;
  }
  .icon {
    margin:0 auto 5px;
    width:45px;
    height:45px;
    background:#f6f6f6;
    border-radius:100%;
    text-align:center;
    line-height:42px;
    img {
      width:32px;
      height:32px;
      border-radius:100%;
      vertical-align:middle;
    }
  }
  .name {
    @extend %fix_width_content;
  }
}
</style>