<template>
  <uiPage :config="page" ref="pageComp"></uiPage>
</template>

<script lang="ts" setup>
import {
  nextTick, reactive, ref, watch,
} from 'vue';

import type { RemoveData, UpdateData } from '@tmagic/stage';
import type { Id, MApp, MNode } from '@tmagic/schema';

import uiPage from './ui-page.vue';

const pageComp = ref<InstanceType<typeof uiPage>>();
const root = ref<MApp>();
const page = ref();

window.magic?.onRuntimeReady({
  /** 当编辑器的dsl对象变化时会调用 */
  updateRootConfig(config: MApp) {
    root.value = config;
  },

  /** 当编辑器的切换页面时会调用 */
  updatePageId(id: Id) {
    page.value = root.value?.items?.find((item) => item.id === id);
  },

  /** 新增组件时调用 */
  add({ config }: UpdateData) {
    const parent = config.type === 'page' ? root.value : page.value;
    parent.items?.push(config);
  },

  /** 更新组件时调用 */
  update({ config }: UpdateData) {
    const index = page.value.items?.findIndex((child: MNode) => child.id === config.id);
    page.value.items.splice(index, 1, reactive(config));
  },

  /** 删除组件时调用 */
  remove({ id }: RemoveData) {
    const index = page.value.items?.findIndex((child: MNode) => child.id === id);
    page.value.items.splice(index, 1);
  },
});

watch(page, async () => {
  // page配置变化后，需要等dom更新
  await nextTick();
  window.magic?.onPageElUpdate(pageComp.value?.$el);
});
</script>

<style>
#app {
  overflow: auto;
}

html,body,#app {
  height: 100%; margin: 0;padding: 0;
}

#app::-webkit-scrollbar {
  width: 0 !important;
  display: none;
}
</style>
