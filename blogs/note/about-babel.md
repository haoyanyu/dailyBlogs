# 关于babel的查漏补缺

## presets 预设
为了将 Babel 的输出配置为符合要求的情况

## plugins 插件
在编译过程中应用到输入中的函数（语法插件、转换插件）

### 两者区别
> 1. 先执行plugins再执行presets
> 2. plugins按照声明次序顺序执行
> 3. presets按照声明顺序逆序执行
> 4. presets是plugins的集合
----


### babel-preset-env
用于配置支持浏览器所需的polyfill和transform;

在没有任何配置的情况下，与babel-preset-latest或babel-preset-es2015/es2016/es2017的行为完全一致；

### 属性
#### targets 一个运行环境对象
通过指定版本所需的polyfill和transform可以控制打包体积，只编译所需的代码；

- browsers 指定浏览器版本； array或string（可以指定的环境有chrome, opera, edge, firefox, safari, ie, ios, android, node, electron）
- node 指定node版本；number|string|"current"|true
- uglify 压缩代码

> uglify压缩代码时，不支持es2015+语法；设置为true以后会启用所有翻译插件，把代码编译成ES5，这个时候可以配合useBuiltIns使用，它会确保只包含目标浏览器所需要的polyfills

> 2.x版本里已经废弃这个属性了，可以用forceAllTransforms代替

#### spec 让插件启动是否更规范

#### loose 是否为任何插件启用loose转换

>**loose转换？**

>loose模式提供简单的ES5代码；normal模式转换的代码更符合ES6语义；

>优点：生成代码会更快，更简洁，对老版本浏览器引擎有更好的兼容性；

>缺点：转译的ES6还原到原生ES6语法时会有问题；

#### modules 将es6模块语法转换为另一种模块类型
值包含："amd" | "umd" | "systemjs" | "commonjs" | false， 默认为 "commonjs"

#### debug 是否用console.log输出

#### include 包含的插件名列表
#### exclude 总是移除的插件名列表

> include和exclude仅对当前preset中包含的插件生效

#### useBuiltIns 布尔值
一种将polyfill应用于 babel-preset-env 中的方法，见uglify的引用说明；

