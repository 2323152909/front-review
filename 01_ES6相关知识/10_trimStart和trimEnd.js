const string = "    我是一个字符串      "

// 去除开始的空格
const preString = string.trimStart()
// 去除结尾的空格
const lastString = string.trimEnd()
// 去除头部和尾部的空格
const trimString = string.trim()
console.log(string, string.length);
console.log(preString, preString.length);
console.log(lastString, lastString.length);
console.log(trimString, trimString.length);