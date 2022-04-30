function Father() {
    this.name = "父类"
    this.friends = []
    this.say = function () {
        console.log(`我叫${this.name}`)
    }
}

function Child() {
    this.sno = "sno"
    // this.__proto__ = new Father(name, age, friends)
}

const f = new Father()
Child.prototype = f
// Child.prototype = new Father()

Child.prototype.studing = function () {
    console.log(`我是${this.name}，我正在学习`)
}

const cld1 = new Child()

cld1.say()
cld1.studing()
// console.log(Child.prototype.constructor)//Father

// 原型链实现击沉的弊端
// 1、打印Child的实例对象，某些属性是看不到的
// 2、创建出来两个Child实例对象，父类的应用类型会互相影响
const cld2 = new Child()
cld1.friends.push("廖浩东")
console.log(cld1.friends)
console.log(cld2.friends)

// 3、实现类的时候都没有传递参数