<template>
<div class="vv-message" v-if="message.length">
  <div class="message-title">留言</div>
  <ul class="vv-comment message-content">
    <li v-for="(item, index) in message" :key="index" class="item item-left">
      <div class="comment-user">
        <img :src="item.img" class="img">
        <div class="name">{{item.name}}</div>
      </div>
      <div class="comment-text" v-html="item.text"></div>
    </li>
  </ul>
  <div class="edit-message" v-if="sendMsgUrl">
    <div class="input-box">
      <input type="text" class="eidt-input" v-model.trim="messageVal">
    </div>
    <mu-raised-button label="留言" class="vv-button" @click="sendMessage" primary />
  </div>
</div>
</template>
<script>
import native from "@/util/native";
const DEFAULT_AVATAR = require('./../../assets/images/atavar.png');
export default {
  name: 'commentMessage',
  props: {
    message: {
      type: Array,
      default: []
    },
    sendMsgUrl: ''
  },
  data() {
    return {
      isSending: false,
      messageVal: ''
    };
  },
  mounted() {
    this.person_isLogin = native.isLogin();
  },
  methods: {
    sendMessage() {
      let self = this;
      if (!this.person_isLogin) {
        self.$store.dispatch('box_set_toast', {
          show: true,
          toastText: '请先登录'
        });
        return;
      }
      if (this.isSending) {
        return;
      }
      this.isSending = true;
      if (this.messageVal.length) {
        let self = this;
        this.$sendRequest({
          url: self.sendMsgUrl,
          params: {
            msg: self.messageVal
          },
          success(body) {
            self.isSending = false;
            if (body.code === 'success') {
              let data = body.data;
              let userInfo = native.getUserInfo();
              self.message.push({
                img: userInfo.avatar || DEFAULT_AVATAR,
                name: userInfo.account,
                text: self.messageVal,
                userId: userInfo.userId
              });
              self.messageVal = '';
            } else {
              self.$store.dispatch('box_set_toast', {
                show: true,
                toastText: body.msg
              });
            }
          },
          error(err) {
            self.isSending = false;
            self.$store.dispatch('box_set_toast', {
              show: true,
              toastText: '服务器繁忙,请稍后再试'
            });
          }
        });
      }
    }
  }
}
</script>
<style lang="scss">
.vv-message {
  .edit-message {
    position:relative;
  }
}
</style>
<style lang="scss" scoped>
@import './../../assets/scss/_mixin.scss';
.vv-message {
  border-top:10px solid $bgColor2;
  .message-title {
    // margin-bottom:$spacing;
    padding:15px $spacing;
    font-size:$fontSizeTitle;
    border-bottom:1px solid $lineColor;
  }
  .message-content {
    padding:$spacing;
  }
}
</style>