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

    static all(promises) {
        return new HDPromise((resolve, reject) => {
            const values = []
            promises.forEach(promise => {
                promise.then(res => {
                    // console.log("res: ", res);
                    values.push(res)
                    if (values.length === promises.length) {
                        resolve(values)
                    }
                }).catch(err => {
                    // console.log("err: ", err);
                    reject(err)
                })
            })
        })
    }

    static allSettled(promises) {
        return new HDPromise((resolve, reject) => {
            const results = []
            promises.forEach(promise => {
                promise.then(res => {
                    // console.log("res: ", res);
                    results.push({ status: PROMISE_STATUS_FULFILLED, value: res })
                    if (results.length === promises.length) {
                        resolve(results)
                    }
                }).catch(err => {
                    // console.log("err: ", err);
                    results.push({ status: PROMISE_STATUS_REJECTED, value: err })
                    if (results.length === promises.length) {
                        resolve(results)
                    }
                })
            })
        })
    }

    static race(promises) {
        return new HDPromise((resolve, reject) => {
            promises.forEach(promise => {
                // promise.then(res => {
                //     resolve(res)
                // }).catch(err => {
                //     reject(err)
                // })
                promise.then(resolve, reject)
            })
        })
    }

    static any(promises) {
        return new HDPromise((resolve, reject) => {
            const reasons = []
            promises.forEach(promise => {
                promise.then(resolve).catch(err => {
                    reasons.push(err)
                    // 如果全都错了，就抛出
                    if (reasons.length === promises.length) {
                        reject(new AggregateError(reasons))
                    }
                })
            })
        })
    }
}

module.exports = {
    HDPromise
}