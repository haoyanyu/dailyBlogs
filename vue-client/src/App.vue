<script setup lang="ts">
import { Cell } from 'vant';
import TrackView from './components/TrackView.vue'
import People from './components/People.vue'
</script>

<template>
  <Cell
    title="可提现金额(元)"
    :border="false"
    :value="30"
    is-link
  >
  </Cell>
  <template v-for="item in 10" v-bind:key="item">
    <People />
  </template>
  
  <TrackView />
  <template v-for="item in 10" v-bind:key="item">
    <People />
  </template>
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
</style>
