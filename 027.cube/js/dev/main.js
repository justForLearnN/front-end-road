(function($, undefined) {
	var $box = $('.box');
	var box = document.querySelector('.box');
	var curX = 0;
	var curY = 0;
	var souX = -20;
	var souY = -40;
	var endX = 0;
	var endY = 0;

	box.style.transform = "scale(0.8) rotateX("+ -20 +"deg) rotateY("+ -40 +"deg)";

	$(document).on('touchstart', function(e) {
		e.preventDefault();
		curX = e.changedTouches[0].pageX;
		curY = e.changedTouches[0].pageY;
	});

	$(document).on('touchmove', function(e) {
		e.preventDefault();
		var disX = (e.changedTouches[0].pageX - curX)/2;
		var disY = (e.changedTouches[0].pageY - curY)/2;
		endX = -disY + souX;
		endY = disX + souY;
		box.style.webkitTransform = "scale(0.8) rotateX("+ endX +"deg) rotateY("+ endY +"deg)";
	})

	$(document).on('touchend', function(e) {
		e.preventDefault();
		souX = endX;
		souY = endY;
	})
})(Zepto);
