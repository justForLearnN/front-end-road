/*
 * 1. 对象字面量
 */
'use strict';

 var dog = {};

 // add a variable
 dog.name = 'Tom';

 // add a function
 dog.getName = function() {
     return dog.name;
 }
 console.log('dogname', dog.getName());  // dogname Tom

// 改变已经定义过的方法 change the function has defined
dog.getName = function() {
    return 'Jay';
}
console.log('dogname', dog.getName());  // dogname Jay

 // delete the variable
delete dog.name;
console.log(dog.name);  // undefined

// add more function
dog.sayHello = function() {
    return 'hello, world';
}

// 在创建中直接定义属性和方法
var name = 'window';
var cat = {
    name: 'tom',
    getName: function() {
        return this.name;
    }
};

// new 声明对象
var o = new Object();
console.log(o.constructor === Object); // true
var o = new Object(1);
console.log(o.constructor === Number); // true
var o = new Object('This is string.');
console.log(o.constructor === String); // true
var o = new Object(true);
console.log(o.constructor === Boolean); // true
