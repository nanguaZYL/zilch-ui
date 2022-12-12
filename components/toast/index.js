import toastVue from "./toast.vue";
import Vue from "vue";

const ToastConstructor = Vue.extend(toastVue);
let idx = 2000;
// 默认参数
const defaultParam = {
  title: "",
  duration: 1500,
  position: "center",
  size: 14,
};

//任务队列
const queue = [];

function assign() {
  return Object.assign(defaultParam, ...arguments);
}

function Toast(param, options) {
  if (typeof arguments[0] == "string") {
    options = assign({ title: arguments[0] });
  } else {
    options = assign(param);
  }
  options.zIndex = idx++;
  // 清除所有队列
  while (queue.length) {
    const shift = queue.shift(); //取出第一个
    clearTimeout(shift.timer); //首先清除定时器
    shift.callback(); //提前执行回调函数
  }

  let constructor = initInstance(options);
  queue.push(constructor); // 当前toast加入队列
  constructor.callback = () => {
    // 从body中移出元素
    document.body.removeChild(constructor.$el);
    // 组件自我销毁
    constructor.$destroy();
    // 防止内存泄漏
    constructor = null;
  };

  constructor.timer = setTimeout(() => {
    //如果未被后续toast提前结束则手动移出
    const index = queue.indexOf(constructor);
    if (index >= 0) queue.splice(index, 1);
    constructor.callback(); //执行回调
  }, options.duration);
  document.body.appendChild(constructor.$el);
}

function initInstance(option) {
  return new ToastConstructor({
    propsData: option,
  }).$mount(document.createElement("div"));
}

Toast.install = function (Vue) {
  Vue.prototype.$Toast = Toast;
};

export default Toast;
