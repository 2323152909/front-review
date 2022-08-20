function isObject(value) {
  const valueType = typeof value;
  return value !== null && (valueType === "object" || valueType === "function");
}

function deepClone(originValue, map = new WeakMap()) {
  // 判断是否为Set类型
  if (originValue instanceof Set) {
    return new Set([...originValue]);
  }

  // 判断是否为Map类型
  if (originValue instanceof Map) {
    return new Map([...originValue]);
  }

  // 判断如果是Symbol的value，那么新建一个Symbol
  if (typeof originValue === "symbol") {
    return new Symbol(originValue.description);
  }

  // 判断是否是函数类型，是函数类型则直接是同一个函数对象
  if (typeof originValue === "function") {
    return originValue;
  }

  // 判断是否为对象
  if (!isObject(originValue)) {
    return originValue;
  }

  // 判断map中是否存在originValue
  if (map.has(originValue)) {
    return map.get(originValue);
  }

  // 判断传入的是对象还是数组
  const newValue = Array.isArray(originValue) ? [] : {};
  map.set(originValue, newValue);
  for (const key in originValue) {
    newValue[key] = deepClone(originValue[key], map);
  }

  // 对Symbol的key进行特殊处理
  const symbolKeys = Object.getOwnPropertySymbols(originValue);
  for (const sKey of symbolKeys) {
    newValue[sKey] = deepClone(originValue[sKey], map);
  }

  return newValue;
}

module.exports = deepClone;
export default deepClone;
