<template>
  <div class="vv-form">
    <mu-text-field label="姓名" hintText=""/>
    <mu-text-field label="身份证号码" hintText=""/>
    <mu-date-picker label="证件到期日" hintText=""/>
    <mu-text-field label="信用卡发证机关" hintText=""/>
    <mu-select-field v-model="city" :labelFocusClass="['label-foucs']" label="户籍所在城市" hintText="">
        <mu-menu-item value="1" title="同身份证城市"/>
        <mu-menu-item value="2" title="其他城市"/>
    </mu-select-field>
    <mu-select-field v-model="study" :labelFocusClass="['label-foucs']" label="教育程度" hintText="">
        <mu-menu-item value="1" title="本科"/>
        <mu-menu-item value="2" title="大专"/>
        <mu-menu-item value="3" title="高中或中专"/>
        <mu-menu-item value="4" title="其他"/>
    </mu-select-field>
    <mu-select-field v-model="marry" :labelFocusClass="['label-foucs']" label="婚姻状况" hintText="">
        <mu-menu-item value="1" title="未婚"/>
        <mu-menu-item value="2" title="已婚"/>
        <mu-menu-item value="3" title="其他"/>
    </mu-select-field>
    <mu-text-field label="手机号码" hintText=""/>
    <mu-text-field label="住宅电话" hintText=""/>
    <mu-select-field v-model="house" :labelFocusClass="['label-foucs']" label="住宅性质" hintText="">
        <mu-menu-item value="1" title="租房"/>
        <mu-menu-item value="2" title="有按揭"/>
        <mu-menu-item value="3" title="无按揭"/>
        <mu-menu-item value="4" title="宿舍"/>
        <mu-menu-item value="5" title="父母家"/>
        <mu-menu-item value="6" title="其他"/>
    </mu-select-field>
    <mu-text-field label="住房地址" hintText=""/>
    <mu-text-field label="电子邮箱" hintText=""/>
    <mu-text-field label="单位全称" hintText=""/>
    <mu-text-field label="现工作单位年限" hintText=""/>
    <mu-text-field label="年薪" hintText=""/>
    <mu-select-field v-model="work" :labelFocusClass="['label-foucs']" label="单位所属行业" hintText="">
        <mu-menu-item value="1" title="政府"/>
        <mu-menu-item value="2" title="科教"/>
        <mu-menu-item value="3" title="商贸"/>
        <mu-menu-item value="4" title="制造业"/>
        <mu-menu-item value="5" title="其他"/>
    </mu-select-field>
    <mu-text-field label="单位地址" hintText=""/>
    <mu-text-field label="单位电话" hintText=""/>
    <mu-select-field v-model="work" :labelFocusClass="['label-foucs']" label="单位所属行业" hintText="">
        <mu-menu-item value="1" title="机关"/>
        <mu-menu-item value="2" title="国有"/>
        <mu-menu-item value="3" title="三资"/>
        <mu-menu-item value="4" title="私企"/>
        <mu-menu-item value="5" title="个体"/>
        <mu-menu-item value="6" title="其他"/>
    </mu-select-field>
    <mu-text-field label="职务" hintText=""/>
    <mu-raised-button label="提交申请" class="demo-raised-button" primary fullWidth/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'product',
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
            window.location.href = "#/product/credit/index";
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vv-form{
      padding:0 5% 10%;
  }
  .vv-form .mu-text-field{
      width:100%;
  }
</style>
