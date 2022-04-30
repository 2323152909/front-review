function iterate(obj) {
    var res = []
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            res.push(key + ": " + obj[key])
        }
    }
    return res
}