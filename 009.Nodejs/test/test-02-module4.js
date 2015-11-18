var a = 100;
exports.a = a;

var arr = [1, 2 ,3];
exports = { b: 'xxx' };

function setTimeN(timestamp) {

    var date = new Date();

    // 这样设置之后，就可以使用date.getFullyear等方法来获取时间
    date.setTime(timestamp);

    var
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes();

    str = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;

    return str;
}

console.log(setTimeN(1444646407029));