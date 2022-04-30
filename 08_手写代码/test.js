const obj1 = {
    name: "lhd",
    age: 18
}
// const obj2 = Object.create(obj1)
const obj2 = {}
obj2.__proto__ = Object.create(obj1)
console.log(obj2);
console.log(obj2.__proto__);
console.log(obj2.__proto__.__proto__);