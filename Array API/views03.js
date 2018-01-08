/* 克隆数组 */

var ex = [1, 2, 3, 5];

var exClone1 = ex.concat();
var exClone2 = ex.slice();
exClone1.push('a')
exClone2.push('b')

console.log(exClone1, exClone2, ex);
