
var http = require("http");
var url = require('url');
var fs = require('fs');

var htmldir = __dirname + '/user/';

console.log(__dirname);

var server = http.createServer(function(request, response) {
	var urls = url.parse(request.url);
	console.log(urls.pathname);
  	switch (urls.pathname) {
  		case '/':
  			sendData(htmldir+'index.html', request, response);
  			break;
  		case '/user':
  			sendData(htmldir+'user.html', request, response);
  			break;
  		default:
  			break;
  	}

  	response.end();
});

function sendData(file, request, response) {
	fs.readFile( file, function(err, data) {

		if (err) {

			response.writeHead(404, {
				'content-type': 'text/html; charset=utf-8'
			});
			response.end('<h1>404</h1>');
		} else {
			response.writeHead(200, {
				'content-type': 'text/html; charset=utf-8'
			});
			console.log(data.toString());
			response.end(data);
		}
	} )
}

server.listen(8080);
console.log("Server is listening");

console.log(http.STATUS_CODES);


