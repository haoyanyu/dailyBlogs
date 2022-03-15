# 再回顾一下sass的用法
## 变量`$`

## 插值语句`#{$width}`

## 复用样式@extend

```css
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.error.intrusion {
  background-image: url("/image/hacked.png");
}
.seriousError {
  @extend .error;
  border-width: 3px;
}

/* 编译后 */
.error, .seriousError {
  border: 1px #f00;
  background-color: #fdd; }

.error.intrusion, .seriousError.intrusion {
  background-image: url("/image/hacked.png"); }

.seriousError {
  border-width: 3px; }
```
.seriousError会完全复用一份.error的所有样式，包括嵌套的样式

## 定义混合指令 @mixin
## 引用混合样式 @include

```css
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}

.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}

/* 可以指定参数 */
@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
```

## 函数
sass定义的多种函数
```css
p {
  color: hsl(0, 100%, 50%);
}
```

## @function 函数指令
需要用@return输出结果

```css
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}

#sidebar { width: grid-width(5); }
```
感觉主要用来做复杂的计算

## @each

`@each $var in <list>`

```css
@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
  #{$header} {
    font-size: $size;
  }
}
```