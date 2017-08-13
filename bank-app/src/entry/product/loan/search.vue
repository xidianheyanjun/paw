<template>
    <div>
        <div class="vv-module vv-search-default" v-if="banks.length">
            <mu-sub-header class="vv-title">智能查询</mu-sub-header>
            <icon-row :icons="banks" @goto="gotoList"></icon-row>
        </div>
        <div class="vv-search">
            <mu-sub-header class="vv-title">精确查询</mu-sub-header>
            <div class="vv-company vv-form" v-if="pageType === 'company'">
                <div class="vv-row">
                    <div class="vv-col-title">企业性质</div>
                    <div class="vv-col-value">
                        <mu-select-field v-model="companyData.companyNature" :labelFocusClass="['label-foucs']" label="" hintText="请选择" :underlineShow="false">
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
                        <mu-text-field label="" hintText="请输入注册资金" v-model.trim="companyData.registeredCapital" type="number" :underlineShow="false" />
                    </div>
                </div>
                <div class="vv-row">
                    <div class="vv-col-title">贷款金额</div>
                    <div class="vv-col-value">
                        <mu-text-field label="" hintText="请输入贷款金额" v-model.trim="companyData.loanAmount" type="number" helpText="万元" :underlineShow="false" />
                    </div>
                </div>
                <div class="vv-row">
                    <div class="vv-col-title">贷款品种</div>
                    <div class="vv-col-value">
                        <mu-select-field v-model="companyData.loanType" :labelFocusClass="['label-foucs']" label="" hintText="请选择" :underlineShow="false">
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
                        <mu-date-picker label="" hintText="请输入贷款期限" v-model.trim="companyData.loanPeriod" type="number" helpText="月" :underlineShow="false" />
                    </div>
                </div>
                <mu-raised-button label="点击查询" class="demo-raised-button vv-button" @click="searchBtnClick" primary fullWidth/>
            </div>
            <div class="vv-company vv-form" v-if="pageType === 'personal'">
                <div class="vv-row">
                    <div class="vv-col-title">姓名</div>
                    <div class="vv-col-value">
                        <mu-text-field v-model.trim="personalData.name" label="" hintText="请输入姓名" :underlineShow="false"/>
                    </div>
                </div>
                <div class="vv-row">
                    <div class="vv-col-title">身份证号</div>
                    <div class="vv-col-value">
                        <mu-text-field v-model.trim="personalData.cardNo" label="" hintText="请输入身份证号" :underlineShow="false"/>
                    </div>
                </div>
                <div class="vv-row">
                    <div class="vv-col-title">证件到期日</div>
                    <div class="vv-col-value">
                        <mu-date-picker v-model.trim="personalData.cardExpiredDate" label="" hintText="请选择" :underlineShow="false"/>
                    </div>
                </div>
                <div class="vv-row">
                    <div class="vv-col-title">信用卡发证机关</div>
                    <div class="vv-col-value">
                        <mu-text-field v-model.trim="personalData.creditBank" label="" hintText="请输入信用卡发证机关" :underlineShow="false"/>
                    </div>
                </div>
                <div class="vv-row">
                    <div class="vv-col-title">户籍所在城市</div>
                    <div class="vv-col-value">
                        <mu-select-field v-model="personalData.cardCity" :labelFocusClass="['label-foucs']" label="" hintText="请选择" :underlineShow="false">
                            <mu-menu-item value="1" title="同身份证城市"/>
                            <mu-menu-item value="2" title="其他城市"/>
                        </mu-select-field>
                    </div>
                </div>
                <div class="vv-row">
                    <div class="vv-col-title">教育程度</div>
                    <div class="vv-col-value">
                        <mu-select-field v-model="personalData.degree" :labelFocusClass="['label-foucs']" label="" hintText="请选择" :underlineShow="false">
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
                        <mu-select-field v-model="personalData.maritalStatus" :labelFocusClass="['label-foucs']" label="" hintText="请选择" :underlineShow="false">
                            <mu-menu-item value="1" title="未婚"/>
                            <mu-menu-item value="2" title="已婚"/>
                            <mu-menu-item value="3" title="其他"/>
                        </mu-select-field>
                    </div>
                </div>
                <div class="vv-row">
                    <div class="vv-col-title">手机号</div>
                    <div class="vv-col-value">
                        <mu-text-field v-model.trim="personalData.mobile" label="" hintText="请输入手机号" :underlineShow="false"/>
                    </div>
                </div>
                <div class="vv-row">
                    <div class="vv-col-title">住宅电话</div>
                    <div class="vv-col-value">
                        <mu-text-field v-model.trim="personalData.homeTel" label="" hintText="请输入住宅电话" :underlineShow="false"/>
                    </div>
                </div>
                <div class="vv-row">
                    <div class="vv-col-title">住宅性质</div>
                    <div class="vv-col-value">
                        <mu-select-field v-model="personalData.houseProperty" :labelFocusClass="['label-foucs']" label="" hintText="请选择" :underlineShow="false">
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
                        <mu-text-field v-model.trim="personalData.hoseAddress" label="" hintText="请输入住房地址" :underlineShow="false"/>
                    </div>
                </div>
                <div class="vv-row">
                    <div class="vv-col-title">电子邮箱</div>
                    <div class="vv-col-value">
                        <mu-text-field v-model.trim="personalData.email" label="" hintText="请输入电子邮箱" :underlineShow="false"/>
                    </div>
                </div>
                <div class="vv-row">
                    <div class="vv-col-title">单位全称</div>
                    <div class="vv-col-value">
                        <mu-text-field v-model.trim="personalData.workCompany" label="" hintText="请输入单位全称" :underlineShow="false"/>
                    </div>
                </div>
                <div class="vv-row">
                    <div class="vv-col-title">现工作单位年限</div>
                    <div class="vv-col-value">
                        <mu-text-field v-model.trim="personalData.workYears" label="" hintText="请输入现工作单位年限" helpText="年" :underlineShow="false"/>
                    </div>
                </div>
                <div class="vv-row">
                    <div class="vv-col-title">年薪</div>
                    <div class="vv-col-value">
                        <mu-text-field v-model.trim="personalData.yearSalary" label="" hintText="请输入年薪" helpText="万元" :underlineShow="false"/>
                    </div>
                </div>
                <div class="vv-row">
                    <div class="vv-col-title">单位所属行业</div>
                    <div class="vv-col-value">
                        <mu-select-field v-model="personalData.workCompanyNature" :labelFocusClass="['label-foucs']" label="" hintText="请选择" :underlineShow="false">
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
                        <mu-text-field v-model.trim="personalData.workCompanyAddress" label="" hintText="请输入单位地址" :underlineShow="false"/>
                    </div>
                </div>
                <div class="vv-row">
                    <div class="vv-col-title">单位电话</div>
                    <div class="vv-col-value">
                        <mu-text-field v-model.trim="personalData.workCompanyTel" label="" hintText="请输入单位电话" :underlineShow="false"/>
                    </div>
                </div>
                <div class="vv-row">
                    <div class="vv-col-title">职务</div>
                    <div class="vv-col-value">
                        <mu-text-field v-model.trim="personalData.job" label="" hintText="请输入职务" :underlineShow="false"/>
                    </div>
                </div>
                <mu-raised-button label="点击查询" class="demo-raised-button vv-button" @click="searchBtnClick" primary fullWidth/>
            </div>
        </div>
    </div>
</template>
<script>
import iconRow from '@/components/common/icon.row';
export default {
    name: 'loanSearch',
    components: {
      iconRow
    },
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
            banks: []
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
        this.init();
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
                    window.location.href = '#/product/loan/list/' + self.pageType;
                },
                error(err){
                    self.$store.dispatch("box_set_toast", {
                        show: true,
                        toastText: "服务器繁忙,请稍后再试"
                    });
                }
            });
        },
        gotoList(id) {
            window.location.href =  '#/product/loan/list/' + this.pageType + '?ids=' + id;
        },
        init() {
            let self = this;
            this.$sendRequest({
                url: '/product/loan/search',
                params: {
                    loan_kind: self.pageType
                },
                success(body){
                    if (body.code === 'success') {
                        let data = body.data;
                        let banks = data.banks || [];
                        if (banks.length > 7) {
                            banks.length = 7;
                        }
                        self.banks = banks;
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
<style scoped lang="scss">
// @import '@/assets/scss/_mixin.scss';
@import './../../../assets/scss/_mixin.scss';
.vv-form {
  .vv-col-title {
    width:35%;
  }
  .vv-col-value {
    width: 65%;
  }
}
.vv-search {
    background: #fff;
}
.vv-search-default{
    background: #fff;
    padding-bottom:10px;
}
</style>