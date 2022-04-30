Promise.resolve().then(() => {
    return new Promise((resolve) => {
        resolve("Promise");
    }).then(res => {
        console.log(res);
    })
}).then(() => {
    console.log("promise then");
})

Promise.resolve().then(() => {
    console.log(0);

    // 1.直接return一个值 相当于resolve(4)
    // return 4

    // 2.return thenable的值
    // return的不是一个普通的值，所以微任务会向后移一位
    // return {
    //     then: function (resolve) {
    //         // 可能会有大量计算
    //         resolve(4)
    //     }
    // }

    // 3.return Promise
    // 不是普通的值，多加一次微任务
    // Promise.resolve(4)， 再多加一次微任务
    // 一共多加两次微任务
    // return Promise.resolve(4)

    // 4.return Promise
    // 与上一个情况相同
    return new Promise((resolve) => {
        resolve(4)
    })
}).then((res) => {
    console.log(res);
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() => {
    console.log(6);
})