/**
 * buf.slice([Start], [end]) 将Buffer对象转换为字符串
 * @param {number} [start] [开始位置，默认为0]
 * @param {number} [end] [结束位置，默认为字符串的长度，不包含结束位置]
 * @return {Buffer} [返回截取后的Buffer对象，该对象与原对象指向相同，如果修改该对象，原始对象也会被改变]
 * 
 */

var buf = new Buffer('tigerbrokers');
console.log(buf); // <Buffer 74 69 67 65 72 62 72 6f 6b 65 72 73>

// 从第三位开始截取到最后, 
var res = buf.slice(3);
console.log(res); // <Buffer 65 72 62 72 6f 6b 65 72 73>

// 截取全部，相当于复制一次引用，但是不复制对象
res = buf.slice();
console.log(res); // <Buffer 74 69 67 65 72 62 72 6f 6b 65 72 73>

// 从第三位截取到第六位，但是不包括第六位
res = buf.slice(3, 6);
console.log(res); // <Buffer 65 72 62>

res[0] = 2;
console.log(res); // <Buffer 02 72 62>

// 原始数据的 buf[3] 也被修改
console.log(buf); // <Buffer 74 69 67 02 72 62 72 6f 6b 65 72 73>