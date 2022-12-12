import Icon from "./components/icon";
import Loading from "./components/loading";
import Refresh from "./components/refresh";
import Subsection from "./components/subsection";
import Tabbar from "./components/tabbar";
import Signature from "./components/signature";
import Navbar from "./components/navbar";
import Swipercell from "./components/swipercell";
import Search from "./components/search";
import Toast from "./components/toast";

const components = [
  Icon,
  Loading,
  Refresh,
  Subsection,
  Tabbar,
  Signature,
  Navbar,
  Swipercell,
  Search,
  Toast,
];

// 通过install函数 全局注册所有组件
const install = function (Vue) {
  // 注册所有组件
  components.forEach((component) => {
    if (component.install) {
      Vue.use(component);
    } else {
      Vue.component(component.name, component);
    }
  });
};

export {
  install,
  Icon,
  Loading,
  Refresh,
  Subsection,
  Tabbar,
  Signature,
  Navbar,
  Swipercell,
  Search,
  Toast,
};

// 单独导出单个组件
export default {
  install,
};
