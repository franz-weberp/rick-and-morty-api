<template>
  <div class="search">
    <TextInput @search="handleSearch" />
    <SelectInput @search="handleSearch" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TextInput from '@components/Content/Home/TextInput.vue'
import SelectInput from '@components/Content/Home/SelectInput.vue'

const props = defineProps({ id: String })
const emit = defineEmits(['search'])

let searchParams = ref({ name: '', status: '' })

const handleSearch = (newSearchParams) => {
  searchParams.value = { ...searchParams.value, ...newSearchParams }
  emit('search', searchParams.value)
}
</script>

<style lang="scss" scoped>
.search {
  background-color: $color-darkgrey;
  box-shadow: rgba(0, 0, 0, 0.1) 0px -7px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  display: grid;
  grid-gap: 24px;
  grid-template: "name" "status";
  padding: $p-24;
  text-align: center;

  @include responsive($xs-tablet) { 
    grid-template: "name status" / 8fr 4fr;
    width: $card-width;
  }

  @include responsive($xs-desktop) { width: calc(($card-width * 2) + 24px); }
  @include responsive($desktop) { width: $card-width; }
}
</style>
