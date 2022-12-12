import component from "./loading.vue";

export default {
  install(Vue) {
    Vue.component(component.name, component);
  },
};
