/**
 * fs.existsSync(path);
 * 检查指定路径的文件是否存在
 * callback 只有一个参数，为boolean值，如果文件存在，为true, 反之， false
 */

// 同步模式操作上一例子

var fs = require('fs');

var filename = '5.txt';

if (!fs.existsSync) {
	fs.writeFileSync(filename, 'hello, world!');
	console.log('success to create a file.');
}
else {
	fs.appendFileSync(filename, '\nI\'m coming.');
	console.log('success to append content.');
}
