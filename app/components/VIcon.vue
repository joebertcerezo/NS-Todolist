<template>
  <i :class="name"></i>
</template>

<script lang="ts" setup>
interface Props {
  name: string;
}

defineProps<Props>();
</script>
