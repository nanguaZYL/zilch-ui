import component from "./tabbar.vue";

export default {
  install(Vue) {
    Vue.component(component.name, component);
  },
};
