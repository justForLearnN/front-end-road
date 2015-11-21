/**
 * Buffer.concat(list, [totleLength]) [拼接Buffer数组, 数组内元素只能是Buffer对象]
 */

var str1 = 'tigerbrokers', str2 = 'document',
	buffer1 = new Buffer(str1),
	buffer2 = new Buffer(str2),
	list = [buffer1, buffer2];

var res = Buffer.concat(list);  // 合并Buffer对象
console.log(res); // <Buffer 74 69 67 65 72 62 72 6f 6b 65 72 73 64 6f 63 75 6d 65 6e 74>