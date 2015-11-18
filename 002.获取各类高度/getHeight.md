关于document的几种属性
```js
document.body;  // 指向body
document.documentElement; // 指向html
```
在获取滚动高度时，ie6+ 不再支持document.body, 而其他浏览器则仅仅支持document.body, 因此做如下处理
```js
var scrollTop = document.documentElement ? document.documentElement.scrollTop : document.body.scrollTop;

// or  因为对我来说，使用非IE浏览器的情况多一点，因此将.body写在左边
var scrollTop = document.body.scrollTop || document.documentElement.scrollTop; 
```
在jQuery下，任然有body与documentElement支持度不同的情况，不过可以直接使用
```js
var scrollTop = $(document).scrollTop();
```

offset 与 client
offset前缀的属性表示要加上边框，client的属性表示不用加上边框
```js
var box = document.getElementById('box');

//content + padding + border
box.offsetHeight; // 140

// content + padding
box.clientHeight;// 120
```

获取高度在jQuery中和获取宽度表现一致
```js
// content 
$xx.height();

// content padding
$xx.outerHeight();

//content padding border
$xx.outerHeight(true);
```