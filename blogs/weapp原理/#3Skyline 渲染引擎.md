## 用途
创建一个新的线程，把在webview中执行的layout、composite、paint等渲染任务放在该线程执行。多个页面运行在同一个渲染引擎实例下

同时在appService里划出一个独立的上下文，执行原本webview里做的js逻辑、DOM树创建等。

所以，仍然是双线程，skyline和appService分担了原本webview的任务

## 优点
- skyline和appService分担掉原本webview的逻辑，减少卡顿
- 不用为每个页面都创建WebView了，多个skyline页面会运行在同一个渲染引擎实例下，减少内存消耗
- 页面间可以共享更多的资源了，不用通过jsBridge交换数据了，减少内存消耗，提升加载速度。

## 缺点
- wxs变为异步了，效率下降；因为放到appService里了；

## skyline和webview对比
- Skyline首要考虑性能，CSS做了精简，只保留更现代的集合，编码方式上一样
- Skyline 采用的是同步光栅化的策略，WebView 是异步分块光栅化的策略
- 组件下沉，一些组件实现借助了底层实现
- wxss构建代码包时预编译为二进制文件，读取更快
- webview页面层级最多10层，skyline无限制


---

## 用法
page.json里可以配置渲染模式
```
{
  "renderer": "skyline" / "webview"
}
```
---
## worklet动画
#### worklet函数
```js
function myFn() {
  console.log('>>: myFn')
}

function myOtherWorkletFn() {
  'worklet';
  console.log('>>: myOtherWorkletFn')
}

function myWorkletFn(str) {
  'worklet';
  console.log('>>: str', str);
  // 在UI线程访问非worklet函数时，需要用runOnJS；这样myFn就是运行在js线程里了。
  wx.worklet.runOnJS(myFn)()

  // 调用worklet函数时，直接调用
  myOtherWorkletFn()
}

// 在js线程里运行
myWorkletFn('hello world');

// 在UI线程
wx.worklet.runOnUI(myWorkletFn)('hello world')
```


#### 共享变量
由 worklet 函数捕获的外部变量，实际上会被序列化后生成在 UI 线程的拷贝，后续修改无法同步到UI线程，通过shared可以跨线程共享
```js
const myNumber = wx.worklet.shared(3)

// 通过value属性读取，
myNumber.value // 用法同vue的ref

```
