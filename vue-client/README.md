# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.


---
---

布尔类型的属性：为真值或空字符串时，元素属性会包含它；为其他假值时，属性会被忽略
> 所以，props默认制定为true的话，如果父组件要指定为false的话需要设置属性值为“”,否则会被忽略？

动态绑定多个值：元素的v-bind传入一个对象，该对象里的属性都会作为props传给该元素

动态参数：用[]包裹参数名称，参数名称可以在js里任意指定
> 只能是字符串，如果是null说明移除该绑定，其他非字符串的会触发警告

计算属性值：应该是只读的，永远不应该被更改；应该更新它所依赖的源状态以触发新的计算。

样式：
class绑定的值可以是个内联字面量也可以是一个对象；
可以是数组，数组的项可以是对象；
> 给组件添加class，会作用在跟元素上，并与根元素上已经声明的class合并。

侦听器：
> 当传getter函数时，需要返回的对象不同时才会触发；可以传deep: true来设置为深层侦听器
> 传入响应式对象时，对象里任意一个属性发生变化就会触发；

ref:
> 有 `<script setup>` 包裹的组件是私有的，通过ref无法访问到任何东西；需通过defineExpose显式暴露。

setup中的props和emit
> props需要用defineProps(['name'])声明一下；
> emit需要用defineEmits(['emit-name'])声明一下；

**可以让 Vue 避免将它们作为原生事件监听器隐式地应用于子组件的根元素**

如果没有使用setup，通过emits属性来定义事件,如下
```js
export default {
  emits: ['enlarge-text'],
  setup(props, ctx) {
    ctx.emit('enlarge-text')
  }
}
```

依赖注入：
> 父组件provide属性，维护或提供属性的变更的方法；自组件inject注入依赖，使用值



