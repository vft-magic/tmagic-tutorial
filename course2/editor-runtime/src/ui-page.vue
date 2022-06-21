<template>
  <div v-if="config" :id="config.id" :style="style">
    <div v-for="node in config.items" :key="node.id" :id="node.id">hello world</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';

const props = defineProps<{
  config: any;
}>();

const style = computed(() => {
  const { width = 375, height = 1700 } = props.config.style || {};
  return {
    width: `${width}px`,
    height: `${height}px`,
  };
});
</script>
