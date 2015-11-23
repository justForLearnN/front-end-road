/**
 * request事件的回调函数中有2个参数，分别是请求信息和返回信息
 * request 所有的请求信息都包含在里面
 */

var http = require('http');

var server = http.createServer();

server.listen(8080);

server.on('request', function(request, response) {
	console.log('request:', request.headers);
});