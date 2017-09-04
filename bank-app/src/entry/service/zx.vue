<template>
<div class="page-zx">
    <!--div class="process-list">
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
    </div-->
    <div class="vv-form">
        <!--div class="process-list-1" v-show="processNo === 1"-->
        <div class="process-list-1" v-show="!resultShow">
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
            <mu-raised-button @click="nextClick" label="确定" class="vv-next" primary fullWidth/>
        </div>
        <div class="result" v-show="resultShow">
            <mu-tabs :value="activeTab" @change="changeTab" v-if="result.zhixing.length || result.shixin.length">
                <mu-tab v-if="result.zhixing.length" value="zhixing" title="执行公开信息"/>
                <mu-tab v-if="result.shixin.length" value="shixin" title="失信老赖名单"/>
            </mu-tabs>
            <mu-tabs :value="activeTab" @change="changeTab" v-if="result.xiangao.length || result.xianchu.length">
                <mu-tab v-if="result.xiangao.length" value="xiangao" title="限制高消费名单"/>
                <mu-tab v-if="result.xianchu.length" value="xianchu" title="限制出入境名单"/>
            </mu-tabs>
            <mu-tabs :value="activeTab" @change="changeTab" v-if="result.caipan.length || result.shenpan.length">
                <mu-tab v-if="result.caipan.length" value="caipan" title="民商事裁判文书"/>
                <mu-tab v-if="result.shenpan.length" value="shenpan" title="民商事审判流程"/>
            </mu-tabs>
            <mu-tabs :value="activeTab" @change="changeTab" v-if="result.zuifan.length || result.weifa.length">
                <mu-tab v-if="result.zuifan.length" value="zuifan" title="犯罪及嫌疑人名单"/>
                <mu-tab v-if="result.weifa.length" value="weifa" title="行政违法记录"/>
            </mu-tabs>
            <mu-tabs :value="activeTab" @change="changeTab" v-if="result.qianshui.length || result.feizheng.length">
                <mu-tab v-if="result.qianshui.length" value="qianshui" title="欠税名单"/>
                <mu-tab v-if="result.feizheng.length" value="feizheng" title="纳税非正常户"/>
            </mu-tabs>
            <mu-tabs :value="activeTab" @change="changeTab" v-if="result.qiankuan.length">
                <mu-tab value="qiankuan" title="欠款欠税名单"/>
            </mu-tabs>
            <div class="result-col" v-if="activeTab === 'zhixing' && result.zhixing.length">
                <dl class="form-list" v-for="(item, index) in result.zhixing" :key="index">
                    <dt class="title">{{item.title}}</dt>
                    <dd class="col">
                    <span class="name">立案时间</span>
                    <span class="value">{{item.sslong}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">被执行人姓名</span>
                    <span class="value">{{item.name}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">证件号码</span>
                    <span class="value">{{item.id}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">执行案号</span>
                    <span class="value">{{item.casenum}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">执行法院</span>
                    <span class="value">{{item.court}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">执行内容</span>
                    <span class="value">{{item.content}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">执行状态</span>
                    <span class="value">{{item.state}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">异议备注</span>
                    <span class="value">{{item.remark}}</span>
                    </dd>
                </dl>
            </div>
            <div class="result-col" v-if="activeTab === 'shixin' && result.shixin.length">
                <dl class="form-list" v-for="(item, index) in result.shixin" :key="index">
                    <dt class="title">{{item.title}}</dt>
                    <dd class="col">
                    <span class="name">具体日期</span>
                    <span class="value">{{item.sslong}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">被执行人姓名</span>
                    <span class="value">{{item.name}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">证件号码</span>
                    <span class="value">{{item.id}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">执行案号</span>
                    <span class="value">{{item.casenum}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">执行法院</span>
                    <span class="value">{{item.court}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">执行内容</span>
                    <span class="value">{{item.content}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">执行状态</span>
                    <span class="value">{{item.state}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">异议备注</span>
                    <span class="value">{{item.remark}}</span>
                    </dd>
                </dl>
            </div>
            <div class="result-col" v-if="activeTab === 'xiangao' && result.xiangao.length">
                <dl class="form-list" v-for="(item, index) in result.xiangao" :key="index">
                    <dt class="title">{{item.title}}</dt>
                    <dd class="col">
                    <span class="name">具体日期</span>
                    <span class="value">{{item.sslong}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">被执行人姓名</span>
                    <span class="value">{{item.name}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">证件号码</span>
                    <span class="value">{{item.id}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">执行案号</span>
                    <span class="value">{{item.casenum}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">执行法院</span>
                    <span class="value">{{item.court}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">执行内容</span>
                    <span class="value">{{item.content}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">执行状态</span>
                    <span class="value">{{item.state}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">异议备注</span>
                    <span class="value">{{item.remark}}</span>
                    </dd>
                </dl>
            </div>
            <div class="result-col" v-if="activeTab === 'xianchu' && result.xianchu.length">
                <dl class="form-list" v-for="(item, index) in result.xianchu" :key="index">
                    <dt class="title">{{item.title}}</dt>
                    <dd class="col">
                    <span class="name">具体日期</span>
                    <span class="value">{{item.sslong}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">被限制人姓名</span>
                    <span class="value">{{item.name}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">证件号码</span>
                    <span class="value">{{item.id}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">执行案号</span>
                    <span class="value">{{item.casenum}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">执行法院</span>
                    <span class="value">{{item.court}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">执行内容</span>
                    <span class="value">{{item.content}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">执行状态</span>
                    <span class="value">{{item.state}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">异议备注</span>
                    <span class="value">{{item.remark}}</span>
                    </dd>
                </dl>
            </div>
            <div class="result-col" v-if="activeTab === 'caipan' && result.caipan.length">
                <dl class="form-list" v-for="(item, index) in result.caipan" :key="index">
                    <dt class="title">{{item.title}}</dt>
                    <dd class="col">
                    <span class="name">结案时间</span>
                    <span class="value">{{item.sslong}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">当事人人姓名</span>
                    <span class="value">{{item.name}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">证件号码</span>
                    <span class="value">{{item.id}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">案号</span>
                    <span class="value">{{item.casenum}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">诉讼地位</span>
                    <span class="value">{{item.pctype}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">审查机关</span>
                    <span class="value">{{item.court}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">涉案事由</span>
                    <span class="value">{{item.casetopic}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">涉案金额</span>
                    <span class="value">{{item.money}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">审理结果</span>
                    <span class="value">{{item.cotent}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">审理程序</span>
                    <span class="value">{{item.vprogram}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">审理人员</span>
                    <span class="value">{{item.tribunal}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">异议备注</span>
                    <span class="value">{{item.remark}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">完整内容查看当地地址</span>
                    <span class="value">{{item.furl_casecon}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">原告当事人</span>
                    <span class="value">{{item.plaintiff}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">被告当事人</span>
                    <span class="value">{{item.defendant}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">其他当事人</span>
                    <span class="value">{{item.ohterparty}}</span>
                    </dd>
                </dl>
            </div>
            <div class="result-col" v-if="activeTab === 'shenpan' && result.shenpan.length">
                <dl class="form-list" v-for="(item, index) in result.shenpan" :key="index">
                    <dt class="title">{{item.title}}</dt>
                    <dd class="col">
                    <span class="name">具体日期</span>
                    <span class="value">{{item.sslong}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">当事人姓名</span>
                    <span class="value">{{item.name}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">证件号码</span>
                    <span class="value">{{item.id}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">案号</span>
                    <span class="value">{{item.casenum}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">诉讼地位</span>
                    <span class="value">{{item.pctype}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">审查机关</span>
                    <span class="value">{{item.court}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">公告类型</span>
                    <span class="value">{{item.writtype}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">涉案事由</span>
                    <span class="value">{{item.casetopic}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">公告内容</span>
                    <span class="value">{{item.content}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">异议备注</span>
                    <span class="value">{{item.remark}}</span>
                    </dd>
                </dl>
            </div>
            <div class="result-col" v-if="activeTab === 'zuifan' && result.zuifan.length">
                <dl class="form-list" v-for="(item, index) in result.zuifan" :key="index">
                    <dt class="title">{{item.title}}</dt>
                    <dd class="col">
                    <span class="name">处理时间</span>
                    <span class="value">{{item.sslong}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">当事人姓名</span>
                    <span class="value">{{item.name}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">证件号码</span>
                    <span class="value">{{item.id}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">案号</span>
                    <span class="value">{{item.casenum}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">侦查/批捕/审判机关</span>
                    <span class="value">{{item.court}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">违法事由</span>
                    <span class="value">{{item.casetopic}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">处理结果</span>
                    <span class="value">{{item.content}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">异议备注</span>
                    <span class="value">{{item.remark}}</span>
                    </dd>
                </dl>
            </div>
            <div class="result-col" v-if="activeTab === 'weifa' && result.weifa.length">
                <dl class="form-list" v-for="(item, index) in result.weifa" :key="index">
                    <dt class="title">{{item.title}}</dt>
                    <dd class="col">
                    <span class="name">具体日期</span>
                    <span class="value">{{item.sslong}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">当事人姓名</span>
                    <span class="value">{{item.name}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">证件号码</span>
                    <span class="value">{{item.id}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">案号</span>
                    <span class="value">{{item.casenum}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">执法/复议/审判机关</span>
                    <span class="value">{{item.court}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">违法事由</span>
                    <span class="value">{{item.casetopic}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">行政执法结果</span>
                    <span class="value">{{item.content}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">法院审理结果</span>
                    <span class="value">{{item.content2}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">异议备注</span>
                    <span class="value">{{item.remark}}</span>
                    </dd>
                </dl>
            </div>
            <div class="result-col" v-if="activeTab === 'qianshui' && result.qianshui.length">
                <dl class="form-list" v-for="(item, index) in result.qianshui" :key="index">
                    <dt class="title">{{item.title}}</dt>
                    <dd class="col">
                    <span class="name">欠税发生时间</span>
                    <span class="value">{{item.sslong}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">纳税人名称</span>
                    <span class="value">{{item.name}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">证件号码</span>
                    <span class="value">{{item.id}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">主管税务机关</span>
                    <span class="value">{{item.court}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">欠款金额</span>
                    <span class="value">{{item.money}}元</span>
                    </dd>
                    <dd class="col">
                    <span class="name">所欠税种</span>
                    <span class="value">{{item.taxtype}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">欠税属期</span>
                    <span class="value">{{item.taxperiod}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">异议备注</span>
                    <span class="value">{{item.remark}}</span>
                    </dd>
                </dl>
            </div>
            <div class="result-col" v-if="activeTab === 'feizheng' && result.feizheng.length">
                <dl class="form-list" v-for="(item, index) in result.feizheng" :key="index">
                    <dt class="title">{{item.title}}</dt>
                    <dd class="col">
                    <span class="name">认定日期</span>
                    <span class="value">{{item.sslong}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">纳税人名称</span>
                    <span class="value">{{item.name}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">纳税人识别号</span>
                    <span class="value">{{item.id}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">主管税务机关</span>
                    <span class="value">{{item.court}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">异议备注</span>
                    <span class="value">{{item.remark}}</span>
                    </dd>
                </dl>
            </div>
            <div class="result-col" v-if="activeTab === 'qiankuan' && result.qiankuan.length">
                <dl class="form-list" v-for="(item, index) in result.qiankuan" :key="index">
                    <dt class="title">{{item.title}}</dt>
                    <dd class="col">
                    <span class="name">具体时间</span>
                    <span class="value">{{item.sslong}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">欠款人姓名</span>
                    <span class="value">{{item.name}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">身份</span>
                    <span class="value">{{item.pctype}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">证件号码</span>
                    <span class="value">{{item.id}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">欠款原因</span>
                    <span class="valpctypeue">{{item.casetopic}}</span>
                    </dd>
                    <dd class="col">
                    <span class="name">拖欠金额</span>
                    <span class="value">{{item.money}}元</span>
                    </dd>
                    <dd class="col">
                    <span class="name">异议备注</span>
                    <span class="value">{{item.remark}}</span>
                    </dd>
                </dl>
            </div>
            <div class="no-data" v-else>您的征信良好</div>
        </div>
        <!--div class="process-list-2" v-show="processNo === 2">
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
        <div class="process-list-3" v-show="processNo === 3">
            <div class="no-data">正在发送查询申请</div>
        </div>
        <div class="process-list-4" v-show="processNo === 4">
            <div class="no-data">申请成功，请耐心等待信息反馈</div>
        </div-->
    </div>
    <div class="ft" v-show="!resultShow">
        <span class="msg">已有征信中心账户</span>
        <a href="#/person/login" class="link">立即登录</a>
    </div>

</div>
</template>
<script>
import { mapGetters } from 'vuex';
import native from "@/util/native";
// const RESEND_TIME = 10;
// let sendIndentifyCodeTimer = null;
export default {
    name: 'serviceZX',
    computed: mapGetters([]),
    components: {},
    data(){
        return {
            person_isLogin: false,
            // name: '宋华',
            name: '',
            nameError: '',
            // cardNo: '450305197805152014',
            cardNo: '',
            cardNoError: '',
            checkVal: true,
            processNo: 1,
            resultShow: false,
            activeTab: 'zhixing',
            result: {
                zhixing: [],
                shixin: [],
                xiangao: [],
                xianchu: [],
                caipan: [],
                shenpan: [],
                zuifan: [],
                weifa: [],
                qianshui: [],
                feizheng: [],
                qiankuan: []
            }
            // zxCount: '',
            // zxCountError: '',
            // zxPassword: '',
            // zxPasswordError: '',
            // zxPassword2: '',
            // zxPasswordError2: '',
            // email: '',
            // emailError: '',
            // mobile: '',
            // mobileError: '',
            // indentifyCode: '',
            // indentifyCodeError: '',
            // isSend: false,
            // isValidate: false,
            // sendCodeText:'获取',
            // resendTime: RESEND_TIME
        }
    },
    watch: {
        person_isLogin(v) {
            if (v) {
            this.userId = native.getUserInfo().userId || 0;
            console.warn('userId:', this.userId)
            }
        },
        processNo(v1) {
            if (v1 == 3) {
                setTimeout(() => {
                    this.processNo++;
                }, 3000);
            }
        },
        // resendTime(v1) {
        //     if (v1 && (v1 < RESEND_TIME)) {
        //         this.sendCodeText = this.resendTime + 's';
        //         this.isSend = true;
        //     } else if (v1 === 0) {
        //         this.sendCodeText = '获取';
        //         this.isSend = false;
        //     }
        // },
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
    // beforeDestroy() {
    //   if (sendIndentifyCodeTimer) {
    //     clearInterval(sendIndentifyCodeTimer);
    //     sendIndentifyCodeTimer = null;
    //   }
    // },
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
        changeTab(value) {
            let self = this;
            self.activeTab = value;
        },
        clearErrorTips(err) {
            this[err] = '';
        },
        // sendCodeBtnClick() {
        //     let self = this;
        //     this.$sendRequest({
        //         url: '/service/zx',
        //         params:{
        //           name: self.name,
        //           cardNo: self.cardNo
        //         },
        //         success(body) {
        //             let msg = '';
        //             if (body.code === 'success') {
        //                 msg = '发送成功';
        //                 self.countdownTime();
        //             } else {
        //                 msg = body.msg;
        //             }
        //             self.$store.dispatch('box_set_toast', {
        //                 show: true,
        //                 toastText: msg
        //             });
        //         },
        //         error(err) {
        //             self.$store.dispatch('box_set_toast', {
        //                 show: true,
        //                 toastText: '服务器繁忙,请稍后再试'
        //             });
        //         }
        //     });
        // },
        // countdownTime() {
        //     let time = 1000;
        //     if (sendIndentifyCodeTimer) {
        //     clearInterval(sendIndentifyCodeTimer);
        //     sendIndentifyCodeTimer = null;
        //     }
        //     sendIndentifyCodeTimer = setInterval(() => {
        //     this.resendTime--;
        //     if (this.resendTime < 0) {
        //         this.resendTime = 0;
        //         clearInterval(sendIndentifyCodeTimer);
        //         sendIndentifyCodeTimer = null;
        //     }
        //     }, time);
        // },
        nextClick() {
            let self = this;
            if (!this.person_isLogin) {
                self.$store.dispatch('box_set_toast', {
                    show: true,
                    toastText: '请先登录'
                });
                return;
            }
            if (!self.name.length) {
                self.nameError = '请输入真实姓名';
                return;
            }
            if (!self.cardNo.length) {
                self.cardNoError = '请输入身份证';
                return;
            }
            // if (!self.indentifyCode.length) {
            //     self.indentifyCodeError = '请输入验证码';
            //     return;
            // }
            if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(self.cardNo)) {
                self.cardNoError = '身份证不合法';
                return;
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
                        // self.processNo++;
                        // let content = eval("(" + body.data.content + ")"); 
                        let content = body.data.content; 
                        let fxcontent = content.fxcontent;
                        self.resultShow = true;
                        // self.result = {
                        //     zhixing: fxcontent.zhixing || [],
                        //     shixin: fxcontent.shixin || [],
                        //     xiangao: fxcontent.xiangao || [],
                        //     xianchu: fxcontent.xianchu || [],
                        //     caipan: fxcontent.caipan || [],
                        //     shenpan: fxcontent.shenpan || [],
                        //     zuifan: fxcontent.zuifan || [],
                        //     weifa: fxcontent.weifa || [],
                        //     qianshui: fxcontent.qianshui || [],
                        //     feizheng: fxcontent.feizheng || [],
                        //     qiankuan: fxcontent.qiankuan || []
                        // };
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
// .process-list{
//     margin:$spacing;
//     display: -webkit-box;
//     -webkit-box-align: center;
//     -webkit-box-pack: justify;
// }
// .process-item {
//     text-align:center;
//     width:56px;
//     color:$mainColor;
//     .process-num {
//         width:56px;
//         height:56px;
//         border:1px solid $mainColor;
//         border-radius:100%;
//         font-size:30px;
//         line-height:56px;
//     }
//     .process-txt{
//         margin-top:10px;
//         line-height:16px;
//         font-size:12px;
//     }
//     &.current{
//         .process-num {
//             background:$mainColor;
//             color:#fff;
//         }
//     }
// }
// .process-divice{
//     margin-top:-35px;
//     width:10px;
//     height:2px;
//     background:$mainColor;
// }

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
</style>
