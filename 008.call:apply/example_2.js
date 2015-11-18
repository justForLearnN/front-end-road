/*
 * call/apply 应用实例 2 
 * 实现继承
 * 若为js文件，请用node运行，若为html文件，请在浏览器中运行
 */

// 定义父级的构造函数
var Person = function(name, age) {
	this.name = name;
	this.age  = age;
	this.gender = ['man', 'woman'];
}

// 定义子类的构造函数
var Student = function(name, age, high) {

	// use call
	Person.call(this, name, age);
	this.high = high;
}
Student.prototype.message = function() {
	console.log('name:'+this.name+', age:'+this.age+', high:'+this.high+', gender:'+this.gender[0]+';');
}

new Student('xiaom', 12, '150cm').message();

// result
// ----------
// name:xiaom, age:12, high:150cm, gender:man;