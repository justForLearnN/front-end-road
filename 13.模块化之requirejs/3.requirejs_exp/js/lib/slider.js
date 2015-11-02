/*
 * slider.js
 * version 1.0
 */

define(function(require) {
	var $ = require('jquery');

	var Slider = function(bar) {

		this.$bar = bar;

		this.defaults = {
			curL: 0,
			curX: 0
		};
	}

	Slider.prototype = {

		constructor: Slider,

		timer: null,

		disX: 0,

		index: 0,

		getPWidth: function() {
			return this.$bar.parent().width();
		},

		pageX: function(e) {
			return (e.originalEvent instanceof MouseEvent) ? e.pageX : e.originalEvent.changedTouches[0].pageX;
		},

		fnStart: function(e) {

			e.preventDefault();

			clearInterval(this.timer);

			// console.log('fnstart:' + (this.constructor));

			this.defaults.curL = this.$bar.css('left') == 'auto' ? 0 : this.$bar.css('left');
			this.defaults.curX = this.pageX(e);

			// console.log(this.defaults.curX);

			$(document).on('mousemove touchmove', this.bindthis(this.fnMove, this));
			$(document).on('mouseup touchend', this.bindthis(this.fnEnd, this));
		},

		fnMove: function(e) {

			e.preventDefault();
			// console.log('fnmove:' + (this instanceof Slider));

			this.disX = this.pageX(e) - this.defaults.curX;

			if (this.index == this.$bar.children().length - 1) {
				if (this.disX < - this.getPWidth()/4 ) {
					this.disX = - this.getPWidth()/4;
				};
			};

			if (this.index == 0) {
				if (this.disX > this.getPWidth()/4) {
					this.disX = this.getPWidth()/4;
				};
			};

			console.log(this.disX);

			this.$bar.css('left', this.disX + parseInt(this.defaults.curL));
		},

		fnEnd: function(e) {
			var _this = this;
			if (_this.disX < 0) {
				if (_this.index < _this.$bar.children().length - 1) {
					_this.index ++;
				};
			} else if(_this.disX > 0)  {
				if (_this.index > 0) {
					_this.index --;
				};
			}

			$(document).off('mousemove touchmove');
			$(document).off('mouseup touchend');
			_this.$bar.off('mousedown touchstart');

			_this.$bar.animate({'left': -_this.getPWidth() * _this.index}, function() {

				_this.$bar.on('mousedown touchstart', _this.bindthis(_this.fnStart, _this));
				_this.timer = setInterval(_this.bindthis(_this.autoPlay, _this), 2000);
			})

			// console.log('fnend:' + (_this instanceof Slider));
		},

		autoPlay: function() {
			this.index ++;
			if (this.index == this.$bar.children().length) {
				this.index = 0;
			};
			this.$bar.animate({'left': - this.getPWidth() * this.index});
		},

		sliders: function() {
			// var fn = bindThis(this.fnStart, this);
			console.log('sliders:' + this.defaults.curX);
			this.$bar.on('mousedown touchstart', this.bindthis(this.fnStart, this));
			this.timer = setInterval(this.bindthis(this.autoPlay, this), 2000);

			return this.$bar;
		},
		bindthis: function(fn, obj) {
			if (fn.bind) {
				return fn.bind(obj);
			};
			return function() {
				return fn.apply(obj, arguments);
			}
		}
	}

	/*function bindThis(fn, obj) {
		if (fn.bind)
		   return fn.bind(obj);

		return function () {
			return fn.apply(obj, arguments);
		}
	}*/

	$.fn.sliderB = function() {

		var be = new Slider($(this));

		return be.sliders();
	}
	// return $;
});

