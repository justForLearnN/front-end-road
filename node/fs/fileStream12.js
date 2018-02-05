/**
 * 监听文件改变，主要是监听重命名和内容改变
 * fs.watch(path, callback)
 * path 需要被监听的文件
 * callback 回调函数有2个参数，第一个是被改变的事件，多为change与rename
 *                            第二个是被改变文件的名字
 *
 * 不稳定，可能系统无法获取到文件！
 */

var fs = require('fs');

var filename = '2.new.txt';

fs.watch(filename, function(ev, fn) {
	console.log(ev);
	if (fn) {
		console.log( fn + ' file is changed.');
	}
	else {
		console.log('...');
	}
})