// 响应式对象
const { reactive, watchFns } = require("./reactive");
const promise = require("./promise");
const debounce = require("./debounce");
const throttle = require("./throttle");
const deepClone = require("./deepClone");
const eventBus = require("./eventBus");
const downloadFile = require("./downloadFile");
const jsonToExcel = require("./jsonToExcel");

module.exports = {
  reactive,
  watchFns,
  promise,
  debounce,
  throttle,
  deepClone,
  eventBus,
  downloadFile,
  jsonToExcel,
};

export default {
  reactive,
  watchFns,
  promise,
  debounce,
  throttle,
  deepClone,
  eventBus,
  downloadFile,
  jsonToExcel,
};
