/*
 * 5. jQuery中创建对象的方式
 */

 (function(window, undefined) {
     var Person = function(name) {
         return new Person.fn.init(name);
     }

     Person.prototype = Person.fn = {
         constructor: Person,

         init: function(name) {
             this.name = name;
            //  return this;
         },

         getName: function() {
             return this.name;
         }
     }
     Person.fn.init.prototype = Person.fn;
     window.Person = window.$ = Person;
 })(window);

 console.log($('tom').getName());
