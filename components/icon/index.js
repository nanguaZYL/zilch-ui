import component from "./icon.vue";

export default {
  install(Vue) {
    Vue.component(component.name, component);
  },
};
