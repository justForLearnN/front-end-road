/**
 * buf.copy(targetBuffer, [TargetStart], [sourceStart], [sourceEnd]) 将Buffer对象转换为字符串
 * @param {Buffer} [targetBuffer] [目标对象，即为拷贝之后的Buffer对象]
 * @param {number} [TargetStart] [目标对象的开始位置，默认为0]
 * @param {number} [sourceStart] [原始对象的开始位置，从什么位置开始拷贝]
 * @param {number} [sourceEnd] [原始对象的结束位置，在什么位置结束拷贝，默认为原始对象的长度]
 * @return {Buffer} [返回复制后的Buffer对象，该对象与原对象指向不同，如果修改该对象，原始对象不受影响]
 */

// sourceBuffer: buffer
// TargetBuffer: res 

var buffer = new Buffer('tigerbrokers'),
	res = new Buffer(12);

console.log(buffer); // <Buffer 74 69 67 65 72 62 72 6f 6b 65 72 73>

buffer.copy(res);
console.log(res); // <Buffer 74 69 67 65 72 62 72 6f 6b 65 72 73>

buffer.copy(res, 2);
console.log(res); // <Buffer 74 69 74 69 67 65 72 62 72 6f 6b 65>

buffer.copy(res, 1, 4);
console.log(res); // <Buffer 74 72 62 72 6f 6b 65 72 73 6f 6b 65>

buffer.copy(res, 1, 2, 6);
console.log(res); // <Buffer 74 67 65 72 62 6b 65 72 73 6f 6b 65>

