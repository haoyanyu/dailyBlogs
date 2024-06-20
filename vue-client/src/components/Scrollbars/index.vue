<template>
  <div class="page-container">
    <div class="page-scrollable">
      <div class="page-top">
        <div class="page-top_inner">
          
        </div>
        scrollable-containerscrollable-containerscrollable-containerscrollable-containerscrollable-container scrollable-container scrollable-contain erscrollable -c n tai ners croll able-containerscroll able-containerscrollable-containerscrollable-containerscrollable-containerscrollable-container
          scrollable-containerscrollable-containerscrollable-containerscrollable-containerscrollable-containerscrollable-containerscrollable-containerscrollable-containerscrollable-containerscrollable-container
          scrollable-containerscrollable-containerscrollable-containerscrollable-containerscrollable-containerscrollable-containerscrollable-containerscrollable-containerscrollable-containerscrollable-container
      </div>
      <div class="page-center">
        <p class="page-center_inner" v-for="(num, index) in 20" :key="index"> {{ num }} 。 {{ selectValue }}</p>
      </div>
      <div>
        <custom-select v-model="selectValue" :options="myOptions"></custom-select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import CustomSelect from './select.vue';
import { useScrollbars } from './useScroll';

const selectValue = ref('');
const myOptions = ref([
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
  { label: '选项三', value: '4' },
  { label: '选项三', value: '5' },
  { label: '选项三', value: '6' },
  { label: '选项三', value: '7' },
  { label: '选项三', value: '8' },
  { label: '选项三', value: '9' },
  { label: '选项三', value: '0' },
  { label: '选项三', value: '31' },
  { label: '选项三', value: '32' },
  { label: '选项三', value: '33' },
  { label: '选项三', value: '34' },
  { label: '选项三', value: '35' },
  { label: '选项三', value: '36' },
  { label: '选项三', value: '37' },
  { label: '选项三', value: '38' },
])

useScrollbars();

</script>

<style lang="scss" scoped>
.page-container {
  padding: 24px;
  margin: 16px;
  border: 1px solid royalblue;
  // background: rebeccapurple;
  height: 600px;
  overflow: auto;

  .page-scrollable {
    background: tan;
    overflow: auto;

    .page-top {
      background: yellowgreen;
      height: 400px;
      overflow: auto;

      .page-top_inner {
        height: 500px;
        margin: 12px;
        background: indianred;
      }
    }
  }

  .page-center {
    max-height: 200px;
    overflow: auto;

    &_inner {
      font-size: 16px;
      color: hotpink;
      line-height: 28px;
      font-weight: bold;
    }
  }
}

.scrollable-container {
  // overflow: auto !important;
  // scrollbar-width: thin;
  // scrollbar-color: #888 #f1f1f1;
}

.scrollable-container::-webkit-scrollbar {
  opacity: 0;
  width: 8px;
}

// .scrollable-container::-webkit-scrollbar-track {
//   width: 0;
// }

.scrollable-container::-webkit-scrollbar-thumb {
  background-color: transparent;
  opacity: 0;
}

.scrollable-container:hover {
  border-color: paleturquoise;
}

.scrollable-container:hover::-webkit-scrollbar {
  // opacity: 1;
  width: 8px;
}

.scrollable-container:hover::-webkit-scrollbar-thumb {
  background: darkgrey;
  border-radius: 10px;
  opacity: 1;
}
</style>