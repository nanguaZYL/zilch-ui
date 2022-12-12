import System from "../../utils/function/system.js";

export const data = {
  methods: {
    Touchstart(e) {
      if (!System.isMobile) return;
      this.touchstart(e);
    },
    Touchmove(e) {
      if (!System.isMobile) return;
      this.touchmove(e);
    },
    Touchend(e) {
      if (!System.isMobile) return;
      this.touchend(e);
    },
    Mousedown(e) {
      if (!System.isPC) return;
      this.touchstart(e);
    },
    Mousemove(e) {
      if (!System.isPC) return;
      this.touchmove(e);
    },
    Mouseup(e) {
      if (!System.isPC) return;
      this.touchend(e);
    },
    Mouseleave(e) {
      if (!System.isPC) return;
      this.touchend(e);
    },
  },
};

// 移动端触摸事件
export default data;
