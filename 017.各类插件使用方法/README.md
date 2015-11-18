- css3中可以使用`animation`来创建动画，详细信息如下
    + `animation-name`
        规定需要绑定到选择器的keyframes的名称，可以在css文件中声明，在本例中，使用了插件`css3-animation.js`生成了很多已经定义好的keyframes名称，可以直接使用
    + `animation-duration`
        动画完成所需要的时间
    + `animation-timing-function`
        规定动画的速度曲线，如ease，linear等
    + `animation-delay`
        延迟时间
    + `animation-iteration-count`
        规定动画的播放次数 `n` `infinite`
    + `animation-direction`
        规定是否应该反向播放动画 `normal` `alternate`

- 在实例中使用如下代码即可实现全屏切换效果，使用`pageSwitch`完成，关于`pageSwitch`的详细用法，可以点[这里](https://github.com/qiqiboy/pageSwitch)查看
```js
var pw = new pageSwitch('wrap', {
        duration: 600,
        direction: 1,
        start: 0,
        loop: true,
        ease: 'ease',
        transition: 'slide',
        freeze: false,
        mouse: false,
        mousewheel: false,
        autoplay: false
    });
```

- `var pages = $(pw.pages)`  
使用`console.log(pw)` 查看pw对象，可以发现pw.pages是一个由page页组成的DOMList.因此这里使用$(pw.pages)可以得到该DomList的jq对象.

- 使用`pw.on` 绑定事件，
transition切换动画发生前执行
```js
pw.on('before', function(now, next) {});
```
transition切换动画发生后执行
```js
pw.on('after', function(now, prev) {});
```

- keyframes 动画创建
    + 在css中创建
    + 使用JS2CSSKeyframes创建
        ```js
        var fly = new JS2CSSKeyframes('fly', {
            '0%': 'transform: scale(1)',
            '100%': 'transform: scale(1.5)'
        })
        ```

    + 使用css3-animation.js中已经创建好的名称

- css 初始状态
需要运动的对象在添加class时，需要添加如下初始化形态
```css
.aninode { visibility: hidden; }
.animated, .animated .aninode { visibility: visible; }
```

>在使用addClass的方式添加动画时，可以让`.animated`为动画元素的父级，这样js代码将会非常简单，直接添加animated就能控制多个不同元素的不同动画效果，只需在css中设置。

```scss
section {
    ... ...
    &.animated {
        head { animation:flyTopIn .5s ease; }
        p { animation:pulse .8s ease; }
    }
}
```
















