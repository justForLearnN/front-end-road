/**
 * 创建/删除 文件夹
 * fs.mkdir(path, [mode], callback);  回调函数参数为错误信息
 * fs.rmdir(path, [mode], callback)
 */

var fs = require('fs');

fs.mkdir('./1', function(err) {
	
})

fs.rmdir('./1', function() {
})

/**
 * 读取文件夹
 * fs.readdir(path, callback)
 */

fs.readdir('./', function(err, fileList) {
	console.log(fileList);
})

/*
[ '00.io.in.js',
  '00.io.in1.js',
  '00.io.out.js',
  '01.fs.open.js',
  '01.fs.read.js',
  '2.txt',
  '3.txt',
  '4.txt',
  '5.txt',
  'README.md',
  'fileStream01.js',
  'fileStream02.js',
  'fileStream03.js',
  'fileStream04.js',
  'fileStream05.js',
  'fileStream06.js',
  'fileStream07.js',
  'fileStream08.js',
  'fileStream09.js',
  'fileStream10.js',
  'fileStream11.js',
  'fileStream12.js',
  'fileStream13.js' ]
 */
