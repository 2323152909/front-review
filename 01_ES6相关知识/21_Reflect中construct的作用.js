function Student(name, age) {
    this.name = name
    this.age = age
}

function Teacher() { }

// const stuProxy = new Proxy(Student, {
//     construct(target, argArray, newTarget) {
//         console.log(target, argArray, newTarget);
//         return Reflect.construct(target, argArray, Teacher)
//     }
// })

// const teacher = new stuProxy("lhd", 18)
const teacher = Reflect.construct(Student, ['廖浩东', 18], Teacher)
console.log(teacher);
console.log(teacher.__proto__ === Teacher.prototype);