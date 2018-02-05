console.log('hello, nodejs.');
var a = 10;
// console.log(a);
//console.log(global.a);
//global.a = 100;
//console.log(global.a);

var d = new Date();
console.log(d.getFullYear());
console.log(d.getMonth() + 1);


//var a = 100;
//global.a = 200;
//console.log(a);
//console.log(global.a);

//console.log(__filename);

// console.log(global);

var Person = function(name) {
	this.name = name;
}
Person.prototype.run = function() {
	return this.name;
}

var p1 = new Person('leo');
console.log(p1.run());

console.log(module.exports === exports);

console.log(__filename);
console.log(__dirname);
console.log(process.arch);