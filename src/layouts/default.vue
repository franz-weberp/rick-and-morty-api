<template>
  <header class="banner">
    <a href="https://github.com/franz-weberp/rick-and-morty-api" target="_blank" >
      <C-Header />
    </a>
  </header>
  <main class="content">
    <slot></slot>
  </main>
  <footer>
    <C-Footer />
  </footer>
</template>

<script setup>
import CHeader from '@components/C-Header.vue'
import CFooter from '@components/C-Footer.vue'
</script>

<style lang="scss" scoped>
.banner {
  background: $color-white;
  display: grid;
  justify-content: center;
  padding: $p-24;
}

.content {
  background: $color-grey;
}
</style>