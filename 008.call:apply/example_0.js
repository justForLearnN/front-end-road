/*
 * call/apply 应用实例 0 
 * 借用方法
 * 若为js文件，请用node运行，若为html文件，请在浏览器中运行
 */

//

function exam(a, b, c, d, e) {

	// 先看看函数的自带属性 arguments 什么是样子的
	console.log(arguments);

	// 使用call/apply将arguments转换为数组, 返回结果为数组，arguments自身不会改变
	var arg = [].slice.call(arguments);

	console.log(arg);
}

exam(2, 8, 9, 10, 3);

// result: 
// { '0': 2, '1': 8, '2': 9, '3': 10, '4': 3 }
// [ 2, 8, 9, 10, 3 ]
// 
// 也常常使用该方法将DOM中的nodelist转换为数组
// [].slice.call( document.getElementsByTagName('li') );