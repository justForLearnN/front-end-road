##### 弹性盒模型布局 flexible box
兼容性： Chrome 21+ Opera 12.1+ Firefox 22+ Safari 6.1+ IE 10+  
在手机端的表现： uc浏览器不支持，安卓4.1.1及之前的版本不支持，微信自带浏览器不支持。

###### 1. display: flex;

该布局的关键在于，首先要将父级元素声明为弹性容器。
```css
.parent { 
    display: flex;
    display: -webkit-flex;
}
```

在下面例子中，实现了多列等分布局。
```html
<style>
    .box1 { display: flex; }
    .box1 li { flex: 1; }
</style>

<ul class="box1">
    <li>flex: 1</li>
    <li>flex: 1</li>
    <li>flex: 1</li>
    <li>flex: 1</li>
</ul>
```

[完整代码](http://127.0.0.1/integration/front-end-road/023.flexible/new/flex-01.html)

> css代码只列出了关键属性声明

在该布局中，有以下几个点需要注意
- 本例使用弹性盒模型实现了子元素等分布局。当子元素都声明flex:1 时，子元素将会等分父级的宽度，其中包括margin值
- 当父级高度固定时，所有的子元素将会自动和父级高度相等
- 当父级高度没有确定时，父元素和所有的子元素将会和高度最高的子元素高度相等
- 当其中有一个元素明确声明了高度时，该高度不会自动适应

###### 2. flex-grow
用数值来定义扩展比例，不允许负值。默认值为0  
通俗一点来说，就是按照子元素设置的flex-frow值按比分配父元素的剩余空间。  
剩余空间：是指在除去子元素所占宽度之后，父元素剩余的宽度。子元素所占宽度包括margin值，如果子元素的宽度没有声明，则由内容撑开。
```html
<style>
    .box1 { 
        display: flex; 
        height: 300px; 
    }
    .box1 li:nth-of-type(1) { width: 300px; }
    .box1 li:nth-of-type(2) { flex-grow: 1; }
    .box1 li:nth-of-type(3) { flex-grow: 2; }
    .box1 li:nth-of-type(4) { flex-grow: 1; }
</style>

<ul class="box1">
    <li>width: 300px</li>
    <li>flex-grow: 1</li>
    <li>flex-grow: 2</li>
    <li>flex-grow: 1</li>
</ul>
```
[完整代码](http://127.0.0.1/integration/front-end-road/023.flexible/new/flex-02.html)

###### 3. flex-shrink  
设置或检索弹性盒的收缩比率。默认值为1  
当子元素所占宽度之和比父元素大时，我们将多出来的宽度称为溢出空间。  
每一个子元素减少的宽度，将会把溢出空间按照flex-shrink设置的值按比例分配。
```html
<style>
    .box1 { 
        display: flex; 
        height: 300px; 
    }
    .box1 li:nth-of-type(1) { flex-shrink: 2; width: 300px; }
    .box1 li:nth-of-type(2) { flex-shrink: 4; width: 500px; }
    .box1 li:nth-of-type(3) { flex-shrink: 2; width: 200px; }
    .box1 li:nth-of-type(4) { flex-shrink: 1; width: 300px; }
</style>
<ul class="box1">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul>
```
[完整代码](http://127.0.0.1/integration/front-end-road/023.flexible/new/flex-03.html)

###### 4. flex-basis 
当子元素宽度溢出时，弹性盒模型会按照flex-shrink和flex-basis的值按照下列公式进行收缩
假如4个子元素的  
收缩基准值分别为 b1, b2, b3, b4  
收缩比例值分别为 s1, s2, s3, s4  
溢出空间值为： more  

于是收缩总值为：
```js
var totle = b1*s1 + b2*s2 + b3*s3 + b4*s4
```

那么，每个子元素收缩的值就分别为：
```
b1*s1 / totle * more
b2*s2 / totle * more
b3*s3 / totle * more
b4*s4 / totle * more
```

例子如下：
```html
<style>
    .box1 { 
        display: flex; 
        height: 300px; 
    }
    .box1 li:nth-of-type(1) { flex-shrink: 2; flex-basis: 200px; width: 300px; }
    .box1 li:nth-of-type(2) { flex-shrink: 4; flex-basis: 300px; width: 500px; }
    .box1 li:nth-of-type(3) { flex-shrink: 2; flex-basis: 400px; width: 200px; }
    .box1 li:nth-of-type(4) { flex-shrink: 1; flex-basis: 400px; width: 300px; }
</style>

<ul class="box1">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul>
```
[完整代码](http://127.0.0.1/integration/front-end-road/023.flexible/new/flex-04.html)

###### 5. flex-flow
在父元素声明，规定子元素的排列情况 复合属性，分别为 flex-direction flex-wrap

横排，多行排列，父级宽度不够时，变多排,并且从最下方或者最右方开始排列。
```html
flex-flow: row wrap-reverse;
```

竖排，单行排列
```html
flex-flow:column nowrap;
```

[完整实例](http://127.0.0.1/integration/front-end-road/023.flexible/new/flex-05.html)

###### 6. flex-direction
对父级声明，规定子元素的排列顺序

横排 从左往右排列
```html
flex-direction:row
```

横排 从右往左排列
```html
flex-direction:row-reverse
```

竖排 从上往下排列
```html
flex-direction:column
```

竖排 从下往上排列
```html
flex-direction:column-reverse
```
[完整代码](http://127.0.0.1/integration/front-end-road/023.flexible/new/flex-06.html)

###### 7. align-content
 当子元素宽度之和溢出时该属性生效，否则无效，具体情况，请看完整实例。

 [完整代码](http://127.0.0.1/integration/front-end-road/023.flexible/new/flex-07.html)

###### 8. align-items

对父元素进行声明，规定子元素的对齐方式  
`flex-start：` 弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴起始边界。  
`flex-end：`弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴结束边界。  
`center：`弹性盒子元素在该行的侧轴（纵轴）上居中放置。（如果该行的尺寸小于弹性盒子元素的尺寸，则会向两个方向溢出相同的长度）。  
`baseline：`如弹性盒子元素的行内轴与侧轴为同一条，则该值与'flex-start'等效。其它情况下，该值将参与基线对齐。  
`stretch：`如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照'min/max-width/height'属性的限制  

[完整实例](http://127.0.0.1/integration/front-end-road/023.flexible/new/flex-08.html)

###### 9. align-self
对子元素进行声明，规定当前子元素的对其方式  
`auto：`
如果'align-self'的值为'auto'，则其计算值为元素的父元素的'align-items'值，如果其没有父元素，则计算值为'stretch'。  
`flex-start：`
弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴起始边界。  
`flex-end：`
弹性盒子元素的侧轴（纵轴）起始位置的边界紧靠住该行的侧轴结束边界。  
`center：`
弹性盒子元素在该行的侧轴（纵轴）上居中放置。（如果该行的尺寸小于弹性盒子元素的尺寸，则会向两个方向溢出相同的长度）。  
`baseline：`
如弹性盒子元素的行内轴与侧轴为同一条，则该值与'flex-start'等效。其它情况下，该值将参与基线对齐。  
`stretch：`
如果指定侧轴大小的属性值为'auto'，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照'min/max-width/height'属性的限制。  

[完整实例](http://127.0.0.1/integration/front-end-road/023.flexible/new/flex-08.html)

###### 10. justify-content
对父元素进行声明，设置子元素在水平方向上的对齐方式  

`flex-start：`
弹性盒子元素将向行起始位置对齐。该行的第一个子元素的主起始位置的边界将与该行的主起始位置的边界对齐，同时所有后续的伸缩盒项目与其前一个项目对齐。  
`flex-end：`
弹性盒子元素将向行结束位置对齐。该行的第一个子元素的主结束位置的边界将与该行的主结束位置的边界对齐，同时所有后续的伸缩盒项目与其前一个项目对齐。  
`center：`
弹性盒子元素将向行中间位置对齐。该行的子元素将相互对齐并在行中居中对齐，同时第一个元素与行的主起始位置的边距等同与最后一个元素与行的主结束位置的边距（如果剩余空间是负数，则保持两端相等长度的溢出）。  
`space-between：`
弹性盒子元素会平均地分布在行里。如果最左边的剩余空间是负数，或该行只有一个子元素，则该值等效于'flex-start'。在其它情况下，第一个元素的边界与行的主起始位置的边界对齐，同时最后一个元素的边界与行的主结束位置的边距对齐，而剩余的伸缩盒项目则平均分布，并确保两两之间的空白空间相等。  
`space-around：`
弹性盒子元素会平均地分布在行里，两端保留子元素与子元素之间间距大小的一半。如果最左边的剩余空间是负数，或该行只有一个伸缩盒项目，则该值等效于'center'。在其它情况下，伸缩盒项目则平均分布，并确保两两之间的空白空间相等，同时第一个元素前的空间以及最后一个元素后的空间为其他空白空间的一半。  

[完整实例](http://127.0.0.1/integration/front-end-road/023.flexible/new/flex-10.html)







