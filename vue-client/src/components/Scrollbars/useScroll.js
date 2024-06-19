import { onMounted } from 'vue';
import debounce from 'lodash/debounce';

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
 * 4. 滚动条占位问题：
 *  根据鼠标自动显示：不预留滚动条位置，鼠标移入会导致页面抖动
 *  滚动时：同上
 *  TODO：期望效果：默认的滚动时的效果，滚动条不占窗口位置
 * 5. 原本的样式如何统一处理，设置了overflow: scroll/auto的地方？如果选择了始终展示，这些元素初始就会展示滚动条
 */

function getParentElement(element) {
  return element.parentNode;
}

function handleCssClassName(element, action, name) {
  if (!element) return;
  if (['add', 'remove'].includes(action)) {
    element.classList[action](name);
  }
}

function handleTargetMouseLeave(element) {
  console.log(">>>>>>leave element<<<<<<", element);
  // 删除滚动容器样式
  handleCssClassName(element.target, 'remove', SCROLL_CLASS_NAME);
  // element.target.classList.remove('scrollable-container');
  // 添加父级的滚动样式
  const parent = getParentElement(element);
  handleCssClassName(parent, 'add', SCROLL_CLASS_NAME)
  setTimeout(() => {
    // 移除样式后，把事件监听也删除掉
    element.target.removeEventListener('mouseleave', handleTargetMouseLeave, false)
  }, 0);
}

function addScrollableStyle(element) {
  console.log(">>>>>>enter element<<<<<<", element);
  // 添加滚动容器样式
  handleCssClassName(element, 'add', SCROLL_CLASS_NAME);
  // 删除父级的滚动样式
  const parent = getParentElement(element);
  console.log(">>>>>>parent<<<<<<", parent);
  handleCssClassName(parent, 'remove', SCROLL_CLASS_NAME)
  // 添加mouseLeave事件
  element.addEventListener('mouseleave', handleTargetMouseLeave, false)
}

export const useScrollbars = () => {
  // 加个防抖，移入元素时，会依次被捕获触发
  const handleMouseEnter = debounce((element) => {
    const { target } = element;
    target && addScrollableStyle(target);
  }, 100);

  onMounted(() => {
    document.body.addEventListener('mouseenter', handleMouseEnter, true)
  })
}

function isElementScrollable(element) {
  const isVerticallyScrollable = element.scrollHeight > element.clientHeight;
  const isHorizontallyScrollable = element.scrollWidth > element.clientWidth;
  return isVerticallyScrollable || isHorizontallyScrollable;
}