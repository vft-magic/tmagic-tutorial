<template>
  <Component :config="config">
    <Component v-for="item in config.items" :key="item.id" :config="item"></Component>
  </Component>
</template>

<script lang="ts" setup>
import type { MContainer } from '@tmagic/schema';

import Component from './Component.vue';

defineProps<{
  config: MContainer;
}>();
</script>