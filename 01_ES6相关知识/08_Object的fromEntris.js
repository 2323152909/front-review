const string = "name=廖浩东&age=18&height=1.88"
const queryString = new URLSearchParams(string)
console.log(queryString);
for (const index of queryString) {
    console.log(index);
}

// Object.fromEntries将entries格式的数据转成对象格式
const newStr = Object.fromEntries(queryString)
console.log(newStr);

const obj = {
    name: 'lhd',
    age: 18,
    height: 2.16
}
console.log(Array.from(obj));

console.log(Object.entries(obj))

const arr = [[1, 2], [3, 4]]

const arrObj = Object.fromEntries(arr)
console.log(arrObj);

const obj1 = {
    1: "a",
    "1": "b",
    "2": "c"
}

console.log(obj1[1]);
console.log(obj1["1"]);