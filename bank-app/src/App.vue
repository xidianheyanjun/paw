<template>
  <div>
    <div class="head">
      <appHead></appHead>
    </div>
    <div class="rv">
      <router-view></router-view>
    </div>
    <div class="foot">
      <appFoot></appFoot>
    </div>
    <toast/>
  </div>
</template>

<script>
  import appHead from "@/components/core/app.head";
  import appFoot from "@/components/core/app.foot";
  import toast from "@/components/box/toast";
  import env from "./env";
  export default {
    name: 'app',
    components: {
      appHead,
      appFoot,
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

  button::-moz-focus-inner,
  input::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  .clearfix,
  .cf {
    zoom: 1;

    &:after {
      content: "";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }
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
      width:130px;
      position:relative;
      z-index:10;
    }
    .mu-text-field-hint {
      font-size:$fontSizeContent;
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
  html .mu-appbar .left{
    min-width:24px;
  }
  *::-webkit-input-placeholder {
      color: rgba(0, 0, 0, 0.87);
      font-size:$fontSizeContent;
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
    bottom: 55px;
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
    height: 56px;
    border-top:1px solid $lineColor2;
  }

  .no-data {
    margin:50% auto;
    font-size: $fontSizeContent;
    color: $fontColor2;
    text-align:center;
    &:before {
      content: '';
      display:block;
      width: 100px;
      height:62px;
      background: url(./assets/images/null.png) no-repeat;
      background-size:cover;
      margin:$spacing auto;
    }
  }
  .vv-module{
    background:#fff;
    border-bottom:10px solid $bgColor2;
  }
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
    .vv-article-list{
      margin-bottom:10rem;
    }
    .vv-banners{
      position:fixed;
      bottom:56px;
      left:0;
    }
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
  // 对话形式
  .vv-comment {
    .item {
      display: -webkit-box;
      // -webkit-box-align: center;
      -webkit-box-pack: justify;
      margin-bottom: 15px;
      &:last-child{
        margin-bottom:0;
      }
    }

    .comment-user {
      width:20%;
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
      position:relative;
      width:80%;
      box-sizing:border-box;
      min-height:48px;
      line-height:24px;
      background-color: $backgroudColor;
      padding:10px;
      font-size:$fontSizeContent;
      border-radius: $borderRadius;
      word-wrap:break-word;
      &:before {
        position:absolute;
        left:-16px;
        top:10px;
        content: '';
        display:block;
        width:0;
        height:0;
        border:9px dashed transparent;
        border-right:10px solid $backgroudColor;
      }
    }
    .item-right {
      .comment-text {
        background-color: $backgroudColor3;
        &:before {
          right:-9px;
          left:auto;
          border-left: 10px solid $backgroudColor3;
          border-right:0;
        }
      }
    }
  }
  // 发言输入
  .edit-message {
    position: fixed;
    bottom:56px;
    left:0;
    width:100%;
    height:47px;
    line-height:47px;
    box-sizing:border-box;
    border-top: 1px solid $lineColor2;
    .input-box {
      margin-right:88px;
    }
    .eidt-input {
      box-sizing:border-box;
      width:100%;
      padding:0 10px;
    }
    .vv-button {
      position:absolute;
      top:0;
      right:0;
      border-radius:0;
      height:47px;
      line-height:47px;
      width:88px;
    }
  }
  // 贷款/金融产品列表页面
  .vv-products {
    padding:$spacing;
    .item {
      margin-bottom:$spacing;
      border-bottom:1px solid $lineColor;
      &:last-child {
        border-bottom:0;
      }
    }
    .title {
      font-size: $fontSizeTitle;
      @extend %fix_width_content;
    }
    .content {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin:10px 0 15px;
      font-size: $fontSizeContent2;
      color: $fontColor2;
      line-height:22px;
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
    // 验证码
    .input-box{
      display: -webkit-box;
      -webkit-box-align: center;
      -webkit-box-pack: justify;
      width: 65%;
      .input{
        width:90px;
      }
      .btn-send{
        display:block;
        width:30px;
        color: $mainColor;
        text-align:right;
        font-size:$fontSizeContent2;
        &.send{
          color: $fontColor2;
        }
      }
    }

    .err-msg{
      padding-top:3px;
      color: #f44336;
      font-size:12px;
    }
  }
  // 个人中心页面
  .user-paper {
    display: block;
    width: 100%;
    height: 100%;
    background-color: $bgColor2;
  }
  .user-info {
    position:relative;
    height: 180px;
    background-color: $bgColor;
    .login-btn {
      position:absolute;
      top:50%;
      left:50%;
      transform: translate(-50%, -50%);
      text-align:center;
    }
    .avatar {
      width: 60px;
      height: 60px;
    }
    .font-title{
      display:block;
      color: #dce0e6;
      font-size: 18px;
      margin-top: 10px;
    }
  }
  .user-setting {
    background-color: #fff;
    .menu {
      display: -webkit-box;
      -webkit-box-align: center;
      -webkit-box-pack: justify;
      padding: 0 10px 0 $spacing;
      border-bottom: 1px solid $lineColor;
    }
    .menu-name {
      width: 90%;
      font-size: $fontSize;
      height: 42px;
      line-height: 42px;
      @extend %fix_width_content;
    }
    .menu-icon {
      width: 30px;
      font-size: 18px;
      height: 42px;
      line-height: 42px;
      text-align:center;
      color: #ccc;
    }
  }
</style>
