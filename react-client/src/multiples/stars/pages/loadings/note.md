## 网格布局 grid

### 定义在容器上的属性
#### 行和列
- grid-template-columns
> 定义网格布局的列数和宽度,给了几个值就是几列

**grid-template-columns: repeat(auto-fill, 200px) 表示列宽是 200 px，但列的数量是不固定的**
> 相当于flex-wrap

**grid-template-columns: 200px 1fr 2fr 表示第一个列宽设置为 200px，后面剩余的宽度分为两部分，宽度分别为剩余宽度的 1/3 和 2/3**
> 效果跟flex类似

- grid-template-rows
> 定义每行的高度

----

#### 间距
- grid-column-gap 列之间的间距
- grid-row-gap 行之间的间距
- grid-gap 每个网格之间的间距

#### 对齐
网格在整个容器里的排列方式
- justify-content 水平方向上的对齐方式
> space-evenly / space-around / space-between / center / start / end

- align-content 垂直方向上的对齐方式
> 属性同上

- justify-items 在每个网格内的排列方式
- align-items
- place-items

> start | end | center | stretch

#### 命名
- grid-template-areas 定义区域，一个区域由一个或者多个单元格组成
> .表示没有用这个单元格

> 一行的命名在一对""里，空格隔开
---

### 定义在子元素上的属性

- grid-column 元素的列的位置
> 1 / 5 第一列开始，第五列前结束

> 1 / span 3 第一列开始，横跨3列

- grid-row 行的位置
> 值同上

- grid-area 位置
> 4个值，grid-row-start、grid-column-start、grid-row-end 和 grid-column-end

> 左上角行列 右下角行列 

>四个值之间用/分隔

- justify-self 在每个网格内元素自己的排列方式
- align-self
- place-self
啊！有点复杂

