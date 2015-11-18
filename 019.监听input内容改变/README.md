##### 实时监听input内容变化的事件

###### change
触发条件：1. 当前对象属性改变，并且有键盘或者鼠标事件触发 （脚本触发无效）
2. 当前对象失去焦点，常用于选项列表值的改变

###### input
标准浏览器事件，一般用于input元素，当input中value值发生变化就会触发

###### propertychange
只要当前对象属性发生改变时就会触发，ie专属

>因此实时监听input内容变化一般都会同时绑定`input`与`propertychange`，用于完成实时搜索等。不过这2个事件在IE9中有个小bug，那就是右键菜单菜单中的 剪切 和 删除 命令删除内容的时候不会触发，而 IE 其他版本都是正常的，目前还没有很好的解决方案。

```js
$('#in').on('input', function() {
    console.log($(this).val());
    $('#ot').html($(this).val());
})
```

