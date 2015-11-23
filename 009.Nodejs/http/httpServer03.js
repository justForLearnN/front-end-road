/**
 * request事件的回调函数中有2个参数，分别是请求信息和返回信息
 * response 所有的返回信息都包含在里面
 * response.write(chunk, [encoding]) 发送一个数据块到响应正文中
 * response.end(chunk, [encoding]) 
 * 当所有的正文和头部信息发送完成之后调用该方法告诉服务器数据已经全部发送完成了，这个方法在每次完成信息发送以后必须调用，
 * 并且是最后调用。
 *
 * response.statusCode  该属性用来设置返回的状态码
 *
 * response.setHeader(name, value) 设置返回头信息
 *
 * response.writeHead(statuCode, [reasonPhrase], [headers]) 向头部信息中写入额外信息
 * 该方法只能在当前请求中使用一次，并且必须在response.end()之前使用
 * status 状态码
 * reasonPhrase 状态描述信息，如果该参数为空，则返回http.STATUS_CODES中对应的描述信息
 * headers 其他信息，如 {'content-type': 'text/html' }
 */

var http = require('http');

var server = http.createServer();

server.listen(8080);

server.on('request', function(request, response) {
	response.setHeader('miaov', 'leo');
	response.writeHead(200, {
		'content-type': 'text/html'
	});	
	response.write('hello, world!!');
	response.write('<h1>Hello World!.</h1>')
	response.end();
});

// 状态码信息
// console.log(http.STATUS_CODES);

