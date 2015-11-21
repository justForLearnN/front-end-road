/**
 * buf.wirte(str, [offset], [length], [encoding])
 * @param {string} [str] [将该字符串写入Buffer对象中]
 * @param {number} [offset] [在Buffer对象内的偏移量，从第几位开始写入]
 * @param {number} [length] [写入几位字符到buffer对象中]
 * @param {string} [encoding] [编码方式，默认为utf-8]
 * @return {number} [返回写入的长度]
 */

var str = 'document',
	ini = new Buffer(str),

	// 如果长度不足，后续的内容将会被截取无法继续写入
	buf = new Buffer(8); 

console.log(ini); // <Buffer 64 6f 63 75 6d 65 6e 74>

buf.write(str);
console.log(buf); // <Buffer 64 6f 63 75 6d 65 6e 74>

buf.write(str, 1); 
console.log(buf); // <Buffer 64 64 6f 63 75 6d 65 6e>

buf.write(str, 2, 3);
console.log(buf); // <Buffer 64 64 64 6f 63 6d 65 6e>