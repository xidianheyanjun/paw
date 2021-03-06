// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResouse from 'vue-resource';
import App from './App';
import router from './router';
import store from './vuex/store';
import env from './env';
import native from './util/native';
import Indicator from './util/sendRequestLoading';
import 'es6-promise/auto';

// 引入UI框架
import MuseUI from 'muse-ui';
Vue.use(MuseUI);

// 异步请求封装
Vue.use(VueResouse);
Vue.http.options.credentials = true;
Vue.http.options.emulateJSON = true;
Vue.config.productionTip = false;

// 扩展交互请求
// option.url:请求的地址
// option.params:上送的参数
// option.success:成功回调
// option.error:失败回调
Vue.prototype.$sendRequest = (option) => {
  let requestUrl = env.requestRoot + option.url;
  let method = env.mode == "dev" ? "get" : "post";
  let userInfo = native.getUserInfo();
  option.params = option.params || {};
  option.params.userId = userInfo.userId || 0;
  option.params.token = userInfo.token;
  let data = JSON.stringify(option.params);
  let params = env.mode == "dev" ? {data: option.params} : {
    data: data,
    sign: env.useSign ? native.sign(data) : ""
  };
  Indicator.open();
  return Vue.http[method](requestUrl, params).then(function (data) {
    Indicator.close();
    console.log(data);
    let body = env.mode != "dev" ? data.body : JSON.parse(data.body);
    option.success && option.success(body);
  }, function (err) {
    Indicator.close();
    console.log(err);
    option.error && option.error(err);
  }).catch(function (err) {
    Indicator.close();
    console.log(err);
    option.error && option.error(err);
  });
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: {App}
});
