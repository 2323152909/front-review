const obj = {
    _name: "lhd",
    get name() {
        return this._name
    },
    set name(newValue) {
        this._name = newValue
    }
}

const objProxy = new Proxy(obj, {
    // 获取属性时的捕获器
    get(target, key, receiver) {
        // reciever是创建出来的代理对象
        console.log("objProxy代理对象中的get被访问-------");
        // 传入第三个参数化，会将上面对象中的this改为代理对象
        return Reflect.get(target, key, receiver)
    },

    // 设置属性时的捕获器
    set(target, key, newValue, receiver) {
        console.log("objProxy代理对象中的set被访问------");
        // 传入第三个参数化，会将上面对象中的this改为代理对象

        Reflect.set(target, key, newValue, receiver)
    },
})

objProxy.name = "廖浩东"

console.log(objProxy.name);