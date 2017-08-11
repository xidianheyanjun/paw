<template>
<div class="page-zx">
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
                <mu-text-field v-model.trim="name" :errorText="nameError" hintText="请输入真实姓名" @input="clearErrorTips('nameError')" fullWidth :underlineShow="false"/>
            </div>
        </div>
        <div class="vv-row">
            <div class="vv-col-title">身份证</div>
            <div class="vv-col-value">
                <mu-text-field v-model.trim="cardNo" :errorText="cardNoError" hintText="请输入身份证" @input="clearErrorTips('cardNoError')" fullWidth :underlineShow="false"/>
            </div>
        </div>
        <div class="vv-row">
            <div class="vv-col-title">验证码</div>
            <div class="input-box">
            <input ref="input" type="" class="input mu-text-field-input" placeholder="请输入验证码" v-model.trim="indentifyCode" :disabled="isValidate" @input="clearErrorTips('indentifyCodeError')">
            <div class="err-msg" v-text="indentifyCodeError"></div>
            <a class="btn-send" :class="{'send': isSend}" @click="sendCodeBtnClick" v-text="sendCodeText"></a>
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
const RESEND_TIME = 10;
let sendIndentifyCodeTimer = null;
export default {
    name: 'serviceZX',
    computed: mapGetters([]),
    components: {},
    data(){
        return {
            checkVal: true,
            name: '',
            cardNo: '',
            indentifyCode: '',
            nameError: '',
            cardNoError: '',
            indentifyCodeError: '',
            isSend: false,
            isValidate: false,
            sendCodeText:'获取',
            resendTime: RESEND_TIME,
        }
    },
    watch: {
        resendTime(v1) {
            if (v1 && (v1 < RESEND_TIME)) {
                this.sendCodeText = this.resendTime + 's';
                this.isSend = true;
            } else if (v1 === 0) {
                this.sendCodeText = '获取';
                this.isSend = false;
            }
        },
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
        clearErrorTips(err) {
            this[err] = '';
        },
        sendCodeBtnClick() {
            let self = this;
            this.$sendRequest({
                url: '/service/zx',
                params:{
                },
                success(body) {
                    let msg = '';
                    if (body.code === 'success') {
                        msg = '发送成功';
                        self.countdownTime();
                    } else {
                        msg = body.msg;
                    }
                    self.$store.dispatch('box_set_toast', {
                        show: true,
                        toastText: msg
                    });
                },
                error(err) {
                    self.$store.dispatch('box_set_toast', {
                        show: true,
                        toastText: '服务器繁忙,请稍后再试'
                    });
                }
            });
        },
        countdownTime() {
            let time = 1000;
            if (sendIndentifyCodeTimer) {
            clearInterval(sendIndentifyCodeTimer);
            sendIndentifyCodeTimer = null;
            }
            sendIndentifyCodeTimer = setInterval(() => {
            this.resendTime--;
            if (this.resendTime < 0) {
                this.resendTime = 0;
                clearInterval(sendIndentifyCodeTimer);
                sendIndentifyCodeTimer = null;
            }
            }, time);
        },
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
            if (!self.indentifyCode.length) {
                self.indentifyCodeError = '请输入验证码';
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
                    indentifyCode: self.indentifyCode
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
<style lang="scss">
.page-zx{
    .vv-form .input-box{
        width:80%;
    }
}
</style>
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