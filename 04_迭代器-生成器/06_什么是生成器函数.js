// 当遇到yield会暂停函数的执行
// 当遇到return会停止函数的执行
function* foo() {
    console.log("函数开始执行")
    const value1 = 100
    console.log("第一段代码：", value1);

    const n = yield value1

    const value2 = 200 * n
    console.log("第二段代码：", value2);

    try {
        yield value2
    } catch (error) {
        console.log("抛出异常：", error);
        yield error
    }

    const value3 = 300
    console.log("第三段代码：", value3)

    try {
        yield value3
    } catch (error) {
        console.log("抛出异常：", error);
        yield error
    }

    console.log("函数执行结束")
}

// 调用生成器函数会返回一个生成器对象
const generator = foo()

// 开始执行第一段代码
console.log("生成器返回值：", generator.next());
console.log("生成器返回值：", generator.next(20));
// 生成器抛出异常
// 在生成器函数中捕获异常，可以继续执行下去
generator.throw("error message")
console.log("生成器返回值：", generator.next());

// 生成器终止
// 相当于在生成器函数中return终止，后续函数不会继续执行下去
generator.return("终止")