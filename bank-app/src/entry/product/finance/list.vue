<template>
  <div>
    <mu-row class="vv-tab">
    <mu-col width="25" tablet="25" desktop="25">
        <mu-dropDown-menu :value="yieldratolValue" @change="changeYieldrate" autoWidth='auto'>
        <mu-menu-item v-for="item in yieldrato" :key="item.value" :value="item.value" :title="item.name"/>
        </mu-dropDown-menu>
    </mu-col>
    <mu-col width="25" tablet="25" desktop="25">
        <mu-dropDown-menu :value="buydaysValue" @change="changeBuydays">
        <mu-menu-item v-for="item in buydays" :key="item.value" :value="item.value" :title="item.name"/>
        </mu-dropDown-menu>
    </mu-col>
    <mu-col width="25" tablet="25" desktop="25">
        <mu-dropDown-menu :value="applyMoneyValue" @change="changeApplyMoney">
        <mu-menu-item v-for="item in applyMoney" :key="item.value" :value="item.value" :title="item.name"/>
        </mu-dropDown-menu>
    </mu-col>
    <mu-col width="25" tablet="25" desktop="25">
        <mu-dropDown-menu :value="bankValue" @change="changeBank">
        <mu-menu-item v-for="item in bank" :key="item.value" :value="item.value" :title="item.name"/>
        </mu-dropDown-menu>
    </mu-col>
    </mu-row>
    
    <div class="vv-list">
        <a class="vv-col" v-for="item in list" :href="item.href" :key="item.title">
            <div class="title">{{item.title}}</div>
            <div class="content">{{item.content}}</div>
        </a>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'product',
    components: {},
    data(){
      return {
        yieldratolValue: '1',
        yieldrato: [{
            value: '1',
            name: '5.54%'
        }, {
            value: '2',
            name: '7.54%'
        }, {
            value: '3',
            name: '8.54%'
        }],
        buydaysValue: '1',
        buydays: [{
            value: '1',
            name: '5天'
        }, {
            value: '2',
            name: '10天'
        }, {
            value: '3',
            name: '30天'
        }],
        applyMoneyValue: '1',
        applyMoney: [{
            value: '1',
            name: '10万'
        }, {
            value: '2',
            name: '50万'
        }, {
            value: '3',
            name: '100万'
        }],
        bankValue: '1',
        bank: [{
            value: '1',
            name: '招商银行'
        }, {
            value: '2',
            name: '建设银行'
        }, {
            value: '3',
            name: '工商银行'
        }, {
            value: '4',
            name: '农业银行'
        }],
        list: [{
            title: '工商银行赣州分行xxx贷款',
            content: '贷款品种介绍及要求：达士大夫撒大法师打',
            href: '#/product/finance/detail/001'
        },{
            title: '工商银行赣州分行xxx贷款',
            content: '贷款品种介绍及要求：达士大夫撒大法师打',
            href: '#/product/finance/detail/002'
        }]
      };
    },
    mounted () {
      this.$store.dispatch("head_setHead", {
        left: {
          img: "",
          title: "返回",
          callback: function () {
            window.location.href = "#/finance/index";
          }
        },
        center: {
          img: "",
          title: "理财产品",
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
      changeYieldrate (value) {
        this.yieldratolValue = value;
      },
      changeApplyMoney (value) {
        this.applyMoneyValue = value;
      },
      changeBuydays (value) {
        this.buydaysValue = value;
      },
      changeBank (value) {
        this.bankValue = value;
      }
    }
  } 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vv-title{
    text-align:center;
    font-size:18px;
    color:rgba(0,0,0,1);
}
.vv-dropdown{
    float:right;
}
.vv-col{
    clear:both;
    display:block;
    padding-bottom:5%;
    margin-bottom:5%;
    border-bottom:1px dashed #eee;
    color:rgba(0,0,0,.87);
}
.vv-col .title{
    margin-bottom:5%;
}
.vv-col .content{
    color:rgba(0,0,0,.54);
    font-size:12px;
}
.vv-list{
    margin:5%;
}
</style>
