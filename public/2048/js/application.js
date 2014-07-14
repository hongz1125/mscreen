window.requestAnimationFrame(function () {
  var game = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);

});



var ws = new WebSocket('ws://test.com:8001');
ws.onopen = function(e){
	console.log("view连接成功;");
	var userId = Math.round(Math.random()*100000000);
	ws.send('{"userId":"'+userId+'"}');
}
ws.onclose = function(e){
	console.log("view服务器关闭;");
}
ws.onerror = function(e){
	console.log("连接出错;");
}
ws.onmessage = function(e){
	var obj = JSON.parse(e.data);
	if(obj.action != undefined){
		keyCodeDo(obj.action);
	};
}



function keyCodeDo(num){
	$(document).trigger("keydown",num);
}
