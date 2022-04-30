// 响应式对象
const reactive = require('./reactive')
const promise = require("./promise")
const debounce = require('./debounce')
const throttle = require('./throttle')
const deepClone = require("./deepClone")
const eventBus = require("./eventBus")

module.exports = {
    ...reactive,
    ...promise,
    ...debounce,
    ...throttle,
    ...deepClone,
    ...eventBus
}