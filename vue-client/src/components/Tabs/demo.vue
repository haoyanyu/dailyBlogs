<template>
  <Tabs v-model:active="active" :line-width="40" :line-height="3">
    <TabPanel title="Tab 1">
      <div style="height: 200px;background: royalblue; overflow-y: auto;">
        <div style="height: 400px">
          <p v-for="num in 20" :key="num">Tab {{ num }}</p>
        </div>
      </div>
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