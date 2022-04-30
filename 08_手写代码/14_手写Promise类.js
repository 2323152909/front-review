class MyPromise {
    constructor(executor) {
        const resolve = (value) => {

        }

        const reject = (eror) => {

        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
}