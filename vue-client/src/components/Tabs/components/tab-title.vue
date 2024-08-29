<template>
  <div :aria-disabled="disabled" :class="['hyy-tab', isActive ? 'hyy-tab-active' : '']" @click="handleClick">
    <span>{{ title }}</span>
  </div>
</template>

<script setup>
import { ref, unref, computed } from 'vue';
import { useParent } from '../hooks/useParent';
import { tabNameKey } from '../constants';

const props = defineProps(['title', 'isActive', 'disabled', 'index']);
const emit = defineEmits(['click']);

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
}

.hyy-tab-active {
  color: #323232;
  font-weight: bold;
}
</style>