/*
 * call/apply 应用实例 0 
 * 借用方法
 * 若为js文件，请用node运行，若为html文件，请在浏览器中运行
 */

var foo = {
	name: 'joker',
	showName: function() {
		console.log(this.name);
	}
}

var bar = {
	name: 'rose'
}

// bar 没有showName方法，但是可以借用foo中的showName方法实现相同的效果
foo.showName.call(bar);


// 如果有参数
function _foo(name, str) {
	console.log('hello, ' + name + ', do you want to ' + str);
}

var _bar = null;

_foo.apply(_bar, ['rose', 'dance']);

// result
// ---------------------
// rose
// hello, rose, do you want to dance