

var getDocId = function(id) {
	return document.getElementById(id);
};
/*头像响应菜单栏*****************************/

var auser = document.querySelector("#auser");

function showMenu() {
	var menu = document.createElement("div");
	menu.className = "res-menu";


	auser.addEventListener("mouseover",function(event) {
		auser.appendChild(menu);
	});

	auser.addEventListener("mouseout",function(event) {
 
		auser.removeChild(auser.lastChild);

	});
	
}

function removeMenu() {


}

addLoadEvent(showMenu);