var http = require('http');
var express = require('express');
var app = express();
var ws = require("nodejs-websocket");
app.use("/public", express.static(__dirname + '/public'));



var client = [];
var server = ws.createServer(function(conn){
	conn.on("text", function (str) {
		console.log(str);
		var obj = JSON.parse(str);
		if(obj.userId){
			client[obj.userId] = conn;
		}
		for(var key in client){
			client[key].sendText(JSON.stringify(obj));
		}
	});
    conn.on("close", function (code, reason) {
        console.log("关闭连接");
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭");
    });
	
}).listen(8001,function(){
	console.log("websocket 通道建立完毕");
});


// 创建服务端
http.createServer(app).listen('80', function() {
	console.log('80 服务器完成');
});