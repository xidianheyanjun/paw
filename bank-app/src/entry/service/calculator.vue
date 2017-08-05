<template>
  <div class="page-body">
    <mu-tabs :value="activeTab" @change="changeTab">
      <mu-tab value="fangdai" title="房贷计算"/>
      <mu-tab value="huankuanbijiao" title="还款比较"/>
      <mu-tab value="cunkuanlilv" title="存款计算器"/>
    </mu-tabs>
    <div class="vv-form">
      <div class="vv-row">
        <div class="vv-col-title">贷款期限</div>
        <div class="vv-col-value">
          <mu-select-field v-model="fangdaiData.qixian" :labelFocusClass="['label-foucs']" label="" hintText="">
            <mu-menu-item value="10" title="10年"/>
            <mu-menu-item value="20" title="20年"/>
            <mu-menu-item value="30" title="30年"/>
          </mu-select-field>
        </div>
      </div>
      <div class="vv-row">
        <div class="vv-col-title">商业贷款</div>
        <div class="vv-col-value">
          <mu-text-field v-model.trim="fangdaiData.sdje" label="" hintText=""/>
        </div>
      </div>
      <div class="vv-row">
        <div class="vv-col-title">商贷利率</div>
        <div class="vv-col-value">
          <mu-select-field v-model="fangdaiData.sdlilv" :labelFocusClass="['label-foucs']" label="" hintText="">
            <mu-menu-item value="0.7" title="最新基准利率7折"/>
            <mu-menu-item value="0.8" title="最新基准利率8折"/>
            <mu-menu-item value="0.83" title="最新基准利率8.3折"/>
            <mu-menu-item value="1" title="最新基准利率"/>
          </mu-select-field>
        </div>
      </div>
      <div class="vv-row">
        <div class="vv-col-title">手动输入利率</div>
        <div class="vv-col-value">
          <mu-text-field v-model.trim="fangdaiData.sdLilvValue" label="" hintText=""/>
        </div>
      </div>
      <div class="vv-row">
        <div class="vv-col-title">公积金贷款</div>
        <div class="vv-col-value">
          <mu-text-field v-model.trim="fangdaiData.gjjje" label="" hintText=""/>
        </div>
      </div>
      <div class="vv-row">
        <div class="vv-col-title">公积金利率</div>
        <div class="vv-col-value">
          <mu-select-field v-model="fangdaiData.gjjlilv" :labelFocusClass="['label-foucs']" label="" hintText="">
            <mu-menu-item value="1" title="公积金基准利率"/>
            <mu-menu-item value="1.1" title="公积金基准利率1.1倍"/>
            <mu-menu-item value="1.2" title="公积金基准利率1.2倍"/>
          </mu-select-field>
        </div>
      </div>
      <div class="vv-row">
        <div class="vv-col-title">手动输入利率</div>
        <div class="vv-col-value">
          <mu-text-field v-model.trim="fangdaiData.gjjLilvValue" label="" hintText=""/>
        </div>
      </div>

      <mu-raised-button @click="calculate" label="计算" class="demo-raised-button vv-button" primary fullWidth/>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'serviceHelp',
    computed: mapGetters([]),
    components: {},
    data(){
      return {
        activeTab: "fangdai",
        fangdaiData: {},
        loanType: "1",
        loanTypes: [{
          title: "个人公积金贷款",
          value: "1"
        }, {
          title: "个人综合消费贷款",
          value: "2"
        }, {
          title: "个人短期信用贷款",
          value: "3"
        }, {
          title: "个人汽车贷款",
          value: "4"
        }, {
          title: "助学贷款",
          value: "5"
        }, {
          title: "信用消费贷款",
          value: "6"
        }],
        year: "1",
        years: [],
        returnType: "1",
        returnTypes: [{
          title: "等额本息",
          value: "1"
        }, {
          title: "等额本金",
          value: "2"
        }],
        payment: "",
        totalInterest: "",
        totalPayment: ""
      }
    },
    mounted() {
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
          title: "金融计算器",
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

      for (let index = 1; index <= 30; ++index) {
        this.years.push({
          title: index + "年",
          value: index + ""
        });
      }
    },
    methods: {
      changeTab(value){
        let self = this;
        self.activeTab = value;
      },
      calculate(){
        this.payment = "2639.82";
        this.totalInterest = "233557.51";
        this.totalPayment = "633557.51";
      }
    }
  }
</script>
<style scoped>
  .mu-tabs {
    position: fixed;
    background:#fff;
    color: #333;
    border:1px solid #f0f0f0;
  }
  .mu-tabs .mu-tab-link{
    color:#333;
  }
  .mu-tabs .mu-tab-active{
    color:#2196f3;
  }

  .vv-form{
    padding:60px 20px 20px;
}
.vv-form .vv-row {
    display: block;
    width: 100%;
    height: 40px;
    margin-bottom: 5px;
    line-height: 40px;
}
.vv-row .vv-col-title {
    display: inline-block;
    width: 30%;
    margin-bottom: 4%;
    margin-right: 2%;
    vertical-align: middle;
    text-align: right;
    font-size:14px;
}

.vv-row .vv-col-value {
    display: inline-block;
    width: 60%;
    overflow: hidden;
    text-align: left;
    vertical-align: middle;
}
.vv-row .vv-col-value .mu-text-field {
  width: 100%;
}
.vv-button {
  margin:20px auto;
  // position: fixed;
  // bottom:0;
  // left:0;
}
</style>
