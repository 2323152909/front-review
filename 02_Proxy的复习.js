const obj = {
    name: "lhd",
    age: 18
}

const objProxy = new Proxy(obj, {
    get(target, key, receiver) {
        console.log("一次获取");
        return Reflect.get(target, key, receiver)
    },
    set(target, key, newValue, receiver) {
        console.log("一次设置");
        Reflect.set(target, key, newValue, receiver)
    }
})

// console.log(objProxy.name);
// objProxy.name = "廖浩东"
objProxy.age = 22