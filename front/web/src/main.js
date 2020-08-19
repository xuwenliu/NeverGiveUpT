import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
import router from "./router";
import "highlight.js/styles/vs2015.css";

import "muse-ui/lib/styles/base.less";
import "./global.less";
import "lib-flexible";
import {
  Button,
  Select,
  AppBar,
  Icon,
  Menu,
  List,
  BottomSheet,
  TextField,
  Dialog,
  Progress,
  Card,
  Avatar,
  Carousel,
  Paper,
  Chip,
  Grid,
  ExpansionPanel,
  Pagination,
  Divider,
  LoadMore,
  SubHeader,
  Stepper,
  Tooltip,
  Form,
  AutoComplete,
  Snackbar,
  Popover,
  Badge
} from "muse-ui";
import "muse-ui/lib/styles/theme.less";
import "muse-ui-progress/dist/muse-ui-progress.css";
import NProgress from "muse-ui-progress";
import Helpers from "muse-ui/lib/Helpers";
import Toast from "muse-ui-toast";


import theme from "muse-ui/lib/theme";
theme.add(
  "teal",
  {
    primary: "purple",
    // secondary: '#ff4081',
    // success: '#4caf50',
    // warning: '#ffeb3b',
  },
  "light"
);

theme.use("teal");

import VueLazyload from "vue-lazyload";
import loadingImg from "./assets/img/loading.gif";
import errorImg from "./assets/img/index.jpg";

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorImg,
  loading: loadingImg,
  attempt: 1,
});

Vue.use(NProgress);
Vue.use(Helpers);
Vue.use(Toast, {
  position: "top", // 弹出的位置
  time: 2000, // 显示的时长
  closeIcon: "close", // 关闭的图标
  close: true, // 是否显示关闭按钮
  successIcon: "check_circle", // 成功信息图标
  infoIcon: "info", // 信息信息图标
  warningIcon: "priority_high", // 提醒信息图标
  errorIcon: "warning", // 错误信息图标
});
Vue.use(Button);
Vue.use(Select);
Vue.use(AppBar);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(List);
Vue.use(BottomSheet);
Vue.use(TextField);
Vue.use(Dialog);
Vue.use(Progress);
Vue.use(Card);
Vue.use(Avatar);
Vue.use(Carousel);
Vue.use(Paper);
Vue.use(Chip);
Vue.use(Grid);
Vue.use(ExpansionPanel);
Vue.use(Pagination);
Vue.use(Divider);
Vue.use(LoadMore);
Vue.use(SubHeader);
Vue.use(Stepper);
Vue.use(Tooltip);
Vue.use(Form);
Vue.use(AutoComplete);
Vue.use(Snackbar);
Vue.use(Popover);
Vue.use(Badge);

const isPC = (() => {
  var userAgentInfo = navigator.userAgent;
  var Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
    "XiaoMi/MiuiBrowser",
  ];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag && window.innerWidth > 800;
})();
Vue.prototype.isPC = isPC;

import axios from "@/utils/axios";
Vue.prototype.$axios = axios;

//过滤器
import * as filters from "./filter";
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k])); //注册过滤器
Vue.prototype.filterDate = filters.filterDate; //时间过滤方法

Vue.prototype.avatar = "https://xuwenliu.github.io/img/avatar.jpg";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
