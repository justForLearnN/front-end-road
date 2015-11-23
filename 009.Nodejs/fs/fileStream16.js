/**
 * 合并文件
 */

var fs = require('fs'),

	con1 = fs.readFileSync('4.txt'),
	con2 = fs.readFileSync('5.txt'),
	res = Buffer.concat([con1, con2]);

fs.writeFileSync('6.txt', res.toString());

// 创建文件夹
// fs.mkdirSync('../http2');

// 删除文件夹
fs.rmdirSync('../http2');