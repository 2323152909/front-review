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
                console.log("resolve函数");
                this.status = PROMISE_STATUS_FULFILLED
                this.result = value
            }
        }
        const reject = (reason) => {
            if (this.status === PROMISE_STATUS_PENDING) {
                console.log("reject函数");
                this.status = PROMISE_STATUS_REJECTED
                this.reason = reason
            }
        }

        executor(resolve, reject)
    }

    then(onFulifilled, onRejected) {
        if (this.status === PROMISE_STATUS_FULFILLED) {
            onFulifilled(this.result)
        } else {
            onRejected(this.reason)
        }
    }
}

const promise = new HDPromise((resolve, reject) => {
    console.log("promise函数立即被执行");
    resolve("成功的信息")
    reject("错误信息")
})
promise.then(res => console.log(res), err => console.log(err))