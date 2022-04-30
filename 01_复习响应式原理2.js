// 当前响应的函数
let reactiveFn = null
class Depend {
    constructor() {
        // 为了避免重复添加同一个函数，不使用数组，选择使用Set集合
        // 但是使用Set会出现一个问题，每次执行依赖函数时，会将最后一个添加的函数也执行一次，不管是不是对应属性的依赖函数
        // this.dependFns = []
        this.dependFns = new Set()
    }

    addDepend(fn) {
        // this.dependFns.push(fn)
        this.dependFns.add(fn)
    }

    depend() {
        // this.dependFns.push(reactiveFn)
        this.dependFns.add(reactiveFn)
    }

    notify() {
        this.dependFns.forEach(fn => {
            fn()
        })
    }
}

const obj = {
    name: "coderlhd",
    age: 18,
    arr: [{
        friend: "pcy"
    }, 2, 3]
}

const info = {
    address: "重庆市",
    height: 1.80
}

const targetMap = new WeakMap()
const objMap = new Map()
objMap.set("name", new Depend())
objMap.set("age", new Depend())

const infoMap = new Map()
infoMap.set("address", new Depend())
infoMap.set("height", new Depend())

targetMap.set(obj, objMap)
targetMap.set(info, infoMap)

function watchFns(fn) {
    reactiveFn = fn
    fn()
}

function getDepend(obj, key) {
    // 1.首先获取到 map
    let map = targetMap.get(obj)
    // 如果没有该map
    if (!map) {
        map = new Map()
        targetMap.set(obj, map)
    }

    // 2.寻找对应 key 的 depend
    let depend = map.get(key)
    if (!depend) {
        depend = new Depend()
        map.set(key, depend)
    }

    return depend
}

function reactive(obj) {
    return new Proxy(obj, {
        get: function (target, key, receiver) {
            const depend = getDepend(target, key)
            depend.depend()
            return Reflect.get(target, key, receiver)
        },
        set: function (target, key, newValue, receiver) {
            Reflect.set(target, key, newValue, receiver)
            const depend = getDepend(target, key)
            depend.notify()
        }
    })
}

const objProxy = reactive(obj)
const infoProxy = reactive(info)

function nameFunc() {
    // 这里通过代理获取属性时，或触发代理的 get 监听器
    console.log("姓名", objProxy.name);
    console.log("年龄", objProxy.age);
    console.log("数组", objProxy.arr);
}

function infoFunc() {
    console.log("地址", infoProxy.address);
    console.log("高度", infoProxy.height);
}

watchFns(nameFunc)
watchFns(infoFunc)
console.log("初始调用------------------");

// objProxy.name = "廖浩东"
// infoProxy.address = "重庆市丰都县"
objProxy.arr[0] = "lxb"