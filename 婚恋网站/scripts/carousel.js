function $(element) {
    return document.querySelectorAll(element);
}
var timeout;
function carousel() {
    var items = $("div.item");
    var carousel = document.querySelector("div.carousel");
    var control = document.querySelector("div.control");
    var controls = control.getElementsByTagName("span");
    //将图片由左到右排列好
    for (var i = 0; i < items.length; i++) {
        items[i].control = controls[i];//绑定控件
        items[i].pos = 1000 * i;
        items[i].style.left = items[i].pos + "px";
    }
    items.pos = items[i - 1].pos;
    setTimeout(function () {
        loop(items);
    }, 3000);
    //暂停事件
    carousel.onmouseover = function() {
        if (timeout) {
            clearTimeout(timeout);
        }
    };
    carousel.onmouseout = function() {
        loop(items);
    };
    //注册及登录的点击事件
    document.querySelector("a.login").onclick = function () {
        var loninPanel = document.querySelector("div.login-panel");
        if (loninPanel.style["display"] == "none") {
            loninPanel.style["display"] = "block";
        } else {
            loninPanel.style["display"] = "none";
        }
    };
    document.querySelector("input.log-btn").onclick = function () {
        var loninPanel = document.querySelector("div.login-panel");
        loninPanel.style["display"] = "none";
    };
    document.querySelector("a.sup").onclick = function () {
        var supPanel = document.querySelector("div.sup-panel");
        if (supPanel.style["display"] == "none") {
            supPanel.style["display"] = "block";
        } else {
            supPanel.style["display"] = "none";
        }
    };
    document.querySelector("input.sup-btn").onclick = function () {
        var supPanel = document.querySelector("div.sup-panel");
        supPanel.style["display"] = "none";
    }
}

//为了传递对象，重写 setTimeout 函数
var $st = window.setTimeout;
// 这里覆盖了setTimeout方法，如果需要原始方法的时候，可以使用$st
window.setTimeout = function (funRef, delayTime) {
    if (typeof funRef === 'function') {
        var args = Array.prototype.slice.call(arguments, 2);
        var f = function () {
            funRef.apply(null, args);
        }; // 返回无参数方法
        return $st(f, delayTime);//调用无参数方法
    }
    return $st(funRef, delayTime);//如果不是函数，则用原方法
};

//进行轮播
function loop(items) {
    var ifstop = false;
    if (timeout) {
        clearTimeout(timeout);
    }
    for (var i = 0; i < items.length; i++) {
        items[i].pos -= 100;
        items[i].style.left = items[i].pos + "px";
        //根据位置判断控制条颜色
        if (items[i].pos >= 0 && items[i].pos < 1000) {
            items[i].control.style["background-color"] = "#e40082";
        } else {
            items[i].control.style["background-color"] = "#f8d6e8";
        }
        if (items[i].pos <= -1000) {
            items[i].pos = items.pos;
            items[i].style.left = items[i].pos + "px";
            ifstop = true;
        }
    }
    if (ifstop) {
        timeout = setTimeout(function () {
            loop(items);
        }, 9000);
    } else {
        timeout = setTimeout(function () {
            loop(items);
        }, 10);
    }
}


addLoadEvent(carousel);