/**
 * 判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
        判断传入上下文对象是否存在，如果不存在，则设置为 window 。
        将函数作为上下文对象的一个属性。
        判断参数值是否传入
        使用上下文对象来调用这个方法，并保存返回结果。
        删除刚才新增的属性
        返回结果
 * @param {Object} context //执行上下文对象，即为要绑定的this对象
 * @param {Array} args //参数
 * @returns 
 */

Function.prototype.myApply = function (context, args) {
    // 判断调用该apply 方法的是否为函数
    if (typeof this !== "function") {
        console.error("type error")
    }

    let result = null;
    // 判断传入的要绑定的上下文对象(this)是否存在，不存在则将上下文对象绑定为window
    context = context || window;

    // 将该函数绑定为上下文（this）的方法
    context.fn = this
    // 通过对象调用方法（函数作为对象的方法调用时，this指向该对象）
    result = context.fn(...args)
    // 删除添加的方法属性
    delete context.fn
    return result
}