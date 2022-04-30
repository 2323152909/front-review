const obj = {
    name: "lhd",
    age: 18,
    height: 1.88
}

Object.keys(obj).forEach(key => {
    let value = obj[key]
    Object.defineProperty(obj, key, {
        get() {
            console.log(`获取到${key}成功`);
            return value
        },
        set(newValue) {
            console.log(`设置${key}成功`);
            value = newValue
        }
    })
})

obj.name = "廖浩东"
obj.age = 11
obj.height = 1.90

console.log(obj.name);
console.log(obj.age);
console.log(obj.height);