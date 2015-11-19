/**
 * buf.write()
 */

var str = 'miaov';

var bf0 = new Buffer(str);

var bf1 = new Buffer(5);

bf1.write(str);

console.log(bf0, bf1); // <Buffer 6d 69 61 6f 76> <Buffer 6d 69 61>

// bf1.write(str, 1, 3);

console.log(bf1.toString());