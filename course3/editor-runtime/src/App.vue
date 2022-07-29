<template>
  <Page v-if="page" :config="page" ref="pageComp"></Page>
</template>

<script lang="ts" setup>
import {
  nextTick, reactive, ref, watch,
} from 'vue';

import type { RemoveData, UpdateData } from '@tmagic/stage';
import type { Id, MApp, MNode } from '@tmagic/schema';
import { getNodePath } from '@tmagic/utils';
// eslint-disable-next-line
import { Page } from 'hello-ui';

const pageComp = ref<InstanceType<typeof Page>>();
const root = ref<MApp>();
const page = ref();
const selectedId = ref<Id>();

window.magic?.onRuntimeReady({
  /** 当编辑器的dsl对象变化时会调用 */
  updateRootConfig(config: MApp) {
    root.value = config;
  },

  /** 当编辑器的切换页面时会调用 */
  updatePageId(id: Id) {
    page.value = root.value?.items?.find((item) => item.id === id);
  },

  select(id: Id) {
    selectedId.value = id;
    const el = document.getElementById(`${id}`);
    if (el) return el;
    // 未在当前文档下找到目标元素，可能是还未渲染，等待渲染完成后再尝试获取
    return nextTick().then(() => document.getElementById(`${id}`) as HTMLElement);
  },

  /** 新增组件时调用 */
  add({ config }: UpdateData) {
    console.log('add config', config);
    if (!root.value) throw new Error('error');
    if (!selectedId.value) throw new Error('error');
    const path = getNodePath(selectedId.value, [root.value]);
    const node = path.pop();
    const parent = node?.items ? node : path.pop();
    if (!parent) throw new Error('未找到父节点');
    parent.items?.push(config);
  },

  update({ config }: UpdateData) {
    console.log('update config', config);
    if (!root.value) throw new Error('error');
    const path = getNodePath(config.id, [root.value]);
    const node = path.pop();
    const parent = path.pop();
    if (!node) throw new Error('未找到目标节点');
    if (!parent) throw new Error('未找到父节点');
    const index = parent.items?.findIndex((child: MNode) => child.id === node.id);
    parent.items.splice(index, 1, reactive(config));

    if (config.type === 'page') {
      page.value = config;
    }
  },

  remove({ id }: RemoveData) {
    if (!root.value) throw new Error('error');
    const path = getNodePath(id, [root.value]);
    const node = path.pop();
    if (!node) throw new Error('未找到目标元素');
    const parent = path.pop();
    if (!parent) throw new Error('未找到父元素');
    const index = parent.items?.findIndex((child: MNode) => child.id === node.id);
    parent.items.splice(index, 1);
  },
});

watch(page, async () => {
  // page配置变化后，需要等dom更新
  await nextTick();
  window.magic?.onPageElUpdate(pageComp.value?.$el);
}, {
  immediate: true,
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
