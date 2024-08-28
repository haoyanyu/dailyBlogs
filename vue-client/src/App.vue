<script setup>
import { reactive, ref } from 'vue';
import { Cell } from 'vant';
import { storeToRefs } from 'pinia';

import { useCountStore } from './store/index';

// import CssSlider from './components/CssSlider.vue';
// import TrackView from './components/TrackView.vue'
import AsyncList from './components/AsyncList.vue';
// import Scrollbars from './components/Scrollbars/index.vue';
import InfiniteScroll from './components/InfiniteScroller/index.vue';
import PullRefresh from './components/PullRefresh/index.vue';

const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
});
let loadingList = ref(20);
let hasMore = ref(true);

const handleLoadMore = () => {
  if (loadingList.value < 100) {
    loadingList.value += 20;
  } else {
    hasMore.value = false;
  }
}

const handleRefresh = () => {
  // isRefreshLoading.value = true;
  setTimeout(() => {
    isRefreshLoading.value = false;
  }, 3000);
}
const isRefreshLoading = ref(false);

const store = useCountStore();
const { count } = storeToRefs(store);
store.$patch({
  count: 3,
});



</script>

<template>
  <!-- <ul>
    <li v-for="value in myObject">
      {{ value }}
    </li>
  </ul>
  <template v-for="item in 10" v-bind:key="item">
    <People />
  </template>
  
  <TrackView />
  <template v-for="item in 10" v-bind:key="item">
    <People />
  </template> -->
  
  <!-- <CssSlider /> -->
  <!-- 异步组件 -->
  <Suspense>
    <AsyncList />
    <template #fallback>
      Loading...
    </template>
  </Suspense>
  <!-- <Scrollbars /> -->
  
  <div class="pull-refresh-wrapper">
    <PullRefresh @refresh="handleRefresh" v-model="isRefreshLoading">
      <div v-for="item in 20" :key="item">{{item + '___' + item}}</div>
    </PullRefresh>
  </div>
  
  <InfiniteScroll :has-more="hasMore" @load="handleLoadMore">
    <template #content>
      <div v-for="item in loadingList" :key="item">{{item}}</div>
    </template>
  </InfiniteScroll>
   
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.pull-refresh-wrapper {
  background: tan;
  padding: 24px;
  line-height: 32px;
  height: 240px;
  overflow: auto;
}
</style>
