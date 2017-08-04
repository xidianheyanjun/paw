<template>
<div>
    <picker :picks="pickList" @checkedPick="renderData" :curPick="curPick"></picker>
    <div class="content">
        <mu-list v-for="item in list" :key="item.title">
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
<style scoped>
.content{
    // margin:20px;
}
.vv-right{
    color:#2196f3;
}

</style>