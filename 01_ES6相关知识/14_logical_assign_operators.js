// 逻辑赋值运算
let x = null
// 1. &&= 逻辑与赋值运算
// x &&= 2 //(只有当x为true的时候，才会给x赋值为2)

// 2. ||= 逻辑或赋值运算
// x ||= 2 //(只有当x为false的时候，才会给x赋值为2)

// 3. ??= 逻辑空赋值运算
x ??= 2 // (只有当x为null或undefined的时候，才会给x赋值为2)

console.log(x);