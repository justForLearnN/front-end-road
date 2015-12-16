/**
 * request事件的回调函数中有2个参数，分别是请求信息和返回信息
 * request 所有的请求信息都包含在里面
 */

var http = require('http');
var fs = require('fs');

var server = http.createServer();

server.listen(8080);

server.on('request', function(request, response) {
	console.log('request:', request.headers);
});


//  同步方式读取文件，如果读取正确，会返回文件内容，如果读取文件不存在，则会抛出一个异常
console.log( fs.readFileSync( './error.html' ).toString() );
