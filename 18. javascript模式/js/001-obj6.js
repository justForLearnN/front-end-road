/**
 * 6. 使用in判断变量和方法在原型中还是在构造函数之中
 */

 function Person(name) {
     this.name = name;
 }
 Person.prototype = {
     constructor: Person,
     age: 14,
     getName: function() {
         return this.name;
     },
     getAge: function() {
         return this.age;
     }
 }

var person1 = new Person('rose');

// in 只要对象能够访问的属性和方法，都返回true
// hasOwnProperty 只有在构造函数中的属性和方法才返回true, 在原型中会返回false

 console.log('name' in person1); // true
 console.log('getAge' in person1); // true
 console.log(person1.hasOwnProperty('name')); // true
 console.log(person1.hasOwnProperty('age')); // false
 console.log(person1.hasOwnProperty('getAge')); // false

 /**
  *判断属性是否存在与原型中
  */
function isPrototype(obj, val) {
    return !obj.hasOwnProperty(val) && (val in obj);
}
