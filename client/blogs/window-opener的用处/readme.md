# window.opener
返回打开当前窗口的引用；

例如在page1页面打开了page2页面，那么page2里的window.opener返回的就是page1的window对象；

> 如果当前窗口不是由其他窗口打开的，则该属性返回 null.

注意

1. window.opener只有在window.open方法和a标签打开时才会指向来源窗口，其他都是返回null;
2. 利用opener可以获取父窗口的location等信息，也可以操作DOM
3. 跨域、js对location的操作、拖拽情况下，返回null
