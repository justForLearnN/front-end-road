/*
 * 2. 自定义构造函数
 */
'use strict';

var Person = function(name) {
    this.name = name;
    this.getName = function() {
        return this.name;
    }
}

var person1 = new Person('tom');
var person2 = new Person('tim');

console.log(person1 instanceof Person);
console.log(person1.getName == person2.getName);

console.log(person1.name);
console.log(person1.getName());

// 工厂模式
function person(name) {
    var o = new Object();
    o.name = name;
    o.getName = function() {
        return this.name;
    }
    return o;
}
var person1 = person('rose');
var person2 = person('jake');
console.log(person1 instanceof person);
console.log(person1.getName == person2.getName);
