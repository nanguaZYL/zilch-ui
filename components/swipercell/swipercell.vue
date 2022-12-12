<template>
  <div
    class="z-swiperaction"
    ref="swiperaction"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
    @mousedown="touchstart"
    @mousemove="touchmove"
    @mouseup="touchend"
    @mouseleave="touchend"
  >
    <div
      class="z-swiperaction-content"
      :style="{ transform: `translateX(${translateX}px)` }"
    >
      <slot></slot>
    </div>
    <div
      ref="z-swiperaction-right"
      class="z-swiperaction-right z-flex"
      :style="{ transform: `translateX(calc(100% + ${translateX}px))` }"
    >
      <div
        class="z-swiperaction-right-button z-flex-center"
        v-for="(it, idx) in list"
        :key="idx"
        :style="{ ...it.style }"
        @click="clickBtn(it, idx)"
      >
        {{ it.text }}
      </div>
    </div>
  </div>
</template>

<script>
import Touch from "../../utils/pc/touch.js";
export default {
  name: "z-swipercell",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    threshold: {
      type: Number,
      default: 25,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      Touch,
      location: {},
      translateX: 0, //偏移量
      isFirst: true,
      isMove: true,
      cache: 0,
      state: "close", //open close
      key: false,
    };
  },
  methods: {
    touchstart(e) {
      if (this.list.length <= 0) return;
      if (!this.state) return;
      if (this.key) return;
      this.location = this.Touch(e);
      this.cache = this.translateX;
      this.isFirst = true;
      this.key = true;
      // this.isMove = true;
    },
    touchmove(e) {
      if (this.list.length <= 0) return;
      if (!this.state) return;
      if (!this.key) return;
      const { location } = this;
      const { pageX, pageY } = this.Touch(e);
      const dis = {
        x: pageX - location.pageX,
        y: pageY - location.pageY,
      };
      // 在安卓下，手指按下时，如果触摸面积比较大，容易误触 touchmove
      if (this.isFirst) {
        if (Math.abs(dis.x) - Math.abs(dis.y) > 5) {
          // 左右滑动, 阻止滚动条不进行上下滑动，而让幻灯片滑动
          this.isMove = true;
          this.isFirst = false;
        } else if (Math.abs(dis.y) - Math.abs(dis.x) > 5) {
          // 上下滑动, 不阻止滚动条滑动，禁止幻灯片滑动
          this.isMove = false;
          this.isFirst = false;
        }
      }
      if (this.isMove) {
        e.preventDefault();
        if (!this.isFirst) {
          this.translateX = this.cache + dis.x;
          if (this.translateX > 0) this.translateX = 0;
          const offsetWidth = this.$refs["z-swiperaction-right"].offsetWidth;
          if (Math.abs(this.translateX) > offsetWidth) {
            this.translateX = -offsetWidth;
          }
        }
      }
    },
    touchend() {
      if (this.list.length <= 0) return;
      if (!this.state) return;
      this.key = false;
      if (this.state == "close") {
        if (Math.abs(this.translateX) >= this.threshold) {
          this.open();
        } else {
          this.close();
        }
      } else {
        const offsetWidth = this.$refs["z-swiperaction-right"].offsetWidth;
        const diff = offsetWidth - Math.abs(this.translateX);
        if (diff > this.threshold) {
          this.close();
        } else {
          this.open();
        }
      }
    },
    open(width) {
      this.state = "";
      const offsetWidth =
        width || this.$refs["z-swiperaction-right"].offsetWidth;
      if (Math.abs(this.translateX) >= offsetWidth) {
        this.translateX = -offsetWidth;
        this.state = "open";
        return;
      }
      this.translateX -= offsetWidth / 20;
      requestAnimationFrame(() => {
        this.open(offsetWidth);
      });
    },
    close(width) {
      const offsetWidth =
        width || this.$refs["z-swiperaction-right"].offsetWidth;
      this.state = "";
      if (this.translateX >= 0) {
        this.translateX = 0;
        this.state = "close";
        return;
      }
      this.translateX += offsetWidth / 20;
      requestAnimationFrame(() => {
        this.close(offsetWidth);
      });
    },
    clickBtn(it, idx) {
      if (this.state == "open") this.close();
      if (this.state == "close") this.open();
      this.$emit("click", idx, it);
    },
  },
};
</script>

<style>
@import "../index.css";
.z-swiperaction {
  overflow: hidden;
  position: relative;
  padding: 0;
  margin: 0;
}
.z-swiperaction-content {
  width: 100%;
  overflow-x: hidden;
  z-index: 2;
  border: 0;
}
.z-swiperaction-right {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  background: #ccc;
  border: 0;
  height: 100%;
}
.z-swiperaction-right-button {
  padding: 0 14px;
  font-size: 12px;
}
</style>
