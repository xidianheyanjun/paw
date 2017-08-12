<template>
<div>
    <picker :picks="pickList" @checkedPick="renderBanks" :curPick="curPick"></picker>
    <div class="nearbank-list" v-show="list.length">
        <mu-list v-for="(item, index) in list" :key="index" class="item">
            <mu-list-item :title="item.name" @click="goto(item.location)">
                <mu-avatar :class="['icon-' + item.icon]" slot="leftAvatar"/>
                <span slot="describe">{{item.adname + item.address}}</span>
                <span slot="right" class="vv-right">{{item.distance}}m</span>
            </mu-list-item>
            <mu-divider inset/>
        </mu-list>
    </div>
    <div class="no-data" v-show="!list.length">{{loadingTips}}</div>
    <w-map v-if="allMapBanks.length === 0" @fetchMapNearbanks="fetchMapNearbanks"></w-map>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import picker from '@/components/common/picker';
import wMap from './../common/map';
const ICON_BANK = [{
        name: '工商银行',
        value: 'gongshang'
    }, {
        name: '农业银行',
        value: 'nongye'
    }, {
        name: '中国银行',
        value: 'zhongguo'
    }, {
        name: '建设银行',
        value: 'jianshe'
    }, {
        name: '农发行',
        value: 'nongfahang'//
    }, {
        name: '邮政储蓄银行',
        value: 'youzheng'
    }, {
        name: '招商银行',
        value: 'zhaoshang'
    }, {
        name: '民生银行',
        value: 'minsheng'
    }, {
        name: '交通银行',
        value: 'jiaotong'
    }, {
        name: '浦发银行',
        value: 'pufa'
    }, {
        name: '兴业银行',
        value: 'xingye'
    }, {
        name: '中信银行',
        value: 'zhongxin'
    }, {
        name: '江西银行',
        value: 'jiangxi'//
    }, {
        name: '赣州银行',
        value: 'ganzhou'//
    }, {
        name: '赣州农商银行',
        value: 'ganzhounongshang'//
    }, {
        name: '九江银行',
        value: 'jiujiang'
    }, {
        name: '赣州银座村镇银行',
        value: 'ganzhouyinzuo'
    }, {
        name: '南康赣商村镇银行',
        value: 'nankanggan'
    }, {
        name: '兴国新华村镇银行',
        value: 'xingguo'
    }, {
        name: '光大银行',
        value: 'guangda'
    }, {
        name: '广发银行',
        value: 'guangfa'
    }, {
        name: '平安银行',
        value: 'pingan'
    }
    // {
    //     name: '农村信用社',
    //     value: 'xinyongshe'
    // }
    ];
// const BANK_PICK_PRENUM = ICON_BANK.length; 
const BANK_PICK_PRENUM = 19; 
function iconFormat(name) {
    let iconNames = ICON_BANK;
    let result = 'default';
    for (let i = 0, len = iconNames.length; i < len; i++) {
        let t_name = iconNames[i].name;
        if (t_name.indexOf('农村') > -1) {
            t_name = '农村';
        }
        if (t_name.indexOf('浦发银行') > -1) {
            t_name = '浦东发展银行';
        }
        if (t_name.indexOf('赣州农商银行') > -1) {
            t_name = '赣州农村商业银行';
        }
        if (t_name.indexOf('农发行') > -1) {
            t_name = '农业发展银行';
        }
        if (name.indexOf(t_name) > -1) {
            result = iconNames[i].value;
            break;
        }
    }
    // return require('./../../assets/images/bank-icon/' + result + '.jpg');
    return result;
}
export default {
    name: 'serviceNearbank',
    components: {
      picker,
      wMap
    },
    computed: {
        ...mapGetters([
            'gdmap'
        ]),
        allMapBanks() {
            console.log('bank count:', this.gdmap.nearbank.pois.length);
            return this.gdmap.nearbank.pois;
        }
    },
    data() {
        return {
            pickList: [{
                list: [{
                    name: '全部银行',
                    value: 'all'
                }]
            }, {
                list: [{
                    name: '营业厅/ATM',
                    value: 'all'
                }, {
                    name: '营业厅',
                    value: 'hall'
                }, {
                    name: 'ATM',
                    value: 'atm'
                }]
            }],
            curPick: [],
            list: [],
            loadingTips: '正在搜索附近银行'
        };
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
          title: "附近银行",
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
      this.initPick();
      this.fetchMapNearbanks();
    },
    methods: {
        fetchMapNearbanks(poiList) {
            if (poiList) {
                this.allMapBanks = poiList.pois;
            }
            this.renderBanks();
        },
        renderBanks(query = '') {
            // console.log('pick query:', query);
            let brand = 'all';
            let hyType = 'all';
            if (query.indexOf(',') > -1) {
                let queryArr = query.split(',');
                brand = queryArr[0];
                hyType = queryArr[1];
            }
            let resultBanks = [];
            for (var i = 0, len = this.allMapBanks.length; i < len; i++) {
                let bank = this.allMapBanks[i];
                if (!bank.icon) {
                    bank.icon = iconFormat(bank.name);
                }
                if ((bank.name.indexOf('ATM') > -1) || (bank.name.indexOf('atm') > -1) || (bank.name.indexOf('24小时自助银行') > -1)) {
                    bank.hyType = 'atm';
                } else {
                    bank.hyType = 'hall';
                }

                if (brand && hyType && (bank.icon === brand) && (bank.hyType === hyType)) {
                    resultBanks.push(bank);
                } else if (brand && (hyType === 'all') && (bank.icon === brand)) {
                    resultBanks.push(bank);
                } else if ((brand === 'all') && hyType && (bank.hyType === hyType)) {
                    resultBanks.push(bank);
                } else if ((brand === 'all') && (hyType === 'all')) {
                    resultBanks.push(bank);
                }
            }
            if (!resultBanks.length && query[0]) {
                this.loadingTips = '未能找到相应结果';
            }
            this.list = resultBanks;
        },
        goto(loc){
            window.location.href = `#/common/map?lat=${loc.lat}&lng=${loc.lng}`;
        },
        initPick() {
            let addBanks = this.pickList[0].list.concat(ICON_BANK.slice(0, BANK_PICK_PRENUM));
            // console.warn(addBanks);
            this.pickList[0].list = addBanks;
            let curPick = [];
            this.pickList.forEach(item => {
                curPick.push(item.value);
            })
            this.curPick = curPick;
        }
    }
}
</script>

<style lang="scss">
@import './../../assets/scss/_mixin.scss';
@mixin bankIcon() {
    $names: ('gongshang': 0, 'jianshe': 1, 'nongye': 2, 'zhongguo': 3, 'zhaoshang': 4, 'jiaotong': 5, 'youzheng': 6, 'xinyongshe': 7, 'zhongxin': 8, 'minsheng': 9, 'guangda': 10, 'guangfa': 11, 'beijing': 12, 'pufa': 13, 'pingan': 14, 'xingye': 15);
    @each $name, $index in $names {
        &.icon-#{$name} {
            background-position:0 -#{$index * 30}px;
        }
    }
}
.nearbank-list{
    .mu-item-left{
        width:33px;
    }
    .mu-avatar{
        width:33px;
        height:30px;
        background: url('./../../assets/images/bank-icon/all.png') no-repeat;
        background-size:33px 480px;
        @include bankIcon();
    }
    .icon-default {
        background-image: url('./../../assets/images/bank-icon/default.jpg');
        background-size:100%;
    }
    .mu-item-right{
        width:60px;;
    }
    .item {
        &:last-child .mu-divider {
            height:0;
        }
        .mu-item-content{
            box-sizing:border-box;
            padding-right:10px;
        }
        .mu-item-title,
        .mu-item-text span{
            display:block;
            @extend %fix_width_content;
        }
    }
}
</style>
<style lang="scss" scoped>
@import './../../assets/scss/_mixin.scss';
// .rv{
//   .vv-picker {
//     position: fixed;
//     top:54px;
//     left:0;
//   }
//   .nearbank-list{
//     margin-top:50px;
//   }
// }
.vv-right{
    color:$mainColor;
}
</style>