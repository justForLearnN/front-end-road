/**
 * console.log(str) 输出的也是Buffer对象，但是可能会隐式的调用toString方法。
 */

log('Please input: ');

process.stdin.resume();

process.stdin.on('data', function(chunk) {
	log(chunk);
})

// 这里注意区分 console.log 与 process.stdout.write 的区别
function log(data) {
	console.log(data);
}

/*
Please input:
a
<Buffer 61 0a>
 */

