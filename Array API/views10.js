// 找到某个元素在二位数组中的坐标

var ex = [
    [1, 2, 3, 4, 5],
    [6, 7],
    [22, 33, 44]
]

function findOffset(arr, elem) {
    var a, b;

    arr.some((subArr, j) => {
        var i = subArr.indexOf(elem);
        if (i > -1) {
            a = j;
            b = i;
            return true;
        } else {
            a = b = null;
        }
    })

    return [a, b];
}

console.log(findOffset(ex, 44));
