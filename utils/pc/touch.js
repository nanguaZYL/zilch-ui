// 区分pc端和移动端
export default function (e, key = "changedTouches") {
  const touch = ["touchstart", "touchmove", "touchend"];
  const mouse = ["mousedown", "mousemove", "mouseup", "mouseleave"];
  const type = e.type.toLocaleLowerCase();
  if (touch.includes(type)) {
    // clientX screenX pageX radiusX
    return Object.assign(e[key][0], { type: e.type });
  }
  if (mouse.includes(type)) {
    // clientX layerX movementX offsetX pageX screenX
    return {
      clientX: e.clientX,
      clientY: e.clientY,
      pageX: e.pageX,
      pageY: e.pageY,
      screenX: e.screenX,
      screenY: e.screenY,
      layerX: e.layerX,
      layerY: e.layerY,
      movementX: e.movementX,
      movementY: e.movementY,
      offsetX: e.offsetX,
      offsetY: e.offsetY,
      type: e.type,
    };
  }
  console.error("出现预定义的事件类型 无法识别");
}
