/**
 * 服务器返回文件
 */

var http = require('http'),
	fs = require('fs'),
	url = require('url');

var server = http.createServer();

server.on('request', function(request, response) {
	var pathname = url.parse(request.url).pathname,

		_path = __dirname + '/',
		path;

	switch(pathname) {
		case '/':
			path = _path + 'index.html';
			break;
		case '/user': 
			path = _path + 'user/user.html';
			break;
		case '/login':
			path = _path + 'login/login.html';
			break;
		default:
			path = _path + 'error.html';
			break;
	}
	senData(path, request, response);
})

server.listen(8080);

// 该方法用来处理返回信息
function senData(path, req, res) {
	fs.readFile(path, function(err, con) {
		if (err) {
			res.writeHead(404, { 'content-type': 'text/html' });
			res.end(fs.readFileSync(_path + 'error.html'));
		}
		else {
			res.writeHead(200, { 'content-type': 'text/html' });
			res.end(con);
		}
	});
}