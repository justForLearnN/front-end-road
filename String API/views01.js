// -webkit-transition 转化为驼峰写法

function camelCase(str) {
    return str.split('-').map(item => {
        return item.replace(item.charAt(0), match => match.toUpperCase())
    }).join('');
}

console.log(camelCase('-webkit-transition'));
