### 颜色

- %c占位, 依次指定样式，字体、颜色、大小等都可以

```js
console.log('%c Hello World', 'color: red');
```

----

### 打印耗时
> 以前想知道某个操作耗时时，会在方法执行开始和结束时分别打印时间戳来计算耗时；

console.time 代表开始

console.timeLog 代表结束

```js
console.time('fn1');

console.timeLog('fn1');

```


