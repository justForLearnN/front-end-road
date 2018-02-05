/**
 * 文件读取
 * fs.readFile(filename, [options], callback)
 * filename 文件路径
 * callback 回调函数，有2个参数，分别是错误信息与读取到的内容，内容为Buffer对象
 */

var fs = require('fs');

var filename = '5.txt';

fs.readFile(filename, function(error, buf) {
	if (error) {
		console.log('read fail.');
	}
	else {
		console.log(buf.toString());
	}
})

// 同步模式读取文件
var readRes = fs.readFileSync(filename).toString();
console.log('file content: ', readRes);

/**
 * 文件删除
 * fs.unlink(path, callback);
 * 参数与readFile一致
 */

var filename1 = '1.txt';

fs.unlink(filename1, function() {
	console.log(arguments);
})