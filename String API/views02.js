/* 把数字转化为千分符表示，每隔三位数字插入一个逗号 */

function covert(num) {
    var num = num.toString();

    var temp = num.split('').reverse();
    var elem = '';
    var res = [];
    temp.forEach((char, i) => {
        elem += char;
        if (i % 3 == 2 && elem || (i === temp.length - 1)) {
            res.push(elem);
            elem = '';
        }
    });

    return res.join(',').split('').reverse().join('');
}

function _covert(num) {
    var num = num.toString(),
        k = num.length % 3,
        prev = num.substr(0, k),
        next = num.substring(k),


        res = prev ? [prev] : [],
        elem = '';

    next.split('').forEach((char, i) => {
        elem += char;
        if (i % 3 == 2 && elem) {
            res.push(elem);
            elem = '';
        }
    })
    return res.join(',');
}


function covert_(num) {
    return num.toString().replace(/(?=(?!\b)(\d{3})+$)/g, ',');
}

console.log(covert(1000000000000));
console.log(_covert(1000000000000));
console.log(covert_(1000000000000));
