<template>
<div>
    <picker :picks="pickList" @checkedPick="renderBanks" :curPick="curPick"></picker>
    <div class="nearbank-list" v-if="list.length">
        <mu-list v-for="(item, index) in list" :key="index" class="item">
            <mu-list-item :title="item.name" @click="goto(item.location)">
                <mu-avatar :src="item.icon" slot="leftAvatar"/>
                <span slot="describe">{{item.adname + item.address}}</span>
                <span slot="right" class="vv-right">{{item.distance}}m</span>
            </mu-list-item>
            <mu-divider inset/>
        </mu-list>
    </div>
    <w-map @fetchMapNearbanks="fetchMapNearbanks"></w-map>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import picker from '@/components/common/picker';
import wMap from './../common/map';
export default {
    name: 'serviceNearbank',
    components: {
      picker,
      wMap
    },
    computed: mapGetters([]),
    data() {
        return {
            allBanks: [], // 高德地图获取到的附近所有银行
            pickList: [],
            curPick: '',
            list: []
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
    },
    methods: {
        fetchMapNearbanks(list) {
            this.allBanks = list;
            // {
            //     name: "华润银行",
            //     address: "福华路385号",
            //     adname: "福田区",
            //     cityname: "深圳市",
            //     pname: "广东省",
            //     distance: 96,
            //     location: {
            //         lng: 114.055061,
            //         lat: 22.534433
            //     }
            // }
            this.renderBanks();
        },
        renderBanks(query = 'all') {
            this.list = this.allBanks;
        },
        goto(url){
            console.log(url)
            window.location.href = url;
        },
        initPick() {
            let self = this;
            this.$sendRequest({
                url: '/service/nearbank',
                params: {
                },
                success(body){
                    if (body.code === 'success') {
                    let data = body.data;
                        self.pickList = data.pickList || self.pickList;
                        self.curPick = self.pickList[0].value;
                    } else {
                        self.$store.dispatch('box_set_toast', {
                            show: true,
                            toastText: body.msg
                        });
                    }
                },
                error(err){
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

<style lang="scss">
@import './../../assets/scss/_mixin.scss';
.nearbank-list{
    .mu-item-left{
        width:45px;
    }
    .mu-avatar{
        width:45px;
        height:45px;
        img{
            width:32px;
            height:32px;
        }
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
.rv{
  .vv-picker {
    position: fixed;
    top:54px;
    left:0;
  }
  .nearbank-list{
    margin-top:50px;
  }
}
.vv-right{
    color:$mainColor;
}
</style>