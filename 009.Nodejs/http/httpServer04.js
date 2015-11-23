/*
 * 根据用户发送请求地址的不同，返回不同的数据
 *
 * request.url  访问路径   如 /a/b/index.html?a=1 不包括 http://127.0.0.1:8080
 */

var http = require('http');
var url = require('url');

var server = http.createServer();

server.on('request', function(request, response) {
	// console.log(request.url);
	var urlstr = url.parse(request.url);
	switch(urlstr.pathname) {
		case '/':
			response.writeHead(200, { 'content-type': 'text/html' });
			response.end('<h1>Hello world! this is index.html.</h1>');
			break;

		case '/user':
			response.writeHead(200, { 'content-type': 'text/html' });
			response.end('<h1>This is user.html.</h1>')
			break;

		default:
			response.writeHead(404, { 'content-type': 'text/html' });
			response.end('<h1>404, page not found.</h1>')
			break;
	}
})

server.listen(8080);




// var urlstr = url.parse('https://www.tigerbrokers.com/active/?a=1&b=2#12s324');
// 结果如下：
/*
{ protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.tigerbrokers.com',
  port: null,
  hostname: 'www.tigerbrokers.com',
  hash: '#12s324',
  search: '?a=1&b=2',
  query: 'a=1&b=2',
  pathname: '/active/',
  path: '/active/?a=1&b=2',
  href: 'https://www.tigerbrokers.com/active/?a=1&b=2#12s324' }
 */