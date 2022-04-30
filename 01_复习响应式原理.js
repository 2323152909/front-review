let activeReactiveFn = null

class Depend {
    constructor() {
        this.reactiveFns = new Set()
    }

    depend() {
        this.reactiveFns.add(activeReactiveFn)
    }

    notify() {
        return this.reactiveFns.forEach(fn => fn())
    }
}

const targetMap = new WeakMap()

const obj = {
    name: "lhd",
    age: 18,
    address: "重庆市",
    arr: [1, 2, 3]
}

const objMap = new Map()
objMap.set("name", new Depend())
objMap.set("age", new Depend())
objMap.set("arr", new Depend())
objMap.set("address", new Depend())

targetMap.set(obj, objMap)

function getDepend(target, key) {
    let map = targetMap.get(target)
    if (!map) {
        map = new Map()
        targetMap.set(target, map)
    }

    let depend = map.get(key)
    if (!depend) {
        depend = new Depend()
        map.set(key, depend)
    }

    return depend
}

function watchFn(fn) {
    activeReactiveFn = fn
    fn()
    // activeReactiveFn = null
}

function reactive(obj) {
    return new Proxy(obj, {
        get(target, key, receiver) {
            const depend = getDepend(target, key)
            depend.depend()
            return Reflect.get(target, key, receiver)
        },
        set(target, key, newValue, receiver) {
            Reflect.set(target, key, newValue, receiver)
            console.log(target, key, newValue);
            const depend = getDepend(target, key)
            depend.notify()
        }
    })
}

const objProxy = reactive(obj)

watchFn(function () {
    console.log(objProxy.name, "获取obj 中name");
})

watchFn(function () {
    console.log(objProxy.age, "获取obj 中age1");
})

watchFn(function () {
    console.log(objProxy.arr, "获取obj 中arr");
})

watchFn(function () {
    console.log(objProxy.address, "获取obj 中address");
})

// 在这里发现一个问题，后续还有watchFn方法时，他会将最后一个加入的方法也执行一次
// 这里我只有通过再调用一个空函数来解决
watchFn(() => { })

console.log("初始化阶段------------");

// objProxy.name = "廖浩东"
// objProxy.age = 20
objProxy.arr[0] = "改变"
// objProxy.arr.splice(0, 1, "改变")