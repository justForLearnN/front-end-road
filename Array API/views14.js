// 将数字转换为罗马表示，规则如下
// http://www.mathsisfun.com/roman-numerals.html

function repeat(m, count) {
    var str = '';
    for(var i = 0; i < count; i++) {
        str += m;
    }
    return str;
}

function cvt(n, arr) {
    var str = '';
    if (n == 0) {
        str = '';
    } else if (n < 4) {
        str = repeat(arr[0], n);
    } else if (n == 4) {
        str = `${arr[0]}${arr[1]}`;
    } else if (n == 5) {
        str = arr[1];
    } else if (n < 9) {
        str = `${arr[1]}${repeat(arr[0], n - 5)}`;
    } else if (n == 9) {
        str = `${arr[0]}${arr[2]}`;
    }

    return str;
}

function convert(num) {
    var single = ['I', 'V', 'X'],
        tens = ['X', 'L', 'C'],
        hundreds = ['C', 'D', 'M'],
        thousands = ['M'],
        res = '';

    if (num / 1000 >= 1) {
        var n = Math.floor(num / 1000);
        res += repeat('M', n);
        num = num - 1000 * n;
    }

    if (num / 100 >= 1) {
        var n = Math.floor(num / 100);
        res += cvt(n, hundreds);
        num = num - 100 * n;
    }

    if (num / 10 >= 1) {
        var n = Math.floor(num / 10);
        res += cvt(n, tens);
        num = num - 10 * n;
    }

    if (num >= 1) {
        res += cvt(num, single);
    }

    return res;
}

console.log(convert_(454));

// 另一种解法
function convert_(num) {
    var single = ['I', 'V', 'X'],
        tens = ['X', 'L', 'C'],
        hundreds = ['C', 'D', 'M'];
        romand = [single, tens, hundreds],
        res_ = [];

    temp = num.toString().split('').reverse();
    temp.length > 1 && temp.splice(1, 0, ',');
    temp.length > 3 && temp.splice(3, 0, ',');
    temp.length > 5 && temp.splice(5, 0, ',');

    temp = temp.reverse().join('').split(',').reverse();

    temp.forEach((n, i) => {
        if (i < 3) {
            res_.push(cvt(n, romand[i]))
        }
        else {
            res_.push(repeat('M', n));
        }
    })

    return res_.reverse().join('');
}
