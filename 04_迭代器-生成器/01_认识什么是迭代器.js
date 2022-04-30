// 编写一个迭代器
const iterator = {
    next: function () {
        return { done: true, value: "curry" }
    }
}

const names = ["curry", "kobe", "james", "durant"]

// 创建一个迭代器对象访问数组
let index = 0
const namesIterator = {
    next: function () {
        if (index < names.length) {
            return { done: false, value: names[index++] }
        } else {
            return { done: true, value: undefined }
        }
    }
}

console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());