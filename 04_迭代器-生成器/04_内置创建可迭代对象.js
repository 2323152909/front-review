// 可迭代对象 iterable protocol
const iterableObj = {
    arrs: ["curry", "kobe", "james", "durant"],
    [Symbol.iterator]: function () {
        let index = 0
        return {
            next: () => {
                if (index < this.arrs.length) {
                    return { done: false, value: this.arrs[index++] }
                } else {
                    return { done: true, value: undefined }
                }
            }
        }
    }
}

// 第一次生成的迭代器
// const iterator = iterableObj[Symbol.iterator]()

// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

// // 第二次生成的迭代器
// const iterator1 = iterableObj[Symbol.iterator]()
// console.log(iterator1.next());
// console.log(iterator1.next());
// console.log(iterator1.next());
// console.log(iterator1.next());

for (const item of iterableObj) {
    console.log(item);
}