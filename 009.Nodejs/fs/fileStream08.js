/**
 * fs.exists(path, callback);
 * 检查指定路径的文件是否存在
 * callback 只有一个参数，为boolean值，如果文件存在，为true, 反之， false
 */

var fs = require('fs');

var filename = '4.txt';

fs.exists(filename, function(boo) {
	if (!boo) {
		fs.writeFile(filename, 'hello, world!', function(err) {
			if (err) {
				console.log('something error happened.');
			} else {
				console.log('create a file.');
			}
		})
	} else {
		fs.appendFile(filename, 'repeat hello!', function(err) {
			if (err) {
				console.log('something error happened.');
			} else {
				console.log('add content to the file.');
			}
		});
	}
})

console.log('isExists:', fs.existsSync( filename ) ); // isExists: true