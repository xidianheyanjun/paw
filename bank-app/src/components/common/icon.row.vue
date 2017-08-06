<template>
<div class="vv-icons">
  <mu-row gutter class="row">
    <mu-col width="25" tablet="25" desktop="25" v-for="(item, index) in icons" :key="index">
      <a class="item" @click="iconClick(item.id)">
        <div class="icon">
          <img :src="item.icon"/>
        </div>
        <div class="name">{{item.name}}</div>
      </a>
    </mu-col>
    <mu-col width="25" tablet="25" desktop="25">
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
    }
  },
  methods: {
    iconClick(id) {
      this.$emit('goto', id);
    }
  }
}
</script>
<style lang="scss">
@import './../../assets/scss/_mixin.scss';
.vv-icons {
  text-align:center;
  .row {
    margin:$spacing;
  }
  .item {
    display:block;
    margin-bottom:15px;
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
      vertical-align:middle;
    }
  }
  .name {
    @extend %fix_width_content;
  }
}
</style>