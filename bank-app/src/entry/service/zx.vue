<template>
<div>
    <div class="process">
        <div class="process-rate clearfix">
            <div class="process-num current">1</div>
            <div class="process-divice"></div>
            <div class="process-num">2</div>
            <div class="process-divice"></div>
            <div class="process-num">3</div>
            <div class="process-divice"></div>
            <div class="process-num">4</div>
        </div>
        
        <ul class="process-txt clearfix">
            <li>身份信息</li>
            <li>补充信息</li>
            <li>发送查询申请</li>
            <li>等待信息反馈</li>
        </ul>
    </div>
    <div class="form">
        <mu-text-field label="真实姓名：" hintText=""/>
        <mu-text-field label="身份证：" hintText=""/>
        <mu-text-field label="验证码：" hintText=""/>
        <div class="col">
            <mu-checkbox label="我已阅读服务条款" class="vv-checkbox" :value="true"/>
            <a href="#" class="link">服务条款</a>
        </div>
        <mu-raised-button label="下一步" class="vv-next" primary fullWidth/>
    </div>
    <div class="ft">
        <span class="msg">已有征信中心账户</span>
        <a href="javascript:;" class="link">立即登录</a>
    </div>

</div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'serviceZX',
    computed: mapGetters([]),
    components: {},
    data(){
        return {

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
                title: "查看征信",
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

    }
}
</script>
<style scoped>
.process{
    margin:5%;
}
.process-num{
    float:left;
    text-align:center;
    margin:0 auto 5%;
    width:34px;
    height:34px;
    border:1px solid #2196f3;
    border-radius:100%;
    line-height:34px;
    font-size:20px;
    color:#2196f3;
}
.process-num.current{
    background:#2196f3;
    color:#fff;
}
.process-txt{
    font-size:12px;
    color:#2196f3;
}
.process-txt li{
    float:left;
    width:25%;
}
.process-divice{
    float:left;
    margin:17px 3%;
    width:40px;
    height:2px;
    background:#2196f3;
}
.form{
    margin-left:10%;
}
.form .col{
    position:relative;
}
.form .vv-button{
    color:rgba(0,0,0,.54);
}
.form .link{
    position:absolute;
    right:5%;
    top:8px;
    color:#2196f3;
    text-decoration:underline;
}
.form .vv-next{
    width:90%;
    margin:5% auto;
}
.ft{
    text-align:right;
    margin:0 5%;
}
.ft .msg{
    font-size:12px;
    color:rgba(0,0,0,.54);
}
.ft .link{
    font-size:12px;
    color:#2196f3;
    text-decoration:underline;
}
</style>