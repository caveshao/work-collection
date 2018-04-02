
function $(str) {
	var object = document.querySelector(str);
	return object;
}


function changeAttrribute(object ,attribute ,value) {

	object.setAttribute(attribute,value);
}

//改变个人介绍///////////////////////////////

(function test() {

	var description = $(".js-intro");
	var change = $("#change");

	change.onclick = function() {
		description.style.height = 0;
		changeDescription();
	};

})();

function changeDescription() {

	var description = $(".js-intro");
	var change = $("#change");
	var transform = $("#transform");

	var textarea = document.createElement("textarea");
	textarea.value = description.firstChild.nodeValue;
    transform.appendChild(textarea);

    var submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "保存";
    submit.id = "submit";
    transform.appendChild(submit);

    var del = document.createElement("a");
    var deltext = document.createTextNode("取消");
    del.appendChild(deltext);
    del.id = "del";
    changeAttrribute(del,"href","#");
    transform.appendChild(del);



    change.onclick = null;

    submit.onclick = function() {

     //点击提交按钮改变个人描述,
     //description.firstChild.nodeValue = textarea.value;加在这里同样可以。
     description.style.height = "auto";
     transform.style.height = 0;
     changeContent();

    };

    del.onclick = function() {

    //点击按钮取消改变操作
	textarea.value = description.firstChild.nodeValue;
    description.style.height = "auto";
    transform.style.height = 0;
    delClick();

    };

}

//取消改变操作，恢复事件监听
function delClick() {

	var description = $(".js-intro");
	var change = $("#change");
	var transform = $("#transform");

	change.onclick = function() {
	description.style.height = 0;
	transform.style.height = "auto";
    };
 
};

//改变描述
function changeContent() {

	var description = $(".js-intro");
	var change = $("#change");
	var transform = $("#transform");
	var textarea = $("textarea");

    description.firstChild.nodeValue = textarea.value;

	change.onclick = function() {
	description.style.height = 0;
	transform.style.height = "auto";
    };

}

/////////////////////////////////////////////