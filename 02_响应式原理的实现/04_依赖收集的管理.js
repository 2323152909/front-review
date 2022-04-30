class Depend {
    constructor() {
        this.reactiveFns = []
    }

    addDepend(fn) {
        this.reactiveFns.push(fn)
    }

    notify() {
        this.reactiveFns.forEach(fn => fn())
    }
}

const obj = {
    name: "curry",
    age: 18
}

const info = {
    address: "重庆市"
}
const targetMap = new WeakMap()

const objMap = new Map()
objMap.set("name", new Depend())
objMap.set("age", new Depend())


const infoMap = new Map()
infoMap.set("address", new Depend())

targetMap.set(obj, objMap)
targetMap.set(info, infoMap)

// 封装一个响应式的类对象
// const depend = new Depend()

function watchFn(fn, map) {
    map.addDepend(fn)
}

watchFn(function () {
    console.log(obj.name, "obj 对象中name");
    console.log("----------------");
}, objMap.get("name"))

watchFn(function () {
    console.log(info.address, "info 对象中address");
    console.log("---------------");
}, infoMap.get("address"))

watchFn(function () {
    console.log(obj.age, "obj 对象中的age");
    console.log("---------------");
}, objMap.get("age"))

const objProxy = new Proxy(obj, {
    get(target, value, receiver) {
        return Reflect.get(target, value, receiver)
    },
    set(target, key, newValue, receiver) {
        Reflect.set(target, key, newValue, receiver)
        objMap.get(key).notify()
    }
})

const infoProxy = new Proxy(info, {
    get(target, value, receiver) {
        return Reflect.get(target, value, receiver)
    },
    set(target, key, newValue, receiver) {
        Reflect.set(target, key, newValue, receiver)
        infoMap.get(key).notify()
    }
})

objProxy.name = "廖浩东"
objProxy.age = "22"
infoProxy.address = "重庆丰都"
