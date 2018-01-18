/**
 * 数组去重
 */

function uniq(array) {
    let a = [], emp = {};

    array.forEach(item => {
        if(!emp[item]) {
            a.push(item);
            emp[item] = 1;
        } else {
            emp[item] ++;
        }
    })

    return a;
}

var ex = [1, 1, 2, 3, 3, 3, 5, 2, 1, 5, 3, 4, 2, 3, 2];
console.log(uniq(ex));  // [1, 2, 3, 5, 4]

// 利用filter
ex.filter((item, i, arr) => arr.indexOf(item) === i);

// 利用ES6的set
console.log(Array.from(new Set(ex))) // [1, 2, 3, 5, 4]

// 利用展开运算符
console.log([...new Set(ex)]);    // [1, 2, 3, 5, 4]



var m = { name: 'tom', age: 20 },
    arr = [m, 1, 2, 3],
    temp = arr.slice(0, 2);
    
temp[0].name = 'jake';

// 因为引用关系，m的值被改变