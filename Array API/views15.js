// 遍历一个对象数组，找出包含指定对象所有属性且值都相等的对象集合


function where(collection, source) {
    return collection.reduce((res, cur) => {
        var foo =  true;
        for(var item in source) {
            if (source[item] != cur[item]) {
                foo = false;
            }
        }

        foo && res.push(cur);
        return res;
    }, [])
}


// console.log(where([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" }));
console.log(where([{ "a": 1, "b": 2 }, { "a": 1 }, { "a": 1, "b": 2, "c": 2 }], { "a": 1, "b": 2 }));
