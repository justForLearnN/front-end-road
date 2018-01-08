const currentArrayAPI = 'length';

const likeArray = {
    0: 'hello',
    1: 'world',
    2: '!',
    3: '~',
    length: 4
}

switch (currentArrayAPI) {
    case 'length':
        const exp00 = [1, 2, 3, 4, 5];
        const exp01 = [];

        // 1. get array length
        var len = exp00.length;  // len = 5
        console.log('1. exp00\'s length: ', len);

        // 2. as a filter condition
        if (len > 0) {
            // dosomething
            console.log('2. dosometh when len more than 0');
        }

        // 3. get the last sub item
        var last = exp00[len - 1];
        console.log('3. last item is:', last);

        // 4. clone an array
        var new_ = exp00.slice(0);
        // var new_ = exp00.concat();
        console.log('4. new array:', new_);

        // 5. change length will change origin array
        new_.length = 4;
        console.log('5. after change new_ length', new_) ; // [1, 2, 3, 4]
        break;

    case 'concat':
        var exap0 = [1, 2, 3];
        var exap1 = ['a', 'b'];
        var exap2 = [[1, 2], [4, 2], [5, 6]];

        // 1. concat arrays
        var new_ = exap0.concat(exap1);
        // equal as :  [].concat(exap0, exap1);
        console.log('1.', new_); // [1, 2, 3, 'a', b]

        // 2. 二维数组的降维处理
        // The worst way
        var new_ = [];
        exap2.forEach(item => {
            item.forEach(subItem => new_.push(subItem));
        })
        console.log('new_:', new_);

        // by concat and forEach
        var new2_ = [];
        exap2.forEach(item => new2_ = new2_.concat(item));
        console.log('new2_', new2_);

        // by reduce and concat
        var new3_ = exap2.reduce((prev, next) => prev.concat(next), []);
        console.log('new3_', new3_);

        // by apply and concat
        var new4_ = Array.prototype.concat.apply([], exap2);
        console.log('new4_', new4_);
        break;

    case 'copywithin':
        var examp = ['a', 'b', 'c', 'd', 1];
        var res = examp.copyWithin();
        res.push('1');
        console.log(examp, res);  // 原数组始终会被改变

        var examp2 = { 0: 'a', 1: 'b', 2: 'c', 3: 'xx', length: 4 }
        var res2 = Array.prototype.copyWithin.call(examp2, 1, 3);
        console.log(examp2, res2);
        break;

    // 返回一个键值对的迭代器
    case 'entries':
        var examp = ['a', 'b', 'c'];
        var entries = examp.entries();

        for(let [index, elem] of entries) {
            console.log(index, elem);
        }
        break;

    case 'every':
        var examp = [3, 4, 5, 6];

        var res = examp.every(function(item) {
            console.log(this);
            return item > 2;
        }, [1]);
        console.log(res);
        break;

    case 'some':
        var examp = [3, 4, 5, 6];
        var res = examp.some(item => item > 4);
        console.log(res);
        break;

    case 'fill':
        var examp = [3, 4, 5, 6];
        var res = examp.fill('a', 1);
        console.log(res, examp);
        break;

    case 'filter':
        var examp = [3, 4, 5, 6, 'a'];
        var res = examp.filter(item => typeof item == 'number');
        console.log(examp, res);
        break;

    case 'find':
        // 找到返回true的某一项
        var examp = [3, 4, 5, 6];
        var res = examp.find(item => item > 3);
        console.log(res);
        break;
    default:

    case 'findIndex':
        var examp = [3, 4, 5];
        var res = examp.findIndex(item => item > 3);
        console.log(res, examp);

    case 'forEach': // 单纯的遍历数组
        var examp = [3, 4, 5];
        var res = examp.forEach(item => item + 1);
        console.log(examp, res);
        // [3, 4, 5]   undefined
        break;

    case 'includes': // 判断指定位置是否是指定元素
        var examp = [3, 4, 5];
        var res = examp.includes(3);    // true
        var foo = examp.includes(3, 2); // false
        console.log(examp, res);
        break;

    // 判断指定位置是否包含指定元素
    // 有返回该元素在数组中的位置，没有则返回-1
    case 'indexOf':
        var examp = [3, 4, 5];
        var res = examp.indexOf(4);
        var foo = examp.indexOf(4, 2);
        console.log(res, foo);
        break;

    // 与indexOf唯一不同的地方在于查找方向是相反的
    case 'lastIndexOf':
        var examp = [3, 4, 5];
        var res = examp.lastIndexOf(4);
        var foo = examp.lastIndexOf(4, 0);
        console.log(res, foo);
        break;

    case 'join':
        var examp = [3, 4, 5];
        var res = examp.join('=');
        console.log(examp, res);

        var boo = [].join.call(likeArray, ' ');
        console.log(boo); // hello world ! ~
        break;

    case 'keys': // 返回一个键名的迭代器
        var examp = [3, 4, 5];
        var res = examp.keys();
        for(let index of res) {
            console.log(index);  // 0, 1, 2
        }
        break;

    // 返回一个键值的迭代器
    // 仅Edge支持
    // case 'values':
    //     var examp = [3, 4, 5];
    //     var res = examp.values();
    //     for(let elem of res) {
    //         console.log(elem);  // 0, 1, 2
    //     }
    //     break;

    // 遍历数组并返回每一子项处理结果组成的新数组
    case 'map':
        var examp = [3, 4, 5];
        var res = examp.map(item => item + 1);
        console.log(examp, res);
        // [3, 4, 5]   [4, 5, 6]
        break;

    // 聚合函数
    // callback
    // 第二个参数手动设定聚合的初始结果，作为第一项参与聚合运算
    // callback 共4个参数，第一个表示聚合的结果，如果未设定初始结果，会将第一项作为初始结果，会不断的累计
    // 第二个表示数组当前项目，如果未设定初始结果，从第二项开始
    // 第三个参数为当前处理结果的索引值
    // 第四个参数表示当前数组
    case 'reduce':
        var str = 'aaabdddbddsssdd';
        var res = str.split('').reduce((prev, next) => {
            prev[next] = prev[next] ?  (prev[next] + 1) : 1;
            return prev;
        }, {})
        console.log(res);
        break;

    case 'reduceRight':
        var examp = [3, 4, 5];
        var res = examp.reduceRight((res, item) => {
            console.log(res, item);
            return res + item;
        })

        console.log(res);

    // 颠倒数组元素的位置，原数组被改变
    case 'reverse':
        var examp = [3, 4, 5];
        var res = examp.reverse();
        console.log(examp, res);
        break;

    // 数组排序，改变原数组
    // 当直接调用时，排序顺序按照第一个元素来，依次  1-9 a-z
    // 当出现判断条件时，
    // 如果 compareFunction(a, b) < 0, 那么把 元素a 放 在 b 前面
    // 如果 compareFunction(a, b) == 0 || NaN, 位置不变
    // 如果 compareFunction(a, b) > 0, 那么把 元素b 放 在 a 前面
    case 'sort':
        var examp = [5, 3, 12, 22, 6, 'a', 'ssd', 'hell'];
        var res = examp.sort();
        console.log(examp, res);

        var examp2 = [3, 5, 'a', 12, 22, 6, 'b', 'a', 'ssd', 'hell'];
        var res2 = examp2.sort((a, b) => {
            console.log(a, b);
            return a - b;
        })
        console.log(examp2, res2);

        var res3 = [{ name: 'TOM', age: 22 }, { name: 'jake', age: 12 }, { name: 'faker', age: 23 }]
        var res3 = res3.sort((a, b) => a.age - b.age);
        console.log(res3);

        var res4 = res3.sort((a, b) => {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }

            if (nameA > nameB) {
                return 1;
            }
            return 0;
        })
        console.log(res4);

        // 只有当compareFunction(a, b) 运算结果大于0时，元素位置才会交换
        var examp5 = [1, 3, 'a', 'c'];
        examp5.sort(function() { return 1 });
        console.log(examp5);
        break;

    case 'slice':
        var examp = [1, 2, 3, 4, 5, 6, 7, 8];
        var new_ = examp.slice(0, 2); // 负数，则倒着数
        console.log(new_);

        var p = { name: 'TOM', age: 20 }
        var examp2 = [p, 20, 'ame'];
        var new2_ = examp2.slice(0, 2);

        p.name = 'Alex';
        console.log(examp2[0].name, new2_[0].name);  // 引用指向的对象是相同的，因此改变之后会导致所有的数据都改变了
        break;

    // array.splice(start)
    // array.splice(start, deleteCount)
    // array.splice(start, deleteCount, item1, item2, ...) //
    // 位置 | 个数 | 要替换的具体元素
    // 会直接修改数组，返回被替换的元素
    case 'splice':
        var examp = [1, 2, 3, 4, 5, 6, 7, 8];
        var new_ = examp.splice(3, 2, 'a');
        console.log(examp, new_);
        break;

    // 删除数组最末尾的元素，并返回该元素
    case 'pop':
        var examp = [1, 2, 3];
        var res = examp.pop();
        console.log(examp, res);   // [1, 2], 3
        break;

    // 将指定元素添加到数组末尾, 并返回修改之后的数组长度
    // arr.push(element1[, ...[, elementN]])
    case 'push':
        var examp = [1, 2, 3];
        var res = examp.push(4, 5);
        console.log(examp, res);
        break;

    // 删除数组最前面的元素，并返回该元素
    case 'shift':
        var examp = [1, 2, 3];
        var res = examp.shift();
        console.log(examp, res); // [2, 3], 1
        break;

  // 在数组前面添加元素，并返回修改之后的数组长度
    case 'unshift':
        var examp = [1, 2, 3];
        var res = examp.unshift('a', 'b');
        console.log(examp, res); //  ["a", "b", 1, 2, 3], 5
        break;

    /*-------工具方法---------*/

    // of 将所有参数作为子元素，创建一个新的数组
    case 'of':
        var examp = Array.of(1, 2, 3);
        console.log(examp);
        break;

    // 判断目标对象是否为数组
    case 'isArray':
        var re1 = Array.isArray(1); // false
        var re2 = Array.isArray([]); // true
        console.log(re1, re2);
        break;

    // 将类数组对象或者可迭代的数据对象转化为数组
    case 'from':
        Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']

        var s = new Set(['foo', window]);
        Array.from(s);  // ["foo", Window]

        var m = new Map([[1, 2], [2, 4], [4, 8]]);
        Array.from(m);
        // [[1, 2], [2, 4], [4, 8]]

        function f() {
          return Array.from(arguments);
        }

        f(1, 2, 3);
        // [1, 2, 3]

        var ex = [1, 2, 3]
        var res = Array.from(ex, function(item, i) {
            console.log(item, i)
            return item + 20
        })

        console.log(ex, res);
        break;
}

// 是否改变原数组
// 是否能被Array-like调用
//


// 常见问题
// 如何判断一个变量是否为数组
// 数组的原生方法有哪些？
// 如何将一个类数组变量转化为数组？
// 说一说ES6中对于数组有哪些扩展
// 数组去重，你能说出多少种方法？
// 你知道Array.prototype的类型是什么吗？
// 如何“打平”一个嵌套数组，如[1,[2,[3]],4,[5]] => [1,2,3,4,5]?你能说出多少种方法？
// 如何克隆一个数组？你能说出多少种？
// 说一说Array.prototype.sort()方法的原理？（追问：不传递参数会如何？）
// 找出Array中的最大元素，你能说出几种方法？
