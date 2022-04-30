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
    },

    //监听 in 的捕获器
    has(target, key) {
        console.log(target, key);
        return key in target
    },

    // 监听delete的捕获器
    deleteProperty(target, key) {
        console.log(target, key);
        delete target[key]
    }
})

console.log("name" in objProxy);

delete objProxy.name
console.log(objProxy);