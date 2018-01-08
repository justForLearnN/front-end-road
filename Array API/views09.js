// 找到两个数组的最小相同数

function find(a, b) {
    var res = null;
    var temp = a.length <= b.length ? a : b;
    var target = a.length <= b.length ? b : a;
    temp = temp.sort((m, n) => m - n);
    temp.some(item => {
        var e = target.find(sub => item == sub);
        res = e || null;
        return item == e;
    })
    return res;
}

var a = [1, 2, 3, 4, 5];
var b = [4, 1];

console.log(find(a, b));
