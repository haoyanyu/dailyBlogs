<!-- 基于vue3实现的简易tabs组件，主要为了实践一下，写这个组件需要如何设计 -->
<template>
  <div>
    <div ref="navRef" class="hyy-tabs_nav">
      <slot name="nav-left"></slot>
      <template v-for="(child, index) in children" :key="child.id">
        <TabTitle
          :ref="setTitleRefs(index)"
          :title="child.title"
          :is-active="index === currentName"
          :disabled="child.disabled"
          :index="index"
          :type="type"
          :color="color"
          @click="handleTabClick"
        >
        </TabTitle>
      </template>
      <div v-if="type === 'line'" class="hyy-tabs_line" :style="state.lineStyle"></div>
      <slot name="nav-right"></slot>
    </div>
  </div>
  <TabContent>
    <slot name="default"></slot>
  </TabContent>
  
</template>

<script setup>
import {
  ref,
  watch,
  computed,
  reactive,
  onActivated,
  onMounted,
  onBeforeUpdate,
  nextTick,
} from 'vue';
import { useChildren } from './hooks/useChildren';
import { tabNameKey } from './constants';

import TabTitle from './components/tab-title.vue';
import TabContent from './components/tab-content.vue';

const props = defineProps({
  active: [String, Number],
  lineWidth: Number,
  lineHeight: {
    type: Number,
    default: 3,
  },
  duration: {
    type: Number,
    default: 0.3,
  },
  color: {
    type: String,
    default: '#58727e',
  },
  type: {
    type: String,
    default: 'line',
  },
  // // 是否开启手风琴模式
  // accordion: Boolean,
  // // 是否开启手风琴模式
  // animated: Boolean,
  // // 是否开启手风琴模式
  // swipeable: Boolean,
  // // 是否开启手风琴模式
  // lazyRender: Boolean,
  // //是否开启手风琴模式
});
const emit = defineEmits(['click-tab', 'update:active']);

const { children, linkChildren } = useChildren(tabNameKey);
const state = reactive({
  currentIndex: -1,
  lineStyle: {},
  inited: false,
});

const navRef = ref(null);
const contentRef = ref(null);
const root = ref(null);
const wrapRef = ref(null);

// 获取tab标题的ref
const titleRefs = ref([]);
const titleRefCache = [];
// vue里元素的ref可以是一个函数，这个函数会在组件挂载时调用，框架会把当前的元素传入ref函数，ref函数会在组件卸载时调用，传入null。
const setTitleRefs = (index) => {
  if (!titleRefCache[index]) {
    titleRefCache[index] = (el) => {
      titleRefs.value[index] = el;
    };
  }
  return titleRefCache[index];
}

const getTabName = (tab, index) => {
  return tab.name ?? index;
};
const currentName = computed(() => {
  const activeTab = children[state.currentIndex];
  if (activeTab) {
    return getTabName(activeTab, state.currentIndex);
  }
})

const setLine = () => {
  const shouldAnimate = state.inited;
  nextTick(() => {
    const titles = titleRefs.value;

    // 找不到对应的tab title或者不是line风格时，不做计算
    if (!titles || !titles[state.currentIndex] || props.type !== 'line') {
      return;
    }
    const title = titles[state.currentIndex].$el;
    const { lineHeight, lineWidth, color } = props;
    const left = title.offsetLeft + title.offsetWidth / 2;

    const lineStyle = {
      width: `${lineWidth}px`,
      backgroundColor: color,
      transform: `translateX(${left}px) translateX(-50%)`,
      height: `${lineHeight}px`,
      borderRadius: `${lineHeight}px`,
    }

    if (shouldAnimate) {
      lineStyle.transitionDuration = `${props.duration}s`
    }

    state.lineStyle = lineStyle;
  })
}

const findAvailableTab = (index) => {
  // 判断遇到异常时，应该向前或向后切换
  const diff = index < state.currentIndex ? -1 : 1;
  // 循环查找可用的tab, 如果当前tab是禁用状态，则向前或向后切换一个
  while (index >= 0 && index < children.length) {
    if (!children[index].disabled) {
      return index;
    }
    index += diff;
  }
}

const setCurrentIndex = (currentIndex, skipScrollIntoView) => {
  const newIndex = findAvailableTab(currentIndex);
  if (newIndex !== undefined && newIndex !== null) {
    const newTab = children[newIndex];
    const newName = getTabName(newTab, newIndex);
    // 更新当前选中的tab
    if (state.currentIndex !== newIndex) {
      state.currentIndex = newIndex;
    }

    // 选中的选项滚动回视图
    if (!skipScrollIntoView) {
      // scrollIntoView();
    }

    // 更新model值
    if (newName !== props.active) {
      emit('update:active', newName)
    }

    setLine();
  }
}
const setCurrentIndexByName = (name) => {
  const matched = children.find((item, index) => getTabName(item, index) === name);
  // 即使是指定了name也是计算出name对应的索引
  const index = matched ? children.indexOf(matched) : 0;
  setCurrentIndex(index);
}

watch(() => props.active, (val) => {
  if (val !== currentName.value) {
    setCurrentIndexByName(val);
  }
});

const handleTabClick = ({ event, index }) => {
  const clickedTab = children[index];
  const { title, disabled } = clickedTab; 
  const name = getTabName(clickedTab, index);

  if (!disabled) {
    setCurrentIndex(index);
  }
  emit('click-tab', { title, name, index, event, disabled })
}

linkChildren({
  props,
  currentName,
});

// 生命周期
onMounted(() => {
  nextTick(() => {
    setCurrentIndexByName(props.active, true);
    state.inited = true;
  })
})

onActivated(() => {
  nextTick(() => {
    setCurrentIndexByName(props.active, true);
    state.inited = true;
    setLine();
  })
})

// 在组件更新时，清空titleRfs
onBeforeUpdate(() => {
  titleRefs.value = [];
})


</script>

<style lang="scss" scoped>
.hyy-tabs_nav {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-bottom: 15px;
  position: relative;
  user-select: none;
}

.hyy-tabs_line {
  position: absolute;
  bottom: 0;
}
</style>