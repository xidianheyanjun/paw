<template>
    <div class="wrapper">
        <mu-sub-header class="vv-title" v-if="pageType === 'company'">企业用户贷款产品查询</mu-sub-header>
        <mu-sub-header class="vv-title" v-if="pageType === 'personal'">个人用户贷款产品查询</mu-sub-header>
        <picker :picks="pickList" @checkedPick="renderData" :curPick="curPick"></picker>
        <ul class="vv-products" v-if="list.length">
            <li class="item" v-for="(item, index) in list" :key="index" @click="goto(item.id)">
            <div class="title">{{item.title}}</div>
            <div class="content" v-html="item.content"></div>
            </li>
        </ul>
    </div>
</template>
<script>
import picker from '@/components/common/picker';
export default {
    name: 'loanList',
    components: {
      picker
    },
    data(){
        return {
            pageType: 'company',
            pickList: [],
            curPick: '',
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
                    window.location.href = "#/product/loan/index";
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
        let query = this.$route.query;
        let querykey = Object.keys(query)[0];
        this.renderData(query[querykey]);// 页面初始化时目前只做一种条件查询
    },
    methods: {
        renderData(value) {
            let self = this;
            this.$sendRequest({
            url: '/product/loan/list?query=' + value,
            params: {
                type: self.pageType
            },
            success(body){
                if (body.code === 'success') {
                    let data = body.data;
                    self.pickList = data.pickList || self.pickList;
                    self.curPick = value;
                    self.list = data.list || [];
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
        goto(id) {
            window.location.href = '#/product/loan/detail/' + id;
        }
    }
}
</script>
<style lang="scss" scoped>
@import './../../../assets/scss/_mixin.scss';
.wrapper{
    position: relative;
    .vv-title {
        height:49px;
        line-height:49px;
    }
    .vv-picker{
        position: absolute;
        top:0;
        right:0;
        padding:5px 0 0;
        width:100px;
        border-bottom:0;
    }
}
</style>