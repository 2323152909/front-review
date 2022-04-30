const PROMISE_STATUS_PENDING = "pending"
const PROMISE_STATUS_FULFILLED = "fulfilled"
const PROMISE_STATUS_REJECTED = "rejected"

class HDPromise {
    constructor(executor) {
        this.status = PROMISE_STATUS_PENDING
        this.result = undefined
        this.reason = undefined
        this.onFulifilledFns = []
        this.onRejectedFns = []
        const resolve = (value) => {
            if (this.status === PROMISE_STATUS_PENDING) {
                // 添加微任务
                queueMicrotask(() => {
                    if (this.status !== PROMISE_STATUS_PENDING) return
                    this.status = PROMISE_STATUS_FULFILLED
                    this.result = value
                    this.onFulifilledFns.forEach(fn => fn(this.result))
                })
            }
        }
        const reject = (reason) => {
            if (this.status === PROMISE_STATUS_PENDING) {
                // 添加微任务
                queueMicrotask(() => {
                    if (this.status !== PROMISE_STATUS_PENDING) return
                    this.status = PROMISE_STATUS_REJECTED
                    this.reason = reason
                    this.onRejectedFns.forEach(fn => fn(this.reason))
                })
            }
        }

        executor(resolve, reject)
    }

    then(onFulifilled, onRejected) {
        if (this.status === PROMISE_STATUS_FULFILLED && onFulifilled) {
            onFulifilled(this.result)
        }
        if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
            onRejected(this.reason)
        }

        // 将成功回调和失败回调放到数组中
        this.onFulifilledFns.push(onFulifilled)
        this.onRejectedFns.push(onRejected)
    }
}

const promise = new HDPromise((resolve, reject) => {
    console.log("promise函数立即被执行");
    resolve("成功的信息")
    reject("错误信息")
})
promise.then(res => console.log("res1: ", res), err => console.log("err1: ", err))
promise.then(res => console.log("res2: ", res), err => console.log("err2: ", err))

// 在确定promise状态在后再调用then
setTimeout(() => {
    promise.then(res => console.log("res3: ", res), err => console.log("err3: ", err))
}, 1000)