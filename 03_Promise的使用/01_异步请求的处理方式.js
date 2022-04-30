/**
 * 这种回调的方式有很多的弊端：
 *      1> 如果是我们自己封装的requestData， 那么我们在封装的时候必须要自己设计好callback名称，并且使用好
 *      2> 如果我们使用的是别人封装好的requestData或者是一些第三方库，那么我们必须去看别人的源码或者文档，才知道他的这个函数需要怎么去获取到结果
 */

// request.js
// 通过传入回调函数来接收结果
function requestData(url, successCallback, errorCallback) {
    // 模拟异步网络请求
    setTimeout(() => {
        if (url === "coderlhd") {
            let res = ["curry", "kobe", "james"]
            successCallback(res)
        } else {
            let err = "url请求失败，请正确传递参数"
            errorCallback(err)
        }
    }, 3000)
}

// main.js
requestData('coderlhd', (res) => { console.log(res); }, (err) => { console.log(err); })

// 更好的方案 Promise承诺(规范好了所有的代码编写逻辑)
function requestData2(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "coderlhd") {
                let res = ["curry", "kobe", "james"]
                resolve(res)
            } else {
                let err = "url请求失败，请正确传递参数"
                reject(err)
            }
        }, 3000)
    })
}

requestData2("coderwhy").then(res => { console.log(res); }).catch(err => { console.log(err); })