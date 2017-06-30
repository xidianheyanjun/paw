<template>
  <div class="page-body">
    <div class="vv-row">
      <div class="vv-col-title">贷款种类</div>
      <div class="vv-col-value">
        <mu-select-field v-model="loanType" fullWidth>
          <mu-menu-item v-for="item in loanTypes" :key="item.value" :value="item.value" :title="item.title"/>
        </mu-select-field>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">贷款金额</div>
      <div class="vv-col-value">
        <mu-text-field hintText="" fullWidth/>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">贷款期限</div>
      <div class="vv-col-value">
        <mu-select-field v-model="year" fullWidth>
          <mu-menu-item v-for="item in years" :key="item.value" :value="item.value" :title="item.title"/>
        </mu-select-field>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">还款方式</div>
      <div class="vv-col-value">
        <mu-select-field v-model="returnType" fullWidth>
          <mu-menu-item v-for="item in returnTypes" :key="item.value" :value="item.value" :title="item.title"/>
        </mu-select-field>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">年利率</div>
      <div class="vv-col-value">
        <mu-text-field hintText="" fullWidth/>
      </div>
    </div>
    <div class="button-group">
      <mu-raised-button label="计算" @click="calculate" class="" primary/>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">月还款额</div>
      <div class="vv-col-value">
        <mu-text-field :hintText="payment" disabled fullWidth/>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">累计利息</div>
      <div class="vv-col-value">
        <mu-text-field :hintText="totalInterest" disabled fullWidth/>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">本息合计</div>
      <div class="vv-col-value">
        <mu-text-field :hintText="totalPayment" disabled fullWidth/>
      </div>
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
      calculate(){
        this.payment = "2639.82";
        this.totalInterest = "233557.51";
        this.totalPayment = "633557.51";
      }
    }
  }
</script>
<style scoped>
  .page-body {
    width: 90%;
    margin: 0 auto;
  }

  .vv-row {
    display: block;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }

  .vv-row .vv-col-title {
    display: inline-block;
    width: 30%;
    vertical-align: middle;
  }

  .vv-row .vv-col-value {
    display: inline-block;
    width: 60%;
    text-align: left;
    vertical-align: middle;
  }

  .button-group {
    text-align: center;
    margin: 20px 0;
  }
</style>
