/*
 * 节流函数：连续触发事件但是在n秒中只执行一次函数
 * @param fn 目标函数
 * @param wait 延迟执行毫秒数
 * 
 * 在vue中使用方法：handler: throttle(fn, wait)
 */
export default (fn, wait) => {
    var timeout;
    return function() {
        var context = this, args = arguments;
        if (!timeout) {
            timeout = setTimeout(function() {
                timeout = null;
                fn.apply(context, args);
            }, wait);
        }
    }
}