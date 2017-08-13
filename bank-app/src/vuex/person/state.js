/**
 * Created by Administrator on 2017/6/5.
 */
export default{
  person: {
    menuList: [{
      name: "个人资料",
      type: "forward",
      param: "#/person/edit"
    }, {
      name: "个人征信",
      type: "forward",
      param: "#/service/zx"
    }, {
      name: "我的公积金查询",
      type: "forward",
      param: "#/person/gjj"
    }, {
      name: "我的收藏",
      type: "forward",
      param: "#/person/store"
    }, {
      name: "热点推送",
      type: "forward",
      param: "#/person/hots"
    }, {
      name: "帮助与反馈",
      type: "forward",
      param: "#/person/help"
    }],
    mapStoreKind: {
      credit: "信用卡优惠信息",
      finance: "理财信息",
      loan: "贷款信息"
    },
    storeKind: [{
      name: "收藏的信用卡优惠信息",
      href: "#/person/collect/credit"
    }, {
      name: "收藏的理财信息",
      href: "#/person/collect/finance"
    }, {
      name: "收藏的贷款信息",
      href: "#/person/collect/loan"
    }]
  }
};
