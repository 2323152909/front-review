/**
 * call 函数的实现步骤：
        判断调用对象是否为函数，即使是定义在函数的原型上的，但是可能出现使用 call 等方式调用的情况。
        判断传入上下文对象是否存在，如果不存在，则设置为 window 。
        处理传入的参数，截取第一个参数后的所有参数。
        将函数作为上下文对象的一个属性。
        使用上下文对象来调用这个方法，并保存返回结果。
        删除刚才新增的属性。
        返回结果。
 * @param {*} context //执行上下文对象，即为要绑定的this对象
 * @param  {...any} args 
 */
Function.prototype.myCall = function (context, ...args) {
    // 判断调用对象是否为函数
    if (typeof this !== "function") {
        console.error("type error")
    }

    let result = null;
    // 判断 context 是否传入，如果未传入则设置为 window
    context = context || window

    // 讲调用函数设置为对象的方法
    context.fn = this
    // 通过上下文对象调用函数，作为对象的方法进行调用，则方法的this指向该上下文对象
    result = context.fn(...args)
    // 将属性删除
    delete context.fn;
    return result
}