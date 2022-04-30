function Person(name, age) {
    this.name = name
    this.age = age
    this.say = () => {
        console.log(`我是:${this.name},我今年${this.age}岁`)
    }
}

function Student(name, age) {
    Person.call(this, [name, age])
}

// Student.prototype = new Person("廖浩东", 18)
Student.prototype = Object.create(Person.prototype)
console.log(Student.prototype.constructor)
Student.prototype.constructor = Student

const stu = new Student("廖浩东", 18)

const obj = Object.create(new Person())
console.log(obj)
console.log(obj.__proto__)
console.log(obj.__proto__.constructor)

console.log(stu)
console.log(Person.prototype)
console.log(stu.__proto__)
console.log(Student.prototype)
stu.say()

// console.log({}.__proto__)
// console.log([].__proto__)
// console.log(Array.prototype)
// console.log(Array.prototype.isPrototypeOf([]))
// console.log([].constructor)
// console.log(Array)
// console.log(Array.prototype.__proto__.__proto__)
// console.log(Object.prototype)
// console.log(Array.__proto__.__proto__)
// console.log(Object.__proto__.__proto__)
// console.log([].constructor === Array)
// console.log(Array.isArray([]))
// console.log([] instanceof Array)
// console.log([] instanceof Object)
// console.log({} instanceof Array)
// console.log(typeof [])
// console.log(typeof {})
// console.log("---------------------")
// // console.log("search".indexOf("", 10))
// // console.log("search".indexOf(""))
// // console.log("search".indexOf("a", null))

// console.log(Function.prototype)
// console.log(Function.__proto__)
// console.log(Function.prototype instanceof Array)
// console.log(Function.prototype instanceof Object)
// console.log(Function.prototype instanceof Function)
// console.log("--------------")
// console.log(Array.prototype instanceof Array)
// console.log(Array.prototype instanceof Object)
// console.log(Array.prototype instanceof Function)

console.log(Array.prototype)
console.log(Array.__proto__)

console.log(Object.__proto__ === Function.prototype)