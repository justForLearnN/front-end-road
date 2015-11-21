/**
 * fs.writeFile(filename, data, [options], callback)
 * @param {
 *     {string} [filename] [被操作的文件]
 *     {string|Buffer} [data] [写入的内容，可以是字符串，也可以是Buffer对象]
 * }
 * callback 回调函数，它只有错误信息一个参数，可打印arguments查看
 */

var fs = require('fs'),
	filename = '2.txt';

// 向文件中写入内容，如果文件不存在，则创建
fs.writeFile(filename, 'hello, world!', function() {
	console.log(arguments);
})


// 如果文件存在，则覆盖
fs.writeFile(filename, 'var aaa = document.getElementsByClassName(ddd)', function() {
	console.log(arguments);
})