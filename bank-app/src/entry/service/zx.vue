<template>
<div class="page-zx">
    <div class="process-list">
        <div class="process-item current">
            <div class="process-num">1</div>
            <div class="process-txt">填写身份信息</div>
        </div>
        <div class="process-divice"></div>
        <div :class="['process-item', {'current': processNo >= 2}]">
            <div class="process-num">2</div>
            <div class="process-txt">补充用户信息</div>
        </div>
        <div class="process-divice"></div>
        <div :class="['process-item', {'current': processNo >= 3}]">
            <div class="process-num">3</div>
            <div class="process-txt">发送查询申请</div>
        </div>
        <div class="process-divice"></div>
        <div :class="['process-item', {'current': processNo >= 4}]">
            <div class="process-num">4</div>
            <div class="process-txt">等待信息反馈</div>
        </div>
    </div>
    <div class="vv-form">
        <div class="process-list-1" v-if="processNo === 1">
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
            <!--div class="vv-row">
                <div class="vv-col-title">验证码</div>
                <div class="input-box">
                <input ref="input" type="" class="input mu-text-field-input" placeholder="请输入验证码" v-model.trim="indentifyCode" :disabled="isValidate" @input="clearErrorTips('indentifyCodeError')">
                <div class="err-msg" v-text="indentifyCodeError"></div>
                <a class="btn-send" :class="{'send': isSend}" @click="sendCodeBtnClick" v-text="sendCodeText"></a>
                </div>
            </div-->
            <div class="col">
                <mu-checkbox label="我已阅读并同意" class="vv-checkbox" v-model="checkVal"/>
                <a href="#/service/zxintro" class="link">《服务条款》</a>
            </div>
            <mu-raised-button @click="nextClick" label="下一步" class="vv-next" primary fullWidth/>
        </div>
        <div class="process-list-2" v-if="processNo === 2">
            <div class="vv-row">
                <div class="vv-col-title">登录名</div>
                <div class="vv-col-value">
                    <mu-text-field v-model.trim="zxCount" :errorText="zxCountError" hintText="请输入登录名" @input="clearErrorTips('zxCountError')" fullWidth :underlineShow="false"/>
                </div>
            </div>
            <div class="vv-row">
                <div class="vv-col-title">密 码</div>
                <div class="vv-col-value">
                    <mu-text-field v-model.trim="zxPassword" :errorText="zxPasswordError" hintText="请输入密码" @input="clearErrorTips('zxPasswordError')" fullWidth :underlineShow="false"/>
                </div>
            </div>
            <div class="vv-row">
                <div class="vv-col-title">确认密码</div>
                <div class="vv-col-value">
                    <mu-text-field v-model.trim="zxPassword2" :errorText="zxPasswordError2" hintText="请再次输入密码" @input="clearErrorTips('zxPasswordError2')" fullWidth :underlineShow="false"/>
                </div>
            </div>
            <div class="vv-row">
                <div class="vv-col-title">电子邮箱</div>
                <div class="vv-col-value">
                    <mu-text-field v-model.trim="email" :errorText="emailError" hintText="请输入电子邮箱" @input="clearErrorTips('emailError')" fullWidth :underlineShow="false"/>
                </div>
            </div>
            <div class="vv-row">
                <div class="vv-col-title">手机号</div>
                <div class="vv-col-value">
                    <mu-text-field v-model.trim="mobile" :errorText="mobileError" hintText="请输入手机号" @input="clearErrorTips('mobileError')" fullWidth :underlineShow="false"/>
                </div>
            </div>
            <div class="vv-row">
                <div class="vv-col-title">动态码</div>
                <div class="input-box">
                <input ref="input" type="" class="input mu-text-field-input" placeholder="请输入动态码" v-model.trim="indentifyCode" :disabled="isValidate" @input="clearErrorTips('indentifyCodeError')">
                <div class="err-msg" v-text="indentifyCodeError"></div>
                <a class="btn-send" :class="{'send': isSend}" @click="sendCodeBtnClick" v-text="sendCodeText"></a>
                </div>
            </div>
            <mu-raised-button @click="nextClick" label="提交" class="vv-next" primary fullWidth/>
        </div>
        <div class="process-list-3" v-if="processNo === 3">
            <div class="no-data">正在发送查询申请</div>
        </div>
        <div class="process-list-4" v-if="processNo === 4">
            <div class="no-data">申请成功，请耐心等待信息反馈</div>
        </div>
    </div>
    <div class="ft" v-if="processNo === 1">
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
            name: '',
            nameError: '',
            cardNo: '',
            cardNoError: '',
            checkVal: true,
            processNo: 1,
            zxCount: '',
            zxCountError: '',
            zxPassword: '',
            zxPasswordError: '',
            zxPassword2: '',
            zxPasswordError2: '',
            email: '',
            emailError: '',
            mobile: '',
            mobileError: '',
            indentifyCode: '',
            indentifyCodeError: '',
            isSend: false,
            isValidate: false,
            sendCodeText:'获取',
            resendTime: RESEND_TIME
        }
    },
    watch: {
        processNo(v1) {
            if (v1 == 3) {
                setTimeout(() => {
                    this.processNo++;
                }, 3000);
            }
        },
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
        indentifyCode(v1, v2) {
            if (v1 !== v2) {
                this.indentifyCodeError = '';
            }
        }
    },
    beforeDestroy() {
      if (sendIndentifyCodeTimer) {
        clearInterval(sendIndentifyCodeTimer);
        sendIndentifyCodeTimer = null;
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
                // return;
            }
            if (!self.cardNo.length) {
                self.cardNoError = '请输入身份证';
                // return;
            }
            // if (!self.indentifyCode.length) {
            //     self.indentifyCodeError = '请输入验证码';
            //     return;
            // }
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
                    processNo: self.processNo,
                    name: self.name,
                    cardNo: self.cardNo
                },
                success(body){
                    if (body.code === 'success') {
                        self.processNo++;
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
        }
    }
}
</script>
<style lang="scss">
@import './../../assets/scss/_mixin.scss';
.page-zx{
    .vv-form .input-box{
        width:77%;
    }
    .mu-checkbox-icon{
        margin-right:5px;
    }
    .mu-checkbox-label{
        font-size:$fontSizeContent;
        color:$fontColor3;
    }
}
</style>
<style lang="scss" scoped>
@import './../../assets/scss/_mixin.scss';
.process-list{
    margin:$spacing;
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: justify;
}
.process-item {
    text-align:center;
    width:56px;
    color:$mainColor;
    .process-num {
        width:56px;
        height:56px;
        border:1px solid $mainColor;
        border-radius:100%;
        font-size:30px;
        line-height:56px;
    }
    .process-txt{
        margin-top:10px;
        line-height:16px;
        font-size:12px;
    }
    &.current{
        .process-num {
            background:$mainColor;
            color:#fff;
        }
    }
}
.process-divice{
    margin-top:-35px;
    width:10px;
    height:2px;
    background:$mainColor;
}

.vv-form {
    border-top: 10px solid $bgColor2;
    .col {
        width: 100%;
        height:40px;
        line-height:40px;
        box-sizing: border-box;
        padding: 0 $spacing;
        margin-bottom: 5px;
    }
    .vv-col-title {
        width:23%;
    }
    .vv-col-value {
        width:77%;
    }
    .vv-checkbox{
        vertical-align: middle;
    }
    .mu-checkbox-icon{
        margin-right:10px;
    }
    .link{
        color:$mainColor;
        font-size:$fontSizeContent;
        vertical-align:middle;
        margin-left:-5px;
    }
    .vv-next{
        margin:$spacing auto;
    }
    .no-data {
        margin:20% auto;
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