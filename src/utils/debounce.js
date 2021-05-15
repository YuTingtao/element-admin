/*
 * 防抖函数：短时间内多次触发同一事件，只执行最后一次
 * @param fn 目标函数
 * @param wait 延迟执行毫秒数
 * @param immediate 是否先执行一次
 * 
 * 在vue中使用方法：handler: debounce(fn, wait, immediate)
 */
export default (fn, wait = 300, immediate = false) => {
    var timer;
    return function () {
        var context = this, args = arguments;
        if (timer) clearTimeout(timer);
        if (immediate) {
            var callNow = !timer;
            timer = setTimeout(function() {
                timer = null;
            }, wait);
            if (callNow) fn.apply(context, args);
        } else {
            timer = setTimeout(function() {
                fn.apply(context, args);
            }, wait);
        }
    }
}
