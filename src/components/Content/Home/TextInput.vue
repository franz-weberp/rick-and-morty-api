<template>
  <input placeholder="Search for character name" type="text" name="name-character" v-model="characterName" class="name">
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue'

const characterName = ref('')
const emit = defineEmits(['search'])

watch(characterName, () => { emit('search', { name: characterName.value }) })
</script>

<style lang="scss" scoped>
.name { @include search-interactive; }
.name:hover, .name:focus { @include highlight; }
</style>