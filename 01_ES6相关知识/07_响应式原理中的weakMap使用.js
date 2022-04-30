const obj1 = {
    name: "lhd",
    age: 18
}

const obj3 = {}
obj3.__proto__ = obj1
Object.defineProperty(obj3, "name", {
    configurable: true,
    enumerable: true,
    value: "mimi",
    writable: true
})
console.log(Object.getOwnPropertyDescriptor(obj3, "name"));

// console.log(obj1.name);
// obj1.name = "咪咪酱"

console.log(Object.getOwnPropertyDescriptors(obj3));

const obj2 = {
    name: "pcy",
    age: 17
}

function obj1NameFn1() {
    console.log("obj1姓名发生改变函数一");
}
function obj1NameFn2() {
    console.log("obj1姓名发生改变函数二");
}
function obj1AgeFn1() {
    console.log("obj1年龄发生改变函数一");
}
function obj1AgeFn2() {
    console.log("obj1年龄发生改变函数二");
}

function obj2NameFn1() {
    console.log("obj2姓名发生改变函数一");
}
function obj2NameFn2() {
    console.log("obj2姓名发生改变函数二");
}
function obj2AgeFn1() {
    console.log("obj2年龄发生改变函数一");
}
function obj2AgeFn2() {
    console.log("obj2年龄发生改变函数二");
}

// vue3响应式原理
const weakMap = new WeakMap()

const obj1Map = new Map()
obj1Map.set("name", [obj1NameFn1, obj1NameFn2])
obj1Map.set("age", [obj1AgeFn1, obj1AgeFn2])
weakMap.set(obj1, obj1Map)


const obj2Map = new Map()
obj2Map.set("name", [obj2NameFn1, obj2NameFn2])
obj2Map.set("age", [obj2AgeFn1, obj2AgeFn2])
weakMap.set(obj2, obj2Map)

console.log(weakMap.get(obj1));
console.log(weakMap.get(obj2));

// 使用Proxy/Object.defineProperty来监听
const targetMap = weakMap.get(obj1)
const fns = targetMap.get("name")
fns.forEach(item => item())