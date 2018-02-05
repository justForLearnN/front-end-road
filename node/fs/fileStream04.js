/**
 * fs.read(fd, buffer, offset, length, position, callback)  从指定的fd标识读取文件
 * @param {number} [fd] [被读取文件的标识]
 * @param {Buffer} [buffer] [存储读取到数据的Buffer对象]
 * @param {number} [offset] [从Buffer对象的第几位开始存储]
 * @param {number} [length] [读取的内容长度]
 * @param {position} [position] [从文件中的那个位置开始读取]
 * @param {function} [callback] [回调函数]
 *                              error: 错误信息
 *                              len: 用来存储读取内容的Buffer对象的长度
 *                              newBf: 用来存储读取内容的Buffer对象的内容
 * @return
 */
var fs = require('fs'),
	bf = new Buffer(20);

fs.open('1.txt', 'r', function(error, fd) {
	if (error) {
		console.log('open file fail.');
	} 
	else {
		fs.read(fd, bf, 0, 20, null, function(error, len, newBf) {
			console.log(bf); // <Buffer 74 68 69 73 20 69 73 20 31 2e 74 78 74 20 66 69 6c 65 2e 0a>
			console.log(error, len, newBf); // null 20 <Buffer 74 68 69 73 20 69 73 20 31 2e 74 78 74 20 66 69 6c 65 2e 0a>

			// 操作完成之后关系文件
			fs.close();
		})

		// 另外一种方式添加
		// fs.write(fd, '1234', 5, 'utf-8', function() {});
		// fd 文件标识
		// ‘1234’ 被添加的字符串
		// 5 在文件中的第几位开始添加
		// callback
	}
})

/**
 * fs.readSync(fd, buffer, offset, length, position)
 * fs.read 的同步版本，返回bytesRead的个数
 */