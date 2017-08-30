<template>
  <div>
    <article-detail :title="title" :content="content"></article-detail>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import articleDetail from '@/components/common/article.detail';
  export default {
    name: 'serviceZxintro',
    computed: mapGetters([]),
    components: {
      articleDetail
    },
    data(){
      return {
        title: '',
        content: `本协议由****和您签订。为明确用户在接受和提供本手机客户端服务过程中的权利义务，特制订本协议。<span style="color:red;">您在通过本软件使用本公司提供的服务前，请仔细阅读以下全部条款，一经点击“同意”或“勾选”后完成下一步操作，即视为您同意了本协议全部条款。</span>所以，若您对本协议任何条款有异议的，请不要操作下一步或点击“同意”或“勾选”。
                  <h3 style="font-weight:bold;">第一条 服务内容</h3>
                  (一) 本公司提供的。。。。。。<br/>
                  (二) 本公司提供的。。。。。
                  <h3 style="font-weight:bold;">第二条 授权条款</h3>
                  <div style="color:red;">
                  (一) 本公司提供的。。。。。。<br/>
                  (二) 本公司提供的。。。。。
                  </div>
                  <h3 style="font-weight:bold;">第三条 您的权利与义务</h3>
                  (一) 本公司提供的。。。。。。<br/>
                  (二) 本公司提供的。。。。。`
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
          title: "服务条款",
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
      // this.init();
    },
    methods: {
      init() {
        let self = this;
        this.$sendRequest({
          url: '/service/zxintro',
          params: {
          },
          success(body){
            if (body.code === 'success') {
              let data = body.data;
              self.title = data.title;
              self.content = data.content;
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