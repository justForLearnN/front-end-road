/* 不适用循环，创建一个元素 为 0 ~ 100 的 数组，每个元素的值与它的索引相等 */

var res1 = Array.from(Array(100).keys());

var res2 = [...Array(100).keys()];

function recursion(count, arr) {
    var arr = arr || [];

    if (count < 0) {
        return arr.reverse();
    }

    return recursion(--count, arr.concat(count)); // 尾递归
}

console.log(recursion(100))
