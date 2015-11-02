- 事件对象
```js
var event = event || window.event;
```
- 相对位移的不同
 无论是绑定mouse还是绑定touch, 相对位置都是一样，具体如下
 ```js
event.clientX, event.clientY; // 相对于视口
event.pageX, event.pageY; // 相对于body
// 因为之后FF在pageX的属性上表现很良好，而其他浏览器并不是那么好，因此使用clientY+scrollTop来得到pageX的值
var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
pageY = event.clientY + scrollTop;

event.screenX, event.screenY; 相对于屏幕
 ```
 事件对象的差异导致获取鼠标位置的不同
 ```js
// 绑定mouse事件
var x = event.clientX;

// 绑定touch事件
var x = event.changedTouches[0].clientX;
 ```
 > 绑定touch时，event对象下有3个touchList，他们分别是touches, targetTouches, changedTouches, 使用changedTouches是因为在手指离开touchend事件中，touches和targetTouches无法捕捉到对象
 

 - 当我们再jQuery中，将2类事件一起绑定写兼容时，计算鼠标位置可使用originEvent的不同来判断
 ```js
$(document).on('mousedown, touchstart', function(e) {
    var posX = e.originEvent instanceof mouseEvent ? e.clientX : e.originEvent.changedTouches[0].clientX;
});
 ```

 更多信息，请看图.