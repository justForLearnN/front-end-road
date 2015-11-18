/*
 * 4. 原型模式中，this指向问题
 */

 function Person(name) {
     this.name = name;
    //  this.getName = function() {
    //      return 'constructor';
    //  }
 }
 Person.prototype.getName = function() {
     return this.name;
 }
 Person.prototype.showName = function() {
     return this.getName();
 }

var rose = new Person('rose');
console.log(rose.showName()); //rose
