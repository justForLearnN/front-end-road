/**
 * Buffer 对象： 用于操作二进制数据流
 * 
 * new buffer(Array) Array: 字节数组
 * 
 */

var array = [1, 2, 10, 39, 12];

var bf1 = new Buffer(array); // 无论已何种形式，Buffer对象在创建时就已经固定了大小，之后不可更改

console.log(bf1);  // <Buffer 01 02 0a 27 0c>