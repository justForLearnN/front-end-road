$(function() {

var amount = response.length;
var resList = $('.result_list li');
var page_every = 6;
var page_acount = acountPage(response, page_every);
var page_cur = 1;
var index = 0;

// 计算按钮的页码的两个变量，分别是btn_acount总共多少页, btn_cur 按钮当前页
var btn_acount = Math.ceil(page_acount/5); // 每页5个按钮
var btn_cur = 1;

showPage(page_cur, page_every);
showButton(page_cur, page_acount);
setFocus();

$('.pos_page').on('click', function(e) {
	// e.preventDefault();
	var target = e.target;
	var $target = $(target);
	var className = $target.attr('class').split(' ')[0];

	$target.on('selectstart', function() {
		return false;
	});

	switch(className) {
		case 'prev_page':
			if (index!=0) {
				index -= 1;
				page_cur -= 1;
			} else if (index == 0) {
				if (btn_cur > 1 ) {
					index = 4;
					btn_cur -= 1;
					page_cur -= 1;
				} else if (btn_cur == 1) {
					return;
				}
			};
			showPage(page_cur, page_every);
			showButton();
			setFocus();
			break;
		case 'next_page':
			if (btn_cur == btn_acount) {
				if (index == page_acount%5 - 1) {
					return;
				} else if( index < page_acount%5 - 1) {
					index ++;
					page_cur ++;
				}
			} else if (btn_cur < btn_acount) {
				if (index == 4) {
					index = 0;
					btn_cur += 1;
					page_cur += 1;
				} else if (index < 4) {
					index ++;
					page_cur++;
				};
			};
			showPage(page_cur, page_every);
			showButton();
			setFocus();
			break;
		case 'numb':
			page_cur = $target.attr('data-list');
			index = page_cur%5-1;
			console.log(page_cur);
			showPage(page_cur, page_every);
			showButton();
			setFocus();
			break;
		case 'more': 
			console.log('more');
			if (btn_cur < btn_acount) {
				btn_cur += 1;
				index = 0;
				showButton();
				setFocus();

				page_cur = $('.numb').eq(0).html();
				showPage(page_cur, page_every);
			};
			break;
		case 'last':
			if (btn_cur != btn_acount) {
				btn_cur = btn_acount;
				index = 0;
				page_cur = (btn_cur - 1)*5 +1;
				showPage(page_cur, page_every);
				showButton();
				setFocus();
			};
		default:
			break;
	}
});

/*
 *@param Number `cur_page` 要显示的页数
 *@param Number `num` 一页要显示的数目
 *从全局获取的参数 `page_acount` 总页数 `amount` 总数目 `resList` 列表DOM `response` 存放数据的JSON 
 */
function showPage(cur_page, num) {
	var min = 0;
	var max = 0;
	min = (cur_page-1)*num;
	if (cur_page == page_acount) {
		max = amount - 1;
	} else {
		max = cur_page*num - 1;
	}

	resList.css('display', 'none');

	var j = 0;
	for( var i=min; i<max; i++ ) {
		resList.eq(j).children('.title').html(response[i].title);
		resList.eq(j).children('.url').children('a').html(response[i].url);
		resList.eq(j).children('.desc').html(response[i].desc);
		resList.eq(j).css('display', 'block');
		j++;
	}
}

function showButton() {
	/*var $numb = $('.numb');
	if (btn_acount == 1) {
		$numb.hide();
		$('.more').hide();
		$('.last').hide();
		for(var i=0; i<acountPage; i++) {
			$numb.eq(i).show();
			$numb.eq(i).attr('data-list', i);
		}
	};

	var min = (btn_cur-1)*5 + 1;
	var max = 0;
	if (btn_cur == btn_acount) {
		max = page_acount+1;
	} else if (btn_cur < btn_acount) {
		max = btn_cur*5+1;
	};

	$numb.hide();

	console.log(page_acount);
	for( var i=min; i<max; i++ ) {
		$numb.eq(i%5 - 1).show();
		$numb.eq(i%5 - 1).attr('data-list', i);
		$numb.eq(i%5 - 1).html(i);
	}*/
	var 
		$numb = $('.numb'),
	 	min = min = (btn_cur-1)*5 + 1, 
	 	max = 0;

	 if (btn_cur == btn_acount) {
	 	max = page_acount + 1;
	 } else if (btn_cur < btn_acount) {
	 	max = (btn_cur*5) + 1;
	 };

	 $numb.hide();

	 for(var i=min; i<max; i++) {
	 	!function() {
	 		$numb.eq(i%5 - 1).show();
	 		$numb.eq(i%5 - 1).attr('data-list', i);
	 	$numb.eq(i%5 - 1).html(i);
	 	}();
	 }
} 

function setFocus() {
	var $numb = $('.numb');
	$numb.removeClass('active');
	$numb.eq(index).addClass('active');
}

 /*
  *@param Array/Object `obj` 传入数组或者json
  *@param Number `num` 每一页需要显示的数目
  *@return Number 返回有多少页 
  */
function acountPage(obj, num) {
	if (obj instanceof Array) {
		return Math.ceil(obj.length/num);
	} else {
		return Math.ceil(jsonLength(obj)/num);
	}
}

/*
 *@param Object `json` 需要被获取长度的json对象
 *@return int 返回长度值
 */
function jsonLength(json) {
	var count = 0;
	for(var i in json) {
		count ++;
	}
	return count;
}


});