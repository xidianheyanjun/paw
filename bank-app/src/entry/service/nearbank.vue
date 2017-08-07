<template>
<div>
    <picker :picks="pickList" @checkedPick="renderData" :curPick="curPick"></picker>
    <div class="nearbank-list" v-if="list.length">
        <mu-list v-for="(item, index) in list" :key="index" class="item">
            <mu-list-item :title="item.title" @click="goto(item.href)">
                <mu-avatar :src="item.icon" slot="leftAvatar"/>
                <span slot="describe">{{item.addr}}</span>
                <span slot="right" class="vv-right">{{item.distance}}</span>
            </mu-list-item>
            <mu-divider inset/>
        </mu-list>
        
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import picker from '@/components/common/picker';
export default {
    name: 'serviceNearbank',
    components: {
      picker
    },
    computed: mapGetters([]),
    data() {
        return {
            pickList: [],
            curPick: '',
            list: []
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
      let query = this.$route.query;
      let querykey = Object.keys(query)[0];
      this.renderData(query[querykey]);// 页面初始化时目前只做一种条件查询
    },
    methods: {
        goto(url){
            console.log(url)
            window.location.href = url;
        },
        renderData(value) {
            let self = this;
            this.$sendRequest({
            url: '/service/nearbank?query=' + value,
            params: {
            },
            success(body){
                if (body.code === 'success') {
                let data = body.data;
                    self.pickList = data.pickList || self.pickList;
                    self.curPick = value;
                    self.list = data.list;
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
        },
        cardClick(item) {
            window.location.href = '#/product/credit/detail/' + item.id;
        },
        renderList() {
            let self = this;
            this.$sendRequest({
            url: '/service/nearbank',
            params: {
                lateValue: self.lateValue,
                bankValue: self.bankValue
            },
            success(body){
                self.list = body.data;
            },
            error(err){
            }
        });
      },
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