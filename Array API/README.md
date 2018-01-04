### `Array.length`

1、获取数组长度。

```js
const exp00 = [1, 2, 3, 4, 5];
var len = exp00.length;
console.log('1. exp00\'s length: ', len);
// 1. exp00's length:  5
```

2、当我们需要判断数组是否为空时，不能直接通过隐式转换来判断，而必须根据数组的长度是否为0来判断。

```js
const exp01 = [];
// false
if (exp01) {
  // dosomething
}

// true
if (exp01.length) {
  // dosomething
}
```

3、通过长度读取数组最后一个子项

```js
last = exp00[len - 1];
```

4、改变数组长度会导致数组改变

```js
var arr = [1, 2, 3, 4, 5];
arr.length = 4;
console.log(arr); // [1, 2, 3, 4]
```

### `Array.prototype.concat`

连接数组，并返回一个新的数组。

```js
var exap0 = [1, 2, 3];
var exap1 = ['a', 'b'];

// 1. concat arrays
var new_ = exap0.concat(exap1);
// equal as :  [].concat(exap0, exap1);
console.log('1.', new_); // [1, 2, 3, 'a', b]
```

应用：二位数组的降维处理。

```js
var exap2 = [[1, 2], [4, 2], [5, 6]];

// => [1, 2, 3, 4, 5, 6];
```


实现方法有4种

```js
// 1. 双层循环
var new_ = [];
exap2.forEach(item => {
    item.forEach(subItem => new_.push(subItem));
})
console.log('new_:', new_);

// 2. by concat and forEach
var new2_ = [];
exap2.forEach(item => new2_ = new2_.concat(item));
console.log('new2_', new2_);

// 3. by reduce and concat
var new3_ = exap2.reduce((prev, next) => prev.concat(next), []);
console.log('new3_', new3_);

// 4. by apply and concat   最优方式
var new4_ = Array.prototype.concat.apply([], exap2);
console.log('new4_', new4_);
```
