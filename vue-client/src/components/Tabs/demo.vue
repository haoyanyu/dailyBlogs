<template>
  <Tabs v-model:active="active">
    <TabPanel title="Tab 1">
      <div style="height: 200px;background: royalblue;">Tab 1</div>
    </TabPanel>
    <TabPanel title="Tab 2">
      <div style="height: 400px;background: burlywood;">Tab 2</div>
    </TabPanel>
    <TabPanel title="Tab 3">
      <div style="height: 300px;background: chocolate;">Tab 3</div>
    </TabPanel>
  </Tabs>
</template>

<script setup>
import { ref } from 'vue';
import Tabs from './tabs.vue';
import TabPanel from './tab-panel.vue';

const active = ref(0);

</script>

<style>

</style>