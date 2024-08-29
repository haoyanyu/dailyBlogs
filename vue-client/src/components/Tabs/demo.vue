<template>
  <Tabs v-model:active="active">
    <TabPanel title="Tab 1">
      <div>Tab 1</div>
    </TabPanel>
    <TabPanel title="Tab 2">
      <div>Tab 2</div>
    </TabPanel>
    <TabPanel title="Tab 3">
      <div>Tab 3</div>
    </TabPanel>
  </Tabs>
</template>

<script setup>
import { ref } from 'vue';
import Tabs from './tabs.vue';
import TabPanel from './tab-panel.vue';

const active = ref(1);

</script>

<style>

</style>