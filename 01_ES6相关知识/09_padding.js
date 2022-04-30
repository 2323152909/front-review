const time = "22:18:00"
// 填充头
const newTime = time.padStart(19, "2021:12:10 ")
// 填充尾
const lastTime = newTime.padEnd(25, " 11:22")
console.log(newTime);
console.log(lastTime);