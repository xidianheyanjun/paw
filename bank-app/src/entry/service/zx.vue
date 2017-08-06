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
    <div class="vv-form">
        <div class="vv-row">
            <div class="vv-col-title">真实姓名</div>
            <div class="vv-col-value">
                <mu-text-field v-model.trim="name" :errorText="nameError" hintText="" fullWidth :underlineShow="false"/>
            </div>
        </div>
        <div class="vv-row">
            <div class="vv-col-title">身份证</div>
            <div class="vv-col-value">
                <mu-text-field v-model.trim="cardNo" :errorText="cardNoError" hintText="" fullWidth :underlineShow="false"/>
            </div>
        </div>
        <div class="vv-row">
            <div class="vv-col-title">验证码</div>
            <div class="vv-col-value">
                <mu-text-field v-model.trim="indentifyNo" :errorText="indentifyNoError" hintText="" fullWidth :underlineShow="false"/>
            </div>
        </div>
        <div class="vv-row col">
            <mu-checkbox label="我已阅读服务条款" class="vv-checkbox" v-model="checkVal"/>
            <a href="#/service/zxintro" class="link">服务条款</a>
        </div>
        <mu-raised-button @click="nextClick" label="下一步" class="vv-next" primary fullWidth/>
    </div>
    <div class="ft">
        <span class="msg">已有征信中心账户</span>
        <a href="#/person/login" class="link">立即登录</a>
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
            checkVal: true,
            name: '',
            cardNo: '',
            indentifyNo: '',
            nameError: '',
            cardNoError: '',
            indentifyNoError: ''
        }
    },
    watch: {
        name(v1, v2) {
            if (v1 !== v2) {
                this.nameError = '';
            }
        },
        cardNo(v1, v2) {
            if (v1 !== v2) {
                this.cardNoError = '';
            }
        },
        indentifyNo(v1, v2) {
            if (v1 !== v2) {
                this.indentifyNoError = '';
            }
        }
    },
    mounted() {
        this.$store.dispatch("head_setHead", {
            left: {
                img: "",
                title: "返回",
                callback: function () {
                    // window.location.href = "#/home/index";
                    history.back(-1);
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
        nextClick() {
            let self = this;
            if (!self.name.length) {
                self.nameError = '请输入真实姓名';
                return;
            }
            if (!self.cardNo.length) {
                self.cardNoError = '请输入身份证';
                return;
            }
            if (!self.indentifyNo.length) {
                self.indentifyNoError = '请输入验证码';
                return;
            }
            if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(self.cardNo)) {  
                self.cardNoError = '身份证输入不合法';
                // return;
            }
            if (!self.checkVal) {
                self.$store.dispatch('box_set_toast', {
                    show: true,
                    toastText: '请阅读并同意服务条款'
                });
                return;
            }
            self.$sendRequest({
                url: '/service/zx',
                params: {
                    name: self.name,
                    cardNo: self.cardNo,
                    indentifyNo: self.indentifyNo
                },
                success(body){
                    if (body.code != 'success') {
                        self.$store.dispatch('box_set_toast', {
                            show: true,
                            toastText: body.msg
                        });
                        return false;
                    }

                    // 跳转到下一步
                    // window.location.href = '#/service/zx';
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
<style lang="scss" scoped>
@import './../../assets/scss/_mixin.scss';
.process{
    margin:$spacing;
}
.process-num{
    float:left;
    text-align:center;
    margin:0 auto $spacing;
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

.vv-form {
    border-top: 10px solid $bgColor2;
    .col {
        border-bottom:0;
    }
    .vv-checkbox{
        vertical-align: middle;
    }
    .mu-checkbox-icon{
        margin-right:10px;
    }
    .link{
        display:block;
        color:$mainColor;
        text-decoration:underline;
        vertical-align: middle;
        font-size:15px;
    }
    .vv-next{
        margin:$spacing auto;
    }
}
.ft{
    text-align:right;
    margin:0 $spacing;
    .msg{
        font-size:$fontSizeContent2;
        color:$fontColor2;
    }
    .link{
        font-size:$fontSizeContent2;
        color:$mainColor;
        text-decoration:underline;
    }
}
</style>