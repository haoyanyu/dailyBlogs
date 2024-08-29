<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import { useParent } from './hooks/useParent';
import { tabNameKey } from './constants';
const props = defineProps({
  title: String,
  name: [Number, String],
  disabled: Boolean,
})
const { parent, index } = useParent(tabNameKey);

const instance = getCurrentInstance();


</script>

<style scoped lang="scss">

</style>