<template>
  <div v-show="show">
    <slot></slot>
  </div>
</template>

<script setup>
import { getCurrentInstance, computed } from 'vue';
import { useParent } from './hooks/useParent';
import { tabNameKey } from './constants';
const props = defineProps({
  title: String,
  name: [Number, String],
  disabled: Boolean,
})
const { parent, index } = useParent(tabNameKey);

const instance = getCurrentInstance();
const getName = () => props.name ?? index.value;
const active = computed(() => {
  const isActive = getName() === parent.currentName.value;

  if (isActive) {

  }

  return isActive;
})
const show = computed(() => {
  return active.value
})


</script>

<style scoped lang="scss">

</style>