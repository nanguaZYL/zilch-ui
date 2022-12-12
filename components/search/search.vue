<template>
  <div class="z-search">
    <div class="z-search-body z-flex">
      <z-icon icon="31sousuo" class="z-search-icon" size="14"></z-icon>
      <input
        class="z-search-input"
        type="text"
        :placeholder="placeholder"
        @blur="changeShow(false)"
        @focus="changeShow(true)"
        v-model="inputVal"
      />
    </div>

    <div
      tabindex="0"
      hidefocus="true"
      @blur="changeShow(false)"
      @focus="changeShow(true)"
      :class="[listShow && list.length ? 'z-search-bottom' : '']"
      :style="{
        '--bgcolor': bgColor,
        '--highlight': highlight,
      }"
    >
      <div
        :class="['z-search-list']"
        :style="{
          backgroundColor: bgColor,
          maxHeight: listShow && list.length ? turnPX(height) : '0',
        }"
      >
        <p
          v-for="(it, idx) in calcList"
          v-html="it"
          :key="`z-search-list-item${idx}`"
          class="z-search-list-item"
          @click.stop="choose(it, idx)"
        ></p>
      </div>
    </div>
  </div>
</template>

<script>
import zIcon from "../icon/icon.vue";
import turnPX from "../../utils/function/turnPX.js";
import Highlight from "../../utils/function/highlight.js";
export default {
  name: "z-search",
  components: { zIcon },
  props: {
    value: { type: String, default: "" },
    placeholder: { type: String, default: "placeholder" },
    height: { type: [String, Number], default: 250 },
    bgColor: { type: String, default: "#f4f4f4" },
    list: { type: Array, default: () => [] },
    labelName: { type: String, default: "label" },
    highlight: { type: String, default: "#fa3534" },
    mode: { type: String, default: "default" },
  },
  data() {
    return {
      turnPX,
      Highlight,
      inputVal: "",
      listShow: false,
    };
  },
  watch: {
    value: {
      handler(v) {
        this.inputVal = v;
      },
      immediate: true,
    },
    inputVal: {
      handler(v) {
        this.$emit("input", v);
      },
    },
  },
  methods: {
    choose(it, idx) {
      this.$emit("choose", this.list[idx]);
      this.changeShow(false);
    },
    changeShow(bol) {
      this.listShow = bol;
    },
  },
  computed: {
    calcList() {
      const { list, value, labelName, Highlight, mode } = this;
      const fn = Highlight[mode];
      const arr = [];
      list.forEach((it) => {
        if (value != "") {
          arr.push(fn(it[labelName], value, "z-search-hightlight"));
        } else {
          arr.push(it[labelName]);
        }
      });
      return arr;
    },
  },
};
</script>

<style>
@import "../index.css";
.z-search {
  position: relative;
}
.z-search-body {
  align-items: center;
  position: relative;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.z-search-input {
  position: relative;
  outline: none;
  border: none;
  flex: auto;
  padding: 10px 0;
}
.z-search-icon {
  margin-right: 8px;
  flex-shrink: 0;
}
.z-search-list {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  width: 100%;
  overflow: hidden;
  transition: all 0.25s;
  z-index: 99;
  opacity: 0;
}
.z-search-bottom .z-search-list {
  opacity: 1;
  overflow: auto;
}
.z-search-bottom::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  width: 0;
  height: 0;
  /* width: 10px;
  height: 10px; */
  /* background: red; */
  border: 10px solid;
  transform: translateY(-10px) translateX(-50%);
  border-color: var(--bgcolor);
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: transparent;
}
.z-search-list-item {
  padding: 12px 5px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
}
.z-search-hightlight {
  color: var(--highlight);
}
</style>
