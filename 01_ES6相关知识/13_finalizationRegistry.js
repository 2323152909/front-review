// ES12： weakRef 类
// WeakRef.prototype.deref:
// >如果原对象没有被销毁，那么获取到的是原对象
// >如果原对象已经被销毁，那么获取到的就是undefined

const finalRegistry = new FinalizationRegistry(value => {
    console.log("注册的对象被销毁", value);
})

let obj = {
    name: 'lhd',
    age: 18
}
// 创建对obj对象的弱引用
let info = new WeakRef(obj)

// 注册对obj对象的监控，当obj被 GC 垃圾回收机制回收后，会执行函数
finalRegistry.register(obj, "obj")

// 弱引用读取属性时，需要先调用 deref()方法
console.log(info.deref().name);
obj = null