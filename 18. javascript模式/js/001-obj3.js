/*
 * 原型模式
 */

 function Person(name) {
     this.name = name;
 }
 Person.prototype.getName = function() {
     return this.name;
 }

 var person1 = new Person('rose');
 var person2 = new Person('Jake');

console.log(person1 instanceof Person);
console.log(person1.getName === person2.getName);

function Cat(name) {
    this.name = name;
    this.age = 12;
    this.getName = function() {
        return 'constructor';
    }
}
Cat.prototype.name = 'proto name';
Cat.prototype.getName = function() {
    return this.name;
}

var tim = new Cat('Tim');
console.log(tim.name);
console.log(tim.getName());
