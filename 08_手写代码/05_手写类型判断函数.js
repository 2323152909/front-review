function getType(value) {
    // 如果value为null或者undefined
    if (!value) {
        return value + ""
    }

    if (typeof value === "object") {
        let valueClass = Object.prototype.toString.call(value)
        let type = valueClass.split(" ")[1].split("")
        type.pop()
        return type.join("").toLowerCase()
    } else {
        return typeof value
    }
}

console.log(getType(null));
console.log(getType(undefined));
console.log(getType("lhd"));
console.log(getType(10));
console.log(getType(true));
console.log(getType({}));
console.log(getType([]));