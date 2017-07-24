/**
 * Created by Administrator on 2017/6/4.
 */

import env from "@/env";

let setUserInfo = (data) => {
  if (env.useNative) {
    if (window.AndroidJSInterfaceV2) {
      window.AndroidJSInterfaceV2.invoke('data', 'saveToken', JSON.stringify(data), null);
    } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.saveToken) {
      window.webkit.messageHandlers.saveToken.postMessage(JSON.stringify(data));
    }
  } else {
    window.localStorage.setItem("userInfo", JSON.stringify(data));
  }
};

let getUserInfo = () => {
  if (env.useNative) {
    if (window.AndroidJSInterfaceV2) {
      window.AndroidJSInterfaceV2.invoke('data','getToken','wersdfff',null);
    } else if (window.webkit && window.webkit.messageHandlers &&  window.webkit.messageHandlers.getToken) {
      window.webkit.messageHandlers.getToken.postMessage(null);
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
  } else if (window.webkit && window.webkit.messageHandlers &&  window.webkit.messageHandlers.encryptData) {
    window.webkit.messageHandlers.encryptData.postMessage(data);
  }
  return signData;
};

export default {
  setUserInfo: setUserInfo,
  getUserInfo: getUserInfo,
  isLogin: islogin,
  sign: sign
};
