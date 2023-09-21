<template>
  <a href="https://www.linkedin.com/in/franz-weber-pimentel/" target="_blank">
    <p class="author">{{ author }}</p>
  </a>
</template>

<script setup>
import { author } from '@utils/messages/messages.js'
</script>

<style lang="scss" scoped>
.author {
  background: $color-white;
  color: rgba(25, 25, 25, .7);
  font-size: $font-size-xs;
  margin: 0;
  padding: $p-24 0;
  text-align: center;
  transition: color 0.2s ease 0s;
}
</style>