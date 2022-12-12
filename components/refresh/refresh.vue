<template>
  <div
    class="z-refresh"
    style="height: 100%"
    @touchstart.stop="Touchstart"
    @touchmove.stop="Touchmove"
    @touchend.stop="Touchend"
    @mousedown="Mousedown"
    @mousemove="Mousemove"
    @mouseup="Mouseup"
    @mouseleave="Mouseleave"
    ref="scroll"
  >
    <div class="z-refresh-scroll">
      <div
        class="z-refresh-header"
        :style="{
          height: height + 'px',
          overflow: 'hidden',
        }"
      >
        <template v-if="height != 0">
          <!-- 下拉箭头 -->
          <z-icon
            v-show="state == 'wait'"
            icon="arrowdown"
            color="#409EFF"
            :class="[
              'z-refresh-arrow',
              height > (Max * 3) / 5 ? 'z-refresh-arrow-up' : '',
            ]"
          />
          <z-icon
            v-show="state == 'loading'"
            icon="shuaxin"
            color="#409EFF"
            class="z-refresh-loading"
          />
          <z-icon
            v-if="state == 'finish'"
            icon="complete"
            color="#67C23A"
            class="z-refresh-complete"
          />

          <p class="z-refresh-text">
            {{
              state == "wait"
                ? pullingText
                : state == "loading"
                ? loadingText
                : successText
            }}
          </p>
        </template>
      </div>
      <div
        class="z-refresh-auto"
        :style="{ transform: `translateY(${height}px)` }"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import zIcon from "../icon/icon.vue";
import mixin from "../mixin/touch.js";
import Touch from "../../utils/pc/touch.js";
export default {
  name: "z-refresh",
  mixins: [mixin],
  props: {
    // 控制显示隐藏
    value: { type: Boolean, default: false },
    pullingText: {
      type: String,
      default: "下拉刷新",
    },
    loadingText: {
      type: String,
      default: "刷新中...",
    },
    successText: {
      type: String,
      default: "刷新成功",
    },
  },
  components: { zIcon },
  watch: {
    value: {
      handler(v) {
        if (!v) {
          this.success();
        } else {
          this.height = this.Max;
          this.state = "loading";
          this.$nextTick(() => {
            this.$emit("refresh"); //通知组件开始刷新了
          });
        }
      },
      immediate: true,
      deep: true,
    },
  },
  data() {
    return {
      Touch,
      height: 0,
      defaultY: 0,
      offsetTop: 0,
      Max: 70,
      // 下拉状态 wait 等待 loading 加载中 finish 完成
      state: "wait",
      isFirst: false,
    };
  },
  mounted() {
    this.offsetTop = this.$refs.scroll.offsetTop; //元素距离顶部的高度
  },
  methods: {
    touchstart(e) {
      if (this.value) return;
      const { top } = this.$refs.scroll.getBoundingClientRect();
      if (top < this.offsetTop) return;
      this.defaultY = this.Touch(e).clientY;
    },
    touchmove(e) {
      if (this.value) return;
      if (this.state != "wait") return;
      if (this.defaultY != 0) {
        let differ = Math.round((this.Touch(e).clientY - this.defaultY) / 3);

        if (this.height == 0 && differ < 0) return;
        e.preventDefault();
        if (differ >= this.Max) {
          const diff = differ - this.Max;
          differ = this.Max + diff / 2;
        }
        this.height = differ;
      }
    },
    touchend() {
      if (this.value) return;
      if (this.state != "wait") return;
      if (this.defaultY == 0) return this.close();
      if (this.height < this.Max) return this.close();
      // 松开时判断是否拉到底
      this.$emit("input", true); //将组件工作状态改为true
    },
    success() {
      if (!this.isFirst) {
        this.isFirst = true;
        this.state = "wait";
        return;
      }
      this.state = "finish";
      setTimeout(() => {
        this.close();
      }, 1000);
    },
    async close() {
      if (!this.isFirst) {
        this.isFirst = true;
        this.state = "wait";
        return;
      }
      if (this.height <= 0) {
        // 重置所有状态
        this.height = 0;
        this.defaultY = 0;
        this.$nextTick(() => {
          this.state = "wait";
        });
        return;
      }
      this.height -= 2;
      requestAnimationFrame(() => {
        this.close();
      });
    },
    async reload() {
      await this.$nextTick();
      this.offsetTop = this.$refs.scroll.offsetTop; //元素距离顶部的高度
    },
  },
};
</script>

<style>
.z-refresh {
  position: relative;
}
.z-refresh-scroll {
  position: relative;
  /* overflow: auto; */
}
.z-refresh-header {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  overflow: hidden;
  transition-duration: 10ms;
  display: flex;
  align-items: center;
  justify-content: center;
}
.z-refresh-header span {
  margin-right: 10px;
}
.z-refresh-scroll {
  height: 100%;
}
.z-refresh-arrow {
  transition: all 0.3s;
}
.z-refresh-arrow-up {
  transform-origin: 50% 50%;
  transform: rotate(180deg);
}
.z-refresh-loading {
  animation: loading 1s linear infinite;
}
.z-refresh-complete {
  transform-origin: 50% 50%;
  animation: complete 0.7s;
}
.z-refresh-text {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 50%;
  text-overflow: ellipsis;
}
.z-refresh-auto {
  overflow: auto;
}
@keyframes loading {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes complete {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  /* 70% {
    opacity: 1;
    transform: scale(1.25);
  } */
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
