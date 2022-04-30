function Foo(name) {
    this.name = name
}

const f = new Foo('lhd')

console.log(f.__proto__.__proto__);
console.log(f.__proto__.prototype);
console.log(Foo.prototype.__proto__)
console.log(Foo.prototype.__proto__ === Object.prototype)
console.log(Foo.__proto__.__proto__)
console.log(Foo.__proto__ === Function.prototype)
console.log(Object.prototype)
console.log(Foo.__proto__)
console.log(Object.__proto__)
console.log(Object.__proto__ === Foo.__proto__)
console.log(Object.prototype.constructor)
console.log(Object.prototype.constructor === Object)
console.log(Function.prototype.constructor)
console.log(Function.prototype.constructor === Function)
console.log(Object.__proto__)
console.log(Function.prototype)
console.log(Object.__proto__ === Function.prototype)