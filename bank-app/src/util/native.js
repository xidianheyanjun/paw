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
    return JSON.parse(window.localStorage.getItem("userInfo")) || {};
  }
};

export default {
  setUserInfo: setUserInfo,
  getUserInfo: getUserInfo
};
