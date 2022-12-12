import Touch from "../pc/touch.js";

export default function (e, ref) {
  const { top, left } = ref.getBoundingClientRect();
  const coord = Touch(e, "targetTouches");
  return {
    offsetX: Math.round(coord.clientX - left),
    offsetY: Math.round(coord.clientY - top),
  };
}
