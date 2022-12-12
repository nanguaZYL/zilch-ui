<template>
  <canvas
    class="z-signature"
    ref="canvas"
    :width="attribute.width"
    :height="attribute.height"
    :style="{ height: turnPX(height) }"
    @touchstart.prevent="Touchstart"
    @touchmove.prevent="Touchmove"
    @touchend.prevent="Touchend"
    @mousedown.prevent="Mousedown"
    @mousemove.prevent="Mousemove"
    @mouseup.prevent="Mouseup"
    @mouseleave.prevent="Mouseleave"
  ></canvas>
</template>

<script>
import Touch from "../mixin/touch.js";
import turnPX from "../../utils/function/turnPX.js";
import getOffset from "../../utils/function/getOffset.js";
export default {
  name: "z-signature",
  mixins: [Touch],
  props: {
    height: { type: [String, Number], default: 200 },
    type: { type: String, default: "image/png" },
  },
  data() {
    return {
      turnPX,
      getOffset,
      canvas: null,
      ctx: null,
      path: {},
      attribute: {},
      timer: null,
      cache: [],
      state: false,
    };
  },
  mounted() {
    this.reload();
  },
  methods: {
    touchstart(e) {
      this.path = this.getOffset(e, this.$refs.canvas);
      this.state = true;
    },
    touchmove(e) {
      if (!this.state) return;
      const now = this.getOffset(e, this.$refs.canvas);
      this.ctx.beginPath();
      this.ctx.moveTo(this.path.offsetX, this.path.offsetY);
      this.ctx.lineTo(now.offsetX, now.offsetY);
      this.ctx.stroke();
      this.ctx.closePath();
      this.path = now;
      this.$emit("input", this.canvas.toDataURL(this.type));
    },
    touchend() {
      this.state = false;
      this.$emit("change", this.canvas.toDataURL(this.type));
    },
    clear() {
      this.ctx.clearRect(0, 0, this.attribute.width, this.attribute.height);
    },
    export(fn, type = "blob") {
      if (typeof fn != "function") fn = function () {};
      if (type == "blob") {
        this.canvas.toBlob(fn);
      } else if (type == "base64") {
        fn(this.canvas.toDataURL(this.type));
      }
    },
    reload() {
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext("2d");
      this.attribute = this.$refs.canvas.getBoundingClientRect();
    },
  },
};
</script>

<style>
.z-signature {
  width: 100%;
}
</style>
