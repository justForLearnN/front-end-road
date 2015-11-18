#####  replace 方法的使用
```js
var initString = 'sdfin, 23s sdflkse fsdfwe sdx dfe s 12sd ss s';

var endString = initString.replace(/\b\d+[a-z]+\b/g, function(aa, bb) {
    console.log(aa, bb);
    return 'sdf';
});
console.log(endString);
```
第一个参数为正则表达式，  
第二个参数如果为字符串，则将匹配成功的字符替换成该字符串  
第二个参数如果为函数，则将匹配成功的字符替换成函数返回的值，该函数遍历匹配成功的字符的数组，第一个参数为匹配成功的字符，第二个参数为当前字符在原始字符串中的起始位置