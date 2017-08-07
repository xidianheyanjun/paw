<template>
  <div class="page-body" ref="body">
    <!--mu-tabs :value="activeTab" @change="changeTab">
      <mu-tab value="fangdai" title="房贷计算"/>
      <mu-tab value="huankuanbijiao" title="还款比较"/>
      <mu-tab value="cunkuanlilv" title="存款计算器"/-->
    </mu-tabs>
    <div class="vv-form" v-show="!isShow">
      <div class="msg">2015年10月24日最新商贷利率4.90%，公积金利率3.25%</div>
      <div class="vv-row">
        <div class="vv-col-title">贷款期限</div>
        <div class="vv-col-value">
          <mu-select-field v-model="qixian" :labelFocusClass="['label-foucs']" label="" hintText="" :underlineShow="false">
            <mu-menu-item value="5" title="5年"/>
            <mu-menu-item value="10" title="10年"/>
            <mu-menu-item value="15" title="15年"/>
            <mu-menu-item value="20" title="20年"/>
            <mu-menu-item value="25" title="25年"/>
            <mu-menu-item value="30" title="30年"/>
          </mu-select-field>
        </div>
      </div>
      <div class="vv-row">
        <div class="vv-col-title">商业贷款</div>
        <div class="vv-col-value">
          <mu-text-field v-model.trim="sdje" label="" hintText="" helpText="万元" :underlineShow="false"/>
        </div>
      </div>
      <div class="vv-row">
        <div class="vv-col-title">商贷利率</div>
        <div class="vv-col-value">
          <mu-select-field v-model="sdlilv" :labelFocusClass="['label-foucs']" label="" hintText="" :underlineShow="false">
            <mu-menu-item value="0.7" title="最新基准利率7折"/>
            <mu-menu-item value="0.8" title="最新基准利率8折"/>
            <mu-menu-item value="0.83" title="最新基准利率8.3折"/>
            <mu-menu-item value="0.85" title="最新基准利率8.5折"/>
            <mu-menu-item value="0.88" title="最新基准利率8.8折"/>
            <mu-menu-item value="0.9" title="最新基准利率9折"/>
            <mu-menu-item value="0.95" title="最新基准利率9.5折"/>
            <mu-menu-item value="1" title="最新基准利率"/>
            <mu-menu-item value="1.05" title="最新基准利率1.05倍"/>
            <mu-menu-item value="1.1" title="最新基准利率1.1倍"/>
            <mu-menu-item value="1.2" title="最新基准利率1.2倍"/>
            <mu-menu-item value="1.3" title="最新基准利率1.3倍"/>
          </mu-select-field>
        </div>
      </div>
      <div class="vv-row">
        <div class="vv-col-title">手动输入利率</div>
        <div class="vv-col-value">
          <mu-text-field v-model.trim="sdLilvValue" label="" hintText="" helpText="%" :underlineShow="false"/>
        </div>
      </div>
      <div class="vv-row">
        <div class="vv-col-title">公积金贷款</div>
        <div class="vv-col-value">
          <mu-text-field v-model.trim="gjjje" label="" hintText="" helpText="万元" :underlineShow="false"/>
        </div>
      </div>
      <div class="vv-row">
        <div class="vv-col-title">公积金利率</div>
        <div class="vv-col-value">
          <mu-select-field v-model="gjjlilv" :labelFocusClass="['label-foucs']" label="" hintText="" :underlineShow="false">
            <mu-menu-item value="1" title="公积金基准利率"/>
            <mu-menu-item value="1.1" title="公积金基准利率1.1倍"/>
            <mu-menu-item value="1.2" title="公积金基准利率1.2倍"/>
          </mu-select-field>
        </div>
      </div>
      <div class="vv-row">
        <div class="vv-col-title">手动输入利率</div>
        <div class="vv-col-value">
          <mu-text-field v-model.trim="gjjLilvValue" label="" hintText="" helpText="%" :underlineShow="false"/>
        </div>
      </div>

      <mu-raised-button @click="calculate" label="计算" class="demo-raised-button vv-button" primary fullWidth/>
    </div>
    
    <div class="vv-form calc-result" v-show="isShow" ref="result">
      <dl class="form-list">
        <dt class="title">等额本息（每月等额还款）</dt>
        <dd class="col">
          <span class="name">贷款总额</span>
          <span class="value">{{debx_dkje}}元</span>
        </dd>
        <dd class="col">
          <span class="name">还款月数</span>
          <span class="value">{{debx_dkqx}}月</span>
        </dd>
        <dd class="col">
          <span class="name">每月还款</span>
          <span class="value">{{debx_myhk}}元</span>
        </dd>
        <dd class="col">
          <span class="name">总支付利息</span>
          <span class="value">{{debx_zflx}}元</span>
        </dd>
        <dd class="col">
          <span class="name">本息合计</span>
          <span class="value">{{debx_hkze}}元</span>
        </dd>
      </dl>
      <dl class="form-list">
        <dt class="title">等额本金（逐月递减还款）</dt>
        <dd class="col">
          <span class="name">贷款总额</span>
          <span class="value">{{debj_dkje}}元</span>
        </dd>
        <dd class="col">
          <span class="name">还款月数</span>
          <span class="value">{{debj_dkqx}}月</span>
        </dd>
        <dd class="col">
          <span class="name">首月还款</span>
          <span class="value">{{debj_syhk}}元</span>
        </dd>
        <dd class="col">
          <span class="name">每月递减</span>
          <span class="value">{{debj_mydj}}元</span>
        </dd>
        <dd class="col">
          <span class="name">总支付利息</span>
          <span class="value">{{debj_zflx}}元</span>
        </dd>
        <dd class="col">
          <span class="name">本息合计</span>
          <span class="value">{{debj_hkze}}元</span>
        </dd>
      </dl>
      <mu-raised-button @click="reCalculate" label="重新计算" class="demo-raised-button vv-button" primary fullWidth/>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import HYCalc from '@/util/calculator.fangdai.js';
  export default {
    name: 'serviceHelp',
    computed: mapGetters([]),
    components: {},
    data(){
      return {
        // activeTab: 'fangdai',
        isShow: false,

        qixian: '30',
        sdje: 100,
        sdlilv: '1',
        sdLilvValue: 4.9,
        gjjje: 80,
        gjjlilv: '1',
        gjjLilvValue: 3.25,

        debx_dkje: 0,
        debx_dkqx: 0,
        debx_myhk: 0,
        debx_zflx: 0,
        debx_hkze: 0,
        
        debj_dkje: 0,
        debj_dkqx: 0,
        debj_syhk: 0,
        debj_mydj: 0,
        debj_zflx: 0,
        debj_hkze: 0
      }
    },
    watch: {
      sdlilv(v1, v2) {
        if (v1 !== v2) {
          this.sdLilvValue = HYCalc.getSdLilv(this.qixian * 12, v1);
        }
      },
      gjjlilv(v1, v2) {
        if (v1 !== v2) {
          this.gjjLilvValue = HYCalc.getGjjLilv(this.qixian * 12, v1);
        }
      }
    },
    mounted() {
      let self = this;
      this.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: function () {
            if (self.isShow) {
              self.isShow = false;
              return;
            }
            window.location.href = "#/home/index";
          }
        },
        center: {
          img: "",
          title: "房贷计算器",
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

      
    },
    methods: {
      calculate() {
        let self = this;
        let zh = HYCalc.calcZh(this.sdje, this.gjjje, this.sdLilvValue, this.gjjLilvValue, this.qixian);
        if (!zh) {
          self.$store.dispatch('box_set_toast', {
            show: true,
            toastText: '请完成填写'
          });
          return;
        }
        let {je, qixian, debx, debj, input} = zh;
        this.debx_dkje = HYCalc.fmoney(je, 2);
        this.debx_dkqx = qixian;
        this.debx_myhk = HYCalc.fmoney(debx.yhk, 2);
        this.debx_zflx = HYCalc.fmoney(debx.zlx, 2);
        this.debx_hkze = HYCalc.fmoney(debx.hkze, 2);
        this.debj_dkje = HYCalc.fmoney(je, 2);
        this.debj_dkqx = qixian;
        this.debj_syhk = HYCalc.fmoney(debj.syhk, 2);
        this.debj_mydj = HYCalc.fmoney(debj.mydj, 2);
        this.debj_zflx = HYCalc.fmoney(debj.zlx, 2);
        this.debj_hkze = HYCalc.fmoney(debj.hkze, 2);
        
        this.isShow = true;
        // document.body.querySelector('.rv').scrollTop = this.$refs.result.offsetTop; // 滚动到某个位置有待改进
      },
      reCalculate() {
        this.isShow = false;
      }
      
    }
  }
</script>
<style lang="scss" scoped>
@import './../../assets/scss/_mixin.scss';
.msg {
  color:$mainColor2;
  padding:$spacing;
}
.vv-form {
  .vv-col-title {
    width:30%;
  }
  .vv-col-value {
    width: 70%;
  }
}
.form-list {
  .title,
  .col {
    height:40px;
    line-height:40px;
    box-sizing: border-box;
    padding: 0 $spacing;
    border-bottom: 1px solid $lineColor2;
  }
  .title {
    background: $backgroudColor;
    font-size: $fontSizeTitle;
  }
  .col {
    font-size: $fontSizeContent;
    .name,
    .value {
      float:left;
      display: block;
      width: 50%;
    }
    .value {
      text-align: right;
      color: $fontColor2;
    }
  }
}
</style>
