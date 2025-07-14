## 常用api学习记录

### 启动
puppeteer.launch(options)
```
options:
headless: 是否开启无头浏览器模式，
executablePath: 如果不传，会用自带的chromium，可以传本地chrome的安装路径
args: 一个数组，
```

### 新建页面
Browser.newPage()

### 关闭页面
Browser.close()

### 访问页面
Page.goto(url, options)

```
url: 页面路径
options: 设置referer
```

### 设置cookie
Page.setCookie(cookie[])

### 获取页面的selector，用于点击等操作
Page.$() => 第一个selector

Page.$$() => 所有的selector

Page.waitForSelector()

注意：需要等元素加载完，才能确保获取成功

### 获取页面元素 element
Page.$eval(cssSelector, fn) => 第一个元素

Page.$$eval(cssSelector, fn) => 所有的元素

### 获取iframe
page无法获取到iframe里的内容，需要先拿到iframe，再从iframe里去获取元素

Page.waitForFrame() 返回Frame
```
const wechatFrame = await page.waitForFrame(f => 
  f.url().includes('open.weixin.qq.com')
);
```

### 网页上下文里执行方法
Page.evaluate(fn)

可以执行document等的API

### 获取pdf
Page.pdf()

### 截图
Page.screenshot(options)

输出单张图片
```
options:
path: 保存到项目的路径
clip: { x: , y: width: , height: }, 截图区域
fullPage: 全屏
```

### 屏幕录制
Page.screencast() —— 实验性功能




