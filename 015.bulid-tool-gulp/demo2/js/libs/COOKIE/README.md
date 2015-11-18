COOKIE
======

> 使用javascript来获取及设置cookie

## 如何使用
```javascript
// 首先在页面中引入COOKIE.js

//直接调用
COOKIE.has(name); //检测是否有名字为name的cookie
COOKIE.set(key,value,expire,path,domain); //设置一个新cookie，true表示设置成功，false表示设置失败
COOKIE.remove(name,path,domain); //删除名为name的cookie，true表示删除成功，false表示删除失败
COOKIE.get(name); //获取名为name的cookie的值
COOKIE.clear(path,domain); //清除所有cookie

//特殊命名空间方式调用
var myCookie=COOKIE('namespace');
myCookie.has(name); //检测是否有名字为name的cookie
myCookie.set(key,value,expire,path,domain); //设置一个新cookie，true表示设置成功，false表示设置失败
myCookie.remove(name,path,domain); //删除名为name的cookie，true表示删除成功，false表示删除失败
myCookie.get(name); //获取名为name的cookie的值
myCookie.clear(path,domain); //清除所有cookie

//注意：remove和clear方法，如果不设置path或domain，将会删除所有根域、子域、各个深度路径下的cookie。

````

## DEMO 
http://u.boy.im/COOKIE/