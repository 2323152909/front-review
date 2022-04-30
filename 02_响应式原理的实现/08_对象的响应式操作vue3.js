// 
let activeReactiveFn = null

class Depend {
    constructor() {
        // this.reactiveFns = []
        this.reactiveFns = new Set() // 使用Set集合类型，防止函数重复添加
    }

    // addDepend(fn) {
    //     // this.reactiveFns.push(fn)
    //     this.reactiveFns.add(fn)
    // }

    depend() {
        // this.reactiveFns.push(activeReactiveFn)
        this.reactiveFns.add(activeReactiveFn)
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
    address: "重庆市",
    height: 1.80
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

function watchFn(fn) {
    activeReactiveFn = fn
    fn()
    // activeReactiveFn = null
}

// 响应式对象
function reactive(obj) {
    return new Proxy(obj, {
        get(target, key, receiver) {
            // 根据target 和 key 获取到depend 对象
            const depend = getDepend(target, key)
            // depend.addDepend(activeReactiveFn)
            depend.depend()
            return Reflect.get(target, key, receiver)
        },
        set(target, key, newValue, receiver) {
            Reflect.set(target, key, newValue, receiver)
            const depend = getDepend(target, key)

            depend.notify()
        }
    })
}

const objProxy = reactive(obj)

const infoProxy = reactive(info)

// infoProxy.address = "北京市"

const fooProxy = reactive({
    name: "foo"
})


watchFn(() => {
    console.log(objProxy.name);
})
watchFn(() => {
    console.log(objProxy.age);
})

watchFn(() => {
    console.log(infoProxy.address);
})

watchFn(() => {
    console.log(fooProxy.name);
})

console.log("第一次执行----------");

objProxy.age = 20
