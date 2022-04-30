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
    Father.call(this, name, age, friends)
    this.sno = sno
}

const child = new Child("廖浩东", 18, ["皮彩艳", "皮实验"], "100")
console.log(child)
child.say()


// 借用构造函数的弊端：
// 1、父类Father至少被调用了两次
// 2、child的原型对象上会多出一些属性，但是这些属性是没有必要存在的