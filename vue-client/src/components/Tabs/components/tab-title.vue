<template>
  <div
    :aria-disabled="disabled"
    :style="tabStyle"
    :class="[
      'hyy-tab',
      isActive ? 'hyy-tab_active' : '',
      type === 'card' ? 'hyy-tab_card' : '',
      disabled ? 'hyy-tab_disabled' : ''
    ]"
    :aria-color="color"
    @click="handleClick">
    <span>{{ title }}</span>
  </div>
</template>

<script setup>
import { ref, unref, computed } from 'vue';
import { useParent } from '../hooks/useParent';
import { tabNameKey } from '../constants';

const props = defineProps(['title', 'isActive', 'disabled', 'index', 'type', 'color']);
const emit = defineEmits(['click']);

const tabStyle = computed(() => {
  const { color, isActive, type } = props;
  if (type === 'card') {
    return {
      background: isActive ? color : 'transparent',
      border: `1px solid ${color}`,
    }
  } else {
    return {}
  }
})
const handleClick = (event) => {
  emit('click', { index: props.index, event });
}
</script>

<style scoped lang="scss">
.hyy-tab {
  color: #646566;
  padding: 0 4px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-content: center;
  position: relative;
  cursor: pointer;

  &_card {
    border-right-width: 0 !important;

    &:last-of-type {
      border-right-width: 1px !important;
    }
    &.hyy-tab_active {
      color: #fff;
    }
  }
}

.hyy-tab_active {
  color: #323232;
  font-weight: bold;
}

.hyy-tab_disabled {
  cursor: not-allowed;
  color: #c8c9cc;
}
</style>