## new Function中用到的变量是全局的


## 利用return 把字符串转换成对应的js数据类型
```js
let str = `{ "id": 10393, name: 'zhangxinxu', 'date': '2022-04-30' }`;
```

```js
JSON.stringify(new Function('return' + str)());
// '{"id":10393,"name":"zhangxinxu","date":"2022-04-30"}'
```

> 原因是: 在`'return' + str` 中，最终形成并传入函数中的是`return {"id": 10393, name: 'zhangxinxu', 'date': '2022-04-30'}`