## Exparser 
Exparser会维护整个页面的节点树相关信息

## 组件创建的过程大致有以下几个要点：

- 根据组件注册信息，从组件原型上创建出组件节点的JS对象，即组件的this；
- 将组件注册信息中的data 复制一份，作为组件数据，即this.data；
- 将这份数据结合组件WXML，据此创建出Shadow Tree，由于Shadow Tree中可能引用有其他组件，因而这会递归触发其他组件创建过程；
- 将ShadowTree拼接到Composed Tree上，并生成一些缓存数据用于优化组件更新性能；
- 触发组件的created生命周期函数；
- 如果不是页面根组件，需要根据组件节点上的属性定义，来设置组件的属性值；
- 当组件实例被展示在页面上时，触发组件的attached 生命周期函数，如果Shadw Tree中有其他组件，也逐个触发它们的生命周期函数。

> 所以是先执行created生命周期，再设置proprieties的值；在created阶段，props上的值还没设置上去


## 原生组件
> 内置组件中，不完全在exparser渲染体系下的组件，由客户端参与渲染

- 组件创建，属性赋值
- 组件插入DOM，浏览器内核计算布局，内核读取出组件相对页面的坐标和宽高
- 客户端收到组件的通知后，在相同的位置上，插入一块原生区域，并在这里渲染界面
- 当组件位置或宽高发生变化时，组件会通知客户端调整
> 原生组件的层级比webview层渲染的普通组件都高
> 一些css样式会无效，父级的overflow，组件的transform rotate

video

map

canvas

picker


> 层级问题可以通过cover-view\cover-image来解决

