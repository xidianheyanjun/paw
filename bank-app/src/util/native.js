/**
 * Created by Administrator on 2017/6/4.
 */

import env from "@/env";

let setUserInfo = (data) => {
  if (env.useNative) {
  } else {
    window.localStorage.setItem("userInfo", JSON.stringify(data));
  }
};

let getUserInfo = () => {
  if (env.useNative) {
  } else {
    let userInfoJson = window.localStorage.getItem("userInfo");
    return userInfoJson ? JSON.parse(userInfoJson) : {};
  }
};

let islogin = () => {
  return !!getUserInfo().userId;
};

export default {
  setUserInfo: setUserInfo,
  getUserInfo: getUserInfo,
  isLogin: islogin
};
