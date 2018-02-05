### watch is nodejs?

javascritp 由三部分组成，ECMAScript, BOM, DOM
而node.js则是以ECMAScript为基础，扩展出来的能够操作系统，网络等的一门语言。
因此javascript与nodejs颇有渊源。

### what can nodejs do?

node.js 可以看成是一门以ECMAScript为基础的后台语言

运行第一个nodejs文件.

1. 新建一个名为test-01-hello.js的文件

    ```js
    console.log('hello, nodejs.');
    ```

2. 安装node编译器，到[node官网](https://nodejs.org/en/)下载 
    > .exe 仅仅只是编译器，.msi还包括了npm等工具 
    安装过程很简单，没有特别的设置

3. 在终端terminal或者cmd中，直接输入
    ```js
    $ node
    ```
    可进入node编译器环境

4. 进入到test-01-hello.js文件所在的目录，使用以下指令运行js文件
    ```js
    $ node test-01-hello.js
    ```


### the difference between nodejs and javascript

javascript主要正对浏览器，而nodejs则侧重与系统，文件，网络等.

1. 在ECMAScript 部分，nodejs 与 javascript 是完全一样的
2. 顶层对象, javascript : window
             nodejs:  global  , 在node中，没有window的概念























































