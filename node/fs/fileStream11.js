/**
 * 文件重命名
 * fs.rename(path, newName, callback);
 */

var fs = require('fs');

var filename = '2.txt';
var newname = '2.new.txt';
var status = null;
fs.rename(filename, newname, function() {
	console.log(arguments);
})

// 同步方式重命名
fs.renameSync( filename, newname );

// 同步方式查看文件信息
status = fs.statSync( newname );
console.log( status );


// 异步方式查看文件信息，
/*fs.stat(newname, function() {
	console.log(arguments);
})*/

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