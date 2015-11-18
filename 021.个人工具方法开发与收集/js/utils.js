/**
 * author: yangbo
 */

'use strict';

var utils = {

// 将css属性转换为javascript特性值  如-webkit-transition --> WebkitTransition
toCamelCase: function(str) {
    return str.replace(/^-ms-/, "ms-").replace(/-([a-z]|[0-9])/ig, function(all, letter) {
        return (letter + "").toUpperCase();
    });
},

// 将javascript特性值转换为css属性  如 WebkitTransition --> -webkit-transition
unCamelCase: function(str) {
    return str.replace(/([A-Z]|^ms)/g, "-$1").toLowerCase();
},

removeClass = function(id, value) {
    var classes = ( value || "" ).match( /\S+/g ) || [],//将要删除的样式, 拆分成数组
        elem = document.getElementById(id),
        cls, cur;

    //如果没找到
    if(!elem){
        return;
    }

    //得到当前的 class
    cur = elem.nodeType === 1 && ( elem.className ?
        ( " " + elem.className + " " ).replace( /[\t\r\n\f]/g, " " ) :
        ""
    );

    if ( cur ) {//如果当前有样式
        //取出一个要删除的样式名
        while ( (cls = classes.shift()) ) {
            //找样式
            while ( cur.indexOf( " " + cls + " " ) >= 0 ) {
                //删除样式
                cur = cur.replace( " " + cls + " ", " " );
            }
        }
    }

    //更新样式
    elem.className = cur.trim();
},


getParam: function(url, key) {
        if (!url) { return };
        var arr = url.slice(url.indexOf('?') + 1).split('&');
        return function() {
            for(var item in arr) {
                var otherArr = arr[item].split('=');
                if (otherArr[0] == key) {
                    return otherArr[1];
                };
            }
        }();
    }

}
