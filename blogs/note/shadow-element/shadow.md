
## Element.attachShadow() 是什么，这要从web components说起
### web components 使用标准化的原生技术实现可重用的组件化开发模式

- shadow DOM 影子元素
> Element.attachShadow()

- custom element 自定义html标签和行为

- html template add slots html模板和插槽
> `<template> 、 <slot>`

----

#### 1. shadow DOM是什么？
一个DOM子树的根节点，与文档主DOM树分开渲染

Element.attachShadow给一个元素挂载一个shadow DOM，返回一个shadowRoot元素

传入一个对象，可以指定mode和delegatesFocus；

mode: open / closed 
> open: 该节点可以被从js外部访问 通过Element.shadowRoot，值为false时，会返回null
> closed: 不允许访问

----

shadow DOM 的几个术语
- shadow host 被shadow dom挂载上去的那个常规的dom节点
- shadow root: shadow dom的根结点

----

#### 2. custom element
创建一个自定义元素的步骤： 1. 通过类定义自定义元素的结构和内容； 2. 通过全局的customElements.define方法组册

**2.1 自定义元素有两种，一种是独立元素，另一种是继承其他内建html元素**
```js
// 以下是独立元素的创建方法
class HyyTag extends HTMLElement {
  constructor() {
    // 必须首先调用 super 方法
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const info = document.createElement('span');
    info.textContent = 'haoyanyu';
    this.setAttribute('class', 'info');
    
    const style = document.createElement('style');
    style.textContent = `
      .info {
        font-size: 36px;
        padding: 10px;
        background: #333;
        border-radius: 10px;
        color: yellowgreen;
      }
    `;
  }

  shadowRoot.appendChild(info);
  shadowRoot.appendChild(style);
}

customElements.define('hyy-tag', HyyTag);

// html中可以直接使用该标签
<hyy-tag></hyy-tag>
```

**2.2 继承其他内建元素的**
但这种继承的自定义标签不能直接用，需要用扩展属性is来设置

1. define的第三个参数`{extends: 'div'}`即继承div标签，如下：
```html
<div is="hyy-div"></div>
````

2. 通过createElement方法指定的is，如下：
```js
const hyyInfo = document.createElement('ul', { is: 'hyy-info' })
```

**2.3 自定义元素的生命周期**
> 厉害了

`connectedCallback`首次被插入到dom时

`disconnectedCallback`从dom中删除时

`adoptedCallback` 被移动到新的文档时

`arrtributeChangedCallback`元素增加、删除、修改某个属性时（没被挂载时也会触发）
> 如果想要触发这个事件，需要在类里生命 static get observedAttributes()方法才行，这个方法返回一个数组，包含需要监听的属性


**2.4 customElements.get('hyy-info')**可以用来获取该自定义元素的构造函数

**2.5 伪类元素**
- :defined 匹配任何已经定义的元素，包括内建元素和通过defined方法定义的元素
- :host 匹配shadow dom元素
- :host() 匹配给定方法的选择其的shadow dom元素
```css
/* 选择阴影根元素，仅当它与选择器参数匹配 */
:host(.special-custom-element) {
  font-weight: bold;
}
```
- :host-context(tag) 匹配宿主元素是给定选择器的shadow dom元素
