/**
 * Created by Administrator on 2017/6/5.
 */
export default{
  home: {
    finance: {
      label: "金融产品",
      href: '#/product/loan/index',
      cssClass: "vv-flat-button",
      labelClass: "vv-label",
      icon: "account_balance",
      iconClass: "vv-icon",
      subMenu: [{
        label: "贷款产品",
        href: '#/product/loan/index',
        cssClass: "vv-menu",
        labelClass: "vv-sub-label",
        icon: "panorama_fish_eye",
        iconClass: "vv-sub-icon"
      }, {
        label: "信用卡",
        href: '#/product/credit/index',
        cssClass: "vv-menu",
        labelClass: "vv-sub-label",
        icon: "panorama_fish_eye",
        iconClass: "vv-sub-icon"
      }, {
        label: "理财产品",
        href: '#/product/finance/index',
        cssClass: "vv-menu",
        labelClass: "vv-sub-label",
        icon: "panorama_fish_eye",
        iconClass: "vv-sub-icon"
      }]
    },
    gb: {
      label: "政银企对接",
      href: '#/gb/publish',
      cssClass: "vv-flat-button",
      labelClass: "vv-label",
      icon: "forum",
      iconClass: "vv-icon",
      subMenu: [{
        label: "对接信息发布",
        href: '#/gb/publish',
        cssClass: "vv-menu",
        labelClass: "vv-sub-label",
        icon: "panorama_fish_eye",
        iconClass: "vv-sub-icon"
      }, {
        label: "自由邀请洽谈",
        href: '#/gb/meet',
        cssClass: "vv-menu",
        labelClass: "vv-sub-label",
        icon: "panorama_fish_eye",
        iconClass: "vv-sub-icon"
      }, {
        label: "对接交流论坛",
        href: '#/gb/forum',
        cssClass: "vv-menu",
        labelClass: "vv-sub-label",
        icon: "panorama_fish_eye",
        iconClass: "vv-sub-icon"
      }]
    },
    service: {
      label: "特色服务",
      href: '#/service/zx',
      cssClass: "vv-flat-button",
      labelClass: "vv-label",
      icon: "room_service",
      iconClass: "vv-icon",
      subMenu: [{
        label: "个人征信查询",
        href: '#/service/zx',
        cssClass: "vv-menu",
        labelClass: "vv-sub-label",
        icon: "panorama_fish_eye",
        iconClass: "vv-sub-icon"
      }, {
        label: "附近银行",
        href: '#/service/nearbank',
        cssClass: "vv-menu",
        labelClass: "vv-sub-label",
        icon: "panorama_fish_eye",
        iconClass: "vv-sub-icon"
      }, {
        label: "金融计算机",
        href: '#/service/calculator',
        cssClass: "vv-menu",
        labelClass: "vv-sub-label",
        icon: "panorama_fish_eye",
        iconClass: "vv-sub-icon"
      }, {
        label: "惠银帮办",
        href: '#/service/help',
        cssClass: "vv-menu",
        labelClass: "vv-sub-label",
        icon: "panorama_fish_eye",
        iconClass: "vv-sub-icon"
      }, {
        label: "信用卡优惠信息",
        href: '#/service/offers',
        cssClass: "vv-menu",
        labelClass: "vv-sub-label",
        icon: "panorama_fish_eye",
        iconClass: "vv-sub-icon"
      }]
    },
    info: {
      label: "金融资讯",
      href: '#/info/index',
      cssClass: "vv-flat-button",
      labelClass: "vv-label",
      icon: "map",
      iconClass: "vv-icon",
      subMenu: [{
        label: "政策宣传",
        href: '#/info/index',
        cssClass: "vv-menu",
        labelClass: "vv-sub-label",
        icon: "panorama_fish_eye",
        iconClass: "vv-sub-icon"
      }, {
        label: "金融论坛",
        href: '#/info/index/industry',
        cssClass: "vv-menu",
        labelClass: "vv-sub-label",
        icon: "panorama_fish_eye",
        iconClass: "vv-sub-icon"
      }, {
        label: "行业动态",
        href: '#/info/index/forum',
        cssClass: "vv-menu",
        labelClass: "vv-sub-label",
        icon: "panorama_fish_eye",
        iconClass: "vv-sub-icon"
      }]
    }
  }
};
