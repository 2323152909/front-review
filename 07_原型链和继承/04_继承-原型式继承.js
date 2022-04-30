function Father(name, age, friends) {
    this.name = name
    this.age = age
    this.friends = friends
    this.say = function () {
        console.log(`我叫${this.name}`)
    }
}

function Child(name, age, friends, sno) {
    // 借用构造函数
    this.sno = sno
}

// 在借用构造函数实现继承中，这一步是为了将父类挂载在原型链上
var f = new Father()
Child.prototype = Object.create(f)
Child.prototype.constructor = Child

const child = new Child("廖浩东", 18, ["皮彩艳", "皮实验"], "100")
console.log(child)
child.say()
console.log(child.__proto__);
console.log(Child.prototype.__proto__)


// 借用构造函数的弊端：
// 1、父类Father至少被调用了两次
// 2、child的原型对象上会多出一些属性，但是这些属性是没有必要存在的