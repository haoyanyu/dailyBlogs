<script setup lang="ts">
import TrackView from './components/TrackView.vue'
import People from './components/People.vue'
</script>

<template>
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
