import { onMounted } from 'vue';
import debounce from 'lodash/debounce';

import { addEventListener, removeTarget, targetMap }  from './event-handler';

const SCROLL_CLASS_NAME = 'scrollable-container';
/**
 * 1. 监听body的mouseenter，给target添加滚动样式 —— 需要捕获阶段，否则只会触发一次
 * 2. body的mouseenter事件需要防抖一下
 * 3. target添加滚动样式的同时，添加mouseleave事件监听，鼠标移除后移除事件
 *  todo: 问题： 嵌套组件里，父级进入子组件，不会触发父级的mouseleave
 *  解决思路1： 
 *    在现有的基础上，新增一个dep，存储添加过样式的元素；
 *    dep初始为[], 每次mouseenter时，去遍历dep，移除事件和样式，从dep中删除老元素，添加当前的target
 *    TODO：—— 衍生问题：从子元素回到父级时，父级因为被移除了样式，所以无法再滚动了 ？？
 *  解决思路2: 
 *    mouseenter时，元素自身添加样式，反查父级元素，移除样式和事件监听；
 *    mouseleave时，反查父级元素，添加样式和事件监听；同时删除自身样式和事件
 *    ——衍生问题：鼠标进出元素的顺序不一定，可能兄弟之间，可能跨级别（因为做了防抖）
 *  解决思路3:
 *    新增一个weakMap，target作为key；新增preScrollTarget记录前一个滚动元素；
 *    每次mousemove时，判断weakMap里是否有target，如果没有，说明是刚进入该元素
 *    此时，weakMap删除preScrollTarget，存入target，preScrollTarget删除滚动样式，更新为target
 * 4. 滚动条占位问题：
 *  根据鼠标自动显示：不预留滚动条位置，鼠标移入会导致页面抖动
 *  滚动时：同上
 *  TODO：期望效果：默认的滚动时的效果，滚动条不占窗口位置
 * 5. 原本的样式如何统一处理，设置了overflow: scroll/auto的地方？如果选择了始终展示，这些元素初始就会展示滚动条
 */

// let currentScrollTarget = null;
let preScrollTarget = null;

function getParentElement(element) {
  return element.parentNode;
}

function handleCssClassName(element, action, name) {
  if (!element) return;
  if (['add', 'remove'].includes(action)) {
    element.classList[action](name);
  }
}

// function handleTargetMouseLeave(element) {
//   console.log(">>>>>>leave element<<<<<<", element);
//   // 删除滚动容器样式
//   handleCssClassName(element.target, 'remove', SCROLL_CLASS_NAME);
//   setTimeout(() => {
//     // 触发mouseleave后，移除样式，把事件监听也删除掉
//     element.target.removeEventListener('mouseleave', handleTargetMouseLeave, false);
//     removeTarget(element.target)
//   }, 0);
// }

export const useScrollbars = () => {
  // 加个防抖，移入元素时，会依次被捕获触发
  const handleMouseEnter = debounce((element) => {
    // console.log(">>>>>>target<<<<<<", element.target);
    // const target = getParentElement(element.target);
    // console.log(">>>>>>parent<<<<<<", target);
    const { target } = element;
    // 如果是刚进入，则把上一个元素删除
    if (!targetMap.has(target)) {
      if (targetMap.get(preScrollTarget)) {
        targetMap.delete(preScrollTarget);
      }
      // 上一个元素移除样式
      handleCssClassName(preScrollTarget, 'remove', SCROLL_CLASS_NAME)
      // 添加滚动容器样式
      handleCssClassName(target, 'add', SCROLL_CLASS_NAME);
      console.log(">>>>>>添加样式后的target<<<<<<", target);
      // 保存当前元素
      preScrollTarget = target;
    }
  }, 100);

  onMounted(() => {
    // document.body添加 mousemove 事件
    document.body.addEventListener('mousemove', handleMouseEnter, true);
    // addEventListener(document.body, 'mousemove', handleMouseEnter, true);
  })
}

function isElementScrollable(element) {
  const isVerticallyScrollable = element.scrollHeight > element.clientHeight;
  const isHorizontallyScrollable = element.scrollWidth > element.clientWidth;
  return isVerticallyScrollable || isHorizontallyScrollable;
}