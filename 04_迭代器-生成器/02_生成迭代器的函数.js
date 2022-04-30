const nums = [1, 3, 5, 0]
const names = ["curry", "kobe", "james", "durant"]

function createArrayIterator(arr) {
    let index = 0
    return {
        next: function () {
            if (index < arr.length) {
                return { done: false, value: arr[index++] }
            } else {
                return { done: true, value: undefined }
            }
        }
    }
}

const numsIterator = createArrayIterator(nums)

console.log(numsIterator.next());
console.log(numsIterator.next());
console.log(numsIterator.next());
console.log(numsIterator.next());
console.log(numsIterator.next());

const namesIterator = createArrayIterator(names)

console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());
console.log(namesIterator.next());

// 创建一个无限的迭代器
function createNumberIterator() {
    let index = 0
    return {
        next: function () {
            return {
                done: false, value: index++
            }
        }
    }
}

const numberIterator = createNumberIterator()

console.log(numberIterator.next());
console.log(numberIterator.next());
console.log(numberIterator.next());
console.log(numberIterator.next());
console.log(numberIterator.next());
console.log(numberIterator.next());