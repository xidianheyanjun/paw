/**
 * Created by Administrator on 2017/6/4.
 */

import env from "@/env";

let setUserInfo = (data) => {
  if (env.useNative) {
    if (window.AndroidJSInterfaceV2) {
      window.AndroidJSInterfaceV2.invoke('data', 'saveToken', JSON.stringify(data), null);
    } else {
    }
  } else {
    window.localStorage.setItem("userInfo", JSON.stringify(data));
  }
};

let getUserInfo = () => {
  if (env.useNative) {
    if (window.AndroidJSInterfaceV2) {
      window.AndroidJSInterfaceV2.invoke('data','getToken','wersdfff',null);
    } else {
    }
  } else {
    let userInfoJson = window.localStorage.getItem("userInfo");
    return userInfoJson ? JSON.parse(userInfoJson) : {};
  }
};

let islogin = () => {
  return !!getUserInfo().userId;
};

let sign = (data) => {
  let signData = "";
  if (window.AndroidJSInterfaceV2) {
    signData = window.AndroidJSInterfaceV2.invoke('data', 'encryptData', data, null);
  } else {
  }
  return signData;
};

export default {
  setUserInfo: setUserInfo,
  getUserInfo: getUserInfo,
  isLogin: islogin,
  sign: sign
};
