import 'element-plus/dist/index.css';
import '@tmagic/editor/dist/style.css';
import '@tmagic/form/dist/style.css';

import { createApp } from 'vue';
import ElementPlus from 'element-plus';

import TMagicEditor from '@tmagic/editor';
import TMagicForm from '@tmagic/form';

import App from './App.vue';

createApp(App)
  .use(ElementPlus)
  .use(TMagicEditor)
  .use(TMagicForm)
  .mount('#app');
