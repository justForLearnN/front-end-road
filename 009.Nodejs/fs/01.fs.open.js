var fs = require('fs');

fs.open('1.txt', 'r', function(err, fd) {
	if (err) {
		console.log('open file fail.');
	} else {
		console.log('open success!');
		console.log(fd);
	}
})

console.log('other things.');