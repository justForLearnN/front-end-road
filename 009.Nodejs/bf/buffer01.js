/**
 * Buffer 对象： 用于操作二进制数据流
 * 
 * new buffer(size) size[Number]
 * 分配一个固定大小的buffer对象
 */

var bf1 = new Buffer(5); // 长度为5，初始内容随机填充
var bf2 = new Buffer(10);

console.log(bf1); // <Buffer 00 00 00 02 01>
console.log(bf2); // <Buffer 00 00 00 00 00 00 00 00 48 b4>

// 在长度范围内，可以像数组一样访问，修改
bf1[4] = 12;

console.log(bf1); // <Buffer 00 00 00 02 0c>
