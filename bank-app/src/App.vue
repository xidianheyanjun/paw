<template>
  <div>
    <div class="head">
      <appHead></appHead>
    </div>
    <div class="rv">
      <router-view></router-view>
    </div>

    <toast/>
  </div>
</template>

<script>
  import appHead from "@/components/core/app.head";
  import toast from "@/components/box/toast";
  import env from "./env";
  export default {
    name: 'app',
    components: {
      appHead,
      toast
    },
    data(){
      return {};
    }
  }
</script>

<style lang="scss">
@charset 'utf-8';
@import './assets/scss/_mixin.scss';
  /* http://meyerweb.com/eric/tools/css/reset/
    v2.0 | 20110126
    License: none (public domain)
 */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  // 重写 muse-ui
  .mu-text-field {
    width: 100%;
  }
  .mu-text-field-content {
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: justify;
    .mu-text-field-input,
    .mu-text-field-help{
      display:block;
      position:inherit
    }
    .mu-text-field-input{
      width:100px;
    }
  }
  .mu-sub-header {
    padding:0 $spacing;
    font-size:$fontSizeTitle;
    color:$fontColor3;
    text-align:center;
  }
  .mu-content-block {
    color:$fontColor;
    font-size:$fontSizeContent;
    line-height:22px;
    padding:10px 0;
    img {
      margin: 10px 0;
      width:100%;
    }
  }
  // common
  .head {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 56px;
  }

  .rv {
    position: fixed;
    top: 55px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
    background: #fff;
    color: $fontColor;
  }

  .foot {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 8%;
  }

  .clearfix:after {
    content: '';
    height: 0;
    display: block;
    visibility: hidden;
    clear: both;
  }

  .vv-tac {
    text-align: center;
  }

  .vv-pr {
    position: relative;
  }

  .vv-flat-button {
    display: block;
    color: #ffffff;
    text-align: left;
  }

  .vv-menu {
    display: block;
    color: #ffffff;
    text-align: left;
    margin: 8% 0;
  }

  .vv-label {
    font-size: 18px;
  }

  .vv-sub-label {
    font-size: 16px;
    padding-left: 6%;
  }

  .vv-icon {
    font-size: 32px;
  }

  .vv-sub-icon {
    display: inline-block;
    font-size: 12px;
    width: 10px;
    height: 10px;
    background-color: #ffffff;
    border-radius: 5px;
    margin-left: 12%;
  }

  
  // 咨询页面
  .vv-article {
    padding:$spacing 0;
    // 列表页
    .list-item {
      padding:8px $spacing;
      font-size:$fontSizeTitle;
      color:$fontColor3;
      @extend %fix_width_content;
    }
    .list-title {
      margin-bottom:10px;
      padding: 10px;
      font-size:$fontSize;
      border-bottom:1px solid $lineColor;
    }
    .triangle-right {
      display:inline-block;
      width:0;
      height:0;
      border:5px dashed transparent;
      border-left:5px solid #2196f3;
    }
    // 详情页
  }
   .vv-article-detial {
      padding: 10px $spacing;
   }
    // 对话形式
  .vv-comment {
    margin-bottom: 15px;
    &:last-child{
      margin-bottom:0;
    }

    .comment-user {
      text-align: center;
      img {
        width: 28px;
        height:28px;
        overflow:hidden;
        border-radius: $borderRadius;
      }
      .name {
        font-size:$fontSizeContent2;
        padding-top: 4px;
        @extend %fix_width_content;
      }
    }

    .comment-text {
      box-sizing:border-box;
      min-height:48px;
      line-height:24px;
      background-color: $backgroudColor3;
      padding:10px;
      font-size:$fontSizeContent;
      // line-height: 150%;
      // text-indent: 2em;
      border-radius: $borderRadius;
    }
  }
  // 表单填写
  .vv-form {
    .vv-row {
      display: -webkit-box;
      -webkit-box-align: center;
      -webkit-box-pack: justify;
      width: 100%;
      height:40px;
      line-height:40px;
      box-sizing: border-box;
      padding: 0 $spacing;
      margin-bottom: 5px;
      border-bottom: 1px solid $lineColor2;
    }
    .vv-col-title {
      width: 20%;
      vertical-align: middle;
      font-size: $fontSizeContent;
    }
    .vv-col-value {
      width: 80%;
      overflow: hidden;
      text-align: left;
      // text-align: right;
      vertical-align: middle;
    }
    .vv-button {
      margin:$spacing auto;
      // position: fixed;
      // bottom:0;
      // left:0;
    }
  }
  /**rest muse-ui css */
html .vv-tab .mu-dropDown-menu-line{
  display: none;
}
html .mu-menu-item-wrapper.active {
  color:#2196f3;
}
html .mu-dropDown-menu {
  font-size:14px;
}
html .mu-dropDown-menu-icon{
  right: 27px;
}
html .mu-dropDown-menu-text{
  padding-left:10px;
}
</style>
