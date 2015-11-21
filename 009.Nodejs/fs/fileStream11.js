/**
 * 文件重命名
 * fs.rename(path, newName, callback);
 */

var fs = require('fs');

var filename = '2.txt';
var newname = '2.new.txt';

fs.rename(filename, newname, function() {
	console.log(arguments);
})


// 查看文件信息，
fs.stat(newname, function() {
	console.log(arguments);
})

/*{ 
  '0': null,
  '1':
   { dev: 16777220,
     mode: 33188,
     nlink: 1,
     uid: 501,
     gid: 20,
     rdev: 0,
     blksize: 4096,
     ino: 30920931,
     size: 46,
     blocks: 8,
     atime: Sat Nov 21 2015 16:57:07 GMT+0800 (CST),
     mtime: Sat Nov 21 2015 16:11:13 GMT+0800 (CST),
     ctime: Sat Nov 21 2015 16:11:13 GMT+0800 (CST),
     birthtime: Sat Nov 21 2015 16:09:50 GMT+0800 (CST) } }*/