let currentFn = null;

class Dep {
    constructor() {
        this.subscribers = new Set()
    }

    addEffect(effect) {
        this.subscribers.add(effect)
    }

    depend() {
        this.subscribers.add(currentFn)
    }

    notify() {
        this.subscribers.forEach(fn => {
            fn()
        })
    }
}

const obj = {
    name: "lhd",
    age: 18
}

// 创建一个弱引用，对象作为key， 值随意
const targetMap = new WeakMap()

// 通过对象和键名获取到 dep 对象
function getDepend(target, key) {
    // 获取该对象对应的 map 对象
    let map = targetMap.get(target);
    // 如果之前没有设置过
    if (!map) {
        // 创建一个
        map = new Map();
        // 设置到weakMap对象中
        targetMap.set(target, map);
    }

    // 在对象的map 对象中获取到key 对应的 dep对象
    let dep = map.get(key);
    // 没有设置过
    if (!dep) {
        // 创建一个
        dep = new Dep();
        // 设置到对象的map 对象上
        map.set(key, dep);
    }

    return dep;
}

// vue2数据劫持方式
function reactiveVue2(obj) {
    Object.keys(obj).forEach(key => {
        let value = obj[key];
        const dep = getDepend(obj, key);

        Object.defineProperty(obj, key, {
            get() {
                dep.depend();
                return value;
            },
            set(newValue) {
                if (value !== newValue) {
                    value = newValue;
                }
                dep.notify();
            }
        })
    })

    return obj
}

// vue3数据劫持方式
function reactiveVue3(obj) {
    return new Proxy(obj, {
        get(target, key, receiver) {
            const dep = getDepend(obj, key);
            dep.depend()
            return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver) {
            const dep = getDepend(obj, key);
            Reflect.set(target, key, value, receiver)
            dep.notify()
        }
    })
}

const objProxy2 = reactiveVue2(obj)
const objProxy3 = reactiveVue3(obj)

function watchEffect(effect) {
    currentFn = effect;
    effect();
}

watchEffect(function() {
    console.log(obj.name);
})

console.log(obj.name);
obj.name = "廖浩东";