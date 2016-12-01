var ball = $("ball"), shadow = $("shadow");
var objBall = {};

// 根据top值来改变阴影的形状与透明度
var shadowWithBall = function(top) {
	// 0 ~ 500
	var top = top || parseInt(ball.css("top")),
	scale = 1 + (500 - top) / 300;
	opacity = 1 - (500 - top) / 300;
	if (opacity < 0) opacity = 0;
	shadow.css("opacity", opacity)
	.css("WebkitTransform", "scale("+ [scale, scale].join(",") +")")
	.css("transform", "scale("+ [scale, scale].join(",") +")");
},
funFall = function() {
	var start = 0, during = 30;
	var _run = function() {
		start++;
		var top = Tween.Bounce.easeOut(start, objBall.top, 500 - objBall.top, during);
		ball.css("top", top);
		shadowWithBall(top);
		if (start < during) requestAnimationFrame(_run);
	};
	_run();
};
ball.bind("mousedown", function(event) {
	objBall.pageY = event.pageY;
	objBall.flagFollow = true;
});
$(document).bind("mousemove", function(event) {
	if (objBall.flagFollow) {
		var pageY = event.pageY;

        // 总高度 - 拖拽移动的距离       objBall.pageY - pageY   起始值 - 当前值 = 变化值
		objBall.top = 500 - (objBall.pageY - pageY);
		if (objBall.top < 0) {
			objBall.top = 0;
		} else if (objBall.top > 500) {
			objBall.top = 500;
		}
		//cosnole.log(objBall.top);
		ball.css("top", objBall.top);
		shadowWithBall(objBall.top);
	}
});
$(document).bind("mouseup", function(event) {
	if (objBall.flagFollow) funFall();
	objBall.flagFollow = false;
});

var aaaa = setTimeout(function() {
    aa();
}, 2000);

function aa() {
    console.log('xxxx');
    aaaa = setTimeout(aa, 2000)
}

ball.click(function() {
    clearTimeout(aaaa);
});


function foo(id, options) {
    var defaults = {
        speed: 1,
        moving: false
    };

    options = optiosn || {};

    extend(defaults, options);
}
