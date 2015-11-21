/**
 * fs.openSync(path, flags, [mode]);
 *
 * fs.open的同步打开方法，参数与fs.oepn一致
 * @return {number} [返回标识fd]
 */

var fs = require('fs'),
	startTime =  (new Date()).getTime();

fs.open('1.txt', 'r', function(error, fd) {
	error ? console.log(error) : console.log('用时'+ ((new Date()).getTime()-startTime) +'ms.' + fd);
})

console.log('这是异步执行，我会比open方法先执行');
/*
这是异步执行，我会比open方法先执行
10
 */

if(fs.openSync('1.txt', 'r')) {
	console.log('open successful!');
};
console.log('这是同步执行，我会比open方法后执行');

/*
open successful!
这是同步执行，我会比open方法后执行
 */