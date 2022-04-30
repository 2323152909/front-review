// 1.生成器替代迭代器
function* createArrayIterator(arr) {
    // 3.第三种写法
    // yield* 跟上一个可迭代对象
    yield* arr

    // 2.第二种写法
    // for (const value of arr) {
    //     yield value
    // }

    // 1.第一种写法
    // yield "curry" // {done: false, value: "curry"}
    // yield "kobe" // {done: false, value: "kobe"}
    // yield "james" // {done: false, value: "james"}
    // yield "durant" // {done: false, value: "durant"}

    // let index = 0;
    // return {
    //     next: function () {
    //         if (index < arr.length) {
    //             return { done: false, value: arr[index++] }
    //         } else {
    //             return { done: true, value: undefined }
    //         }
    //     }
    // }
}

const names = ["curry", "kobe", "james", "durant"]

const namesIterator = createArrayIterator(names)

console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());

// 2.创建一个函数，这个函数可以迭代一个范围内的数字
function* createRangeIterator(start, end) {
    for (let i = start; i < end; i++) {
        yield i
    }
}

const numsIterator = createRangeIterator(10, 20)
console.log(numsIterator.next());
console.log(numsIterator.next());
console.log(numsIterator.next());
console.log(numsIterator.next());

// 3.class案例
class ClassRoom {
    constructor(address, name, students) {
        this.address = address
        this.name = name
        this.students = students
    }

    entry(name) {
        this.students.push(name)
    }

    // [Symbol.iterator] = function* () {
    //     yield* this.students
    // }
    *[Symbol.iterator]() {
        yield* this.students
    }
}

const classRoom = new ClassRoom("重庆市", "计算机教师", ["curry", "kobe", "james", "durant"])
for (const iterator of classRoom) {
    console.log(iterator);
}
// const classRoomIterator = classRoom[Symbol.iterator]()
// console.log(classRoomIterator.next());
// console.log(classRoomIterator.next());
// console.log(classRoomIterator.next());
// console.log(classRoomIterator.next());
// console.log(classRoomIterator.next());