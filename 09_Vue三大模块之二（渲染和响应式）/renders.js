// 生成vnode函数
const h = (tag, props, children) => {
    return {
        tag,
        props,
        children
    }
}

// 挂载函数
const mount = (vnode, parent) => {
    // vnode-> element
    // 1.创建出真实的原生，并且在vnode上保留el
    const el = vnode.el = document.createElement(vnode.tag)

    // 2.处理props
    if (vnode.props) {
        for (const key in vnode.props) {
            const value = vnode.props[key]

            // 如果是on开头的字符串，则是个监听函数
            if (key.startsWith("on")) {
                // el[key] = value
                el.addEventListener(key.slice(2).toLowerCase(), value)
            } else {
                el.setAttribute(key, value)
            }
        }
    }

    // 3.处理children
    if (vnode.children) {
        if (vnode.children instanceof Array) {
            // for (const key in vnode.children) {
            //     mount(vnode.children[key], el)
            // }
            vnode.children.forEach(item => {
                mount(item, el)
            })
        } else if (typeof vnode.children === "string") {
            el.textContent = vnode.children
        }
    }

    // 4.将el挂载到DOM树
    parent.appendChild(el)
}

// patch上树函数
const patch = (n1, n2) => {
    if (n1.tag !== n2.tag) {
        // 通过n1拿到父元素
        const n1ElParent = n1.el.parentElement;
        // 移除当前元素
        n1ElParent.removeChild(n1.el);
        // 挂载新元素
        mount(n2, el)
    } else {
        // 1.取出element对象，并且在n2中进行保存
        const el = n2.el = n1.el

        // 2.处理props
        const oldProps = n1.props || {}
        const newProps = n2.props || {}

        // 2.1获取所有的newProps添加到el
        for (const key in newProps) {
            if (newProps[key] === oldProps[key]) continue;
            el.setAttribute(key, newProps[key])
        }

        // 2.2删除旧的props
        for (const key in oldProps) {
            if (!(key in newProps)) { //判断是否在新的props中存在
                const value = oldProps[key]
                if (key.startsWith("on")) { // 对事件监听的判断
                    el.removeEventListener(key.slice(2).toLowerCase(), value);
                } else {
                    el.removeAttribute(key);
                }
            }
        }

        // 3.处理children
        const oldChildren = n1.children || []
        const newChildren = n2.children || []

        if (typeof newChildren === "string") { // 情况一：newChildren本身是一个string
            // 边界情况（edge case）
            if (typeof oldChildren === "string") {
                if (newChildren !== oldChildren) {
                    el.textContent = newChildren
                }
            } else {
                el.innerHTML = newChildren
            }
        } else { // 情况二：newChildren本身是一个数组
            if (typeof oldChildren === "string") {
                el.innerHTML = ""
                newChildren.forEach(item => {
                    mount(item, el)
                })
            } else {
                // 1.前面有相同节点的原生进行patch操作（这里暂时未考虑换位置）
                // 拿到两个children最短的长度
                const commonLenth = Math.min(oldChildren.length, newChildren.length)

                for (let i = 0; i < commonLenth; i++) {
                    patch(oldChildren[i], newChildren[i])
                }

                // 2.newChildren.length > oldChildren.length
                if (newChildren.length > oldChildren.length) {
                    newChildren.slice(oldChildren.length).forEach(item => {
                        mount(item, el)
                    })
                }

                // 3.newChildren.length < oldChildren.length
                if (newChildren.length < oldChildren.length) {
                    // 将之前多余的子节点移除
                    oldChildren.slice(newChildren.length).forEach(child => {
                        el.removeChild(child.el)
                    })
                }
            }
        }
    }
}