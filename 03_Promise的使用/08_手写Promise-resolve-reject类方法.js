const PROMISE_STATUS_PENDING = "pending"
const PROMISE_STATUS_FULFILLED = "fulfilled"
const PROMISE_STATUS_REJECTED = "rejected"

// 工具函数
function execFunctionWithCatchError(execFn, value, resolve, reject) {
    try {
        const result = execFn(value)
        resolve(result)
    } catch (error) {
        reject(error)
    }
}

class HDPromise {
    constructor(executor) {
        this.status = PROMISE_STATUS_PENDING
        this.result = undefined
        this.reason = undefined
        this.return = undefined
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

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onFulifilled, onRejected) {
        const onRejectedDefault = err => { throw err }
        onRejected = onRejected || onRejectedDefault;
        const onFulfilledDefault = err => { throw err }
        onFulifilled = onFulifilled || onFulfilledDefault;
        return new HDPromise((resolve, reject) => {
            if (this.status === PROMISE_STATUS_FULFILLED && onFulifilled) {
                execFunctionWithCatchError(onFulifilled, this.result, resolve, reject)
            }
            if (this.status === PROMISE_STATUS_REJECTED && onRejected) {
                execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
            }

            // 将成功回调和失败回调放到数组中
            if (this.status === PROMISE_STATUS_PENDING) {
                if (onFulifilled) this.onFulifilledFns.push(() => {
                    execFunctionWithCatchError(onFulifilled, this.result, resolve, reject)
                })
                if (onRejected) this.onRejectedFns.push(() => {
                    execFunctionWithCatchError(onRejected, this.reason, resolve, reject)
                })
            }
        })
    }

    catch(onRejected) {
        return this.then(undefined, onRejected)
    }

    finally(onFinally) {
        this.then(() => {
            onFinally()
        }, () => {
            onFinally()
        })
    }

    static resolve(result) {
        return new HDPromise((resolve) => {
            resolve(result)
        })
    }

    static reject(reason) {
        return new HDPromise((resolve, reject) => {
            reject(reason)
        })
    }
}

HDPromise.resolve("Hello World").then(res => { console.log('res：', res); })
HDPromise.reject("error message").catch(err => { console.log("err：", err); })