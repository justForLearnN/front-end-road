/**
 * fs.write(fd, buffer, offset, length, [position], callback)
 * @param {number} [fd] [被操作文件的标识]
 * @param {buffer} [buffer] [将要写入内容的Buffer对象]
 * @param {number} [offset] [该buffer对象的起始位置]
 * @param {number} [length] [该buffer对象的长度]
 * @param {number} [position] [被操作文件的起始位置]
 * @param {function} [callback] [回调函数]
 */

var fs = require('fs');
var bf = new Buffer('document\n');

fs.open('1.txt', 'r+', function(error, fd) {
	if (error) {
		console.log('open file fail.');
	}
	else {
		var len = bf.length;
		fs.write(fd, bf, 0, len, 0, function(error, len, bf) {
			console.log(arguments);
			/**
			 * error 错误信息
			 * len 被写入字符的长度
			 * bf 被写入字符的Buffer对象内容
			 */
		})
	}
})