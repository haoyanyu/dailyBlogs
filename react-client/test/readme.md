## describe
把test分组；

beforeAll()是文件里的test执行开始前执行，afterAll()则是文件里所有test都执行结束后才会执行。

beforeEach()和afterEach()则是每个test执行前后执行的

执行顺序：beforeAll() -> beforeEach() -> expect -> afterEach() -> afterAll()


定义在describe里的这些方法，则只有在describe的test执行时才会执行

## test
一个test是一个测试任务

test.only可以指定在本次测试中只执行该用例

## expect

## matchers
- toBe() 基础类型
- toEqual() 对象或基础类型
- toBeNull() null
- toBeUndefined() undefined
- toBeDefined() 是否定义了
- toBeTruthy() 是否是true
- toBeFalsy() 是否是false 
- toMatch(/正则/)
- toContain() 数组是否包含某个数据
```js
expect().toBe(2);

expect().not.toBe(2);
```