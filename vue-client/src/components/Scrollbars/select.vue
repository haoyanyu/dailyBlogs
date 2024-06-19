<template>
  <div class="select-container">
    <div class="select-wrapper">
      <div :class="['select-wrapper-input', selectActive ? 'active' : '']" @click="handleToggle">
        <input v-if="selectActive" class="inner-input" :placeholder="selectPlaceHolder" :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)" />
        <span v-else>{{ selectPlaceHolder }}</span>
        <div class="icon-container">
          <span class="arrow-icon"></span>
        </div>
      </div>
      
      <div :class="['select-wrapper-options', selectActive ? 'visible' : '']">
        <ul class="options-container">
          <li class="options-item" v-for="option in options" :key="option.value">
            {{ option.label }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  modelValue: String,

});

const selectPlaceHolder = ref(props.placeholder)
const selectActive = ref(false);

const emit = defineEmits(['update:modelValue']);

const handleToggle = () => {
  // 切换select选中状态
  if (!selectActive.value) {
    selectActive.value = !selectActive.value;
  }
}


</script>

<style lang="scss" scoped>
.select-container {
  margin: 16px;
}

.select-wrapper {
  width: 240px;

  &-input {
    border-width: 1px;
    border-style: solid;
    border-radius: 2px;
    cursor: pointer;
    min-height: 32px;
    padding: 5px 26px 5px 12px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    transition: border-color .25s;
    outline: none;
    position: relative;
    line-height: 20px;
    background: #fff;

    .icon-container {
      position: absolute;
      width: 17px;
      height: 17px;
      right: 6.5px;
      top: 6.5px;
    }

    .arrow-icon {
      display: block;
      width: 12px;
      height: 12px;
      border: 1px solid #e0e0e0;
      border-left: none;
      border-top: none;
      transform: rotate(45deg) translate(2px, -1px);
    }
  }

  &-input.active {
    border-color: #155bd4;

    .icon-container {
      transform: rotate(180deg);
      transition: transform 0.2s linear;
    }
  }

  &-options {
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, .1);
    border-radius: 3px;
    font-size: 14px;
    overflow-y: auto;
    display: block;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;

    &.visible {
      display: block;
      max-height: 256px;
      overflow: auto;

      &::-webkit-scrollbar {
        width: 12px;
      }
      // &::-webkit-scrollbar-thumb {

      // }
    }
  }
}
</style>