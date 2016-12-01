;
(function(ROOT, struct, undefined) {

    var box = document.getElementById('box'),
        evstart = 'ontouchstart' in window ? 'touchstart' : 'mousedown',
        evmove  = 'ontouchmove' in window ? 'touchmove' : 'mousemove',
        evend   = 'ontouchend' in window ? 'touchaend' : 'mouseup',
        eventObj = 'ontouchend' in window ? box : document,
        startX = 0,
        // 获取所有被支持的css特性值
        divstyle = document.createElement('div').style,

        // 返回一个被浏览器支持的css3前缀
        cssVendor = function() {
            var tests = '-webkit- -moz- -o- -ms-'.split(' '),
                prop;
            while (prop == tests.shift()) {
                if (camelCase(prop + 'transform') in divstyle) {
                    return prop;
                }
            }
            return '';
        },
        transition = cssTest('transition'),
        toString = Object.prototype.toString,
        slice = [].slice,
        class2type = {},
        event2type = {},
        event2code = {
            click: 4,
            mousewheel: 5,
            dommousescroll: 5,
            keydown: 6,
            resize: 7
        },
        POINTERTYPES = {
            2: 'touch',
            3: 'pen',
            4: 'mouse',
            pen: 'pen'
        },
        STARTEVENT = [],
        MOUVEEVENT = [],
        EVENT = function() {
            var ret = {},
                status = {
                    start: 1,
                    down: 1,
                    move: 2,
                    end: 3,
                    up: 3,
                    cancel: 3
                };
            each('mouse touch pointer MSPointer-'.split(' '), function(prefix) {
                var _prefix = /pointer/i.test(prefix) ? 'pointer' : prefix;
                ret[_prefix] = ret[_prefix] || {};
                POINTERTYPES[_prefix] = _prefix;
                each(status, function(code, endfix) {
                    // console.log(arguments);
                    var ev = camelCase(prefix + endfix);
                        ret[_prefix][ev] = code;
                        event2type[ev.toLowerCase()] = _prefix;
                        event2code[ev.toLowerCase()] = code;
                    if (code == 1) {
                        STARTEVENT.push(ev);
                    } else {
                        MOUVEEVENT.push(ev);
                    }
                });
            });
            each('otransitionend oTransitionEnd webkitTransitionEnd mozTransitionEnd MSTransitionEnd transitionend'.split(' '), function(ev) {
                STARTEVENT.push(ev);
                event2code[ev.toLowerCase()] = 8;
            });
        }();

    console.log(MOUVEEVENT);

    addEvent(box, evstart, function(ev) {
        startX = ev.pageX || ev.changedTouches[0].pageX;

        addEvent(eventObj, evmove, move);
        addEvent(eventObj, evend, function(ev) {
            offEvent(eventObj, 'mousemove', move);
        })

    });

    function move(ev) {
        console.log(ev.which);
        var curX = ev.pageX || ev.changedTouches[0].pageX;
        var disX = curX - startX;
        css(box, {
            left: (box.offsetLeft + disX) + 'px'
        })
        startX = curX;
    }

    // 判断数据类型，返回字符串
    function type(elem) {
        if (elem == null) {
            return elem + '';
        }
        return Object.prototype.toString.call(elem).replace(/[\[\]]/g, '').split(' ')[1].toLowerCase();
    }

    // 添加事件
    function addEvent(elem, eventstr, handler) {
        if (type(eventstr) == 'object') {
            return each(eventstr, function(eventstr, handler) {
                addEvent(elem, eventstr, handler);
            })
        }
        each(eventstr.split(' '), function(ev) {
            if (elem.addEventListener) {
                elem.addEventListener(ev, handler, false);
            } else if (elem.attachEvent) {
                elem.attachEvent('on' + ev, handler);
            } else elem['on' + ev] = handler;
        });
    }
    function offEvent(elem, eventstr, handler) {
        if (type(eventstr) == 'object') {
            return each(eventstr, function(eventstr, handler) {
                offEvent(elem, eventstr, handler);
            })
        }
        each(eventstr.split(' '), function(ev) {
            if (elem.removeEventListener) {
                elem.removeEventListener(ev, handler, false);
            } else if(elem.detachEvent) {
                elem.detachEvent('on' + ev, handler);
            } else elem['on' + ev] = null;
        });
    }

    // 判断是否是类数组
    function isArrayLike(elem) {
        var tp = type(elem);
        return !!elem && tp != 'function' && tp != 'string' && (elem.length === 0 || elem.length && (elem.nodeType == 1 || (elem.length - 1) in elem));
    }

    // 可以遍历数组与对象 回调函数参数依次为  值 | 序列 | 被遍历的数组或者对象本身
    function each(arr, iterate) {
        if (isArrayLike(arr)) {
            if (type(arr.forEach) == 'function') {
                return arr.forEach(iterate);
            }
            var i = 0,
                len = arr.length,
                item;
            for(; i<len ; i++) {
                item = arr[i];
                if (type(item) != 'undefined') {
                    iterate(item, i, arr);
                }
            }
        } else {
            for(var key in arr) {
                iterate(arr[key], key, arr);
            }
        }
    }

    // 获取/设置元素的属性  当props时一个字符串时，表示获取  当props是一个对象是，表示设置
    function css(elem, props) {
        if (type(props) == 'string') {
            var style = ROOT.getComputedStyle && ROOT.getComputedStyle(elem, null) || elem.currentStyle || elem.style;
            return style[props];
        } else if(type(props) == 'object') {
            each(props, function(value, key) {
                var prop;
                switch (key) {
                    case 'opacity':
                        elem.style.filter = 'alpha(opacity:'+ value +')';
                        elem.style.opacity = value/100;
                        break;
                    default:
                        prop = camelCase(key);
                }
                try {
                    elem.style[prop] = value;
                } catch(e) {}
            })
        }
    }


    // 将css属性转换为js特性值  例如    camelCase('-webkit-transfrom') -> WebkitTransform
    // 因为ms前缀首字母不需要大写，因此做了特殊处理
    function camelCase(str){
        return (str+'').replace(/^-ms-/, 'ms-').replace(/-([a-z]|[0-9])/ig, function(all, letter){
            return (letter+'').toUpperCase();
        });
    }

    // 返回一个当前浏览器支持的css属性对应的js特性值
    function cssTest(name){
        var prop = camelCase(name),
            _prop = camelCase(cssVendor+prop);
        return (prop in divstyle) && prop || (_prop in divstyle) && _prop || '';
    }

    struct.prototype = {
        constructor: struct,
        init: function(config) {
            var self = this;
            this.mouse = config.mouse == null ? true : !!config.mouse;

            var evstart = 'ontouchstart' in window ? 'touchstart' : (this.mouse && 'mousedown'),
                evmove  = 'ontouchmove' in window ? 'touchmove' : (this.mouse && 'mousemove'),
                evend   = 'ontouchend' in window ? 'touchaend' : (this.mouse && 'mouseup'),
                eventObj = 'ontouchend' in window ? box : document;

        },

        handler: function(ev) {

        }
    }


})(window, function(wrapElem, config) {
    this.container = typeof 'wrapElem' == 'string' ? document.getElementById(wrapElem) : wrapElem;
    this.init(config || {});
});
