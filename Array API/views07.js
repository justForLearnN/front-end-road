// 打平嵌套数组

let arr = [1, [2, ['xxx'], 4], 5]; // -> [1, 2, 3, 4, 5]

function unwind(arr) {
    return arr.join().split(',').map(item => Number(item) ? Number(item) : item);
}

console.log(unwind(arr));



// 如果arr确定为二维数组

function _unwind(arr) {
    return arr.reduce((r, item) => r.concat(item), []);
}

// 最优解
function _unwind_(arr) {
    return Array.prototype.concat.apply([], arr);
}


var ex = [[1, 2], 3, [3, 4, 6]];

console.log(_unwind(ex));
console.log(_unwind_(ex));


// 如果arr中，元素不仅仅包含有数字，还包含其他对象的话，以及层级不确定，那么最好还是采用递归来实现
function __unwind(arr) {
    // 此处不能使用forEach，因为递归的存在，会在第一个递归调用return之后，终止后续的forEach循环
    // arr.forEach((item, i) => {
    //     console.log(i);
    //     if(Array.isArray(item)) {
    //         arr.splice(i, 1, ...__unwind(item));
    //     }
    // })

    for(var i = 0; i < arr.length; i++) {
        if(Array.isArray(arr[i])) {
            arr.splice(i, 1, ...__unwind(arr[i]));
        }
    }

    return arr;
}

var ex2 = [1, 2, [3, {a: 10}, [1, 2, 3]], 3, [3, 4]];
console.log(__unwind(ex2));
