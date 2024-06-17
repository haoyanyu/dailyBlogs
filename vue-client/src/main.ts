import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './utils/redux';
import App from './App.vue';

import 'vant/lib/index.css';
import './style.css';

const pinia = createPinia();
createApp(App).use(pinia).mount('#app');
