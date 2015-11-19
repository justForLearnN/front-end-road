##### 标准输入输出流
**标准输入流**
```js
global.process.stdin
```
**标准输出流**
```js
global.process.stdout
```

eg1: `process.stdout.write` 输出

```js
function log(data) {
    process.stdout.write(data);
}

log('hello, world!\n');

// hello, world!
```

eg2: `process.stdin`, 默认情况下，输入流是关闭的，要监听处理输入流数据，首先需要开启输入流
```js
// 首先开启输入流
process.stdin.resume();

log('please input your name: ');

process.stdin.on('data', function(chunk) {
    log('your name: ' + chunk);
    process.exit();
})

// 定义输出函数
function log(data) {
    process.stdout.write(data);
}

/*
please input your name: yangbo
your name: yangbo
 */
```

eg3: 使用输入输出流完成一次加法操作

```js
process.stdin.resume();

var a, b;

log('a: ');

process.stdin.on('data', function(chunk) {
    if (!a) {
        a = Number(chunk);
        log('b: ');
    } else {
        b = Number(chunk);
        log('result: ' + (a + b) +'\n');
        process.exit();
    }
});

function log(data) {
    process.stdout.write(data);
} 

/*
a: 12
b: 23
result: 35
*/
```
