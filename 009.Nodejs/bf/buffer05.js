/**
 * buf.toString([encoding], [Start], [end]) 将Buffer对象转换为字符串
 * @param {string} [encoding] [编码方式]
 * @param {number} [start] [转换的开始位置，默认为0]
 * @param {number} [end] [转换的结束位置，默认为字符串的长度，不包含结束位置]
 * @return {string} [返回被转换的字符串]
 * 
 */

var buf = new Buffer('tigerbrokers');

console.log(buf.toString()); // tigerbrokers

// 当字符串是中文时，被截断的字符会显示乱码，这里要注意
console.log(buf.toString('', 1, 3)); // ig