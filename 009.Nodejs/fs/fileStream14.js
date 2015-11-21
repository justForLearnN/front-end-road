/**
 * 遍历文件夹
 */

var fs = require('fs');


fs.readdir('./', function(err, fileList) {
	if (err) {
		console.log('something error');
	}
	else {
		fileList.forEach(function(f) {
			fs.stat(f, function(err, info) {
				// console.log(info.mode);
				if (info.mode > 30000) {
					console.log('file dir: ' + f);
				}
				else {
					console.log('file: ' + f);
				}
			})
		})
	}
})