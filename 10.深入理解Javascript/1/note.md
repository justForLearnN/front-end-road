```js
object.hasOwnProperty(proName); 
```
判断proName是否是object的属性或者对象/ 判断对象是否具有特定的属性，该属性需用字符串指定
>hasOwnProperty是用来判断一个对象是否具有你给出名称的属性或者对象，不过需要注意的是，此方法无法检测对象的原型中是否具有该属性，只能检测其是否为该对象本身的一个成员

example1: 
```js
var res = 'hello world'.hasOwnProperty('split');
console.log(res); // false

// 但是下面语句能够调用，因为split是String原型中的方法
var resArr = 'hello world'.split(' ');
console.log(resArr); // hello, world
```
example2:
```js
console.log(String.prototype.hasOwnProperty('split')); // true
```
example3:
```js
var fTest = {
    fn: function() {}
}
console.log(fTest.hasOwnProperty('fn')); // true
```
example4: 
```js
var person = {
    name: 'yangbo',
    age : 22,
    gender: 'man'
}
// 给原型添加一个方法
if(typeof Object.prototype.clone === 'undefined') {
    Object.prototype.clone = function() {};
}

for(var attr in person) {
    console.log('pro:' + attr + ', val:' + person[attr]);
}
/*
输出结果：
pro:name, val:yangbo
pro:age, val:22
pro:gender, val:man
pro:clone, val:function () {}
 */

for(var attr in person) {
    if(person.hasOwnProperty(attr)) {
        console.log('pro:' + attr + ',val:' + person[attr]);
    }
}
/*
输出结果：
pro:name,val:yangbo
pro:age,val:22
pro:gender,val:man
 */

```
为了防止你自己对hasOwnProperty进行了重写，可以使用call来避免冲突
```js
for(var i in person) {
    if(Object.prototype.hasOwnProperty.call(person, i)) {
        console.log(i, ':', person[i]);
    }
}
```
为了避免长属性查找对象的所有方法，还可以使用局部变量“缓存它”
```js
var i, hasOwn = Object.prototype.hasOwnProperty;
for(i in person) {
    if(hasOwn.call(person, i)) {
        console.log(i, ':', person[i]);
    }
}
```