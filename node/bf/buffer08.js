/**
 * 类方法
 */

// 判断编码格式是否被支持
console.log(Buffer.isEncoding('utf-8')); // true
console.log(Buffer.isEncoding('gbk')); // false

// isBuffer 判断一个对象是否是Buffer对象
console.log(Buffer.isBuffer(new Buffer('tigerbrokers'))); // true
console.log(Buffer.isBuffer('tigerbrokers')); // false

// 获取字符串的字节长度
console.log(Buffer.byteLength('tigerbrokers')); // 12
console.log(Buffer.byteLength('老虎证劵'));




