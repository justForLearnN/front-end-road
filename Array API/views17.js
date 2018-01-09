/*
    写一个 function，传入两个或两个以上的数组，返回一个以给定的原始数组排序的不包含重复值的新数组。
    换句话说，所有数组中的所有值都应该以原始顺序被包含在内，但是在最终的数组中不包含重复值。
    非重复的数字应该以它们原始的顺序排序，但最终的数组不应该以数字顺序排序。
*/

function unite(...args) {
    var temp = args.reduce((res, cur) => {
        return res.concat(cur);
    }, [])

    let res = [];
    let o = {};

    temp.forEach(item => {
        _item = String(item);
        if (!o[_item]) {
            res.push(item);
            o[_item] = 1;
        } else {
            o[_item] ++;
        }
    })
    return res;
}

console.log(unite([1, 3, 2], [1, [5]], [2, [4]]));
