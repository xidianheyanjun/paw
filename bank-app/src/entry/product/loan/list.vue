<template>
    <div>
        <mu-sub-header class="vv-title" v-if="pageType === 'company'">企业用户贷款产品查询</mu-sub-header>
        <mu-sub-header class="vv-title" v-if="pageType === 'personal'">个人用户贷款产品查询</mu-sub-header>
        <mu-dropDown-menu class="vv-dropdown" :value="bankValue" @change="changeBank">
            <mu-menu-item v-for="(item, index) in banks" :key="index" :value="item.value" :title="item.name"/>
        </mu-dropDown-menu>
        <mu-content-block>
            <a class="vv-col" v-for="(item, index) in list" @click="goto(item)" :key="index">
                <div class="title">{{item.title}}</div>
                <div class="content">{{item.content}}</div>
            </a>
        </mu-content-block>
    </div>
</template>
<script>
export default {
    name: 'loan',
    data(){
        return {
            pageType: 'company',
            bankValue: '1',
            banks: [{
                value: '1',
                name: '全部'
            }, {
                value: '2',
                name: '工商银行'
            }, {
                value: '3',
                name: '招商银行'
            }],
            list: []
        }
    },
    mounted() {
        // 如果有携带参数则设置参数
        this.pageType = this.$route.params["id"] || "company";
        this.$store.dispatch("head_setHead", {
            left: {
                img: "",
                title: "返回",
                callback: function () {
                // window.location.href = "#/product/loan/index";
                    history.back(-1);
                }
            },
            center: {
                img: "",
                title: "贷款产品",
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
    methods: {
        changeBank(value) {
            this.bankValue = value;
            this.renderList();
        },
        renderList() {
            let self = this;
            this.$sendRequest({
                url: '/product/loan/list',
                params: {
                    type: self.pageType,
                    bankValue: self.bankValue
                },
                success(body){
                    self.list = body.data;
                },
                error(err){
                }
            });
        },
        goto(item) {
            window.location.href = '#/product/loan/detail/' + item.id;
        }
    }
}
</script>
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
</style>