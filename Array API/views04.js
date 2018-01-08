// 找出数组中出现最多的元素与出现次数

function getMaxElem(array) {
    let a,
        max = 0,
        res = {};

    array.forEach(item => {
        res[item] = res[item] ? res[item] + 1 : 1;
        if (res[item] > max) {
            a = item;
            max = res[item];
        }
    });

    return [a, max];
}

var ex = [1, 1, 2, 3, 3, 3, 5, 2, 1, 5, 3, 4, 2, 3, 2];
console.log(getMaxElem(ex));
