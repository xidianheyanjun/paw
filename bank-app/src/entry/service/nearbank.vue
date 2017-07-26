<template>
<div>
    <mu-row class="vv-tab">
        <mu-col width="50" tablet="50" desktop="50">
          <mu-dropDown-menu :value="lateValue" @change="changeLate">
            <mu-menu-item v-for="item in late" :key="item.value" :value="item.value" :title="item.name"/>
          </mu-dropDown-menu>
        </mu-col>
        <mu-col width="50" tablet="50" desktop="50">
          <mu-dropDown-menu :value="bankValue" @change="changeBank">
            <mu-menu-item v-for="item in bank" :key="item.value" :value="item.value" :title="item.name"/>
          </mu-dropDown-menu>
        </mu-col>
    </mu-row>
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
export default {
    name: 'serviceNearbank',
    computed: mapGetters([]),
    data() {
        return {
            lateValue: '0',
            late: [{
                value: '0',
                name: '网点/ATM'
            },{
                value: '1',
                name: 'XX区'
            }],
            bankValue: '0',
            bank: [{
                value: '0',
                name: '全部银行'
            },{
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
        this.renderList();
    },
    watch: {
        lateValue(v) {
            this.renderList();
        },
        bankValue(v) {
            this.renderList();
        }
    },
    methods: {
        changeLate(value) {
            this.lateValue = value;
        },
        changeBank(value) {
            this.bankValue = value;
        },
        goto(url){
            console.log(url)
            window.location.href = url;
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
    margin:5%;
}
.vv-right{
    color:#2196f3;
}

</style>