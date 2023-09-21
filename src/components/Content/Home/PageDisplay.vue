<template>
  <span class="page">Page {{ page }} - {{ totalPages }}</span>
</template>

<script setup>
import { defineProps } from 'vue'

const { totalPages, page } = defineProps({ totalPages: Number, page: Number })
</script>

<style lang="scss" scoped>
.page {
  @include font-bold;
  font-size: $font-size-lg;
}
</style>