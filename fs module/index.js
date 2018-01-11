var fs = require('fs');


var watcher = fs.watch('./index.js', (eventType, filename) => {
    console.log(eventType, filename);
})


// 参考资料 https://www.jianshu.com/p/5683c8a93511

console.log(process.env.NODE_ENV)
