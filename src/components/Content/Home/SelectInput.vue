<template>
  <select name="status" v-model="characterStatus" class="status">
    <option value="Status" disabled>Status</option>
    <option value="" selected>All</option>
    <option value="Alive">Alive</option>
    <option value="Dead">Dead</option>
    <option value="Unknown">Unknown</option>
  </select>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue'

const characterStatus = ref('')
const emit = defineEmits(['search'])

watch(characterStatus, () => { emit('search', { status: characterStatus.value }) })
</script>

<style lang="scss" scoped>
.status {
  @include search-interactive;
  cursor: pointer;
}
.status:hover, .status:focus { @include highlight; }
</style>