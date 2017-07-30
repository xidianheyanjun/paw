<template>
    <div>
        <mu-sub-header class="vv-title">{{title}}</mu-sub-header>
        <mu-content-block>
            <div class="vv-detail">{{content}}</div>
        </mu-content-block>
    </div>
</template>
<script>
export default {
    name: 'loan',
    data(){
        return {
            title: '',
            content: ''
        }
    },
    mounted() {
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
        this.init();
    },
    methods: {
        init() {
            let self = this;
            let detailId = this.$route.params['id'];
            if (!detailId) {
                return;
            }
            this.$sendRequest({
                url: '/product/loan/detail/' + detailId,
                params: {
                    type: self.pageType,
                    bankValue: self.bankValue
                },
                success(body){
                    self.title = body.data.title;
                    self.content = body.data.content;
                },
                error(err){
                }
            });
        },
    }
}
</script>
<style scoped>
.vv-title{
    text-align:center;
    font-size:18px;
    color:rgba(0,0,0,1);
}
.vv-detail,
.vv-apply{
    padding:5%;
    margin-bottom:5%;
    background-color: #fccb97;
    border-radius: 5px;
    height:100px;
}
</style>