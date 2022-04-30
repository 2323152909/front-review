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
function getDepend(target, key) {
    // 根据target 对象获取map的过程
    let map = targetMap.get(target)
    if (!map) {
        map = new Map()
        targetMap.set(target, map)
    }

    // 根据key 获取depend对象
    let depend = map.get(key)
    if (!depend) {
        depend = new Depend()
        map.set(key, depend)
    }

    return depend
}

let activeReactiveFn = null
function watchFn(fn) {
    activeReactiveFn = fn
    fn()
    // activeReactiveFn = null
}

const objProxy = new Proxy(obj, {
    get(target, key, receiver) {
        // 根据target 和 key 获取到depend 对象
        const depend = getDepend(target, key)
        depend.addDepend(activeReactiveFn)
        return Reflect.get(target, key, receiver)
    },
    set(target, key, newValue, receiver) {
        Reflect.set(target, key, newValue, receiver)
        const depend = getDepend(target, key)

        depend.notify()
    }
})

const infoProxy = new Proxy(info, {
    get(target, key, receiver) {
        // 根据target 和 key 获取到depend 对象
        const depend = getDepend(target, key)
        depend.addDepend(activeReactiveFn)
        return Reflect.get(target, key, receiver)
    },
    set(target, key, newValue, receiver) {
        Reflect.set(target, key, newValue, receiver)
        const depend = getDepend(target, key)

        depend.notify()
    }
})

watchFn(function () {
    console.log(objProxy.name, `obj 对象中name`);
    console.log("----------------");
})

watchFn(function () {
    console.log(objProxy.age, `obj 对象中age`);
    console.log("----------------");
})

watchFn(function () {
    console.log(infoProxy.address, `info 对象中address`);
    console.log("----------------");
})

objProxy.name = "廖浩东"
objProxy.age = "22"
infoProxy.address = "重庆丰都"
