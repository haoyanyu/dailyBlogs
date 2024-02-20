## 利用content实现计数器

### counter-reset
设置计数器名称和初始值(默认为0)
> counter-reset: counterName index

### counter-increment 
计数器递增一次，每执行一次，这个计数器就递增一次

> counter-increment: counterName step

### counter()
读取计数器的值, 配合伪元素的content使用

> content: counter(counterName)

### counters()
多个counter的值

**demo**
```html
<!-- html -->
<div class="reset">
  <div class="counter">我是王小二
    <div class="reset">
      <div class="counter">我是王小二的大儿子</div>
      <div class="counter">我是王小二的二儿子
        <div class="reset">
          <div class="counter">我是王小二的二儿子的大孙子</div>
          <div class="counter">我是王小二的二儿子的二孙子</div>
          <div class="counter">我是王小二的二儿子的小孙子</div>
        </div>
      </div>
      <div class="counter">我是王小二的三儿子</div>
    </div>
  </div>
  <div class="counter">我是王小三</div>
  <div class="counter">我是王小四
    <div class="reset">
      <div class="counter">我是王小四的大儿子</div>
    </div>
  </div>
</div>
```

```css
/* css */
.reset {
  padding-left: 20px;
  /* 核心代码 */
  counter-reset: wangxiaoer;
  line-height: 1.6;
  color: #666;
}
.counter:before {
  /* 核心代码 */
  content: counters(wangxiaoer, "-") ". ";
  /* 核心代码 */
  counter-increment: wangxiaoer;
  font-family: arial black;
}
```

## 利用content实现进度条数字
css的var变量 + content

```jsx
// react html
<label>图片1：</label>
<div className="bar" style={{'--percent': 60}}></div>
<label>图片2：</label>
<div className="bar" style={{'--percent': 40}}></div>
<label>图片3：</label>
<div className="bar" style={{'--percent': 20}}></div>
```

```css
/* css */
.bar {
  height: 20px; width: 300px;
  background-color: #f5f5f5;
}
.bar::before {
  display: block;
  height: 20px;
  counter-reset: progress var(--percent);
  content: counter(progress) '%\2002';
  width: calc(1% * var(--percent));
  color: #fff;
  background-color: #2486ff;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  font-size: 16px;
  line-height: 20px;
}
```
想要实现数字动态变化，只需要在js里控制--percent的值就可以了；

**这里为了让content可以展示数字，使用了counter-reset**

实际上给html元素设置一个属性也可以实现这个效果，content的值可以用attr(attrName);
----
#### 仅用css动画实现数字变化的方法
> 进度条在指定时间内完成，非真实进度

首选需要用到css的@property
具体代码见 index.tsx

纯css实现的倒计时，很棒的文章：https://mp.weixin.qq.com/s/CZQLEDUXktlpdUFRQzj79w