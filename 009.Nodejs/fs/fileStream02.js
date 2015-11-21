/**
 * fs.open(path, flags, [mode], callback)
 * @param {string} [path] [要被打开文件的路径]
 * @param {string} [flags] [打开文件的方式 'r' 只读 ， 'r+w' 读写]
 * @param {numbeer} [mode] [设置文件的模式  读/写/执行  4/2/1]
 * @param {function} [callback] [回调函数]
 *                              callback中的2个参数
 *                              	error: 文件打开失败时返回的错误信息
 *                               	fd: 被打开文件的标识
 */

// 使用前引入fs
var fs = require('fs');

// 打开一个存在的文件
fs.open('1.txt', 'r', function(error, fd) {
	if (error) {
		console.log(error);
	}
	else {
		console.log(fd);
	}
});

/*
10
*/

// 打开一个不存在的文件
fs.open('2.txt', 'r', function(error, fd) {
	if (error) {
		console.log(error);
	}
	else {
		console.log(fd);
	}
});
/*
{ [Error: ENOENT, open '2.txt'] errno: -2, code: 'ENOENT', path: '2.txt' }
 */

// 多次打开同一个文件，fd的值会累加，类似运行定时器时的返回值
fs.open('1.txt', 'r', function(error, fd) {
	if (error) {
		console.log('open file fail.');
	}
	else {
		console.log('open file success! ' + fd);  // open file success! 12
	}
});