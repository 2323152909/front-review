# Coderlhd包使用规则

## reactive使用规则

```js
const { reactive, watchFns } = require("coderlhd")
const obj = reactive({
    name: "name",
    age: 18
})

watchFns(() => {
    console.log("姓名", obj.name);
})

obj.name = "coderlhd"
```

### HDPromise使用规则

遵循promise a+规范
