<template>
  <div>
    <div
      ref="pullRef"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
      @touchcancel="handleTouchEnd"
    > 
      <!--  -->
      <div class="loading-block" v-if="showLoadingBlock">
        <slot name="loading" v-if="status === STATUS.loading">
          <div class="loading-text">
            加载中
            <BeanLoading />
          </div>
        </slot>
        <slot name="pulling" v-if="status === STATUS.pulling">
          <div class="loading-text">{{ pullingText }}</div>
        </slot>
      </div>
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, unref, watch } from 'vue';
import { useSimpleEventlistener } from "../../use/useEventListener";
import useTouch from './use-touch';

import BeanLoading from '../BeanLoading/index.vue';

const STATUS = {
  init: 'init', // 初始状态或正常状态
  pulling: 'pulling', // 下拉中
  loading: 'loading', // 刷新中
  loosing: 'loosing',
}

const OFFSET_DISTANCE = 100;

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'refresh']);

const pullRef = ref();
const status = ref(STATUS.init);
const distance = ref(0);
const touchStore = useTouch();

// 方法
// 当前状态不是加载中时，才可以touch
const isTouchable = () => status.value !== STATUS.loading;

const handleTouchStart = (e) => {
  if (isTouchable()) {
    touchStore.start(e);
  }
}

const handleTouchEnd = (e) => {
  if (touchStore.deltaY) {
    emit('refresh');
  }
  
}

// 根据当前拖动距离计算状态
const setStatus = (value) => {
  if (value <= 0) {
    status.value = STATUS.init;
  } else if (value === OFFSET_DISTANCE) {
    status.value = STATUS.loading;
  } else {
    status.value = STATUS.pulling;
  }
}

const onTouchMove = (e) => {
  if (isTouchable()) {
    const { deltaY } = touchStore;
    touchStore.move(e);
    setStatus(deltaY.value);
    if (deltaY.value >= 0) {
      distance.value = deltaY.value;
    }
  }
}

// 计算属性
const showLoadingBlock = computed(() => {
  // 加载中、下拉中时展示提示
  return [STATUS.loading, STATUS.pulling].includes(status.value);
})

// 根据状态和拖动距离计算文案
const pullingText = computed(() => {
  const statusValue = unref(status);
  if (statusValue === STATUS.pulling) {
    return distance.value < OFFSET_DISTANCE ? '下拉即可刷新...' : '释放即可刷新...';
  }
  return '';
})

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      setStatus(OFFSET_DISTANCE);
    } else {
      setStatus(0)
    }
  },
);

// 生命周期
onMounted(() => {
  useSimpleEventlistener(pullRef, 'touchmove', onTouchMove)
})

</script>

<style scoped lang="scss">
.loading-block {
  padding: 12px 0;

  .loading-text {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    color: #999;
  }
}
</style>