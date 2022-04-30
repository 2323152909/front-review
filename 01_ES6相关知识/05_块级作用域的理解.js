// 块级作用域
// ES5是没有块级作用域的
// 块级作用域对于var没有意义
// 只有对于ES6使用let、const、function、class声明的起作用
{
    let message = "你好啊，李银河"
    var name = "廖浩东"

    console.log(message);
}

// 全局作用域
// 函数作用域
function foo() {
    var res = "函数作用域"
    console.log(res);
}

// console.log(messaeg);
console.log(name);