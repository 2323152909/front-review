const { reactive, watchFns } = require("coderlhd")

const obj = reactive({
    name: "廖浩东",
    age: 18,
    address: "重庆市",
    height: 1.80
})

watchFns(() => {
    console.log(obj.name);
    console.log(obj.age);
    console.log(obj.address);
    console.log(obj.height);
})

obj.name = "coderlhd"