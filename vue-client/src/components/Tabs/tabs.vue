<!-- 基于vue3实现的简易tabs组件，主要为了实践一下，写这个组件需要如何设计 -->
<template>
  <div>
    <div ref="navRef" class="hyy-tabs_nav">
      <slot name="nav-left"></slot>
      <template v-for="(child, index) in children" :key="child.id">
        <TabTitle
          :title="child.title"
          :is-active="index === currentName"
          :disabled="child.disabled"
          @click="handleTabClick"
        >
        </TabTitle>
      </template>
      <slot name="nav-right"></slot>
    </div>
  </div>
  <TabContent>
    <slot name="default"></slot>
  </TabContent>
  
</template>

<script setup>
import { ref, watch, computed, reactive, onActivated, onMounted, nextTick } from 'vue';
import { useChildren } from './hooks/useChildren';
import { tabNameKey } from './constants';

import TabTitle from './components/tab-title.vue';
import TabContent from './components/tab-content.vue';

const props = defineProps({
  active: [String, Number],
  // type: {
  //   type: String,
  //   default: 'line',
  // },
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
const emit = defineEmits(['update:active']);

const { children, linkChildren } = useChildren(tabNameKey);
const state = reactive({
  currentIndex: -1,
});
const navRef = ref(null);
const contentRef = ref(null);
const root = ref(null);
const wrapRef = ref(null);

const getTabName = (tab, index) => {
  return tab.name ?? index;
};
const currentName = computed(() => {
  const activeTab = children[state.currentIndex];
  if (activeTab) {
    return getTabName(activeTab, state.currentIndex);
  }
})

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
const setCurrentIndex = (currentIndex) => {
  const newIndex = findAvailableTab(currentIndex);
  if (newIndex !== undefined && newIndex !== null) {
    const newTab = children[newIndex];
    const newName = getTabName(newTab, newIndex);
    if (state.currentIndex !== newIndex) {
      state.currentIndex = newIndex;
    }
    if (newName !== props.active) {
      emit('update:active', newIndex)
    }
  }
}
const setCurrentIndexByName = (name) => {
  const matched = children.find((item, index) => getTabName(item, index) === name);
  // 即使是指定了name也是计算出name对应的索引
  const index = matched ? children.indexOf(matched) : 0;
  setCurrentIndex(index);
}

watch(() => props.active, (val) => {
  console.log(">>>>>>val<<<<<<", val);
  if (val !== currentName.value) {
    setCurrentIndexByName(val);
  }
});

const handleTabClick = () => {
}

// 生命周期
onMounted(() => {
  nextTick(() => {
    setCurrentIndexByName(props.active);
  })
})

onActivated(() => {
  nextTick(() => {
    setCurrentIndexByName(props.active);
  })
})

linkChildren({
  props,
  currentName,
});

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
</style>