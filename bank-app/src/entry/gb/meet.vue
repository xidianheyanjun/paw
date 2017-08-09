<template>
  <div class="vv-meet">
    <div class="meet-hd">
      <div class="meet-users">
        <span class="txt">参与人员：</span>
        <span class="name" v-for="(item, index) in onlineUsers">{{item}}</span>
      </div>
    </div>
    <ul class="vv-comment">
      <li v-for="(item, index) in list" :key="index">
        <div class="item item-left" v-if="!person_isLogin || !(person_isLogin && (item.userId == userId))">
          <div class="comment-user">
            <img :src="item.img" class="img">
            <div class="name">{{item.name}}</div>
          </div>
          <div class="comment-text" v-html="item.text"></div>
        </div>
        <div class="item item-right" v-if="person_isLogin && (item.userId == userId)">
          <div class="comment-text" v-html="item.text"></div>
          <div class="comment-user">
            <img :src="item.img" class="img">
            <div class="name">{{item.name}}</div>
          </div>
        </div>
      </li>
    </ul>
    <div class="edit-message">
      <div class="input-box">
        <input type="text" class="eidt-input" v-model.trim="messageVal">
      </div>
      <mu-raised-button label="发送" class="vv-button" @click="sendMessage" primary />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import native from "@/util/native";
  const DEFAULT_AVATAR = require('./../../assets/images/atavar.png');
  export default {
    name: 'gbMeet',
    computed: mapGetters([]),
    components: {},
    data(){
      return {
        list: [],
        person_isLogin: false,
        userId: '',
        isSending: false,
        messageVal: ''
      };
    },
    computed: {
      onlineUsers() {
        let names = [];
        this.list.forEach(item => {
          names.push(item.name);
        });
        return names;
      }
    },
    watch: {
      person_isLogin(v) {
        if (v) {
          this.userId = native.getUserInfo().userId || '';
          console.warn(this.userId)
        }
      }
    },
    mounted() {
      this.person_isLogin = native.isLogin();
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
          title: "自由邀请洽谈",
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
    updated() {
      let rvEl = document.body.querySelector('.rv');
      rvEl.scrollTop = rvEl.scrollHeight;
    },
    methods: {
      init() {
        let self = this;
        this.$sendRequest({
          url: '/gb/meet',
          params: {
          },
          success(body) {
            if (body.code === 'success') {
              let data = body.data;
              self.list = data.list || [];
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
      },
      redirect2detail(item){
        window.location.href = "#/gb/info/" + item.id;
      },
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
            url: '/gb/meet',
            params: {
              msg: self.messageVal
            },
            success(body) {
              self.isSending = false;
              if (body.code === 'success') {
                let data = body.data;
                let userInfo = native.getUserInfo();
                self.list.push({
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


<style scoped lang="scss">
@import './../../assets/scss/_mixin.scss';
.meet-hd {
  position: fixed;
  top:56px;
  left:0;
  padding:15px $spacing;
  box-sizing:border-box;
  background:#fff;
  border-bottom:1px solid $lineColor2;
  z-index:90;
  .meet-users {
    height:56px;
    line-height:28px;
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2; 
  }
  .txt{
    color:$fontColor2;
  }
  .name{
    &:after{
      content:'、';
      margin-right:5px;
    }
  }
}
.vv-comment {
  padding:110px $spacing 60px;
  li {
    margin-bottom:15px;
  }
}
</style>
