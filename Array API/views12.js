// 区间求值
// 我们会传递给你一个包含两个数字的数组。返回这两个数字和它们之间所有数字的和。
// 最小的数字并非总在最前面。

function sumAll(arr) {
    var min = Math.min.apply(null, arr);
    var max = Math.max.apply(null, arr);

    var sum = 0;
    for (var i = min; i <= max; i++) {
        sum += i;
    }

    return sum;
}

console.log(sumAll([4, 2]));
