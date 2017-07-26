<template>
    <div>
        <mu-sub-header class="vv-title">{{title}}</mu-sub-header>
        <mu-content-block>
            <div class="vv-detail">{{detail}}</div>
            <mu-flat-button class="vv-star" @click="star" label="点击收藏"
                        icon="star" primary/>
        </mu-content-block>
    </div>
</template>
<script>
export default {
    name: 'loan',
    data(){
        return {
            title: '',
            detail: ''
        }
    },
    mounted() {
        this.$store.dispatch("head_setHead", {
            left: {
                img: "",
                title: "返回",
                callback: function () {
                window.location.href = "#/product/finance/index";
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
        this.init();
    },
    methods: {
        star() {

        },
        init() {
            let self = this;
            this.$sendRequest({
            url: '/product/finance/detail/' + self.$route.params['id'],
            params: {
            },
            success(body){
                self.title = body.data.title;
                self.detail = body.data.detail;
            },
            error(err){
            }
            });
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
.vv-detail,
.vv-apply{
    padding:5%;
    margin-bottom:5%;
    background-color: #fccb97;
    border-radius: 5px;
    height:200px;
}
.vv-star{
    float:right;
    color:red;
}
</style>