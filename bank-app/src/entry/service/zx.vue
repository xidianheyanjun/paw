<template>
<div class="page-zx">
    <div class="process-list" v-if="status === 'unregistered'">
        <div class="process-item current">
            <div class="process-num">1</div>
            <div class="process-txt">填写身份信息</div>
        </div>
        <div class="process-divice"></div>
        <div :class="['process-item', {'current': processNo > 2}]">
            <div class="process-num">2</div>
            <div class="process-txt">补充用户信息</div>
        </div>
        <div class="process-divice"></div>
        <div :class="['process-item', {'current': processNo === 3}]">
            <div class="process-num">3</div>
            <div class="process-txt">验证手机动态码</div>
        </div>
        <div class="process-divice"></div>
        <div :class="['process-item', {'current': processNo > 4}]">
            <div class="process-num">3</div>
            <div class="process-txt">完成注册马上登录</div>
        </div>
    </div>
    <div class="process-list" v-if="status === 'registered'">
        <div class="process-item current">
            <div class="process-num">1</div>
            <div class="process-txt">登录征信账号</div>
        </div>
        <div class="process-divice"></div>
        <div :class="['process-item', {'current': processNo === 4 || processNo === 3  || processNo === 5}]">
            <div class="process-num">2</div>
            <div class="process-txt">授权回答问题</div>
        </div>
        <div class="process-divice"></div>
        <div :class="['process-item', {'current': processNo === 3 || processNo === 5}]">
            <div class="process-num">3</div>
            <div class="process-txt">验证手机动态码</div>
        </div>
        <div class="process-divice"></div>
        <div :class="['process-item', {'current': processNo === 5}]">
            <div class="process-num">4</div>
            <div class="process-txt">得到征信结果</div>
        </div>
    </div>
    <div class="vv-form">
        <div class="process-list-1" v-show="processNo === 1">
            <div class="vv-row">
                <div class="vv-col-title">真实姓名</div>
                <div class="vv-col-value">
                    <mu-text-field v-model.trim="name" hintText="请输入真实姓名" fullWidth :underlineShow="false"/>
                </div>
            </div>
            <div class="vv-row">
                <div class="vv-col-title">身份证</div>
                <div class="vv-col-value">
                    <mu-text-field v-model.trim="cardNo" hintText="请输入身份证"  fullWidth :underlineShow="false"/>
                </div>
            </div>
            <div class="col">
                <mu-checkbox label="我已阅读并同意" class="vv-checkbox" v-model="checkVal"/>
                <a href="#/service/zxintro" class="link">《服务条款》</a>
            </div>
            <mu-raised-button @click="checkStatus" label="下一步" class="vv-next" primary fullWidth/>
        </div>
        <div class="process-list-2" v-show="processNo === 2">
            <div class="vv-row">
                <div class="vv-col-title">登录名</div>
                <div class="vv-col-value">
                    <mu-text-field v-model.trim="zxCount" hintText="请输入登录名" fullWidth :underlineShow="false"/>
                </div>
            </div>
            <div class="vv-row">
                <div class="vv-col-title">密 码</div>
                <div class="vv-col-value">
                    <mu-text-field v-model.trim="zxPassword" hintText="请输入密码" fullWidth :underlineShow="false"/>
                </div>
            </div>
            <template  v-if="status === 'unregistered'">
                <div class="vv-row">
                    <div class="vv-col-title">确认密码</div>
                    <div class="vv-col-value">
                        <mu-text-field v-model.trim="zxPassword2" hintText="请再次输入密码"  fullWidth :underlineShow="false"/>
                    </div>
                </div>
                <div class="vv-row">
                    <div class="vv-col-title">电子邮箱</div>
                    <div class="vv-col-value">
                        <mu-text-field v-model.trim="email" hintText="请输入电子邮箱" fullWidth :underlineShow="false"/>
                    </div>
                </div>
            </template>
            <div class="vv-row">
                <div class="vv-col-title">验证码</div>
                <div class="input-box">
                    <input ref="input" type="" class="input mu-text-field-input" placeholder="请输入验证码" v-model.trim="captchaCode" :disabled="isImgValidate">
                    <a v-show="!captchaCodeImg" class="btn-send" @click="captchaCodeBtnClick">点击获取</a>
                    <img v-show="captchaCodeImg" class="img-send" :src="captchaCodeImg" />
                </div>
            </div>
            <mu-raised-button @click="gotoNext2" label="下一步" class="vv-next" primary fullWidth/>
        </div>
        <div class="process-list-3" v-show="processNo === 3">
            <div class="vv-row">
                <div class="vv-col-title">手机号</div>
                <div class="vv-col-value">
                    <mu-text-field v-model.trim="mobile" hintText="请输入手机号" fullWidth :underlineShow="false"/>
                </div>
            </div>
            <div class="vv-row">
                <div class="vv-col-title">动态码</div>
                <div class="input-box">
                <input ref="input" type="" class="input mu-text-field-input" placeholder="请输入动态码" v-model.trim="indentifyCode" :disabled="isValidate" />
                <a class="btn-send" :class="{'send': isSend}" @click="sendCodeBtnClick" v-text="sendCodeText"></a>
                </div>
            </div>
            <mu-raised-button @click="gotoNext3" label="下一步" class="vv-next" primary fullWidth/>
        </div>
        <div class="process-list-4" v-show="processNo === 4">
            <div class="issues-wrapper" v-for="(item, index) in loginIssues" :key="index">
                <div class="title">{{item.question}}</div>
                <div class="value">
                    <mu-radio v-for="(item2, index2) in item.options" :key="index2" :label="item2" :name="item.answer" :nativeValue="item2" v-model="item.answer" class="demo-radio"/> <br/>
                </div>
            </div>
            <mu-raised-button @click="gotoNext4" label="下一步" class="vv-next" primary fullWidth/>
        </div>
        <div class="process-list-5" v-show="processNo === 5">
            <div class="result" v-html="result"></div>
        </div>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex';
import native from "@/util/native";
const DEFAULT_AVATAR = require('./../../assets/images/atavar.png');
const RESEND_TIME = 60;
let sendIndentifyCodeTimer = null;
export default {
    name: 'serviceZX',
    computed: mapGetters([]),
    components: {},
    data(){
        return {
            person_isLogin: false,
            name: '',
            cardNo: '',
            checkVal: true,
            processNo: 1,
            zxCount: '',
            zxPassword: '',
            zxPassword2: '',
            email: '',
            mobile: '',
            indentifyCode: '',
            isSend: false,
            isValidate: false,
            isImgValidate: false,
            captchaCode: '',
            captchaCodeImg: '',
            remarkCode: '',
            htmlToken: '',
            tcId: '',
            sendCodeText:'获取',
            resendTime: RESEND_TIME,
            status: '', // unregistered,registered
            loginIssues: [],
            result: '',
        }
    },
    watch: {
        person_isLogin(v) {
            if (v) {
            this.userId = native.getUserInfo().userId || 0;
            console.warn('userId:', this.userId)
            }
        },
        // processNo(v1) {
        //     if (v1 == 3) {
        //         this.renderReport();
        //     }
        // },
        resendTime(v1) {
            if (v1 && (v1 < RESEND_TIME)) {
                this.sendCodeText = this.resendTime + 's';
                this.isSend = true;
            } else if (v1 === 0) {
                this.sendCodeText = '获取';
                this.isSend = false;
                this.resendTime = RESEND_TIME;
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
        let self = this;
        this.person_isLogin = native.isLogin();
        this.$store.dispatch("head_setHead", {
            left: {
                img: "",
                title: "返回",
                callback: function () {
                    if (self.resultShow) {
                        self.resultShow = false;
                        return;
                    }
                    history.back(-1);
                }
            },
            center: {
                img: "",
                title: '征信查询',
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
        checkStatus() {
            let self = this;
            if (!this.person_isLogin) {
                self.$store.dispatch('box_set_toast', {
                    show: true,
                    toastText: '请先登录'
                });
                return;
            }
            if (!self.name.length) {
                self.$store.dispatch('box_set_toast', {
                    show: true,
                    toastText: '请输入真实姓名'
                });
                return;
            }
            if (!self.cardNo.length) {
                self.$store.dispatch('box_set_toast', {
                    show: true,
                    toastText: '请输入身份证'
                });
                return;
            }
            if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(self.cardNo)) {
                self.$store.dispatch('box_set_toast', {
                    show: true,
                    toastText: '身份证不合法'
                });
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
                url: '/service/zx/checkStatus',
                params: {
                    name: self.name,
                    cardNo: self.cardNo
                },
                success(body){
                    if (body.code === 'success') {
                        const data = body.data;
                        const status = self.status = data.status;
                        if (status === 'unregistered') { // 未注册=>去注册
                            self.processNo = 2;
                            self.captchaCodeImg = data.captchaImg;
                            self.remarkCode = data.userid;
                        }
                        if (status === 'registered'){ // 已注册，未查询过=>去登录
                        }
                        if (status === 'result') { // 已注册，已查询过=>显示结果
                            self.processNo = 5;
                        }
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
        gotoNext2() {
            let self = this;
            if (!self.zxCount.length) {
                self.$store.dispatch('box_set_toast', {
                    show: true,
                    toastText: '请输入登录名'
                });
                // return;
            }
            if (!self.zxPassword.length) {
                self.$store.dispatch('box_set_toast', {
                    show: true,
                    toastText: '请输入密码'
                });
                // return;
            }
            if (self.status === 'unregistered') {
                if (self.zxPassword2 !== self.zxPassword) {
                    self.$store.dispatch('box_set_toast', {
                        show: true,
                        toastText: '两次密码输入不一致'
                    });
                    return;
                }
                if (!self.email.length) {
                    self.$store.dispatch('box_set_toast', {
                        show: true,
                        toastText: '请输入邮箱地址'
                    });
                    return;
                }
                if (!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(self.email)) {
                    self.$store.dispatch('box_set_toast', {
                        show: true,
                        toastText: '邮箱地址不合法'
                    });
                    // return;
                }
            }
            if (!self.captchaCode.length) {
                self.$store.dispatch('box_set_toast', {
                    show: true,
                    toastText: '请输入验证码'
                });
                return;
            }
            if (self.status === 'unregistered') {
                self.$sendRequest({
                    url: '/service/zx/write',
                    params: {
                        name: self.name,
                        userid: self.remarkCode,
                        idNo: self.cardNo,
                        captchaCode: self.captchaCode
                    },
                    success(body){
                        if (body.code === 'success') {
                            if (body.data && body.data.htmlToken) {
                                self.processNo = 3;
                                self.htmlToken = body.data.htmlToken;
                            }
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
            } else if (self.status === 'registered') {
                self.$sendRequest({
                    url: '/service/zx/login',
                    params: {
                        loginName: self.zxCount,
                        userid: self.remarkCode,
                        passWord: self.zxPassword,
                        captchaCode: self.captchaCode
                    },
                    success(body){
                        if (body.code === 'success') {
                            if (body.data && body.data.issues) {
                                self.processNo = 4;
                                let issues = body.data.issues;
                            console.warn(issues)
                                let issuesList = [{
                                    question: issues['kbaList[0].question'],
                                    options: [issues['kbaList[0].options1'], issues['kbaList[0].options2'], issues['kbaList[0].options3'], issues['kbaList[0].options4'], issues['kbaList[0].options5']]
                                }, {
                                    question: issues['kbaList[1].question'],
                                    options: [issues['kbaList[1].options1'], issues['kbaList[1].options2'], issues['kbaList[1].options3'], issues['kbaList[1].options4'], issues['kbaList[1].options5']]
                                }, {
                                    question: issues['kbaList[2].question'],
                                    options: [issues['kbaList[2].options1'], issues['kbaList[2].options2'], issues['kbaList[2].options3'], issues['kbaList[2].options4'], issues['kbaList[2].options5']]
                                }, {
                                    question: issues['kbaList[3].question'],
                                    options: [issues['kbaList[3].options1'], issues['kbaList[3].options2'], issues['kbaList[3].options3'], issues['kbaList[3].options4'], issues['kbaList[3].options5']]
                                }, {
                                    question: issues['kbaList[4].question'],
                                    options: [issues['kbaList[4].options1'], issues['kbaList[4].options2'], issues['kbaList[4].options3'], issues['kbaList[4].options4'], issues['kbaList[4].options5']]
                                }];
                                self.loginIssues = issuesList;
                            }
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
        },
        sendCodeBtnClick() {
            let self = this;
            if (self.status === 'unregistered') {
                if (!self.mobile.length) {
                    self.$store.dispatch('box_set_toast', {
                        show: true,
                        toastText: '请输入手机号'
                    });
                    // return;
                }
                if (!/^1\d{10}$/.test(self.mobile)) {
                    self.$store.dispatch('box_set_toast', {
                        show: true,
                        toastText: '手机号不合法'
                    });
                    // return;
                }
                this.$sendRequest({
                    url: '/service/zx/mobileCode',
                    params:{
                        name: self.name,
                        loginName: self.loginName,
                        userid: self.remarkCode,
                        mobileTel: self.mobile
                    },
                    success(body) {
                        if (body.code === 'success') {
                            self.tcId = self.tcId;
                            self.countdownTime();
                        } else {
                            self.$store.dispatch('box_set_toast', {
                                show: true,
                                toastText: body.msg
                            });
                        }
                    },
                    error(err) {
                        self.$store.dispatch('box_set_toast', {
                            show: true,
                            toastText: '服务器繁忙,请稍后再试'
                        });
                    }
                });
            } else if (self.status === 'registered') {
                this.$sendRequest({
                    url: '/service/zx/loginMobileCode',
                    params:{
                        loginName: self.loginName,
                        userid: self.remarkCode
                    },
                    success(body) {
                        if (body.code === 'success') {
                            self.countdownTime();
                        } else {
                            self.$store.dispatch('box_set_toast', {
                                show: true,
                                toastText: body.msg
                            });
                        }
                    },
                    error(err) {
                        self.$store.dispatch('box_set_toast', {
                            show: true,
                            toastText: '服务器繁忙,请稍后再试'
                        });
                    }
                });
            }
        },
        gotoNext3() {
            let self = this;
            if (self.status === 'unregistered') {
                if (!self.mobile.length) {
                    self.$store.dispatch('box_set_toast', {
                        show: true,
                        toastText: '请输入手机号'
                    });
                    return;
                }
            }
            if (!self.indentifyCode.length) {
                self.$store.dispatch('box_set_toast', {
                    show: true,
                    toastText: '请输入手机动态码'
                });
                return;
            }
            if (self.status === 'unregistered') {
                self.$sendRequest({
                    url: '/service/zx/register',
                    params: {
                        name: self.name,
                        userid: self.remarkCode,
                        idNo: self.cardNo,
                        loginName: self.zxCount,
                        passWord: self.zxPassword,
                        confirmPassWord: self.zxPassword2,
                        mobileTel: self.mobile,
                        email: self.email,
                        verifyCode: self.indentifyCode,
                        tcId: self.tcId,
                        htmlToken: self.htmlToken
                    },
                    success(body){
                        if (body.code === 'success') {
                            self.processNo = 2;
                            self.status = 'registered';
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
            } else if (self.status === 'registered') {
                self.$sendRequest({
                    url: '/service/zx/getReport',
                    params: {
                        loginName: self.zxCount,
                        userid: self.remarkCode,
                        verifyCode: self.indentifyCode,
                        htmlToken: self.htmlToken,
                        relationalParams: {}
                    },
                    success(body){
                        if (body.code === 'success') {
                            if (body.data && body.data.msg) {
                                self.processNo = 5;
                                self.result = body.data.msg;
                            }
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
        },
        gotoNext4() {
            let self = this;
            let answers = [];
            for (let i = 0, len = self.loginIssues.length; i < len; i++) {
                let item = self.loginIssues[i];
                if (!item.answer) {
                    self.$store.dispatch('box_set_toast', {
                        show: true,
                        toastText: '请回答完所有问题'
                    });
                    return;
                }
                answers.push(item.answer);
            }
            // console.warn(answers);
            self.$sendRequest({
                url: '/service/zx/sendIssues',
                params: {
                    loginName: self.zxCount,
                    userid: self.remarkCode,
                    questions: JSON.stringify(answers)
                },
                success(body){
                    if (body.code === 'success') {
                        self.processNo = 3;
                        self.mobile = body.data.mobile;
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
        changeTab(value) {
            let self = this;
            self.activeTab = value;
        },
        captchaCodeBtnClick() {
            this.checkStatus();
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
    // border-top: 10px solid $bgColor2;
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
        // margin:20% auto;
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
.result{
    .mu-tabs {
    position: fixed;
    background:#fff;
    color: $fontColor;
    border:1px solid $lineColor;
    .mu-tab-link{
      color:$fontColor;
    }
    .mu-tab-active{
      color: $mainColor;
    }
  }
}
.result-col {
    padding-top:50px;
    .hd {
        position:relative;
        height:50px;
        line-height:50px;
        background: $mainColor;
        font-size: $fontSize;
        color:#fff;
        text-align:center;
        padding: 0 $spacing;
        // border-bottom: 1px solid $lineColor2;
        // &:after{
        //     position:absolute;
        //     top:1px;
        //     right:20px;
        //     content:'>';
        //     display:block;
        // }
    }
}
.vv-form .input-box .btn-send {
    width: 100px;
}
.vv-form .input-box .img-send {
    width: 100px;
    height:25px;
    vertical-align: text-bottom;
}
.form-list {
  .title,
  .col {
    height:40px;
    line-height:40px;
    box-sizing: border-box;
    padding: 0 $spacing;
    border-bottom: 1px solid $lineColor2;
  }
  .title {
    background: $backgroudColor;
    font-size: $fontSizeTitle;
  }
  .col {
    font-size: $fontSizeContent;
    height: auto;
    line-height:30px;
    &:last-child{
        border-bottom:0;
    }
    .name,
    .value {
    //   float:left;
      display: block;
    //   width: 50%;
    }
    .value {
    //   text-align: right;
      color: $fontColor2;
    }
  }
}
.icon-nice {
    font-size: 20px;
    color: $mainColor;
    &:before {
        background-image: url('./../../assets/images/icon-nice.png');
        width: 64px;
        height: 64px;
    }
}
.issues-wrapper {
    padding: 0 20px;
    line-height: 26px;
    .title {
    }
    .value label {
        display: block;
        margin-top: 5px;
    }
}
.result {
    padding: 0 20px;
    line-height: 26px;
}
</style>
