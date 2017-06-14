<template>
  <div class="vv-grid vv-tac vv-pr">
    <mu-row gutter class="vv-row">
      <mu-col width="50" tablet="50" desktop="50" class="vv-col vv-bg-light-blue">
        <mu-flat-button label="金融产品" class="flat-button" icon="account_balance" primary/>
        <mu-flat-button label="贷款产品" class="flat-button" icon="panorama_fish_eye" primary/>
        <mu-flat-button label="信用卡" class="flat-button" icon="panorama_fish_eye" primary/>
        <mu-flat-button label="理财产品" class="flat-button" icon="panorama_fish_eye" primary/>
      </mu-col>
      <mu-col width="50" tablet="50" desktop="50" class="vv-col vv-bg-deep-purple">
        <mu-flat-button label="政银企对接" class="flat-button" icon="forum" primary/>
        <mu-flat-button label="对接信息发布" class="flat-button" icon="panorama_fish_eye" primary/>
        <mu-flat-button label="自由邀请洽谈" class="flat-button" icon="panorama_fish_eye" primary/>
        <mu-flat-button label="对接交流论坛" class="flat-button" icon="panorama_fish_eye" primary/>
      </mu-col>
    </mu-row>
    <mu-row gutter class="vv-row vv-mt10">
      <mu-col width="50" tablet="50" desktop="50" class="vv-col vv-bg-pink">
        <mu-flat-button label="特色服务" class="flat-button" labelClass="vv-label" iconClass="vv-icon" icon="room_service"
                        primary/>
        <mu-flat-button label="个人征信查询" class="flat-button" icon="panorama_fish_eye" primary/>
        <mu-flat-button label="附近银行" class="flat-button" icon="panorama_fish_eye" primary/>
        <mu-flat-button label="金融计算机" class="flat-button" icon="panorama_fish_eye" primary/>
        <mu-flat-button label="惠银帮办" class="flat-button" icon="panorama_fish_eye" primary/>
        <mu-flat-button label="信用卡优惠信息" class="flat-button" icon="panorama_fish_eye" primary/>
      </mu-col>
      <mu-col width="50" tablet="50" desktop="50" class="vv-col vv-bg-light-green">
        <mu-flat-button label="金融资讯" class="flat-button" icon="map" primary/>
        <mu-flat-button label="政策宣传" class="flat-button" icon="panorama_fish_eye" primary/>
        <mu-flat-button label="金融论坛" class="flat-button" icon="panorama_fish_eye" primary/>
        <mu-flat-button label="行业动态" class="flat-button" icon="panorama_fish_eye" primary/>
      </mu-col>
    </mu-row>

    <div class="vv-circle"></div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    components: {},
    mounted(){
      this.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: null
        },
        center: {
          img: "",
          title: "首页",
          callback: null
        },
        right: {
          img: "",
          title: "去登陆",
          callback: null
        }
      });

      this.$store.dispatch("foot_setActive", 0);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vv-grid {
    height: 100%;
  }

  .vv-grid .vv-row {
    height: 48%;
  }

  .vv-grid .vv-row.vv-mt10 {
    margin-top: 4%;
  }

  .vv-grid .vv-row .vv-col {
    height: 100%;
  }

  .vv-bg-light-blue {
    background-color: #40c4ff;
  }

  .vv-bg-deep-purple {
    background-color: #b39ddb;
  }

  .vv-bg-pink {
    background-color: #e91e63;
  }

  .vv-bg-light-green {
    background-color: #8bc34a;
  }

  .vv-circle {
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: #ffffff;
    position: absolute;
    top: 45%;
    left: 43%;
  }

  .flat-button {
    display: block;
  }

  .vv-label {
    font-size: 16px;
  }

  .vv-icon{

  }
</style>
