/**
 * 创建/删除 文件夹
 * fs.mkdir(path, [mode], callback);  回调函数参数为错误信息
 * fs.rmdir(path, [mode], callback)
 */

var fs = require('fs');

// fs.rmdirSync('./1');

// fs.mkdirSync('./1');

// 同步读取文件夹内的文件
/*var fileList = fs.readdirSync( './' );

for( var item in fileList ) {

    var stat = fs.statSync( './' + fileList[item] );

    // 判断是否为文件夹
    if ( stat.isDirectory() ) {
        console.log( fileList[item], 'type is dir!' );
    }
    else {
        console.log( fileList[item], 'type is file!' );
    }

}*/

var count = 0;

readAllFile(fs, '../'); // 1268

//  遍历文件夹内的所有文件，最后返回文件个数
function readAllFile( fs, path ) {
    var fileList = fs.readdirSync( path );
    for( var item in fileList ) {

        var status = fs.statSync( path + fileList[item] );
        if ( status.isDirectory() ) {

            // 递归遍历
            readAllFile( fs, (path +  fileList[item]) + '/' );
        }
        else {
            count ++;
        }

    }
    return count;
}


/*fs.mkdir('./1', function(err) {
	
})

fs.rmdir('./1', function() {
})*/

/**
 * 读取文件夹
 * fs.readdir(path, callback)
 */

/*fs.readdir('./', function(err, fileList) {
	console.log(fileList);
})*/

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
