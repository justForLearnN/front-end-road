/**
 * 服务器返回文件
 */

var http = require('http'),
	fs = require('fs'),
	url = require('url'),
	qs = require('querystring');

var server = http.createServer();

server.on('request', function(request, response) {
	var pathname = url.parse(request.url).pathname,

		_path = __dirname + '/',
		path;

	switch(pathname) {
		case '/':
			path = _path + 'index.html';
			senData(path, request, response);
			break;
		case '/user': 
			path = _path + 'user/user.html';
			senData(path, request, response);
			break;
		case '/login':
			path = _path + 'login/login.html';
			senData(path, request, response);
			break;
		case '/login/check':
			var str = '',
				flag = true;

			// 处理POST请求
			if (request.method == 'POST') {
				
				request.on('data', function(chunk) {
					str += chunk;
				});

				request.on('end', function() {
					console.log(request.method, qs.parse(str));
					// POST { username: '12313', password: '12313', submit: 'xxxxxx' }
				})

			// 处理GET请求
			} else if (request.method == 'GET') {
				str = url.parse(request.url).query;
				console.log(request.method, qs.parse(str));
				// GET { username: '2334234', password: '234234243', submit: 'xxxxxx' }
			}
			if (flag) {
				response.writeHead(200, { 'content-type': 'text/html' } );
				response.end(fs.readFileSync( _path + 'index.html' ));
				console.log('response');
			};
		default:
			path = _path + 'error.html';
			break;
	}
	// senData(path, request, response);
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