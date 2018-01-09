// map方法的实现

if (typeof Array.prototype._map !== 'function') {
    Array.prototype._map = function(func, context) {
        var temp = [],
            len = this.length,
            i = 0;

        for (; i < len; i++) {
            temp.push(func.call(context, this[i], i, this));
        }

        return temp;
    }
}


var res = [1, 2, 3]._map(function(item) {
    return item + 1;
})
console.log(res);



// findIndex 方法的实现


if (typeof Array.prototype._findIndex !== 'function') {
    Array.prototype._findIndex = function(func, context) {
        var t = -1,
            len = this.length,
            i = 0;

        for(; i < len; i ++) {
            if (func.call(context, this[i], i, this)) {
                t = i;
                break;
            }
        }

        return t;
    }
}


var res2 = [1, 2, 3]._findIndex(item => item > 1);
console.log(res2);
