import component from "./subsection.vue";

export default {
  install(Vue) {
    Vue.component(component.name, component);
  },
};
