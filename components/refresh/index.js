import component from "./refresh.vue";

export default {
  install(Vue) {
    Vue.component(component.name, component);
  },
};
