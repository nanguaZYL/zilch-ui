<template>
  <div
    class="z-subsection z-flex-center"
    ref="subsection"
    :style="{
      backgroundColor: bgColor,
      height: typeof height == 'string' ? height : height + 'px',
    }"
  >
    <div
      v-for="(it, idx) in list"
      :key="idx"
      :class="[
        'z-subsection-content',
        'z-flex-center',
        'z-subsection-line',
        value == idx ? 'z-subsection-active' : '',
      ]"
      @click="choose(it, idx)"
    >
      <p
        class="z-subsection-line"
        :style="{
          color: value == idx ? activeColor : inactiveColor,
          'font-size': fontSize + 'px',
        }"
      >
        {{ it[labelName] || "" }}
      </p>
    </div>
    <div
      class="z-subsection-bg"
      :style="{ ...bgStyle, backgroundColor: activeBgcolor }"
    ></div>
  </div>
</template>

<script>
/**
 *  @property {Array} list-选项的数组
 *  @property {Number} value-选项索引值
 *  @property {Boolean} animation-是否显示动画 默认为true
 *  @property {String} activeColor-激活时的文字颜色
 *  @property {String} inactiveColor-未激活时的文字颜色
 *  @property {String,Number} fontSize-文字大小
 *  @property {String} bgColor-组件背景颜色
 *  @property {String} activeBgcolor-激活的背景颜色
 *  @property {String,Number} height-组件的高度
 *
 */
export default {
  name: "z-subsection",
  props: {
    list: { type: Array, default: () => [] },
    labelName: { type: String, default: "name" },
    value: { type: Number, default: 0 },
    animation: { type: Boolean, default: true },
    activeColor: { type: String, default: "#303133" },
    inactiveColor: { type: String, default: "#606266" },
    fontSize: { type: [String, Number], default: 14 },
    bgColor: { type: String, default: "rgb(238, 238, 239)" },
    activeBgcolor: { type: String, default: "#fff" },
    height: { type: [String, Number], default: 36 },
    disabled: { type: Boolean, default: false },
  },
  watch: {
    list: {
      handler() {
        this.reload();
      },
      deep: true,
    },
  },
  data() {
    return {
      width: 0,
    };
  },
  created() {
    this.reload();
  },
  methods: {
    choose(it, idx) {
      if (this.disabled) return;
      this.$emit("input", idx);
      this.$emit("change", it, idx);
    },
    async reload() {
      if (this.list.length <= 0) {
        this.width = 0;
        return;
      }
      this.$nextTick(() => {
        this.width = (this.$refs.subsection.offsetWidth - 6) / this.list.length;
      });
    },
  },
  computed: {
    bgStyle() {
      return {
        width: this.width + "px",
        left: this.value * this.width + 3 + "px",
        transition: this.animation ? "all 0.35s ease 0s" : "",
      };
    },
  },
};
</script>

<style>
@import "../index.css";
.z-subsection {
  position: relative;
  border-radius: 5px;
  height: 36px;
  flex-direction: row;
}
.z-subsection-content {
  flex: 1;
  flex-shrink: 0;
  z-index: 3;
  padding: 0 3px;
}
.z-subsection-content p {
  transition: all 0.35s;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
}
.z-subsection-active {
  font-weight: 600;
}
.z-subsection-bg {
  height: calc(100% - 6px);
  position: absolute;
  bottom: 3px;
  border-radius: 5px;
  z-index: 0;
}
.z-subsection-line {
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
}
</style>
