// 空值合并运算 ??
// const string = null
// const string = undefined
const string = ""

// 只有当 空值合并符 ?? 前面的值为 undefined 或 null 时，才会取默认值 
const result = string ?? "default value"

console.log(result);
