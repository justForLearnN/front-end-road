/**
 * author: yangbo
 */
'use strict';

(function(window, undefined) {

// constructor
var animate = function(elem) {
    return new animate.fn.init(elem);
}

animate.prototype = animate.fn = {
    constructor: animate,
    init: function(elem) {
        if (typeof elem === 'string' && elem.indexOf('#') === 0) {
            var id = elem.slice(1);
            this.elem = document.getElementById(id);
        }
        else if (typeof elem === 'string' && elem.indexOf('.') === 0) {
            var cls = elem.slice(1);
            this.elem = document.getElementsByClassName(cls)[0];
        }
        else if (typeof elem === 'string' && elem.indexOf('#') === -1 && elem.indexOf('.') === -1) {
            this.elem = document.getElementsByTagName(elem)[0];
        }
        else if (typeof elem === 'object') {
            this.elem = elem;
        }
    },
    css: function(attr, value) {

        // 获取
        if (arguments.length === 1) {
            return this.elem.currentStyle ? this.elem.currentStyle[attr] : document.defaultView.getComputedStyle(this.elem, false)[attr];
        }

        // 设置
        else if (arguments.length === 2) {
            var _a = ['width', 'height', 'left', 'top'];

            // 属性为透明度
            if (attr == 'opacity') {
                this.elem.style[attr] = value/100;
                this.elem.style.filter = 'alpha("opacity='+ value +'")';
            }

            // 属性为_a数组中的元素
            else if (_a.indexOf(attr) != -1) {
                if (typeof attr === 'number' || attr.indexOf('px') === -1) {
                    this.elem.style[attr] = value + 'px';
                }
                else if (typeof attr === 'string' || attr.indexOf('px') !== -1 ) {
                    this.elem.style[attr] = value;
                }
            } else {
                this.elem.style[attr] = value;
            }
            return this;
        }
    },
    animate: function(properties, duration, fx, fn) {

        // 处理参数
        if (typeof properties != 'object') {
            return;
        }

        if (typeof duration === 'undefined') {
            duration = 400;
            fx = 'linear';
        }

        if (typeof duration === 'string') {
            if (typeof fx === 'function') {
                fn = fx;
            }
            fx = duration;
            duration = 400;
        }

        if (typeof duration === 'function') {
            fn = duration;
            fx = 'linear';
            duration = 400;
        }

        if (typeof duration === 'number') {
            if (typeof fx === 'function') {
                fn = fx;
                fx = 'linear';
            } else if (typeof fx === 'undefined') {
                fx = 'linear';
            }
        }

        if (this.css('position') === 'static') {
            return;
        }
        else {
            if (this.css('left') === 'auto') {
                this.css('left', 0);
            }
            if (this.css('top') === 'auto') {
                this.css('top', 0);
            }
        }

        // 初始值
        var initValue = {},
            self = this;

        for(var item in properties) {
            initValue[item] = 0;
            if (item == 'opacity') {
                initValue[item] = Math.round(this.css(item) * 100);
            }
            else {
                initValue[item] = parseInt(this.css(item));
            }
        }

        // 开始时间
        var initTime = (new Date()).getTime();

        clearInterval(this.elem.timer);

        this.elem.timer = setInterval(function(){

            // 运动当前时刻的时间
            var curTime = (new Date()).getTime();

            // 计算出一个用于和目标时间相比的时间值，当该值与目标时间相等，运动结束
            var t = duration - Math.max(0, initTime - curTime + duration);

            for(var item in properties) {
                var value = Tween[fx](t, initValue[item], parseInt(properties[item])-initValue[item], duration);
                self.css(item, value);
            }

            if (t === duration) {
                clearInterval(self.elem.timer);
                fn && fn.call(self.elem);
            }
        }, 13);

        return this;
    }
}

var Tween = {

    //匀速
    linear: function (t, b, c, d){ return c * t/d + b; },

    //加速曲线
    easeIn: function(t, b, c, d){ return c * (t/=d) * t + b; },

    //减速曲线
    easeOut: function(t, b, c, d){ return -c *(t/=d)*(t-2) + b; },

    //加速减速曲线
    easeBoth: function(t, b, c, d){
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },

    //加加速曲线
    easeInStrong: function(t, b, c, d){ return c*(t/=d)*t*t*t + b; },

    //减减速曲线
    easeOutStrong: function(t, b, c, d){ return -c * ((t=t/d-1)*t*t*t - 1) + b; },

    //加加速减减速曲线
    easeBothStrong: function(t, b, c, d){
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },

    //正弦衰减曲线（弹动渐入）
    elasticIn: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },

    //正弦增强曲线（弹动渐出）
    elasticOut: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },

    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                    Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },

    //回退加速（回退渐入）
    backIn: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
           s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 3.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },

    //弹球减振（弹球渐出）
    bounceIn: function(t, b, c, d){ return c - Tween['bounceOut'](d-t, 0, c, d) + b; },

    bounceOut: function(t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },

    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
}

animate.fn.init.prototype = animate.fn;

// 针对模板模式
if (typeof module === "object" && module && typeof module.exports === "object") {
	module.exports = animate;
} else {

    // 定义成require模板
	if (typeof define === "function" && define.amd) {
		define("animate", [], function() {
            return animate;
        } );
	}
}

if ( typeof window === "object" && typeof window.document === "object" ) {
	window.animate = window.__ = animate;
}

})(window);
