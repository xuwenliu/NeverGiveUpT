import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
import router from "./router";

import "muse-ui/lib/styles/base.less";
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
  Chip
} from "muse-ui";
import "muse-ui/lib/styles/theme.less";
import "muse-ui-progress/dist/muse-ui-progress.css";
import NProgress from "muse-ui-progress";
import Helpers from "muse-ui/lib/Helpers";

// import theme from "muse-ui/lib/theme";
// theme.use("dark");
Vue.use(NProgress);
Vue.use(Helpers);
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
  return flag;
})();
Vue.prototype.isPC = isPC;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
