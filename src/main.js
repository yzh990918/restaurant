/* eslint-disable*/
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/reset.css";
import "./assets/styles/border.css";
import fastClick from "fastclick";
import "./cube-ui";
import "./common/stylus/icon.styl";
import "../src/assets/styles/base.styl";

fastClick.attach(document.body);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");