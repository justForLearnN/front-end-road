// 比较两个数组，然后返回一个新数组，该数组的元素为两个给定数组中所有独有的数组元素。换言之，返回两个数组的差异。

function diff(arr1, arr2) {
    var temp = arr1.concat(arr2);

    return temp.reduce((r, item) => {
        if (temp.indexOf(item) === temp.lastIndexOf(item)) {
            r.push(item);
        }
        return r;
    }, [])
}

var r = diff([1, 2, 3, 5], [1, 2, 3, 4, 5]);
console.log(r);
