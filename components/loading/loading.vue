<template>
  <div
    @click="click"
    :class="{
      'z-loading': true,
      'z-loading-show': value,
      'z-loading-zoom': !value,
    }"
    :style="{
      background: background,
      '--color': loadColor,
      '--size': loadSize,
    }"
  >
    <div class="z-loading-flex">
      <!-- 圆圈转动 -->
      <div :class="`z-${shape}`" v-if="shape == 'circle'"></div>
      <!-- 三点 -->
      <div class="z-loading-dot" v-if="shape == 'dot'">
        <div v-for="i in 3" :key="i" :class="`z-${shape}`"></div>
      </div>
      <div class="z-flower" v-if="shape == 'flower'">
        <Icon icon="loading" />
      </div>
    </div>
  </div>
</template>

<script>
/**
 *  @property {String} shape-控制显示哪种加载动画 可选参数 circle dot flower
 *  @property {Boolean} vModel-控制遮罩层是否显示 默认显示
 *  @property {String} type-控制颜色 可自定义加载圆圈的颜色 可选参数 primary,success,warning,danger,info
 *  @property {Boolean} maskClick-控制遮罩层是否点击关闭 默认为true
 *  @property {String} background-控制遮罩层颜色
 *  @property {String,Number} size-控制加载圈的大小 可选参数 large medium small 三种 也可传数字
 */
import Icon from "../icon/icon.vue";
export default {
  name: "z-loading",
  props: {
    shape: {
      type: String,
      default: "circle",
    },
    value: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: "primary",
    },
    maskClick: {
      type: Boolean,
      default: true,
    },
    background: {
      type: String,
      default: "rgba(0, 0, 0, 0.8)",
    },
    size: {
      type: [String, Number],
      default: "medium",
    },
  },
  components: { Icon },
  methods: {
    click() {
      this.$emit("click");
      if (!this.maskClick) return;
      this.$emit("input", false);
    },
  },
  computed: {
    loadColor() {
      if (!this.type) return "#409eff";
      let map = {
        primary: "#409eff",
        success: "#67c23a",
        warning: "#e6a23c",
        danger: "#f56c6c",
        info: "#909399",
      };
      return map[this.type] || this.type;
    },
    loadSize() {
      if (typeof this.size == "number") {
        return this.size;
      } else {
        return {
          small: 30,
          medium: 45,
          large: 60,
        }[this.size];
      }
    },
  },
};
</script>

<style scoped>
.z-loading {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s;
}
.z-loading-show {
  opacity: 0.9;
  z-index: 999999;
}
.z-loading-zoom {
  opacity: 0;
  z-index: -1;
}
.z-loading-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.z-loading-dot {
  display: flex;
  justify-content: center;
  align-items: center;
}
.z-loading-dot div {
  /* width: 12px;
  height: 12px; */
  margin: 0 2px;
  border-radius: 50%;
  position: relative;
  top: 0;
  animation: loading1 0.9s linear infinite;
}
.z-loading-dot div:nth-child(1) {
  animation-delay: -0.4s;
}
.z-loading-dot div:nth-child(2) {
  animation-delay: -0.2s;
}
.z-loading-dot div:nth-child(3) {
  animation-delay: 0s;
}
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loading1 {
  0% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }

  80% {
    transform: scale(0);
  }

  100% {
    transform: scale(0);
  }
}
.z-circle {
  width: calc(var(--size) * 1px);
  height: calc(var(--size) * 1px);
  border-radius: 50%;
  border: calc(var(--size) / 20 * 1px) solid #fff;
  border-top-color: var(--color);
  box-sizing: border-box;
  animation: loading 1s linear infinite;
}
.z-dot {
  width: calc((var(--size) / 3) * 1px);
  height: calc((var(--size) / 3) * 1px);
  background: var(--color);
}
.z-flower {
  width: calc((var(--size)) * 1px);
  height: calc((var(--size)) * 1px);
  animation: loading 1.5s linear infinite;
}
.z-flower span {
  font-size: calc((var(--size)) * 1px) !important;
  color: var(--color);
  display: inline-block;
}
</style>
