<template>
  <Container :config="config"></Container>
</template>

<script lang="ts" setup>
import type { MPage } from '@tmagic/schema';

import Container from './Container.vue';

defineProps<{
  config: MPage;
}>();

defineExpose({
  reload() {
    window.location.reload();
  }
});
</script>
