import 'element-plus/dist/index.css';
import '@tmagic/editor/dist/style.css';
import '@tmagic/form/dist/style.css';

import { createApp } from 'vue';
import ElementPlus from 'element-plus';

import TMagicDesign from '@tmagic/design';
import TMagicEditor from '@tmagic/editor';
import TMagicElementPlusAdapter from '@tmagic/element-plus-adapter';
import TMagicForm from '@tmagic/form';

import App from './App.vue';

createApp(App)
  .use(ElementPlus)
  .use(TMagicDesign, TMagicElementPlusAdapter)
  .use(TMagicEditor)
  .use(TMagicForm)
  .mount('#app');
