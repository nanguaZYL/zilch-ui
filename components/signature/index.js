import component from "./signature.vue";

export default {
  install(Vue) {
    Vue.component(component.name, component);
  },
};
