import { createApp } from 'vue';

import type { Magic } from '@tmagic/stage';

// eslint-disable-next-line
import { HelloWorld } from 'hello-ui';

import App from './App.vue';

declare global {
  interface Window {
    magic?: Magic;
  }
}

const app = createApp(App);

app.component('hello-world', HelloWorld);

app.mount('#app');
