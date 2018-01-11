var path = require('path');

// normalize 将非标准路径转化为当前环境支持的标准路径
var nor = path.normalize('.//a//b//d//..//c/e//..//');
// a/b/c/

// join 连接路径
var join_ = path.join(__dirname, 'a', 'b', 'c')
// /Users/yangbo/develop/front-end-road/path module/a/b/c

// resolve 以应用程序根目录为七点，根据传入的字符解析出一个绝对路径
var resolve_ = path.resolve('a', 'b');
// /Users/yangbo/develop/front-end-road/path module/a/b

// 获取两个路径之间的相关关系, 返回 在 a 中访问 b 时，的相关路径
var relative = path.relative('../jsonp/a', '../background');
// ../../background

// 返回文件夹的上层目录，或者文件的当前目录
var dirname = path.dirname('../jsonp/index.js');
// ../jsonp

// 返回当前路径的文件名
var basename = path.basename('../jsonp/index.html');
// index.html

// 第二个参数为文件后缀名，返回去掉后缀名的文件名
var basename_ = path.basename('../jsonp/index.js', '.js');
// index

// 获取一个路径的扩展名
var extname_ = path.extname('../jsonp/index.js'); // .js

// 获取当前系统支持的文件路径分隔符 window \\    unix /
var sep = path.sep;

// 获取当前系统支持的路径分隔符  window ';'    unix  ':'
var delimiter = path.delimiter;

// 判断路径是否为绝对路径
var isAb_ = path.isAbsolute('/a/b/c');
// true

// 根据路径返回如下所示的一个对象
var opar = path.parse('../jsonp/index.js');

opar = { root: '',
  dir: '../jsonp',
  base: 'index.js',
  ext: '.js',
  name: 'index' }

// 与parse相反，该方法将对象转化为路径
var format_ = path.format(opar);
// ../jsonp/index.js

console.log(format_);
