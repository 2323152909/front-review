console.log("script start");
async function async1() {
    console.log("async1 start");
    await async2()
    console.log("async1 end");
}

async function async2() {
    console.log("async2");
}

setTimeout(() => {
    console.log("setTimeout0");
}, 0);

// 将会在3毫秒之后加入到微任务队列中
setTimeout(() => {
    console.log("setTimeout2");
}, 300);

setImmediate(() => {
    console.log("setImmediate");
})

process.nextTick(() => {
    console.log("nextTick1");
})

async1()

process.nextTick(() => console.log("nextTick2"))

new Promise(resolve => {
    console.log("promise1");
    resolve()
    console.log("promise2");
}).then(() => {
    console.log("promise3");
})

console.log("script end");

// script start
// async1 start
// async2
// promise1
// promise2
// script end
// nexttick1
// nexttick2
// async1 end
// promise3
// settimeout0
// setImmediate
// setTimeout2

// NODE事件循环顺序以及包含的微任务队列顺序
// main script -> nexttick(process.nextTick) -> other micro(Promise then) -> timers(setTimeout/setInterval) -> check(setImmediate)
// 之后才是宏任务
// 定时器如果有时间，会在时间结束之后才会将函数加入到微任务队列