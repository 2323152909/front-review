const obj = {
    name: "lhd",
    age: 18,
    height: 1.88
}

const objProxy = new Proxy(obj, {
    // 获取属性时的捕获器
    get(target, key, receiver) {
        console.log(target, key, receiver);
        return target[key]
    },

    // 设置属性时的捕获器
    set(target, key, newValue, receiver) {
        console.log(target, key, newValue, receiver);
        target[key] = value
    }
})

objProxy.name = "廖浩东"
objProxy.age = 11
objProxy.height = 1.90

console.log(objProxy.name);
console.log(objProxy.age);
console.log(objProxy.height);