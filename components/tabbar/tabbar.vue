<template>
  <div class="z-tabbar">
    <div
      class="z-tabbar-content z-flex"
      :style="{
        height: turnPX(height),
        borderTop: border ? '1px solid #ccc' : '',
      }"
      ref="tabbar"
    >
      <div
        v-for="(it, idx) in list"
        :key="idx"
        class="z-tabbar-content-item z-flex-center"
        @click="change(it, idx)"
      >
        <z-icon
          v-show="value != idx"
          :icon="it.icon"
          :color="inactiveColor || ''"
          :size="size"
          :class="['z-tabbar-icon']"
        ></z-icon>
        <z-icon
          v-if="value == idx"
          :icon="it.fillicon"
          :size="size"
          :style="{ '--color': activeColor, '--size': size }"
          :color="activeColor || ''"
          :class="['z-tabbar-icon', ...className]"
        ></z-icon>

        <span
          class="text"
          v-if="it.label && mode != 'bomb'"
          :style="{
            color: value == idx && activeColor ? activeColor : inactiveColor,
          }"
          >{{ it.label }}</span
        >
      </div>
    </div>
    <div
      class="z-tabbar-animation z-flex"
      :style="{
        height: turnPX(height),
        backgroundColor: bgColor,
      }"
    ></div>
    <div class="z-tabbar-placeholder" :style="{ height: turnPX(height) }"></div>
  </div>
</template>

<script>
import zIcon from "../icon/icon.vue";
import turnPX from "../../utils/function/turnPX.js";
export default {
  name: "z-tabbar",
  components: { zIcon },
  props: {
    value: {
      type: Number,
      default: 0,
    },
    list: {
      type: Array,
      default: () => [],
    },
    height: {
      type: Number,
      default: 50,
    },
    size: {
      type: Number,
      default: 20,
    },
    bgColor: {
      type: String,
      default: "#fff",
    },
    mode: {
      type: String,
      default: "",
    },
    activeColor: {
      type: String,
      default: "",
    },
    inactiveColor: {
      type: String,
      default: "",
    },
    border: {
      type: Boolean,
      default: true,
    },
    beforeChange: {
      type: Function,
    },
  },
  data() {
    return {
      turnPX,
    };
  },
  methods: {
    change(it, idx) {
      let isChange = true;
      if (this.beforeChange && typeof this.beforeChange == "function") {
        isChange = this.beforeChange(idx, this.value);
      }
      isChange && this.changeVal(it, idx);
    },
    changeVal(it, idx) {
      this.$emit("input", idx);
      this.$emit("change", it, idx);
    },
  },
  computed: {
    className() {
      const map = {
        largen: "z-tabbar-icon-opacity",
        sway: "z-tabbar-icon-transform",
        bomb: "z-tabbar-icon-bomb",
      };
      return [map[this.mode]];
    },
  },
};
</script>

<style>
@import "../index.css";
.z-tabbar {
  position: relative;
}
.z-tabbar-content {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  align-items: center;
  z-index: 999;
}
.z-tabbar-content-item {
  flex: 1;
  flex-shrink: 0;
  height: 100%;
  flex-direction: column;
  font-size: 12px;
}
.z-tabbar-animation {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  width: 100%;
  z-index: 998;
}
.z-tabbar-icon {
  border-radius: 50%;
  transform-origin: 50% 50%;
}
.z-tabbar-icon-opacity {
  animation: iconOpacity 0.5s cubic-bezier(0.29, 1.74, 0.99, 0.86);
}
.z-tabbar-icon-transform {
  animation: iconTransform 0.5s cubic-bezier(0.29, 1.74, 0.99, 0.86);
}
.z-tabbar-icon-bomb {
  position: relative;
  /* overflow: hidden; */
}
.z-tabbar-icon-bomb::after {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  animation: bomb 0.25s ease-out;
  width: 0;
  height: 0;
  z-index: -1;
  border-radius: 50%;
  border-width: 0;
  border-style: solid;
  border-color: var(--color);
}
.z-tabbar-content-item .text {
  margin-top: 5px;
}
@keyframes bomb {
  0% {
    width: 0;
    height: 0;
    border-width: calc(((var(--size) / 2) + 10) * 1px);
    z-index: 1;
    opacity: 0.2;
  }
  100% {
    width: calc((var(--size) + 20) * 1px);
    height: calc((var(--size) + 20) * 1px);
    border-width: 0;
    z-index: 1;
    opacity: 0.5;
  }
}
@keyframes iconTransform {
  0% {
    transform: rotate(6deg);
  }
  20% {
    transform: rotate(-6deg);
  }
  40% {
    transform: rotate(6deg);
  }
  60% {
    transform: rotate(-6deg);
  }
  80% {
    transform: rotate(6deg);
  }
  100% {
    transform: rotate(-6deg);
  }
}
@keyframes iconOpacity {
  0% {
    opacity: 0.5;
    transform: scale(0.6);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes run {
  0% {
    transform: translateY(-50%) translateX(0);
  }
  100% {
    transform: translateY(-50%) translateX(680px);
  }
}
</style>
