/* 找出数组中的最大 / 最小值 */

function getMax(array) {
    // return array.sort((a, b) => b - a)[0]
    return Math.max.apply(null, array);
}

var ex = [11, 1111, 2212, 11, 123121];

console.log(getMax(ex));
