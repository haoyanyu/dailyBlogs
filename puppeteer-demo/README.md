# Puppeteer 天气获取 Demo

这个项目使用 Puppeteer 无头浏览器访问中国天气网获取杭州的天气信息。

## 功能特性

- 使用无头浏览器自动访问天气网站
- 获取杭州当前天气信息
- 获取今日详细天气预报
- 获取未来几天天气预报
- 包含备用天气数据源
- 支持跨平台运行（macOS、Windows、Linux）

## 安装依赖

首先确保你已经安装了 Node.js，然后安装项目依赖：

```bash
npm install
```

## 使用方法

### 方法一：使用 npm 脚本
```bash
npm run weather
```

### 方法二：直接运行
```bash
node weather-demo.js
```

### 方法三：在代码中调用
```javascript
const { getHangzhouWeather } = require('./weather-demo.js');

getHangzhouWeather().then(weatherInfo => {
  console.log('天气信息:', weatherInfo);
});
```

## 系统要求

- Node.js 18+ 
- Chrome 浏览器（需要安装在系统中）
- 网络连接

## 输出示例

```
正在访问中国天气网...
搜索杭州天气...
获取天气信息...

=== 杭州天气信息 ===
城市: 杭州
当前温度: 15°C
当前天气: 晴

今日详细天气:
  08时: 晴 12°C
  14时: 晴 18°C
  20时: 晴 15°C

未来天气预报:
  今天: 晴 12°C/18°C
  明天: 多云 10°C/16°C
  后天: 小雨 8°C/14°C

浏览器已关闭
```

## 注意事项

1. 首次运行可能需要一些时间来加载网页
2. 如果主要网站访问失败，程序会自动尝试备用数据源
3. 请确保网络连接正常
4. 程序会自动检测操作系统并使用对应的Chrome路径

## 故障排除

如果遇到Chrome路径问题，可以手动修改 `weather-demo.js` 文件中的 `executablePath` 配置。

## 技术栈

- Puppeteer Core
- Node.js
- JavaScript ES6+ 