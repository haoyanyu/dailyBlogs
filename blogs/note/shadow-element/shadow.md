
## Element.attachShadow() 是什么，这要从web components说起
### web components 使用标准化的原生技术实现可重用的组件化开发模式

- shadow DOM 影子元素
> Element.attachShadow()

- custom element 自定义html标签和行为

- html template add slots html模板和插槽
> `<template> 、 <slot>`


#### 1. shadow DOM是什么？
一个DOM子树的根节点，与文档主DOM树分开渲染

给一个元素挂在一个shadow DOM，返回一个shadowRoot元素

传入一个对象，可以指定mode和delegatesFocus；

mode: open / closed 
> open: 该节点可以被从js外部访问 通过Element.shadowRoot
> closed: 不允许访问

#### 2. custom element
创建一个自定义元素的步骤： 1. 通过类定义自定义元素的结构和内容； 2. 通过全局的customElements.define方法组册
```js
class HyyTag extends HTMLElement {
  constructor() {
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

