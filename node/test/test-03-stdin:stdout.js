// process.stdout.write('hello\n');

// process.stdin.on('data', function(chunk) {
// 	process.stdin.resume();
// 	console.log('you input: ' + chunk);
// })
// 

var a, b;
process.stdout.write('please input a: ');

process.stdin.on('data', function(chunk) {

	if (!a) {
		a = Number(chunk);
		process.stdout.write('please input b: ');
	} else {
		b = Number(chunk);
		process.stdout.write('result: ' + (a+b) );
		process.exit();
	}
})