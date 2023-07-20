# 记录一下PC端商品编辑时，sku的维护思路
> 如./images里截图所示，设置sku后，在规格明细中依次组合列出sku组合

## 结果
./json文件夹里的sku.json数据结构转换成stocks.json的结构, 如下

```js
const skus = [
  { text: '颜色', leaf: [{ text: 'a4色' }] },
  { text: '尺寸', leaf: [{ text: '11寸' }, { text: '10寸' }] },
  { text: '样式', leaf: [{ text: 'a' }, { text: 'b' }, { text: 'c' }] },
]

const stocks = [
  { k1: "颜色", k2: "尺寸", k3: "样式", v1: "a4色", v2: "11寸", v3: "a", row1num: 6, row2num: 3, row3num: 1 },
  { k1: "颜色", k2: "尺寸", k3: "样式", v1: "a4色", v2: "11寸", v3: "b", row1num: 6, row2num: 3, row3num: 1 },
  { k1: "颜色", k2: "尺寸", k3: "样式", v1: "a4色", v2: "11寸", v3: "c", row1num: 6, row2num: 3, row3num: 1 },
  { k1: "颜色", k2: "尺寸", k3: "样式", v1: "a4色", v2: "10寸", v3: "a", row1num: 6, row2num: 3, row3num: 1 },
  { k1: "颜色", k2: "尺寸", k3: "样式", v1: "a4色", v2: "10寸", v3: "b", row1num: 6, row2num: 3, row3num: 1 },
  { k1: "颜色", k2: "尺寸", k3: "样式", v1: "a4色", v2: "10寸", v3: "c", row1num: 6, row2num: 3, row3num: 1 },
]
```
## 思路1

1. 按顺序依次遍历sku的leaf；
2. 维护一个数组stocksArr，用于存放每次sku.leaf后生成的stock数据；
3. 遍历第一级sku时，stocksArr此时是空的，走初始化逻辑 initStockArr
4. 遍历第二级及之后的sku时，需要对stocksArr的数据补全和扩充 appendStockArr

> 总之，基本上需要O(3)的时间复杂度

```js
const stocksArr = [];
skus.forEach((sku, index) => {
  if (!stocksArr.length) {
    stocksArr = initStockArr(sku, index);
  } else {
    stocksArr = appendStockArr(stocksArr, sku, index);
  }
});

```

```js
// stocksArr此时是空的初始化逻辑
function initStockArr(sku, index) {
  const newDescartes = [];
  const keyIndex = index + 1;
  sku.leaf.forEach((leaf) => {
    const stock = {
      [`k${keyIndex}`]: sku.text,
      [`v${keyIndex}`]: leaf.text
    };
    newDescartes.push(stock);
  })
}

```

```js
// 对stocksArr的数据补全和扩充
function appendStockArr(descartesData, sku, index) {
  const newDescartes = [];
  const keyIndex = index + 1;
  const lastIndex = skus.length - index + 1;
  descartesData.forEach(base => {
    sku.leaf.forEach(leaf => {
      const stock = {
        ...base,
        [`k${keyIndex}`]: sku.text,
        [`v${keyIndex}`]: leaf.text
      };
      newDescartes.push(stock);
    });
  });
  return newDescartes;
}


```
