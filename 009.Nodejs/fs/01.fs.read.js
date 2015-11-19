var fs = require('fs');

fs.open('1.txt', 'r', function(err, fd) {
	if (err) {
		console.log('open fail.');
	} else {
		var bf1 = new Buffer(10212121);
		fs.read(fd, bf1, 0, 140, null, function( err, len, newBf ) {
			console.log(bf1.toString());
		})
	}
})