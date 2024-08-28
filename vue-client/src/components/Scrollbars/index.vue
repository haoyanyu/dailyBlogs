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

  <div class="scrollable" id="scrollable">
    <div class="scrollable-content">
      <!-- 内容放在这里 -->
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec varius velit, a hendrerit nisl. Cras malesuada sem vel metus malesuada, at fermentum purus blandit. Sed dignissim dictum libero, vel consectetur eros cursus vel. Integer posuere, libero vel fermentum vehicula, sapien ligula fermentum nulla, a tempor erat turpis non est. Mauris vitae justo ut lorem varius sollicitudin.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

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

onMounted(() => {
  const scrollable = document.getElementById('scrollable');

  scrollable.addEventListener('scroll', () => {
      scrollable.classList.add('scrolling');

      clearTimeout(scrollable.scrollTimeout);
      scrollable.scrollTimeout = setTimeout(() => {
          scrollable.classList.remove('scrolling');
      }, 1000);
  });
})


// useScrollbars();

try {
  var a = 3;
  console.log('>>: test', a);
} catch (e) {}
console.log('>>>global', a)

</script>

<style lang="scss" scoped>
.scrollable {
            width: 300px;
            height: 200px;
            overflow: auto; /* 初始隐藏滚动条 */
            position: relative;
            border: 1px solid #ccc;
        }

        .scrollable-content {
            height: 400px;
            padding-right: 15px; /* 为自定义滚动条保留空间 */
        }

        .scrollable::-webkit-scrollbar {
            width: 12px;
        }

        .scrollable::-webkit-scrollbar-thumb {
            background-color: darkgrey;
            border-radius: 10px;
            opacity: 0;
            transition: opacity 0.3s;
        }

        .scrollable:hover::-webkit-scrollbar-thumb {
            opacity: 1;
        }

        /* 自定义滚动条悬浮效果 */
        .scrollable::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 12px; /* 滚动条宽度 */
            background: transparent;
            z-index: 1;
        }

        /* 滚动时显示滚动条 */
        .scrollable.scrolling::-webkit-scrollbar-thumb {
            opacity: 1;
        }
.page-container {
  padding: 24px;
  margin: 16px;
  border: 1px solid royalblue;
  // background: rebeccapurple;
  height: 600px;
  overflow: hidden;

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
  overflow: auto !important;
  position: relative;
}

.scrollable-container::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 8px; /* 滚动条宽度 */
  background: transparent;
  z-index: 1;
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