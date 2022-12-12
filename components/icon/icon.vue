<template>
  <span
    :class="['z-ui', `z-ui-${icon}`]"
    :style="{
      'font-size': turnPX(size),
      width: turnPX(size),
      height: turnPX(size),
      color,
    }"
  ></span>
</template>

<script>
import turnPX from "../../utils/function/turnPX.js";
export default {
  name: "z-icon",
  props: {
    icon: {
      type: String,
      default: "mac",
    },
    color: { type: String, default: "" },
    size: {
      type: [String, Number],
      default: "18",
    },
  },
  data() {
    return { turnPX };
  },
  methods: {
    clickIcon() {
      this.$emit("click");
    },
  },
};
</script>

<style>
/* 引入icon图标 */
@import "../../assets/font/iconfont.css";
.z-ui {
  display: inline-block;
}
</style>
