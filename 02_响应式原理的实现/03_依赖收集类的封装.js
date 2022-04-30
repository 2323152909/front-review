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
    name: "lhd",
    age: 18
}

// 封装一个响应式的类对象
const depend = new Depend()

function watchFn(fn) {
    fn()
    depend.addDepend(fn)
}

watchFn(function () {
    const newName = obj.name
    console.log(newName);
    console.log(obj.name);
    console.log("你好呀，李银河");
    console.log("hello world");
    console.log("----------------");
})

function bar() {
    console.log("我是无关函数");
    console.log("我无关乎响应式原理");
}

const objProxy = new Proxy(obj, {
    get(target, value, receiver) {
        return Reflect.get(target, value, receiver)
    },
    set(target, key, newValue, receiver) {
        Reflect.set(target, key, newValue, receiver)
        depend.notify()
    }
})

objProxy.name = "廖浩东"
