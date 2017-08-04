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

<style>
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

  .triangle-right {
    display:inline-block;
    width:0;
    height:0;
    border:5px dashed transparent;
    border-left:5px solid #2196f3;
  }

  .rv div.list-item {
    padding: 8px;
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
