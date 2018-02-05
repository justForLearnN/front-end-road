// 快速排序
function sort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var tag = arr[0],
        a = [],
        b = [];
    arr.forEach(item => {
        item < tag && a.push(item);
        item > tag && b.push(item);
    })

    return sort(a).concat(tag, sort(b));
}

var arr = [3, 2, 581, 1, 0, 1, 9, 7, 399, 2]
console.log(sort(arr));
