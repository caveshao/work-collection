//加载函数
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload !== "function") {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        };
    }
}
//window.onload 可以等于一个函数，可以在函数内调用函数来增加可以调用的函数