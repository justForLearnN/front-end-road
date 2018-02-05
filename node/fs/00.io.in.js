/**
 * process.stdin
 */

// 首先开启输入流
process.stdin.resume();

log('please input your name: ');

process.stdin.on('data', function(chunk) {
	log('your name: ' + chunk);
	process.exit();
})

// 定义输出函数
function log(data) {
	process.stdout.write(data);
}


/*
please input your name: yangbo
your name: yangbo
 */