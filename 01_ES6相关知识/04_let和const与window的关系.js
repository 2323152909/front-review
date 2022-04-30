var message = "var定义的message"
let letMessage = "let定义的message"
const constMessage = "consr定义的message"


// let和const 定义的变量和常量，不会被添加到window对象中
console.log(window.message);
console.log(window.letMessage)
console.log(window.constMessage)