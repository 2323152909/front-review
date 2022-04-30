const PROMISE_STATUS_PENDING = "pending"
const PROMISE_STATUS_FULFILLED = "fulfilled"
const PROMISE_STATUS_REJECTED = "rejected"

class HDPromise {
    constructor(executor) {
        this.status = PROMISE_STATUS_PENDING
        this.result = undefined
        this.reason = undefined
        const resolve = (value) => {
            if (this.status === PROMISE_STATUS_PENDING) {
                this.status = PROMISE_STATUS_FULFILLED
                queueMicrotask(() => {
                    this.result = value
                    this.onFulifilled(this.result)
                })
            }
        }
        const reject = (reason) => {
            if (this.status === PROMISE_STATUS_PENDING) {
                this.status = PROMISE_STATUS_REJECTED
                queueMicrotask(() => {
                    this.reason = reason
                    this.onRejected(this.reason)
                })
            }
        }

        executor(resolve, reject)
    }

    then(onFulifilled, onRejected) {
        this.onFulifilled = onFulifilled
        this.onRejected = onRejected
    }
}

const promise = new HDPromise((resolve, reject) => {
    console.log("promise函数立即被执行");
    resolve("成功的信息")
    reject("错误信息")
})
promise.then(res => console.log("res: ", res), err => console.log("err: ", err))