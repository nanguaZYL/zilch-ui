import { isNumber, isFinite } from "./verify.js";

/**
 *
 * @param {String,Number} param
 */
export default function (param) {
  if (!param) return "";
  if (typeof param === "number") {
    if (isNaN(param)) {
      console.error(new Error("param不能为NaN!请确定传入正确参数!"));
    }
    if (isFinite(param)) {
      console.error(new Error("param不能为Infinity!请确定传入正确参数!"));
    }
    return param + "px";
  }
  if (typeof param === "string") {
    if (param == Number(param) && isNumber(param)) {
      // 代表为纯数字的字符串 手动添加单位
      return param + "px";
    }
    return param;
  }
}
