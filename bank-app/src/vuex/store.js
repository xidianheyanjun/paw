import Vue from "vue";import Vuex from "vuex";Vue.use(Vuex);import foot from "./foot";import head from "./head";import sample from "./sample";export default new Vuex.Store({modules: {foot: foot,head: head,sample: sample}});