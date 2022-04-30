const obj = {
    name: "lhd",
    age: 18
}

const reactiveFns = []

function watchFn(fn) {
    reactiveFns.push(fn)
}

function foo() {
    const newName = obj.name
    console.log(newName);
    console.log(obj.name);
    console.log("你好呀，李银河");
    console.log("hello world");
    console.log("----------------");
}

watchFn(foo)

function bar() {
    console.log("我是无关函数");
    console.log("我无关乎响应式原理");
}
foo()

const objProxy = new Proxy(obj, {
    get(target, value, receiver) {
        return Reflect.get(target, value, receiver)
    },
    set(target, key, newValue, receiver) {
        Reflect.set(target, key, newValue, receiver)
        reactiveFns.forEach(item => item())
    }
})

objProxy.name = "廖浩东"
