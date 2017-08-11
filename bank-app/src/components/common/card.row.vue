<template>
<div class="vv-cards">
  <div class="vv-title" v-if="title">
    <span>{{title}}</span>
    <a v-if="moreUrl" class="more" :href="moreUrl">更多 &gt;</a>
  </div>
  <ul :class="[{'card-list clearfix': type === 'row1'}, {'card-list2 clearfix': type === 'row2'}, , {'card-list3 clearfix': type === 'row3'}]">
    <li :class="[{'card-item clearfix': type === 'row1'}, {'card-item2 clearfix': type === 'row2'}, {'card-item3 clearfix': type === 'row3'}]" v-for="(item, index) in cards" :key="index" @click="cardClick(item.id)">
      <template v-if="type === 'row2'">
        <div class="txt">
          <h3>{{item.title}}</h3>
          <p v-html="item.info"></p>
        </div>
        <img :src="item.image" alt="" class="img">
      </template>
      <template v-if="type === 'row1' || type === 'row3'">
        <img :src="item.image" alt="" class="img">
        <div class="txt">
          <h3>{{item.title}}</h3>
          <p v-html="item.info"></p>
        </div>
      </template>
    </li>
  </ul>
</div>

</template>
<script>
export default {
  name: 'cardRow',
  props: {
    type: {
      type: String,
      default: 'row1'
    },
    title: {
      type: String,
      default: ''
    },
    moreUrl: {
      type: String,
      default: ''
    },
    cards: {
      type: Array,
      default: []
    }
  },
  methods: {
    cardClick(id) {
      this.$emit('goto', id);
    }
  }
}
</script>
<style lang="scss" scoped>
@import './../../assets/scss/_mixin.scss';
.vv-title{
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  font-size:14px;
  height:46px;
  line-height:46px;
  padding:0 20px;
  border-bottom: 1px solid $lineColor;
  span {
    display:block;
  }
  .more {
    display:block;
    color:$fontColor2;
  }
}
.card-item {
  margin:$spacing;
  padding-bottom:$spacing;
  border-bottom: 1px solid $lineColor;
  &:last-child{
    border-bottom:0;
  }
  .img {
    float:left;
    width:138px;
    height:84px;
    // width:40%;
    // max-width:138px;
    // max-height:84px;
    overflow:hidden;
    margin-right:10px;
  }
  .txt h3{
    font-size:$fontSizeTitle;
    margin-bottom:8px;
    @extend %fix_width_content;
  }
  .txt p{
    font-size:$fontSizeContent2;
    color:$fontColor2;
    line-height:20px;
    height:60px;
    overflow:hidden;
  }
}
.card-item2 {
  float:left;
  width:50%;
  box-sizing:border-box;
  border-right:1px solid $lineColor;
  border-bottom:1px solid $lineColor;
  padding: $spacing;
  // height: 90px;
  &:nth-of-type(2n) {
    border-right:0;
  }
  .txt{
    margin-top:10px;
    float:left;
    color: $fontColor2;
    font-size:12px;
    width:65%;
    h3{
      font-size:$fontSizeTitle;
      margin-bottom:7px;
      color:$mainColor;
      @extend %fix_width_content;
    }
    p{
      @extend %fix_width_content;
    }
  }
  .img{
    float:right;
    width:35%;
    max-width:50px;
    max-height:50px;
    overflow:hidden;
    // width:50px;
    // height:50px;
  }
}
.card-item3{
  float:left;
  width:33%;
  text-align:center;
  padding: $spacing;
  border-right:1px solid $lineColor;
  
  &:nth-of-type(3n) {
    border-right:0;
  }
  .txt{
    margin-top:10px;
    // float:left;
    color: $fontColor2;
    font-size:12px;
    width:100%;
    text-align:center;
    h3{
      font-size:$fontSizeTitle;
      margin-bottom:7px;
      color:$mainColor;
      @extend %fix_width_content;
    }
    p{
      @extend %fix_width_content;
    }
  }
  .img {
    float:none;
    display:block;
    margin:0 auto;
    width:100%;
    max-width:80px;
    max-height:60;
    overflow:hidden;
    // width:80px;
    // height:60px;
  }
}

</style>