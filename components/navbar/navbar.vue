<template>
  <div class="z-navbar">
    <div
      class="z-navbar-content z-flex"
      :style="{
        height: turnPX(height),
        background: bgColor,
        position: isFixed ? 'fixed' : 'relative',
        borderBottom: border ? `1px solid ${border}` : '0',
        ...background,
      }"
    >
      <template v-if="$slots.body">
        <slot name="body"></slot>
      </template>
      <template v-else>
        <div class="z-navbar-content-left z-flex" @click="toLeft" v-if="isBack">
          <slot name="left" v-if="$slots.left"></slot>
          <template v-else>
            <!-- :style="{ color: leftColor, fontSize: turnPX(leftSize) }" -->
            <z-icon :icon="leftIconName" :color="leftColor"></z-icon>
            <span
              v-if="leftText"
              :style="{ color: leftColor, fontSize: turnPX(leftSize) }"
              >{{ leftText }}</span
            >
          </template>
        </div>
        <div class="z-navbar-center z-flex-center"></div>
        <div class="z-navbar-content-right" @click="toRight" v-if="isRight">
          <slot name="right" v-if="$slots.right"></slot>
          <z-icon :icon="rightIconName" v-else></z-icon>
        </div>
        <div class="z-navbar-title" :style="{ maxWidth: turnPX(titleWidth) }">
          <slot v-if="$slots.default"></slot>
          <span v-else>{{ title }}</span>
        </div>
      </template>
    </div>
    <template v-if="isFixed">
      <div
        class="z-navbar-placeholder"
        :style="{
          height: turnPX(height),
          borderBottom: border ? `1px solid transparent` : '0',
        }"
      ></div>
    </template>
  </div>
</template>

<script>
import zIcon from "../icon/icon.vue";
import turnPX from "../../utils/function/turnPX.js";
export default {
  name: "z-navbar",
  props: {
    height: { type: [String, Number], default: 44 },
    isFixed: { type: Boolean, default: true },
    title: { type: String, default: "标题" },
    titleWidth: { type: [String, Number], default: 100 },
    leftText: { type: String, default: "返回" },
    leftColor: { type: String, default: "#000" },
    leftSize: { type: [String, Number], default: 12 },
    leftIconName: { type: String, default: "zuo" },
    rightIconName: { type: String, default: "31sousuo" },
    bgColor: { type: String, default: "#fff" },
    background: { type: Object, default: () => ({}) },
    border: { type: String, default: "#ccc" },
    isBack: { type: Boolean, default: true },
    isRight: { type: Boolean, default: true },
  },
  data() {
    return {
      turnPX,
    };
  },
  components: {
    zIcon,
  },
  methods: {
    toLeft() {
      this.$emit("clickLeft");
    },
    toRight() {
      this.$emit("clickRight");
    },
  },
};
</script>

<style>
@import '../index.css';
.z-navbar {
  font-size: 14px;
}
.z-navbar-content {
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
.z-navbar-content > .z-navbar-content-left,
.z-navbar-content > .z-navbar-content-right {
  padding: 0 10px;
  align-items: center;
  font-size: 12px;
  flex-shrink: 0;
}
.z-navbar-center {
  flex: auto;
}
/* 占位元素 */
.z-navbar-placeholder {
  width: 100%;
}
.z-navbar-title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: 50% 50%;
  transform: translateX(-50%) translateY(-50%);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

</style>
