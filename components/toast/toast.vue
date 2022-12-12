<template>
  <div class="z-toast z-flex-center" :style="{ zIndex }">
    <div class="z-toast-position z-flex-center" :style="flexState">
      <div class="z-toast-content" :style="{ fontSize: turnPX(size) }">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
import turnPX from "../../utils/function/turnPX.js";
export default {
  props: {
    position: {
      type: String,
      default: "center",
    },
    size: {
      type: [String, Number],
      default: 14,
    },
    title: {
      type: String,
      default: "",
    },
    duration: {
      type: [Number, String],
      default: 1500,
    },
    zIndex: {
      type: Number,
      default: 2000,
    },
    // callback: { type: Function }, 后续考虑回调函数
  },
  data() {
    return {
      turnPX,
      CssMap: {
        top: { "justify-content": "flex-start" },
        bottom: { "justify-content": "flex-end" },
      },
    };
  },
  computed: {
    flexState() {
      const { position, CssMap } = this;
      return CssMap[position] || {};
    },
  },
};
</script>

<style>
@import "../index.css";
.z-toast {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  /* 防止点击遮挡住下面的元素 */
  pointer-events: none;
  z-index: 2000;
}
.z-toast-position {
  height: 70%;
  max-width: 80%;
  flex-direction: column;
}
.z-toast-content {
  padding: 8px 12px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  max-width: 100%;
  overflow: hidden;
  line-height: 1.2;
}
</style>
