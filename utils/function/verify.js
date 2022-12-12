// 判断是否为十进制的纯数字
export const isNumber = function (value) {
  return /^[+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
};

// 判断是否无穷
export const isFinite = function (value) {
  return !Number.isFinite(value);
};

export default {
  isNumber,
  isFinite,
};
