<template>
  <button @click="changePage" :disabled="isDisabled" class="navigation" :class="( disabled ? '-disabled' : '-enabled' )">{{ label }}</button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const { label, isDisabled, disabled } = defineProps({ label: String, isDisabled: Boolean, disabled: Boolean })
const emit = defineEmits(['change'])

const changePage = () => { emit('change'), window.scrollTo({ top: 0, behavior: 'smooth' }) }
</script>

<style lang="scss" scoped>
.navigation {
  @include font-bold;
  background: $color-darkblue;
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, .8) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  color: $color-lightestgrey;
  cursor: pointer;
  font-size: $font-size-md;
  height: 48px;
}

.navigation:not(.-disabled):hover {
  background: $color-orange;
  color: $color-darkblue;
  transition: background 0.3s ease-in, color 0.3s ease-in;
}

.-disabled { cursor: not-allowed; }
</style>
