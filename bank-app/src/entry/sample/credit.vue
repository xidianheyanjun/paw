<template>
  <div>
    <div>
      <mu-dropDown-menu :value="gzxzValue" @change="changeGzxz">
        <mu-menu-item v-for="item in gzxz" :key="item.value" :value="item.value" :title="item.name"/>
      </mu-dropDown-menu>
      <mu-dropDown-menu :value="ysrValue" @change="changeYsr">
        <mu-menu-item v-for="item in ysr" :key="item.value" :value="item.value" :title="item.name"/>
      </mu-dropDown-menu>
      <mu-dropDown-menu :value="zcValue" @change="changeZc">
        <mu-menu-item v-for="item in zc" :key="item.value" :value="item.value" :title="item.name"/>
      </mu-dropDown-menu>
    </div>

    <div>
      <mu-row gutter>
        <mu-col width="25" tablet="25" desktop="25">
          <mu-icon value="home"/>
          <div>招商银行</div>
        </mu-col>
        <mu-col width="25" tablet="25" desktop="25">
          <mu-icon value="home"/>
          <div>人民银行</div>
        </mu-col>
        <mu-col width="25" tablet="25" desktop="25">
          <mu-icon value="home"/>
          <div>民生银行</div>
        </mu-col>
        <mu-col width="25" tablet="25" desktop="25">
          <mu-icon value="home"/>
          <div>建设银行</div>
        </mu-col>
      </mu-row>
      <mu-row gutter>
        <mu-col width="25" tablet="25" desktop="25">
          <mu-icon value="home"/>
          <div>江苏银行</div>
        </mu-col>
        <mu-col width="25" tablet="25" desktop="25">
          <mu-icon value="home"/>
          <div>大众银行</div>
        </mu-col>
        <mu-col width="25" tablet="25" desktop="25">
          <mu-icon value="home"/>
          <div>上海银行</div>
        </mu-col>
        <mu-col width="25" tablet="25" desktop="25">
          <mu-icon value="home"/>
          <div>浙江银行</div>
        </mu-col>
      </mu-row>
    </div>

    <div>
      <h3>用途卡精选</h3>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'sample',
    components: {},
    data(){
      return {
        gzxzValue: "1",
        ysrValue: "1",
        zcValue: "1",
        gzxz: [{
          name: "性质A",
          value: "1"
        }, {
          name: "性质B",
          value: "2"
        }, {
          name: "性质C",
          value: "3"
        }],
        ysr: [{
          name: "收入A",
          value: "1"
        }, {
          name: "收入B",
          value: "2"
        }, {
          name: "收入C",
          value: "3"
        }],
        zc: [{
          name: "资产A",
          value: "1"
        }, {
          name: "资产B",
          value: "2"
        }, {
          name: "资产C",
          value: "3"
        }],
        bank: [{
          name: "中信银行",
          img: "home",
          url: ""
        }, {
          name: "中国银行",
          img: "home",
          url: ""
        }, {
          name: "招商银行",
          img: "home",
          url: ""
        }, {
          name: "建设银行",
          img: "home",
          url: ""
        }, {
          name: "民生银行",
          img: "home",
          url: ""
        }, {
          name: "浦发银行",
          img: "home",
          url: ""
        }, {
          name: "江苏银行",
          img: "home",
          url: ""
        }, {
          name: "人民银行",
          img: "home",
          url: ""
        }]
      };
    },
    mounted () {
    },
    methods: {
      changeGzxz (value) {
        this.gzxzValue = value;
      },
      changeYsr (value) {
        this.ysrValue = value;
      },
      changeZc (value) {
        this.zcValue = value;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
