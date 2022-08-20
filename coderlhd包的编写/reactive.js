// 当前响应的函数
let reactiveFn = null;
class Depend {
  constructor() {
    // 为了避免重复添加同一个函数，不使用数组，选择使用Set集合
    // 但是使用Set会出现一个问题，每次执行依赖函数时，会将最后一个添加的函数也执行一次，不管是不是对应属性的依赖函数
    // this.dependFns = []
    this.dependFns = new Set();
  }

  addDepend(fn) {
    // this.dependFns.push(fn)
    this.dependFns.add(fn);
  }

  depend() {
    // this.dependFns.push(reactiveFn)
    this.dependFns.add(reactiveFn);
  }

  notify() {
    this.dependFns.forEach((fn) => {
      fn();
    });
  }
}

const targetMap = new WeakMap();
const objMap = new Map();

function watchFns(fn) {
  reactiveFn = fn;
  fn();
}

function getDepend(obj, key) {
  // 1.首先获取到 map
  let map = targetMap.get(obj);
  // 如果没有该map
  if (!map) {
    map = new Map();
    targetMap.set(obj, map);
  }

  // 2.寻找对应 key 的 depend
  let depend = map.get(key);
  if (!depend) {
    depend = new Depend();
    map.set(key, depend);
  }

  return depend;
}

// 做一个响应式对象
function reactive(obj) {
  Object.keys(obj).forEach((key) => {
    objMap.set(key, new Depend());
  });
  targetMap.set(obj, objMap);

  return new Proxy(obj, {
    get: function (target, key, receiver) {
      const depend = getDepend(target, key);
      depend.depend();
      return Reflect.get(target, key, receiver);
    },
    set: function (target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver);
      const depend = getDepend(target, key);
      depend.notify();
    },
  });
}

module.exports = {
  reactive,
  watchFns,
};
export default {
  reactive,
  watchFns,
};
