var bf = new Buffer('miaov', 'utf-8');

for (var i=0; i<bf.length; i++) {
	console.log(String.fromCharCode( bf[i] ));
}

var str1 = 'miaov';
var bf1 = new Buffer(str1);
console.log(str1.length, bf1.length); // 5 5

var str2 = '秒味';
var bf2 = new Buffer(str2);
console.log(str2.length, bf2.length); // 2 6