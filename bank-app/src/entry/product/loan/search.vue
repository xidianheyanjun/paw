<template>
    <div>
        <div class="vv-search">
            <div class="vv-company" v-if="pageType === 'company'">
                <mu-sub-header class="vv-title">企业用户贷款产品查询</mu-sub-header>
                <mu-content-block>
                    <mu-select-field v-model="companyNature" :labelFocusClass="['label-foucs']" label="企业性质" hintText="请选择">
                        <mu-menu-item value="1" title="机关"/>
                        <mu-menu-item value="2" title="国有"/>
                        <mu-menu-item value="3" title="三资"/>
                        <mu-menu-item value="4" title="私企"/>
                        <mu-menu-item value="5" title="个体"/>
                        <mu-menu-item value="6" title="其他"/>
                    </mu-select-field>
                    <mu-text-field label="注册资金" hintText="" v-model="registeredCapital" type="number" />
                    <mu-text-field label="贷款金额" hintText="" v-model="loanAmount" type="number" />
                    <mu-select-field v-model="loanType" :labelFocusClass="['label-foucs']" label="贷款品种" hintText="请选择">
                        <mu-menu-item value="1" title="机关"/>
                        <mu-menu-item value="2" title="国有"/>
                        <mu-menu-item value="3" title="三资"/>
                        <mu-menu-item value="4" title="私企"/>
                        <mu-menu-item value="5" title="个体"/>
                        <mu-menu-item value="6" title="其他"/>
                    </mu-select-field>
                    <mu-date-picker label="贷款期限" hintText="月" v-model="loanPeriod" type="number" />
                    <mu-raised-button label="点击查询" class="demo-raised-button" @click="searchCompanyClick" primary fullWidth/>
                </mu-content-block>
            </div>
            <div class="vv-company" v-if="pageType === 'personal'">
                <mu-sub-header class="vv-title">个人用户贷款产品查询</mu-sub-header>
                <mu-content-block>
                    <mu-text-field label="姓名" hintText=""/>
                    <mu-text-field label="身份证号码" hintText=""/>
                    <mu-date-picker label="证件到期日" hintText=""/>
                    <mu-text-field label="信用卡发证机关" hintText=""/>
                    <mu-select-field v-model="city" :labelFocusClass="['label-foucs']" label="户籍所在城市" hintText="">
                        <mu-menu-item value="1" title="同身份证城市"/>
                        <mu-menu-item value="2" title="其他城市"/>
                    </mu-select-field>
                    <mu-select-field v-model="study" :labelFocusClass="['label-foucs']" label="教育程度" hintText="">
                        <mu-menu-item value="1" title="本科"/>
                        <mu-menu-item value="2" title="大专"/>
                        <mu-menu-item value="3" title="高中或中专"/>
                        <mu-menu-item value="4" title="其他"/>
                    </mu-select-field>
                    <mu-select-field v-model="marry" :labelFocusClass="['label-foucs']" label="婚姻状况" hintText="">
                        <mu-menu-item value="1" title="未婚"/>
                        <mu-menu-item value="2" title="已婚"/>
                        <mu-menu-item value="3" title="其他"/>
                    </mu-select-field>
                    <mu-text-field label="手机号码" hintText=""/>
                    <mu-text-field label="住宅电话" hintText=""/>
                    <mu-select-field v-model="house" :labelFocusClass="['label-foucs']" label="住宅性质" hintText="">
                        <mu-menu-item value="1" title="租房"/>
                        <mu-menu-item value="2" title="有按揭"/>
                        <mu-menu-item value="3" title="无按揭"/>
                        <mu-menu-item value="4" title="宿舍"/>
                        <mu-menu-item value="5" title="父母家"/>
                        <mu-menu-item value="6" title="其他"/>
                    </mu-select-field>
                    <mu-text-field label="住房地址" hintText=""/>
                    <mu-text-field label="电子邮箱" hintText=""/>
                    <mu-text-field label="单位全称" hintText=""/>
                    <mu-text-field label="现工作单位年限" hintText=""/>
                    <mu-text-field label="年薪" hintText=""/>
                    <mu-select-field v-model="work" :labelFocusClass="['label-foucs']" label="单位所属行业" hintText="">
                        <mu-menu-item value="1" title="政府"/>
                        <mu-menu-item value="2" title="科教"/>
                        <mu-menu-item value="3" title="商贸"/>
                        <mu-menu-item value="4" title="制造业"/>
                        <mu-menu-item value="5" title="其他"/>
                    </mu-select-field>
                    <mu-text-field label="单位地址" hintText=""/>
                    <mu-text-field label="单位电话" hintText=""/>
                    <mu-select-field v-model="type" :labelFocusClass="['label-foucs']" label="单位所属行业" hintText="">
                        <mu-menu-item value="1" title="机关"/>
                        <mu-menu-item value="2" title="国有"/>
                        <mu-menu-item value="3" title="三资"/>
                        <mu-menu-item value="4" title="私企"/>
                        <mu-menu-item value="5" title="个体"/>
                        <mu-menu-item value="6" title="其他"/>
                    </mu-select-field>
                    <mu-text-field label="职务" hintText=""/>
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
            companyNature: '',
            registeredCapital: '',
            loanAmount: '',
            loanType: '',
            loanPeriod: '',
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
        searchCompanyClick() {
            let self = this;
            let {
                companyNature,
                registeredCapital,
                loanAmount,
                loanType,
                loanPeriod
                } = self;
            self.$sendRequest({
                url: "/product/loan/search",
                params: {
                    type: self.pageType,
                    companyNature,
                    registeredCapital,
                    loanAmount,
                    loanType,
                    loanPeriod
                },
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
</style>