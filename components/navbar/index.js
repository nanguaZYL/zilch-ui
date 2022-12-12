import component from "./navbar.vue";

export default {
  install(Vue) {
    Vue.component(component.name, component);
  },
};
