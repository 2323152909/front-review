function objectFactory(constructor, ...args) {
    let newObj = null;
    // 取出第一个参数
    // const constructor = Array.prototype.shift.call(arguments)
    let result = null
    // 判断第一个参数是否是函数
    if (typeof constructor !== "function") {
        console.error("type error")
        return
    }
    // 创建一个空对象，对象的原型为构造函数的prototype对象
    newObj = Object.create(constructor.prototype)
    // 将this指向新创建的对象，并执行函数
    result = constructor.apply(newObj, args)
    console.log("result", result);
    // 判断返回对象
    let flag = result && (typeof result === "object" || typeof result === "function")
    console.log(flag);
    // 判断返回结果
    return flag ? result : newObj
}

function fun() {
    return "lhd"
}

function Person(name, age) {
    this.name = name
    this.age = age

    return this
}

function Father(name, age) {
    const obj = {}
    obj.name = name
    obj.age = age

    return obj
}

const obj = objectFactory(fun)
console.log(obj);

const p = objectFactory(Person, "廖浩东", 18)
console.log(p);

const f = objectFactory(Father, "廖浩东", 18)
console.log(f);