<template>
  <div class="vv-form">
    <div class="vv-row">
      <div class="vv-col-title">姓名</div>
      <div class="vv-col-value">
        <mu-text-field v-model.trim="applyData.name" label="" hintText=""/>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">身份证号码</div>
      <div class="vv-col-value">
        <mu-text-field v-model.trim="applyData.cardNo" label="" hintText=""/>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">证件到期日</div>
      <div class="vv-col-value">
        <mu-date-picker v-model.trim="applyData.cardExpiredDate" label="" hintText=""/>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">户籍所在城市</div>
      <div class="vv-col-value">
        <mu-select-field v-model="applyData.cardCity" :labelFocusClass="['label-foucs']" label="" hintText="">
          <mu-menu-item value="1" title="同身份证城市"/>
          <mu-menu-item value="2" title="其他城市"/>
        </mu-select-field>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">教育程度</div>
      <div class="vv-col-value">
        <mu-select-field v-model="applyData.degree" :labelFocusClass="['label-foucs']" label="" hintText="">
          <mu-menu-item value="1" title="本科"/>
          <mu-menu-item value="2" title="大专"/>
          <mu-menu-item value="3" title="高中或中专"/>
          <mu-menu-item value="4" title="其他"/>
        </mu-select-field>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">婚姻状况</div>
      <div class="vv-col-value">
        <mu-select-field v-model="applyData.maritalStatus" :labelFocusClass="['label-foucs']" label="" hintText="">
          <mu-menu-item value="1" title="未婚"/>
          <mu-menu-item value="2" title="已婚"/>
          <mu-menu-item value="3" title="其他"/>
        </mu-select-field>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">手机号码</div>
      <div class="vv-col-value">
        <mu-text-field v-model.trim="applyData.mobile" label="" hintText=""/>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">住宅电话</div>
      <div class="vv-col-value">
        <mu-text-field v-model.trim="applyData.homeTel" label="" hintText=""/>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">住宅性质</div>
      <div class="vv-col-value">
        <mu-select-field v-model="applyData.houseProperty" :labelFocusClass="['label-foucs']" label="" hintText="">
          <mu-menu-item value="1" title="租房"/>
          <mu-menu-item value="2" title="有按揭"/>
          <mu-menu-item value="3" title="无按揭"/>
          <mu-menu-item value="4" title="宿舍"/>
          <mu-menu-item value="5" title="父母家"/>
          <mu-menu-item value="6" title="其他"/>
        </mu-select-field>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">住房地址</div>
      <div class="vv-col-value">
        <mu-text-field v-model.trim="applyData.hoseAddress" label="" hintText=""/>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">电子邮箱</div>
      <div class="vv-col-value">
        <mu-text-field v-model.trim="applyData.email" label="" hintText=""/>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">单位全称</div>
      <div class="vv-col-value">
        <mu-text-field v-model.trim="applyData.workCompany" label="" hintText=""/>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">现工作单位年限</div>
      <div class="vv-col-value">
          <mu-text-field v-model.trim="applyData.workYears" label="" hintText=""/>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">年薪</div>
      <div class="vv-col-value">
        <mu-text-field v-model.trim="applyData.yearSalary" label="" hintText=""/>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">单位所属行业</div>
      <div class="vv-col-value">
        <mu-select-field v-model="applyData.workCompanyNature" :labelFocusClass="['label-foucs']" label="" hintText="">
          <mu-menu-item value="1" title="政府"/>
          <mu-menu-item value="2" title="科教"/>
          <mu-menu-item value="3" title="商贸"/>
          <mu-menu-item value="4" title="制造业"/>
          <mu-menu-item value="5" title="其他"/>
        </mu-select-field>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">单位地址</div>
      <div class="vv-col-value">
        <mu-text-field v-model.trim="applyData.workCompanyAddress" label="" hintText=""/>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">单位电话</div>
      <div class="vv-col-value">
        <mu-text-field v-model.trim="applyData.workCompanyTel" label="" hintText=""/>
      </div>
    </div>
    <div class="vv-row">
      <div class="vv-col-title">职务</div>
      <div class="vv-col-value">
        <mu-text-field v-model.trim="applyData.job" label="" hintText=""/>
      </div>
    </div>
    <mu-raised-button @click="submitBtnClick" label="提交申请" class="demo-raised-button vv-button" primary fullWidth/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'applyCredit',
    data() {
      return {
        applyData: {
          name: '',
          cardNo: '',
          degree: '',
          maritalStatus: '',
          mobile: '',
          homeTel: '',
          houseProperty: '',
          hoseAddress: '',
          email: '',
          workCompany: '',
          workYears: '',
          yearSalary: '',
          workCompanyNature: '',
          workCompanyAddress: '',
          workCompanyTel: '',
          job: ''
        }
      }
    },
    computed: mapGetters([
      "product"
    ]),
    components: {},
    mounted(){
      this.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: function () {
            // window.location.href = "#/product/credit/list";
            history.back(-1);
          }
        },
        center: {
          img: "",
          title: "信用卡办理",
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
      submitBtnClick() {
        let self = this;
        let applyData = self.applyData;
        console.warn(applyData);
        for (let key in applyData) {
          if (applyData.hasOwnProperty(key)) {
            if (!applyData[key] && !applyData[key].length) {
              self.$store.dispatch("box_set_toast", {
                show: true,
                toastText: '请完成填写'
              });
              // return;
            }
          }
        }
        self.$sendRequest({
          url: "/product/credit/apply",
          params: applyData,
          success(body){
            if (body.code != 'success') {
              self.$store.dispatch("box_set_toast", {
                show: true,
                toastText: body.msg
              });
              return false;
            } else {
              self.$store.dispatch("box_set_toast", {
                show: true,
                toastText: "提交成功"
              });
            }
            // 跳转到信用卡首页
            window.location.href = "#/product/credit/index";
          },
          error(err){
            self.$store.dispatch("box_set_toast", {
              show: true,
              toastText: "服务器繁忙,请稍后再试"
            });
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vv-form{
    width: 90%;
    margin: 0 auto;
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
    width: 38%;
    margin-bottom: 4%;
    margin-right: 2%;
    vertical-align: middle;
    text-align: right;
}

.vv-row .vv-col-value {
    display: inline-block;
    width: 50%;
    overflow: hidden;
    text-align: left;
    vertical-align: middle;
}
.vv-form .vv-button {
    margin: 5% 0;
}
</style>
