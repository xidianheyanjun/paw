<template>
    <div>
        <div class="vv-search">
            <div class="vv-company form" v-if="pageType === 'company'">
                <mu-sub-header class="vv-title">企业用户贷款产品查询</mu-sub-header>
                <mu-content-block>
                    <div class="vv-row">
                        <div class="vv-col-title">企业性质</div>
                        <div class="vv-col-value">
                            <mu-select-field v-model="companyData.companyNature" :labelFocusClass="['label-foucs']" label="" hintText="请选择">
                            <mu-menu-item value="1" title="机关"/>
                            <mu-menu-item value="2" title="国有"/>
                            <mu-menu-item value="3" title="三资"/>
                            <mu-menu-item value="4" title="私企"/>
                            <mu-menu-item value="5" title="个体"/>
                            <mu-menu-item value="6" title="其他"/>
                        </mu-select-field>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">注册资金</div>
                        <div class="vv-col-value">
                            <mu-text-field label="" hintText="" v-model.trim="companyData.registeredCapital" type="number" />
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">贷款金额</div>
                        <div class="vv-col-value">
                            <mu-text-field label="" hintText="" v-model.trim="companyData.loanAmount" type="number" />
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">贷款品种</div>
                        <div class="vv-col-value">
                            <mu-select-field v-model="companyData.loanType" :labelFocusClass="['label-foucs']" label="" hintText="请选择">
                                <mu-menu-item value="1" title="机关"/>
                                <mu-menu-item value="2" title="国有"/>
                                <mu-menu-item value="3" title="三资"/>
                                <mu-menu-item value="4" title="私企"/>
                                <mu-menu-item value="5" title="个体"/>
                                <mu-menu-item value="6" title="其他"/>
                            </mu-select-field>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">贷款期限</div>
                        <div class="vv-col-value">
                            <mu-date-picker label="" hintText="" v-model.trim="companyData.loanPeriod" type="number" />
                        </div>
                    </div>
                    <mu-raised-button label="点击查询" class="demo-raised-button vv-button" @click="searchBtnClick" primary fullWidth/>
                </mu-content-block>
            </div>
            <div class="vv-company form" v-if="pageType === 'personal'">
                <mu-sub-header class="vv-title">个人用户贷款产品查询</mu-sub-header>
                <mu-content-block>
                    <div class="vv-row">
                        <div class="vv-col-title">姓名</div>
                        <div class="vv-col-value">
                            <mu-text-field v-model.trim="personalData.name" label="" hintText=""/>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">身份证号码</div>
                        <div class="vv-col-value">
                            <mu-text-field v-model.trim="personalData.cardNo" label="" hintText=""/>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">证件到期日</div>
                        <div class="vv-col-value">
                            <mu-date-picker v-model.trim="personalData.cardExpiredDate" label="" hintText=""/>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">信用卡发证机关</div>
                        <div class="vv-col-value">
                            <mu-text-field v-model.trim="personalData.creditBank" label="" hintText=""/>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">户籍所在城市</div>
                        <div class="vv-col-value">
                            <mu-select-field v-model="personalData.cardCity" :labelFocusClass="['label-foucs']" label="" hintText="">
                                <mu-menu-item value="1" title="同身份证城市"/>
                                <mu-menu-item value="2" title="其他城市"/>
                            </mu-select-field>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">教育程度</div>
                        <div class="vv-col-value">
                            <mu-select-field v-model="personalData.degree" :labelFocusClass="['label-foucs']" label="" hintText="">
                                <mu-menu-item value="1" title="本科"/>
                                <mu-menu-item value="2" title="大专"/>
                                <mu-menu-item value="3" title="高中或中专"/>
                                <mu-menu-item value="4" title="其他"/>
                            </mu-select-field>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">婚姻状况</div>
                        <div class="vv-col-value">
                            <mu-select-field v-model="personalData.maritalStatus" :labelFocusClass="['label-foucs']" label="" hintText="">
                                <mu-menu-item value="1" title="未婚"/>
                                <mu-menu-item value="2" title="已婚"/>
                                <mu-menu-item value="3" title="其他"/>
                            </mu-select-field>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">手机号码</div>
                        <div class="vv-col-value">
                            <mu-text-field v-model.trim="personalData.mobile" label="" hintText=""/>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">住宅电话</div>
                        <div class="vv-col-value">
                            <mu-text-field v-model.trim="personalData.homeTel" label="" hintText=""/>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">住宅性质</div>
                        <div class="vv-col-value">
                            <mu-select-field v-model="personalData.houseProperty" :labelFocusClass="['label-foucs']" label="" hintText="">
                                <mu-menu-item value="1" title="租房"/>
                                <mu-menu-item value="2" title="有按揭"/>
                                <mu-menu-item value="3" title="无按揭"/>
                                <mu-menu-item value="4" title="宿舍"/>
                                <mu-menu-item value="5" title="父母家"/>
                                <mu-menu-item value="6" title="其他"/>
                            </mu-select-field>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">住房地址</div>
                        <div class="vv-col-value">
                            <mu-text-field v-model.trim="personalData.hoseAddress" label="" hintText=""/>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">电子邮箱</div>
                        <div class="vv-col-value">
                            <mu-text-field v-model.trim="personalData.email" label="" hintText=""/>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">单位全称</div>
                        <div class="vv-col-value">
                            <mu-text-field v-model.trim="personalData.workCompany" label="" hintText=""/>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">现工作单位年限</div>
                        <div class="vv-col-value">
                            <mu-text-field v-model.trim="personalData.workYears" label="" hintText=""/>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">年薪</div>
                        <div class="vv-col-value">
                            <mu-text-field v-model.trim="personalData.yearSalary" label="" hintText=""/>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">单位所属行业</div>
                        <div class="vv-col-value">
                            <mu-select-field v-model="personalData.workCompanyNature" :labelFocusClass="['label-foucs']" label="" hintText="">
                                <mu-menu-item value="1" title="政府"/>
                                <mu-menu-item value="2" title="科教"/>
                                <mu-menu-item value="3" title="商贸"/>
                                <mu-menu-item value="4" title="制造业"/>
                                <mu-menu-item value="5" title="其他"/>
                            </mu-select-field>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">单位地址</div>
                        <div class="vv-col-value">
                            <mu-text-field v-model.trim="personalData.workCompanyAddress" label="" hintText=""/>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">单位电话</div>
                        <div class="vv-col-value">
                            <mu-text-field v-model.trim="personalData.workCompanyTel" label="" hintText=""/>
                        </div>
                    </div>
                    <div class="vv-row">
                        <div class="vv-col-title">职务</div>
                        <div class="vv-col-value">
                            <mu-text-field v-model.trim="personalData.job" label="" hintText=""/>
                        </div>
                    </div>
                    <mu-raised-button label="点击查询" class="demo-raised-button" @click="searchBtnClick" primary fullWidth/>
                </mu-content-block>
            </div>
        </div>
        <div class="vv-search-default">
            <mu-sub-header class="vv-title">智能查询</mu-sub-header>
            <mu-content-block>
                <mu-row gutter class="vv-row">
                    <mu-col width="25" tablet="25" desktop="25" v-for="item in banks" :key="item.name">
                        <a class="vv-block" :href="item.href">
                            <img class="vv-icon" :src="item.icon"/>
                            <div>{{item.name}}</div>
                        </a>
                    </mu-col>
                </mu-row>
            </mu-content-block>
        </div>
    </div>
</template>
<script>
export default {
    name: 'loan',
    data(){
        return {
            pageType: 'company',
            companyData: {
                companyNature: '',
                registeredCapital: '',
                loanAmount: '',
                loanType: '',
                loanPeriod: ''
            },
            personalData: {
                name: '',
                cardNo: '',
                cardExpiredDate: '',
                creditBank: '',
                cardCity: '',
                degree: '',
                maritalStatus: '',
                mobile: '',
                homeTel: '',
                houseProperty: '',
                hoseAddress: '',
                email: '',
                workCompany: '',
                workYears: '',
                yearSalary: '',
                workCompanyNature: '',
                workCompanyAddress: '',
                workCompanyTel: '',
                job: ''
            },
            banks: [{
                name: '流动资金贷款',
                href: '#/product/credit/list',
                icon: 'static/images/bank.png'
                }, {
                name: '固定资产贷款',
                href: '#/product/credit/list',
                icon: 'static/images/bank.png'
                }, {
                name: '短期贷款',
                href: '#/product/credit/list',
                icon: 'static/images/bank.png'
                }, {
                name: '中长期贷款',
                href: '#/product/credit/list',
                icon: 'static/images/bank.png'
                }, {
                name: '信用贷款',
                href: '#/product/credit/list',
                icon: 'static/images/bank.png'
                },{
                name: '担保贷款',
                href: '#/product/credit/list',
                icon: 'static/images/bank.png'
                },{
                name: '其他形式贷款',
                href: '#/product/credit/list',
                icon: 'static/images/bank.png'
                },{
                name: '其他形式贷款',
                href: '#/product/credit/list',
                icon: 'static/images/bank.png'
                }
            ],
            //个人
            city: '',
            study: '',
            marry: '',
            house: '',
            work: '',
            type: ''
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
    },
    methods: {
        searchBtnClick() {
            let self = this;
            let pageType = self.pageType;
            let formData = self[pageType + 'Data'];
            for (let key in formData) {
                if (formData.hasOwnProperty(key)) {
                    if (!formData[key] && !formData[key].length) {
                        self.$store.dispatch("box_set_toast", {
                            show: true,
                            toastText: '请完成填写'
                        });
                        // return;
                    }
                }
            }
            formData.type = pageType;
            self.$sendRequest({
                url: "/product/loan/search",
                params: formData,
                success(body){
                    if (body.code != 'success') {
                    self.$store.dispatch("box_set_toast", {
                        show: true,
                        toastText: body.msg
                    });
                    return false;
                    }

                    // 跳转到贷款列表页
                    window.location.href = "#/product/loan/list";
                },
                error(err){
                    self.$store.dispatch("box_set_toast", {
                        show: true,
                        toastText: "服务器繁忙,请稍后再试"
                    });
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
.vv-search-default{
    border-top:10px solid #eee;
}
.vv-block{
  display:block;
  margin-bottom:10%;
  color:rgba(0, 0, 0, 0.87);
  font-size:12px;
  text-align:center;
}
.mu-text-field{
    width:100%;
}
.form{
    // width: 90%;
    margin: 0 auto;
}
.form .vv-row {
    display: block;
    width: 100%;
    height: 40px;
    margin-bottom: 5px;
    line-height: 40px;
}
.vv-row .vv-col-title {
    display: inline-block;
    width: 38%;
    margin-bottom: 4%;
    margin-right: 2%;
    vertical-align: middle;
    text-align: right;
}

.vv-row .vv-col-value {
    display: inline-block;
    width: 50%;
    overflow: hidden;
    text-align: left;
    vertical-align: middle;
}
.vv-row .vv-col-value .mu-text-field {
  width: 100%;
}
.form .vv-button {
    margin: 5% 0;
}
</style>