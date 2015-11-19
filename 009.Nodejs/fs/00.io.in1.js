/**
 * 使用输入输出流完成一个加法的例子
 */

process.stdin.resume();

var a, b;

log('a: ');

process.stdin.on('data', function(chunk) {
	if (!a) {
		a = Number(chunk);
		log('b: ');
	} else {
		b = Number(chunk);
		log('result: ' + (a + b) +'\n');
		process.exit();
	}
});

function log(data) {
	process.stdout.write(data);
} 

/*
a: 12
b: 23
result: 35
*/