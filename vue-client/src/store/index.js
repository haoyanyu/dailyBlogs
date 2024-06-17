import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCountStore = defineStore('counter', {
  state: () => ({
    count: 1,
  }),

  actions: {
    increment(state) {
      state.count += 1
    }
  }
})