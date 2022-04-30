function myInstanceOf(left, right) {
    // 获取对象的隐式原型
    let proto = Object.getPrototypeOf(left)
    const prototype = right.prototype //获取构造函数的显示原型

    // 判断构造函数的显示原型在不在对象的原型链上
    while (true) {
        // 判断如果原型查到最顶层为null时，证明构造函数的原型不在对象的原型链上
        if (!proto) return false;
        // 如果在，返回true
        if (proto === prototype) return true;

        // 将对象的隐式原型改为之前原型的隐式原型
        proto = Object.getPrototypeOf(proto)
    }
}

console.log(myInstanceOf([], Object));
console.log(Object.getPrototypeOf([]));
console.log(Object.getPrototypeOf(Object.getPrototypeOf([])));
console.log({}.__proto__);
console.log([].__proto__);
console.log(Array.prototype);