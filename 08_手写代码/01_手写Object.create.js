function create(obj) {
    function Fun() { }
    Fun.prototype = obj
    return new Fun()
}

const obj = {
    name: "lhd"
}

const obj1 = Object.create(obj)
const obj2 = create(obj)

console.log(obj1);
console.log(obj2);
console.log(obj1.__proto__ === obj2.__proto__);