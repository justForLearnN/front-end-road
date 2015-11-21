/**
 * Buffer.concat(list, ) [拼接Buffer数组, 数组内元素只能是Buffer对象]
 */

var str1 = 'tigerbrokers', str2 = 'document',
	buffer1 = new Buffer(str1),
	buffer2 = new Buffer(str2),
	list = [buffer1, buffer2];

var res = Buffer.concat(list);
console.log(res);