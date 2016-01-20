<h1 id="intro">iScroll, smooth scrolling for the web</h1>
<h1 id="intro">iScroll, 让web平滑滚动</h1>

iScroll is a high performance, small footprint, dependency free, multi-platform javascript scroller.

> iScroll 是一个高性能，小内存，依赖自由，跨平台的javascript滚动插件。

It works on desktop, mobile and smart TV. It has been vigorously optimized for performance and size so to offer the smoothest result on modern and old devices alike.

> 它能在桌面端，移动端，TV端运行。它大力优化了性能与大小, 为现代与老设备上提供了流畅的运行效果

iScroll does not just *scroll*. It can handle any element that needs to be moved with user interaction. It adds scrolling, zooming, panning, infinite scrolling, parallax scrolling, carousels to your projects and manages to do that in just 4kb. Give it a broom and it will also clean up your office.

> iScroll不仅仅是 *滚动*. 他能够处理需要与用户交互移动的任何元素，它增加了滚动，缩放，平移，无限滚动，视差滚动，xxxx，做到这些只需要4kb. 给他一个扫帚，它也将清理你的办公室！

Even on platforms where native scrolling is good enough, iScroll adds features that wouldn't be possible otherwise. Specifically:

> 即使在一些原生滚动不足够好的平台上，iScroll也添加了一些不可能实现的特性，特别是：


* Granular control over the scroll position, even during momentum. You can always get and set the x,y coordinates of the scroller.
 
> 精确控制滚动位置，即使元素处于运动中，你能够设置/获取元素的x,y坐标

* Animation can be customized with user defined easing functions (bounce, elastic, back, ...).

> 使用缓动函数可以定制动画效果 
 
* You can easily hook to a plethora of custom events (onBeforeScrollStart, onScrollStart, onScroll, onScrollEnd, flick, ...).
> 你可以简单的勾入多种自定义事件

* Out of the box multi-platform support. From older Android devices to the latest iPhone, from Chrome to Internet Explorer.
> 开箱即用的多平台支持。从很老的Android设备到最新的iPhone，从chrome到IE

<h2 id="iscroll-versions">The many faces of iScroll</h2>
<h2 id="iscroll-versions">多面的iScroll</h2>

iScroll is all about optimization. To reach the highest performance it has been divided into multiple versions. You can pick the version that better suits your need.
> iScroll都是与优化相关的，为了达到最高的性能，已经被分成了多种版本.你可以选择最适合你的版本

Currently we have the following fragrances:
> 目前我们有以下的版本

* **iscroll.js**, it is the general purpose script. It includes the most commonly used features and grants very high performance in a small footprint.

> **iscroll.js**, 这是一个通用版本，它包含了最常用的功能和grants，小容量，高性能

* **iscroll-lite.js**, it is a stripped down version of the main script. It doesn't support snap, scrollbars, mouse wheel, key bindings. But if all you need is scrolling (especially on mobile) *iScroll lite* is the smallest, fastest solution.
> **iscroll-lite.js**，这是主要脚本的精简版。他不包括snap，滚动条，鼠标滚动，键值绑定。但是如果你所有的需求都在滚动上(特别是移动版),*iScroll lite* 是最小，最快的解决方案。

* **iscroll-probe.js**, probing the current scroll position is a demanding task, that's why I decided to build a dedicated version for it. If you need to know the scrolling position at any given time, this is the iScroll for you. (I'm making some more tests, this might end up in the regular `iscroll.js` script, so keep an eye on it).
> **iscroll-probe.js** 探测当前的滚动位置是一个艰巨的任务，这就是为什么我决定创建一个专门的版本来搞定这个问题。如果你需要知道在任何特定位置，元素滚动的坐标位置，这是最适合你的iScroll版本。（我在做一些测试，这最终可能会融入到`iscroll.js`中去，所以保持关注吧）

* **iscroll-zoom.js**, adds zooming to the standard scroll.
> 在标准滚动效果上增加了缩放特效

* **iscroll-infinite.js**, can do infinite and cached scrolling. Handling very long lists of elements is no easy task for mobile devices. *iScroll infinite* uses a caching mechanism that lets you scroll a potentially infinite number of elements.

> 可以做无限缓存运动。在移动设备上处理长列表元素是一个不简单的任务，*iScroll infinite*使用了缓存机制，可以让你的滚动有无限的潜在元素

<h2 id="getting-started">Getting started</h2>
> 让我们开始吧

So you want to be an iScroll master. Cool, because that is what I'll make you  

> into.如果你想成为一个iScroll大师，那将会很酷，因为我将会带你入门

The best way to learn the iScroll is by looking at the demos. In the archive you'll find a `demo` folder [stuffed with examples](https://github.com/cubiq/iscroll/tree/master/demos). Most of the script features are outlined there.

> 学习iScroll最好的方式就是看demos，在存档中你将会看到一个`demo`文件夹，大多数脚本功能都会在demo中实现

`IScroll` is a class that needs to be initiated for each scrolling area. There's no limit to the number of iScrolls you can have in each page if not that imposed by the device CPU/Memory.

> 对于每个滚动区域来说，`IScroll`是一个必须声明的对象，在每个页面没有限制iScroll的个数

Try to keep the DOM as simple as possible. iScroll uses the hardware compositing layer but there's a limit to the elements the hardware can handle.

> 尽量保持DOM结构的简单.iScroll使用硬件合成层但是对于这个元素的处理有一个限制

The optimal HTML structure is:
> 最佳的html结构如下：

    <div id="wrapper">
        <ul>
            <li>...</li>
            <li>...</li>
            ...
        </ul>
    </div>

iScroll must be applied to the wrapper of the scrolling area. In the above example the `UL` element will be scrolled. Only the first child of the container element is scrolled, additional children are simply ignored.
> iScroll必须在滚动区域添加一个wrapper元素，在上面的例子中，`UL`元素将会滚动。只有容器的第一个子元素会滚动，添加更多的子元素将会被忽略。

<div class="tip">
<p><code>box-shadow</code>, <code>opacity</code>, <code>text-shadow</code> and alpha channels are all properties that don't go very well together with hardware acceleration. Scrolling might look good with few elements but as soon as your DOM becomes more complex you'll start experiencing lag and jerkiness.</p>
`box-shadow`, `opacity`, `text-shadow`, `alpha channels`   
> 都是一些不能够与硬件加速很好的结合在一起，如果只有少量的元素，滚动看上去会很不错，但是如果你的DOM变得复杂，滚动效果就会出现滞后卡顿跳跃等现象。

<p>Sometimes a background image to simulate the shadow performs better than <code>box-shadow</code>. The bottom line is: experiment with CSS properties, you'll be surprised by the difference in performance a small CSS change can do.</p>  

> 有时一个背景图片来模拟阴影效果会比直接使用`box-shadow`效果好。底线是：使用css属性来实验，你会因为一个小的css属性改变带来的想过感到惊讶。

</div>

The minimal call to initiate the script is as follow:

> 最简单的初始化方式如下：

    <script type="text/javascript">
        var myScroll = new IScroll('#wrapper');
    </script>

The first parameter can be a string representing the DOM selector of the scroll container element OR a reference to the element itself. The following is a valid syntax too:

> 第一个参数可以是一个表示DOM选择器的字符串或者是该元素自身，下面也是一个有效的语法：

    var wrapper = document.getElementById('wrapper');
    var myScroll = new IScroll(wrapper);

So basically either you pass the element directly or a string that will be given to `querySelector`. Consequently to select a wrapper by its class name instead of the ID, you'd do:

> 因此传入classname用来代替ID也是可以的

    var myScroll = new IScroll('.wrapper');

Note that iScroll uses `querySelector` not `querySelectorAll`, so only the first occurrence of the selector is used. If you need to apply iScroll to multiple objects you'll have to build your own cycle.

> 需要注意的是iScroll使用的是`querySelector`而不是`querySelectorAll`，因此只有第一个元素会被使用到。如果你需要应用iScroll到多个对象，你必须创建一个循环来处理。

<div class="tip">
<p>You don't strictly need to assign the instance to a variable (<code>myScroll</code>), but it is handy to keep a reference to the iScroll.</p>

> 你完全不需要为实例分配一个变量(myScroll)，不过有了变量也能够方便保持一个参考

<p>For example you could later check the <a href="#scroller-info">scroller position</a> or <a href="#destroy">unload unnecessary events</a> when you don't need the iScroll anymore.</p>

> 举个栗子，当你不再使用iScroll时，就不需要变量。
</div>

<h2 id="initialization">Initialization</h2>初始化

The iScroll needs to be initiated when the DOM is ready. The safest bet is to start it on window `onload` event. `DOMContentLoaded` or inline initialization are also fine but remember that the script needs to know the height/width of the scrolling area. If you have images that don't have explicit width/height declaration, iScroll will most likely end up with a wrong scroller size.

> iScroll需要被初始化当DOM加载完成时。最安全的方式就是使用window的`onload`事件。
`DOMContentLoaded`或者内联初始化也很好但是请记住，script需要知道滚动区域的宽高，如果你的图片没有一个明确的宽高声明，iScroll很可能会因为一个错误的滚动大小而结束。

<div class="important">
<p>Add <code>position:relative</code> or <code>absolute</code> to the scroll container (the wrapper). That alone usually solves most of the problems with wrongly calculated wrapper dimensions.</p>
</div>

> 添加`position: relative`或者`position: absolute`到滚动容器（wrapper），他能够自己解决大多数错误计算容器大小的问题

To sum up, the smallest iScroll configuration is:
> 总的来说，最简单的iScroll配置如下：

    <head>
    ...
    <script type="text/javascript" src="iscroll.js"></script>
    <script type="text/javascript">
    var myScroll;
    function loaded() {
        myScroll = new IScroll('#wrapper');
    }
    </script>
    </head>
    ...
    <body onload="loaded()">
    <div id="wrapper">
        <ul>
            <li>...</li>
            <li>...</li>
            ...
        </ul>
    </div>
    </body>

Refer to the [barebone example](http://lab.cubiq.org/iscroll5/demos/barebone/) for more details on the minimal CSS/HTML requirements.

> 参考该栗子获取更多的详细信息，在这个最小的css/html需求

<div class="tip">
<p>If you have a complex DOM it is sometimes smart to add a little delay from the <code>onload</code> event to iScroll initialization. Executing the iScroll with a 100 or 200 milliseconds delay gives the browser that little rest that can save your ass.</p>
</div>

> 如果你有一个负责的DOM结构，有时你需要机智的在onload事件中延迟初始化iScroll，延迟100或者200毫秒XXX

<h2 id="configuring">Configuring the iScroll</h2>配置iScroll

iScroll can be configured by passing a second parameter during the initialization phase.

> iScroll能够在初始化时通过第二个参数进行配置

    var myScroll = new IScroll('#wrapper', {
        mouseWheel: true,
        scrollbars: true
    });

The example above turns on mouse wheel support and scrollbars.

> 上面的例子开启了鼠标滚动支持和滚动条功能

After initialization you can access the *normalized* values from the `options` object. Eg:

> 初始化之后，你可以通过下面的方式查看配置信息

    console.dir(myScroll.options);

The above will return the configuration the `myScroll` instance will run on. By *normalized* I mean that if you set `useTransform:true` (for example) but the browser doesn't support CSS transforms, `useTransform` will be `false`.

> 上面的执行结果会返回`myScroll`的配置信息。如果你设置了`useTransform: true`但是浏览器不支持css transfroms，`useTransform`的结果还是`false`

<h2 id="the-core">Understanding the core</h2>了解核心

iScroll uses various techniques to scroll based on device/browser capability. **Normally you don't need to configure the engine**, iScroll is smart enough to pick the best for you.

> iScroll基于设备/浏览器能力使用了各种技术来实现滚动。通常你不需要配置该引擎，iScroll足够聪明，他会选择对你来说最好的方式。

Nonetheless it is important to understand which mechanisms iScroll works on and how to configure them.

> 尽管如此，了解iScroll的运行原理并且知道如何配置他任然非常重要。

### <small>options.</small>useTransform

By default the engine uses the `transform` CSS property. Setting this to `false` scrolls like we were in 2007, ie: using the `top`/`left` (and thus the scroller needs to be absolutely positioned).

> 默认情况下，引擎使用`transform`中的css属性. 将其设置为false，将会使用`top/left`属性，而且滚动的容器需要设置`position: absolute`

This might be useful when scrolling sensitive content such as Flash, iframes and videos, but be warned: performance loss is huge.

> 这样可能会对一些铭感内容，比如Flash，iframes，videos非常有用，但是要注意，性能会严重损耗。

Default: `true`

### <small>options.</small>useTransition

iScroll uses CSS transition to perform animations (momentum and bounce). By setting this to `false`, `requestAnimationFrame` is used instead.

> iScroll使用css3中的transition属性来执行动画。如果将其设置为false，`requestAnimationFrame`会用来代替它。

On modern browsers the difference is barely noticeable. On older devices transitions perform better.

> 在现代浏览器中，几乎没有太多区别，在老设备的浏览器上，transition表现得更好。

Default: `true`

### <small>options.</small>HWCompositing

This option tries to put the scroller on the hardware layer by appending `translateZ(0)` to the transform CSS property. This greatly increases performance especially on mobile, but there are situations where you might want to disable it (notably if you have too many elements and the hardware can't catch up).

> 该选项试图通过添加`translateZ(0)`将滚动元素放在硬件层，这将会增加性能特别是在移动端。但是在有的时候你可能需要禁用他（特别是如果你有太多的元素或者硬件跟不上的时候）

Default: `true`

<div class="important">
<p>If unsure leave iScroll decide what's the optimal config. For best performance all the above options should be set to <code>true</code> (or better leave them undefined as they are set to true automatically). You may try to play with them in case you encounter hiccups and memory leaks.</p>
</div>

> 如果不能决定什么是最佳配置，为了获得最佳性能上述所有的选项都应该配置为`true`，(或者更好的方式就是不理他们，因为他们会自动被设置为true，你可以试试和他们一起玩如果你遇到了中断或者内存泄露) 

<h2 id="basic-features">Basic features</h2>基础特性

### <small>options.</small>bounce

When the scroller meets the boundary it performs a small bounce animation. Disabling bounce may help reach smoother results on old or slow devices.

> 当滚动到了边界他会进行小幅度的反弹动画，在旧设备上禁用bounce有助于达到平滑的滚动效果。
Default: `true`

### <small>options.</small>click

To override the native scrolling iScroll has to inhibit some default browser behaviors, such as mouse clicks. If you want your application to respond to the *click* event you have to explicitly set this option to `true`. Please note that it is suggested to use the custom `tap` event instead (see below).

> 要覆盖原生滚动，iScroll需要抑制一些默认的浏览器行为，比如鼠标点击。如果你希望你的应用程序响应点击事件，你必须明确的将该选项设置为`true`，注意，建议使用`tap`事件代替点击。
Default: `false`

### <small>options.</small>disableMouse<br/><small>options.</small>disablePointer<br/><small>options.</small>disableTouch

By default iScroll listens to all pointer events and reacts to the first one that occurs. It may seem a waste of resources but feature detection has proven quite unreliable and this *listen-to-all* approach is our safest bet for wide browser/device compatibility.

> 通过默认的iScroll监听所有的指针事件并响应发生的第一个事件。这似乎是对资源的浪费，但是功能检测已经被证明相当不可靠，*listen-to-all*是我们最安全的选择对于浏览器/设备的兼容性。

If you have an internal mechanism for device detection or you know in advance where your script will run on, you may want to disable all event sets you don't need (mouse, pointer or touch events).

> 如果你有一个内部机制，或者你预先知道你的脚本在哪里运行，你可能需要禁用你不需要的所有事件(mouse，pointer，touch events)

For example to disable mouse and pointer events:

> 栗子：禁用鼠标和点击事件

    var myScroll = new IScroll('#wrapper', {
        disableMouse: true, // 相当于禁用mousemove
        disablePointer: true //  
    });

Default: `false`

### <small>options.</small>eventPassthrough

Sometimes you want to preserve native vertical scroll but being able to add an horizontal iScroll (maybe a carousel). Set this to `true` and the iScroll area will react to horizontal swipes only. Vertical swipes will naturally scroll the whole page.

> 有的时候你想要保留原生的垂直滚动，但是增加一个水平的iScroll滚动。将该属性设置为`true`，iScroll区域就会只响应水平滑动。垂直滑动将会自然的滚动整个页面。

See [event passthrough demo](http://lab.cubiq.org/iscroll5/demos/event-passthrough/) on a mobile device. Note that this can be set to `'horizontal'` to inverse the behavior (native horizontal scroll, vertical iScroll).

> 在移动设备上查看该栗子。注意：如果将该属性设置为`horizontal`，那么行为将会与栗子中相反。
(水平方向上原生滚动，垂直方向iScroll方式滚动)
### <small>options.</small>freeScroll

This is useful mainly on 2D scrollers (when you need to scroll both horizontally and vertically). Normally when you start scrolling in one direction the other is locked.
> 该属性将非常有用，当你需要水平和垂直方向上都滚动。一般情况下，当你想滚动一个方向，另一个方向会被锁定。

Sometimes you just want to move freely with no constrains. In these cases you can set this option to `true`. See [2D scroll demo](http://lab.cubiq.org/iscroll5/demos/2d-scroll/).
> 有的时候你只是想没有约束的自由滚动，在这些情况下，你可以将该选项设置为`true`

Default: `false`

### <small>options.</small>keyBindings

Set this to `true` to activate keyboard (and remote controls) interaction. See the [Key bindings](#key-bindings) section below for more information.
> 设置为`true`，将会激活键盘/遥控器交互。看下面的[key bindings]部分得到更多的信息
Default: `false`

### <small>options.</small>invertWheelDirection

Meaningful when mouse wheel support is activated, in which case it just inverts the scrolling direction. (ie. going down scrolls up and vice-versa).
> 当鼠标滚动支持被激活时，该选项将会变得有意义，它会造成元素往相反方向的滚动。
Default: `false`

### <small>options.</small>momentum

You can turn on/off the momentum animation performed when the user quickly flicks on screen. Turning this off greatly enhance performance.
> 你可以开启/关闭 运动的执行当用户快速点击在屏幕上。关闭这个选项将会极大的提高性能。
Default: `true`

### <small>options.</small>mouseWheel

Listen to the mouse wheel event.
> 监听鼠标滚动事件

Default: `false`

### <small>options.</small>preventDefault

Whether or not to `preventDefault()` when events are fired. This should be left `true` unless you really know what you are doing.
> 是否需要`preventDefault()`当事件被触发的时候，他应该被设置为true，除非你真的知道你正在做什么。

See `preventDefaultException` in the [Advanced features](#advanced-features) for more control over the preventDefault 
> behavior.更多控制默认行为

Default: `true`

### <small>options.</small>scrollbars

Wheter or not to display the default scrollbars. See more in the [Scrollbar](#scrollbar) section.
> 是否需要显示默认的滚动条。了解更多在[Scrollbar](#scrollbar)部分

Default: `false`.

### <small>options.</small>scrollX<br/><small>options.</small>scrollY

By default only vertical scrolling is enabled. If you need to scroll horizontally you have to set `scrollX` to `true`. See [horizontal demo](http://lab.cubiq.org/iscroll5/demos/horizontal/).
> 默认情况下，只有垂直滚动是可用的，如果你需要水平滚动，你需要将`scrollX`设置为`true`

See also the **freeScroll** option.

Default: `scrollX: false`, `scrollY: true`

<div class="important">
<p>Note that <code>scrollX/Y: true</code> has the same effect as <code>overflow: auto</code>. Setting one direction to <code>false</code> helps to spare some checks and thus CPU cycles.</p>
> 注意：scrollX/Y:true ，与`overflow: auto`有相同的效果，设置一个方向为false有助于省去一些检测和cpu周期
</div>

### <small>options.</small>startX<br/><small>options.</small>startY

By default iScroll starts at `0, 0` (top left) position, you can instruct the scroller to kickoff at a different location.
> 默认的滚动起点位置在`0, 0`, 你可以修改其实位置

Default: `0`

### <small>options.</small>tap

Set this to `true` to let iScroll emit a custom `tap` event when the scroll area is clicked/tapped but not scrolled.
> 设置该选项为true，让iScroll当滚动区域被点击但是没有滚动时发出一个自定义的`tap`事件

This is the suggested way to handle user interaction with clickable elements. To listen to the tap event you would add an event listener as you would do for a standard event. Example: 
> 这是处理用户点击交互建议的处理方式。监听tap事件与其他标准事件一样，例如：
    element.addEventListener('tap', doSomething, false); \\ Native
    $('#element').on('tap', doSomething); \\ jQuery
    
You can also customize the event name by passing a string. Eg:
> 你可以传递一个自定义的事件名

    tap: 'myCustomTapEvent'

In this case you'd listen to `myCustomTapEvent`.

Default: `false`

<h2 id="scrollbars">Scrollbars</h2>滚动条

The scrollbars are more than just what the name suggests. In fact internally they are referenced as *indicators*.
> scrollbars不仅仅是滚动条，事实上在内部他们代表了 *indicators*.


An indicator listens to the scroller position and normally it just shows its position in relation to whole, but what it can do is so much more.
> 一个指标监听滚动位置，通常他只是显示其相对位置，但是他还能做的更多

Let's start with the basis.
> 让我们从基础开始吧

### <small>options.</small>scrollbars

As we mentioned in the [Basic features section](#basic-features) there's only one thing that you got to do to activate the scrollbars in all their splendor, and that one thing is:
> 正如我们在基本功能部分提到的，想要激活滚动条只有一件事情可以做，如下：

    var myScroll = new IScroll('#wrapper', {
        scrollbars: true
    });

Of course the default behavior can be personalized.
> 当然，默认行为可以个性化

### <small>options.</small>fadeScrollbars

When not in use the scrollbar fades away. Leave this to `false` to spare resources.
> 当不使用滚动条时，将该选项设置为false可以将滚动条隐藏起来，并且可以节省资源


Default: `false`

### <small>options.</small>interactiveScrollbars 交互式滚动条

The scrollbar becomes draggable and user can interact with it.
> 滚动条变得可以拖动，用户可以与他进行交互

Default: `false`

### <small>options.</small>resizeScrollbars 

The scrollbar size changes based on the proportion between the wrapper and the scroller width/height. Setting this to `false` makes the scrollbar a fixed size. This might be useful in case of custom styled scrollbars ([see below](#styling-the-scrollbar)).
> 滚动条的大小会根据wrapper与滚动区域的宽高进行变化，将该选项设置为`false`会让滚动条固定大小。这可能会对自定义滚动条有帮助。

Default: `true`

### <small>options.</small>shrinkScrollbars 收缩滚动条

When scrolling outside of the boundaries the scrollbar is shrunk by a small amount
> 当滚动超出边界，滚动条会少量的收缩

Valid values are: `'clip'` and `'scale'`.
> 有效的值：`clip`, `scale`

`'clip'` just moves the indicator outside of its container, the impression is that the scrollbar shrinks but it is simply moving out of the screen. If you can live with the visual effect this option **immensely improves overall performance**.
> 只是是否移动到容器外的指示。给人的感觉是滚动条收缩，但是它只是简单的移除屏幕。如果你能够在视觉上接受这个选项，将极大的提高整体性能

`'scale'` turns off `useTransition` hence all animations are served with `requestAnimationFrame`. The indicator is actually varied in size and the end result is nicer to the eye.
> 关掉`useTransition`，那么所有的动画都会由`requestAnimationFrame`来实现。该选项实际上是大小的变化，然后会有很好的视觉效果。
Default: `false`

<div class="tip">
<p>Note that resizing can't be performed by the GPU, so <code>scale</code> is all on the CPU.</p>
> 注意的是调整大小不能由GPU来执行，scale变化是通过CPU来执行。

<p>If your application runs on multiple devices my suggestion would be to switch this option to <code>'scale'</code>, <code>'clip'</code> or <code>false</code> based on the platform responsiveness (eg: on older mobile devices you could set this to <code>'clip'</code> and on desktop browser to <code>'scale'</code>).</p>

> 如果你的应用程序在多个平台上运行，我的建议是根据平台的响应能力在`scale`, 'clicp', `false`三者中切换。(比如，旧的设备你可以设置为`clip`， 在桌面端浏览器可是设置为`scale`)
</div>

See the [scrollbar demo](http://lab.cubiq.org/iscroll5/demos/scrollbars/).

<h3 id="styling-the-scrollbar">Styling the scrollbar</h3>给滚动条设置样式

So you don't like the default scrollbar styling and you think you could do better. Help yourself! iScroll makes dressing the scrollbar a snap. First of all set the `scrollbars` option to `'custom'`:

> 如果你不喜欢默认的滚动条样式，你可以设置为你想要的样子。iScroll可以很简单的做到这一点。首先设置`scrollbars`选项的值为`custom`;
    var myScroll = new IScroll('#wrapper', {
        scrollbars: 'custom'
    });

Then use the following CSS classes to style the little bastards.
> 然后使用下面的clss类改变滚动条的样式。

* **.iScrollHorizontalScrollbar**, this is applied to the horizontal container. The element that actually hosts the scrollbar indicator.
> 这会被用到水平容器。该元素实际上.. .. 
* **.iScrollVerticalScrollbar**, same as above but for the vertical container.
* **.iScrollIndicator**, the actual scrollbar indicator.
* **.iScrollBothScrollbars**, this is added to the container elements when both scrollbars are shown. Normally just one (horizontal or vertical) is visible.

The [styled scrollbars demo](http://lab.cubiq.org/iscroll5/demos/styled-scrollbars/) should make things clearer than my lousy explanation.
> 这个例子应该比我糟糕的解释更加清晰。

If you set `resizeScrollbars: false` you could make the scrollbar of a fixed size, otherwise it would be resized based on the scroller length.
> 如果你设置`resizeScrollbars: false`, 将会使滚动条有一个固定的大小，否则滚动条的大小会根据内容的长度改变。

Please keep reading to the following section for a revelation that will shake your world.
> 为了得到启示请继续阅读下面的部分，将会动摇你的观点。

<h2 id="indicators">Indicators</h2>
 > 指标：在iScroll中是一个属性。

All the scrollbar options above are in reality just wrappers to the low level `indicators` option. It looks more or less like this:
> 上面所有的滚动条选项实际上仅仅只是`indicators`的次级选项。大概如下：

    var myScroll = new IScroll('#wrapper', {
        indicators: {
            el: [element|element selector]
            fade: false,
            ignoreBoundaries: false,
            interactive: false,
            listenX: true,
            listenY: true,
            resize: true,
            shrink: false,
            speedRatioX: 0,
            speedRatioY: 0,
        }
    });

### <small>options.indicators.</small>el

This is a mandatory parameter which holds a reference to the scrollbar container element. The first child inside the container will be the indicator. Note that the scrollbar can be anywhere on your document, it doesn't need to be inside the scroller wrapper. Do you start perceiving the power of such tool?
> 这是一个强制参数，让该对象成为滚动容器，容器的第一个子元素会成为indicator。需要注意的是滚动条能够存在与文档的任何地方，他不需要一个wrapper元素包裹。你感觉到该工具的力量了吗？

Valid syntax would be:

    indicators: {
        el: document.getElementById('indicator')
    }

Or simply:

    indicators: {
        el: '#indicator'
    }

### <small>options.indicators.</small>ignoreBoundaries

This tells the indicator to ignore the boundaries imposed by its container. Since we can alter the speed ratio of the scrollbar, it is useful to just let the scrollbar go. Say you want the indicator to go twice as fast as the scroller, it would reach the end of its run very quickly. This option is used for [parallax scrolling](#parallax-scrolling).
> 该属性告诉指示器忽略容器边界。我们可以改变滚动的速度比，如果你希望这个指示器比滚动条块2倍，它会很快运行结束。该属性可以用于视觉差效果的实现。比如这个栗子。

Default: `false`

### <small>options.indicators.</small>listenX<br/><small>options.indicators.</small>listenY

To which axis the indicator listens to. It can be just one or both.
> indicator会监听哪一个方向轴。可以是任意一个，也可以是2个

Default: `true`

### <small>options.indicators.</small>speedRatioX<br/><small>options.indicators.</small>speedRatioY

The speed the indicator moves in relation to the main scroller size. By default this is set automatically. You rarely need to alter this value.
> 相对与滚动条的速度，在默认情况下会自动设置。你很少需要修改这个值。

Default: `0`

### <small>options.indicators.</small>fade<br/><small>options.indicators.</small>interactive<br/><small>options.indicators.</small>resize</br><small>options.indicators.</small>shrink

These are the same options we explored in the [scrollbars section](#scrollbars), I'm not going to insult your intelligence and repeat them here.
> 这些选项在滚动条部分已经有同样的选择，我就不去侮辱你的智商了重复解释了。


<div class="important">
<p><strong>Do not cross the streams. It would be bad!</strong> Do not mix the scrollbars syntax (<code>options.scrollbars</code>, <code>options.fadeScrollbars</code>, <code>options.interactiveScrollbars</code>, ...) with the indicators! Use one or the other.</p>
> 不要混用语法。
</div>

Have a look at the [minimap demo](http://lab.cubiq.org/iscroll5/demos/minimap/) to get a glance at the power of the `indicators` option.

The wittiest of you would have noticed that `indicators` is actually plural... Yes, exactly, passing an array of objects you can have a virtually infinite number of indicators. I don't know what you may need them for, but hey! who am I to argue about your scrollbar preferences?
> 可以有多个indicators，具体例子请参考视差滚动的例子。

## <span id="parallax-scrolling">Parallax scrolling</span> 视差滚动

Parallax scrolling is just a *collateral damage* of the [Indicators](#indicators) functionality.
> 视差滚动只是`indicators`的一个附带功能

An indicator is just a layer that follows the movement and animation applied to the main scroller. If you see it like that you'll understand the power behind this feature. To this add that you can have any number of indicators and the parallax scrolling is served.
一个indicator只是一层，因此可以有任意层数的视差滚动。

Please refer to the [parallax demo](http://lab.cubiq.org/iscroll5/demos/parallax/).

## Scrolling programmatically 滚动编程

You silly! Of course you can scroll programmaticaly!
> 卧槽啊，这什么意思啊。你当然可以编写自己的滚动？
iScroll实例有一些自己的方法，可以实现一些效果，方法如下。

### scrollTo(x, y, time, easing)

Say your iScroll instance resides into the `myScroll` variable. You can easily scroll to any position with the following syntax:
> 使用下面的语法，你可以轻松的滚动到任意你想要的位置。

    myScroll.scrollTo(0, -100);

That would scroll down by 100 pixels. Remember: 0 is always the top left corner. To scroll you have to pass negative numbers.
> 这会向下滚动100px，记住，0 总是在左上角。要滚动你必须通过负数

`time` and `easing` are optional. They regulates the duration (in ms) and the easing function of the animation respectively.
> `time` and `easing` 可是可选的。他们规定了滚动的持续时间和动画效果。

The easing functions are available in the `IScroll.utils.ease` object. For example to apply a 1 second elastic easing you'd do:
> 缓动函数都在`IScroll.utils.ease`对象下面，比如，想要实现1秒钟的`elastic`运动，可以如下实现：

    myScroll.scrollTo(0, -100, 1000, IScroll.utils.ease.elastic);

The available options are: `quadratic`, `circular`, `back`, `bounce`, `elastic`.
> 所有的运动方式包括：`quadratic`, `circular`, `back`, `bounce`, `elastic`

### scrollBy(x, y, time, easing)

Same as above but X and Y are relative to the current position.
> 与上面相同，但是x,y的位置是相对于当前位置。

    myScroll.scrollBy(0, -10);
    
Would scroll 10 pixels down. If you are at -100, you'll end up at -110.

### scrollToElement(el, time, offsetX, offsetY, easing)

You're gonna like this. Sit tight.
> 你将会喜欢这个方法

The only mandatory parameter is `el`. Pass an element or a selector and iScroll will try to scroll to the top/left of that element.
> 唯一强制性的参数就是`el`，传入一个元素或者选择器，iScroll会将该元素试图滚动到设置的位置。

`time` is optional and sets the animation duration.
> `time`是动画持续的时间

`offsetX` and `offsetY` define an offset in pixels, so that you can scroll to that element plus a the specified offset. Not only that. If you set them to `true` the element will be centered on screen. Refer to the [scroll to element](http://lab.cubiq.org/iscroll5/demos/scroll-to-element/) example.
> `offsetX`与`offsetY`定义了偏移量。这样你就可以添加一个偏移量。 如果将其设置为true，那么元素将集中在屏幕上。

`easing` works the same way as per the **scrollTo** method.

<h2 id="snap">Snap</h2>

iScroll can snap to fixed positions and elements.
> iScroll能够吸附到固定位置和元素

### <small>options.</small>snap

The simplest snap config is as follow:
> 最简单的snap配置如下

    var myScroll = new IScroll('#wrapper', {
        snap: true
    });

This would automatically split the scroller into pages the size of the container.
> 这将按照容器的大小自动分割滚动条到页面。

`snap` also takes a string as a value. The string will be the selector to the elements the scroller will be snapped to. So the following

    var myScroll = new IScroll('#wrapper', {
        snap: 'li'
    });

would snap to each and every `LI` tag.

To help you navigate through the snap points iScroll grants access to a series of interesting methods.
> 为了帮助你通过捕捉snap点，获得一些有趣的效果，提供了如下的方法

### goToPage(x, y, time, easing)

`x` and `y` represent the page number you want to scroll to in the horizontal or vertical axes (yeah, it's the plural of *axis*, I checked). If the scroller in mono-dimensional, just pass `0` to the axis you don't need.
> `x`与`y`这2个参数表示要滚动到水平或者垂直方向上的页码。如果是单维滚动条，则只需将另外一个维度设置为0即可。

`time` is the duration of the animation, `easing` the easing function used to scroll to the point. Refer to the **option.bounceEasing** in the [Advanced features](#advanced-features). They are both optional.
> `time` 运动持续时间
> `easing` 运动方式


    myScroll.goToPage(10, 0, 1000);

This would scroll to the 10th page on the horizontal axis in 1 second.

### next()<br/>prev()

Go to the next and previous page based on current position.

<h2 id="zoom">Zoom</h2>

To use the pinch/zoom functionality you better use the `iscroll-zoom.js` 
script.
> 使用`iscroll-zoom.js`能够更好的实现缩放功能

### <small>options.</small>zoom

Set this to `true` to activate zoom. 设置为`true`激活缩放功能

Default: `false`

### <small>options.</small>zoomMax

> Maximum zoom level. 最大倍数

Default: `4`

### <small>options.</small>zoomMin

> Minimum zoom level.最小倍数

Default: `1`

### <small>options.</small>zoomStart

> Starting zoom level. 缩放的开始倍数

Default: `1`

### <small>options.</small>wheelAction

Wheel action can be set to `'zoom'` to have the wheel regulate the zoom level instead of scrolling position. 
> 设置为zoom，让鼠标滚动时具有缩放特效。而不是位置的移动。

Default: `undefined` (ie: the mouse wheel scrolls)

To sum up, a nice zoom config would be:

    myScroll = new IScroll('#wrapper', {
        zoom: true,
        mouseWheel: true,
        wheelAction: 'zoom'
    });

<div class="important">
<p>The zoom is performed with CSS transform. iScroll can zoom only on browsers that support that.</p>
</div>
> zoom功能是通过css transform来实现的，iScroll只能在支持transform的浏览器上实现zoom

<div class="tip">
<p>Some browsers (notably webkit based ones) take a snapshot of the zooming area as soon as they are placed on the hardware compositing layer (say as soon as you apply a transform to them). This snapshot is used as a texture for the zooming area and it can hardly be updated. This means that your texture will be based on elements at <strong>scale 1</strong> and zooming in will result in blurred, low definition text and images.</p>
> 这一段实在读不懂！。有的浏览器，硬件跟不上xxx，在实现zoom时会出现问题。

<p>A simple solution is to load content at double (or triple) its actual resolution and scale it down inside a <code>scale(0.5)</code> div. This should be enough to grant you a better result. I hope to be able to post more demos soon</p>
</div>

Refer to the [zoom demo](http://lab.cubiq.org/iscroll5/demos/zoom/).

### zoom(scale, x, y, time)

Juicy method that lets you zoom programmatically.
> 一个缩放的方法

`scale` is the zoom factor.
> `scale` 缩放因子

`x` and `y` the focus point, aka the center of the zoom. If not specified, the center of the screen will be used.
> `x`, `y`缩放焦点的坐标，默认是screen的中心

`time` is the duration of the animation in milliseconds (optional).

<h2 id="infinite-scrolling">Infinite scrolling</h2> 无限滚动

iScroll integrates a smart caching system that allows to handle of a virtually infinite amount of data using (and reusing) just a bunch of elements.
> iScroll集成了智能缓存系统

Infinite scrolling is in an early stage of development and although it can be considered stable, it is not ready for wide consumption.
> 无限滚动目前正处于开发的早期阶段，虽然也可以认为他是稳定的，不过还没有准备扩展他。

Please review the [infinite demo](http://lab.cubiq.org/iscroll5/demos/infinite/) and send your suggestions and bug reports.
> 提交建议和bug

I will add more details as soon as the functionality evolves.
> 我会尽快完善

<h2 id="advanced-options">Advanced options</h2> 高级选项

For the hardcore developer.
> 针对核心开发者

### <small>options.</small>bindToWrapper

The `move` event is normally bound to the document and not the scroll container. When you move the cursor/finger out of the wrapper the scrolling keeps going. This is usually what you want, but you can also bind the move event to wrapper itself. Doing so as soon as the pointer leaves the container the scroll stops.
> `move`事件通常会在document中限制，而不是滚动容器。当你将光标/指针移除了滚动容器会保持移动。但是你任然可以将移动事件绑定到了wrapper上。当移除了容器，滚动会尽快停止。

Default: `false`

### <small>options.</small>bounceEasing

Easing function performed during the bounce animation. Valid values are: `'quadratic'`, `'circular'`, `'back'`, `'bounce'`, `'elastic'`. See the [bounce easing demo](http://lab.cubiq.org/iscroll5/demos/bounce-easing/), drag the scroller down and release.

`bounceEasing` is a bit smarter than that. You can also feed a custom easing function, like so:

> 自定义缓动方式，已经存在的有`quadratic`, `circular` `back` `bounce` `elastic`

    bounceEasing: {
        style: 'cubic-bezier(0,0,1,1)',
        fn: function (k) { return k; }
    }

The above would perform a linear easing. The `style` option is used every time the animation is executed with CSS transitions, `fn` is used with `requestAnimationFrame`. If the easing function is too complex and can't be represented by a cubic bezier just pass `''` (empty string) as `style`.

Note that `bounce` and `elastic` can't be performed by CSS transitions.

Default: `'circular'`

### <small>options.</small>bounceTime

Duration in millisecond of the bounce animation.

Default: `600`

### <small>options.</small>deceleration

This value can be altered to change the momentum animation duration/speed. Higher numbers make the animation shorter. Sensible results can be experienced starting with a value of `0.01`, bigger than that basically doesn't make any momentum at all.

Default: `0.0006`

### <small>options.</small>mouseWheelSpeed

Set the speed of the mouse wheel.

Default: `20`

### <small>options.</small>preventDefaultException

These are all the exceptions when `preventDefault()` would be fired anyway despite the **preventDefault** option value.

This is a pretty powerful option, if you don't want to `preventDefault()` on all elements with *formfield* class name for example, you could pass the following:

    preventDefaultException: { className: /(^|\s)formfield(\s|$)/ }

Default: `{ tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ }`.

### <small>options.</small>resizePolling

When you resize the window iScroll has to recalculate elements position and dimension. This might be a pretty daunting task for the poor little fella. To give it some rest the polling is set to 60 milliseconds.

By reducing this value you get better visual effect but the script becomes more aggressive on the CPU. The default value seems a good compromise.

Default: `60`

<h2 id="refresh">Mastering the refresh method</h2>掌握刷新的方法

iScroll needs to know the exact dimensions of both the wrapper and the scroller. They are computed at start up but if your elements change in size, we need to tell iScroll that you are messing with the DOM.
> iScroll需要知道wrapper与滚动区域的确切尺寸。他们会在初始化的时候被确定。但是如果你改变了他们的大小，你需要告诉iScroll你扰乱了DOM结构。

This is achieved by calling the `refresh` method with the right timing. Please follow me closely, understanding this will save you hours of frustration.
> 这是通过调用`refresh`方法来实现的。了解他你能节省更多的时间。

Every time you touch the DOM the browser renderer repaints the page. Once this repaint has happened we can safely read the new DOM properties. The repaint phase is not instantaneous and it happens only at the end of the scope that triggered it. That's why we need to give the renderer a little rest before refreshing the iScroll.
> 你每次触摸DOM都会让浏览器重绘页面。一旦重绘发生，我们就可以安全的读取DOM的属性。重绘不是瞬时的，而且他发生在xxxx下。这就是为什么我们需要在刷新iScroll之前让渲染器休息一下

To ensure that javascript gets the updated properties you should defer the refreh with something like this:
> 为了确保javascript得到更新的属性，你应该推迟刷新，比如：

    ajax('page.php', onCompletion);

    function onCompletion () {
        // Update here your DOM
        
        setTimeout(function () {
            myScroll.refresh();
        }, 0);
    };

We have placed the `refresh()` call into a zero timeout. That is likely all you need to correctly refresh the iScroll boundaries. There are other ways to wait for the repaint, but the zero-timeout has proven pretty solid.
> 我们把延迟时间设置为0，可能你还有其他的方式，但是0超时已经被确定了非常稳固。

<div class="tip">
<p>Consider that if you have a very complex HTML structure you may give the browser some more rest and raise the timeout to 100 or 200 milliseconds.</p>
> 如果你有一个非常复杂的HTML结构，你可以给浏览器多一些休息时间和提升超时时间，为100到200毫秒

<p>This is generally true for all the tasks that have to be done on the DOM. Always give the renderer some rest.</p>
> 所有在DOM上的任务大概都是如此，总会给渲染器一些休息时间
</div>

<h2 id="custom-events">Custom events</h2>

iScroll also emits some useful custom events you can hook to.
> iScroll也可以使用一些自定义事件

To register them you use the `on(type, fn)` method.
> 使用`on`来注册

    myScroll = new IScroll('#wrapper');
    myScroll.on('scrollEnd', doSomething);

The above code executes the `doSomething` function every time the content stops scrolling.

The available types are:
> 已经存在的事件如下：

* **beforeScrollStart**, executed as soon as user touches the screen but before the scrolling has initiated.
* **scrollCancel**, scroll initiated but didn't happen.
* **scrollStart**, the scroll started.
* **scroll**, the content is scrolling. Available only in `scroll-probe.js` edition. See [onScroll event](#onscroll).
* **scrollEnd**, content stopped scrolling.
* **flick**, user flicked left/right.
* **zoomStart**, user started zooming.
* **zoomEnd**, zoom ended.

<h2 id="onscroll">onScroll event</h2>

The `scroll` event is available on **iScroll probe edition** only (`iscroll-probe.js`). The probe behavior can be altered through the `probeType` option.

### <small>options.</small>probeType

This regulates the probe aggressiveness or the frequency at which the `scroll` event is fired. Valid values are: `1`, `2`, `3`. The higher the number the more aggressive the probe. The more aggressive the probe the higher the impact on the CPU.

`probeType: 1` has no impact on performance. The `scroll` event is fired only when the scroller is not busy doing its stuff.
> 不会对性能产生影响。滚动事件被触发只有在滚动条不忙的时候。

`probeType: 2` always executes the `scroll` event except during momentum and bounce. This resembles the native `onScroll` event.
> 特性与本地的onScroll事件相似。

`probeType: 3` emits the `scroll` event with a to-the-pixel precision. Note that the scrolling is forced to `requestAnimationFrame` (ie: `useTransition:false`).

Please see the [probe demo](http://lab.cubiq.org/iscroll5/demos/probe/).

<h2 id="key-bindings">Key bindings</h2>

You can activate support for keyboards and remote controls with the `keyBindings` option. By default iScroll listens to the arrow keys, page up/down, home/end but they are (wait for it) totally customizable.
> 你可以激活键盘和遥控器通过`keyBindings`.默认激活的如下：

You can pass an object with the list of key codes you want iScroll to react to.

The default values are as follow:

    keyBindings: {
        pageUp: 33,
        pageDown: 34,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40
    }

You can also pass a string (eg: `pageUp: 'a'`) and iScroll will convert it for you. You could just think of a key code and iScroll would read it out of your mind.

<h2 id="scroller-info">Useful scroller info</h2>

iScroll stores many useful information that you can use to augment your application.
> iScroll提供了如多有用的信息，用来增强你的应用

You will probably find useful:

* **myScroll.x/y**, current position
* **myScroll.directionX/Y**, last direction (-1 down/right, 0 still, 1 up/left)
* **myScroll.currentPage**, current snap point info

These pieces of information may be useful when dealing with custom events. Eg:

    myScroll = new IScroll('#wrapper');
    myScroll.on('scrollEnd', function () {
        if ( this.x < -1000 ) {
            // do something
        }
    });

The above executes some code if the `x` position is lower than -1000px when the scroller stops. Note that I used `this` instead of `myScroll`, you can use both of course, but iScroll passes itself as `this` context when firing custom event functions.

<h2 id="destroy">Destroy</h2>

The public `destroy()` method can be used to free some memory when the iScroll is not needed anymore.

    myScroll.destroy();
    myScroll = null;

<h2 id="contributing">Contributing and CLA</h2>

If you want to contribute to the iScroll development, before I can accept your submission I have to ask you to sign the [Contributor License Agreement](http://cubiq.org/iscroll/cla/). Unfortunately that is the only way to enforce the openness of the script.

As an end user you have to do nothing of course. Actually the CLA ensures that nobody will even come after you asking for your first born for using the iScroll.

Please note that pull requests may take some time to be accepted. Testing iScroll is one of the most time consuming tasks of the project. iScroll works from desktop to smartphone, from tablets to smart TVs. I do not have physical access to all the testing devices, so before I can push a change I have to make sure that the new code is working everywhere.

Critical bugs are usually applied very quickly, but enhancements and coding style changes have to pass a longer review phase. *Remember that this is still a side project for me.*

<h2 id="whos">Who is using iScroll</h2>

It's impossible to track all the websites and applications that use the iScroll. It has been spotted on: Apple, Microsoft, People, LinkedIn, IKEA, Nike, Playboy, Bose, and countless others.

<h2 id="license">License (MIT)</h2>


Copyright (c) 2014 Matteo Spinelli, [cubiq.org](http://cubiq.org/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
