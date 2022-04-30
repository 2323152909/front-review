const obj = {
    name: "lhd",
    age: 18,
    height: 1.88
}

const objProxy = new Proxy(obj, {
    // 获取属性时的捕获器
    get(target, key, receiver) {
        // reciever是创建出来的代理对象
        // return target[key]
        return Reflect.get(target, key, receiver)
    },

    // 设置属性时的捕获器
    set(target, key, newValue, receiver) {
        // target[key] = value
        Reflect.set(target, key, newValue, receiver)
    },

    //监听 in 的捕获器
    has(target, key) {
        return Reflect.has(target, key)
    },

    // 监听delete的捕获器
    deleteProperty(target, key) {
        Reflect.deleteProperty(target, key)
    }
})

objProxy.name = "廖浩东"
objProxy.age = 11
objProxy.height = 1.90

console.log(objProxy.name);
console.log(objProxy.age);
console.log(objProxy.height);

console.log("name" in objProxy);