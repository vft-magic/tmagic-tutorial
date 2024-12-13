import 'element-plus/dist/index.css';
import '@tmagic/editor/dist/style.css';

import { createApp } from 'vue';
import ElementPlus from 'element-plus';

import TMagicEditor from '@tmagic/editor';
import TMagicElementPlusAdapter from '@tmagic/element-plus-adapter';

import App from './App.vue';

createApp(App)
  .use(ElementPlus)
  .use(TMagicEditor, TMagicElementPlusAdapter)
  .mount('#app');
