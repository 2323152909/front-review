function foo() { }

const fooProxy = new Proxy(foo, {
    apply(target, thisArg, argArray) {
        console.log(target, thisArg, argArray);
        return target.apply(thisArg, argArray)
    },
    construct(target, argArray, newTarget) {
        console.log(target, argArray, newTarget);
        return new target(...argArray)
    }
})

fooProxy.apply({ name: "lhd" }, ["cba", "nba"])
new fooProxy("cba", "nba")

