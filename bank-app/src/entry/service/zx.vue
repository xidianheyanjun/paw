<template>
  <div class="page-zx">
    <div class="process-list" v-if="!result && status === 'unregistered'">
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
      <div :class="['process-item', {'current': processNo === 3}]">
        <div class="process-num">3</div>
        <div class="process-txt">验证手机动态码</div>
      </div>
      <div class="process-divice"></div>
      <div :class="['process-item', {'current': processNo > 4}]">
        <div class="process-num">4</div>
        <div class="process-txt">完成注册马上登录</div>
      </div>
    </div>
    <div class="process-list" v-if="!result && loginNextFlage > 0 && status === 'registered'">
      <div class="process-item current">
        <div class="process-num">1</div>
        <div class="process-txt">登录征信账号</div>
      </div>
      <template v-if="loginNextFlage === 1">
        <div class="process-divice"></div>
        <div :class="['process-item', {'current': processNo === 4 || processNo === 3  || processNo === 5}]">
          <div class="process-num">2</div>
          <div class="process-txt">授权回答问题</div>
        </div>
        <div class="process-divice"></div>
        <div :class="['process-item', {'current': processNo === 5}]">
          <div class="process-num">3</div>
          <div class="process-txt">获取征信结果</div>
        </div>
      </template>
      <template v-if="loginNextFlage === 2">
        <div class="process-divice"></div>
        <div :class="['process-item', {'current': processNo === 3 || processNo === 5}]">
          <div class="process-num">2</div>
          <div class="process-txt">验证手机动态码</div>
        </div>
        <div class="process-divice"></div>
        <div :class="['process-item', {'current': processNo === 5}]">
          <div class="process-num">3</div>
          <div class="process-txt">获取征信结果</div>
        </div>
      </template>
      <template v-if="loginNextFlage === 3">
        <div class="process-divice"></div>
        <div :class="['process-item', {'current': processNo === 5}]">
          <div class="process-num">2</div>
          <div class="process-txt">获取征信结果</div>
        </div>
      </template>
    </div>
    <div class="vv-form" v-if="!result">
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
            <mu-text-field type="password" v-model.trim="zxPassword" hintText="请输入密码" fullWidth :underlineShow="false"/>
          </div>
        </div>
        <template  v-if="status === 'unregistered'">
          <div class="vv-row">
            <div class="vv-col-title">确认密码</div>
            <div class="vv-col-value">
              <mu-text-field type="password" v-model.trim="zxPassword2" hintText="请再次输入密码"  fullWidth :underlineShow="false"/>
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
            <mu-radio v-for="(item2, index2) in item.options" :key="index2" :label="item2" :name="item.answer" :nativeValue="(index2+1)+''" v-model="item.answer" class="demo-radio"/> <br/>
          </div>
        </div>
        <mu-raised-button @click="gotoNext4" label="下一步" class="vv-next" primary fullWidth/>
      </div>
      <div class="process-list-5" v-show="processNo === 5">
        <div class="vv-row">
          <div class="vv-col-title">查询码</div>
          <div class="input-box">
            <mu-text-field v-model.trim="tradeCode" hintText="请输入查询码" fullWidth :underlineShow="false"/>
          </div>
        </div>
        <mu-raised-button @click="downloadZx" label="获取征信报告" class="vv-next" primary fullWidth/>
      </div>
    </div>
    <div class="vv-form result" v-if="result">
      <dl class="form-list">
        <dt class="title">用户基本信息</dt>
        <dd class="col">
          <span class="name">姓名</span>
          <span class="value">{{result.customerInfo.customerName}}</span>
        </dd>
        <dd class="col">
          <span class="name">身份证号</span>
          <span class="value">{{result.customerInfo.certNo}}</span>
        </dd>
        <dd class="col">
          <span class="name">查询时间</span>
          <span class="value">{{result.customerInfo.queryTime}}</span>
        </dd>
        <dd class="col">
          <span class="name">报告时间</span>
          <span class="value">{{result.customerInfo.reportTime}}</span>
        </dd>
      </dl>
      <dl class="form-list" v-if="result.guarantor.length" v-for="(item, index) in result.guarantor" :key="index">
        <dt class="title">保证人代偿信息 {{result.guarantor.length > 1 ? index + 1 : ''}}</dt>
        <dd class="col">
          <span class="name">报告编号</span>
          <span class="value">{{item.reportNo}}</span>
        </dd>
        <dd class="col">
          <span class="name">最近一次代偿日期</span>
          <span class="value">{{item.lastCompensatoryDate}}</span>
        </dd>
        <dd class="col">
          <span class="name">最近一次代偿单位</span>
          <span class="value">{{item.lastCompensatoryCompany}}</span>
        </dd>
        <dd class="col">
          <span class="name">累计代偿金额</span>
          <span class="value">{{item.lastCompensatoryAmount}}</span>
        </dd>
        <dd class="col">
          <span class="name">最近一次还款时间</span>
          <span class="value">{{item.guarantorLastRepaymentDate}}</span>
        </dd>
        <dd class="col">
          <span class="name">最近一次还款金额</span>
          <span class="value">{{item.guarantorLastRepaymentAmount}}</span>
        </dd>
      </dl>
      <dl class="form-list" v-if="result.guarantyInfo.length" v-for="(item, index) in result.guarantyInfo" :key="index">
        <dt class="title">为他人担保信息 {{result.guarantyInfo.length > 1 ? index + 1 : ''}}</dt>
        <dd class="col">
          <span class="name">担保金额</span>
          <span class="value">{{item.guarantyAmount}}</span>
        </dd>
        <dd class="col">
          <span class="name">担保贷款合同金额</span>
          <span class="value">{{item.contractAmount}}</span>
        </dd>
        <dd class="col">
          <span class="name">担保时间</span>
          <span class="value">{{item.guanantyDate}}</span>
        </dd>
        <dd class="col">
          <span class="name">目标银行</span>
          <span class="value">{{item.bankName}}</span>
        </dd>
        <dd class="col">
          <span class="name">截至当前查询时间</span>
          <span class="value">{{item.queryDate}}</span>
        </dd>
        <dd class="col">
          <span class="name">被担保人证件号码</span>
          <span class="value">{{item.guaranteedCertNo}}</span>
        </dd>
        <dd class="col">
          <span class="name">担保贷款本金余额</span>
          <span class="value">{{item.guarantyBalance}}</span>
        </dd>
        <dd class="col">
          <span class="name">被担保人姓名</span>
          <span class="value">{{item.guaranteedName}}</span>
        </dd>
        <dd class="col">
          <span class="name">被担保人证件类型</span>
          <span class="value">{{item.guaranteedCertType}}</span>
        </dd>
      </dl>
      <dl class="form-list" v-if="result.creditOverdue.length" v-for="(item, index) in result.creditOverdue" :key="index">
        <dt class="title">信贷详细信息-信用卡发生过逾期 {{result.creditOverdue.length > 1 ? index + 1 : ''}}</dt>
        <dd class="col">
          <span class="name">卡名</span>
          <span class="value">{{item.creditOverdueCardname}}</span>
        </dd>
        <dd class="col">
          <span class="name">当前信用额度</span>
          <span class="value">{{item.creditOverdueLimit}}</span>
        </dd>
        <dd class="col">
          <span class="name">逾期声明</span>
          <span class="value">{{item.creditOverdueAnnounce}}</span>
        </dd>
        <dd class="col">
          <span class="name">办卡银行</span>
          <span class="value">{{item.creditOverdueApplyCardBank}}</span>
        </dd>
        <dd class="col">
          <span class="name">超过90天逾期的月数</span>
          <span class="value">{{item.creditOverdueMore90}}</span>
        </dd>
        <dd class="col">
          <span class="name">状态</span>
          <span class="value">{{item.creditOverdueState}}</span>
        </dd>
        <dd class="col">
          <span class="name">最近5年处于逾期的月数</span>
          <span class="value">{{item.creditOverdueLast5yMonth}}</span>
        </dd>
        <dd class="col">
          <span class="name">已使用额度</span>
          <span class="value">{{item.creditOverdueUsedLimit}}</span>
        </dd>
        <dd class="col">
          <span class="name">状态时间</span>
          <span class="value">{{item.creditOverdueCancelState}}</span>
        </dd>
        <dd class="col">
          <span class="name">查询时间</span>
          <span class="value">{{item.creditOverdueQueryDate}}</span>
        </dd>
        <dd class="col">
          <span class="name">币种</span>
          <span class="value">{{item.creditOverdueCurrency}}</span>
        </dd>
        <dd class="col">
          <span class="name">办卡时间</span>
          <span class="value">{{item.creditOverdueApplyCardDate}}</span>
        </dd>
        <dd class="col">
          <span class="name">逾期金额</span>
          <span class="value">{{item.creditOverdueAmount}}</span>
        </dd>
      </dl>
      <dl class="form-list" v-if="result.creditNormal.length" v-for="(item, index) in result.creditNormal" :key="index">
        <dt class="title">信贷详细信息-信用卡未逾期或未超60天 {{result.creditNormal.length > 1 ? index + 1 : ''}}</dt>
        <dd class="col">
          <span class="name">办卡银行</span>
          <span class="value">{{item.creditNormalApplyCardBank}}</span>
        </dd>
        <dd class="col">
          <span class="name">当前信用额度</span>
          <span class="value">{{item.creditNormalLimit}}</span>
        </dd>
        <dd class="col">
          <span class="name">办卡时间</span>
          <span class="value">{{item.creditNormalApplyCardDate}}</span>
        </dd>
        <dd class="col">
          <span class="name">卡名</span>
          <span class="value">{{item.creditNormalCardname}}</span>
        </dd>
        <dd class="col">
          <span class="name">状态</span>
          <span class="value">{{item.creditNormalState}}</span>
        </dd>
        <dd class="col">
          <span class="name">（使用）透支余额</span>
          <span class="value">{{item.creditNormalBalance}}</span>
        </dd>
        <dd class="col">
          <span class="name">币种</span>
          <span class="value">{{item.creditNormalCurrency}}</span>
        </dd>
        <dd class="col">
          <span class="name">状态时间</span>
          <span class="value">{{item.creditNormalCancelState}}</span>
        </dd>
      </dl>
      <dl class="form-list" v-if="result.credit60.length" v-for="(item, index) in result.credit60" :key="index">
        <dt class="title">信贷详细信息-信用卡透支超过60天 {{result.credit60.length > 1 ? index + 1 : ''}}</dt>
        <dd class="col">
          <span class="name">超过90天透支的月数</span>
          <span class="value">{{item.credit60More90}}</span>
        </dd>
        <dd class="col">
          <span class="name">最近5年内透支超过60天的月数</span>
          <span class="value">{{item.credit60Last5yDay}}</span>
        </dd>
        <dd class="col">
          <span class="name">状态</span>
          <span class="value">{{item.credit60State}}</span>
        </dd>
        <dd class="col">
          <span class="name">状态时间</span>
          <span class="value">{{item.credit60CancelState}}</span>
        </dd>
        <dd class="col">
          <span class="name">办卡银行</span>
          <span class="value">{{item.credit60ApplyCardBank}}</span>
        </dd>
        <dd class="col">
          <span class="name">办卡时间</span>
          <span class="value">{{item.credit60ApplyCardDate}}</span>
        </dd>
        <dd class="col">
          <span class="name">币种</span>
          <span class="value">{{item.credit60Currency}}</span>
        </dd>
        <dd class="col">
          <span class="name">查询时间</span>
          <span class="value">{{item.credit60QueryDate}}</span>
        </dd>
        <dd class="col">
          <span class="name">当前信用额度</span>
          <span class="value">{{item.credit60Limit}}</span>
        </dd>
        <dd class="col">
          <span class="name">透支余额</span>
          <span class="value">{{item.credit60Balance}}</span>
        </dd>
        <dd class="col">
          <span class="name">卡名</span>
          <span class="value">{{item.credit60Cardname}}</span>
        </dd>
      </dl>
      <dl class="form-list" v-if="result.administrativeSanction.length" v-for="(item, index) in result.administrativeSanction" :key="index">
        <dt class="title">行政处罚记录信息 {{result.administrativeSanction.length > 1 ? index + 1 : ''}}</dt>
        <dd class="col">
          <span class="name">是否行政复议</span>
          <span class="value">{{item.isReconsideration}}</span>
        </dd>
        <dd class="col">
          <span class="name">处罚金额</span>
          <span class="value">{{item.punishAmount}}</span>
        </dd>
        <dd class="col">
          <span class="name">处罚机构</span>
          <span class="value">{{item.punishAgency}}</span>
        </dd>
        <dd class="col">
          <span class="name">处罚生效时间</span>
          <span class="value">{{item.punishEffDate}}</span>
        </dd>
        <dd class="col">
          <span class="name">处罚内容</span>
          <span class="value">{{item.punishContent}}</span>
        </dd>
        <dd class="col">
          <span class="name">行政复议结果</span>
          <span class="value">{{item.reconsiderationResult}}</span>
        </dd>
        <dd class="col">
          <span class="name">处罚截至时间</span>
          <span class="value">{{item.punishEndTime}}</span>
        </dd>
        <dd class="col">
          <span class="name">文书编号</span>
          <span class="value">{{item.documentNo}}</span>
        </dd>
      </dl>
      <dl class="form-list" v-if="result.compulsoryExecution.length" v-for="(item, index) in result.compulsoryExecution" :key="index">
        <dt class="title">强制执行记录信息 {{result.compulsoryExecution.length > 1 ? index + 1 : ''}}</dt>
        <dd class="col">
          <span class="name">执行法院</span>
          <span class="value">{{item.executionCourt}}</span>
        </dd>
        <dd class="col">
          <span class="name">执行案由</span>
          <span class="value">{{item.compulsoryCaseReason}}</span>
        </dd>
        <dd class="col">
          <span class="name">结案时间</span>
          <span class="value">{{item.closedTime}}</span>
        </dd>
        <dd class="col">
          <span class="name">已执行标的</span>
          <span class="value">{{item.executedSubject}}</span>
        </dd>
        <dd class="col">
          <span class="name">案号</span>
          <span class="value">{{item.compulsoryCaseNo}}</span>
        </dd>
        <dd class="col">
          <span class="name">申请执行标的</span>
          <span class="value">{{item.executionSubject}}</span>
        </dd>
        <dd class="col">
          <span class="name">案件状态</span>
          <span class="value">{{item.caseState}}</span>
        </dd>
        <dd class="col">
          <span class="name">结案方式</span>
          <span class="value">{{item.compulsoryClosedManner}}</span>
        </dd>
        <dd class="col">
          <span class="name">申请执行标的金额</span>
          <span class="value">{{item.executionAmount}}</span>
        </dd>
        <dd class="col">
          <span class="name">已执行的金额</span>
          <span class="value">{{item.executedAmount}}</span>
        </dd>
        <dd class="col">
          <span class="name">立案时间</span>
          <span class="value">{{item.compulsoryFileTime}}</span>
        </dd>
      </dl>
      <dl class="form-list" v-if="result.assetsDisposal.length" v-for="(item, index) in result.assetsDisposal" :key="index">
        <dt class="title">资产处置信息 {{result.assetsDisposal.length > 1 ? index + 1 : ''}}</dt>
        <dd class="col">
          <span class="name">资产处置时间</span>
          <span class="value">{{item.bondAcceptDate}}</span>
        </dd>
        <dd class="col">
          <span class="name">资产处置单位</span>
          <span class="value">{{item.bondAcceptCompany}}</span>
        </dd>
        <dd class="col">
          <span class="name">资产处置金额</span>
          <span class="value">{{item.bondAcceptAmount}}</span>
        </dd>
        <dd class="col">
          <span class="name">最近一次还款日期</span>
          <span class="value">{{item.assetsLastRepaymentDate}}</span>
        </dd>
        <dd class="col">
          <span class="name">最近一次还款金额</span>
          <span class="value">{{item.assetsLastRepaymentAmount}}</span>
        </dd>
      </dl>
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
        tradeCode:'',
        result: '',
        msg: '',
        loginNextFlage: 0,
        isClicking: false
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
          return;
        }
        if (!self.checkVal) {
          self.$store.dispatch('box_set_toast', {
            show: true,
            toastText: '请阅读并同意服务条款'
          });
          return;
        }
        if (self.isClicking) {
          return;
        }
        self.isClicking = true;
        self.$sendRequest({
          url: '/service/zx/checkStatus',
          params: {
            name: self.name,
            cardNo: self.cardNo
          },
          success(body){
            self.isClicking = false;
            if (body.code === 'success') {
              const data = body.data;
              const status = self.status = data.status;
              if (status === 'unregistered' || status === 'registered') { // 未注册=>去注册
                self.processNo = 2;
                self.captchaCodeImg = data.captchaImg;
                self.remarkCode = data.userid;
              }
              // if (status === 'registered'){ // 已注册，未查询过=>去登录
              // }
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
            self.isClicking = false;
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
          return;
        }
        if (!self.zxPassword.length) {
          self.$store.dispatch('box_set_toast', {
            show: true,
            toastText: '请输入密码'
          });
          return;
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
            return;
          }
        }
        if (!self.captchaCode.length) {
          self.$store.dispatch('box_set_toast', {
            show: true,
            toastText: '请输入验证码'
          });
          return;
        }
        if (self.isClicking) {
          return;
        }
        self.isClicking = true;
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
              self.isClicking = false;
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
              self.isClicking = false;
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
              self.isClicking = false;
              if (body.code === 'success') {
                if (body.data && body.data.code == 23007) {
                  // 回答问题获取查询码
                  self.loginNextFlage = 1;
                  self.processNo = 4;
                  self.msg = body.data.msg;
                  let issues = body.data.msg;
                //   console.warn(issues)
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
                }else if(body.data && body.data.code == 23006){
                  // 输入查询码获取征信报告
                  self.loginNextFlage = 3;
                  self.processNo = 5;
                  self.htmlToken = body.data.msg.htmlToken;
                }else if(body.data && body.data.code == 23022){
                  // 输入手机动态码申请查询码
                  self.loginNextFlage = 2;
                  self.processNo = 3;
                  self.mobile = body.data.mobile;
                  self.indentifyCode = '';
                }
              } else {
                self.$store.dispatch('box_set_toast', {
                  show: true,
                  toastText: body.msg
                });
              }
            },
            error(err){
              self.isClicking = false;
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
            return;
          }
          if (!/^1\d{10}$/.test(self.mobile)) {
            self.$store.dispatch('box_set_toast', {
              show: true,
              toastText: '手机号不合法'
            });
            return;
          }
          if (self.isClicking) {
            return;
          }
          self.isClicking = true;
          this.$sendRequest({
            url: '/service/zx/mobileCode',
            params:{
              name: self.name,
              loginName: self.loginName,
              userid: self.remarkCode,
              mobileTel: self.mobile
            },
            success(body) {
              self.isClicking = false;
              if (body.code === 'success') {
                self.tcId = body.data.tcId;
                self.countdownTime();
              } else {
                self.$store.dispatch('box_set_toast', {
                  show: true,
                  toastText: body.msg
                });
              }
            },
            error(err) {
              self.isClicking = false;
              self.$store.dispatch('box_set_toast', {
                show: true,
                toastText: '服务器繁忙,请稍后再试'
              });
            }
          });
        } else if (self.status === 'registered') {
          if (self.isClicking) {
            return;
          }
          self.isClicking = true;
          this.$sendRequest({
            url: '/service/zx/loginMobileCode',
            params:{
              loginName: self.loginName,
              userid: self.remarkCode
            },
            success(body) {
              self.isClicking = false;
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
              self.isClicking = false;
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
        if (self.isClicking) {
          return;
        }
        self.isClicking = true;
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
              self.isClicking = false;
              if (body.code === 'success') {
                self.processNo = 2;
                self.status = 'registered';
                self.zxCount = '';
                self.zxPassword = '';
                self.captchaCode = '';
                self.checkStatus(); // TODO 使用mock数据的话要注释这行
              } else {
                self.$store.dispatch('box_set_toast', {
                  show: true,
                  toastText: body.msg
                });
              }
            },
            error(err){
              self.isClicking = false;
              self.$store.dispatch('box_set_toast', {
                show: true,
                toastText: '服务器繁忙,请稍后再试'
              });
            }
          });
        } else if (self.status === 'registered') {
          self.$sendRequest({
            url: '/service/zx/searchCode',
            params: {
              loginName: self.zxCount,
              userid: self.remarkCode,
              verifyCode: self.indentifyCode,
              htmlToken: self.htmlToken,
              relationalParams: {}
            },
            success(body){
              self.isClicking = false;
              if (body.code === 'success') {
                self.processNo = 5;
                // if (body.data && body.data.msg) {
                //   self.processNo = 5;
                //   self.result = body.data.msg;
                // }
              } else {
                self.$store.dispatch('box_set_toast', {
                  show: true,
                  toastText: body.msg
                });
              }
            },
            error(err){
              self.isClicking = false;
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
          self.msg['kbaList[' + i + '].answerresult'] = item.answer;
        }
        console.log(self.loginIssues);
        if (self.isClicking) {
          return;
        }
        self.isClicking = true;
        self.$sendRequest({
          url: '/service/zx/submit',
          params: {
            loginName: self.zxCount,
            userid: self.remarkCode,
            questions: JSON.stringify(self.msg)
          },
          success(body){
            self.isClicking = false;
            if (body.code === 'success') {
              self.processNo = 5;
              // self.processNo = 3;
              // self.mobile = body.data.mobile;
              // self.indentifyCode = '';
            } else {
              self.$store.dispatch('box_set_toast', {
                show: true,
                toastText: body.msg
              });
            }
          },
          error(err){
            self.isClicking = false;
            self.$store.dispatch('box_set_toast', {
              show: true,
              toastText: '服务器繁忙,请稍后再试'
            });
          }
        });
      },
      downloadZx(){
        let self = this;
        if (self.isClicking) {
          return;
        }
        self.isClicking = true;
        self.$sendRequest({
          url: '/service/zx/getReport',
          params: {
            loginName: self.zxCount,
            userid: self.remarkCode,
            tradeCode: self.tradeCode,
            htmlToken: self.htmlToken
          },
          success(body){
            self.isClicking = false;
            if (body.code === 'success') {
                self.result = body.data.msg;
            } else {
              self.$store.dispatch('box_set_toast', {
                show: true,
                toastText: body.msg
              });
            }
          },
          error(err){
            self.isClicking = false;
            self.$store.dispatch('box_set_toast', {
              show: true,
              toastText: '服务器繁忙,请稍后再试'
            });
          }
        });
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
    // padding: 0 20px;
    line-height: 26px;
  }
.form-list {
  .title,
  .col {
    // height:40px;
    height:auto;
    line-height:40px;
    box-sizing: border-box;
    // padding: 0 $spacing;
    border-bottom: 1px solid $lineColor2;
  }
  .col {
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: justify;
  }
  .title {
    background: $backgroudColor;
    font-size: $fontSizeTitle;
  }
  .col {
    font-size: $fontSizeContent;
    .name,
    .value {
      // float:left;
      display: block;
      // width: 40%;
    }
    .value {
      // width: 60%;
      // float:right;
      text-align: right;
      color: $fontColor2;
    }
  }
}
</style>
