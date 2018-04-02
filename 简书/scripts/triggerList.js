
//创建触发列表

function main() {

	var triggers = document.querySelectorAll("#trigger-menu > li");
	var container = $("#list-container");
	var attention = $("#attention-container");

    //停留处理
    var dynamic = function(event) {

    	if (event.type == "mouseover") {
    	    this.style.borderBottomWidth = "3px";
    	    this.style.borderBottomStyle = "solid";
    	    this.style.borderBottomColor = "#646464";
    	}

    	if (event.type == "mouseout") {
    		this.style.borderBottomWidth = "3px";
    	    this.style.borderBottomStyle = "solid";
    	    this.style.borderBottomColor = "transparent";
    	}
  
    };

    //点击处理
    var hanlder = function(event) {

	  //改变列表
	  if (this.id == "attention-user") {
	  	attention.style.height = "auto";
	  	container.style.height = 0;

	  } 

	  if (this.id == "fan") {
	  	container.style.height = "auto";
	  	attention.style.height = 0;
	  }

	  for (var i = 0, len = triggers.length; i < len; i++) {
		var trigger = triggers[i];
		trigger.className = "trigger-li";
	  }

	  this.className = "trigger-active";

    };

    //停留处理
	for (var i = 0, len = triggers.length; i < len; i++) {
		var trigger = triggers[i];
//		trigger.addEventListener("mouseover",dynamic);
//		trigger.addEventListener("mouseout",dynamic);
	}

    //点击处理
	for (var i = 0, len = triggers.length; i < len; i++) {
		var trigger = triggers[i];
		trigger.addEventListener("click",hanlder);
	}
	
	//复制并添加列表项
	var ul = container.firstElementChild;
	var li = ul.firstElementChild;

	for (var j = 0; j < 10; j++) {
	 var cli = li.cloneNode(true);
	 ul.appendChild(cli);
    }
    //attention 列表
    var aul = attention.firstElementChild;
	var ali = aul.firstElementChild;

	for (var aj = 0; aj < 2; aj++) {
	 var acli = ali.cloneNode(true);
	 aul.appendChild(acli);
    }


    	//动态按钮
    var checks = document.querySelectorAll(".fa-check");

    for (var p = 0,thelen = checks.length; p < thelen; p++) {

    	console.log(thelen);
    	let check = checks[p];
        let parent = check.parentNode;

        //在这个地方如果不用 this 的话,只会用循环中最后一个 parent 的值,也可以使用 let 解决这个问题
	    parent.onmouseover = function(event) {
		parent.firstElementChild.className = "fa fa-times";
		parent.firstElementChild.nextSibling.nodeValue = "取关";
	    };

	
	    parent.onmouseout = function(event) {
		parent.firstElementChild.className = "fa fa-check";
		parent.firstElementChild.nextSibling.nodeValue = "已关注";
	    };
    }

}

addLoadEvent(main);