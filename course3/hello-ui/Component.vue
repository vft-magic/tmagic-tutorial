<template>
  <component v-if="config" :is="type" :id="`${id}`" :style="style" :config="config">
    <slot></slot>
  </component>
</template>

<script lang=ts setup>
import { computed } from 'vue';

import type { MNode } from '@tmagic/schema';

// 将节点作品参数传入组件中
const props = defineProps<{
  config: MNode;
}>();

const type = computed(() => {
  if (!props.config.type || ['page', 'container'].includes(props.config.type)) return 'div';
  return props.config.type;
});

const id = computed(() => props.config.id);

const fillBackgroundImage = (value: string) => {
  if (value && !/^url/.test(value) && !/^linear-gradient/.test(value)) {
    return `url(${value})`;
  }
  return value;
};

const style = computed(() => {
  if (!props.config.style) {
    return {};
  }

  const results: Record<string, any> = {};

  const whiteList = ['zIndex', 'opacity', 'fontWeight'];
  Object.entries(props.config.style).forEach(([key, value]) => {
    if (key === 'backgroundImage') {
      value && (results[key] = fillBackgroundImage(value));
    } else if (key === 'transform' && typeof value !== 'string') {
      results[key] = Object.entries(value as Record<string, string>)
        .map(([transformKey, transformValue]) => {
          let defaultValue = 0;
          if (transformKey === 'scale') {
            defaultValue = 1;
          }
          return `${transformKey}(${transformValue || defaultValue})`;
        })
        .join(' ');
    } else if (!whiteList.includes(key) && value && /^[-]?[0-9]*[.]?[0-9]*$/.test(value)) {
      results[key] = `${value}px`;
    } else {
      results[key] = value;
    }
  });

  return results;
});
</script>