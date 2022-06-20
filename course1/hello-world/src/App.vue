<template>
  <m-editor
    v-model="value"
    :render="render"
    :component-group-list="componentGroupList"
  ></m-editor>
</template>

<script lang="ts" setup>
import {
  createApp, ref, computed,
} from 'vue';
import { editorService } from '@tmagic/editor';
import type { MPage } from '@tmagic/schema';

const page = computed(() => editorService.get<MPage>('page'));

const value = ref({
  type: 'app',
  items: [],
});

const componentGroupList = ref([
  {
    title: '组件列表',
    items: [
      {
        icon: 'https://vfiles.gtimg.cn/vupload/20220614/9cc3091655207317835.png',
        text: 'HelloWorld',
        type: 'hello-world',
      },
    ],
  },
]);

const render = async ({ renderer }: any) => {
  const root = window.document.createElement('div');

  if (!page.value) return root;

  const { width = 375, height = 1700 } = page.value.style || {};

  root.id = `${page.value.id}`;
  root.style.cssText = `
    width: ${width}px;
    height: ${height}px;
  `;

  createApp(
    {
      template: '<div v-for="node in config.items" :key="node.id" :id="node.id">hello world</div>',
      props: ['config'],
    },
    {
      config: page.value,
    },
  ).mount(root);

  renderer.on('onload', () => {
    const style = window.document.createElement('style');
    style.innerHTML = `
      body {
        overflow: auto;
      }

      html,body {
        height: 100%; margin: 0;padding: 0;
      }
      
      html::-webkit-scrollbar {
        width: 0 !important;
        display: none;
      }
    `;

    renderer.iframe.contentDocument.head.appendChild(style);

    renderer.iframe.contentWindow.magic?.onPageElUpdate(root);
    renderer.iframe.contentWindow.magic?.onRuntimeReady({});
  });

  return root;
};
</script>

<style>
html,
body,
#app,
.m-editor {
  height: 100vh;
}

body {
  margin: 0;
}
</style>
