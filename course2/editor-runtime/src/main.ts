import { createApp } from 'vue';

import type { Magic } from '@tmagic/stage';

import App from './App.vue';

declare global {
  interface Window {
    magic?: Magic;
  }
}

createApp(App).mount('#app');
