/**
 * 用户在浏览器输入网址到网页打开，这个过程发生了什么？
 * 1. 输入网址www.baidu.com
 *    客户端会将网址解析为ip地址，然后发送http请求到服务主机。
 * 2. 服务器接受到该请求之后，会对请求进行分析和处理
 * 3. 服务器处理完请求之后，会将返回内容发送到客户端
 * 4. 客户端接收到返回内容之后，会对该内容进行相应的处理，比如将html页面渲染出来
 */

var http = require('http');

// 创建并返回一个web服务器对象
var server = http.createServer(function() {
	console.log('There is a request..')  //  相当于request事件
});

server.listen(8080);

// 查看服务器地址信息
console.log(server.address());
// { address: '::', family: 'IPv6', port: 8080 }

// error事件，当出现错误时触发
server.on('error', function(error) {
	console.log(error);
})
//端口冲突时：{ [Error: listen EACCES] code: 'EACCES', errno: 'EACCES', syscall: 'listen' }

// 服务器启动成功时触发listening事件
server.on('listening', function() {
	console.log('listening...');
})

// 当客户端发送请求过来，被listening监听到时触发
server.on('request', function() {
	console.log('There is a request!');
})