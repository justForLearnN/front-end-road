var str = 'React makes it painless to creaite interactive UIis. ';

var found = str.match(/(i)t/i)

/**
 [
   0: 'it',    // 匹配到的字符串
   1: 'i',     // 括号捕获到的字符串
   index: 12,  // 匹配到字符串的起始索引值
   input: 'React makes it painless to creaite interactive UIis. '    // 原始字符串
 ]
 */


var rep = str.replace(/React/g, (...arg) => {
    console.log(arg);
    return 'Vue'
});
console.log(str, rep);

/*
arg: 详解
["React makes it", "makes", "it", 0, "React makes it painless to creaite interactive UIis. "]
0: "React makes it"   // 匹配到的字符串
1: "makes"     // p1 第一个括号捕获到的字符串
2: "it"  // 第二个括号捕获到的字符串  以及更多
3: 0    // offset 匹配到字符串的索引
4: "React makes it painless to creaite interactive UIis. "   // 原始字符串

如果正则表达式中有g，则不会返回捕获到的参数，与match相同
 */
