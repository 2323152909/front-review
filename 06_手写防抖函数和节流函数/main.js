const btn = document.querySelector("#btn");
function debounce(fn, delay = 500, immediate = false) {
    let timer = null
    let isInvoke = false

    const _debounce = function (...args) {
        clearTimeout(timer)
        if (immediate && !isInvoke) {
            fn.apply(this, args)
            isInvoke = true
        } else {
            timer = setTimeout(() => {
                fn.apply(this, args)
                isInvoke = false
            }, delay)
        }
    }

    // 取消功能
    _debounce.cancel = function () {
        if (timer) clearTimeout(timer)
        isInvoke = false
        timer = null
    }

    return _debounce
}
function btnClick(event) {
    console.log("点击了按钮", this, event);
}
btn.onclick = debounce(btnClick, 500, true);