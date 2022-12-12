import component from "./search.vue";

export default {
  install(Vue) {
    Vue.component(component.name, component);
  },
};
