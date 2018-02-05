/**
 * Buffer 对象： 用于操作二进制数据流
 * 
 * new buffer(string, [encoding]);   [encoding]默认为'utf-8'
 * 
 */

var bf1 = new Buffer('document', 'utf-8');

console.log(bf1); // <Buffer 64 6f 63 75 6d 65 6e 74>

// buffer 对象内容的长度   与字符串长度不一定相同，注意区分
console.log(bf1.length); // 8

// 转换回字符串
console.log(bf1.toString()); // document

// 将Unicode编码的字符转换为字符串, 可为1个，或者多个
console.log(String.fromCharCode(bf1[1], bf1[2]));

// 转换为json格式
console.log(bf1.toJSON()); 
/*
{ type: 'Buffer',
  data: [ 100, 111, 99, 117, 109, 101, 110, 116 ] }
 */

